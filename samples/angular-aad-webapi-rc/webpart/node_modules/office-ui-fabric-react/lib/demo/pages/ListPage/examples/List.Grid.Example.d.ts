import * as React from 'react';
import './List.Grid.Example.scss';
export interface IListGridExampleProps {
    items: any[];
}
export declare class ListGridExample extends React.Component<IListGridExampleProps, any> {
    private _positions;
    private _columnCount;
    private _columnWidth;
    private _rowHeight;
    constructor();
    render(): JSX.Element;
    private _getItemCountForPage(itemIndex, surfaceRect);
    private _getPageHeight(itemIndex, surfaceRect);
}
