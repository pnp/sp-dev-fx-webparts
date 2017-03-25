import * as React from 'react';
import { IDetailsListProps, ConstrainMode, DetailsListLayoutMode, IColumn, IDetailsList, CheckboxVisibility } from '../DetailsList/DetailsList.Props';
import { DetailsHeader } from '../DetailsList/DetailsHeader';
import { IDetailsRowProps } from '../DetailsList/DetailsRow';
import { FocusZone } from '../../FocusZone';
import { GroupedList } from '../../GroupedList';
import { List } from '../../List';
import { SelectionMode, SelectionZone } from '../../utilities/selection/index';
import './DetailsList.scss';
export interface IDetailsListState {
    lastWidth?: number;
    lastSelectionMode?: SelectionMode;
    adjustedColumns?: IColumn[];
    layoutMode?: DetailsListLayoutMode;
    isCollapsed?: boolean;
    isSizing?: boolean;
    isDropping?: boolean;
    isSomeGroupExpanded?: boolean;
}
export declare class DetailsList extends React.Component<IDetailsListProps, IDetailsListState> implements IDetailsList {
    static defaultProps: {
        layoutMode: DetailsListLayoutMode;
        selectionMode: SelectionMode;
        constrainMode: ConstrainMode;
        checkboxVisibility: CheckboxVisibility;
        isHeaderVisible: boolean;
    };
    refs: {
        [key: string]: React.ReactInstance;
        header: DetailsHeader;
        root: HTMLElement;
        groupedList: GroupedList;
        list: List;
        focusZone: FocusZone;
        selectionZone: SelectionZone;
    };
    private _events;
    private _selection;
    private _activeRows;
    private _dragDropHelper;
    private _initialFocusedIndex;
    private _columnOverrides;
    constructor(props: IDetailsListProps);
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillReceiveProps(newProps: IDetailsListProps): void;
    render(): JSX.Element;
    forceUpdate(): void;
    protected _onRenderRow(props: IDetailsRowProps): JSX.Element;
    private _onRenderCell(nestingDepth, item, index);
    private _onGroupExpandStateChanged(isSomeGroupExpanded);
    private _onColumnIsSizingChanged(column, isSizing);
    private _onHeaderKeyDown(ev);
    private _onContentKeyDown(ev);
    private _getGroupNestingDepth();
    private _onRowDidMount(row);
    private _onRowWillUnmount(row);
    private _onToggleCollapse(collapsed);
    private _forceListUpdates();
    private _adjustColumns(newProps, forceUpdate?, layoutMode?);
    /** Returns adjusted columns, given the viewport size and layout mode. */
    private _getAdjustedColumns(newProps, forceUpdate?, layoutMode?);
    /** Builds a set of columns based on the given columns mixed with the current overrides. */
    private _getFixedColumns(newColumns);
    /** Builds a set of columns to fix within the viewport width. */
    private _getJustifiedColumns(newColumns, viewportWidth);
    private _onColumnResized(resizingColumn, newWidth);
    /**
     * Callback function when double clicked on the details header column resizer
     * which will measure the column cells of all the active rows and resize the
     * column to the max cell width.
     *
     * @private
     * @param {IColumn} column (double clicked column definition)
     * @param {number} columnIndex (double clicked column index)
     * @todo min width 100 should be changed to const value and should be consistent with the value used on _onSizerMove method in DetailsHeader
     */
    private _onColumnAutoResized(column, columnIndex);
    /**
     * Call back function when an element in FocusZone becomes active. It will transalate it into item
     * and call onActiveItemChanged callback if specified.
     *
     * @private
     * @param {el} row element that became active in Focus Zone
     * @param {ev} focus event from Focus Zone
     */
    private _onActiveRowChanged(el?, ev?);
}
export declare function buildColumns(items: any[], canResizeColumns?: boolean, onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any, sortedColumnKey?: string, isSortedDescending?: boolean, groupedColumnKey?: string, isMultiline?: boolean): IColumn[];
