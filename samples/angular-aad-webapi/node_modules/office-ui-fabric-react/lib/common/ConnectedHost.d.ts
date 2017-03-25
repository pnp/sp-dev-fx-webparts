import * as React from 'react';
import { BaseComponent } from '../Utilities';
import { IStoreKey } from './storeKey';
import { StoreSet } from './StoreSet';
export interface IConnectedHostProps {
    componentProps: any;
    storesToSubscribe: IStoreKey<any>[];
    component: any;
    getProps: (stores: any, props: any) => any;
}
export interface IConnectedHostState {
    props: any;
}
export declare class ConnectedHost extends BaseComponent<IConnectedHostProps, IConnectedHostState> {
    static contextTypes: {
        stores: React.Requireable<any>;
    };
    context: {
        stores: StoreSet;
    };
    private _stores;
    private _changeEnqueued;
    private _isMounted;
    constructor(props: IConnectedHostProps);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(newProps: any): void;
    shouldComponentUpdate(newProps: IConnectedHostProps, newState: any): boolean;
    render(): JSX.Element;
    private _onStoreChanged();
    private _updateProps(props?);
    private _getComponentProps(props);
}
