import * as tslib_1 from "tslib";
import * as React from 'react';
import { css, getIconClassName } from '@microsoft/office-ui-fabric-react-bundle';
import styles from './MobilePreviewDeviceTypeSelector.module.scss';
import { DeviceType } from '../../mobilePreview/MobilePreview';
var MobilePreviewDeviceTypeSelector = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewDeviceTypeSelector, _super);
    function MobilePreviewDeviceTypeSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewDeviceTypeSelector.prototype.render = function () {
        var _this = this;
        var spanClassNameMobile = css(getIconClassName('CellPhone'), styles.mobilePreviewDeviceIcon);
        var spanClassNameTablet = css(getIconClassName('Tablet'), styles.mobilePreviewDeviceIcon);
        return (React.createElement("div", null,
            React.createElement("div", { className: styles.navBarItemRight },
                React.createElement("a", { tabIndex: 0, role: 'button', onClick: function () { return _this.props.onChangeDeviceType(DeviceType.Phone); } },
                    React.createElement("span", { className: spanClassNameMobile }))),
            React.createElement("div", { className: styles.navBarItemRight },
                React.createElement("a", { tabIndex: 0, role: 'button', onClick: function () { return _this.props.onChangeDeviceType(DeviceType.Tablet); } },
                    React.createElement("span", { className: spanClassNameTablet })))));
    };
    return MobilePreviewDeviceTypeSelector;
}(React.Component));
export default MobilePreviewDeviceTypeSelector;
//# sourceMappingURL=MobilePreviewDeviceTypeSelector.js.map