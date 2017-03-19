"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */
var React = require('react');
/* tslint:enable */
var index_1 = require('../../../../index');
var PeoplePickerExampleData_1 = require('./PeoplePickerExampleData');
var object_1 = require('../../../../utilities/object');
require('./PeoplePicker.Types.Example.scss');
var suggestionProps = {
    suggestionsHeaderText: 'Suggested People',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading'
};
var PeoplePickerTypesExample = (function (_super) {
    __extends(PeoplePickerTypesExample, _super);
    function PeoplePickerTypesExample() {
        var _this = this;
        _super.call(this);
        this.contextualMenuItems = [
            {
                key: 'newItem',
                icon: 'circlePlus',
                name: 'New'
            },
            {
                key: 'upload',
                icon: 'upload',
                name: 'Upload'
            },
            {
                key: 'divider_1',
                name: '-',
            },
            {
                key: 'rename',
                name: 'Rename'
            },
            {
                key: 'properties',
                name: 'Properties'
            },
            {
                key: 'disabled',
                name: 'Disabled item',
                disabled: true
            }
        ];
        this._peopleList = [];
        PeoplePickerExampleData_1.people.forEach(function (persona) {
            var target = {};
            object_1.assign(target, persona, { menuItems: _this.contextualMenuItems });
            _this._peopleList.push(target);
        });
        this.state = {
            currentPicker: 1,
            delayResults: false
        };
    }
    PeoplePickerTypesExample.prototype.render = function () {
        var currentPicker;
        switch (this.state.currentPicker) {
            case 1:
                currentPicker = this._renderNormalPicker();
                break;
            case 2:
                currentPicker = this._renderCompactPicker();
                break;
            case 3:
                currentPicker = this._renderListPicker();
                break;
            case 4:
                currentPicker = this._renderPreselectedItemsPicker();
                break;
            case 5:
                currentPicker = this._renderLimitedSearch();
                break;
        }
        return (React.createElement("div", null, 
            currentPicker, 
            React.createElement("div", {className: 'dropdown-div'}, 
                React.createElement(index_1.Dropdown, {label: 'Select People Picker Type', options: [
                    { key: 1, text: 'Normal' },
                    { key: 2, text: 'Compact' },
                    { key: 3, text: 'Members List' },
                    { key: 4, text: 'Preselected Items' },
                    { key: 5, text: 'Limit Search' }
                ], selectedKey: this.state.currentPicker, onChanged: this._dropDownSelected}), 
                React.createElement(index_1.Toggle, {label: 'Delay Suggestion Results', defaultChecked: false, onChanged: this._toggleChange}))));
    };
    PeoplePickerTypesExample.prototype._renderListPicker = function () {
        return (React.createElement(index_1.ListPeoplePicker, {onResolveSuggestions: this._onFilterChanged, getTextFromItem: function (persona) { return persona.primaryText; }, className: 'ms-PeoplePicker', pickerSuggestionsProps: suggestionProps, key: 'list'}));
    };
    PeoplePickerTypesExample.prototype._renderNormalPicker = function () {
        return (React.createElement(index_1.NormalPeoplePicker, {onResolveSuggestions: this._onFilterChanged, getTextFromItem: function (persona) { return persona.primaryText; }, pickerSuggestionsProps: suggestionProps, className: 'ms-PeoplePicker', key: 'normal'}));
    };
    PeoplePickerTypesExample.prototype._renderCompactPicker = function () {
        return (React.createElement(index_1.CompactPeoplePicker, {onResolveSuggestions: this._onFilterChanged, getTextFromItem: function (persona) { return persona.primaryText; }, pickerSuggestionsProps: suggestionProps, className: 'ms-PeoplePicker'}));
    };
    PeoplePickerTypesExample.prototype._renderPreselectedItemsPicker = function () {
        return (React.createElement(index_1.CompactPeoplePicker, {onResolveSuggestions: this._onFilterChanged, getTextFromItem: function (persona) { return persona.primaryText; }, className: 'ms-PeoplePicker', defaultSelectedItems: PeoplePickerExampleData_1.people.splice(0, 3), key: 'list', pickerSuggestionsProps: suggestionProps}));
    };
    PeoplePickerTypesExample.prototype._renderLimitedSearch = function () {
        var limitedSearchSuggestionProps = suggestionProps;
        limitedSearchSuggestionProps.searchForMoreText = 'Load all Results';
        return (React.createElement(index_1.CompactPeoplePicker, {onResolveSuggestions: this._onFilterChangedWithLimit, getTextFromItem: function (persona) { return persona.primaryText; }, className: 'ms-PeoplePicker', onGetMoreResults: this._onFilterChanged, pickerSuggestionsProps: limitedSearchSuggestionProps}));
    };
    PeoplePickerTypesExample.prototype._onFilterChanged = function (filterText, currentPersonas, limitResults) {
        if (filterText) {
            var filteredPersonas = this._filterPersonasByText(filterText);
            filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
            filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
            return this._filterPromise(filteredPersonas);
        }
        else {
            return [];
        }
    };
    PeoplePickerTypesExample.prototype._onFilterChangedWithLimit = function (filterText, currentPersonas) {
        return this._onFilterChanged(filterText, currentPersonas, 3);
    };
    PeoplePickerTypesExample.prototype._filterPromise = function (personasToReturn) {
        if (this.state.delayResults) {
            return this._convertResultsToPromise(personasToReturn);
        }
        else {
            return personasToReturn;
        }
    };
    PeoplePickerTypesExample.prototype._listContainsPersona = function (persona, personas) {
        if (!personas || !personas.length || personas.length === 0) {
            return false;
        }
        return personas.filter(function (item) { return item.primaryText === persona.primaryText; }).length > 0;
    };
    PeoplePickerTypesExample.prototype._filterPersonasByText = function (filterText) {
        var _this = this;
        return this._peopleList.filter(function (item) { return _this._doesTextStartWith(item.primaryText, filterText); });
    };
    PeoplePickerTypesExample.prototype._doesTextStartWith = function (text, filterText) {
        return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
    };
    PeoplePickerTypesExample.prototype._convertResultsToPromise = function (results) {
        return new Promise(function (resolve, reject) { return setTimeout(function () { return resolve(results); }, 2000); });
    };
    PeoplePickerTypesExample.prototype._removeDuplicates = function (personas, possibleDupes) {
        var _this = this;
        return personas.filter(function (persona) { return !_this._listContainsPersona(persona, possibleDupes); });
    };
    PeoplePickerTypesExample.prototype._toggleChange = function (toggleState) {
        this.setState({ delayResults: toggleState });
    };
    PeoplePickerTypesExample.prototype._dropDownSelected = function (option) {
        this.setState({ currentPicker: option.key });
    };
    __decorate([
        index_1.autobind
    ], PeoplePickerTypesExample.prototype, "_onFilterChanged", null);
    __decorate([
        index_1.autobind
    ], PeoplePickerTypesExample.prototype, "_onFilterChangedWithLimit", null);
    __decorate([
        index_1.autobind
    ], PeoplePickerTypesExample.prototype, "_toggleChange", null);
    __decorate([
        index_1.autobind
    ], PeoplePickerTypesExample.prototype, "_dropDownSelected", null);
    return PeoplePickerTypesExample;
}(index_1.BaseComponent));
exports.PeoplePickerTypesExample = PeoplePickerTypesExample;

//# sourceMappingURL=PeoplePicker.Types.Example.js.map
