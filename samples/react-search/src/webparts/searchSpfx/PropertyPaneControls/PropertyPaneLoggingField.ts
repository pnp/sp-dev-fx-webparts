import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
	IPropertyPaneField,
	IPropertyPaneFieldType
} from '@microsoft/sp-client-preview';

import { IPropertyPaneLoggingFieldProps } from './IPropertyPaneLoggingFieldProps';
import PropertyPaneLoggingFieldHost, { IPropertyPaneLoggingFieldHostProps } from './PropertyPaneLoggingFieldHost';

export interface IPropertyPaneLoggingFieldPropsInternal extends IPropertyPaneLoggingFieldProps {
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
}

class PropertyPaneLoggingFieldBuilder implements IPropertyPaneField<IPropertyPaneLoggingFieldPropsInternal> {
	// Properties defined by IPropertyPaneField
	public type: IPropertyPaneFieldType = IPropertyPaneFieldType.Custom;
	public targetProperty: string = undefined;
	public properties: IPropertyPaneLoggingFieldPropsInternal;

    // Logging properties
    private label: string;
    private description: string;
    private value: any;
    private retrieve: Function;

	public constructor(props: IPropertyPaneLoggingFieldPropsInternal) {
		this.properties = props;
		this.properties.onDispose = this.dispose;
		this.properties.onRender = this.render;

		this.label = props.label;
		this.value = props.value;
		this.description = props.description;
		this.retrieve = props.retrieve;
	}

    /**
	 * @function
	 * Render the logging element
	 */
	private render(elm: HTMLElement): void {
		// Construct the JSX properties
		const element: React.ReactElement<IPropertyPaneLoggingFieldHostProps> = React.createElement(PropertyPaneLoggingFieldHost, {
			label: this.label,
			value: this.value,
			description: this.description,
			retrieve: this.retrieve,
			onDispose: this.dispose,
			onRender: this.render
		});

		// Calls the REACT content generator
		ReactDom.render(element, elm);
	}

	/**
	 * @function
	 * Disposes the current object
	 */
	private dispose(elem: HTMLElement): void {}
}


export function PropertyPaneLoggingField(properties: IPropertyPaneLoggingFieldProps): IPropertyPaneField<IPropertyPaneLoggingFieldPropsInternal> {
    // Create an internal properties object from the given properties
    var newProperties: IPropertyPaneLoggingFieldPropsInternal = {
        label: properties.label,
        description: properties.description,
        value: properties.value,
		retrieve: properties.retrieve,
		onDispose: null,
        onRender: null
    };

    // Calles the PropertyPaneLoggingField builder object
    // This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyPaneLoggingFieldBuilder(newProperties);
}