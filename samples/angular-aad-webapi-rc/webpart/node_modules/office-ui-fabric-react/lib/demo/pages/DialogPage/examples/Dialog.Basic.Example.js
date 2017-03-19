"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./Dialog.Basic.Example.scss');
var DialogBasicExample = (function (_super) {
    __extends(DialogBasicExample, _super);
    function DialogBasicExample() {
        _super.call(this);
        this.state = {
            showDialog: false
        };
    }
    DialogBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Button, {description: 'Opens the Sample Dialog', onClick: this._showDialog.bind(this)}, "Open Dialog"), 
            React.createElement(index_1.Dialog, {isOpen: this.state.showDialog, type: index_1.DialogType.normal, onDismiss: this._closeDialog.bind(this), title: 'All emails together', subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.', isBlocking: false, containerClassName: 'ms-dialogMainOverride'}, 
                React.createElement(index_1.ChoiceGroup, {options: [
                    {
                        key: 'A',
                        text: 'Option A'
                    },
                    {
                        key: 'B',
                        text: 'Option B',
                        checked: true
                    },
                    {
                        key: 'C',
                        text: 'Option C',
                        disabled: true
                    }
                ], onChanged: this._onChoiceChanged}), 
                null /** You can also include null values as the result of conditionals */, 
                React.createElement(index_1.DialogFooter, null, 
                    React.createElement(index_1.Button, {buttonType: index_1.ButtonType.primary, onClick: this._closeDialog.bind(this)}, "Save"), 
                    React.createElement(index_1.Button, {onClick: this._closeDialog.bind(this)}, "Cancel")))));
    };
    DialogBasicExample.prototype._showDialog = function () {
        this.setState({ showDialog: true });
    };
    DialogBasicExample.prototype._closeDialog = function () {
        this.setState({ showDialog: false });
    };
    DialogBasicExample.prototype._onChoiceChanged = function () {
        console.log('Choice option change');
    };
    return DialogBasicExample;
}(React.Component));
exports.DialogBasicExample = DialogBasicExample;

//# sourceMappingURL=Dialog.Basic.Example.js.map
