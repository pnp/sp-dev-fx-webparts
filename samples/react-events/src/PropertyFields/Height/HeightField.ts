import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IHeightInternalProps, IHeightComponentProps } from '../../models/IHeightProps';
import HeightHost from './HeightHost';

class PropertyPaneHeightBuilder
  implements IPropertyPaneField<IHeightInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IHeightInternalProps;

  constructor(targetProperty: string, properties: IHeightComponentProps) {
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
      React.createElement(HeightHost, this.properties),
      elem
    );
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneHeight(
  targetProperty: string,
  properties: IHeightComponentProps
): IPropertyPaneField<IHeightInternalProps> {
  return new PropertyPaneHeightBuilder(targetProperty, properties);
}
