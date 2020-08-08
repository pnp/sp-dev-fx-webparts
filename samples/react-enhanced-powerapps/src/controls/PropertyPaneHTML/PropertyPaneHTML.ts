import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IPropertyPaneHTMLProps } from './IPropertyPaneHTMLProps';
import { IPropertyPaneHTMLInternalProps } from './IPropertyPaneHTMLInternalProps';
import PropertyPaneHTMLHost from './PropertyPaneHTMLHost';

export class PropertyPaneHTMLBuilder implements IPropertyPaneField<IPropertyPaneHTMLProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyPaneHTMLInternalProps;
  private elem: HTMLElement;
  public targetProperty: string;
  public shouldFocus?: boolean;

  constructor(properties: IPropertyPaneHTMLProps) {
    this.properties = {
        key: properties.key,
        html: properties.html,
        onRender: this.onRender.bind(this),
        onDispose: this.onDispose.bind(this)
    };
  }


  public render(): void {
    if (!this.elem) {
      return;
    }

    this.onRender(this.elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const content = {
      __dangerousHTML: this.properties.html
    };

    const element: React.ReactElement = React.createElement(PropertyPaneHTMLHost,{
      html: this.properties.html
    });
    ReactDom.render(element, elem);
  }
}

export function PropertyPaneHTML(properties: IPropertyPaneHTMLProps): IPropertyPaneField<IPropertyPaneHTMLProps> {
	return new PropertyPaneHTMLBuilder(properties);
}
