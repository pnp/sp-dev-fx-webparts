import * as React from 'react';
import { DeviceOrientation } from '../mobilePreview/MobilePreview';
export interface IMobilePreviewRotateProps {
    onRotate: (orientation: DeviceOrientation) => void;
    currentOrientation: DeviceOrientation;
}
export default class MobilePreviewRotate extends React.Component<IMobilePreviewRotateProps, {}> {
    render(): React.ReactElement<{}>;
    private _onClickRotate;
}
//# sourceMappingURL=MobilePreviewRotate.d.ts.map