import * as React from 'react';
import { IGroup, IGroupDividerProps } from './GroupedList.Props';
import { IDragDropContext, IDragDropEvents, IDragDropHelper } from '../../utilities/dragdrop/index';
import { BaseComponent } from '../../Utilities';
import { ISelection, SelectionMode } from '../../utilities/selection/index';
import { List } from '../../List';
import { IViewport } from '../../utilities/decorators/withViewport';
export interface IGroupedListSectionProps extends React.Props<GroupedListSection> {
    /** Map of callback functions related to drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** helper to manage drag/drop across item rows and groups */
    dragDropHelper?: IDragDropHelper;
    /** Event names and corresponding callbacks that will be registered to the group and the rendered elements */
    eventsToRegister?: [{
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }];
    /** Information to pass in to the group footer. */
    footerProps?: IGroupDividerProps;
    /** Grouping item limit. */
    getGroupItemLimit?: (group: IGroup) => number;
    /** Optional grouping instructions. */
    groupIndex?: number;
    /** Optional group nesting level. */
    groupNestingDepth?: number;
    /** Optional grouping instructions. */
    group?: IGroup;
    /** Information to pass in to the group header. */
    headerProps?: IGroupDividerProps;
    /** List of items to render. */
    items: any[];
    /** Optional list props to pass to list renderer.  */
    listProps?: any;
    /** Rendering callback to render the group items. */
    onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;
    /** Optional selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the details list manages selection. */
    selectionMode?: SelectionMode;
    /** Optional Viewport, provided by the parent component. */
    viewport?: IViewport;
    /** Override for rendering the group header. */
    onRenderGroupHeader?: (props?: IGroupDividerProps, defaultRender?: (props?: IGroupDividerProps) => JSX.Element) => JSX.Element;
    /** Override for rendering the group footer. */
    onRenderGroupFooter?: (props?: IGroupDividerProps, defaultRender?: (props?: IGroupDividerProps) => JSX.Element) => JSX.Element;
}
export interface IGroupedListSectionState {
    isDropping?: boolean;
    isSelected?: boolean;
}
export declare class GroupedListSection extends BaseComponent<IGroupedListSectionProps, IGroupedListSectionState> {
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
        list: List;
    };
    private _subGroups;
    private _dragDropKey;
    constructor(props: IGroupedListSectionProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
    forceUpdate(): void;
    forceListUpdate(): void;
    private _onRenderGroupHeader(props);
    private _onRenderGroupFooter(props);
    private _onSelectionChange();
    private _onRenderGroup(renderCount);
    private _renderSubGroup(subGroup, subGroupIndex);
    private _getGroupKey(group, groupIndex);
    /**
     * collect all the data we need to enable drag/drop for a group
     */
    private _getGroupDragDropOptions();
    /**
     * update groupIsDropping state based on the input value, which is used to change style during drag and drop
     *
     * @private
     * @param {boolean} newValue (new isDropping state value)
     * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
     */
    private _updateDroppingState(newIsDropping, event);
    /**
     * get the correct css class to reflect the dropping state for a given group
     *
     * If the group is the current drop target, return the default dropping class name
     * Otherwise, return '';
     *
     */
    private _getDroppingClassName();
}
