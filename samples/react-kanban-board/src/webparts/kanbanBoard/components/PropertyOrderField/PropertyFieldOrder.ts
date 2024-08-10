import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import * as React from 'react';
import * as ReactDom from 'react-dom';



import { IPropertyFieldOrderHostProps } from './IPropertyFieldOrderHost';
import PropertyFieldOrderHost from './PropertyFieldOrderHost';
import { IPropertyFieldOrderProps, IPropertyFieldOrderPropsInternal } from './IPropertyFieldOrder';
import { setPropertyValue } from './helper';


class PropertyFieldOrderBuilder implements IPropertyPaneField<IPropertyFieldOrderProps> {

    //Properties defined by IPropertyPaneField
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyFieldOrderPropsInternal;
    private elem: HTMLElement;
    private items: Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    private changeCB?: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

    public constructor(_targetProperty: string, _properties: IPropertyFieldOrderProps) {
        this.targetProperty = _targetProperty;
        this.properties = {
            key: _properties.key,
            label: _properties.label,
            onPropertyChange: _properties.onPropertyChange,
            disabled: _properties.disabled,
            properties: _properties.properties,
            items: _properties.items,
            textProperty: _properties.textProperty,
            moveUpIconName: _properties.moveUpIconName,
            moveDownIconName: _properties.moveDownIconName,
            disableDragAndDrop: _properties.disableDragAndDrop,
            removeArrows: _properties.removeArrows,
            maxHeight: _properties.maxHeight,
            onRenderItem: _properties.onRenderItem,
            onRender: this.onRender.bind(this)
        };
        this.items = _properties.items;
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }
   
    public onDispose(element: HTMLElement): void {
        ReactDom.unmountComponentAtNode(element);
      }

    private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!this.elem) {
            this.elem = elem;
        }
        this.changeCB = changeCallback;

        const element: React.ReactElement<IPropertyFieldOrderHostProps> = React.createElement(PropertyFieldOrderHost, {
            label: this.properties.label,
            disabled: this.properties.disabled ? this.properties.disabled : false,
            items: this.items,
            textProperty: this.properties.textProperty,
            moveUpIconName: this.properties.moveUpIconName || 'ChevronUpSmall',
            moveDownIconName: this.properties.moveDownIconName || 'ChevronDownSmall',
            disableDragAndDrop: this.properties.disableDragAndDrop ? this.properties.disableDragAndDrop : false,
            removeArrows: this.properties.removeArrows ? this.properties.removeArrows : false,
            maxHeight: this.properties.maxHeight,
            onRenderItem: this.properties.onRenderItem,
            valueChanged: this.onValueChanged.bind(this)
        });
        ReactDom.render(element, elem);
    }

    private onValueChanged(newValue: Array<any>): void { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (this.properties.onPropertyChange && newValue !== null) {
            this.properties.onPropertyChange(this.targetProperty, this.items, newValue);
            this.items = newValue;
            setPropertyValue(this.properties.properties, this.targetProperty, newValue);
            if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
                this.changeCB(this.targetProperty, newValue);
            }
        }
    }

}

export function PropertyFieldOrder(targetProperty: string, properties: IPropertyFieldOrderProps): IPropertyPaneField<IPropertyFieldOrderProps> {
    return new PropertyFieldOrderBuilder(targetProperty, properties);
}

