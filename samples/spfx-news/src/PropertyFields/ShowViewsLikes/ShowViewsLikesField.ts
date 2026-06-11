import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IShowViewsLikesComponentProps, IShowViewsLikesInternalProps } from '../../models/IShowViewsLikesProps';
import ShowViewsLikesHost from './ShowViewsLikesHost';

class PropertyPaneShowViewsLikesBuilder
  implements IPropertyPaneField<IShowViewsLikesInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowViewsLikesInternalProps;

  constructor(targetProperty: string, properties: IShowViewsLikesComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(React.createElement(ShowViewsLikesHost, this.properties), elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneShowViewsLikes(
  targetProperty: string,
  properties: IShowViewsLikesComponentProps,
): IPropertyPaneField<IShowViewsLikesInternalProps> {
  return new PropertyPaneShowViewsLikesBuilder(targetProperty, properties);
}
