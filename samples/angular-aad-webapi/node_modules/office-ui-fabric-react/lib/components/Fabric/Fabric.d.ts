import * as React from 'react';
export interface IFabricState {
    isFocusVisible?: boolean;
}
export declare class Fabric extends React.Component<React.HTMLProps<HTMLDivElement>, IFabricState> {
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
    };
    private _events;
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _onMouseDown();
    private _onKeyDown(ev);
}
