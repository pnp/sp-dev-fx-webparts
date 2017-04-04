import * as React from 'react';
import './Nav.scss';
import { INav, INavProps } from './Nav.Props';
export interface INavState {
    isGroupExpanded?: boolean[];
    isLinkExpandStateChanged?: boolean;
    selectedKey?: string;
}
export declare class Nav extends React.Component<INavProps, INavState> implements INav {
    static defaultProps: INavProps;
    private _hasExpandButton;
    constructor(props: INavProps);
    render(): React.ReactElement<{}>;
    readonly selectedKey: string;
    private _renderAnchorLink(link, linkIndex, nestingLevel);
    private _renderButtonLink(link, linkIndex);
    private _renderCompositeLink(link, linkIndex, nestingLevel);
    private _renderLink(link, linkIndex, nestingLevel);
    private _renderLinks(links, nestingLevel);
    private _renderGroup(group, groupIndex);
    private _onGroupHeaderClicked(groupIndex, ev);
    private _onLinkExpandClicked(link, ev);
    private _onNavAnchorLinkClicked(link, ev);
    private _onNavButtonLinkClicked(link, ev);
    private _isLinkSelected(link);
}
