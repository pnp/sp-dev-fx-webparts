import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IShowAuthorDateComponentProps, IShowAuthorDateInternalProps } from '../../models/IShowAuthorDateProps';
import ShowAuthorDateHost from './ShowAuthorDateHost';

class PropertyPaneShowAuthorDateBuilder
  implements IPropertyPaneField<IShowAuthorDateInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowAuthorDateInternalProps;

  constructor(targetProperty: string, properties: IShowAuthorDateComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(React.createElement(ShowAuthorDateHost, this.properties), elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneShowAuthorDate(
  targetProperty: string,
  properties: IShowAuthorDateComponentProps,
): IPropertyPaneField<IShowAuthorDateInternalProps> {
  return new PropertyPaneShowAuthorDateBuilder(targetProperty, properties);
}
