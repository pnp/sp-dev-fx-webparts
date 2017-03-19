import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import { IMarqueeSelectionProps } from './MarqueeSelection.Props';
import { IPoint } from '../../common/IPoint';
import { IRectangle } from '../../common/IRectangle';
import './MarqueeSelection.scss';
export interface IMarqueeSelectionState {
    dragOrigin?: IPoint;
    dragRect?: IRectangle;
}
/**
 * MarqueeSelection component abstracts managing a draggable rectangle which sets items selected/not selected.
 * Elements which have data-selectable-index attributes are queried and measured once to determine if they
 * fall within the bounds of the rectangle. The measure is memoized during the drag as a performance optimization
 * so if the items change sizes while dragging, that could cause incorrect results.
 */
export declare class MarqueeSelection extends BaseComponent<IMarqueeSelectionProps, IMarqueeSelectionState> {
    static defaultProps: {
        rootTagName: string;
        rootProps: {};
        isEnabled: boolean;
    };
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
    };
    private _dragOrigin;
    private _rootRect;
    private _lastMouseEvent;
    private _autoScroll;
    private _selectedIndicies;
    private _itemRectCache;
    private _scrollableParent;
    private _scrollableSurface;
    private _scrollTop;
    constructor(props: IMarqueeSelectionProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    /** Determine if the mouse event occured on a scrollbar of the target element. */
    private _isMouseEventOnScrollbar(ev);
    private _onMouseDown(ev);
    private _getRootRect();
    private _onMouseMove(ev);
    private _onMouseUp(ev);
    private _evaluateSelection(dragRect);
}
