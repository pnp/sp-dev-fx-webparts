import { IContextualMenuProps, IContextualMenuItem } from './ContextualMenu.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { BaseComponent } from '../../common/BaseComponent';
import './ContextualMenu.scss';
export interface IContextualMenuState {
    expandedMenuItemKey?: string;
    dismissedMenuItemKey?: string;
    contextualMenuItems?: IContextualMenuItem[];
    contextualMenuTarget?: HTMLElement;
    submenuProps?: IContextualMenuProps;
    positions?: any;
    slideDirectionalClassName?: string;
    subMenuId?: string;
    submenuDirection?: DirectionalHint;
}
export declare class ContextualMenu extends BaseComponent<IContextualMenuProps, IContextualMenuState> {
    static defaultProps: {
        items: any[];
        shouldFocusOnMount: boolean;
        isBeakVisible: boolean;
        gapSpace: number;
        directionalHint: DirectionalHint;
        beakWidth: number;
    };
    private _host;
    private _previousActiveElement;
    private _isFocusingPreviousElement;
    private _enterTimerId;
    private _focusZone;
    private _targetWindow;
    private _target;
    constructor(props: IContextualMenuProps);
    dismiss(ev?: any, dismissAll?: boolean): void;
    componentWillUpdate(newProps: IContextualMenuProps): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
    private _renderMenuItem(item, index, hasCheckmarks, hasIcons);
    private _renderAnchorMenuItem(item, index, hasCheckmarks, hasIcons);
    private _renderButtonItem(item, index, hasCheckmarks?, hasIcons?);
    private _renderMenuItemChildren(item, index, hasCheckmarks, hasIcons);
    private _renderIcon(item);
    private _onKeyDown(ev);
    private _onItemMouseEnter(item, ev);
    private _onMouseLeave(ev);
    private _onItemMouseDown(item, ev);
    private _onItemClick(item, ev);
    private _onAnchorClick(item, ev);
    private _executeItemClick(item, ev);
    private _onItemKeyDown(item, ev);
    private _onItemSubMenuExpand(item, target);
    private _onSubMenuDismiss(ev?, dismissAll?);
    private _setTargetWindowAndElement(target);
}
