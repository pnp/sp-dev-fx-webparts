"use strict";
var Rectangle_1 = require('./Rectangle');
var positioning_1 = require('./positioning');
var DirectionalHint_1 = require('../common/DirectionalHint');
var Rectangle_test_1 = require('./Rectangle.test');
var assert = chai.assert;
function stringifyResults(expected, actual) {
    return 'expected was: ' + JSON.stringify(expected) + ' actual was: ' + JSON.stringify(actual);
}
function positionCalloutTest(testValues, alignment, validate) {
    var callout = testValues.callout, target = testValues.target, bounds = testValues.bounds, beakWidth = testValues.beakWidth;
    var gap = positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(beakWidth) / 2;
    var result = positioning_1.positioningFunctions._positionCalloutWithinBounds(callout, target, bounds, positioning_1.positioningFunctions._getPositionData(alignment, target, bounds), gap);
    var beak = positioning_1.positioningFunctions._positionBeak(beakWidth, result, target, 0);
    assert(Rectangle_test_1.areRectanglesEqual(result.calloutRectangle, validate.callout), 'Callout not alligned with target ' + stringifyResults(validate.callout, result.calloutRectangle));
    assert(Rectangle_test_1.areRectanglesEqual(beak, validate.beak), 'Beak is improperly positioned. ' + stringifyResults(validate.beak, beak));
}
function validateNoBeakTest(testValues, alignment, validate) {
    var callout = testValues.callout, target = testValues.target, bounds = testValues.bounds, beakWidth = testValues.beakWidth;
    var result = positioning_1.positioningFunctions._positionCalloutWithinBounds(callout, target, bounds, positioning_1.positioningFunctions._getPositionData(alignment, target, bounds), beakWidth);
    assert(Rectangle_test_1.areRectanglesEqual(result.calloutRectangle, validate.callout), 'No Beak: Callout not alligned with target ' + stringifyResults(validate.callout, result.calloutRectangle));
}
describe('Callout Positioning', function () {
    it('Gets correct percent along line', function () {
        var result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 100, y: 0 }, 50);
        assert(result.x === 50 && result.y === 0, 'point is not 50% from edge ' + stringifyResults(50, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 100, y: 0 }, 75);
        assert(result.x === 75 && result.y === 0, 'point is not 75% from edge ' + stringifyResults(75, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 0, y: 100 }, 99);
        assert(result.x === 0 && result.y === 99, 'point is not 99% from edge ' + stringifyResults(99, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 3, y: 0 }, 50);
        assert(result.x === 1.5 && result.y === 0, 'point is not 50% from edge ' + stringifyResults(1.5, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 3, y: 0 }, 75);
        assert(result.x === 2.25 && result.y === 0, 'point is not 75% from edge ' + stringifyResults(2.25, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 4, y: 0 }, 50);
        assert(result.x === 2 && result.y === 0, 'point is not 50% from edge ' + stringifyResults(2, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 4, y: 0 }, 75);
        assert(result.x === 3 && result.y === 0, 'point is not 75% from edge ' + stringifyResults(3, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 4, y: 0 }, 60);
        assert(result.x === 2.4 && result.y === 0, 'point is not 60% from edge ' + stringifyResults(2.4, result.x));
        result = positioning_1.positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 5, y: 0 }, 99);
        assert(result.x === 4.95 && result.y === 0, 'point is not 99% from edge ' + stringifyResults(4.95, result.x));
    });
    it('Correctly recalculates percents', function () {
        var targetRectangle = new Rectangle_1.default(200, 300, 200, 300);
        var result = positioning_1.positioningFunctions._recalculateMatchingPercents(new Rectangle_1.default(0, 100, 300, 400), positioning_1.RectangleEdge.top, targetRectangle, positioning_1.RectangleEdge.bottom, 50);
        assert(result === 100, stringifyResults(100, result));
        result = positioning_1.positioningFunctions._recalculateMatchingPercents(new Rectangle_1.default(200, 300, 300, 400), positioning_1.RectangleEdge.top, targetRectangle, positioning_1.RectangleEdge.bottom, 50);
        assert(result === 50, stringifyResults(50, result));
        result = positioning_1.positioningFunctions._recalculateMatchingPercents(new Rectangle_1.default(200, 250, 300, 400), positioning_1.RectangleEdge.top, targetRectangle, positioning_1.RectangleEdge.bottom, 25);
        assert(result === 50, stringifyResults(50, result));
        result = positioning_1.positioningFunctions._recalculateMatchingPercents(new Rectangle_1.default(600, 900, 300, 400), positioning_1.RectangleEdge.top, targetRectangle, positioning_1.RectangleEdge.bottom, 50);
        assert(result === 0, stringifyResults(0, result));
    });
    it('Correctly positions the callout without beak', function () {
        var noBeakTestCase = {
            callout: new Rectangle_1.default(0, 300, 0, 300),
            target: new Rectangle_1.default(400, 800, 400, 800),
            bounds: new Rectangle_1.default(0, 1600, 0, 1600),
            beakWidth: 0,
        };
        var validateNoBeakBottomLeft = {
            callout: new Rectangle_1.default(400, 700, 800, 1100),
            beak: null
        };
        var validateNoBeakLeft = {
            callout: new Rectangle_1.default(100, 400, 400, 700),
            beak: null
        };
        var validateNoBeakTop = {
            callout: new Rectangle_1.default(400, 700, 100, 400),
            beak: null
        };
        validateNoBeakTest(noBeakTestCase, DirectionalHint_1.DirectionalHint.bottomLeftEdge, validateNoBeakBottomLeft);
        validateNoBeakTest(noBeakTestCase, DirectionalHint_1.DirectionalHint.leftTopEdge, validateNoBeakLeft);
        validateNoBeakTest(noBeakTestCase, DirectionalHint_1.DirectionalHint.topLeftEdge, validateNoBeakTop);
    });
    it('Correctly positions the callout with the beak', function () {
        var basicTestCase = {
            callout: new Rectangle_1.default(0, 300, 0, 300),
            target: new Rectangle_1.default(400, 800, 400, 800),
            bounds: new Rectangle_1.default(0, 1600, 0, 1600),
            beakWidth: 16,
        };
        var validateBottomLeft = {
            callout: new Rectangle_1.default(400, 700, 800 + positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(8), 1100 + positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(8)),
            beak: new Rectangle_1.default(192, 208, -8, 8)
        };
        var validateBottomCenter = {
            callout: new Rectangle_1.default(450, 750, 800 + positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(8), 1100 + positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(8)),
            beak: new Rectangle_1.default(142, 158, -8, 8)
        };
        var validateBottomRight = {
            callout: new Rectangle_1.default(500, 800, 800 + positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(8), 1100 + positioning_1.positioningFunctions._calculateActualBeakWidthInPixels(8)),
            beak: new Rectangle_1.default(92, 108, -8, 8)
        };
        positionCalloutTest(basicTestCase, DirectionalHint_1.DirectionalHint.bottomLeftEdge, validateBottomLeft);
        positionCalloutTest(basicTestCase, DirectionalHint_1.DirectionalHint.bottomCenter, validateBottomCenter);
        positionCalloutTest(basicTestCase, DirectionalHint_1.DirectionalHint.bottomRightEdge, validateBottomRight);
    });
});

//# sourceMappingURL=positioning.test.js.map
