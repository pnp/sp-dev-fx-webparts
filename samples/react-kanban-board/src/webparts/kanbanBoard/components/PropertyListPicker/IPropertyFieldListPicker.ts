import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPList } from './IPropertyFieldListPickerHost';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

/**
 * Detailed list information
 */
export interface IPropertyFieldList {
  /**
   * List ID
   */
  id: string;
  /**
   * List Title
   */
  title?: string;
  /**
   * List server relative URL
   */
  url?: string;
}

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
  context: BaseComponentContext;
  /**
   * Absolute Web Url of target site (user requires permissions)
   */
  webAbsoluteUrl?: string;
  /**
   * Initial selected list set of the control
   */
  selectedList?: string | string[] | IPropertyFieldList | IPropertyFieldList[];
  /**
   * BaseTemplate ID(s) of the lists or libraries you want to return.
   */
  baseTemplate?: number | number[];
  /**
   * Specify if you want to include or exclude hidden lists. By default this is true.
   */
  includeHidden?: boolean;
  /**
   * Specify the property on which you want to order the retrieve set of lists.
   */
  orderBy?: PropertyFieldListPickerOrderBy;
  
  
  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Parent Web Part properties
   */
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  /**
   * Defines list titles which should be excluded from the list picker control
   */
  listsToExclude?: string[];
  /**
   * Filter list from Odata query (takes precendents over Hidden and BaseTemplate Filters)
   */
  filter?: string;
  /**
   * Callback that is called before the dropdown is populated
   */
  onListsRetrieved?: (lists: ISPList[]) => PromiseLike<ISPList[]> | ISPList[];

  /**
   * Specifies if the picker returns list id, title and url as an object instead on id.
   */
  includeListTitleAndUrl?: boolean;
   /**
  * Content type id which, if present, must be on the list
  */
    contentTypeId?: string;
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
  context: BaseComponentContext;
  webAbsoluteUrl?: string;
  selectedList?: string | IPropertyFieldList;
  baseTemplate?: number | number[];
  orderBy?: PropertyFieldListPickerOrderBy;
  includeHidden?: boolean;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  key: string;
  disabled?: boolean;
  onGetErrorMessage?: (value: string | string[]) => string | Promise<string>;
  deferredValidationTime?: number;
  listsToExclude?: string[];
  filter?: string;
  onListsRetrieved?: (lists: ISPList[]) => PromiseLike<ISPList[]> | ISPList[];
}
