var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TextField } from '@fluentui/react';
import { Dropdown } from '@fluentui/react';
import * as React from "react";
var PropertyPaneFieldRuleEditorHost = /** @class */ (function (_super) {
    __extends(PropertyPaneFieldRuleEditorHost, _super);
    function PropertyPaneFieldRuleEditorHost(props, state) {
        var _this = _super.call(this, props) || this;
        // TODO read existing rules from properties
        _this.state = {
            fieldRules: typeof _this.props.addionalFieldRules === "undefined" ? {} : _this.props.addionalFieldRules,
            currentEditRule: null
        };
        return _this;
    }
    /*public componentDidUpdate(prevProps: IFieldRulesProps, prevState: IFieldRulesHostState): void {
        if (this.props.disabled !== prevProps.disabled ||
          this.props.stateKey !== prevProps.stateKey) {
        }
      }*/
    PropertyPaneFieldRuleEditorHost.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Dropdown, { label: this.props.label, disabled: this.props.disabled || this.props.fieldNames === null, onChange: this.onChange.bind(this), 
                //selectedKey={this.selectedKey}
                options: this.props.fieldNames === null ? [] : this.props.fieldNames }),
            React.createElement(TextField, { label: 'Regex oder Name (email, tel)', id: 'Regex', onChange: this.onTextChange.bind(this), value: this.state.currentEditRule === null ? "" : this.state.currentEditRule.Regex, disabled: this.state.currentEditRule === null }),
            React.createElement(TextField, { label: 'Eigene Fehlermeldung', id: 'ErrorMsg', onChange: this.onTextChange.bind(this), value: this.state.currentEditRule === null ? "" : this.state.currentEditRule.ErrorMsg, disabled: this.state.currentEditRule === null }),
            React.createElement(TextField, { label: 'Standardwert', id: 'DefaultValue', onChange: this.onTextChange.bind(this), value: this.state.currentEditRule === null ? "" : this.state.currentEditRule.DefaultValue, disabled: this.state.currentEditRule === null })));
    };
    PropertyPaneFieldRuleEditorHost.prototype.onTextChange = function (source, newValue) {
        var txtField = source.target;
        if (txtField.id === "Regex")
            this.state.currentEditRule.Regex = newValue;
        if (txtField.id === "ErrorMsg")
            this.state.currentEditRule.ErrorMsg = newValue;
        if (txtField.id === "DefaultValue")
            this.state.currentEditRule.DefaultValue = newValue;
        this.setState(this.state);
        if (this.props.onChange) {
            this.props.onChange(this.state.fieldRules);
        }
    };
    PropertyPaneFieldRuleEditorHost.prototype.onChange = function (source, option, index) {
        if (typeof this.state.fieldRules[option.key] === "undefined")
            this.state.fieldRules[option.key] = {
                ErrorMsg: "",
                MaxValue: 0,
                MinValue: 0,
                Regex: "",
                DefaultValue: ""
            };
        this.setState({
            currentEditRule: this.state.fieldRules[option.key]
        });
    };
    return PropertyPaneFieldRuleEditorHost;
}(React.Component));
export default PropertyPaneFieldRuleEditorHost;
//# sourceMappingURL=PropertyPaneFieldRuleEditorHost.js.map