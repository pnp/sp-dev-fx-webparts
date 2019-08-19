import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import { IPropertyPaneTaxonomyPickerProps } from './IPropertyPaneTaxonomyPickerProps';
import { IPropertyPaneTaxonomyPickerInternalProps } from './IPropertyPaneTaxonomyPickerInternalProps';

import TaxonomyPickerLoader from "./components/TaxonomyPickerLoader";
import { ITaxonomyPickerLoaderProps } from "./components/ITaxonomyPickerLoaderProps";


class PropertyPaneTaxonomyPickerBuilder implements IPropertyPaneField<IPropertyPaneTaxonomyPickerInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneTaxonomyPickerInternalProps;

  public constructor(targetProperty: string, properties: IPropertyPaneTaxonomyPickerProps) {
    this.properties = {
      ...properties,
      onRender: this.render,
      onDispose: this.dispose
    };
  }

  /**
   * @function
   * Render the logging element
   */
  public render = (elem: HTMLElement): void => {
    const element: React.ReactElement<ITaxonomyPickerLoaderProps> = React.createElement(TaxonomyPickerLoader, {
      ...this.properties,

    });
    ReactDom.render(element, elem);
  }

  private dispose(elem: HTMLElement): void { }


}

export function PropertyPaneTaxonomyPicker(targetProperty: string, properties: IPropertyPaneTaxonomyPickerProps): IPropertyPaneField<IPropertyPaneTaxonomyPickerInternalProps> {
  // create an internal properties object from the given properties
  var newProperties: IPropertyPaneTaxonomyPickerInternalProps = {
    ...properties,
    onDispose: null,
    onRender: null
  };

  // calles the PropertyPaneLoggingField builder object
  // this object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyPaneTaxonomyPickerBuilder(targetProperty, newProperties);
}
