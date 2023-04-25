import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "FeedbackWebPartStrings";
import Feedback from "./components/feedback/Feedback";
import { getSP } from "../../pnpjsConfig";

export interface IFeedbackWebPartProps {
  description: string;
}

export default class FeedbackWebPart extends BaseClientSideWebPart<IFeedbackWebPartProps> {
  public static user: string;
  public static pageUrl: string;

  public render(): void {
    const element: React.ReactElement = React.createElement(Feedback);
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    super.onInit();
    FeedbackWebPart.user = this.context.pageContext.user.loginName;
    FeedbackWebPart.pageUrl =
      this.context.pageContext.legacyPageContext["serverRequestPath"];
    getSP(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
