import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { IPropertyPaneColorPickerProps } from './IPropertyPaneColorPickerProps';
import { IPropertyPaneColorPickerInternalProps } from './IPropertyPaneColorPickerInternalProps';
import ColorPickerCtrl from './components/ColorPickerCtrl';
import { IColorPickerCtrlProps } from './components/IColorPickerCtrlProps';

export class PropertyPaneColorPicker implements IPropertyPaneField<IPropertyPaneColorPickerProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneColorPickerInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneColorPickerProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: "custom",
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            selectedColor: properties.selectedColor,
            onRender: this.onRender.bind(this)
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<IColorPickerCtrlProps> = React.createElement(ColorPickerCtrl, {
            label: this.properties.label,
            onColorChanged: this.onColorChanged.bind(this),
            color: this.properties.selectedColor
        });
        ReactDom.render(element, elem);
    }

    private onColorChanged(color: string): void {
        this.properties.onPropertyChange(this.targetProperty, color);
    }
}