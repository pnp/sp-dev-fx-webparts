import * as React from 'react';
import { DeviceOrientation, DeviceType, IDevice } from '../mobilePreview/MobilePreview';
export interface IMobilePreviewClickStopBarProps {
    currentDevice: IDevice;
    currentOrientation: DeviceOrientation;
    devices: IDevice[];
    deviceType: DeviceType;
    onSelectClickStop: (device: IDevice) => void;
}
export default class MobilePreviewClickStopBar extends React.Component<IMobilePreviewClickStopBarProps, {}> {
    constructor(props: IMobilePreviewClickStopBarProps);
    render(): React.ReactElement<IMobilePreviewClickStopBarProps>;
}
//# sourceMappingURL=MobilePreviewClickStopBar.d.ts.map