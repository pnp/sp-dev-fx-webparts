import * as React from 'react';
import './List.Basic.Example.scss';
export interface IListBasicExampleProps {
    items: any[];
}
export interface IListBasicExampleState {
    filterText?: string;
    items?: any[];
}
export declare class ListBasicExample extends React.Component<IListBasicExampleProps, any> {
    constructor(props: IListBasicExampleProps);
    render(): JSX.Element;
    private _onFilterChanged(text);
}
