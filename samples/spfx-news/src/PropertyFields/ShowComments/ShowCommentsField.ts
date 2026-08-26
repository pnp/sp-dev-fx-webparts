import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IShowCommentsComponentProps, IShowCommentsInternalProps } from '../../models/IShowCommentsProps';
import ShowCommentsHost from './ShowCommentsHost';

class PropertyPaneShowCommentsBuilder
  implements IPropertyPaneField<IShowCommentsInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowCommentsInternalProps;

  constructor(targetProperty: string, properties: IShowCommentsComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(React.createElement(ShowCommentsHost, this.properties), elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneShowComments(
  targetProperty: string,
  properties: IShowCommentsComponentProps,
): IPropertyPaneField<IShowCommentsInternalProps> {
  return new PropertyPaneShowCommentsBuilder(targetProperty, properties);
}
