import * as React from 'react';
export interface IRouterProps {
    replaceState?: boolean;
    children?: React.ReactElement<any>[];
    onNewRouteLoaded?: () => void;
}
export interface IRouterState {
    path: string;
}
export declare class Router extends React.Component<IRouterProps, IRouterState> {
    private _events;
    constructor();
    componentDidUpdate(prevProps: IRouterProps, prevState: IRouterState): void;
    render(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
