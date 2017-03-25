import * as React from 'react';
export interface IColorSliderProps {
    minValue?: number;
    maxValue?: number;
    initialValue?: number;
    thumbColor?: string;
    overlayStyle?: any;
    onChanged?: (newValue: number) => void;
    className?: string;
    style?: any;
}
export interface IColorSliderState {
    isAdjusting?: boolean;
    origin?: {
        x: number;
        originalValue: number;
    };
    currentValue?: number;
}
export declare class ColorSlider extends React.Component<IColorSliderProps, IColorSliderState> {
    static defaultProps: {
        minValue: number;
        maxValue: number;
        thumbColor: string;
        initialValue: number;
    };
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
    };
    private _events;
    constructor(props: IColorSliderProps);
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _onMouseDown(ev);
    private _onMouseMove(ev);
    private _onMouseUp(ev);
}
