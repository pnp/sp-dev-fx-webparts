import * as React from 'react';
import { DirectionalHint, TextField } from '../../../../index';
import './ContextualMenuExample.scss';
export interface IContextualMenuDirectionalExampleState {
    isContextualMenuVisible?: boolean;
    directionalHint?: DirectionalHint;
    isBeakVisible?: boolean;
    gapSpace?: number;
    beakWidth?: number;
}
export declare class ContextualMenuDirectionalExample extends React.Component<{}, IContextualMenuDirectionalExampleState> {
    refs: {
        [key: string]: React.ReactInstance;
        menuButton: HTMLElement;
        gapSize: TextField;
    };
    constructor();
    render(): JSX.Element;
    private _onShowBeakChange(ev, isVisible);
    private _onShowMenuClicked();
    private _onDirectionalChanged(option);
    private _onGapSlider(value);
    private _onBeakWidthSlider(value);
}
