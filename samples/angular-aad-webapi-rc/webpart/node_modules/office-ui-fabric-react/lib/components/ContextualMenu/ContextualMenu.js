"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var DirectionalHint_1 = require('../../common/DirectionalHint');
var FocusZone_1 = require('../../FocusZone');
var Utilities_1 = require('../../Utilities');
var Callout_1 = require('../../Callout');
var BaseComponent_1 = require('../../common/BaseComponent');
var Icon_1 = require('../../Icon');
require('./ContextualMenu.scss');
var ContextualMenuType;
(function (ContextualMenuType) {
    ContextualMenuType[ContextualMenuType["vertical"] = 0] = "vertical";
    ContextualMenuType[ContextualMenuType["horizontal"] = 1] = "horizontal";
})(ContextualMenuType || (ContextualMenuType = {}));
var HorizontalAlignmentHint;
(function (HorizontalAlignmentHint) {
    HorizontalAlignmentHint[HorizontalAlignmentHint["auto"] = 0] = "auto";
    HorizontalAlignmentHint[HorizontalAlignmentHint["left"] = 1] = "left";
    HorizontalAlignmentHint[HorizontalAlignmentHint["center"] = 2] = "center";
    HorizontalAlignmentHint[HorizontalAlignmentHint["right"] = 3] = "right";
})(HorizontalAlignmentHint || (HorizontalAlignmentHint = {}));
var VerticalAlignmentHint;
(function (VerticalAlignmentHint) {
    VerticalAlignmentHint[VerticalAlignmentHint["top"] = 0] = "top";
    VerticalAlignmentHint[VerticalAlignmentHint["center"] = 1] = "center";
    VerticalAlignmentHint[VerticalAlignmentHint["bottom"] = 2] = "bottom";
})(VerticalAlignmentHint || (VerticalAlignmentHint = {}));
var ContextualMenu = (function (_super) {
    __extends(ContextualMenu, _super);
    function ContextualMenu(props) {
        _super.call(this, props);
        this.state = {
            contextualMenuItems: null,
            subMenuId: Utilities_1.getId('ContextualMenu')
        };
        this._isFocusingPreviousElement = false;
        this._enterTimerId = 0;
    }
    ContextualMenu.prototype.dismiss = function (ev, dismissAll) {
        var onDismiss = this.props.onDismiss;
        if (onDismiss) {
            onDismiss(ev, dismissAll);
        }
    };
    ContextualMenu.prototype.componentWillUpdate = function (newProps) {
        if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
            var newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
            this._setTargetWindowAndElement(newTarget);
        }
    };
    // Invoked once, both on the client and server, immediately before the initial rendering occurs.
    ContextualMenu.prototype.componentWillMount = function () {
        var target = this.props.targetElement ? this.props.targetElement : this.props.target;
        this._setTargetWindowAndElement(target);
        this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement : null;
    };
    // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
    ContextualMenu.prototype.componentDidMount = function () {
        this._events.on(this._targetWindow, 'resize', this.dismiss);
    };
    // Invoked immediately before a component is unmounted from the DOM.
    ContextualMenu.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this._isFocusingPreviousElement && this._previousActiveElement) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            setTimeout(function () { return _this._previousActiveElement.focus(); }, 0);
        }
        this._events.dispose();
        this._async.dispose();
    };
    ContextualMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, items = _a.items, isBeakVisible = _a.isBeakVisible, labelElementId = _a.labelElementId, targetElement = _a.targetElement, id = _a.id, targetPoint = _a.targetPoint, useTargetPoint = _a.useTargetPoint, beakWidth = _a.beakWidth, directionalHint = _a.directionalHint, gapSpace = _a.gapSpace, coverTarget = _a.coverTarget, ariaLabel = _a.ariaLabel, doNotLayer = _a.doNotLayer, target = _a.target;
        var submenuProps = this.state.submenuProps;
        var hasIcons = !!(items && items.some(function (item) { return !!item.icon || !!item.iconProps; }));
        var hasCheckmarks = !!(items && items.some(function (item) { return !!item.canCheck; }));
        return (React.createElement(Callout_1.Callout, {target: target, targetElement: targetElement, targetPoint: targetPoint, useTargetPoint: useTargetPoint, isBeakVisible: isBeakVisible, beakWidth: beakWidth, directionalHint: directionalHint, gapSpace: gapSpace, coverTarget: coverTarget, doNotLayer: doNotLayer, className: 'ms-ContextualMenu-Callout', setInitialFocus: true, onDismiss: this.props.onDismiss}, 
            React.createElement("div", {ref: function (host) { return _this._host = host; }, id: id, className: Utilities_1.css('ms-ContextualMenu-container', className)}, 
                (items && items.length) ? (React.createElement(FocusZone_1.FocusZone, {className: 'ms-ContextualMenu is-open', direction: FocusZone_1.FocusZoneDirection.vertical, ariaLabelledBy: labelElementId, ref: function (focusZone) { return _this._focusZone = focusZone; }, rootProps: { role: 'menu' }}, 
                    React.createElement("ul", {className: 'ms-ContextualMenu-list is-open', onKeyDown: this._onKeyDown, "aria-label": ariaLabel}, items.map(function (item, index) { return (
                    // If the item name is equal to '-', a divider will be generated.
                    item.name === '-' ? (React.createElement("li", {role: 'separator', key: item.key || index, className: Utilities_1.css('ms-ContextualMenu-divider', item.className)})) : (React.createElement("li", {role: 'menuitem', title: item.title, key: item.key || index, className: Utilities_1.css('ms-ContextualMenu-item', item.className)}, _this._renderMenuItem(item, index, hasCheckmarks, hasIcons)))); }))
                )) : (null), 
                submenuProps ? (React.createElement(ContextualMenu, __assign({}, submenuProps))) : (null))
        ));
    };
    ContextualMenu.prototype._renderMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        if (item.onRender) {
            return item.onRender(item);
        }
        // If the item is disabled then it should render as the button for proper styling.
        if (item.href) {
            return this._renderAnchorMenuItem(item, index, hasCheckmarks, hasIcons);
        }
        return this._renderButtonItem(item, index, hasCheckmarks, hasIcons);
    };
    ContextualMenu.prototype._renderAnchorMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        return (React.createElement("div", null, 
            React.createElement("a", __assign({}, Utilities_1.getNativeProps(item, Utilities_1.anchorProperties), {href: item.href, className: Utilities_1.css('ms-ContextualMenu-link', item.isDisabled || item.disabled ? 'is-disabled' : ''), role: 'menuitem', onClick: this._onAnchorClick.bind(this, item)}), 
                (hasIcons) ? (this._renderIcon(item)) : (null), 
                React.createElement("span", {className: 'ms-ContextualMenu-linkText ms-fontWeight-regular'}, 
                    " ", 
                    item.name, 
                    " "))
        ));
    };
    ContextualMenu.prototype._renderButtonItem = function (item, index, hasCheckmarks, hasIcons) {
        var _this = this;
        var _a = this.state, expandedMenuItemKey = _a.expandedMenuItemKey, subMenuId = _a.subMenuId;
        var ariaLabel = '';
        if (item.ariaLabel) {
            ariaLabel = item.ariaLabel;
        }
        else if (item.name) {
            ariaLabel = item.name;
        }
        var itemButtonProperties = {
            className: Utilities_1.css('ms-ContextualMenu-link', { 'is-expanded': (expandedMenuItemKey === item.key) }),
            onClick: this._onItemClick.bind(this, item),
            onKeyDown: item.items && item.items.length ? this._onItemKeyDown.bind(this, item) : null,
            onMouseEnter: this._onItemMouseEnter.bind(this, item),
            onMouseLeave: this._onMouseLeave,
            onMouseDown: function (ev) { return _this._onItemMouseDown(item, ev); },
            disabled: item.isDisabled || item.disabled,
            role: 'menuitem',
            href: item.href,
            title: item.title,
            'aria-label': ariaLabel,
            'aria-haspopup': item.items && item.items.length ? true : null,
            'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null
        };
        return React.createElement('button', Utilities_1.assign({}, Utilities_1.getNativeProps(item, Utilities_1.buttonProperties), itemButtonProperties), this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons));
    };
    ContextualMenu.prototype._renderMenuItemChildren = function (item, index, hasCheckmarks, hasIcons) {
        var isItemChecked = item.isChecked || item.checked;
        return (React.createElement("div", {className: 'ms-ContextualMenu-linkContent'}, 
            (hasCheckmarks) ? (React.createElement(Icon_1.Icon, {iconName: isItemChecked ? Icon_1.IconName.CheckMark : Icon_1.IconName.CustomIcon, className: 'ms-ContextualMenu-icon', onClick: this._onItemClick.bind(this, item)})) : (null), 
            (hasIcons) ? (this._renderIcon(item)) : (null), 
            React.createElement("span", {className: 'ms-ContextualMenu-itemText ms-fontWeight-regular'}, item.name), 
            (item.items && item.items.length) ? (React.createElement(Icon_1.Icon, {className: 'ms-ContextualMenu-submenuChevron ms-Icon', iconName: Utilities_1.getRTL() ? Icon_1.IconName.ChevronLeft : Icon_1.IconName.ChevronRight})) : (null)));
    };
    ContextualMenu.prototype._renderIcon = function (item) {
        // Only present to allow continued use of item.icon which is deprecated.
        var iconProps = item.iconProps ? item.iconProps : {
            iconName: Icon_1.IconName[item.icon]
        };
        // Use the default icon color for the known icon names
        var iconColorClassName = iconProps.iconName === Icon_1.IconName.None ? '' : 'ms-ContextualMenu-iconColor';
        var iconClassName = Utilities_1.css('ms-ContextualMenu-icon', iconColorClassName, iconProps.className);
        return React.createElement(Icon_1.Icon, __assign({}, iconProps, {className: iconClassName}));
    };
    ContextualMenu.prototype._onKeyDown = function (ev) {
        var submenuCloseKey = Utilities_1.getRTL() ? Utilities_1.KeyCodes.right : Utilities_1.KeyCodes.left;
        if (ev.which === Utilities_1.KeyCodes.escape
            || ev.which === Utilities_1.KeyCodes.tab
            || (ev.which === submenuCloseKey && this.props.isSubMenu)) {
            // When a user presses escape, we will try to refocus the previous focused element.
            this._isFocusingPreviousElement = true;
            ev.preventDefault();
            ev.stopPropagation();
            this.dismiss(ev);
        }
    };
    ContextualMenu.prototype._onItemMouseEnter = function (item, ev) {
        var _this = this;
        var targetElement = ev.currentTarget;
        if (item.key !== this.state.expandedMenuItemKey) {
            if (item.items && item.items.length) {
                this._enterTimerId = this._async.setTimeout(function () { return _this._onItemSubMenuExpand(item, targetElement); }, 500);
            }
            else {
                this._enterTimerId = this._async.setTimeout(function () { return _this._onSubMenuDismiss(ev); }, 500);
            }
        }
    };
    ContextualMenu.prototype._onMouseLeave = function (ev) {
        this._async.clearTimeout(this._enterTimerId);
    };
    ContextualMenu.prototype._onItemMouseDown = function (item, ev) {
        if (item.onMouseDown) {
            item.onMouseDown(item, ev);
        }
    };
    ContextualMenu.prototype._onItemClick = function (item, ev) {
        if (!item.items || !item.items.length) {
            this._executeItemClick(item, ev);
        }
        else {
            if (item.key === this.state.expandedMenuItemKey) {
                this._onSubMenuDismiss(ev);
            }
            else {
                this._onItemSubMenuExpand(item, ev.currentTarget);
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
    };
    ContextualMenu.prototype._onAnchorClick = function (item, ev) {
        this._executeItemClick(item, ev);
        ev.stopPropagation();
    };
    ContextualMenu.prototype._executeItemClick = function (item, ev) {
        if (item.onClick) {
            item.onClick(ev, item);
        }
        this.dismiss(ev, true);
    };
    ContextualMenu.prototype._onItemKeyDown = function (item, ev) {
        var openKey = Utilities_1.getRTL() ? Utilities_1.KeyCodes.left : Utilities_1.KeyCodes.right;
        if (ev.which === openKey) {
            this._onItemSubMenuExpand(item, ev.currentTarget);
        }
    };
    ContextualMenu.prototype._onItemSubMenuExpand = function (item, target) {
        if (this.state.expandedMenuItemKey !== item.key) {
            if (this.state.submenuProps) {
                this._onSubMenuDismiss();
            }
            this.setState({
                expandedMenuItemKey: item.key,
                submenuProps: {
                    items: item.items,
                    target: target,
                    onDismiss: this._onSubMenuDismiss,
                    isSubMenu: true,
                    id: this.state.subMenuId,
                    shouldFocusOnMount: true,
                    directionalHint: Utilities_1.getRTL() ? DirectionalHint_1.DirectionalHint.leftTopEdge : DirectionalHint_1.DirectionalHint.rightTopEdge,
                    className: this.props.className,
                    gapSpace: 0
                }
            });
        }
    };
    ContextualMenu.prototype._onSubMenuDismiss = function (ev, dismissAll) {
        if (dismissAll) {
            this.dismiss(ev, dismissAll);
        }
        else {
            this.setState({
                dismissedMenuItemKey: this.state.expandedMenuItemKey,
                expandedMenuItemKey: null,
                submenuProps: null
            });
        }
    };
    ContextualMenu.prototype._setTargetWindowAndElement = function (target) {
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Utilities_1.getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Utilities_1.getWindow();
            }
            else if (target.stopPropagation) {
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(target.toElement);
            }
            else {
                var targetElement = target;
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(targetElement);
            }
        }
        else {
            this._targetWindow = Utilities_1.getWindow();
        }
    };
    // The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
    ContextualMenu.defaultProps = {
        items: [],
        shouldFocusOnMount: true,
        isBeakVisible: false,
        gapSpace: 0,
        directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge,
        beakWidth: 16
    };
    __decorate([
        Utilities_1.autobind
    ], ContextualMenu.prototype, "dismiss", null);
    __decorate([
        Utilities_1.autobind
    ], ContextualMenu.prototype, "_onKeyDown", null);
    __decorate([
        Utilities_1.autobind
    ], ContextualMenu.prototype, "_onMouseLeave", null);
    __decorate([
        Utilities_1.autobind
    ], ContextualMenu.prototype, "_onSubMenuDismiss", null);
    return ContextualMenu;
}(BaseComponent_1.BaseComponent));
exports.ContextualMenu = ContextualMenu;

//# sourceMappingURL=ContextualMenu.js.map
