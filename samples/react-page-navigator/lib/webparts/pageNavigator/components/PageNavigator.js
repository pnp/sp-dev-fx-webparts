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
import * as React from 'react';
import styles from './PageNavigator.module.scss';
import { Nav } from '@fluentui/react/lib/Nav';
var PageNavigator = /** @class */ (function (_super) {
    __extends(PageNavigator, _super);
    function PageNavigator(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            anchorLinks: [],
            selectedKey: ''
        };
        _this.onLinkClick = _this.onLinkClick.bind(_this);
        return _this;
    }
    PageNavigator.prototype.componentDidMount = function () {
        this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
    };
    PageNavigator.prototype.componentDidUpdate = function (prevProps) {
        if (JSON.stringify(prevProps.anchorLinks) !== JSON.stringify(this.props.anchorLinks)) {
            this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
        }
    };
    PageNavigator.prototype.onLinkClick = function (ev, item) {
        this.setState({ selectedKey: item.key });
    };
    /**
     * Traverse up the DOM from the webpart stickyParentDistance times and then apply the relevant CSS to enable sticky mode to the right component
     * This does involve modifying HTML elements outside of the webpart, so could stop working in the future if Microsoft change their HTML\CSS etc.
     * At time of writing, stickyParentDistance = 1 works correctly for the component when configured on a vertical section as per the README.
     */
    PageNavigator.prototype.configureSticky = function () {
        var HTMLElementSticky = document.querySelector("[id='" + this.props.webpartId + "']");
        var dist = parseInt(this.props.stickyParentDistance);
        if (isNaN(dist)) {
            console.log("Invalid parent distance " + this.props.stickyParentDistance);
            return;
        }
        if (HTMLElementSticky !== null) {
            for (var i = 0; i < dist; i++) {
                if (HTMLElementSticky.parentElement === null) {
                    console.log("Sticky Parent distance overflow: " + i);
                    break;
                }
                HTMLElementSticky = HTMLElementSticky.parentElement;
            }
            if (this.props.stickyMode && window.innerWidth > 1024) {
                HTMLElementSticky.style.position = "Sticky";
                HTMLElementSticky.style.top = "0px";
            }
            else {
                HTMLElementSticky.style.position = "";
                HTMLElementSticky.style.top = "";
            }
        }
    };
    PageNavigator.prototype.render = function () {
        this.configureSticky();
        return (React.createElement("div", { className: styles.pageNavigator },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement(Nav, { selectedKey: this.state.selectedKey, onLinkClick: this.onLinkClick, groups: [{ links: this.state.anchorLinks }], theme: this.props.themeVariant }))))));
    };
    return PageNavigator;
}(React.Component));
export default PageNavigator;
//# sourceMappingURL=PageNavigator.js.map