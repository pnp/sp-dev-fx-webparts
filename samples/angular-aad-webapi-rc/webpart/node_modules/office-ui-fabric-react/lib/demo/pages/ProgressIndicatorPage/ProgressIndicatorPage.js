"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var ProgressIndicator_Basic_Example_1 = require('./examples/ProgressIndicator.Basic.Example');
var ProgressIndicatorBasicExampleCode = require('./examples/ProgressIndicator.Basic.Example.tsx');
var ProgressIndicatorPage = (function (_super) {
    __extends(ProgressIndicatorPage, _super);
    function ProgressIndicatorPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'ProgressIndicator');
    }
    ProgressIndicatorPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'ProgressIndicator', componentName: 'ProgressIndicatorExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'ProgressIndicator', code: ProgressIndicatorBasicExampleCode}, 
            React.createElement(ProgressIndicator_Basic_Example_1.ProgressIndicatorBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'ProgressIndicator'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "ProgressIndicators are used to show the completion status of an operation lasting more than 2 seconds. If the state of progress cannot be determined, use a Spinner instead. ProgressIndicators can appear in a new panel, a flyout, under the UI initiating the operation, or even replacing the initiating UI, as long as the UI can return if the operation is canceled or is stopped."), 
            React.createElement("p", null, "ProgressIndicators feature a bar showing total units to completion, and total units finished. The description of the operation appears above the bar, and the status in text appears below. The description should tell someone exactly what the operation is doing. Examples of formatting include:"), 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement("strong", null, "[Object]"), 
                    " is being ", 
                    React.createElement("strong", null, "[operation name]"), 
                    ", or"), 
                React.createElement("li", null, 
                    React.createElement("strong", null, "[Object]"), 
                    " is being ", 
                    React.createElement("strong", null, "[operation name]"), 
                    " to ", 
                    React.createElement("strong", null, "[destination name]"), 
                    " or"), 
                React.createElement("li", null, 
                    React.createElement("strong", null, "[Object]"), 
                    " is being ", 
                    React.createElement("strong", null, "[operation name]"), 
                    " from ", 
                    React.createElement("strong", null, "[source name]"), 
                    " to ", 
                    React.createElement("strong", null, "[destination name]"))), 
            React.createElement("p", null, "Status text is generally in units elapsed and total units. If the operation can be canceled, an “X” icon is used and should be placed in the upper right, aligned with the baseline of the operation name. When an error occurs, replace the status text with the error description using ms-fontColor-redDark."), 
            React.createElement("p", null, "Real-world examples include copying files to a storage location, saving edits to a file, and more. Use units that are informative and relevant to give the best idea to users of how long the operation will take to complete. Avoid time units as they are rarely accurate enough to be trustworthy. Also, combine steps of a complex operation into one total bar to avoid “rewinding” the bar. Instead change the operation description to reflect the change if necessary. Bars moving backwards reduce confidence in the service.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use a ProgressIndicator when the total units to completion is known"), 
                React.createElement("li", null, "Display operation description"), 
                React.createElement("li", null, "Show text above and/or below the bar"), 
                React.createElement("li", null, "Combine steps of a single operation into one bar"))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use a ProgressIndicator when the total units to completion is indeterminate"), 
                React.createElement("li", null, "Use only a single word description"), 
                React.createElement("li", null, "Show text to the right or left of the bar"), 
                React.createElement("li", null, "Cause progress to “rewind” to show new steps"))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ProgressIndicator.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return ProgressIndicatorPage;
}(React.Component));
exports.ProgressIndicatorPage = ProgressIndicatorPage;

//# sourceMappingURL=ProgressIndicatorPage.js.map
