import * as tslib_1 from "tslib";
import * as React from 'react';
import { css } from '@microsoft/office-ui-fabric-react-bundle';
import styles from './MobilePreviewDeviceView.module.scss';
import { DeviceOrientation, DeviceType } from '../mobilePreview/MobilePreview';
var MobilePreviewDeviceView = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewDeviceView, _super);
    function MobilePreviewDeviceView(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewDeviceView.prototype.render = function () {
        var formStyle = {
            width: this.props.currentDevice.width,
            height: this.props.currentDevice.height
        };
        var mobilePreviewClassName = css(styles.mobilePreviewDevice, this.props.deviceType === DeviceType.Tablet ? styles.mobilePreviewTablet :
            this.props.currentOrientation === DeviceOrientation.Portrait ? styles.mobilePreviewPortrait :
                styles.mobilePreviewLandscape);
        if (this.props.deviceType === DeviceType.Phone) {
            if (this.props.currentOrientation === DeviceOrientation.Landscape) {
                formStyle.width = this.props.currentDevice.height;
                formStyle.height = this.props.currentDevice.width;
            }
        }
        if (this.props.deviceType === DeviceType.Tablet) {
            if (this.props.currentOrientation === DeviceOrientation.Portrait) {
                formStyle.width = this.props.currentDevice.height;
                formStyle.height = this.props.currentDevice.width;
            }
        }
        return (React.createElement("div", { className: mobilePreviewClassName, style: formStyle },
            React.createElement("iframe", { className: styles.mobilePreviewIframe, src: this.props.url })));
    };
    return MobilePreviewDeviceView;
}(React.Component));
export default MobilePreviewDeviceView;
//# sourceMappingURL=MobilePreviewDeviceView.js.map