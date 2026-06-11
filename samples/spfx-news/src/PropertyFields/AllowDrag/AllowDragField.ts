import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IAllowDragComponentProps, IAllowDragInternalProps } from '../../models/IAllowDragProps';
import AllowDragHost from './AllowDragHost';

class PropertyPaneAllowDragBuilder
  implements IPropertyPaneField<IAllowDragInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IAllowDragInternalProps;

  constructor(targetProperty: string, properties: IAllowDragComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(React.createElement(AllowDragHost, this.properties), elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneAllowDrag(
  targetProperty: string,
  properties: IAllowDragComponentProps,
): IPropertyPaneField<IAllowDragInternalProps> {
  return new PropertyPaneAllowDragBuilder(targetProperty, properties);
}
