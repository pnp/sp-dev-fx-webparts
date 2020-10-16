/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file MobilePreview
 * Shows a view of the user's page in a mobile device-sized iframe.
 * The frame size is configurable through click stops set to the size of popular device
 * forms, X and Y dimension input boxes, and options to rotate the device and switch
 * between mobile, tablet and desktop sizes. There is also an option to view an alternate
 * URL of the user's input in the frame.
 */
import * as tslib_1 from "tslib";
import * as React from 'react';
import { autobind, FocusTrapZone } from '@microsoft/office-ui-fabric-react-bundle';
import { mobilePreviewDevices as importedDevices } from '../MobilePreviewDevices';
import MobilePreviewClickStopBar from '../mobilePreviewClickStopBar/MobilePreviewClickStopBar';
import MobilePreviewHeaderBar from '../mobilePreviewHeaderBar/MobilePreviewHeaderBar';
import MobilePreviewDeviceView from '../mobilePreviewDeviceView/MobilePreviewDeviceView';
import MobilePreviewDimensionInput from '../mobilePreviewDimensionInput/MobilePreviewDimensionInput';
import MobilePreviewRotate from '../mobilePreviewRotate/MobilePreviewRotate';
import styles from './MobilePreview.module.scss';
import strings from '../MobilePreview.resx';
export var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Phone"] = 0] = "Phone";
    DeviceType[DeviceType["Tablet"] = 1] = "Tablet";
})(DeviceType || (DeviceType = {}));
export var DeviceOrientation;
(function (DeviceOrientation) {
    DeviceOrientation[DeviceOrientation["Portrait"] = 0] = "Portrait";
    DeviceOrientation[DeviceOrientation["Landscape"] = 1] = "Landscape";
})(DeviceOrientation || (DeviceOrientation = {}));
var MobilePreview = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreview, _super);
    function MobilePreview(props) {
        var _this = _super.call(this, props) || this;
        // Store string from url textfield outside of state so we don't change the iframe URL until the user clicks submit
        _this.inProgressURL = '';
        if (!_this.props.devices) {
            _this.devices = importedDevices;
        }
        else {
            _this.devices = _this.props.devices;
        }
        var deviceType = _this.props.deviceType || DeviceType.Phone;
        /**
         * Pick a default device for now, which will be changed later
         * A current device is needed before sorting can happen
        */
        _this.defaultPhone = _this.devices.phones[_this.devices.phones.length - 1];
        _this.defaultTablet = _this.devices.tablets[_this.devices.tablets.length - 1];
        _this.state = {
            currentOrientation: deviceType === DeviceType.Phone ?
                DeviceOrientation.Portrait : DeviceOrientation.Landscape,
            currentDevice: deviceType === DeviceType.Phone ? _this.defaultPhone : _this.defaultTablet,
            deviceType: deviceType,
            url: window.location.href + '?Mode=Read'
        };
        _this._sortDevices();
        return _this;
    }
    MobilePreview.prototype.render = function () {
        var _this = this;
        this._sortDevices();
        var mobilePreviewClickStopBar = React.createElement(MobilePreviewClickStopBar, { currentDevice: this.state.currentDevice, currentOrientation: this.state.currentOrientation, devices: this.state.deviceType === DeviceType.Phone ? this.devices.phones : this.devices.tablets, deviceType: this.state.deviceType, onSelectClickStop: this._onClickstopChangeForm });
        var mobilePreviewHeaderBar = React.createElement(MobilePreviewHeaderBar, { onChangeURL: this._onChangedURLField, onExit: this.props.onExit, onClickURLSubmit: this._onClickURL, onChangeDeviceType: this._onClickChangeDeviceType });
        var mobilePreviewDeviceView = React.createElement(MobilePreviewDeviceView, { currentDevice: this.state.currentDevice, currentOrientation: this.state.currentOrientation, deviceType: this.state.deviceType, url: this.state.url });
        var mobilePreviewDimensionInput = React.createElement(MobilePreviewDimensionInput, { currentDevice: this.state.currentDevice, onChangedX: this._onChangedX, onChangedY: this._onChangedY });
        var mobilePreviewRotate = React.createElement(MobilePreviewRotate, { onRotate: this._onClickRotate, currentOrientation: this.state.currentOrientation });
        return (React.createElement(FocusTrapZone, null,
            React.createElement("div", { "data-sp-a11y-zone": '1', "data-sp-a11y-alertonfocusin": strings.ScreenReaderMobilePreviewEntered, className: styles.mobilePreviewContainer, ref: function (c) { return _this._mainDiv = c; } },
                mobilePreviewHeaderBar,
                mobilePreviewClickStopBar,
                React.createElement("div", { className: styles.mobilePreviewDeviceContainer },
                    mobilePreviewDimensionInput,
                    mobilePreviewRotate,
                    mobilePreviewDeviceView))));
    };
    MobilePreview.prototype.componentDidMount = function () {
        if (this._mainDiv) {
            this._mainDiv.addEventListener('keydown', this._handleKeyDown, true);
        }
    };
    MobilePreview.prototype._onClickstopChangeForm = function (device) {
        this.setState({
            currentDevice: device,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onClickRotate = function (orientation) {
        this.setState({
            currentDevice: this.state.currentDevice,
            currentOrientation: orientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onClickChangeDeviceType = function (type) {
        this.setState({
            currentDevice: type === DeviceType.Phone ? this.defaultPhone : this.defaultTablet,
            currentOrientation: type === DeviceType.Phone ? DeviceOrientation.Portrait : DeviceOrientation.Landscape,
            deviceType: type,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onChangedX = function (event) {
        var heightTarget = event.target;
        var customDevice = {
            name: 'Custom Device',
            width: +heightTarget.value,
            height: this.state.currentDevice.height
        };
        this.setState({
            currentDevice: customDevice,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onChangedY = function (event) {
        var heightTarget = event.target;
        var customDevice = {
            name: 'Custom Device',
            height: +heightTarget.value,
            width: this.state.currentDevice.width
        };
        this.setState({
            currentDevice: customDevice,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.state.url
        });
    };
    MobilePreview.prototype._onChangedURLField = function (value) {
        this.inProgressURL = value;
    };
    MobilePreview.prototype._onClickURL = function () {
        if (this.inProgressURL === '' || this.inProgressURL === undefined) {
            return;
        }
        this.setState({
            currentDevice: this.state.currentDevice,
            currentOrientation: this.state.currentOrientation,
            deviceType: this.state.deviceType,
            url: this.inProgressURL
        });
    };
    MobilePreview.prototype._handleKeyDown = function (evt) {
        // On Escape press, close the preview panel
        if (evt.keyCode === 27) {
            this.props.onExit();
        }
    };
    /**
     * Used to sort devices by either height or width depending on the orientation of the device. This is necessary
     * because the clickstops will only show up/function properly if they are rendered in order from greatest to
     * smallest length.
     */
    MobilePreview.prototype._sortDevices = function () {
        if (this.state.deviceType === DeviceType.Phone) {
            this.devices.phones.sort(this._comparePhones);
            this.defaultPhone = this.devices.phones[this.devices.phones.length - 1];
        }
        else {
            this.devices.tablets.sort(this._compareTablets);
            this.defaultTablet = this.devices.tablets[this.devices.tablets.length - 1];
        }
    };
    MobilePreview.prototype._comparePhones = function (deviceA, deviceB) {
        var aMeasure = deviceA.width;
        var bMeasure = deviceB.width;
        if (this.state.currentOrientation === DeviceOrientation.Landscape) {
            aMeasure = deviceA.height;
            bMeasure = deviceB.height;
        }
        return bMeasure - aMeasure;
    };
    MobilePreview.prototype._compareTablets = function (deviceA, deviceB) {
        var aMeasure = deviceA.height;
        var bMeasure = deviceB.height;
        if (this.state.currentOrientation === DeviceOrientation.Landscape) {
            aMeasure = deviceA.width;
            bMeasure = deviceB.width;
        }
        return bMeasure - aMeasure;
    };
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onClickstopChangeForm", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onClickRotate", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onClickChangeDeviceType", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onChangedX", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onChangedY", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onChangedURLField", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_onClickURL", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_handleKeyDown", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_sortDevices", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_comparePhones", null);
    tslib_1.__decorate([
        autobind
    ], MobilePreview.prototype, "_compareTablets", null);
    return MobilePreview;
}(React.Component));
export default MobilePreview;
//# sourceMappingURL=MobilePreview.js.map