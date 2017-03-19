import * as React from 'react';
import './CalloutExample.scss';
import { DirectionalHint } from '../../../../index';
export interface ICalloutDirectionalExampleState {
    isCalloutVisible?: boolean;
    directionalHint?: DirectionalHint;
    isBeakVisible?: boolean;
    gapSpace?: number;
    beakWidth?: number;
}
export declare class CalloutDirectionalExample extends React.Component<any, ICalloutDirectionalExampleState> {
    private _menuButtonElement;
    constructor();
    render(): JSX.Element;
    private _onShowMenuClicked();
    private _onShowBeakChange(ev, isVisible);
    private _onDirectionalChanged(option);
    private _onGapSlider(value);
    private _onBeakWidthSlider(value);
}
