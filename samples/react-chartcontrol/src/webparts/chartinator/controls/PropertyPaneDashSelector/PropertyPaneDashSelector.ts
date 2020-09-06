import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";

import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

import { IDashSelectorProps } from './components/DashSelector.types';
import DashSelector from './components/DashSelector';
import {
  IPropertyPaneDashSelectorProps,
  IPropertyPaneDashSelectorInternalProps,
} from '.';

/**
 * Dash selector control for property panes
 */
class PropertyPaneDashSelectorBuilder implements IPropertyPaneField<IPropertyPaneDashSelectorProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyPaneDashSelectorInternalProps;
  private element: HTMLElement;

  constructor(public targetProperty: string, properties: IPropertyPaneDashSelectorProps) {
    this.properties = {
      key: properties.label,
      label: properties.label,
      disabled: properties.disabled,
      selectedKey: properties.selectedKey,
      onPropertyChange: properties.onPropertyChange,
      onRender: this.onRender.bind(this),
      options: properties.options
    };
  }

  public render(): void {
    if (!this.element) {
      return;
    }
  }

  /**
   * Render's the control
   * @param element
   */
  private onRender(element: HTMLElement): void {
    if (!this.element) {
      this.element = element;
    }

    // render the palette selector
    const reactElement: React.ReactElement<IDashSelectorProps> = React.createElement(DashSelector, <IDashSelectorProps>{
      label: this.properties.label,
      onChanged: (option: IDropdownOption, index?: number) => this.handleChange(option, index),
      selectedKey: this.properties.selectedKey,
      disabled: this.properties.disabled,
      options: this.properties.options,
      stateKey: new Date().toString() // hack to allow for externally triggered re-rendering
    });

    ReactDom.render(reactElement, element);
  }

  /**
   * On changed call handler
   * @param option
   * @param index
   */
  private handleChange(option: IDropdownOption, index?: number): void {
    this.properties.onPropertyChange(this.targetProperty, option.key);
  }
}

export function PropertyPaneDashSelector(targetProperty: string, properties: IPropertyPaneDashSelectorProps): IPropertyPaneField<IPropertyPaneDashSelectorInternalProps> {
  return new PropertyPaneDashSelectorBuilder(targetProperty, {
    ...properties,
  });
}
