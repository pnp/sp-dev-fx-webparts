import * as React from 'react';
export interface IProgressIndicatorBasicExampleState {
    percentComplete: number;
}
export declare class ProgressIndicatorBasicExample extends React.Component<any, IProgressIndicatorBasicExampleState> {
    private _interval;
    private _async;
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _startProgressDemo();
}
