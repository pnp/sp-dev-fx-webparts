import { DirectionalHint } from '../common/DirectionalHint';
import Rectangle from './Rectangle';
import { IRectangle } from '../common/IRectangle';
export declare enum RectangleEdge {
    top = 0,
    bottom = 1,
    left = 2,
    right = 3,
}
export interface IPositionProps {
    target?: HTMLElement | MouseEvent;
    /** The element that the callout should be positioned based on.
     * @deprecated use target instead.
    */
    targetElement?: HTMLElement;
    /** how the element should be positioned */
    directionalHint?: DirectionalHint;
    /** The gap between the callout and the target */
    gapSpace?: number;
    /** The width of the beak. */
    beakWidth?: number;
    /**
     * The bounding rectangle for which  the contextual menu can appear in.
     */
    bounds?: IRectangle;
    /**
     * The event that created the contextualmenu.
     * @default null
     */
    creationEvent?: MouseEvent;
    /**
     * If true use a point rather than rectangle to position the callout.
     * For example it can be used to position based on a click.
     * @deprecated use target with event passed in
     */
    useTargetPoint?: boolean;
    /** Point used to position
     * @deprecated use target with event passed in
    */
    targetPoint?: IPoint;
    /** If true then the beak is visible. If false it will not be shown. */
    isBeakVisible?: boolean;
    /**
     * If true the position returned will have the menu element cover the target.
     * If false then it will position next to the target;
     */
    coverTarget?: boolean;
}
export interface IPositionInfo {
    calloutPosition: {
        top: number;
        left: number;
    };
    beakPosition: {
        top: number;
        left: number;
        display: string;
    };
    directionalClassName: string;
    submenuDirection: DirectionalHint;
}
export interface IPoint {
    x: number;
    y: number;
}
export declare class PositionData {
    calloutDirection: RectangleEdge;
    targetDirection: RectangleEdge;
    calloutPercent: number;
    targetPercent: number;
    beakPercent: number;
    isAuto: boolean;
    constructor(calloutDirection: RectangleEdge, targetDirection: RectangleEdge, calloutPercent: number, targetPercent: number, beakPercent: number, isAuto: boolean);
}
export declare function getRelativePositions(props: IPositionProps, hostElement: HTMLElement, calloutElement: HTMLElement): IPositionInfo;
export declare module positioningFunctions {
    interface ICallout {
        calloutRectangle: Rectangle;
        calloutEdge: RectangleEdge;
        targetEdge: RectangleEdge;
        alignPercent: number;
        beakPercent: number;
    }
    function _getTargetRect(bounds: Rectangle, target: HTMLElement | MouseEvent): Rectangle;
    function _getTargetRectDEPRECATED(bounds: Rectangle, targetElement?: HTMLElement, ev?: MouseEvent, targetPoint?: IPoint, isTargetPoint?: boolean): Rectangle;
    function _getRectangleFromHTMLElement(element: HTMLElement): Rectangle;
    function _positionCalloutWithinBounds(calloutRectangle: Rectangle, targetRectangle: Rectangle, boundingRectangle: Rectangle, directionalInfo: PositionData, gap?: number, coverTarget?: boolean): ICallout;
    function _getBestRectangleFitWithinBounds(estimatedPosition: Rectangle, targetRectangle: Rectangle, boundingRectangle: Rectangle, directionalInfo: PositionData, gap: number, coverTarget?: boolean): ICallout;
    function _positionBeak(beakWidth: number, callout: ICallout, targetRectangle: Rectangle, border: number): Rectangle;
    function _finalizeBeakPosition(beakRectangle: Rectangle, callout: ICallout, estimatedTargetPoint: IPoint, border: number): Rectangle;
    function _getRectangleFromIRect(rect: IRectangle): Rectangle;
    function _finalizeCalloutPosition(calloutRectangle: Rectangle, hostElement: HTMLElement): Rectangle;
    /**
     * Finds the percent on the recalculateRect that matches the percent on the target rect based on position.
     */
    function _recalculateMatchingPercents(recalculateRect: Rectangle, rectangleEdge: RectangleEdge, targetRect: Rectangle, targetEdge: RectangleEdge, targetPercent: number): number;
    function _canRectangleFitWithinBounds(rect: Rectangle, boundingRect: Rectangle): boolean;
    function _isRectangleWithinBounds(rect: Rectangle, boundingRect: Rectangle): boolean;
    /**
     * Gets all of the edges of a rectangle that are outside of the given bounds.
     * If there are no out of bounds edges it returns an empty array.
     */
    function _getOutOfBoundsEdges(rect: Rectangle, boundingRect: Rectangle): RectangleEdge[];
    /**
     * Returns a point on a edge that is x% of the way down it.
     */
    function _getPointOnEdgeFromPercent(rect: Rectangle, direction: RectangleEdge, percentOfRect: number): IPoint;
    /**
     * Gets the percent down an edge that a point appears.
     */
    function _getPercentOfEdgeFromPoint(rect: Rectangle, direction: RectangleEdge, valueOnEdge: IPoint): number;
    /**
     * Percent is based on distance from left to right or up to down. 0% would be left most, 100% would be right most.
     */
    function _calculatePointPercentAlongLine(startPoint: IPoint, endPoint: IPoint, percent: number): IPoint;
    function _moveTopLeftOfRectangleToPoint(rect: Rectangle, destination: IPoint): Rectangle;
    /**
     * Aligns the given edge to the target coordinate.
     */
    function _alignEdgeToCoordinate(rect: Rectangle, coordinate: number, direction: RectangleEdge): Rectangle;
    /**
     * Moves a point on a given rectangle to the target point. Does not change the rectangles orientation.
     */
    function _movePointOnRectangleToPoint(rect: Rectangle, rectanglePoint: IPoint, targetPoint: IPoint): Rectangle;
    /**
     * Moves the given rectangle a certain number of pixels in the given direction;
     */
    function _moveRectangleInDirection(rect: Rectangle, moveDistance: number, direction: RectangleEdge): Rectangle;
    /**
     * Moves the given rectangle to an anchor rectangle.
     */
    function _moveRectangleToAnchorRectangle(rect: Rectangle, rectSide: RectangleEdge, rectPercent: number, anchorRect: Rectangle, anchorSide: RectangleEdge, anchorPercent: number, gap?: number): Rectangle;
    /**
     * Gets the closet point on an edge to the given point.
     */
    function _getClosestPointOnEdgeToPoint(rect: Rectangle, edge: RectangleEdge, point: IPoint): IPoint;
    function _calculateActualBeakWidthInPixels(beakWidth: number): number;
    function _getBorderSize(element: HTMLElement): number;
    function _getPositionData(direction: DirectionalHint, target: Rectangle, boundingRect: Rectangle, coverTarget?: boolean): PositionData;
    function _flipRectangleToFit(callout: ICallout, targetRect: Rectangle, targetPercent: number, boundingRect: Rectangle, gap: number): ICallout;
}
