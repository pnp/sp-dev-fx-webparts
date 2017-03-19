"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var Async_1 = require('../../../../utilities/Async/Async');
var INTERVAL_DELAY = 100;
var INTERVAL_INCREMENT = .01;
var RESTART_WAIT_TIME = 2000;
var ProgressIndicatorBasicExample = (function (_super) {
    __extends(ProgressIndicatorBasicExample, _super);
    function ProgressIndicatorBasicExample() {
        _super.call(this);
        this._async = new Async_1.Async(this);
        this.state = {
            percentComplete: 0
        };
        this._startProgressDemo = this._startProgressDemo.bind(this);
    }
    ProgressIndicatorBasicExample.prototype.componentDidMount = function () {
        this._startProgressDemo();
    };
    ProgressIndicatorBasicExample.prototype.componentWillUnmount = function () {
        this._async.dispose();
    };
    ProgressIndicatorBasicExample.prototype.render = function () {
        var percentComplete = this.state.percentComplete;
        return (React.createElement(index_1.ProgressIndicator, {label: 'Example title', description: 'Example description', percentComplete: percentComplete}));
    };
    ProgressIndicatorBasicExample.prototype._startProgressDemo = function () {
        var _this = this;
        // reset the demo
        this.setState({
            percentComplete: 0
        });
        // update progress
        this._interval = this._async.setInterval(function () {
            var percentComplete = _this.state.percentComplete + INTERVAL_INCREMENT;
            // once complete, set the demo to start again
            if (percentComplete >= 1.0) {
                percentComplete = 1.0;
                _this._async.clearInterval(_this._interval);
                _this._async.setTimeout(_this._startProgressDemo, RESTART_WAIT_TIME);
            }
            _this.setState({
                percentComplete: percentComplete
            });
        }, INTERVAL_DELAY);
    };
    return ProgressIndicatorBasicExample;
}(React.Component));
exports.ProgressIndicatorBasicExample = ProgressIndicatorBasicExample;

//# sourceMappingURL=ProgressIndicator.Basic.Example.js.map
