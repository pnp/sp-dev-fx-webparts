"use strict";
var ReactDOM = require('react-dom');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
var DISTANCE_FOR_DRAG_SQUARED = 25; // the minimum mouse move distance to treat it as drag event
var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
var DragDropHelper = (function () {
    function DragDropHelper(params) {
        this._selection = params.selection;
        this._dragEnterCounts = {};
        this._activeTargets = {};
        this._events = new EventGroup_1.EventGroup(this);
        // clear drag data when mouse up, use capture event to ensure it will be run
        this._events.on(document.body, 'mouseup', this._onMouseUp.bind(this), true);
        this._events.on(document, 'mouseup', this._onDocumentMouseUp.bind(this), true);
    }
    DragDropHelper.prototype.dispose = function () {
        this._events.dispose();
    };
    DragDropHelper.prototype.subscribe = function (root, events, dragDropOptions) {
        var _this = this;
        if (dragDropOptions && root) {
            var key_1 = dragDropOptions.key, eventMap = dragDropOptions.eventMap, context_1 = dragDropOptions.context, updateDropState_1 = dragDropOptions.updateDropState;
            var dragDropTarget = { root: root, options: dragDropOptions };
            var isDraggable = this._isDraggable(dragDropTarget);
            var isDroppable = this._isDroppable(dragDropTarget);
            if (isDraggable || isDroppable) {
                this._activeTargets[key_1] = dragDropTarget;
                if (eventMap) {
                    for (var _i = 0, eventMap_1 = eventMap; _i < eventMap_1.length; _i++) {
                        var event_1 = eventMap_1[_i];
                        this._events.on(root, event_1.eventName, event_1.callback.bind(null, context_1));
                    }
                }
            }
            if (isDroppable) {
                this._dragEnterCounts[key_1] = 0;
                // dragenter and dragleave will be fired when hover to the child element
                // but we only want to change state when enter or leave the current element
                // use the count to ensure it.
                events.onAll(root, {
                    'dragenter': function (event) {
                        event.preventDefault(); // needed for IE
                        if (!event.isHandled) {
                            event.isHandled = true;
                            _this._dragEnterCounts[key_1]++;
                            if (_this._dragEnterCounts[key_1] === 1) {
                                updateDropState_1(true /* isDropping */, event);
                            }
                        }
                    },
                    'dragleave': function (event) {
                        if (!event.isHandled) {
                            event.isHandled = true;
                            _this._dragEnterCounts[key_1]--;
                            if (_this._dragEnterCounts[key_1] === 0) {
                                updateDropState_1(false /* isDropping */, event);
                            }
                        }
                    },
                    'dragend': function (event) {
                        _this._dragEnterCounts[key_1] = 0;
                        updateDropState_1(false /* isDropping */, event);
                    },
                    'drop': function (event) {
                        _this._dragEnterCounts[key_1] = 0;
                        updateDropState_1(false /* isDropping */, event);
                    }
                });
            }
            if (isDraggable) {
                events.on(root, 'mousedown', this._onMouseDown.bind(this, dragDropTarget));
            }
        }
    };
    DragDropHelper.prototype.unsubscribe = function (root, key) {
        delete this._activeTargets[key];
        this._events.off(root);
    };
    /**
     * clear drag data when mouse up on body
     */
    DragDropHelper.prototype._onMouseUp = function (event) {
        this._isDragging = false;
        if (this._dragData) {
            for (var key in this._activeTargets) {
                if (this._activeTargets.hasOwnProperty(key)) {
                    var target = this._activeTargets[key];
                    if (target && target.root) {
                        this._events.off(target.root, 'mousemove');
                        this._events.off(target.root, 'mouseleave');
                    }
                }
            }
            if (this._dragData.dropTarget) {
                // raise dargleave event to let dropTarget know it need to remove dropping style
                EventGroup_1.EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
            }
        }
        this._dragData = null;
    };
    /**
     * clear drag data when mouse up outside of the document
     */
    DragDropHelper.prototype._onDocumentMouseUp = function (event) {
        if (event.target === document.documentElement) {
            this._onMouseUp(event);
        }
    };
    /**
     * when mouse move over a new drop target while dragging some items,
     * fire dragleave on the old target and fire dragenter to the new target
     * The target will handle style change on dragenter and dragleave events.
     */
    DragDropHelper.prototype._onMouseMove = function (target, event) {
        var _a = event.buttons, buttons = _a === void 0 ? MOUSEMOVE_PRIMARY_BUTTON : _a;
        if (this._dragData && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
            // cancel mouse down event and return early when the primary button is not pressed
            this._onMouseUp(event);
            return;
        }
        var root = target.root, options = target.options;
        if (this._isDragging) {
            if (this._isDroppable(target)) {
                // we can have nested drop targets in the DOM, like a folder inside a group. In that case, when we drag into
                // the inner target (folder), we first set dropTarget to the inner element. But the same event is bubbled to the
                // outer target too, and we need to prevent the outer one from taking over.
                // So, check if the last dropTarget is not a child of the current.
                if (this._dragData.dropTarget &&
                    this._dragData.dropTarget.options.key !== options.key &&
                    !this._isChild(root, this._dragData.dropTarget.root)) {
                    EventGroup_1.EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
                    this._dragData.dropTarget = null;
                }
                if (!this._dragData.dropTarget) {
                    EventGroup_1.EventGroup.raise(root, 'dragenter');
                    this._dragData.dropTarget = target;
                }
            }
        }
        else if (this._dragData) {
            if (this._isDraggable(target)) {
                var xDiff = this._dragData.clientX - event.clientX;
                var yDiff = this._dragData.clientY - event.clientY;
                if (xDiff * xDiff + yDiff * yDiff >= DISTANCE_FOR_DRAG_SQUARED) {
                    if (this._dragData.dragTarget &&
                        this._selection.isIndexSelected(options.selectionIndex)) {
                        this._isDragging = true;
                        if (options.onDragStart) {
                            options.onDragStart(options.context.data, options.context.index, this._selection.getSelection(), event);
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
            if (this._dragData && this._dragData.dropTarget && this._dragData.dropTarget.options.key === target.options.key) {
                EventGroup_1.EventGroup.raise(target.root, 'dragleave');
                this._dragData.dropTarget = null;
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
            for (var key in this._activeTargets) {
                if (this._activeTargets.hasOwnProperty(key)) {
                    var activeTarget = this._activeTargets[key];
                    if (activeTarget && activeTarget.root) {
                        this._events.on(activeTarget.root, 'mousemove', this._onMouseMove.bind(this, activeTarget));
                        this._events.on(activeTarget.root, 'mouseleave', this._onMouseLeave.bind(this, activeTarget));
                    }
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
        var parentElement = ReactDOM.findDOMNode(parent);
        var childElement = ReactDOM.findDOMNode(child);
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
        return options.canDrag && options.canDrag(options.context.data);
    };
    DragDropHelper.prototype._isDroppable = function (target) {
        // TODO: take the drag item into consideration to prevent dragging an item into the same group
        var options = target.options;
        var dragContext = this._dragData && this._dragData.dragTarget ? this._dragData.dragTarget.options.context : null;
        return options.canDrop && options.canDrop(options.context, dragContext);
    };
    return DragDropHelper;
}());
exports.DragDropHelper = DragDropHelper;

//# sourceMappingURL=DragDropHelper.js.map
