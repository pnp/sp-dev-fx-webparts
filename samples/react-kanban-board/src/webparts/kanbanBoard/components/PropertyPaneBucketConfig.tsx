/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-property-pane';

import {KanbanBucketConfigurator,  IKanbanBucketConfiguratorProps } from '../../../kanban';
import { IKanbanBucket } from '../../../kanban/IKanbanBucket';

export interface IPropertyPaneBucketConfig {
    key: string;
    properties: IKanbanBucket;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
}

export interface IPropertyPaneBucketConfigInternal extends IPropertyPaneBucketConfig {
    targetProperty: string;
    onRender(elem: HTMLElement, ctx:any, changeCallback:(targetProperty: string, value: any) => void): void;
    onDispose(elem: HTMLElement): void;
    onChanged(targetProperty: string, value: IKanbanBucket): void;
}




class PropertyPaneBucketConfigBuilder implements IPropertyPaneField<IPropertyPaneBucketConfigInternal> {
    // Properties defined by IPropertyPaneField
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneBucketConfigInternal;
    private elem: HTMLElement;
    // Custom properties
    private customProperties: any;
    private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyPaneBucketConfigInternal) {

        this.customProperties = _properties.properties;
        this.targetProperty = _targetProperty;
        this.onPropertyChange = _properties.onPropertyChange;
        this.properties = _properties;
        this.properties.onRender = this.render.bind(this);
        this.properties.onDispose = this.dispose;
    }

    private render(elem: HTMLElement, ctx?:any, changeCallback?: (targetProperty: string, value: any) => void): void {
        if (!this.elem) {
            this.elem = elem;
        }
        const configprops: IKanbanBucketConfiguratorProps = {
            index: 1,
            bucket: this.customProperties,
            update: this.saveBucketConfig.bind(this)
        };
        const element: React.ReactElement<IKanbanBucketConfiguratorProps> = React.createElement(KanbanBucketConfigurator,
            { ...configprops }

        );
        ReactDom.render(element, elem);
    }
    private saveBucketConfig(index: number, value: IKanbanBucket): void {
        if (this.onPropertyChange) {
            this.onPropertyChange(this.targetProperty, this.customProperties, value);
        }
    }
    private dispose(elem: HTMLElement): void {
        ReactDom.unmountComponentAtNode(elem);
     }
}

export default function PropertyPaneBucketConfigComponent(targetProperty: string, properties: IPropertyPaneBucketConfig):
    IPropertyPaneField<IPropertyPaneBucketConfigInternal> {
    const newProperties: IPropertyPaneBucketConfigInternal = {
        key: properties.key,
        properties: properties.properties,
        targetProperty: targetProperty,
        onPropertyChange: properties.onPropertyChange,
        onDispose: () =>{ return null },
        onRender: () =>{ return null },
        onChanged: () =>{ return null }
    };
    return new PropertyPaneBucketConfigBuilder(targetProperty, newProperties);
}