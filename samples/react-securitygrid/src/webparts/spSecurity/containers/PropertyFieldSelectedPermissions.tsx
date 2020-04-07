import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import PropertyFieldSelectedPermissionsHost, { IPropertyFieldSelectedPermissionsHostProps } from './PropertyFieldSelectedPermissionsHost';

export interface IPropertyFieldSelectedPermissionsProps {
  label: string;
  initialValue?: Array<ISelectedPermission>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  getSelectedPermissions: () => Array<ISelectedPermission>;
}
export interface IPropertyFieldSelectedPermissionsPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialValue?: Array<ISelectedPermission>;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  SelectedPermissions: Array<ISelectedPermission>;
}
class PropertyFieldSelectedPermissionsBuilder implements IPropertyPaneField<IPropertyFieldSelectedPermissionsPropsInternal> {
  //Properties defined by IPropertyPaneField
  public type = 1;//IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldSelectedPermissionsPropsInternal;
  //Custom properties
  private label: string;
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;

  public constructor(_targetProperty: string, _properties: IPropertyFieldSelectedPermissionsPropsInternal) {
  
    this.render = this.render.bind(this);
    this.properties = _properties;
    this.label = _properties.label;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.SelectedPermissions ? _properties.SelectedPermissions : [];
  }

  private render(elem: HTMLElement): void {
        // what other args does this get? does it get ctx and a callback?
    const element: React.ReactElement<IPropertyFieldSelectedPermissionsHostProps> = React.createElement(PropertyFieldSelectedPermissionsHost, {
      label: this.label,
      onPropertyChange: this.onPropertyChange,
      SelectedPermissions: this.customProperties,

    });
    ReactDom.render(element, elem);
  }
  private dispose(elem: HTMLElement): void {
  }
}
export function PropertyFieldSelectedPermissions(targetProperty: string, properties: IPropertyFieldSelectedPermissionsProps): IPropertyPaneField<IPropertyFieldSelectedPermissionsPropsInternal> {
  //Create an internal properties object from the given properties
  var newProperties: IPropertyFieldSelectedPermissionsPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    key: targetProperty,
    initialValue: properties.initialValue,
    onPropertyChange: properties.onPropertyChange,
    SelectedPermissions: properties.getSelectedPermissions(),
    onDispose: null,
    onRender: null,
  };
  //Calles the PropertyFieldSelectedPermissions builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldSelectedPermissionsBuilder(targetProperty, newProperties);

}

