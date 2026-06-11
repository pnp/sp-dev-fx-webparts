import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IShowLocationInternalProps, IShowLocationComponentProps } from '../../models/IShowLocationProps';
import ShowLocationHost from './ShowLocationHost';

class PropertyPaneShowLocationBuilder implements IPropertyPaneField<IShowLocationInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowLocationInternalProps;

  constructor(targetProperty: string, properties: IShowLocationComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = { ...properties, onRender: this.onRender.bind(this), onDispose: this.onDispose.bind(this), key: targetProperty };
  }

  private onRender(elem: HTMLElement): void { ReactDOM.render(React.createElement(ShowLocationHost, this.properties), elem); }
  private onDispose(elem: HTMLElement): void { ReactDOM.unmountComponentAtNode(elem); }
}

export function PropertyPaneShowLocation(targetProperty: string, properties: IShowLocationComponentProps): IPropertyPaneField<IShowLocationInternalProps> {
  return new PropertyPaneShowLocationBuilder(targetProperty, properties);
}
