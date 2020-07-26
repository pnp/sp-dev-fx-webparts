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
import * as React from 'react';
export declare enum DeviceType {
    Phone = 0,
    Tablet = 1
}
export declare enum DeviceOrientation {
    Portrait = 0,
    Landscape = 1
}
export interface IMobilePreviewProps {
    deviceType?: DeviceType;
    onExit?: () => void;
    devices?: IDeviceList;
}
/**
 * Example:
 * state = {
 *  currentDevice: { name: 'Windows Lumia 950', width: 360, height: 640 },
 *  currentOrientation: DeviceOrientation.Portrait,
 *  deviceType: DeviceType.Phone,
 *  url: 'http://www.bing.com'
 * }
 */
export interface IMobilePreviewState {
    currentDevice: IDevice;
    currentOrientation: DeviceOrientation;
    deviceType: DeviceType;
    url: string;
}
export interface IDevice {
    name: string;
    width: number;
    height: number;
}
export interface IDeviceList {
    phones: IDevice[];
    tablets: IDevice[];
    desktops: IDevice[];
}
export default class MobilePreview extends React.Component<IMobilePreviewProps, IMobilePreviewState> {
    private defaultPhone;
    private defaultTablet;
    private devices;
    private inProgressURL;
    private _mainDiv;
    constructor(props: IMobilePreviewProps);
    render(): React.ReactElement<{}>;
    componentDidMount(): void;
    private _onClickstopChangeForm;
    private _onClickRotate;
    private _onClickChangeDeviceType;
    private _onChangedX;
    private _onChangedY;
    private _onChangedURLField;
    private _onClickURL;
    private _handleKeyDown;
    /**
     * Used to sort devices by either height or width depending on the orientation of the device. This is necessary
     * because the clickstops will only show up/function properly if they are rendered in order from greatest to
     * smallest length.
     */
    private _sortDevices;
    private _comparePhones;
    private _compareTablets;
}
//# sourceMappingURL=MobilePreview.d.ts.map