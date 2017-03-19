import * as React from 'react';
import { IColorPickerProps } from './ColorPicker.Props';
import { IColor } from './colors';
import './ColorPicker.scss';
export interface IColorPickerState {
    isOpen: boolean;
    color: IColor;
}
export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
    h: number;
    s: number;
    v: number;
    hex: string;
    str: string;
}
export declare class ColorPicker extends React.Component<IColorPickerProps, any> {
    constructor(props: IColorPickerProps);
    render(): JSX.Element;
    private _onSVChanged(s, v);
    private _onHChanged(h);
    private _onAChanged(a);
    private _updateColor(newColor);
}
