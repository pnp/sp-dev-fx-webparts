import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IShowMetaInternalProps, IShowMetaComponentProps } from '../../models/IShowMetaProps';
import ShowMetaHost from './ShowMetaHost';

class PropertyPaneShowMetaBuilder implements IPropertyPaneField<IShowMetaInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowMetaInternalProps;

  constructor(targetProperty: string, properties: IShowMetaComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = { ...properties, onRender: this.onRender.bind(this), onDispose: this.onDispose.bind(this), key: targetProperty };
  }

  private onRender(elem: HTMLElement): void { ReactDOM.render(React.createElement(ShowMetaHost, this.properties), elem); }
  private onDispose(elem: HTMLElement): void { ReactDOM.unmountComponentAtNode(elem); }
}

export function PropertyPaneShowMeta(targetProperty: string, properties: IShowMetaComponentProps): IPropertyPaneField<IShowMetaInternalProps> {
  return new PropertyPaneShowMetaBuilder(targetProperty, properties);
}
