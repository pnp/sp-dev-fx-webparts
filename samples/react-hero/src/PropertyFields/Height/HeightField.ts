import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from "@microsoft/sp-property-pane";
import { Height } from "./Height";
import {
  IHeightInternalProps,
  IHeightComponentProps,
} from "../../models/IHeightProps";

class HeightBuilder implements IPropertyPaneField<IHeightInternalProps> {
  public readonly type = PropertyPaneFieldType.Custom;
  public readonly targetProperty: string = "height";
  public properties: IHeightInternalProps;
  private _domElement: HTMLElement | undefined;

  constructor(properties: IHeightInternalProps) {
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
    const componentProps: IHeightComponentProps = {
      label: this.properties.label,
      value: this.properties.value,
      min: this.properties.min,
      max: this.properties.max,
      step: this.properties.step,
      theme: this.properties.theme,
      hostType: this.properties.hostType,
      className: this.properties.className,
      onChange: (newValue: number) => {
        this.properties.value = newValue;
        this._renderComponent();
        this.properties.onChange(newValue);
      },
    };
    ReactDOM.render(
      React.createElement(Height, componentProps),
      this._domElement,
    );
  }

  private _onDispose = (domElement: HTMLElement): void => {
    ReactDOM.unmountComponentAtNode(domElement);
  };
}

export function PropertyPaneHeight(
  properties: Omit<IHeightInternalProps, "onRender" | "onDispose" | "key">,
): IPropertyPaneField<IHeightInternalProps> {
  return new HeightBuilder({
    key: "height",
    ...properties,
  } as IHeightInternalProps);
}
