"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var index_1 = require('../../../../index');
var BasePicker_1 = require('../../../../components/pickers/BasePicker');
require('./Picker.CustomResult.Example.scss');
var data = [
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                }
            ]
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    icon: 'Share', onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Pin', onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Ringer', onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
            ]
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
            ]
        },
        documentTitleProps: {
            title: 'Document1',
            shouldTruncate: true
        }
    },
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: 'dist/document-preview.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                }
            ]
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    icon: 'Share', onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Pin', onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Ringer', onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
            ]
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
            ]
        },
        documentTitleProps: {
            title: 'Document2',
            shouldTruncate: true
        }
    },
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: 'dist/document-preview2.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                }
            ]
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    icon: 'Share', onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Pin', onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Ringer', onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
            ]
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
            ]
        },
        documentTitleProps: {
            title: 'Document3',
            shouldTruncate: true
        }
    },
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: 'dist/document-preview3.png',
                    iconSrc: 'dist/icon-ppt.png',
                    imageFit: index_1.ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f'
                }
            ]
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    icon: 'Share', onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Pin', onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
                {
                    icon: 'Ringer', onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                },
            ]
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: 'dist/avatar-kat.png' },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: 'dist/avatar-kat.png' }
            ]
        },
        documentTitleProps: {
            title: 'Document4',
            shouldTruncate: true
        }
    }
];
exports.SuggestedDocumentItem = function (documentProps) {
    return (React.createElement("div", null, 
        " ", 
        documentProps.documentTitleProps.title, 
        " "));
};
exports.SuggestedBigItem = function (documentProps) {
    var documentPreviewProps = documentProps.documentPreviewProps, documentTitleProps = documentProps.documentTitleProps;
    return (React.createElement(index_1.Persona, {imageUrl: documentPreviewProps.previewImages[0].previewImageSrc, primaryText: documentTitleProps.title, size: index_1.PersonaSize.small}));
};
exports.SelectedDocumentItem = function (documentProps) {
    var _a = documentProps.item, documentActionsProps = _a.documentActionsProps, documentPreviewProps = _a.documentPreviewProps, documentActivityProps = _a.documentActivityProps, documentTitleProps = _a.documentTitleProps;
    var actions = [];
    documentActionsProps.actions.forEach(function (action) { return actions.push(action); });
    actions.push({
        icon: 'Cancel', onClick: function (ev) { documentProps.onRemoveItem(); }
    });
    return (React.createElement(index_1.DocumentCard, {onClick: function () { console.log('You clicked the card.'); }}, 
        React.createElement(index_1.DocumentCardPreview, __assign({}, documentPreviewProps)), 
        React.createElement(index_1.DocumentCardLocation, {location: 'Marketing Documents', locationHref: 'http://microsoft.com', ariaLabel: 'Location, Marketing Documents'}), 
        React.createElement(index_1.DocumentCardTitle, __assign({}, documentTitleProps)), 
        React.createElement(index_1.DocumentCardActivity, __assign({}, documentActivityProps)), 
        React.createElement(index_1.DocumentCardActions, {actions: actions})));
};
var PickerCustomResultExample = (function (_super) {
    __extends(PickerCustomResultExample, _super);
    function PickerCustomResultExample() {
        _super.call(this);
        this._onFilterChanged = this._onFilterChanged.bind(this);
    }
    PickerCustomResultExample.prototype.render = function () {
        return (React.createElement(DocumentPicker, {onRenderSuggestionsItem: exports.SuggestedBigItem, onResolveSuggestions: this._onFilterChanged, onRenderItem: exports.SelectedDocumentItem, getTextFromItem: function (props) { return props.documentTitleProps.title; }, pickerSuggestionsProps: {
            suggestionsHeaderText: 'Suggested Documents',
            noResultsFoundText: 'No Documents Found',
            suggestionsItemClassName: 'ms-DocumentPicker-bigSuggestion'
        }}));
    };
    PickerCustomResultExample.prototype._onFilterChanged = function (filterText, items) {
        var _this = this;
        return filterText ? data.filter(function (item) { return item.documentTitleProps.title.toLowerCase().indexOf(filterText.toLowerCase()) === 0; }).filter(function (item) { return !_this._listContainsDocument(item, items); }) : [];
    };
    PickerCustomResultExample.prototype._listContainsDocument = function (document, items) {
        if (!items || !items.length || items.length === 0) {
            return false;
        }
        return items.filter(function (item) { return item.documentTitleProps.title === document.documentTitleProps.title; }).length > 0;
    };
    return PickerCustomResultExample;
}(React.Component));
exports.PickerCustomResultExample = PickerCustomResultExample;
var DocumentPicker = (function (_super) {
    __extends(DocumentPicker, _super);
    function DocumentPicker() {
        _super.apply(this, arguments);
    }
    DocumentPicker.prototype.render = function () {
        var suggestedDisplayValue = this.state.suggestedDisplayValue;
        return (React.createElement("div", null, 
            React.createElement("div", {ref: this._resolveRef('root'), className: 'ms-BasePicker', onKeyDown: this.onKeyDown}, 
                React.createElement(index_1.SelectionZone, {selection: this.selection}, 
                    React.createElement("div", {className: 'ms-BasePicker-text'}, 
                        React.createElement(index_1.BaseAutoFill, __assign({}, this.props.inputProps, {className: 'ms-BasePicker-input', ref: this._resolveRef('input'), onFocus: this.onInputFocus, onInputValueChange: this.onInputChange, suggestedDisplayValue: suggestedDisplayValue, "aria-activedescendant": 'sug-' + this.suggestionStore.currentIndex, "aria-owns": 'suggestion-list', "aria-expanded": 'true', "aria-haspopup": 'true', autoCapitalize: 'off', autoComplete: 'off', role: 'combobox'}))
                    )
                )
            ), 
            React.createElement(index_1.FocusZone, {ref: this._resolveRef('focusZone')}, this.renderItems()), 
            this.renderSuggestions()));
    };
    DocumentPicker.prototype._onBackspace = function (ev) {
        // override the existing backspace method to not do anything because the list items appear below.
    };
    return DocumentPicker;
}(BasePicker_1.BasePicker));
exports.DocumentPicker = DocumentPicker;

//# sourceMappingURL=Picker.CustomResult.Example.js.map
