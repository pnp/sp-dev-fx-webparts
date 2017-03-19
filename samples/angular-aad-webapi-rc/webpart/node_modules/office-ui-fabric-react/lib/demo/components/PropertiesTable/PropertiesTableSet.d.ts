import * as React from 'react';
import { IProperty } from './PropertiesTable';
import { IPropertiesTableSetProps } from './PropertiesTableSet.Props';
export interface IPropertiesTableSetState {
    properties: Array<IProperty>;
}
export declare class PropertiesTableSet extends React.Component<IPropertiesTableSetProps, IPropertiesTableSetState> {
    static defaultProps: {
        title: string;
    };
    constructor(props: IPropertiesTableSetProps);
    renderEach(): JSX.Element[];
    render(): JSX.Element;
}
