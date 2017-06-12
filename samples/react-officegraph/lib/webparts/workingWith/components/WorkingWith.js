"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var WorkingWith_module_scss_1 = require("../WorkingWith.module.scss");
var sp_http_1 = require("@microsoft/sp-http");
var SearchUtils_1 = require("../../SearchUtils");
var Utils_1 = require("../../Utils");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var WorkingWith = (function (_super) {
    __extends(WorkingWith, _super);
    function WorkingWith(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            people: [],
            loading: true,
            error: null
        };
        return _this;
    }
    WorkingWith.prototype.componentDidMount = function () {
        this.loadPeople(this.props.siteUrl, this.props.numberOfPeople);
    };
    WorkingWith.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (this.props.numberOfPeople !== prevProps.numberOfPeople ||
            this.props.siteUrl !== prevProps.siteUrl && (this.props.numberOfPeople && this.props.siteUrl)) {
            this.loadPeople(this.props.siteUrl, this.props.numberOfPeople);
        }
    };
    WorkingWith.prototype.render = function () {
        var _this = this;
        var loading = this.state.loading ? React.createElement("div", { style: { margin: '0 auto' } },
            React.createElement(office_ui_fabric_react_1.Spinner, { label: 'Loading...' })) : React.createElement("div", null);
        var error = this.state.error ? React.createElement("div", null,
            React.createElement("strong", null, "Error: "),
            " ",
            this.state.error) : React.createElement("div", null);
        var people = this.state.people.map(function (person, i) {
            return (React.createElement(office_ui_fabric_react_1.Persona, { primaryText: person.name, secondaryText: person.jobTitle, tertiaryText: person.department, imageUrl: person.photoUrl, size: office_ui_fabric_react_1.PersonaSize.large, presence: office_ui_fabric_react_1.PersonaPresence.none, onClick: function () { _this.navigateTo(person.profileUrl); }, key: person.email }));
        });
        return (React.createElement("div", { className: WorkingWith_module_scss_1.default.workingWith },
            React.createElement("div", { className: office_ui_fabric_react_1.css('ms-font-xl', WorkingWith_module_scss_1.default.webPartTitle) }, this.props.title),
            loading,
            error,
            people));
    };
    WorkingWith.prototype.navigateTo = function (url) {
        window.open(url, '_blank');
    };
    WorkingWith.prototype.loadPeople = function (siteUrl, numberOfPeople) {
        var _this = this;
        this.props.httpClient.get(siteUrl + "/_api/search/query?querytext='*'&properties='GraphQuery:actor(me\\,action\\:1019)'&selectproperties='Title,WorkEmail,JobTitle,Department,Path'&rowlimit=" + numberOfPeople, sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (!response ||
                !response.PrimaryQueryResult ||
                !response.PrimaryQueryResult.RelevantResults ||
                response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
                _this.setState({
                    loading: false,
                    error: null,
                    people: []
                });
                return;
            }
            var people = [];
            for (var i = 0; i < response.PrimaryQueryResult.RelevantResults.Table.Rows.length; i++) {
                var personRow = response.PrimaryQueryResult.RelevantResults.Table.Rows[i];
                var email = SearchUtils_1.SearchUtils.getValueFromResults('WorkEmail', personRow.Cells);
                people.push({
                    name: SearchUtils_1.SearchUtils.getValueFromResults('Title', personRow.Cells),
                    email: email,
                    jobTitle: SearchUtils_1.SearchUtils.getValueFromResults('JobTitle', personRow.Cells),
                    department: SearchUtils_1.SearchUtils.getValueFromResults('Department', personRow.Cells),
                    photoUrl: Utils_1.Utils.getUserPhotoUrl(email, siteUrl, 'L'),
                    profileUrl: SearchUtils_1.SearchUtils.getValueFromResults('Path', personRow.Cells)
                });
            }
            _this.setState({
                loading: false,
                error: null,
                people: people
            });
        }, function (error) {
            _this.setState({
                loading: false,
                error: error,
                people: []
            });
        });
    };
    return WorkingWith;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkingWith;

//# sourceMappingURL=WorkingWith.js.map
