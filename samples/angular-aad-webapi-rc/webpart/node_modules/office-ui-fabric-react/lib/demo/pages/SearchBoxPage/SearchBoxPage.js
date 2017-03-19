"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var SearchBox_Small_Example_1 = require('./examples/SearchBox.Small.Example');
var SearchBox_FullSize_Example_1 = require('./examples/SearchBox.FullSize.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var SearchBoxSmallExampleCode = require('./examples/SearchBox.Small.Example.tsx');
var SearchBoxFullSizeExampleCode = require('./examples/SearchBox.FullSize.Example.tsx');
var SearchBoxPage = (function (_super) {
    __extends(SearchBoxPage, _super);
    function SearchBoxPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'SearchBox');
    }
    SearchBoxPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'SearchBox', componentName: 'SearchBoxExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'SearchBox', code: SearchBoxSmallExampleCode}, 
                React.createElement(SearchBox_Small_Example_1.SearchBoxSmallExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'SearchBox - No Parent Container', code: SearchBoxFullSizeExampleCode}, 
                React.createElement(SearchBox_FullSize_Example_1.SearchBoxFullSizeExample, null)
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'SearchBox'})
        ), overview: React.createElement("div", null, 
            React.createElement("p", null, "SearchBoxes provide an input field for searching through content, allowing users to locate specific items within the website or app."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Zero input state "), 
            React.createElement("p", null, "When the user has clicked into the SearchBox, but has not entered any text, there is an opportunity to display \"hint text\" within the input field, explaining what a user can do next. This could prompt a user to search for specific type content, or explain the scope of the search. Examples include \"type to search\", \"try searching for <x>\", \"search for a place\" or \"type to search in <x location>\"."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Autocomplete suggestions"), 
            React.createElement("p", null, "As the user enters a query string, they are provided with a dropdown of autocomplete suggestions or disambiguation options. This will help them expedite the input process and formulate an effective query. Recent search history, trending searches, contextual search suggestions, hints and tips are all good candidates for autocomplete content. In general, autocomplete suggestions have the user's input highlighted in some way (generally bolded) to indicate why it's being displayed. As the user enters more keystrokes, the suggestions update continuously/in real time. To see autocomplete suggestions, the user does not need to hit enter (execute a full search), as it is a lightweight way to get quick suggestions or results. If there are mixed result types within the autocomplete suggestions, provide visual indicators or grouping to help organize the information, making it easier to parse."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Full search"), 
            React.createElement("p", null, "If a user hits \"enter\" after entering input, a full search is executed. Full searches often go to another \"results\" page, or change/filter the content of the current page to show only applicable content. The results can appear in any form that best communicates the content."), 
            React.createElement("p", null, "As a general guideline, results should be displayed in context with the query that was typed, with immediate access to edit the query or enter a new one. One method to enable efficient access to both edit the previous query and enter a new query is to highlight the previous query when the field is reactivated. This way, any keystroke will replace the previous string, but the string is maintained so that the user can position a cursor to edit or append the previous string."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Search scopes"), 
            React.createElement("p", null, "Although search entry points tend to be similarly visualized, they can provide access to results that range from broad to narrow. By effectively communicating the scope of a search, you can help to ensure that the user expectation will be met by the capabilities of the search you are performing, which will reduce the possibility of frustration. The search entry point should be juxtaposed with the content being searched."), 
            React.createElement("p", null, "Some common search scopes include:"), 
            React.createElement("ul", null, 
                React.createElement("li", null, 
                    React.createElement("strong", null, "Global:"), 
                    " Search across multiple sources of cloud and local content. Varied results include URLs, documents, media, actions, apps, and more."), 
                React.createElement("li", null, 
                    React.createElement("strong", null, "Web:"), 
                    " Search a web index. Results include pages, entities, and answers."), 
                React.createElement("li", null, 
                    React.createElement("strong", null, "My stuff:"), 
                    " Search across device(s), cloud, social graphs, and more. Results are varied, but are constrained by the connection to user account(s).")), 
            React.createElement("h2", {className: 'ms-font-xl'}, "SearchBox with no parent container"), 
            React.createElement("p", null, "Use a SearchBox without a parent container when it is not restricted to a certain width to accommodate other content. This search box will span the entire width of the space it's in.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use placeholder text in the SearchBox to describe what users can search for."), 
                React.createElement("li", null, "Example: \"Search\"; \"Search files\"; \"Search site\""), 
                React.createElement("li", null, "Once the user has clicked into the SearchBox but hasn’t entered input yet, use \"hint text\" to communicate search scope."), 
                React.createElement("li", null, "Examples: \"Try searching for a PDFs\"; \"Search contacts list\"; \"Type to find <content type>\""), 
                React.createElement("li", null, "Provide autocomplete suggestions to help the user search quickly. These suggestions can be from past searches or auto-completions of the user's query text."), 
                React.createElement("li", null, "Provide autocomplete suggestions where there are strong matches to the user's query that the user may want to view immediately."), 
                React.createElement("li", null, "Use a visual separator to define a group of a similar or conceptually aligned autocomplete suggestions."), 
                React.createElement("li", null, "If possible, provide a preview (e.g. image, title, etc.) for autocomplete suggestions to help the user quickly determine if the suggested result is what they were searching for."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't leave the SearchBox blank because it's too ambiguous."), 
                React.createElement("li", null, "Don't have lengthy and unclear hint text. It should be used to clarify and set expectations."), 
                React.createElement("li", null, "Don't provide too many autocomplete suggestions, as that will overwhelm the user."), 
                React.createElement("li", null, "Don't provide inaccurate matches or bad predictions, as it will make search seem unreliable and will result in user frustration."), 
                React.createElement("li", null, "Don’t provide too much information or metadata in the suggestions list; it’s intended to be lightweight."), 
                React.createElement("li", null, "Don’t use an autocomplete dropdown for something that has one choice; there must be more than one item."), 
                React.createElement("li", null, "Don't build a custom search control based on the default text box or any other control."), 
                React.createElement("li", null, "Don't use SearchBox if you cannot reliably provide accurate results."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/SearchBox.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return SearchBoxPage;
}(React.Component));
exports.SearchBoxPage = SearchBoxPage;

//# sourceMappingURL=SearchBoxPage.js.map
