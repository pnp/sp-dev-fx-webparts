import * as React from 'react';
export interface IViewport {
    width: number;
    height: number;
}
export interface IWithViewportState {
    viewport?: IViewport;
}
export declare function withViewport<P extends {
    viewport?: IViewport;
}, S>(ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)): any;
