"use strict";
var DirectionalHint_1 = require('../common/DirectionalHint');
var Rectangle_1 = require('./Rectangle');
var scroll_1 = require('./scroll');
var object_1 = require('../utilities/object');
(function (RectangleEdge) {
    RectangleEdge[RectangleEdge["top"] = 0] = "top";
    RectangleEdge[RectangleEdge["bottom"] = 1] = "bottom";
    RectangleEdge[RectangleEdge["left"] = 2] = "left";
    RectangleEdge[RectangleEdge["right"] = 3] = "right";
})(exports.RectangleEdge || (exports.RectangleEdge = {}));
var RectangleEdge = exports.RectangleEdge;
var SLIDE_ANIMATIONS = (_a = {},
    _a[RectangleEdge.top] = 'slideUpIn20',
    _a[RectangleEdge.bottom] = 'slideDownIn20',
    _a[RectangleEdge.left] = 'slideLeftIn20',
    _a[RectangleEdge.right] = 'slideRightIn20',
    _a
);
var PositionData = (function () {
    function PositionData(calloutDirection, targetDirection, calloutPercent, targetPercent, beakPercent, isAuto) {
        this.calloutDirection = calloutDirection;
        this.targetDirection = targetDirection;
        this.calloutPercent = calloutPercent;
        this.targetPercent = targetPercent;
        this.beakPercent = beakPercent;
        this.isAuto = isAuto;
    }
    return PositionData;
}());
exports.PositionData = PositionData;
// Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target
var DirectionalDictionary = (_b = {},
    _b[DirectionalHint_1.DirectionalHint.topLeftEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topCenter] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topRightEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topAutoEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 0, 0, 50, true),
    _b[DirectionalHint_1.DirectionalHint.bottomLeftEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomCenter] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomRightEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomAutoEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 0, 0, 50, true),
    _b[DirectionalHint_1.DirectionalHint.leftTopEdge] = new PositionData(RectangleEdge.right, RectangleEdge.left, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.leftCenter] = new PositionData(RectangleEdge.right, RectangleEdge.left, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.leftBottomEdge] = new PositionData(RectangleEdge.right, RectangleEdge.left, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightTopEdge] = new PositionData(RectangleEdge.left, RectangleEdge.right, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightCenter] = new PositionData(RectangleEdge.left, RectangleEdge.right, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightBottomEdge] = new PositionData(RectangleEdge.left, RectangleEdge.right, 100, 100, 50, false),
    _b
);
var CoverDictionary = (_c = {},
    _c[DirectionalHint_1.DirectionalHint.topLeftEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topCenter] = new PositionData(RectangleEdge.top, RectangleEdge.top, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topRightEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topAutoEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 0, 0, 50, true),
    _c[DirectionalHint_1.DirectionalHint.bottomLeftEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomCenter] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomRightEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomAutoEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 0, 0, 50, true),
    _c[DirectionalHint_1.DirectionalHint.leftTopEdge] = new PositionData(RectangleEdge.left, RectangleEdge.left, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.leftCenter] = new PositionData(RectangleEdge.left, RectangleEdge.left, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.leftBottomEdge] = new PositionData(RectangleEdge.left, RectangleEdge.left, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightTopEdge] = new PositionData(RectangleEdge.right, RectangleEdge.right, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightCenter] = new PositionData(RectangleEdge.right, RectangleEdge.right, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightBottomEdge] = new PositionData(RectangleEdge.right, RectangleEdge.right, 100, 100, 50, false),
    _c
);
var OppositeEdgeDictionary = (_d = {},
    _d[RectangleEdge.top] = RectangleEdge.bottom,
    _d[RectangleEdge.bottom] = RectangleEdge.top,
    _d[RectangleEdge.right] = RectangleEdge.left,
    _d[RectangleEdge.left] = RectangleEdge.right,
    _d
);
function getRelativePositions(props, hostElement, calloutElement) {
    var beakWidth = !props.isBeakVisible ? 0 : props.beakWidth;
    var borderWidth = positioningFunctions._getBorderSize(calloutElement);
    var gap = positioningFunctions._calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
    var boundingRect = props.bounds ?
        positioningFunctions._getRectangleFromIRect(props.bounds) :
        new Rectangle_1.default(0, window.innerWidth - scroll_1.getScrollbarWidth(), 0, window.innerHeight);
    var targetRect = props.target ? positioningFunctions._getTargetRect(boundingRect, props.target) : positioningFunctions._getTargetRectDEPRECATED(boundingRect, props.targetElement, props.creationEvent, props.targetPoint, props.useTargetPoint);
    var positionData = positioningFunctions._getPositionData(props.directionalHint, targetRect, boundingRect, props.coverTarget);
    var positionedCallout = positioningFunctions._positionCalloutWithinBounds(positioningFunctions._getRectangleFromHTMLElement(calloutElement), targetRect, boundingRect, positionData, gap, props.coverTarget);
    var beakPositioned = positioningFunctions._positionBeak(beakWidth, positionedCallout, targetRect, borderWidth);
    var finalizedCallout = positioningFunctions._finalizeCalloutPosition(positionedCallout.calloutRectangle, hostElement);
    return {
        calloutPosition: { top: finalizedCallout.top, left: finalizedCallout.left },
        beakPosition: { top: beakPositioned.top, left: beakPositioned.left, display: 'block' },
        directionalClassName: SLIDE_ANIMATIONS[positionedCallout.targetEdge],
        submenuDirection: positionedCallout.calloutEdge === RectangleEdge.right ? DirectionalHint_1.DirectionalHint.leftBottomEdge : DirectionalHint_1.DirectionalHint.rightBottomEdge
    };
}
exports.getRelativePositions = getRelativePositions;
var positioningFunctions;
(function (positioningFunctions) {
    function _getTargetRect(bounds, target) {
        var targetRectangle;
        if (target.preventDefault) {
            var ev = target;
            targetRectangle = new Rectangle_1.default(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
        }
        else {
            targetRectangle = _getRectangleFromHTMLElement(target);
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_1 = outOfBounds; _i < outOfBounds_1.length; _i++) {
                var direction = outOfBounds_1[_i];
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
        return targetRectangle;
    }
    positioningFunctions._getTargetRect = _getTargetRect;
    function _getTargetRectDEPRECATED(bounds, targetElement, ev, targetPoint, isTargetPoint) {
        var targetRectangle;
        if (isTargetPoint) {
            if (targetPoint) {
                targetRectangle = new Rectangle_1.default(targetPoint.x, targetPoint.x, targetPoint.y, targetPoint.y);
            }
            else {
                targetRectangle = new Rectangle_1.default(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
            }
        }
        else {
            if (!targetElement) {
                if (ev && ev.target) {
                    targetRectangle = _getRectangleFromHTMLElement(ev.target);
                }
                targetRectangle = new Rectangle_1.default();
            }
            else {
                targetRectangle = _getRectangleFromHTMLElement(targetElement);
            }
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_2 = outOfBounds; _i < outOfBounds_2.length; _i++) {
                var direction = outOfBounds_2[_i];
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
        return targetRectangle;
    }
    positioningFunctions._getTargetRectDEPRECATED = _getTargetRectDEPRECATED;
    function _getRectangleFromHTMLElement(element) {
        var clientRect = element.getBoundingClientRect();
        return new Rectangle_1.default(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
    }
    positioningFunctions._getRectangleFromHTMLElement = _getRectangleFromHTMLElement;
    function _positionCalloutWithinBounds(calloutRectangle, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget) {
        if (gap === void 0) { gap = 0; }
        var estimatedRectangle = _moveRectangleToAnchorRectangle(calloutRectangle, directionalInfo.calloutDirection, directionalInfo.calloutPercent, targetRectangle, directionalInfo.targetDirection, directionalInfo.targetPercent, gap);
        if (_isRectangleWithinBounds(estimatedRectangle, boundingRectangle)) {
            return { calloutRectangle: estimatedRectangle, calloutEdge: directionalInfo.calloutDirection, targetEdge: directionalInfo.targetDirection, alignPercent: directionalInfo.calloutPercent, beakPercent: directionalInfo.beakPercent };
        }
        else {
            return _getBestRectangleFitWithinBounds(estimatedRectangle, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget);
        }
    }
    positioningFunctions._positionCalloutWithinBounds = _positionCalloutWithinBounds;
    function _getBestRectangleFitWithinBounds(estimatedPosition, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget) {
        var callout = {
            calloutRectangle: estimatedPosition,
            calloutEdge: directionalInfo.calloutDirection,
            targetEdge: directionalInfo.targetDirection,
            alignPercent: directionalInfo.calloutPercent,
            beakPercent: directionalInfo.beakPercent
        };
        // If it can't possibly fit within the bounds just put it into it's initial position.
        if (!_canRectangleFitWithinBounds(estimatedPosition, boundingRectangle)) {
            return callout;
        }
        if (!coverTarget) {
            callout = _flipRectangleToFit(callout, targetRectangle, directionalInfo.targetPercent, boundingRectangle, gap);
        }
        var outOfBounds = _getOutOfBoundsEdges(callout.calloutRectangle, boundingRectangle);
        for (var _i = 0, outOfBounds_3 = outOfBounds; _i < outOfBounds_3.length; _i++) {
            var direction = outOfBounds_3[_i];
            callout.calloutRectangle = _alignEdgeToCoordinate(callout.calloutRectangle, boundingRectangle[RectangleEdge[direction]], direction);
            var adjustedPercent = _recalculateMatchingPercents(callout.calloutRectangle, callout.targetEdge, targetRectangle, callout.targetEdge, directionalInfo.targetPercent);
            callout.alignPercent = adjustedPercent;
        }
        return callout;
    }
    positioningFunctions._getBestRectangleFitWithinBounds = _getBestRectangleFitWithinBounds;
    function _positionBeak(beakWidth, callout, targetRectangle, border) {
        var calloutRect = new Rectangle_1.default(0, callout.calloutRectangle.width - border * 2, 0, callout.calloutRectangle.height - border * 2);
        var beakRectangle = new Rectangle_1.default(0, beakWidth, 0, beakWidth);
        var recalculatedPercent = _recalculateMatchingPercents(callout.calloutRectangle, callout.calloutEdge, targetRectangle, callout.targetEdge, callout.beakPercent);
        var estimatedTargetPoint = _getPointOnEdgeFromPercent(calloutRect, callout.calloutEdge, recalculatedPercent);
        return _finalizeBeakPosition(beakRectangle, callout, estimatedTargetPoint, border);
    }
    positioningFunctions._positionBeak = _positionBeak;
    function _finalizeBeakPosition(beakRectangle, callout, estimatedTargetPoint, border) {
        var beakPixelSize = _calculateActualBeakWidthInPixels(beakRectangle.width) / 2;
        var innerRect = null;
        var beakPoint = { x: beakRectangle.width / 2, y: beakRectangle.width / 2 };
        if (callout.calloutEdge === RectangleEdge.bottom || callout.calloutEdge === RectangleEdge.top) {
            innerRect = new Rectangle_1.default(beakPixelSize, callout.calloutRectangle.width - beakPixelSize - border * 2, 0, callout.calloutRectangle.height - border * 2);
        }
        else {
            innerRect = new Rectangle_1.default(0, callout.calloutRectangle.width - border * 2, beakPixelSize, callout.calloutRectangle.height - beakPixelSize - border * 2);
        }
        var finalPoint = _getClosestPointOnEdgeToPoint(innerRect, callout.calloutEdge, estimatedTargetPoint);
        return _movePointOnRectangleToPoint(beakRectangle, beakPoint, finalPoint);
    }
    positioningFunctions._finalizeBeakPosition = _finalizeBeakPosition;
    function _getRectangleFromIRect(rect) {
        return new Rectangle_1.default(rect.left, rect.right, rect.top, rect.bottom);
    }
    positioningFunctions._getRectangleFromIRect = _getRectangleFromIRect;
    function _finalizeCalloutPosition(calloutRectangle, hostElement) {
        var hostRect = _getRectangleFromHTMLElement(hostElement);
        var topPosition = calloutRectangle.top - hostRect.top;
        var leftPosition = calloutRectangle.left - hostRect.left;
        return new Rectangle_1.default(leftPosition, leftPosition + calloutRectangle.width, topPosition, topPosition + calloutRectangle.height);
    }
    positioningFunctions._finalizeCalloutPosition = _finalizeCalloutPosition;
    /**
     * Finds the percent on the recalculateRect that matches the percent on the target rect based on position.
     */
    function _recalculateMatchingPercents(recalculateRect, rectangleEdge, targetRect, targetEdge, targetPercent) {
        var targetPoint = _getPointOnEdgeFromPercent(targetRect, targetEdge, targetPercent);
        var adjustedPoint = _getClosestPointOnEdgeToPoint(recalculateRect, rectangleEdge, targetPoint);
        var adjustedPercent = _getPercentOfEdgeFromPoint(recalculateRect, rectangleEdge, adjustedPoint);
        if (adjustedPercent > 100) {
            adjustedPercent = 100;
        }
        else if (adjustedPercent < 0) {
            adjustedPercent = 0;
        }
        return adjustedPercent;
    }
    positioningFunctions._recalculateMatchingPercents = _recalculateMatchingPercents;
    function _canRectangleFitWithinBounds(rect, boundingRect) {
        if (rect.width > boundingRect.width || rect.height > boundingRect.height) {
            return false;
        }
        return true;
    }
    positioningFunctions._canRectangleFitWithinBounds = _canRectangleFitWithinBounds;
    function _isRectangleWithinBounds(rect, boundingRect) {
        if (rect.top < boundingRect.top) {
            return false;
        }
        if (rect.bottom > boundingRect.bottom) {
            return false;
        }
        if (rect.left < boundingRect.left) {
            return false;
        }
        if (rect.right > boundingRect.right) {
            return false;
        }
        return true;
    }
    positioningFunctions._isRectangleWithinBounds = _isRectangleWithinBounds;
    /**
     * Gets all of the edges of a rectangle that are outside of the given bounds.
     * If there are no out of bounds edges it returns an empty array.
     */
    function _getOutOfBoundsEdges(rect, boundingRect) {
        var outOfBounds = new Array();
        if (rect.top < boundingRect.top) {
            outOfBounds.push(RectangleEdge.top);
        }
        if (rect.bottom > boundingRect.bottom) {
            outOfBounds.push(RectangleEdge.bottom);
        }
        if (rect.left < boundingRect.left) {
            outOfBounds.push(RectangleEdge.left);
        }
        if (rect.right > boundingRect.right) {
            outOfBounds.push(RectangleEdge.right);
        }
        return outOfBounds;
    }
    positioningFunctions._getOutOfBoundsEdges = _getOutOfBoundsEdges;
    /**
     * Returns a point on a edge that is x% of the way down it.
     */
    function _getPointOnEdgeFromPercent(rect, direction, percentOfRect) {
        var startPoint;
        var endPoint;
        switch (direction) {
            case RectangleEdge.top:
                startPoint = { x: rect.left, y: rect.top };
                endPoint = { x: rect.right, y: rect.top };
                break;
            case RectangleEdge.left:
                startPoint = { x: rect.left, y: rect.top };
                endPoint = { x: rect.left, y: rect.bottom };
                break;
            case RectangleEdge.right:
                startPoint = { x: rect.right, y: rect.top };
                endPoint = { x: rect.right, y: rect.bottom };
                break;
            case RectangleEdge.bottom:
                startPoint = { x: rect.left, y: rect.bottom };
                endPoint = { x: rect.right, y: rect.bottom };
                break;
            default:
                startPoint = { x: 0, y: 0 };
                endPoint = { x: 0, y: 0 };
                break;
        }
        return _calculatePointPercentAlongLine(startPoint, endPoint, percentOfRect);
    }
    positioningFunctions._getPointOnEdgeFromPercent = _getPointOnEdgeFromPercent;
    /**
     * Gets the percent down an edge that a point appears.
     */
    function _getPercentOfEdgeFromPoint(rect, direction, valueOnEdge) {
        switch (direction) {
            case RectangleEdge.top:
            case RectangleEdge.bottom:
                return rect.width !== 0 ? (valueOnEdge.x - rect.left) / rect.width * 100 : 100;
            case RectangleEdge.left:
            case RectangleEdge.right:
                return rect.height !== 0 ? (valueOnEdge.y - rect.top) / rect.height * 100 : 100;
        }
    }
    positioningFunctions._getPercentOfEdgeFromPoint = _getPercentOfEdgeFromPoint;
    /**
     * Percent is based on distance from left to right or up to down. 0% would be left most, 100% would be right most.
     */
    function _calculatePointPercentAlongLine(startPoint, endPoint, percent) {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent / 100);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent / 100);
        return { x: x, y: y };
    }
    positioningFunctions._calculatePointPercentAlongLine = _calculatePointPercentAlongLine;
    function _moveTopLeftOfRectangleToPoint(rect, destination) {
        return new Rectangle_1.default(destination.x, destination.x + rect.width, destination.y, destination.y + rect.height);
    }
    positioningFunctions._moveTopLeftOfRectangleToPoint = _moveTopLeftOfRectangleToPoint;
    /**
     * Aligns the given edge to the target coordinate.
     */
    function _alignEdgeToCoordinate(rect, coordinate, direction) {
        switch (direction) {
            case RectangleEdge.top:
                return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left, y: coordinate });
            case RectangleEdge.bottom:
                return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left, y: coordinate - rect.height });
            case RectangleEdge.left:
                return _moveTopLeftOfRectangleToPoint(rect, { x: coordinate, y: rect.top });
            case RectangleEdge.right:
                return _moveTopLeftOfRectangleToPoint(rect, { x: coordinate - rect.width, y: rect.top });
        }
        return new Rectangle_1.default();
    }
    positioningFunctions._alignEdgeToCoordinate = _alignEdgeToCoordinate;
    /**
     * Moves a point on a given rectangle to the target point. Does not change the rectangles orientation.
     */
    function _movePointOnRectangleToPoint(rect, rectanglePoint, targetPoint) {
        var leftCornerXDifference = rectanglePoint.x - rect.left;
        var leftCornerYDifference = rectanglePoint.y - rect.top;
        return _moveTopLeftOfRectangleToPoint(rect, { x: targetPoint.x - leftCornerXDifference, y: targetPoint.y - leftCornerYDifference });
    }
    positioningFunctions._movePointOnRectangleToPoint = _movePointOnRectangleToPoint;
    /**
     * Moves the given rectangle a certain number of pixels in the given direction;
     */
    function _moveRectangleInDirection(rect, moveDistance, direction) {
        var xModifier = 0;
        var yModifier = 0;
        switch (direction) {
            case RectangleEdge.top:
                yModifier = moveDistance * -1;
                break;
            case RectangleEdge.left:
                xModifier = moveDistance * -1;
                break;
            case RectangleEdge.right:
                xModifier = moveDistance;
                break;
            case RectangleEdge.bottom:
                yModifier = moveDistance;
                break;
        }
        return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left + xModifier, y: rect.top + yModifier });
    }
    positioningFunctions._moveRectangleInDirection = _moveRectangleInDirection;
    /**
     * Moves the given rectangle to an anchor rectangle.
     */
    function _moveRectangleToAnchorRectangle(rect, rectSide, rectPercent, anchorRect, anchorSide, anchorPercent, gap) {
        if (gap === void 0) { gap = 0; }
        var rectTargetPoint = _getPointOnEdgeFromPercent(rect, rectSide, rectPercent);
        var anchorTargetPoint = _getPointOnEdgeFromPercent(anchorRect, anchorSide, anchorPercent);
        var positionedRect = _movePointOnRectangleToPoint(rect, rectTargetPoint, anchorTargetPoint);
        return _moveRectangleInDirection(positionedRect, gap, anchorSide);
    }
    positioningFunctions._moveRectangleToAnchorRectangle = _moveRectangleToAnchorRectangle;
    /**
     * Gets the closet point on an edge to the given point.
     */
    function _getClosestPointOnEdgeToPoint(rect, edge, point) {
        switch (edge) {
            case RectangleEdge.top:
            case RectangleEdge.bottom:
                var x = void 0;
                if (point.x > rect.right) {
                    x = rect.right;
                }
                else if (point.x < rect.left) {
                    x = rect.left;
                }
                else {
                    x = point.x;
                }
                return { x: x, y: rect[RectangleEdge[edge]] };
            case RectangleEdge.left:
            case RectangleEdge.right:
                var y = void 0;
                if (point.y > rect.bottom) {
                    y = rect.bottom;
                }
                else if (point.y < rect.top) {
                    y = rect.top;
                }
                else {
                    y = point.y;
                }
                return { x: rect[RectangleEdge[edge]], y: y };
        }
    }
    positioningFunctions._getClosestPointOnEdgeToPoint = _getClosestPointOnEdgeToPoint;
    // Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
    // We still want to position the beak based on it's midpoint which does not change. It will
    // be at (beakwidth / 2, beakwidth / 2)
    function _calculateActualBeakWidthInPixels(beakWidth) {
        return Math.sqrt(beakWidth * beakWidth * 2);
    }
    positioningFunctions._calculateActualBeakWidthInPixels = _calculateActualBeakWidthInPixels;
    function _getBorderSize(element) {
        var styles = getComputedStyle(element, null);
        var topBorder = parseFloat(styles.borderTopWidth);
        var bottomBorder = parseFloat(styles.borderBottomWidth);
        var leftBorder = parseFloat(styles.borderLeftWidth);
        var rightBorder = parseFloat(styles.borderRightWidth);
        // If any of the borders are NaN default to 0
        if (isNaN(topBorder) || isNaN(bottomBorder) || isNaN(leftBorder) || isNaN(rightBorder)) {
            return 0;
        }
        // If all of the borders are the same size, any value;
        if (topBorder === bottomBorder && bottomBorder === leftBorder && leftBorder === rightBorder) {
            return topBorder;
        }
        // If the borders do not agree, return 0
        return 0;
    }
    positioningFunctions._getBorderSize = _getBorderSize;
    function _getPositionData(direction, target, boundingRect, coverTarget) {
        var directionalInfo = coverTarget ? CoverDictionary[direction] : DirectionalDictionary[direction];
        if (directionalInfo.isAuto) {
            var center = _getPointOnEdgeFromPercent(target, directionalInfo.targetDirection, 50);
            if (center.x <= boundingRect.width / 2) {
                directionalInfo.calloutPercent = 0;
                directionalInfo.targetPercent = 0;
            }
            else {
                directionalInfo.calloutPercent = 100;
                directionalInfo.targetPercent = 100;
            }
        }
        return directionalInfo;
    }
    positioningFunctions._getPositionData = _getPositionData;
    function _flipRectangleToFit(callout, targetRect, targetPercent, boundingRect, gap) {
        var directions = [RectangleEdge.left, RectangleEdge.right, RectangleEdge.top, RectangleEdge.bottom];
        var currentEdge = callout.targetEdge;
        // Make a copy to presever the original positioning.
        var positionedCallout = object_1.assign({}, callout);
        // Keep switching sides until one is found with enough space. If all sides don't fit then return the unmodified callout.
        for (var i = 0; i < 4; i++) {
            var outOfBounds = _getOutOfBoundsEdges(positionedCallout.calloutRectangle, boundingRect);
            var index = outOfBounds.indexOf(currentEdge);
            var oppositeEdge = OppositeEdgeDictionary[currentEdge];
            if (index > -1) {
                directions.splice(directions.indexOf(currentEdge), 1);
                currentEdge = directions.indexOf(oppositeEdge) > -1 ? oppositeEdge : directions.slice(-1)[0];
                positionedCallout.calloutEdge = OppositeEdgeDictionary[currentEdge];
                positionedCallout.targetEdge = currentEdge;
                positionedCallout.calloutRectangle = _moveRectangleToAnchorRectangle(positionedCallout.calloutRectangle, positionedCallout.calloutEdge, positionedCallout.alignPercent, targetRect, positionedCallout.targetEdge, targetPercent, gap);
            }
            else {
                return positionedCallout;
            }
        }
        return callout;
    }
    positioningFunctions._flipRectangleToFit = _flipRectangleToFit;
})(positioningFunctions = exports.positioningFunctions || (exports.positioningFunctions = {}));
var _a, _b, _c, _d;

//# sourceMappingURL=positioning.js.map
