import ListDefinition from "../model/ListDefinition";
import ColumnDefinition from "../model/ColumnDefinition";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
   IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';
import PropertyFieldListDefinitionsHost, { IPropertyFieldListDefinitionsHostProps } from './PropertyFieldListDefinitionsHost';
import {  PageContext } from "@microsoft/sp-page-context";
export interface IPropertyFieldListDefinitionsProps {
  label: string;
  initialValue?: Array<ListDefinition>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  getListDefinitions: () => Array<ListDefinition>;
  getColumnDefinitions: () =>Array<ColumnDefinition>;
  PageContext: PageContext;
}
export interface IPropertyFieldListDefinitionsPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  key:string; // new for rc0
  initialValue?: Array<ListDefinition>;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
   getListDefinitions: () => Array<ListDefinition>;
  getColumnDefinitions: () =>Array<ColumnDefinition>;
    PageContext: PageContext;
}
class PropertyFieldListDefinitionsBuilder implements IPropertyPaneField<IPropertyFieldListDefinitionsPropsInternal> {

  //Properties defined by IPropertyPaneField
  public type = 1;//IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldListDefinitionsPropsInternal;

  //Custom properties
  private label: string;
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldListDefinitionsPropsInternal) {

    this.render = this.render.bind(this);
    this.properties = _properties;
    this.label = _properties.label;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
  }
  private render(elem: HTMLElement): void {

    const ldProps: IPropertyFieldListDefinitionsHostProps = {
      label: this.label,
      getColumnDefinitions: this.properties.getColumnDefinitions,
      getListDefinitions: this.properties.getListDefinitions,
      onPropertyChange: this.onPropertyChange,
      PageContext: this.properties.PageContext

    };

    const element: React.ReactElement<IPropertyFieldListDefinitionsHostProps> = React.createElement(PropertyFieldListDefinitionsHost, ldProps);
    ReactDom.render(element, elem);
  }
  private dispose(elem: HTMLElement): void {
  }
}
export function PropertyFieldListDefinitions(targetProperty: string, properties: IPropertyFieldListDefinitionsProps): IPropertyPaneField<IPropertyFieldListDefinitionsPropsInternal> {

  //Create an internal properties object from the given properties
  var newProperties: IPropertyFieldListDefinitionsPropsInternal = {
    label: properties.label,
    key:targetProperty,
    targetProperty: targetProperty,
    initialValue: properties.initialValue,
    onPropertyChange: properties.onPropertyChange,
    getListDefinitions: properties.getListDefinitions,
    getColumnDefinitions: properties.getColumnDefinitions,
    PageContext:properties.PageContext,
    onDispose: null,
    onRender: null,
  };
  //Calles the PropertyFieldListDefinitions builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldListDefinitionsBuilder(targetProperty, newProperties);
}


