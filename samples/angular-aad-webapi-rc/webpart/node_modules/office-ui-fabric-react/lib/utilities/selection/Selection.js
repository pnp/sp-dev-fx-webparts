"use strict";
var interfaces_1 = require('./interfaces');
var EventGroup_1 = require('../eventGroup/EventGroup');
var Selection = (function () {
    function Selection(options) {
        if (options === void 0) { options = {}; }
        var onSelectionChanged = options.onSelectionChanged, getKey = options.getKey, _a = options.canSelectItem, canSelectItem = _a === void 0 ? function (item) { return true; } : _a;
        this.getKey = getKey || (function (item, index) { return (item ? item.key : String(index)); });
        this._changeEventSuppressionCount = 0;
        this._exemptedCount = 0;
        this._anchoredIndex = 0;
        this._unselectableCount = 0;
        this.setItems([], true);
        this._onSelectionChanged = onSelectionChanged;
        this.canSelectItem = canSelectItem;
    }
    Selection.prototype.setChangeEvents = function (isEnabled, suppressChange) {
        this._changeEventSuppressionCount += isEnabled ? -1 : 1;
        if (this._changeEventSuppressionCount === 0 && this._hasChanged) {
            this._hasChanged = false;
            if (!suppressChange) {
                this._change();
            }
        }
    };
    /**
     * Selection needs the items, call this method to set them. If the set
     * of items is the same, this will re-evaluate selection and index maps.
     * Otherwise, shouldClear should be set to true, so that selection is
     * cleared.
     */
    Selection.prototype.setItems = function (items, shouldClear) {
        if (shouldClear === void 0) { shouldClear = true; }
        var newKeyToIndexMap = {};
        var newUnselectableIndices = {};
        var hasSelectionChanged = false;
        this.setChangeEvents(false);
        // Reset the unselectable count.
        this._unselectableCount = 0;
        // Build lookup table for quick selection evaluation.
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item) {
                newKeyToIndexMap[this.getKey(item, i)] = i;
            }
            newUnselectableIndices[i] = item && !this.canSelectItem(item);
            if (newUnselectableIndices[i]) {
                this._unselectableCount++;
            }
        }
        if (shouldClear) {
            this.setAllSelected(false);
        }
        // Check the exemption list for discrepencies.
        var newExemptedIndicies = {};
        for (var indexProperty in this._exemptedIndices) {
            if (this._exemptedIndices.hasOwnProperty(indexProperty)) {
                var index = Number(indexProperty);
                var item = this._items[index];
                var exemptKey = item ? this.getKey(item, Number(index)) : undefined;
                var newIndex = exemptKey ? newKeyToIndexMap[exemptKey] : index;
                if (newIndex === undefined) {
                    // We don't know the index of the item any more so it's either moved or removed.
                    // In this case we reset the entire selection.
                    this.setAllSelected(false);
                    break;
                }
                else {
                    // We know the new index of the item. update the existing exemption table.
                    newExemptedIndicies[newIndex] = true;
                    hasSelectionChanged = hasSelectionChanged || (newIndex !== index);
                }
            }
        }
        this._exemptedIndices = newExemptedIndicies;
        this._keyToIndexMap = newKeyToIndexMap;
        this._unselectableIndices = newUnselectableIndices;
        this._items = items || [];
        if (hasSelectionChanged) {
            this._change();
        }
        this.setChangeEvents(true);
    };
    Selection.prototype.getItems = function () {
        return this._items;
    };
    Selection.prototype.getSelection = function () {
        if (!this._selectedItems) {
            this._selectedItems = [];
            for (var i = 0; i < this._items.length; i++) {
                if (this.isIndexSelected(i)) {
                    this._selectedItems.push(this._items[i]);
                }
            }
        }
        return this._selectedItems;
    };
    Selection.prototype.getSelectedCount = function () {
        return this._isAllSelected ? (this._items.length - this._exemptedCount - this._unselectableCount) : (this._exemptedCount);
    };
    Selection.prototype.isRangeSelected = function (fromIndex, count) {
        var endIndex = fromIndex + count;
        for (var i = fromIndex; i < endIndex; i++) {
            if (!this.isIndexSelected(i)) {
                return false;
            }
        }
        return true;
    };
    Selection.prototype.isAllSelected = function () {
        var selectableCount = this._items.length - this._unselectableCount;
        return ((this.count > 0) &&
            (this._isAllSelected && this._exemptedCount === 0) ||
            (!this._isAllSelected && (this._exemptedCount === selectableCount) && selectableCount > 0));
    };
    Selection.prototype.isKeySelected = function (key) {
        var index = this._keyToIndexMap[key];
        return this.isIndexSelected(index);
    };
    Selection.prototype.isIndexSelected = function (index) {
        return !!((this.count > 0) &&
            (this._isAllSelected && !this._exemptedIndices[index] && !this._unselectableIndices[index]) ||
            (!this._isAllSelected && this._exemptedIndices[index]));
    };
    Selection.prototype.setAllSelected = function (isAllSelected) {
        var selectableCount = this._items ? (this._items.length - this._unselectableCount) : 0;
        if (selectableCount > 0 && (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)) {
            this._exemptedIndices = {};
            this._exemptedCount = 0;
            this._isAllSelected = isAllSelected;
            this._updateCount();
        }
    };
    Selection.prototype.setKeySelected = function (key, isSelected, shouldAnchor) {
        var index = this._keyToIndexMap[key];
        if (index >= 0) {
            this.setIndexSelected(index, isSelected, shouldAnchor);
        }
    };
    Selection.prototype.setIndexSelected = function (index, isSelected, shouldAnchor) {
        // Clamp the index.
        index = Math.min(Math.max(0, index), this._items.length - 1);
        // No-op on out of bounds selections.
        if (index < 0 || index >= this._items.length) {
            return;
        }
        var isExempt = this._exemptedIndices[index];
        var hasChanged = false;
        var canSelect = !this._unselectableIndices[index];
        if (canSelect) {
            // Determine if we need to remove the exemption.
            if (isExempt && ((isSelected && this._isAllSelected) ||
                (!isSelected && !this._isAllSelected))) {
                hasChanged = true;
                delete this._exemptedIndices[index];
                this._exemptedCount--;
            }
            // Determine if we need to add the exemption.
            if (!isExempt && ((isSelected && !this._isAllSelected) ||
                (!isSelected && this._isAllSelected))) {
                hasChanged = true;
                this._exemptedIndices[index] = true;
                this._exemptedCount++;
            }
            if (shouldAnchor) {
                this._anchoredIndex = index;
            }
        }
        if (hasChanged) {
            this._updateCount();
        }
    };
    Selection.prototype.selectToKey = function (key, clearSelection) {
        this.selectToIndex(this._keyToIndexMap[key], clearSelection);
    };
    Selection.prototype.selectToIndex = function (index, clearSelection) {
        var anchorIndex = this._anchoredIndex || 0;
        var startIndex = Math.min(index, anchorIndex);
        var endIndex = Math.max(index, anchorIndex);
        this.setChangeEvents(false);
        if (clearSelection) {
            this.setAllSelected(false);
        }
        for (; startIndex <= endIndex; startIndex++) {
            this.setIndexSelected(startIndex, true, false);
        }
        this.setChangeEvents(true);
    };
    Selection.prototype.toggleAllSelected = function () {
        this.setAllSelected(!this.isAllSelected());
    };
    Selection.prototype.toggleKeySelected = function (key) {
        this.setKeySelected(key, !this.isKeySelected(key), true);
    };
    Selection.prototype.toggleIndexSelected = function (index) {
        this.setIndexSelected(index, !this.isIndexSelected(index), true);
    };
    Selection.prototype.toggleRangeSelected = function (fromIndex, count) {
        var isRangeSelected = this.isRangeSelected(fromIndex, count);
        var endIndex = fromIndex + count;
        this.setChangeEvents(false);
        for (var i = fromIndex; i < endIndex; i++) {
            this.setIndexSelected(i, !isRangeSelected, false);
        }
        this.setChangeEvents(true);
    };
    Selection.prototype._updateCount = function () {
        this.count = this.getSelectedCount();
        this._change();
    };
    Selection.prototype._change = function () {
        if (this._changeEventSuppressionCount === 0) {
            this._selectedItems = null;
            EventGroup_1.EventGroup.raise(this, interfaces_1.SELECTION_CHANGE);
            if (this._onSelectionChanged) {
                this._onSelectionChanged();
            }
        }
        else {
            this._hasChanged = true;
        }
    };
    return Selection;
}());
exports.Selection = Selection;

//# sourceMappingURL=Selection.js.map
