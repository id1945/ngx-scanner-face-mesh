import { Component, ElementRef, EventEmitter, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, AsyncSubject } from 'rxjs';;

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
} from '@mediapipe/face_mesh';
import { drawConnectors } from '@mediapipe/drawing_utils';

/**
 * UnknownObject
 */
export interface UnknownObject {
  [key: string]: any;
}

/**
 * BaseConfig
 */
export interface BaseConfig {
  src?: string;
  isAuto?: boolean;
  isLoading?: boolean;
  mesh?: Options;
  frame?: UnknownObject;
  style?: UnknownObject;
  medias?: UnknownObject | MediaStreamConstraints;
};

/**
 * MESH
 */
const MESH: Options = {
  selfieMode: true,
  enableFaceGeometry: false,
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
}

/**
 * STYLE
 */
const STYLE: UnknownObject = {
  width: '100%',
  height: '100%'
}

/**
 * FRAME
 */
const FRAME: UnknownObject = {
  color: '#0BF6F4',
  lineWidth: 0.5
}

/**
 * MediaStream
 * Use facingMode: environment to attemt to get the front camera on phones
 * { facingMode: 'user', width: { ideal: document.body.clientWidth }, height: { ideal: document.body.clientHeight }
 */
const MEDIASTREAM: MediaStreamConstraints = {
  audio: false,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'environment' // To require the rear camera https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  }
}

@Component({
  selector: 'ngx-scanner-face-mesh',
  template: `<canvas #canvas [style]="style"></canvas><video #video playsinline style="display: none"></video><ng-content></ng-content>`,
  host: { 'class': 'ngx-scanner-face-mesh' },
  inputs: ['src', 'isAuto', 'mesh', 'config', 'style', 'frame', 'medias'],
  outputs: ['event', 'error'],
  exportAs: 'scanner',
  queries: {
    video: new ViewChild('video', { static: true }),
    canvas: new ViewChild('canvas', { static: true })
  },
  encapsulation: ViewEncapsulation.None
})
export class NgxScannerFaceMeshComponent implements OnInit, OnDestroy {

  /**
   * Element
   * playsinline required to tell iOS safari we don't want fullscreen
   */
  private video!: ElementRef;
  private canvas!: ElementRef;

  /**
   * EventEmitter
   */
  public event = new EventEmitter();
  public error = new EventEmitter<any>();

  /**
  * Input
  */
  public src: string = '';
  public isAuto = false;
  public mesh: Options = {};
  public config: BaseConfig = {};
  public style: UnknownObject = {};
  public frame: UnknownObject = {};
  public medias: MediaStreamConstraints = {};

  /**
   * Export
   */
  public isLoading = false;
  public data = new BehaviorSubject(null);

  ngOnInit(): void {
    this.overrideConfig();
    // Load image url
    if (this.src) {
      this.loadImage(this.src);
    } else if (this.isAuto) {
      const as = new AsyncSubject<any>();
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
      image.onerror = (error: any) => this.complete(as, false, error);
    } catch (error: any) {
      this.complete(as, false, error);
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
        this.video?.nativeElement?.play();
        this.complete(as, true);
        break;
      default:
        this.complete(as, false);
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
      this.video?.nativeElement?.pause();
      this.complete(as, true);
    } else {
      this.complete(as, false);
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
    const dataURL = this.canvas?.nativeElement?.toDataURL(`image/${fileName?.split('.')?.slice(-1)?.toString()}`);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataURL;
    link.click();
    this.complete(result, { url: fileName, el: this.canvas?.nativeElement });
    return result;
  }

  /**
   * overrideConfig
   */
  private overrideConfig(): void {
    const overrides = (DATA: UnknownObject, store: UnknownObject) => {
      if (store && Object.keys(store)?.length) {
        for (const key in DATA) {
          store = store?.hasOwnProperty(key) ? store : JSON.parse(JSON.stringify({ ...store, ...{ [key]: (DATA as any)[key] } }));
        }
        return store;
      } else {
        return DATA;
      }
    }
    this.src = this.config?.src ?? this.src ?? '';
    this.isAuto = this.config?.isAuto ?? this.isAuto ?? false;
    this.frame = overrides(FRAME, this.config?.frame ?? this.frame);
    this.style = overrides(STYLE, this.config?.style ?? this.style);
    this.mesh = overrides(MESH, this.config?.mesh ?? this.mesh);
    this.medias = overrides(MEDIASTREAM, this.config?.medias ?? this.medias);
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
      this.canvas.nativeElement.width = this.video.nativeElement?.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement?.videoHeight;
      faceMesh.send({ image: this.video.nativeElement })
      this.video.nativeElement.play();
      this.complete(as, true);
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
    this.status(true);

    const faceMesh = new FaceMesh({ locateFile: (file: any) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });

    // setOptions
    faceMesh.setOptions(this.mesh);

    // onResults
    faceMesh.onResults((results: any) => {
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
      if (!this.src) {
        this.canvas.nativeElement.onclick = () => this.video.nativeElement.paused ? this.start() : this.stop();
        this.isStart && requestAnimationFrame(() => faceMesh.send({ image: this.video.nativeElement }));
      }

      // Emit
      this.data.next(results);
      this.event.emit(results);
      this.status(false);
    });

    if (this.src) {
      // send to faceMesh
      this.canvas.nativeElement.width = imageEl?.naturalWidth;
      this.canvas.nativeElement.height = imageEl?.naturalHeight;
      faceMesh.send({ image: imageEl as HTMLImageElement });
    } else {
      // MediaStream
      const success = (stream: MediaStream) => this.video.nativeElement.srcObject = stream;
      const error = (error: any) => {
        this.eventEmit(false, error);
        this.complete(as, null, error);
      };
      this.camera(as, faceMesh).then(success).catch(error);
    }
  }

  /**
   * status
   * @param isLoading 
   */
  private status(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * eventEmit
   * @param response 
   * @param error 
   */
  private eventEmit(response: any = false, error: any = false): void {
    (response !== false) && this.data.next(response ?? null);
    (response !== false) && this.event.emit(response ?? null);
    (error !== false) && this.error.emit(error ?? null);
  }

  /**
   * AsyncSubject complete
   * @param as 
   * @param data 
   * @param error 
   */
  private complete(as: AsyncSubject<any>, data: any, error = null): void {
    error ? as.error(error) : as.next(data);
    as.complete();
  }

  /**
   * isPause
   * @return boolean
   */
  get isPause(): boolean {
    return !!this.video?.nativeElement?.paused;
  }

  /**
   * isStart
   * @return boolean
   */
  get isStart(): boolean {
    return !!this.video?.nativeElement?.readyState && !this.isPause;
  }

  ngOnDestroy(): void {
    this.stop();
    this.data.complete();
  }
}