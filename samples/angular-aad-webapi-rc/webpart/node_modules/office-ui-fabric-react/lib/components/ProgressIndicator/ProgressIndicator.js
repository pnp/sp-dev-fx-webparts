"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
var BaseComponent_1 = require('../../common/BaseComponent');
var css_1 = require('../../utilities/css');
require('./ProgressIndicator.scss');
// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
var ZERO_THRESHOLD = 0.01;
var ProgressIndicator = (function (_super) {
    __extends(ProgressIndicator, _super);
    function ProgressIndicator(props) {
        _super.call(this, props, {
            'title': 'label'
        });
    }
    ProgressIndicator.prototype.render = function () {
        var _a = this.props, title = _a.title, label = _a.label, description = _a.description, percentComplete = _a.percentComplete, className = _a.className;
        // Handle deprecated value.
        if (title) {
            label = title;
        }
        percentComplete = Math.min(100, Math.max(0, percentComplete * 100));
        return (React.createElement("div", {className: css_1.css('ms-ProgressIndicator', className)}, 
            React.createElement("div", {className: 'ms-ProgressIndicator-itemName'}, label), 
            React.createElement("div", {className: 'ms-ProgressIndicator-itemProgress'}, 
                React.createElement("div", {className: 'ms-ProgressIndicator-progressTrack'}), 
                React.createElement("div", {className: css_1.css('ms-ProgressIndicator-progressBar', {
                    'smoothTransition': percentComplete > ZERO_THRESHOLD
                }), style: { width: percentComplete + '%' }, role: 'progressbar', "aria-valuemin": '0', "aria-valuemax": '100', "aria-valuenow": percentComplete.toFixed().toString()})), 
            React.createElement("div", {className: 'ms-ProgressIndicator-itemDescription'}, description)));
    };
    ProgressIndicator.defaultProps = {
        label: '',
        description: '',
        percentComplete: 0,
        width: 180
    };
    return ProgressIndicator;
}(BaseComponent_1.BaseComponent));
exports.ProgressIndicator = ProgressIndicator;

//# sourceMappingURL=ProgressIndicator.js.map
