import * as React from 'react';
import './Facepile.Examples.scss';
export declare enum ExtraDataType {
    none = 0,
    name = 1,
    stats = 2,
}
export interface IFacepileBasicExampleState {
    numberOfFaces: any;
    imagesFadeIn: boolean;
    extraDataType: ExtraDataType;
}
export declare class FacepileBasicExample extends React.Component<any, IFacepileBasicExampleState> {
    constructor();
    render(): JSX.Element;
}
