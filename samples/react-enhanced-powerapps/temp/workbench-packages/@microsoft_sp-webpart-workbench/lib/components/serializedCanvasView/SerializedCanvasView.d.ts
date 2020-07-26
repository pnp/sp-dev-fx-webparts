import * as React from 'react';
export interface ISerializedCanvasViewProps {
    getSerializedData: (toJson: boolean) => string;
    isVisible: boolean;
    closeCallback: () => void;
}
export default class SerializedCanvasView extends React.Component<ISerializedCanvasViewProps, {}> {
    render(): React.ReactElement<ISerializedCanvasViewProps>;
}
//# sourceMappingURL=SerializedCanvasView.d.ts.map