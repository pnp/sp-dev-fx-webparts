import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";

import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "InstagramFeedWebPartStrings";
import InstagramFeed from "./components/InstagramFeed";
import { IInstagramFeedProps } from "./components/IInstagramFeedProps";

export interface IInstagramFeedWebPartProps {
  userToken: string;
  showIcon: boolean;
  userFullName: string;
  accountName: string;
  layoutOneThirdRight: boolean;
}

export default class InstagramFeedWebPart extends BaseClientSideWebPart<IInstagramFeedWebPartProps> {
  private _rootElement: HTMLElement;

  public render(): void {
    const element: React.ReactElement<IInstagramFeedProps> =
      React.createElement(InstagramFeed, {
        userToken: this.properties.userToken,
        showIcon: this.properties.showIcon,
        userFullName: this.properties.userFullName,
        accountName: this.properties.accountName,
        layoutOneThirdRight: this.properties.layoutOneThirdRight,
      });

    if (!this._rootElement) {
      this._rootElement = document.createElement("div");
      this.domElement.appendChild(this._rootElement);
    }

    ReactDom.render(element, this._rootElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this._rootElement);
    this._rootElement.remove();
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("userToken", {
                  label: strings.UsertokenFieldLabel
                    ? strings.UsertokenFieldLabel
                    : strings.DefaultUsertoken,
                }),
                PropertyPaneTextField("userFullName", {
                  label: "User Full Name :",
                }),
                PropertyPaneTextField("accountName", {
                  label: "Account Name : ",
                }),
                PropertyPaneToggle("showIcon", {
                  label: strings.ShowIconToggleLabel,
                  onText: strings.ShowIconToggleTrueLabel,
                  offText: strings.ShowIconToggleFalseLabel,
                }),
                PropertyPaneToggle("layoutOneThirdRight", {
                  label: "Layout One-Third Right",
                  onText: "open",
                  offText: "close",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
