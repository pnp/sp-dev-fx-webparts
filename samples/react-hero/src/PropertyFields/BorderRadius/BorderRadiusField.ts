import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from "@microsoft/sp-property-pane";
import { BorderRadius } from "./BorderRadius";
import {
  IBorderRadiusInternalProps,
  IBorderRadiusComponentProps,
} from "../../models/IBorderRadiusProps";

class BorderRadiusBuilder implements IPropertyPaneField<IBorderRadiusInternalProps> {
  public readonly type = PropertyPaneFieldType.Custom;
  public readonly targetProperty: string = "borderRadius";
  public properties: IBorderRadiusInternalProps;
  private _domElement: HTMLElement | undefined;

  constructor(properties: IBorderRadiusInternalProps) {
    this.properties = {
      ...properties,
      onRender: this._onRender,
      onDispose: this._onDispose,
    };
  }

  private _onRender = (domElement: HTMLElement): void => {
    this._domElement = domElement;
    this._renderComponent();
  };

  private _renderComponent(): void {
    if (!this._domElement) return;
    const componentProps: IBorderRadiusComponentProps = {
      label: this.properties.label,
      value: this.properties.value,
      theme: this.properties.theme,
      hostType: this.properties.hostType,
      onChange: (newValue: string) => {
        this.properties.value = newValue;
        this._renderComponent();
        this.properties.onChange(newValue);
      },
    };
    ReactDOM.render(
      React.createElement(BorderRadius, componentProps),
      this._domElement,
    );
  }

  private _onDispose = (domElement: HTMLElement): void => {
    ReactDOM.unmountComponentAtNode(domElement);
  };
}

export function PropertyPaneBorderRadius(
  properties: Omit<
    IBorderRadiusInternalProps,
    "onRender" | "onDispose" | "key"
  >,
): IPropertyPaneField<IBorderRadiusInternalProps> {
  return new BorderRadiusBuilder({
    key: "borderRadius",
    ...properties,
  } as IBorderRadiusInternalProps);
}
