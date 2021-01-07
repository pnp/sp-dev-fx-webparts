import * as React                                       from 'react';
import * as ReactDom                                    from 'react-dom';
import {  } from "@microsoft/sp-webpart-base";
import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IDropdownOption }                              from 'office-ui-fabric-react';
import { IPropertyPaneAsyncDropdownProps }              from './IPropertyPaneAsyncDropdownProps';
import { IPropertyPaneAsyncDropdownInternalProps }      from './IPropertyPaneAsyncDropdownInternalProps';
import { AsyncDropdown }                                from './components/AsyncDropdown/AsyncDropdown';
import { IAsyncDropdownProps }                          from './components/AsyncDropdown/IAsyncDropdownProps';


export class PropertyPaneAsyncDropdown implements IPropertyPaneField<IPropertyPaneAsyncDropdownProps> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneAsyncDropdownInternalProps;
  private elem: HTMLElement;


  /*****************************************************************************************
   * Property pane's contructor
   * @param targetProperty 
   * @param properties 
   *****************************************************************************************/
  constructor(targetProperty: string, properties: IPropertyPaneAsyncDropdownProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      label: properties.label,
      loadingLabel: properties.loadingLabel,
      errorLabelFormat: properties.errorLabelFormat,
      loadOptions: properties.loadOptions,
      onPropertyChange: properties.onPropertyChange,
      selectedKey: properties.selectedKey,
      disabled: properties.disabled,
      onRender: this.onRender.bind(this),
      key: targetProperty
    };
  }


  /*****************************************************************************************
   * Renders the AsyncDropdown property pane
   *****************************************************************************************/
  public render(): void {
    if (!this.elem) {
      return;
    }
    this.onRender(this.elem);
  }


  /*****************************************************************************************
   * Renders the AsyncDropdown property pane
   *****************************************************************************************/
  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const asyncDropDown: React.ReactElement<IAsyncDropdownProps> = React.createElement(AsyncDropdown, {
      label: this.properties.label,
      loadingLabel: this.properties.loadingLabel,
      errorLabelFormat: this.properties.errorLabelFormat,
      loadOptions: this.properties.loadOptions,
      onChanged: this.onChanged.bind(this),
      selectedKey: this.properties.selectedKey,
      disabled: this.properties.disabled,
      // required to allow the component to be re-rendered by calling this.render() externally
      stateKey: new Date().toString()
    });

    ReactDom.render(asyncDropDown, elem);
  }


  /*****************************************************************************************
   * Call the property pane's onPropertyChange when the AsyncDropdown changes
   *****************************************************************************************/
  private onChanged(option: IDropdownOption, index?: number): void {
    this.properties.onPropertyChange(this.targetProperty, option.key);
  }
}