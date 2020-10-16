(window["webpackJsonpf7fa85fe_da91_45cb_9813_5c31106cba7b_0_1_0"] = window["webpackJsonpf7fa85fe_da91_45cb_9813_5c31106cba7b_0_1_0"] || []).push([["dragzonecontrol"],{

/***/ "0hgw":
/*!*****************************!*\
  !*** ./lib/DragZoneTree.js ***!
  \*****************************/
/*! exports provided: DragZoneTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragZoneTree", function() { return DragZoneTree; });
/* harmony import */ var _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragZoneUtilities */ "BTj3");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__);


var DATA_ATTRIBUTE = 'data-drag-tag';
var DATA_DISALLOWED_AREA_ATTRIBUTE = 'data-drag-disallowed-area-tag';
var DATA_DISALLOWED_ATTRIBUTE = 'data-drag-disallowed-tag';
var DATA_DRAG_HANDLE = 'data-drag-handle';
var DragZoneTree = /** @class */ (function () {
    function DragZoneTree(treeLevelTagsBottomUp, host) {
        this._bottomElements = new Map();
        this._positionMatrix = [];
        this._treeLevelTagsBottomUp = treeLevelTagsBottomUp;
        this._treeDepth = treeLevelTagsBottomUp.length;
        this._host = host;
        this._currentPosition = { x: undefined, y: undefined };
        this._startPosition = { x: undefined, y: undefined };
    }
    Object.defineProperty(DragZoneTree.prototype, "currentPosition", {
        get: function () {
            return this._currentPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragZoneTree.prototype, "startPosition", {
        get: function () {
            return this._startPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragZoneTree.prototype, "depth", {
        get: function () {
            return this._treeDepth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragZoneTree.prototype, "getDraggedItem", {
        get: function () {
            return this._getLeafElementFromMousePosition(this._startPosition.x, this._startPosition.y);
        },
        enumerable: true,
        configurable: true
    });
    DragZoneTree.prototype.getHoverOverItemPosition = function (el) {
        var element = el ||
            this.getBottomMostElementFromMousePosition();
        if (element) {
            return this._getElementPosition(element);
        }
        else {
            return undefined;
        }
    };
    DragZoneTree.prototype.getDraggedItemPosition = function () {
        var draggedElement = this._getLeafElementFromMousePosition(this._startPosition.x, this._startPosition.y);
        if (draggedElement) {
            return this._getElementPosition(draggedElement);
        }
        else {
            return undefined;
        }
    };
    DragZoneTree.prototype.getLeafElementFromMousePosition = function () {
        return this._getLeafElementFromMousePosition(this._currentPosition.x, this._currentPosition.y);
    };
    DragZoneTree.prototype.getDraggedOverElement = function () {
        return document.elementFromPoint(this._currentPosition.x, this._currentPosition.y);
    };
    // This method checks whether the data-drag-disallowed-tag is set on dragged item
    // and the data-drag-disallowed-area-tag is set on hover area
    DragZoneTree.prototype.isDragAllowed = function (draggedItem, dragOverElement, dataDragDisallowed) {
        var hoverOverItemWithDisallowedTag;
        if (dragOverElement) {
            hoverOverItemWithDisallowedTag =
                this.getElementWithDataDisallowedAreaTag(dragOverElement, dataDragDisallowed);
        }
        if (!draggedItem ||
            !dragOverElement ||
            (hoverOverItemWithDisallowedTag &&
                _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(draggedItem, DATA_DISALLOWED_ATTRIBUTE, dataDragDisallowed))) {
            return false;
        }
        return true;
    };
    DragZoneTree.prototype.getBottomMostElementFromMousePosition = function (draggedItem, dataDragDisallowed) {
        var _this = this;
        var parents = [];
        var elem = document.elementFromPoint(this._currentPosition.x, this._currentPosition.y);
        // Do not move the line if element is undefined or drag is not allowed
        if (!elem || (draggedItem && !this.isDragAllowed(draggedItem, elem, dataDragDisallowed))) {
            return undefined;
        }
        do {
            parents.push(elem);
            elem = elem.parentElement;
        } while (elem && elem !== this._host);
        var _loop_1 = function (i) {
            var candidates = parents.filter(function (element) {
                return _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(element, DATA_ATTRIBUTE, _this._treeLevelTagsBottomUp[i]);
            });
            if (candidates && candidates.length > 0) {
                var lastLeaf = this_1._getLastLeaf(candidates[0]);
                if (lastLeaf) {
                    // if element contains leaves but the last leaf is above the mouse return the leaf
                    var rect = lastLeaf.getBoundingClientRect();
                    if (rect.bottom < this_1._currentPosition.y) {
                        return { value: lastLeaf };
                    }
                    return { value: undefined };
                }
                return { value: candidates[0] };
            }
        };
        var this_1 = this;
        // go up the tree and find the node with the tag closest to the leaf tag
        for (var i = 0; i < this._treeDepth; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return undefined;
    };
    DragZoneTree.prototype.isLeafElement = function (element) {
        return _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(element, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[0]);
    };
    DragZoneTree.prototype.addDisallowedStyles = function (dataDragDisallowed, dataDragDisallowedCss, draggedItem) {
        if (!draggedItem) {
            draggedItem = this._getLeafElementFromMousePosition(this._startPosition.x, this._startPosition.y);
        }
        if (_DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(draggedItem, DATA_DISALLOWED_ATTRIBUTE, dataDragDisallowed)) {
            this.applyRemoveCssToDataDragDisallowed(dataDragDisallowed, true, dataDragDisallowedCss);
        }
    };
    DragZoneTree.prototype.applyRemoveCssToDataDragDisallowed = function (dataDragDisallowedTag, apply, cssClass) {
        var elements = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].getElementsWithAttribute(this._host, DATA_DISALLOWED_AREA_ATTRIBUTE, dataDragDisallowedTag);
        for (var i = 0; i < elements.length; i++) {
            if (apply) {
                elements[i].classList.add(cssClass);
            }
            else {
                elements[i].classList.remove(cssClass);
            }
        }
    };
    DragZoneTree.prototype.getElementWithDataDisallowedAreaTag = function (elem, value) {
        var tempElement = elem;
        // look up the parent tree to find the element with data-drag-disallowed-area-tag
        while (tempElement && tempElement !== this._host) {
            if (_DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(tempElement, DATA_DISALLOWED_AREA_ATTRIBUTE, value)) {
                return tempElement;
            }
            tempElement = tempElement.parentElement;
        }
        return undefined;
    };
    DragZoneTree.prototype.getIndexInPositionMatrix = function (position) {
        for (var i = 0; i < this._positionMatrix.length; i++) {
            var equals = true;
            for (var j = 0; j < position.length; j++) {
                if (position[j] !== this._positionMatrix[i][j]) {
                    equals = false;
                    break;
                }
            }
            if (equals) {
                return i;
            }
        }
        return -1;
    };
    DragZoneTree.prototype.getElementFromPosition = function (position, refreshMatrix) {
        if (refreshMatrix || this._bottomElements.size === 0) {
            this.refreshPositionMatrix();
        }
        var index = this.getIndexInPositionMatrix(position);
        if (index > -1 && index < this._bottomElements.size) {
            return this._bottomElements.get(index);
        }
        else {
            return undefined;
        }
    };
    DragZoneTree.prototype.getLeafElementFromHandle = function (handle) {
        var element = handle;
        while (element && element !== this._host) {
            if (_DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(element, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[0])) {
                return element;
            }
            element = element.parentElement;
        }
        return undefined;
    };
    DragZoneTree.prototype.getHandleFromLeafElement = function (draggedElement, value) {
        var dragHandles = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].getElementsWithAttribute(draggedElement, DATA_DRAG_HANDLE, value);
        return dragHandles && dragHandles[0];
    };
    /**
     * Refreshes the array of positions for each branch of the tree. This is an array of arrays that are tree depth.
     * If one of the branches doesn't go all the way to the leaves, the values in the array will be -1 for any missing
     * node. So [0,0,0] is the first leaf, [0,1,-1] is what we get if the second node has no leaves.
     */
    DragZoneTree.prototype.refreshPositionMatrix = function () {
        var currentPosition = [];
        this._positionMatrix = [];
        this._bottomElements = new Map();
        this._traverse(this._host, this._treeDepth - 1, currentPosition);
        this._fixMatrix(this._positionMatrix);
        return this._positionMatrix;
    };
    DragZoneTree.prototype._traverse = function (parent, tagLevel, currentPosition) {
        var children = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].getElementsWithAttribute(parent, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[tagLevel]);
        if (children.length === 0 || tagLevel < 0) {
            this._positionMatrix.push(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_1__["clone"])(currentPosition));
            this._bottomElements.set(this._positionMatrix.length - 1, parent);
            return;
        }
        for (var i = 0; i < children.length; i++) {
            currentPosition.push(i);
            this._traverse(children[i], tagLevel - 1, currentPosition);
            currentPosition.pop();
        }
    };
    DragZoneTree.prototype._fixMatrix = function (positionMatrix) {
        for (var i = 0; i < positionMatrix.length; i++) {
            for (var j = 0; j < this._treeDepth; j++) {
                if (positionMatrix[i].length <= j) {
                    positionMatrix[i].push(-1);
                }
            }
            positionMatrix[i] = positionMatrix[i].reverse();
        }
    };
    /**
     * This method is guaranteed to return an array of numbers with length = this._treeDepth
     * @param element
     */
    DragZoneTree.prototype._getElementPosition = function (element) {
        var treeIndeces = [];
        var tempElement = element;
        var tagLevel = this._getElementTagLevel(tempElement);
        // the item indeces are calculated relative to the parent, except for the top level item
        for (var i = 0; i < this._treeDepth - 1; i++) {
            if (i < tagLevel) {
                treeIndeces[i] = 0;
                continue;
            }
            var thisLevelElement = tempElement;
            // look up the parent tree to find the first parent with the prev level tree tag
            while (tempElement.parentElement && tempElement !== this._host) {
                tempElement = tempElement.parentElement;
                if (_DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(tempElement, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[i + 1])) {
                    break;
                }
            }
            var siblings = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].getElementsWithAttribute(tempElement, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[i]);
            treeIndeces[i] = siblings.indexOf(thisLevelElement);
            if (tempElement === this._host) {
                break;
            }
        }
        // the top level item index is calculated relative to the host
        if (tempElement !== this._host) {
            var tagListLastIndex = this._treeDepth - 1;
            var siblings = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].getElementsWithAttribute(this._host, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[tagListLastIndex]);
            treeIndeces[tagListLastIndex] = siblings.indexOf(tempElement);
        }
        return treeIndeces;
    };
    DragZoneTree.prototype._getElementTagLevel = function (element) {
        var tag = element.getAttribute(DATA_ATTRIBUTE);
        if (!tag) {
            return undefined;
        }
        return this._treeLevelTagsBottomUp.indexOf(tag);
    };
    DragZoneTree.prototype._getLeafElementFromMousePosition = function (x, y) {
        var elem = document.elementFromPoint(x, y);
        while (elem.parentElement && elem.parentElement !== this._host) {
            if (_DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].hasAttributeValue(elem, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[0])) {
                return elem;
            }
            elem = elem.parentElement;
        }
        return undefined;
    };
    DragZoneTree.prototype._getLastLeaf = function (element) {
        var leaves = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_0__["DragZoneUtilities"].getElementsWithAttribute(element, DATA_ATTRIBUTE, this._treeLevelTagsBottomUp[0]);
        if (leaves.length === 0) {
            return undefined;
        }
        else {
            return leaves[leaves.length - 1];
        }
    };
    return DragZoneTree;
}());



/***/ }),

/***/ "8LNs":
/*!********************************!*\
  !*** ./lib/DragZoneControl.js ***!
  \********************************/
/*! exports provided: DragZoneControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragZoneControl", function() { return DragZoneControl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DragZoneKeyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DragZoneKeyboard */ "c/wX");
/* harmony import */ var _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DragZoneUtilities */ "BTj3");
/* harmony import */ var _DragZoneTree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DragZoneTree */ "0hgw");
/* harmony import */ var _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/DragZone.module.scss */ "HZUo");
/* harmony import */ var _KillSwitches__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./KillSwitches */ "fCCa");








var DATA_DRAG_HANDLE = 'data-drag-handle';
var DRAGSTART_TIMEOUT_MS = 100;
var ICON_MARGIN_PX = -25;
var DRAGOVER_INTERVAL_MS = 200;
var LINE_WIDTH_PX = 3;
/**
 * @internal
 */
var DragZoneControl = /** @class */ (function () {
    function DragZoneControl(options) {
        var _this = this;
        this._updateMousePosition = function (evt) {
            _this._tree.currentPosition.x = evt.clientX;
            _this._tree.currentPosition.y = evt.clientY;
        };
        this._handleDragLeaveFromExternalSource = function (evt) {
            _this._removeLine();
            if (_this._options.getDropEffectFromDragEvent && evt) {
                _this._dragEventDropEffect = _this._options.getDropEffectFromDragEvent(evt);
            }
        };
        this._handleDropOverFromExternalSource = function (evt) {
            if (!evt || !evt.target) {
                return;
            }
            evt.preventDefault();
            evt.stopPropagation();
            _this._updateMousePosition(evt);
            _this._removeLine();
            _this._isDragging = false;
            var element = _this._tree.getLeafElementFromMousePosition();
            var shouldAddAtTheEndOfSection = false;
            if (!element) {
                element = evt.target;
                // the plus button will sometimes block the web part event listener
                // and give an undefined drop position
                // by default we just add to the end but it's probably better
                // to just ignore it and not add the web part (it's a very thin div)
                if (element.className === 'CanvasToolboxHint-plusButtonWrapper') {
                    return;
                }
                shouldAddAtTheEndOfSection = true;
            }
            _this._updateHoverOverPosition(element);
            if (_this._hoverOverPosition) {
                if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
                    _this._triggerOnDropped(evt.dataTransfer.items, _this._hoverOverPosition, shouldAddAtTheEndOfSection);
                }
            }
            _this._reset();
        };
        this._triggerOnDropped = function (data, droppedPosition, shouldAddAtTheEndOfSection) {
            if (_this._options.onDropFromExternalSource) {
                _this._options.onDropFromExternalSource(data, droppedPosition, shouldAddAtTheEndOfSection);
            }
        };
        this._handleDragOverFromExternalSource = function (evt) {
            if (!evt || !evt.target) {
                return;
            }
            evt.preventDefault();
            evt.stopPropagation();
            _this._updateMousePosition(evt);
            var element = _this._tree.getLeafElementFromMousePosition();
            if (!element) {
                _this._removeLine();
                element = evt.target;
            }
            if (evt.dataTransfer) {
                var shouldInsertBefore = _this._updateHoverOverPosition(element);
                var isLeaf = _this._tree.isLeafElement(element);
                // if this._hoverPosition[0] === -1, it might not necessarily be an undroppable target
                // but if this._hoverPosition === [-1] then it is definitely an undroppable target
                if (_this._hoverOverPosition && _this._hoverOverPosition.length !== 1 && _this._hoverOverPosition[0] !== -1) {
                    _this._moveLine(element, isLeaf, shouldInsertBefore);
                }
                if (_this._dragEventDropEffect) {
                    evt.dataTransfer.dropEffect = _this._dragEventDropEffect;
                }
            }
        };
        this._triggerOnMoved = function (draggedItemPosition, dropPosition) {
            if (_this._options.onMoved) {
                if (draggedItemPosition &&
                    draggedItemPosition.length === _this._tree.depth &&
                    dropPosition && dropPosition.length === _this._tree.depth) {
                    _this._options.onMoved(draggedItemPosition, dropPosition);
                }
            }
            _this._reset();
        };
        if (!options.host) {
            throw Error('Need to specify a host control for the DragZone');
        }
        if (!(options.treeLevelTagsBottomUp && options.treeLevelTagsBottomUp.length > 0)) {
            throw Error('Need to have at least one level of tags for the DragZone');
        }
        this._options = options;
        if (options.icon) {
            this._icon = options.icon;
        }
        else {
            this._icon = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].getDefaultIcon();
            this._icon.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].iconCollapsed);
            this._icon.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].iconAdditionalStyle);
        }
        this._tree = new _DragZoneTree__WEBPACK_IMPORTED_MODULE_5__["DragZoneTree"](options.treeLevelTagsBottomUp, options.host);
    }
    DragZoneControl.prototype.activate = function () {
        var _this = this;
        // add all the event handlers
        var _a = this._options, host = _a.host, dragHandleTags = _a.dragHandleTags, scrollIntoView = _a.scrollIntoView, disallowedTag = _a.disallowedTag, disallowedClassName = _a.disallowedClassName, onMoveStart = _a.onMoveStart, onMoving = _a.onMoving;
        this._async = new _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["Async"]();
        host.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].host);
        if (dragHandleTags && dragHandleTags.length > 0) {
            dragHandleTags.forEach(function (tag) {
                _this._dragHandles =
                    _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].getElementsWithAttribute(host, DATA_DRAG_HANDLE, tag);
                _this._dragHandles.forEach(function (handle) {
                    handle.addEventListener('mousedown', _this._onMouseDown);
                    handle.addEventListener('touchstart', _this._onMouseDown);
                    handle.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].handleGrab);
                    handle.addEventListener('touchmove', function (event) { return event.preventDefault(); });
                });
            });
        }
        else {
            host.addEventListener('mousedown', this._onMouseDown);
            host.addEventListener('touchstart', this._onMouseDown);
        }
        var dragZoneKeyboardOptions = {
            host: host,
            tree: this._tree,
            supportHorizontalReorder: this._supportHorizontalReorder,
            moveLine: this._moveLine,
            removeLine: this._removeLine,
            moveItem: this._triggerOnMoved,
            handles: this._dragHandles,
            strings: this._options.dragZoneStrings,
            handleTags: dragHandleTags,
            scrollIntoView: scrollIntoView,
            disallowedTag: disallowedTag,
            disallowedClassName: disallowedClassName,
            moveIcon: this._moveIcon,
            changeIconVisibility: this._changeIconVisibility,
            onMoveStart: onMoveStart,
            onMoving: onMoving
        };
        if (this._supportKeyboardAlternative) {
            this._dragZoneKeyboard = new _DragZoneKeyboard__WEBPACK_IMPORTED_MODULE_3__["default"](dragZoneKeyboardOptions);
        }
        host.addEventListener('mouseup', this._internalMouseUp);
        host.addEventListener('touchend', this._internalMouseUp);
        host.addEventListener('mouseleave', this._onMouseOut);
        host.addEventListener('touchout', this._onMouseOut);
        host.addEventListener('dragover', this._handleDragOverFromExternalSource);
        host.addEventListener('dragleave', this._handleDragLeaveFromExternalSource);
        host.addEventListener('drop', this._handleDropOverFromExternalSource);
    };
    DragZoneControl.prototype.deactivate = function () {
        var _this = this;
        // remove everything set in the activate
        var _a = this._options, host = _a.host, dragHandleTags = _a.dragHandleTags;
        this._async.dispose();
        if (this._supportKeyboardAlternative && this._dragZoneKeyboard) {
            this._dragZoneKeyboard.dispose();
        }
        host.classList.remove(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].host);
        if (dragHandleTags && dragHandleTags.length > 0) {
            dragHandleTags.forEach(function (tag) {
                _this._dragHandles =
                    _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].getElementsWithAttribute(host, DATA_DRAG_HANDLE, tag);
                _this._dragHandles.forEach(function (handle) {
                    handle.removeEventListener('mousedown', _this._onMouseDown);
                    handle.removeEventListener('touchstart', _this._onMouseDown);
                    handle.classList.remove(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].handleGrab);
                    handle.removeEventListener('touchmove', function (event) { return event.preventDefault(); });
                });
            });
        }
        else {
            host.removeEventListener('mousedown', this._onMouseDown);
            host.removeEventListener('touchstart', this._onMouseDown);
        }
        host.removeEventListener('mouseup', this._internalMouseUp);
        host.removeEventListener('touchend', this._internalMouseUp);
        host.removeEventListener('mouseleave', this._onMouseOut);
        host.removeEventListener('touchout', this._onMouseOut);
        host.removeEventListener('dragover', this._handleDragOverFromExternalSource);
        host.removeEventListener('dragleave', this._handleDragLeaveFromExternalSource);
        host.removeEventListener('drop', this._handleDropOverFromExternalSource);
    };
    /**
     * This happens very often so it should be quick.
     */
    DragZoneControl.prototype.refreshHandles = function () {
        var _this = this;
        var _a = this._options, host = _a.host, dragHandleTags = _a.dragHandleTags;
        if (dragHandleTags && dragHandleTags.length > 0) {
            dragHandleTags.forEach(function (tag) {
                var dragHandles = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].getElementsWithAttribute(host, DATA_DRAG_HANDLE, tag);
                var itemsAdded = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].getElementsNotInFirstArray(_this._dragHandles, dragHandles);
                if (itemsAdded.length > 0) {
                    itemsAdded.forEach(function (handle) {
                        _this._dragHandles.push(handle);
                        handle.addEventListener('mousedown', _this._onMouseDown);
                        handle.addEventListener('touchstart', _this._onMouseDown);
                        handle.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].handleGrab);
                    });
                }
                if (_this._supportKeyboardAlternative && _this._dragZoneKeyboard) {
                    _this._dragZoneKeyboard.addHandles(itemsAdded);
                }
            });
        }
    };
    DragZoneControl.prototype._onMouseMove = function (evt) {
        this._mouseOut = false;
        this._updateMousePosition(evt);
    };
    DragZoneControl.prototype._onTouchMove = function (evt) {
        this._mouseOut = false;
        if (evt.touches.length === 1) {
            var touch = evt.touches[0];
            this._tree.currentPosition.x = touch.clientX;
            this._tree.currentPosition.y = touch.clientY;
            evt.preventDefault();
        }
    };
    DragZoneControl.prototype._onMouseOut = function () {
        this._mouseOut = true;
    };
    DragZoneControl.prototype._updateHoverOverPosition = function (element) {
        this._hoverOverPosition = this._tree.getHoverOverItemPosition(element);
        var shouldInsertBefore = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].shouldInsertBeforeElement(element, this._tree.currentPosition.x, this._tree.currentPosition.y, this._supportHorizontalReorder);
        var isLeaf = this._tree.isLeafElement(element);
        if (!shouldInsertBefore && isLeaf) {
            this._hoverOverPosition[0]++;
        }
        return shouldInsertBefore;
    };
    /**
     * 1
     * Only consider this a drag if the mouse button has been pressed for DRAGSTART_TIMEOUT_MS. Also works for touch
     * Also get the start coordinates here because the mouse can move in DRAGSTART_TIMEOUT_MS and the dragged item
     * may change
     */
    DragZoneControl.prototype._onMouseDown = function (evt) {
        this._mouseDown = true;
        // Start a timeout to figure out if it's a drag.
        this._async.setTimeout(this._startDrag, DRAGSTART_TIMEOUT_MS);
        var element = evt.target;
        var dragHandle = element.getAttribute('data-drag-handle');
        if (dragHandle) {
            this._async.setTimeout(function () {
                return _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_2__["_EngagementLogger"].logEvent(dragHandle);
            }, DRAGSTART_TIMEOUT_MS);
        }
        // get the start coordinates
        if (evt instanceof MouseEvent) {
            // Some browsers like Chrome have default behavior on drag and drop where user can directly drag an image
            // or text to another page or address bar. The default behavior will block the onMouseUp to be triggered.
            evt.preventDefault();
            var mouseEvent = evt;
            this._tree.startPosition.x = mouseEvent.clientX;
            this._tree.startPosition.y = mouseEvent.clientY;
            this._tree.currentPosition.x = mouseEvent.clientX;
            this._tree.currentPosition.y = mouseEvent.clientY;
        }
        else if (evt instanceof TouchEvent) {
            var touchEvent = evt;
            if (touchEvent && touchEvent.touches.length > 0) {
                this._tree.startPosition.x = touchEvent.touches[0].clientX;
                this._tree.startPosition.y = touchEvent.touches[0].clientY;
                this._tree.currentPosition.x = touchEvent.touches[0].clientX;
                this._tree.currentPosition.y = touchEvent.touches[0].clientY;
            }
        }
    };
    /**
     * 3
     * Once we're sure it's a drag set the event listeners for mouse move (or touch since these are different).
     * Set the intervals for the drag over and mouse move since we emulate these and we don't use the actual events. Helps
     * with perf.
     */
    DragZoneControl.prototype._onDragStart = function () {
        var _a = this._options, disallowedTag = _a.disallowedTag, disallowedClassName = _a.disallowedClassName;
        this._isDragging = true;
        if (window.getSelection()) {
            window.getSelection().removeAllRanges();
        }
        // add a noselect css class to the document body
        document.body.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].noselect);
        // Add a quick interval for the movement of the icon (better way?)
        // Add a slow interval to calculate the movement of the line
        this._animationFrameHandle = window.requestAnimationFrame(this._emulateMouseMove);
        this._dragOverInterval = this._async.setInterval(this._emulateDragOver, DRAGOVER_INTERVAL_MS);
        this._options.host.addEventListener('mousemove', this._onMouseMove);
        this._options.host.addEventListener('touchmove', this._onTouchMove);
        window.addEventListener('mouseup', this._onMouseUp);
        window.addEventListener('touchend', this._onMouseUp);
        this._autoScroll = new _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["AutoScroll"](this._options.host);
        // make the icon visible
        this._changeIconVisibility(true);
        this._options.host.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].cursorDragging);
        // get the item that will be moved
        this._draggedItemPosition = this._tree.getDraggedItemPosition();
        this._draggedElement = this._tree.getDraggedItem;
        this._tree.addDisallowedStyles(disallowedTag, disallowedClassName);
        if (this._options.onMoveStart) {
            this._options.onMoveStart(this._draggedItemPosition);
        }
    };
    DragZoneControl.prototype._changeIconVisibility = function (visible) {
        this._icon.classList.remove(visible ? _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].iconCollapsed : _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].iconVisible);
        this._icon.classList.add(visible ? _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].iconVisible : _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].iconCollapsed);
    };
    DragZoneControl.prototype._internalMouseUp = function () {
        this._mouseDown = false;
    };
    /**
     * 4
     * Depending on the actions that happened while dragging it can either do nothing, reset the state or trigger onMoved
     */
    DragZoneControl.prototype._onMouseUp = function () {
        // If it's not dragging return
        if (!this._isDragging) {
            return;
        }
        this._isDragging = false;
        this._changeIconVisibility(false);
        document.body.classList.remove(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].noselect);
        if (this._mouseOut || !this._draggedElement || !this._dragOverElement) {
            this._resetCursorEvents();
            this._reset();
            return;
        }
        this._resetCursorEvents();
        this._triggerOnMoved(this._draggedItemPosition, this._hoverOverPosition);
    };
    // Use the current position of the mouse relative to the items and draw the line for the new position if dropped
    DragZoneControl.prototype._emulateDragOver = function () {
        var disallowedTag = this._options.disallowedTag;
        var plainElement = this._options.canDropOnEmptyParent ?
            this._tree.getBottomMostElementFromMousePosition(this._draggedElement, disallowedTag) :
            this._tree.getLeafElementFromMousePosition();
        var element = plainElement;
        if (!element) {
            return;
        }
        // there needs to be a short circuit here
        // VSO WEX!:323712
        this._hoverOverPosition = this._tree.getHoverOverItemPosition(element);
        var shouldInsertBefore = _DragZoneUtilities__WEBPACK_IMPORTED_MODULE_4__["DragZoneUtilities"].shouldInsertBeforeElement(element, this._tree.currentPosition.x, this._tree.currentPosition.y, this._supportHorizontalReorder);
        var isLeaf = this._tree.isLeafElement(element);
        if (!shouldInsertBefore && isLeaf) {
            this._hoverOverPosition[0]++;
        }
        this._moveLine(element, isLeaf, shouldInsertBefore);
    };
    DragZoneControl.prototype._moveLine = function (adjacentElement, isLeaf, shouldInsertBefore) {
        if (!_KillSwitches__WEBPACK_IMPORTED_MODULE_7__["KillSwitches"].reduceReflowDuringDragging.isActivated()) {
            var _a = this._currentDragLineSettings || {}, element = _a.element, currentIsLeaf = _a.isLeaf, currentShouldInsertBefore = _a.shouldInsertBefore;
            if (adjacentElement.isSameNode(element) &&
                currentIsLeaf === isLeaf &&
                currentShouldInsertBefore === shouldInsertBefore) {
                // Avoid doing all the DOM operations which causes DOM reflow if the line is same as the one already drawn.
                return;
            }
        }
        this._removeLine();
        if (!_KillSwitches__WEBPACK_IMPORTED_MODULE_7__["KillSwitches"].reduceReflowDuringDragging.isActivated()) {
            this._currentDragLineSettings = {
                element: adjacentElement,
                isLeaf: isLeaf,
                shouldInsertBefore: shouldInsertBefore
            };
        }
        this._line = document.createElement('div');
        this._line.className = Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["css"])(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].dropLocation, _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].customTheme, Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["mergeStyles"])({ backgroundColor: this._options.getTheme().semanticColors.primaryButtonBackground }));
        var supportHorizontalReorder = this._options.supportHorizontalReorder;
        if (supportHorizontalReorder) {
            this._line.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].verticalLine);
        }
        else {
            this._line.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].horizontalLine);
        }
        // if element is not base one just add the line as first appendChild
        if (isLeaf) {
            this._line.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].linePositionAbsolute);
            if (supportHorizontalReorder) {
                if (Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getRTL"])()) {
                    if (!shouldInsertBefore) {
                        this._line.style.marginRight =
                            this._getLineRightPosition(adjacentElement.parentElement, adjacentElement) + "px";
                    }
                    else {
                        this._line.style.marginRight =
                            -LINE_WIDTH_PX - this._options.dropPositionOffsetLeftPx + "px";
                    }
                }
                else {
                    if (!shouldInsertBefore) {
                        this._line.style.marginLeft =
                            this._getLineRightPosition(adjacentElement.parentElement, adjacentElement) + "px";
                    }
                    else {
                        this._line.style.marginLeft =
                            -LINE_WIDTH_PX - this._options.dropPositionOffsetLeftPx + "px";
                    }
                }
            }
            else {
                if (!shouldInsertBefore) {
                    this._line.style.marginTop =
                        this._getLineBottomPosition(adjacentElement.parentElement, adjacentElement) + "px";
                }
                else {
                    this._line.style.marginTop =
                        -LINE_WIDTH_PX - this._options.dropPositionOffsetTopPx + "px";
                }
            }
            adjacentElement.parentElement.insertBefore(this._line, adjacentElement);
        }
        else {
            if (this._supportHorizontalReorder) {
                this._line.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].verticalLine);
            }
            else {
                this._line.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].horizontalLine);
            }
            adjacentElement.appendChild(this._line);
        }
        this._dragOverElement = adjacentElement;
        return this._line;
    };
    DragZoneControl.prototype._emulateMouseMove = function () {
        var _a = this._options, disallowedTag = _a.disallowedTag, onMoving = _a.onMoving;
        // Redraw the icon for the new position of the mouse
        this._moveIcon(this._tree.currentPosition.x, this._tree.currentPosition.y);
        if (onMoving && this._isDragging) {
            onMoving(!this._tree.isDragAllowed(this._draggedElement, this._tree.getDraggedOverElement(), disallowedTag));
        }
        window.requestAnimationFrame(this._emulateMouseMove);
    };
    DragZoneControl.prototype._moveIcon = function (x, y) {
        this._icon.style.top = y + ICON_MARGIN_PX + "px";
        if (Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getRTL"])()) {
            this._icon.style.right = x + ICON_MARGIN_PX + "px";
        }
        else {
            this._icon.style.left = x + ICON_MARGIN_PX + "px";
        }
    };
    /**
     * 2
     * If DRAGSTART_TIMEOUT_MS from mouse down have elapsed and the mouse button is still pressed, start the drag
     */
    DragZoneControl.prototype._startDrag = function () {
        if (this._mouseDown) {
            this._onDragStart();
        }
    };
    DragZoneControl.prototype._resetCursorEvents = function () {
        this._removeLine();
        this._tree.startPosition.x = undefined;
        this._tree.startPosition.y = undefined;
        window.cancelAnimationFrame(this._animationFrameHandle);
        this._async.clearInterval(this._dragOverInterval);
        this._options.host.removeEventListener('mousemove', this._onMouseMove);
        this._options.host.removeEventListener('touchmove', this._onTouchMove);
        window.removeEventListener('mouseup', this._onMouseUp);
        window.removeEventListener('touchend', this._onMouseUp);
        this._options.host.classList.remove(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].cursorDragging);
        this._autoScroll.dispose();
    };
    DragZoneControl.prototype._reset = function () {
        var _a = this._options, disallowedTag = _a.disallowedTag, disallowedClassName = _a.disallowedClassName;
        this._draggedItemPosition = undefined;
        this._dragOverElement = undefined;
        this._tree.applyRemoveCssToDataDragDisallowed(disallowedTag, false, disallowedClassName);
    };
    DragZoneControl.prototype._removeLine = function () {
        // if there was a previous _dragOverElement that means there was a previous line. Remove the line
        if (this._dragOverElement) {
            if (this._tree.isLeafElement(this._dragOverElement) &&
                this._dragOverElement.parentElement.contains(this._line)) {
                this._dragOverElement.parentElement.removeChild(this._line);
            }
            else if (this._dragOverElement.contains(this._line)) {
                this._dragOverElement.removeChild(this._line);
            }
        }
        if (!_KillSwitches__WEBPACK_IMPORTED_MODULE_7__["KillSwitches"].reduceReflowDuringDragging.isActivated()) {
            this._currentDragLineSettings = undefined;
        }
    };
    DragZoneControl.prototype._getLineRightPosition = function (parent, element) {
        var childRect = element.getBoundingClientRect();
        var rightInsideParent = childRect.width + this._options.dropPositionOffsetRightPx;
        return rightInsideParent || 0;
    };
    DragZoneControl.prototype._getLineBottomPosition = function (parent, element) {
        var childRect = element.getBoundingClientRect();
        var bottomInsideParent = childRect.height + this._options.dropPositionOffsetBottomPx;
        return bottomInsideParent || 0;
    };
    Object.defineProperty(DragZoneControl.prototype, "_supportHorizontalReorder", {
        get: function () {
            return this._options.supportHorizontalReorder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragZoneControl.prototype, "_supportKeyboardAlternative", {
        get: function () {
            return this._options.supportKeyboardAlternative;
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_onMouseMove", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_onTouchMove", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_onMouseOut", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_updateHoverOverPosition", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_onMouseDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_changeIconVisibility", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_internalMouseUp", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_onMouseUp", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_emulateDragOver", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_moveLine", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_emulateMouseMove", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_moveIcon", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_startDrag", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneControl.prototype, "_removeLine", null);
    return DragZoneControl;
}());



/***/ }),

/***/ "BTj3":
/*!**********************************!*\
  !*** ./lib/DragZoneUtilities.js ***!
  \**********************************/
/*! exports provided: DragZoneUtilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragZoneUtilities", function() { return DragZoneUtilities; });
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/DragZone.module.scss */ "HZUo");


var DragZoneUtilities = /** @class */ (function () {
    function DragZoneUtilities() {
    }
    DragZoneUtilities.getElementsWithAttribute = function (parent, tag, value) {
        if (!parent) {
            return [];
        }
        var querySelector = "[" + tag + (value ? "=\"" + value + "\"" : "") + "]";
        var tempEls = parent.querySelectorAll(querySelector);
        var elements = [];
        for (var index = 0; index < tempEls.length; index++) {
            elements.push(tempEls[index]);
        }
        return elements;
    };
    DragZoneUtilities.hasAttributeValue = function (elem, attribute, value) {
        return elem && elem.getAttribute(attribute) === value;
    };
    DragZoneUtilities.shouldInsertBeforeElement = function (element, x, y, isHorizontalReorder) {
        var rectangle = element.getBoundingClientRect();
        var center;
        if (isHorizontalReorder) {
            center = ((rectangle.left + rectangle.right) / 2);
            return Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_0__["getRTL"])() ? x > center : x < center;
        }
        else {
            center = ((rectangle.bottom + rectangle.top) / 2);
            return y < center;
        }
    };
    DragZoneUtilities.getDefaultIcon = function () {
        var icon = document.createElement('div');
        icon.innerText = 'icon';
        icon.className = _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].defaultIconClass;
        icon.hidden = true;
        document.body.appendChild(icon);
        return icon;
    };
    DragZoneUtilities.elementArrayEquals = function (array1, array2) {
        if (!array1 || !array2) {
            return false;
        }
        if (array1.length !== array2.length) {
            return false;
        }
        for (var i = 0; i < array1.length; i++) {
            if (!array1[i].isEqualNode(array2[i])) {
                return false;
            }
        }
        return true;
    };
    /**
     * Returns all elements in the second array that are not in the first array
     * @param array1 - array that contains all "existing" elements
     * @param array2 - array containing "existing" elements and new ones that should be returned
     */
    DragZoneUtilities.getElementsNotInFirstArray = function (array1, array2) {
        if (!array1 || !array2 || array2.length === 0) {
            return [];
        }
        var addedElements = array2.filter(function (el) { return array1.indexOf(el) === -1; });
        return addedElements;
    };
    return DragZoneUtilities;
}());



/***/ }),

/***/ "c/wX":
/*!*********************************!*\
  !*** ./lib/DragZoneKeyboard.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tCkv");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/office-ui-fabric-react-bundle */ "KL1q");
/* harmony import */ var _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ms/odsp-utilities-bundle */ "y88i");
/* harmony import */ var _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ms/sp-a11y */ "ytfe");
/* harmony import */ var _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/DragZone.module.scss */ "HZUo");






var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["Enter"] = 13] = "Enter";
    KeyCodes[KeyCodes["Escape"] = 27] = "Escape";
    KeyCodes[KeyCodes["Space"] = 32] = "Space";
    KeyCodes[KeyCodes["LeftArrow"] = 37] = "LeftArrow";
    KeyCodes[KeyCodes["UpArrow"] = 38] = "UpArrow";
    KeyCodes[KeyCodes["RightArrow"] = 39] = "RightArrow";
    KeyCodes[KeyCodes["DownArrow"] = 40] = "DownArrow";
})(KeyCodes || (KeyCodes = {}));
var DRAG_ZONE = 'DragZone';
// this should also know the location where the move started happening and it should track the hoveroveritem separately?
// maybe?
var DragZoneKeyboard = /** @class */ (function () {
    function DragZoneKeyboard(options) {
        var _this = this;
        this._isMovingForward = false;
        options.strings = options.strings || {
            handleTitle: '',
            moveStarted: '',
            moveComplete: '',
            moveCancelled: '',
            moveNotAllowed: '',
            moveInsideLevel: []
        }; // In the consumer not passing the optional strings.
        this._options = options;
        var handles = options.handles;
        var host = options.host, strings = options.strings;
        if (handles) {
            handles.forEach(function (handle) {
                handle.addEventListener('keydown', _this._viewModeKeyDown);
                handle.title = strings.handleTitle;
            });
        }
        else {
            host.addEventListener('keydown', this._viewModeKeyDown);
            handles = [];
        }
    }
    DragZoneKeyboard.prototype.dispose = function () {
        var _this = this;
        var _a = this._options, handles = _a.handles, host = _a.host;
        if (handles) {
            handles.forEach(function (handle) {
                handle.removeEventListener('keydown', _this._viewModeKeyDown);
            });
        }
        else {
            host.removeEventListener('keydown', this._viewModeKeyDown);
        }
    };
    DragZoneKeyboard.prototype.addHandles = function (handles) {
        var _this = this;
        handles.forEach(function (handle) {
            handle.addEventListener('keydown', _this._viewModeKeyDown);
            handle.title = _this._options.strings.handleTitle;
            _this._options.handles.push(handle);
        });
    };
    DragZoneKeyboard.prototype._viewModeKeyDown = function (evt) {
        var _a = this._options, disallowedTag = _a.disallowedTag, disallowedClassName = _a.disallowedClassName, changeIconVisibility = _a.changeIconVisibility, onMoveStart = _a.onMoveStart, moveIcon = _a.moveIcon, removeLine = _a.removeLine, strings = _a.strings, host = _a.host, tree = _a.tree;
        if (!this._isMoving && (evt.keyCode === KeyCodes.Enter || evt.keyCode === KeyCodes.Space)) {
            this._isMoving = true;
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, strings.moveStarted);
            host.addEventListener('keydown', this._moveModeKeyDown);
            this._draggedElement = tree.getLeafElementFromHandle(evt.target);
            this._draggedPosition = tree.getHoverOverItemPosition(this._draggedElement);
            this._treeMatrix = tree.refreshPositionMatrix();
            this._currentLocationIndex = tree.getIndexInPositionMatrix(this._draggedPosition);
            if (disallowedTag && disallowedClassName) {
                tree.addDisallowedStyles(disallowedTag, disallowedClassName, this._draggedElement);
            }
            if (onMoveStart) {
                onMoveStart(this._draggedPosition);
            }
            var iconPosition = this._getIconPosition(this._draggedElement);
            if (iconPosition) {
                moveIcon(iconPosition.iconLeft, iconPosition.iconTop);
            }
            changeIconVisibility(true);
            evt.stopPropagation();
            evt.preventDefault();
        }
        else if (evt.keyCode === KeyCodes.Escape) {
            removeLine();
            changeIconVisibility(false);
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, strings.moveCancelled);
            this._isMoving = false;
            this._setFocusOnHandle(this._draggedElement);
            host.removeEventListener('keydown', this._moveModeKeyDown);
            this._removeStylesFromDisallowedArea();
        }
    };
    DragZoneKeyboard.prototype._moveModeKeyDown = function (evt) {
        var _a = this._options, removeLine = _a.removeLine, host = _a.host, moveItem = _a.moveItem, strings = _a.strings, supportHorizontalReorder = _a.supportHorizontalReorder, tree = _a.tree, disallowedTag = _a.disallowedTag, changeIconVisibility = _a.changeIconVisibility;
        if (evt.keyCode === KeyCodes.Enter) {
            removeLine();
            changeIconVisibility(false);
            if (tree.isDragAllowed(this._draggedElement, this._dropOverElement, disallowedTag)) {
                moveItem(this._draggedPosition, this._dropPosition);
                var draggedElement = tree.getElementFromPosition(this._dropPosition, true);
                _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].format(strings.moveComplete, this._formatFullPosition(this._draggedPosition), this._formatFullPosition(this._dropPosition)));
                this._setFocusOnHandle(draggedElement);
            }
            else {
                _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, strings.moveNotAllowed);
            }
            this._isMoving = false;
            var dropPosition = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["clone"])(this._dropPosition);
            // While moving forward, the drop position increases an extra index because it indicates
            // the position of line. Each section would have two lines so we need to decrease it by
            // one to get the right dropped position for the section
            if (this._isMovingForward && dropPosition && !dropPosition[1] && !dropPosition[2]) {
                dropPosition[0]--;
            }
            var newDraggedElement = tree.getElementFromPosition(dropPosition, true);
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].format(strings.moveComplete, this._formatFullPosition(this._draggedPosition), this._formatFullPosition(this._dropPosition)));
            this._setFocusOnHandle(newDraggedElement);
            host.removeEventListener('keydown', this._moveModeKeyDown);
            this._removeStylesFromDisallowedArea();
        }
        else if (evt.keyCode === KeyCodes.DownArrow ||
            supportHorizontalReorder && KeyCodes.RightArrow === Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getRTLSafeKeyCode"])(evt.keyCode)) {
            this._moveForward();
            this._isMovingForward = true;
        }
        else if (evt.keyCode === KeyCodes.UpArrow ||
            supportHorizontalReorder && KeyCodes.LeftArrow === Object(_microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["getRTLSafeKeyCode"])(evt.keyCode)) {
            this._moveBack();
            this._isMovingForward = false;
        }
        evt.stopPropagation();
        evt.preventDefault();
    };
    DragZoneKeyboard.prototype._removeStylesFromDisallowedArea = function () {
        var _a = this._options, disallowedTag = _a.disallowedTag, disallowedClassName = _a.disallowedClassName, tree = _a.tree;
        if (disallowedTag && disallowedClassName) {
            tree.applyRemoveCssToDataDragDisallowed(disallowedTag, false, disallowedClassName);
        }
    };
    DragZoneKeyboard.prototype._setFocusOnHandle = function (element) {
        var _a = this._options, handleTags = _a.handleTags, tree = _a.tree;
        if (handleTags && handleTags.length > 0) {
            handleTags.forEach(function (tag) {
                var handle = tree.getHandleFromLeafElement(element, tag);
                if (handle) {
                    var tabIndex = handle.getAttribute('tabindex');
                    if (tabIndex !== '0') {
                        handle.setAttribute('tabindex', '0');
                        handle.focus();
                        // Reset the tab index after focus
                        if (!isNaN(+tabIndex)) {
                            handle.setAttribute('tabindex', tabIndex);
                        }
                    }
                    else {
                        handle.focus();
                    }
                }
            });
        }
    };
    DragZoneKeyboard.prototype._moveForward = function () {
        var _a = this._options, tree = _a.tree, moveLine = _a.moveLine, strings = _a.strings, scrollIntoView = _a.scrollIntoView, moveIcon = _a.moveIcon, onMoving = _a.onMoving, disallowedTag = _a.disallowedTag;
        var line;
        if (this._currentLocationIndex < this._treeMatrix.length - 1) {
            var newIndex = this._currentLocationIndex + 1;
            var newTentativeElement = tree.getElementFromPosition(this._treeMatrix[newIndex]);
            this._dropPosition = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["clone"])(this._treeMatrix[newIndex]);
            this._dropOverElement = newTentativeElement && newTentativeElement.parentElement;
            // if new empty section just add it as a child
            if (!tree.isLeafElement(newTentativeElement)) {
                this._dropPosition[0]++;
                line = moveLine(newTentativeElement, false, false, true);
                this._currentLocationIndex++;
                _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatFullPosition(this._dropPosition));
            }
            else {
                if (this._indexNotChanged) {
                    this._indexNotChanged = false;
                    this._dropPosition[0]++;
                    line = moveLine(newTentativeElement, true, false, true);
                    this._currentLocationIndex++;
                    _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatPosition(this._dropPosition));
                }
                else if (this._upperLevelChange(this._treeMatrix[this._currentLocationIndex], this._treeMatrix[newIndex])) {
                    line = moveLine(newTentativeElement, true, true, true);
                    // when changing parents we first place the line before the first element
                    // the next operation does not need to change the element but just put the line after it
                    this._indexNotChanged = true;
                    _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatFullPosition(this._dropPosition));
                }
                else {
                    line = moveLine(newTentativeElement, true, true, true);
                    this._currentLocationIndex++;
                    _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatPosition(this._dropPosition));
                }
            }
            scrollIntoView('partial', line, 500, 0);
            var iconPosition = this._getIconPosition(line);
            if (iconPosition) {
                if (onMoving) {
                    onMoving(!tree.isDragAllowed(this._draggedElement, this._dropOverElement, disallowedTag));
                }
                moveIcon(iconPosition.iconLeft, iconPosition.iconTop);
            }
        }
        else {
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, strings.moveNotAllowed);
        }
        this._checkMoveAllowed(line);
    };
    DragZoneKeyboard.prototype._moveBack = function () {
        var _a = this._options, tree = _a.tree, moveLine = _a.moveLine, strings = _a.strings, scrollIntoView = _a.scrollIntoView, moveIcon = _a.moveIcon, onMoving = _a.onMoving, disallowedTag = _a.disallowedTag;
        var line;
        if (this._currentLocationIndex > 0) {
            var newIndex = this._currentLocationIndex - 1;
            var newTentativeElement = tree.getElementFromPosition(this._treeMatrix[newIndex]);
            this._dropPosition = Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["clone"])(this._treeMatrix[newIndex]);
            this._dropOverElement = newTentativeElement && newTentativeElement.parentElement;
            // if new empty section just add it as a child
            if (!tree.isLeafElement(newTentativeElement)) { // if new empty section just add it as a child
                this._dropPosition[0]++;
                line = moveLine(newTentativeElement, false, false, true);
                this._currentLocationIndex--;
                _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatFullPosition(this._dropPosition));
            }
            else {
                if (this._indexNotChanged) {
                    this._indexNotChanged = false;
                    line = moveLine(newTentativeElement, true, true, true);
                    this._currentLocationIndex--;
                    _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatPosition(this._dropPosition));
                }
                else if (this._upperLevelChange(this._treeMatrix[this._currentLocationIndex], this._treeMatrix[newIndex])) {
                    this._dropPosition[0]++;
                    line = moveLine(newTentativeElement, true, false, true);
                    // when changing parents we first place the line before the first element
                    // the next operation does not need to change the element but just put the line after it
                    this._indexNotChanged = true;
                    _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatFullPosition(this._dropPosition));
                }
                else {
                    line = moveLine(newTentativeElement, true, true, true);
                    this._currentLocationIndex--;
                    _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, this._formatPosition(this._dropPosition));
                }
            }
            scrollIntoView('partial', line, 500, 0, true);
            var iconPosition = this._getIconPosition(line);
            if (iconPosition) {
                if (onMoving) {
                    onMoving(!tree.isDragAllowed(this._draggedElement, this._dropOverElement, disallowedTag));
                }
                moveIcon(iconPosition.iconLeft, iconPosition.iconTop);
            }
        }
        else {
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, strings.moveNotAllowed);
        }
        this._checkMoveAllowed(line);
    };
    DragZoneKeyboard.prototype._checkMoveAllowed = function (line) {
        var _a = this._options, tree = _a.tree, strings = _a.strings, disallowedTag = _a.disallowedTag;
        // If the move is not allowed, we cannot remove the line for the keyboard because it controls scrolling,
        // so instead we would hide it so that the user knows that move is not allowed
        if (disallowedTag && !tree.isDragAllowed(this._draggedElement, this._dropOverElement, disallowedTag) && line) {
            line.classList.add(_css_DragZone_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hideLine);
            _ms_sp_a11y__WEBPACK_IMPORTED_MODULE_4__["ScreenReader"].alert(DRAG_ZONE, strings.moveNotAllowed);
        }
    };
    DragZoneKeyboard.prototype._upperLevelChange = function (oldPosition, newPosition) {
        if (oldPosition.length !== newPosition.length || oldPosition.length < 2 || newPosition.length < 2) {
            return false;
        }
        for (var i = 1; i < oldPosition.length; i++) {
            if (oldPosition[i] !== newPosition[i]) {
                return true;
            }
        }
        return false;
    };
    DragZoneKeyboard.prototype._formatFullPosition = function (position) {
        var moveInsideLevel = this._options.strings.moveInsideLevel;
        if (moveInsideLevel.length === 0 || position.length === 0) {
            return;
        }
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].format.apply(_ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"], [moveInsideLevel[moveInsideLevel.length - 1]].concat(position.reverse().map(function (val) {
            return val + 1;
        })));
    };
    DragZoneKeyboard.prototype._getIconPosition = function (element) {
        var boundingRect = element && element.getBoundingClientRect();
        if (boundingRect) {
            var position = {
                iconLeft: boundingRect.left + boundingRect.width / 2,
                iconTop: boundingRect.top
            };
            return position;
        }
        return undefined;
    };
    DragZoneKeyboard.prototype._formatPosition = function (position) {
        var moveInsideLevel = this._options.strings.moveInsideLevel;
        if (moveInsideLevel.length === 0 || position.length === 0) {
            return;
        }
        return _ms_odsp_utilities_bundle__WEBPACK_IMPORTED_MODULE_3__["StringHelper"].format(moveInsideLevel[0], position[0] + 1);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneKeyboard.prototype, "_viewModeKeyDown", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        _microsoft_office_ui_fabric_react_bundle__WEBPACK_IMPORTED_MODULE_1__["autobind"]
    ], DragZoneKeyboard.prototype, "_moveModeKeyDown", null);
    return DragZoneKeyboard;
}());
/* harmony default export */ __webpack_exports__["default"] = (DragZoneKeyboard);


/***/ }),

/***/ "fCCa":
/*!*****************************!*\
  !*** ./lib/KillSwitches.js ***!
  \*****************************/
/*! exports provided: KillSwitches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KillSwitches", function() { return KillSwitches; });
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ms/sp-component-utilities */ "hiL/");
/* harmony import */ var _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__);

var KillSwitches = /** @class */ (function () {
    function KillSwitches() {
    }
    KillSwitches.reduceReflowDuringDragging = new _ms_sp_component_utilities__WEBPACK_IMPORTED_MODULE_0__["KillSwitch"]('1dc60e03-ba0a-4011-841b-6f6f6ae67244' /* '11/11/2019', 'Reduce unnecessary reflow while dragging' */);
    return KillSwitches;
}());



/***/ })

}]);
//# sourceMappingURL=chunk.dragzonecontrol_39d1919c56cf96febd21.js.map