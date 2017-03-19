import * as React from 'react';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';
import { IButtonDemoPageState } from './examples/IButtonDemoPageState';
import './examples/Button.Basic.Example.scss';
export declare class ButtonPage extends React.Component<IComponentDemoPageProps, IButtonDemoPageState> {
    private _url;
    constructor();
    render(): JSX.Element;
    private _onDisabledChanged(ev, disabled);
}
