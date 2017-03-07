import * as React from 'react';
import { ColorPicker, Label } from 'office-ui-fabric-react';
import { IColorPickerCtrlProps } from './IColorPickerCtrlProps';

export default class ColorPickerCtrl extends React.Component<IColorPickerCtrlProps, void> {
    constructor(props: IColorPickerCtrlProps) {
        super(props);
    }

    public render(): JSX.Element {
        if (this.props.color == null || this.props.color == '') {
            this.props.color = "#333333";
        }

        return (
            <div>
                <Label>{this.props.label}</Label>
                <ColorPicker color={this.props.color} alphaSliderHidden={true} onColorChanged={this.props.onColorChanged} />
            </div>
        );
    }
}