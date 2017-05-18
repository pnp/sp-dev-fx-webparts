import ColumnDefinition from "../model/ColumnDefinition";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';
import PropertyFieldColumnDefinitionsHost, { IPropertyFieldColumnDefinitionsHostProps } from './PropertyFieldColumnDefinitionsHost';

export interface IPropertyFieldColumnDefinitionsProps {
  label: string;
  initialValue?: Array<ColumnDefinition>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  getColumnDefinitions: () => Array<ColumnDefinition>;
}
export interface IPropertyFieldColumnDefinitionsPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialValue?: Array<ColumnDefinition>;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  columnDefinitions: Array<ColumnDefinition>;
}
class PropertyFieldColumnDefinitionsBuilder implements IPropertyPaneField<IPropertyFieldColumnDefinitionsPropsInternal> {
  //Properties defined by IPropertyPaneField
  public type = 1;//IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldColumnDefinitionsPropsInternal;
  //Custom properties
  private label: string;

  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;
  public constructor(_targetProperty: string, _properties: IPropertyFieldColumnDefinitionsPropsInternal) {
    this.render = this.render.bind(this);
    this.properties = _properties;
    this.label = _properties.label;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.columnDefinitions;
  }
  private render(elem: HTMLElement): void {
    const element: React.ReactElement<IPropertyFieldColumnDefinitionsHostProps> = React.createElement(PropertyFieldColumnDefinitionsHost, {
      label: this.label,
      onPropertyChange: this.onPropertyChange,
      columnDefinitions: this.customProperties,

    });
    ReactDom.render(element, elem);
  }
  private dispose(elem: HTMLElement): void {
  }
}
export function PropertyFieldColumnDefinitions(targetProperty: string, properties: IPropertyFieldColumnDefinitionsProps): IPropertyPaneField<IPropertyFieldColumnDefinitionsPropsInternal> {


    //Create an internal properties object from the given properties
    var newProperties: IPropertyFieldColumnDefinitionsPropsInternal = {
      label: properties.label,
      targetProperty: targetProperty,
        key: targetProperty,
      initialValue: properties.initialValue,
      onPropertyChange: properties.onPropertyChange,
      columnDefinitions: properties.getColumnDefinitions(),
      onDispose: null,
      onRender: null,
    };
    //Calles the PropertyFieldColumnDefinitions builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldColumnDefinitionsBuilder(targetProperty, newProperties);

}


