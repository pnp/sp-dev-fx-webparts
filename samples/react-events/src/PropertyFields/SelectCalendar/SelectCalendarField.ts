import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import {
  ISelectCalendarInternalProps,
  ISelectCalendarComponentProps,
} from '../../models/ISelectCalendarProps';
import SelectCalendarHost from './SelectCalendarHost';

class PropertyPaneSelectCalendarBuilder
  implements IPropertyPaneField<ISelectCalendarInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: ISelectCalendarInternalProps;

  constructor(targetProperty: string, properties: ISelectCalendarComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(React.createElement(SelectCalendarHost, this.properties), elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneSelectCalendar(
  targetProperty: string,
  properties: ISelectCalendarComponentProps
): IPropertyPaneField<ISelectCalendarInternalProps> {
  return new PropertyPaneSelectCalendarBuilder(targetProperty, properties);
}
