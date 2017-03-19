import * as React from 'react';
import './Slider.scss';
import { ISliderProps, ISlider } from './Slider.Props';
import { BaseComponent } from '../../common/BaseComponent';
export interface ISliderState {
    value?: number;
    renderedValue?: number;
}
export declare enum ValuePosition {
    Previous = 0,
    Next = 1,
}
export declare class Slider extends BaseComponent<ISliderProps, ISliderState> implements ISlider {
    static defaultProps: {};
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        sliderLine: HTMLElement;
        thumb: HTMLElement;
    };
    private _id;
    constructor(props?: ISliderProps);
    /**
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     */
    componentWillReceiveProps(newProps: ISliderProps): void;
    render(): React.ReactElement<{}>;
    focus(): void;
    readonly value: number;
    private _onMouseDownOrTouchStart(event);
    private _onMouseMoveOrTouchMove(event, suppressEventCancelation?);
    private _updateValue(value, renderedValue);
    private _onMouseUpOrTouchEnd();
    private _onKeyDown(event);
}
