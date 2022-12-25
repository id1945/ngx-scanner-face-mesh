import { Component, ElementRef, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, AsyncSubject } from 'rxjs';

import {
  Options,
  FaceMesh,
  FACEMESH_TESSELATION,
  FACEMESH_RIGHT_EYE,
  FACEMESH_RIGHT_EYEBROW,
  FACEMESH_RIGHT_IRIS,
  FACEMESH_LEFT_EYE,
  FACEMESH_LEFT_EYEBROW,
  FACEMESH_LEFT_IRIS,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
  Results,
} from '@mediapipe/face_mesh';
import { drawConnectors } from '@mediapipe/drawing_utils';
import { ScannerFaceConfig, HtmlStyles } from './ngx-scanner-face-mesh.options';
import { AS_COMPLETE, OVERRIDES } from './ngx-scanner-face-mesh.helper';
import { CONFIG_DEFAULT, FRAME_DEFAULT, MEDIA_STREAM_DEFAULT, MESH_DEFAULT, STYLE_DEFAULT } from './ngx-scanner-face-mesh.default';


@Component({
  selector: 'ngx-scanner-face-mesh',
  template: `<canvas #canvas [ngStyle]="style"></canvas><video #video playsinline style="display: none"></video><ng-content></ng-content>`,
  inputs: ['src', 'isAuto', 'config', 'mesh', 'style', 'frame', 'medias'],
  outputs: ['event', 'error'],
  exportAs: 'scanner',
  queries: {
    video: new ViewChild('video'),
    canvas: new ViewChild('canvas')
  },
})
export class NgxScannerFaceMeshComponent implements OnInit, OnDestroy {

  /**
   * Element
   * playsinline required to tell iOS safari we don't want fullscreen
   */
  private video!: ElementRef<HTMLVideoElement>;
  private canvas!: ElementRef<HTMLCanvasElement>;

  /**
   * EventEmitter
   */
  public event = new EventEmitter<Results>();
  public error = new EventEmitter<any | null>();

  /**
  * Input
  */
  public src: string | undefined = CONFIG_DEFAULT.src;
  public isAuto: boolean | undefined = CONFIG_DEFAULT.isAuto;
  public config: ScannerFaceConfig = CONFIG_DEFAULT;
  public mesh: Options = MESH_DEFAULT;
  public style: HtmlStyles = STYLE_DEFAULT;
  public frame: HtmlStyles = FRAME_DEFAULT;
  public medias: MediaStreamConstraints = MEDIA_STREAM_DEFAULT;

  /**
   * Export
   */
  public isStart = CONFIG_DEFAULT.isStart;
  public isLoading = CONFIG_DEFAULT.isLoading;
  public data = new BehaviorSubject<Results | null>(null);

  private rAF_ID: any;
  private detectionLoop: any;

  ngOnInit(): void {
    this.style = STYLE_DEFAULT;
    // Load image url
    if (this.src) {
      this.overrideConfig();
      this.loadImage(this.src);
    } else if (this.isAuto) {
      const as = new AsyncSubject<any>();
      this.overrideConfig();
      this.drawImage(as);
    }
  }

  /**
   * loadImage
   * @param src 
   * @return AsyncSubject
   */
  public loadImage(src: string): AsyncSubject<any> {
    const as = new AsyncSubject<any>();
    // Set the src of this Image object.
    const image = new Image();
    // Setting cross origin value to anonymous
    image.setAttribute('crossOrigin', 'anonymous');
    // When our image has loaded.
    try {
      image.onload = () => this.drawImage(as, image);
      image.onerror = (error: any) => AS_COMPLETE(as, false, error);
    } catch (error) {
      AS_COMPLETE(as, false, error as any);
    }
    // Set src
    image.src = src;
    return as;
  }

  /**
   * start
   * @return AsyncSubject
   */
  public start(): AsyncSubject<any> {
    const as = new AsyncSubject<any>();
    switch (true) {
      case !this.isStart:
        this.drawImage(as);
        break;
      case this.isPause:
        this.video.nativeElement.play();
        this.detectionLoop();
        AS_COMPLETE(as, true);
        break;
      default:
        AS_COMPLETE(as, false);
        break;
    }
    return as;
  }

  /**
   * stop
   * @return AsyncSubject 
   */
  public stop(): AsyncSubject<any> {
    const as = new AsyncSubject<any>();
    if (this.isStart) {
      this.status(false, false);
      this.data.complete();
      cancelAnimationFrame(this.rAF_ID);
      this.video.nativeElement.pause();
      AS_COMPLETE(as, true);
    } else {
      AS_COMPLETE(as, false);
    }
    return as;
  }

  /**
   * download
   * @param fileName 
   * @return AsyncSubject
   */
  public download(fileName: string): AsyncSubject<{ url: string, el: HTMLCanvasElement }> {
    const result = new AsyncSubject<{ url: string, el: HTMLCanvasElement }>()
    const dataURL = this.canvas.nativeElement.toDataURL(`image/${fileName.split('.').slice(-1).toString()}`);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataURL;
    link.click();
    AS_COMPLETE(result, { url: fileName, el: this.canvas.nativeElement });
    return result;
  }

  /**
   * overrideConfig
   */
  private overrideConfig(): void {
    const isOverride = (key: string) => key in this.config;
    if (isOverride('src')) this.src = this.config.src;
    if (isOverride('isAuto')) this.isAuto = this.config.isAuto;
    if (isOverride('frame')) this.frame = OVERRIDES('frame', this.config, FRAME_DEFAULT);
    if (isOverride('style')) this.style = OVERRIDES('style', this.config, STYLE_DEFAULT);
    if (isOverride('mesh')) this.mesh = OVERRIDES('mesh', this.config, MESH_DEFAULT);
    if (isOverride('medias')) this.medias = OVERRIDES('medias', this.config, MEDIA_STREAM_DEFAULT);
  }

  /**
   * camera
   * @param as 
   * @param faceMesh 
   * @returns 
   */
  private camera(as: AsyncSubject<any>, faceMesh: any): Promise<MediaStream> {
    // Onload camera
    this.video.nativeElement.onloadedmetadata = () => {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
      faceMesh.send({ image: this.video.nativeElement })
      this.video.nativeElement.play();
      AS_COMPLETE(as, true);
    };

    // mediaDevices
    return navigator.mediaDevices.getUserMedia(this.medias);
  }

  /**
   * drawImage
   * @param as 
   * @param imageEl 
   */
  private drawImage(as: AsyncSubject<any>, imageEl?: HTMLImageElement): void {
    this.status(true, true);

    const faceMesh = new FaceMesh({ locateFile: (file: any) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });

    // setOptions
    faceMesh.setOptions(this.mesh);

    // onResults
    faceMesh.onResults((results: Results) => {
      const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

      // drawImage
      ctx.save();
      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      ctx.drawImage(results.image, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      // multiFaceLandmarks data
      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYE, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYEBROW, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_RIGHT_IRIS, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYE, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYEBROW, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_LEFT_IRIS, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_FACE_OVAL, this.frame);
          drawConnectors(ctx, landmarks, FACEMESH_LIPS, this.frame);
        }
      }
      ctx.restore();

      // Flip image horizontal
      const flipImageHorizontal = () => {
        const ctxFlip = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
        ctxFlip.scale(-1, 1);
        ctxFlip.drawImage(this.canvas.nativeElement, 0, 0, -this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        ctxFlip.restore();
      }
      flipImageHorizontal();

      // Video 
      this.detectionLoop = () => {
        if (!this.src && this.isStart) {
          this.rAF_ID = requestAnimationFrame(() => faceMesh.send({ image: this.video.nativeElement }));
        }
      }
      this.detectionLoop();

      // Emit
      this.data.next(results);
      this.event.emit(results);
      this.status(false, true);
    });

    if (this.src && imageEl) {
      // send to faceMesh
      this.canvas.nativeElement.width = imageEl.naturalWidth;
      this.canvas.nativeElement.height = imageEl.naturalHeight;
      faceMesh.send({ image: imageEl as HTMLImageElement });
    } else {
      // MediaStream
      const success = (stream: MediaStream) => this.video.nativeElement.srcObject = stream;
      const error = (error: any) => {
        this.status(false, false);
        this.eventEmit(false, error);
        AS_COMPLETE(as, null, error);
      };
      this.camera(as, faceMesh).then(success).catch(error);
    }
  }

  /**
   * status
   * @param isLoading 
   * @param isStart 
   */
  private status(isLoading: boolean, isStart: boolean): void {
    this.isLoading = isLoading;
    this.isStart = isStart;
  }

  /**
   * eventEmit
   * @param response 
   * @param error 
   */
  private eventEmit(response: any = false, error: any = false): void {
    (response !== false) && this.data.next(response || null);
    (response !== false) && this.event.emit(response || null);
    (error !== false) && this.error.emit(error || null);
  }

  /**
   * isPause
   * @return boolean
   */
  get isPause(): boolean {
    return this.video && this.video.nativeElement.paused || false;
  }

  ngOnDestroy(): void {
    this.stop();
  }
}