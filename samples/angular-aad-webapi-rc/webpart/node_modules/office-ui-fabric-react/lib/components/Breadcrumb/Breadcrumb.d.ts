import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import { IBreadcrumbProps, IBreadcrumbItem } from './Breadcrumb.Props';
import './Breadcrumb.scss';
export interface IBreadcrumbState {
    isOverflowOpen: boolean;
    overflowAnchor?: HTMLElement;
    renderedItems?: IBreadcrumbItem[];
    renderedOverflowItems?: IBreadcrumbItem[];
}
export declare class Breadcrumb extends BaseComponent<IBreadcrumbProps, IBreadcrumbState> {
    static defaultProps: IBreadcrumbProps;
    refs: {
        [key: string]: React.ReactInstance;
        renderingArea: HTMLElement;
    };
    private _breadcrumbItemWidths;
    private _id;
    constructor(props: IBreadcrumbProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IBreadcrumbProps): void;
    componentDidUpdate(prevProps: IBreadcrumbProps, prevStates: IBreadcrumbState): void;
    render(): JSX.Element;
    private _onOverflowClicked(ev);
    private _onOverflowDismissed(ev);
    private _onBreadcrumbClicked(item, ev);
    private _updateItemMeasurements();
    private _updateRenderedItems();
    private _getStateFromProps(nextProps);
}
