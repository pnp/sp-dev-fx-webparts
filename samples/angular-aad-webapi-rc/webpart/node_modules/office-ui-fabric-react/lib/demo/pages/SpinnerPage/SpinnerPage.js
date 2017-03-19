"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Spinner_Basic_Example_1 = require('./examples/Spinner.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var SpinnerBasicExampleCode = require('./examples/Spinner.Basic.Example.tsx');
var SpinnerPage = (function (_super) {
    __extends(SpinnerPage, _super);
    function SpinnerPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Spinner');
    }
    SpinnerPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Spinner', componentName: 'SpinnerExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Various Spinner Types', code: SpinnerBasicExampleCode}, 
            React.createElement(Spinner_Basic_Example_1.SpinnerBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Spinner'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "A Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. A Spinner is shown when it's unsure how long a task will take making it the indeterminate version of a ProgressIndicator. They can be various sizes, located inline with content or centered. They generally appear after an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use a Spinner when a task is not immediate."), 
                React.createElement("li", null, "Use one Spinner at a time."), 
                React.createElement("li", null, "Descriptive verbs are appropriate under a Spinner to help the user understand what's happening. Ie: Saving, processing, updating."), 
                React.createElement("li", null, "Use a Spinner when confirming a change has been made or a task is being processed."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don’t use a Spinner when performing immediate tasks."), 
                React.createElement("li", null, "Don't show multiple Spinners at the same time."), 
                React.createElement("li", null, "Don't include more than a few words when paired with a Spinner."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Spinner.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return SpinnerPage;
}(React.Component));
exports.SpinnerPage = SpinnerPage;

//# sourceMappingURL=SpinnerPage.js.map
