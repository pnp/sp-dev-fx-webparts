import * as React from 'react';
import './CalloutExample.scss';
import { DirectionalHint } from '../../../../index';
export interface ICalloutCoverExampleState {
    isCalloutVisible?: boolean;
    directionalHint?: DirectionalHint;
}
export declare class CalloutCoverExample extends React.Component<any, ICalloutCoverExampleState> {
    private _menuButtonElement;
    constructor();
    render(): JSX.Element;
    private _onDismiss();
    private _onShowMenuClicked();
    private _onDirectionalChanged(option);
}
