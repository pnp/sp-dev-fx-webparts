import * as React from 'react';
import { IColumn } from './DetailsList.Props';
export interface IDetailsRowFieldsProps {
    item: any;
    itemIndex: number;
    columns: IColumn[];
    onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
}
export interface IDetailsRowFieldsState {
    cellContent: React.ReactNode[];
}
export declare class DetailsRowFields extends React.Component<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
    constructor(props: IDetailsRowFieldsProps);
    componentWillReceiveProps(newProps: IDetailsRowFieldsProps): void;
    render(): JSX.Element;
    private _getState(props);
    private _getCellText(item, column);
}
