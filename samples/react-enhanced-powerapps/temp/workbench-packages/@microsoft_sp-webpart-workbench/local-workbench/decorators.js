define("f97266fb-ccb7-430e-9384-4124d05295d3_1.11.0", [], function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "mwqp");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/x7o":
/*!************************!*\
  !*** ./lib/virtual.js ***!
  \************************/
/*! exports provided: virtual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "virtual", function() { return virtual; });
// tslint:disable:no-any
/**
 * This decorator is applied to a class's member function or property.
 * It indicates that the definition may optionally be overridden in a
 * child class.  Conversely, if the \@virtual decorator is NOT applied to
 * a definition, then child classes may NOT override it.
 * This decorator is currently used for documentation purposes only.
 * In the future, it may be enforced at runtime.
 *
 * @public
 */
function virtual(target, propertyKey, descriptor) {
    // Eventually we may implement runtime validation (e.g. in DEBUG builds)
    // but currently this decorator is only used by the build tools.
}


/***/ }),

/***/ "m0i/":
/*!*************************!*\
  !*** ./lib/override.js ***!
  \*************************/
/*! exports provided: override */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "override", function() { return override; });
// tslint:disable:no-any
/**
 * This decorator is applied to a class's member function or property.
 * It indicates that the definition overrides another defintion (of the same name)
 * from the base class.  The base class definition must be marked as \@virtual.
 * This decorator is currently used for documentation purposes only.
 * In the future, it may be enforced at runtime.
 *
 * @public
 */
function override(target, propertyKey, descriptor) {
    // Eventually we may implement runtime validation (e.g. in DEBUG builds)
    // but currently this decorator is only used by the build tools.
}


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: virtual, sealed, override */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _virtual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtual */ "/x7o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "virtual", function() { return _virtual__WEBPACK_IMPORTED_MODULE_0__["virtual"]; });

/* harmony import */ var _sealed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sealed */ "ys2t");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sealed", function() { return _sealed__WEBPACK_IMPORTED_MODULE_1__["sealed"]; });

/* harmony import */ var _override__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./override */ "m0i/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "override", function() { return _override__WEBPACK_IMPORTED_MODULE_2__["override"]; });

/**
 * A conservative set of decorators intended for use in both NodeJS and web browser projects.
 *
 * @remarks
 * This package provides a small set of decorators that enable more rigorous specification
 * of API contracts when using the TypeScript language.  The intent is to better document
 * expected behaviors and catch common mistakes.  This package is not intended to be a
 * general toolkit of language extensions or helpful macros.
 *
 * @packagedocumentation
 */





/***/ }),

/***/ "ys2t":
/*!***********************!*\
  !*** ./lib/sealed.js ***!
  \***********************/
/*! exports provided: sealed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sealed", function() { return sealed; });
/**
 * This decorator is applied to a class (but NOT member function or property).
 * It indicates that subclasses must not inherit from this class.
 * This decorator is currently used for documentation purposes only.
 * In the future, it may be enforced at runtime.
 *
 * @public
 */
function sealed(target) {
    // Eventually we may implement runtime validation (e.g. in DEBUG builds)
    // but currently this decorator is only used by the build tools.
}


/***/ })

/******/ })});;
//# sourceMappingURL=decorators.js.map