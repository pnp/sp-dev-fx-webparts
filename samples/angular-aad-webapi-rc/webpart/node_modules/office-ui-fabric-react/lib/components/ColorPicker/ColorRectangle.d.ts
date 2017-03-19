import * as React from 'react';
import { IColor } from './colors';
export interface IColorRectangleProps {
    color: IColor;
    minSize?: number;
    onSVChanged?(s: number, v: number): void;
}
export interface IColorPickerState {
    isAdjusting?: boolean;
    origin?: {
        x: number;
        y: number;
        color: IColor;
    };
    color?: IColor;
    fullColorString?: string;
}
export declare class ColorRectangle extends React.Component<IColorRectangleProps, IColorPickerState> {
    static defaultProps: {
        minSize: number;
    };
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
    };
    private _events;
    constructor(props: IColorRectangleProps);
    componentWillUnmount(): void;
    componentWillReceiveProps(newProps: IColorRectangleProps): void;
    render(): JSX.Element;
    private _onMouseDown(ev);
    private _onMouseMove(ev);
    private _onMouseUp(ev);
}
