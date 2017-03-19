import * as React from 'react';
import { CheckboxVisibility, ConstrainMode, DetailsList, DetailsListLayoutMode as LayoutMode, IColumn, IContextualMenuProps, IGroup } from '../../../../index';
import { SelectionMode } from '../../../../utilities/selection/interfaces';
import './DetailsList.Advanced.Example.scss';
export interface IDetailsListAdvancedExampleState {
    canResizeColumns?: boolean;
    checkboxVisibility?: CheckboxVisibility;
    columns?: IColumn[];
    constrainMode?: ConstrainMode;
    contextualMenuProps?: IContextualMenuProps;
    groupItemLimit?: number;
    groups?: IGroup[];
    isHeaderVisible?: boolean;
    isLazyLoaded?: boolean;
    isSortedDescending?: boolean;
    items?: any[];
    layoutMode?: LayoutMode;
    selectionMode?: SelectionMode;
    sortedColumnKey?: string;
}
export declare class DetailsListAdvancedExample extends React.Component<any, IDetailsListAdvancedExampleState> {
    refs: {
        [key: string]: React.ReactInstance;
        list: DetailsList;
    };
    private _isFetchingItems;
    private _selection;
    constructor();
    render(): JSX.Element;
    private _onDataMiss(index);
    private _onToggleLazyLoad();
    private _onToggleResizing();
    private _onLayoutChanged(ev, menuItem);
    private _onConstrainModeChanged(ev, menuItem);
    private _onSelectionChanged(ev, menuItem);
    private _onItemLimitChanged(value);
    private _getCommandItems();
    private _getContextualMenuProps(ev, column);
    private _onItemInvoked(item, index);
    private _onColumnClick(ev, column);
    private _onContextualMenuDismissed();
    private _onSortColumn(key, isSortedDescending);
    private _onGroupByColumn(column);
    private _groupByKey(groups, items, key);
    private _groupItems(items, columnKey);
    private _getGroups(groupedItems, key, parentGroup?);
    private _getLeafGroupKey(key, separator);
    private _onAddRow();
    private _onDeleteRow();
    private _buildColumns(items, canResizeColumns?, onColumnClick?, sortedColumnKey?, isSortedDescending?, groupedColumnKey?);
}
