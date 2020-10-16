import * as React from 'react';
import { IWebPartData } from '@microsoft/sp-webpart-base';
export interface ISerializedWebPartProps {
    serializedWebPart: IWebPartData;
}
export default class SerializedWebPart extends React.Component<ISerializedWebPartProps, {}> {
    render(): React.ReactElement<ISerializedWebPartProps>;
}
//# sourceMappingURL=SerializedWebPart.d.ts.map