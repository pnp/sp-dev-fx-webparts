var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import styles from './ModernLinkPresenter.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { TextField } from '@fluentui/react/lib/TextField';
import * as strings from 'ModernLinkPresenterWebPartStrings';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton } from '@fluentui/react/lib/Button';
// Add a helper function to determine contrast color
function getContrastYIQ(hexcolor) {
    if (!hexcolor)
        return '#222';
    var color = hexcolor.replace('#', '');
    if (color.length === 3)
        color = color.split('').map(function (x) { return x + x; }).join('');
    if (color.length !== 6)
        return '#222';
    var r = parseInt(color.substr(0, 2), 16);
    var g = parseInt(color.substr(2, 2), 16);
    var b = parseInt(color.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 180) ? '#222' : '#fff';
}
var ModernLinkPresenter = /** @class */ (function (_super) {
    __extends(ModernLinkPresenter, _super);
    function ModernLinkPresenter(props) {
        var _this = _super.call(this, props) || this;
        _this.openDialog = function (url, title) {
            _this.setState({ dialogOpen: true, dialogUrl: url, dialogTitle: title, dialogMaximized: false });
        };
        _this.closeDialog = function () {
            _this.setState({ dialogOpen: false, dialogUrl: '', dialogTitle: '', dialogMaximized: false });
        };
        _this.toggleDialogMaximize = function () {
            _this.setState(function (s) { return ({ dialogMaximized: !s.dialogMaximized }); });
        };
        _this.state = { search: '', dialogOpen: false, dialogUrl: '', dialogTitle: '', dialogMaximized: false };
        return _this;
    }
    ModernLinkPresenter.prototype.filterLinks = function (links) {
        var search = this.state.search;
        if (!search)
            return links;
        var s = search.toLowerCase();
        return links.filter(function (link) {
            return (link.title && link.title.toLowerCase().includes(s)) ||
                (link.description && link.description.toLowerCase().includes(s)) ||
                (link.url && link.url.toLowerCase().includes(s));
        });
    };
    ModernLinkPresenter.prototype.render = function () {
        var _this = this;
        var _a = this.props, description = _a.description, hasTeamsContext = _a.hasTeamsContext, links = _a.links, outputFormat = _a.outputFormat, displayMode = _a.displayMode, onTitleUpdate = _a.onTitleUpdate, tileWidth = _a.tileWidth, tileHeight = _a.tileHeight, tileHoverEffect = _a.tileHoverEffect, direction = _a.direction, tileButtonText = _a.tileButtonText, showTileButton = _a.showTileButton, _b = _a.showSearchField, showSearchField = _b === void 0 ? true : _b;
        var filteredLinks = this.filterLinks(links);
        var isSearching = !!this.state.search;
        return (React.createElement("section", { className: "".concat(styles.modernLinkPresenter, " ").concat(hasTeamsContext ? styles.teams : '') },
            React.createElement(WebPartTitle, { displayMode: displayMode, title: description, updateProperty: onTitleUpdate }),
            showSearchField && (React.createElement("div", { style: { position: 'relative', width: '100%', marginBottom: 16 } },
                React.createElement(TextField, { placeholder: strings.SearchLinksPlaceholder, value: this.state.search, onChange: function (_, v) { return _this.setState({ search: v || '' }); }, styles: { root: { width: '100%' }, field: { paddingLeft: 36, paddingRight: 36 } } }),
                React.createElement("span", { style: __assign({ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)' }, (isSearching ? { transform: 'translateY(-50%) scale(1.2) rotate(20deg)' } : {})) },
                    React.createElement(Icon, { iconName: "Search", style: { fontSize: 18, color: '#888' } })),
                isSearching && (React.createElement("button", { type: "button", "aria-label": "Clear search", onClick: function () { return _this.setState({ search: '' }); }, tabIndex: 0, onKeyDown: function (e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            _this.setState({ search: '' });
                        }
                    }, style: {
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        cursor: 'pointer',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        width: 24
                    } },
                    React.createElement(Icon, { iconName: "Clear", style: { fontSize: 18, color: '#888' } }))))),
            React.createElement("div", null,
                outputFormat === 'links' && (React.createElement("div", { className: direction === 'horizontal' ? styles.horizontalList : styles.verticalList }, filteredLinks && filteredLinks.length > 0 ? (filteredLinks.map(function (link, idx) { return (React.createElement("div", { key: idx, className: styles.linkItem },
                    React.createElement("a", { href: link.target === 'dialog' ? undefined : link.url, target: link.target !== 'dialog' ? (link.target || '_blank') : undefined, rel: "noreferrer", className: styles.inlineLinkTitle, onClick: link.target === 'dialog' ? function (e) { e.preventDefault(); _this.openDialog(link.url, link.title); } : undefined }, link.title))); })) : (React.createElement("div", null, "No links configured.")))),
                outputFormat === 'linksWithIcon' && (React.createElement("div", { className: direction === 'horizontal' ? styles.horizontalList : styles.verticalList }, filteredLinks && filteredLinks.length > 0 ? (filteredLinks.map(function (link, idx) { return (React.createElement("div", { key: idx, className: styles.linkItem },
                    React.createElement("a", { href: link.target === 'dialog' ? undefined : link.url, target: link.target !== 'dialog' ? (link.target || '_blank') : undefined, rel: "noreferrer", className: styles.inlineLinkTitle, onClick: link.target === 'dialog' ? function (e) { e.preventDefault(); _this.openDialog(link.url, link.title); } : undefined },
                        link.icon && React.createElement(Icon, { iconName: link.icon, style: { marginRight: '0.5em' } }),
                        link.title))); })) : (React.createElement("div", null, "No links configured.")))),
                outputFormat === 'linkDescriptionIcon' && (React.createElement("div", { className: styles.inlineLinkGrid }, filteredLinks && filteredLinks.length > 0 ? (filteredLinks.map(function (link, idx) { return (React.createElement("div", { key: idx, className: styles.inlineLinkTile, style: { background: link.color || '#ddd', color: getContrastYIQ(link.color) } },
                    React.createElement("div", null,
                        link.icon && React.createElement("span", { className: styles.inlineLinkIcon },
                            React.createElement(Icon, { iconName: link.icon })),
                        React.createElement("a", { href: link.target === 'dialog' ? undefined : link.url, target: link.target !== 'dialog' ? (link.target || '_blank') : undefined, rel: "noreferrer", className: styles.inlineLinkTitle, style: { color: getContrastYIQ(link.color) }, onClick: link.target === 'dialog' ? function (e) { e.preventDefault(); _this.openDialog(link.url, link.title); } : undefined }, link.title)),
                    link.description && (React.createElement("div", { className: styles.inlineLinkDescription, style: { color: getContrastYIQ(link.color) } }, link.description)))); })) : (React.createElement("div", null, "No links configured.")))),
                outputFormat === 'tile' && (React.createElement("div", { className: styles.tileGrid }, filteredLinks && filteredLinks.length > 0 ? (filteredLinks.map(function (link, idx) {
                    var tileContent = (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: styles.tileIcon }, link.icon && React.createElement(Icon, { iconName: link.icon })),
                        React.createElement("div", { className: styles.tileTitle }, link.title),
                        link.description && (React.createElement("div", { className: styles.tileDescription, style: { color: getContrastYIQ(link.color) } }, link.description))));
                    if (showTileButton !== false) {
                        return (React.createElement("div", { key: idx, className: styles.tile + ' ' +
                                (tileHoverEffect && styles["tile--".concat(tileHoverEffect)] ? styles["tile--".concat(tileHoverEffect)] : styles['tile--lift']), style: {
                                width: tileWidth,
                                minHeight: tileHeight,
                                background: link.color || undefined,
                                color: getContrastYIQ(link.color)
                            } },
                            tileContent,
                            React.createElement("a", { href: link.target === 'dialog' ? undefined : link.url, target: link.target !== 'dialog' ? (link.target || '_blank') : undefined, rel: "noreferrer", className: styles.tileButton, onClick: link.target === 'dialog' ? function (e) { e.preventDefault(); _this.openDialog(link.url, link.title); } : undefined }, tileButtonText)));
                    }
                    else {
                        return (React.createElement("a", { key: idx, href: link.target === 'dialog' ? undefined : link.url, target: link.target !== 'dialog' ? (link.target || '_blank') : undefined, rel: "noreferrer", className: styles.tile + ' ' +
                                (tileHoverEffect && styles["tile--".concat(tileHoverEffect)] ? styles["tile--".concat(tileHoverEffect)] : styles['tile--lift']), style: {
                                width: tileWidth,
                                minHeight: tileHeight,
                                background: link.color || undefined,
                                color: getContrastYIQ(link.color),
                                textDecoration: 'none'
                            }, onClick: link.target === 'dialog' ? function (e) { e.preventDefault(); _this.openDialog(link.url, link.title); } : undefined }, tileContent));
                    }
                })) : (React.createElement("div", null, "No links configured."))))),
            React.createElement(Dialog, { hidden: !this.state.dialogOpen, onDismiss: this.closeDialog, dialogContentProps: {
                    type: DialogType.largeHeader,
                    title: this.state.dialogTitle,
                    topButtonsProps: [
                        {
                            ariaLabel: this.state.dialogMaximized ? 'Restore' : 'Maximize',
                            iconProps: { iconName: this.state.dialogMaximized ? 'BackToWindow' : 'FullScreen' },
                            onClick: this.toggleDialogMaximize
                        }
                    ]
                }, minWidth: this.state.dialogMaximized ? '100vw' : 600, maxWidth: this.state.dialogMaximized ? '100vw' : 900, styles: this.state.dialogMaximized ? { main: { maxWidth: '100vw', width: '100vw', height: '100vh', top: 0, left: 0, margin: 0, padding: 0 } } : {} },
                React.createElement("iframe", { src: this.state.dialogUrl, style: { width: '100%', height: this.state.dialogMaximized ? '80vh' : '60vh', border: 'none' }, title: this.state.dialogTitle }),
                React.createElement(DialogFooter, null,
                    React.createElement(PrimaryButton, { onClick: this.closeDialog, text: "Close" })))));
    };
    return ModernLinkPresenter;
}(React.Component));
export default ModernLinkPresenter;
//# sourceMappingURL=ModernLinkPresenter.js.map