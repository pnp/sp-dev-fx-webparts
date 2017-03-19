import * as React from 'react';
import { IGroupedList, IGroupedListProps, IGroup } from './GroupedList.Props';
import { List } from '../../List';
import { SelectionMode } from '../../utilities/selection/index';
import { BaseComponent } from '../../Utilities';
import './GroupedList.scss';
export interface IGroupedListState {
    lastWidth?: number;
    lastSelectionMode?: SelectionMode;
    groups?: IGroup[];
}
export declare class GroupedList extends BaseComponent<IGroupedListProps, IGroupedListState> implements IGroupedList {
    static defaultProps: {
        selectionMode: SelectionMode;
        isHeaderVisible: boolean;
        groupProps: {};
    };
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        list: List;
    };
    private _isSomeGroupExpanded;
    constructor(props: IGroupedListProps);
    componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    forceUpdate(): void;
    toggleCollapseAll(allCollapsed: boolean): void;
    private _renderGroup(group, groupIndex);
    private _getGroupKey(group);
    private _getGroupNestingDepth();
    private _onToggleCollapse(group);
    private _onToggleSelectGroup(group);
    private _forceListUpdates(groups?);
    private _onToggleSummarize(group);
    private _computeIsSomeGroupExpanded(groups);
    private _updateIsSomeGroupExpanded();
}
