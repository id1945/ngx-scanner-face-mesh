(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.component.ts":
/*!***********************************************************************************!*\
  !*** ./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.component.ts ***!
  \***********************************************************************************/
/*! exports provided: NgxScannerFaceMeshComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxScannerFaceMeshComponent", function() { return NgxScannerFaceMeshComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediapipe/face_mesh */ "./node_modules/@mediapipe/face_mesh/face_mesh.js");
/* harmony import */ var _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediapipe/drawing_utils */ "./node_modules/@mediapipe/drawing_utils/drawing_utils.js");
/* harmony import */ var _mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ngx-scanner-face-mesh.helper */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.helper.ts");
/* harmony import */ var _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ngx-scanner-face-mesh.default */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.default.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NgxScannerFaceMeshComponent = /** @class */ (function () {
    function NgxScannerFaceMeshComponent() {
        /**
         * EventEmitter
         */
        this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.error = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
        * Input
        */
        this.src = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["CONFIG_DEFAULT"].src;
        this.isAuto = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["CONFIG_DEFAULT"].isAuto;
        this.config = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["CONFIG_DEFAULT"];
        this.mesh = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["MESH_DEFAULT"];
        this.style = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["STYLE_DEFAULT"];
        this.frame = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["FRAME_DEFAULT"];
        this.medias = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["MEDIA_STREAM_DEFAULT"];
        /**
         * Export
         */
        this.isLoading = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["CONFIG_DEFAULT"].isLoading;
        this.data = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
    }
    NgxScannerFaceMeshComponent.prototype.ngOnInit = function () {
        this.style = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["STYLE_DEFAULT"];
        // Load image url
        if (this.src) {
            this.overrideConfig();
            this.loadImage(this.src);
        }
        else if (this.isAuto) {
            var as = new rxjs__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();
            this.overrideConfig();
            this.drawImage(as);
        }
    };
    /**
     * loadImage
     * @param src
     * @return AsyncSubject
     */
    NgxScannerFaceMeshComponent.prototype.loadImage = function (src) {
        var _this = this;
        var as = new rxjs__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();
        // Set the src of this Image object.
        var image = new Image();
        // Setting cross origin value to anonymous
        image.setAttribute('crossOrigin', 'anonymous');
        // When our image has loaded.
        try {
            image.onload = function () { return _this.drawImage(as, image); };
            image.onerror = function (error) { return Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, false, error); };
        }
        catch (error) {
            Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, false, error);
        }
        // Set src
        image.src = src;
        return as;
    };
    /**
     * start
     * @return AsyncSubject
     */
    NgxScannerFaceMeshComponent.prototype.start = function () {
        var as = new rxjs__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();
        switch (true) {
            case !this.isStart:
                this.drawImage(as);
                break;
            case this.isPause:
                this.video.nativeElement.play();
                this.detectionLoop();
                Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, true);
                break;
            default:
                Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, false);
                break;
        }
        return as;
    };
    /**
     * stop
     * @return AsyncSubject
     */
    NgxScannerFaceMeshComponent.prototype.stop = function () {
        var as = new rxjs__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();
        if (this.isStart) {
            cancelAnimationFrame(this.rAF_ID);
            this.video.nativeElement.pause();
            Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, true);
        }
        else {
            Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, false);
        }
        return as;
    };
    /**
     * download
     * @param fileName
     * @return AsyncSubject
     */
    NgxScannerFaceMeshComponent.prototype.download = function (fileName) {
        var result = new rxjs__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();
        var dataURL = this.canvas.nativeElement.toDataURL("image/" + fileName.split('.').slice(-1).toString());
        var link = document.createElement('a');
        link.download = fileName;
        link.href = dataURL;
        link.click();
        Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(result, { url: fileName, el: this.canvas.nativeElement });
        return result;
    };
    /**
     * overrideConfig
     */
    NgxScannerFaceMeshComponent.prototype.overrideConfig = function () {
        var _this = this;
        var isOverride = function (key) { return key in _this.config; };
        if (isOverride('src'))
            this.src = this.config.src;
        if (isOverride('isAuto'))
            this.isAuto = this.config.isAuto;
        if (isOverride('frame'))
            this.frame = Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["OVERRIDES"])('frame', this.config, _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["FRAME_DEFAULT"]);
        if (isOverride('style'))
            this.style = Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["OVERRIDES"])('style', this.config, _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["STYLE_DEFAULT"]);
        if (isOverride('mesh'))
            this.mesh = Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["OVERRIDES"])('mesh', this.config, _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["MESH_DEFAULT"]);
        if (isOverride('medias'))
            this.medias = Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["OVERRIDES"])('medias', this.config, _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_5__["MEDIA_STREAM_DEFAULT"]);
    };
    /**
     * camera
     * @param as
     * @param faceMesh
     * @returns
     */
    NgxScannerFaceMeshComponent.prototype.camera = function (as, faceMesh) {
        var _this = this;
        // Onload camera
        this.video.nativeElement.onloadedmetadata = function () {
            _this.canvas.nativeElement.width = _this.video.nativeElement.videoWidth;
            _this.canvas.nativeElement.height = _this.video.nativeElement.videoHeight;
            faceMesh.send({ image: _this.video.nativeElement });
            _this.video.nativeElement.play();
            Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, true);
        };
        // mediaDevices
        return navigator.mediaDevices.getUserMedia(this.medias);
    };
    /**
     * drawImage
     * @param as
     * @param imageEl
     */
    NgxScannerFaceMeshComponent.prototype.drawImage = function (as, imageEl) {
        var _this = this;
        this.status(true);
        var faceMesh = new _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FaceMesh"]({ locateFile: function (file) { return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/" + file; } });
        // setOptions
        faceMesh.setOptions(this.mesh);
        // onResults
        faceMesh.onResults(function (results) {
            var ctx = _this.canvas.nativeElement.getContext('2d');
            // drawImage
            ctx.save();
            ctx.clearRect(0, 0, _this.canvas.nativeElement.width, _this.canvas.nativeElement.height);
            ctx.drawImage(results.image, 0, 0, _this.canvas.nativeElement.width, _this.canvas.nativeElement.height);
            // multiFaceLandmarks data
            if (results.multiFaceLandmarks) {
                for (var _i = 0, _a = results.multiFaceLandmarks; _i < _a.length; _i++) {
                    var landmarks = _a[_i];
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_TESSELATION"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_RIGHT_EYE"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_RIGHT_EYEBROW"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_RIGHT_IRIS"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LEFT_EYE"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LEFT_EYEBROW"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LEFT_IRIS"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_FACE_OVAL"], _this.frame);
                    Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_3__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LIPS"], _this.frame);
                }
            }
            ctx.restore();
            // Flip image horizontal
            var flipImageHorizontal = function () {
                var ctxFlip = _this.canvas.nativeElement.getContext('2d');
                ctxFlip.scale(-1, 1);
                ctxFlip.drawImage(_this.canvas.nativeElement, 0, 0, -_this.canvas.nativeElement.width, _this.canvas.nativeElement.height);
                ctxFlip.restore();
            };
            flipImageHorizontal();
            // Video 
            _this.detectionLoop = function () {
                if (!_this.src && _this.isStart) {
                    _this.rAF_ID = requestAnimationFrame(function () { return faceMesh.send({ image: _this.video.nativeElement }); });
                }
            };
            _this.detectionLoop();
            // Emit
            _this.data.next(results);
            _this.event.emit(results);
            _this.status(false);
        });
        if (this.src && imageEl) {
            // send to faceMesh
            this.canvas.nativeElement.width = imageEl.naturalWidth;
            this.canvas.nativeElement.height = imageEl.naturalHeight;
            faceMesh.send({ image: imageEl });
        }
        else {
            // MediaStream
            var success = function (stream) { return _this.video.nativeElement.srcObject = stream; };
            var error = function (error) {
                _this.eventEmit(false, error);
                Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_4__["AS_COMPLETE"])(as, null, error);
            };
            this.camera(as, faceMesh).then(success).catch(error);
        }
    };
    /**
     * status
     * @param isLoading
     */
    NgxScannerFaceMeshComponent.prototype.status = function (isLoading) {
        this.isLoading = isLoading;
    };
    /**
     * eventEmit
     * @param response
     * @param error
     */
    NgxScannerFaceMeshComponent.prototype.eventEmit = function (response, error) {
        if (response === void 0) { response = false; }
        if (error === void 0) { error = false; }
        (response !== false) && this.data.next(response || null);
        (response !== false) && this.event.emit(response || null);
        (error !== false) && this.error.emit(error || null);
    };
    Object.defineProperty(NgxScannerFaceMeshComponent.prototype, "isPause", {
        /**
         * isPause
         * @return boolean
         */
        get: function () {
            return this.video && this.video.nativeElement.paused || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxScannerFaceMeshComponent.prototype, "isStart", {
        /**
         * isStart
         * @return boolean
         */
        get: function () {
            return this.video && !!this.video.nativeElement.readyState && !this.isPause || false;
        },
        enumerable: true,
        configurable: true
    });
    NgxScannerFaceMeshComponent.prototype.ngOnDestroy = function () {
        this.stop();
        this.data.complete();
    };
    NgxScannerFaceMeshComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-scanner-face-mesh',
            template: "<canvas #canvas [ngStyle]=\"style\"></canvas><video #video playsinline style=\"display: none\"></video><ng-content></ng-content>",
            inputs: ['src', 'isAuto', 'config', 'mesh', 'style', 'frame', 'medias'],
            outputs: ['event', 'error'],
            exportAs: 'scanner',
            queries: {
                video: new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"]('video'),
                canvas: new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"]('canvas')
            },
        })
    ], NgxScannerFaceMeshComponent);
    return NgxScannerFaceMeshComponent;
}());



/***/ }),

/***/ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.default.ts":
/*!*********************************************************************************!*\
  !*** ./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.default.ts ***!
  \*********************************************************************************/
/*! exports provided: MESH_DEFAULT, STYLE_DEFAULT, FRAME_DEFAULT, MEDIA_STREAM_DEFAULT, CONFIG_DEFAULT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESH_DEFAULT", function() { return MESH_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STYLE_DEFAULT", function() { return STYLE_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FRAME_DEFAULT", function() { return FRAME_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_STREAM_DEFAULT", function() { return MEDIA_STREAM_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFIG_DEFAULT", function() { return CONFIG_DEFAULT; });
/**
 * MESH
 */
var MESH_DEFAULT = {
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
var STYLE_DEFAULT = {
    width: "100%",
    height: "100%",
    background: '#000000'
};
/**
 * FRAME
 */
var FRAME_DEFAULT = {
    color: "#0BF6F4",
    lineWidth: 0.5,
};
/**
 * MediaStream
 * Use facingMode: environment to attemt to get the front camera on phones
 * { facingMode: 'user', width: { ideal: document.body.clientWidth }, height: { ideal: document.body.clientHeight }
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 */
var MEDIA_STREAM_DEFAULT = {
    audio: false,
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "environment",
    },
};
/**
 * CONFIG_DEFAULT
 */
var CONFIG_DEFAULT = {
    src: "",
    isAuto: false,
    isLoading: false,
    mesh: MESH_DEFAULT,
    frame: FRAME_DEFAULT,
    style: STYLE_DEFAULT,
    medias: MEDIA_STREAM_DEFAULT,
};


/***/ }),

/***/ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.helper.ts":
/*!********************************************************************************!*\
  !*** ./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.helper.ts ***!
  \********************************************************************************/
/*! exports provided: HAS_OWN_PROPERTY, OVERRIDES, AS_COMPLETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HAS_OWN_PROPERTY", function() { return HAS_OWN_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OVERRIDES", function() { return OVERRIDES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AS_COMPLETE", function() { return AS_COMPLETE; });
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * HAS_OWN_PROPERTY
 * Fix issue vs ng v 6-7-8
 * Optional chaining (?.) just have on ng v 9++
 * eg: HAS_OWN_PROPERTY(config, 'frameOptions.style') // output: boolean
 * @param obj
 * @param propertyPath
 * @returns
 */
var HAS_OWN_PROPERTY = function (obj, propertyPath) {
    var properties = propertyPath.split(".");
    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];
        if (!obj.hasOwnProperty(prop)) {
            return false;
        }
        else {
            obj = obj[prop];
        }
    }
    return true;
};
/**
 * OVERRIDES
 * @param variableKey
 * @param config
 * @param defaultConfig
 * @returns
 */
var OVERRIDES = function (variableKey, config, defaultConfig) {
    var _a;
    if (config && Object.keys(config[variableKey]).length) {
        for (var key in defaultConfig) {
            var cloneDeep = JSON.parse(JSON.stringify(__assign({}, config[variableKey], (_a = {}, _a[key] = defaultConfig[key], _a))));
            config[variableKey] = config[variableKey].hasOwnProperty(key) ? config[variableKey] : cloneDeep;
        }
        return config[variableKey];
    }
    else {
        return defaultConfig;
    }
};
/**
 * Rxjs complete
 * @param as
 * @param data
 * @param error
 */
var AS_COMPLETE = function (as, data, error) {
    if (error === void 0) { error = null; }
    error ? as.error(error) : as.next(data);
    as.complete();
};


/***/ }),

/***/ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.module.ts":
/*!********************************************************************************!*\
  !*** ./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.module.ts ***!
  \********************************************************************************/
/*! exports provided: NgxScannerFaceMeshModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxScannerFaceMeshModule", function() { return NgxScannerFaceMeshModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngx_scanner_face_mesh_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngx-scanner-face-mesh.component */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.component.ts");
/* harmony import */ var _ngx_scanner_face_mesh_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ngx-scanner-face-mesh.service */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NgxScannerFaceMeshModule = /** @class */ (function () {
    function NgxScannerFaceMeshModule() {
    }
    NgxScannerFaceMeshModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [
                _ngx_scanner_face_mesh_component__WEBPACK_IMPORTED_MODULE_2__["NgxScannerFaceMeshComponent"]
            ],
            exports: [
                _ngx_scanner_face_mesh_component__WEBPACK_IMPORTED_MODULE_2__["NgxScannerFaceMeshComponent"],
            ],
            providers: [_ngx_scanner_face_mesh_service__WEBPACK_IMPORTED_MODULE_3__["NgxScannerFaceMeshService"]]
        })
    ], NgxScannerFaceMeshModule);
    return NgxScannerFaceMeshModule;
}());



/***/ }),

/***/ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.service.ts":
/*!*********************************************************************************!*\
  !*** ./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.service.ts ***!
  \*********************************************************************************/
/*! exports provided: NgxScannerFaceMeshService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxScannerFaceMeshService", function() { return NgxScannerFaceMeshService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mediapipe/drawing_utils */ "./node_modules/@mediapipe/drawing_utils/drawing_utils.js");
/* harmony import */ var _mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediapipe/face_mesh */ "./node_modules/@mediapipe/face_mesh/face_mesh.js");
/* harmony import */ var _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ngx-scanner-face-mesh.default */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.default.ts");
/* harmony import */ var _ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ngx-scanner-face-mesh.helper */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.helper.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var NgxScannerFaceMeshService = /** @class */ (function () {
    function NgxScannerFaceMeshService() {
    }
    /**
     * Files to base64: ScannerFaceResult[]
     * @param files
     * @param ScannerFaceResult
     * @returns ScannerFaceResult
     */
    NgxScannerFaceMeshService.prototype.toBase64 = function (files) {
        var result = new rxjs__WEBPACK_IMPORTED_MODULE_3__["AsyncSubject"]();
        var data = [];
        if (files.length) {
            Object.assign([], Object.keys(files)).forEach(function (file, i) {
                var url = URL.createObjectURL(files[i]);
                var reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function (e) {
                    data.push({
                        name: files[i].name,
                        file: files[i],
                        base64: reader.result,
                        url: url,
                    });
                    if (files.length === i + 1) {
                        result.next(data);
                        result.complete();
                    }
                };
            });
            return result;
        }
        else {
            result.next([]);
            result.complete();
            return result;
        }
    };
    /**
     * Load files
     * @param files
     * @param config
     * @return AsyncSubject
     */
    NgxScannerFaceMeshService.prototype.loadFiles = function (files, config) {
        var _this = this;
        if (files === void 0) { files = []; }
        var as = new rxjs__WEBPACK_IMPORTED_MODULE_3__["AsyncSubject"]();
        Promise.all(Object.assign([], files).map(function (m) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.readAsDataURL(m, config)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); })).then(function (img) { return Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_5__["AS_COMPLETE"])(as, img); }).catch(function (error) { return Object(_ngx_scanner_face_mesh_helper__WEBPACK_IMPORTED_MODULE_5__["AS_COMPLETE"])(as, null, error); });
        return as;
    };
    /**
     * readAsDataURL
     * @param file
     * @param config
     * @returns
     */
    NgxScannerFaceMeshService.prototype.readAsDataURL = function (file, config) {
        return __awaiter(this, void 0, void 0, function () {
            var faceMesh;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        faceMesh = new _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FaceMesh"]({ locateFile: function (file) { return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/" + file; } });
                        return [4 /*yield*/, faceMesh.initialize()];
                    case 1:
                        _a.sent();
                        /** drawImage **/
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var fileReader = new FileReader();
                                fileReader.onload = function () {
                                    // Set the src of this Image object.
                                    var image = new Image();
                                    // Setting cross origin value to anonymous
                                    image.setAttribute("crossOrigin", "anonymous");
                                    // When our image has loaded.
                                    image.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                                        var canvas, ctx;
                                        return __generator(this, function (_a) {
                                            canvas = document.createElement("canvas");
                                            // HTMLImageElement size
                                            canvas.width = image.naturalWidth || image.width;
                                            canvas.height = image.naturalHeight || image.height;
                                            ctx = canvas.getContext("2d");
                                            // Draw image
                                            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                                            // setOptions
                                            this.overrideConfig(config);
                                            faceMesh.setOptions(config.mesh || {});
                                            // onResults
                                            faceMesh.onResults(function (results) {
                                                var ctx = canvas.getContext('2d');
                                                // drawImage
                                                ctx.save();
                                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                                ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
                                                // multiFaceLandmarks data
                                                if (results.multiFaceLandmarks) {
                                                    for (var _i = 0, _a = results.multiFaceLandmarks; _i < _a.length; _i++) {
                                                        var landmarks = _a[_i];
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_TESSELATION"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_RIGHT_EYE"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_RIGHT_EYEBROW"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_RIGHT_IRIS"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LEFT_EYE"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LEFT_EYEBROW"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LEFT_IRIS"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_FACE_OVAL"], config.frame);
                                                        Object(_mediapipe_drawing_utils__WEBPACK_IMPORTED_MODULE_1__["drawConnectors"])(ctx, landmarks, _mediapipe_face_mesh__WEBPACK_IMPORTED_MODULE_2__["FACEMESH_LIPS"], config.frame);
                                                    }
                                                    canvas.toBlob(function (blob) {
                                                        resolve(__assign({}, results, { name: file.name, file: file, url: URL.createObjectURL(blob), blob: blob }));
                                                        faceMesh.close();
                                                    });
                                                }
                                                ctx.restore();
                                                // Flip image horizontal
                                                var flipImageHorizontal = function () {
                                                    var ctxFlip = canvas.getContext('2d');
                                                    ctxFlip.scale(-1, 1);
                                                    ctxFlip.drawImage(canvas, 0, 0, -canvas.width, canvas.height);
                                                    ctxFlip.restore();
                                                };
                                                flipImageHorizontal();
                                            });
                                            // Request 
                                            faceMesh.send({ image: image });
                                            return [2 /*return*/];
                                        });
                                    }); };
                                    // Set src
                                    image.src = URL.createObjectURL(file);
                                };
                                fileReader.onerror = function (error) { return reject(error); };
                                fileReader.readAsDataURL(file);
                            })];
                }
            });
        });
    };
    /**
     * overrideConfig
     * @param baseConfig
     */
    NgxScannerFaceMeshService.prototype.overrideConfig = function (baseConfig) {
        var isNull = function (field) { return baseConfig[field] == null || baseConfig[field] == undefined; };
        if (isNull("src"))
            baseConfig.src = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__["CONFIG_DEFAULT"].src;
        if (isNull("isAuto"))
            baseConfig.isAuto = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__["CONFIG_DEFAULT"].isAuto;
        if (isNull("frame"))
            baseConfig.frame = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__["FRAME_DEFAULT"];
        if (isNull("style"))
            baseConfig.style = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__["STYLE_DEFAULT"];
        if (isNull("mesh"))
            baseConfig.mesh = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__["MESH_DEFAULT"];
        if (isNull("medias"))
            baseConfig.medias = _ngx_scanner_face_mesh_default__WEBPACK_IMPORTED_MODULE_4__["MEDIA_STREAM_DEFAULT"];
    };
    NgxScannerFaceMeshService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: "root",
        })
    ], NgxScannerFaceMeshService);
    return NgxScannerFaceMeshService;
}());



/***/ }),

/***/ "./projects/ngx-scanner-face-mesh/src/public_api.ts":
/*!**********************************************************!*\
  !*** ./projects/ngx-scanner-face-mesh/src/public_api.ts ***!
  \**********************************************************/
/*! exports provided: NgxScannerFaceMeshService, NgxScannerFaceMeshComponent, NgxScannerFaceMeshModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ngx_scanner_face_mesh_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ngx-scanner-face-mesh.service */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxScannerFaceMeshService", function() { return _lib_ngx_scanner_face_mesh_service__WEBPACK_IMPORTED_MODULE_0__["NgxScannerFaceMeshService"]; });

/* harmony import */ var _lib_ngx_scanner_face_mesh_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/ngx-scanner-face-mesh.component */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxScannerFaceMeshComponent", function() { return _lib_ngx_scanner_face_mesh_component__WEBPACK_IMPORTED_MODULE_1__["NgxScannerFaceMeshComponent"]; });

/* harmony import */ var _lib_ngx_scanner_face_mesh_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/ngx-scanner-face-mesh.module */ "./projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxScannerFaceMeshModule", function() { return _lib_ngx_scanner_face_mesh_module__WEBPACK_IMPORTED_MODULE_2__["NgxScannerFaceMeshModule"]; });

/*
 * Public API Surface of ngx-scanner-face-mesh
 */





/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <!-- ngx-scanner-face-mesh -->\n  <ngx-scanner-face-mesh #action=\"scanner\" [config]=\"config\" (event)=\"event($event)\"></ngx-scanner-face-mesh>\n\n  <br />\n  <!-- data  -->\n  <p class=\"data\">{{ action.data | async | json }}</p>\n\n  <!-- Loading -->\n  <p *ngIf=\"action.isLoading\">⌛ Loading...</p>\n\n  <button class=\"btn btn-info\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"action.isLoading\" (click)=\"handle(action, 'start')\">Start</button>\n  <button class=\"btn btn-info\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"action.isLoading\" (click)=\"handle(action, 'stop')\">Stop</button>\n  <button class=\"btn btn-info\" [class.btn-info]=\"!action.isStart\" [class.btn-warning]=\"action.isStart\" [disabled]=\"action.isLoading\" (click)=\"action.download('ngx-scanner-face-mesh')\">Cap</button>\n  <br>\n\n  <!-- For select files -->\n  <input #file type=\"file\" (change)=\"onSelects(file.files)\" [multiple]=\"'multiple'\" [accept]=\"'.jpg, .png, .gif, .jpeg'\" class=\"btn btn-success my-2\"/>\n\n  <div *ngFor=\"let item of faceResult\">\n    <img [src]=\"item.url || '' | safe: 'url'\" [alt]=\"item.name\">\n  </div>\n\n  <h5 class=\"mt-4\">Author: DaiDH</h5>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1,\nh5,\np {\n  font-weight: 600;\n  word-break: break-all;\n  font-family: 'Courier New', Courier, monospace; }\n\ndiv {\n  text-align: center;\n  background: #fdfdfd; }\n\ndiv button {\n    border-radius: 50%;\n    height: 60px;\n    width: 60px;\n    margin: 4px; }\n\ndiv buttondisabled {\n      cursor: no-drop; }\n\ndiv .data {\n    background: antiquewhite;\n    border-radius: 5px; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var projects_ngx_scanner_face_mesh_src_public_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! projects/ngx-scanner-face-mesh/src/public_api */ "./projects/ngx-scanner-face-mesh/src/public_api.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(faces) {
        this.faces = faces;
        this.config = {
            mesh: {
                maxNumFaces: 5,
            },
        };
        this.faceResult = [];
    }
    AppComponent.prototype.handle = function (action, fn) {
        action[fn]().subscribe(function (res) { return console.log(fn + ': ' + res); });
    };
    AppComponent.prototype.onSelects = function (files) {
        var _this = this;
        this.faces.loadFiles(files, this.config).subscribe(function (res) { return _this.faceResult = res; });
    };
    AppComponent.prototype.event = function (e) {
        // console.log(e)
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [projects_ngx_scanner_face_mesh_src_public_api__WEBPACK_IMPORTED_MODULE_1__["NgxScannerFaceMeshService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _safe_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./safe.pipe */ "./src/app/safe.pipe.ts");
/* harmony import */ var projects_ngx_scanner_face_mesh_src_public_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! projects/ngx-scanner-face-mesh/src/public_api */ "./projects/ngx-scanner-face-mesh/src/public_api.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _safe_pipe__WEBPACK_IMPORTED_MODULE_3__["SafePipe"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                projects_ngx_scanner_face_mesh_src_public_api__WEBPACK_IMPORTED_MODULE_4__["NgxScannerFaceMeshModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/safe.pipe.ts":
/*!******************************!*\
  !*** ./src/app/safe.pipe.ts ***!
  \******************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Angular


/**
 * Sanitize HTML
 * Author: DaiDH
 */
var SafePipe = /** @class */ (function () {
    /**
     * Pipe Constructor
     *
     * @param _sanitizer: DomSanitezer
     */
    // tslint:disable-next-line
    function SafePipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * Transform
     *
     * @param value: string
     * @param type: string
     */
    SafePipe.prototype.transform = function (value, type) {
        switch (type) {
            case 'html':
                return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                return this._sanitizer.bypassSecurityTrustHtml(value);
        }
    };
    SafePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'safe',
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], SafePipe);
    return SafePipe;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\duong\Downloads\lib6\ngx-scanner-face-mesh-project\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map