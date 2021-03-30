import * as tslib_1 from "tslib";
import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@microsoft/office-ui-fabric-react-bundle';
import MobilePreviewClickStop from '../mobilePreviewClickStop/MobilePreviewClickStop';
import styles from './MobilePreviewClickStopBar.module.scss';
import strings from '../MobilePreview.resx';
var MobilePreviewClickStopBar = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewClickStopBar, _super);
    function MobilePreviewClickStopBar(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewClickStopBar.prototype.render = function () {
        var props = this.props;
        var deviceDiv = [];
        var _loop_1 = function (device) {
            var selected = false;
            if (device === props.currentDevice) {
                selected = true;
            }
            deviceDiv.push(React.createElement(MobilePreviewClickStop, { key: device.name, device: device, onClick: function () { return props.onSelectClickStop(device); }, selected: selected, orientation: props.currentOrientation, deviceType: this_1.props.deviceType }));
        };
        var this_1 = this;
        for (var _i = 0, _a = props.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            _loop_1(device);
        }
        return (React.createElement("div", { className: styles.clickStopNavBar, "data-sp-a11y-alertonfocusin": strings.ScreenReaderDevicePickerEntered },
            React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal },
                React.createElement("ul", { className: styles.navBarItems },
                    deviceDiv,
                    React.createElement("div", { id: 'clickStopBarLabel', className: styles.mobilePreviewDeviceTitle }, props.currentDevice.name)))));
    };
    return MobilePreviewClickStopBar;
}(React.Component));
export default MobilePreviewClickStopBar;
//# sourceMappingURL=MobilePreviewClickStopBar.js.map