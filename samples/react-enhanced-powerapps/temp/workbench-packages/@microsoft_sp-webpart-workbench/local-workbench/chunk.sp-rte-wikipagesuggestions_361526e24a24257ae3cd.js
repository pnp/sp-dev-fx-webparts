(window["webpackJsonp_8404d628_4817_4b3a_883e_1c5a4d07892e_1_11_0"] = window["webpackJsonp_8404d628_4817_4b3a_883e_1c5a4d07892e_1_11_0"] || []).push([["sp-rte-wikipagesuggestions"],{

/***/ "C8MH":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/rte/ckeditor/CKPagePicker.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".suggestionItemContainer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;position:relative;max-height:30px}.suggestionItemContainer:hover{background-color:\"[theme:neutralLighter, default: #f3f2f1]\"!important}.suggestionItemContainer .pageLabel{color:\"[theme:neutralPrimary, default: #323130]\";font-size:14px;-webkit-font-smoothing:antialiased;font-weight:400;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.cke_autocomplete_selected{background-color:\"[theme:neutralLight, default: #edebe9]\"!important}.cke_autocomplete_selected:hover{background-color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"!important}.cke_autocomplete_panel{background:\"[theme:white, default: #ffffff]\"!important;font:14px Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif!important;min-width:360px;overflow-x:hidden!important;-webkit-box-sizing:border-box!important;box-sizing:border-box!important;-webkit-box-shadow:rgba(0,0,0,.4) 0 0 5px 0!important;box-shadow:0 0 5px 0 rgba(0,0,0,.4)!important;border-radius:0!important;border:1px solid \"[theme:neutrallight, default: #edebe9]\"!important;outline:transparent;visibility:visible;max-height:300px!important}", ""]);



/***/ }),

/***/ "SnrF":
/*!***********************************************!*\
  !*** ./lib/rte/ckeditor/CKPagePicker.scss.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CKPagePicker.css */ "topo");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "n2+o":
/*!*************************************************!*\
  !*** ./lib/rte/ckeditor/WikiPageSuggestions.js ***!
  \*************************************************/
/*! exports provided: WikiPageSuggestions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WikiPageSuggestions", function() { return WikiPageSuggestions; });
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../baseRte/BaseRte */ "oubO");
/* harmony import */ var _common_MatchLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/MatchLink */ "nwhz");
/* harmony import */ var _CKPagePicker_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CKPagePicker.scss */ "SnrF");




var WikiPageSuggestions = /** @class */ (function () {
    function WikiPageSuggestions() {
    }
    WikiPageSuggestions.separator = '|';
    WikiPageSuggestions.endShortcut = ']]';
    WikiPageSuggestions.pagePickerCallback = function (rte, tagName, matchInfo, callback) {
        var qosMonitor = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"]('PagePickerSuggestions');
        var title = matchInfo.query.substring(2).trim();
        if (!title.length) { // no query yet
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent(tagName + 'OpenPagePickerCalloutByKeyboardShortcut');
            callback(rte.recentPages);
        }
        else { // picker with title as query, no '|' input
            callback(rte.prevSuggestions || []);
            var previousSuggestions = rte.getPageSuggestions(title)
                .then(function (links) {
                var autoSuggestions = _baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__["BaseRte"].makePageSuggestions(links, false);
                callback(autoSuggestions);
                qosMonitor.writeSuccess();
                return autoSuggestions;
            })
                .catch(function (error) {
                qosMonitor.writeUnexpectedFailure('SearchPagesFail', error);
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__["BaseRte"].logSource, error);
                return rte.recentPages;
            });
            return previousSuggestions;
        }
    };
    WikiPageSuggestions.insertLinkCallback = function (rte, editor, tagName, matchInfo) {
        var inputs = matchInfo.text.split(WikiPageSuggestions.separator);
        var title = inputs[0].substring(2).trim();
        var url = inputs[1];
        if (url && url.slice(-2) === WikiPageSuggestions.endShortcut) { // closed brackets with url
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent(tagName + 'CreateExternalLinkByKeyboardShortcut');
            url = _common_MatchLink__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeUrl(url.slice(0, -2).trim());
            if (url) {
                editor.format(matchInfo.range.endOffset, matchInfo.range.endOffset, {
                    link: url,
                    linkText: title,
                    shouldOpenInNewTab: false
                });
                editor.deleteContentsInContainer(_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__["BaseRte"]._PAGE_LINKING_REGEX, matchInfo.range.startContainer);
                return url;
            }
        }
        else if (title && title.slice(-2) === WikiPageSuggestions.endShortcut) { // closed brackets with only title
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_EngagementLogger"].logEvent(tagName + 'CreateNewPageLinkByKeyboardShortcut.KeyDown');
            // title could be something like 'my page]]', this changes that to 'my page'
            title = title.slice(0, -2).trim();
            rte.getPredictedUrl(title).then(function (predictedUrl) {
                matchInfo.range.extractContents();
                editor.format(matchInfo.range.endOffset, matchInfo.range.endOffset, {
                    link: predictedUrl,
                    linkText: title,
                    shouldOpenInNewTab: false,
                    linkPlaceHolder: title
                });
            }).catch(function (error) {
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_TraceLogger"].logError(_baseRte_BaseRte__WEBPACK_IMPORTED_MODULE_1__["BaseRte"].logSource, error);
            });
        }
    };
    return WikiPageSuggestions;
}());



/***/ }),

/***/ "topo":
/*!*******************************************!*\
  !*** ./lib/rte/ckeditor/CKPagePicker.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./CKPagePicker.css */ "C8MH");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ })

}]);
//# sourceMappingURL=chunk.sp-rte-wikipagesuggestions_361526e24a24257ae3cd.js.map