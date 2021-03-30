define("5388ac31-7915-4ba6-a021-0f8808dd5784_0.0.1", ["@ms/sp-telemetry","@microsoft/office-ui-fabric-react-bundle","@microsoft/sp-lodash-subset","@microsoft/sp-core-library","react","react-dom","@microsoft/load-themed-styles","@microsoft/sp-diagnostics","resx-strings","@ms/odsp-utilities-bundle"], function(__WEBPACK_EXTERNAL_MODULE__2q6Q__, __WEBPACK_EXTERNAL_MODULE_KL1q__, __WEBPACK_EXTERNAL_MODULE_Pk8u__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_jOlS__, __WEBPACK_EXTERNAL_MODULE_ut3N__, __WEBPACK_EXTERNAL_MODULE_vpy3__, __WEBPACK_EXTERNAL_MODULE_y88i__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"sp-toolbox": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({"vendors~toolbox":"vendors~toolbox","toolbox":"toolbox"}[chunkId]||chunkId) + "_" + {"vendors~toolbox":"d0eea7378ee8acf07eb0","toolbox":"19eb8fb304d2da0a028b"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp_5388ac31_7915_4ba6_a021_0f8808dd5784_0_0_1"] = window["webpackJsonp_5388ac31_7915_4ba6_a021_0f8808dd5784_0_0_1"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Set the webpack public path
/******/ 	(function () {
/******/ 	  var scripts = document.getElementsByTagName('script');
/******/ 	  var regex = (typeof spScriptNamePattern !== 'undefined') ? spScriptNamePattern : new RegExp('\\/sp-toolbox(_[a-z0-9-]+)*\\.js', 'i');
/******/ 	  var publicPath;
/******/
/******/ 	  if (scripts && scripts.length) {
/******/ 	    for (var i = 0; i < scripts.length; i++) {
/******/ 	      if (!scripts[i]) continue;
/******/ 	      var path = scripts[i].getAttribute('src');
/******/ 	      if (path && path.match(regex)) {
/******/ 	        publicPath = path.substring(0, path.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/
/******/ 	  if (!publicPath) {
/******/ 	    for (var global in window.__setWebpackPublicPathLoaderSrcRegistry__) {
/******/ 	      if (global && global.match(regex)) {
/******/ 	        publicPath = global.substring(0, global.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/ 	  __webpack_require__.p = publicPath;
/******/ 	})();
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "mwqp");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+FXA":
/*!********************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemBase.js ***!
  \********************************************/
/*! exports provided: ToolboxItemBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemBase", function() { return ToolboxItemBase; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _legacy_lessText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../legacy/lessText */ "7fMg");
/* harmony import */ var _ToolboxItemBase_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxItemBase.module.scss */ "p2YA");




function ToolboxItemBase(props) {
    var _a;
    var imageProps = props.item.imageSrc ?
        { src: props.item.imageSrc, alt: props.item.displayName, imageFit: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["ImageFit"].contain }
        : undefined;
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["CommandButton"], { role: 'listitem', styles: { root: props.itemStyles }, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_ToolboxItemBase_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].item, props.itemClassName), ariaLabel: props.item.displayName, ariaDescription: props.item.description, title: props.item.description, onClick: function () { return props.onClick(props.item.id); }, "data-automation-id": props.item.id, "data-item-size": props['data-item-size'], disabled: props.item.disabled },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_ToolboxItemBase_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].flexBox, props.flexBoxClassName) },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["Icon"], { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_ToolboxItemBase_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].icon, props.iconClassName, (_a = {}, _a[_ToolboxItemBase_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].disabled] = props.item.disabled, _a)), iconName: props.item.msIconName, iconType: props.item.imageSrc ? _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["IconType"].Image : _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["IconType"].Default, imageProps: imageProps }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_legacy_lessText__WEBPACK_IMPORTED_MODULE_2__["LessText"], { text: props.item.displayName, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["css"])(_ToolboxItemBase_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].title, props.titleClassName), showTitle: true, lines: props.titleLineCount, omission: '…' }))));
}


/***/ }),

/***/ "+bKi":
/*!******************************!*\
  !*** ./lib/toolbox/index.js ***!
  \******************************/
/*! exports provided: Toolbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxOpenLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxOpenLayer */ "YTr9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toolbox", function() { return _ToolboxOpenLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxOpenLayer"]; });




/***/ }),

/***/ "/s7D":
/*!***************************************************!*\
  !*** ./lib/toolboxAnimation/animation.module.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./animation.module.css */ "m76H");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "2q6Q":
/*!***********************************!*\
  !*** external "@ms/sp-telemetry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2q6Q__;

/***/ }),

/***/ "3KoW":
/*!*******************************************!*\
  !*** ./lib/toolboxAnimation/animation.js ***!
  \*******************************************/
/*! exports provided: animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animation", function() { return animation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _animation_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation.module.scss */ "hbbw");




var currentMode = new WeakMap();
function animation(ToolboxComponent, // tslint:disable-line:variable-name
mode) {
    return /** @class */ (function (_super) {
        tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AnimationWrapper, _super);
        function AnimationWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AnimationWrapper.prototype.componentDidMount = function () {
            currentMode.set(this.props.controller, mode);
        };
        AnimationWrapper.prototype.render = function () {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](ToolboxComponent, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(this.props.className, this._animationClassName) })));
        };
        Object.defineProperty(AnimationWrapper.prototype, "_animationClassName", {
            get: function () {
                var previousMode = currentMode.get(this.props.controller) || 0 /* None */;
                var nextMode = mode;
                if (previousMode === 0 /* None */ && nextMode === 1 /* Loading */) {
                    return _animation_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].fromNoneToSmall;
                }
                else if (previousMode === 0 /* None */ && nextMode === 3 /* Small */) {
                    return _animation_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].fromNoneToSmall;
                }
                else if (previousMode === 3 /* Small */ && nextMode === 4 /* Large */) {
                    return _animation_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].fromSmallToLarge;
                }
                else if (previousMode === 4 /* Large */ && nextMode === 3 /* Small */) {
                    return _animation_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].fromLargeToSmall;
                }
                else {
                    return '';
                }
            },
            enumerable: true,
            configurable: true
        });
        return AnimationWrapper;
    }(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
}


/***/ }),

/***/ "4HRK":
/*!*****************************************!*\
  !*** ./lib/legacy/lessText/LessText.js ***!
  \*****************************************/
/*! exports provided: LessText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LessText", function() { return LessText; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LessText_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LessText.module.scss */ "Zl2I");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file LessText.tsx
 */




var DELAY_IN_MILLISECOND = 50;
// Note: Any changes in this file should be in sync with LessText in sp-canvas-toolbox project.
var LessText = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LessText, _super);
    function LessText(props) {
        var _this = _super.call(this, props) || this;
        _this._textArray = [];
        _this._textContainerElement = null; // tslint:disable-line:no-null-keyword
        _this._async = new _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Async"](_this);
        _this._eventGroup = new _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["EventGroup"](_this);
        _this._handleWindowResize = _this._async.debounce(_this._handleWindowResizeCore, DELAY_IN_MILLISECOND);
        return _this;
    }
    LessText.prototype.componentDidMount = function () {
        // Leverage `setTimeout` here to wait for the batch async styles are loaded.
        this._async.setTimeout(this.update, 0);
        this._eventGroup.on(window, 'resize', this._handleWindowResize);
    };
    LessText.prototype.componentDidUpdate = function () {
        this.update();
    };
    LessText.prototype.componentWillUnmount = function () {
        this._eventGroup.off(window, 'resize', this._handleWindowResize);
        this._eventGroup.dispose();
        this._async.dispose();
    };
    LessText.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { "data-automation-id": 'less-text', ref: function (ref) { return _this._textContainerElement = ref; }, title: this.props.showTitle ? this.props.text : undefined, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_LessText_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].lessText, this.props.className) }, this.props.text));
    };
    /**
     * Call update at runtime to truncate the text whenever on needs.
     */
    LessText.prototype.update = function () {
        if (this._textContainerElement) {
            this._async.requestAnimationFrame(this._truncateLines);
        }
    };
    Object.defineProperty(LessText.prototype, "_omission", {
        get: function () {
            return this.props.omission || '…';
        },
        enumerable: true,
        configurable: true
    });
    LessText.prototype._handleWindowResizeCore = function () {
        this.update();
    };
    Object.defineProperty(LessText.prototype, "_contentHeight", {
        get: function () {
            if (this._textContainerElement) {
                var contentStyles = window.getComputedStyle(this._textContainerElement);
                var padding = 0;
                if (contentStyles && contentStyles.paddingTop && contentStyles.paddingBottom) {
                    padding = parseFloat(contentStyles.paddingTop) + parseFloat(contentStyles.paddingBottom);
                }
                return this._textContainerElement.offsetHeight - padding;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    LessText.prototype._truncateLines = function () {
        if (!this._textContainerElement) {
            return;
        }
        var text = this.props.text || '';
        this._textContainerElement.textContent = text;
        var lines = Math.round(this.props.lines);
        var lineHeight = window
            .getComputedStyle(this._textContainerElement, undefined)
            .getPropertyValue('line-height');
        var maxHeight = lines * parseFloat(lineHeight);
        var currHeight = this._contentHeight;
        this._textArray = text.split('');
        var shouldTrim = currHeight > maxHeight && lines > 0;
        if (shouldTrim) {
            var trimmedLength = this._trimAndCalculateLength(currHeight, maxHeight);
            this._applyTextNumber(trimmedLength);
        }
    };
    LessText.prototype._trimAndCalculateLength = function (currentValue, maxValue) {
        var allowedTextNumber = this._textArray.length;
        if (!this._textContainerElement) {
            return allowedTextNumber;
        }
        var minTextNumber = 1, maxTextNumber = allowedTextNumber;
        do {
            var currentTextNumber = Math.floor((minTextNumber + maxTextNumber + 1) / 2);
            this._applyTextNumber(currentTextNumber);
            currentValue = this._contentHeight;
            if (currentValue > maxValue) {
                maxTextNumber = currentTextNumber - 1;
            }
            else {
                minTextNumber = currentTextNumber;
            }
        } while (minTextNumber < maxTextNumber);
        return minTextNumber;
    };
    LessText.prototype._applyTextNumber = function (newTextNumber) {
        var newText = this._textArray.slice(0, newTextNumber);
        var newTextJoined = newText.join('');
        if (this._textContainerElement) {
            this._textContainerElement.textContent = this._textContainerElement.textContent === newTextJoined
                ? newTextJoined
                : newTextJoined + this._omission;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], LessText.prototype, "update", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], LessText.prototype, "_truncateLines", null);
    return LessText;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "7fMg":
/*!**************************************!*\
  !*** ./lib/legacy/lessText/index.js ***!
  \**************************************/
/*! exports provided: LessText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DelayLessText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DelayLessText */ "fvWV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LessText", function() { return _DelayLessText__WEBPACK_IMPORTED_MODULE_0__["DelayLessText"]; });

/**
 * @copyright Microsoft Corporation. All rights reserved.
 */



/***/ }),

/***/ "9Mhb":
/*!**********************************************!*\
  !*** ./lib/toolboxLoading/ToolboxLoading.js ***!
  \**********************************************/
/*! exports provided: ToolboxLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxLoading", function() { return ToolboxLoading; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _toolboxCallout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toolboxCallout */ "GNkg");
/* harmony import */ var _ToolboxLoading_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxLoading.module.scss */ "Aecz");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file ToolboxLoading.tsx
 */




function ToolboxLoading(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_toolboxCallout__WEBPACK_IMPORTED_MODULE_2__["ToolboxCallout"], { className: props.className, onDismiss: props.onDismiss, target: props.calloutTarget, directionalHint: props.calloutDirectionalHint },
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["Spinner"], { size: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["SpinnerSize"].large, className: _ToolboxLoading_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].spinner })));
}


/***/ }),

/***/ "9qq0":
/*!****************************************!*\
  !*** ./lib/toolboxNone/ToolboxNone.js ***!
  \****************************************/
/*! exports provided: ToolboxNone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxNone", function() { return ToolboxNone; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toolboxSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolboxSearch */ "ZFqg");


function renderToolboxNone(props, searchContext) {
    if (searchContext.query) {
        // Clear the search query when we close the toolbox.
        searchContext.onFilterItems('', /* shouldDebounce */ false);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: props.className }));
}
function ToolboxNone(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_toolboxSearch__WEBPACK_IMPORTED_MODULE_1__["SearchConsumer"], null, function (searchContext) { return renderToolboxNone(props, searchContext); }));
}


/***/ }),

/***/ "A690":
/*!*************************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemFullBleed.module.scss.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxItemFullBleed.module.css */ "L96p");
var styles = {
    item: 'item_0de24490',
    icon: 'icon_0de24490',
    title: 'title_0de24490'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Aecz":
/*!**********************************************************!*\
  !*** ./lib/toolboxLoading/ToolboxLoading.module.scss.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxLoading.module.css */ "G8yu");
var styles = {
    spinner: 'spinner_4a4638e8'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "BwK8":
/*!**************************************************************!*\
  !*** ./lib/toolboxFullBleed/ToolboxFullBleed.module.scss.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxFullBleed.module.css */ "hgyZ");
var styles = {
    toolboxFullBleed: 'toolboxFullBleed_90c38781',
    header: 'header_90c38781'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "DqOB":
/*!**************************************************************!*\
  !*** ./lib/toolboxFullBleed/ToolboxFullBleedStrings.resx.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_6tOZemhV08aF1IgNDNeiwQ';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "FOnv":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxItem/ToolboxItemFullBleed.module.css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".item_0de24490{width:120px;height:88px}.icon_0de24490{font-size:28px;line-height:48px}.title_0de24490{font-size:13px}", ""]);



/***/ }),

/***/ "G8yu":
/*!******************************************************!*\
  !*** ./lib/toolboxLoading/ToolboxLoading.module.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxLoading.module.css */ "JYhW");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "GNkg":
/*!*************************************!*\
  !*** ./lib/toolboxCallout/index.js ***!
  \*************************************/
/*! exports provided: ToolboxCallout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxCallout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxCallout */ "Va9i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxCallout", function() { return _ToolboxCallout__WEBPACK_IMPORTED_MODULE_0__["ToolboxCallout"]; });




/***/ }),

/***/ "Io2d":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxFullBleed/ToolboxFullBleed.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".toolboxFullBleed_90c38781{text-align:center;margin:100px auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.header_90c38781{color:\"[theme:neutralSecondary, default: #605e5c]\";font-weight:600;letter-spacing:1px;line-height:32px;padding:0 12px}", ""]);



/***/ }),

/***/ "JYhW":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxLoading/ToolboxLoading.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".spinner_4a4638e8{margin:0;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}", ""]);



/***/ }),

/***/ "KL1q":
/*!***********************************************************!*\
  !*** external "@microsoft/office-ui-fabric-react-bundle" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KL1q__;

/***/ }),

/***/ "Kdsx":
/*!**************************************************!*\
  !*** ./lib/toolboxFullBleed/ToolboxFullBleed.js ***!
  \**************************************************/
/*! exports provided: ToolboxFullBleed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxFullBleed", function() { return ToolboxFullBleed; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _toolboxItem_ToolboxItemFullBleed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toolboxItem/ToolboxItemFullBleed */ "bDLt");
/* harmony import */ var _ToolboxFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToolboxFullBleed.module.scss */ "BwK8");
/* harmony import */ var _ToolboxFullBleedStrings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToolboxFullBleedStrings.resx */ "DqOB");



// Path import to avoid bundle the whole toolbox item folder.



var ToolboxFullBleed = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxFullBleed, _super);
    function ToolboxFullBleed(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this._getState(props.items);
        return _this;
    }
    ToolboxFullBleed.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState(this._getState(nextProps.items));
        }
    };
    ToolboxFullBleed.prototype.render = function () {
        var _this = this;
        var fullBleedToolboxItems = this.props.items
            .map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_toolboxItem_ToolboxItemFullBleed__WEBPACK_IMPORTED_MODULE_3__["ToolboxItemFullBleed"], { key: item.id, item: item, onClick: _this._handleClickItem })); });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("section", { className: _ToolboxFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toolboxFullBleed, "aria-label": _ToolboxFullBleedStrings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ToolboxGroupNameFullWidth, role: 'group' },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("header", { className: _ToolboxFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].header }, _ToolboxFullBleedStrings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ToolboxGroupNameFullWidth),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZone"], { direction: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusZoneDirection"].horizontal, isCircularNavigation: true }, fullBleedToolboxItems)));
    };
    ToolboxFullBleed.prototype._getState = function (items) {
        return {
            mapToolboxItemIdToCanvasControl: new Map(items.map(function (map) { return [map.id, map.itemData]; }))
        };
    };
    ToolboxFullBleed.prototype._handleClickItem = function (toolboxItemId) {
        var itemData = this.state.mapToolboxItemIdToCanvasControl.get(toolboxItemId);
        if (!itemData) {
            // It is clicking on an non-existing toolbox item. How does it happen?
            return;
        }
        this.props.clickItem(itemData);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxFullBleed.prototype, "_handleClickItem", null);
    return ToolboxFullBleed;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "Kjlv":
/*!************************************************************!*\
  !*** ./lib/toolboxLoading/ToolboxLoadingAnimationLayer.js ***!
  \************************************************************/
/*! exports provided: ToolboxLoadingAnimationLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxLoadingAnimationLayer", function() { return ToolboxLoadingAnimationLayer; });
/* harmony import */ var _toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toolboxAnimation */ "Xs01");
/* harmony import */ var _ToolboxLoading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxLoading */ "9Mhb");


// tslint:disable-next-line:variable-name
var ToolboxLoadingAnimationLayer = Object(_toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__["animation"])(_ToolboxLoading__WEBPACK_IMPORTED_MODULE_1__["ToolboxLoading"], 1 /* Loading */);


/***/ }),

/***/ "L96p":
/*!*********************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemFullBleed.module.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxItemFullBleed.module.css */ "FOnv");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "NlNq":
/*!******************************************************!*\
  !*** ./lib/toolboxNone/ToolboxNoneAnimationLayer.js ***!
  \******************************************************/
/*! exports provided: ToolboxNoneAnimationLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxNoneAnimationLayer", function() { return ToolboxNoneAnimationLayer; });
/* harmony import */ var _toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toolboxAnimation */ "Xs01");
/* harmony import */ var _ToolboxNone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolboxNone */ "9qq0");


// tslint:disable-next-line:variable-name
var ToolboxNoneAnimationLayer = Object(_toolboxAnimation__WEBPACK_IMPORTED_MODULE_0__["animation"])(_ToolboxNone__WEBPACK_IMPORTED_MODULE_1__["ToolboxNone"], 0 /* None */);


/***/ }),

/***/ "NpD7":
/*!*************************************!*\
  !*** ./lib/toolboxLoading/index.js ***!
  \*************************************/
/*! exports provided: ToolboxLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxLoadingAnimationLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxLoadingAnimationLayer */ "Kjlv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxLoading", function() { return _ToolboxLoadingAnimationLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxLoadingAnimationLayer"]; });




/***/ }),

/***/ "Pk8u":
/*!**********************************************!*\
  !*** external "@microsoft/sp-lodash-subset" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Pk8u__;

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "Va9i":
/*!**********************************************!*\
  !*** ./lib/toolboxCallout/ToolboxCallout.js ***!
  \**********************************************/
/*! exports provided: ToolboxCallout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxCallout", function() { return ToolboxCallout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Currently we're rendering the same width for all types of toolboxes, so it's hard coded here.
 * But if later we want to have different width per instances, we can refactor this out.
 */
var TOOLBOX_CALLOUT_WIDTH = 292;
/**
 * The min-height of callout.
 */
var TOOLBOX_CALLOUT_MIN_HEIGHT = 40;
function ToolboxCallout(props) {
    var focusTrapZoneProps = {
        isClickableOutsideFocusTrap: true,
        ignoreExternalFocusing: false,
        'data-sp-a11y-skipkeys': 'all',
        'data-automation-id': 'toolbox-callout'
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["FocusTrapCallout"], { onDismiss: props.onDismiss, target: props.target, directionalHint: props.directionalHint, calloutWidth: TOOLBOX_CALLOUT_WIDTH, styles: { calloutMain: { minHeight: TOOLBOX_CALLOUT_MIN_HEIGHT } }, setInitialFocus: false, focusTrapProps: focusTrapZoneProps }, props.children));
}


/***/ }),

/***/ "W5q4":
/*!******************************************!*\
  !*** ./lib/toolboxSearch/Search.resx.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This file was generated by a tool. Modifying it will produce unexpected behavior.
 */
var key = '_z2ZwCbA+UxeGBoG5w1HCOA';
var allStrings = ( false) ?
    undefined :
    __webpack_require__(/*! resx-strings */ "vpy3");
var strings = allStrings[key];
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "Xs01":
/*!***************************************!*\
  !*** ./lib/toolboxAnimation/index.js ***!
  \***************************************/
/*! exports provided: animation, animationStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ "3KoW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animation", function() { return _animation__WEBPACK_IMPORTED_MODULE_0__["animation"]; });

/* harmony import */ var _animation_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation.module.scss */ "hbbw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationStyles", function() { return _animation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "YTr9":
/*!*****************************************!*\
  !*** ./lib/toolbox/ToolboxOpenLayer.js ***!
  \*****************************************/
/*! exports provided: ToolboxOpenLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxOpenLayer", function() { return ToolboxOpenLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _toolboxLoading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toolboxLoading */ "NpD7");
/* harmony import */ var _toolboxNone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../toolboxNone */ "hTTM");






var TOOLBOX_FOCUS_IDENTIFIER = 'ToolboxFocus';
var ToolboxOpenLayer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ToolboxOpenLayer, _super);
    function ToolboxOpenLayer(props) {
        var _this = _super.call(this, props) || this;
        /**
         * The controller `object` to store context in the toolbox React render tree.
         * We currently use this `object` as the key to store the animation state during switching toolbox.
         * It is pending to refactor and leverage React context to share the state instead of using this `object`.
         */
        _this._controller = {};
        _this._asyncCount = 1;
        _this._openWebPartToolbox = function (calloutTarget, calloutDirectionalHint) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('Toolbox.Open');
            _this._openToolbox(calloutTarget, calloutDirectionalHint, _this._loadWebpartToolbox);
        };
        _this._openSectionToolbox = function (calloutTarget, calloutDirectionalHint) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent('ToolboxSection.Open');
            _this._openToolbox(calloutTarget, calloutDirectionalHint, _this._loadSectionToolbox);
        };
        _this._openToolbox = function (calloutTarget, calloutDirectionalHint, loadToolbox) {
            _this.props.a11yManager.saveActiveElementAs(TOOLBOX_FOCUS_IDENTIFIER);
            _this.setState({
                calloutTarget: calloutTarget,
                calloutDirectionalHint: calloutDirectionalHint,
                toolbox: undefined // Avoid rendering on old toolbox instance before toolbox loads.
            });
            _this._loadToolbox(loadToolbox);
        };
        _this.state = {
            verticalPosition: undefined,
            horizontalPosition: undefined,
            toolbox: undefined,
            calloutTarget: undefined,
            calloutDirectionalHint: undefined
        };
        return _this;
    }
    ToolboxOpenLayer.prototype.componentDidMount = function () {
        this._updateInstanceRef();
    };
    ToolboxOpenLayer.prototype.componentWillUnmount = function () {
        this.props.instanceRef(undefined);
    };
    ToolboxOpenLayer.prototype.render = function () {
        if (this._shouldRenderToolboxNone) {
            return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_toolboxNone__WEBPACK_IMPORTED_MODULE_5__["ToolboxNone"], { className: '', controller: this._controller }));
        }
        else if (!this.state.toolbox) {
            return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_toolboxLoading__WEBPACK_IMPORTED_MODULE_4__["ToolboxLoading"], { className: '', controller: this._controller, calloutTarget: this.state.calloutTarget, calloutDirectionalHint: this.state.calloutDirectionalHint, onDismiss: this._closeToolbox }));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"](this.state.toolbox, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { controller: this._controller, onCloseToolbox: this._closeToolbox, calloutTarget: this.state.calloutTarget, calloutDirectionalHint: this.state.calloutDirectionalHint, onDismiss: this._closeToolbox })));
        }
    };
    ToolboxOpenLayer.prototype._updateInstanceRef = function () {
        // Not expose the component instance or controller, only expose an object with necessary APIs.
        this.props.instanceRef({
            openWebPartToolbox: this._openWebPartToolbox,
            openSectionToolbox: this._openSectionToolbox,
            closeToolbox: this._closeToolbox
        });
    };
    Object.defineProperty(ToolboxOpenLayer.prototype, "_shouldRenderToolboxNone", {
        get: function () {
            return !this.state.calloutTarget;
        },
        enumerable: true,
        configurable: true
    });
    ToolboxOpenLayer.prototype._loadToolbox = function (loadToolbox) {
        var _this = this;
        var asyncCount = ++this._asyncCount;
        loadToolbox()
            .then(function (toolbox) {
            _this._markToolboxItemLayer();
            if (asyncCount === _this._asyncCount) {
                // To avoid style flashing, toolbox component is resolved after the style is really loaded.
                setTimeout(function () { return _this.setState({ toolbox: toolbox }); });
            }
        })
            .catch(function () {
            _this._markToolboxItemLayer();
        });
    };
    ToolboxOpenLayer.prototype._closeToolbox = function () {
        var _this = this;
        this.setState(function (state) {
            if (state.calloutTarget) {
                if (_this.props.onCloseToolbox) {
                    _this.props.onCloseToolbox();
                }
                else {
                    // No-op if the toolbox has closed. When switch the display mode from Edit to Read, the canvas is calling
                    // `closeToolbox` to ensure the toolbox is closed in Read mode.
                }
            }
            return {
                calloutTarget: undefined,
                calloutDirectionalHint: undefined
            };
        });
    };
    ToolboxOpenLayer.prototype._loadWebpartToolbox = function () {
        var monitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ToolboxLoad');
        return Promise.all(/*! import() | toolbox */[__webpack_require__.e("vendors~toolbox"), __webpack_require__.e("toolbox")]).then(__webpack_require__.bind(null, /*! ./ToolboxItemsLayer */ "GqUw"))
            .then(function (_a) {
            var ToolboxItemsLayer = _a.ToolboxItemsLayer;
            monitor.writeSuccess();
            return ToolboxItemsLayer;
        })
            .catch(function (error) {
            monitor.writeUnexpectedFailure('Failure', error);
            throw error;
        });
    };
    ToolboxOpenLayer.prototype._loadSectionToolbox = function () {
        var monitor = new _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_2__["_QosMonitor"]('ToolboxSection.Load');
        return Promise.all(/*! import() | toolbox */[__webpack_require__.e("vendors~toolbox"), __webpack_require__.e("toolbox")]).then(__webpack_require__.bind(null, /*! ../toolboxSection */ "wPTN"))
            .then(function (_a) {
            var ToolboxSection = _a.ToolboxSection;
            monitor.writeSuccess();
            return ToolboxSection;
        })
            .catch(function (error) {
            monitor.writeUnexpectedFailure('Failure', error);
            throw error;
        });
    };
    ToolboxOpenLayer.prototype._markToolboxItemLayer = function () {
        if (this.props.componentPerfLogger) {
            this.props.componentPerfLogger.markStage('ToolboxRender', 'ToolboxItemsLayerRender');
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], ToolboxOpenLayer.prototype, "_closeToolbox", null);
    return ToolboxOpenLayer;
}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]));



/***/ }),

/***/ "ZFqg":
/*!************************************!*\
  !*** ./lib/toolboxSearch/index.js ***!
  \************************************/
/*! exports provided: SearchProvider, SearchConsumer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ "b5IY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchProvider", function() { return _Search__WEBPACK_IMPORTED_MODULE_0__["SearchProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchConsumer", function() { return _Search__WEBPACK_IMPORTED_MODULE_0__["SearchConsumer"]; });




/***/ }),

/***/ "Zl2I":
/*!*****************************************************!*\
  !*** ./lib/legacy/lessText/LessText.module.scss.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./LessText.module.css */ "yHX3");
var styles = {
    lessText: 'lessText_9f618ebf'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "b5IY":
/*!*************************************!*\
  !*** ./lib/toolboxSearch/Search.js ***!
  \*************************************/
/*! exports provided: SearchConsumer, SearchProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchConsumer", function() { return SearchConsumer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchProvider", function() { return SearchProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ms/sp-telemetry */ "2q6Q");
/* harmony import */ var _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Search_resx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Search.resx */ "W5q4");








var FILTER_DELAY_MS = 400;
var context = react__WEBPACK_IMPORTED_MODULE_6__["createContext"]({
    query: '',
    items: [],
    onFilterItems: _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["noop"]
});
// tslint:disable-next-line:variable-name
var SearchConsumer = context.Consumer;
var SearchProvider = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SearchProvider, _super);
    function SearchProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            queryToDisplay: '',
            queryToFilter: ''
        };
        _this._updateQueryToFilterDebounce = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["debounce"])(_this._updateQueryToFilter, FILTER_DELAY_MS);
        return _this;
    }
    SearchProvider._filterItems = function (queryToFilter, allItems) {
        var filteredItems = allItems.filter(function (item) { return (item.displayName.toLowerCase().indexOf(queryToFilter) > -1 ||
            item.description.toLowerCase().indexOf(queryToFilter) > -1); });
        return filteredItems;
    };
    SearchProvider.prototype.componentDidMount = function () {
        // It is always all items when the `SearchProvider` is mount.
        this._alertItemCount(this.props.items);
    };
    SearchProvider.prototype.componentWillUnmount = function () {
        this._updateQueryToFilterDebounce.cancel();
    };
    SearchProvider.prototype.render = function () {
        // This is not a memorized object, so it will trigger consumer re-render on each render call.
        // The consumers are responsive to compare the search context value to determine if render is necessary.
        // Read more: https://reactjs.org/docs/context.html#contextprovider
        var searchContext = {
            query: this.state.queryToDisplay,
            items: SearchProvider._filterItems(this.state.queryToFilter, this.props.items),
            onFilterItems: this._handleFilterItems
        };
        return (react__WEBPACK_IMPORTED_MODULE_6__["createElement"](context.Provider, { value: searchContext }, this.props.children));
    };
    SearchProvider.prototype._handleFilterItems = function (query, shouldDebounce, source) {
        // The search input box is React managed, it uses the `queryToDisplay` state to update its value.
        // So, it is by design to always update the `queryToDisplay` state without debounce.
        this.setState({
            queryToDisplay: query
        });
        if (shouldDebounce) {
            this._updateQueryToFilterDebounce(query, source);
        }
        else {
            this._updateQueryToFilter(query, source);
        }
    };
    SearchProvider.prototype._updateQueryToFilter = function (query, source) {
        var queryToFilter = query.toLowerCase();
        this.setState({ queryToFilter: queryToFilter });
        var filteredItems = SearchProvider._filterItems(queryToFilter, this.props.items);
        this._alertItemCount(filteredItems);
        if (source) {
            _ms_sp_telemetry__WEBPACK_IMPORTED_MODULE_5__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogEntry"](SearchProvider._logSource.id, 'SearchResult', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogType"].Event, {
                source: source,
                queryLength: queryToFilter.length.toString(),
                itemCount: filteredItems.length.toString()
            }));
        }
    };
    SearchProvider.prototype._alertItemCount = function (items) {
        this.props.a11yManager.alert(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["StringHelper"].formatWithLocalizedCountValue(_Search_resx__WEBPACK_IMPORTED_MODULE_7__["default"].SearchResultAlert, _Search_resx__WEBPACK_IMPORTED_MODULE_7__["default"].SearchResultAlertIntervals, items.length));
    };
    SearchProvider._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_LogSource"].create('Toolbox');
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], SearchProvider.prototype, "_handleFilterItems", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["memoize"]
    ], SearchProvider, "_filterItems", null);
    return SearchProvider;
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]));



/***/ }),

/***/ "bDLt":
/*!*************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemFullBleed.js ***!
  \*************************************************/
/*! exports provided: ToolboxItemFullBleed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolboxItemFullBleed", function() { return ToolboxItemFullBleed; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolboxItemBase */ "+FXA");
/* harmony import */ var _ToolboxItemFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolboxItemFullBleed.module.scss */ "A690");




function ToolboxItemFullBleed(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ToolboxItemBase__WEBPACK_IMPORTED_MODULE_2__["ToolboxItemBase"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { titleLineCount: 2, itemClassName: _ToolboxItemFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].item, iconClassName: _ToolboxItemFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].icon, titleClassName: _ToolboxItemFullBleed_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].title })));
}


/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "dYwi":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxItem/ToolboxItemBase.module.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".item_d0930f9c{margin:0;padding:0;border:1px solid transparent;background-clip:padding-box}.item_d0930f9c:focus,.item_d0930f9c:hover{background-color:\"[theme:themeLighter, default: #deecf9]\"}.item_d0930f9c:focus *,.item_d0930f9c:hover *{color:\"[theme:themeDarkAlt, default: #106ebe]\"}@media screen and (-ms-high-contrast:active){.item_d0930f9c:focus,.item_d0930f9c:hover{color:#1aebff}}@media screen and (-ms-high-contrast:black-on-white){.item_d0930f9c:focus,.item_d0930f9c:hover{color:#37006e}}.flexBox_d0930f9c{width:100%;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.icon_d0930f9c{color:\"[theme:neutralPrimary, default: #323130]\"}.icon_d0930f9c .ms-Image{width:100%;height:100%}.icon_d0930f9c.disabled_d0930f9c{color:\"[theme:neutralTertiary, default: #a19f9d]\"}.title_d0930f9c{max-width:100%;color:\"[theme:neutralSecondary, default: #605e5c]\";font-weight:400;line-height:17px}", ""]);



/***/ }),

/***/ "fX/U":
/*!***************************************!*\
  !*** ./lib/toolboxFullBleed/index.js ***!
  \***************************************/
/*! exports provided: ToolboxFullBleed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxFullBleed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxFullBleed */ "Kdsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxFullBleed", function() { return _ToolboxFullBleed__WEBPACK_IMPORTED_MODULE_0__["ToolboxFullBleed"]; });




/***/ }),

/***/ "faye":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_faye__;

/***/ }),

/***/ "fvWV":
/*!**********************************************!*\
  !*** ./lib/legacy/lessText/DelayLessText.js ***!
  \**********************************************/
/*! exports provided: DelayLessText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelayLessText", function() { return DelayLessText; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LessText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LessText */ "4HRK");
/* harmony import */ var _LessText_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LessText.module.scss */ "Zl2I");





var DelayLessText = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DelayLessText, _super);
    function DelayLessText(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            render: false
        };
        _this._timeout = _this._deferRender();
        return _this;
    }
    DelayLessText.prototype.componentWillUnmount = function () {
        clearTimeout(this._timeout);
    };
    DelayLessText.prototype.render = function () {
        if (this.state.render) {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_LessText__WEBPACK_IMPORTED_MODULE_3__["LessText"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props)));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", { "data-automation-id": 'less-text', className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_LessText_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].lessText, this.props.className) }, this.props.text));
        }
    };
    DelayLessText.prototype._deferRender = function () {
        var _this = this;
        // We need to wait 300ms to let the size change animation completes.
        return window.setTimeout(function () {
            _this.setState({
                render: true
            });
        }, 300);
    };
    return DelayLessText;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "hTTM":
/*!**********************************!*\
  !*** ./lib/toolboxNone/index.js ***!
  \**********************************/
/*! exports provided: ToolboxNone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToolboxNoneAnimationLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolboxNoneAnimationLayer */ "NlNq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxNone", function() { return _ToolboxNoneAnimationLayer__WEBPACK_IMPORTED_MODULE_0__["ToolboxNoneAnimationLayer"]; });




/***/ }),

/***/ "hbbw":
/*!*******************************************************!*\
  !*** ./lib/toolboxAnimation/animation.module.scss.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./animation.module.css */ "/s7D");
var styles = {
    fromNoneToSmall: 'fromNoneToSmall_20137c47',
    upIn: 'upIn_20137c47',
    fromNoneToSmallUpIn: 'fromNoneToSmallUpIn_20137c47',
    downIn: 'downIn_20137c47',
    fromNoneToSmallDownInLTR: 'fromNoneToSmallDownInLTR_20137c47',
    fromNoneToSmallDownInRTL: 'fromNoneToSmallDownInRTL_20137c47',
    fromSmallToLarge: 'fromSmallToLarge_20137c47',
    fromLargeToSmall: 'fromLargeToSmall_20137c47'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "hgyZ":
/*!**********************************************************!*\
  !*** ./lib/toolboxFullBleed/ToolboxFullBleed.module.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxFullBleed.module.css */ "Io2d");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "j2/K":
/*!*******************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "jOlS":
/*!************************************************!*\
  !*** external "@microsoft/load-themed-styles" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jOlS__;

/***/ }),

/***/ "m76H":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/toolboxAnimation/animation.module.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, "@-webkit-keyframes fromNoneToSmallUpIn_20137c47{0%{height:30px}to{height:330px}}@keyframes fromNoneToSmallUpIn_20137c47{0%{height:30px}to{height:330px}}@-webkit-keyframes fromNoneToSmallDownInLTR_20137c47{0%{height:30px;-webkit-transform:translate(-50%,300px);transform:translate(-50%,300px)}to{height:330px;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes fromNoneToSmallDownInLTR_20137c47{0%{height:30px;-webkit-transform:translate(-50%,300px);transform:translate(-50%,300px)}to{height:330px;-webkit-transform:translate(-50%);transform:translate(-50%)}}@-webkit-keyframes fromNoneToSmallDownInRTL_20137c47{0%{height:30px;-webkit-transform:translate(50%,300px);transform:translate(50%,300px)}to{height:330px;-webkit-transform:translate(50%);transform:translate(50%)}}@keyframes fromNoneToSmallDownInRTL_20137c47{0%{height:30px;-webkit-transform:translate(50%,300px);transform:translate(50%,300px)}to{height:330px;-webkit-transform:translate(50%);transform:translate(50%)}}@-webkit-keyframes fromSmallToLarge_20137c47{0%{-webkit-transform:scale(.2);transform:scale(.2)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes fromSmallToLarge_20137c47{0%{-webkit-transform:scale(.2);transform:scale(.2)}to{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes fromLargeToSmall_20137c47{0%{width:1024px;height:712px}to{width:292px;height:330px}}@keyframes fromLargeToSmall_20137c47{0%{width:1024px;height:712px}to{width:292px;height:330px}}.fromNoneToSmall_20137c47.upIn_20137c47{-webkit-animation:fromNoneToSmallUpIn_20137c47 .3s;animation:fromNoneToSmallUpIn_20137c47 .3s}[dir=ltr] .fromNoneToSmall_20137c47.downIn_20137c47{-webkit-animation:fromNoneToSmallDownInLTR_20137c47 .3s;animation:fromNoneToSmallDownInLTR_20137c47 .3s}[dir=rtl] .fromNoneToSmall_20137c47.downIn_20137c47{-webkit-animation:fromNoneToSmallDownInRTL_20137c47 .3s;animation:fromNoneToSmallDownInRTL_20137c47 .3s}.fromSmallToLarge_20137c47{-webkit-animation:fromSmallToLarge_20137c47 .3s;animation:fromSmallToLarge_20137c47 .3s;overflow:hidden}.fromLargeToSmall_20137c47{-webkit-animation:fromLargeToSmall_20137c47 .3s;animation:fromLargeToSmall_20137c47 .3s}", ""]);



/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: Toolbox, ToolboxFullBleed, LessText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toolbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbox */ "+bKi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toolbox", function() { return _toolbox__WEBPACK_IMPORTED_MODULE_0__["Toolbox"]; });

/* harmony import */ var _toolboxFullBleed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolboxFullBleed */ "fX/U");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToolboxFullBleed", function() { return _toolboxFullBleed__WEBPACK_IMPORTED_MODULE_1__["ToolboxFullBleed"]; });

/* harmony import */ var _legacy_lessText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./legacy/lessText */ "7fMg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LessText", function() { return _legacy_lessText__WEBPACK_IMPORTED_MODULE_2__["LessText"]; });

/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * Canvas Toolbox modules index
 */





/***/ }),

/***/ "p2YA":
/*!********************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemBase.module.scss.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ToolboxItemBase.module.css */ "t5nO");
var styles = {
    item: 'item_d0930f9c',
    flexBox: 'flexBox_d0930f9c',
    icon: 'icon_d0930f9c',
    disabled: 'disabled_d0930f9c',
    title: 'title_d0930f9c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "t5nO":
/*!****************************************************!*\
  !*** ./lib/toolboxItem/ToolboxItemBase.module.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./ToolboxItemBase.module.css */ "dYwi");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "tCkv":
/*!************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/tslib/1.10.0/node_modules/tslib/tslib.es6.js ***!
  \************************************************************************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "ut3N":
/*!********************************************!*\
  !*** external "@microsoft/sp-diagnostics" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ut3N__;

/***/ }),

/***/ "vpy3":
/*!*******************************!*\
  !*** external "resx-strings" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vpy3__;

/***/ }),

/***/ "y88i":
/*!********************************************!*\
  !*** external "@ms/odsp-utilities-bundle" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_y88i__;

/***/ }),

/***/ "yHX3":
/*!*************************************************!*\
  !*** ./lib/legacy/lessText/LessText.module.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./LessText.module.css */ "zOOP");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "zOOP":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/legacy/lessText/LessText.module.css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".lessText_9f618ebf{word-wrap:break-word!important}", ""]);



/***/ })

/******/ })});;
//# sourceMappingURL=sp-toolbox.js.map