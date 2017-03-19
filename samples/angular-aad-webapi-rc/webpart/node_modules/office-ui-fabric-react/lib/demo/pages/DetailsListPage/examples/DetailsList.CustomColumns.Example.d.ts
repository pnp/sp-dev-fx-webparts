import * as React from 'react';
import { IColumn } from '../../../../index';
export interface IDetailsListCustomColumnsExampleState {
    sortedItems?: any[];
    columns?: IColumn[];
}
export declare class DetailsListCustomColumnsExample extends React.Component<{}, IDetailsListCustomColumnsExampleState> {
    constructor(props: {});
    render(): JSX.Element;
    private _onColumnClick(column);
}
