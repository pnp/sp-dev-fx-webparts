import * as React from 'react';
import { IColumn, CheckboxVisibility } from './DetailsList.Props';
import { IDetailsRowCheckProps } from './DetailsRowCheck';
import { ISelection, SelectionMode } from '../../utilities/selection/interfaces';
import { IDragDropHelper, IDragDropEvents } from './../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';
import './DetailsRow.scss';
export interface IDetailsRowProps extends React.Props<DetailsRow> {
    item: any;
    itemIndex: number;
    columns: IColumn[];
    selectionMode: SelectionMode;
    selection: ISelection;
    eventsToRegister?: [{
        eventName: string;
        callback: (item?: any, index?: number, event?: any) => void;
    }];
    onDidMount?: (row?: DetailsRow) => void;
    onWillUnmount?: (row?: DetailsRow) => void;
    onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
    onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
    dragDropEvents?: IDragDropEvents;
    dragDropHelper?: IDragDropHelper;
    groupNestingDepth?: number;
    viewport?: IViewport;
    checkboxVisibility?: CheckboxVisibility;
    getRowAriaLabel?: (item: any) => string;
    checkButtonAriaLabel?: string;
}
export interface IDetailsRowSelectionState {
    isSelected: boolean;
    anySelected: boolean;
}
export interface IDetailsRowState {
    selectionState?: IDetailsRowSelectionState;
    columnMeasureInfo?: {
        index: number;
        column: IColumn;
        onMeasureDone: (measuredWidth: number) => void;
    };
    isDropping?: boolean;
    groupNestingDepth?: number;
}
export declare class DetailsRow extends React.Component<IDetailsRowProps, IDetailsRowState> {
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        cellMeasurer: HTMLElement;
    };
    private _events;
    private _hasSetFocus;
    private _droppingClassNames;
    private _hasMounted;
    private _dragDropKey;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(newProps: IDetailsRowProps): void;
    render(): JSX.Element;
    /**
     * measure cell at index. and call the call back with the measured cell width when finish measure
     *
     * @param {number} index (the cell index)
     * @param {(width: number) => void} onMeasureDone (the call back function when finish measure)
     */
    measureCell(index: number, onMeasureDone: (width: number) => void): void;
    focus(): void;
    protected _onRenderCheck(props: IDetailsRowCheckProps): JSX.Element;
    private _getSelectionState(props);
    private _onSelectionChanged();
    private _getRowDragDropOptions();
    /**
     * update isDropping state based on the input value, which is used to change style during drag and drop
     *
     * when change to true, that means drag enter. we will add default dropping class name
     * or the custom dropping class name (return result from onDragEnter) to the root elemet.
     *
     * when change to false, that means drag leave. we will remove the dropping class name from root element.
     *
     * @private
     * @param {boolean} newValue (new isDropping state value)
     * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
     */
    private _updateDroppingState(newValue, event);
}
