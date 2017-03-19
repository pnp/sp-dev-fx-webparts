import * as React from 'react';
import { StoreSet } from './StoreSet';
export interface IStoreHostProps extends React.Props<StoreHost> {
    stores?: StoreSet;
}
export interface IStoreHostContext {
    stores?: StoreSet;
}
export declare class StoreHost extends React.Component<IStoreHostProps, {}> {
    static contextTypes: {
        stores: React.Requireable<any>;
    };
    static childContextTypes: {
        stores: React.Requireable<any>;
    };
    context: IStoreHostContext;
    getChildContext(): IStoreHostContext;
    render(): React.ReactElement<any>;
}
