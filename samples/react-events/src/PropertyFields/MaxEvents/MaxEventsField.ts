import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IMaxEventsInternalProps, IMaxEventsComponentProps } from '../../models/IMaxEventsProps';
import MaxEventsHost from './MaxEventsHost';

class PropertyPaneMaxEventsBuilder
  implements IPropertyPaneField<IMaxEventsInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IMaxEventsInternalProps;

  constructor(targetProperty: string, properties: IMaxEventsComponentProps) {
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
      React.createElement(MaxEventsHost, this.properties),
      elem
    );
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneMaxEvents(
  targetProperty: string,
  properties: IMaxEventsComponentProps
): IPropertyPaneField<IMaxEventsInternalProps> {
  return new PropertyPaneMaxEventsBuilder(targetProperty, properties);
}
