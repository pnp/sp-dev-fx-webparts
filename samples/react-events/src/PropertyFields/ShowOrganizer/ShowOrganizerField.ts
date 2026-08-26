import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IShowOrganizerInternalProps, IShowOrganizerComponentProps } from '../../models/IShowOrganizerProps';
import ShowOrganizerHost from './ShowOrganizerHost';

class PropertyPaneShowOrganizerBuilder implements IPropertyPaneField<IShowOrganizerInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IShowOrganizerInternalProps;

  constructor(targetProperty: string, properties: IShowOrganizerComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = { ...properties, onRender: this.onRender.bind(this), onDispose: this.onDispose.bind(this), key: targetProperty };
  }

  private onRender(elem: HTMLElement): void { ReactDOM.render(React.createElement(ShowOrganizerHost, this.properties), elem); }
  private onDispose(elem: HTMLElement): void { ReactDOM.unmountComponentAtNode(elem); }
}

export function PropertyPaneShowOrganizer(targetProperty: string, properties: IShowOrganizerComponentProps): IPropertyPaneField<IShowOrganizerInternalProps> {
  return new PropertyPaneShowOrganizerBuilder(targetProperty, properties);
}
