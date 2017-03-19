import * as React from 'react';
import './PropertiesTable.scss';
export interface IProperty {
    name: string;
    propertyName: string;
    propertyType: PropertyType;
    property: IInterfaceProperty[] | IEnumProperty[];
}
export interface IInterfaceProperty {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interfacePropertyType: InterfacePropertyType;
    deprecatedMessage: string;
}
export declare enum InterfacePropertyType {
    required = 0,
    optional = 1,
    deprecated = 2,
}
export interface IEnumProperty {
    name: string;
    description: string;
}
export interface IPropertiesTableProps {
    title?: string;
    properties: IInterfaceProperty[] | IEnumProperty[];
    renderAsEnum?: boolean;
    key?: string;
}
export declare enum PropertyType {
    enum = 0,
    interface = 1,
}
export declare class PropertiesTable extends React.Component<IPropertiesTableProps, any> {
    static defaultProps: {
        title: string;
    };
    constructor(props: IPropertiesTableProps);
    render(): JSX.Element;
    private _getGroups(props);
    private _tryAddGroup(props, typeToCompare, name, index, allGroups);
}
