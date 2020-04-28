import { IWebPartContext, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
import { ISPView } from './ISPView';


/**
 * Enum for specifying how the views should be sorted
 */
export enum PropertyFieldViewPickerOrderBy {
  Id = 1,
  Title
}

/**
 * Public properties of the PropertyFieldViewPicker custom field
 */
export interface IPropertyFieldViewPickerProps {
  /**
   * Context of the current web part
   */
  context: IWebPartContext;

  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;

  /**
   * Filter views from Odata query
   */
  filter?: string;

  /**
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;

  /**
   * Property field label displayed on top
   */
  label: string;
  /**
   * The List Id of the list where you want to get the views
   */
  listId?: string;

  /**
   * Specify the property on which you want to order the retrieve set of views.
   */
  orderBy?: PropertyFieldViewPickerOrderBy;

  /**
   * Parent Web Part properties
   */
  properties: any;

  /**
   * Initial selected view of the control
   */
  selectedView?: string | string[];

  /**
   * Defines view titles which should be excluded from the view picker control
   */
  viewsToExclude?: string[];

  /**
   * Absolute Web Url of target site (user requires permissions)
   */
  webAbsoluteUrl?: string;

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
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
    * Callback that is called before the dropdown is populated
    */
  onViewsRetrieved?: (views: ISPView[]) => PromiseLike<ISPView[]> | ISPView[];
}

/**
 * Private properties of the PropertyFieldViewPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, without asking to the developer to add it when he's using
 * the PropertyFieldViewPicker.
 */
export interface IPropertyFieldViewPickerPropsInternal extends IPropertyFieldViewPickerProps, IPropertyPaneCustomFieldProps {
  context: IWebPartContext;
  deferredValidationTime?: number;
  disabled?: boolean;
  filter?: string;
  key: string;
  label: string;
  listId?: string;
  orderBy?: PropertyFieldViewPickerOrderBy;
  properties: any;
  selectedView?: string;
  targetProperty: string;
  viewsToExclude?: string[];
  webAbsoluteUrl?: string;
  onGetErrorMessage?: (value: string | string[]) => string | Promise<string>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  onViewsRetrieved?: (views: ISPView[]) => PromiseLike<ISPView[]> | ISPView[];
}
