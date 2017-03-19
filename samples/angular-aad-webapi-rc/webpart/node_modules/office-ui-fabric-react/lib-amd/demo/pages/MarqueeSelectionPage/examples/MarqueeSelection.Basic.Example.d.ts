import * as React from 'react';
import './MarqueeSelection.Basic.Example.scss';
export interface IMarqueeSelectionBasicExampleState {
    isMarqueeEnabled: boolean;
}
export declare class MarqueeSelectionBasicExample extends React.Component<{}, IMarqueeSelectionBasicExampleState> {
    private _selection;
    private _isMounted;
    constructor();
    componentDidMount(): void;
    render(): JSX.Element;
}
