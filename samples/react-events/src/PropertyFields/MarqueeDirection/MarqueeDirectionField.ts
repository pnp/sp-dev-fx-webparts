import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IMarqueeDirectionInternalProps, IMarqueeDirectionComponentProps } from '../../models/IMarqueeDirectionProps';
import MarqueeDirectionHost from './MarqueeDirectionHost';

class PropertyPaneMarqueeDirectionBuilder
  implements IPropertyPaneField<IMarqueeDirectionInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IMarqueeDirectionInternalProps;

  constructor(targetProperty: string, properties: IMarqueeDirectionComponentProps) {
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
      React.createElement(MarqueeDirectionHost, this.properties),
      elem
    );
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneMarqueeDirection(
  targetProperty: string,
  properties: IMarqueeDirectionComponentProps
): IPropertyPaneField<IMarqueeDirectionInternalProps> {
  return new PropertyPaneMarqueeDirectionBuilder(targetProperty, properties);
}
