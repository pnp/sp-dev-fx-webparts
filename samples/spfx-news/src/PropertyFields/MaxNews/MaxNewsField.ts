import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IMaxNewsInternalProps, IMaxNewsComponentProps } from '../../models/IMaxNewsProps';
import MaxNewsHost from './MaxNewsHost';

class PropertyPaneMaxNewsBuilder
  implements IPropertyPaneField<IMaxNewsInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IMaxNewsInternalProps;

  constructor(targetProperty: string, properties: IMaxNewsComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(
      React.createElement(MaxNewsHost, this.properties),
      elem
    );
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneMaxNews(
  targetProperty: string,
  properties: IMaxNewsComponentProps
): IPropertyPaneField<IMaxNewsInternalProps> {
  return new PropertyPaneMaxNewsBuilder(targetProperty, properties);
}
