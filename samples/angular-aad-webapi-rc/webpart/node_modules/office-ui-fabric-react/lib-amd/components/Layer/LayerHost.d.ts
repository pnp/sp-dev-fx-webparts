import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ProjectedLayer } from './ProjectedLayer';
import { ILayerProps } from './Layer.Props';
import { ILayerHostProps } from './LayerHost.Props';
import './LayerHost.scss';
export interface ILayer {
    id: string;
    parentElement: HTMLElement;
    props: ILayerProps;
    onMounted: (projectedLayer: ProjectedLayer) => void;
}
/**
 * LayerHost provides a wrapper that acts as a passthrough, rendering the given children within it, but also
 * appending a div at the end, which projects all content wrapped in the Layer components within. Projecting
 * DOM to the end of the document allows for overlaying and stacking scenarios.
 *
 * Normally you do not need to interact directly with LayerHost. If you render Layers within content that isn't
 * wrapped within a LayerHost, a LayerHost will be created and appended to the end of the document body, where
 * layer content will then be projected. However in some circumstances you want Layered content to be rendered
 * in a specific place rather than document body (for example in a popup window or contained within a scrollable
 * region.) In those cases, wrap the content wihtin a LayerHost.
 *
 * @example
 * <LayerHost>
 *   <Layer>I will at the end of LayerHost.</Layer>
 *   <div>I will render normally.</div>
 * </LayerHost>
 **/
export declare class LayerHost extends BaseComponent<ILayerHostProps, {}> {
    static childContextTypes: {
        layerHost: React.Requireable<any>;
    };
    private _layers;
    private _layerRefs;
    static getDefault(layerElement: HTMLElement): LayerHost;
    constructor(props: ILayerHostProps);
    getChildContext(): {
        layerHost: LayerHost;
    };
    render(): JSX.Element;
    addLayer(id: string, parentElement: HTMLElement, props: ILayerProps, onMounted: (proxyLayer: ProjectedLayer) => void): void;
    removeLayer(id: string): void;
    private _resolveLayer(projectedLayer);
}
