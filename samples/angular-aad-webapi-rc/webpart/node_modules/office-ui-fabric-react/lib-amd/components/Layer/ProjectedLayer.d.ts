import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ILayerProps } from './Layer.Props';
import './Layer.scss';
export interface IProjectedLayerProps extends React.Props<ProjectedLayer> {
    /** Indicates a unique id for the layer, if applicable. */
    layerId: string;
    /** Virtual parent element. */
    parentElement: HTMLElement;
    /** Indicates the layer to redirect to. */
    defaultRemoteProps: ILayerProps;
}
export interface IProjectedLayerState {
    isMounted: boolean;
}
/**
 * ProjectedLayer is an internal helper component that projects the contents rendered within a Layer. It is created
 * by the corresponding LayerHost that the originating Layer communicates with.
 */
export declare class ProjectedLayer extends BaseComponent<IProjectedLayerProps, IProjectedLayerState> {
    private _rootElement;
    private _remoteProps;
    constructor(props?: IProjectedLayerProps);
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    getId(): string;
    projectProps(remoteProps: any): void;
}
