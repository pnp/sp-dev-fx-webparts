import * as React from 'react';
import { DeviceType } from '../mobilePreview/MobilePreview';
export interface IMobilePreviewHeaderBarProps {
    onChangeURL: (value: string) => void;
    onExit: () => void;
    onClickURLSubmit: () => void;
    onChangeDeviceType: (type: DeviceType) => void;
}
export default class MobilePreviewHeaderBar extends React.Component<IMobilePreviewHeaderBarProps, {}> {
    render(): React.ReactElement<IMobilePreviewHeaderBarProps>;
}
//# sourceMappingURL=MobilePreviewHeaderBar.d.ts.map