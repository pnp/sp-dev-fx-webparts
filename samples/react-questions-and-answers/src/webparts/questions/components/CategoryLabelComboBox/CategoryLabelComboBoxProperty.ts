import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,PropertyPaneFieldType
  } from '@microsoft/sp-property-pane';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import CategoryLabelComboBox, { ICategoryLabelComboBoxProps } from './CategoryLabelComboBox';

export interface CategoryLabelComboBoxInternalProps extends  IPropertyPaneCustomFieldProps {
  onRender: any;
  label: string;
  category: string;
  showTooltip: boolean;
  tooltipText: string;
  /**
	 * Defines an onPropertyChange function to raise when the selected value changes.
	 * Normally this function must be defined with the 'this.onPropertyChange'
	 * method of the web part object.
	 */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
	 * Parent Web Part properties
	 */
	properties: any;
}

export class CategoryLabelComboBoxProperty implements IPropertyPaneField<CategoryLabelComboBoxInternalProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: CategoryLabelComboBoxInternalProps;
  private elem: HTMLElement;

  constructor(targetProperty: string, properties: CategoryLabelComboBoxInternalProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.key,
      label: properties.label,
      category: properties.category,
      showTooltip: properties.showTooltip,
      tooltipText: properties.tooltipText,
      onPropertyChange: properties.onPropertyChange,
      properties: properties.properties,
      onRender: this.onRender.bind(this)
    };
  }

  public render(): void {
    if (!this.elem) {return;}
    this.onRender(this.elem);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {this.elem = elem;}
      //Render the property in our PropertyPane
      const element: React.ReactElement<ICategoryLabelComboBoxProps> = React.createElement(CategoryLabelComboBox, {
        key: this.properties.key,
        label: this.properties.label,
        selectedCategory: this.properties.category,
        maxFillInLength: 50,
        showTooltip: this.properties.showTooltip,
        tooltipText: this.properties.tooltipText,
        onCategoryChanged: this.onCategoryChanged.bind(this)
      });
    ReactDom.render(element, elem);
  }

  private onCategoryChanged(cat: string | undefined): void {
    if (this.properties !== undefined) {
      if (this.properties.onPropertyChange && cat !== null) {
        this.properties.onPropertyChange(this.targetProperty, '', cat);
        this.properties.properties[this.targetProperty] = cat;
      }
    }
  }
}
