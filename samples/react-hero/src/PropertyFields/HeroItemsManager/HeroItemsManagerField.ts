import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from "@microsoft/sp-property-pane";
import { IHeroItem } from "@spteck/react-controls-v2";
import { HeroItemsManagerHost } from "./HeroItemsManagerHost";
import { IHeroItemsManagerInternalProps } from "../../models/IHeroItemsManagerProps";

class HeroItemsManagerBuilder implements IPropertyPaneField<IHeroItemsManagerInternalProps> {
  public readonly type = PropertyPaneFieldType.Custom;
  public readonly targetProperty: string;
  public properties: IHeroItemsManagerInternalProps;

  private _domElement: HTMLElement | undefined;

  constructor(
    targetProperty: string,
    properties: IHeroItemsManagerInternalProps,
  ) {
    this.targetProperty = targetProperty;
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

    ReactDOM.render(
      React.createElement(HeroItemsManagerHost, {
        items: this.properties.items,
        theme: this.properties.theme,
        hostType: this.properties.hostType,
        onStructuralChange: (newItems: IHeroItem[]) => {
          this.properties.onStructuralChange(this.targetProperty, newItems);
        },
        onDetailChange: (newItems: IHeroItem[]) => {
          this.properties.onDetailChange(this.targetProperty, newItems);
        },
        resolveUrl: this.properties.resolveUrl,
      }),
      this._domElement,
    );
  }

  private _onDispose = (domElement: HTMLElement): void => {
    ReactDOM.unmountComponentAtNode(domElement);
  };
}

export function PropertyPaneHeroItemsManager(
  targetProperty: string,
  properties: Omit<
    IHeroItemsManagerInternalProps,
    "onRender" | "onDispose" | "key"
  >,
): IPropertyPaneField<IHeroItemsManagerInternalProps> {
  return new HeroItemsManagerBuilder(targetProperty, {
    key: `hero-items-manager-${targetProperty}`,
    ...properties,
  } as IHeroItemsManagerInternalProps);
}
