import * as React from "react";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from "@microsoft/sp-property-pane";
import * as ReactDOM from "react-dom";

import type { IGanttListPickerProps } from "./IGanttListPickerProps";
import { GanttListPicker } from "./GanttListPicker";
import type { IPropertyPaneGanttListPickerProps } from "./IPropertyPaneGanttListPickerProps";

export class PropertyPaneGanttListPicker
  implements IPropertyPaneField<IPropertyPaneGanttListPickerProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneGanttListPickerProps & {
    key?: string;
    onRender?: (elem: HTMLElement) => void;
    onDispose?: (elem: HTMLElement) => void;
  };

  constructor(
    targetProperty: string,
    properties: IPropertyPaneGanttListPickerProps
  ) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.key,
      label: properties.label,
      selectedListId: properties.selectedListId,
      selectedSiteUrl: properties.selectedSiteUrl,
      fieldMappings: properties.fieldMappings,
      visibleColumns: properties.visibleColumns,
      onPropertyChange: properties.onPropertyChange,
      disabled: properties.disabled,
      spHttpClient: properties.spHttpClient,
      siteUrl: properties.siteUrl,
      theme: properties.theme,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
    };
  }

  private onRender(elem: HTMLElement): void {
    const element: React.ReactElement<IGanttListPickerProps> =
      React.createElement(GanttListPicker, {
        label: this.properties.label,
        selectedListId: this.properties.selectedListId,
        selectedSiteUrl: this.properties.selectedSiteUrl,
        fieldMappings: this.properties.fieldMappings,
        visibleColumns: this.properties.visibleColumns,
        onPropertyChange: this.properties.onPropertyChange,
        disabled: this.properties.disabled,
        targetProperty: this.targetProperty,
        spHttpClient: this.properties.spHttpClient,
        siteUrl: this.properties.siteUrl,
        theme: this.properties.theme,
      });

    ReactDOM.render(element, elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneGanttListPickerField(
  targetProperty: string,
  properties: IPropertyPaneGanttListPickerProps
): IPropertyPaneField<IPropertyPaneGanttListPickerProps> {
  return new PropertyPaneGanttListPicker(targetProperty, properties);
}
