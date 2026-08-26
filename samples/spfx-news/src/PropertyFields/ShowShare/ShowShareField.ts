import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IShowShareComponentProps, IShowShareInternalProps } from '../../models/IShowShareProps';
import ShowShareHost from './ShowShareHost';

class PropertyPaneShowShareBuilder
  implements IPropertyPaneField<IShowShareInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowShareInternalProps;

  constructor(targetProperty: string, properties: IShowShareComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(React.createElement(ShowShareHost, this.properties), elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneShowShare(
  targetProperty: string,
  properties: IShowShareComponentProps,
): IPropertyPaneField<IShowShareInternalProps> {
  return new PropertyPaneShowShareBuilder(targetProperty, properties);
}
