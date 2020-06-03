import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import PropertyFieldViewPickerHost from './PropertyFieldViewPickerHost';
import { IPropertyFieldViewPickerHostProps } from './IPropertyFieldViewPickerHost';
import { PropertyFieldViewPickerOrderBy, IPropertyFieldViewPickerProps, IPropertyFieldViewPickerPropsInternal } from './IPropertyFieldViewPicker';
import { ISPView } from '.';

/**
 * Represents a PropertyFieldViewPicker object
 */
class PropertyFieldViewPickerBuilder implements IPropertyPaneField<IPropertyFieldViewPickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public properties: IPropertyFieldViewPickerPropsInternal;
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;

  //Custom properties label: string;
  private context: IWebPartContext;
  private label: string;
  private listId?: string;
  private orderBy: PropertyFieldViewPickerOrderBy;
  private selectedView: string;
  private viewsToExclude: string[];

  private customProperties: any;
  private deferredValidationTime: number = 200;
  private disabled: boolean = false;
  private disableReactivePropertyChanges: boolean = false;
  private filter: string;
  private key: string;
  private webAbsoluteUrl?: string;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private onViewsRetrieved?: (views: ISPView[]) => PromiseLike<ISPView[]> | ISPView[];
  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { }
  private renderWebPart: () => void;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldViewPickerPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.context = _properties.context;
    this.webAbsoluteUrl = _properties.webAbsoluteUrl;
    this.listId = _properties.listId;
    this.selectedView = _properties.selectedView;
    this.orderBy = _properties.orderBy;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.viewsToExclude = _properties.viewsToExclude;
    this.filter = _properties.filter;
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    this.onViewsRetrieved = _properties.onViewsRetrieved;

    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }
    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }
  }

  /**
   * Renders the SPViewPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    const componentProps = {
      label: this.label,
      targetProperty: this.targetProperty,
      context: this.context,
      webAbsoluteUrl: this.webAbsoluteUrl,
      listId: this.listId,
      orderBy: this.orderBy,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      viewsToExclude: this.viewsToExclude,
      filter: this.filter,
      onViewsRetrieved: this.onViewsRetrieved
    };

      // Single selector
      componentProps['selectedView'] = this.selectedView;
      const element: React.ReactElement<IPropertyFieldViewPickerHostProps> = React.createElement(PropertyFieldViewPickerHost, componentProps);
      // Calls the REACT content generator
      ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private dispose(_elem: HTMLElement): void {

  }

}

/**
 * Helper method to create a SPView Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint view picker is associated to.
 * @param properties - Strongly typed SPView Picker properties.
 */
export function PropertyFieldViewPicker(targetProperty: string, properties: IPropertyFieldViewPickerProps): IPropertyPaneField<IPropertyFieldViewPickerPropsInternal> {
  //Create an internal properties object from the given properties
  const newProperties: IPropertyFieldViewPickerPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    context: properties.context,
    listId: properties.listId,
    selectedView: typeof properties.selectedView === 'string' ? properties.selectedView : null,
    onPropertyChange: properties.onPropertyChange,
    properties: properties.properties,
    onDispose: null,
    onRender: null,
    key: properties.key,
    disabled: properties.disabled,
    viewsToExclude: properties.viewsToExclude,
    filter: properties.filter,
    onGetErrorMessage: properties.onGetErrorMessage,
    deferredValidationTime: properties.deferredValidationTime,
    onViewsRetrieved: properties.onViewsRetrieved
  };
  //Calls the PropertyFieldViewPicker builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldViewPickerBuilder(targetProperty, newProperties);
}
