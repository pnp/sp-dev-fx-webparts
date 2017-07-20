import {
  IPropertyPaneCustomFieldProps,
  IWebPartContext
} from '@microsoft/sp-webpart-base';

/**
 * Complex object to define property in a web part
 */
export interface IPropertyPaneViewSelectorProps {
  /**
   * Selected list id
   */
  listId: string;
  /**
   * Selected view id
   */
  viewId: string;
}

/**
 * PropertyPaneViewSelector component public props
 */
export interface IPropertyPaneViewSelectorFieldProps {
  /**
   * web part context
   */
  wpContext: IWebPartContext;
  /**
   * selected list id
   */
  listId: string;
  /**
   * selected view id
   */
  viewId: string;
  /**
   * onPropertyChange event handler
   */
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  /**
   * Label to show in list dropdown
   */
  listLabel: string;
  /**
   * Label to show in view dropdown
   */
  viewLabel: string;
}

/**
 * PropertyPaneViewSelector component internal props
 */
export interface IPropertyPaneViewSelectorFieldPropsInternal extends IPropertyPaneCustomFieldProps {
  /**
   * Path to target property in web part properties
   */
  targetProperty: string;
  /**
   * web part context
   */
  wpContext: IWebPartContext;
  /**
   * selected list id
   */
  listId: string;
  /**
   * selected view id
   */
  viewId: string;
  /**
   * onPropertyChange event handler
   */
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  /**
   * Label to show in list dropdown
   */
  listLabel: string;
  /**
   * Label to show in view dropdown
   */
  viewLabel: string;
}