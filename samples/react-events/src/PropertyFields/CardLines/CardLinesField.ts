import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { ICardLinesInternalProps, ICardLinesComponentProps } from '../../models/ICardLinesProps';
import CardLinesHost from './CardLinesHost';

class PropertyPaneCardLinesBuilder
  implements IPropertyPaneField<ICardLinesInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: ICardLinesInternalProps;

  constructor(targetProperty: string, properties: ICardLinesComponentProps) {
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
      React.createElement(CardLinesHost, this.properties),
      elem
    );
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneCardLines(
  targetProperty: string,
  properties: ICardLinesComponentProps
): IPropertyPaneField<ICardLinesInternalProps> {
  return new PropertyPaneCardLinesBuilder(targetProperty, properties);
}
