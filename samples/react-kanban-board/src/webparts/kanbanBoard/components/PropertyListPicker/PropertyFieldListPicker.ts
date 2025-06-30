import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import PropertyFieldListPickerHost from './PropertyFieldListPickerHost';
import { IPropertyFieldListPickerHostProps, ISPList } from './IPropertyFieldListPickerHost';
import { PropertyFieldListPickerOrderBy, IPropertyFieldListPickerProps, IPropertyFieldListPickerPropsInternal, IPropertyFieldList } from './IPropertyFieldListPicker';

/**
 * Represents a PropertyFieldListPicker object
 */
class PropertyFieldListPickerBuilder implements IPropertyPaneField<IPropertyFieldListPickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldListPickerPropsInternal;

  //Custom properties label: string;
  private label: string;
  private context: BaseComponentContext;
  private webAbsoluteUrl?: string;
  private selectedList: string | IPropertyFieldList|undefined;
  private baseTemplate: number | number[]|undefined;
  private orderBy: PropertyFieldListPickerOrderBy;
  private includeHidden: boolean;
  private listsToExclude: string[];
  private includeListTitleAndUrl: boolean;

  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { /* no-op; */ } // eslint-disable-line @typescript-eslint/no-explicit-any
  private customProperties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private key: string;
  private disabled: boolean = false;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private deferredValidationTime: number = 200;
  private filter: string|undefined;
  private contentTypeId: string|undefined;
  private onListsRetrieved?: (lists: ISPList[]) => PromiseLike<ISPList[]> | ISPList[];
  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldListPickerPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.context = _properties.context;
    this.webAbsoluteUrl = _properties.webAbsoluteUrl;
    this.selectedList = _properties.selectedList;
    this.baseTemplate = _properties.baseTemplate;
    this.orderBy = _properties.orderBy?_properties.orderBy:PropertyFieldListPickerOrderBy.Title;
    
    this.includeHidden = _properties.includeHidden?_properties.includeHidden:false;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.onGetErrorMessage = _properties.onGetErrorMessage?_properties.onGetErrorMessage:() => '';
    this.listsToExclude = _properties.listsToExclude?_properties.listsToExclude:[];
    this.filter = _properties.filter;
    this.onListsRetrieved = _properties.onListsRetrieved;
    this.includeListTitleAndUrl = _properties.includeListTitleAndUrl?_properties.includeListTitleAndUrl:false;
    this.contentTypeId=_properties.contentTypeId;

    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }
    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }
  }

  /**
   * Renders the SPListPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    const componentProps: IPropertyFieldListPickerHostProps = {
      label: this.label,
      targetProperty: this.targetProperty,
      context: this.context,
      webAbsoluteUrl: this.webAbsoluteUrl,
      baseTemplate: this.baseTemplate,
      orderBy: this.orderBy,
      
      includeHidden: this.includeHidden,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: (target,value) => (  changeCallback && changeCallback(target,value)),
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      listsToExclude: this.listsToExclude,
      filter: this.filter,
      onListsRetrieved: this.onListsRetrieved,
      includeListTitleAndUrl: this.includeListTitleAndUrl,
      contentTypeId:this.contentTypeId
    
    };

    
      // Single selector
      componentProps.selectedList = this.selectedList;
      const element: React.ReactElement<IPropertyFieldListPickerHostProps> = React.createElement(PropertyFieldListPickerHost, componentProps);
      // Calls the REACT content generator
      ReactDom.render(element, elem);
    
  }

  /**
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {
    ReactDom.unmountComponentAtNode(elem);
  }

}

/**
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export function PropertyFieldListPicker(targetProperty: string, properties: IPropertyFieldListPickerProps): IPropertyPaneField<IPropertyFieldListPickerPropsInternal> {

  //Create an internal properties object from the given properties
  const newProperties: IPropertyFieldListPickerPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    context: properties.context,
    webAbsoluteUrl: properties.webAbsoluteUrl,
    selectedList: !Array.isArray(properties.selectedList) ? properties.selectedList : undefined,
    baseTemplate: properties.baseTemplate,
    orderBy: properties.orderBy,
    
    includeHidden: properties.includeHidden,
    onPropertyChange: properties.onPropertyChange,
    properties: properties.properties,
    onDispose: undefined,
    onRender: (elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void => { /* no-op; */ }, // eslint-disable-line @typescript-eslint/no-explicit-any
    key: "key"+properties.key,
    disabled: properties.disabled,
    onGetErrorMessage: properties.onGetErrorMessage,
    deferredValidationTime: properties.deferredValidationTime,
    listsToExclude: properties.listsToExclude,
    filter: properties.filter,
    onListsRetrieved: properties.onListsRetrieved,
    includeListTitleAndUrl: properties.includeListTitleAndUrl,
    contentTypeId:properties.contentTypeId
  };
  //Calls the PropertyFieldListPicker builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldListPickerBuilder(targetProperty, newProperties);
}
