import * as React from 'react';
import { IDevice, DeviceOrientation, DeviceType } from '../mobilePreview/MobilePreview';
export interface IMobilePreviewDeviceViewProps {
    currentDevice: IDevice;
    currentOrientation: DeviceOrientation;
    deviceType: DeviceType;
    url: string;
}
export default class MobilePreviewDeviceView extends React.Component<IMobilePreviewDeviceViewProps, {}> {
    constructor(props: IMobilePreviewDeviceViewProps);
    render(): React.ReactElement<IMobilePreviewDeviceViewProps>;
}
//# sourceMappingURL=MobilePreviewDeviceView.d.ts.map