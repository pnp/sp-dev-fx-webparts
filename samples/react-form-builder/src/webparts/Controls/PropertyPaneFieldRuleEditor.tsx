import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IFieldRulesInternalProps } from './IFieldRulesInternalProps';
import { IFieldRulesProps } from "./IFieldRulesProps";
import PropertyPaneFieldRuleEditorHost from './PropertyPaneFieldRuleEditorHost';
import { IRuleEntry } from '../../Common/IRuleEntry';
import { IPropertyPaneFieldRulesProps } from './IPropertyPaneFieldRulesProps';

//private fieldRules: {[key: string]: IRuleEntry} = {}; 

export class PropertyPaneFieldRuleEditor implements IPropertyPaneField<IPropertyPaneFieldRulesProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;    
    public properties: IFieldRulesInternalProps;
    shouldFocus?: boolean;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneFieldRulesProps) {        
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
      
      public render(): void {
        if (!this.elem) {
          return;
        }    
        this.onRender(this.elem);
      }

      private onRender(elem: HTMLElement): void {
        if (!this.elem) {
          this.elem = elem;
        }            
        const element: React.ReactElement<IFieldRulesProps> = React.createElement(PropertyPaneFieldRuleEditorHost, {                   
            label: this.properties.label,
            disabled: false,
            stateKey: this.properties.stateKey,
            fieldNames: this.properties.fieldNames,
            onChange: this.onChanged.bind(this),
            addionalFieldRules: this.properties.addionalFieldRules 
        });
        ReactDom.render(element, elem);
      }
    
      private onChanged(fieldRules: {[key: string]: IRuleEntry}): void {
        this.properties.onPropertyChange(fieldRules);
      }
}