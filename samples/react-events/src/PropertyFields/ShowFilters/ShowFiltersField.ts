import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IShowFiltersInternalProps, IShowFiltersComponentProps } from '../../models/IShowFiltersProps';
import ShowFiltersHost from './ShowFiltersHost';

class PropertyPaneShowFiltersBuilder implements IPropertyPaneField<IShowFiltersInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowFiltersInternalProps;

  constructor(targetProperty: string, properties: IShowFiltersComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = { ...properties, onRender: this.onRender.bind(this), onDispose: this.onDispose.bind(this), key: targetProperty };
  }

  private onRender(elem: HTMLElement): void { ReactDOM.render(React.createElement(ShowFiltersHost, this.properties), elem); }
  private onDispose(elem: HTMLElement): void { ReactDOM.unmountComponentAtNode(elem); }
}

export function PropertyPaneShowFilters(targetProperty: string, properties: IShowFiltersComponentProps): IPropertyPaneField<IShowFiltersInternalProps> {
  return new PropertyPaneShowFiltersBuilder(targetProperty, properties);
}
