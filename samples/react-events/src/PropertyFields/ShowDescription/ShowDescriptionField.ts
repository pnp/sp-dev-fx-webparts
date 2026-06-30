import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IShowDescriptionInternalProps, IShowDescriptionComponentProps } from '../../models/IShowDescriptionProps';
import ShowDescriptionHost from './ShowDescriptionHost';

class PropertyPaneShowDescriptionBuilder implements IPropertyPaneField<IShowDescriptionInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowDescriptionInternalProps;

  constructor(targetProperty: string, properties: IShowDescriptionComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = { ...properties, onRender: this.onRender.bind(this), onDispose: this.onDispose.bind(this), key: targetProperty };
  }

  private onRender(elem: HTMLElement): void { ReactDOM.render(React.createElement(ShowDescriptionHost, this.properties), elem); }
  private onDispose(elem: HTMLElement): void { ReactDOM.unmountComponentAtNode(elem); }
}

export function PropertyPaneShowDescription(targetProperty: string, properties: IShowDescriptionComponentProps): IPropertyPaneField<IShowDescriptionInternalProps> {
  return new PropertyPaneShowDescriptionBuilder(targetProperty, properties);
}
