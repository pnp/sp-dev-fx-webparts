import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldRepeatingDataProps, IPropertyFieldRepeatingDataPropsInternal } from "./PropertyFieldRepeatingData.types";
import { IPropertyFieldRepeatingDataHostProps } from './PropertyFieldRepeatingData.types';
import PropertyFieldRepeatingNumberDataHost from './PropertyFieldRepeatingDataHost';

class PropertyFieldRepeatingDataBuilder implements IPropertyPaneField<IPropertyFieldRepeatingDataProps> {

  //Properties defined by IPropertyPaneField
	public targetProperty: string;
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public properties: IPropertyFieldRepeatingDataPropsInternal;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyFieldRepeatingDataProps) {
		this.properties = {
      key: _properties.key,
      data: _properties.data,
      chartType: _properties.chartType,
      onRender: this.onRender.bind(this),
      //onChanged: (id: string, dataElem: string, value: any) => _properties.onChanged(id, dataElem, value),
      onDataChanged: (data: any) => _properties.onDataChanged(data)
		};
	}

	public render(): void {
		if (!this.elem) {
			return;
		}
		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
		if (!this.elem) {
			this.elem = elem;
		}

		const element: React.ReactElement<IPropertyFieldRepeatingDataHostProps> = React.createElement(PropertyFieldRepeatingNumberDataHost, {
      data: this.properties.data,
      chartType: this.properties.chartType,
      //onChanged: (id: string, dataElem: string, value: any) => this.properties.onChanged(id, dataElem, value),
      onDataChanged: (data: any) => this.properties.onDataChanged(data)
		});
		ReactDom.render(element, elem);
	}
}

export function PropertyFieldRepeatingData(properties: IPropertyFieldRepeatingDataProps): IPropertyPaneField<IPropertyFieldRepeatingDataProps> {
	return new PropertyFieldRepeatingDataBuilder(properties);
}
