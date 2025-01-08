import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import PropertyFieldSelectedPermissionsHost, { IPropertyFieldSelectedPermissionsHostProps } from './PropertyFieldSelectedPermissionsHost';

export interface IPropertyFieldSelectedPermissionsProps {
  label: string;
  initialValue?: ISelectedPermission[]; // Updated type here
  onPropertyChange(propertyPath: string, oldValue: ISelectedPermission[], newValue: ISelectedPermission[]): void; // Updated type here
  getSelectedPermissions: () => ISelectedPermission[];
}

export interface IPropertyFieldSelectedPermissionsPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialValue?: ISelectedPermission[];
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: ISelectedPermission[], newValue: ISelectedPermission[]): void; // Updated type here
  SelectedPermissions: ISelectedPermission[];
}

class PropertyFieldSelectedPermissionsBuilder implements IPropertyPaneField<IPropertyFieldSelectedPermissionsPropsInternal> {
  public type = 1; // IPropertyPaneFieldType.Custom
  public targetProperty: string;
  public properties: IPropertyFieldSelectedPermissionsPropsInternal;

  private label: string;
  private onPropertyChange: (propertyPath: string, oldValue: ISelectedPermission[], newValue: ISelectedPermission[]) => void; // Updated type here
  private customProperties: ISelectedPermission[];

  public constructor(_targetProperty: string, _properties: IPropertyFieldSelectedPermissionsPropsInternal) {
    this.render = this.render.bind(this);
    this.properties = _properties;
    this.label = _properties.label;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.SelectedPermissions ? _properties.SelectedPermissions : [];
  }

  private render(elem: HTMLElement): void {
    const element: React.ReactElement<IPropertyFieldSelectedPermissionsHostProps> = React.createElement(PropertyFieldSelectedPermissionsHost, {
      label: this.label,
      onPropertyChange: this.onPropertyChange,
      SelectedPermissions: this.customProperties,
    });
    ReactDom.render(element, elem);
  }

}

export function PropertyFieldSelectedPermissions(
  targetProperty: string,
  properties: IPropertyFieldSelectedPermissionsProps
): IPropertyPaneField<IPropertyFieldSelectedPermissionsPropsInternal> {
  const newProperties: IPropertyFieldSelectedPermissionsPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    key: targetProperty,
    initialValue: properties.initialValue,
    onPropertyChange: properties.onPropertyChange,
    SelectedPermissions: properties.getSelectedPermissions(),
    onDispose: null,
    onRender: null,
  };

  return new PropertyFieldSelectedPermissionsBuilder(targetProperty, newProperties);
}
