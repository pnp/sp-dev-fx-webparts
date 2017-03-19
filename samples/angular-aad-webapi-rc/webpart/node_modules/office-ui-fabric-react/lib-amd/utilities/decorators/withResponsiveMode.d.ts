import * as React from 'react';
export interface IWithResponsiveModeState {
    responsiveMode?: ResponsiveMode;
}
export declare enum ResponsiveMode {
    small = 0,
    medium = 1,
    large = 2,
    xLarge = 3,
    xxLarge = 4,
    xxxLarge = 5,
}
/**
 * Allows a server rendered scenario to provide a default responsive mode.
 */
export declare function setResponsiveMode(responsiveMode: ResponsiveMode): void;
export declare function withResponsiveMode<P extends {
    responsiveMode?: ResponsiveMode;
}, S>(ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)): any;
