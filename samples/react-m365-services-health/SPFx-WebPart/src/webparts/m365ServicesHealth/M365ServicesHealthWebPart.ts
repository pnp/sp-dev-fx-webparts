/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "M365ServicesHealthWebPartStrings";
import M365ServicesHealth from "./components/M365ServicesHealth";
import { IM365ServicesHealthProps } from "./components/IM365ServicesHealthProps";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
initializeIcons();
export interface IM365ServicesHealthWebPartProps {
  title: string;
  audience: string;
  apiBaseUrl: string;
}

export default class M365ServicesHealthWebPart extends BaseClientSideWebPart<IM365ServicesHealthWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IM365ServicesHealthProps> = React.createElement(M365ServicesHealth, {
      title: this.properties.title,
      context: this.context,

      apiBaseUrl: this.properties.apiBaseUrl,
      audience: this.properties.audience,
    });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return Promise.resolve();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === "title" && oldValue !== newValue) {
      this.properties.title = newValue;
    } else if (propertyPath === "apiBaseUrl" && oldValue !== newValue) {
      this.properties.apiBaseUrl = newValue;
    } else if (propertyPath === "audience" && oldValue !== newValue) {
      this.properties.audience = newValue;
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleFieldLabel,
                }),
                PropertyPaneTextField("apiBaseUrl", {
                  label: "API Base URL",
                }),
                PropertyPaneTextField("audience", {
                  label: "Audience",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
