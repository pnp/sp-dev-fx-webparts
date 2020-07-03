import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";

import { IPropertyFieldRepeatingDataProps } from "./PropertyFieldRepeatingData.types";
import { IPropertyFieldRepeatingDataHostProps } from './PropertyFieldRepeatingData.types';
import PropertyFieldRepeatingNumberDataHost from './PropertyFieldRepeatingDataHost';
import { IPropertyFieldRepeatingDataInternalProps } from './IPropertyFieldRepeatingDataInternalProps';

/**
 * Handles entering repeating rows of data
 */
class PropertyFieldRepeatingDataBuilder implements IPropertyPaneField<IPropertyFieldRepeatingDataProps> {

  //Properties defined by IPropertyPaneField
	public targetProperty: string;
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public properties: IPropertyFieldRepeatingDataInternalProps;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyFieldRepeatingDataProps) {
		this.properties = {
      key: _properties.key,
      data: _properties.data,
      chartType: _properties.chartType,
      onRender: this.onRender.bind(this),
      onDataChanged: (data: any) => _properties.onDataChanged(data)
		};
	}

	public render(): void {
		if (!this.elem) {
			return;
		}
		this.onRender(this.elem);
	}

  /** Renders the repeating data control */
	private onRender(elem: HTMLElement, _ctx?: any, _changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
		if (!this.elem) {
			this.elem = elem;
		}

		const element: React.ReactElement<IPropertyFieldRepeatingDataHostProps> = React.createElement(PropertyFieldRepeatingNumberDataHost, {
      data: this.properties.data,
      chartType: this.properties.chartType,
      onDataChanged: (data: any) => this.properties.onDataChanged(data)
		});
		ReactDom.render(element, elem);
	}
}

/**
 * Creates an instance of PropertyFieldRepeatingData
 * @param properties The IPropertyFieldRepeatingDataProps to configure the control
 */
export function PropertyFieldRepeatingData(properties: IPropertyFieldRepeatingDataProps): IPropertyPaneField<IPropertyFieldRepeatingDataProps> {
	return new PropertyFieldRepeatingDataBuilder(properties);
}
