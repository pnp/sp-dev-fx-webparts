import * as React from 'react';
export declare function withContainsFocus<P extends {
    containsFocus?: boolean;
}, S>(ComposedComponent: (new (props: P, ...args: any[]) => (React.Component<P, S>))): any;
