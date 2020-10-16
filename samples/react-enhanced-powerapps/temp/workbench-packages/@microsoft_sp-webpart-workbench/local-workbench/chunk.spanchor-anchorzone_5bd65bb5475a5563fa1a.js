(window["webpackJsonpbdb0f5dd_3bb4_4b93_b12a_71aa9e20bb09_0_3_24"] = window["webpackJsonpbdb0f5dd_3bb4_4b93_b12a_71aa9e20bb09_0_3_24"] || []).push([["spanchor-anchorzone"],{

/***/ "+7YS":
/*!**************************************************!*\
  !*** ./lib/anchorZone/AnchorZone.module.scss.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./AnchorZone.module.css */ "T/MW");
var styles = {
    anchorLink: 'anchorLink_bee45622',
    absolutePosition: 'absolutePosition_bee45622',
    anchorIcon: 'anchorIcon_bee45622'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "GjHM":
/*!**************************************!*\
  !*** ./lib/anchorZone/AnchorZone.js ***!
  \**************************************/
/*! exports provided: AnchorZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorZone", function() { return AnchorZone; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AnchorZone_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnchorZone.module.scss */ "+7YS");
// Copyright (c) Microsoft. All rights reserved.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ANCHOR_ID_ATTRIBUTE_NAME = 'data-sp-anchor-id';
/**
 * A React component for automatically adding anchor icons in cases where we have to directly deal with vanilla HTML.
 * Since we don't know about where an anchor icon is needed in advance, so users will have to provide a CSS selector
 * to match all the HTMLElements where an anchor icon is needed. Currently ONLY stateless components are supported and
 * they should be provided to this component as its children.
 */
var AnchorZone = /** @class */ (function (_super) {
    __extends(AnchorZone, _super);
    function AnchorZone() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._addAnchorIcon = function (anchoredElement, anchorId, suggestAnchorId) {
            // It is possible that AnchorService.finishRegistration might be invoked multiple times
            // so there might already be an existing anchor icon for the anchoredElement
            if (!anchoredElement.lastElementChild || !AnchorZone._isElementAnchorIcon(anchoredElement.lastElementChild)) {
                anchoredElement.appendChild(AnchorZone._anchorIconElement);
            }
            _this._updateAnchorTargetAttributes(anchoredElement, anchorId, suggestAnchorId);
        };
        _this._updateAnchorTargetAttributes = function (targetElement, anchorId, suggestAnchorId) {
            var anchor = targetElement.lastElementChild;
            var targetUri = new _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_4__["Uri"](window.location.href);
            targetUri.setFragment(encodeURIComponent(anchorId));
            var href = targetUri.toString();
            targetElement.setAttribute('id', anchorId);
            anchor.setAttribute('role', 'link');
            anchor.setAttribute('aria-label', suggestAnchorId);
            anchor.setAttribute(ANCHOR_ID_ATTRIBUTE_NAME, anchorId);
            anchor.setAttribute('href', href);
            anchor.setAttribute('target', '_self');
            anchor.onclick = function () { _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEvent('AnchorZone.ClickAnchor'); };
        };
        _this._removeAnchorIcon = function (anchoredElement, anchorId) {
            if (anchoredElement.lastElementChild && AnchorZone._isElementAnchorIcon(anchoredElement.lastElementChild)) {
                anchoredElement.removeChild(anchoredElement.lastElementChild);
            }
        };
        return _this;
    }
    Object.defineProperty(AnchorZone, "_anchorIconElement", {
        get: function () {
            if (!AnchorZone._anchorIconElementCache) {
                var anchorIcon = document.createElement('i');
                anchorIcon.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_AnchorZone_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].anchorIcon, Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getIconClassName"])('Link'));
                anchorIcon.setAttribute('aria-hidden', 'true');
                AnchorZone._anchorIconElementCache = document.createElement('a');
                AnchorZone._anchorIconElementCache.classList.add(_AnchorZone_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].anchorLink);
                if (!_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Guid"].parse('1b7d9806-ce5d-4496-a984-e6ec6840ce82'), '10/25/2019', 'SOX_AnchorPositionAbsolute')) {
                    AnchorZone._anchorIconElementCache.classList.add(_AnchorZone_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].absolutePosition);
                }
                AnchorZone._anchorIconElementCache.appendChild(anchorIcon);
            }
            return AnchorZone._anchorIconElementCache.cloneNode(true);
        },
        enumerable: true,
        configurable: true
    });
    AnchorZone._isElementAnchorIcon = function (element) {
        return element.hasAttribute(ANCHOR_ID_ATTRIBUTE_NAME) &&
            element.classList.contains(_AnchorZone_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].anchorLink);
    };
    AnchorZone.prototype.componentDidMount = function () {
        this._registerAnchors();
    };
    AnchorZone.prototype.componentWillUnmount = function () {
        this._unregister(this.props.componentId);
    };
    AnchorZone.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { ref: this._resolveRef('_wrapperElement') }, this.props.children));
    };
    AnchorZone.prototype._registerAnchors = function () {
        var _this = this;
        if (this._wrapperElement) {
            var anchorElements = [].slice.call(this._wrapperElement.querySelectorAll(this.props.anchorElementSelector));
            this._register(this.props.componentId, anchorElements.map(function (anchorElement, index) {
                var suggestedAnchorId = _this.props.suggestAnchorId
                    ? _this.props.suggestAnchorId(anchorElement, index)
                    : anchorElement.innerText;
                return {
                    suggestedAnchorId: suggestedAnchorId,
                    anchorTargetElement: anchorElement,
                    onReceiveAnchorId: function (targetElement, anchorId) {
                        return _this._addAnchorIcon(targetElement, anchorId, suggestedAnchorId);
                    },
                    onDisposeAnchorId: _this._removeAnchorIcon
                };
            }));
        }
    };
    AnchorZone.prototype._register = function (uniqueId, anchorList) {
        var eventArgs = {
            action: "Register" /* Register */,
            uniqueId: uniqueId,
            anchorList: anchorList
        };
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.raiseEvent('anchorEvent', eventArgs);
    };
    AnchorZone.prototype._unregister = function (uniqueId) {
        var eventArgs = {
            action: "Unregister" /* Unregister */,
            uniqueId: uniqueId
        };
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["_SPEventManager"].instance.raiseEvent('anchorEvent', eventArgs);
    };
    return AnchorZone;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "MRhu":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/anchorZone/AnchorZone.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".anchorLink_bee45622{opacity:0;text-decoration:none;outline:0}.anchorLink_bee45622:focus,:focus>.anchorLink_bee45622,:hover>.anchorLink_bee45622{-webkit-transition:.1s linear;transition:.1s linear;opacity:1}.absolutePosition_bee45622{position:absolute}.anchorIcon_bee45622{font-style:normal;font-weight:400;font-size:16px}[dir=ltr] .anchorIcon_bee45622{margin-left:8px}[dir=rtl] .anchorIcon_bee45622{margin-right:8px}", ""]);



/***/ }),

/***/ "T/MW":
/*!**********************************************!*\
  !*** ./lib/anchorZone/AnchorZone.module.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./AnchorZone.module.css */ "MRhu");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "dvy9":
/*!*********************************!*\
  !*** ./lib/anchorZone/index.js ***!
  \*********************************/
/*! exports provided: AnchorZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnchorZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnchorZone */ "GjHM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnchorZone", function() { return _AnchorZone__WEBPACK_IMPORTED_MODULE_0__["AnchorZone"]; });




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

/***/ })

}]);
//# sourceMappingURL=chunk.spanchor-anchorzone_5bd65bb5475a5563fa1a.js.map