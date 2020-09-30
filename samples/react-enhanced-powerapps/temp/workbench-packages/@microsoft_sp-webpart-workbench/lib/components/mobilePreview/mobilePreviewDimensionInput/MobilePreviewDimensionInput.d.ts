import * as React from 'react';
import { IDevice } from '../mobilePreview/MobilePreview';
export interface IMobilePreviewDimensionInputProps {
    currentDevice: IDevice;
    onChangedX: (event: any) => void;
    onChangedY: (event: any) => void;
}
export default class MobilePreviewDimensionInput extends React.Component<IMobilePreviewDimensionInputProps, {}> {
    constructor(props: IMobilePreviewDimensionInputProps);
    render(): React.ReactElement<{}>;
}
//# sourceMappingURL=MobilePreviewDimensionInput.d.ts.map