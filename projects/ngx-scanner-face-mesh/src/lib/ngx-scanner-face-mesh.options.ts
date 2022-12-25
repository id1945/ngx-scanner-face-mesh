import { Options, Results } from "@mediapipe/face_mesh";

export interface HtmlStyles {
  [key: string]: any;
}

/**
 * ScannerFaceConfig
 */
export interface ScannerFaceConfig {
  src?: string;
  isAuto?: boolean;
  isStart?: boolean;
  isLoading?: boolean;
  mesh?: Options;
  frame?: HtmlStyles;
  style?: HtmlStyles;
  medias?: MediaStreamConstraints;
}

/**
 * ScannerFaceResult
 */
export interface ScannerFaceResult {
  canvas?: HTMLCanvasElement;
  file?: File;
  name?: string;
  url?: string;
  blob?: any;
  base64?: string;
  result?: Results;
}
