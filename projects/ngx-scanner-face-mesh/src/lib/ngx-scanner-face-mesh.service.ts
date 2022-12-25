import { Injectable } from '@angular/core';
import { drawConnectors } from '@mediapipe/drawing_utils';
import { FaceMesh, FACEMESH_FACE_OVAL, FACEMESH_LEFT_EYE, FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_IRIS, FACEMESH_LIPS, FACEMESH_RIGHT_EYE, FACEMESH_RIGHT_EYEBROW, FACEMESH_RIGHT_IRIS, FACEMESH_TESSELATION } from '@mediapipe/face_mesh';
import { AsyncSubject } from 'rxjs';
import { CONFIG_DEFAULT, FRAME_DEFAULT, MEDIA_STREAM_DEFAULT, MESH_DEFAULT, STYLE_DEFAULT } from './ngx-scanner-face-mesh.default';
import { AS_COMPLETE } from './ngx-scanner-face-mesh.helper';
import { ScannerFaceConfig, ScannerFaceResult } from './ngx-scanner-face-mesh.options';


@Injectable({
  providedIn: "root",
})
export class NgxScannerFaceMeshService {
  
  /**
   * Files to base64: ScannerFaceResult[]
   * @param files
   * @param ScannerFaceResult
   * @returns ScannerFaceResult
   */
  public toBase64(files: File[]): AsyncSubject<ScannerFaceResult[]> {
    const result = new AsyncSubject<ScannerFaceResult[]>();
    const data: ScannerFaceResult[] = [];
    if (files.length) {
      Object.assign([], Object.keys(files)).forEach((file, i) => {
        const url = URL.createObjectURL(files[i]);
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          data.push({
            name: files[i].name,
            file: files[i],
            base64: reader.result as string,
            url: url,
          });
          if (files.length === i + 1) {
            result.next(data);
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }

  /**
   * Load files
   * @param files
   * @param config
   * @return AsyncSubject
   */
  public loadFiles(files: File[] = [], config: ScannerFaceConfig): AsyncSubject<ScannerFaceResult[]> {
    const as = new AsyncSubject<ScannerFaceResult[]>();
    Promise.all(Object.assign([], files).map(async m => await this.readAsDataURL(m, config))).then((img: ScannerFaceResult[]) => AS_COMPLETE(as, img)).catch((error: any) => AS_COMPLETE(as, null, error));
    return as;
  }

  /**
   * readAsDataURL
   * @param file 
   * @param config 
   * @returns 
   */
  private async readAsDataURL(file: File, config: ScannerFaceConfig): Promise<ScannerFaceResult> {
    const faceMesh = new FaceMesh({ locateFile: (file: any) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });
    await faceMesh.initialize();
    /** drawImage **/
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        // Set the src of this Image object.
        const image = new Image();
        // Setting cross origin value to anonymous
        image.setAttribute("crossOrigin", "anonymous");
        // When our image has loaded.
        image.onload = async () => {
          // Get the canvas element by using the getElementById method.
          const canvas = document.createElement("canvas");
          // HTMLImageElement size
          canvas.width = image.naturalWidth || image.width;
          canvas.height = image.naturalHeight || image.height;
          // Get a 2D drawing context for the canvas.
          const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
          // Draw image
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          // setOptions
          this.overrideConfig(config);
          faceMesh.setOptions(config.mesh || {});

          // onResults
          faceMesh.onResults((results: any) => {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

            // drawImage
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

            // multiFaceLandmarks data
            if (results.multiFaceLandmarks) {
              for (const landmarks of results.multiFaceLandmarks) {
                drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYE, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYEBROW, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_RIGHT_IRIS, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYE, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYEBROW, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_LEFT_IRIS, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_FACE_OVAL, config.frame);
                drawConnectors(ctx, landmarks, FACEMESH_LIPS, config.frame);
              }
              canvas.toBlob((blob: any) => {
                resolve({
                  ...results,
                  name: file.name,
                  file: file,
                  url: URL.createObjectURL(blob),
                  blob: blob
                });
                faceMesh.close();
              });
            }
            ctx.restore();

            // Flip image horizontal
            const flipImageHorizontal = () => {
              const ctxFlip = canvas.getContext('2d') as CanvasRenderingContext2D;
              ctxFlip.scale(-1, 1);
              ctxFlip.drawImage(canvas, 0, 0, -canvas.width, canvas.height);
              ctxFlip.restore();
            }
            flipImageHorizontal();

          });
          
          // Request 
          faceMesh.send({ image: image });
        };
        // Set src
        image.src = URL.createObjectURL(file);
      };
      fileReader.onerror = (error: any) => reject(error);
      fileReader.readAsDataURL(file);
    });
  }

  /**
   * overrideConfig
   * @param baseConfig 
   */
  private overrideConfig(baseConfig: ScannerFaceConfig): void {
    const isNull = (field: string) => (baseConfig as any)[field] == null || (baseConfig as any)[field] == undefined;
    if (isNull("src")) baseConfig.src = CONFIG_DEFAULT.src;
    if (isNull("isAuto")) baseConfig.isAuto = CONFIG_DEFAULT.isAuto;
    if (isNull("frame")) baseConfig.frame = FRAME_DEFAULT;
    if (isNull("style")) baseConfig.style = STYLE_DEFAULT;
    if (isNull("mesh")) baseConfig.mesh = MESH_DEFAULT;
    if (isNull("medias")) baseConfig.medias = MEDIA_STREAM_DEFAULT;
  }
}


