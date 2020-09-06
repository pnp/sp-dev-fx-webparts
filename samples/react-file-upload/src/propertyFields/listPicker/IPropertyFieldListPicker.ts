import { IWebPartContext, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * Enum for specifying how the lists should be sorted
 */
export enum PropertyFieldListPickerOrderBy {
  Id = 1,
  Title
}

/**
 * Public properties of the PropertyFieldListPicker custom field
 */
export interface IPropertyFieldListPickerProps {

  /**
   * Property field label displayed on top
   */
  label: string;
  /**
   * Context of the current web part
   */
  context: IWebPartContext;
  /**
   * Initial selected list set of the control
   */
  selectedList?: string | string[];
  /**
   * BaseTemplate ID of the lists or libaries you want to return.
   */
  baseTemplate?: number;
  /**
   * Specify if you want to include or exclude hidden lists. By default this is true.
   */
  includeHidden?: boolean;
  /**
   * Specify the property on which you want to order the retrieve set of lists.
   */
  orderBy?: PropertyFieldListPickerOrderBy;
  /**
   * Specify if you want to have a single or mult list selector.
   */
  multiSelect?: boolean;
  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
   * Parent Web Part properties
   */
  properties: any;
  /**
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;
  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
  onGetErrorMessage?: (value: string) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
}

/**
 * Private properties of the PropertyFieldListPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldListPicker.
 *
 */
export interface IPropertyFieldListPickerPropsInternal extends IPropertyFieldListPickerProps, IPropertyPaneCustomFieldProps {

  label: string;
  targetProperty: string;
  context: IWebPartContext;
  selectedList?: string;
  selectedLists?: string[];
  baseTemplate?: number;
  orderBy?: PropertyFieldListPickerOrderBy;
  includeHidden?: boolean;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  properties: any;
  key: string;
  disabled?: boolean;
  onGetErrorMessage?: (value: string | string[]) => string | Promise<string>;
  deferredValidationTime?: number;
}
