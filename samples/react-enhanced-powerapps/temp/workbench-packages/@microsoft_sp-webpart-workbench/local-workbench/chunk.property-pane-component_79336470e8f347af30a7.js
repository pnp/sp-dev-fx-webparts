(window["webpackJsonpf9e737b7_f0df_4597_ba8c_3060f82380db_1_11_0"] = window["webpackJsonpf9e737b7_f0df_4597_ba8c_3060f82380db_1_11_0"] || []).push([["property-pane-component"],{

/***/ "+ORw":
/*!************************************!*\
  !*** ./lib/common/KillSwitches.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.isOpenNewTabKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('0194dc88-4956-4aa7-867b-5a0d37338036'), '10/28/2019', 'Open new tab for PropertyPaneLink when target is _blank.');
    };
    KillSwitches.isDebounceRaiseEventKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('be0057f7-5d20-44aa-a73d-b16b2d34ccb7'), '07/16/2019', 'Debounce to raise the property pane changed event.');
    };
    return KillSwitches;
}());
/* harmony default export */ __webpack_exports__["default"] = (KillSwitches);


/***/ }),

/***/ "/zFp":
/*!**********************************************************************!*\
  !*** ./lib/propertyPaneGroup/PropertyPaneChoiceGroup.module.scss.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneChoiceGroup.module.css */ "SiUF");
var styles = {
    root: 'root_ac12c8d1',
    imageRoot: 'imageRoot_ac12c8d1',
    image: 'image_ac12c8d1',
    imageIsLoaded: 'imageIsLoaded_ac12c8d1',
    field: 'field_ac12c8d1',
    fieldIsChecked: 'fieldIsChecked_ac12c8d1',
    fieldIsDisabled: 'fieldIsDisabled_ac12c8d1',
    fieldIsImage: 'fieldIsImage_ac12c8d1',
    fieldIsIcon: 'fieldIsIcon_ac12c8d1',
    innerField: 'innerField_ac12c8d1',
    imageWrapper: 'imageWrapper_ac12c8d1',
    imageWrapperIsHidden: 'imageWrapperIsHidden_ac12c8d1',
    labelWrapper: 'labelWrapper_ac12c8d1',
    choiceFieldIsIcon: 'choiceFieldIsIcon_ac12c8d1',
    iconWrapper: 'iconWrapper_ac12c8d1',
    choiceFieldIsInFocus: 'choiceFieldIsInFocus_ac12c8d1',
    choiceFieldIsImage: 'choiceFieldIsImage_ac12c8d1'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "2UVN":
/*!********************************************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/dynamicDataWidgetProperty/DynamicDataWidgetProperty.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dropdown/Dropdown */ "Ry80");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../loc/Strings.resx */ "qITA");
/* harmony import */ var _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../propertyPaneFields/propertyPaneField/IPropertyPaneField */ "jVqW");
/* harmony import */ var _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../DynamicDataWidget.module.scss */ "3/fy");
/* harmony import */ var _dynamicDataWidgetEntry_DynamicDataWidgetEntry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dynamicDataWidgetEntry/DynamicDataWidgetEntry */ "iyMd");









var DynamicDataWidgetProperty = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DynamicDataWidgetProperty, _super);
    function DynamicDataWidgetProperty(props) {
        var _this = _super.call(this, props) || this;
        _this._selectedPropertyText = '';
        // Set the selected property.
        _this.state = {
            selectedPropertyId: _this._getSelectedPropertyId()
        };
        return _this;
    }
    /**
     * When a source change is detected we reset the selected property id, unless
     * component provides a property id filter.
     *
     * @param newProps - new props.
     */
    DynamicDataWidgetProperty.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        if (this.props.selectedSource.id !== newProps.selectedSource.id) {
            this.setState({
                selectedPropertyId: this._getPropertyIdFilter(newProps.selectedSource) || ''
            });
        }
    };
    DynamicDataWidgetProperty.prototype.render = function () {
        var propertyIdFilter = this._getPropertyIdFilter();
        return (react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", null,
            !propertyIdFilter && this._renderPropertyDropdown(),
            this._renderWidgetEntries()));
    };
    /**
     * Renders the property dropdown.
     *
     * If property id filter is specified then we hide the property dropdown.
     */
    DynamicDataWidgetProperty.prototype._renderPropertyDropdown = function () {
        var _this = this;
        var selectedPropertyId = this.state.selectedPropertyId;
        return (react__WEBPACK_IMPORTED_MODULE_4__["createElement"](office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_3__["Dropdown"], { label: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].DynamicDataPropertiesDropdownLabel, this.props.selectedSource.metadata.title), onChanged: function (option) {
                _this.setState({
                    selectedPropertyId: option.key
                });
            }, options: this._getPropertyDropdownOptions(), selectedKey: selectedPropertyId, "data-automation-id": 'DynamicDataWidgetSourceProperties' }));
    };
    DynamicDataWidgetProperty.prototype._renderWidgetEntries = function () {
        var _this = this;
        var widgetEntries = [];
        this.props.entries.forEach(function (entry) {
            var _a = entry.properties, propertyValueDepth = _a.propertyValueDepth, label = _a.label;
            var currentKey = _this.props.parentKey + '-dynamicDataWidgetEntry' + widgetEntries.length;
            widgetEntries.push(react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", { key: currentKey },
                _this.state.selectedPropertyId &&
                    _this.props.entries.length > 1 &&
                    // If propertyValueDepth is more than 0(undefined means use default, which is 2), then we should
                    // display the label per entry.
                    (propertyValueDepth !== 0) &&
                    react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].entryLabel }, label),
                react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_dynamicDataWidgetEntry_DynamicDataWidgetEntry__WEBPACK_IMPORTED_MODULE_8__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, entry, { parentKey: currentKey, selectedSource: _this.props.selectedSource, selectedPropertyText: _this._selectedPropertyText, selectedPropertyId: _this.state.selectedPropertyId, dynamicDataProvider: _this.props.dynamicDataProvider, onChange: _this.props.onChange, propertyValueDepth: propertyValueDepth }))));
        });
        return widgetEntries;
    };
    /**
     * Returns the property id, if the component decides to filter by the property id and checks
     * if the current selected source has that proeprty, if yes then it is a valid filter, else returns undefined.
     */
    DynamicDataWidgetProperty.prototype._getPropertyIdFilter = function (selectedSource) {
        var _this = this;
        var propertyIdFilter;
        if (this.props.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_6__["PropertyPaneFieldType"].DynamicField) {
            var filters = this.props.fieldProperties.filters;
            propertyIdFilter = filters && filters.propertyId;
        }
        else {
            var sharedConfiguration = this.props.fieldProperties.sharedConfiguration;
            propertyIdFilter = sharedConfiguration &&
                sharedConfiguration.property &&
                sharedConfiguration.property.filters &&
                sharedConfiguration.property.filters.propertyId;
        }
        if (propertyIdFilter) {
            selectedSource = selectedSource || this.props.selectedSource;
            // If the currently selected source has 'propertyIdFilter' as a property then it is a valid filter.
            var result_1 = '';
            var propertyDefs = selectedSource.getPropertyDefinitions();
            propertyDefs.forEach(function (propertyDef) {
                if (propertyDef.id === propertyIdFilter) {
                    result_1 = propertyIdFilter;
                    _this._selectedPropertyText = propertyDef.title;
                }
            });
            propertyIdFilter = result_1;
        }
        return propertyIdFilter;
    };
    /**
     * Retuns dropdown options with id-title pairs for all availables properties for a specified DD source.
     */
    DynamicDataWidgetProperty.prototype._getPropertyDropdownOptions = function () {
        var selectedPropertyId = this.state.selectedPropertyId;
        var propertyDefinitions = this.props.selectedSource.getPropertyDefinitions();
        var options = [];
        for (var _i = 0, propertyDefinitions_1 = propertyDefinitions; _i < propertyDefinitions_1.length; _i++) {
            var propertyDef = propertyDefinitions_1[_i];
            options.push({ key: propertyDef.id, text: propertyDef.title });
            if (propertyDef.id === selectedPropertyId) {
                this._selectedPropertyText = propertyDef.title;
            }
        }
        return options;
    };
    /**
     * Returns the selected property id.
     *
     * If the currently selected source has a property id, which is specified
     * in the filters, then it is a valid property id to be selected.
     * Else, if the value
     */
    DynamicDataWidgetProperty.prototype._getSelectedPropertyId = function () {
        var _this = this;
        var selectedSourceId = this.props.selectedSource.id;
        var source = this.props.dynamicDataProvider.tryGetSource(selectedSourceId);
        var selectedPropertyId = this._getPropertyIdFilter();
        if (!selectedPropertyId) {
            if (this.props.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_6__["PropertyPaneFieldType"].DynamicField) {
                selectedPropertyId = this.props.entries[0].value._getProperty();
            }
            else { // DynamicFieldSet
                var entries = this.props.entries;
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    if (entries[0].value._getProperty() !== entry.value._getProperty()) {
                        selectedPropertyId = '';
                        break;
                    }
                    else {
                        selectedPropertyId = entries[0].value._getProperty();
                    }
                }
            }
        }
        // If the selectedProperty is an array type, then the selectedPropertyId will be of the type
        // <propertyName>[*]. Hence extracting the property name, accordingly.
        selectedPropertyId = selectedPropertyId && selectedPropertyId.split(/\[|\]/)[0];
        // If the currently selected source has 'selectedPropertyId' as a property
        // then it is a valid property id to be selected.
        var result = '';
        var propertyDefs = source.getPropertyDefinitions();
        propertyDefs.forEach(function (propertyDef) {
            if (propertyDef.id === selectedPropertyId) {
                result = selectedPropertyId;
                _this._selectedPropertyText = propertyDef.title;
            }
        });
        return result;
    };
    return DynamicDataWidgetProperty;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataWidgetProperty);


/***/ }),

/***/ "3/fy":
/*!**********************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/DynamicDataWidget.module.scss.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./DynamicDataWidget.module.css */ "wJEm");
var styles = {
    dynamicDataWidget: 'dynamicDataWidget_bef01b90',
    entryLabel: 'entryLabel_bef01b90'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "324L":
/*!*********************************!*\
  !*** ./lib/utils/CanvasA11y.js ***!
  \*********************************/
/*! exports provided: KeyCodes, isEscape, isEnter, isShiftTab, isTab, isKey, getFocusableChildren, isElementFocusable, getFocusableParent, getFirstFocusableChild, getFocusableDescendants, getFocusableSiblings, getNextFocusableElement, getPrevFocusableElement, isElementFocusableChildOf, navigateInside, navigateTo, navigateOutOf, CanvasA11yManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return KeyCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEscape", function() { return isEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnter", function() { return isEnter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShiftTab", function() { return isShiftTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTab", function() { return isTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKey", function() { return isKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableChildren", function() { return getFocusableChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementFocusable", function() { return isElementFocusable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableParent", function() { return getFocusableParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstFocusableChild", function() { return getFirstFocusableChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableDescendants", function() { return getFocusableDescendants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFocusableSiblings", function() { return getFocusableSiblings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextFocusableElement", function() { return getNextFocusableElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrevFocusableElement", function() { return getPrevFocusableElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementFocusableChildOf", function() { return isElementFocusableChildOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateInside", function() { return navigateInside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return navigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateOutOf", function() { return navigateOutOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasA11yManager", function() { return CanvasA11yManager; });
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["Enter"] = 13] = "Enter";
    KeyCodes[KeyCodes["Escape"] = 27] = "Escape";
    KeyCodes[KeyCodes["Tab"] = 9] = "Tab";
    KeyCodes[KeyCodes["F10"] = 121] = "F10";
    KeyCodes[KeyCodes["P"] = 80] = "P";
})(KeyCodes || (KeyCodes = {}));
function isEscape(e) {
    return isKey(KeyCodes.Escape, e);
}
function isEnter(e) {
    return isKey(KeyCodes.Enter, e);
}
function isShiftTab(e) {
    return isKey(KeyCodes.Tab, e, false, false, true);
}
function isTab(e) {
    return isKey(KeyCodes.Tab, e);
}
function isKey(
/* tslint:disable-next-line:no-any */
keyCode, e, allowAlt, allowCtrl, allowShift) {
    if (allowAlt === void 0) { allowAlt = false; }
    if (allowCtrl === void 0) { allowCtrl = false; }
    if (allowShift === void 0) { allowShift = false; }
    return e.keyCode === keyCode &&
        ((allowAlt && e.altKey) || (!allowAlt && !e.altKey)) &&
        ((allowCtrl && e.ctrlKey) || (!allowCtrl && !e.ctrlKey)) &&
        ((allowShift && e.shiftKey) || (!allowShift && !e.shiftKey));
}
function getFocusableChildren(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var children = [];
    for (var _i = 0, _a = getFocusableDescendants(elem, ignoreTabIndex); _i < _a.length; _i++) {
        var descendant = _a[_i];
        if (isElementFocusableChildOf(descendant, elem)) {
            children.push(descendant);
        }
    }
    return children;
}
function isElementFocusable(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var tagName = elem.tagName.toLowerCase();
    if (elem && !elem.hidden && elem.offsetParent && window.getComputedStyle(elem).display !== 'none') {
        var hasTabIndex = elem.hasAttribute('tabindex');
        // If TabIndex exists, then we can assume elem.getAttribute is not null
        var tabindex = hasTabIndex ? parseInt(elem.getAttribute('tabindex'), 10) : NaN;
        if (!ignoreTabIndex && hasTabIndex && tabindex < 0) {
            return false;
        }
        if (tagName === 'a' && !!elem.href ||
            elem.isContentEditable) {
            return true;
        }
        if ((tagName === 'button' ||
            tagName === 'input' ||
            tagName === 'select' ||
            tagName === 'textarea') && !elem.disabled) {
            return true;
        }
        /**
         * There are few cases like office-ui-fabric-react's dropdown control, which do not
         * use the conventional HTML elements to create dropdown. Instead they are using a
         * data attribute 'is-focusable' and making it focusable. Hence to respect those elements
         * added this check. Check this only when the 'ignoreTabIndex' is true, this is because when
         * user doesn't want to ignore tabindexes then tabindex will get preference over this attribute.
         */
        if (ignoreTabIndex && elem.getAttribute('data-is-focusable') === 'true') {
            return true;
        }
        if (!ignoreTabIndex && hasTabIndex && tabindex > -1) {
            return true;
        }
    }
    return false;
}
function getFocusableParent(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var parent = elem;
    do {
        // Impossible for parent to become null.
        parent = parent.parentElement;
    } while (parent &&
        !isElementFocusable(parent) &&
        !parent.isEqualNode(topElement) &&
        !parent.isEqualNode(document.body));
    return parent;
}
function queryFocusableSelector(elem) {
    var selector = 'button,input,textarea,select,a[href]:not([href=\'\']),\
      [tabindex],[contenteditable=\'true\'], [data-is-focusable=\'true\']';
    var nodes = elem.querySelectorAll(selector);
    return Array.prototype.slice.call(nodes);
}
function getFirstFocusableChild(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var elements = queryFocusableSelector(elem);
    var focusableElements = elements.filter(function (element) { return isElementFocusable(element, ignoreTabIndex); });
    // If the first focusable node is a radio input, we focus on the first checked one.
    // If there is no checked radio input, the first radio input will be focused.
    var firstFocusableElement = focusableElements[0];
    if (firstFocusableElement instanceof HTMLInputElement && firstFocusableElement.type === 'radio') {
        var results = focusableElements.filter(function (element) {
            return element instanceof HTMLInputElement &&
                element.name === firstFocusableElement.name &&
                element.checked;
        });
        return results[0] || firstFocusableElement;
    }
    return firstFocusableElement;
}
function getFocusableDescendants(elem, ignoreTabIndex) {
    if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
    var descendants = [];
    var nodes = queryFocusableSelector(elem);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (isElementFocusable(node, ignoreTabIndex)) {
            descendants.push(node);
        }
    }
    return descendants;
}
function getFocusableSiblings(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var children = getFocusableChildren(getFocusableParent(elem, topElement));
    // Remove input element and start the list from its next sibling
    var siblings = [];
    var insertPointer = 0;
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        if (!child.isEqualNode(elem)) {
            siblings.splice(insertPointer++, 0, child);
        }
        else {
            insertPointer = 0;
        }
    }
    return siblings;
}
function getNextFocusableElement(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var siblings = getFocusableSiblings(elem, topElement);
    return siblings[0];
}
function getPrevFocusableElement(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    var siblings = getFocusableSiblings(elem, topElement);
    return siblings[siblings.length - 1];
}
function isElementFocusableChildOf(elem, ancestor) {
    var parent = elem.parentElement;
    while (parent && parent.tagName !== 'BODY') {
        if (parent.isEqualNode(ancestor)) {
            return true;
        }
        if (isElementFocusable(parent)) {
            break;
        }
        parent = parent.parentElement;
    }
    return false;
}
function navigateInside(elem) {
    var children = getFocusableChildren(elem);
    if (children.length) {
        children[0].focus();
        return true;
    }
    else {
        return false;
    }
}
function navigateTo(elem) {
    if (elem && isElementFocusable(elem)) {
        elem.focus();
        return true;
    }
    else {
        return navigateInside(elem);
    }
}
function navigateOutOf(elem, topElement) {
    if (topElement === void 0) { topElement = document.body; }
    topElement = topElement || document.body;
    getFocusableParent(elem, topElement).focus();
}
var CanvasA11yManager = /** @class */ (function () {
    function CanvasA11yManager(canvasElement, shouldHandleKeyDown) {
        if (shouldHandleKeyDown === void 0) { shouldHandleKeyDown = true; }
        this._canvasElement = canvasElement;
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._randId = Math.floor(Math.random() * 1000000);
        if (shouldHandleKeyDown) {
            this._canvasElement.addEventListener('keydown', this._handleKeyDown);
        }
    }
    CanvasA11yManager.prototype.ariaAlert = function (message) {
        var divId = 'aria_alert_' + this._randId;
        var oldAlert = document.querySelector('#' + divId);
        if (oldAlert) {
            document.body.removeChild(oldAlert);
        }
        var alertNode = document.createElement('p');
        alertNode.classList.add('Canvas-screenReaderOnly');
        alertNode.setAttribute('role', 'alert');
        alertNode.setAttribute('id', divId);
        var alertText = document.createTextNode(message);
        alertNode.appendChild(alertText);
        document.body.appendChild(alertNode);
    };
    CanvasA11yManager.prototype.navigateInside = function (elem) {
        return navigateInside(elem);
    };
    CanvasA11yManager.prototype.navigateTo = function (elem) {
        return navigateTo(elem);
    };
    CanvasA11yManager.prototype.navigateOutOf = function (elem) {
        navigateOutOf(elem);
    };
    CanvasA11yManager.prototype.clearState = function () {
        this._savedFocusedElement = undefined;
    };
    CanvasA11yManager.prototype.restoreState = function () {
        return this._savedFocusedElement ? this.navigateTo(this._savedFocusedElement) : false;
    };
    CanvasA11yManager.prototype.saveState = function (elem) {
        elem = elem || document.activeElement;
        this._savedFocusedElement = elem;
    };
    CanvasA11yManager.prototype.skipEvent = function (e) {
        e[CanvasA11yManager._SKIP_FLAG] = true;
    };
    CanvasA11yManager.prototype._shouldSkipEvent = function (e) {
        return e[CanvasA11yManager._SKIP_FLAG];
    };
    CanvasA11yManager.prototype._handleKeyDown = function (e) {
        if (this._shouldSkipEvent(e)) {
            return;
        }
        var currentElement = isElementFocusable(e.target) ?
            e.target : getFocusableParent(e.target, this._canvasElement);
        var elementToGo;
        if (currentElement) {
            if (isTab(e)) {
                var children = getFocusableChildren(this._canvasElement);
                if (children.length && !currentElement.isEqualNode(children[children.length - 1])) {
                    elementToGo = getNextFocusableElement(currentElement, this._canvasElement);
                }
            }
            else if (isShiftTab(e)) {
                var children = getFocusableChildren(this._canvasElement);
                if (children.length && !currentElement.isEqualNode(children[0])) {
                    elementToGo = getPrevFocusableElement(currentElement, this._canvasElement);
                }
            }
            else if (isEnter(e)) {
                var children = getFocusableChildren(currentElement);
                elementToGo = children.length ? children[0] : undefined;
            }
            else if (isEscape(e)) {
                elementToGo = getFocusableParent(currentElement, this._canvasElement);
            }
        }
        if (elementToGo) {
            elementToGo.focus();
            e.preventDefault();
            e.stopPropagation();
        }
    };
    CanvasA11yManager._SKIP_FLAG = 'a11y-skip';
    return CanvasA11yManager;
}());



/***/ }),

/***/ "4hdG":
/*!**********************************************************************************!*\
  !*** ./lib/propertyPaneConditionalGroup/PropertyPaneConditionalGroup.module.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneConditionalGroup.module.css */ "bo8A");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "5/Pe":
/*!******************************************************!*\
  !*** ./lib/propertyPaneFooter/PropertyPaneFooter.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../loc/Strings.resx */ "qITA");
/* harmony import */ var _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PropertyPaneFooter.module.scss */ "lWt6");
/* harmony import */ var _propertyPane_PropertyPane__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../propertyPane/PropertyPane */ "75EL");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPaneFooter.tsx
 */








var PropertyPaneFooter = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPaneFooter, _super);
    function PropertyPaneFooter(props) {
        var _this = _super.call(this, props) || this;
        _this._renderCommandButtons = _this._renderCommandButtons.bind(_this);
        _this._pageNavigationButtons = _this._pageNavigationButtons.bind(_this);
        return _this;
    }
    PropertyPaneFooter.prototype.render = function () {
        return ((!this.props.isReactive || this.props.numberOfPages > 1) && (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPaneFooter },
            this._renderCommandButtons(),
            this._pageNavigationButtons()))); // tslint:disable-line:no-any
    };
    PropertyPaneFooter.prototype._renderCommandButtons = function () {
        // We are specifically checking for 'false' because there are cases where the prop can have
        // 'undefined' as it's value and we do not want to display the command buttons in that case.
        return ((this.props.isReactive === false) && (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: this.props.numberOfPages > 1 ? _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPaneCommandButtonsBox : undefined },
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["PrimaryButton"], { "data-automation-id": 'propertyPaneApplyButton', disabled: !this.props.isSaveButtonEnabled, onClick: this.props.onSaveClick, ariaDescription: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ApplyButtonAriaDescription }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].Save)))); // tslint:disable-line:no-any
    };
    PropertyPaneFooter.prototype._pageNavigationButtons = function () {
        var _this = this;
        return (this.props.numberOfPages > 1 && (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { className: _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPanePageNav },
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("button", { className: _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPaneBackNavLink, disabled: this.props.currentPage === 1, onClick: function () { _this.props.onFlipPage(_propertyPane_PropertyPane__WEBPACK_IMPORTED_MODULE_7__["PageDirection"].back); } },
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("i", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(this._arrowKeyIcon(_propertyPane_PropertyPane__WEBPACK_IMPORTED_MODULE_7__["PageDirection"].back), _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPaneBackArrow) }),
                _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].PropertyPaneBackPage),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("span", { role: 'status', className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(_PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPanePageOfPages) }, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].PropertyPanePageOfPages, this.props.currentPage, this.props.numberOfPages)),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("button", { className: _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPaneNextNavLink, disabled: this.props.currentPage === this.props.numberOfPages, onClick: function () { _this.props.onFlipPage(_propertyPane_PropertyPane__WEBPACK_IMPORTED_MODULE_7__["PageDirection"].next); } },
                _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].PropertyPaneNextPage,
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("i", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(this._arrowKeyIcon(_propertyPane_PropertyPane__WEBPACK_IMPORTED_MODULE_7__["PageDirection"].next), _PropertyPaneFooter_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].propertyPaneNextArrow) }))))); // tslint:disable-line:no-any
    };
    PropertyPaneFooter.prototype._arrowKeyIcon = function (dir) {
        var rtl = document.dir === 'rtl';
        var chevronRightIcon = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["getIconClassName"])('ChevronRight');
        var chevronLeftIcon = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["getIconClassName"])('ChevronLeft');
        if (dir === _propertyPane_PropertyPane__WEBPACK_IMPORTED_MODULE_7__["PageDirection"].back) {
            return rtl ? chevronRightIcon : chevronLeftIcon;
        }
        else {
            return rtl ? chevronLeftIcon : chevronRightIcon;
        }
    };
    PropertyPaneFooter = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], PropertyPaneFooter);
    return PropertyPaneFooter;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneFooter);


/***/ }),

/***/ "75EL":
/*!******************************************!*\
  !*** ./lib/propertyPane/PropertyPane.js ***!
  \******************************************/
/*! exports provided: PageDirection, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageDirection", function() { return PageDirection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_Compare__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/Compare */ "RckX");
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/KillSwitches */ "+ORw");
/* harmony import */ var _propertyPanePage_PropertyPanePage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../propertyPanePage/PropertyPanePage */ "b0Og");
/* harmony import */ var _propertyPaneTitleBar_PropertyPaneTitleBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../propertyPaneTitleBar/PropertyPaneTitleBar */ "mvqF");
/* harmony import */ var _propertyPaneFooter_PropertyPaneFooter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../propertyPaneFooter/PropertyPaneFooter */ "5/Pe");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../loc/Strings.resx */ "qITA");
/* harmony import */ var _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PropertyPane.module.scss */ "HYOZ");
/* harmony import */ var _propertyPanePage_PropertyPanePage_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../propertyPanePage/PropertyPanePage.module.scss */ "Q0G7");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_CanvasA11y__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utils/CanvasA11y */ "324L");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Root component of the inbuilt webpart property configuration user experience.
 *
 */














// VSO: Bug 227235 Remove this dependency on Canvas11y


/**
 * Page direction.
 */
var PageDirection;
(function (PageDirection) {
    PageDirection[PageDirection["back"] = -1] = "back";
    PageDirection[PageDirection["next"] = 1] = "next";
})(PageDirection || (PageDirection = {}));
/**
 * A constant value to delay the clearing of save confirmation message.
 */
var CLEAR_DELAY = 100;
/**
 * A constant value to set when there is no web part to configure.
 */
var NO_WEBPART_ID = 'No_Web_Part_ID';
var DELAY_RAISE_EVENT_IN_MILLISECONDS = 500;
/**
 * Propertypane component.
 *
 * @internal
 */
var PropertyPane = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPane, _super);
    /**
     * Constructor to instantiate the propertypane component.
     */
    function PropertyPane(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isSaveButtonEnabled: false,
            saveConfirmationMessage: '',
            currentPage: 1
        };
        _this._currentlyConfiguredWebPartId = props.data.webPartId;
        // method bindings.
        _this._onChange = _this._onChange.bind(_this);
        _this._onPropertyPaneKeyDown = _this._onPropertyPaneKeyDown.bind(_this);
        _this._flipPage = _this._flipPage.bind(_this);
        _this._handleSaveClick = _this._handleSaveClick.bind(_this);
        _this._handleCloseClick = _this._handleCloseClick.bind(_this);
        _this._propertyPaneShouldLooseFocus = _this._propertyPaneShouldLooseFocus.bind(_this);
        _this._setContainerDiv = _this._setContainerDiv.bind(_this);
        _this._propertyPaneGroupStateChanged = _this._propertyPaneGroupStateChanged.bind(_this);
        _this._raiseEventImpl = _this._raiseEventImpl.bind(_this);
        _this._debounceCallbacks = new Map();
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_7__["default"].isDebounceRaiseEventKillSwitchActivated()) {
            var _a = _this.props.data.configuration.debounceProperties, debounceProperties = _a === void 0 ? [] : _a;
            for (var _i = 0, debounceProperties_1 = debounceProperties; _i < debounceProperties_1.length; _i++) {
                var p = debounceProperties_1[_i];
                var propertyName = p.propertyName, _b = p.debouncePeriod, debouncePeriod = _b === void 0 ? DELAY_RAISE_EVENT_IN_MILLISECONDS : _b;
                _this._debounceCallbacks.set(propertyName, Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_5__["debounce"])(_this._raiseEventImpl, debouncePeriod, { leading: true, trailing: true }));
            }
        }
        _this._invalidEntries = {};
        _this._propertyPanePagesStateMap = {};
        return _this;
    }
    PropertyPane_1 = PropertyPane;
    /**
     * React component lifecycle event.
     * @param props - new props for the component.
     */
    PropertyPane.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        if (props.data.shouldResetState) {
            // resetting the map data.
            this._propertyPanePagesStateMap = {};
        }
        if (this._currentlyConfiguredWebPartId !== props.data.webPartId || props.data.shouldResetState) {
            var webPartId = props.data.webPartId ? props.data.webPartId : NO_WEBPART_ID;
            this._resetState(webPartId);
        }
        else {
            this.setState({
                saveConfirmationMessage: ''
            });
        }
    };
    PropertyPane.prototype.componentDidMount = function () {
        // @todo: for some god forsaken reason the z-index in the class does not apply. Hence this hack
        // Some react thing that I don't have time to dig into right now. Perhaps later.
        var domNode = react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"](this);
        domNode.style.zIndex = '999';
        if (this.props.data.onRendered) {
            this.props.data.onRendered();
        }
        // This is the hack to workaround a react bug that doesn't set the focus in componentDidMount properly
        // VSO:Bug 215692 Remove the hack and implement focus methods in fabric react
        this._setTimeOutForFocus();
    };
    PropertyPane.prototype.componentDidUpdate = function (props) {
        if (this._isPropertyPaneReplaced) {
            this._updateTabIndexes(0, true);
            this._isPropertyPaneReplaced = false;
        }
        /**
         * From framework standpoint, we do not want to allow this event handler to be passed in, and trigger it.
         *
         * This api should be deprecated and then removed as part of refactoring.
         */
        if (this.props.data.onRendered) {
            this.props.data.onRendered();
        }
    };
    /**
     * React component lifecycle method.
     * Added this method to avoid, unnecessary renders.
     */
    PropertyPane.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return !_utils_Compare__WEBPACK_IMPORTED_MODULE_6__["default"].shallowCompare(this.props, nextProps) ||
            !_utils_Compare__WEBPACK_IMPORTED_MODULE_6__["default"].shallowCompare(this.state, nextState) ||
            // Need the !! to ensure undefined is properly converted
            !!(nextProps.data.configuration && nextProps.data.configuration.showLoadingIndicator);
    };
    PropertyPane.prototype.render = function () {
        var _this = this;
        this._properties = this.props.data.properties;
        var showOverlaySpinner = this.props.data.configuration && this.props.data.configuration.showLoadingIndicator;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["Fabric"], { "data-sp-feature-tag": 'Property Pane', "data-sp-feature-instance-id": '_Property Pane' },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { role: 'alert', "aria-live": 'polite', className: _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].propertyPaneScreenReaderOnly },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, this.state.saveConfirmationMessage)),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["FocusTrapZone"], { isClickableOutsideFocusTrap: true, firstFocusableSelector: this._cssClassForActionableElement, forceFocusInsideTrap: false },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: this.props.renderNarrow ?
                        _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].propertyPaneNarrow :
                        _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].propertyPane, role: 'dialog', "aria-label": _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_4__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].PropertyPaneTitle, this.props.data.title), "aria-describedby": this._descriptionId, ref: function (c) { return _this._propertyPane = c; }, onKeyDown: this._onPropertyPaneKeyDown, key: this.props.data.webPartId },
                    showOverlaySpinner && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["Overlay"], { className: _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].overlay },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["Spinner"], { className: _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].spinner, type: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["SpinnerType"].large, label: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].PropertyPaneFetchingSettingsDataLabel }))),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_propertyPaneTitleBar_PropertyPaneTitleBar__WEBPACK_IMPORTED_MODULE_9__["default"], { title: this.props.data.title, onClose: this._handleCloseClick }),
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, this._shouldRenderEmptyPage ? this._renderNoConfigurationState() : this._renderPage())))));
    };
    /**
     * Renders the description for no configuration scenario.
     */
    PropertyPane.prototype._renderNoConfigurationState = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, this.props.children),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { role: 'alert', "aria-live": 'polite', className: _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].propertyPaneDescription, "data-automation-id": 'noConfigurationPropertyPane' }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].PropertyPaneEmptyStateDescription)));
    };
    Object.defineProperty(PropertyPane.prototype, "_descriptionId", {
        get: function () {
            var page = undefined;
            if (this.props.data.configuration && this.props.data.configuration.pages) {
                var pages = this.props.data.configuration.pages;
                page = pages[this.state.currentPage - 1];
            }
            return (page && page.header && page.header.description) ? 'propertyPaneDescriptionId' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Renders page on the property pane.
     */
    PropertyPane.prototype._renderPage = function () {
        var _this = this;
        var pages = this.props.data.configuration.pages;
        var page = pages[this.state.currentPage - 1];
        var classForPropertyPanePageContentBottom = this._getCssBottomValueForPageContentElement();
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["css"])(classForPropertyPanePageContentBottom, _propertyPanePage_PropertyPanePage_module_scss__WEBPACK_IMPORTED_MODULE_13__["default"].propertyPanePageContent) },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, this.props.children),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_propertyPanePage_PropertyPanePage__WEBPACK_IMPORTED_MODULE_8__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props.data, { pageNumber: this.state.currentPage, pageDescription: page.header ? page.header.description : '', displayGroupsAsAccordion: page.displayGroupsAsAccordion || false, onChange: this._onChange.bind(this), propertyGroups: page.groups, properties: this._properties, setEntryState: function (targetProperty, isValidEntry) {
                        _this._setEntryState(targetProperty, isValidEntry);
                    }, setContainerDiv: this._setContainerDiv, propertyPaneGroupStateChanged: this._propertyPaneGroupStateChanged, propertyPanePagesStateMap: this._propertyPanePagesStateMap, dynamicConfiguration: this.props.data.dynamicConfiguration }))),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_propertyPaneFooter_PropertyPaneFooter__WEBPACK_IMPORTED_MODULE_10__["default"], { isReactive: this.props.data.isReactive || false, isSaveButtonEnabled: this.state.isSaveButtonEnabled, numberOfPages: (this.props.data.configuration &&
                    this.props.data.configuration.pages &&
                    this.props.data.configuration.pages.length) ? this.props.data.configuration.pages.length : 0, currentPage: this.state.currentPage, onSaveClick: this._handleSaveClick, onFlipPage: this._flipPage })));
    };
    PropertyPane.prototype._setContainerDiv = function (containerDiv) {
        this._propertyPaneContent = containerDiv;
    };
    /**
     * Private method which gets called when user manually collapses or opens the propertyPane group,
     * when the Propertypane page's displayGroupsAsAccordion prop is true.
     *
     * @param pageNumber - page on which the group's state changed.
     * @param groupName - name of the group.
     * @param isCollapsed - indicates whether the group is collapsed or not.
     */
    PropertyPane.prototype._propertyPaneGroupStateChanged = function (pageNumber, groupName, isCollapsed) {
        if (!this._propertyPanePagesStateMap[pageNumber]) {
            this._propertyPanePagesStateMap[pageNumber] = {};
        }
        this._propertyPanePagesStateMap[pageNumber][groupName] = isCollapsed;
    };
    Object.defineProperty(PropertyPane.prototype, "_shouldRenderEmptyPage", {
        /**
         * Returns if the empty page should be rendered in property pane.
         */
        get: function () {
            return (!this.props.data.configuration ||
                !this.props.data.configuration.pages ||
                this.props.data.configuration.pages.length === 0 ||
                !this.props.data.configuration.pages[this.state.currentPage - 1].groups ||
                this.props.data.configuration.pages[this.state.currentPage - 1].groups.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Flips the page based on the direction.
     * @param direction - direction of the page flip. Positive value is forward direction, negative is backwards.
     */
    PropertyPane.prototype._flipPage = function (direction) {
        var page = this.state.currentPage + direction;
        this.setState({
            currentPage: page
        });
        // trigger rendering the page
        if (this.props.data.render) {
            this.props.data.render();
        }
        this._setTimeOutForFocus();
    };
    PropertyPane.prototype._setEntryState = function (targetProperty, isValidEntry) {
        // maintain the list of invalid entries
        if (isValidEntry) {
            if (this._invalidEntries.hasOwnProperty(targetProperty)) {
                delete this._invalidEntries[targetProperty];
            }
        }
        else {
            this._invalidEntries[targetProperty] = !isValidEntry;
        }
    };
    PropertyPane.prototype._enableSaveButton = function (enabled) {
        this.setState({
            isSaveButtonEnabled: enabled
        });
    };
    /* tslint:disable-next-line:no-any */
    PropertyPane.prototype._onChange = function (targetProperty, value, fieldType) {
        this._properties[targetProperty] = value;
        // enable the save button in Reactive mode if there are no invalid entries
        if (!this.props.data.isReactive) {
            this._enableSaveButton(Object.keys(this._invalidEntries).length === 0);
        }
        if (!this._invalidEntries.hasOwnProperty(targetProperty)) {
            this._raiseEvent(targetProperty, value, fieldType);
        }
    };
    PropertyPane.prototype._handleSaveClick = function () {
        var _this = this;
        this.setState({
            saveConfirmationMessage: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_11__["default"].SaveConfirmation
        });
        this._enableSaveButton(false);
        setTimeout(function () {
            _this.setState({
                saveConfirmationMessage: ''
            });
        }, CLEAR_DELAY);
        this.props.data.onConfigurationEvent(5 /* ApplyClicked */);
    };
    PropertyPane.prototype._handleCloseClick = function () {
        this._resetState(NO_WEBPART_ID);
        this._updateTabIndexes(-1, false);
        this.props.data.onConfigurationEvent(4 /* Closed */);
    };
    /* tslint:disable-next-line:no-any */
    PropertyPane.prototype._raiseEventImpl = function (targetProperty, value, fieldType) {
        this.props.data.onPropertyPaneFieldChanged(targetProperty, value, fieldType);
    };
    /* tslint:disable-next-line:no-any */
    PropertyPane.prototype._raiseEvent = function (targetProperty, value, fieldType) {
        if (!_common_KillSwitches__WEBPACK_IMPORTED_MODULE_7__["default"].isDebounceRaiseEventKillSwitchActivated()) {
            var fn = this._debounceCallbacks.get(targetProperty) ||
                this._raiseEventImpl;
            fn(targetProperty, value, fieldType);
        }
        else {
            this.props.data.onPropertyPaneFieldChanged(targetProperty, value, fieldType);
        }
    };
    /* tslint:disable-next-line:no-any */
    PropertyPane.prototype._onPropertyPaneKeyDown = function (ev) {
        if (Object(_utils_CanvasA11y__WEBPACK_IMPORTED_MODULE_15__["isKey"])(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_14__["KeyCodes"].escape, ev) && !ev.defaultPrevented) {
            ev.preventDefault();
            this._handleCloseClick();
        }
        else if (Object(_utils_CanvasA11y__WEBPACK_IMPORTED_MODULE_15__["isKey"])(_utils_CanvasA11y__WEBPACK_IMPORTED_MODULE_15__["KeyCodes"].P, ev, true)) {
            ev.preventDefault();
            this._propertyPaneShouldLooseFocus();
        }
    };
    /**
     * Handles the case when the user presses 'Alt + P'(it's the key combination to toggle the PropertyPane focus)
     * while the Propertypane is in focus.
     *
     * @private
     */
    PropertyPane.prototype._propertyPaneShouldLooseFocus = function () {
        this._resetState(NO_WEBPART_ID);
        this._updateTabIndexes(-1, false);
        this.props.data.onConfigurationEvent(6 /* LostFocus */);
    };
    PropertyPane.prototype._setTimeOutForFocus = function () {
        var _this = this;
        if (!this._isManagingFocusBySettings) {
            setTimeout(function () {
                var propertyPane = _this._shouldRenderEmptyPage ?
                    _this._propertyPane : _this._propertyPaneContent;
                _this._focusOnFirstActionableElement(propertyPane);
            }, 0);
        }
    };
    Object.defineProperty(PropertyPane.prototype, "_isManagingFocusBySettings", {
        get: function () {
            return this.props.data.configuration &&
                this.props.data.configuration.pages &&
                this.props.data.configuration.pages
                    .some(function (page) { return page.groups
                    .some(function (group) {
                    // Checking if the group is PropertyPaneConditionalGroup, if yes then extracting
                    // the required group from it.
                    if ('primaryGroup' in group) {
                        var _a = group, primaryGroup = _a.primaryGroup, secondaryGroup = _a.secondaryGroup, showSecondaryGroup = _a.showSecondaryGroup;
                        group = showSecondaryGroup ? secondaryGroup : primaryGroup;
                    }
                    group = group;
                    return group.groupFields
                        // tslint:disable-next-line:no-any
                        .some(function (groupField) { return groupField.shouldFocus || false; });
                }); });
        },
        enumerable: true,
        configurable: true
    });
    PropertyPane.prototype._focusOnFirstActionableElement = function (propertyPane) {
        if (propertyPane) {
            var firstElement = Object(_utils_CanvasA11y__WEBPACK_IMPORTED_MODULE_15__["getFirstFocusableChild"])(propertyPane);
            if (firstElement) {
                firstElement.focus();
            }
        }
    };
    /**
     * Method to update the tab indexes of all the elements in the root to the given value.
     * @param tabIndex
     */
    PropertyPane.prototype._updateTabIndexes = function (tabIndex, ignoreTabIndexes) {
        var rootElement = this._propertyPane;
        var elements = Object(_utils_CanvasA11y__WEBPACK_IMPORTED_MODULE_15__["getFocusableChildren"])(rootElement, ignoreTabIndexes);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var el = elements_1[_i];
            el.tabIndex = tabIndex;
        }
    };
    /**
     * Resetting the PropertyPane state.
     * @param webPartId - web part id to be configured with.
     */
    PropertyPane.prototype._resetState = function (webPartId) {
        this._isPropertyPaneReplaced = true;
        this._currentlyConfiguredWebPartId = webPartId;
        this.setState({
            isSaveButtonEnabled: false,
            saveConfirmationMessage: '',
            currentPage: 1
        });
    };
    PropertyPane.prototype._getCssBottomValueForPageContentElement = function () {
        var pageContentBottom = undefined;
        // non-reactive property pane case.
        if (!this.props.data.isReactive) {
            pageContentBottom = _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].oneRowFooter;
        }
        if (this.props.data.configuration &&
            this.props.data.configuration.pages &&
            this.props.data.configuration.pages.length &&
            this.props.data.configuration.pages.length > 1) {
            if (!pageContentBottom) {
                pageContentBottom = _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].oneRowFooter;
            }
            else {
                pageContentBottom = _PropertyPane_module_scss__WEBPACK_IMPORTED_MODULE_12__["default"].twoRowFooter;
            }
        }
        return pageContentBottom;
    };
    var PropertyPane_1;
    PropertyPane = PropertyPane_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_3__["sealed"]
    ], PropertyPane);
    return PropertyPane;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPane);


/***/ }),

/***/ "AdOI":
/*!**********************************************************!*\
  !*** ./lib/propertyPanePage/PropertyPanePage.module.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPanePage.module.css */ "rgOr");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Ckoa":
/*!**************************************************************************************!*\
  !*** ./lib/propertyPaneConditionalGroup/PropertyPaneConditionalGroup.module.scss.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneConditionalGroup.module.css */ "4hdG");
var styles = {
    alternateFieldsConnector: 'alternateFieldsConnector_f0d1d5fe',
    mac_only: 'mac_only_f0d1d5fe',
    callout: 'callout_f0d1d5fe',
    removeConnectionButton: 'removeConnectionButton_f0d1d5fe',
    clear: 'clear_f0d1d5fe'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Elu6":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPane/PropertyPane.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".propertyPane_5855b572,.propertyPaneNarrow_5855b572{font-size:14px;font-weight:400;top:0;bottom:0;position:absolute;background-color:\"[theme:bodyBackground, default: #ffffff]\";width:340px;-webkit-font-smoothing:antialiased;max-width:100%}[dir=ltr] .propertyPane_5855b572,[dir=ltr] .propertyPaneNarrow_5855b572{border-left-width:1px}[dir=rtl] .propertyPane_5855b572,[dir=rtl] .propertyPaneNarrow_5855b572{border-right-width:1px}[dir=ltr] .propertyPane_5855b572,[dir=ltr] .propertyPaneNarrow_5855b572{border-left-style:solid}[dir=rtl] .propertyPane_5855b572,[dir=rtl] .propertyPaneNarrow_5855b572{border-right-style:solid}[dir=ltr] .propertyPane_5855b572,[dir=ltr] .propertyPaneNarrow_5855b572{border-left-color:\"[theme:neutralLight, default: #edebe9]\"}[dir=rtl] .propertyPane_5855b572,[dir=rtl] .propertyPaneNarrow_5855b572{border-right-color:\"[theme:neutralLight, default: #edebe9]\"}[dir=ltr] .propertyPane_5855b572,[dir=ltr] .propertyPaneNarrow_5855b572{right:0}[dir=rtl] .propertyPane_5855b572,[dir=rtl] .propertyPaneNarrow_5855b572{left:0}.propertyPaneNarrow_5855b572{width:320px!important}.propertyPaneDescription_5855b572{padding:0 20px;color:\"[theme:neutralPrimary, default: #323130]\";font-size:14px}.propertyPaneScreenReaderOnly_5855b572{position:absolute;text-indent:-9999px;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;border:0}.twoRowFooter_5855b572{bottom:125px}.oneRowFooter_5855b572{bottom:72px}.overlay_5855b572{height:100%;width:340px;z-index:1}.spinner_5855b572{top:50%;position:relative}", ""]);



/***/ }),

/***/ "Ew62":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneGroup/PropertyPaneChoiceGroup.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".root_ac12c8d1{display:block}.imageRoot_ac12c8d1{overflow:hidden}.image_ac12c8d1{display:block;opacity:0}.image_ac12c8d1.imageIsLoaded_ac12c8d1{opacity:1}.field_ac12c8d1:before{display:inline-block;background-color:\"[theme:white, default: #ffffff]\";border:1px solid;width:20px;height:20px;font-weight:400;top:-1px;-webkit-transition-property:border-color;transition-property:border-color;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.23,1);transition-timing-function:cubic-bezier(.4,0,.23,1);border-radius:50%}.field_ac12c8d1:after,.field_ac12c8d1:before{content:\"\";position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box}.field_ac12c8d1:after{width:0;height:0;border-radius:50%;-webkit-transition-property:border-width;transition-property:border-width;-webkit-transition-duration:.15s;transition-duration:.15s;-webkit-transition-timing-function:cubic-bezier(.4,0,.23,1);transition-timing-function:cubic-bezier(.4,0,.23,1)}[dir=ltr] .field_ac12c8d1:after{left:10px}[dir=rtl] .field_ac12c8d1:after{right:10px}[dir=ltr] .field_ac12c8d1:after{right:0}[dir=rtl] .field_ac12c8d1:after{left:0}.field_ac12c8d1{display:inline-block;cursor:pointer;margin-top:0;position:relative;vertical-align:top;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.field_ac12c8d1:focus:before,.field_ac12c8d1:hover:before{border-color:\"[theme:neutralPrimary, default: #323130]\"}.field_ac12c8d1.fieldIsChecked_ac12c8d1:before{border:2px solid \"[theme:themeprimary, default: #0078d4]\"}@media screen and (-ms-high-contrast:active){.field_ac12c8d1.fieldIsChecked_ac12c8d1:before{border-color:#1aebff}}@media screen and (-ms-high-contrast:black-on-white){.field_ac12c8d1.fieldIsChecked_ac12c8d1:before{border-color:#37006e}}.field_ac12c8d1.fieldIsChecked_ac12c8d1:after{border:5px solid \"[theme:themeprimary, default: #0078d4]\";top:4px;width:10px;height:10px}[dir=ltr] .field_ac12c8d1.fieldIsChecked_ac12c8d1:after{left:5px}[dir=rtl] .field_ac12c8d1.fieldIsChecked_ac12c8d1:after{right:5px}@media screen and (-ms-high-contrast:active){.field_ac12c8d1.fieldIsChecked_ac12c8d1:after{border-color:#1aebff}}@media screen and (-ms-high-contrast:black-on-white){.field_ac12c8d1.fieldIsChecked_ac12c8d1:after{border-color:#37006e}}.field_ac12c8d1.fieldIsChecked_ac12c8d1:focus:before,.field_ac12c8d1.fieldIsChecked_ac12c8d1:hover:before{border-color:\"[theme:themeDarkAlt, default: #106ebe]\"}.field_ac12c8d1.fieldIsDisabled_ac12c8d1{cursor:default}.field_ac12c8d1.fieldIsDisabled_ac12c8d1:before{background-color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\";border-color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"}@media screen and (-ms-high-contrast:active){.field_ac12c8d1.fieldIsDisabled_ac12c8d1:before{border-color:#0f0}}@media screen and (-ms-high-contrast:black-on-white){.field_ac12c8d1.fieldIsDisabled_ac12c8d1:before{border-color:#600000}}.field_ac12c8d1.fieldIsDisabled_ac12c8d1 .ms-Label{color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"}@media screen and (-ms-high-contrast:active){.field_ac12c8d1.fieldIsDisabled_ac12c8d1 .ms-Label{color:#0f0}}@media screen and (-ms-high-contrast:black-on-white){.field_ac12c8d1.fieldIsDisabled_ac12c8d1 .ms-Label{color:#600000}}.field_ac12c8d1.fieldIsChecked_ac12c8d1.fieldIsDisabled_ac12c8d1:before{background-color:\"[theme:white, default: #ffffff]\";border-color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"}.field_ac12c8d1.fieldIsChecked_ac12c8d1.fieldIsDisabled_ac12c8d1:after{background-color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"}.fieldIsIcon_ac12c8d1,.fieldIsImage_ac12c8d1{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-size:0;background-color:\"[theme:neutralLighter, default: #f3f2f1]\";display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;cursor:pointer;padding-top:22px;margin:0;text-align:center;-webkit-transition:all .2s ease;transition:all .2s ease;border:2px solid transparent}[dir=rtl] .fieldIsIcon_ac12c8d1,[dir=rtl] .fieldIsImage_ac12c8d1{margin:0 0 4px 4px}[dir=ltr] .fieldIsIcon_ac12c8d1,[dir=ltr] .fieldIsImage_ac12c8d1{padding-left:0}[dir=rtl] .fieldIsIcon_ac12c8d1,[dir=rtl] .fieldIsImage_ac12c8d1{padding-right:0}.fieldIsIcon_ac12c8d1.fieldIsDisabled_ac12c8d1,.fieldIsImage_ac12c8d1.fieldIsDisabled_ac12c8d1{cursor:default}.fieldIsIcon_ac12c8d1.fieldIsDisabled_ac12c8d1 .innerField_ac12c8d1,.fieldIsImage_ac12c8d1.fieldIsDisabled_ac12c8d1 .innerField_ac12c8d1{opacity:.25}.fieldIsIcon_ac12c8d1 .innerField_ac12c8d1,.fieldIsImage_ac12c8d1 .innerField_ac12c8d1{position:relative;padding:0 28px}.fieldIsIcon_ac12c8d1 .innerField_ac12c8d1 .imageWrapper_ac12c8d1,.fieldIsImage_ac12c8d1 .innerField_ac12c8d1 .imageWrapper_ac12c8d1{padding-bottom:2px}.fieldIsIcon_ac12c8d1 .innerField_ac12c8d1 .imageWrapper_ac12c8d1.imageWrapperIsHidden_ac12c8d1,.fieldIsImage_ac12c8d1 .innerField_ac12c8d1 .imageWrapper_ac12c8d1.imageWrapperIsHidden_ac12c8d1{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;opacity:0}.fieldIsIcon_ac12c8d1 .innerField_ac12c8d1 .imageWrapper_ac12c8d1 .ms-Image,.fieldIsImage_ac12c8d1 .innerField_ac12c8d1 .imageWrapper_ac12c8d1 .ms-Image{display:inline-block}.fieldIsIcon_ac12c8d1 .labelWrapper_ac12c8d1,.fieldIsImage_ac12c8d1 .labelWrapper_ac12c8d1{display:block;position:relative;margin:4px 0 0;height:32px;line-height:16px;overflow:hidden;white-space:pre-wrap;text-overflow:ellipsis;font-size:14px;font-weight:400}.fieldIsIcon_ac12c8d1 .labelWrapper_ac12c8d1 .ms-Label,.fieldIsImage_ac12c8d1 .labelWrapper_ac12c8d1 .ms-Label{padding:0}.fieldIsIcon_ac12c8d1:before,.fieldIsImage_ac12c8d1:before{top:3px;left:auto!important;opacity:0}[dir=ltr] .fieldIsIcon_ac12c8d1:before,[dir=ltr] .fieldIsImage_ac12c8d1:before{right:3px}[dir=rtl] .fieldIsIcon_ac12c8d1:before,[dir=rtl] .fieldIsImage_ac12c8d1:before{left:3px}.fieldIsIcon_ac12c8d1:after,.fieldIsImage_ac12c8d1:after{top:13px;left:auto!important}[dir=ltr] .fieldIsIcon_ac12c8d1:after,[dir=ltr] .fieldIsImage_ac12c8d1:after{right:13px}[dir=rtl] .fieldIsIcon_ac12c8d1:after,[dir=rtl] .fieldIsImage_ac12c8d1:after{left:13px}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):focus,.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):hover,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):focus,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):hover{border-color:\"[theme:neutralTertiaryAlt, default: #c8c6c4]\"}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):focus:before,.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):hover:before,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):focus:before,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1):hover:before{opacity:1}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1{border-color:\"[theme:themePrimary, default: #0078d4]\"}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:before,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:before{opacity:1}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:after,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:after{top:8px}[dir=ltr] .fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:after,[dir=ltr] .fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:after{right:8px}[dir=rtl] .fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:after,[dir=rtl] .fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:after{left:8px}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:focus,.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:focus:before,.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:hover,.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:hover:before,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:focus,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:focus:before,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:hover,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:hover:before{border-color:\"[theme:themeDark, default: #005a9e]\"}.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:focus:after,.fieldIsIcon_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:hover:after,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:focus:after,.fieldIsImage_ac12c8d1:not(.fieldIsDisabled_ac12c8d1).fieldIsChecked_ac12c8d1:hover:after{background-color:\"[theme:themeDark, default: #005a9e]\"}.choiceFieldIsIcon_ac12c8d1{height:96px;width:96px}.choiceFieldIsIcon_ac12c8d1 .iconWrapper_ac12c8d1{font-size:32px;line-height:32px;height:32px}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1::-moz-focus-inner{border:0}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1:after{content:\"\";position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:1px solid}@media screen and (-ms-high-contrast:active){.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1::-moz-focus-inner{border:0}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1:after{content:\"\";position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:2px solid}}@media screen and (-ms-high-contrast:black-on-white){.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1::-moz-focus-inner{border:0}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1:after{content:\"\";position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:2px solid}}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1::-moz-focus-inner,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1::-moz-focus-inner{border:0}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1:after,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1:after{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid}@media screen and (-ms-high-contrast:active){.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1::-moz-focus-inner,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1::-moz-focus-inner{border:0}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1:after,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1:after{content:\"\";position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:2px solid}}@media screen and (-ms-high-contrast:black-on-white){.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1::-moz-focus-inner,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1::-moz-focus-inner{border:0}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsIcon_ac12c8d1:after,.ms-Fabric.is-focusVisible .choiceFieldIsInFocus_ac12c8d1.choiceFieldIsImage_ac12c8d1:after{content:\"\";position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:3px solid}}", ""]);



/***/ }),

/***/ "HYOZ":
/*!******************************************************!*\
  !*** ./lib/propertyPane/PropertyPane.module.scss.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPane.module.css */ "agAw");
var styles = {
    propertyPane: 'propertyPane_5855b572',
    propertyPaneNarrow: 'propertyPaneNarrow_5855b572',
    propertyPaneDescription: 'propertyPaneDescription_5855b572',
    propertyPaneScreenReaderOnly: 'propertyPaneScreenReaderOnly_5855b572',
    twoRowFooter: 'twoRowFooter_5855b572',
    oneRowFooter: 'oneRowFooter_5855b572',
    overlay: 'overlay_5855b572',
    spinner: 'spinner_5855b572'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "IZOt":
/*!******************************************************************!*\
  !*** ./lib/propertyPaneTitleBar/PropertyPaneTitleBar.module.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneTitleBar.module.css */ "ImFa");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "ImFa":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneTitleBar/PropertyPaneTitleBar.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".propertyPaneTitleBarBox_9fdc3a1d{width:100%;top:0;overflow-x:hidden}.propertyPaneTitleBar_9fdc3a1d{padding:16px 20px;display:-webkit-box;display:-ms-flexbox;display:flex}.propertyPanePageTitle_9fdc3a1d{font-weight:600;font-size:\"[theme:xLargeFontSize, default: 20px]\";color:\"[theme:neutralPrimary, default: #323130]\";overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.propertyPaneClose_9fdc3a1d{background-color:transparent;border:none;color:\"[theme:neutralPrimary, default: #323130]\";cursor:pointer;font-size:20px;padding:0;min-width:0}[dir=ltr] .propertyPaneClose_9fdc3a1d{margin-right:-8px}[dir=rtl] .propertyPaneClose_9fdc3a1d{margin-left:-8px}[dir=ltr] .propertyPaneClose_9fdc3a1d{margin-left:auto}[dir=rtl] .propertyPaneClose_9fdc3a1d{margin-right:auto}.propertyPaneClose_9fdc3a1d:hover{background-color:\"[theme:neutralLighter, default: #f3f2f1]\"}", ""]);



/***/ }),

/***/ "JGSf":
/*!**********************************************************************!*\
  !*** ./lib/propertyPaneTitleBar/PropertyPaneTitleBar.module.scss.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneTitleBar.module.css */ "IZOt");
var styles = {
    propertyPaneTitleBarBox: 'propertyPaneTitleBarBox_9fdc3a1d',
    propertyPaneTitleBar: 'propertyPaneTitleBar_9fdc3a1d',
    propertyPanePageTitle: 'propertyPanePageTitle_9fdc3a1d',
    propertyPaneClose: 'propertyPaneClose_9fdc3a1d'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "KeSm":
/*!****************************************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/dynamicDataWidgetSource/DynamicDataWidgetSource.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dropdown/Dropdown */ "Ry80");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../loc/Strings.resx */ "qITA");
/* harmony import */ var _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../propertyPaneFields/propertyPaneField/IPropertyPaneField */ "jVqW");
/* harmony import */ var _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DynamicDataWidget.module.scss */ "3/fy");
/* harmony import */ var _dynamicDataWidgetProperty_DynamicDataWidgetProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dynamicDataWidgetProperty/DynamicDataWidgetProperty */ "2UVN");
/* harmony import */ var _IDynamicConfiguration__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../IDynamicConfiguration */ "h6Kt");









var DynamicDataWidgetSource = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DynamicDataWidgetSource, _super);
    function DynamicDataWidgetSource(props) {
        var _this = _super.call(this, props) || this;
        // Set the selected source.
        _this.state = {
            selectedSourceId: _this._getSelectedSourceId()
        };
        return _this;
    }
    DynamicDataWidgetSource.prototype.render = function () {
        this._selectedSource = this.props.dynamicDataProvider.tryGetSource(this._getSelectedSourceId());
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
            this._renderSourceDropdown(),
            this._selectedSource && this._renderWidgetProperties()));
    };
    /**
     * Returns the source id:
     *  - if source id filter is provided, then it takes precedence over everything else.
     *  - else, if all the entries have the same source id, then selected source id would
     *    be that source id. This is because at this stage, source is common for all the
     *    entries.
     *  - else empty string.
     */
    DynamicDataWidgetSource.prototype._getSelectedSourceId = function () {
        var selectedSourceId = this._getSourceIdFilter();
        var entries = this.props.entries;
        if (!selectedSourceId) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.value._getSourceId()) {
                    selectedSourceId = entry.value._getSourceId();
                    break;
                }
                else {
                    selectedSourceId = '';
                }
            }
        }
        return selectedSourceId;
    };
    /**
     * Renders the sources dropdown.
     */
    DynamicDataWidgetSource.prototype._renderSourceDropdown = function () {
        var _this = this;
        var selectedSourceId = this.state.selectedSourceId;
        var sourceIdFilter = this._getSourceIdFilter();
        // If source id filter is given, then it takes presedence over the existing source id, if any.
        if (sourceIdFilter) {
            selectedSourceId = sourceIdFilter;
        }
        var sourceLabel = '';
        if (this.props.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_5__["PropertyPaneFieldType"].DynamicField) {
            sourceLabel = this.props.fieldProperties.sourcesLabel ||
                _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].DynamicDataSourcesDropdownLabel;
        }
        else {
            var sharedConfiguration = this.props.fieldProperties.sharedConfiguration;
            sourceLabel = (sharedConfiguration &&
                sharedConfiguration.source &&
                sharedConfiguration.source.sourcesLabel) || _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].DynamicDataSourcesDropdownLabel;
        }
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null, !sourceIdFilter &&
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], { label: sourceLabel, onChanged: function (option) {
                        _this.setState({
                            selectedSourceId: option.key
                        });
                    }, options: this._getDataSourcesDropdownOptions(selectedSourceId), selectedKey: selectedSourceId, "data-automation-id": 'DynamicDataWidgetSource' }))));
    };
    /**
     * Returns the source id, if the component decides to filter by the source id
     * else undefined.
     */
    DynamicDataWidgetSource.prototype._getSourceIdFilter = function () {
        var _a = this.props, type = _a.type, entries = _a.entries;
        var sourceIdFilter;
        if (type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_5__["PropertyPaneFieldType"].DynamicField) {
            var entry = entries[0];
            var filters = entry.properties.filters;
            sourceIdFilter = filters && filters.sourceId;
        }
        else { // DynamicFieldSet
            var sharedConfiguration = this.props.fieldProperties.sharedConfiguration;
            sourceIdFilter = sharedConfiguration &&
                sharedConfiguration.source &&
                sharedConfiguration.source.filters &&
                sharedConfiguration.source.filters.sourceId;
        }
        // If the currently available sources has a source with id 'sourceIdFilter'
        // then it is a valid filter.
        if (sourceIdFilter) {
            var dynamicDataProvider = this.props.dynamicDataProvider;
            var sources = dynamicDataProvider.getAvailableSources();
            var filteredSources = sources.filter(function (source) { return source.id === sourceIdFilter; });
            if (filteredSources) {
                this._selectedSource = filteredSources[0];
                return sourceIdFilter;
            }
        }
        return '';
    };
    /**
     * Retuns data source dropdown options with id-title pairs of all DD sources that are currently available.
     */
    DynamicDataWidgetSource.prototype._getDataSourcesDropdownOptions = function (selectedSourceId) {
        var _this = this;
        var options = [];
        var sources = this._getAvailableSources();
        // reset the selected source, so that while filling the options it is set again accordingly.
        this._selectedSource = undefined;
        sources.forEach(function (source) {
            // Omitting the current component from the list of displayed sources.
            if (_this.props.dynamicDataProvider._dynamicDataSourceId !== source.id) {
                options.push({ key: source.id, text: source.metadata.title });
                if (source.id === selectedSourceId) {
                    _this._selectedSource = source;
                }
            }
        });
        return options;
    };
    /**
     * Refreshes the Available sources based on the component id provided by the component
     * as part of the filters. If none provided, then it updates '_sources' array with all
     * the available sources.
     */
    DynamicDataWidgetSource.prototype._getAvailableSources = function () {
        var sources = [];
        var filters = this.props.entries[0].properties.filters;
        if (this.props.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_5__["PropertyPaneFieldType"].DynamicField) {
            if (filters && filters.componentId) {
                sources = this.props.dynamicDataProvider.getAvailableSourcesByComponentId(filters.componentId);
            }
        }
        else { // DynamicFieldSet
            var sharedConfiguration = this.props.fieldProperties.sharedConfiguration;
            var dynamicDataProvider = this.props.dynamicDataProvider;
            if (sharedConfiguration &&
                sharedConfiguration.source &&
                sharedConfiguration.source.filters &&
                sharedConfiguration.source.filters.componentId) {
                sources = dynamicDataProvider.getAvailableSourcesByComponentId(sharedConfiguration.source.filters.componentId);
            }
        }
        var filtersUsed = Boolean(filters && filters.componentId);
        if (sources.length > 0 ||
            filtersUsed // if filters were used return the result, even if empty
        ) {
            return sources;
        }
        else {
            return this.props.dynamicDataProvider.getAvailableSources();
        }
    };
    DynamicDataWidgetSource.prototype._renderWidgetProperties = function () {
        var _this = this;
        var widgetProperties = [];
        if (this._isPropertyShared()) {
            widgetProperties.push(this._renderWidgetProperty(widgetProperties.length, this.props.entries));
        }
        else {
            this.props.entries.forEach(function (entry) {
                widgetProperties.push(_this._renderWidgetProperty(widgetProperties.length, [entry]));
            });
        }
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", null, widgetProperties));
    };
    DynamicDataWidgetSource.prototype._isPropertyShared = function () {
        if (this.props.entries.length === 1) {
            return true;
        }
        else {
            // If we are here, then the type must be DynamicFieldSet
            var sharedConfiguration = this.props.fieldProperties.sharedConfiguration;
            return !!(sharedConfiguration && sharedConfiguration.depth === _IDynamicConfiguration__WEBPACK_IMPORTED_MODULE_8__["DynamicDataSharedDepth"].Property);
        }
    };
    DynamicDataWidgetSource.prototype._renderWidgetProperty = function (counter, entries) {
        var currentKey = this.props.parentKey + '-dynamicDataWidgetProperty' + counter;
        return (react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", { key: currentKey },
            (this.props.entries.length > 1 && !this._isPropertyShared()) &&
                react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].entryLabel }, entries[0].properties.label),
            react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_dynamicDataWidgetProperty_DynamicDataWidgetProperty__WEBPACK_IMPORTED_MODULE_7__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { parentKey: currentKey, selectedSource: this._selectedSource, entries: entries }))));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetSource.prototype, "_getSelectedSourceId", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetSource.prototype, "_getSourceIdFilter", null);
    return DynamicDataWidgetSource;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataWidgetSource);


/***/ }),

/***/ "PFvA":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneGroup/PropertyPaneGroup.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".propertyPaneGroupHeader_c1f6d2be{background:0 0;border-top:1px solid \"[theme:neutrallight, default: #edebe9]\";border-bottom:1px solid \"[theme:neutrallight, default: #edebe9]\";cursor:pointer;line-height:40px;height:40px;width:100%;padding:0 8px}[dir=ltr] .propertyPaneGroupHeader_c1f6d2be{border-right-width:1px}[dir=rtl] .propertyPaneGroupHeader_c1f6d2be{border-left-width:1px}[dir=ltr] .propertyPaneGroupHeader_c1f6d2be{border-right-style:solid}[dir=rtl] .propertyPaneGroupHeader_c1f6d2be{border-left-style:solid}[dir=ltr] .propertyPaneGroupHeader_c1f6d2be{border-right-color:\"[theme:neutralLight, default: #edebe9]\"}[dir=rtl] .propertyPaneGroupHeader_c1f6d2be{border-left-color:\"[theme:neutralLight, default: #edebe9]\"}.propertyPaneGroup_c1f6d2be:last-child .propertyPaneGroupHeader_c1f6d2be{border-bottom:1px solid \"[theme:neutrallight, default: #edebe9]\"}.propertyPaneGroup_c1f6d2be.isExpanded_c1f6d2be .propertyPaneGroupContent_c1f6d2be{display:block}.propertyPaneGroupHeaderText_c1f6d2be{vertical-align:top;line-height:38px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}[dir=ltr] .propertyPaneGroupHeaderText_c1f6d2be{margin-right:20}[dir=rtl] .propertyPaneGroupHeaderText_c1f6d2be{margin-left:20}.propertyPaneGroupHeaderIcon_c1f6d2be{color:\"[theme:neutralSecondaryAlt, default: #8a8886]\";font-size:14px;line-height:38px;position:relative}[dir=ltr] .propertyPaneGroupHeaderIcon_c1f6d2be{float:left}[dir=rtl] .propertyPaneGroupHeaderIcon_c1f6d2be{float:right}[dir=ltr] .propertyPaneGroupHeaderIcon_c1f6d2be{padding-right:4px}[dir=rtl] .propertyPaneGroupHeaderIcon_c1f6d2be{padding-left:4px}.propertyPaneGroupHeaderWithAccordion_c1f6d2be{padding:4px 0}.propertyPaneGroupHeaderNoAccordion_c1f6d2be{height:40px;line-height:40px;padding-top:4px;width:300px;text-overflow:ellipsis;overflow:hidden}[dir=ltr] .propertyPaneGroupHeaderNoAccordion_c1f6d2be{padding-right:0}[dir=rtl] .propertyPaneGroupHeaderNoAccordion_c1f6d2be{padding-left:0}[dir=ltr] .propertyPaneGroupHeaderNoAccordion_c1f6d2be{padding-left:20px}[dir=rtl] .propertyPaneGroupHeaderNoAccordion_c1f6d2be{padding-right:20px}.propertyPaneGroupHeader_c1f6d2be,.propertyPaneGroupHeaderNoAccordion_c1f6d2be{font-size:14px;font-weight:400;font-weight:600;color:\"[theme:neutralPrimary, default: #323130]\"}[dir=ltr] .propertyPaneGroupHeader_c1f6d2be,[dir=ltr] .propertyPaneGroupHeaderNoAccordion_c1f6d2be{text-align:left}[dir=rtl] .propertyPaneGroupHeader_c1f6d2be,[dir=rtl] .propertyPaneGroupHeaderNoAccordion_c1f6d2be{text-align:right}.propertyPaneGroupContent_c1f6d2be{padding:0 20px 16px}.propertyPaneGroupContent_c1f6d2be h2{font-size:15px;color:\"[theme:neutralPrimary, default: #323130]\";font-weight:600;font-weight:400}.propertyPaneGroupContent_c1f6d2be .ms-TextField.ms-TextField--multiline .ms-TextField-field{resize:vertical}.propertyPaneChoiceGroup_c1f6d2be .ms-Label{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--icon,.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--image{height:auto;width:calc(33.33% - 4px)}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--icon .ms-ChoiceField-field,.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--image .ms-ChoiceField-field{min-width:100%}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--icon .ms-ChoiceField-innerField,.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--image .ms-ChoiceField-innerField{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;height:52px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--icon .ms-ChoiceField-labelWrapper,.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--image .ms-ChoiceField-labelWrapper{margin-bottom:8px}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField-wrapper{width:100%}.propertyPaneChoiceGroup_c1f6d2be .themeableSvgPath{fill:\"[theme:neutralPrimary, default: #323130]\"}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceFieldGroup-flexContainer{width:100%}.propertyPaneChoiceGroup_c1f6d2be .ms-ChoiceField--title .ms-Label{color:\"[theme:neutralPrimary, default: #323130]\"}.choiceGroupContainsIconOrImage_c1f6d2be .ms-ChoiceFieldGroup{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.propertyPaneGroupField_c1f6d2be{padding-top:4px;color:\"[theme:neutralPrimary, default: #323130]\";word-wrap:break-word}.propertyPaneGroupField_c1f6d2be a.ms-Link{font-size:14px;margin-bottom:16px}.propertyPaneGroupField_c1f6d2be button.ms-Checkbox{max-width:100%}.propertyPaneGroupField_c1f6d2be button.ms-Toggle-background{min-width:0}@media screen and (-ms-high-contrast:active){.propertyPaneGroupField_c1f6d2be a.ms-Link:hover{text-decoration:underline}}@media screen and (-ms-high-contrast:white-on-black){.propertyPaneGroupField_c1f6d2be a.ms-Link{color:#ff0}}", ""]);



/***/ }),

/***/ "PqP8":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneDynamicData/DynamicDataWidget.module.css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".dynamicDataWidget_bef01b90{margin-bottom:12px}.entryLabel_bef01b90{margin-top:12px;padding:0}", ""]);



/***/ }),

/***/ "Q0G7":
/*!**************************************************************!*\
  !*** ./lib/propertyPanePage/PropertyPanePage.module.scss.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPanePage.module.css */ "AdOI");
var styles = {
    propertyPaneTitleBarBox: 'propertyPaneTitleBarBox_d9891600',
    propertyPaneTitleBar: 'propertyPaneTitleBar_d9891600',
    propertyPanePageTitle: 'propertyPanePageTitle_d9891600',
    propertyPaneClose: 'propertyPaneClose_d9891600',
    propertyPanePageContent: 'propertyPanePageContent_d9891600',
    propertyPanePageDescription: 'propertyPanePageDescription_d9891600'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "RaHs":
/*!**************************************************************!*\
  !*** ./lib/propertyPaneFooter/PropertyPaneFooter.module.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneFooter.module.css */ "nmRd");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "RckX":
/*!******************************!*\
  !*** ./lib/utils/Compare.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copyright (c) Microsoft. All rights reserved.
/**
 * @deprecated This was an optimization for a React-specific scenario, which
 * is now solved by a newer React feature.  See here:
 * https://facebook.github.io/react/docs/shallow-compare.html
 *
 * @internal
 */
var Compare = /** @class */ (function () {
    function Compare() {
    }
    /**
     * Performs shallow comparison between two objects to determine if they are equal. This method compares
     * only object types.
     *
     * @param objA - the first object to compare.
     * @param objB - the second object to compare.
     *
     */
    Compare.shallowCompare = function (objA, objB) {
        // Test if they are the same object or both are null/undefined.
        if (objA === objB) {
            return true;
        }
        // Test if they are the correct type. Only object types are compared.
        if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
            return false;
        }
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        // Test if they have the same number of keys. Else, they cannot be same.
        var keyLength = keysA.length;
        if (keyLength !== keysB.length) {
            return false;
        }
        // Test for A's keys different from B.
        var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
        for (var i = 0; i < keyLength; i++) {
            var key = keysA[i];
            if (!bHasOwnProperty(key)) {
                return false;
            }
            /* tslint:disable:no-any */
            var valueA = objA[key];
            var valueB = objB[key];
            /* tslint:enable:no-any */
            // Test if the values are same.
            if (valueA !== valueB) {
                return false;
            }
        }
        return true;
    };
    return Compare;
}());
/* harmony default export */ __webpack_exports__["default"] = (Compare);


/***/ }),

/***/ "SiUF":
/*!******************************************************************!*\
  !*** ./lib/propertyPaneGroup/PropertyPaneChoiceGroup.module.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneChoiceGroup.module.css */ "Ew62");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "agAw":
/*!**************************************************!*\
  !*** ./lib/propertyPane/PropertyPane.module.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPane.module.css */ "Elu6");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "b0Og":
/*!**************************************************!*\
  !*** ./lib/propertyPanePage/PropertyPanePage.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _propertyPaneGroup_PropertyPaneGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../propertyPaneGroup/PropertyPaneGroup */ "c96I");
/* harmony import */ var _PropertyPanePage_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PropertyPanePage.module.scss */ "Q0G7");
/* harmony import */ var _propertyPaneConditionalGroup_PropertyPaneConditionalGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../propertyPaneConditionalGroup/PropertyPaneConditionalGroup */ "erW/");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPanePage.tsx
 */






/**
 * PropertyPane page component
 *
 * @internal
 */
var PropertyPanePage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPanePage, _super);
    function PropertyPanePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPanePage.prototype.componentDidMount = function () {
        this.props.setContainerDiv(this._propertyPanePage);
    };
    PropertyPanePage.prototype.render = function () {
        var _this = this;
        var index = 0;
        var propertyGroups = this.props.propertyGroups.map(function (group) {
            if (_this._isConditionalGroup(group)) {
                group = group;
                return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { key: 'PropertyPaneConditionalGroup' + index },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_propertyPaneConditionalGroup_PropertyPaneConditionalGroup__WEBPACK_IMPORTED_MODULE_5__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, group, _this.props, { index: index++ }))));
            }
            else {
                group = group;
                var groupKey = group.groupName || index.toString();
                return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { key: 'PropertyPaneGroup' + index++ },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_propertyPaneGroup_PropertyPaneGroup__WEBPACK_IMPORTED_MODULE_3__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.props, { key: groupKey, pageNumber: _this.props.pageNumber, isGroupNameHidden: group.isGroupNameHidden, groupName: group.groupName, groupFields: group.groupFields, onChange: _this.props.onChange, properties: _this.props.properties, setEntryState: _this.props.setEntryState, isCollapsed: group.isCollapsed, displayGroupsAsAccordion: _this.props.displayGroupsAsAccordion, propertyPaneGroupStateChanged: _this.props.propertyPaneGroupStateChanged, propertyPanePagesStateMap: _this.props.propertyPanePagesStateMap, dynamicConfiguration: _this.props.dynamicConfiguration }))));
            }
        });
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { ref: function (c) { return _this._propertyPanePage = c; } },
            this.props.pageDescription
                ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _PropertyPanePage_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].propertyPanePageDescription, id: 'propertyPaneDescriptionId' }, this.props.pageDescription)
                /* tslint:disable:no-null-keyword */
                : null
        /* tslint:enable:no-null-keyword */
        ,
            propertyGroups));
    };
    PropertyPanePage.prototype._isConditionalGroup = function (group) {
        return 'primaryGroup' in group;
    };
    PropertyPanePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], PropertyPanePage);
    return PropertyPanePage;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPanePage);


/***/ }),

/***/ "bo8A":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneConditionalGroup/PropertyPaneConditionalGroup.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".alternateFieldsConnector_f0d1d5fe{font-size:21px;font-weight:700;cursor:pointer;margin-top:-20px;margin-bottom:-12px}[dir=ltr] .alternateFieldsConnector_f0d1d5fe{float:right}[dir=rtl] .alternateFieldsConnector_f0d1d5fe{float:left}[dir=ltr] .alternateFieldsConnector_f0d1d5fe{margin-right:20px}[dir=rtl] .alternateFieldsConnector_f0d1d5fe{margin-left:20px}[dir=ltr] .alternateFieldsConnector_f0d1d5fe{margin-left:0}[dir=rtl] .alternateFieldsConnector_f0d1d5fe{margin-right:0}.alternateFieldsConnector_f0d1d5fe.mac_only_f0d1d5fe{margin-top:-17px}.callout_f0d1d5fe{border-width:0}.removeConnectionButton_f0d1d5fe{position:relative;bottom:0}[dir=ltr] .removeConnectionButton_f0d1d5fe{margin-left:20px}[dir=rtl] .removeConnectionButton_f0d1d5fe{margin-right:20px}.clear_f0d1d5fe{clear:both}", ""]);



/***/ }),

/***/ "c96I":
/*!****************************************************!*\
  !*** ./lib/propertyPaneGroup/PropertyPaneGroup.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var office_ui_fabric_react_lib_components_Toggle_Toggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Toggle/Toggle */ "ZRzC");
/* harmony import */ var office_ui_fabric_react_lib_components_Tooltip_TooltipHost_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Tooltip/TooltipHost.types */ "ALbB");
/* harmony import */ var office_ui_fabric_react_lib_components_Checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Checkbox */ "O9ES");
/* harmony import */ var office_ui_fabric_react_lib_components_ChoiceGroup_ChoiceGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroup */ "maZH");
/* harmony import */ var office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dropdown/Dropdown */ "Ry80");
/* harmony import */ var office_ui_fabric_react_lib_components_Dropdown_Dropdown_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dropdown/Dropdown.types */ "qvh2");
/* harmony import */ var office_ui_fabric_react_lib_components_SpinButton_SpinButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/SpinButton/SpinButton */ "mCmK");
/* harmony import */ var office_ui_fabric_react_lib_Slider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! office-ui-fabric-react/lib/Slider */ "utB5");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/KillSwitches */ "+ORw");
/* harmony import */ var _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../propertyPaneFields/propertyPaneButton/IPropertyPaneButton */ "eNgD");
/* harmony import */ var _propertyPaneFields_propertyPaneCustomField_PropertyPaneCustomFieldHost__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../propertyPaneFields/propertyPaneCustomField/PropertyPaneCustomFieldHost */ "jKPa");
/* harmony import */ var _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../propertyPaneFields/propertyPaneField/IPropertyPaneField */ "jVqW");
/* harmony import */ var _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./PropertyPaneGroup.module.scss */ "xYxX");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../loc/Strings.resx */ "qITA");
/* harmony import */ var _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./PropertyPaneChoiceGroup.module.scss */ "/zFp");
/* harmony import */ var _PropertyPaneGroupHelper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./PropertyPaneGroupHelper */ "rDKC");
/* harmony import */ var _propertyPaneDynamicData_dynamicDataWidget_DynamicDataWidget__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../propertyPaneDynamicData/dynamicDataWidget/DynamicDataWidget */ "n+ee");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPaneGroup.tsx
 */

























var propertyPaneGroupInstance = 0;
/**
 * This is a workaround for fixing breaking changes in TextField in fabric 6 and 7.
 * In the workaround, even you provide a value, TextField still will maintain the state.
 * When value changed, the state will update according to new value.
 * This is same as the TextField in fabric 6.
 */
function WorkaroundTextField(props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_1__["useState"](props.value), value = _a[0], setValue = _a[1];
    var lastPropsValue = react__WEBPACK_IMPORTED_MODULE_1__["useRef"](props.value);
    react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](function () {
        if (props.value !== lastPropsValue.current) {
            setValue(props.value);
            lastPropsValue.current = props.value;
        }
    });
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["TextField"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props, { value: value, onChange: function (event, newValue) {
            setValue(newValue);
            if (props.onChange) {
                props.onChange(event, newValue);
            }
        } }));
}
/**
 * React Component: PropertyPaneGroup.
 *
 * @internal
 */
var PropertyPaneGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPaneGroup, _super);
    /**
     * constructor
     */
    function PropertyPaneGroup(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Initial value of TextFieldPropertyPane.
         */
        _this._initialValue = '';
        _this.state = {
            isDetailsShown: true,
            id: "PropertyPaneGroup-" + propertyPaneGroupInstance++
        };
        // method bindings.
        _this._onHeaderClicked = _this._onHeaderClicked.bind(_this);
        return _this;
    }
    PropertyPaneGroup_1 = PropertyPaneGroup;
    /**
     * Returns the checked status of the incoming groupfield.
     * Today this method expects checkbox and toggle fields.
     * @param propValue - value of the group field from the property bag.
     * @param groupField - actual group field.
     */
    /* tslint:disable-next-line:no-any */
    PropertyPaneGroup._getCheckedStatus = function (propValue, groupField) {
        /* tslint:disable-next-line:no-null-keyword */
        return (propValue !== undefined && propValue !== null) ? propValue : groupField.properties.checked;
    };
    PropertyPaneGroup.prototype.UNSAFE_componentWillMount = function () {
        this.setState({
            isDetailsShown: this._isDetailsShown(this.props)
        });
    };
    PropertyPaneGroup.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        if (props.groupFields && // tslint:disable-next-line:no-any
            // tslint:disable-next-line:no-any
            props.groupFields.some(function (groupField) { return groupField.shouldFocus || false; })) {
            // The group which contains the next focus control should be expanded.
            this.setState({
                isDetailsShown: true
            });
        }
        else {
            this.setState({
                isDetailsShown: this._isDetailsShown(props)
            });
        }
    };
    PropertyPaneGroup.prototype.componentDidMount = function () {
        this._setFocus();
    };
    PropertyPaneGroup.prototype.componentDidUpdate = function () {
        this._setFocus();
    };
    /**
     * render: renders the PropertyPaneGroup component.
     */
    PropertyPaneGroup.prototype.render = function () {
        this._keys = {}; // Reset to ensure consistency and predictable order.
        this._elementRefs = {}; // Reset to ensure consistency.
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null,
            this._renderGroupName(),
            this._renderGroupContent()));
    };
    /**
     * Returns true if the property pane group should be extended (false if collapsed)
     * @param props - Props to use for calculating the result
     */
    PropertyPaneGroup.prototype._isDetailsShown = function (props) {
        /**
         * Here we are making sure that state of the group is decided by the user actions.
         *  a) If user manually makes any changes to the accordion group's state then those changes are recorded
         *     in the 'propertyPaneGroupsState' dictionary and these recordings will be used for future renderings
         *     of the group.
         *
         *  b) IF there are no changes made by the user to the state of the accordion group then we infer the state
         *     from the property bag which web part sent.
         *
         */
        var isDetailsShown = undefined;
        if (props.propertyPanePagesStateMap[props.pageNumber] &&
            props.groupName) {
            isDetailsShown = props.propertyPanePagesStateMap[props.pageNumber][props.groupName];
        }
        return (isDetailsShown !== undefined) ? isDetailsShown : !props.isCollapsed;
    };
    PropertyPaneGroup.prototype._setFocus = function () {
        var _this = this;
        // This is the hack to workaround a react bug that doesn't set the focus in componentDidMount properly.
        setTimeout(function () {
            if (_this._focusElementKey) {
                var nextFocusedElement = _this._elementRefs[_this._focusElementKey];
                if (nextFocusedElement && nextFocusedElement.focus) {
                    nextFocusedElement.focus();
                    _this._focusElementKey = undefined;
                }
            }
        }, 0);
    };
    PropertyPaneGroup.prototype._renderGroupName = function () {
        var groupNameElem;
        var rtl = document.dir === 'rtl';
        if (!this.props.isGroupNameHidden) {
            if (!this.props.displayGroupsAsAccordion) {
                if (this.props.groupName) {
                    groupNameElem = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupHeaderNoAccordion }, this.props.groupName));
                }
            }
            else {
                var chevronIcon = this.state.isDetailsShown ? 'ChevronDown' : rtl ?
                    'ChevronLeft' : 'ChevronRight';
                groupNameElem = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupHeaderWithAccordion },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", { className: _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupHeader, "aria-expanded": this.state.isDetailsShown, onClick: this._onHeaderClicked },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["Icon"], { className: this.state.isDetailsShown ?
                                _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupHeaderIcon :
                                _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupHeaderIcon, "data-automation-state": this.state.isDetailsShown ? 'expanded' : 'collapsed', iconName: chevronIcon }),
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupHeaderText }, this.props.groupName))));
            }
        }
        return groupNameElem;
    };
    PropertyPaneGroup.prototype._renderGroupContent = function () {
        var _this = this;
        if (this.state.isDetailsShown) {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupContent }, this.props.groupFields.map(function (groupField) { return _this._renderGroupField(groupField); })));
        }
        return undefined; // tslint:disable-line:no-any
    };
    /**
     * _renderGroupField: renders the individual groupField based on the field type.
     */
    /* tslint:disable:no-any */
    PropertyPaneGroup.prototype._renderGroupField = function (groupField) {
        var _this = this;
        var _a;
        var key = Object(_PropertyPaneGroupHelper__WEBPACK_IMPORTED_MODULE_22__["generateGroupFieldKey"])(this._keys, groupField);
        var propValue = Object(_PropertyPaneGroupHelper__WEBPACK_IMPORTED_MODULE_22__["getFixedUpPropValue"])(groupField, this.props.properties, this.props.dynamicConfiguration);
        if (groupField.shouldFocus) {
            this._focusElementKey = key;
        }
        // If group field has explicitly set its own ref function, pass the instance to that ref function.
        var setRef = function (instance) {
            _this._elementRefs[key] = instance; // Key must be a string at this point
            if (typeof groupField.properties.ref === 'function') {
                groupField.properties.ref(instance);
            }
        };
        /* tslint:enable:no-any */
        var groupFieldElement;
        switch (groupField.type) {
            /* CUSTOM FIELD */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Custom:
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_propertyPaneFields_propertyPaneCustomField_PropertyPaneCustomFieldHost__WEBPACK_IMPORTED_MODULE_17__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { onChanged: function (targetProperty, value) {
                        // enable/disable Save button
                        if (_this.props.setEntryState) {
                            _this.props.setEntryState(targetProperty, true);
                        }
                        if (_this.props.onChange) {
                            _this.props.onChange(targetProperty, value, _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Custom);
                        }
                    } }));
                break;
            /* TOGGLE */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Toggle:
                groupFieldElement =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Toggle_Toggle__WEBPACK_IMPORTED_MODULE_5__["Toggle"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, checked: PropertyPaneGroup_1._getCheckedStatus(propValue, groupField), onText: groupField.properties.onText || _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_20__["default"].ToggleOnText, offText: groupField.properties.offText || _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_20__["default"].ToggleOffText, onChanged: function (value) {
                            _this._onChange(groupField, value);
                        }, "data-automation-id": groupField.properties.dataAutomationId }));
                break;
            /* TEXTFIELD */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].TextField:
                /**
                 * OUIFR doesn't respect undefined value and hence it was not clearing the text field value.
                 * So, explicitly setting the value to an empty string if propValue and groupField.properties.value
                 * are empty/undefined.
                 */
                var textFieldValue = propValue || groupField.properties.value || '';
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](WorkaroundTextField, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, value: textFieldValue, onChange: function (event, value) {
                        // If no validation method, we use onChanged to notify input changed.
                        if (!groupField.properties.onGetErrorMessage) {
                            _this._onChange(groupField, value);
                        }
                    }, onNotifyValidationResult: function (errorMessage, value) {
                        return _this._onNotifyValidationResult(errorMessage, value, groupField, _this.props.setEntryState);
                    }, onFocus: function (ev) { return _this._onFocusTextFieldPropertyPane(ev, groupField.properties); }, onBlur: function (ev) { return _this._onBlurTextFieldPropertyPane(ev, groupField.properties); } }));
                break;
            /* DROPDOWN */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Dropdown:
                var dropdownOptions = groupField.properties.options
                    ? groupField.properties.options.map(function (option) { return ({
                        key: option.key,
                        index: option.index,
                        text: option.text,
                        itemType: option.type || office_ui_fabric_react_lib_components_Dropdown_Dropdown_types__WEBPACK_IMPORTED_MODULE_10__["DropdownMenuItemType"].Normal
                    }); })
                    : [];
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_9__["Dropdown"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, selectedKey: propValue || groupField.properties.selectedKey, disabled: groupField.properties.isDisabled || groupField.properties.disabled, ariaLabel: groupField.properties.ariaLabel, "aria-posinset": groupField.properties.ariaPositionInSet, "aria-setsize": groupField.properties.ariaSetSize, label: groupField.properties.label, options: dropdownOptions, calloutProps: groupField.properties.calloutProps, onChanged: function (option, index) {
                        _this._onDropDownChange(groupField, option, index);
                    }, "data-automation-id": groupField.properties.dataAutomationId }));
                break;
            /* CHECKBOX */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].CheckBox:
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_Checkbox__WEBPACK_IMPORTED_MODULE_7__["Checkbox"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, label: groupField.properties.text, checked: PropertyPaneGroup_1._getCheckedStatus(propValue, groupField), disabled: this._isDisabled(groupField), onChange: function (ev, isChecked) {
                        _this._onChange(groupField, isChecked);
                    } }));
                break;
            /* LABEL */
            // (SOX VSO bug #203642)
            // Accessibility doesn't work in PropertyPane, it need change code in fabric-react.
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Label:
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["Label"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties), groupField.properties.text);
                break;
            /* SLIDER */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Slider:
                groupFieldElement =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_Slider__WEBPACK_IMPORTED_MODULE_12__["Slider"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, value: propValue || groupField.properties.value, onChange: function (value) {
                            _this._onChange(groupField, value);
                        } }));
                break;
            /* CHOICEGROUP */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].ChoiceGroup:
                groupField.properties.options.forEach(function (option) {
                    /**
                     * In the below cases, we would like to retain the value of the option.checked.
                     * 1. propValue can be undefined in the cases of non-webparts like the canvas where
                     *    they do not have properties bag.
                     * 2. propValue can be empty/null in both webpart/non-webpart cases.
                     */
                    /* tslint:disable-next-line:no-null-keyword */
                    if (propValue !== undefined && propValue !== '' && propValue !== null) {
                        option.checked = option.key === propValue;
                    }
                    // Normalizing 'isDisabled' property.
                    if (option.hasOwnProperty('disabled') && option.disabled !== undefined) {
                        option.disabled = option.disabled;
                    }
                    // Adding the tooltip only for the image and icon choicegroup options. Adding tooltiphost
                    // to the default choicegroup option(we don't need tooltip here) has an issue where the
                    // text goes behind the input element.
                    if (!option.onRenderLabel && (option.imageSrc || option.iconProps)) {
                        option.onRenderLabel = function (choice) {
                            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["TooltipHost"], { overflowMode: office_ui_fabric_react_lib_components_Tooltip_TooltipHost_types__WEBPACK_IMPORTED_MODULE_6__["TooltipOverflowMode"].Parent, calloutProps: { gapSpace: 65 }, content: choice.text },
                                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { id: choice.labelId, className: 'ms-label' }, choice.text)));
                        };
                    }
                });
                var options = groupField.properties.options.map(function (option) {
                    var propertyPaneChoiceGroupOptionIconProps = option.iconProps, otherOptions = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](option, ["iconProps"]);
                    var iconOption = propertyPaneChoiceGroupOptionIconProps
                        ? {
                            iconProps: {
                                iconName: propertyPaneChoiceGroupOptionIconProps.officeFabricIconFontName
                            }
                        }
                        : undefined;
                    var themableSvg = option.themableSvg;
                    var renderOption = themableSvg ?
                        {
                            onRenderField: _this._renderChoiceGroupWithSvg
                        }
                        : undefined;
                    var dataAutomationIdOption = {
                        'data-automation-id': "PropertyPaneChoiceGroup-" + option.key
                    };
                    return _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_3__["merge"]({}, otherOptions, iconOption, renderOption, dataAutomationIdOption);
                });
                var choiceGroupClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])(_PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneChoiceGroup, (_a = {},
                    _a[_PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].choiceGroupContainsIconOrImage] = options.some(function (option) { return Boolean(option.iconProps || option.imageSrc); }),
                    _a));
                groupFieldElement =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_ChoiceGroup_ChoiceGroup__WEBPACK_IMPORTED_MODULE_8__["ChoiceGroup"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, options: options, className: choiceGroupClassName, onChanged: function (checkedOption) {
                            _this._onChoiceGroupChange(groupField, checkedOption);
                        } }));
                break;
            /* BUTTON */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Button:
                var handleClick = function () {
                    var newValue = groupField.properties.onClick(propValue); // tslint:disable-line:no-any
                    _this._onChange(groupField, newValue, _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Button);
                };
                var iconProps = groupField.properties.icon
                    ? { iconName: groupField.properties.icon }
                    : undefined;
                var buttonType = groupField.properties.buttonType;
                var buttonProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { ariaLabel: groupField.properties.ariaLabel || groupField.properties.text, componentRef: setRef, iconProps: iconProps, onClick: handleClick, text: groupField.properties.text });
                if (buttonType) {
                    delete buttonProps.buttonType; // remove since fully removed from Fabric as of 5
                }
                switch (buttonType) {
                    case _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_16__["PropertyPaneButtonType"].Primary:
                        groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["PrimaryButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps));
                        break;
                    case _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_16__["PropertyPaneButtonType"].Compound:
                        groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["CompoundButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps));
                        break;
                    case _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_16__["PropertyPaneButtonType"].Command:
                        groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["ActionButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps));
                        break;
                    case _propertyPaneFields_propertyPaneButton_IPropertyPaneButton__WEBPACK_IMPORTED_MODULE_16__["PropertyPaneButtonType"].Icon:
                        groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["IconButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps));
                        break;
                    default:
                        groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["Button"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonProps));
                        break;
                }
                break;
            /* HORIZONTAL RULE */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].HorizontalRule:
                groupFieldElement =
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("hr", tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties));
                break;
            /* LINK */
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].Link:
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["Link"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ componentRef: setRef }, groupField.properties, { "data-interception": !_common_KillSwitches__WEBPACK_IMPORTED_MODULE_15__["default"].isOpenNewTabKillSwitchActivated() && groupField.properties.target === '_blank'
                        ? 'off'
                        : undefined }), groupField.properties.text);
                break;
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].DynamicField:
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_propertyPaneDynamicData_dynamicDataWidget_DynamicDataWidget__WEBPACK_IMPORTED_MODULE_23__["default"], { parentKey: key, type: _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].DynamicField, fieldProperties: groupField.properties, entries: [propValue], dynamicDataProvider: this.props.dynamicConfiguration.dynamicDataProvider, onChange: this._onDynamicDataChanged.bind(this, groupField) });
                break;
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].DynamicFieldSet:
                groupFieldElement = react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_propertyPaneDynamicData_dynamicDataWidget_DynamicDataWidget__WEBPACK_IMPORTED_MODULE_23__["default"], { parentKey: key, type: _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].DynamicFieldSet, fieldProperties: groupField.properties, entries: propValue, dynamicDataProvider: this.props.dynamicConfiguration.dynamicDataProvider, onChange: this._onDynamicDataChanged.bind(this, groupField) });
                break;
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].DynamicTextField:
                groupFieldElement = this._getDynamicTextField(groupField, propValue, setRef);
                break;
            case _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_18__["PropertyPaneFieldType"].SpinButton:
                groupFieldElement = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](office_ui_fabric_react_lib_components_SpinButton_SpinButton__WEBPACK_IMPORTED_MODULE_11__["SpinButton"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, value: propValue || groupField.properties.defaultValue, onIncrement: function (value) { return _this._onChange(groupField, Number(value) + 1); }, onDecrement: function (value) { return _this._onChange(groupField, Number(value) - 1); } })));
                break;
            default:
                /* tslint:disable:no-null-keyword */
                groupFieldElement = null; // tslint:disable-line:no-any
            /* tslint:enable:no-null-keyword */
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { key: key, className: _PropertyPaneGroup_module_scss__WEBPACK_IMPORTED_MODULE_19__["default"].propertyPaneGroupField }, groupFieldElement));
    };
    PropertyPaneGroup.prototype._getDynamicTextField = function (groupField, dataPath, setRef // tslint:disable-line:no-any
    ) {
        var _this = this;
        var textFieldValue = dataPath.reference ?
            '[' + dataPath.reference + ']' :
            (dataPath.value || groupField.properties.value || '');
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](WorkaroundTextField, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, groupField.properties, { componentRef: setRef, value: textFieldValue, onGetErrorMessage: this._validateDynamicDataPath.bind(this, groupField), onNotifyValidationResult: function (errorMessage, value) {
                return _this._onNotifyValidationResult(errorMessage, _this._getDynamicProperty(value, groupField), groupField, _this.props.setEntryState);
            } })));
    };
    PropertyPaneGroup.prototype._renderChoiceGroupWithSvg = function (props) {
        var _a, _b, _c;
        var themableSvg = props.themableSvg;
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", { htmlFor: props.id, className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-field', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].field, (_a = {},
                _a['ms-ChoiceField-field--image ' + _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].fieldIsImage] = !!props.imageSrc,
                _a['ms-ChoiceField--icon ' + _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].fieldIsIcon] = !!props.iconProps,
                _a['is-checked ' + _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].fieldIsChecked] = props.checked,
                _a['is-disabled ' + _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].fieldIsDisabled] = props.disabled,
                _a)) },
            props.imageSrc && (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-innerField', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].innerField) },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-imageWrapper', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].imageWrapper, (_b = {},
                        _b['is-hidden ' + _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].imageWrapperIsHidden] = props.checked,
                        _b)) },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-Image', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].imageRoot), style: {
                            width: props.imageSize ? props.imageSize.width : undefined,
                            height: props.imageSize ? props.imageSize.height : undefined
                        } }, themableSvg)),
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-imageWrapper', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].imageWrapper, (_c = {},
                        _c['is-hidden ' + _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].imageWrapperIsHidden] = !props.checked,
                        _c)) },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-Image', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].imageRoot), style: {
                            width: props.imageSize ? props.imageSize.width : undefined,
                            height: props.imageSize ? props.imageSize.height : undefined
                        } }, themableSvg)))),
            props.iconProps &&
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-innerField', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].innerField) },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-iconWrapper', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].iconWrapper) },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["Icon"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, props.iconProps)))),
            props.imageSrc || props.iconProps
                ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["css"])('ms-ChoiceField-labelWrapper', _PropertyPaneChoiceGroup_module_scss__WEBPACK_IMPORTED_MODULE_21__["default"].labelWrapper) },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { id: props.labelId, className: 'ms-Label' }, props.text))) : react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { id: props.labelId, className: 'ms-Label' }, props.text)));
    };
    PropertyPaneGroup.prototype._onNotifyValidationResult = function (errorMessage, value, groupField, /* tslint:disable-line:no-any */ setEntryState) {
        if (setEntryState) {
            setEntryState(groupField.targetProperty, !errorMessage);
        }
        this._onChange(groupField, value);
    };
    /* tslint:disable-next-line:no-any */
    PropertyPaneGroup.prototype._validateDynamicDataPath = function (groupField, value) {
        var errorMessage = '';
        // Call the web part's onGetErrorMessage before the framework validation.
        if (groupField.properties.onGetErrorMessage) {
            errorMessage = groupField.properties.onGetErrorMessage(value);
        }
        // Error message will be null in two cases:
        //  1. When web part's validation returns no error
        //  2. When web part's onGetErrorMessage is not defined
        // In either of the cases framework validation should happen.
        if (!errorMessage) {
            if (!!value.match(PropertyPaneGroup_1.DYNAMICPROPERTY_DEFAULT_REGEX) ||
                !!value.match(PropertyPaneGroup_1.DYNAMICPROPERTY_COMPONENT_REGEX)) {
                var dynamicProperty = this._getDynamicProperty(value, groupField);
                if (!dynamicProperty.tryGetValue()) {
                    // entered string does not return any dynamic data
                    errorMessage = _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_20__["default"].NoDynamicDataReturnedErrorText;
                }
            }
        }
        return errorMessage;
    };
    /**
     * Returns the dynamic property object if any, for the given value.
     *
     * @param value - value of property pane dynamic text field.
     * @param groupField - property pane dyanmic text field.
     */
    PropertyPaneGroup.prototype._getDynamicProperty = function (value, groupField) {
        var dynamicProperty = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_13__["DynamicProperty"](groupField.properties.dynamicDataProvider, groupField.properties.changeCallback);
        // if the entered string conforms to the dynamic data resource path,
        // then set the reference, else set it as a static value.
        var matches = PropertyPaneGroup_1.DYNAMICPROPERTY_DEFAULT_REGEX.exec(value) ||
            PropertyPaneGroup_1.DYNAMICPROPERTY_COMPONENT_REGEX.exec(value);
        if (matches) {
            dynamicProperty.setReference(matches[1]); // The captured group is at index 1, always.
        }
        else {
            dynamicProperty.setValue(value);
        }
        return dynamicProperty;
    };
    PropertyPaneGroup.prototype._onFocusTextFieldPropertyPane = function (ev, props) {
        /**
         * Record the initial text content when focus entered text field.
         * It is used in blur event handler to compare the content.
         */
        if (props.logName) {
            this._initialValue = ev.target.value;
        }
    };
    PropertyPaneGroup.prototype._onBlurTextFieldPropertyPane = function (ev, props) {
        /**
         * Scenario name:
         * 1. Number of time text field in property pane is entered in edit mode.
         * 2. Distribution of character number added in text field after one edition.
         * 3. Type of edition user take. E.g. Clear, Add or Edit.
         * Signal: Log the value of text area when focus goes out. Seen it as user finished edit.
         * It will not be logged if user doesn't make change.
         */
        if (props.logName) {
            var action = void 0;
            var currentText = ev.target.value;
            var defaultValue = props.value || '';
            if (this._initialValue !== currentText) {
                if (currentText === defaultValue || currentText === '') {
                    action = 'Clear';
                }
                else if (this._initialValue === defaultValue) {
                    action = 'Add';
                }
                else {
                    action = 'Edit';
                }
                _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_14__["_EngagementLogger"].logEventWithLogEntry(new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_14__["_LogEntry"](props.logName.moduleName, props.logName.controlName, _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_14__["_LogType"].Event, {
                    'action': action,
                    'length': currentText.length.toString()
                }));
            }
        }
    };
    /**
     * Event handler for a ChoiceGroup's onChange event.
     *
  * @params {IPropertyPaneField} groupField: the property pane control which has just invoked onChanged event.
  * @params {IChoiceGroupOption} checkedOption: the option representing the field which is checked now.
                                                                                    */
    PropertyPaneGroup.prototype._onChoiceGroupChange = function (groupField, checkedOption) {
        // Maintain the choice group props before EVERYTHING happens.
        // It is needed because the design flaw of Fabric-React ChoiceGroup. Discussions in PR:
        // https://aka.ms/fociu0
        groupField.properties.options.forEach(function (option) {
            return option.checked = option.key === checkedOption.key;
        });
        this._onChange(groupField, checkedOption.key);
    };
    /**
     * Event handler for a DropDown's onChange event.
     * @todo (SPPPLAT VSO#169096) Change fabric controls to send in a common type for all the events.
     * Then change this method to use the common type.
     */
    PropertyPaneGroup.prototype._onDropDownChange = function (groupField, selectedItem, selectedIndex) {
        // invoke onPropertyChange event
        if (this.props.onChange) {
            this.props.onChange(groupField.targetProperty, selectedItem.key);
        }
    };
    /**
     * Event handler for a group field's onChange event.
     */
    /* tslint:disable-next-line:no-any */
    PropertyPaneGroup.prototype._onChange = function (groupField, /* tslint:disable-line:no-any */ value, /* tslint:disable-line:no-any */ fieldType) {
        if (this.props.onChange) {
            this.props.onChange(groupField.targetProperty, value, fieldType);
        }
        // enable/disable Save button
        if (!groupField.properties.onGetErrorMessage && this.props.setEntryState) {
            this.props.setEntryState(groupField.targetProperty, true);
        }
    };
    /**
     * Event handler for header click.
     */
    PropertyPaneGroup.prototype._onHeaderClicked = function () {
        // We maintain the state of the propertypane group only if the user assigns a name to it.
        if (this.props.groupName && this.props.groupName.length > 0) {
            this.props.propertyPaneGroupStateChanged(this.props.pageNumber, this.props.groupName, !this.state.isDetailsShown);
        }
        this.setState({
            isDetailsShown: !this.state.isDetailsShown
        });
    };
    /**
     * Method to check if the passed in groupfield is disabled or not.
     *
     * To support backward compatibility we are checking for 'isDisabled', 'enabled' and 'isEnabled'
     * property values.
     */
    PropertyPaneGroup.prototype._isDisabled = function (groupField) {
        var disabled = groupField.properties.disabled;
        /**
         * This is to support backward compatibilty.
         * If the 'disabled' proeprty is undefined then we check for the old properties if any and take their
         * value.
         */
        if (disabled === undefined) {
            if (groupField.properties.hasOwnProperty('isDisabled') && groupField.properties.isDisabled !== undefined) {
                disabled = groupField.properties.isDisabled;
            }
            else if (groupField.properties.hasOwnProperty('enabled') && groupField.properties.enabled !== undefined) {
                disabled = !groupField.properties.enabled;
            }
            else if (groupField.properties.hasOwnProperty('isEnabled') && groupField.properties.isEnabled !== undefined) {
                disabled = !groupField.properties.isEnabled;
            }
        }
        return disabled;
    };
    PropertyPaneGroup.prototype._onDynamicDataChanged = function (groupField, targetProperty, newPropValue // tslint:disable-line:no-any
    ) {
        // For dynamic fields, target property is not set at the top level.
        // It is at the entry level. Hence re-assigning the targetProperty here,
        // which is used in for example, BaseWebPart to notify the web part of the change.
        groupField.targetProperty = targetProperty;
        this._onChange(groupField, newPropValue);
    };
    var PropertyPaneGroup_1;
    /**
     * Regex for the dynamic property if it takes the form as in below example:
     * [PageContext:User:Email]
     */
    PropertyPaneGroup.DYNAMICPROPERTY_DEFAULT_REGEX = /^\[(\w+:\w+(?::\w+)?)\]$/;
    /**
     * Regex for the dynamic property if it takes the form as in below example:
     * `${component.manifest.componentType}.${component.manifest.id}.${component.instanceId}`
     */
    /* tslint:disable:max-line-length */
    PropertyPaneGroup.DYNAMICPROPERTY_COMPONENT_REGEX = /^\[([a-zA-Z]+\.([0-9A-Fa-f]{8}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{12})\.([0-9A-Fa-f]{8}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{12}):\w+(?::\w+)?)\]$/;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], PropertyPaneGroup.prototype, "_renderGroupField", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], PropertyPaneGroup.prototype, "_renderChoiceGroupWithSvg", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_4__["autobind"]
    ], PropertyPaneGroup.prototype, "_onDynamicDataChanged", null);
    PropertyPaneGroup = PropertyPaneGroup_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_2__["sealed"]
    ], PropertyPaneGroup);
    return PropertyPaneGroup;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneGroup);


/***/ }),

/***/ "erW/":
/*!**************************************************************************!*\
  !*** ./lib/propertyPaneConditionalGroup/PropertyPaneConditionalGroup.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loc/Strings.resx */ "qITA");
/* harmony import */ var _secondaryGroupConnector_SecondaryGroupConnector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./secondaryGroupConnector/SecondaryGroupConnector */ "kQuY");
/* harmony import */ var _PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PropertyPaneConditionalGroup.module.scss */ "Ckoa");
/* harmony import */ var _propertyPaneGroup_PropertyPaneGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../propertyPaneGroup/PropertyPaneGroup */ "c96I");







var PropertyPaneConditionalGroup = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPaneConditionalGroup, _super);
    function PropertyPaneConditionalGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showSecondaryGroup: _this.props.showSecondaryGroup
        };
        return _this;
    }
    PropertyPaneConditionalGroup.prototype.render = function () {
        var _this = this;
        var showSecondaryGroup = this.state.showSecondaryGroup;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", null,
            !showSecondaryGroup &&
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_secondaryGroupConnector_SecondaryGroupConnector__WEBPACK_IMPORTED_MODULE_4__["default"], { onConnectToSourceClick: function () { return _this._onShowSecondaryClick(); } }),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].clear }),
            this._renderGroup(),
            showSecondaryGroup &&
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].removeConnectionButton },
                    react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Link"], { onClick: this._onShowPrimaryClick }, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_3__["default"].DynamicDataRemoveConnectionText))));
    };
    PropertyPaneConditionalGroup.prototype._renderGroup = function () {
        var showSecondaryGroup = this.state.showSecondaryGroup;
        var group = showSecondaryGroup ? this.props.secondaryGroup : this.props.primaryGroup;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_propertyPaneGroup_PropertyPaneGroup__WEBPACK_IMPORTED_MODULE_6__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { key: group.groupName || this.props.index, pageNumber: this.props.pageNumber, groupName: group.groupName, groupFields: group.groupFields, onChange: this.props.onChange, properties: this.props.properties, setEntryState: this.props.setEntryState, isCollapsed: group.isCollapsed, displayGroupsAsAccordion: this.props.displayGroupsAsAccordion, propertyPaneGroupStateChanged: this.props.propertyPaneGroupStateChanged, propertyPanePagesStateMap: this.props.propertyPanePagesStateMap, dynamicConfiguration: this.props.dynamicConfiguration })));
    };
    /**
     * Prepares the component to show the secondary group of fields.
     */
    PropertyPaneConditionalGroup.prototype._onShowSecondaryClick = function () {
        if (this.props.onShowSecondaryGroup) {
            this.props.onShowSecondaryGroup();
        }
        this.setState({
            showSecondaryGroup: true
        });
    };
    /**
     * Prepares the component to show the primary group fields.
     */
    PropertyPaneConditionalGroup.prototype._onShowPrimaryClick = function () {
        if (this.props.onShowPrimaryGroup) {
            this.props.onShowPrimaryGroup();
        }
        this.setState({
            showSecondaryGroup: false
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PropertyPaneConditionalGroup.prototype, "_onShowSecondaryClick", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], PropertyPaneConditionalGroup.prototype, "_onShowPrimaryClick", null);
    return PropertyPaneConditionalGroup;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneConditionalGroup);


/***/ }),

/***/ "iyMd":
/*!**************************************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/dynamicDataWidgetEntry/DynamicDataWidgetEntry.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! office-ui-fabric-react/lib/components/Dropdown/Dropdown */ "Ry80");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../loc/Strings.resx */ "qITA");







var MAX_PROPERTY_VALUE_DEPTH = 2;
var DynamicDataWidgetEntry = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DynamicDataWidgetEntry, _super);
    function DynamicDataWidgetEntry(props) {
        var _this = _super.call(this, props) || this;
        _this._selectedSubPropertyText = '';
        _this.state = {
            selectedSubPropertyPath: _this.props.value._getPropertyPath(),
            selectedSubPropertyText: undefined
        };
        _this._updateReference();
        return _this;
    }
    DynamicDataWidgetEntry.prototype.UNSAFE_componentWillReceiveProps = function (newProps) {
        var _this = this;
        if (this.props.selectedSource.id !== newProps.selectedSource.id ||
            this.props.selectedPropertyId !== newProps.selectedPropertyId) {
            // reset state when the selected property changes.
            this.setState({
                selectedSubPropertyText: '',
                selectedSubPropertyPath: ''
            }, function () {
                _this._updateReference();
            });
        }
    };
    /**
     * Renders the entries based on the maxPropertyValueDepth value provided by the component.
     * If the value of maxPropertyValueDepth is invalid then we display a console warning and
     * fall back to the default depth(MAX_SUBPROPERTY_DEPTH).
     * If it is not provided then we fall back to the default depth.
     */
    DynamicDataWidgetEntry.prototype.render = function () {
        var selectedPropertyId = this.props.selectedPropertyId;
        var selectedSubPropertyPath = this.state.selectedSubPropertyPath;
        var dropDowns = [];
        // Construct the next level of dropdowns, only if a property is selected.
        if (selectedPropertyId) {
            var level = 0;
            var currentPropertyPath = selectedPropertyId;
            var subProperties = selectedSubPropertyPath ? selectedSubPropertyPath.split('.') : [];
            var maxDepth = this._getMaxSubPropertyDepth();
            while (level < maxDepth && currentPropertyPath && subProperties) {
                dropDowns.push(this._getDropdownForSubProperty(level, currentPropertyPath, subProperties[level]));
                currentPropertyPath = subProperties[level] ? currentPropertyPath + '.' + subProperties[level] : '';
                level++;
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", null, dropDowns));
    };
    /**
     * Returns the dropdown for the sub property.
     *
     * @param level - Current level of the new dropdown
     * @param propertyPath - Property selected in the previous dropdown, and for which the dropdown
     *  needs to be constructed.
     * @param selectedKey - SelectedKey for the new dropdown.
     */
    DynamicDataWidgetEntry.prototype._getDropdownForSubProperty = function (level, propertyPath, selectedKey) {
        var key = this.props.parentKey + 'sub-property' + level;
        // If the sub-property is an array type, then the selected key will be of the type
        // <subPropertyName>[*]. Hence extracting the sub property name, accordingly.
        selectedKey = selectedKey && selectedKey.split(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicDataProvider"]._jsonPathArrayRegex)[0];
        var options = this._getDropdownOptions(this._getSubPropertyValueObject(propertyPath), propertyPath, false, selectedKey);
        var selectedText = (level === 0) ?
            this.props.selectedPropertyText :
            (this.state.selectedSubPropertyText || this._selectedSubPropertyText);
        return (react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", { key: key }, (options.length > 0) &&
            react__WEBPACK_IMPORTED_MODULE_5__["createElement"](office_ui_fabric_react_lib_components_Dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_4__["Dropdown"], { label: _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].DynamicDataPropertiesDropdownLabel, selectedText), onChanged: this._onSubPropertySelectionChange.bind(this, level), options: options, selectedKey: selectedKey || '', "data-automation-id": 'DynamicDataWidgetEntryDropdown' })));
    };
    /**
     * Handler for the sub property dropdown.
     *
     * @param option - selected option.
     * @param level - level of the current dropdown among the sub property dropdowns.
     */
    DynamicDataWidgetEntry.prototype._onSubPropertySelectionChange = function (level, option) {
        var _this = this;
        var _a = this.state, selectedSubPropertyPath = _a.selectedSubPropertyPath, selectedSubPropertyText = _a.selectedSubPropertyText;
        var selectedKey = option.key;
        var paths = selectedSubPropertyPath ? selectedSubPropertyPath.split('.') : [];
        // Update the 'level' indexed path and anything before that remains same as previous
        // and anything after will be removed, as those entries don't belong to the newly selected option.
        selectedSubPropertyPath = '';
        for (var i = 0; i < level; i++) {
            selectedSubPropertyPath += paths[i] + '.';
        }
        selectedSubPropertyPath = selectedKey ?
            selectedSubPropertyPath + selectedKey : selectedSubPropertyPath.slice(0, -1); // Remove extra . at the end.
        selectedSubPropertyText = level === 0 ?
            option.text : selectedSubPropertyText;
        this.setState({
            selectedSubPropertyText: selectedSubPropertyText,
            selectedSubPropertyPath: selectedSubPropertyPath
        }, function () {
            _this._updateReference();
        });
    };
    /**
     * Returns the dropdown options based on the type of the object passed.
     *
     * @param propValue - Object with which dropdown options are to to be built.
     * @param propertyPath - property path at the current level
     * @param recursiveCall - Indicates whether it is recursive call or not.
     * @param selectedKey - Key to be marked as selected.
     */
    DynamicDataWidgetEntry.prototype._getDropdownOptions = function (propValue, // tslint:disable-line:no-any
    propertyPath, recursiveCall, selectedKey) {
        var _this = this;
        var options = [];
        // If the propValue is not object type we don't want to create any dropdown for it.
        if (typeof propValue === 'object') {
            if (Array.isArray(propValue)) { // propertyValue is of type Array or Set.
                options = this._getDropdownOptions(propValue[0], propertyPath, true, selectedKey);
            }
            else if (propValue instanceof Set) {
                // Handle this case
            }
            else if (propValue instanceof Map) {
                propValue.forEach(function (value, key) {
                    options.push(_this._getDropdownOption(propertyPath, key, selectedKey));
                });
            }
            else { // propertyValue is of type object
                Object.keys(propValue).forEach(function (key) {
                    options.push(_this._getDropdownOption(propertyPath, key, selectedKey));
                });
            }
            // Adding empty option in the begining.
            // It is only for sub-property dropdowns.
            if (!recursiveCall && options.length > 1) {
                options.unshift({ key: '', text: '' });
            }
        }
        return options;
    };
    /**
     * Returns a dropdown option based on the proeprty path and the key.
     * @param propertyPath - property path to the current level
     * @param key - key with which the dropdown option is built.
     * @param selectedKey - Current selected key.
     */
    DynamicDataWidgetEntry.prototype._getDropdownOption = function (propertyPath, key, selectedKey) {
        if (key === selectedKey) {
            this._selectedSubPropertyText = key;
        }
        return {
            key: key,
            text: this._getOptionText(propertyPath, key) || key
        };
    };
    /**
     * Returns the text for the dropdown option, given the property path
     * @param propertyPath - property path to the current level
     * @param key - key for which the text is required.
     */
    DynamicDataWidgetEntry.prototype._getOptionText = function (propertyPath, key) {
        if (this._currentAnnotatedPropertyValue && this._currentAnnotatedPropertyValue.metadata) {
            var subPaths = propertyPath.split('.').slice(1);
            var metadata = this._currentAnnotatedPropertyValue.metadata;
            for (var _i = 0, subPaths_1 = subPaths; _i < subPaths_1.length; _i++) {
                var subPath = subPaths_1[_i];
                if (metadata && metadata.hasOwnProperty(subPath)) {
                    if (key === subPath) {
                        return metadata[subPath].title;
                    }
                    metadata = metadata[subPath].metadata;
                }
                else {
                    return undefined;
                }
            }
            if (metadata && metadata.hasOwnProperty(key)) {
                return metadata[key].title;
            }
        }
        else {
            return undefined;
        }
    };
    /**
     * Updates dynamic property's reference using the current state
     */
    DynamicDataWidgetEntry.prototype._updateReference = function () {
        if (this.props.selectedPropertyId) {
            var reference = this.props.selectedSource.id + ':' + this.props.selectedPropertyId;
            // check if the selectedPropertyId is returning an array
            if (this._isSelectedPropertyValueAnArray()) {
                reference += '[*]';
            }
            if (this.state.selectedSubPropertyPath) {
                var subPropertyPath = this._getSubPropertyPath();
                if (subPropertyPath) {
                    reference += ':' + subPropertyPath;
                }
            }
            this.props.value.setReference(reference);
            this.props.onChange(this.props.targetProperty, this.props.value);
        }
    };
    /**
     * Returns the max sub-property depth to show on the widget.
     */
    DynamicDataWidgetEntry.prototype._getMaxSubPropertyDepth = function () {
        var propertyValueDepth = this.props.propertyValueDepth;
        var maxDepth = MAX_PROPERTY_VALUE_DEPTH;
        if (propertyValueDepth !== undefined) {
            if (propertyValueDepth >= 0 && propertyValueDepth < 2) {
                maxDepth = propertyValueDepth;
            }
            else {
                _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Log"].warn('propertyValueDepth', _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["Text"].format(_loc_Strings_resx__WEBPACK_IMPORTED_MODULE_6__["default"].InvalidPropertyValueDepthWarning, 'propertyValueDepth', 0, 2));
            }
        }
        return maxDepth;
    };
    /**
     * Returns the sub property value object based on the given property path.
     * @param propertyPath - property path to the current level
     */
    DynamicDataWidgetEntry.prototype._getSubPropertyValueObject = function (propertyPath) {
        var subPropertyValueObject; // tslint:disable-line:no-any
        var subPaths = propertyPath.split('.');
        // first sub path will always be the property
        var property = subPaths.shift();
        this._currentAnnotatedPropertyValue =
            this.props.selectedSource.getAnnotatedPropertyValue(property); /* tslint:disable-line:no-any */
        subPropertyValueObject = this._currentAnnotatedPropertyValue.sampleValue;
        // Look for the existence of sub-paths only if the subPropertyValueObject is an object type
        if (typeof subPropertyValueObject === 'object') {
            for (var _i = 0, subPaths_2 = subPaths; _i < subPaths_2.length; _i++) {
                var subPath = subPaths_2[_i];
                // If the sub-property is an array type, then the selected key will be of the type
                // <subPropertyName>[*]. Hence extracting the sub property name, accordingly.
                subPath = subPath.split(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicDataProvider"]._jsonPathArrayRegex)[0];
                // If the subPropertyValueObject is an array type recursively go inside of the array until
                // the value is not an array, and assign the value to the subPropertyValueObject at every step.
                while (Array.isArray(subPropertyValueObject)) {
                    subPropertyValueObject = subPropertyValueObject[0];
                }
                // At this point, subPropertyValueObject is not an array.
                // Look for sub-path only if subPropertyValueObject is an object type.
                if (typeof subPropertyValueObject === 'object') {
                    if (subPropertyValueObject.hasOwnProperty(subPath)) {
                        subPropertyValueObject = subPropertyValueObject[subPath];
                    }
                }
            }
        }
        return subPropertyValueObject;
    };
    DynamicDataWidgetEntry.prototype._isSelectedPropertyValueAnArray = function () {
        var _a = this.props, selectedSource = _a.selectedSource, selectedPropertyId = _a.selectedPropertyId;
        /* tslint:disable-next-line:no-any */
        var sampleValue = selectedSource.getAnnotatedPropertyValue(selectedPropertyId).sampleValue;
        return Array.isArray(sampleValue);
    };
    /**
     * Returns the sub-property path based on the current state. If the sub-property which is in the current
     * state, is not present on the reatltime object, then we return an empty string.
     *
     * @remarks
     * If the sub-property value associated with the subPropertyPath, is an array then the
     * subPropertyPath will have [*] notation appended at the end to support valid JSON Path notation.
     * Hence when reading the property id, we account for that and extract the name accordingly.
     */
    DynamicDataWidgetEntry.prototype._getSubPropertyPath = function () {
        var _a = this.props, selectedSource = _a.selectedSource, selectedPropertyId = _a.selectedPropertyId;
        var subPropertyReferencePath = '';
        var subPropertyPaths = this.state.selectedSubPropertyPath.split('.');
        /* tslint:disable-next-line:no-any */
        var propertyValueObject = selectedSource.getAnnotatedPropertyValue(selectedPropertyId).sampleValue;
        subPropertyPaths.forEach(function (subPropertyPath) {
            // If the sub-property is an array type, then the selected key will be of the type
            // <subPropertyName>[*]. Hence extracting the sub property name, accordingly.
            subPropertyPath = subPropertyPath.split(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_2__["DynamicDataProvider"]._jsonPathArrayRegex)[0];
            if (propertyValueObject) {
                while (Array.isArray(propertyValueObject) && propertyValueObject.length) {
                    propertyValueObject = propertyValueObject[0];
                }
                if (propertyValueObject.hasOwnProperty(subPropertyPath)) { // It means propertyValueObject is an object.
                    subPropertyReferencePath += subPropertyPath;
                    var subPropertyValueObject = propertyValueObject[subPropertyPath]; /* tslint:disable-line:no-any */
                    if (Array.isArray(subPropertyValueObject)) {
                        subPropertyReferencePath += '[*]';
                    }
                    subPropertyReferencePath += '.';
                    propertyValueObject = subPropertyValueObject;
                }
                else {
                    // If the control is here, it means that the subProperty was not found in propertyValueObject.
                    // Hence the next iteration would get propertyValueObject as undefined.
                    propertyValueObject = undefined;
                }
            }
        });
        // remove extra '.' at the end, if any.
        return subPropertyReferencePath.replace(/\.$/, '');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetEntry.prototype, "_onSubPropertySelectionChange", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetEntry.prototype, "_getDropdownOption", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetEntry.prototype, "_getOptionText", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetEntry.prototype, "_updateReference", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DynamicDataWidgetEntry.prototype, "_getMaxSubPropertyDepth", null);
    return DynamicDataWidgetEntry;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataWidgetEntry);


/***/ }),

/***/ "jKPa":
/*!***************************************************************************************!*\
  !*** ./lib/propertyPaneFields/propertyPaneCustomField/PropertyPaneCustomFieldHost.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__);




/**
 * This is used as the target property in the cases when the user does not provide a target proeprty
 * in the changeCallback.
 */
var CUSTOMFIELD_TARGETPROPERTY_PREFIX = '__CustomField_';
/**
 * This component help web part developers add custom components into the PropertyPane.
 * The PropertyPane support a host of inbuilt field types. But that list can never be sufficient.
 * This component fills in the gap by allowing the web part developer to create
 * a custom field type and use the PropertyPane as per their need.
 *
 * @beta
 */
/* tslint:disable:no-any */
var PropertyPaneCustomFieldHost = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPaneCustomFieldHost, _super);
    function PropertyPaneCustomFieldHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPaneCustomFieldHost.prototype.componentDidMount = function () {
        this._domElement = react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"](this);
        this.props.onRender(this._domElement, this.props.context, this._onChangedCallback.bind(this));
    };
    PropertyPaneCustomFieldHost.prototype.componentDidUpdate = function () {
        if (this._domElement) {
            this.props.onRender(this._domElement, this.props.context, this._onChangedCallback.bind(this));
        }
    };
    PropertyPaneCustomFieldHost.prototype.componentWillUnmount = function () {
        if (this.props.onDispose && this._domElement) {
            this.props.onDispose(this._domElement, this.props.context);
            var didUnmount = react_dom__WEBPACK_IMPORTED_MODULE_2__["unmountComponentAtNode"](this._domElement);
            this._domElement = undefined;
            var logEntry = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogEntry"](PropertyPaneCustomFieldHost._logSource.id, 'TryUnmountReactComponent', _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogType"].Event, {
                didUnmount: didUnmount.toString()
            });
            _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_EngagementLogger"].logEventWithLogEntry(logEntry);
        }
    };
    PropertyPaneCustomFieldHost.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: 'ms-CustomFieldHost' }));
    };
    PropertyPaneCustomFieldHost.prototype._onChangedCallback = function (targetProperty, value) {
        if (!targetProperty) {
            // Appending the key to make it 'unique' to each custom field
            targetProperty = CUSTOMFIELD_TARGETPROPERTY_PREFIX + this.props.key;
            // Making the value 'undefined' if the target property is not specified.
            value = undefined;
        }
        this.props.onChanged(targetProperty, value);
    };
    /* tslint:enable:no-any */
    PropertyPaneCustomFieldHost._logSource = _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_3__["_LogSource"].create('PropertyPaneCustomFieldHost');
    return PropertyPaneCustomFieldHost;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneCustomFieldHost);


/***/ }),

/***/ "kQuY":
/*!*********************************************************************************************!*\
  !*** ./lib/propertyPaneConditionalGroup/secondaryGroupConnector/SecondaryGroupConnector.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PropertyPaneConditionalGroup.module.scss */ "Ckoa");
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../loc/Strings.resx */ "qITA");






var SecondaryGroupConnector = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SecondaryGroupConnector, _super);
    function SecondaryGroupConnector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isCalloutVisible: false
        };
        return _this;
    }
    SecondaryGroupConnector.prototype.render = function () {
        var isCalloutVisible = this.state.isCalloutVisible;
        var secondaryConnectorClassName = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["css"])(_PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].alternateFieldsConnector, _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_3__["_BrowserDetection"].getBrowserInformation().os === 4 /* Mac */ ? _PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].mac_only : '');
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: secondaryConnectorClassName, role: 'button', onClick: this._handleConnectorClick },
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this._resolveRef('_ellipsisElement'), title: this.props.tooltip },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].DynamicDataSecondaryGroupButtonLabel)),
            isCalloutVisible &&
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { className: _PropertyPaneConditionalGroup_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].callout },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["Callout"], { role: 'alertdialog', isBeakVisible: false, setInitialFocus: true, directionalHint: _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DirectionalHint"].bottomCenter, onDismiss: this._handleCalloutDismiss, target: this._ellipsisElement },
                        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["DefaultButton"], { "data-automation-id": 'connectToSource', onClick: this._onConnectToSourceClick, iconProps: { iconName: 'Plug' }, ariaDescription: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ConnectToDynamicDataSourceDescription, text: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_5__["default"].ConnectToDynamicDataSource })))));
    };
    SecondaryGroupConnector.prototype._handleConnectorClick = function () {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible
        });
    };
    SecondaryGroupConnector.prototype._handleCalloutDismiss = function () {
        this.setState({
            isCalloutVisible: false
        });
    };
    SecondaryGroupConnector.prototype._onConnectToSourceClick = function () {
        this.props.onConnectToSourceClick();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], SecondaryGroupConnector.prototype, "_handleConnectorClick", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], SecondaryGroupConnector.prototype, "_handleCalloutDismiss", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["autobind"]
    ], SecondaryGroupConnector.prototype, "_onConnectToSourceClick", null);
    return SecondaryGroupConnector;
}(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (SecondaryGroupConnector);


/***/ }),

/***/ "lWt6":
/*!******************************************************************!*\
  !*** ./lib/propertyPaneFooter/PropertyPaneFooter.module.scss.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneFooter.module.css */ "RaHs");
var styles = {
    propertyPaneFooter: 'propertyPaneFooter_5198fc48',
    propertyPaneCommandButtonsBox: 'propertyPaneCommandButtonsBox_5198fc48',
    propertyPanePageNav: 'propertyPanePageNav_5198fc48',
    propertyPaneBackNavLink: 'propertyPaneBackNavLink_5198fc48',
    propertyPaneNextNavLink: 'propertyPaneNextNavLink_5198fc48',
    propertyPaneBackArrow: 'propertyPaneBackArrow_5198fc48',
    propertyPaneNextArrow: 'propertyPaneNextArrow_5198fc48',
    propertyPanePageOfPages: 'propertyPanePageOfPages_5198fc48'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "mvqF":
/*!**********************************************************!*\
  !*** ./lib/propertyPaneTitleBar/PropertyPaneTitleBar.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loc/Strings.resx */ "qITA");
/* harmony import */ var _PropertyPaneTitleBar_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PropertyPaneTitleBar.module.scss */ "JGSf");
/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file PropertyPaneTitleBar.tsx
 */






var PropertyPaneTitleBar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PropertyPaneTitleBar, _super);
    function PropertyPaneTitleBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyPaneTitleBar.prototype.render = function () {
        var cancelIconProps = { iconName: 'Cancel' };
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _PropertyPaneTitleBar_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].propertyPaneTitleBarBox },
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _PropertyPaneTitleBar_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].propertyPaneTitleBar },
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { className: _PropertyPaneTitleBar_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].propertyPanePageTitle, "aria-hidden": true }, this.props.title),
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_3__["IconButton"], { className: _PropertyPaneTitleBar_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].propertyPaneClose, iconProps: cancelIconProps, title: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Close, onClick: this.props.onClose, ariaLabel: _loc_Strings_resx__WEBPACK_IMPORTED_MODULE_4__["default"].Close }))));
    };
    PropertyPaneTitleBar = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_decorators__WEBPACK_IMPORTED_MODULE_1__["sealed"]
    ], PropertyPaneTitleBar);
    return PropertyPaneTitleBar;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PropertyPaneTitleBar);


/***/ }),

/***/ "n+ee":
/*!****************************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/dynamicDataWidget/DynamicDataWidget.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DynamicDataWidget.module.scss */ "3/fy");
/* harmony import */ var _dynamicDataWidgetSource_DynamicDataWidgetSource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dynamicDataWidgetSource/DynamicDataWidgetSource */ "KeSm");
/* harmony import */ var _IDynamicConfiguration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../IDynamicConfiguration */ "h6Kt");






var DynamicDataWidget = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DynamicDataWidget, _super);
    function DynamicDataWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders the dynamic data widget.
     */
    DynamicDataWidget.prototype.render = function () {
        var _this = this;
        this._widgetSources = [];
        if (this._isSourceShared()) {
            this._widgetSources.push(this._renderWidgetSource(this.props.entries));
        }
        else {
            this.props.entries.forEach(function (entry) {
                _this._widgetSources.push(_this._renderWidgetSource([entry]));
            });
        }
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", null, this._widgetSources));
    };
    /**
     * Source is usually shared. However, in the case of DynamicFieldSet there
     * is a possibility that multiple fields are passed, with no shared configuration.
     *
     * It is assumed that if the property is shared, then automatically source will
     * become shared.
     */
    DynamicDataWidget.prototype._isSourceShared = function () {
        // TODO: This should be fixed after the Experience Review where DynamicField and DynamicFieldSet
        // share the same implementation
        if (this.props.entries.length === 1) {
            return true;
        }
        else {
            // If we are here, then the type must be DynamicFieldSet
            var sharedConfiguration = this.props.fieldProperties.sharedConfiguration;
            return !!(sharedConfiguration && sharedConfiguration.depth !== _IDynamicConfiguration__WEBPACK_IMPORTED_MODULE_5__["DynamicDataSharedDepth"].None);
        }
    };
    DynamicDataWidget.prototype._renderWidgetSource = function (entries) {
        var currentKey = this.props.parentKey + '-dynamicDataWidgetSource' + this._widgetSources.length;
        return (react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", { key: currentKey, className: _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].dynamicDataWidget },
            (entries.length === 1) &&
                react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: _DynamicDataWidget_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].entryLabel }, entries[0].properties.label),
            react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_dynamicDataWidgetSource_DynamicDataWidgetSource__WEBPACK_IMPORTED_MODULE_4__["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.props, { parentKey: currentKey, entries: entries }))));
    };
    return DynamicDataWidget;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (DynamicDataWidget);


/***/ }),

/***/ "nmRd":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPaneFooter/PropertyPaneFooter.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".propertyPaneFooter_5198fc48{background-color:\"[theme:primaryBackground, default: #ffffff]\";position:absolute;bottom:0;left:0;padding:20px;right:0}.propertyPaneCommandButtonsBox_5198fc48{padding-bottom:20px}.propertyPanePageNav_5198fc48{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.propertyPaneBackNavLink_5198fc48,.propertyPaneNextNavLink_5198fc48{background-color:transparent;border:0;color:\"[theme:neutralPrimary, default: #333333]\";font-size:14px;font-weight:400;height:32px;outline:0;padding:0}.propertyPaneBackNavLink_5198fc48 .propertyPaneBackArrow_5198fc48,.propertyPaneBackNavLink_5198fc48 .propertyPaneNextArrow_5198fc48,.propertyPaneNextNavLink_5198fc48 .propertyPaneBackArrow_5198fc48,.propertyPaneNextNavLink_5198fc48 .propertyPaneNextArrow_5198fc48{color:\"[theme:themePrimary, default: #0078d4]\";position:relative;top:2px}[dir=ltr] .propertyPaneBackNavLink_5198fc48 .propertyPaneBackArrow_5198fc48,[dir=ltr] .propertyPaneNextNavLink_5198fc48 .propertyPaneBackArrow_5198fc48{margin-right:4px}[dir=ltr] .propertyPaneBackNavLink_5198fc48 .propertyPaneNextArrow_5198fc48,[dir=ltr] .propertyPaneNextNavLink_5198fc48 .propertyPaneNextArrow_5198fc48,[dir=rtl] .propertyPaneBackNavLink_5198fc48 .propertyPaneBackArrow_5198fc48,[dir=rtl] .propertyPaneNextNavLink_5198fc48 .propertyPaneBackArrow_5198fc48{margin-left:4px}[dir=rtl] .propertyPaneBackNavLink_5198fc48 .propertyPaneNextArrow_5198fc48,[dir=rtl] .propertyPaneNextNavLink_5198fc48 .propertyPaneNextArrow_5198fc48{margin-right:4px}.propertyPaneBackNavLink_5198fc48:disabled,.propertyPaneBackNavLink_5198fc48:disabled .propertyPaneBackArrow_5198fc48,.propertyPaneBackNavLink_5198fc48:disabled .propertyPaneNextArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:disabled,.propertyPaneNextNavLink_5198fc48:disabled .propertyPaneBackArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:disabled .propertyPaneNextArrow_5198fc48{color:\"[theme:neutralTertiary, default: #a6a6a6]\"}.propertyPaneBackNavLink_5198fc48:not(:disabled):active,.propertyPaneBackNavLink_5198fc48:not(:disabled):focus,.propertyPaneBackNavLink_5198fc48:not(:disabled):hover,.propertyPaneNextNavLink_5198fc48:not(:disabled):active,.propertyPaneNextNavLink_5198fc48:not(:disabled):focus,.propertyPaneNextNavLink_5198fc48:not(:disabled):hover{background-color:\"[theme:themeLight, default: #c7e0f4]\";color:\"[theme:themePrimary, default: #0078d4]\";cursor:pointer}.propertyPaneBackNavLink_5198fc48:not(:disabled):active .propertyPaneBackArrow_5198fc48,.propertyPaneBackNavLink_5198fc48:not(:disabled):active .propertyPaneNextArrow_5198fc48,.propertyPaneBackNavLink_5198fc48:not(:disabled):focus .propertyPaneBackArrow_5198fc48,.propertyPaneBackNavLink_5198fc48:not(:disabled):focus .propertyPaneNextArrow_5198fc48,.propertyPaneBackNavLink_5198fc48:not(:disabled):hover .propertyPaneBackArrow_5198fc48,.propertyPaneBackNavLink_5198fc48:not(:disabled):hover .propertyPaneNextArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:not(:disabled):active .propertyPaneBackArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:not(:disabled):active .propertyPaneNextArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:not(:disabled):focus .propertyPaneBackArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:not(:disabled):focus .propertyPaneNextArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:not(:disabled):hover .propertyPaneBackArrow_5198fc48,.propertyPaneNextNavLink_5198fc48:not(:disabled):hover .propertyPaneNextArrow_5198fc48{color:\"[theme:themeDark, default: #005a9e]\"}.propertyPanePageOfPages_5198fc48{margin-top:6px}", ""]);



/***/ }),

/***/ "rDKC":
/*!**********************************************************!*\
  !*** ./lib/propertyPaneGroup/PropertyPaneGroupHelper.js ***!
  \**********************************************************/
/*! exports provided: generateGroupFieldKey, getFixedUpPropValue, getFixedUpDynamicProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateGroupFieldKey", function() { return generateGroupFieldKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedUpPropValue", function() { return getFixedUpPropValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedUpDynamicProperty", function() { return getFixedUpDynamicProperty; });
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-component-base */ "7Awa");
/* harmony import */ var _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../propertyPaneFields/propertyPaneField/IPropertyPaneField */ "jVqW");




/**
 * React requires a key to be set for each item in the collection.
 *
 * Key should be unique and consistent. With the way PropertyPane works today, it's very difficult to ensure the
 * consistency of the keys all the time. The only way we can achieve consistency all the time is when the web part
 * developer supplies a unique key with each field. From the framework standpoint, we did not want to keep the onus
 * of sending in the unique key with the web part developers. We are keeping it simple. Hence, solving the problem
 * for most of the cases. Uniqueness is obtained by maintaining a dictionary of keys.
 *
 * Choosing 'type' and 'targetProperty' as the key ensures that in most of the cases consistency is achieved.
 * This is because every field will have an associated target property or 'key' for CustomField.
 * For the corner cases where there is no targetProperty or same targetProperty is assigned to multiple fields,
 * we are generating a key appended by index.
 *
 * This will result in a compromised performance, but not very noticeable and hence we are okay with it.
 * If we can think of any better and simple solution to keep the consistency, we will revisit this logic.
 */
// tslint:disable-next-line:no-any
function generateGroupFieldKey(keys, groupField) {
    var key = '';
    if (groupField.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneFieldType"].Custom) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(groupField.properties.key, 'Custom field key');
        // CustomField uses `key` instead of `targetProperty`.
        // Adding group field type as prefix to avoid keys being messed up with keys from different control type.
        var customField = groupField;
        key = customField.type + "-" + customField.properties.key;
    }
    else { // Non-custom fields
        key = groupField.type + "-" + (groupField.targetProperty || '');
    }
    // Append the smallest unused index to the key and update the index.
    // @example
    // If two CustomField controls have same properties.key such as 'sampleKey'. Their final key generated will
    // be '1-sampleKey-0' and '1-sampleKey-1'. The prefix '1' represents the control type is CustomField.
    // The suffix '0' and '1' are indexes determined by the order they appear in PropertyPaneConfiguration.
    var keyIndex = keys[key] || 0;
    keys[key] = keyIndex + 1;
    key += "-" + keyIndex;
    return key;
}
/**
 * This method does the following things to fix up the propValue:
 * If the group field is a DynamicFieldSet then,
 *    - It creates a map of targetProperty and its fixed up dynamic property.
 *    - For each entry of the set,
 *      - it will extract the propValue from the properties and
 *      - check if the propValue is of type 'DynamicProperty', if
 *        - Yes, its a NO-OP. Everyhting is good with propValue, no fixup required.
 *        - No, then using its static value, make the propValue a DynamicProperty
 *  else if the group field is a DynamicField then,
 *    - Will check if the propValue is of type 'DynamicProperty', if
 *      - Yes, its a NO-OP. Everyhting is good with propValue, no fixup required.
 *      - No, then using its static value, make the propValue a DynamicProperty
 *  else
 *    - Will check if the propValue is of type DynamicProperty, if
 *      - Yes, then extract the value out of the DynamicProperty and assign it as
 *        a static value. This case is possible, when the developers map an existing
 *        dynamic field to a non dynamic field.
 *      - No, then it's a NO-OP
 *
 * @param propertyPaneField - Group field reference.
 */
// tslint:disable:no-any
function getFixedUpPropValue(propertyPaneField, properties, dynamicConfiguration) {
    var fixedUpPropValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["get"](properties, propertyPaneField.targetProperty);
    // tslint:enable:no-any
    if (propertyPaneField.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneFieldType"].DynamicFieldSet) { // DynamicFieldSet
        var entries_1 = [];
        propertyPaneField.properties.fields.forEach(function (field) {
            var propValue = _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["get"](properties, field.targetProperty); // tslint:disable-line:no-any
            entries_1.push({
                targetProperty: field.targetProperty,
                value: getFixedUpDynamicProperty(dynamicConfiguration, propValue),
                properties: field.properties
            });
        });
        fixedUpPropValue = entries_1;
    }
    else if (propertyPaneField.type === _propertyPaneFields_propertyPaneField_IPropertyPaneField__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneFieldType"].DynamicField) { // DynamicField
        var entry = {
            targetProperty: propertyPaneField.targetProperty,
            value: getFixedUpDynamicProperty(dynamicConfiguration, fixedUpPropValue),
            properties: propertyPaneField.properties
        };
        fixedUpPropValue = entry;
    }
    else { // Non dynamic field but the value is a DynamicProperty
        if (fixedUpPropValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["DynamicProperty"]) {
            fixedUpPropValue = fixedUpPropValue.tryGetValue(); // tslint:disable-line:no-any
        }
    }
    return fixedUpPropValue;
}
/**
 * Checks if the propValue is of type 'DynamicProperty', if
 *  - Yes, its a NO-OP. Everyhting is good with propValue, no fixup required.
 *  - No, then using its static value, make the propValue a DynamicProperty
 *
 * @remarks
 * If the component provides a callback as part of the groupfield properties's dynamicConfiguration
 * then we would take it else fall back to the defaultCallback of the component which is
 * provided by the framework. Example - BaseWebPart for web parts.

 * @param propValue - propValue to be fixed.
 */
function getFixedUpDynamicProperty(dynamicConfiguration, propValue // tslint:disable-line:no-any
) {
    var isDynamicProperty = (propValue instanceof _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["DynamicProperty"]);
    if (!isDynamicProperty) {
        var tempPropValue = propValue; // tslint:disable-line:no-any
        propValue = new _microsoft_sp_component_base__WEBPACK_IMPORTED_MODULE_0__["DynamicProperty"](dynamicConfiguration.dynamicDataProvider, dynamicConfiguration.defaultCallback);
        propValue.setValue(tempPropValue); // tslint:disable-line:no-any
    }
    return propValue;
}


/***/ }),

/***/ "rgOr":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!/Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./lib/propertyPanePage/PropertyPanePage.module.css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/runtime/api.js */ "j2/K")(false);
// Module
exports.push([module.i, ".propertyPaneTitleBarBox_d9891600{width:100%;top:0;overflow-x:hidden}.propertyPaneTitleBar_d9891600{padding:16px 20px;display:-webkit-box;display:-ms-flexbox;display:flex}.propertyPanePageTitle_d9891600{font-weight:600;font-size:\"[theme:xLargeFontSize, default: 20px]\";color:\"[theme:neutralPrimary, default: #323130]\";overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.propertyPaneClose_d9891600{background-color:transparent;border:none;color:\"[theme:neutralPrimary, default: #323130]\";cursor:pointer;font-size:20px;padding:0;min-width:0}[dir=ltr] .propertyPaneClose_d9891600{margin-right:-8px}[dir=rtl] .propertyPaneClose_d9891600{margin-left:-8px}[dir=ltr] .propertyPaneClose_d9891600{margin-left:auto}[dir=rtl] .propertyPaneClose_d9891600{margin-right:auto}.propertyPaneClose_d9891600:hover{background-color:\"[theme:neutralLighter, default: #f3f2f1]\"}.propertyPanePageContent_d9891600{position:absolute;width:100%;top:56px;bottom:0;overflow-x:hidden;overflow-y:auto}.propertyPanePageDescription_d9891600{font-size:15px;font-weight:400;padding:0 20px 16px;color:\"[theme:neutralPrimary, default: #333333]\";font-size:14px}", ""]);



/***/ }),

/***/ "wJEm":
/*!******************************************************************!*\
  !*** ./lib/propertyPaneDynamicData/DynamicDataWidget.module.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./DynamicDataWidget.module.css */ "PqP8");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "xYxX":
/*!****************************************************************!*\
  !*** ./lib/propertyPaneGroup/PropertyPaneGroup.module.scss.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./PropertyPaneGroup.module.css */ "zzIa");
var styles = {
    propertyPaneGroupHeader: 'propertyPaneGroupHeader_c1f6d2be',
    propertyPaneGroup: 'propertyPaneGroup_c1f6d2be',
    isExpanded: 'isExpanded_c1f6d2be',
    propertyPaneGroupContent: 'propertyPaneGroupContent_c1f6d2be',
    propertyPaneGroupHeaderText: 'propertyPaneGroupHeaderText_c1f6d2be',
    propertyPaneGroupHeaderIcon: 'propertyPaneGroupHeaderIcon_c1f6d2be',
    propertyPaneGroupHeaderWithAccordion: 'propertyPaneGroupHeaderWithAccordion_c1f6d2be',
    propertyPaneGroupHeaderNoAccordion: 'propertyPaneGroupHeaderNoAccordion_c1f6d2be',
    propertyPaneChoiceGroup: 'propertyPaneChoiceGroup_c1f6d2be',
    choiceGroupContainsIconOrImage: 'choiceGroupContainsIconOrImage_c1f6d2be',
    propertyPaneGroupField: 'propertyPaneGroupField_c1f6d2be'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "zzIa":
/*!************************************************************!*\
  !*** ./lib/propertyPaneGroup/PropertyPaneGroup.module.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/css-loader/2.0.2_webpack@4.35.3/node_modules/css-loader/dist/cjs.js!../../../../common/temp/node_modules/.onedrive.pkgs.visualstudio.com/postcss-loader/3.0.0/node_modules/postcss-loader/src??postcss!./PropertyPaneGroup.module.css */ "PFvA");
var loader = __webpack_require__(/*! @microsoft/load-themed-styles */ "jOlS");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ })

}]);
//# sourceMappingURL=chunk.property-pane-component_79336470e8f347af30a7.js.map