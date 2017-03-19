import * as React from 'react';
import './CalloutExample.scss';
export interface ICalloutBaiscExampleState {
    isCalloutVisible?: boolean;
}
export declare class CalloutBasicExample extends React.Component<any, ICalloutBaiscExampleState> {
    private _menuButtonElement;
    constructor();
    render(): JSX.Element;
    private _onShowMenuClicked();
    private _onCalloutDismiss();
}
