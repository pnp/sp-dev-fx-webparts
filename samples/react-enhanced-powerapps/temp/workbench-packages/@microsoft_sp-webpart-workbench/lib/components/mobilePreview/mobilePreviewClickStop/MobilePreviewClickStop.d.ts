import * as React from 'react';
import { IDevice, DeviceOrientation, DeviceType } from '../mobilePreview/MobilePreview';
import { IWorkBenchContext } from '../../workbench/Workbench';
export interface IMobilePreviewClickStopProps {
    device: IDevice;
    onClick: (device: IDevice) => void;
    selected: boolean;
    orientation: DeviceOrientation;
    deviceType: DeviceType;
}
export default class MobilePreviewClickStop extends React.Component<IMobilePreviewClickStopProps, {}> {
    static contextTypes: React.ValidationMap<IWorkBenchContext>;
    context: IWorkBenchContext;
    private _mainDiv;
    constructor(props: IMobilePreviewClickStopProps);
    render(): React.ReactElement<IMobilePreviewClickStopProps>;
    private _handleFocus;
    private _handleClick;
    private _handleKeyDown;
}
//# sourceMappingURL=MobilePreviewClickStop.d.ts.map