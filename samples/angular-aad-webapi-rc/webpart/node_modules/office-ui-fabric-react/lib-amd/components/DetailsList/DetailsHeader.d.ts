import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import { IColumn, DetailsListLayoutMode } from './DetailsList.Props';
import { FocusZone } from '../../FocusZone';
import { ISelection, SelectionMode } from '../../utilities/selection/interfaces';
import './DetailsHeader.scss';
export interface IDetailsHeaderProps extends React.Props<DetailsHeader> {
    columns: IColumn[];
    selection: ISelection;
    selectionMode: SelectionMode;
    layoutMode: DetailsListLayoutMode;
    onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
    onColumnResized?: (column: IColumn, newWidth: number) => void;
    onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
    onColumnContextMenu?: (column: IColumn, ev: Event) => void;
    groupNestingDepth?: number;
    isAllCollapsed?: boolean;
    onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
    /** ariaLabel for the entire header */
    ariaLabel?: string;
    /** ariaLabel for the header checkbox that selects or deselects everything */
    ariaLabelForSelectAllCheckbox?: string;
    selectAllVisibility?: SelectAllVisibility;
}
export declare enum SelectAllVisibility {
    none = 0,
    hidden = 1,
    visible = 2,
}
export interface IDetailsHeaderState {
    columnResizeDetails?: IColumnResizeDetails;
    isAllSelected?: boolean;
    isSizing?: boolean;
    groupNestingDepth?: number;
    isAllCollapsed?: boolean;
}
export interface IColumnResizeDetails {
    columnIndex: number;
    originX: number;
    columnMinWidth: number;
}
export declare class DetailsHeader extends BaseComponent<IDetailsHeaderProps, IDetailsHeaderState> {
    static defaultProps: {
        isSelectAllVisible: SelectAllVisibility;
    };
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        focusZone: FocusZone;
    };
    constructor(props: IDetailsHeaderProps);
    componentDidMount(): void;
    componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    /** Set focus to the active thing in the focus area. */
    focus(): boolean;
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @private
     * @param {number} columnIndex (index of the column user double clicked)
     * @param {React.MouseEvent} ev (mouse double click event)
     */
    private _onSizerDoubleClick(columnIndex, ev);
    /**
     * Called when the select all toggle is clicked.
     */
    private _onSelectAllClicked();
    /**
     * mouse move event handler in the header
     * it will set isSizing state to true when user clicked on the sizer and move the mouse.
     *
     * @private
     * @param {React.MouseEvent} ev (mouse move event)
     */
    private _onMove(ev);
    /**
     * mouse up event handler in the header
     * clear the resize related state.
     * This is to ensure we can catch double click event
     *
     * @private
     * @param {React.MouseEvent} ev (mouse up event)
     */
    private _onUp(ev);
    private _onSizerDown(ev);
    private _onSelectionChanged();
    private _onSizerMove(ev);
    private _onSizerUp();
    private _onColumnClick(column, ev);
    private _onColumnContextMenu(column, ev);
    private _onToggleCollapseAll();
}
