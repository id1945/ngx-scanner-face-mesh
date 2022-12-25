import { HtmlStyles, ScannerFaceConfig } from "./ngx-scanner-face-mesh.options";
import { Options } from "@mediapipe/face_mesh";

/**
 * MESH
 */
export const MESH_DEFAULT: Options = {
  selfieMode: true,
  enableFaceGeometry: false,
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
};

/**
 * STYLE
 */
export const STYLE_DEFAULT: HtmlStyles = {
  width: "100%",
  height: "100%",
  background: '#000000'
};

/**
 * FRAME
 */
export const FRAME_DEFAULT: HtmlStyles = {
  color: "#0BF6F4",
  lineWidth: 0.5,
};

/**
 * MediaStream
 * Use facingMode: environment to attemt to get the front camera on phones
 * { facingMode: 'user', width: { ideal: document.body.clientWidth }, height: { ideal: document.body.clientHeight }
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 */
export const MEDIA_STREAM_DEFAULT: MediaStreamConstraints = {
  audio: false,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "environment", // Front and back camera { facingMode: front ? "user" : "environment" }
  },
};

/**
 * CONFIG_DEFAULT
 */
export const CONFIG_DEFAULT: ScannerFaceConfig = {
  src: "",
  isAuto: false,
  isStart: false,
  isLoading: false,
  mesh: MESH_DEFAULT,
  frame: FRAME_DEFAULT,
  style: STYLE_DEFAULT,
  medias: MEDIA_STREAM_DEFAULT,
};
