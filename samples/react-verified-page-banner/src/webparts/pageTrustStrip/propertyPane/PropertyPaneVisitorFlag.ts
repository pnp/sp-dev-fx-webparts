import * as React from "react";
import * as ReactDom from "react-dom";
import {
  PropertyPaneFieldType,
  type IPropertyPaneCustomFieldProps,
  type IPropertyPaneField
} from "@microsoft/sp-property-pane";
import { VisitorFlagPane, type IVisitorFlagPaneProps } from "./VisitorFlagPane";

export function PropertyPaneVisitorFlag(properties: IVisitorFlagPaneProps): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  return {
    type: PropertyPaneFieldType.Custom,
    targetProperty: "visitorFlagAction",
    properties: {
      key: "PageTrustVisitorFlag",
      onRender: (domElement: HTMLElement): void => {
        const element: React.ReactElement = React.createElement(VisitorFlagPane, properties);
        ReactDom.render(element, domElement);
      },
      onDispose: (domElement: HTMLElement): void => {
        ReactDom.unmountComponentAtNode(domElement);
      }
    }
  };
}
