(window["webpackJsonpe795d530_8fb6_425c_b864_b86735dbae1d_1_3_24"] = window["webpackJsonpe795d530_8fb6_425c_b864_b86735dbae1d_1_3_24"] || []).push([["vendors~page-picker-component"],{

/***/ "+4t+":
/*!************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/utilities/7.5.0_b00af71b99b3978738e618b37212a8b6/node_modules/@uifabric/utilities/lib/index.js ***!
  \************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading @uifabric/utilities/index.js
var pkg = __webpack_require__(/*! @ms/uifabric-styling-bundle */ "fglE");
module.exports = pkg._Utilities;

/***/ }),

/***/ "/4V3":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupedList.types.js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: CollapseAllVisibility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapseAllVisibility", function() { return CollapseAllVisibility; });
/**
 * {@docCategory GroupedList}
 */
var CollapseAllVisibility;
(function (CollapseAllVisibility) {
    CollapseAllVisibility[CollapseAllVisibility["hidden"] = 0] = "hidden";
    CollapseAllVisibility[CollapseAllVisibility["visible"] = 1] = "visible";
})(CollapseAllVisibility || (CollapseAllVisibility = {}));
//# sourceMappingURL=GroupedList.types.js.map

/***/ }),

/***/ "/lVl":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsColumn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsColumn", function() { return DetailsColumn; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DetailsColumn_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailsColumn.base */ "Gwvx");
/* harmony import */ var _DetailsColumn_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsColumn.styles */ "pAdO");



var DetailsColumn = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DetailsColumn_base__WEBPACK_IMPORTED_MODULE_1__["DetailsColumnBase"], _DetailsColumn_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'DetailsColumn' });
//# sourceMappingURL=DetailsColumn.js.map

/***/ }),

/***/ "01ek":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/Dialog.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-Dialog'
};
var getStyles = function (props) {
    var _a;
    var className = props.className, containerClassName = props.containerClassName, _b = props.dialogDefaultMinWidth, dialogDefaultMinWidth = _b === void 0 ? '288px' : _b, _c = props.dialogDefaultMaxWidth, dialogDefaultMaxWidth = _c === void 0 ? '340px' : _c, hidden = props.hidden, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [classNames.root, theme.fonts.medium, className],
        main: [
            {
                width: dialogDefaultMinWidth,
                outline: '3px solid transparent',
                selectors: (_a = {},
                    _a["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinMedium"] + "px)"] = {
                        width: 'auto',
                        maxWidth: dialogDefaultMaxWidth,
                        minWidth: dialogDefaultMinWidth
                    },
                    _a)
            },
            !hidden && { display: 'flex' },
            containerClassName
        ]
    };
};
//# sourceMappingURL=Dialog.styles.js.map

/***/ }),

/***/ "08hr":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/selection/index.js ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: SELECTION_CHANGE, SelectionDirection, SelectionMode, Selection, SelectionZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "lQgf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SELECTION_CHANGE", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SELECTION_CHANGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionDirection", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SelectionDirection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionMode", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SelectionMode"]; });

/* harmony import */ var _Selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Selection */ "J7+t");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return _Selection__WEBPACK_IMPORTED_MODULE_1__["Selection"]; });

/* harmony import */ var _SelectionZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectionZone */ "G248");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionZone", function() { return _SelectionZone__WEBPACK_IMPORTED_MODULE_2__["SelectionZone"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "0lYJ":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Spinner.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Spinner.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "15YF":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/Dialog.base.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogBase", function() { return DialogBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogContent.types */ "F+OE");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Modal */ "67Sy");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DialogContent */ "Nio4");






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();

var DefaultModalProps = {
    isDarkOverlay: false,
    isBlocking: false,
    className: '',
    containerClassName: '',
    topOffsetFixed: false
};
var DefaultDialogContentProps = {
    type: _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].normal,
    className: '',
    topButtonsProps: []
};
var DialogBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DialogBase, _super);
    function DialogBase(props) {
        var _this = _super.call(this, props) || this;
        _this._getSubTextId = function () {
            var _a = _this.props, ariaDescribedById = _a.ariaDescribedById, modalProps = _a.modalProps, dialogContentProps = _a.dialogContentProps, subText = _a.subText;
            var id = ariaDescribedById || (modalProps && modalProps.subtitleAriaId);
            if (!id) {
                id = (subText || (dialogContentProps && dialogContentProps.subText)) && _this._defaultSubTextId;
            }
            return id;
        };
        _this._getTitleTextId = function () {
            var _a = _this.props, ariaLabelledById = _a.ariaLabelledById, modalProps = _a.modalProps, dialogContentProps = _a.dialogContentProps, title = _a.title;
            var id = ariaLabelledById || (modalProps && modalProps.titleAriaId);
            if (!id) {
                id = (title || (dialogContentProps && dialogContentProps.title)) && _this._defaultTitleTextId;
            }
            return id;
        };
        _this._id = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('Dialog');
        _this._defaultTitleTextId = _this._id + '-title';
        _this._defaultSubTextId = _this._id + '-subText';
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["warnDeprecations"])('Dialog', props, {
                isOpen: 'hidden',
                type: 'dialogContentProps.type',
                subText: 'dialogContentProps.subText',
                contentClassName: 'dialogContentProps.className',
                topButtonsProps: 'dialogContentProps.topButtonsProps',
                className: 'modalProps.className',
                isDarkOverlay: 'modalProps.isDarkOverlay',
                isBlocking: 'modalProps.isBlocking',
                containerClassName: 'modalProps.containerClassName',
                onDismissed: 'modalProps.onDismissed',
                onLayerDidMount: 'modalProps.layerProps.onLayerDidMount',
                ariaDescribedById: 'modalProps.subtitleAriaId',
                ariaLabelledById: 'modalProps.titleAriaId'
            });
        }
        return _this;
    }
    DialogBase.prototype.render = function () {
        var _a = this.props, className = _a.className, containerClassName = _a.containerClassName, contentClassName = _a.contentClassName, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, firstFocusableSelector = _a.firstFocusableSelector, forceFocusInsideTrap = _a.forceFocusInsideTrap, styles = _a.styles, hidden = _a.hidden, ignoreExternalFocusing = _a.ignoreExternalFocusing, isBlocking = _a.isBlocking, isClickableOutsideFocusTrap = _a.isClickableOutsideFocusTrap, isDarkOverlay = _a.isDarkOverlay, isOpen = _a.isOpen, onDismiss = _a.onDismiss, onDismissed = _a.onDismissed, onLayerDidMount = _a.onLayerDidMount, responsiveMode = _a.responsiveMode, subText = _a.subText, theme = _a.theme, title = _a.title, topButtonsProps = _a.topButtonsProps, type = _a.type, minWidth = _a.minWidth, maxWidth = _a.maxWidth, modalProps = _a.modalProps;
        var mergedLayerProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, (modalProps ? modalProps.layerProps : { onLayerDidMount: onLayerDidMount }));
        if (onLayerDidMount && !mergedLayerProps.onLayerDidMount) {
            mergedLayerProps.onLayerDidMount = onLayerDidMount;
        }
        var dialogDraggableClassName;
        var dragOptions;
        // if we are draggable, make sure we are using the correct
        // draggable classname and selectors
        if (modalProps && modalProps.dragOptions && !modalProps.dragOptions.dragHandleSelector) {
            dialogDraggableClassName = 'ms-Dialog-draggable-header';
            dragOptions = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, modalProps.dragOptions, { dragHandleSelector: "." + dialogDraggableClassName });
        }
        else {
            dragOptions = modalProps && modalProps.dragOptions;
        }
        var mergedModalProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DefaultModalProps, modalProps, { layerProps: mergedLayerProps, dragOptions: dragOptions });
        var dialogContentProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DefaultDialogContentProps, this.props.dialogContentProps, { draggableHeaderClassName: dialogDraggableClassName });
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className || mergedModalProps.className,
            containerClassName: containerClassName || mergedModalProps.containerClassName,
            hidden: hidden,
            dialogDefaultMinWidth: minWidth,
            dialogDefaultMaxWidth: maxWidth
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_4__["Modal"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ elementToFocusOnDismiss: elementToFocusOnDismiss, firstFocusableSelector: firstFocusableSelector, forceFocusInsideTrap: forceFocusInsideTrap, ignoreExternalFocusing: ignoreExternalFocusing, isClickableOutsideFocusTrap: isClickableOutsideFocusTrap, onDismissed: onDismissed, responsiveMode: responsiveMode }, mergedModalProps, { isDarkOverlay: isDarkOverlay !== undefined ? isDarkOverlay : mergedModalProps.isDarkOverlay, isBlocking: isBlocking !== undefined ? isBlocking : mergedModalProps.isBlocking, isOpen: isOpen !== undefined ? isOpen : !hidden, className: classNames.root, containerClassName: classNames.main, onDismiss: onDismiss ? onDismiss : mergedModalProps.onDismiss, subtitleAriaId: this._getSubTextId(), titleAriaId: this._getTitleTextId() }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DialogContent__WEBPACK_IMPORTED_MODULE_6__["DialogContent"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ titleId: this._defaultTitleTextId, subTextId: this._defaultSubTextId, title: title, subText: subText, showCloseButton: isBlocking !== undefined ? !isBlocking : !mergedModalProps.isBlocking, topButtonsProps: topButtonsProps ? topButtonsProps : dialogContentProps.topButtonsProps, type: type !== undefined ? type : dialogContentProps.type, onDismiss: onDismiss ? onDismiss : dialogContentProps.onDismiss, className: contentClassName || dialogContentProps.className }, dialogContentProps), this.props.children)));
    };
    DialogBase.defaultProps = {
        hidden: true
    };
    DialogBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_5__["withResponsiveMode"]
    ], DialogBase);
    return DialogBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Dialog.base.js.map

/***/ }),

/***/ "2X7w":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-Layer',
    rootNoHost: 'ms-Layer--fixed',
    content: 'ms-Layer-content'
};
var getStyles = function (props) {
    var className = props.className, isNotHost = props.isNotHost, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            isNotHost && [
                classNames.rootNoHost,
                {
                    position: 'fixed',
                    zIndex: _Styling__WEBPACK_IMPORTED_MODULE_0__["ZIndexes"].Layer,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    visibility: 'hidden'
                }
            ],
            className
        ],
        content: [
            classNames.content,
            {
                visibility: 'visible'
            }
        ]
    };
};
//# sourceMappingURL=Layer.styles.js.map

/***/ }),

/***/ "2zVY":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Overlay.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Overlay.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "33E4":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupedList.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-GroupedList',
    compact: 'ms-GroupedList--Compact',
    group: 'ms-GroupedList-group',
    link: 'ms-Link',
    listCell: 'ms-List-cell'
};
var beziers = {
    easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)'
};
var getStyles = function (props) {
    var _a, _b;
    var theme = props.theme, className = props.className, compact = props.compact;
    var palette = theme.palette;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.small,
            {
                position: 'relative',
                selectors: (_a = {},
                    _a["." + classNames.listCell] = {
                        minHeight: 38 // be consistent with DetailsList styles
                    },
                    _a)
            },
            compact && [
                classNames.compact,
                {
                    selectors: (_b = {},
                        _b["." + classNames.listCell] = {
                            minHeight: 32 // be consistent with DetailsList styles
                        },
                        _b)
                }
            ],
            className
        ],
        group: [
            classNames.group,
            {
                transition: "background-color " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2 + " " + beziers.easeInOutSine
            }
        ],
        groupIsDropping: {
            backgroundColor: palette.neutralLight
        }
    };
};
//# sourceMappingURL=GroupedList.styles.js.map

/***/ }),

/***/ "3GMh":
/*!*************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/set-version/7.0.17/node_modules/@uifabric/set-version/lib/setVersion.js ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: setVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return setVersion; });
// A packages cache that makes sure that we don't inject the same packageName twice in the same bundle -
// this cache is local to the module closure inside this bundle
var packagesCache = {};
// Cache access to window to avoid IE11 memory leak.
var _win = undefined;
try {
    _win = window;
}
catch (e) {
    /* no-op */
}
function setVersion(packageName, packageVersion) {
    if (typeof _win !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var packages = (_win.__packages__ = _win.__packages__ || {});
        // We allow either the global packages or local packages caches to invalidate so testing can
        // just clear the global to set this state
        if (!packages[packageName] || !packagesCache[packageName]) {
            packagesCache[packageName] = packageVersion;
            var versions = (packages[packageName] = packages[packageName] || []);
            versions.push(packageVersion);
        }
    }
}
//# sourceMappingURL=setVersion.js.map

/***/ }),

/***/ "4RHQ":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Styling.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Styling.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "4azF":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/DraggableZone/index.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: DraggableZone, getClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DraggableZone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DraggableZone */ "nDaQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DraggableZone", function() { return _DraggableZone__WEBPACK_IMPORTED_MODULE_0__["DraggableZone"]; });

/* harmony import */ var _DraggableZone_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DraggableZone.styles */ "rp3K");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return _DraggableZone_styles__WEBPACK_IMPORTED_MODULE_1__["getClassNames"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "67Sy":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Modal.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default, Modal, ModalBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Modal/index */ "y2VM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBase", function() { return _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__["ModalBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _components_Modal_index__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });



//# sourceMappingURL=Modal.js.map

/***/ }),

/***/ "71+j":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/KeytipData.js ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: KeytipData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_KeytipData_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/KeytipData/index */ "j+hm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeytipData", function() { return _components_KeytipData_index__WEBPACK_IMPORTED_MODULE_0__["KeytipData"]; });


//# sourceMappingURL=KeytipData.js.map

/***/ }),

/***/ "7Arc":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: LayerBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return LayerBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Fabric */ "jN8F");
/* harmony import */ var _Fabric__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Fabric__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Layer_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Layer.notification */ "nACv");






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["classNamesFunction"])();
var LayerBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LayerBase, _super);
    function LayerBase(props) {
        var _this = _super.call(this, props) || this;
        _this._rootRef = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._createLayerElement = function () {
            var hostId = _this.props.hostId;
            var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["getDocument"])(_this._rootRef.current);
            var host = _this._getHost();
            if (!doc || !host) {
                return;
            }
            // If one was already existing, remove.
            _this._removeLayerElement();
            var layerElement = doc.createElement('div');
            var classNames = _this._getClassNames();
            layerElement.className = classNames.root;
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["setPortalAttribute"])(layerElement);
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["setVirtualParent"])(layerElement, _this._rootRef.current);
            _this.props.insertFirst ? host.insertBefore(layerElement, host.firstChild) : host.appendChild(layerElement);
            _this.setState({
                hostId: hostId,
                layerElement: layerElement
            }, function () {
                var _a = _this.props, onLayerDidMount = _a.onLayerDidMount, onLayerMounted = _a.onLayerMounted;
                if (onLayerMounted) {
                    onLayerMounted();
                }
                if (onLayerDidMount) {
                    onLayerDidMount();
                }
            });
        };
        _this.state = {};
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["warnDeprecations"])('Layer', props, {
                onLayerMounted: 'onLayerDidMount'
            });
        }
        return _this;
    }
    LayerBase.prototype.componentDidMount = function () {
        var hostId = this.props.hostId;
        this._createLayerElement();
        if (hostId) {
            Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["registerLayer"])(hostId, this._createLayerElement);
        }
    };
    LayerBase.prototype.render = function () {
        var layerElement = this.state.layerElement;
        var classNames = this._getClassNames();
        var eventBubblingEnabled = this.props.eventBubblingEnabled;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: "ms-layer", ref: this._rootRef }, layerElement &&
            react_dom__WEBPACK_IMPORTED_MODULE_2__["createPortal"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Fabric__WEBPACK_IMPORTED_MODULE_3__["Fabric"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, !eventBubblingEnabled && _getFilteredEvents(), { className: classNames.content }), this.props.children), layerElement)));
    };
    LayerBase.prototype.componentDidUpdate = function () {
        if (this.props.hostId !== this.state.hostId) {
            this._createLayerElement();
        }
    };
    LayerBase.prototype.componentWillUnmount = function () {
        var hostId = this.props.hostId;
        this._removeLayerElement();
        if (hostId) {
            Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["unregisterLayer"])(hostId, this._createLayerElement);
        }
    };
    LayerBase.prototype._removeLayerElement = function () {
        var onLayerWillUnmount = this.props.onLayerWillUnmount;
        var layerElement = this.state.layerElement;
        if (onLayerWillUnmount) {
            onLayerWillUnmount();
        }
        if (layerElement && layerElement.parentNode) {
            var parentNode = layerElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(layerElement);
            }
        }
    };
    LayerBase.prototype._getClassNames = function () {
        var _a = this.props, className = _a.className, styles = _a.styles, theme = _a.theme;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            isNotHost: !this.props.hostId
        });
        return classNames;
    };
    LayerBase.prototype._getHost = function () {
        var hostId = this.props.hostId;
        var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["getDocument"])(this._rootRef.current);
        if (!doc) {
            return undefined;
        }
        if (hostId) {
            return doc.getElementById(hostId);
        }
        else {
            var defaultHostSelector = Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_5__["getDefaultTarget"])();
            return defaultHostSelector ? doc.querySelector(defaultHostSelector) : doc.body;
        }
    };
    LayerBase.defaultProps = {
        onLayerDidMount: function () { return undefined; },
        onLayerWillUnmount: function () { return undefined; }
    };
    LayerBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_4__["customizable"])('Layer', ['theme', 'hostId'])
    ], LayerBase);
    return LayerBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var _onFilterEvent = function (ev) {
    // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though mouseenter and
    //    mouseleave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on event name rather than ev.bubble.
    if (ev.eventPhase === Event.BUBBLING_PHASE && ev.type !== 'mouseenter' && ev.type !== 'mouseleave') {
        ev.stopPropagation();
    }
};
var _filteredEventProps;
function _getFilteredEvents() {
    if (!_filteredEventProps) {
        _filteredEventProps = {};
        [
            'onClick',
            'onContextMenu',
            'onDoubleClick',
            'onDrag',
            'onDragEnd',
            'onDragEnter',
            'onDragExit',
            'onDragLeave',
            'onDragOver',
            'onDragStart',
            'onDrop',
            'onMouseDown',
            'onMouseEnter',
            'onMouseLeave',
            'onMouseMove',
            'onMouseOver',
            'onMouseOut',
            'onMouseUp',
            'onKeyDown',
            'onKeyPress',
            'onKeyUp',
            'onFocus',
            'onBlur',
            'onChange',
            'onInput',
            'onInvalid',
            'onSubmit'
        ].forEach(function (name) { return (_filteredEventProps[name] = _onFilterEvent); });
    }
    return _filteredEventProps;
}
//# sourceMappingURL=Layer.base.js.map

/***/ }),

/***/ "7ljj":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/KeytipData/KeytipData.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: KeytipData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeytipData", function() { return KeytipData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities_keytips_KeytipManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/keytips/KeytipManager */ "Yqya");
/* harmony import */ var _utilities_keytips_KeytipUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/keytips/KeytipUtils */ "JyIg");





/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 * {@docCategory Keytips}
 */
var KeytipData = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](KeytipData, _super);
    function KeytipData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._keytipManager = _utilities_keytips_KeytipManager__WEBPACK_IMPORTED_MODULE_3__["KeytipManager"].getInstance();
        return _this;
    }
    KeytipData.prototype.componentDidMount = function () {
        // Register Keytip in KeytipManager
        if (this.props.keytipProps) {
            this._uniqueId = this._keytipManager.register(this._getKtpProps());
        }
    };
    KeytipData.prototype.componentWillUnmount = function () {
        // Unregister Keytip in KeytipManager
        this.props.keytipProps && this._keytipManager.unregister(this._getKtpProps(), this._uniqueId);
    };
    KeytipData.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.keytipProps !== this.props.keytipProps || prevProps.disabled !== this.props.disabled) {
            // If keytipProps or disabled has changed update Keytip in KeytipManager
            this.props.keytipProps && this._keytipManager.update(this._getKtpProps(), this._uniqueId);
        }
    };
    KeytipData.prototype.render = function () {
        var _a = this.props, children = _a.children, keytipProps = _a.keytipProps, ariaDescribedBy = _a.ariaDescribedBy;
        var nativeKeytipProps = {};
        if (keytipProps) {
            nativeKeytipProps = this._getKtpAttrs(keytipProps, ariaDescribedBy);
        }
        return children(nativeKeytipProps);
    };
    KeytipData.prototype._getKtpProps = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ disabled: this.props.disabled }, this.props.keytipProps);
    };
    /**
     * Gets the aria- and data- attributes to attach to the component
     * @param keytipProps - props for Keytip
     * @param describedByPrepend - ariaDescribedBy value to prepend
     */
    KeytipData.prototype._getKtpAttrs = function (keytipProps, describedByPrepend) {
        if (keytipProps) {
            // Add the parent overflow sequence if necessary
            var newKeytipProps = this._keytipManager.addParentOverflow(keytipProps);
            // Construct aria-describedby and data-ktp-id attributes and return
            var ariaDescribedBy = Object(_utilities_keytips_KeytipUtils__WEBPACK_IMPORTED_MODULE_4__["getAriaDescribedBy"])(newKeytipProps.keySequences);
            var keySequences = newKeytipProps.keySequences.slice();
            if (newKeytipProps.overflowSetSequence) {
                keySequences = Object(_utilities_keytips_KeytipUtils__WEBPACK_IMPORTED_MODULE_4__["mergeOverflows"])(keySequences, newKeytipProps.overflowSetSequence);
            }
            var ktpId = Object(_utilities_keytips_KeytipUtils__WEBPACK_IMPORTED_MODULE_4__["sequencesToID"])(keySequences);
            return {
                'aria-describedby': Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["mergeAriaAttributeValues"])(describedByPrepend, ariaDescribedBy),
                'data-ktp-target': ktpId,
                'data-ktp-execute-target': ktpId
            };
        }
        return undefined;
    };
    return KeytipData;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=KeytipData.js.map

/***/ }),

/***/ "88pY":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Layer.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: Layer, LayerBase, LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "G0Zq");
/* harmony import */ var _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Layer/index */ "qEgt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["Layer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["LayerBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return _components_Layer_index__WEBPACK_IMPORTED_MODULE_1__["LayerHost"]; });



//# sourceMappingURL=Layer.js.map

/***/ }),

/***/ "8S/1":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogFooter.styles.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    actions: 'ms-Dialog-actions',
    action: 'ms-Dialog-action',
    actionsRight: 'ms-Dialog-actionsRight'
};
var getStyles = function (props) {
    var className = props.className, theme = props.theme;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        actions: [
            classNames.actions,
            {
                position: 'relative',
                width: '100%',
                minHeight: '24px',
                lineHeight: '24px',
                margin: '16px 0 0',
                fontSize: '0',
                selectors: {
                    '.ms-Button': {
                        lineHeight: 'normal'
                    }
                }
            },
            className
        ],
        action: [
            classNames.action,
            {
                margin: '0 4px'
            }
        ],
        actionsRight: [
            classNames.actionsRight,
            {
                textAlign: 'right',
                marginRight: '-4px',
                fontSize: '0'
            }
        ]
    };
};
//# sourceMappingURL=DialogFooter.styles.js.map

/***/ }),

/***/ "Afyl":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsHeader.base.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsHeaderBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsHeaderBase", function() { return DetailsHeaderBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailsList.types */ "G1YK");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../FocusZone */ "su0C");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_FocusZone__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Icon */ "UfSG");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Icon__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Layer */ "88pY");
/* harmony import */ var _GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../GroupedList/GroupSpacer */ "pYG9");
/* harmony import */ var _GroupedList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../GroupedList */ "xYNb");
/* harmony import */ var _DetailsRowCheck__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DetailsRowCheck */ "CpaK");
/* harmony import */ var _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utilities/selection/interfaces */ "lQgf");
/* harmony import */ var _utilities_dragdrop_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utilities/dragdrop/index */ "gcLL");
/* harmony import */ var _components_DetailsList_DetailsColumn__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/DetailsList/DetailsColumn */ "/lVl");
/* harmony import */ var _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./DetailsHeader.types */ "pkCn");
















var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["classNamesFunction"])();
var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
var NO_COLUMNS = [];
var DetailsHeaderBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DetailsHeaderBase, _super);
    function DetailsHeaderBase(props) {
        var _this = _super.call(this, props) || this;
        _this._rootComponent = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._draggedColumnIndex = -1;
        _this._dropHintDetails = {};
        _this._updateDroppingState = function (newValue, event) {
            if (_this._draggedColumnIndex >= 0 && event.type !== 'drop' && !newValue) {
                _this._resetDropHints();
            }
        };
        _this._onDragOver = function (item, event) {
            if (_this._draggedColumnIndex >= 0) {
                event.stopPropagation();
                _this._computeDropHintToBeShown(event.clientX);
            }
        };
        _this._onDrop = function (item, event) {
            // Safe to assume this is defined since we're handling a drop event
            var columnReorderProps = _this._getColumnReorderProps();
            // Target index will not get changed if draggeditem is after target item.
            if (_this._draggedColumnIndex >= 0 && event) {
                var targetIndex = _this._draggedColumnIndex > _this._currentDropHintIndex ? _this._currentDropHintIndex : _this._currentDropHintIndex - 1;
                var isValidDrop = _this._isValidCurrentDropHintIndex();
                event.stopPropagation();
                if (isValidDrop) {
                    _this._onDropIndexInfo.sourceIndex = _this._draggedColumnIndex;
                    _this._onDropIndexInfo.targetIndex = targetIndex;
                    if (columnReorderProps.onColumnDrop) {
                        var dragDropDetails = {
                            draggedIndex: _this._draggedColumnIndex,
                            targetIndex: targetIndex
                        };
                        columnReorderProps.onColumnDrop(dragDropDetails);
                    }
                    else if (columnReorderProps.handleColumnReorder) {
                        columnReorderProps.handleColumnReorder(_this._draggedColumnIndex, targetIndex);
                    }
                }
            }
            _this._resetDropHints();
            _this._dropHintDetails = {};
            _this._draggedColumnIndex = -1;
        };
        _this._updateDragInfo = function (props, event) {
            // Safe to assume this is defined since we're handling a drag event
            var columnReorderProps = _this._getColumnReorderProps();
            var itemIndex = props.itemIndex;
            if (itemIndex >= 0) {
                // Column index is set based on the checkbox
                _this._draggedColumnIndex = _this._isCheckboxColumnHidden() ? itemIndex - 1 : itemIndex - 2;
                _this._getDropHintPositions();
                if (columnReorderProps.onColumnDragStart) {
                    columnReorderProps.onColumnDragStart(true);
                }
            }
            else if (event && _this._draggedColumnIndex >= 0) {
                _this._resetDropHints();
                _this._draggedColumnIndex = -1;
                _this._dropHintDetails = {};
                if (columnReorderProps.onColumnDragEnd) {
                    var columnDragEndLocation = _this._isEventOnHeader(event);
                    columnReorderProps.onColumnDragEnd({ dropLocation: columnDragEndLocation }, event);
                }
            }
        };
        _this._getDropHintPositions = function () {
            var _a = _this.props.columns, columns = _a === void 0 ? NO_COLUMNS : _a;
            // Safe to assume this is defined since we're handling a drag/drop event
            var columnReorderProps = _this._getColumnReorderProps();
            var prevX = 0;
            var prevMid = 0;
            var prevRef;
            var frozenColumnCountFromStart = columnReorderProps.frozenColumnCountFromStart || 0;
            var frozenColumnCountFromEnd = columnReorderProps.frozenColumnCountFromEnd || 0;
            for (var i = frozenColumnCountFromStart; i < columns.length - frozenColumnCountFromEnd + 1; i++) {
                if (_this._rootElement) {
                    var dropHintElement = _this._rootElement.querySelectorAll('#columnDropHint_' + i)[0];
                    if (dropHintElement) {
                        if (i === frozenColumnCountFromStart) {
                            prevX = dropHintElement.offsetLeft;
                            prevMid = dropHintElement.offsetLeft;
                            prevRef = dropHintElement;
                        }
                        else {
                            var newMid = (dropHintElement.offsetLeft + prevX) / 2;
                            _this._dropHintDetails[i - 1] = {
                                originX: prevX,
                                startX: prevMid,
                                endX: newMid,
                                dropHintElementRef: prevRef
                            };
                            prevMid = newMid;
                            prevRef = dropHintElement;
                            prevX = dropHintElement.offsetLeft;
                            if (i === columns.length - frozenColumnCountFromEnd) {
                                _this._dropHintDetails[i] = {
                                    originX: prevX,
                                    startX: prevMid,
                                    endX: dropHintElement.offsetLeft,
                                    dropHintElementRef: prevRef
                                };
                            }
                        }
                    }
                }
            }
        };
        /**
         * Based on the given cursor position, finds the nearest drop hint and updates the state to make it visible
         */
        _this._computeDropHintToBeShown = function (clientX) {
            if (_this._rootElement) {
                var clientRect = _this._rootElement.getBoundingClientRect();
                var headerOriginX = clientRect.left;
                var eventXRelativePosition = clientX - headerOriginX;
                var currentDropHintIndex = _this._currentDropHintIndex;
                if (_this._isValidCurrentDropHintIndex()) {
                    if (_liesBetween(eventXRelativePosition, _this._dropHintDetails[currentDropHintIndex].startX, _this._dropHintDetails[currentDropHintIndex].endX)) {
                        return;
                    }
                }
                var _a = _this.props.columns, columns = _a === void 0 ? NO_COLUMNS : _a;
                // Safe to assume this is defined since we're handling a drag/drop event
                var columnReorderProps = _this._getColumnReorderProps();
                var frozenColumnCountFromStart = columnReorderProps.frozenColumnCountFromStart || 0;
                var frozenColumnCountFromEnd = columnReorderProps.frozenColumnCountFromEnd || 0;
                var currentIndex = frozenColumnCountFromStart;
                var lastValidColumn = columns.length - frozenColumnCountFromEnd;
                var indexToUpdate = -1;
                if (_isBefore(eventXRelativePosition, _this._dropHintDetails[currentIndex].endX)) {
                    indexToUpdate = currentIndex;
                }
                else if (_isAfter(eventXRelativePosition, _this._dropHintDetails[lastValidColumn].startX)) {
                    indexToUpdate = lastValidColumn;
                }
                else if (_this._isValidCurrentDropHintIndex()) {
                    if (_this._dropHintDetails[currentDropHintIndex + 1] &&
                        _liesBetween(eventXRelativePosition, _this._dropHintDetails[currentDropHintIndex + 1].startX, _this._dropHintDetails[currentDropHintIndex + 1].endX)) {
                        indexToUpdate = currentDropHintIndex + 1;
                    }
                    else if (_this._dropHintDetails[currentDropHintIndex - 1] &&
                        _liesBetween(eventXRelativePosition, _this._dropHintDetails[currentDropHintIndex - 1].startX, _this._dropHintDetails[currentDropHintIndex - 1].endX)) {
                        indexToUpdate = currentDropHintIndex - 1;
                    }
                }
                if (indexToUpdate === -1) {
                    var startIndex = frozenColumnCountFromStart;
                    var endIndex = lastValidColumn;
                    while (startIndex < endIndex) {
                        var middleIndex = Math.ceil((endIndex + startIndex) / 2);
                        if (_liesBetween(eventXRelativePosition, _this._dropHintDetails[middleIndex].startX, _this._dropHintDetails[middleIndex].endX)) {
                            indexToUpdate = middleIndex;
                            break;
                        }
                        else if (_isBefore(eventXRelativePosition, _this._dropHintDetails[middleIndex].originX)) {
                            endIndex = middleIndex;
                        }
                        else if (_isAfter(eventXRelativePosition, _this._dropHintDetails[middleIndex].originX)) {
                            startIndex = middleIndex;
                        }
                    }
                }
                if (indexToUpdate === _this._draggedColumnIndex || indexToUpdate === _this._draggedColumnIndex + 1) {
                    if (_this._isValidCurrentDropHintIndex()) {
                        _this._resetDropHints();
                    }
                }
                else if (currentDropHintIndex !== indexToUpdate && indexToUpdate >= 0) {
                    _this._resetDropHints();
                    _this._updateDropHintElement(_this._dropHintDetails[indexToUpdate].dropHintElementRef, 'inline-block');
                    _this._currentDropHintIndex = indexToUpdate;
                }
            }
        };
        _this._renderColumnSizer = function (_a) {
            var _b;
            var columnIndex = _a.columnIndex;
            var _c = _this.props.columns, columns = _c === void 0 ? NO_COLUMNS : _c;
            var column = columns[columnIndex];
            var columnResizeDetails = _this.state.columnResizeDetails;
            var classNames = _this._classNames;
            return column.isResizable ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: column.key + "_sizer", "aria-hidden": true, role: "button", "data-is-focusable": false, onClick: _stopPropagation, "data-sizer-index": columnIndex, onBlur: _this._onSizerBlur, className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["css"])(classNames.cellSizer, columnIndex < columns.length - 1 ? classNames.cellSizerStart : classNames.cellSizerEnd, (_b = {},
                    _b[classNames.cellIsResizing] = columnResizeDetails && columnResizeDetails.columnIndex === columnIndex,
                    _b)), onDoubleClick: _this._onSizerDoubleClick.bind(_this, columnIndex) })) : null;
        };
        _this._onRenderColumnHeaderTooltip = function (tooltipHostProps) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: tooltipHostProps.hostClassName }, tooltipHostProps.children);
        };
        /**
         * Called when the select all toggle is clicked.
         */
        _this._onSelectAllClicked = function () {
            var selection = _this.props.selection;
            if (selection) {
                selection.toggleAllSelected();
            }
        };
        _this._onRootMouseDown = function (ev) {
            var columnIndexAttr = ev.target.getAttribute('data-sizer-index');
            var columnIndex = Number(columnIndexAttr);
            var _a = _this.props.columns, columns = _a === void 0 ? NO_COLUMNS : _a;
            if (columnIndexAttr === null || ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
                // Ignore anything except the primary button.
                return;
            }
            _this.setState({
                columnResizeDetails: {
                    columnIndex: columnIndex,
                    columnMinWidth: columns[columnIndex].calculatedWidth,
                    originX: ev.clientX
                }
            });
            ev.preventDefault();
            ev.stopPropagation();
        };
        _this._onRootMouseMove = function (ev) {
            var _a = _this.state, columnResizeDetails = _a.columnResizeDetails, isSizing = _a.isSizing;
            if (columnResizeDetails && !isSizing && ev.clientX !== columnResizeDetails.originX) {
                _this.setState({ isSizing: true });
            }
        };
        _this._onRootRef = function (focusZone) {
            if (focusZone) {
                // Need to resolve the actual DOM node, not the component. The element itself will be used for drag/drop and focusing.
                _this._rootElement = Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"])(focusZone);
            }
            else {
                _this._rootElement = undefined;
            }
        };
        _this._onRootKeyDown = function (ev) {
            var _a = _this.state, columnResizeDetails = _a.columnResizeDetails, isSizing = _a.isSizing;
            var _b = _this.props, _c = _b.columns, columns = _c === void 0 ? NO_COLUMNS : _c, onColumnResized = _b.onColumnResized;
            var columnIndexAttr = ev.target.getAttribute('data-sizer-index');
            if (!columnIndexAttr || isSizing) {
                return;
            }
            var columnIndex = Number(columnIndexAttr);
            if (!columnResizeDetails) {
                if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].enter) {
                    _this.setState({
                        columnResizeDetails: {
                            columnIndex: columnIndex,
                            columnMinWidth: columns[columnIndex].calculatedWidth
                        }
                    });
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
            else {
                var increment = void 0;
                if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].enter) {
                    _this.setState({
                        columnResizeDetails: undefined
                    });
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                else if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].left) {
                    increment = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])() ? 1 : -1;
                }
                else if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_3__["KeyCodes"].right) {
                    increment = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])() ? -1 : 1;
                }
                if (increment) {
                    if (!ev.shiftKey) {
                        increment *= 10;
                    }
                    _this.setState({
                        columnResizeDetails: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, columnResizeDetails, { columnMinWidth: columnResizeDetails.columnMinWidth + increment })
                    });
                    if (onColumnResized) {
                        onColumnResized(columns[columnIndex], columnResizeDetails.columnMinWidth + increment, columnIndex);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        /**
         * mouse move event handler in the header
         * it will set isSizing state to true when user clicked on the sizer and move the mouse.
         *
         * @param ev - mouse move event
         */
        _this._onSizerMouseMove = function (ev) {
            var 
            // use buttons property here since ev.button in some edge case is not upding well during the move.
            // but firefox doesn't support it, so we set the default value when it is not defined.
            buttons = ev.buttons;
            var _a = _this.props, onColumnIsSizingChanged = _a.onColumnIsSizingChanged, onColumnResized = _a.onColumnResized, _b = _a.columns, columns = _b === void 0 ? NO_COLUMNS : _b;
            var columnResizeDetails = _this.state.columnResizeDetails;
            if (buttons !== undefined && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
                // cancel mouse down event and return early when the primary button is not pressed
                _this._onSizerMouseUp(ev);
                return;
            }
            if (ev.clientX !== columnResizeDetails.originX) {
                if (onColumnIsSizingChanged) {
                    onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], true);
                }
            }
            if (onColumnResized) {
                var movement = ev.clientX - columnResizeDetails.originX;
                if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])()) {
                    movement = -movement;
                }
                onColumnResized(columns[columnResizeDetails.columnIndex], columnResizeDetails.columnMinWidth + movement, columnResizeDetails.columnIndex);
            }
        };
        _this._onSizerBlur = function (ev) {
            var columnResizeDetails = _this.state.columnResizeDetails;
            if (columnResizeDetails) {
                _this.setState({
                    columnResizeDetails: undefined,
                    isSizing: false
                });
            }
        };
        /**
         * mouse up event handler in the header
         * clear the resize related state.
         * This is to ensure we can catch double click event
         *
         * @param ev - mouse up event
         */
        _this._onSizerMouseUp = function (ev) {
            var _a = _this.props, _b = _a.columns, columns = _b === void 0 ? NO_COLUMNS : _b, onColumnIsSizingChanged = _a.onColumnIsSizingChanged;
            var columnResizeDetails = _this.state.columnResizeDetails;
            _this.setState({
                columnResizeDetails: undefined,
                isSizing: false
            });
            if (onColumnIsSizingChanged) {
                onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
            }
        };
        _this._onToggleCollapseAll = function () {
            var onToggleCollapseAll = _this.props.onToggleCollapseAll;
            var newCollapsed = !_this.state.isAllCollapsed;
            _this.setState({
                isAllCollapsed: newCollapsed
            });
            if (onToggleCollapseAll) {
                onToggleCollapseAll(newCollapsed);
            }
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["initializeComponentRef"])(_this);
        _this._events = new _Utilities__WEBPACK_IMPORTED_MODULE_3__["EventGroup"](_this);
        _this.state = {
            columnResizeDetails: undefined,
            isAllCollapsed: _this.props.isAllCollapsed,
            isAllSelected: !!_this.props.selection && _this.props.selection.isAllSelected()
        };
        _this._onDropIndexInfo = {
            sourceIndex: -1,
            targetIndex: -1
        };
        _this._id = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getId"])('header');
        _this._currentDropHintIndex = -1;
        // The drag drop handler won't do any work until subscribe() is called,
        // so always set it up for convenience
        _this._dragDropHelper = new _utilities_dragdrop_index__WEBPACK_IMPORTED_MODULE_12__["DragDropHelper"]({
            selection: {
                getSelection: function () {
                    return;
                }
            },
            minimumPixelsForDrag: _this.props.minimumPixelsForDrag
        });
        return _this;
    }
    DetailsHeaderBase.prototype.componentDidMount = function () {
        var selection = this.props.selection;
        this._events.on(selection, _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_11__["SELECTION_CHANGE"], this._onSelectionChanged);
        // We need to use native on this to prevent MarqueeSelection from handling the event before us.
        this._events.on(this._rootElement, 'mousedown', this._onRootMouseDown);
        this._events.on(this._rootElement, 'keydown', this._onRootKeyDown);
        if (this._getColumnReorderProps()) {
            this._subscriptionObject = this._dragDropHelper.subscribe(this._rootElement, this._events, this._getHeaderDragDropOptions());
        }
    };
    DetailsHeaderBase.prototype.componentDidUpdate = function (prevProps) {
        if (this._getColumnReorderProps()) {
            if (!this._subscriptionObject) {
                this._subscriptionObject = this._dragDropHelper.subscribe(this._rootElement, this._events, this._getHeaderDragDropOptions());
            }
        }
        else if (this._subscriptionObject) {
            this._subscriptionObject.dispose();
            delete this._subscriptionObject;
        }
        if (this.props !== prevProps && this._onDropIndexInfo.sourceIndex >= 0 && this._onDropIndexInfo.targetIndex >= 0) {
            var _a = prevProps.columns, previousColumns = _a === void 0 ? NO_COLUMNS : _a;
            var _b = this.props.columns, columns = _b === void 0 ? NO_COLUMNS : _b;
            if (previousColumns[this._onDropIndexInfo.sourceIndex].key === columns[this._onDropIndexInfo.targetIndex].key) {
                this._onDropIndexInfo = {
                    sourceIndex: -1,
                    targetIndex: -1
                };
            }
        }
        if (this.props.isAllCollapsed !== prevProps.isAllCollapsed) {
            this.setState({ isAllCollapsed: this.props.isAllCollapsed });
        }
    };
    DetailsHeaderBase.prototype.componentWillUnmount = function () {
        if (this._subscriptionObject) {
            this._subscriptionObject.dispose();
            delete this._subscriptionObject;
        }
        this._dragDropHelper.dispose();
        this._events.dispose();
    };
    DetailsHeaderBase.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.columns, columns = _b === void 0 ? NO_COLUMNS : _b, ariaLabel = _a.ariaLabel, ariaLabelForToggleAllGroupsButton = _a.ariaLabelForToggleAllGroupsButton, ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox, selectAllVisibility = _a.selectAllVisibility, ariaLabelForSelectionColumn = _a.ariaLabelForSelectionColumn, indentWidth = _a.indentWidth, _c = _a.rowWidth, rowWidth = _c === void 0 ? 0 : _c, onColumnClick = _a.onColumnClick, onColumnContextMenu = _a.onColumnContextMenu, _d = _a.onRenderColumnHeaderTooltip, onRenderColumnHeaderTooltip = _d === void 0 ? this._onRenderColumnHeaderTooltip : _d, styles = _a.styles, selectionMode = _a.selectionMode, theme = _a.theme, onRenderDetailsCheckbox = _a.onRenderDetailsCheckbox, groupNestingDepth = _a.groupNestingDepth, useFastIcons = _a.useFastIcons, checkboxVisibility = _a.checkboxVisibility, className = _a.className;
        var _e = this.state, isAllSelected = _e.isAllSelected, columnResizeDetails = _e.columnResizeDetails, isSizing = _e.isSizing, isAllCollapsed = _e.isAllCollapsed;
        var showCheckbox = selectAllVisibility !== _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_14__["SelectAllVisibility"].none;
        var isCheckboxHidden = selectAllVisibility === _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_14__["SelectAllVisibility"].hidden;
        var isCheckboxAlwaysVisible = checkboxVisibility === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["CheckboxVisibility"].always;
        var columnReorderProps = this._getColumnReorderProps();
        var frozenColumnCountFromStart = columnReorderProps && columnReorderProps.frozenColumnCountFromStart ? columnReorderProps.frozenColumnCountFromStart : 0;
        var frozenColumnCountFromEnd = columnReorderProps && columnReorderProps.frozenColumnCountFromEnd ? columnReorderProps.frozenColumnCountFromEnd : 0;
        this._classNames = getClassNames(styles, {
            theme: theme,
            isAllSelected: isAllSelected,
            isSelectAllHidden: selectAllVisibility === _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_14__["SelectAllVisibility"].hidden,
            isResizingColumn: !!columnResizeDetails && isSizing,
            isSizing: isSizing,
            isAllCollapsed: isAllCollapsed,
            isCheckboxHidden: isCheckboxHidden,
            className: className
        });
        var classNames = this._classNames;
        var IconComponent = useFastIcons ? _Icon__WEBPACK_IMPORTED_MODULE_6__["FontIcon"] : _Icon__WEBPACK_IMPORTED_MODULE_6__["Icon"];
        var isRTL = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])();
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusZone__WEBPACK_IMPORTED_MODULE_5__["FocusZone"], { role: "row", "aria-label": ariaLabel, className: classNames.root, componentRef: this._rootComponent, ref: this._onRootRef, onMouseMove: this._onRootMouseMove, "data-automationid": "DetailsHeader", style: { minWidth: rowWidth }, direction: _FocusZone__WEBPACK_IMPORTED_MODULE_5__["FocusZoneDirection"].horizontal },
            showCheckbox
                ? [
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: "__checkbox", className: classNames.cellIsCheck, "aria-labelledby": this._id + "-check", onClick: !isCheckboxHidden ? this._onSelectAllClicked : undefined, "aria-colindex": 1, role: 'columnheader' }, onRenderColumnHeaderTooltip({
                        hostClassName: classNames.checkTooltip,
                        id: this._id + "-checkTooltip",
                        setAriaDescribedBy: false,
                        content: ariaLabelForSelectAllCheckbox,
                        children: (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DetailsRowCheck__WEBPACK_IMPORTED_MODULE_10__["DetailsRowCheck"], { id: this._id + "-check", "aria-label": selectionMode === _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_11__["SelectionMode"].multiple ? ariaLabelForSelectAllCheckbox : ariaLabelForSelectionColumn, "aria-describedby": !isCheckboxHidden
                                ? ariaLabelForSelectAllCheckbox && !this.props.onRenderColumnHeaderTooltip
                                    ? this._id + "-checkTooltip"
                                    : undefined
                                : ariaLabelForSelectionColumn && !this.props.onRenderColumnHeaderTooltip
                                    ? this._id + "-checkTooltip"
                                    : undefined, "data-is-focusable": !isCheckboxHidden || undefined, isHeader: true, selected: isAllSelected, anySelected: false, canSelect: !isCheckboxHidden, className: classNames.check, onRenderDetailsCheckbox: onRenderDetailsCheckbox, useFastIcons: useFastIcons, isVisible: isCheckboxAlwaysVisible }))
                    }, this._onRenderColumnHeaderTooltip)),
                    !this.props.onRenderColumnHeaderTooltip ? (ariaLabelForSelectAllCheckbox && !isCheckboxHidden ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { key: "__checkboxLabel", id: this._id + "-checkTooltip", className: classNames.accessibleLabel, "aria-hidden": true }, ariaLabelForSelectAllCheckbox)) : ariaLabelForSelectionColumn && isCheckboxHidden ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { key: "__checkboxLabel", id: this._id + "-checkTooltip", className: classNames.accessibleLabel, "aria-hidden": true }, ariaLabelForSelectionColumn)) : null) : null
                ]
                : null,
            groupNestingDepth > 0 && this.props.collapseAllVisibility === _GroupedList__WEBPACK_IMPORTED_MODULE_9__["CollapseAllVisibility"].visible ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.cellIsGroupExpander, onClick: this._onToggleCollapseAll, "data-is-focusable": true, "aria-label": ariaLabelForToggleAllGroupsButton, "aria-expanded": !isAllCollapsed, role: ariaLabelForToggleAllGroupsButton ? 'button' : undefined },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { className: classNames.collapseButton, iconName: isRTL ? 'ChevronLeftMed' : 'ChevronRightMed' }))) : null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_8__["GroupSpacer"], { indentWidth: indentWidth, count: groupNestingDepth - 1 }),
            columns.map(function (column, columnIndex) {
                var _isDraggable = columnReorderProps
                    ? columnIndex >= frozenColumnCountFromStart && columnIndex < columns.length - frozenColumnCountFromEnd
                    : false;
                return [
                    columnReorderProps &&
                        (_isDraggable || columnIndex === columns.length - frozenColumnCountFromEnd) &&
                        _this._renderDropHint(columnIndex),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_components_DetailsList_DetailsColumn__WEBPACK_IMPORTED_MODULE_13__["DetailsColumn"], { column: column, key: column.key, columnIndex: (showCheckbox ? 2 : 1) + columnIndex, parentId: _this._id, isDraggable: _isDraggable, updateDragInfo: _this._updateDragInfo, dragDropHelper: _this._dragDropHelper, onColumnClick: onColumnClick, onColumnContextMenu: onColumnContextMenu, 
                        // Do not render tooltips by default, but allow for override via props.
                        onRenderColumnHeaderTooltip: _this.props.onRenderColumnHeaderTooltip, isDropped: _this._onDropIndexInfo.targetIndex === columnIndex, cellStyleProps: _this.props.cellStyleProps, useFastIcons: useFastIcons }),
                    _this._renderColumnDivider(columnIndex)
                ];
            }),
            columnReorderProps && frozenColumnCountFromEnd === 0 && this._renderDropHint(columns.length),
            isSizing && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Layer__WEBPACK_IMPORTED_MODULE_7__["Layer"], null,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.sizingOverlay, onMouseMove: this._onSizerMouseMove, onMouseUp: this._onSizerMouseUp })))));
    };
    /** Set focus to the active thing in the focus area. */
    DetailsHeaderBase.prototype.focus = function () {
        return Boolean(this._rootComponent.current && this._rootComponent.current.focus());
    };
    /**
     * Gets column reorder props from this.props. If the calling code is part of setting up or
     * handling drag/drop events, it's safe to assume that this method's return value is defined
     * (because drag/drop handling will only be set up if reorder props are given).
     */
    DetailsHeaderBase.prototype._getColumnReorderProps = function () {
        var _a = this.props, columnReorderOptions = _a.columnReorderOptions, columnReorderProps = _a.columnReorderProps;
        return columnReorderProps || (columnReorderOptions && tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, columnReorderOptions, { onColumnDragEnd: undefined }));
    };
    DetailsHeaderBase.prototype._getHeaderDragDropOptions = function () {
        var options = {
            selectionIndex: 1,
            context: { data: this, index: 0 },
            canDrag: function () { return false; },
            canDrop: function () { return true; },
            onDragStart: function () { return undefined; },
            updateDropState: this._updateDroppingState,
            onDrop: this._onDrop,
            onDragEnd: function () { return undefined; },
            onDragOver: this._onDragOver
        };
        return options;
    };
    DetailsHeaderBase.prototype._isValidCurrentDropHintIndex = function () {
        return this._currentDropHintIndex >= 0;
    };
    /**
     * @returns whether or not the "Select All" checkbox column is hidden.
     */
    DetailsHeaderBase.prototype._isCheckboxColumnHidden = function () {
        var _a = this.props, selectionMode = _a.selectionMode, checkboxVisibility = _a.checkboxVisibility;
        return selectionMode === _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_11__["SelectionMode"].none || checkboxVisibility === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["CheckboxVisibility"].hidden;
    };
    DetailsHeaderBase.prototype._resetDropHints = function () {
        if (this._currentDropHintIndex >= 0) {
            this._updateDropHintElement(this._dropHintDetails[this._currentDropHintIndex].dropHintElementRef, 'none');
            this._currentDropHintIndex = -1;
        }
    };
    DetailsHeaderBase.prototype._updateDropHintElement = function (element, displayProperty) {
        element.childNodes[1].style.display = displayProperty;
        element.childNodes[0].style.display = displayProperty;
    };
    DetailsHeaderBase.prototype._isEventOnHeader = function (event) {
        if (this._rootElement) {
            var clientRect = this._rootElement.getBoundingClientRect();
            if (event.clientX > clientRect.left &&
                event.clientX < clientRect.right &&
                event.clientY > clientRect.top &&
                event.clientY < clientRect.bottom) {
                return _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnDragEndLocation"].header;
            }
        }
    };
    DetailsHeaderBase.prototype._renderColumnDivider = function (columnIndex) {
        var _a = this.props.columns, columns = _a === void 0 ? NO_COLUMNS : _a;
        var column = columns[columnIndex];
        var onRenderDivider = column.onRenderDivider;
        return onRenderDivider
            ? onRenderDivider({ column: column, columnIndex: columnIndex }, this._renderColumnSizer)
            : this._renderColumnSizer({ column: column, columnIndex: columnIndex });
    };
    DetailsHeaderBase.prototype._renderDropHint = function (dropHintIndex) {
        var classNames = this._classNames;
        var IconComponent = this.props.useFastIcons ? _Icon__WEBPACK_IMPORTED_MODULE_6__["FontIcon"] : _Icon__WEBPACK_IMPORTED_MODULE_6__["Icon"];
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: 'dropHintKey', className: classNames.dropHintStyle, id: "columnDropHint_" + dropHintIndex },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { key: "dropHintCircleKey", "aria-hidden": true, "data-is-focusable": false, "data-sizer-index": dropHintIndex, className: classNames.dropHintCaretStyle, iconName: 'CircleShapeSolid' }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: "dropHintLineKey", "aria-hidden": true, "data-is-focusable": false, "data-sizer-index": dropHintIndex, className: classNames.dropHintLineStyle })));
    };
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @param columnIndex - index of the column user double clicked
     * @param ev - mouse double click event
     */
    DetailsHeaderBase.prototype._onSizerDoubleClick = function (columnIndex, ev) {
        var _a = this.props, onColumnAutoResized = _a.onColumnAutoResized, _b = _a.columns, columns = _b === void 0 ? NO_COLUMNS : _b;
        if (onColumnAutoResized) {
            onColumnAutoResized(columns[columnIndex], columnIndex);
        }
    };
    DetailsHeaderBase.prototype._onSelectionChanged = function () {
        var isAllSelected = !!this.props.selection && this.props.selection.isAllSelected();
        if (this.state.isAllSelected !== isAllSelected) {
            this.setState({
                isAllSelected: isAllSelected
            });
        }
    };
    DetailsHeaderBase.defaultProps = {
        selectAllVisibility: _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_14__["SelectAllVisibility"].visible,
        collapseAllVisibility: _GroupedList__WEBPACK_IMPORTED_MODULE_9__["CollapseAllVisibility"].visible,
        useFastIcons: true
    };
    return DetailsHeaderBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

function _liesBetween(target, left, right) {
    return Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])() ? target <= left && target >= right : target >= left && target <= right;
}
function _isBefore(a, b) {
    return Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])() ? a >= b : a <= b;
}
function _isAfter(a, b) {
    return Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getRTL"])() ? a <= b : a >= b;
}
function _stopPropagation(ev) {
    ev.stopPropagation();
}
//# sourceMappingURL=DetailsHeader.base.js.map

/***/ }),

/***/ "Bgjg":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layer_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.base */ "7Arc");
/* harmony import */ var _Layer_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layer.styles */ "2X7w");



var Layer = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Layer_base__WEBPACK_IMPORTED_MODULE_1__["LayerBase"], _Layer_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Layer',
    fields: ['hostId', 'theme', 'styles']
});
//# sourceMappingURL=Layer.js.map

/***/ }),

/***/ "CNvk":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.base.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogContentBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogContentBase", function() { return DialogContentBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogContent.types */ "F+OE");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Button */ "xk/t");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _DialogFooter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DialogFooter */ "T/ax");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6__);







var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var DialogFooterType = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DialogFooter__WEBPACK_IMPORTED_MODULE_5__["DialogFooter"], null).type;
var DialogContentBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DialogContentBase, _super);
    function DialogContentBase(props) {
        return _super.call(this, props) || this;
    }
    DialogContentBase.prototype.render = function () {
        var _a = this.props, showCloseButton = _a.showCloseButton, className = _a.className, closeButtonAriaLabel = _a.closeButtonAriaLabel, onDismiss = _a.onDismiss, subTextId = _a.subTextId, subText = _a.subText, titleId = _a.titleId, title = _a.title, type = _a.type, styles = _a.styles, theme = _a.theme, draggableHeaderClassName = _a.draggableHeaderClassName;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            isLargeHeader: type === _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].largeHeader,
            isClose: type === _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].close,
            draggableHeaderClassName: draggableHeaderClassName
        });
        var groupings = this._groupChildren();
        var subTextContent;
        if (subText) {
            subTextContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { className: classNames.subText, id: subTextId }, subText));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.content },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.header },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", { className: classNames.title, id: titleId, role: "heading", "aria-level": 2 }, title),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.topButton },
                    this.props.topButtonsProps.map(function (props, index) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_4__["IconButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ key: props.uniqueId || index }, props))); }),
                    (type === _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].close || (showCloseButton && type !== _DialogContent_types__WEBPACK_IMPORTED_MODULE_3__["DialogType"].largeHeader)) && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_4__["IconButton"], { className: classNames.button, iconProps: { iconName: 'Cancel' }, ariaLabel: closeButtonAriaLabel, onClick: onDismiss })))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.inner },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.innerContent },
                    subTextContent,
                    groupings.contents),
                groupings.footers)));
    };
    // @TODO - typing the footers as an array of DialogFooter is difficult because
    // casing "child as DialogFooter" causes a problem because
    // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
    DialogContentBase.prototype._groupChildren = function () {
        var groupings = {
            footers: [],
            contents: []
        };
        react__WEBPACK_IMPORTED_MODULE_1__["Children"].map(this.props.children, function (child) {
            if (typeof child === 'object' && child !== null && child.type === DialogFooterType) {
                groupings.footers.push(child);
            }
            else {
                groupings.contents.push(child);
            }
        });
        return groupings;
    };
    DialogContentBase.defaultProps = {
        showCloseButton: false,
        className: '',
        topButtonsProps: [],
        closeButtonAriaLabel: 'Close'
    };
    DialogContentBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_6__["withResponsiveMode"]
    ], DialogContentBase);
    return DialogContentBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=DialogContent.base.js.map

/***/ }),

/***/ "CpaK":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsRowCheck.js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRowCheck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRowCheck", function() { return DetailsRowCheck; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Check__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Check */ "idBX");
/* harmony import */ var _Check__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Check__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DetailsRowCheck_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailsRowCheck.styles */ "rkb2");





var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var DetailsRowCheckBase = function (props) {
    var _a = props.isVisible, isVisible = _a === void 0 ? false : _a, _b = props.canSelect, canSelect = _b === void 0 ? false : _b, _c = props.anySelected, anySelected = _c === void 0 ? false : _c, _d = props.selected, selected = _d === void 0 ? false : _d, _e = props.isHeader, isHeader = _e === void 0 ? false : _e, className = props.className, checkClassName = props.checkClassName, styles = props.styles, theme = props.theme, compact = props.compact, onRenderDetailsCheckbox = props.onRenderDetailsCheckbox, _f = props.useFastIcons, useFastIcons = _f === void 0 ? true : _f, // must be removed from buttonProps
    buttonProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](props, ["isVisible", "canSelect", "anySelected", "selected", "isHeader", "className", "checkClassName", "styles", "theme", "compact", "onRenderDetailsCheckbox", "useFastIcons"]);
    var defaultCheckboxRender = useFastIcons ? _fastDefaultCheckboxRender : _defaultCheckboxRender;
    var onRenderCheckbox = onRenderDetailsCheckbox || defaultCheckboxRender;
    var classNames = getClassNames(styles, {
        theme: theme,
        canSelect: canSelect,
        selected: selected,
        anySelected: anySelected,
        className: className,
        isHeader: isHeader,
        isVisible: isVisible,
        compact: compact
    });
    var detailsCheckboxProps = {
        checked: selected,
        theme: theme
    };
    return canSelect ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps, { role: "checkbox", className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])(classNames.root, classNames.check), "aria-checked": selected, "data-selection-toggle": true, "data-automationid": "DetailsRowCheck" }), onRenderCheckbox(detailsCheckboxProps, defaultCheckboxRender))) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps, { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])(classNames.root, classNames.check) })));
};
function _defaultCheckboxRender(checkboxProps) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Check__WEBPACK_IMPORTED_MODULE_3__["Check"], { checked: checkboxProps.checked });
}
function _fastDefaultCheckboxRender(checkboxProps) {
    return Object(_Check__WEBPACK_IMPORTED_MODULE_3__["getCheck"])(checkboxProps.theme, checkboxProps.checked);
}
var DetailsRowCheck = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["styled"])(DetailsRowCheckBase, _DetailsRowCheck_styles__WEBPACK_IMPORTED_MODULE_4__["getStyles"], undefined, { scope: 'DetailsRowCheck' }, true);
//# sourceMappingURL=DetailsRowCheck.js.map

/***/ }),

/***/ "E29L":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Checkbox/Checkbox.styles.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);


var GlobalClassNames = {
    root: 'ms-Checkbox',
    label: 'ms-Checkbox-label',
    checkbox: 'ms-Checkbox-checkbox',
    checkmark: 'ms-Checkbox-checkmark',
    text: 'ms-Checkbox-text'
};
var MS_CHECKBOX_LABEL_SIZE = '20px';
var MS_CHECKBOX_TRANSITION_DURATION = '200ms';
var MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';
var getStyles = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var className = props.className, theme = props.theme, reversed = props.reversed, checked = props.checked, disabled = props.disabled, isUsingCustomLabelRender = props.isUsingCustomLabelRender, indeterminate = props.indeterminate;
    var semanticColors = theme.semanticColors, effects = theme.effects, palette = theme.palette, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var checkmarkFontColor = semanticColors.inputForegroundChecked;
    // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBorder
    var checkmarkFontColorHovered = palette.neutralSecondary;
    // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.smallInputBorder
    var checkboxBorderColor = palette.neutralPrimary;
    var checkboxBorderIndeterminateColor = semanticColors.inputBackgroundChecked;
    var checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
    var checkboxBorderColorDisabled = semanticColors.disabledBodySubtext;
    var checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
    var checkboxBorderIndeterminateHoveredColor = semanticColors.inputBackgroundCheckedHovered;
    var checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
    // TODO: after updating the semanticColors slots mapping following 2 tokens need to be semanticColors.inputBackgroundCheckedHovered
    var checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
    var checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
    var checkboxHoveredTextColor = semanticColors.inputTextHovered;
    var checkboxBackgroundDisabledChecked = semanticColors.disabledBodySubtext;
    var checkboxTextColor = semanticColors.bodyText;
    var checkboxTextColorDisabled = semanticColors.disabledText;
    var indeterminateDotStyles = [
        {
            content: '""',
            borderRadius: effects.roundedCorner2,
            position: 'absolute',
            width: 10,
            height: 10,
            top: 4,
            left: 4,
            boxSizing: 'border-box',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: disabled ? checkboxBorderColorDisabled : checkboxBorderIndeterminateColor,
            transitionProperty: 'border-width, border, border-color',
            transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
            transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING
        }
    ];
    return {
        root: [
            classNames.root,
            {
                position: 'relative',
                display: 'flex'
            },
            reversed && 'reversed',
            checked && 'is-checked',
            !disabled && 'is-enabled',
            disabled && 'is-disabled',
            !disabled && [
                !checked && {
                    selectors: (_a = {},
                        _a[":hover ." + classNames.checkbox] = {
                            borderColor: checkboxBorderHoveredColor,
                            selectors: (_b = {},
                                _b[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                                    borderColor: 'Highlight'
                                },
                                _b)
                        },
                        _a[":focus ." + classNames.checkbox] = { borderColor: checkboxBorderHoveredColor },
                        _a[":hover ." + classNames.checkmark] = {
                            color: checkmarkFontColorHovered,
                            opacity: '1',
                            selectors: (_c = {},
                                _c[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                                    color: 'Highlight'
                                },
                                _c)
                        },
                        _a)
                },
                checked &&
                    !indeterminate && {
                    selectors: (_d = {},
                        _d[":hover ." + classNames.checkbox] = {
                            background: checkboxBackgroundCheckedHovered,
                            borderColor: checkboxBorderColorCheckedHovered
                        },
                        _d[":focus ." + classNames.checkbox] = {
                            background: checkboxBackgroundCheckedHovered,
                            borderColor: checkboxBorderColorCheckedHovered
                        },
                        _d["." + classNames.checkbox] = {
                            background: checkboxBorderColorChecked,
                            borderColor: checkboxBorderColorChecked
                        },
                        _d[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                            selectors: (_e = {},
                                _e[":hover ." + classNames.checkbox] = {
                                    background: 'Window',
                                    borderColor: 'Highlight'
                                },
                                _e[":focus ." + classNames.checkbox] = {
                                    background: 'Highlight'
                                },
                                _e[":focus:hover ." + classNames.checkbox] = {
                                    background: 'Highlight'
                                },
                                _e[":focus:hover ." + classNames.checkmark] = {
                                    color: 'Window'
                                },
                                _e[":hover ." + classNames.checkmark] = {
                                    color: 'Highlight'
                                },
                                _e)
                        },
                        _d)
                },
                indeterminate && {
                    selectors: (_f = {},
                        _f[":hover ." + classNames.checkbox + ", :hover ." + classNames.checkbox + ":after"] = {
                            borderColor: checkboxBorderIndeterminateHoveredColor
                        },
                        _f[":focus ." + classNames.checkbox] = {
                            borderColor: checkboxBorderIndeterminateHoveredColor
                        },
                        _f[":hover ." + classNames.checkmark] = {
                            opacity: '0'
                        },
                        _f)
                },
                {
                    selectors: (_g = {},
                        _g[":hover ." + classNames.text] = { color: checkboxHoveredTextColor },
                        _g[":focus ." + classNames.text] = { color: checkboxHoveredTextColor },
                        _g)
                }
            ],
            className
        ],
        input: {
            position: 'absolute',
            background: 'none',
            opacity: 0,
            selectors: (_h = {},
                _h["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus + label::before"] = {
                    outline: '1px solid ' + theme.palette.neutralSecondary,
                    outlineOffset: '2px',
                    selectors: (_j = {},
                        _j[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                            outline: '1px solid ActiveBorder'
                        },
                        _j)
                },
                _h)
        },
        label: [
            classNames.label,
            theme.fonts.medium,
            {
                display: 'flex',
                alignItems: isUsingCustomLabelRender ? 'center' : 'flex-start',
                cursor: disabled ? 'default' : 'pointer',
                position: 'relative',
                userSelect: 'none',
                textAlign: 'left'
            },
            reversed && {
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end'
            },
            {
                selectors: {
                    '&::before': {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        content: '""',
                        pointerEvents: 'none'
                    }
                }
            }
        ],
        checkbox: [
            classNames.checkbox,
            {
                position: 'relative',
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                height: MS_CHECKBOX_LABEL_SIZE,
                width: MS_CHECKBOX_LABEL_SIZE,
                border: "1px solid " + checkboxBorderColor,
                borderRadius: effects.roundedCorner2,
                boxSizing: 'border-box',
                transitionProperty: 'background, border, border-color',
                transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
                transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,
                /* in case the icon is bigger than the box */
                overflow: 'hidden',
                selectors: {
                    ':after': indeterminate ? indeterminateDotStyles : null
                }
            },
            indeterminate && {
                borderColor: checkboxBorderIndeterminateColor
            },
            !reversed
                ? // this margin on the checkbox is for backwards compat.
                    // notably it has the effect where a customRender is used, there will be only a 4px margin from checkbox to label.
                    // the label by default would have another 4px margin for a total of 8px margin between checkbox and label.
                    // we don't combine the two (and move it into the text) to not incur a breaking change for everyone using custom render atm.
                    {
                        marginRight: 4
                    }
                : {
                    marginLeft: 4
                },
            !disabled &&
                !indeterminate &&
                checked && {
                background: checkboxBackgroundChecked,
                borderColor: checkboxBorderColorChecked,
                selectors: (_k = {},
                    _k[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        background: 'Highlight',
                        borderColor: 'Highlight'
                    },
                    _k)
            },
            disabled && {
                borderColor: checkboxBorderColorDisabled,
                selectors: (_l = {},
                    _l[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        borderColor: 'InactiveBorder'
                    },
                    _l)
            },
            checked &&
                disabled && {
                background: checkboxBackgroundDisabledChecked,
                borderColor: checkboxBorderColorDisabled
            }
        ],
        checkmark: [
            classNames.checkmark,
            {
                opacity: checked ? '1' : '0',
                color: checkmarkFontColor,
                selectors: (_m = {},
                    _m[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        color: disabled ? 'InactiveBorder' : 'Window',
                        MsHighContrastAdjust: 'none'
                    },
                    _m)
            }
        ],
        text: [
            classNames.text,
            {
                color: disabled ? checkboxTextColorDisabled : checkboxTextColor,
                fontSize: fonts.medium.fontSize,
                lineHeight: '20px'
            },
            !reversed
                ? {
                    marginLeft: 4
                }
                : {
                    marginRight: 4
                },
            disabled && {
                selectors: (_o = {},
                    _o[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        // backwards compat for the color of the text when the checkbox was rendered
                        // using a Button.
                        color: 'InactiveBorder'
                    },
                    _o)
            }
        ]
    };
};
//# sourceMappingURL=Checkbox.styles.js.map

/***/ }),

/***/ "F+OE":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.types.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: ResponsiveMode, DialogType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogType", function() { return DialogType; });
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveMode", function() { return _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_0__["ResponsiveMode"]; });


 // Exported because the type is an optional prop and not exported otherwise.
/**
 * {@docCategory Dialog}
 */
var DialogType;
(function (DialogType) {
    /** Standard dialog */
    DialogType[DialogType["normal"] = 0] = "normal";
    /** Dialog with large header banner */
    DialogType[DialogType["largeHeader"] = 1] = "largeHeader";
    /** Dialog with an 'x' close button in the upper-right corner */
    DialogType[DialogType["close"] = 2] = "close";
})(DialogType || (DialogType = {}));
//# sourceMappingURL=DialogContent.types.js.map

/***/ }),

/***/ "FI3s":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.styles.js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    contentLgHeader: 'ms-Dialog-lgHeader',
    close: 'ms-Dialog--close',
    subText: 'ms-Dialog-subText',
    header: 'ms-Dialog-header',
    headerLg: 'ms-Dialog--lgHeader',
    button: 'ms-Dialog-button ms-Dialog-button--close',
    inner: 'ms-Dialog-inner',
    content: 'ms-Dialog-content',
    title: 'ms-Dialog-title'
};
var getStyles = function (props) {
    var _a, _b, _c;
    var className = props.className, theme = props.theme, isLargeHeader = props.isLargeHeader, isClose = props.isClose, hidden = props.hidden, isMultiline = props.isMultiline, draggableHeaderClassName = props.draggableHeaderClassName;
    var palette = theme.palette, fonts = theme.fonts, effects = theme.effects, semanticColors = theme.semanticColors;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        content: [
            isLargeHeader && [
                classNames.contentLgHeader,
                {
                    borderTop: "4px solid " + palette.themePrimary
                }
            ],
            isClose && classNames.close,
            {
                flexGrow: 1,
                overflowY: 'hidden' // required for allowScrollOnElement
            },
            className
        ],
        subText: [
            classNames.subText,
            fonts.medium,
            {
                margin: '0 0 24px 0',
                color: semanticColors.bodySubtext,
                lineHeight: '1.5',
                wordWrap: 'break-word',
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular
            }
        ],
        header: [
            classNames.header,
            {
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box'
            },
            isClose && classNames.close,
            draggableHeaderClassName && [
                draggableHeaderClassName,
                {
                    cursor: 'move'
                }
            ]
        ],
        button: [
            classNames.button,
            hidden && {
                selectors: {
                    '.ms-Icon.ms-Icon--Cancel': {
                        color: semanticColors.buttonText,
                        fontSize: _Styling__WEBPACK_IMPORTED_MODULE_0__["IconFontSizes"].medium
                    }
                }
            }
        ],
        inner: [
            classNames.inner,
            {
                padding: '0 24px 24px',
                selectors: (_a = {},
                    _a["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinSmall"] + "px) and (max-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"] + "px)"] = {
                        padding: '0 16px 16px'
                    },
                    _a)
            }
        ],
        innerContent: [
            classNames.content,
            {
                position: 'relative',
                width: '100%'
            }
        ],
        title: [
            classNames.title,
            fonts.xLarge,
            {
                color: semanticColors.bodyText,
                margin: '0',
                padding: '16px 46px 20px 24px',
                lineHeight: 'normal',
                selectors: (_b = {},
                    _b["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinSmall"] + "px) and (max-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"] + "px)"] = {
                        padding: '16px 46px 16px 16px'
                    },
                    _b)
            },
            isLargeHeader && {
                color: semanticColors.menuHeader
            },
            isMultiline && { fontSize: fonts.xxLarge.fontSize }
        ],
        topButton: [
            {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                position: 'absolute',
                top: '0',
                right: '0',
                padding: '15px 15px 0 0',
                selectors: (_c = {
                        '> *': {
                            flex: '0 0 auto'
                        },
                        '.ms-Dialog-button': {
                            color: semanticColors.buttonText
                        },
                        '.ms-Dialog-button:hover': {
                            color: semanticColors.buttonTextHovered,
                            borderRadius: effects.roundedCorner2
                        }
                    },
                    _c["@media (min-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMinSmall"] + "px) and (max-width: " + _Styling__WEBPACK_IMPORTED_MODULE_0__["ScreenWidthMaxSmall"] + "px)"] = {
                        padding: '15px 8px 0 0'
                    },
                    _c)
            }
        ]
    };
};
//# sourceMappingURL=DialogContent.styles.js.map

/***/ }),

/***/ "FzFm":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsRow.styles.js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRowGlobalClassNames, DEFAULT_CELL_STYLE_PROPS, DEFAULT_ROW_HEIGHTS, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRowGlobalClassNames", function() { return DetailsRowGlobalClassNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CELL_STYLE_PROPS", function() { return DEFAULT_CELL_STYLE_PROPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ROW_HEIGHTS", function() { return DEFAULT_ROW_HEIGHTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);



var DetailsRowGlobalClassNames = {
    root: 'ms-DetailsRow',
    compact: 'ms-DetailsList--Compact',
    cell: 'ms-DetailsRow-cell',
    cellAnimation: 'ms-DetailsRow-cellAnimation',
    cellCheck: 'ms-DetailsRow-cellCheck',
    check: 'ms-DetailsRow-check',
    cellMeasurer: 'ms-DetailsRow-cellMeasurer',
    listCellFirstChild: 'ms-List-cell:first-child',
    isContentUnselectable: 'is-contentUnselectable',
    isSelected: 'is-selected',
    isCheckVisible: 'is-check-visible',
    isRowHeader: 'is-row-header',
    fields: 'ms-DetailsRow-fields'
};
var IsFocusableSelector = "[data-is-focusable='true']";
var DEFAULT_CELL_STYLE_PROPS = {
    cellLeftPadding: 12,
    cellRightPadding: 8,
    cellExtraRightPadding: 24
};
// Source of default row heights to share.
var DEFAULT_ROW_HEIGHTS = {
    rowHeight: 42,
    compactRowHeight: 32
};
// Constant values
var values = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DEFAULT_ROW_HEIGHTS, { rowVerticalPadding: 11, compactRowVerticalPadding: 6 });
var getStyles = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var theme = props.theme, isSelected = props.isSelected, canSelect = props.canSelect, droppingClassName = props.droppingClassName, anySelected = props.anySelected, isCheckVisible = props.isCheckVisible, checkboxCellClassName = props.checkboxCellClassName, compact = props.compact, className = props.className, _o = props.cellStyleProps, cellStyleProps = _o === void 0 ? DEFAULT_CELL_STYLE_PROPS : _o, enableUpdateAnimations = props.enableUpdateAnimations;
    var palette = theme.palette, fonts = theme.fonts;
    var neutralPrimary = palette.neutralPrimary, white = palette.white, neutralSecondary = palette.neutralSecondary, neutralLighter = palette.neutralLighter, neutralLight = palette.neutralLight, neutralDark = palette.neutralDark, neutralQuaternaryAlt = palette.neutralQuaternaryAlt;
    var focusBorder = theme.semanticColors.focusBorder;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getGlobalClassNames"])(DetailsRowGlobalClassNames, theme);
    var colors = {
        // Default
        defaultHeaderText: neutralPrimary,
        defaultMetaText: neutralSecondary,
        defaultBackground: white,
        // Default Hover
        defaultHoverHeaderText: neutralDark,
        defaultHoverMetaText: neutralPrimary,
        defaultHoverBackground: neutralLighter,
        // Selected
        selectedHeaderText: neutralDark,
        selectedMetaText: neutralPrimary,
        selectedBackground: neutralLight,
        // Selected Hover
        selectedHoverHeaderText: neutralDark,
        selectedHoverMetaText: neutralPrimary,
        selectedHoverBackground: neutralQuaternaryAlt,
        // Focus
        focusHeaderText: neutralDark,
        focusMetaText: neutralPrimary,
        focusBackground: neutralLight,
        focusHoverBackground: neutralQuaternaryAlt
    };
    // Selected row styles
    var selectedStyles = [
        Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: -1, borderColor: focusBorder, outlineColor: white }),
        classNames.isSelected,
        {
            color: colors.selectedMetaText,
            background: colors.selectedBackground,
            borderBottom: "1px solid " + white,
            selectors: (_a = {
                    '&:before': {
                        position: 'absolute',
                        display: 'block',
                        top: -1,
                        height: 1,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        content: '',
                        borderTop: "1px solid " + white
                    },
                    // Selected State hover
                    '&:hover': {
                        background: colors.selectedHoverBackground,
                        color: colors.selectedHoverMetaText,
                        selectors: (_b = {},
                            // Selected State hover meta cell
                            _b["." + classNames.cell + " " + _Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                color: 'HighlightText',
                                selectors: {
                                    '> a': {
                                        color: 'HighlightText'
                                    }
                                }
                            },
                            // Selected State hover Header cell
                            _b["." + classNames.isRowHeader] = {
                                color: colors.selectedHoverHeaderText,
                                selectors: (_c = {},
                                    _c[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                        color: 'HighlightText'
                                    },
                                    _c)
                            },
                            // Ensure high-contrast mode overrides default hover background
                            _b[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                background: 'Highlight'
                            },
                            _b)
                    },
                    // Focus state
                    '&:focus': {
                        background: colors.focusBackground,
                        selectors: (_d = {},
                            // Selected State hover meta cell
                            _d["." + classNames.cell] = {
                                color: colors.focusMetaText,
                                selectors: (_e = {},
                                    _e[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                        color: 'HighlightText',
                                        selectors: {
                                            '> a': {
                                                color: 'HighlightText'
                                            }
                                        }
                                    },
                                    _e)
                            },
                            // Row header cell
                            _d["." + classNames.isRowHeader] = {
                                color: colors.focusHeaderText,
                                selectors: (_f = {},
                                    _f[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                        color: 'HighlightText'
                                    },
                                    _f)
                            },
                            // Ensure high-contrast mode overrides default focus background
                            _d[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                background: 'Highlight'
                            },
                            _d)
                    }
                },
                _a[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                    background: 'Highlight',
                    color: 'HighlightText',
                    MsHighContrastAdjust: 'none',
                    selectors: {
                        a: {
                            color: 'HighlightText'
                        }
                    }
                },
                // Focus and hover state
                _a['&:focus:hover'] = {
                    background: colors.focusHoverBackground
                },
                _a)
        }
    ];
    var cannotSelectStyles = [
        classNames.isContentUnselectable,
        {
            userSelect: 'none',
            cursor: 'default'
        }
    ];
    var rootCompactStyles = {
        minHeight: values.compactRowHeight,
        border: 0
    };
    var cellCompactStyles = {
        minHeight: values.compactRowHeight,
        paddingTop: values.compactRowVerticalPadding,
        paddingBottom: values.compactRowVerticalPadding,
        paddingLeft: cellStyleProps.cellLeftPadding + "px"
    };
    var defaultCellStyles = [
        Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: -1 }),
        classNames.cell,
        {
            display: 'inline-block',
            position: 'relative',
            boxSizing: 'border-box',
            minHeight: values.rowHeight,
            verticalAlign: 'top',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingTop: values.rowVerticalPadding,
            paddingBottom: values.rowVerticalPadding,
            paddingLeft: cellStyleProps.cellLeftPadding + "px",
            selectors: (_g = {
                    '& > button': {
                        maxWidth: '100%'
                    }
                },
                _g[IsFocusableSelector] = Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: -1, borderColor: neutralSecondary, outlineColor: white }),
                _g)
        },
        isSelected && {
            selectors: (_h = {},
                _h[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                    background: 'Highlight',
                    color: 'HighlightText',
                    MsHighContrastAdjust: 'none',
                    selectors: {
                        a: {
                            color: 'HighlightText'
                        }
                    }
                },
                _h)
        },
        compact && cellCompactStyles
    ];
    return {
        root: [
            classNames.root,
            _Styling__WEBPACK_IMPORTED_MODULE_1__["AnimationClassNames"].fadeIn400,
            droppingClassName,
            theme.fonts.small,
            isCheckVisible && classNames.isCheckVisible,
            Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { borderColor: focusBorder, outlineColor: white }),
            {
                borderBottom: "1px solid " + neutralLighter,
                background: colors.defaultBackground,
                color: colors.defaultMetaText,
                display: 'inline-flex',
                minWidth: '100%',
                minHeight: values.rowHeight,
                whiteSpace: 'nowrap',
                padding: 0,
                boxSizing: 'border-box',
                verticalAlign: 'top',
                textAlign: 'left',
                selectors: (_j = {},
                    _j["." + classNames.listCellFirstChild + " &:before"] = {
                        display: 'none'
                    },
                    _j['&:hover'] = {
                        background: colors.defaultHoverBackground,
                        color: colors.defaultHoverMetaText,
                        selectors: (_k = {},
                            _k["." + classNames.isRowHeader] = {
                                color: colors.defaultHoverHeaderText
                            },
                            _k)
                    },
                    _j["&:hover ." + classNames.check] = {
                        opacity: 1
                    },
                    _j["." + _Utilities__WEBPACK_IMPORTED_MODULE_2__["IsFocusVisibleClassName"] + " &:focus ." + classNames.check] = {
                        opacity: 1
                    },
                    _j)
            },
            isSelected && selectedStyles,
            !canSelect && cannotSelectStyles,
            compact && rootCompactStyles,
            className
        ],
        cellUnpadded: {
            paddingRight: cellStyleProps.cellRightPadding + "px"
        },
        cellPadded: {
            paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding + "px",
            selectors: (_l = {},
                _l["&." + classNames.cellCheck] = {
                    paddingRight: 0
                },
                _l)
        },
        cell: defaultCellStyles,
        cellAnimation: enableUpdateAnimations && _Styling__WEBPACK_IMPORTED_MODULE_1__["AnimationStyles"].slideLeftIn40,
        cellMeasurer: [
            classNames.cellMeasurer,
            {
                overflow: 'visible',
                whiteSpace: 'nowrap'
            }
        ],
        checkCell: [
            defaultCellStyles,
            classNames.cellCheck,
            checkboxCellClassName,
            {
                padding: 0,
                // Ensure that the check cell covers the top border of the cell.
                // This ensures the click target does not leave a spot which would
                // cause other items to be deselected.
                paddingTop: 1,
                marginTop: -1,
                flexShrink: 0
            }
        ],
        checkCover: {
            position: 'absolute',
            top: -1,
            left: 0,
            bottom: 0,
            right: 0,
            display: anySelected ? 'block' : 'none'
        },
        fields: [
            classNames.fields,
            {
                display: 'flex',
                alignItems: 'stretch'
            }
        ],
        isRowHeader: [
            classNames.isRowHeader,
            {
                color: colors.defaultHeaderText,
                fontSize: fonts.medium.fontSize
            },
            isSelected && {
                color: colors.selectedHeaderText,
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semibold,
                selectors: (_m = {},
                    _m[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                        color: 'HighlightText'
                    },
                    _m)
            }
        ],
        isMultiline: [
            defaultCellStyles,
            {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                textOverflow: 'clip'
            }
        ],
        check: [classNames.check]
    };
};
//# sourceMappingURL=DetailsRow.styles.js.map

/***/ }),

/***/ "G0Zq":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/version.js ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/set-version */ "LCDl");
// office-ui-fabric-react@7.59.0
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.

Object(_uifabric_set_version__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('office-ui-fabric-react', '7.59.0');
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "G1YK":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsList.types.js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: ColumnActionsMode, ConstrainMode, ColumnDragEndLocation, DetailsListLayoutMode, CheckboxVisibility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnActionsMode", function() { return ColumnActionsMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConstrainMode", function() { return ConstrainMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnDragEndLocation", function() { return ColumnDragEndLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsListLayoutMode", function() { return DetailsListLayoutMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxVisibility", function() { return CheckboxVisibility; });
/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 * {@docCategory DetailsList}
 */
var ColumnActionsMode;
(function (ColumnActionsMode) {
    /**
     * Renders the column header as disabled.
     */
    ColumnActionsMode[ColumnActionsMode["disabled"] = 0] = "disabled";
    /**
     * Renders the column header is clickable.
     */
    ColumnActionsMode[ColumnActionsMode["clickable"] = 1] = "clickable";
    /**
     * Renders the column header ias clickable and displays the dropdown cheveron.
     */
    ColumnActionsMode[ColumnActionsMode["hasDropdown"] = 2] = "hasDropdown";
})(ColumnActionsMode || (ColumnActionsMode = {}));
/**
 * {@docCategory DetailsList}
 */
var ConstrainMode;
(function (ConstrainMode) {
    /** If specified, lets the content grow which allows the page to manage scrolling. */
    ConstrainMode[ConstrainMode["unconstrained"] = 0] = "unconstrained";
    /**
     * If specified, constrains the list to the given layout space.
     */
    ConstrainMode[ConstrainMode["horizontalConstrained"] = 1] = "horizontalConstrained";
})(ConstrainMode || (ConstrainMode = {}));
/**
 * Enum to describe where the column has been dropped, after starting the drag
 * {@docCategory DetailsList}
 */
var ColumnDragEndLocation;
(function (ColumnDragEndLocation) {
    /**
     * Drag ended outside of current list
     */
    ColumnDragEndLocation[ColumnDragEndLocation["outside"] = 0] = "outside";
    /**
     * Drag ended on current List
     */
    ColumnDragEndLocation[ColumnDragEndLocation["surface"] = 1] = "surface";
    /**
     * Drag ended on Header
     */
    ColumnDragEndLocation[ColumnDragEndLocation["header"] = 2] = "header";
})(ColumnDragEndLocation || (ColumnDragEndLocation = {}));
/**
 * {@docCategory DetailsList}
 */
var DetailsListLayoutMode;
(function (DetailsListLayoutMode) {
    /**
     * Lets the user resize columns and makes not attempt to fit them.
     */
    DetailsListLayoutMode[DetailsListLayoutMode["fixedColumns"] = 0] = "fixedColumns";
    /**
     * Manages which columns are visible, tries to size them according to their min/max rules and drops
     * off columns that can't fit and have isCollapsible set.
     */
    DetailsListLayoutMode[DetailsListLayoutMode["justified"] = 1] = "justified";
})(DetailsListLayoutMode || (DetailsListLayoutMode = {}));
/**
 * {@docCategory DetailsList}
 */
var CheckboxVisibility;
(function (CheckboxVisibility) {
    /**
     * Visible on hover.
     */
    CheckboxVisibility[CheckboxVisibility["onHover"] = 0] = "onHover";
    /**
     * Visible always.
     */
    CheckboxVisibility[CheckboxVisibility["always"] = 1] = "always";
    /**
     * Hide checkboxes.
     */
    CheckboxVisibility[CheckboxVisibility["hidden"] = 2] = "hidden";
})(CheckboxVisibility || (CheckboxVisibility = {}));
//# sourceMappingURL=DetailsList.types.js.map

/***/ }),

/***/ "G248":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/selection/SelectionZone.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: SelectionZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionZone", function() { return SelectionZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interfaces */ "lQgf");




// Selection definitions:
//
// Anchor index: the point from which a range selection starts.
// Focus index: the point from which layout movement originates from.
//
// These two can differ. Tests:
//
// If you start at index 5
// Shift click to index 10
//    The focus is 10, the anchor is 5.
// If you shift click at index 0
//    The anchor remains at 5, the items between 0 and 5 are selected and everything else is cleared.
// If you click index 8
//    The anchor and focus are set to 8.
var SELECTION_DISABLED_ATTRIBUTE_NAME = 'data-selection-disabled';
var SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index';
var SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';
var SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke';
var SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle';
var SELECTION_SELECT_ATTRIBUTE_NAME = 'data-selection-select';
/**
 * {@docCategory Selection}
 */
var SelectionZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SelectionZone, _super);
    function SelectionZone() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._root = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        /**
         * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
         * react to the event. Note that focus events in IE \<= 11 will occur asynchronously after .focus() has
         * been called on an element, so we need a flag to store the idea that we will bypass the "next"
         * focus event that occurs. This method does that.
         */
        _this.ignoreNextFocus = function () {
            _this._handleNextFocus(false);
        };
        _this._onMouseDownCapture = function (ev) {
            var target = ev.target;
            if (document.activeElement !== target && !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(document.activeElement, target)) {
                _this.ignoreNextFocus();
                return;
            }
            if (!Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(target, _this._root.current)) {
                return;
            }
            while (target !== _this._root.current) {
                if (_this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    _this.ignoreNextFocus();
                    break;
                }
                target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
            }
        };
        /**
         * When we focus an item, for single/multi select scenarios, we should try to select it immediately
         * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
         * specially.
         */
        _this._onFocus = function (ev) {
            var target = ev.target;
            var selection = _this.props.selection;
            var isToggleModifierPressed = _this._isCtrlPressed || _this._isMetaPressed;
            var selectionMode = _this._getSelectionMode();
            if (_this._shouldHandleFocus && selectionMode !== _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].none) {
                var isToggle = _this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
                var itemRoot = _this._findItemRoot(target);
                if (!isToggle && itemRoot) {
                    var index = _this._getItemIndex(itemRoot);
                    if (isToggleModifierPressed) {
                        // set anchor only.
                        selection.setIndexSelected(index, selection.isIndexSelected(index), true);
                        if (_this.props.enterModalOnTouch && _this._isTouch && selection.setModal) {
                            selection.setModal(true);
                            _this._setIsTouch(false);
                        }
                    }
                    else {
                        if (_this.props.isSelectedOnFocus) {
                            _this._onItemSurfaceClick(ev, index);
                        }
                    }
                }
            }
            _this._handleNextFocus(false);
        };
        _this._onMouseDown = function (ev) {
            _this._updateModifiers(ev);
            var target = ev.target;
            var itemRoot = _this._findItemRoot(target);
            // No-op if selection is disabled
            if (_this._isSelectionDisabled(target)) {
                return;
            }
            while (target !== _this._root.current) {
                if (_this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                    break;
                }
                else if (itemRoot) {
                    if (_this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if (_this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if ((target === itemRoot || _this._shouldAutoSelect(target)) &&
                        !_this._isShiftPressed &&
                        !_this._isCtrlPressed &&
                        !_this._isMetaPressed) {
                        _this._onInvokeMouseDown(ev, _this._getItemIndex(itemRoot));
                        break;
                    }
                    else if (_this.props.disableAutoSelectOnInputElements &&
                        (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT')) {
                        return;
                    }
                }
                target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
            }
        };
        _this._onTouchStartCapture = function (ev) {
            _this._setIsTouch(true);
        };
        _this._onClick = function (ev) {
            _this._updateModifiers(ev);
            var target = ev.target;
            var itemRoot = _this._findItemRoot(target);
            var isSelectionDisabled = _this._isSelectionDisabled(target);
            while (target !== _this._root.current) {
                if (_this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                    if (!isSelectionDisabled) {
                        _this._onToggleAllClick(ev);
                    }
                    break;
                }
                else if (itemRoot) {
                    var index = _this._getItemIndex(itemRoot);
                    if (_this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                        if (!isSelectionDisabled) {
                            if (_this._isShiftPressed) {
                                _this._onItemSurfaceClick(ev, index);
                            }
                            else {
                                _this._onToggleClick(ev, index);
                            }
                        }
                        break;
                    }
                    else if (_this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                        // Items should be invokable even if selection is disabled.
                        _this._onInvokeClick(ev, index);
                        break;
                    }
                    else if (target === itemRoot) {
                        if (!isSelectionDisabled) {
                            _this._onItemSurfaceClick(ev, index);
                        }
                        break;
                    }
                    else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT') {
                        return;
                    }
                }
                target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
            }
        };
        _this._onContextMenu = function (ev) {
            var target = ev.target;
            var _a = _this.props, onItemContextMenu = _a.onItemContextMenu, selection = _a.selection;
            if (onItemContextMenu) {
                var itemRoot = _this._findItemRoot(target);
                if (itemRoot) {
                    var index = _this._getItemIndex(itemRoot);
                    _this._onInvokeMouseDown(ev, index);
                    var skipPreventDefault = onItemContextMenu(selection.getItems()[index], index, ev.nativeEvent);
                    // In order to keep back compat, if the value here is undefined, then we should still
                    // call preventDefault(). Only in the case where true is explicitly returned should
                    // the call be skipped.
                    if (!skipPreventDefault) {
                        ev.preventDefault();
                    }
                }
            }
        };
        /**
         * In multi selection, if you double click within an item's root (but not within the invoke element or input elements),
         * we should execute the invoke handler.
         */
        _this._onDoubleClick = function (ev) {
            var target = ev.target;
            var onItemInvoked = _this.props.onItemInvoked;
            var itemRoot = _this._findItemRoot(target);
            if (itemRoot && onItemInvoked && !_this._isInputElement(target)) {
                var index = _this._getItemIndex(itemRoot);
                while (target !== _this._root.current) {
                    if (_this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME) || _this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if (target === itemRoot) {
                        _this._onInvokeClick(ev, index);
                        break;
                    }
                    target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
                }
                target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
            }
        };
        _this._onKeyDownCapture = function (ev) {
            _this._updateModifiers(ev);
            _this._handleNextFocus(true);
        };
        _this._onKeyDown = function (ev) {
            _this._updateModifiers(ev);
            var target = ev.target;
            var isSelectionDisabled = _this._isSelectionDisabled(target);
            var selection = _this.props.selection;
            var isSelectAllKey = ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].a && (_this._isCtrlPressed || _this._isMetaPressed);
            var isClearSelectionKey = ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape;
            // Ignore key downs from input elements.
            if (_this._isInputElement(target)) {
                // A key was pressed while an item in this zone was focused.
                return;
            }
            var selectionMode = _this._getSelectionMode();
            // If ctrl-a is pressed, select all (if all are not already selected.)
            if (isSelectAllKey && selectionMode === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].multiple && !selection.isAllSelected()) {
                if (!isSelectionDisabled) {
                    selection.setAllSelected(true);
                }
                ev.stopPropagation();
                ev.preventDefault();
                return;
            }
            // If escape is pressed, clear selection (if any are selected.)
            if (isClearSelectionKey && selection.getSelectedCount() > 0) {
                if (!isSelectionDisabled) {
                    selection.setAllSelected(false);
                }
                ev.stopPropagation();
                ev.preventDefault();
                return;
            }
            var itemRoot = _this._findItemRoot(target);
            // If a key was pressed within an item, we should treat "enters" as invokes and "space" as toggle
            if (itemRoot) {
                var index = _this._getItemIndex(itemRoot);
                while (target !== _this._root.current) {
                    if (_this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                        // For toggle elements, assuming they are rendered as buttons, they will generate a click event,
                        // so we can no-op for any keydowns in this case.
                        break;
                    }
                    else if (_this._shouldAutoSelect(target)) {
                        if (!isSelectionDisabled) {
                            // If the event went to an element which should trigger auto-select, select it and then let
                            // the default behavior kick in.
                            _this._onInvokeMouseDown(ev, index);
                        }
                        break;
                    }
                    else if ((ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter || ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].space) &&
                        (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT')) {
                        return false;
                    }
                    else if (target === itemRoot) {
                        if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter) {
                            // Items should be invokable even if selection is disabled.
                            _this._onInvokeClick(ev, index);
                            ev.preventDefault();
                            return;
                        }
                        else if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].space) {
                            if (!isSelectionDisabled) {
                                _this._onToggleClick(ev, index);
                            }
                            ev.preventDefault();
                            return;
                        }
                        break;
                    }
                    target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
                }
            }
        };
        return _this;
    }
    SelectionZone.prototype.componentDidMount = function () {
        var win = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getWindow"])(this._root.current);
        // Track the latest modifier keys globally.
        this._events.on(win, 'keydown, keyup', this._updateModifiers, true);
        this._events.on(document, 'click', this._findScrollParentAndTryClearOnEmptyClick);
        this._events.on(document.body, 'touchstart', this._onTouchStartCapture, true);
        this._events.on(document.body, 'touchend', this._onTouchStartCapture, true);
    };
    SelectionZone.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: "ms-SelectionZone", ref: this._root, onKeyDown: this._onKeyDown, onMouseDown: this._onMouseDown, onKeyDownCapture: this._onKeyDownCapture, onClick: this._onClick, role: "presentation", onDoubleClick: this._onDoubleClick, onContextMenu: this._onContextMenu, onMouseDownCapture: this._onMouseDownCapture, onFocusCapture: this._onFocus }, this.props.children));
    };
    SelectionZone.prototype._isSelectionDisabled = function (target) {
        if (this._getSelectionMode() === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].none) {
            return true;
        }
        while (target !== this._root.current) {
            if (this._hasAttribute(target, SELECTION_DISABLED_ATTRIBUTE_NAME)) {
                return true;
            }
            target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
        }
        return false;
    };
    SelectionZone.prototype._onToggleAllClick = function (ev) {
        var selection = this.props.selection;
        var selectionMode = this._getSelectionMode();
        if (selectionMode === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].multiple) {
            selection.toggleAllSelected();
            ev.stopPropagation();
            ev.preventDefault();
        }
    };
    SelectionZone.prototype._onToggleClick = function (ev, index) {
        var selection = this.props.selection;
        var selectionMode = this._getSelectionMode();
        selection.setChangeEvents(false);
        if (this.props.enterModalOnTouch && this._isTouch && !selection.isIndexSelected(index) && selection.setModal) {
            selection.setModal(true);
            this._setIsTouch(false);
        }
        if (selectionMode === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].multiple) {
            selection.toggleIndexSelected(index);
        }
        else if (selectionMode === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].single) {
            var isSelected = selection.isIndexSelected(index);
            var isModal = selection.isModal && selection.isModal();
            selection.setAllSelected(false);
            selection.setIndexSelected(index, !isSelected, true);
            if (isModal && selection.setModal) {
                // Since the above call to setAllSelected(false) clears modal state,
                // restore it. This occurs because the SelectionMode of the Selection
                // may differ from the SelectionZone.
                selection.setModal(true);
            }
        }
        else {
            selection.setChangeEvents(true);
            return;
        }
        selection.setChangeEvents(true);
        ev.stopPropagation();
        // NOTE: ev.preventDefault is not called for toggle clicks, because this will kill the browser behavior
        // for checkboxes if you use a checkbox for the toggle.
    };
    SelectionZone.prototype._onInvokeClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, onItemInvoked = _a.onItemInvoked;
        if (onItemInvoked) {
            onItemInvoked(selection.getItems()[index], index, ev.nativeEvent);
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    SelectionZone.prototype._onItemSurfaceClick = function (ev, index) {
        var selection = this.props.selection;
        var isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
        var selectionMode = this._getSelectionMode();
        if (selectionMode === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].multiple) {
            if (this._isShiftPressed && !this._isTabPressed) {
                selection.selectToIndex(index, !isToggleModifierPressed);
            }
            else if (isToggleModifierPressed) {
                selection.toggleIndexSelected(index);
            }
            else {
                this._clearAndSelectIndex(index);
            }
        }
        else if (selectionMode === _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].single) {
            this._clearAndSelectIndex(index);
        }
    };
    SelectionZone.prototype._onInvokeMouseDown = function (ev, index) {
        var selection = this.props.selection;
        // Only do work if item is not selected.
        if (selection.isIndexSelected(index)) {
            return;
        }
        this._clearAndSelectIndex(index);
    };
    /**
     * To avoid high startup cost of traversing the DOM on component mount,
     * defer finding the scrollable parent until a click interaction.
     *
     * The styles will probably already calculated since we're running in a click handler,
     * so this is less likely to cause layout thrashing then doing it in mount.
     */
    SelectionZone.prototype._findScrollParentAndTryClearOnEmptyClick = function (ev) {
        var scrollParent = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["findScrollableParent"])(this._root.current);
        // unbind this handler and replace binding with a binding on the actual scrollable parent
        this._events.off(document, 'click', this._findScrollParentAndTryClearOnEmptyClick);
        this._events.on(scrollParent, 'click', this._tryClearOnEmptyClick);
        // If we clicked inside the scrollable parent, call through to the handler on this click.
        if ((scrollParent && ev.target instanceof Node && scrollParent.contains(ev.target)) || scrollParent === ev.target) {
            this._tryClearOnEmptyClick(ev);
        }
    };
    SelectionZone.prototype._tryClearOnEmptyClick = function (ev) {
        if (!this.props.selectionPreservedOnEmptyClick && this._isNonHandledClick(ev.target)) {
            this.props.selection.setAllSelected(false);
        }
    };
    SelectionZone.prototype._clearAndSelectIndex = function (index) {
        var selection = this.props.selection;
        var isAlreadySingleSelected = selection.getSelectedCount() === 1 && selection.isIndexSelected(index);
        if (!isAlreadySingleSelected) {
            selection.setChangeEvents(false);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, true, true);
            if (this.props.enterModalOnTouch && this._isTouch && selection.setModal) {
                selection.setModal(true);
                this._setIsTouch(false);
            }
            selection.setChangeEvents(true);
        }
    };
    /**
     * We need to track the modifier key states so that when focus events occur, which do not contain
     * modifier states in the Event object, we know how to behave.
     */
    SelectionZone.prototype._updateModifiers = function (ev) {
        this._isShiftPressed = ev.shiftKey;
        this._isCtrlPressed = ev.ctrlKey;
        this._isMetaPressed = ev.metaKey;
        var keyCode = ev.keyCode;
        this._isTabPressed = keyCode ? keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].tab : false;
    };
    SelectionZone.prototype._findItemRoot = function (target) {
        var selection = this.props.selection;
        while (target !== this._root.current) {
            var indexValue = target.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);
            var index = Number(indexValue);
            if (indexValue !== null && index >= 0 && index < selection.getItems().length) {
                break;
            }
            target = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(target);
        }
        if (target === this._root.current) {
            return undefined;
        }
        return target;
    };
    SelectionZone.prototype._getItemIndex = function (itemRoot) {
        return Number(itemRoot.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME));
    };
    SelectionZone.prototype._shouldAutoSelect = function (element) {
        return this._hasAttribute(element, SELECTION_SELECT_ATTRIBUTE_NAME);
    };
    SelectionZone.prototype._hasAttribute = function (element, attributeName) {
        var isToggle = false;
        while (!isToggle && element !== this._root.current) {
            isToggle = element.getAttribute(attributeName) === 'true';
            element = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(element);
        }
        return isToggle;
    };
    SelectionZone.prototype._isInputElement = function (element) {
        return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
    };
    SelectionZone.prototype._isNonHandledClick = function (element) {
        var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getDocument"])();
        if (doc && element) {
            while (element && element !== doc.documentElement) {
                if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["isElementTabbable"])(element)) {
                    return false;
                }
                element = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getParent"])(element);
            }
        }
        return true;
    };
    SelectionZone.prototype._handleNextFocus = function (handleFocus) {
        var _this = this;
        if (this._shouldHandleFocusTimeoutId) {
            this._async.clearTimeout(this._shouldHandleFocusTimeoutId);
            this._shouldHandleFocusTimeoutId = undefined;
        }
        this._shouldHandleFocus = handleFocus;
        if (handleFocus) {
            this._async.setTimeout(function () {
                _this._shouldHandleFocus = false;
            }, 100);
        }
    };
    SelectionZone.prototype._setIsTouch = function (isTouch) {
        var _this = this;
        if (this._isTouchTimeoutId) {
            this._async.clearTimeout(this._isTouchTimeoutId);
            this._isTouchTimeoutId = undefined;
        }
        this._isTouch = true;
        if (isTouch) {
            this._async.setTimeout(function () {
                _this._isTouch = false;
            }, 300);
        }
    };
    SelectionZone.prototype._getSelectionMode = function () {
        var selection = this.props.selection;
        var _a = this.props.selectionMode, selectionMode = _a === void 0 ? selection ? selection.mode : _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].none : _a;
        return selectionMode;
    };
    SelectionZone.defaultProps = {
        isSelectedOnFocus: true,
        selectionMode: _interfaces__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].multiple
    };
    return SelectionZone;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=SelectionZone.js.map

/***/ }),

/***/ "GVOX":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupedListSection.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupedListSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedListSection", function() { return GroupedListSection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities_selection_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/selection/index */ "08hr");
/* harmony import */ var _GroupHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GroupHeader */ "ogtB");
/* harmony import */ var _GroupShowAll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GroupShowAll */ "Gw8o");
/* harmony import */ var _GroupFooter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GroupFooter */ "gtpV");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../List */ "yKNM");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_List__WEBPACK_IMPORTED_MODULE_7__);








var DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
var GroupedListSection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GroupedListSection, _super);
    function GroupedListSection(props) {
        var _this = _super.call(this, props) || this;
        _this._root = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._list = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._onRenderGroupHeader = function (props) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupHeader__WEBPACK_IMPORTED_MODULE_4__["GroupHeader"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props));
        };
        _this._onRenderGroupShowAll = function (props) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupShowAll__WEBPACK_IMPORTED_MODULE_5__["GroupShowAll"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props));
        };
        _this._onRenderGroupFooter = function (props) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupFooter__WEBPACK_IMPORTED_MODULE_6__["GroupFooter"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props));
        };
        _this._renderSubGroup = function (subGroup, subGroupIndex) {
            var _a = _this.props, dragDropEvents = _a.dragDropEvents, dragDropHelper = _a.dragDropHelper, eventsToRegister = _a.eventsToRegister, getGroupItemLimit = _a.getGroupItemLimit, groupNestingDepth = _a.groupNestingDepth, groupProps = _a.groupProps, items = _a.items, headerProps = _a.headerProps, showAllProps = _a.showAllProps, footerProps = _a.footerProps, listProps = _a.listProps, onRenderCell = _a.onRenderCell, selection = _a.selection, selectionMode = _a.selectionMode, viewport = _a.viewport, onRenderGroupHeader = _a.onRenderGroupHeader, onRenderGroupShowAll = _a.onRenderGroupShowAll, onRenderGroupFooter = _a.onRenderGroupFooter, onShouldVirtualize = _a.onShouldVirtualize, group = _a.group, compact = _a.compact;
            var nestingDepth = subGroup.level ? subGroup.level + 1 : groupNestingDepth;
            return !subGroup || subGroup.count > 0 || (groupProps && groupProps.showEmptyGroups) ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](GroupedListSection, { ref: 'subGroup_' + subGroupIndex, key: _this._getGroupKey(subGroup, subGroupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: getGroupItemLimit, group: subGroup, groupIndex: subGroupIndex, groupNestingDepth: nestingDepth, groupProps: groupProps, headerProps: headerProps, items: items, listProps: listProps, onRenderCell: onRenderCell, selection: selection, selectionMode: selectionMode, showAllProps: showAllProps, viewport: viewport, onRenderGroupHeader: onRenderGroupHeader, onRenderGroupShowAll: onRenderGroupShowAll, onRenderGroupFooter: onRenderGroupFooter, onShouldVirtualize: onShouldVirtualize, groups: group.children, compact: compact })) : null;
        };
        /**
         * collect all the data we need to enable drag/drop for a group
         */
        _this._getGroupDragDropOptions = function () {
            var _a = _this.props, group = _a.group, groupIndex = _a.groupIndex, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.eventsToRegister;
            var options = {
                eventMap: eventsToRegister,
                selectionIndex: -1,
                context: { data: group, index: groupIndex, isGroup: true },
                canDrag: function () { return false; },
                canDrop: dragDropEvents.canDrop,
                updateDropState: _this._updateDroppingState
            };
            return options;
        };
        /**
         * update groupIsDropping state based on the input value, which is used to change style during drag and drop
         *
         * @param newValue - new isDropping state value
         * @param event - the event trigger dropping state change which can be dragenter, dragleave etc
         */
        _this._updateDroppingState = function (newIsDropping, event) {
            var isDropping = _this.state.isDropping;
            var dragDropEvents = _this.props.dragDropEvents;
            if (!isDropping) {
                if (dragDropEvents && dragDropEvents.onDragLeave) {
                    dragDropEvents.onDragLeave(event, undefined);
                }
            }
            else {
                if (dragDropEvents && dragDropEvents.onDragEnter) {
                    dragDropEvents.onDragEnter(event, undefined);
                }
            }
            if (isDropping !== newIsDropping) {
                _this.setState({ isDropping: newIsDropping });
            }
        };
        var selection = props.selection, group = props.group;
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeComponentRef"])(_this);
        _this._id = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('GroupedListSection');
        _this.state = {
            isDropping: false,
            isSelected: selection && group ? selection.isRangeSelected(group.startIndex, group.count) : false
        };
        _this._events = new _Utilities__WEBPACK_IMPORTED_MODULE_2__["EventGroup"](_this);
        return _this;
    }
    GroupedListSection.prototype.componentDidMount = function () {
        var _a = this.props, dragDropHelper = _a.dragDropHelper, selection = _a.selection;
        if (dragDropHelper && this._root.current) {
            this._dragDropSubscription = dragDropHelper.subscribe(this._root.current, this._events, this._getGroupDragDropOptions());
        }
        if (selection) {
            this._events.on(selection, _utilities_selection_index__WEBPACK_IMPORTED_MODULE_3__["SELECTION_CHANGE"], this._onSelectionChange);
        }
    };
    GroupedListSection.prototype.componentWillUnmount = function () {
        this._events.dispose();
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
        }
    };
    GroupedListSection.prototype.componentDidUpdate = function (previousProps) {
        if (this.props.group !== previousProps.group ||
            this.props.groupIndex !== previousProps.groupIndex ||
            this.props.dragDropHelper !== previousProps.dragDropHelper) {
            if (this._dragDropSubscription) {
                this._dragDropSubscription.dispose();
                delete this._dragDropSubscription;
            }
            if (this.props.dragDropHelper && this._root.current) {
                this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.current, this._events, this._getGroupDragDropOptions());
            }
        }
    };
    GroupedListSection.prototype.render = function () {
        var _a = this.props, getGroupItemLimit = _a.getGroupItemLimit, group = _a.group, groupIndex = _a.groupIndex, headerProps = _a.headerProps, showAllProps = _a.showAllProps, footerProps = _a.footerProps, viewport = _a.viewport, selectionMode = _a.selectionMode, _b = _a.onRenderGroupHeader, onRenderGroupHeader = _b === void 0 ? this._onRenderGroupHeader : _b, _c = _a.onRenderGroupShowAll, onRenderGroupShowAll = _c === void 0 ? this._onRenderGroupShowAll : _c, _d = _a.onRenderGroupFooter, onRenderGroupFooter = _d === void 0 ? this._onRenderGroupFooter : _d, onShouldVirtualize = _a.onShouldVirtualize, groupedListClassNames = _a.groupedListClassNames, groups = _a.groups, compact = _a.compact, _e = _a.listProps, listProps = _e === void 0 ? {} : _e;
        var isSelected = this.state.isSelected;
        var renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
        var isShowAllVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll && (group.count > renderCount || group.hasMoreData);
        var hasNestedGroups = group && group.children && group.children.length > 0;
        var version = listProps.version;
        var dividerProps = {
            group: group,
            groupIndex: groupIndex,
            groupLevel: group ? group.level : 0,
            isSelected: isSelected,
            selected: isSelected,
            viewport: viewport,
            selectionMode: selectionMode,
            groups: groups,
            compact: compact
        };
        var ariaControlsProps = {
            groupedListId: this._id
        };
        var groupHeaderProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, headerProps, dividerProps, ariaControlsProps);
        var groupShowAllProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, showAllProps, dividerProps);
        var groupFooterProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, footerProps, dividerProps);
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._root, className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])(groupedListClassNames && groupedListClassNames.group, this._getDroppingClassName()), role: "presentation" },
            onRenderGroupHeader(groupHeaderProps, this._onRenderGroupHeader),
            group && group.isCollapsed ? null : hasNestedGroups ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_List__WEBPACK_IMPORTED_MODULE_7__["List"], { role: "presentation", ref: this._list, items: group.children, onRenderCell: this._renderSubGroup, getItemCountForPage: this._returnOne, onShouldVirtualize: onShouldVirtualize, version: version, id: this._id })) : (this._onRenderGroup(renderCount)),
            group && group.isCollapsed ? null : isShowAllVisible && onRenderGroupShowAll(groupShowAllProps, this._onRenderGroupShowAll),
            onRenderGroupFooter(groupFooterProps, this._onRenderGroupFooter)));
    };
    GroupedListSection.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this.forceListUpdate();
    };
    GroupedListSection.prototype.forceListUpdate = function () {
        var group = this.props.group;
        if (this._list.current) {
            this._list.current.forceUpdate();
            if (group && group.children && group.children.length > 0) {
                var subGroupCount = group.children.length;
                for (var i = 0; i < subGroupCount; i++) {
                    var subGroup = this._list.current.refs['subGroup_' + String(i)];
                    if (subGroup) {
                        subGroup.forceListUpdate();
                    }
                }
            }
        }
        else {
            var subGroup = this.refs['subGroup_' + String(0)];
            if (subGroup) {
                subGroup.forceListUpdate();
            }
        }
    };
    GroupedListSection.prototype._onSelectionChange = function () {
        var _a = this.props, group = _a.group, selection = _a.selection;
        var isSelected = selection.isRangeSelected(group.startIndex, group.count);
        if (isSelected !== this.state.isSelected) {
            this.setState({ isSelected: isSelected });
        }
    };
    GroupedListSection.prototype._onRenderGroupCell = function (onRenderCell, groupNestingDepth) {
        return function (item, itemIndex) {
            return onRenderCell(groupNestingDepth, item, itemIndex);
        };
    };
    GroupedListSection.prototype._onRenderGroup = function (renderCount) {
        var _a = this.props, group = _a.group, items = _a.items, onRenderCell = _a.onRenderCell, listProps = _a.listProps, groupNestingDepth = _a.groupNestingDepth, onShouldVirtualize = _a.onShouldVirtualize;
        var count = group && !group.isShowingAll ? group.count : items.length;
        var startIndex = group ? group.startIndex : 0;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_List__WEBPACK_IMPORTED_MODULE_7__["List"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ role: "grid", items: items, onRenderCell: this._onRenderGroupCell(onRenderCell, groupNestingDepth), ref: this._list, renderCount: Math.min(count, renderCount), startIndex: startIndex, onShouldVirtualize: onShouldVirtualize, id: this._id }, listProps)));
    };
    GroupedListSection.prototype._returnOne = function () {
        return 1;
    };
    GroupedListSection.prototype._getGroupKey = function (group, index) {
        return 'group-' + (group && group.key ? group.key : String(group.level) + String(index));
    };
    /**
     * get the correct css class to reflect the dropping state for a given group
     *
     * If the group is the current drop target, return the default dropping class name
     * Otherwise, return '';
     *
     */
    GroupedListSection.prototype._getDroppingClassName = function () {
        var isDropping = this.state.isDropping;
        var _a = this.props, group = _a.group, groupedListClassNames = _a.groupedListClassNames;
        isDropping = !!(group && isDropping);
        return Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])(isDropping && DEFAULT_DROPPING_CSS_CLASS, isDropping && groupedListClassNames && groupedListClassNames.groupIsDropping);
    };
    return GroupedListSection;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=GroupedListSection.js.map

/***/ }),

/***/ "Gw8o":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupShowAll.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupShowAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupShowAll", function() { return GroupShowAll; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GroupShowAll_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupShowAll.styles */ "j6dK");
/* harmony import */ var _GroupShowAll_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupShowAll.base */ "xHbH");



var GroupShowAll = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_GroupShowAll_base__WEBPACK_IMPORTED_MODULE_2__["GroupShowAllBase"], _GroupShowAll_styles__WEBPACK_IMPORTED_MODULE_1__["getStyles"], undefined, { scope: 'GroupShowAll' });
//# sourceMappingURL=GroupShowAll.js.map

/***/ }),

/***/ "Gwvx":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.base.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsColumnBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsColumnBase", function() { return DetailsColumnBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Icon */ "UfSG");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailsList.types */ "G1YK");
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");






var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["classNamesFunction"])();
var TRANSITION_DURATION_DRAG = 200; // ms
var TRANSITION_DURATION_DROP = 1500; // ms
var CLASSNAME_ADD_INTERVAL = 20; // ms
/**
 * Component for rendering columns in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
var DetailsColumnBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DetailsColumnBase, _super);
    function DetailsColumnBase(props) {
        var _this = _super.call(this, props) || this;
        _this._root = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._onRenderColumnHeaderTooltip = function (tooltipHostProps) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: tooltipHostProps.hostClassName }, tooltipHostProps.children);
        };
        _this._onColumnClick = function (ev) {
            var _a = _this.props, onColumnClick = _a.onColumnClick, column = _a.column;
            if (column.columnActionsMode === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].disabled) {
                return;
            }
            if (column.onColumnClick) {
                column.onColumnClick(ev, column);
            }
            if (onColumnClick) {
                onColumnClick(ev, column);
            }
        };
        _this._onDragStart = function (item, itemIndex, selectedItems, event) {
            var classNames = _this._classNames;
            if (itemIndex) {
                _this._updateHeaderDragInfo(itemIndex);
                _this._root.current.classList.add(classNames.borderWhileDragging);
                _this._async.setTimeout(function () {
                    if (_this._root.current) {
                        _this._root.current.classList.add(classNames.noBorderWhileDragging);
                    }
                }, CLASSNAME_ADD_INTERVAL);
            }
        };
        _this._onDragEnd = function (item, event) {
            var classNames = _this._classNames;
            if (event) {
                _this._updateHeaderDragInfo(-1, event);
            }
            _this._root.current.classList.remove(classNames.borderWhileDragging);
            _this._root.current.classList.remove(classNames.noBorderWhileDragging);
        };
        _this._updateHeaderDragInfo = function (itemIndex, event) {
            if (_this.props.setDraggedItemIndex) {
                _this.props.setDraggedItemIndex(itemIndex);
            }
            if (_this.props.updateDragInfo) {
                _this.props.updateDragInfo({ itemIndex: itemIndex }, event);
            }
        };
        _this._onColumnContextMenu = function (ev) {
            var _a = _this.props, onColumnContextMenu = _a.onColumnContextMenu, column = _a.column;
            if (column.onColumnContextMenu) {
                column.onColumnContextMenu(column, ev);
                ev.preventDefault();
            }
            if (onColumnContextMenu) {
                onColumnContextMenu(column, ev);
                ev.preventDefault();
            }
        };
        _this._onRootMouseDown = function (ev) {
            var isDraggable = _this.props.isDraggable;
            // Ignore anything except the primary button.
            if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
                ev.stopPropagation();
            }
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["initializeComponentRef"])(_this);
        _this._async = new _Utilities__WEBPACK_IMPORTED_MODULE_3__["Async"](_this);
        _this._events = new _Utilities__WEBPACK_IMPORTED_MODULE_3__["EventGroup"](_this);
        return _this;
    }
    DetailsColumnBase.prototype.render = function () {
        var _a = this.props, column = _a.column, columnIndex = _a.columnIndex, parentId = _a.parentId, isDraggable = _a.isDraggable, styles = _a.styles, theme = _a.theme, _b = _a.cellStyleProps, cellStyleProps = _b === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_CELL_STYLE_PROPS"] : _b, _c = _a.useFastIcons, useFastIcons = _c === void 0 ? true : _c;
        var _d = this.props.onRenderColumnHeaderTooltip, onRenderColumnHeaderTooltip = _d === void 0 ? this._onRenderColumnHeaderTooltip : _d;
        this._classNames = getClassNames(styles, {
            theme: theme,
            headerClassName: column.headerClassName,
            iconClassName: column.iconClassName,
            isActionable: column.columnActionsMode !== _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].disabled,
            isEmpty: !column.name,
            isIconVisible: column.isSorted || column.isGrouped || column.isFiltered,
            isPadded: column.isPadded,
            isIconOnly: column.isIconOnly,
            cellStyleProps: cellStyleProps,
            transitionDurationDrag: TRANSITION_DURATION_DRAG,
            transitionDurationDrop: TRANSITION_DURATION_DROP
        });
        var classNames = this._classNames;
        var IconComponent = useFastIcons ? _Icon__WEBPACK_IMPORTED_MODULE_2__["FontIcon"] : _Icon__WEBPACK_IMPORTED_MODULE_2__["Icon"];
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: column.key, ref: this._root, role: 'columnheader', "aria-sort": column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none', "aria-colindex": columnIndex, className: classNames.root, "data-is-draggable": isDraggable, draggable: isDraggable, style: {
                    width: column.calculatedWidth +
                        cellStyleProps.cellLeftPadding +
                        cellStyleProps.cellRightPadding +
                        (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
                }, "data-automationid": 'ColumnsHeaderColumn', "data-item-key": column.key },
                isDraggable && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { iconName: "GripperBarVertical", className: classNames.gripperBarVerticalStyle }),
                onRenderColumnHeaderTooltip({
                    hostClassName: classNames.cellTooltip,
                    id: parentId + "-" + column.key + "-tooltip",
                    setAriaDescribedBy: false,
                    content: column.columnActionsMode !== _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].disabled ? column.ariaLabel : '',
                    children: (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { id: parentId + "-" + column.key, "aria-label": column.isIconOnly ? column.name : undefined, "aria-labelledby": column.isIconOnly ? undefined : parentId + "-" + column.key + "-name", className: classNames.cellTitle, "data-is-focusable": column.columnActionsMode !== _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].disabled, role: column.columnActionsMode !== _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].disabled &&
                            (column.onColumnClick !== undefined || this.props.onColumnClick !== undefined)
                            ? 'button'
                            : undefined, "aria-describedby": !this.props.onRenderColumnHeaderTooltip && this._hasAccessibleLabel() ? parentId + "-" + column.key + "-tooltip" : undefined, onContextMenu: this._onColumnContextMenu, onClick: this._onColumnClick, "aria-haspopup": column.columnActionsMode === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].hasDropdown, "aria-expanded": column.columnActionsMode === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].hasDropdown ? !!column.isMenuOpen : undefined },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { id: parentId + "-" + column.key + "-name", className: classNames.cellName },
                            (column.iconName || column.iconClassName) && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { className: classNames.iconClassName, iconName: column.iconName })),
                            column.isIconOnly ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: classNames.accessibleLabel }, column.name) : column.name),
                        column.isFiltered && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { className: classNames.nearIcon, iconName: "Filter" }),
                        column.isSorted && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { className: classNames.sortIcon, iconName: column.isSortedDescending ? 'SortDown' : 'SortUp' })),
                        column.isGrouped && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { className: classNames.nearIcon, iconName: "GroupedDescending" }),
                        column.columnActionsMode === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["ColumnActionsMode"].hasDropdown && !column.isIconOnly && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](IconComponent, { "aria-hidden": true, className: classNames.filterChevron, iconName: "ChevronDown" }))))
                }, this._onRenderColumnHeaderTooltip)),
            !this.props.onRenderColumnHeaderTooltip ? this._renderAccessibleLabel() : null));
    };
    DetailsColumnBase.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.dragDropHelper && this.props.isDraggable) {
            this._addDragDropHandling();
        }
        var classNames = this._classNames;
        if (this.props.isDropped) {
            if (this._root.current) {
                this._root.current.classList.add(classNames.borderAfterDropping);
                this._async.setTimeout(function () {
                    if (_this._root.current) {
                        _this._root.current.classList.add(classNames.noBorderAfterDropping);
                    }
                }, CLASSNAME_ADD_INTERVAL);
            }
            this._async.setTimeout(function () {
                if (_this._root.current) {
                    _this._root.current.classList.remove(classNames.borderAfterDropping);
                    _this._root.current.classList.remove(classNames.noBorderAfterDropping);
                }
            }, TRANSITION_DURATION_DROP + CLASSNAME_ADD_INTERVAL);
        }
    };
    DetailsColumnBase.prototype.componentWillUnmount = function () {
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
            delete this._dragDropSubscription;
        }
        this._async.dispose();
        this._events.dispose();
    };
    DetailsColumnBase.prototype.componentDidUpdate = function () {
        if (!this._dragDropSubscription && this.props.dragDropHelper && this.props.isDraggable) {
            this._addDragDropHandling();
        }
        if (this._dragDropSubscription && !this.props.isDraggable) {
            this._dragDropSubscription.dispose();
            this._events.off(this._root.current, 'mousedown');
            delete this._dragDropSubscription;
        }
    };
    DetailsColumnBase.prototype._getColumnDragDropOptions = function () {
        var _this = this;
        var columnIndex = this.props.columnIndex;
        var options = {
            selectionIndex: columnIndex,
            context: { data: columnIndex, index: columnIndex },
            canDrag: function () { return _this.props.isDraggable; },
            canDrop: function () { return false; },
            onDragStart: this._onDragStart,
            updateDropState: function () { return undefined; },
            onDrop: function () { return undefined; },
            onDragEnd: this._onDragEnd
        };
        return options;
    };
    DetailsColumnBase.prototype._hasAccessibleLabel = function () {
        var column = this.props.column;
        return !!(column.ariaLabel ||
            column.filterAriaLabel ||
            column.sortAscendingAriaLabel ||
            column.sortDescendingAriaLabel ||
            column.groupAriaLabel);
    };
    DetailsColumnBase.prototype._renderAccessibleLabel = function () {
        var _a = this.props, column = _a.column, parentId = _a.parentId;
        var classNames = this._classNames;
        return this._hasAccessibleLabel() && !this.props.onRenderColumnHeaderTooltip ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { key: column.key + "_label", id: parentId + "-" + column.key + "-tooltip", className: classNames.accessibleLabel },
            column.ariaLabel,
            (column.isFiltered && column.filterAriaLabel) || null,
            (column.isSorted && (column.isSortedDescending ? column.sortDescendingAriaLabel : column.sortAscendingAriaLabel)) || null,
            (column.isGrouped && column.groupAriaLabel) || null)) : null;
    };
    DetailsColumnBase.prototype._addDragDropHandling = function () {
        this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.current, this._events, this._getColumnDragDropOptions());
        // We need to use native on this to prevent MarqueeSelection from handling the event before us.
        this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
    };
    return DetailsColumnBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=DetailsColumn.base.js.map

/***/ }),

/***/ "HpzJ":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsList.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsListBase, buildColumns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsListBase", function() { return DetailsListBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildColumns", function() { return buildColumns; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DetailsList/DetailsList.types */ "G1YK");
/* harmony import */ var _DetailsList_DetailsHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DetailsList/DetailsHeader */ "igDL");
/* harmony import */ var _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DetailsList/DetailsHeader.types */ "pkCn");
/* harmony import */ var _DetailsList_DetailsRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DetailsList/DetailsRow */ "VUIz");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../FocusZone */ "su0C");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_FocusZone__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/selection/index */ "08hr");
/* harmony import */ var _utilities_dragdrop_DragDropHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utilities/dragdrop/DragDropHelper */ "pPEq");
/* harmony import */ var _GroupedList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../GroupedList */ "xYNb");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../List */ "yKNM");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_List__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utilities_decorators_withViewport__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utilities/decorators/withViewport */ "uQVQ");
/* harmony import */ var _utilities_decorators_withViewport__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withViewport__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utilities_groupedList_GroupedListUtility__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utilities/groupedList/GroupedListUtility */ "MC/E");
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");
/* harmony import */ var _DetailsRowCheck_styles__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./DetailsRowCheck.styles */ "rkb2");
/* harmony import */ var _GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../GroupedList/GroupSpacer */ "pYG9");
















// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.

var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var MIN_COLUMN_WIDTH = 100; // this is the global min width
var DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
var DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
var DetailsListBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DetailsListBase, _super);
    function DetailsListBase(props) {
        var _this = _super.call(this, props) || this;
        _this._root = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._header = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._groupedList = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._list = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._focusZone = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._selectionZone = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._sumColumnWidths = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["memoizeFunction"])(function (columns) {
            var totalWidth = 0;
            columns.forEach(function (column) { return (totalWidth += column.calculatedWidth || column.minWidth); });
            return totalWidth;
        });
        _this._onRenderRow = function (props, defaultRender) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DetailsList_DetailsRow__WEBPACK_IMPORTED_MODULE_6__["DetailsRow"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props));
        };
        _this._onRenderDetailsHeader = function (detailsHeaderProps, defaultRender) {
            return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DetailsList_DetailsHeader__WEBPACK_IMPORTED_MODULE_4__["DetailsHeader"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, detailsHeaderProps));
        };
        _this._onRenderDetailsFooter = function (detailsFooterProps, defaultRender) {
            return null;
        };
        _this._onRenderListCell = function (nestingDepth) {
            return function (item, itemIndex) {
                return _this._onRenderCell(nestingDepth, item, itemIndex);
            };
        };
        _this._onRenderCell = function (nestingDepth, item, index) {
            var _a = _this.props, compact = _a.compact, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.rowElementEventMap, onRenderMissingItem = _a.onRenderMissingItem, onRenderItemColumn = _a.onRenderItemColumn, getCellValueKey = _a.getCellValueKey, _b = _a.onRenderRow, onRenderRow = _b === void 0 ? _this._onRenderRow : _b, _c = _a.selectionMode, selectionMode = _c === void 0 ? _this._selection.mode : _c, viewport = _a.viewport, checkboxVisibility = _a.checkboxVisibility, getRowAriaLabel = _a.getRowAriaLabel, getRowAriaDescribedBy = _a.getRowAriaDescribedBy, checkButtonAriaLabel = _a.checkButtonAriaLabel, checkboxCellClassName = _a.checkboxCellClassName, groupProps = _a.groupProps, useReducedRowRenderer = _a.useReducedRowRenderer, indentWidth = _a.indentWidth, _d = _a.cellStyleProps, cellStyleProps = _d === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_CELL_STYLE_PROPS"] : _d, onRenderCheckbox = _a.onRenderCheckbox, enableUpdateAnimations = _a.enableUpdateAnimations, useFastIcons = _a.useFastIcons;
            var collapseAllVisibility = groupProps && groupProps.collapseAllVisibility;
            var selection = _this._selection;
            var dragDropHelper = _this._dragDropHelper;
            var columns = _this.state.adjustedColumns;
            var rowProps = {
                item: item,
                itemIndex: index,
                compact: compact,
                columns: columns,
                groupNestingDepth: nestingDepth,
                selectionMode: selectionMode,
                selection: selection,
                onDidMount: _this._onRowDidMount,
                onWillUnmount: _this._onRowWillUnmount,
                onRenderItemColumn: onRenderItemColumn,
                getCellValueKey: getCellValueKey,
                eventsToRegister: eventsToRegister,
                dragDropEvents: dragDropEvents,
                dragDropHelper: dragDropHelper,
                viewport: viewport,
                checkboxVisibility: checkboxVisibility,
                collapseAllVisibility: collapseAllVisibility,
                getRowAriaLabel: getRowAriaLabel,
                getRowAriaDescribedBy: getRowAriaDescribedBy,
                checkButtonAriaLabel: checkButtonAriaLabel,
                checkboxCellClassName: checkboxCellClassName,
                useReducedRowRenderer: useReducedRowRenderer,
                indentWidth: indentWidth,
                cellStyleProps: cellStyleProps,
                onRenderDetailsCheckbox: onRenderCheckbox,
                enableUpdateAnimations: enableUpdateAnimations,
                rowWidth: _this._sumColumnWidths(columns),
                useFastIcons: useFastIcons
            };
            if (!item) {
                if (onRenderMissingItem) {
                    return onRenderMissingItem(index, rowProps);
                }
                return null;
            }
            return onRenderRow(rowProps, _this._onRenderRow);
        };
        _this._onGroupExpandStateChanged = function (isSomeGroupExpanded) {
            _this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
        };
        _this._onColumnIsSizingChanged = function (column, isSizing) {
            _this.setState({ isSizing: isSizing });
        };
        _this._onHeaderKeyDown = function (ev) {
            if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].down) {
                if (_this._focusZone.current && _this._focusZone.current.focus()) {
                    // select the first item in list after down arrow key event
                    // only if nothing was selected; otherwise start with the already-selected item
                    if (_this._selection.getSelectedIndices().length === 0) {
                        _this._selection.setIndexSelected(0, true, false);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        _this._onContentKeyDown = function (ev) {
            if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].up && !ev.altKey) {
                if (_this._header.current && _this._header.current.focus()) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        _this._onRowDidMount = function (row) {
            var _a = row.props, item = _a.item, itemIndex = _a.itemIndex;
            var itemKey = _this._getItemKey(item, itemIndex);
            _this._activeRows[itemKey] = row; // this is used for column auto resize
            _this._setFocusToRowIfPending(row);
            var onRowDidMount = _this.props.onRowDidMount;
            if (onRowDidMount) {
                onRowDidMount(item, itemIndex);
            }
        };
        _this._onRowWillUnmount = function (row) {
            var onRowWillUnmount = _this.props.onRowWillUnmount;
            var _a = row.props, item = _a.item, itemIndex = _a.itemIndex;
            var itemKey = _this._getItemKey(item, itemIndex);
            delete _this._activeRows[itemKey];
            if (onRowWillUnmount) {
                onRowWillUnmount(item, itemIndex);
            }
        };
        _this._onToggleCollapse = function (collapsed) {
            _this.setState({
                isCollapsed: collapsed
            });
            if (_this._groupedList.current) {
                _this._groupedList.current.toggleCollapseAll(collapsed);
            }
        };
        _this._onColumnDragEnd = function (props, event) {
            var columnReorderOptions = _this.props.columnReorderOptions;
            var finalDropLocation = _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["ColumnDragEndLocation"].outside;
            if (columnReorderOptions && columnReorderOptions.onDragEnd) {
                if (props.dropLocation && props.dropLocation !== _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["ColumnDragEndLocation"].header) {
                    finalDropLocation = props.dropLocation;
                }
                else if (_this._root.current) {
                    var clientRect = _this._root.current.getBoundingClientRect();
                    if (event.clientX > clientRect.left &&
                        event.clientX < clientRect.right &&
                        event.clientY > clientRect.top &&
                        event.clientY < clientRect.bottom) {
                        finalDropLocation = _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["ColumnDragEndLocation"].surface;
                    }
                }
                columnReorderOptions.onDragEnd(finalDropLocation);
            }
        };
        _this._onColumnResized = function (resizingColumn, newWidth, resizingColumnIndex) {
            var newCalculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
            if (_this.props.onColumnResize) {
                _this.props.onColumnResize(resizingColumn, newCalculatedWidth, resizingColumnIndex);
            }
            _this._rememberCalculatedWidth(resizingColumn, newCalculatedWidth);
            _this._adjustColumns(_this.props, true, resizingColumnIndex);
            _this.setState({
                version: {}
            });
        };
        /**
         * Callback function when double clicked on the details header column resizer
         * which will measure the column cells of all the active rows and resize the
         * column to the max cell width.
         *
         * @param column - double clicked column definition
         * @param columnIndex - double clicked column index
         * TODO: min width 100 should be changed to const value and should be consistent with the
         * value used on _onSizerMove method in DetailsHeader
         */
        _this._onColumnAutoResized = function (column, columnIndex) {
            var max = 0;
            var count = 0;
            var totalCount = Object.keys(_this._activeRows).length;
            for (var key in _this._activeRows) {
                if (_this._activeRows.hasOwnProperty(key)) {
                    var currentRow = _this._activeRows[key];
                    currentRow.measureCell(columnIndex, function (width) {
                        max = Math.max(max, width);
                        count++;
                        if (count === totalCount) {
                            _this._onColumnResized(column, max, columnIndex);
                        }
                    });
                }
            }
        };
        /**
         * Call back function when an element in FocusZone becomes active. It will translate it into item
         * and call onActiveItemChanged callback if specified.
         *
         * @param row - element that became active in Focus Zone
         * @param focus - event from Focus Zone
         */
        _this._onActiveRowChanged = function (el, ev) {
            var _a = _this.props, items = _a.items, onActiveItemChanged = _a.onActiveItemChanged;
            if (!el) {
                return;
            }
            // Check and assign index only if the event was raised from any DetailsRow element
            if (el.getAttribute('data-item-index')) {
                var index = Number(el.getAttribute('data-item-index'));
                if (index >= 0) {
                    if (onActiveItemChanged) {
                        onActiveItemChanged(items[index], index, ev);
                    }
                    _this.setState({
                        focusedItemIndex: index
                    });
                }
            }
        };
        _this._onBlur = function (event) {
            _this.setState({
                focusedItemIndex: -1
            });
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeComponentRef"])(_this);
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeFocusRects"])();
        _this._async = new _Utilities__WEBPACK_IMPORTED_MODULE_2__["Async"](_this);
        _this._activeRows = {};
        _this._columnOverrides = {};
        _this.state = {
            focusedItemIndex: -1,
            lastWidth: 0,
            adjustedColumns: _this._getAdjustedColumns(props),
            isSizing: false,
            isDropping: false,
            isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
            isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed,
            version: {}
        };
        _this._selection =
            props.selection ||
                new _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["Selection"]({
                    onSelectionChanged: undefined,
                    getKey: props.getKey,
                    selectionMode: props.selectionMode
                });
        if (!_this.props.disableSelectionZone) {
            _this._selection.setItems(props.items, false);
        }
        _this._dragDropHelper = props.dragDropEvents
            ? new _utilities_dragdrop_DragDropHelper__WEBPACK_IMPORTED_MODULE_9__["DragDropHelper"]({
                selection: _this._selection,
                minimumPixelsForDrag: props.minimumPixelsForDrag
            })
            : undefined;
        _this._initialFocusedIndex = props.initialFocusedIndex;
        return _this;
    }
    DetailsListBase.prototype.scrollToIndex = function (index, measureItem, scrollToMode) {
        this._list.current && this._list.current.scrollToIndex(index, measureItem, scrollToMode);
        this._groupedList.current && this._groupedList.current.scrollToIndex(index, measureItem, scrollToMode);
    };
    DetailsListBase.prototype.focusIndex = function (index, forceIntoFirstElement, measureItem, scrollToMode) {
        if (forceIntoFirstElement === void 0) { forceIntoFirstElement = false; }
        var item = this.props.items[index];
        if (item) {
            this.scrollToIndex(index, measureItem, scrollToMode);
            var itemKey = this._getItemKey(item, index);
            var row = this._activeRows[itemKey];
            if (row) {
                this._setFocusToRow(row, forceIntoFirstElement);
            }
        }
    };
    DetailsListBase.prototype.getStartItemIndexInView = function () {
        if (this._list && this._list.current) {
            return this._list.current.getStartItemIndexInView();
        }
        else if (this._groupedList && this._groupedList.current) {
            return this._groupedList.current.getStartItemIndexInView();
        }
        return 0;
    };
    DetailsListBase.prototype.componentWillUnmount = function () {
        if (this._dragDropHelper) {
            // TODO If the DragDropHelper was passed via props, this will dispose it, which is incorrect behavior.
            this._dragDropHelper.dispose();
        }
        this._async.dispose();
    };
    DetailsListBase.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this._initialFocusedIndex !== undefined) {
            var item = this.props.items[this._initialFocusedIndex];
            if (item) {
                var itemKey = this._getItemKey(item, this._initialFocusedIndex);
                var row = this._activeRows[itemKey];
                if (row) {
                    this._setFocusToRowIfPending(row);
                }
            }
        }
        if (this.props.items !== prevProps.items &&
            this.props.items.length > 0 &&
            this.state.focusedItemIndex !== -1 &&
            !Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(this._root.current, document.activeElement, false)) {
            // Item set has changed and previously-focused item is gone.
            // Set focus to item at index of previously-focused item if it is in range,
            // else set focus to the last item.
            var index = this.state.focusedItemIndex < this.props.items.length ? this.state.focusedItemIndex : this.props.items.length - 1;
            var item = this.props.items[index];
            var itemKey = this._getItemKey(item, this.state.focusedItemIndex);
            var row = this._activeRows[itemKey];
            if (row) {
                this._setFocusToRow(row);
            }
            else {
                this._initialFocusedIndex = index;
            }
        }
        if (this.props.onDidUpdate) {
            this.props.onDidUpdate(this);
        }
    };
    // tslint:disable-next-line function-name
    DetailsListBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        var _a = this.props, checkboxVisibility = _a.checkboxVisibility, items = _a.items, setKey = _a.setKey, _b = _a.selectionMode, selectionMode = _b === void 0 ? this._selection.mode : _b, columns = _a.columns, viewport = _a.viewport, compact = _a.compact, dragDropEvents = _a.dragDropEvents;
        var _c = (this.props.groupProps || {}).isAllGroupsCollapsed, isAllGroupsCollapsed = _c === void 0 ? undefined : _c;
        var newViewportWidth = (newProps.viewport && newProps.viewport.width) || 0;
        var oldViewportWidth = (viewport && viewport.width) || 0;
        var shouldResetSelection = newProps.setKey !== setKey || newProps.setKey === undefined;
        var shouldForceUpdates = false;
        if (newProps.layoutMode !== this.props.layoutMode) {
            shouldForceUpdates = true;
        }
        if (shouldResetSelection) {
            this._initialFocusedIndex = newProps.initialFocusedIndex;
            // reset focusedItemIndex when setKey changes
            this.setState({
                focusedItemIndex: this._initialFocusedIndex !== undefined ? this._initialFocusedIndex : -1
            });
        }
        if (!this.props.disableSelectionZone && newProps.items !== items) {
            this._selection.setItems(newProps.items, shouldResetSelection);
        }
        if (newProps.checkboxVisibility !== checkboxVisibility ||
            newProps.columns !== columns ||
            newViewportWidth !== oldViewportWidth ||
            newProps.compact !== compact) {
            shouldForceUpdates = true;
        }
        this._adjustColumns(newProps, true);
        if (newProps.selectionMode !== selectionMode) {
            shouldForceUpdates = true;
        }
        if (isAllGroupsCollapsed === undefined && (newProps.groupProps && newProps.groupProps.isAllGroupsCollapsed !== undefined)) {
            this.setState({
                isCollapsed: newProps.groupProps.isAllGroupsCollapsed,
                isSomeGroupExpanded: !newProps.groupProps.isAllGroupsCollapsed
            });
        }
        if (newProps.dragDropEvents !== dragDropEvents) {
            this._dragDropHelper && this._dragDropHelper.dispose();
            this._dragDropHelper = newProps.dragDropEvents
                ? new _utilities_dragdrop_DragDropHelper__WEBPACK_IMPORTED_MODULE_9__["DragDropHelper"]({
                    selection: this._selection,
                    minimumPixelsForDrag: newProps.minimumPixelsForDrag
                })
                : undefined;
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this.setState({
                version: {}
            });
        }
    };
    DetailsListBase.prototype.render = function () {
        var _a = this.props, ariaLabelForListHeader = _a.ariaLabelForListHeader, ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox, ariaLabelForSelectionColumn = _a.ariaLabelForSelectionColumn, className = _a.className, checkboxVisibility = _a.checkboxVisibility, compact = _a.compact, constrainMode = _a.constrainMode, dragDropEvents = _a.dragDropEvents, groups = _a.groups, groupProps = _a.groupProps, indentWidth = _a.indentWidth, items = _a.items, isPlaceholderData = _a.isPlaceholderData, isHeaderVisible = _a.isHeaderVisible, layoutMode = _a.layoutMode, onItemInvoked = _a.onItemInvoked, onItemContextMenu = _a.onItemContextMenu, onColumnHeaderClick = _a.onColumnHeaderClick, onColumnHeaderContextMenu = _a.onColumnHeaderContextMenu, _b = _a.selectionMode, selectionMode = _b === void 0 ? this._selection.mode : _b, selectionPreservedOnEmptyClick = _a.selectionPreservedOnEmptyClick, selectionZoneProps = _a.selectionZoneProps, ariaLabel = _a.ariaLabel, ariaLabelForGrid = _a.ariaLabelForGrid, rowElementEventMap = _a.rowElementEventMap, _c = _a.shouldApplyApplicationRole, shouldApplyApplicationRole = _c === void 0 ? false : _c, getKey = _a.getKey, listProps = _a.listProps, usePageCache = _a.usePageCache, onShouldVirtualize = _a.onShouldVirtualize, viewport = _a.viewport, minimumPixelsForDrag = _a.minimumPixelsForDrag, getGroupHeight = _a.getGroupHeight, styles = _a.styles, theme = _a.theme, _d = _a.cellStyleProps, cellStyleProps = _d === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_CELL_STYLE_PROPS"] : _d, onRenderCheckbox = _a.onRenderCheckbox, useFastIcons = _a.useFastIcons;
        var _e = this.state, adjustedColumns = _e.adjustedColumns, isCollapsed = _e.isCollapsed, isSizing = _e.isSizing, isSomeGroupExpanded = _e.isSomeGroupExpanded;
        var _f = this, selection = _f._selection, dragDropHelper = _f._dragDropHelper;
        var groupNestingDepth = this._getGroupNestingDepth();
        var additionalListProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD, renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND, getKey: getKey, version: this.state.version }, listProps);
        var selectAllVisibility = _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__["SelectAllVisibility"].none; // for SelectionMode.none
        if (selectionMode === _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["SelectionMode"].single) {
            selectAllVisibility = _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__["SelectAllVisibility"].hidden;
        }
        if (selectionMode === _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["SelectionMode"].multiple) {
            // if isCollapsedGroupSelectVisible is false, disable select all when the list has all collapsed groups
            var isCollapsedGroupSelectVisible = groupProps && groupProps.headerProps && groupProps.headerProps.isCollapsedGroupSelectVisible;
            if (isCollapsedGroupSelectVisible === undefined) {
                isCollapsedGroupSelectVisible = true;
            }
            var isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
            selectAllVisibility = isSelectAllVisible ? _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__["SelectAllVisibility"].visible : _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__["SelectAllVisibility"].hidden;
        }
        if (checkboxVisibility === _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["CheckboxVisibility"].hidden) {
            selectAllVisibility = _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__["SelectAllVisibility"].none;
        }
        var _g = this.props, _h = _g.onRenderDetailsHeader, onRenderDetailsHeader = _h === void 0 ? this._onRenderDetailsHeader : _h, _j = _g.onRenderDetailsFooter, onRenderDetailsFooter = _j === void 0 ? this._onRenderDetailsFooter : _j;
        var detailsFooterProps = this._getDetailsFooterProps();
        var columnReorderProps = this._getColumnReorderProps();
        var rowCount = (isHeaderVisible ? 1 : 0) + Object(_utilities_groupedList_GroupedListUtility__WEBPACK_IMPORTED_MODULE_13__["GetGroupCount"])(groups) + (items ? items.length : 0);
        var classNames = getClassNames(styles, {
            theme: theme,
            compact: compact,
            isFixed: layoutMode === _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["DetailsListLayoutMode"].fixedColumns,
            isHorizontalConstrained: constrainMode === _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["ConstrainMode"].horizontalConstrained,
            className: className
        });
        var list = groups ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupedList__WEBPACK_IMPORTED_MODULE_10__["GroupedList"], { componentRef: this._groupedList, groups: groups, groupProps: groupProps ? this._getGroupProps(groupProps) : undefined, items: items, onRenderCell: this._onRenderCell, selection: selection, selectionMode: checkboxVisibility !== _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["CheckboxVisibility"].hidden ? selectionMode : _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["SelectionMode"].none, dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: rowElementEventMap, listProps: additionalListProps, onGroupExpandStateChanged: this._onGroupExpandStateChanged, usePageCache: usePageCache, onShouldVirtualize: onShouldVirtualize, getGroupHeight: getGroupHeight, compact: compact })) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_List__WEBPACK_IMPORTED_MODULE_11__["List"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: this._list, role: "presentation", items: items, onRenderCell: this._onRenderListCell(0), usePageCache: usePageCache, onShouldVirtualize: onShouldVirtualize }, additionalListProps)));
        return (
        // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
        // with JAWS.
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: this._root, className: classNames.root, "data-automationid": "DetailsList", "data-is-scrollable": "false", "aria-label": ariaLabel }, (shouldApplyApplicationRole ? { role: 'application' } : {})),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { role: "grid", "aria-label": ariaLabelForGrid, "aria-rowcount": isPlaceholderData ? -1 : rowCount, "aria-colcount": (selectAllVisibility !== _DetailsList_DetailsHeader_types__WEBPACK_IMPORTED_MODULE_5__["SelectAllVisibility"].none ? 1 : 0) + (adjustedColumns ? adjustedColumns.length : 0), "aria-readonly": "true" },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { onKeyDown: this._onHeaderKeyDown, role: "presentation", className: classNames.headerWrapper }, isHeaderVisible &&
                    onRenderDetailsHeader({
                        componentRef: this._header,
                        selectionMode: selectionMode,
                        layoutMode: layoutMode,
                        selection: selection,
                        columns: adjustedColumns,
                        onColumnClick: onColumnHeaderClick,
                        onColumnContextMenu: onColumnHeaderContextMenu,
                        onColumnResized: this._onColumnResized,
                        onColumnIsSizingChanged: this._onColumnIsSizingChanged,
                        onColumnAutoResized: this._onColumnAutoResized,
                        groupNestingDepth: groupNestingDepth,
                        isAllCollapsed: isCollapsed,
                        onToggleCollapseAll: this._onToggleCollapse,
                        ariaLabel: ariaLabelForListHeader,
                        ariaLabelForSelectAllCheckbox: ariaLabelForSelectAllCheckbox,
                        ariaLabelForSelectionColumn: ariaLabelForSelectionColumn,
                        selectAllVisibility: selectAllVisibility,
                        collapseAllVisibility: groupProps && groupProps.collapseAllVisibility,
                        viewport: viewport,
                        columnReorderProps: columnReorderProps,
                        minimumPixelsForDrag: minimumPixelsForDrag,
                        cellStyleProps: cellStyleProps,
                        checkboxVisibility: checkboxVisibility,
                        indentWidth: indentWidth,
                        onRenderDetailsCheckbox: onRenderCheckbox,
                        rowWidth: this._sumColumnWidths(this.state.adjustedColumns),
                        useFastIcons: useFastIcons
                    }, this._onRenderDetailsHeader)),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { onKeyDown: this._onContentKeyDown, role: "presentation", className: classNames.contentWrapper },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusZone__WEBPACK_IMPORTED_MODULE_7__["FocusZone"], { componentRef: this._focusZone, className: classNames.focusZone, direction: _FocusZone__WEBPACK_IMPORTED_MODULE_7__["FocusZoneDirection"].vertical, isInnerZoneKeystroke: isRightArrow, onActiveElementChanged: this._onActiveRowChanged, onBlur: this._onBlur }, !this.props.disableSelectionZone ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["SelectionZone"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ ref: this._selectionZone, selection: selection, selectionPreservedOnEmptyClick: selectionPreservedOnEmptyClick, selectionMode: selectionMode, onItemInvoked: onItemInvoked, onItemContextMenu: onItemContextMenu, enterModalOnTouch: this.props.enterModalSelectionOnTouch }, selectionZoneProps || {}), list)) : (list))),
                onRenderDetailsFooter(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, detailsFooterProps), this._onRenderDetailsFooter))));
    };
    DetailsListBase.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this._forceListUpdates();
    };
    DetailsListBase.prototype._getGroupNestingDepth = function () {
        var groups = this.props.groups;
        var level = 0;
        var groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    };
    DetailsListBase.prototype._setFocusToRowIfPending = function (row) {
        var itemIndex = row.props.itemIndex;
        if (this._initialFocusedIndex !== undefined && itemIndex === this._initialFocusedIndex) {
            this._setFocusToRow(row);
            delete this._initialFocusedIndex;
        }
    };
    DetailsListBase.prototype._setFocusToRow = function (row, forceIntoFirstElement) {
        if (forceIntoFirstElement === void 0) { forceIntoFirstElement = false; }
        if (this._selectionZone.current) {
            this._selectionZone.current.ignoreNextFocus();
        }
        this._async.setTimeout(function () {
            row.focus(forceIntoFirstElement);
        }, 0);
    };
    DetailsListBase.prototype._forceListUpdates = function () {
        if (this._groupedList.current) {
            this._groupedList.current.forceUpdate();
        }
        if (this._list.current) {
            this._list.current.forceUpdate();
        }
    };
    DetailsListBase.prototype._notifyColumnsResized = function () {
        this.state.adjustedColumns.forEach(function (column) {
            if (column.onColumnResize) {
                column.onColumnResize(column.currentWidth);
            }
        });
    };
    DetailsListBase.prototype._adjustColumns = function (newProps, forceUpdate, resizingColumnIndex) {
        var adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, resizingColumnIndex);
        var viewport = this.props.viewport;
        var viewportWidth = viewport && viewport.width ? viewport.width : 0;
        if (adjustedColumns) {
            this.setState({
                adjustedColumns: adjustedColumns,
                lastWidth: viewportWidth
            }, this._notifyColumnsResized);
        }
    };
    /** Returns adjusted columns, given the viewport size and layout mode. */
    DetailsListBase.prototype._getAdjustedColumns = function (newProps, forceUpdate, resizingColumnIndex) {
        var _this = this;
        var newItems = newProps.items, layoutMode = newProps.layoutMode, selectionMode = newProps.selectionMode, viewport = newProps.viewport;
        var viewportWidth = viewport && viewport.width ? viewport.width : 0;
        var newColumns = newProps.columns;
        var columns = this.props ? this.props.columns : [];
        var lastWidth = this.state ? this.state.lastWidth : -1;
        var lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;
        if (!forceUpdate && lastWidth === viewportWidth && lastSelectionMode === selectionMode && (!columns || newColumns === columns)) {
            return [];
        }
        newColumns = newColumns || buildColumns(newItems, true);
        var adjustedColumns;
        if (layoutMode === _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["DetailsListLayoutMode"].fixedColumns) {
            adjustedColumns = this._getFixedColumns(newColumns);
            // Preserve adjusted column calculated widths.
            adjustedColumns.forEach(function (column) {
                _this._rememberCalculatedWidth(column, column.calculatedWidth);
            });
        }
        else {
            if (resizingColumnIndex !== undefined) {
                adjustedColumns = this._getJustifiedColumnsAfterResize(newColumns, viewportWidth, newProps, resizingColumnIndex);
            }
            else {
                adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps, 0);
            }
            adjustedColumns.forEach(function (column) {
                _this._getColumnOverride(column.key).currentWidth = column.calculatedWidth;
            });
        }
        return adjustedColumns;
    };
    /** Builds a set of columns based on the given columns mixed with the current overrides. */
    DetailsListBase.prototype._getFixedColumns = function (newColumns) {
        var _this = this;
        return newColumns.map(function (column) {
            var newColumn = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, column, _this._columnOverrides[column.key]);
            if (!newColumn.calculatedWidth) {
                newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
            }
            return newColumn;
        });
    };
    DetailsListBase.prototype._getJustifiedColumnsAfterResize = function (newColumns, viewportWidth, props, resizingColumnIndex) {
        var _this = this;
        var fixedColumns = newColumns.slice(0, resizingColumnIndex);
        fixedColumns.forEach(function (column) { return (column.calculatedWidth = _this._getColumnOverride(column.key).currentWidth); });
        var fixedWidth = fixedColumns.reduce(function (total, column, i) { return total + getPaddedWidth(column, i === 0, props); }, 0);
        var remainingColumns = newColumns.slice(resizingColumnIndex);
        var remainingWidth = viewportWidth - fixedWidth;
        return fixedColumns.concat(this._getJustifiedColumns(remainingColumns, remainingWidth, props, resizingColumnIndex));
    };
    /** Builds a set of columns to fix within the viewport width. */
    DetailsListBase.prototype._getJustifiedColumns = function (newColumns, viewportWidth, props, firstIndex) {
        var _this = this;
        var _a = props.selectionMode, selectionMode = _a === void 0 ? this._selection.mode : _a, checkboxVisibility = props.checkboxVisibility;
        var rowCheckWidth = selectionMode !== _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["SelectionMode"].none && checkboxVisibility !== _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["CheckboxVisibility"].hidden ? _DetailsRowCheck_styles__WEBPACK_IMPORTED_MODULE_15__["CHECK_CELL_WIDTH"] : 0;
        var groupExpandWidth = this._getGroupNestingDepth() * _GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_16__["SPACER_WIDTH"];
        var totalWidth = 0; // offset because we have one less inner padding.
        var availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
        var adjustedColumns = newColumns.map(function (column, i) {
            var newColumn = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, column, { calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH }, _this._columnOverrides[column.key]);
            var isFirst = i + firstIndex === 0;
            totalWidth += getPaddedWidth(newColumn, isFirst, props);
            return newColumn;
        });
        var lastIndex = adjustedColumns.length - 1;
        // Shrink or remove collapsable columns.
        while (lastIndex > 0 && totalWidth > availableWidth) {
            var column = adjustedColumns[lastIndex];
            var minWidth = column.minWidth || MIN_COLUMN_WIDTH;
            var overflowWidth = totalWidth - availableWidth;
            if (column.calculatedWidth - minWidth >= overflowWidth || !(column.isCollapsable || column.isCollapsible)) {
                var originalWidth = column.calculatedWidth;
                column.calculatedWidth = Math.max(column.calculatedWidth - overflowWidth, minWidth);
                totalWidth -= originalWidth - column.calculatedWidth;
            }
            else {
                totalWidth -= getPaddedWidth(column, false, props);
                adjustedColumns.splice(lastIndex, 1);
            }
            lastIndex--;
        }
        // Then expand columns starting at the beginning, until we've filled the width.
        for (var i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
            var column = adjustedColumns[i];
            var isLast = i === adjustedColumns.length - 1;
            var overrides = this._columnOverrides[column.key];
            if (overrides && overrides.calculatedWidth && !isLast) {
                continue;
            }
            var spaceLeft = availableWidth - totalWidth;
            var increment = void 0;
            if (isLast) {
                increment = spaceLeft;
            }
            else {
                var maxWidth = column.maxWidth;
                var minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
                increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft;
            }
            column.calculatedWidth = column.calculatedWidth + increment;
            totalWidth += increment;
        }
        return adjustedColumns;
    };
    DetailsListBase.prototype._rememberCalculatedWidth = function (column, newCalculatedWidth) {
        var overrides = this._getColumnOverride(column.key);
        overrides.calculatedWidth = newCalculatedWidth;
        overrides.currentWidth = newCalculatedWidth;
    };
    DetailsListBase.prototype._getColumnOverride = function (key) {
        return (this._columnOverrides[key] = this._columnOverrides[key] || {});
    };
    DetailsListBase.prototype._getItemKey = function (item, itemIndex) {
        var getKey = this.props.getKey;
        var itemKey = undefined;
        if (item) {
            itemKey = item.key;
        }
        if (getKey) {
            itemKey = getKey(item, itemIndex);
        }
        if (!itemKey) {
            itemKey = itemIndex;
        }
        return itemKey;
    };
    DetailsListBase.prototype._getDetailsFooterProps = function () {
        var columns = this.state.adjustedColumns;
        var _a = this.props, viewport = _a.viewport, checkboxVisibility = _a.checkboxVisibility, indentWidth = _a.indentWidth, _b = _a.cellStyleProps, cellStyleProps = _b === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_CELL_STYLE_PROPS"] : _b, _c = _a.selectionMode, selectionMode = _c === void 0 ? this._selection.mode : _c;
        return {
            columns: columns,
            groupNestingDepth: this._getGroupNestingDepth(),
            selection: this._selection,
            selectionMode: selectionMode,
            viewport: viewport,
            checkboxVisibility: checkboxVisibility,
            indentWidth: indentWidth,
            cellStyleProps: cellStyleProps
        };
    };
    DetailsListBase.prototype._getColumnReorderProps = function () {
        var columnReorderOptions = this.props.columnReorderOptions;
        if (columnReorderOptions) {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, columnReorderOptions, { onColumnDragEnd: this._onColumnDragEnd });
        }
    };
    DetailsListBase.prototype._getGroupProps = function (detailsGroupProps) {
        var _this = this;
        var onRenderDetailsGroupFooter = detailsGroupProps.onRenderFooter, onRenderDetailsGroupHeader = detailsGroupProps.onRenderHeader;
        var columns = this.state.adjustedColumns;
        var _a = this.props, _b = _a.selectionMode, selectionMode = _b === void 0 ? this._selection.mode : _b, viewport = _a.viewport, _c = _a.cellStyleProps, cellStyleProps = _c === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_CELL_STYLE_PROPS"] : _c, checkboxVisibility = _a.checkboxVisibility, indentWidth = _a.indentWidth;
        var groupNestingDepth = this._getGroupNestingDepth();
        var onRenderFooter = onRenderDetailsGroupFooter
            ? function (props, defaultRender) {
                return onRenderDetailsGroupFooter(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { columns: columns, groupNestingDepth: groupNestingDepth, indentWidth: indentWidth, selection: _this._selection, selectionMode: selectionMode, viewport: viewport, checkboxVisibility: checkboxVisibility,
                    cellStyleProps: cellStyleProps }), defaultRender);
            }
            : undefined;
        var onRenderHeader = onRenderDetailsGroupHeader
            ? function (props, defaultRender) {
                return onRenderDetailsGroupHeader(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { columns: columns, groupNestingDepth: groupNestingDepth, indentWidth: indentWidth, selection: _this._selection, selectionMode: selectionMode, viewport: viewport, checkboxVisibility: checkboxVisibility,
                    cellStyleProps: cellStyleProps }), defaultRender);
            }
            : undefined;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, detailsGroupProps, { onRenderFooter: onRenderFooter,
            onRenderHeader: onRenderHeader });
    };
    DetailsListBase.defaultProps = {
        layoutMode: _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["DetailsListLayoutMode"].justified,
        selectionMode: _utilities_selection_index__WEBPACK_IMPORTED_MODULE_8__["SelectionMode"].multiple,
        constrainMode: _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["ConstrainMode"].horizontalConstrained,
        checkboxVisibility: _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["CheckboxVisibility"].onHover,
        isHeaderVisible: true,
        compact: false,
        useFastIcons: true
    };
    DetailsListBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withViewport__WEBPACK_IMPORTED_MODULE_12__["withViewport"]
    ], DetailsListBase);
    return DetailsListBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

function buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey, isMultiline) {
    var columns = [];
    if (items && items.length) {
        var firstItem = items[0];
        for (var propName in firstItem) {
            if (firstItem.hasOwnProperty(propName)) {
                columns.push({
                    key: propName,
                    name: propName,
                    fieldName: propName,
                    minWidth: MIN_COLUMN_WIDTH,
                    maxWidth: 300,
                    isCollapsable: !!columns.length,
                    isCollapsible: !!columns.length,
                    isMultiline: isMultiline === undefined ? false : isMultiline,
                    isSorted: sortedColumnKey === propName,
                    isSortedDescending: !!isSortedDescending,
                    isRowHeader: false,
                    columnActionsMode: _DetailsList_DetailsList_types__WEBPACK_IMPORTED_MODULE_3__["ColumnActionsMode"].clickable,
                    isResizable: canResizeColumns,
                    onColumnClick: onColumnClick,
                    isGrouped: groupedColumnKey === propName
                });
            }
        }
    }
    return columns;
}
function isRightArrow(event) {
    return event.which === Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTLSafeKeyCode"])(_Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].right);
}
function getPaddedWidth(column, isFirst, props) {
    var _a = props.cellStyleProps, cellStyleProps = _a === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_CELL_STYLE_PROPS"] : _a;
    return (column.calculatedWidth +
        cellStyleProps.cellLeftPadding +
        cellStyleProps.cellRightPadding +
        (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0));
}
//# sourceMappingURL=DetailsList.base.js.map

/***/ }),

/***/ "J7+t":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/selection/Selection.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: Selection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/utilities */ "+4t+");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__["Selection"]; });


//# sourceMappingURL=Selection.js.map

/***/ }),

/***/ "JyIg":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/keytips/KeytipUtils.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: sequencesToID, mergeOverflows, ktpTargetFromSequences, ktpTargetFromId, getAriaDescribedBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequencesToID", function() { return sequencesToID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeOverflows", function() { return mergeOverflows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ktpTargetFromSequences", function() { return ktpTargetFromSequences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ktpTargetFromId", function() { return ktpTargetFromId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAriaDescribedBy", function() { return getAriaDescribedBy; });
/* harmony import */ var _KeytipConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeytipConstants */ "ZrMC");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence.
 *
 * @param keySequences - Full path of IKeySequences for one keytip.
 * @returns {string} String to use for the keytip ID.
 */
function sequencesToID(keySequences) {
    return keySequences.reduce(function (prevValue, keySequence) {
        return prevValue + _KeytipConstants__WEBPACK_IMPORTED_MODULE_0__["KTP_SEPARATOR"] + keySequence.split('').join(_KeytipConstants__WEBPACK_IMPORTED_MODULE_0__["KTP_SEPARATOR"]);
    }, _KeytipConstants__WEBPACK_IMPORTED_MODULE_0__["KTP_PREFIX"]);
}
/**
 * Merges an overflow sequence with a key sequence.
 *
 * @param keySequences - Full sequence for one keytip.
 * @param overflowKeySequences - Full overflow keytip sequence.
 * @returns {string[]} Sequence that will be used by the keytip when in the overflow.
 */
function mergeOverflows(keySequences, overflowKeySequences) {
    var overflowSequenceLen = overflowKeySequences.length;
    var overflowSequence = overflowKeySequences.slice().pop();
    var newKeySequences = keySequences.slice();
    return Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["addElementAtIndex"])(newKeySequences, overflowSequenceLen - 1, overflowSequence);
}
/**
 * Constructs the data-ktp-target attribute selector from a full key sequence.
 *
 * @param keySequences - Full string[] for a Keytip.
 * @returns {string} String selector to use to query for the keytip target.
 */
function ktpTargetFromSequences(keySequences) {
    return '[' + _KeytipConstants__WEBPACK_IMPORTED_MODULE_0__["DATAKTP_TARGET"] + '="' + sequencesToID(keySequences) + '"]';
}
/**
 * Constructs the data-ktp-execute-target attribute selector from a keytip ID.
 *
 * @param keytipId - ID of the Keytip.
 * @returns {string} String selector to use to query for the keytip execute target.
 */
function ktpTargetFromId(keytipId) {
    return '[' + _KeytipConstants__WEBPACK_IMPORTED_MODULE_0__["DATAKTP_EXECUTE_TARGET"] + '="' + keytipId + '"]';
}
/**
 * Gets the aria-describedby value to put on the component with this keytip.
 *
 * @param keySequences - KeySequences of the keytip.
 * @returns {string} The aria-describedby value to set on the component with this keytip.
 */
function getAriaDescribedBy(keySequences) {
    var describedby = ' ' + _KeytipConstants__WEBPACK_IMPORTED_MODULE_0__["KTP_LAYER_ID"];
    if (!keySequences.length) {
        // Return just the layer ID
        return describedby;
    }
    return describedby + ' ' + sequencesToID(keySequences);
}
//# sourceMappingURL=KeytipUtils.js.map

/***/ }),

/***/ "LCDl":
/*!********************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@uifabric/set-version/7.0.17/node_modules/@uifabric/set-version/lib/index.js ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: setVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setVersion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setVersion */ "3GMh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return _setVersion__WEBPACK_IMPORTED_MODULE_0__["setVersion"]; });



Object(_setVersion__WEBPACK_IMPORTED_MODULE_0__["setVersion"])('@uifabric/set-version', '6.0.0');
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "MC/E":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/groupedList/GroupedListUtility.js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GetGroupCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetGroupCount", function() { return GetGroupCount; });
/**
 * Takes an array of groups and returns a count of the groups and all descendant groups.
 * @param groups - The array of groups to count.
 */
var GetGroupCount = function (groups) {
    var total = 0;
    if (groups) {
        var remainingGroups = groups.slice();
        var currentGroup = void 0;
        while (remainingGroups && remainingGroups.length > 0) {
            ++total;
            currentGroup = remainingGroups.pop();
            if (currentGroup && currentGroup.children) {
                remainingGroups.push.apply(remainingGroups, currentGroup.children);
            }
        }
    }
    return total;
};
//# sourceMappingURL=GroupedListUtility.js.map

/***/ }),

/***/ "Mstc":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/Modal.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: ModalBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalBase", function() { return ModalBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FocusTrapZone/index */ "WEvm");
/* harmony import */ var _FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Modal_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modal.styles */ "fcBF");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Overlay */ "2zVY");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Overlay__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Layer */ "88pY");
/* harmony import */ var _Popup_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Popup/index */ "YCiU");
/* harmony import */ var _Popup_index__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Popup_index__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/decorators/withResponsiveMode */ "jiHw");
/* harmony import */ var _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Callout_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Callout/index */ "UO3J");
/* harmony import */ var _Callout_index__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_Callout_index__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Icon_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Icon/index */ "n8DK");
/* harmony import */ var _Icon_index__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Icon_index__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utilities_DraggableZone_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utilities/DraggableZone/index */ "4azF");












// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)
var DefaultLayerProps = {
    eventBubblingEnabled: false
};
var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var ModalBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ModalBase, _super);
    function ModalBase(props) {
        var _this = _super.call(this, props) || this;
        _this._focusTrapZone = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        // Allow the user to scroll within the modal but not on the body
        _this._allowScrollOnModal = function (elt) {
            if (elt) {
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["allowScrollOnElement"])(elt, _this._events);
            }
            else {
                _this._events.off(_this._scrollableContent);
            }
            _this._scrollableContent = elt;
        };
        _this._onModalContextMenuClose = function () {
            _this.setState({ isModalMenuOpen: false });
        };
        _this._onModalClose = function () {
            _this._lastSetX = 0;
            _this._lastSetY = 0;
            _this.setState({
                isModalMenuOpen: false,
                isInKeyboardMoveMode: false,
                isOpen: false,
                x: 0,
                y: 0
            });
            if (_this.props.dragOptions) {
                _this._events.off(window, 'keyup', _this._onKeyUp, true /* useCapture */);
            }
            // Call the onDismiss callback
            if (_this.props.onDismissed) {
                _this.props.onDismissed();
            }
        };
        _this._onDragStart = function () {
            _this.setState({ isModalMenuOpen: false, isInKeyboardMoveMode: false });
        };
        _this._onDrag = function (_, ui) {
            var _a = _this.state, x = _a.x, y = _a.y;
            _this.setState({ x: x + ui.delta.x, y: y + ui.delta.y });
        };
        _this._onDragStop = function () {
            _this.focus();
        };
        _this._onKeyUp = function (event) {
            // Need to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
            // Otherwise it would continue to fire a click even if the event was cancelled
            // during mouseDown.
            if (event.altKey && event.ctrlKey && event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].space) {
                // Since this is a global handler, we should make sure the target is within the dialog
                // before opening the dropdown
                if (Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["elementContains"])(_this._scrollableContent, event.target)) {
                    _this.setState({ isModalMenuOpen: !_this.state.isModalMenuOpen });
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        // We need a global onKeyDown event when we are in the move mode so that we can
        // handle the key presses and the components inside the modal do not get the events
        _this._onKeyDown = function (event) {
            if (event.altKey && event.ctrlKey && event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].space) {
                // CTRL + ALT + SPACE is handled during keyUp
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (_this.state.isModalMenuOpen && (event.altKey || event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape)) {
                _this.setState({ isModalMenuOpen: false });
            }
            if (_this.state.isInKeyboardMoveMode && (event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape || event.keyCode === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter)) {
                _this.setState({ isInKeyboardMoveMode: false });
                event.preventDefault();
                event.stopPropagation();
            }
            if (_this.state.isInKeyboardMoveMode) {
                var handledEvent = true;
                var delta = _this._getMoveDelta(event);
                switch (event.keyCode) {
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].escape:
                        _this.setState({ x: _this._lastSetX, y: _this._lastSetY });
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter: {
                        _this._lastSetX = 0;
                        _this._lastSetY = 0;
                        _this.setState({ isInKeyboardMoveMode: false });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].up: {
                        _this.setState({
                            y: _this.state.y - delta
                        });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].down: {
                        _this.setState({
                            y: _this.state.y + delta
                        });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].left: {
                        _this.setState({
                            x: _this.state.x - delta
                        });
                        break;
                    }
                    case _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].right: {
                        _this.setState({
                            x: _this.state.x + delta
                        });
                        break;
                    }
                    default: {
                        handledEvent = false;
                    }
                }
                if (handledEvent) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        };
        _this._onEnterKeyboardMoveMode = function () {
            _this._lastSetX = _this.state.x;
            _this._lastSetY = _this.state.y;
            _this.setState({ isInKeyboardMoveMode: true, isModalMenuOpen: false });
            _this._events.on(window, 'keydown', _this._onKeyDown, true /* useCapture */);
        };
        _this._onExitKeyboardMoveMode = function () {
            _this._lastSetX = 0;
            _this._lastSetY = 0;
            _this.setState({ isInKeyboardMoveMode: false });
            _this._events.off(window, 'keydown', _this._onKeyDown, true /* useCapture */);
        };
        _this.state = {
            id: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('Modal'),
            isOpen: props.isOpen,
            isVisible: props.isOpen,
            hasBeenOpened: props.isOpen,
            x: 0,
            y: 0
        };
        _this._lastSetX = 0;
        _this._lastSetY = 0;
        _this._warnDeprecations({
            onLayerDidMount: 'layerProps.onLayerDidMount'
        });
        return _this;
    }
    // tslint:disable-next-line function-name
    ModalBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        clearTimeout(this._onModalCloseTimer);
        // Opening the dialog
        if (newProps.isOpen) {
            if (!this.state.isOpen) {
                // First Open
                this.setState({
                    isOpen: true
                });
                // Add a keyUp handler for all key up events when the dialog is open
                if (newProps.dragOptions) {
                    this._events.on(window, 'keyup', this._onKeyUp, true /* useCapture */);
                }
            }
            else {
                // Modal has been opened
                // Reopen during closing
                this.setState({
                    hasBeenOpened: true,
                    isVisible: true
                });
                if (newProps.topOffsetFixed) {
                    var dialogMain = document.getElementsByClassName('ms-Dialog-main');
                    var modalRectangle = void 0;
                    if (dialogMain.length > 0) {
                        modalRectangle = dialogMain[0].getBoundingClientRect();
                        this.setState({
                            modalRectangleTop: modalRectangle.top
                        });
                    }
                }
            }
        }
        // Closing the dialog
        if (!newProps.isOpen && this.state.isOpen) {
            this._onModalCloseTimer = this._async.setTimeout(this._onModalClose, parseFloat(_Modal_styles__WEBPACK_IMPORTED_MODULE_4__["animationDuration"]) * 1000);
            this.setState({
                isVisible: false
            });
        }
    };
    ModalBase.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevProps.isOpen && !prevState.isVisible) {
            this.setState({
                isVisible: true
            });
        }
    };
    ModalBase.prototype.render = function () {
        var _a = this.props, className = _a.className, containerClassName = _a.containerClassName, scrollableContentClassName = _a.scrollableContentClassName, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, firstFocusableSelector = _a.firstFocusableSelector, forceFocusInsideTrap = _a.forceFocusInsideTrap, ignoreExternalFocusing = _a.ignoreExternalFocusing, isBlocking = _a.isBlocking, isClickableOutsideFocusTrap = _a.isClickableOutsideFocusTrap, isDarkOverlay = _a.isDarkOverlay, onDismiss = _a.onDismiss, layerProps = _a.layerProps, overlay = _a.overlay, responsiveMode = _a.responsiveMode, titleAriaId = _a.titleAriaId, styles = _a.styles, subtitleAriaId = _a.subtitleAriaId, theme = _a.theme, topOffsetFixed = _a.topOffsetFixed, onLayerDidMount = _a.onLayerDidMount, isModeless = _a.isModeless, dragOptions = _a.dragOptions;
        var _b = this.state, isOpen = _b.isOpen, isVisible = _b.isVisible, hasBeenOpened = _b.hasBeenOpened, modalRectangleTop = _b.modalRectangleTop, x = _b.x, y = _b.y, isInKeyboardMoveMode = _b.isInKeyboardMoveMode;
        if (!isOpen) {
            return null;
        }
        var layerClassName = layerProps === undefined ? '' : layerProps.className;
        var classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            containerClassName: containerClassName,
            scrollableContentClassName: scrollableContentClassName,
            isOpen: isOpen,
            isVisible: isVisible,
            hasBeenOpened: hasBeenOpened,
            modalRectangleTop: modalRectangleTop,
            topOffsetFixed: topOffsetFixed,
            isModeless: isModeless,
            layerClassName: layerClassName,
            isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector
        });
        var mergedLayerProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DefaultLayerProps, this.props.layerProps, { onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount, insertFirst: isModeless, className: classNames.layer });
        var modalContent = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusTrapZone_index__WEBPACK_IMPORTED_MODULE_3__["FocusTrapZone"], { componentRef: this._focusTrapZone, className: classNames.main, elementToFocusOnDismiss: elementToFocusOnDismiss, isClickableOutsideFocusTrap: isModeless || isClickableOutsideFocusTrap || !isBlocking, ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: isModeless ? !isModeless : forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector, focusPreviouslyFocusedInnerElement: true, onBlur: isInKeyboardMoveMode ? this._onExitKeyboardMoveMode : undefined },
            dragOptions && isInKeyboardMoveMode && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.keyboardMoveIconContainer }, dragOptions.keyboardMoveIconProps ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon_index__WEBPACK_IMPORTED_MODULE_10__["Icon"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, dragOptions.keyboardMoveIconProps))) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon_index__WEBPACK_IMPORTED_MODULE_10__["Icon"], { iconName: "move", className: classNames.keyboardMoveIcon })))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._allowScrollOnModal, className: classNames.scrollableContent, "data-is-scrollable": true },
                dragOptions && this.state.isModalMenuOpen && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](dragOptions.menu, { items: [
                        { key: 'move', text: dragOptions.moveMenuItemText, onClick: this._onEnterKeyboardMoveMode },
                        { key: 'close', text: dragOptions.closeMenuItemText, onClick: this._onModalClose }
                    ], onDismiss: this._onModalContextMenuClose, alignTargetEdge: true, coverTarget: true, directionalHint: _Callout_index__WEBPACK_IMPORTED_MODULE_9__["DirectionalHint"].topLeftEdge, directionalHintFixed: true, shouldFocusOnMount: true, target: this._scrollableContent })),
                this.props.children)));
        // @temp tuatology - Will adjust this to be a panel at certain breakpoints
        if (responsiveMode >= _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__["ResponsiveMode"].small) {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Layer__WEBPACK_IMPORTED_MODULE_6__["Layer"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, mergedLayerProps),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Popup_index__WEBPACK_IMPORTED_MODULE_7__["Popup"], { role: isModeless || !isBlocking ? 'dialog' : 'alertdialog', "aria-modal": !isModeless, ariaLabelledBy: titleAriaId, ariaDescribedBy: subtitleAriaId, onDismiss: onDismiss },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: classNames.root },
                        !isModeless && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Overlay__WEBPACK_IMPORTED_MODULE_5__["Overlay"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ isDarkThemed: isDarkOverlay, onClick: isBlocking ? undefined : onDismiss }, overlay)),
                        dragOptions ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_utilities_DraggableZone_index__WEBPACK_IMPORTED_MODULE_11__["DraggableZone"], { handleSelector: dragOptions.dragHandleSelector || "." + classNames.main.split(' ')[0], preventDragSelector: "button", onStart: this._onDragStart, onDragChange: this._onDrag, onStop: this._onDragStop, position: { x: x, y: y } }, modalContent)) : (modalContent)))));
        }
        return null;
    };
    ModalBase.prototype.focus = function () {
        if (this._focusTrapZone.current) {
            this._focusTrapZone.current.focus();
        }
    };
    ModalBase.prototype._getMoveDelta = function (event) {
        var delta = 10;
        if (event.shiftKey) {
            if (!event.ctrlKey) {
                delta = 50;
            }
        }
        else if (event.ctrlKey) {
            delta = 1;
        }
        return delta;
    };
    ModalBase.defaultProps = {
        isOpen: false,
        isDarkOverlay: true,
        isBlocking: false,
        className: '',
        containerClassName: ''
    };
    ModalBase = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _utilities_decorators_withResponsiveMode__WEBPACK_IMPORTED_MODULE_8__["withResponsiveMode"]
    ], ModalBase);
    return ModalBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Modal.base.js.map

/***/ }),

/***/ "NBM3":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupedList.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedList", function() { return GroupedList; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GroupedList_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupedList.styles */ "33E4");
/* harmony import */ var _GroupedList_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupedList.base */ "ZCB3");



var GroupedList = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_GroupedList_base__WEBPACK_IMPORTED_MODULE_2__["GroupedListBase"], _GroupedList_styles__WEBPACK_IMPORTED_MODULE_1__["getStyles"], undefined, {
    scope: 'GroupedList'
});
//# sourceMappingURL=GroupedList.js.map

/***/ }),

/***/ "Nio4":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogContent.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogContent", function() { return DialogContent; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DialogContent_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DialogContent.base */ "CNvk");
/* harmony import */ var _DialogContent_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogContent.styles */ "FI3s");



var DialogContent = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DialogContent_base__WEBPACK_IMPORTED_MODULE_1__["DialogContentBase"], _DialogContent_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'DialogContent' });
//# sourceMappingURL=DialogContent.js.map

/***/ }),

/***/ "O9ES":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Checkbox/index.js ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: Checkbox, CheckboxBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Checkbox */ "l0yo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return _Checkbox__WEBPACK_IMPORTED_MODULE_0__["Checkbox"]; });

/* harmony import */ var _Checkbox_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox.base */ "iiRv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxBase", function() { return _Checkbox_base__WEBPACK_IMPORTED_MODULE_1__["CheckboxBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "OfIR":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/Dialog.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: Dialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dialog", function() { return Dialog; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dialog_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dialog.base */ "15YF");
/* harmony import */ var _Dialog_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dialog.styles */ "01ek");



var Dialog = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Dialog_base__WEBPACK_IMPORTED_MODULE_1__["DialogBase"], _Dialog_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'Dialog' });
//# sourceMappingURL=Dialog.js.map

/***/ }),

/***/ "PN6n":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsRow.base.js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRowBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRowBase", function() { return DetailsRowBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailsList.types */ "G1YK");
/* harmony import */ var _DetailsRowCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DetailsRowCheck */ "CpaK");
/* harmony import */ var _GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../GroupedList/GroupSpacer */ "pYG9");
/* harmony import */ var _DetailsRowFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DetailsRowFields */ "QWZp");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../FocusZone */ "su0C");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_FocusZone__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utilities/selection/interfaces */ "lQgf");
/* harmony import */ var _GroupedList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../GroupedList */ "xYNb");












var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["classNamesFunction"])();
var DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
var NO_COLUMNS = [];
var DetailsRowBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DetailsRowBase, _super);
    function DetailsRowBase(props) {
        var _this = _super.call(this, props) || this;
        _this._cellMeasurer = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._focusZone = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._onSelectionChanged = function () {
            var selectionState = _this._getSelectionState(_this.props);
            if (!Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["shallowCompare"])(selectionState, _this.state.selectionState)) {
                _this.setState({
                    selectionState: selectionState
                });
            }
        };
        _this._onRootRef = function (focusZone) {
            if (focusZone) {
                // Need to resolve the actual DOM node, not the component. The element itself will be used for drag/drop and focusing.
                _this._root = react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"](focusZone);
            }
            else {
                _this._root = undefined;
            }
        };
        /**
         * update isDropping state based on the input value, which is used to change style during drag and drop
         *
         * when change to true, that means drag enter. we will add default dropping class name
         * or the custom dropping class name (return result from onDragEnter) to the root elemet.
         *
         * when change to false, that means drag leave. we will remove the dropping class name from root element.
         *
         * @param newValue - New isDropping state value
         * @param event - The event trigger dropping state change which can be dragenter, dragleave etc
         */
        _this._updateDroppingState = function (newValue, event) {
            var isDropping = _this.state.isDropping;
            var _a = _this.props, dragDropEvents = _a.dragDropEvents, item = _a.item;
            if (!newValue) {
                if (dragDropEvents.onDragLeave) {
                    dragDropEvents.onDragLeave(item, event);
                }
            }
            else if (dragDropEvents.onDragEnter) {
                _this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
            }
            if (isDropping !== newValue) {
                _this.setState({ isDropping: newValue });
            }
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["initializeComponentRef"])(_this);
        _this._events = new _Utilities__WEBPACK_IMPORTED_MODULE_3__["EventGroup"](_this);
        _this.state = {
            selectionState: _this._getSelectionState(props),
            columnMeasureInfo: undefined,
            isDropping: false
        };
        _this._droppingClassNames = '';
        return _this;
    }
    DetailsRowBase.prototype.componentDidMount = function () {
        var dragDropHelper = this.props.dragDropHelper;
        if (dragDropHelper) {
            this._dragDropSubscription = dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
        }
        this._events.on(this.props.selection, _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_9__["SELECTION_CHANGE"], this._onSelectionChanged);
        if (this.props.onDidMount && this.props.item) {
            // If the item appears later, we should wait for it before calling this method.
            this._onDidMountCalled = true;
            this.props.onDidMount(this);
        }
    };
    DetailsRowBase.prototype.componentDidUpdate = function (previousProps) {
        var state = this.state;
        var _a = this.props, item = _a.item, onDidMount = _a.onDidMount;
        var columnMeasureInfo = state.columnMeasureInfo;
        if (this.props.itemIndex !== previousProps.itemIndex ||
            this.props.item !== previousProps.item ||
            this.props.dragDropHelper !== previousProps.dragDropHelper) {
            if (this._dragDropSubscription) {
                this._dragDropSubscription.dispose();
                delete this._dragDropSubscription;
            }
            if (this.props.dragDropHelper) {
                this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
            }
        }
        if (columnMeasureInfo && columnMeasureInfo.index >= 0 && this._cellMeasurer.current) {
            var newWidth = this._cellMeasurer.current.getBoundingClientRect().width;
            columnMeasureInfo.onMeasureDone(newWidth);
            this.setState({
                columnMeasureInfo: undefined
            });
        }
        if (item && onDidMount && !this._onDidMountCalled) {
            this._onDidMountCalled = true;
            onDidMount(this);
        }
    };
    DetailsRowBase.prototype.componentWillUnmount = function () {
        var _a = this.props, item = _a.item, onWillUnmount = _a.onWillUnmount;
        // Only call the onWillUnmount callback if we have an item.
        if (onWillUnmount && item) {
            onWillUnmount(this);
        }
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
            delete this._dragDropSubscription;
        }
        this._events.dispose();
    };
    // tslint:disable-next-line function-name
    DetailsRowBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        this.setState({
            selectionState: this._getSelectionState(newProps)
        });
    };
    DetailsRowBase.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.props.useReducedRowRenderer) {
            var newSelectionState = this._getSelectionState(nextProps);
            if (this.state.selectionState.isSelected !== newSelectionState.isSelected) {
                return true;
            }
            return !Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["shallowCompare"])(this.props, nextProps);
        }
        else {
            return true;
        }
    };
    DetailsRowBase.prototype.render = function () {
        var _a = this.props, className = _a.className, _b = _a.columns, columns = _b === void 0 ? NO_COLUMNS : _b, dragDropEvents = _a.dragDropEvents, item = _a.item, itemIndex = _a.itemIndex, _c = _a.onRenderCheck, onRenderCheck = _c === void 0 ? this._onRenderCheck : _c, onRenderDetailsCheckbox = _a.onRenderDetailsCheckbox, onRenderItemColumn = _a.onRenderItemColumn, getCellValueKey = _a.getCellValueKey, selectionMode = _a.selectionMode, _d = _a.rowWidth, rowWidth = _d === void 0 ? 0 : _d, checkboxVisibility = _a.checkboxVisibility, getRowAriaLabel = _a.getRowAriaLabel, getRowAriaDescribedBy = _a.getRowAriaDescribedBy, checkButtonAriaLabel = _a.checkButtonAriaLabel, checkboxCellClassName = _a.checkboxCellClassName, 
        /** Alias rowFieldsAs as RowFields and default to DetailsRowFields if rowFieldsAs does not exist */
        _e = _a.rowFieldsAs, 
        /** Alias rowFieldsAs as RowFields and default to DetailsRowFields if rowFieldsAs does not exist */
        RowFields = _e === void 0 ? _DetailsRowFields__WEBPACK_IMPORTED_MODULE_7__["DetailsRowFields"] : _e, selection = _a.selection, indentWidth = _a.indentWidth, enableUpdateAnimations = _a.enableUpdateAnimations, compact = _a.compact, theme = _a.theme, styles = _a.styles, cellsByColumn = _a.cellsByColumn, groupNestingDepth = _a.groupNestingDepth, _f = _a.useFastIcons, useFastIcons = _f === void 0 ? true : _f;
        var _g = this.state, columnMeasureInfo = _g.columnMeasureInfo, isDropping = _g.isDropping;
        var _h = this.state.selectionState, _j = _h.isSelected, isSelected = _j === void 0 ? false : _j, _k = _h.isSelectionModal, isSelectionModal = _k === void 0 ? false : _k;
        var isDraggable = dragDropEvents ? !!(dragDropEvents.canDrag && dragDropEvents.canDrag(item)) : undefined;
        var droppingClassName = isDropping ? this._droppingClassNames || DEFAULT_DROPPING_CSS_CLASS : '';
        var ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : undefined;
        var ariaDescribedBy = getRowAriaDescribedBy ? getRowAriaDescribedBy(item) : undefined;
        var canSelect = !!selection && selection.canSelectItem(item, itemIndex);
        var isContentUnselectable = selectionMode === _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_9__["SelectionMode"].multiple;
        var showCheckbox = selectionMode !== _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_9__["SelectionMode"].none && checkboxVisibility !== _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["CheckboxVisibility"].hidden;
        var ariaSelected = selectionMode === _utilities_selection_interfaces__WEBPACK_IMPORTED_MODULE_9__["SelectionMode"].none ? undefined : isSelected;
        this._classNames = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this._classNames, getClassNames(styles, {
            theme: theme,
            isSelected: isSelected,
            canSelect: !isContentUnselectable,
            anySelected: isSelectionModal,
            checkboxCellClassName: checkboxCellClassName,
            droppingClassName: droppingClassName,
            className: className,
            compact: compact,
            enableUpdateAnimations: enableUpdateAnimations
        }));
        var rowClassNames = {
            isMultiline: this._classNames.isMultiline,
            isRowHeader: this._classNames.isRowHeader,
            cell: this._classNames.cell,
            cellAnimation: this._classNames.cellAnimation,
            cellPadded: this._classNames.cellPadded,
            cellUnpadded: this._classNames.cellUnpadded,
            fields: this._classNames.fields
        };
        // Only re-assign rowClassNames when classNames have changed.
        // Otherwise, they will cause DetailsRowFields to unnecessarily
        // re-render, see https://github.com/OfficeDev/office-ui-fabric-react/pull/8799.
        // Refactor DetailsRowFields to generate own styles to remove need for this.
        if (!Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["shallowCompare"])(this._rowClassNames || {}, rowClassNames)) {
            this._rowClassNames = rowClassNames;
        }
        var rowFields = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](RowFields, { rowClassNames: this._rowClassNames, cellsByColumn: cellsByColumn, columns: columns, item: item, itemIndex: itemIndex, columnStartIndex: showCheckbox ? 1 : 0, onRenderItemColumn: onRenderItemColumn, getCellValueKey: getCellValueKey, enableUpdateAnimations: enableUpdateAnimations }));
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusZone__WEBPACK_IMPORTED_MODULE_8__["FocusZone"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ "data-is-focusable": true }, Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_3__["divProperties"]), (typeof isDraggable === 'boolean'
            ? {
                'data-is-draggable': isDraggable,
                draggable: isDraggable
            }
            : {}), { direction: _FocusZone__WEBPACK_IMPORTED_MODULE_8__["FocusZoneDirection"].horizontal, ref: this._onRootRef, componentRef: this._focusZone, role: "row", "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, className: this._classNames.root, "data-selection-index": itemIndex, "data-item-index": itemIndex, "aria-rowindex": itemIndex + 1, "data-automationid": "DetailsRow", style: { minWidth: rowWidth }, "aria-selected": ariaSelected, allowFocusRoot: true }),
            showCheckbox && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { role: "gridcell", "aria-colindex": 1, "data-selection-toggle": true, className: this._classNames.checkCell }, onRenderCheck({
                selected: isSelected,
                anySelected: isSelectionModal,
                'aria-label': checkButtonAriaLabel,
                canSelect: canSelect,
                compact: compact,
                className: this._classNames.check,
                theme: theme,
                isVisible: checkboxVisibility === _DetailsList_types__WEBPACK_IMPORTED_MODULE_4__["CheckboxVisibility"].always,
                onRenderDetailsCheckbox: onRenderDetailsCheckbox,
                useFastIcons: useFastIcons
            }))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_6__["GroupSpacer"], { indentWidth: indentWidth, count: groupNestingDepth - (this.props.collapseAllVisibility === _GroupedList__WEBPACK_IMPORTED_MODULE_10__["CollapseAllVisibility"].hidden ? 1 : 0) }),
            item && rowFields,
            columnMeasureInfo && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { role: "presentation", className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["css"])(this._classNames.cellMeasurer, this._classNames.cell), ref: this._cellMeasurer },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](RowFields, { rowClassNames: this._rowClassNames, columns: [columnMeasureInfo.column], item: item, itemIndex: itemIndex, columnStartIndex: (showCheckbox ? 1 : 0) + columns.length, onRenderItemColumn: onRenderItemColumn, getCellValueKey: getCellValueKey }))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { role: "checkbox", className: this._classNames.checkCover, "aria-checked": isSelected, "data-selection-toggle": true })));
    };
    /**
     * measure cell at index. and call the call back with the measured cell width when finish measure
     *
     * @param index - The cell index
     * @param onMeasureDone - The call back function when finish measure
     */
    DetailsRowBase.prototype.measureCell = function (index, onMeasureDone) {
        var _a = this.props.columns, columns = _a === void 0 ? NO_COLUMNS : _a;
        var column = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, columns[index]);
        column.minWidth = 0;
        column.maxWidth = 999999;
        delete column.calculatedWidth;
        this.setState({
            columnMeasureInfo: {
                index: index,
                column: column,
                onMeasureDone: onMeasureDone
            }
        });
    };
    DetailsRowBase.prototype.focus = function (forceIntoFirstElement) {
        if (forceIntoFirstElement === void 0) { forceIntoFirstElement = false; }
        return !!this._focusZone.current && this._focusZone.current.focus(forceIntoFirstElement);
    };
    DetailsRowBase.prototype._onRenderCheck = function (props) {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_DetailsRowCheck__WEBPACK_IMPORTED_MODULE_5__["DetailsRowCheck"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props));
    };
    DetailsRowBase.prototype._getSelectionState = function (props) {
        var itemIndex = props.itemIndex, selection = props.selection;
        return {
            isSelected: !!selection && selection.isIndexSelected(itemIndex),
            isSelectionModal: !!selection && !!selection.isModal && selection.isModal()
        };
    };
    DetailsRowBase.prototype._getRowDragDropOptions = function () {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.eventsToRegister;
        var options = {
            eventMap: eventsToRegister,
            selectionIndex: itemIndex,
            context: { data: item, index: itemIndex },
            canDrag: dragDropEvents.canDrag,
            canDrop: dragDropEvents.canDrop,
            onDragStart: dragDropEvents.onDragStart,
            updateDropState: this._updateDroppingState,
            onDrop: dragDropEvents.onDrop,
            onDragEnd: dragDropEvents.onDragEnd
        };
        return options;
    };
    return DetailsRowBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=DetailsRow.base.js.map

/***/ }),

/***/ "QWZp":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRowFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRowFields", function() { return DetailsRowFields; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");



var getCellText = function (item, column) {
    var value = item && column && column.fieldName ? item[column.fieldName] : '';
    if (value === null || value === undefined) {
        value = '';
    }
    if (typeof value === 'boolean') {
        return value.toString();
    }
    return value;
};
/**
 * Component for rendering a row's cells in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
var DetailsRowFields = function (props) {
    var columns = props.columns, columnStartIndex = props.columnStartIndex, rowClassNames = props.rowClassNames, _a = props.cellStyleProps, cellStyleProps = _a === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CELL_STYLE_PROPS"] : _a, item = props.item, itemIndex = props.itemIndex, onRenderItemColumn = props.onRenderItemColumn, getCellValueKey = props.getCellValueKey, cellsByColumn = props.cellsByColumn, enableUpdateAnimations = props.enableUpdateAnimations;
    var cellValueKeysRef = react__WEBPACK_IMPORTED_MODULE_0__["useRef"]();
    var cellValueKeys = cellValueKeysRef.current || (cellValueKeysRef.current = {});
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: rowClassNames.fields, "data-automationid": "DetailsRowFields", role: "presentation" }, columns.map(function (column, columnIndex) {
        var width = typeof column.calculatedWidth === 'undefined'
            ? 'auto'
            : column.calculatedWidth +
                cellStyleProps.cellLeftPadding +
                cellStyleProps.cellRightPadding +
                (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);
        var _a = column.onRender, onRender = _a === void 0 ? onRenderItemColumn : _a, _b = column.getValueKey, getValueKey = _b === void 0 ? getCellValueKey : _b;
        var cellContentsRender = cellsByColumn && column.key in cellsByColumn
            ? cellsByColumn[column.key]
            : onRender
                ? onRender(item, itemIndex, column)
                : getCellText(item, column);
        var previousValueKey = cellValueKeys[column.key];
        var cellValueKey = enableUpdateAnimations && getValueKey ? getValueKey(item, itemIndex, column) : undefined;
        var showAnimation = false;
        if (cellValueKey !== undefined && previousValueKey !== undefined && cellValueKey !== previousValueKey) {
            showAnimation = true;
        }
        cellValueKeys[column.key] = cellValueKey;
        // generate a key that auto-dirties when content changes, to force the container to re-render, to trigger animation
        var key = "" + column.key + (cellValueKey !== undefined ? "-" + cellValueKey : '');
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: key, role: column.isRowHeader ? 'rowheader' : 'gridcell', "aria-colindex": columnIndex + columnStartIndex + 1, className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["css"])(column.className, column.isMultiline && rowClassNames.isMultiline, column.isRowHeader && rowClassNames.isRowHeader, rowClassNames.cell, column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded, showAnimation && rowClassNames.cellAnimation), style: { width: width }, "data-automationid": "DetailsRowCell", "data-automation-key": column.key }, cellContentsRender));
    })));
};
//# sourceMappingURL=DetailsRowFields.js.map

/***/ }),

/***/ "RxPz":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsList.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-DetailsList',
    compact: 'ms-DetailsList--Compact',
    contentWrapper: 'ms-DetailsList-contentWrapper',
    headerWrapper: 'ms-DetailsList-headerWrapper',
    isFixed: 'is-fixed',
    isHorizontalConstrained: 'is-horizontalConstrained',
    listCell: 'ms-List-cell'
};
var getStyles = function (props) {
    var _a, _b;
    var theme = props.theme, className = props.className, isHorizontalConstrained = props.isHorizontalConstrained, compact = props.compact, isFixed = props.isFixed;
    var semanticColors = theme.semanticColors;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.small,
            {
                position: 'relative',
                background: semanticColors.listBackground,
                color: semanticColors.listText,
                selectors: (_a = {},
                    _a["& ." + classNames.listCell] = {
                        minHeight: 38,
                        wordBreak: 'break-word'
                    },
                    _a)
            },
            isFixed && classNames.isFixed,
            compact && [
                classNames.compact,
                {
                    selectors: (_b = {},
                        _b["." + classNames.listCell] = {
                            minHeight: 32
                        },
                        _b)
                }
            ],
            isHorizontalConstrained && [
                classNames.isHorizontalConstrained,
                {
                    overflowX: 'auto',
                    overflowY: 'visible',
                    WebkitOverflowScrolling: 'touch'
                }
            ],
            className
        ],
        focusZone: [
            {
                display: 'inline-block',
                minWidth: '100%',
                minHeight: 1
            }
        ],
        headerWrapper: classNames.headerWrapper,
        contentWrapper: classNames.contentWrapper
    };
};
//# sourceMappingURL=DetailsList.styles.js.map

/***/ }),

/***/ "SmFy":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsHeader.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: HEADER_HEIGHT, getCellStyles, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_HEIGHT", function() { return HEADER_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellStyles", function() { return getCellStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");
/* harmony import */ var _GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GroupedList/GroupSpacer */ "pYG9");



// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.

var GlobalClassNames = {
    tooltipHost: 'ms-TooltipHost',
    root: 'ms-DetailsHeader',
    cell: 'ms-DetailsHeader-cell',
    cellIsCheck: 'ms-DetailsHeader-cellIsCheck',
    collapseButton: 'ms-DetailsHeader-collapseButton',
    isCollapsed: 'is-collapsed',
    isAllSelected: 'is-allSelected',
    isSelectAllHidden: 'is-selectAllHidden',
    isResizingColumn: 'is-resizingColumn',
    cellSizer: 'ms-DetailsHeader-cellSizer',
    isResizing: 'is-resizing',
    dropHintCircleStyle: 'ms-DetailsHeader-dropHintCircleStyle',
    dropHintCaretStyle: 'ms-DetailsHeader-dropHintCaretStyle',
    dropHintLineStyle: 'ms-DetailsHeader-dropHintLineStyle',
    cellTitle: 'ms-DetailsHeader-cellTitle',
    cellName: 'ms-DetailsHeader-cellName',
    filterChevron: 'ms-DetailsHeader-filterChevron',
    gripperBarVertical: 'ms-DetailsColumn-gripperBarVertical',
    checkTooltip: 'ms-DetailsHeader-checkTooltip',
    check: 'ms-DetailsHeader-check'
};
var HEADER_HEIGHT = 42;
var getCellStyles = function (props) {
    var theme = props.theme, _a = props.cellStyleProps, cellStyleProps = _a === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CELL_STYLE_PROPS"] : _a;
    var semanticColors = theme.semanticColors;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return [
        classNames.cell,
        Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getFocusStyle"])(theme),
        {
            color: semanticColors.bodyText,
            position: 'relative',
            display: 'inline-block',
            boxSizing: 'border-box',
            padding: "0 " + cellStyleProps.cellRightPadding + "px 0 " + cellStyleProps.cellLeftPadding + "px",
            lineHeight: 'inherit',
            margin: '0',
            height: HEADER_HEIGHT,
            verticalAlign: 'top',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            textAlign: 'left'
        }
    ];
};
var getStyles = function (props) {
    var _a, _b, _c, _d, _e;
    var theme = props.theme, className = props.className, isSelectAllHidden = props.isSelectAllHidden, isAllSelected = props.isAllSelected, isResizingColumn = props.isResizingColumn, isSizing = props.isSizing, isAllCollapsed = props.isAllCollapsed, _f = props.cellStyleProps, cellStyleProps = _f === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CELL_STYLE_PROPS"] : _f;
    var semanticColors = theme.semanticColors, palette = theme.palette, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var colors = {
        iconForegroundColor: semanticColors.bodySubtext,
        headerForegroundColor: semanticColors.bodyText,
        headerBackgroundColor: semanticColors.bodyBackground,
        dropdownChevronForegroundColor: palette.neutralTertiary,
        resizerColor: palette.neutralTertiaryAlt
    };
    var cellSizerFadeInStyles = {
        opacity: 1,
        transition: 'opacity 0.3s linear'
    };
    var cellStyles = getCellStyles(props);
    return {
        root: [
            classNames.root,
            fonts.small,
            {
                display: 'inline-block',
                background: colors.headerBackgroundColor,
                position: 'relative',
                minWidth: '100%',
                verticalAlign: 'top',
                height: HEADER_HEIGHT,
                lineHeight: HEADER_HEIGHT,
                whiteSpace: 'nowrap',
                boxSizing: 'content-box',
                paddingBottom: '1px',
                paddingTop: '16px',
                borderBottom: "1px solid " + semanticColors.bodyDivider,
                cursor: 'default',
                userSelect: 'none',
                selectors: (_a = {},
                    _a["&:hover ." + classNames.check] = {
                        opacity: 1
                    },
                    _a["& ." + classNames.tooltipHost + " ." + classNames.checkTooltip] = {
                        display: 'block'
                    },
                    _a)
            },
            isAllSelected && classNames.isAllSelected,
            isSelectAllHidden && {
                selectors: (_b = {},
                    _b["& ." + classNames.cellIsCheck] = {
                        visibility: 'hidden'
                    },
                    _b)
            },
            isResizingColumn && classNames.isResizingColumn,
            className
        ],
        check: [
            classNames.check,
            {
                height: HEADER_HEIGHT
            },
            {
                selectors: (_c = {},
                    _c["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus"] = {
                        opacity: 1
                    },
                    _c)
            }
        ],
        cellWrapperPadded: {
            paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding
        },
        cellIsCheck: [
            cellStyles,
            classNames.cellIsCheck,
            {
                position: 'relative',
                padding: 0,
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                border: 'none'
            },
            isAllSelected && {
                opacity: 1
            }
        ],
        cellIsGroupExpander: [
            cellStyles,
            {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fonts.small.fontSize,
                padding: 0,
                border: 'none',
                width: _GroupedList_GroupSpacer__WEBPACK_IMPORTED_MODULE_3__["SPACER_WIDTH"],
                color: palette.neutralSecondary,
                selectors: {
                    ':hover': {
                        backgroundColor: palette.neutralLighter
                    },
                    ':active': {
                        backgroundColor: palette.neutralLight
                    }
                }
            }
        ],
        cellIsActionable: {
            selectors: {
                ':hover': {
                    color: semanticColors.bodyText,
                    background: semanticColors.listHeaderBackgroundHovered
                },
                ':active': {
                    background: semanticColors.listHeaderBackgroundPressed
                }
            }
        },
        cellIsEmpty: {
            textOverflow: 'clip'
        },
        cellSizer: [
            classNames.cellSizer,
            Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["focusClear"])(),
            {
                display: 'inline-block',
                position: 'relative',
                cursor: 'ew-resize',
                bottom: 0,
                top: 0,
                overflow: 'hidden',
                height: 'inherit',
                background: 'transparent',
                zIndex: 1,
                width: 16,
                selectors: (_d = {
                        ':after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: 1,
                            background: colors.resizerColor,
                            opacity: 0,
                            left: '50%'
                        },
                        ':focus:after': cellSizerFadeInStyles,
                        ':hover:after': cellSizerFadeInStyles
                    },
                    _d["&." + classNames.isResizing + ":after"] = [
                        cellSizerFadeInStyles,
                        {
                            boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)'
                        }
                    ],
                    _d)
            }
        ],
        cellIsResizing: classNames.isResizing,
        cellSizerStart: {
            margin: '0 -8px'
        },
        cellSizerEnd: {
            margin: 0,
            marginLeft: -16
        },
        collapseButton: [
            classNames.collapseButton,
            {
                transformOrigin: '50% 50%',
                transition: 'transform .1s linear'
            },
            isAllCollapsed
                ? [
                    classNames.isCollapsed,
                    {
                        transform: 'rotate(0deg)'
                    }
                ]
                : {
                    transform: 'rotate(90deg)'
                }
        ],
        checkTooltip: classNames.checkTooltip,
        sizingOverlay: isSizing && {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            cursor: 'ew-resize',
            background: 'rgba(255, 255, 255, 0)',
            selectors: (_e = {},
                _e[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                    background: 'transparent',
                    MsHighContrastAdjust: 'none'
                },
                _e)
        },
        accessibleLabel: _Styling__WEBPACK_IMPORTED_MODULE_0__["hiddenContentStyle"],
        dropHintCircleStyle: [
            classNames.dropHintCircleStyle,
            {
                display: 'inline-block',
                visibility: 'hidden',
                position: 'absolute',
                bottom: 0,
                height: 9,
                width: 9,
                borderRadius: '50%',
                marginLeft: -5,
                top: 34,
                overflow: 'visible',
                zIndex: 10,
                border: "1px solid " + palette.themePrimary,
                background: palette.white
            }
        ],
        dropHintCaretStyle: [
            classNames.dropHintCaretStyle,
            {
                display: 'none',
                position: 'absolute',
                top: -28,
                left: -6.5,
                fontSize: fonts.medium.fontSize,
                color: palette.themePrimary,
                overflow: 'visible',
                zIndex: 10
            }
        ],
        dropHintLineStyle: [
            classNames.dropHintLineStyle,
            {
                display: 'none',
                position: 'absolute',
                bottom: 0,
                top: 0,
                overflow: 'hidden',
                height: 42,
                width: 1,
                background: palette.themePrimary,
                zIndex: 10
            }
        ],
        dropHintStyle: {
            display: 'inline-block',
            position: 'absolute'
        }
    };
};
//# sourceMappingURL=DetailsHeader.styles.js.map

/***/ }),

/***/ "T/ax":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogFooter.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogFooter", function() { return DialogFooter; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DialogFooter_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DialogFooter.base */ "ugPr");
/* harmony import */ var _DialogFooter_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogFooter.styles */ "8S/1");



var DialogFooter = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DialogFooter_base__WEBPACK_IMPORTED_MODULE_1__["DialogFooterBase"], _DialogFooter_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'DialogFooter' });
//# sourceMappingURL=DialogFooter.js.map

/***/ }),

/***/ "UJDV":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Utilities.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Utilities.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "UO3J":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Callout/index.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/Callout/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "UfSG":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Icon.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Icon.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_Icon;

/***/ }),

/***/ "V5j+":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupHeader.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DetailsList_DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DetailsList/DetailsRow.styles */ "FzFm");
/* harmony import */ var _DetailsList_DetailsRowCheck_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DetailsList/DetailsRowCheck.styles */ "rkb2");
/* harmony import */ var _GroupSpacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GroupSpacer */ "pYG9");




// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.

var GlobalClassNames = {
    root: 'ms-GroupHeader',
    compact: 'ms-GroupHeader--compact',
    check: 'ms-GroupHeader-check',
    dropIcon: 'ms-GroupHeader-dropIcon',
    expand: 'ms-GroupHeader-expand',
    isCollapsed: 'is-collapsed',
    title: 'ms-GroupHeader-title',
    isSelected: 'is-selected',
    iconTag: 'ms-Icon--Tag',
    group: 'ms-GroupedList-group',
    isDropping: 'is-dropping'
};
var beziers = {
    easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
    easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
};
var DEFAULT_GROUP_HEADER_HEIGHT = 48;
var COMPACT_GROUP_HEADER_HEIGHT = 40;
var getStyles = function (props) {
    var _a, _b, _c, _d, _e;
    var theme = props.theme, className = props.className, selected = props.selected, isCollapsed = props.isCollapsed, compact = props.compact;
    var cellLeftPadding = _DetailsList_DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CELL_STYLE_PROPS"].cellLeftPadding; // padding from the source to align GroupHeader title with DetailsRow's first cell.
    var finalRowHeight = compact ? COMPACT_GROUP_HEADER_HEIGHT : DEFAULT_GROUP_HEADER_HEIGHT;
    var semanticColors = theme.semanticColors, palette = theme.palette, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var checkExpandResetStyles = [
        Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getFocusStyle"])(theme),
        {
            cursor: 'default',
            background: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0 // cancel default <button> padding
        }
    ];
    return {
        root: [
            classNames.root,
            Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getFocusStyle"])(theme),
            theme.fonts.medium,
            {
                borderBottom: "1px solid " + semanticColors.listBackground,
                cursor: 'default',
                userSelect: 'none',
                selectors: (_a = {
                        ':hover': {
                            background: semanticColors.listItemBackgroundHovered,
                            color: semanticColors.actionLinkHovered
                        }
                    },
                    _a["&:hover ." + classNames.check] = {
                        opacity: 1
                    },
                    _a["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus ." + classNames.check] = {
                        opacity: 1
                    },
                    _a[":global(." + classNames.group + "." + classNames.isDropping + ")"] = {
                        selectors: (_b = {},
                            _b["& > ." + classNames.root + " ." + classNames.dropIcon] = {
                                transition: "transform " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue4 + " " + beziers.easeOutCirc + " opacity " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue1 + " " + beziers.easeOutSine,
                                transitionDelay: _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue3,
                                opacity: 1,
                                transform: "rotate(0.2deg) scale(1);" // rotation prevents jittery motion in IE
                            },
                            _b["." + classNames.check] = {
                                opacity: 0
                            },
                            _b)
                    },
                    _a)
            },
            selected && [
                classNames.isSelected,
                {
                    background: semanticColors.listItemBackgroundChecked,
                    selectors: (_c = {
                            ':hover': {
                                background: semanticColors.listItemBackgroundCheckedHovered
                            }
                        },
                        _c["" + classNames.check] = {
                            opacity: 1
                        },
                        _c)
                }
            ],
            compact && [classNames.compact, { border: 'none' }],
            className
        ],
        groupHeaderContainer: [
            {
                display: 'flex',
                alignItems: 'center',
                height: finalRowHeight
            }
        ],
        headerCount: [
            {
                padding: '0px 4px'
            }
        ],
        check: [
            classNames.check,
            checkExpandResetStyles,
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // paddingTop and marginTop brought from the DetailsRow.styles.ts with explanation below.
                // Ensure that the check cell covers the top border of the cell.
                // This ensures the click target does not leave a spot which would
                // cause other items to be deselected.
                paddingTop: 1,
                marginTop: -1,
                opacity: 0,
                width: _DetailsList_DetailsRowCheck_styles__WEBPACK_IMPORTED_MODULE_3__["CHECK_CELL_WIDTH"],
                height: finalRowHeight,
                selectors: (_d = {},
                    _d["." + _Utilities__WEBPACK_IMPORTED_MODULE_1__["IsFocusVisibleClassName"] + " &:focus"] = {
                        opacity: 1
                    },
                    _d)
            }
        ],
        expand: [
            classNames.expand,
            checkExpandResetStyles,
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fonts.small.fontSize,
                width: _GroupSpacer__WEBPACK_IMPORTED_MODULE_4__["SPACER_WIDTH"],
                height: finalRowHeight,
                color: selected ? palette.neutralPrimary : palette.neutralSecondary,
                selectors: {
                    ':hover': {
                        backgroundColor: selected ? palette.neutralQuaternary : palette.neutralLight
                    },
                    ':active': {
                        backgroundColor: selected ? palette.neutralTertiaryAlt : palette.neutralQuaternaryAlt
                    }
                }
            }
        ],
        expandIsCollapsed: [
            isCollapsed
                ? [
                    classNames.isCollapsed,
                    {
                        transform: 'rotate(0deg)',
                        transformOrigin: '50% 50%',
                        transition: 'transform .1s linear'
                    }
                ]
                : {
                    transform: 'rotate(90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'transform .1s linear'
                }
        ],
        title: [
            classNames.title,
            {
                paddingLeft: cellLeftPadding,
                fontSize: compact ? fonts.medium.fontSize : fonts.mediumPlus.fontSize,
                fontWeight: isCollapsed ? _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].regular : _Styling__WEBPACK_IMPORTED_MODULE_0__["FontWeights"].semibold,
                cursor: 'pointer',
                outline: 0,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        ],
        dropIcon: [
            classNames.dropIcon,
            {
                position: 'absolute',
                left: -26,
                fontSize: _Styling__WEBPACK_IMPORTED_MODULE_0__["IconFontSizes"].large,
                color: palette.neutralSecondary,
                transition: "transform " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2 + " " + beziers.easeInBack + ", opacity " + _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue4 + " " + beziers.easeOutSine,
                opacity: 0,
                transform: 'rotate(0.2deg) scale(0.65)',
                transformOrigin: '10px 10px',
                selectors: (_e = {},
                    _e[":global(." + classNames.iconTag + ")"] = {
                        position: 'absolute'
                    },
                    _e)
            }
        ]
    };
};
//# sourceMappingURL=GroupHeader.styles.js.map

/***/ }),

/***/ "VUIz":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsRow.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsRow", function() { return DetailsRow; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DetailsRow_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailsRow.base */ "PN6n");
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");



var DetailsRow = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DetailsRow_base__WEBPACK_IMPORTED_MODULE_1__["DetailsRowBase"], _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'DetailsRow'
});
//# sourceMappingURL=DetailsRow.js.map

/***/ }),

/***/ "WEvm":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/FocusTrapZone/index.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/FocusTrapZone/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "YCiU":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Popup/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/Popup/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_PopupIndex;

/***/ }),

/***/ "Yqya":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/keytips/KeytipManager.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: KeytipManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeytipManager", function() { return KeytipManager; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/keytips/KeytipConstants */ "ZrMC");



/**
 * This class is responsible for handling registering, updating, and unregistering of keytips
 */
var KeytipManager = /** @class */ (function () {
    function KeytipManager() {
        this.keytips = [];
        this.persistedKeytips = [];
        // This is (and should be) updated and kept in sync
        // with the inKeytipMode in KeytipLayer.
        this.inKeytipMode = false;
        // Boolean that gets checked before entering keytip mode by the KeytipLayer
        // Used for an override in special cases (e.g. Disable entering keytip mode when a modal is shown)
        this.shouldEnterKeytipMode = true;
    }
    /**
     * Static function to get singleton KeytipManager instance
     *
     * @returns {KeytipManager} Singleton KeytipManager instance
     */
    KeytipManager.getInstance = function () {
        return this._instance;
    };
    /**
     * Registers a keytip
     *
     * @param keytipProps - Keytip to register
     * @param persisted - T/F if this keytip should be persisted, default is false
     * @returns {string} Unique ID for this keytip
     */
    KeytipManager.prototype.register = function (keytipProps, persisted) {
        if (persisted === void 0) { persisted = false; }
        var props = keytipProps;
        if (!persisted) {
            // Add the overflowSetSequence if necessary
            props = this.addParentOverflow(keytipProps);
        }
        // Create a unique keytip
        var uniqueKeytip = this._getUniqueKtp(props);
        // Add to array
        persisted ? this.persistedKeytips.push(uniqueKeytip) : this.keytips.push(uniqueKeytip);
        var event = persisted ? _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].PERSISTED_KEYTIP_ADDED : _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].KEYTIP_ADDED;
        _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this, event, {
            keytip: props,
            uniqueID: uniqueKeytip.uniqueID
        });
        return uniqueKeytip.uniqueID;
    };
    /**
     * Update a keytip
     *
     * @param keytipProps - Keytip to update
     * @param uniqueID - Unique ID of this keytip
     */
    KeytipManager.prototype.update = function (keytipProps, uniqueID) {
        var newKeytipProps = this.addParentOverflow(keytipProps);
        var uniqueKeytip = this._getUniqueKtp(newKeytipProps, uniqueID);
        var keytipIndex = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["findIndex"])(this.keytips, function (ktp) {
            return ktp.uniqueID === uniqueID;
        });
        if (keytipIndex >= 0) {
            // Update everything except 'visible'
            uniqueKeytip.keytip.visible = this.keytips[keytipIndex].keytip.visible;
            // Update keytip in this.keytips
            this.keytips = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["replaceElement"])(this.keytips, uniqueKeytip, keytipIndex);
            // Raise event
            _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this, _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].KEYTIP_UPDATED, {
                keytip: uniqueKeytip.keytip,
                uniqueID: uniqueKeytip.uniqueID
            });
        }
    };
    /**
     * Unregisters a keytip
     *
     * @param keytipToRemove - IKeytipProps of the keytip to remove
     * @param uniqueID - Unique ID of this keytip
     * @param persisted - T/F if this keytip should be persisted, default is false
     */
    KeytipManager.prototype.unregister = function (keytipToRemove, uniqueID, persisted) {
        if (persisted === void 0) { persisted = false; }
        if (persisted) {
            // Remove keytip from this.persistedKeytips
            this.persistedKeytips = this.persistedKeytips.filter(function (uniqueKtp) {
                return uniqueKtp.uniqueID !== uniqueID;
            });
        }
        else {
            // Remove keytip from this.keytips
            this.keytips = this.keytips.filter(function (uniqueKtp) {
                return uniqueKtp.uniqueID !== uniqueID;
            });
        }
        var event = persisted ? _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].PERSISTED_KEYTIP_REMOVED : _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].KEYTIP_REMOVED;
        _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this, event, {
            keytip: keytipToRemove,
            uniqueID: uniqueID
        });
    };
    /**
     * Manual call to enter keytip mode
     */
    KeytipManager.prototype.enterKeytipMode = function () {
        _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this, _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].ENTER_KEYTIP_MODE);
    };
    /**
     * Manual call to exit keytip mode
     */
    KeytipManager.prototype.exitKeytipMode = function () {
        _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this, _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].EXIT_KEYTIP_MODE);
    };
    /**
     * Gets all IKeytipProps from this.keytips
     *
     * @returns {IKeytipProps[]} All keytips stored in the manager
     */
    KeytipManager.prototype.getKeytips = function () {
        return this.keytips.map(function (uniqueKeytip) {
            return uniqueKeytip.keytip;
        });
    };
    /**
     * Adds the overflowSetSequence to the keytipProps if its parent keytip also has it
     *
     * @param keytipProps - Keytip props to add overflowSetSequence to if necessary
     * @returns {IKeytipProps} - Modified keytip props, if needed to be modified
     */
    KeytipManager.prototype.addParentOverflow = function (keytipProps) {
        var fullSequence = keytipProps.keySequences.slice();
        fullSequence.pop();
        if (fullSequence.length !== 0) {
            var parentKeytip = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["find"])(this.getKeytips(), function (keytip) {
                return Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["arraysEqual"])(fullSequence, keytip.keySequences);
            });
            if (parentKeytip && parentKeytip.overflowSetSequence) {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, keytipProps, { overflowSetSequence: parentKeytip.overflowSetSequence });
            }
        }
        return keytipProps;
    };
    /**
     * Public function to bind for overflow items that have a submenu
     *
     * @param overflowButtonSequences
     * @param keytipSequences
     */
    KeytipManager.prototype.menuExecute = function (overflowButtonSequences, keytipSequences) {
        _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this, _utilities_keytips_KeytipConstants__WEBPACK_IMPORTED_MODULE_2__["KeytipEvents"].PERSISTED_KEYTIP_EXECUTE, {
            overflowButtonSequences: overflowButtonSequences,
            keytipSequences: keytipSequences
        });
    };
    /**
     * Creates an IUniqueKeytip object
     *
     * @param keytipProps - IKeytipProps
     * @param uniqueID - Unique ID, will default to the next unique ID if not passed
     * @returns {IUniqueKeytip} IUniqueKeytip object
     */
    KeytipManager.prototype._getUniqueKtp = function (keytipProps, uniqueID) {
        if (uniqueID === void 0) { uniqueID = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["getId"])(); }
        return { keytip: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, keytipProps), uniqueID: uniqueID };
    };
    KeytipManager._instance = new KeytipManager();
    return KeytipManager;
}());

//# sourceMappingURL=KeytipManager.js.map

/***/ }),

/***/ "ZCB3":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupedList.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupedListBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedListBase", function() { return GroupedListBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _GroupedListSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GroupedListSection */ "GVOX");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../List */ "yKNM");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_List__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utilities_selection_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/selection/index */ "08hr");
/* harmony import */ var _DetailsList_DetailsRow_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DetailsList/DetailsRow.styles */ "FzFm");







var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var ROW_HEIGHT = _DetailsList_DetailsRow_styles__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_ROW_HEIGHTS"].rowHeight, COMPACT_ROW_HEIGHT = _DetailsList_DetailsRow_styles__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_ROW_HEIGHTS"].compactRowHeight;
var GroupedListBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GroupedListBase, _super);
    function GroupedListBase(props) {
        var _this = _super.call(this, props) || this;
        _this._list = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._renderGroup = function (group, groupIndex) {
            var _a = _this.props, dragDropEvents = _a.dragDropEvents, dragDropHelper = _a.dragDropHelper, eventsToRegister = _a.eventsToRegister, groupProps = _a.groupProps, items = _a.items, listProps = _a.listProps, onRenderCell = _a.onRenderCell, selectionMode = _a.selectionMode, selection = _a.selection, viewport = _a.viewport, onShouldVirtualize = _a.onShouldVirtualize, groups = _a.groups, compact = _a.compact;
            // override group header/footer props as needed
            var dividerProps = {
                onToggleSelectGroup: _this._onToggleSelectGroup,
                onToggleCollapse: _this._onToggleCollapse,
                onToggleSummarize: _this._onToggleSummarize
            };
            var headerProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupProps.headerProps, dividerProps);
            var showAllProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupProps.showAllProps, dividerProps);
            var footerProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupProps.footerProps, dividerProps);
            var groupNestingDepth = _this._getGroupNestingDepth();
            if (!groupProps.showEmptyGroups && group && group.count === 0) {
                return null;
            }
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupedListSection__WEBPACK_IMPORTED_MODULE_3__["GroupedListSection"], { ref: 'group_' + groupIndex, key: _this._getGroupKey(group, groupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: groupProps && groupProps.getGroupItemLimit, group: group, groupIndex: groupIndex, groupNestingDepth: groupNestingDepth, groupProps: groupProps, headerProps: headerProps, listProps: listProps, items: items, onRenderCell: onRenderCell, onRenderGroupHeader: groupProps.onRenderHeader, onRenderGroupShowAll: groupProps.onRenderShowAll, onRenderGroupFooter: groupProps.onRenderFooter, selectionMode: selectionMode, selection: selection, showAllProps: showAllProps, viewport: viewport, onShouldVirtualize: onShouldVirtualize, groupedListClassNames: _this._classNames, groups: groups, compact: compact }));
        };
        _this._getDefaultGroupItemLimit = function (group) {
            return group.count;
        };
        _this._getGroupItemLimit = function (group) {
            var groupProps = _this.props.groupProps;
            var getGroupItemLimit = groupProps && groupProps.getGroupItemLimit ? groupProps.getGroupItemLimit : _this._getDefaultGroupItemLimit;
            return getGroupItemLimit(group);
        };
        _this._getGroupHeight = function (group) {
            var rowHeight = _this.props.compact ? COMPACT_ROW_HEIGHT : ROW_HEIGHT;
            return rowHeight + (group.isCollapsed ? 0 : rowHeight * _this._getGroupItemLimit(group));
        };
        _this._getPageHeight = function (itemIndex) {
            var groups = _this.state.groups;
            var _a = _this.props.getGroupHeight, getGroupHeight = _a === void 0 ? _this._getGroupHeight : _a;
            var pageGroup = groups && groups[itemIndex];
            if (pageGroup) {
                return getGroupHeight(pageGroup, itemIndex);
            }
            else {
                return 0;
            }
        };
        _this._onToggleCollapse = function (group) {
            var groupProps = _this.props.groupProps;
            var onToggleCollapse = groupProps && groupProps.headerProps && groupProps.headerProps.onToggleCollapse;
            if (group) {
                if (onToggleCollapse) {
                    onToggleCollapse(group);
                }
                group.isCollapsed = !group.isCollapsed;
                _this._updateIsSomeGroupExpanded();
                _this.forceUpdate();
            }
        };
        _this._onToggleSelectGroup = function (group) {
            if (group) {
                _this.props.selection.toggleRangeSelected(group.startIndex, group.count);
            }
        };
        _this._onToggleSummarize = function (group) {
            var groupProps = _this.props.groupProps;
            var onToggleSummarize = groupProps && groupProps.showAllProps && groupProps.showAllProps.onToggleSummarize;
            if (onToggleSummarize) {
                onToggleSummarize(group);
            }
            else {
                if (group) {
                    group.isShowingAll = !group.isShowingAll;
                }
                _this.forceUpdate();
            }
        };
        _this._getPageSpecification = function (itemIndex) {
            var groups = _this.state.groups;
            var pageGroup = groups && groups[itemIndex];
            return {
                key: pageGroup && pageGroup.key
            };
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeComponentRef"])(_this);
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeFocusRects"])();
        _this._isSomeGroupExpanded = _this._computeIsSomeGroupExpanded(props.groups);
        _this.state = {
            lastWidth: 0,
            groups: props.groups
        };
        return _this;
    }
    GroupedListBase.prototype.scrollToIndex = function (index, measureItem, scrollToMode) {
        if (this._list.current) {
            this._list.current.scrollToIndex(index, measureItem, scrollToMode);
        }
    };
    GroupedListBase.prototype.getStartItemIndexInView = function () {
        return this._list.current.getStartItemIndexInView() || 0;
    };
    // tslint:disable-next-line function-name
    GroupedListBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        var _a = this.props, groups = _a.groups, selectionMode = _a.selectionMode, compact = _a.compact;
        var shouldForceUpdates = false;
        if (newProps.groups !== groups) {
            this.setState({ groups: newProps.groups });
            shouldForceUpdates = true;
        }
        if (newProps.selectionMode !== selectionMode || newProps.compact !== compact) {
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this._forceListUpdates();
        }
    };
    GroupedListBase.prototype.componentDidMount = function () {
        var _a = this.props, groupProps = _a.groupProps, _b = _a.groups, groups = _b === void 0 ? [] : _b;
        if (groupProps && groupProps.isAllGroupsCollapsed) {
            this._setGroupsCollapsedState(groups, groupProps.isAllGroupsCollapsed);
        }
    };
    GroupedListBase.prototype.render = function () {
        var _a = this.props, className = _a.className, usePageCache = _a.usePageCache, onShouldVirtualize = _a.onShouldVirtualize, theme = _a.theme, styles = _a.styles, compact = _a.compact, _b = _a.listProps, listProps = _b === void 0 ? {} : _b;
        var groups = this.state.groups;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            compact: compact
        });
        var version = listProps.version;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.root, "data-automationid": "GroupedList", "data-is-scrollable": "false", role: "presentation" }, !groups ? (this._renderGroup(undefined, 0)) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_List__WEBPACK_IMPORTED_MODULE_4__["List"], { ref: this._list, role: "presentation", items: groups, onRenderCell: this._renderGroup, getItemCountForPage: this._returnOne, getPageHeight: this._getPageHeight, getPageSpecification: this._getPageSpecification, usePageCache: usePageCache, onShouldVirtualize: onShouldVirtualize, version: version }))));
    };
    GroupedListBase.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this._forceListUpdates();
    };
    GroupedListBase.prototype.toggleCollapseAll = function (allCollapsed) {
        var _a = this.state.groups, groups = _a === void 0 ? [] : _a;
        var groupProps = this.props.groupProps;
        var onToggleCollapseAll = groupProps && groupProps.onToggleCollapseAll;
        if (groups.length > 0) {
            if (onToggleCollapseAll) {
                onToggleCollapseAll(allCollapsed);
            }
            this._setGroupsCollapsedState(groups, allCollapsed);
            this._updateIsSomeGroupExpanded();
            this.forceUpdate();
        }
    };
    GroupedListBase.prototype._setGroupsCollapsedState = function (groups, isCollapsed) {
        for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
            groups[groupIndex].isCollapsed = isCollapsed;
        }
    };
    GroupedListBase.prototype._returnOne = function () {
        return 1;
    };
    GroupedListBase.prototype._getGroupKey = function (group, index) {
        return 'group-' + (group && group.key ? group.key : String(index));
    };
    GroupedListBase.prototype._getGroupNestingDepth = function () {
        var groups = this.state.groups;
        var level = 0;
        var groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    };
    GroupedListBase.prototype._forceListUpdates = function (groups) {
        groups = groups || this.state.groups;
        var groupCount = groups ? groups.length : 1;
        if (this._list.current) {
            this._list.current.forceUpdate();
            for (var i = 0; i < groupCount; i++) {
                var group = this._list.current.refs['group_' + String(i)];
                if (group) {
                    group.forceListUpdate();
                }
            }
        }
        else {
            var group = this.refs['group_' + String(0)];
            if (group) {
                group.forceListUpdate();
            }
        }
    };
    GroupedListBase.prototype._computeIsSomeGroupExpanded = function (groups) {
        var _this = this;
        return !!(groups && groups.some(function (group) { return (group.children ? _this._computeIsSomeGroupExpanded(group.children) : !group.isCollapsed); }));
    };
    GroupedListBase.prototype._updateIsSomeGroupExpanded = function () {
        var groups = this.state.groups;
        var onGroupExpandStateChanged = this.props.onGroupExpandStateChanged;
        var newIsSomeGroupExpanded = this._computeIsSomeGroupExpanded(groups);
        if (this._isSomeGroupExpanded !== newIsSomeGroupExpanded) {
            if (onGroupExpandStateChanged) {
                onGroupExpandStateChanged(newIsSomeGroupExpanded);
            }
            this._isSomeGroupExpanded = newIsSomeGroupExpanded;
        }
    };
    GroupedListBase.defaultProps = {
        selectionMode: _utilities_selection_index__WEBPACK_IMPORTED_MODULE_5__["SelectionMode"].multiple,
        isHeaderVisible: true,
        groupProps: {},
        compact: false
    };
    return GroupedListBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=GroupedList.base.js.map

/***/ }),

/***/ "ZfFA":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupHeader.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupHeaderBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupHeaderBase", function() { return GroupHeaderBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities_selection_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/selection/index */ "08hr");
/* harmony import */ var _Check__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Check */ "idBX");
/* harmony import */ var _Check__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Check__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Icon */ "UfSG");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _GroupSpacer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GroupSpacer */ "pYG9");
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Spinner */ "0lYJ");
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Spinner__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../FocusZone */ "su0C");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_FocusZone__WEBPACK_IMPORTED_MODULE_8__);









var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var GroupHeaderBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GroupHeaderBase, _super);
    function GroupHeaderBase(props) {
        var _this = _super.call(this, props) || this;
        _this._onToggleCollapse = function (ev) {
            var _a = _this.props, group = _a.group, onToggleCollapse = _a.onToggleCollapse, isGroupLoading = _a.isGroupLoading;
            var isCollapsed = _this.state.isCollapsed;
            var newCollapsed = !isCollapsed;
            var newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);
            _this.setState({
                isCollapsed: newCollapsed,
                isLoadingVisible: newLoadingVisible
            });
            if (onToggleCollapse) {
                onToggleCollapse(group);
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        _this._onToggleSelectGroupClick = function (ev) {
            var _a = _this.props, onToggleSelectGroup = _a.onToggleSelectGroup, group = _a.group;
            if (onToggleSelectGroup) {
                onToggleSelectGroup(group);
            }
            ev.preventDefault();
            ev.stopPropagation();
        };
        _this._onHeaderClick = function () {
            var _a = _this.props, group = _a.group, onGroupHeaderClick = _a.onGroupHeaderClick, onToggleSelectGroup = _a.onToggleSelectGroup;
            if (onGroupHeaderClick) {
                onGroupHeaderClick(group);
            }
            else if (onToggleSelectGroup) {
                onToggleSelectGroup(group);
            }
        };
        _this._onRenderTitle = function (props) {
            var group = props.group;
            if (!group) {
                return null;
            }
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _this._classNames.title },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, group.name),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: _this._classNames.headerCount },
                    "(",
                    group.count,
                    group.hasMoreData && '+',
                    ")")));
        };
        _this.state = {
            isCollapsed: (_this.props.group && _this.props.group.isCollapsed),
            isLoadingVisible: false
        };
        return _this;
    }
    // tslint:disable-next-line function-name
    GroupHeaderBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        if (newProps.group) {
            var newCollapsed = newProps.group.isCollapsed;
            var isGroupLoading = newProps.isGroupLoading;
            var newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);
            this.setState({
                isCollapsed: newCollapsed || false,
                isLoadingVisible: newLoadingVisible || false
            });
        }
    };
    GroupHeaderBase.prototype.render = function () {
        var _a = this.props, group = _a.group, groupLevel = _a.groupLevel, viewport = _a.viewport, selectionMode = _a.selectionMode, loadingText = _a.loadingText, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b, _c = _a.selected, selected = _c === void 0 ? false : _c, indentWidth = _a.indentWidth, _d = _a.onRenderTitle, onRenderTitle = _d === void 0 ? this._onRenderTitle : _d, _e = _a.isCollapsedGroupSelectVisible, isCollapsedGroupSelectVisible = _e === void 0 ? true : _e, expandButtonProps = _a.expandButtonProps, selectAllButtonProps = _a.selectAllButtonProps, theme = _a.theme, styles = _a.styles, className = _a.className, groupedListId = _a.groupedListId, compact = _a.compact;
        var _f = this.state, isCollapsed = _f.isCollapsed, isLoadingVisible = _f.isLoadingVisible;
        var canSelectGroup = selectionMode === _utilities_selection_index__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].multiple;
        var isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
        var currentlySelected = isSelected || selected;
        var isRTL = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getRTL"])();
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            selected: currentlySelected,
            isCollapsed: isCollapsed,
            compact: compact
        });
        if (!group) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.root, style: viewport ? { minWidth: viewport.width } : {}, onClick: this._onHeaderClick, "aria-label": group.ariaLabel || group.name, "data-is-focusable": true },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusZone__WEBPACK_IMPORTED_MODULE_8__["FocusZone"], { className: this._classNames.groupHeaderContainer, direction: _FocusZone__WEBPACK_IMPORTED_MODULE_8__["FocusZoneDirection"].horizontal },
                isSelectionCheckVisible ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ type: "button", className: this._classNames.check, role: "checkbox", "aria-checked": currentlySelected, "data-selection-toggle": true, onClick: this._onToggleSelectGroupClick }, selectAllButtonProps),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Check__WEBPACK_IMPORTED_MODULE_4__["Check"], { checked: currentlySelected }))) : (selectionMode !== _utilities_selection_index__WEBPACK_IMPORTED_MODULE_3__["SelectionMode"].none && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupSpacer__WEBPACK_IMPORTED_MODULE_6__["GroupSpacer"], { indentWidth: indentWidth, count: 1 })),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_GroupSpacer__WEBPACK_IMPORTED_MODULE_6__["GroupSpacer"], { indentWidth: indentWidth, count: groupLevel }),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.dropIcon },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_5__["Icon"], { iconName: "Tag" })),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ type: "button", className: this._classNames.expand, onClick: this._onToggleCollapse, "aria-expanded": group ? !group.isCollapsed : undefined, "aria-controls": group && !group.isCollapsed ? groupedListId : undefined }, expandButtonProps),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_5__["Icon"], { className: this._classNames.expandIsCollapsed, iconName: isRTL ? 'ChevronLeftMed' : 'ChevronRightMed' })),
                onRenderTitle(this.props, this._onRenderTitle),
                isLoadingVisible && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Spinner__WEBPACK_IMPORTED_MODULE_7__["Spinner"], { label: loadingText }))));
    };
    GroupHeaderBase.defaultProps = {
        expandButtonProps: { 'aria-label': 'expand collapse group' }
    };
    return GroupHeaderBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=GroupHeader.base.js.map

/***/ }),

/***/ "ZrMC":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/keytips/KeytipConstants.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: KTP_PREFIX, KTP_SEPARATOR, KTP_FULL_PREFIX, DATAKTP_TARGET, DATAKTP_EXECUTE_TARGET, KTP_LAYER_ID, KTP_ARIA_SEPARATOR, KeytipEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KTP_PREFIX", function() { return KTP_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KTP_SEPARATOR", function() { return KTP_SEPARATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KTP_FULL_PREFIX", function() { return KTP_FULL_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATAKTP_TARGET", function() { return DATAKTP_TARGET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATAKTP_EXECUTE_TARGET", function() { return DATAKTP_EXECUTE_TARGET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KTP_LAYER_ID", function() { return KTP_LAYER_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KTP_ARIA_SEPARATOR", function() { return KTP_ARIA_SEPARATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeytipEvents", function() { return KeytipEvents; });
var KTP_PREFIX = 'ktp';
var KTP_SEPARATOR = '-';
var KTP_FULL_PREFIX = KTP_PREFIX + KTP_SEPARATOR;
var DATAKTP_TARGET = 'data-ktp-target';
var DATAKTP_EXECUTE_TARGET = 'data-ktp-execute-target';
var KTP_LAYER_ID = 'ktp-layer-id';
var KTP_ARIA_SEPARATOR = ', ';
// Events
var KeytipEvents;
(function (KeytipEvents) {
    KeytipEvents.KEYTIP_ADDED = 'keytipAdded';
    KeytipEvents.KEYTIP_REMOVED = 'keytipRemoved';
    KeytipEvents.KEYTIP_UPDATED = 'keytipUpdated';
    KeytipEvents.PERSISTED_KEYTIP_ADDED = 'persistedKeytipAdded';
    KeytipEvents.PERSISTED_KEYTIP_REMOVED = 'persistedKeytipRemoved';
    KeytipEvents.PERSISTED_KEYTIP_EXECUTE = 'persistedKeytipExecute';
    KeytipEvents.ENTER_KEYTIP_MODE = 'enterKeytipMode';
    KeytipEvents.EXIT_KEYTIP_MODE = 'exitKeytipMode';
})(KeytipEvents || (KeytipEvents = {}));
//# sourceMappingURL=KeytipConstants.js.map

/***/ }),

/***/ "bIii":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupFooter.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-groupFooter'
};
var getStyles = function (props) {
    var theme = props.theme, className = props.className;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            theme.fonts.medium,
            classNames.root,
            {
                position: 'relative',
                padding: '5px 38px'
            },
            className
        ]
    };
};
//# sourceMappingURL=GroupFooter.styles.js.map

/***/ }),

/***/ "fa50":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Check/Check.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: CheckGlobalClassNames, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckGlobalClassNames", function() { return CheckGlobalClassNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);


var CheckGlobalClassNames = {
    root: 'ms-Check',
    circle: 'ms-Check-circle',
    check: 'ms-Check-check',
    /** Must be manually applied to the parent element of the check. */
    checkHost: 'ms-Check-checkHost'
};
var getStyles = function (props) {
    var _a, _b, _c, _d, _e;
    var _f = props.height, height = _f === void 0 ? props.checkBoxHeight || '18px' : _f, checked = props.checked, className = props.className, theme = props.theme;
    var palette = theme.palette, semanticColors = theme.semanticColors, fonts = theme.fonts;
    var isRTL = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["getRTL"])();
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(CheckGlobalClassNames, theme);
    var sharedCircleCheck = {
        fontSize: height,
        position: 'absolute',
        left: 0,
        top: 0,
        width: height,
        height: height,
        textAlign: 'center',
        verticalAlign: 'middle'
    };
    return {
        root: [
            classNames.root,
            fonts.medium,
            {
                // lineHeight currently needs to be a string to output without 'px'
                lineHeight: '1',
                width: height,
                height: height,
                verticalAlign: 'top',
                position: 'relative',
                userSelect: 'none',
                selectors: (_a = {
                        ':before': {
                            content: '""',
                            position: 'absolute',
                            top: '1px',
                            right: '1px',
                            bottom: '1px',
                            left: '1px',
                            borderRadius: '50%',
                            opacity: 1,
                            background: semanticColors.bodyBackground
                        }
                    },
                    _a["." + classNames.checkHost + ":hover &, ." + classNames.checkHost + ":focus &, &:hover, &:focus"] = {
                        opacity: 1
                    },
                    _a)
            },
            checked && [
                'is-checked',
                {
                    selectors: {
                        ':before': {
                            background: palette.themePrimary,
                            opacity: 1,
                            selectors: (_b = {},
                                _b[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                                    background: 'Window'
                                },
                                _b)
                        }
                    }
                }
            ],
            className
        ],
        circle: [
            classNames.circle,
            sharedCircleCheck,
            {
                color: palette.neutralSecondary,
                selectors: (_c = {},
                    _c[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        color: 'WindowText'
                    },
                    _c)
            },
            checked && {
                color: palette.white
            }
        ],
        check: [
            classNames.check,
            sharedCircleCheck,
            {
                opacity: 0,
                color: palette.neutralSecondary,
                fontSize: _Styling__WEBPACK_IMPORTED_MODULE_0__["IconFontSizes"].medium,
                left: isRTL ? '-0.5px' : '.5px',
                selectors: (_d = {
                        ':hover': {
                            opacity: 1
                        }
                    },
                    _d[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        MsHighContrastAdjust: 'none'
                    },
                    _d)
            },
            checked && {
                opacity: 1,
                color: palette.white,
                fontWeight: 900,
                selectors: (_e = {},
                    _e[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                        border: 'none',
                        color: 'WindowText'
                    },
                    _e)
            }
        ],
        checkHost: classNames.checkHost
    };
};
//# sourceMappingURL=Check.styles.js.map

/***/ }),

/***/ "fcBF":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/Modal.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: animationDuration, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationDuration", function() { return animationDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var animationDuration = _Styling__WEBPACK_IMPORTED_MODULE_0__["AnimationVariables"].durationValue2;
var globalClassNames = {
    root: 'ms-Modal',
    main: 'ms-Dialog-main',
    scrollableContent: 'ms-Modal-scrollableContent',
    isOpen: 'is-open',
    layer: 'ms-Modal-Layer'
};
var getStyles = function (props) {
    var _a;
    var className = props.className, containerClassName = props.containerClassName, scrollableContentClassName = props.scrollableContentClassName, isOpen = props.isOpen, isVisible = props.isVisible, hasBeenOpened = props.hasBeenOpened, modalRectangleTop = props.modalRectangleTop, theme = props.theme, topOffsetFixed = props.topOffsetFixed, isModeless = props.isModeless, layerClassName = props.layerClassName, isDefaultDragHandle = props.isDefaultDragHandle;
    var palette = theme.palette, effects = theme.effects, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(globalClassNames, theme);
    return {
        root: [
            classNames.root,
            fonts.medium,
            {
                backgroundColor: 'transparent',
                position: isModeless ? 'absolute' : 'fixed',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                pointerEvents: 'none',
                transition: "opacity " + animationDuration
            },
            topOffsetFixed &&
                hasBeenOpened && {
                alignItems: 'flex-start'
            },
            isOpen && classNames.isOpen,
            isVisible && {
                opacity: 1,
                pointerEvents: 'auto'
            },
            className
        ],
        main: [
            classNames.main,
            {
                boxShadow: effects.elevation64,
                borderRadius: effects.roundedCorner2,
                backgroundColor: palette.white,
                boxSizing: 'border-box',
                position: 'relative',
                textAlign: 'left',
                outline: '3px solid transparent',
                maxHeight: '100%',
                overflowY: 'auto',
                zIndex: isModeless ? _Styling__WEBPACK_IMPORTED_MODULE_0__["ZIndexes"].Layer : undefined
            },
            topOffsetFixed &&
                hasBeenOpened && {
                top: modalRectangleTop
            },
            isDefaultDragHandle && {
                cursor: 'move'
            },
            containerClassName
        ],
        scrollableContent: [
            classNames.scrollableContent,
            {
                overflowY: 'auto',
                flexGrow: 1,
                maxHeight: '100vh',
                selectors: (_a = {},
                    _a['@supports (-webkit-overflow-scrolling: touch)'] = {
                        maxHeight: window.innerHeight
                    },
                    _a)
            },
            scrollableContentClassName
        ],
        layer: isModeless && [
            layerClassName,
            classNames.layer,
            {
                position: 'static',
                width: 'unset',
                height: 'unset'
            }
        ],
        keyboardMoveIconContainer: {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '3px 0px'
        },
        keyboardMoveIcon: {
            fontSize: fonts.xLargePlus.fontSize,
            width: '24px'
        }
    };
};
//# sourceMappingURL=Modal.styles.js.map

/***/ }),

/***/ "gcLL":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/dragdrop/index.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: DragDropHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DragDropHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragDropHelper */ "pPEq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DragDropHelper", function() { return _DragDropHelper__WEBPACK_IMPORTED_MODULE_0__["DragDropHelper"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "glo3":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/index.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: Dialog, DialogBase, DialogContent, DialogContentBase, DialogFooter, DialogFooterBase, ResponsiveMode, DialogType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog */ "OfIR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dialog", function() { return _Dialog__WEBPACK_IMPORTED_MODULE_0__["Dialog"]; });

/* harmony import */ var _Dialog_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dialog.base */ "15YF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogBase", function() { return _Dialog_base__WEBPACK_IMPORTED_MODULE_1__["DialogBase"]; });

/* harmony import */ var _DialogContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DialogContent */ "Nio4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogContent", function() { return _DialogContent__WEBPACK_IMPORTED_MODULE_2__["DialogContent"]; });

/* harmony import */ var _DialogContent_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DialogContent.base */ "CNvk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogContentBase", function() { return _DialogContent_base__WEBPACK_IMPORTED_MODULE_3__["DialogContentBase"]; });

/* harmony import */ var _DialogFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DialogFooter */ "T/ax");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogFooter", function() { return _DialogFooter__WEBPACK_IMPORTED_MODULE_4__["DialogFooter"]; });

/* harmony import */ var _DialogFooter_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DialogFooter.base */ "ugPr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogFooterBase", function() { return _DialogFooter_base__WEBPACK_IMPORTED_MODULE_5__["DialogFooterBase"]; });

/* harmony import */ var _DialogContent_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DialogContent.types */ "F+OE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveMode", function() { return _DialogContent_types__WEBPACK_IMPORTED_MODULE_6__["ResponsiveMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DialogType", function() { return _DialogContent_types__WEBPACK_IMPORTED_MODULE_6__["DialogType"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "gnxS":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Link.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Link.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "gtpV":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupFooter.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupFooter", function() { return GroupFooter; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GroupFooter_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupFooter.styles */ "bIii");
/* harmony import */ var _GroupFooter_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupFooter.base */ "swnX");



var GroupFooter = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_GroupFooter_base__WEBPACK_IMPORTED_MODULE_2__["GroupFooterBase"], _GroupFooter_styles__WEBPACK_IMPORTED_MODULE_1__["getStyles"], undefined, {
    scope: 'GroupFooter'
});
//# sourceMappingURL=GroupFooter.js.map

/***/ }),

/***/ "hjiq":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/DetailsList.js ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRowGlobalClassNames, SELECTION_CHANGE, SelectionDirection, SelectionMode, CollapseAllVisibility, DetailsHeader, DetailsHeaderBase, SelectAllVisibility, DetailsList, DetailsListBase, buildColumns, ColumnActionsMode, ConstrainMode, ColumnDragEndLocation, DetailsListLayoutMode, CheckboxVisibility, DetailsRow, DetailsRowBase, DetailsRowCheck, DetailsRowFields, DetailsColumnBase, Selection, SelectionZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/DetailsList/index */ "mTZH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowGlobalClassNames", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsRowGlobalClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SELECTION_CHANGE", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["SELECTION_CHANGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionDirection", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["SelectionDirection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionMode", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["SelectionMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseAllVisibility", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["CollapseAllVisibility"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsHeader", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsHeaderBase", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsHeaderBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectAllVisibility", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["SelectAllVisibility"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsList", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsListBase", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsListBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildColumns", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["buildColumns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnActionsMode", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["ColumnActionsMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConstrainMode", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["ConstrainMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnDragEndLocation", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["ColumnDragEndLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsListLayoutMode", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsListLayoutMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxVisibility", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["CheckboxVisibility"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRow", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsRow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowBase", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsRowBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowCheck", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsRowCheck"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowFields", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsRowFields"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsColumnBase", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["DetailsColumnBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["Selection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionZone", function() { return _components_DetailsList_index__WEBPACK_IMPORTED_MODULE_0__["SelectionZone"]; });


//# sourceMappingURL=DetailsList.js.map

/***/ }),

/***/ "hsoO":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/index.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: CollapseAllVisibility, GroupSpacer, GroupedList, GroupedListBase, GroupHeader, GroupFooter, GroupShowAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroupedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupedList */ "NBM3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedList", function() { return _GroupedList__WEBPACK_IMPORTED_MODULE_0__["GroupedList"]; });

/* harmony import */ var _GroupedList_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupedList.base */ "ZCB3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedListBase", function() { return _GroupedList_base__WEBPACK_IMPORTED_MODULE_1__["GroupedListBase"]; });

/* harmony import */ var _GroupedList_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupedList.types */ "/4V3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseAllVisibility", function() { return _GroupedList_types__WEBPACK_IMPORTED_MODULE_2__["CollapseAllVisibility"]; });

/* harmony import */ var _GroupHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GroupHeader */ "ogtB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupHeader", function() { return _GroupHeader__WEBPACK_IMPORTED_MODULE_3__["GroupHeader"]; });

/* harmony import */ var _GroupFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GroupFooter */ "gtpV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupFooter", function() { return _GroupFooter__WEBPACK_IMPORTED_MODULE_4__["GroupFooter"]; });

/* harmony import */ var _GroupShowAll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GroupShowAll */ "Gw8o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupShowAll", function() { return _GroupShowAll__WEBPACK_IMPORTED_MODULE_5__["GroupShowAll"]; });

/* harmony import */ var _GroupSpacer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GroupSpacer */ "pYG9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupSpacer", function() { return _GroupSpacer__WEBPACK_IMPORTED_MODULE_6__["GroupSpacer"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "idBX":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Check.js ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Check.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_Check;

/***/ }),

/***/ "igDL":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsHeader.js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsHeader", function() { return DetailsHeader; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DetailsHeader_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailsHeader.base */ "Afyl");
/* harmony import */ var _DetailsHeader_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsHeader.styles */ "SmFy");



var DetailsHeader = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DetailsHeader_base__WEBPACK_IMPORTED_MODULE_1__["DetailsHeaderBase"], _DetailsHeader_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'DetailsHeader' });
//# sourceMappingURL=DetailsHeader.js.map

/***/ }),

/***/ "iiRv":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Checkbox/Checkbox.base.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: CheckboxBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxBase", function() { return CheckboxBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Icon */ "UfSG");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _KeytipData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../KeytipData */ "71+j");





var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var CheckboxBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CheckboxBase, _super);
    /**
     * Initialize a new instance of the Checkbox
     * @param props - Props for the component
     * @param context - Context or initial state for the base component.
     */
    function CheckboxBase(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._checkBox = react__WEBPACK_IMPORTED_MODULE_1__["createRef"]();
        _this._onFocus = function (ev) {
            var inputProps = _this.props.inputProps;
            if (inputProps && inputProps.onFocus) {
                inputProps.onFocus(ev);
            }
        };
        _this._onBlur = function (ev) {
            var inputProps = _this.props.inputProps;
            if (inputProps && inputProps.onBlur) {
                inputProps.onBlur(ev);
            }
        };
        _this._onChange = function (ev) {
            var onChange = _this.props.onChange;
            var _a = _this.state, isChecked = _a.isChecked, isIndeterminate = _a.isIndeterminate;
            if (!isIndeterminate) {
                if (onChange) {
                    onChange(ev, !isChecked);
                }
                if (_this.props.checked === undefined) {
                    _this.setState({ isChecked: !isChecked });
                }
            }
            else {
                // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
                // controlled, lets the consumer know to change it by calling onChange). It doesn't
                // change the checked state.
                if (onChange) {
                    onChange(ev, isChecked);
                }
                if (_this.props.indeterminate === undefined) {
                    _this.setState({ isIndeterminate: false });
                }
            }
        };
        _this._onRenderLabel = function (props) {
            var label = props.label;
            return label ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { "aria-hidden": "true", className: _this._classNames.text }, label)) : null;
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeComponentRef"])(_this);
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["warnMutuallyExclusive"])('Checkbox', props, {
                checked: 'defaultChecked',
                indeterminate: 'defaultIndeterminate'
            });
        }
        _this._id = _this.props.id || Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('checkbox-');
        _this.state = {
            isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked),
            isIndeterminate: !!(props.indeterminate !== undefined ? props.indeterminate : props.defaultIndeterminate)
        };
        Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["initializeFocusRects"])();
        return _this;
    }
    CheckboxBase.getDerivedStateFromProps = function (nextProps, prevState) {
        var stateUpdate = {};
        if (nextProps.indeterminate !== undefined) {
            stateUpdate.isIndeterminate = !!nextProps.indeterminate;
        }
        if (nextProps.checked !== undefined) {
            stateUpdate.isChecked = !!nextProps.checked;
        }
        return Object.keys(stateUpdate).length ? stateUpdate : null;
    };
    /**
     * Render the Checkbox based on passed props
     */
    CheckboxBase.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, disabled = _a.disabled, inputProps = _a.inputProps, name = _a.name, boxSide = _a.boxSide, theme = _a.theme, ariaLabel = _a.ariaLabel, ariaLabelledBy = _a.ariaLabelledBy, ariaDescribedBy = _a.ariaDescribedBy, styles = _a.styles, _b = _a.onRenderLabel, onRenderLabel = _b === void 0 ? this._onRenderLabel : _b, checkmarkIconProps = _a.checkmarkIconProps, ariaPositionInSet = _a.ariaPositionInSet, ariaSetSize = _a.ariaSetSize, keytipProps = _a.keytipProps, title = _a.title, label = _a.label;
        var _c = this.state, isChecked = _c.isChecked, isIndeterminate = _c.isIndeterminate;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className,
            disabled: disabled,
            indeterminate: isIndeterminate,
            checked: isChecked,
            reversed: boxSide !== 'start',
            isUsingCustomLabelRender: onRenderLabel !== this._onRenderLabel
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_KeytipData__WEBPACK_IMPORTED_MODULE_4__["KeytipData"], { keytipProps: keytipProps, disabled: disabled }, function (keytipAttributes) { return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _this._classNames.root, title: title },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ type: "checkbox" }, inputProps, { "data-ktp-execute-target": keytipAttributes['data-ktp-execute-target'], checked: isChecked, disabled: disabled, className: _this._classNames.input, ref: _this._checkBox, name: name, id: _this._id, title: title, onChange: _this._onChange, onFocus: _this._onFocus, onBlur: _this._onBlur, "aria-disabled": disabled, "aria-label": ariaLabel || label, "aria-labelledby": ariaLabelledBy, "aria-describedby": Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["mergeAriaAttributeValues"])(ariaDescribedBy, keytipAttributes['aria-describedby']), "aria-posinset": ariaPositionInSet, "aria-setsize": ariaSetSize, "aria-checked": isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false' })),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { className: _this._classNames.label, htmlFor: _this._id },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _this._classNames.checkbox, "data-ktp-target": keytipAttributes['data-ktp-target'] },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Icon__WEBPACK_IMPORTED_MODULE_3__["Icon"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ iconName: "CheckMark" }, checkmarkIconProps, { className: _this._classNames.checkmark }))),
                onRenderLabel(_this.props, _this._onRenderLabel)))); }));
    };
    Object.defineProperty(CheckboxBase.prototype, "indeterminate", {
        get: function () {
            return !!this.state.isIndeterminate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxBase.prototype, "checked", {
        get: function () {
            return !!this.state.isChecked;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxBase.prototype.focus = function () {
        if (this._checkBox.current) {
            this._checkBox.current.focus();
        }
    };
    CheckboxBase.defaultProps = {
        boxSide: 'start'
    };
    return CheckboxBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=Checkbox.base.js.map

/***/ }),

/***/ "j+hm":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/KeytipData/index.js ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: KeytipData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _KeytipData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeytipData */ "7ljj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeytipData", function() { return _KeytipData__WEBPACK_IMPORTED_MODULE_0__["KeytipData"]; });


//# sourceMappingURL=index.js.map

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

/***/ "j6dK":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupShowAll.styles.js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    root: 'ms-GroupShowAll',
    link: 'ms-Link'
};
var getStyles = function (props) {
    var _a;
    var theme = props.theme;
    var fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            {
                position: 'relative',
                padding: '10px 84px',
                cursor: 'pointer',
                selectors: (_a = {},
                    _a["." + classNames.link] = {
                        fontSize: fonts.small.fontSize
                    },
                    _a)
            }
        ]
    };
};
//# sourceMappingURL=GroupShowAll.styles.js.map

/***/ }),

/***/ "jN8F":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Fabric.js ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Fabric.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "jiHw":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/utilities/decorators/withResponsiveMode.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_withResponsiveMode;

/***/ }),

/***/ "l0yo":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Checkbox/Checkbox.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: Checkbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Checkbox_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox.base */ "iiRv");
/* harmony import */ var _Checkbox_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Checkbox.styles */ "E29L");



var Checkbox = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Checkbox_base__WEBPACK_IMPORTED_MODULE_1__["CheckboxBase"], _Checkbox_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'Checkbox' });
//# sourceMappingURL=Checkbox.js.map

/***/ }),

/***/ "lQgf":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/selection/interfaces.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: SELECTION_CHANGE, SelectionDirection, SelectionMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @uifabric/utilities */ "+4t+");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SELECTION_CHANGE", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__["SELECTION_CHANGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionDirection", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__["SelectionDirection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionMode", function() { return _uifabric_utilities__WEBPACK_IMPORTED_MODULE_0__["SelectionMode"]; });


//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ "ljk+":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsList.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsList", function() { return DetailsList; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DetailsList_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailsList.base */ "HpzJ");
/* harmony import */ var _DetailsList_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsList.styles */ "RxPz");



var DetailsList = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_DetailsList_base__WEBPACK_IMPORTED_MODULE_1__["DetailsListBase"], _DetailsList_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'DetailsList'
});
//# sourceMappingURL=DetailsList.js.map

/***/ }),

/***/ "mRDm":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/LayerHost.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return LayerHost; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Layer_notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Layer.notification */ "nACv");




var LayerHost = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LayerHost, _super);
    function LayerHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerHost.prototype.shouldComponentUpdate = function () {
        return false;
    };
    LayerHost.prototype.componentDidMount = function () {
        Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_3__["notifyHostChanged"])(this.props.id);
    };
    LayerHost.prototype.componentWillUnmount = function () {
        Object(_Layer_notification__WEBPACK_IMPORTED_MODULE_3__["notifyHostChanged"])(this.props.id);
    };
    LayerHost.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])('ms-LayerHost', this.props.className) }));
    };
    return LayerHost;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=LayerHost.js.map

/***/ }),

/***/ "mTZH":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/index.js ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: DetailsRowGlobalClassNames, SELECTION_CHANGE, SelectionDirection, SelectionMode, CollapseAllVisibility, DetailsHeader, DetailsHeaderBase, SelectAllVisibility, DetailsList, DetailsListBase, buildColumns, ColumnActionsMode, ConstrainMode, ColumnDragEndLocation, DetailsListLayoutMode, CheckboxVisibility, DetailsRow, DetailsRowBase, DetailsRowCheck, DetailsRowFields, DetailsColumnBase, Selection, SelectionZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selection_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/selection/index */ "08hr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SELECTION_CHANGE", function() { return _utilities_selection_index__WEBPACK_IMPORTED_MODULE_0__["SELECTION_CHANGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionDirection", function() { return _utilities_selection_index__WEBPACK_IMPORTED_MODULE_0__["SelectionDirection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionMode", function() { return _utilities_selection_index__WEBPACK_IMPORTED_MODULE_0__["SelectionMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return _utilities_selection_index__WEBPACK_IMPORTED_MODULE_0__["Selection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionZone", function() { return _utilities_selection_index__WEBPACK_IMPORTED_MODULE_0__["SelectionZone"]; });

/* harmony import */ var _GroupedList_GroupedList_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GroupedList/GroupedList.types */ "/4V3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseAllVisibility", function() { return _GroupedList_GroupedList_types__WEBPACK_IMPORTED_MODULE_1__["CollapseAllVisibility"]; });

/* harmony import */ var _DetailsHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsHeader */ "igDL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsHeader", function() { return _DetailsHeader__WEBPACK_IMPORTED_MODULE_2__["DetailsHeader"]; });

/* harmony import */ var _DetailsHeader_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DetailsHeader.base */ "Afyl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsHeaderBase", function() { return _DetailsHeader_base__WEBPACK_IMPORTED_MODULE_3__["DetailsHeaderBase"]; });

/* harmony import */ var _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DetailsHeader.types */ "pkCn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectAllVisibility", function() { return _DetailsHeader_types__WEBPACK_IMPORTED_MODULE_4__["SelectAllVisibility"]; });

/* harmony import */ var _DetailsList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DetailsList */ "ljk+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsList", function() { return _DetailsList__WEBPACK_IMPORTED_MODULE_5__["DetailsList"]; });

/* harmony import */ var _DetailsList_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DetailsList.base */ "HpzJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsListBase", function() { return _DetailsList_base__WEBPACK_IMPORTED_MODULE_6__["DetailsListBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildColumns", function() { return _DetailsList_base__WEBPACK_IMPORTED_MODULE_6__["buildColumns"]; });

/* harmony import */ var _DetailsList_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DetailsList.types */ "G1YK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnActionsMode", function() { return _DetailsList_types__WEBPACK_IMPORTED_MODULE_7__["ColumnActionsMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConstrainMode", function() { return _DetailsList_types__WEBPACK_IMPORTED_MODULE_7__["ConstrainMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColumnDragEndLocation", function() { return _DetailsList_types__WEBPACK_IMPORTED_MODULE_7__["ColumnDragEndLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsListLayoutMode", function() { return _DetailsList_types__WEBPACK_IMPORTED_MODULE_7__["DetailsListLayoutMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxVisibility", function() { return _DetailsList_types__WEBPACK_IMPORTED_MODULE_7__["CheckboxVisibility"]; });

/* harmony import */ var _DetailsRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DetailsRow */ "VUIz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRow", function() { return _DetailsRow__WEBPACK_IMPORTED_MODULE_8__["DetailsRow"]; });

/* harmony import */ var _DetailsRow_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DetailsRow.base */ "PN6n");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowBase", function() { return _DetailsRow_base__WEBPACK_IMPORTED_MODULE_9__["DetailsRowBase"]; });

/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowGlobalClassNames", function() { return _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_10__["DetailsRowGlobalClassNames"]; });

/* harmony import */ var _DetailsRowCheck__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DetailsRowCheck */ "CpaK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowCheck", function() { return _DetailsRowCheck__WEBPACK_IMPORTED_MODULE_11__["DetailsRowCheck"]; });

/* harmony import */ var _DetailsRowFields__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DetailsRowFields */ "QWZp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsRowFields", function() { return _DetailsRowFields__WEBPACK_IMPORTED_MODULE_12__["DetailsRowFields"]; });

/* harmony import */ var _DetailsColumn_base__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DetailsColumn.base */ "Gwvx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DetailsColumnBase", function() { return _DetailsColumn_base__WEBPACK_IMPORTED_MODULE_13__["DetailsColumnBase"]; });















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "n8DK":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Icon/index.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/components/Icon/index.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_IconIndex;

/***/ }),

/***/ "nACv":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/Layer.notification.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: registerLayer, unregisterLayer, notifyHostChanged, setDefaultTarget, getDefaultTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerLayer", function() { return registerLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregisterLayer", function() { return unregisterLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifyHostChanged", function() { return notifyHostChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultTarget", function() { return setDefaultTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultTarget", function() { return getDefaultTarget; });
var _layersByHostId = {};
var _defaultHostSelector;
/**
 * Register a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
function registerLayer(hostId, callback) {
    if (!_layersByHostId[hostId]) {
        _layersByHostId[hostId] = [];
    }
    _layersByHostId[hostId].push(callback);
}
/**
 * Unregister a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
function unregisterLayer(hostId, callback) {
    if (_layersByHostId[hostId]) {
        var idx = _layersByHostId[hostId].indexOf(callback);
        if (idx >= 0) {
            _layersByHostId[hostId].splice(idx, 1);
            if (_layersByHostId[hostId].length === 0) {
                delete _layersByHostId[hostId];
            }
        }
    }
}
/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */
function notifyHostChanged(id) {
    if (_layersByHostId[id]) {
        _layersByHostId[id].forEach(function (callback) { return callback(); });
    }
}
/**
 * Sets the default target selector to use when determining the host in which
 * Layered content will be injected into. If not provided, an element will be
 * created at the end of the document body.
 *
 * Passing in a falsey value will clear the default target and reset back to
 * using a created element at the end of document body.
 */
function setDefaultTarget(selector) {
    _defaultHostSelector = selector;
}
/**
 * Get the default target selector when determining a host
 */
function getDefaultTarget() {
    return _defaultHostSelector;
}
//# sourceMappingURL=Layer.notification.js.map

/***/ }),

/***/ "nDaQ":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/DraggableZone/DraggableZone.js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DraggableZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DraggableZone", function() { return DraggableZone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DraggableZone_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DraggableZone.styles */ "rp3K");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);




var eventMapping = {
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        stop: 'touchend'
    },
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        stop: 'mouseup'
    }
};
var DraggableZone = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DraggableZone, _super);
    function DraggableZone(props) {
        var _this = _super.call(this, props) || this;
        _this._currentEventType = eventMapping.mouse;
        _this._events = [];
        _this._onMouseDown = function (event) {
            var onMouseDown = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onMouseDown;
            if (onMouseDown) {
                onMouseDown(event);
            }
            _this._currentEventType = eventMapping.mouse;
            return _this._onDragStart(event);
        };
        _this._onMouseUp = function (event) {
            var onMouseUp = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onMouseUp;
            if (onMouseUp) {
                onMouseUp(event);
            }
            _this._currentEventType = eventMapping.mouse;
            return _this._onDragStop(event);
        };
        _this._onTouchStart = function (event) {
            var onTouchStart = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onTouchStart;
            if (onTouchStart) {
                onTouchStart(event);
            }
            _this._currentEventType = eventMapping.touch;
            return _this._onDragStart(event);
        };
        _this._onTouchEnd = function (event) {
            var onTouchEnd = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(_this.props.children).props.onTouchEnd;
            if (onTouchEnd) {
                onTouchEnd(event);
            }
            _this._currentEventType = eventMapping.touch;
            _this._onDragStop(event);
        };
        _this._onDragStart = function (event) {
            // Only handle left click for dragging
            if (typeof event.button === 'number' && event.button !== 0) {
                return false;
            }
            // If the target doesn't match the handleSelector OR
            // if the target does match the preventDragSelector, bail out
            if ((_this.props.handleSelector && !_this._matchesSelector(event.target, _this.props.handleSelector)) ||
                (_this.props.preventDragSelector && _this._matchesSelector(event.target, _this.props.preventDragSelector))) {
                return;
            }
            // Remember the touch identifier if this is a touch event so we can
            // distinguish between individual touches in multitouch scenarios
            // by remembering which touch point we were given
            _this._touchId = _this._getTouchId(event);
            var position = _this._getControlPosition(event);
            if (position === undefined) {
                return;
            }
            var dragData = _this._createDragDataFromPosition(position);
            _this.props.onStart && _this.props.onStart(event, dragData);
            _this.setState({
                isDragging: true,
                lastPosition: position
            });
            // hook up the appropriate mouse/touch events to the body to ensure
            // smooth dragging
            _this._events = [
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(document.body, _this._currentEventType.move, _this._onDrag),
                Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["on"])(document.body, _this._currentEventType.stop, _this._onDragStop)
            ];
        };
        _this._onDrag = function (event) {
            // Prevent scrolling on mobile devices
            if (event.type === 'touchmove') {
                event.preventDefault();
            }
            var position = _this._getControlPosition(event);
            if (!position) {
                return;
            }
            // create the updated drag data from the position data
            var updatedData = _this._createUpdatedDragData(_this._createDragDataFromPosition(position));
            var updatedPosition = updatedData.position;
            _this.props.onDragChange && _this.props.onDragChange(event, updatedData);
            _this.setState({
                position: updatedPosition,
                lastPosition: position
            });
        };
        _this._onDragStop = function (event) {
            if (!_this.state.isDragging) {
                return;
            }
            var position = _this._getControlPosition(event);
            if (!position) {
                return;
            }
            var baseDragData = _this._createDragDataFromPosition(position);
            // Set dragging to false and reset the lastPosition
            _this.setState({
                isDragging: false,
                lastPosition: undefined
            });
            _this.props.onStop && _this.props.onStop(event, baseDragData);
            if (_this.props.position) {
                _this.setState({
                    position: _this.props.position
                });
            }
            // Remove event handlers
            _this._events.forEach(function (dispose) { return dispose(); });
        };
        _this.state = {
            isDragging: false,
            position: _this.props.position || { x: 0, y: 0 },
            lastPosition: undefined
        };
        return _this;
    }
    DraggableZone.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.position && (!prevProps.position || this.props.position !== prevProps.position)) {
            this.setState({ position: this.props.position });
        }
    };
    DraggableZone.prototype.componentWillUnmount = function () {
        this._events.forEach(function (dispose) { return dispose(); });
    };
    DraggableZone.prototype.render = function () {
        var child = react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(this.props.children);
        var props = child.props;
        var position = this.props.position;
        var _a = this.state, statePosition = _a.position, isDragging = _a.isDragging;
        var x = statePosition.x;
        var y = statePosition.y;
        if (position && !isDragging) {
            x = position.x;
            y = position.y;
        }
        return react__WEBPACK_IMPORTED_MODULE_1__["cloneElement"](child, {
            style: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props.style, { transform: "translate(" + x + "px, " + y + "px)" }),
            className: Object(_DraggableZone_styles__WEBPACK_IMPORTED_MODULE_2__["getClassNames"])(props.className, this.state.isDragging).root,
            onMouseDown: this._onMouseDown,
            onMouseUp: this._onMouseUp,
            onTouchStart: this._onTouchStart,
            onTouchEnd: this._onTouchEnd
        });
    };
    /**
     * Get the control position based off the event that fired
     * @param event - The event to get offsets from
     */
    DraggableZone.prototype._getControlPosition = function (event) {
        var touchObj = this._getActiveTouch(event);
        // did we get the right touch?
        if (this._touchId !== undefined && !touchObj) {
            return undefined;
        }
        var eventToGetOffset = touchObj || event;
        return {
            x: eventToGetOffset.clientX,
            y: eventToGetOffset.clientY
        };
    };
    /**
     * Get the active touch point that we have saved from the event's TouchList
     * @param event - The event used to get the TouchList for the active touch point
     */
    DraggableZone.prototype._getActiveTouch = function (event) {
        return ((event.targetTouches && this._findTouchInTouchList(event.targetTouches)) ||
            (event.changedTouches && this._findTouchInTouchList(event.changedTouches)));
    };
    /**
     * Get the initial touch identifier associated with the given event
     * @param event - The event that contains the TouchList
     */
    DraggableZone.prototype._getTouchId = function (event) {
        var touch = (event.targetTouches && event.targetTouches[0]) || (event.changedTouches && event.changedTouches[0]);
        if (touch) {
            return touch.identifier;
        }
    };
    /**
     * Returns if an element (or any of the element's parents) match the given selector
     */
    DraggableZone.prototype._matchesSelector = function (element, selector) {
        if (!element || element === document.body) {
            return false;
        }
        /* tslint:disable-next-line:no-string-literal */
        var matchesSelectorFn = element.matches || element.webkitMatchesSelector || element.msMatchesSelector /* for IE */;
        if (!matchesSelectorFn) {
            return false;
        }
        return matchesSelectorFn.call(element, selector) || this._matchesSelector(element.parentElement, selector);
    };
    /**
     * Attempts to find the Touch that matches the identifier  we stored in dragStart
     * @param touchList The TouchList to look for the stored identifier from dragStart
     */
    DraggableZone.prototype._findTouchInTouchList = function (touchList) {
        if (this._touchId === undefined) {
            return;
        }
        for (var i = 0; i < touchList.length; i++) {
            if (touchList[i].identifier === this._touchId) {
                return touchList[i];
            }
        }
        return undefined;
    };
    /**
     * Create DragData based off of the last known position and the new position passed in
     * @param position The new position as part of the drag
     */
    DraggableZone.prototype._createDragDataFromPosition = function (position) {
        var lastPosition = this.state.lastPosition;
        // If we have no lastPosition, use the given position
        // for last position
        if (lastPosition === undefined) {
            return {
                delta: { x: 0, y: 0 },
                lastPosition: position,
                position: position
            };
        }
        return {
            delta: {
                x: position.x - lastPosition.x,
                y: position.y - lastPosition.y
            },
            lastPosition: lastPosition,
            position: position
        };
    };
    /**
     * Creates an updated DragData based off the current position and given baseDragData
     * @param baseDragData The base DragData (gotten from _createDragDataFromPosition) used to calculate the updated positions
     */
    DraggableZone.prototype._createUpdatedDragData = function (baseDragData) {
        var position = this.state.position;
        return {
            position: {
                x: position.x + baseDragData.delta.x,
                y: position.y + baseDragData.delta.y
            },
            delta: baseDragData.delta,
            lastPosition: position
        };
    };
    return DraggableZone;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=DraggableZone.js.map

/***/ }),

/***/ "ogtB":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupHeader.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupHeader", function() { return GroupHeader; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GroupHeader_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupHeader.styles */ "V5j+");
/* harmony import */ var _GroupHeader_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupHeader.base */ "ZfFA");



var GroupHeader = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_GroupHeader_base__WEBPACK_IMPORTED_MODULE_2__["GroupHeaderBase"], _GroupHeader_styles__WEBPACK_IMPORTED_MODULE_1__["getStyles"], undefined, {
    scope: 'GroupHeader'
});
//# sourceMappingURL=GroupHeader.js.map

/***/ }),

/***/ "pAdO":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");
/* harmony import */ var _DetailsHeader_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DetailsHeader.styles */ "SmFy");




var GlobalClassNames = {
    isActionable: 'is-actionable',
    cellIsCheck: 'ms-DetailsHeader-cellIsCheck',
    collapseButton: 'ms-DetailsHeader-collapseButton',
    isCollapsed: 'is-collapsed',
    isAllSelected: 'is-allSelected',
    isSelectAllHidden: 'is-selectAllHidden',
    isResizingColumn: 'is-resizingColumn',
    isEmpty: 'is-empty',
    isIconVisible: 'is-icon-visible',
    cellSizer: 'ms-DetailsHeader-cellSizer',
    isResizing: 'is-resizing',
    dropHintCircleStyle: 'ms-DetailsHeader-dropHintCircleStyle',
    dropHintLineStyle: 'ms-DetailsHeader-dropHintLineStyle',
    cellTitle: 'ms-DetailsHeader-cellTitle',
    cellName: 'ms-DetailsHeader-cellName',
    filterChevron: 'ms-DetailsHeader-filterChevron',
    gripperBarVerticalStyle: 'ms-DetailsColumn-gripperBar',
    nearIcon: 'ms-DetailsColumn-nearIcon'
};
var getStyles = function (props) {
    var _a;
    var theme = props.theme, headerClassName = props.headerClassName, iconClassName = props.iconClassName, isActionable = props.isActionable, isEmpty = props.isEmpty, isIconVisible = props.isIconVisible, isPadded = props.isPadded, isIconOnly = props.isIconOnly, _b = props.cellStyleProps, cellStyleProps = _b === void 0 ? _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CELL_STYLE_PROPS"] : _b, transitionDurationDrag = props.transitionDurationDrag, transitionDurationDrop = props.transitionDurationDrop;
    var semanticColors = theme.semanticColors, palette = theme.palette, fonts = theme.fonts;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getGlobalClassNames"])(GlobalClassNames, theme);
    var colors = {
        iconForegroundColor: semanticColors.bodySubtext,
        headerForegroundColor: semanticColors.bodyText,
        headerBackgroundColor: semanticColors.bodyBackground,
        dropdownChevronForegroundColor: palette.neutralTertiary,
        resizerColor: palette.neutralTertiaryAlt
    };
    var nearIconStyle = {
        color: colors.iconForegroundColor,
        opacity: 1,
        paddingLeft: 8
    };
    var borderWhileDragging = {
        outline: "1px solid " + palette.themePrimary
    };
    var borderAfterDragOrDrop = {
        outlineColor: 'transparent'
    };
    return {
        root: [
            Object(_DetailsHeader_styles__WEBPACK_IMPORTED_MODULE_3__["getCellStyles"])(props),
            fonts.small,
            isActionable && [
                classNames.isActionable,
                {
                    selectors: {
                        ':hover': {
                            color: semanticColors.bodyText,
                            background: semanticColors.listHeaderBackgroundHovered
                        },
                        ':active': {
                            background: semanticColors.listHeaderBackgroundPressed
                        }
                    }
                }
            ],
            isEmpty && [
                classNames.isEmpty,
                {
                    textOverflow: 'clip'
                }
            ],
            isIconVisible && classNames.isIconVisible,
            isPadded && {
                paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding
            },
            {
                selectors: {
                    ':hover i[data-icon-name="GripperBarVertical"]': {
                        display: 'block'
                    }
                }
            },
            headerClassName
        ],
        gripperBarVerticalStyle: {
            display: 'none',
            position: 'absolute',
            textAlign: 'left',
            color: palette.neutralTertiary,
            left: 1
        },
        nearIcon: [classNames.nearIcon, nearIconStyle],
        sortIcon: [
            nearIconStyle,
            {
                paddingLeft: 4,
                position: 'relative',
                top: 1
            }
        ],
        iconClassName: [
            {
                color: colors.iconForegroundColor,
                opacity: 1
            },
            iconClassName
        ],
        filterChevron: [
            classNames.filterChevron,
            {
                color: colors.dropdownChevronForegroundColor,
                paddingLeft: 6,
                verticalAlign: 'middle',
                fontSize: fonts.small.fontSize
            }
        ],
        cellTitle: [
            classNames.cellTitle,
            Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme),
            tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch', boxSizing: 'border-box', overflow: 'hidden', padding: "0 " + cellStyleProps.cellRightPadding + "px 0 " + cellStyleProps.cellLeftPadding + "px" }, (isIconOnly
                ? {
                    alignContent: 'flex-end',
                    maxHeight: '100%',
                    flexWrap: 'wrap-reverse'
                }
                : {}))
        ],
        cellName: [
            classNames.cellName,
            {
                flex: '0 1 auto',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: _Styling__WEBPACK_IMPORTED_MODULE_1__["FontWeights"].semibold,
                fontSize: fonts.medium.fontSize
            },
            isIconOnly && {
                selectors: (_a = {},
                    _a["." + classNames.nearIcon] = {
                        paddingLeft: 0
                    },
                    _a)
            }
        ],
        cellTooltip: {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        accessibleLabel: _Styling__WEBPACK_IMPORTED_MODULE_1__["hiddenContentStyle"],
        borderWhileDragging: borderWhileDragging,
        noBorderWhileDragging: [borderAfterDragOrDrop, { transition: "outline " + transitionDurationDrag + "ms ease" }],
        borderAfterDropping: borderWhileDragging,
        noBorderAfterDropping: [borderAfterDragOrDrop, { transition: "outline  " + transitionDurationDrop + "ms ease" }]
    };
};
//# sourceMappingURL=DetailsColumn.styles.js.map

/***/ }),

/***/ "pPEq":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/dragdrop/DragDropHelper.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: DragDropHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragDropHelper", function() { return DragDropHelper; });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);


var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
var DragDropHelper = /** @class */ (function () {
    function DragDropHelper(params) {
        this._selection = params.selection;
        this._dragEnterCounts = {};
        this._activeTargets = {};
        this._lastId = 0;
        // To make this class cheap to create, which allows simplifying some logic elsewhere,
        // only initialize the event group and global event handlers as needed.
        this._initialized = false;
    }
    DragDropHelper.prototype.dispose = function () {
        if (this._events) {
            this._events.dispose();
        }
    };
    DragDropHelper.prototype.subscribe = function (root, events, dragDropOptions) {
        var _this = this;
        if (!this._initialized) {
            this._events = new _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"](this);
            var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["getDocument"])();
            // clear drag data when mouse up, use capture event to ensure it will be run
            if (doc) {
                this._events.on(doc.body, 'mouseup', this._onMouseUp.bind(this), true);
                this._events.on(doc, 'mouseup', this._onDocumentMouseUp.bind(this), true);
            }
            this._initialized = true;
        }
        var _a = dragDropOptions.key, key = _a === void 0 ? "" + ++this._lastId : _a;
        var handlers = [];
        var onDragStart;
        var onDragLeave;
        var onDragEnter;
        var onDragEnd;
        var onDrop;
        var onDragOver;
        var onMouseDown;
        var isDraggable;
        var isDroppable;
        var activeTarget;
        if (dragDropOptions && root) {
            var eventMap = dragDropOptions.eventMap, context = dragDropOptions.context, updateDropState_1 = dragDropOptions.updateDropState;
            var dragDropTarget = {
                root: root,
                options: dragDropOptions,
                key: key
            };
            isDraggable = this._isDraggable(dragDropTarget);
            isDroppable = this._isDroppable(dragDropTarget);
            if (isDraggable || isDroppable) {
                if (eventMap) {
                    for (var _i = 0, eventMap_1 = eventMap; _i < eventMap_1.length; _i++) {
                        var event_1 = eventMap_1[_i];
                        var handler = {
                            callback: event_1.callback.bind(null, context),
                            eventName: event_1.eventName
                        };
                        handlers.push(handler);
                        this._events.on(root, handler.eventName, handler.callback);
                    }
                }
            }
            if (isDroppable) {
                // If the target is droppable, wire up global event listeners to track drop-related events.
                onDragLeave = function (event) {
                    if (!event.isHandled) {
                        event.isHandled = true;
                        _this._dragEnterCounts[key]--;
                        if (_this._dragEnterCounts[key] === 0) {
                            updateDropState_1(false /* isDropping */, event);
                        }
                    }
                };
                onDragEnter = function (event) {
                    event.preventDefault(); // needed for IE
                    if (!event.isHandled) {
                        event.isHandled = true;
                        _this._dragEnterCounts[key]++;
                        if (_this._dragEnterCounts[key] === 1) {
                            updateDropState_1(true /* isDropping */, event);
                        }
                    }
                };
                onDragEnd = function (event) {
                    _this._dragEnterCounts[key] = 0;
                    updateDropState_1(false /* isDropping */, event);
                };
                onDrop = function (event) {
                    _this._dragEnterCounts[key] = 0;
                    updateDropState_1(false /* isDropping */, event);
                    if (dragDropOptions.onDrop) {
                        dragDropOptions.onDrop(dragDropOptions.context.data, event);
                    }
                };
                onDragOver = function (event) {
                    event.preventDefault();
                    if (dragDropOptions.onDragOver) {
                        dragDropOptions.onDragOver(dragDropOptions.context.data, event);
                    }
                };
                this._dragEnterCounts[key] = 0;
                // dragenter and dragleave will be fired when hover to the child element
                // but we only want to change state when enter or leave the current element
                // use the count to ensure it.
                events.on(root, 'dragenter', onDragEnter);
                events.on(root, 'dragleave', onDragLeave);
                events.on(root, 'dragend', onDragEnd);
                events.on(root, 'drop', onDrop);
                events.on(root, 'dragover', onDragOver);
            }
            if (isDraggable) {
                // If the target is draggable, wire up local event listeners for mouse events.
                onMouseDown = this._onMouseDown.bind(this, dragDropTarget);
                onDragEnd = this._onDragEnd.bind(this, dragDropTarget);
                // We need to add in data so that on Firefox we show the ghost element when dragging
                onDragStart = function (event) {
                    var options = _this._dragData.dragTarget.options;
                    if (options && options.onDragStart) {
                        options.onDragStart(options.context.data, options.context.index, _this._selection.getSelection(), event);
                    }
                    _this._isDragging = true;
                    if (event.dataTransfer) {
                        event.dataTransfer.setData('id', root.id);
                    }
                };
                events.on(root, 'dragstart', onDragStart);
                events.on(root, 'mousedown', onMouseDown);
                events.on(root, 'dragend', onDragEnd);
            }
            activeTarget = {
                target: dragDropTarget,
                dispose: function () {
                    if (_this._activeTargets[key] === activeTarget) {
                        delete _this._activeTargets[key];
                    }
                    if (root) {
                        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                            var handler = handlers_1[_i];
                            _this._events.off(root, handler.eventName, handler.callback);
                        }
                        if (isDroppable) {
                            events.off(root, 'dragenter', onDragEnter);
                            events.off(root, 'dragleave', onDragLeave);
                            events.off(root, 'dragend', onDragEnd);
                            events.off(root, 'dragover', onDragOver);
                            events.off(root, 'drop', onDrop);
                        }
                        if (isDraggable) {
                            events.off(root, 'dragstart', onDragStart);
                            events.off(root, 'mousedown', onMouseDown);
                            events.off(root, 'dragend', onDragEnd);
                        }
                    }
                }
            };
            this._activeTargets[key] = activeTarget;
        }
        return {
            key: key,
            dispose: function () {
                if (activeTarget) {
                    activeTarget.dispose();
                }
            }
        };
    };
    DragDropHelper.prototype.unsubscribe = function (root, key) {
        var activeTarget = this._activeTargets[key];
        if (activeTarget) {
            activeTarget.dispose();
        }
    };
    DragDropHelper.prototype._onDragEnd = function (target, event) {
        var options = target.options;
        if (options.onDragEnd) {
            options.onDragEnd(options.context.data, event);
        }
    };
    /**
     * clear drag data when mouse up on body
     */
    DragDropHelper.prototype._onMouseUp = function (event) {
        this._isDragging = false;
        if (this._dragData) {
            for (var _i = 0, _a = Object.keys(this._activeTargets); _i < _a.length; _i++) {
                var key = _a[_i];
                var activeTarget = this._activeTargets[key];
                if (activeTarget.target.root) {
                    this._events.off(activeTarget.target.root, 'mousemove');
                    this._events.off(activeTarget.target.root, 'mouseleave');
                }
            }
            if (this._dragData.dropTarget) {
                // raise dragleave event to let dropTarget know it need to remove dropping style
                _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this._dragData.dropTarget.root, 'dragleave');
                _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this._dragData.dropTarget.root, 'drop');
            }
        }
        this._dragData = null;
    };
    /**
     * clear drag data when mouse up outside of the document
     */
    DragDropHelper.prototype._onDocumentMouseUp = function (event) {
        var doc = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["getDocument"])();
        if (doc && event.target === doc.documentElement) {
            this._onMouseUp(event);
        }
    };
    /**
     * when mouse move over a new drop target while dragging some items,
     * fire dragleave on the old target and fire dragenter to the new target
     * The target will handle style change on dragenter and dragleave events.
     */
    DragDropHelper.prototype._onMouseMove = function (target, event) {
        var 
        // use buttons property here since ev.button in some edge case is not updating well during the move.
        // but firefox doesn't support it, so we set the default value when it is not defined.
        _a = event.buttons, 
        // use buttons property here since ev.button in some edge case is not updating well during the move.
        // but firefox doesn't support it, so we set the default value when it is not defined.
        buttons = _a === void 0 ? MOUSEMOVE_PRIMARY_BUTTON : _a;
        if (this._dragData && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
            // cancel mouse down event and return early when the primary button is not pressed
            this._onMouseUp(event);
            return;
        }
        var root = target.root, key = target.key;
        if (this._isDragging) {
            if (this._isDroppable(target)) {
                // we can have nested drop targets in the DOM, like a folder inside a group. In that case, when we drag into
                // the inner target (folder), we first set dropTarget to the inner element. But the same event is bubbled to the
                // outer target too, and we need to prevent the outer one from taking over.
                // So, check if the last dropTarget is not a child of the current.
                if (this._dragData) {
                    if (this._dragData.dropTarget && this._dragData.dropTarget.key !== key && !this._isChild(root, this._dragData.dropTarget.root)) {
                        if (this._dragEnterCounts[this._dragData.dropTarget.key] > 0) {
                            _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(this._dragData.dropTarget.root, 'dragleave');
                            _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(root, 'dragenter');
                            this._dragData.dropTarget = target;
                        }
                    }
                }
            }
        }
    };
    /**
     * when mouse leave a target while dragging some items, fire dragleave to the target
     */
    DragDropHelper.prototype._onMouseLeave = function (target, event) {
        if (this._isDragging) {
            if (this._dragData && this._dragData.dropTarget && this._dragData.dropTarget.key === target.key) {
                _Utilities__WEBPACK_IMPORTED_MODULE_1__["EventGroup"].raise(target.root, 'dragleave');
                this._dragData.dropTarget = undefined;
            }
        }
    };
    /**
     * when mouse down on a draggable item, we start to track dragdata.
     */
    DragDropHelper.prototype._onMouseDown = function (target, event) {
        if (event.button !== MOUSEDOWN_PRIMARY_BUTTON) {
            // Ignore anything except the primary button.
            return;
        }
        if (this._isDraggable(target)) {
            this._dragData = {
                clientX: event.clientX,
                clientY: event.clientY,
                eventTarget: event.target,
                dragTarget: target
            };
            for (var _i = 0, _a = Object.keys(this._activeTargets); _i < _a.length; _i++) {
                var key = _a[_i];
                var activeTarget = this._activeTargets[key];
                if (activeTarget.target.root) {
                    this._events.on(activeTarget.target.root, 'mousemove', this._onMouseMove.bind(this, activeTarget.target));
                    this._events.on(activeTarget.target.root, 'mouseleave', this._onMouseLeave.bind(this, activeTarget.target));
                }
            }
        }
        else {
            this._dragData = null;
        }
    };
    /**
     * determine whether the child target is a descendant of the parent
     */
    DragDropHelper.prototype._isChild = function (parent, child) {
        var parentElement = react_dom__WEBPACK_IMPORTED_MODULE_0__["findDOMNode"](parent);
        var childElement = react_dom__WEBPACK_IMPORTED_MODULE_0__["findDOMNode"](child);
        while (childElement && childElement.parentElement) {
            if (childElement.parentElement === parentElement) {
                return true;
            }
            childElement = childElement.parentElement;
        }
        return false;
    };
    DragDropHelper.prototype._isDraggable = function (target) {
        var options = target.options;
        return !!(options.canDrag && options.canDrag(options.context.data));
    };
    DragDropHelper.prototype._isDroppable = function (target) {
        // TODO: take the drag item into consideration to prevent dragging an item into the same group
        var options = target.options;
        var dragContext = this._dragData && this._dragData.dragTarget ? this._dragData.dragTarget.options.context : undefined;
        return !!(options.canDrop && options.canDrop(options.context, dragContext));
    };
    return DragDropHelper;
}());

//# sourceMappingURL=DragDropHelper.js.map

/***/ }),

/***/ "pYG9":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupSpacer.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: SPACER_WIDTH, GroupSpacer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPACER_WIDTH", function() { return SPACER_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupSpacer", function() { return GroupSpacer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var SPACER_WIDTH = 36;
var GroupSpacer = function (props) {
    var count = props.count, _a = props.indentWidth, indentWidth = _a === void 0 ? SPACER_WIDTH : _a;
    var width = count * indentWidth;
    return count > 0 ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'ms-GroupSpacer', style: { display: 'inline-block', width: width } }) : null;
};
//# sourceMappingURL=GroupSpacer.js.map

/***/ }),

/***/ "pkCn":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsHeader.types.js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: SelectAllVisibility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAllVisibility", function() { return SelectAllVisibility; });
/**
 * {@docCategory DetailsList}
 */
var SelectAllVisibility;
(function (SelectAllVisibility) {
    SelectAllVisibility[SelectAllVisibility["none"] = 0] = "none";
    SelectAllVisibility[SelectAllVisibility["hidden"] = 1] = "hidden";
    SelectAllVisibility[SelectAllVisibility["visible"] = 2] = "visible";
})(SelectAllVisibility || (SelectAllVisibility = {}));
//# sourceMappingURL=DetailsHeader.types.js.map

/***/ }),

/***/ "qEgt":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Layer/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Layer, LayerBase, LayerHost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ "Bgjg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _Layer__WEBPACK_IMPORTED_MODULE_0__["Layer"]; });

/* harmony import */ var _Layer_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.base */ "7Arc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerBase", function() { return _Layer_base__WEBPACK_IMPORTED_MODULE_1__["LayerBase"]; });

/* harmony import */ var _LayerHost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayerHost */ "mRDm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayerHost", function() { return _LayerHost__WEBPACK_IMPORTED_MODULE_2__["LayerHost"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "rkb2":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/DetailsList/DetailsRowCheck.styles.js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: CHECK_CELL_WIDTH, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_CELL_WIDTH", function() { return CHECK_CELL_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailsRow.styles */ "FzFm");
/* harmony import */ var _DetailsHeader_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DetailsHeader.styles */ "SmFy");
/* harmony import */ var _Check_Check_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Check/Check.styles */ "fa50");




var GlobalClassNames = {
    root: 'ms-DetailsRow-check',
    isDisabled: 'ms-DetailsRow-check--isDisabled',
    isHeader: 'ms-DetailsRow-check--isHeader'
};
var CHECK_CELL_WIDTH = 48;
var getStyles = function (props) {
    var theme = props.theme, className = props.className, isHeader = props.isHeader, selected = props.selected, anySelected = props.anySelected, canSelect = props.canSelect, compact = props.compact, isVisible = props.isVisible;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    var rowHeight = _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_ROW_HEIGHTS"].rowHeight, compactRowHeight = _DetailsRow_styles__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_ROW_HEIGHTS"].compactRowHeight;
    var height = isHeader ? _DetailsHeader_styles__WEBPACK_IMPORTED_MODULE_2__["HEADER_HEIGHT"] : compact ? compactRowHeight : rowHeight;
    var isCheckVisible = isVisible || selected || anySelected;
    return {
        root: [classNames.root, className],
        check: [
            !canSelect && classNames.isDisabled,
            isHeader && classNames.isHeader,
            Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getFocusStyle"])(theme),
            theme.fonts.small,
            _Check_Check_styles__WEBPACK_IMPORTED_MODULE_3__["CheckGlobalClassNames"].checkHost,
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                boxSizing: 'border-box',
                verticalAlign: 'top',
                background: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                opacity: isCheckVisible ? 1 : 0,
                height: height,
                width: CHECK_CELL_WIDTH,
                padding: 0,
                margin: 0
            }
        ],
        isDisabled: []
    };
};
//# sourceMappingURL=DetailsRowCheck.styles.js.map

/***/ }),

/***/ "rp3K":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/DraggableZone/DraggableZone.styles.js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getClassNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return getClassNames; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);


var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["memoizeFunction"])(function (className, isDragging) {
    return {
        root: Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["mergeStyles"])(className, isDragging && {
            touchAction: 'none',
            selectors: {
                '& *': {
                    userSelect: 'none'
                }
            }
        })
    };
});
//# sourceMappingURL=DraggableZone.styles.js.map

/***/ }),

/***/ "su0C":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/FocusZone.js ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/FocusZone.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "swnX":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupFooter.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupFooterBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupFooterBase", function() { return GroupFooterBase; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GroupSpacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupSpacer */ "pYG9");



var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["classNamesFunction"])();
var GroupFooterBase = function (props) {
    var group = props.group, groupLevel = props.groupLevel, footerText = props.footerText, indentWidth = props.indentWidth, styles = props.styles, theme = props.theme;
    var classNames = getClassNames(styles, { theme: theme });
    if (group && footerText) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: classNames.root },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_GroupSpacer__WEBPACK_IMPORTED_MODULE_2__["GroupSpacer"], { indentWidth: indentWidth, count: groupLevel }),
            footerText));
    }
    return null;
};
//# sourceMappingURL=GroupFooter.base.js.map

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

/***/ "uQVQ":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/decorators/withViewport.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/utilities/decorators/withViewport.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = pkg.workaround_withViewport;

/***/ }),

/***/ "ugPr":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Dialog/DialogFooter.base.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: DialogFooterBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogFooterBase", function() { return DialogFooterBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);



var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var DialogFooterBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DialogFooterBase, _super);
    function DialogFooterBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogFooterBase.prototype.render = function () {
        var _a = this.props, className = _a.className, styles = _a.styles, theme = _a.theme;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.actions },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this._classNames.actionsRight }, this._renderChildrenAsActions())));
    };
    DialogFooterBase.prototype._renderChildrenAsActions = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_1__["Children"].map(this.props.children, function (child) { return (child ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { className: _this._classNames.action }, child) : null); });
    };
    return DialogFooterBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=DialogFooter.base.js.map

/***/ }),

/***/ "xHbH":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/GroupedList/GroupShowAll.base.js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: GroupShowAllBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupShowAllBase", function() { return GroupShowAllBase; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Link */ "gnxS");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _GroupSpacer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GroupSpacer */ "pYG9");





var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["classNamesFunction"])();
var GroupShowAllBase = function (props) {
    var group = props.group, groupLevel = props.groupLevel, _a = props.showAllLinkText, showAllLinkText = _a === void 0 ? 'Show All' : _a, styles = props.styles, theme = props.theme, onToggleSummarize = props.onToggleSummarize;
    var classNames = getClassNames(styles, { theme: theme });
    var memoizedOnClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (ev) {
        onToggleSummarize(group);
        ev.stopPropagation();
        ev.preventDefault();
    }, [onToggleSummarize, group]);
    if (group) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: classNames.root },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_GroupSpacer__WEBPACK_IMPORTED_MODULE_3__["GroupSpacer"], { count: groupLevel }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Link__WEBPACK_IMPORTED_MODULE_2__["Link"], { onClick: memoizedOnClick }, showAllLinkText)));
    }
    return null;
};
//# sourceMappingURL=GroupShowAll.base.js.map

/***/ }),

/***/ "xYNb":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/GroupedList.js ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: CollapseAllVisibility, GroupSpacer, GroupedList, GroupedListBase, GroupHeader, GroupFooter, GroupShowAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/GroupedList/index */ "hsoO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseAllVisibility", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["CollapseAllVisibility"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupSpacer", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["GroupSpacer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedList", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["GroupedList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedListBase", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["GroupedListBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupHeader", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["GroupHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupFooter", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["GroupFooter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupShowAll", function() { return _components_GroupedList_index__WEBPACK_IMPORTED_MODULE_0__["GroupShowAll"]; });


//# sourceMappingURL=GroupedList.js.map

/***/ }),

/***/ "xk/t":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/Button.js ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/Button.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "y2VM":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/index.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Modal, ModalBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "zzdt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _Modal__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });

/* harmony import */ var _Modal_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.base */ "Mstc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBase", function() { return _Modal_base__WEBPACK_IMPORTED_MODULE_1__["ModalBase"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "yKNM":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/List.js ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Loading office-ui-fabric-react/List.js
var pkg = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
module.exports = {}
for (var key in pkg) {
  if (pkg.hasOwnProperty(key)) {
    module.exports[key] = pkg[key];
  }
}
Object.defineProperty(module.exports, "__esModule", { value: true });

/***/ }),

/***/ "zzdt":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Modal/Modal.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.base */ "Mstc");
/* harmony import */ var _Modal_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal.styles */ "fcBF");



var Modal = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Modal_base__WEBPACK_IMPORTED_MODULE_1__["ModalBase"], _Modal_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, {
    scope: 'Modal'
});
//# sourceMappingURL=Modal.js.map

/***/ })

}]);
//# sourceMappingURL=chunk.vendors~page-picker-component_de94b10886fcc0ee733b.js.map