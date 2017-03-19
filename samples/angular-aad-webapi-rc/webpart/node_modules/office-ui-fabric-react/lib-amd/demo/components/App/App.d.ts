import * as React from 'react';
import { ResponsiveMode } from '../../../utilities/decorators/withResponsiveMode';
import './App.scss';
export interface IAppProps extends React.Props<App> {
    responsiveMode?: ResponsiveMode;
}
export interface IAppState {
    isMenuVisible: boolean;
}
export declare class App extends React.Component<IAppProps, any> {
    constructor(props: IAppProps);
    render(): JSX.Element;
    private _onIsMenuVisibleChanged(isMenuVisible);
    private _onLinkClick();
}
