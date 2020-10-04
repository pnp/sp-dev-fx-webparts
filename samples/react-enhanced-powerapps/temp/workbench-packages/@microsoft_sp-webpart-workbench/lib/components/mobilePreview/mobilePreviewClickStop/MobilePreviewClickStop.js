import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { css, autobind } from '@microsoft/office-ui-fabric-react-bundle';
import { DeviceOrientation, DeviceType } from '../mobilePreview/MobilePreview';
import styles from './MobilePreviewClickStop.module.scss';
import strings from '../MobilePreview.resx';
var MobilePreviewClickStop = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewClickStop, _super);
    function MobilePreviewClickStop(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewClickStop.prototype.render = function () {
        var _this = this;
        var _a;
        var effectiveWidth = this.props.device.width;
        if (this.props.deviceType === DeviceType.Phone) {
            if (this.props.orientation === DeviceOrientation.Landscape) {
                effectiveWidth = this.props.device.height;
            }
        }
        else if (this.props.deviceType === DeviceType.Tablet) {
            if (this.props.orientation === DeviceOrientation.Portrait) {
                effectiveWidth = this.props.device.height;
            }
        }
        var leftCalc = "calc(50% - " + effectiveWidth / 2 + "px)";
        var divStyle = {
            width: effectiveWidth,
            left: leftCalc
        };
        var className = css(styles.navBarItem, styles.clickStop, (_a = {},
            _a[styles.clickStopSelected] = this.props.selected,
            _a));
        return (React.createElement("li", { className: className, role: 'button', "aria-label": this.props.device.name, tabIndex: 0, onClick: this._handleClick, onKeyDown: this._handleKeyDown, style: divStyle, onFocus: this._handleFocus, ref: function (c) { return _this._mainDiv = c; } }));
    };
    MobilePreviewClickStop.prototype._handleFocus = function () {
        // If the focus is set to the button and the button is not selected, read that Enter key can be used to select
        if (document.activeElement === this._mainDiv && !this.props.selected) {
            this.context.a11yManager.alert(strings.ScreenReaderDevicePickerSelectionChanged);
        }
    };
    MobilePreviewClickStop.prototype._handleClick = function () {
        this.props.onClick(this.props.device);
    };
    MobilePreviewClickStop.prototype._handleKeyDown = function (evt) {
        // Call click handler on Enter
        if (evt.keyCode === 13) {
            this._handleClick();
        }
    };
    MobilePreviewClickStop.contextTypes = {
        a11yManager: PropTypes.object
    };
    tslib_1.__decorate([
        autobind
    ], MobilePreviewClickStop.prototype, "_handleFocus", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreviewClickStop.prototype, "_handleClick", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreviewClickStop.prototype, "_handleKeyDown", null);
    return MobilePreviewClickStop;
}(React.Component));
export default MobilePreviewClickStop;
//# sourceMappingURL=MobilePreviewClickStop.js.map