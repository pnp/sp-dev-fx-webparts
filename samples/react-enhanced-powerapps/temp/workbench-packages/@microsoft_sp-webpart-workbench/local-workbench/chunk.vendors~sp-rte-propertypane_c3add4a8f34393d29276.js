(window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] = window["webpackJsonp_85093aa7_8c12_4683_91aa_47cd5e2654db_2_5_0"] || []).push([["vendors~sp-rte-propertypane"],{

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

/***/ "+5gN":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/grid/GridCell.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: GridCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridCell", function() { return GridCell; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Button */ "xk/t");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_3__);




var GridCell = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GridCell, _super);
    function GridCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClick = function () {
            var _a = _this.props, onClick = _a.onClick, disabled = _a.disabled, item = _a.item;
            if (onClick && !disabled) {
                onClick(item);
            }
        };
        _this._onMouseEnter = function (ev) {
            var _a = _this.props, onHover = _a.onHover, disabled = _a.disabled, item = _a.item, onMouseEnter = _a.onMouseEnter;
            var didUpdateOnEnter = onMouseEnter && onMouseEnter(ev);
            if (!didUpdateOnEnter && onHover && !disabled) {
                onHover(item);
            }
        };
        _this._onMouseMove = function (ev) {
            var _a = _this.props, onHover = _a.onHover, disabled = _a.disabled, item = _a.item, onMouseMove = _a.onMouseMove;
            var didUpdateOnMove = onMouseMove && onMouseMove(ev);
            if (!didUpdateOnMove && onHover && !disabled) {
                onHover(item);
            }
        };
        _this._onMouseLeave = function (ev) {
            var _a = _this.props, onHover = _a.onHover, disabled = _a.disabled, onMouseLeave = _a.onMouseLeave;
            var didUpdateOnLeave = onMouseLeave && onMouseLeave(ev);
            if (!didUpdateOnLeave && onHover && !disabled) {
                onHover();
            }
        };
        _this._onFocus = function () {
            var _a = _this.props, onFocus = _a.onFocus, disabled = _a.disabled, item = _a.item;
            if (onFocus && !disabled) {
                onFocus(item);
            }
        };
        return _this;
    }
    GridCell.prototype.render = function () {
        var _a;
        var _b = this.props, item = _b.item, id = _b.id, className = _b.className, role = _b.role, selected = _b.selected, disabled = _b.disabled, onRenderItem = _b.onRenderItem, cellDisabledStyle = _b.cellDisabledStyle, cellIsSelectedStyle = _b.cellIsSelectedStyle, index = _b.index, label = _b.label, getClassNames = _b.getClassNames;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Button__WEBPACK_IMPORTED_MODULE_3__["CommandButton"], { id: id, "data-index": index, "data-is-focusable": true, disabled: disabled, className: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["css"])(className, (_a = {},
                _a['' + cellIsSelectedStyle] = selected,
                _a['' + cellDisabledStyle] = disabled,
                _a)), onClick: this._onClick, onMouseEnter: this._onMouseEnter, onMouseMove: this._onMouseMove, onMouseLeave: this._onMouseLeave, onFocus: this._onFocus, role: role, "aria-selected": selected, ariaLabel: label, title: label, getClassNames: getClassNames }, onRenderItem(item)));
    };
    GridCell.defaultProps = {
        disabled: false,
        id: Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('gridCell')
    };
    return GridCell;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=GridCell.js.map

/***/ }),

/***/ "1UIU":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/hsl2rgb.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: hsl2rgb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl2rgb", function() { return hsl2rgb; });
/* harmony import */ var _hsl2hsv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hsl2hsv */ "N3b4");
/* harmony import */ var _hsv2rgb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hsv2rgb */ "j2BB");


/** Converts HSL components to an RGB color. Does not set the alpha value. */
function hsl2rgb(h, s, l) {
    var hsv = Object(_hsl2hsv__WEBPACK_IMPORTED_MODULE_0__["hsl2hsv"])(h, s, l);
    return Object(_hsv2rgb__WEBPACK_IMPORTED_MODULE_1__["hsv2rgb"])(hsv.h, hsv.s, hsv.v);
}
//# sourceMappingURL=hsl2rgb.js.map

/***/ }),

/***/ "4Npk":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Button/ActionButton/ActionButton.styles.js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseButton_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseButton.styles */ "BbrX");



var DEFAULT_BUTTON_HEIGHT = '40px';
var DEFAULT_PADDING = '0 4px';
var getStyles = Object(_Utilities__WEBPACK_IMPORTED_MODULE_1__["memoizeFunction"])(function (theme, customStyles) {
    var _a;
    var baseButtonStyles = Object(_BaseButton_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"])(theme);
    var actionButtonStyles = {
        root: {
            padding: DEFAULT_PADDING,
            height: DEFAULT_BUTTON_HEIGHT,
            color: theme.palette.neutralPrimary,
            backgroundColor: 'transparent',
            border: '1px solid transparent'
        },
        rootHovered: {
            color: theme.palette.themePrimary,
            selectors: (_a = {},
                _a[_Styling__WEBPACK_IMPORTED_MODULE_0__["HighContrastSelector"]] = {
                    borderColor: 'Highlight',
                    color: 'Highlight'
                },
                _a)
        },
        iconHovered: {
            color: theme.palette.themePrimary
        },
        rootPressed: {
            color: theme.palette.black
        },
        rootExpanded: {
            color: theme.palette.themePrimary
        },
        iconPressed: {
            color: theme.palette.themeDarker
        },
        rootDisabled: {
            color: theme.palette.neutralTertiary,
            backgroundColor: 'transparent',
            borderColor: 'transparent'
        },
        rootChecked: {
            color: theme.palette.black
        },
        iconChecked: {
            color: theme.palette.themeDarker
        },
        flexContainer: {
            justifyContent: 'flex-start'
        },
        icon: {
            color: theme.palette.themeDarkAlt
        },
        iconDisabled: {
            color: 'inherit'
        },
        menuIcon: {
            color: theme.palette.neutralSecondary
        },
        textContainer: {
            flexGrow: 0
        }
    };
    return Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["concatStyleSets"])(baseButtonStyles, actionButtonStyles, customStyles);
});
//# sourceMappingURL=ActionButton.styles.js.map

/***/ }),

/***/ "5I8k":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/clamp.js ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: clamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/** Clamp a value to ensure it falls within a given range. */
function clamp(value, max, min) {
    if (min === void 0) { min = 0; }
    return value < min ? min : value > max ? max : value;
}
//# sourceMappingURL=clamp.js.map

/***/ }),

/***/ "7kL4":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/grid/Grid.base.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: GridBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridBase", function() { return GridBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../FocusZone */ "su0C");
/* harmony import */ var _FocusZone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FocusZone__WEBPACK_IMPORTED_MODULE_3__);




var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var GridBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GridBase, _super);
    function GridBase(props) {
        var _this = _super.call(this, props) || this;
        _this._id = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])();
        return _this;
    }
    GridBase.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, columnCount = _a.columnCount, onRenderItem = _a.onRenderItem, positionInSet = _a.positionInSet, setSize = _a.setSize, styles = _a.styles;
        var htmlProps = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getNativeProps"])(this.props, _Utilities__WEBPACK_IMPORTED_MODULE_2__["htmlElementProperties"], [
            'onBlur, aria-posinset, aria-setsize'
        ]);
        var classNames = getClassNames(styles, { theme: this.props.theme });
        // Array to store the cells in the correct row index
        var rowsOfItems = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["toMatrix"])(items, columnCount);
        var content = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("table", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, htmlProps, { "aria-posinset": positionInSet, "aria-setsize": setSize, id: this._id, role: 'grid', className: classNames.root }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("tbody", null, rowsOfItems.map(function (rows, rowIndex) {
                return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("tr", { role: 'row', key: _this._id + '-' + rowIndex + '-row' }, rows.map(function (cell, cellIndex) {
                    return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("td", { role: 'presentation', key: _this._id + '-' + cellIndex + '-cell', className: classNames.tableCell }, onRenderItem(cell, cellIndex)));
                })));
            }))));
        // Create the table/grid
        return this.props.doNotContainWithinFocusZone ? (content) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FocusZone__WEBPACK_IMPORTED_MODULE_3__["FocusZone"], { isCircularNavigation: this.props.shouldFocusCircularNavigate, className: classNames.focusedContainer, onBlur: this.props.onBlur }, content));
    };
    return GridBase;
}(_Utilities__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));

//# sourceMappingURL=Grid.base.js.map

/***/ }),

/***/ "BbrX":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/Button/BaseButton.styles.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);


var noOutline = {
    outline: 0
};
var iconStyle = function (fontSize) {
    return {
        fontSize: fontSize,
        margin: '0 4px',
        height: '16px',
        lineHeight: '16px',
        textAlign: 'center',
        verticalAlign: 'middle',
        flexShrink: 0
    };
};
/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
var getStyles = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["memoizeFunction"])(function (theme) {
    var _a;
    var semanticColors = theme.semanticColors, effects = theme.effects, fonts = theme.fonts;
    var border = semanticColors.buttonBorder;
    var disabledBackground = semanticColors.disabledBackground;
    var disabledText = semanticColors.disabledText;
    var buttonHighContrastFocus = {
        left: -2,
        top: -2,
        bottom: -2,
        right: -2,
        border: 'none',
        outlineColor: 'ButtonText'
    };
    return {
        root: [
            Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
            theme.fonts.medium,
            {
                boxSizing: 'border-box',
                border: '1px solid ' + border,
                userSelect: 'none',
                display: 'inline-block',
                textDecoration: 'none',
                textAlign: 'center',
                cursor: 'pointer',
                verticalAlign: 'top',
                padding: '0 16px',
                borderRadius: effects.roundedCorner2,
                selectors: {
                    // IE11 workaround for preventing shift of child elements of a button when active.
                    ':active > *': {
                        position: 'relative',
                        left: 0,
                        top: 0
                    }
                }
            }
        ],
        rootDisabled: [
            Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
            {
                backgroundColor: disabledBackground,
                borderColor: disabledBackground,
                color: disabledText,
                cursor: 'default',
                pointerEvents: 'none',
                selectors: (_a = {
                        ':hover': noOutline,
                        ':focus': noOutline
                    },
                    _a[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                        color: 'grayText',
                        borderColor: 'grayText'
                    },
                    _a)
            }
        ],
        iconDisabled: {
            color: disabledText
        },
        menuIconDisabled: {
            color: disabledText
        },
        flexContainer: {
            display: 'flex',
            height: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center'
        },
        description: {
            display: 'block'
        },
        textContainer: {
            flexGrow: 1,
            display: 'block'
        },
        icon: iconStyle(fonts.mediumPlus.fontSize),
        menuIcon: iconStyle(fonts.small.fontSize),
        label: {
            margin: '0 4px',
            lineHeight: '100%',
            display: 'block'
        },
        screenReaderText: _Styling__WEBPACK_IMPORTED_MODULE_1__["hiddenContentStyle"]
    };
});
//# sourceMappingURL=BaseButton.styles.js.map

/***/ }),

/***/ "N3b4":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/hsl2hsv.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: hsl2hsv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl2hsv", function() { return hsl2hsv; });
/** Converts HSL components to an HSV color. */
function hsl2hsv(h, s, l) {
    s *= (l < 50 ? l : 100 - l) / 100;
    var v = l + s;
    return {
        h: h,
        s: v === 0 ? 0 : ((2 * s) / v) * 100,
        v: v
    };
}
//# sourceMappingURL=hsl2hsv.js.map

/***/ }),

/***/ "OgLX":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/getColorFromString.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getColorFromString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColorFromString", function() { return getColorFromString; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _cssColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cssColor */ "c+RQ");
/* harmony import */ var _getColorFromRGBA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getColorFromRGBA */ "tIxf");



/**
 * Converts a CSS color string to a color object.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 *
 * `inputColor` will be used unmodified as the `str` property of the returned object.
 * Alpha defaults to 100 if not specified in `inputColor`.
 * Returns undefined if the color string is invalid/not recognized.
 */
function getColorFromString(inputColor) {
    var color = Object(_cssColor__WEBPACK_IMPORTED_MODULE_1__["cssColor"])(inputColor);
    if (!color) {
        return;
    }
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, Object(_getColorFromRGBA__WEBPACK_IMPORTED_MODULE_2__["getColorFromRGBA"])(color), { str: inputColor });
}
//# sourceMappingURL=getColorFromString.js.map

/***/ }),

/***/ "RDAZ":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/rgb2hex.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: rgb2hex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb2hex", function() { return rgb2hex; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "XfOK");
/* harmony import */ var _clamp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clamp */ "5I8k");


/** Converts RGB components to a hex color string (without # prefix). */
function rgb2hex(r, g, b) {
    return [_rgbToPaddedHex(r), _rgbToPaddedHex(g), _rgbToPaddedHex(b)].join('');
}
/** Converts an RGB component to a 0-padded hex component of length 2. */
function _rgbToPaddedHex(num) {
    num = Object(_clamp__WEBPACK_IMPORTED_MODULE_1__["clamp"])(num, _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_RGB"]);
    var hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
//# sourceMappingURL=rgb2hex.js.map

/***/ }),

/***/ "TkxN":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker.js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: SwatchColorPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwatchColorPicker", function() { return SwatchColorPicker; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SwatchColorPicker_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SwatchColorPicker.base */ "kOpV");
/* harmony import */ var _SwatchColorPicker_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SwatchColorPicker.styles */ "kXpE");



var SwatchColorPicker = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_SwatchColorPicker_base__WEBPACK_IMPORTED_MODULE_1__["SwatchColorPickerBase"], _SwatchColorPicker_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'SwatchColorPicker' });
//# sourceMappingURL=SwatchColorPicker.js.map

/***/ }),

/***/ "U8QW":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/SwatchColorPicker/ColorPickerGridCell.js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: ColorPickerGridCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerGridCell", function() { return ColorPickerGridCell; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ColorPickerGridCell_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColorPickerGridCell.base */ "rg4/");
/* harmony import */ var _ColorPickerGridCell_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColorPickerGridCell.styles */ "cKG6");



var ColorPickerGridCell = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_ColorPickerGridCell_base__WEBPACK_IMPORTED_MODULE_1__["ColorPickerGridCellBase"], _ColorPickerGridCell_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"], undefined, { scope: 'ColorPickerGridCell' }, true);
//# sourceMappingURL=ColorPickerGridCell.js.map

/***/ }),

/***/ "XfOK":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/consts.js ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: MAX_COLOR_SATURATION, MAX_COLOR_HUE, MAX_COLOR_VALUE, MAX_COLOR_RGB, MAX_COLOR_RGBA, MAX_COLOR_ALPHA, MIN_HEX_LENGTH, MAX_HEX_LENGTH, MIN_RGBA_LENGTH, MAX_RGBA_LENGTH, HEX_REGEX, RGBA_REGEX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_SATURATION", function() { return MAX_COLOR_SATURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_HUE", function() { return MAX_COLOR_HUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_VALUE", function() { return MAX_COLOR_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_RGB", function() { return MAX_COLOR_RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_RGBA", function() { return MAX_COLOR_RGBA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_ALPHA", function() { return MAX_COLOR_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_HEX_LENGTH", function() { return MIN_HEX_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_HEX_LENGTH", function() { return MAX_HEX_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_RGBA_LENGTH", function() { return MIN_RGBA_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_RGBA_LENGTH", function() { return MAX_RGBA_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEX_REGEX", function() { return HEX_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_REGEX", function() { return RGBA_REGEX; });
var MAX_COLOR_SATURATION = 100;
var MAX_COLOR_HUE = 359;
var MAX_COLOR_VALUE = 100;
var MAX_COLOR_RGB = 255;
/** @deprecated Use MAX_COLOR_RGB (255) or MAX_COLOR_ALPHA (100) */
var MAX_COLOR_RGBA = MAX_COLOR_RGB;
var MAX_COLOR_ALPHA = 100;
/** Minimum length for a hexadecimal color string (not including the #) */
var MIN_HEX_LENGTH = 3;
/** Maximum length for a hexadecimal color string (not including the #) */
var MAX_HEX_LENGTH = 6;
/** Minimum length for a string of an RGBA color component */
var MIN_RGBA_LENGTH = 1;
/** Maximum length for a string of an RGBA color component */
var MAX_RGBA_LENGTH = 3;
/** Regular expression matching only valid hexadecimal chars */
var HEX_REGEX = /^[\da-f]{0,6}$/i;
/** Regular expression matching only numbers */
var RGBA_REGEX = /^\d{0,3}$/;
//# sourceMappingURL=consts.js.map

/***/ }),

/***/ "Xk1D":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/grid/Grid.js ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Grid_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Grid.base */ "7kL4");
/* harmony import */ var _Grid_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Grid.styles */ "zkUL");



var Grid = Object(_Utilities__WEBPACK_IMPORTED_MODULE_0__["styled"])(_Grid_base__WEBPACK_IMPORTED_MODULE_1__["GridBase"], _Grid_styles__WEBPACK_IMPORTED_MODULE_2__["getStyles"]);
//# sourceMappingURL=Grid.js.map

/***/ }),

/***/ "Y5cc":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/rgb2hsv.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: rgb2hsv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb2hsv", function() { return rgb2hsv; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "XfOK");

/** Converts RGB components to an HSV color. */
function rgb2hsv(r, g, b) {
    var h = NaN;
    var s;
    var v;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    // hue
    if (delta === 0) {
        h = 0;
    }
    else if (r === max) {
        h = ((g - b) / delta) % 6;
    }
    else if (g === max) {
        h = (b - r) / delta + 2;
    }
    else if (b === max) {
        h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }
    // saturation
    s = Math.round((max === 0 ? 0 : delta / max) * 100);
    // value
    v = Math.round((max / _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_RGB"]) * 100);
    return { h: h, s: s, v: v };
}
//# sourceMappingURL=rgb2hsv.js.map

/***/ }),

/***/ "c+RQ":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/cssColor.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: cssColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssColor", function() { return cssColor; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "XfOK");
/* harmony import */ var _hsl2rgb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hsl2rgb */ "1UIU");


/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 * Four and eight digit hex values (with alpha) are supported if the current browser supports them.
 */
function cssColor(color) {
    if (!color) {
        return undefined;
    }
    // Need to check the following valid color formats: RGB(A), HSL(A), hex, named color
    // First check for well formatted RGB(A), HSL(A), and hex formats at the start.
    // This is for perf (no creating an element) and catches the intentional "transparent" color
    //   case early on.
    var easyColor = _rgba(color) || _hex6(color) || _hex3(color) || _hsla(color);
    if (easyColor) {
        return easyColor;
    }
    // if the above fails, do the more expensive catch-all
    return _browserCompute(color);
}
/**
 * Uses the browser's getComputedStyle() to determine what the passed-in color is.
 * This assumes _rgba, _hex6, _hex3, and _hsla have already been tried and all failed.
 * This works by attaching an element to the DOM, which may fail in server-side rendering
 *   or with headless browsers.
 */
function _browserCompute(str) {
    if (typeof document === 'undefined') {
        // don't throw an error when used server-side
        return undefined;
    }
    var elem = document.createElement('div');
    elem.style.backgroundColor = str;
    // This element must be attached to the DOM for getComputedStyle() to have a value
    elem.style.position = 'absolute';
    elem.style.top = '-9999px';
    elem.style.left = '-9999px';
    elem.style.height = '1px';
    elem.style.width = '1px';
    document.body.appendChild(elem);
    var eComputedStyle = getComputedStyle(elem);
    var computedColor = eComputedStyle && eComputedStyle.backgroundColor;
    document.body.removeChild(elem);
    // computedColor is always an RGB(A) string, except for invalid colors in IE/Edge which return 'transparent'
    // browsers return one of these if the color string is invalid,
    // so need to differentiate between an actual error and intentionally passing in this color
    if (computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'transparent') {
        switch (str.trim()) {
            // RGB and HSL were already checked at the start of the function
            case 'transparent':
            case '#0000':
            case '#00000000':
                return { r: 0, g: 0, b: 0, a: 0 };
        }
        return undefined;
    }
    return _rgba(computedColor);
}
/**
 * If `str` is in valid `rgb()` or `rgba()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
function _rgba(str) {
    if (!str) {
        return undefined;
    }
    var match = str.match(/^rgb(a?)\(([\d., ]+)\)$/);
    if (match) {
        var hasAlpha = !!match[1];
        var expectedPartCount = hasAlpha ? 4 : 3;
        var parts = match[2].split(/ *, */).map(Number);
        if (parts.length === expectedPartCount) {
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: hasAlpha ? parts[3] * 100 : _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"]
            };
        }
    }
}
/**
 * If `str` is in `hsl()` or `hsla()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
function _hsla(str) {
    var match = str.match(/^hsl(a?)\(([\d., ]+)\)$/);
    if (match) {
        var hasAlpha = !!match[1];
        var expectedPartCount = hasAlpha ? 4 : 3;
        var parts = match[2].split(/ *, */).map(Number);
        if (parts.length === expectedPartCount) {
            var rgba = Object(_hsl2rgb__WEBPACK_IMPORTED_MODULE_1__["hsl2rgb"])(parts[0], parts[1], parts[2]);
            rgba.a = hasAlpha ? parts[3] * 100 : _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"];
            return rgba;
        }
    }
}
/**
 * If `str` is in valid 6-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _hex6(str) {
    if ('#' === str[0] && 7 === str.length && /^#[\da-fA-F]{6}$/.test(str)) {
        return {
            r: parseInt(str.slice(1, 3), 16),
            g: parseInt(str.slice(3, 5), 16),
            b: parseInt(str.slice(5, 7), 16),
            a: _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"]
        };
    }
}
/**
 * If `str` is in valid 3-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _hex3(str) {
    if ('#' === str[0] && 4 === str.length && /^#[\da-fA-F]{3}$/.test(str)) {
        return {
            r: parseInt(str[1] + str[1], 16),
            g: parseInt(str[2] + str[2], 16),
            b: parseInt(str[3] + str[3], 16),
            a: _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"]
        };
    }
}
//# sourceMappingURL=cssColor.js.map

/***/ }),

/***/ "cKG6":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/SwatchColorPicker/ColorPickerGridCell.styles.js ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_1__);


// Size breakpoint when the default border width changes from 2px to 4px.
var CELL_BORDER_BREAKPOINT = 24;
var LARGE_BORDER = 4;
var SMALL_BORDER = 2;
var DIVIDING_PADDING = 2;
var DEFAULT_CELL_SIZE = 20;
var cellHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    border: 'none',
    outlineColor: 'ButtonText'
};
var getStyles = function (props) {
    var _a, _b, _c, _d, _e;
    var theme = props.theme, disabled = props.disabled, selected = props.selected, circle = props.circle, isWhite = props.isWhite, _f = props.height, height = _f === void 0 ? DEFAULT_CELL_SIZE : _f, _g = props.width, width = _g === void 0 ? DEFAULT_CELL_SIZE : _g, borderWidth = props.borderWidth;
    var semanticColors = theme.semanticColors, palette = theme.palette;
    var buttonBorderHovered = palette.neutralLighter;
    var buttonBorderChecked = palette.neutralLight;
    var buttonBorderCheckedHovered = palette.neutralSecondary;
    var buttonBorderIsWhite = palette.neutralTertiary;
    // If user provided a value, use it. If not, then we decide depending on the 24px size breakpoint.
    var calculatedBorderWidth = borderWidth ? borderWidth : width < CELL_BORDER_BREAKPOINT ? SMALL_BORDER : LARGE_BORDER;
    return {
        // this is a button that wraps the color
        colorCell: [
            Object(_Styling__WEBPACK_IMPORTED_MODULE_1__["getFocusStyle"])(theme, -1, 'relative', cellHighContrastFocus),
            {
                backgroundColor: semanticColors.bodyBackground,
                padding: 0,
                position: 'relative',
                boxSizing: 'border-box',
                display: 'inline-block',
                cursor: 'pointer',
                userSelect: 'none',
                borderRadius: 0,
                border: 'none',
                height: height,
                width: width
            },
            !circle && {
                selectors: (_a = {},
                    _a["." + _Utilities__WEBPACK_IMPORTED_MODULE_0__["IsFocusVisibleClassName"] + " &:focus::after"] = {
                        // -1px so that we don't increase visually the size of the cell.
                        outlineOffset: calculatedBorderWidth - 1 + "px"
                    },
                    _a)
            },
            // In focus state for circle we want a round border which is not possible with outline.
            circle && {
                borderRadius: '50%',
                selectors: (_b = {},
                    _b["." + _Utilities__WEBPACK_IMPORTED_MODULE_0__["IsFocusVisibleClassName"] + " &:focus::after"] = {
                        outline: 'none',
                        borderColor: semanticColors.focusBorder,
                        borderRadius: '50%',
                        left: -calculatedBorderWidth,
                        right: -calculatedBorderWidth,
                        top: -calculatedBorderWidth,
                        bottom: -calculatedBorderWidth,
                        selectors: (_c = {},
                            _c[_Styling__WEBPACK_IMPORTED_MODULE_1__["HighContrastSelector"]] = {
                                outline: "1px solid ButtonText"
                            },
                            _c)
                    },
                    _b)
            },
            selected && {
                padding: DIVIDING_PADDING,
                border: calculatedBorderWidth + "px solid " + buttonBorderChecked,
                selectors: (_d = {},
                    _d['&:hover::before'] = {
                        content: '""',
                        height: height,
                        width: width,
                        position: 'absolute',
                        top: -calculatedBorderWidth,
                        left: -calculatedBorderWidth,
                        borderRadius: circle ? '50%' : 'default',
                        boxShadow: "inset 0 0 0 1px " + buttonBorderCheckedHovered
                    },
                    _d)
            },
            !selected && {
                selectors: (_e = {},
                    _e['&:hover, &:active, &:focus'] = {
                        backgroundColor: semanticColors.bodyBackground,
                        padding: DIVIDING_PADDING,
                        border: calculatedBorderWidth + "px solid " + buttonBorderHovered
                    },
                    _e['&:focus'] = {
                        borderColor: semanticColors.bodyBackground,
                        padding: 0,
                        selectors: {
                            ':hover': {
                                borderColor: theme.palette.neutralLight,
                                padding: DIVIDING_PADDING
                            }
                        }
                    },
                    _e)
            },
            disabled && {
                color: semanticColors.disabledBodyText,
                pointerEvents: 'none',
                opacity: 0.3
            },
            isWhite &&
                !selected && {
                // fake a border for white
                backgroundColor: buttonBorderIsWhite,
                padding: 1
            }
        ],
        // the <svg> that holds the color
        svg: [
            {
                width: '100%',
                height: '100%'
            },
            circle && {
                borderRadius: '50%'
            }
        ]
    };
};
//# sourceMappingURL=ColorPickerGridCell.styles.js.map

/***/ }),

/***/ "j2BB":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/hsv2rgb.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: hsv2rgb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsv2rgb", function() { return hsv2rgb; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "XfOK");

/** Converts HSV components to an RGB color. Does not set the alpha value. */
function hsv2rgb(h, s, v) {
    s = s / 100;
    v = v / 100;
    var rgb = [];
    var c = v * s;
    var hh = h / 60;
    var x = c * (1 - Math.abs((hh % 2) - 1));
    var m = v - c;
    switch (Math.floor(hh)) {
        case 0:
            rgb = [c, x, 0];
            break;
        case 1:
            rgb = [x, c, 0];
            break;
        case 2:
            rgb = [0, c, x];
            break;
        case 3:
            rgb = [0, x, c];
            break;
        case 4:
            rgb = [x, 0, c];
            break;
        case 5:
            rgb = [c, 0, x];
            break;
    }
    return {
        r: Math.round(_consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_RGB"] * (rgb[0] + m)),
        g: Math.round(_consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_RGB"] * (rgb[1] + m)),
        b: Math.round(_consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_RGB"] * (rgb[2] + m))
    };
}
//# sourceMappingURL=hsv2rgb.js.map

/***/ }),

/***/ "kOpV":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker.base.js ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: SwatchColorPickerBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwatchColorPickerBase", function() { return SwatchColorPickerBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities_grid_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/grid/Grid */ "Xk1D");
/* harmony import */ var _ColorPickerGridCell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ColorPickerGridCell */ "U8QW");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @uifabric/utilities */ "+4t+");
/* harmony import */ var _uifabric_utilities__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_5__);






var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["classNamesFunction"])();
var SwatchColorPickerBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SwatchColorPickerBase, _super);
    function SwatchColorPickerBase(props) {
        var _this = _super.call(this, props) || this;
        _this.navigationIdleDelay = 250 /* ms */;
        // Add an index to each color cells. Memoizes this so that color cells do not re-render on every update.
        _this._getItemsWithIndex = Object(_uifabric_utilities__WEBPACK_IMPORTED_MODULE_5__["memoizeFunction"])(function (items) {
            return items.map(function (item, index) {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, item, { index: index });
            });
        });
        /**
         * When the whole swatchColorPicker is blurred,
         * make sure to clear the pending focused stated
         */
        _this._onSwatchColorPickerBlur = function () {
            if (_this.props.onCellFocused) {
                _this._cellFocused = false;
                _this.props.onCellFocused();
            }
        };
        /**
         * Render a color cell
         * @param item - The item to render
         * @returns - Element representing the item
         */
        _this._renderOption = function (item) {
            var id = _this._id;
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ColorPickerGridCell__WEBPACK_IMPORTED_MODULE_4__["ColorPickerGridCell"], { item: item, id: id, color: item.color, styles: _this.props.getColorGridCellStyles, disabled: _this.props.disabled, onClick: _this._onCellClick, onHover: _this._onGridCellHovered, onFocus: _this._onGridCellFocused, selected: _this.state.selectedIndex !== undefined && _this.state.selectedIndex === item.index, circle: _this.props.cellShape === 'circle', label: item.label, onMouseEnter: _this._onMouseEnter, onMouseMove: _this._onMouseMove, onMouseLeave: _this._onMouseLeave, onWheel: _this._onWheel, onKeyDown: _this._onKeyDown, height: _this.props.cellHeight, width: _this.props.cellWidth, borderWidth: _this.props.cellBorderWidth }));
        };
        /**
         * Callback passed to the GridCell that will manage triggering the onCellHovered callback for mouseEnter
         */
        _this._onMouseEnter = function (ev) {
            if (!_this.props.focusOnHover) {
                if (!_this.isNavigationIdle || _this.props.disabled) {
                    return true;
                }
                return false;
            }
            if (_this.isNavigationIdle && !_this.props.disabled) {
                ev.currentTarget.focus();
            }
            return true;
        };
        /**
         * Callback passed to the GridCell that will manage Hover/Focus updates
         */
        _this._onMouseMove = function (ev) {
            if (!_this.props.focusOnHover) {
                if (!_this.isNavigationIdle || _this.props.disabled) {
                    return true;
                }
                return false;
            }
            var targetElement = ev.currentTarget;
            // If navigation is idle and the targetElement is the focused element bail out
            // if (!this.isNavigationIdle || (document && targetElement === (document.activeElement as HTMLElement))) {
            if (_this.isNavigationIdle && !(document && targetElement === document.activeElement)) {
                targetElement.focus();
            }
            return true;
        };
        /**
         * Callback passed to the GridCell that will manage Hover/Focus updates
         */
        _this._onMouseLeave = function (ev) {
            var parentSelector = _this.props.mouseLeaveParentSelector;
            if (!_this.props.focusOnHover || !parentSelector || !_this.isNavigationIdle || _this.props.disabled) {
                return;
            }
            // Get the the elements that math the given selector
            var elements = document.querySelectorAll(parentSelector);
            // iterate over the elements return to make sure it is a parent of the target and focus it
            for (var index = 0; index < elements.length; index += 1) {
                if (elements[index].contains(ev.currentTarget)) {
                    /**
                     * IE11 focus() method forces parents to scroll to top of element.
                     * Edge and IE expose a setActive() function for focusable divs that
                     * sets the page focus but does not scroll the parent element.
                     */
                    if (elements[index].setActive) {
                        try {
                            elements[index].setActive();
                        }
                        catch (e) {
                            /* no-op */
                        }
                    }
                    else {
                        elements[index].focus();
                    }
                    break;
                }
            }
        };
        /**
         * Callback to make sure we don't update the hovered element during mouse wheel
         */
        _this._onWheel = function () {
            _this.setNavigationTimeout();
        };
        /**
         * Callback that
         */
        _this._onKeyDown = function (ev) {
            if (ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].up || ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].down || ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].left || ev.which === _Utilities__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].right) {
                _this.setNavigationTimeout();
            }
        };
        /**
         * Sets a timeout so we won't process any mouse "hover" events
         * while navigating (via mouseWheel or arrowKeys)
         */
        _this.setNavigationTimeout = function () {
            if (!_this.isNavigationIdle && _this.navigationIdleTimeoutId !== undefined) {
                _this.async.clearTimeout(_this.navigationIdleTimeoutId);
                _this.navigationIdleTimeoutId = undefined;
            }
            else {
                _this.isNavigationIdle = false;
            }
            _this.navigationIdleTimeoutId = _this.async.setTimeout(function () {
                _this.isNavigationIdle = true;
            }, _this.navigationIdleDelay);
        };
        /**
         * Callback passed to the GridCell class that will trigger the onCellHovered callback of the SwatchColorPicker
         * NOTE: This will not be triggered if shouldFocusOnHover === true
         */
        _this._onGridCellHovered = function (item) {
            var onCellHovered = _this.props.onCellHovered;
            if (onCellHovered) {
                return item ? onCellHovered(item.id, item.color) : onCellHovered();
            }
        };
        /**
         * Callback passed to the GridCell class that will trigger the onCellFocus callback of the SwatchColorPicker
         */
        _this._onGridCellFocused = function (item) {
            var onCellFocused = _this.props.onCellFocused;
            if (onCellFocused) {
                if (item) {
                    _this._cellFocused = true;
                    return onCellFocused(item.id, item.color);
                }
                else {
                    _this._cellFocused = false;
                    return onCellFocused();
                }
            }
        };
        /**
         * Handle the click on a cell
         * @param item - The cell that the click was fired against
         */
        _this._onCellClick = function (item) {
            if (_this.props.disabled) {
                return;
            }
            var index = item.index;
            // If we have a valid index and it is not already
            // selected, select it
            if (index >= 0 && index !== _this.state.selectedIndex) {
                if (_this.props.onCellFocused && _this._cellFocused) {
                    _this._cellFocused = false;
                    _this.props.onCellFocused();
                }
                if (_this.props.onColorChanged) {
                    _this.props.onColorChanged(item.id, item.color);
                }
                // Update internal state only if the component is uncontrolled
                if (_this.props.isControlled !== true) {
                    _this.setState({
                        selectedIndex: index
                    });
                }
            }
        };
        _this._id = props.id || Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["getId"])('swatchColorPicker');
        if (true) {
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["warnMutuallyExclusive"])('SwatchColorPicker', _this.props, {
                focusOnHover: 'onHover'
            });
            Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["warnConditionallyRequiredProps"])('SwatchColorPicker', _this.props, ['focusOnHover'], 'mouseLeaveParentSelector', !!_this.props.mouseLeaveParentSelector);
        }
        _this.isNavigationIdle = true;
        _this.async = new _Utilities__WEBPACK_IMPORTED_MODULE_2__["Async"](_this);
        var selectedIndex;
        if (props.selectedId) {
            selectedIndex = _this._getSelectedIndex(props.colorCells, props.selectedId);
        }
        _this.state = {
            selectedIndex: selectedIndex
        };
        return _this;
    }
    // tslint:disable-next-line function-name
    SwatchColorPickerBase.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        if (newProps.selectedId !== undefined) {
            this.setState({
                selectedIndex: this._getSelectedIndex(newProps.colorCells, newProps.selectedId)
            });
        }
    };
    SwatchColorPickerBase.prototype.componentWillUnmount = function () {
        if (this.props.onCellFocused && this._cellFocused) {
            this._cellFocused = false;
            this.props.onCellFocused();
        }
    };
    SwatchColorPickerBase.prototype.render = function () {
        var _a = this.props, colorCells = _a.colorCells, columnCount = _a.columnCount, positionInSet = _a.positionInSet, setSize = _a.setSize, shouldFocusCircularNavigate = _a.shouldFocusCircularNavigate, className = _a.className, doNotContainWithinFocusZone = _a.doNotContainWithinFocusZone, styles = _a.styles, cellMargin = _a.cellMargin;
        var classNames = getClassNames(styles, {
            theme: this.props.theme,
            className: className,
            cellMargin: cellMargin
        });
        if (colorCells.length < 1 || columnCount < 1) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_utilities_grid_Grid__WEBPACK_IMPORTED_MODULE_3__["Grid"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { items: this._getItemsWithIndex(colorCells), columnCount: columnCount, onRenderItem: this._renderOption, positionInSet: positionInSet && positionInSet, setSize: setSize && setSize, shouldFocusCircularNavigate: shouldFocusCircularNavigate, doNotContainWithinFocusZone: doNotContainWithinFocusZone, onBlur: this._onSwatchColorPickerBlur, theme: this.props.theme, 
            // tslint:disable-next-line:jsx-no-lambda
            styles: function (props) { return ({
                root: classNames.root,
                tableCell: classNames.tableCell,
                focusedContainer: classNames.focusedContainer
            }); } })));
    };
    /**
     * Get the selected item's index
     * @param items - The items to search
     * @param selectedId - The selected item's id to find
     * @returns - The index of the selected item's id, -1 if there was no match
     */
    SwatchColorPickerBase.prototype._getSelectedIndex = function (items, selectedId) {
        var selectedIndex = Object(_Utilities__WEBPACK_IMPORTED_MODULE_2__["findIndex"])(items, function (item) { return item.id === selectedId; });
        return selectedIndex >= 0 ? selectedIndex : undefined;
    };
    SwatchColorPickerBase.defaultProps = {
        cellShape: 'circle',
        disabled: false,
        shouldFocusCircularNavigate: true,
        cellMargin: 10
    };
    return SwatchColorPickerBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

//# sourceMappingURL=SwatchColorPicker.base.js.map

/***/ }),

/***/ "kXpE":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/SwatchColorPicker/SwatchColorPicker.styles.js ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_0__);

var GlobalClassNames = {
    focusedContainer: 'ms-swatchColorPickerBodyContainer'
};
var getStyles = function (props) {
    var className = props.className, theme = props.theme, cellMargin = props.cellMargin;
    var classNames = Object(_Styling__WEBPACK_IMPORTED_MODULE_0__["getGlobalClassNames"])(GlobalClassNames, theme);
    return {
        root: {
            margin: '8px 0',
            borderCollapse: 'collapse'
        },
        tableCell: {
            padding: cellMargin / 2
        },
        focusedContainer: [
            classNames.focusedContainer,
            {
                clear: 'both',
                display: 'block',
                minWidth: '180px'
            },
            className
        ]
    };
};
//# sourceMappingURL=SwatchColorPicker.styles.js.map

/***/ }),

/***/ "rg4/":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/components/SwatchColorPicker/ColorPickerGridCell.base.js ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: ColorPickerGridCellBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerGridCellBase", function() { return ColorPickerGridCellBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Styling */ "4RHQ");
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Styling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities */ "UJDV");
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utilities_color_getColorFromString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/color/getColorFromString */ "OgLX");
/* harmony import */ var _utilities_grid_GridCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/grid/GridCell */ "+5gN");
/* harmony import */ var _Button_ActionButton_ActionButton_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Button/ActionButton/ActionButton.styles */ "4Npk");







var getColorPickerGridCellButtonClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["memoizeFunction"])(function (theme, className, variantClassName, iconClassName, menuIconClassName, disabled, checked, expanded, isSplit) {
    var styles = Object(_Button_ActionButton_ActionButton_styles__WEBPACK_IMPORTED_MODULE_6__["getStyles"])(theme);
    return Object(_Styling__WEBPACK_IMPORTED_MODULE_2__["mergeStyleSets"])({
        root: [
            'ms-Button',
            styles.root,
            variantClassName,
            className,
            checked && ['is-checked', styles.rootChecked],
            disabled && ['is-disabled', styles.rootDisabled],
            !disabled &&
                !checked && {
                selectors: {
                    ':hover': styles.rootHovered,
                    ':focus': styles.rootFocused,
                    ':active': styles.rootPressed
                }
            },
            disabled && checked && [styles.rootCheckedDisabled],
            !disabled &&
                checked && {
                selectors: {
                    ':hover': styles.rootCheckedHovered,
                    ':active': styles.rootCheckedPressed
                }
            }
        ],
        flexContainer: ['ms-Button-flexContainer', styles.flexContainer]
    });
});
var getClassNames = Object(_Utilities__WEBPACK_IMPORTED_MODULE_3__["classNamesFunction"])();
var ColorCell = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ColorCell, _super);
    function ColorCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ColorCell;
}(_utilities_grid_GridCell__WEBPACK_IMPORTED_MODULE_5__["GridCell"]));
var ColorPickerGridCellBase = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ColorPickerGridCellBase, _super);
    function ColorPickerGridCellBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the core of a color cell
         * @returns - Element representing the core of the item
         */
        _this._onRenderColorOption = function (colorOption) {
            // Build an SVG for the cell with the given shape and color properties
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("svg", { className: _this._classNames.svg, viewBox: "0 0 20 20", fill: Object(_utilities_color_getColorFromString__WEBPACK_IMPORTED_MODULE_4__["getColorFromString"])(colorOption.color).str }, _this.props.circle ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("circle", { cx: "50%", cy: "50%", r: "50%" }) : react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("rect", { width: "100%", height: "100%" })));
        };
        return _this;
    }
    ColorPickerGridCellBase.prototype.render = function () {
        var _a = this.props, item = _a.item, id = _a.id, selected = _a.selected, disabled = _a.disabled, styles = _a.styles, theme = _a.theme, circle = _a.circle, color = _a.color, onClick = _a.onClick, onHover = _a.onHover, onFocus = _a.onFocus, onMouseEnter = _a.onMouseEnter, onMouseMove = _a.onMouseMove, onMouseLeave = _a.onMouseLeave, onWheel = _a.onWheel, onKeyDown = _a.onKeyDown, height = _a.height, width = _a.width, borderWidth = _a.borderWidth;
        this._classNames = getClassNames(styles, {
            theme: theme,
            disabled: disabled,
            selected: selected,
            circle: circle,
            isWhite: this._isWhiteCell(color),
            height: height,
            width: width,
            borderWidth: borderWidth
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](ColorCell, { item: item, id: id + "-" + item.id + "-" + item.index, key: item.id, disabled: disabled, role: 'gridcell', onRenderItem: this._onRenderColorOption, selected: selected, onClick: onClick, onHover: onHover, onFocus: onFocus, label: item.label, className: this._classNames.colorCell, getClassNames: getColorPickerGridCellButtonClassNames, index: item.index, onMouseEnter: onMouseEnter, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave, onWheel: onWheel, onKeyDown: onKeyDown }));
    };
    /**
     * Validate if the cell's color is white or not to apply whiteCell style
     * @param inputColor - The color of the current cell
     * @returns - Whether the cell's color is white or not.
     */
    ColorPickerGridCellBase.prototype._isWhiteCell = function (inputColor) {
        var color = Object(_utilities_color_getColorFromString__WEBPACK_IMPORTED_MODULE_4__["getColorFromString"])(inputColor);
        return color.hex === 'ffffff';
    };
    ColorPickerGridCellBase.defaultProps = {
        circle: true,
        disabled: false,
        selected: false
    };
    return ColorPickerGridCellBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

//# sourceMappingURL=ColorPickerGridCell.base.js.map

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

/***/ "tIxf":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/getColorFromRGBA.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: getColorFromRGBA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColorFromRGBA", function() { return getColorFromRGBA; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "XfOK");
/* harmony import */ var _rgb2hsv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgb2hsv */ "Y5cc");
/* harmony import */ var _rgb2hex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rgb2hex */ "RDAZ");
/* harmony import */ var _rgbaOrHexString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_rgbaOrHexString */ "zGMj");




/** Converts an RGBA color to a color object (alpha defaults to 100). */
function getColorFromRGBA(rgba) {
    var _a = rgba.a, a = _a === void 0 ? _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"] : _a, b = rgba.b, g = rgba.g, r = rgba.r;
    var _b = Object(_rgb2hsv__WEBPACK_IMPORTED_MODULE_1__["rgb2hsv"])(r, g, b), h = _b.h, s = _b.s, v = _b.v;
    var hex = Object(_rgb2hex__WEBPACK_IMPORTED_MODULE_2__["rgb2hex"])(r, g, b);
    var str = Object(_rgbaOrHexString__WEBPACK_IMPORTED_MODULE_3__["_rgbaOrHexString"])(r, g, b, a, hex);
    return { a: a, b: b, g: g, h: h, hex: hex, r: r, s: s, str: str, v: v };
}
//# sourceMappingURL=getColorFromRGBA.js.map

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

/***/ "zGMj":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/color/_rgbaOrHexString.js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: _rgbaOrHexString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_rgbaOrHexString", function() { return _rgbaOrHexString; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "XfOK");

/**
 * @internal
 * Get a CSS color string from some color components.
 * If `a` is specified and not 100, returns an `rgba()` string.
 * Otherwise returns `hex` prefixed with #.
 */
function _rgbaOrHexString(r, g, b, a, hex) {
    return a === _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"] || typeof a !== 'number' ? "#" + hex : "rgba(" + r + ", " + g + ", " + b + ", " + a / _consts__WEBPACK_IMPORTED_MODULE_0__["MAX_COLOR_ALPHA"] + ")";
}
//# sourceMappingURL=_rgbaOrHexString.js.map

/***/ }),

/***/ "zkUL":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/office-ui-fabric-react/7.59.0_b00af71b99b3978738e618b37212a8b6/node_modules/office-ui-fabric-react/lib/utilities/grid/Grid.styles.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
var getStyles = function (props) {
    return {
        root: {
            padding: 2,
            outline: 'none'
        },
        tableCell: {
            padding: 0
        }
    };
};
//# sourceMappingURL=Grid.styles.js.map

/***/ })

}]);
//# sourceMappingURL=chunk.vendors~sp-rte-propertypane_c3add4a8f34393d29276.js.map