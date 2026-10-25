import * as React from "react";
import * as ReactDom from "react-dom";
import {
  PropertyPaneFieldType,
  type IPropertyPaneCustomFieldProps,
  type IPropertyPaneField
} from "@microsoft/sp-property-pane";
import { PageOwnerPicker, type IPageOwnerPickerProps } from "./PageOwnerPicker";

export function PropertyPanePageOwner(properties: IPageOwnerPickerProps): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  return {
    type: PropertyPaneFieldType.Custom,
    targetProperty: "pageOwnerLoginName",
    properties: {
      key: "PageTrustOwnerPicker",
      onRender: (domElement: HTMLElement): void => {
        const element: React.ReactElement = React.createElement(PageOwnerPicker, properties);
        ReactDom.render(element, domElement);
      },
      onDispose: (domElement: HTMLElement): void => {
        ReactDom.unmountComponentAtNode(domElement);
      }
    }
  };
}
