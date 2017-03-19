import * as React from 'react';
import { ILayerProps } from './Layer.Props';
import { LayerHost } from './LayerHost';
import { BaseComponent } from '../../Utilities';
import './Layer.scss';
export declare class Layer extends BaseComponent<ILayerProps, {}> {
    static contextTypes: {
        layerHost: React.Requireable<any>;
    };
    context: {
        layerHost: LayerHost;
    };
    private _rootElement;
    private _projectedLayer;
    private _layerHost;
    private _id;
    constructor(props?: ILayerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(newProps: ILayerProps): void;
    forceUpdate(): void;
    render(): JSX.Element;
}
