import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import PropertyPaneFieldRuleEditorHost from './PropertyPaneFieldRuleEditorHost';
//private fieldRules: {[key: string]: IRuleEntry} = {}; 
var PropertyPaneFieldRuleEditor = /** @class */ (function () {
    function PropertyPaneFieldRuleEditor(targetProperty, properties) {
        this.type = PropertyPaneFieldType.Custom;
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            disabled: properties.disabled,
            stateKey: properties.stateKey,
            fieldNames: properties.fieldNames,
            addionalFieldRules: properties.addionalFieldRules,
            onRender: this.onRender.bind(this),
            onPropertyChange: properties.onPropertyChange
            //onDispose: this.onDispose.bind(this)
        };
    }
    PropertyPaneFieldRuleEditor.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyPaneFieldRuleEditor.prototype.onRender = function (elem) {
        if (!this.elem) {
            this.elem = elem;
        }
        var element = React.createElement(PropertyPaneFieldRuleEditorHost, {
            label: this.properties.label,
            disabled: false,
            stateKey: this.properties.stateKey,
            fieldNames: this.properties.fieldNames,
            onChange: this.onChanged.bind(this),
            addionalFieldRules: this.properties.addionalFieldRules
        });
        ReactDom.render(element, elem);
    };
    PropertyPaneFieldRuleEditor.prototype.onChanged = function (fieldRules) {
        this.properties.onPropertyChange(fieldRules);
    };
    return PropertyPaneFieldRuleEditor;
}());
export { PropertyPaneFieldRuleEditor };
//# sourceMappingURL=PropertyPaneFieldRuleEditor.js.map