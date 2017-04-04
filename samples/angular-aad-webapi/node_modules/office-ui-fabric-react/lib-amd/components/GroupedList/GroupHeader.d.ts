import * as React from 'react';
import { IGroupDividerProps } from './GroupedList.Props';
import './GroupHeader.scss';
export interface IGroupHeaderState {
    isCollapsed: boolean;
    isLoadingVisible: boolean;
}
export declare class GroupHeader extends React.Component<IGroupDividerProps, IGroupHeaderState> {
    constructor(props: IGroupDividerProps);
    componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    private _onToggleCollapse(ev);
    private _onToggleSelectGroupClick(ev);
    private _onHeaderClick();
}
