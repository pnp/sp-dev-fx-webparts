import * as tslib_1 from "tslib";
import * as React from 'react';
import { css, getIconClassName } from '@microsoft/office-ui-fabric-react-bundle';
import styles from './MobilePreviewHeaderBar.module.scss';
import MobilePreviewURLEntry from './mobilePreviewURLEntry/MobilePreviewURLEntry';
import MobilePreviewDeviceTypeSelector from './mobilePreviewDeviceTypeSelector/MobilePreviewDeviceTypeSelector';
var MobilePreviewHeaderBar = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewHeaderBar, _super);
    function MobilePreviewHeaderBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewHeaderBar.prototype.render = function () {
        var mobilePreviewURLEntry = React.createElement(MobilePreviewURLEntry, { onChangeURL: this.props.onChangeURL, onClickURLSubmit: this.props.onClickURLSubmit });
        var mobilePreviewDeviceTypeSelector = React.createElement(MobilePreviewDeviceTypeSelector, { onChangeDeviceType: this.props.onChangeDeviceType });
        var navBarItemMdClass = css('ms-hiddenMdDown', styles.navBarItemMd);
        var navBarItemRightClass = css(styles.navBarItem, styles.navBarItemRight);
        var xClass = css(getIconClassName('Cancel'), styles.mobilePreviewXIcon);
        return (React.createElement("div", { className: styles.mobilePreviewNavBar },
            React.createElement("div", { className: styles.navBarItems },
                React.createElement("div", { className: styles.navBarItemSm },
                    React.createElement("span", { className: styles.mobilePreviewTitle }, "Mobile Preview")),
                React.createElement("div", { className: navBarItemMdClass }, mobilePreviewURLEntry),
                React.createElement("div", { className: styles.col },
                    React.createElement("div", { className: navBarItemRightClass },
                        React.createElement("a", { role: 'button', onClick: this.props.onExit },
                            React.createElement("span", { className: xClass }))),
                    mobilePreviewDeviceTypeSelector))));
    };
    return MobilePreviewHeaderBar;
}(React.Component));
export default MobilePreviewHeaderBar;
//# sourceMappingURL=MobilePreviewHeaderBar.js.map