import * as React from 'react';
import './CalloutExample.scss';
export interface ICalloutBaiscExampleState {
    isCalloutVisible?: boolean;
}
export declare class CalloutNestedExample extends React.Component<any, ICalloutBaiscExampleState> {
    private _menuButtonElement;
    constructor();
    render(): JSX.Element;
    private _onDismiss(ev);
}
