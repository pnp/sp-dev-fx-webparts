import * as React from 'react';
import { IContextualMenuItem } from '../../../ContextualMenu';
import { ResponsiveMode } from '../../../utilities/decorators/withResponsiveMode';
import './Header.scss';
export interface IHeaderProps {
    title: string;
    sideLinks: {
        name: string;
        url: string;
    }[];
    isMenuVisible: boolean;
    onIsMenuVisibleChanged?: (isMenuVisible: boolean) => void;
    responsiveMode?: ResponsiveMode;
}
export interface IHeaderState {
    contextMenu?: {
        target: HTMLElement;
        items: IContextualMenuItem[];
    };
    isRTLEnabled?: boolean;
}
export declare class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps);
    render(): JSX.Element;
    private _onMenuClick(ev);
    private _onGearClick(ev);
    private _getOptionMenuItems();
    private _onRTLToggled(ev);
    private _onDismiss();
}
