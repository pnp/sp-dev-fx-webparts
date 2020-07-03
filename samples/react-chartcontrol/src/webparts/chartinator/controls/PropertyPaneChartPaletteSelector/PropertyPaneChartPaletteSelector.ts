import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";

import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

import { IChartPaletteSelectorProps } from './components/ChartPaletteSelector.types';
import ChartPaletteSelector from './components/ChartPaletteSelector';
import {
  IPropertyPaneChartPaletteSelectorProps,
  IPropertyPaneChartPaletteSelectorInternalProps,
} from '.';

/**
 * Palette selector control for property panes
 */
export class PropertyPaneChartPaletteSelectorBuilder implements IPropertyPaneField<IPropertyPaneChartPaletteSelectorProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyPaneChartPaletteSelectorInternalProps;
  private element: HTMLElement;

  constructor(public targetProperty: string, properties: IPropertyPaneChartPaletteSelectorProps) {
    this.properties = {
      key: properties.label,
      label: properties.label,
      disabled: properties.disabled,
      options: properties.options,
      selectedKey: properties.selectedKey,
      onPropertyChange: properties.onPropertyChange,
      onRender: this.onRender.bind(this)
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
    const reactElement: React.ReactElement<IChartPaletteSelectorProps> = React.createElement(ChartPaletteSelector, <IChartPaletteSelectorProps>{
      label: this.properties.label,
      onChanged: (option: IDropdownOption, index?: number) => this.onChanged(option, index),
      options: this.properties.options,
      selectedKey: this.properties.selectedKey,
      disabled: this.properties.disabled,
      stateKey: new Date().toString() // hack to allow for externally triggered re-rendering
    });
    ReactDom.render(reactElement, element);
  }

  /**
   * On changed call handler
   * @param option
   * @param index
   */
  private onChanged(option: IDropdownOption, index?: number): void {
    this.properties.onPropertyChange(this.targetProperty, option.key);
  }
}

export function PropertyPaneChartPaletteSelector(targetProperty: string, properties: IPropertyPaneChartPaletteSelectorProps): IPropertyPaneField<IPropertyPaneChartPaletteSelectorInternalProps> {
  return new PropertyPaneChartPaletteSelectorBuilder(targetProperty, {
    ...properties,
  });
}

