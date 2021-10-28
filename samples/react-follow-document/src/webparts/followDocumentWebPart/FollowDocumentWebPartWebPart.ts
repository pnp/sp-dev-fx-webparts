import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { initializeIcons } from "office-ui-fabric-react";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "FollowDocumentWebPartWebPartStrings";
import FollowDocumentWebPart from "./components/FollowDocumentWebPart";
import { IFollowDocumentWebPartProps } from "./components/IFollowDocumentWebPartProps";

export interface IFollowDocumentWebPartWebPartProps {
  Title: string;
}

export default class FollowDocumentWebPartWebPart extends BaseClientSideWebPart<IFollowDocumentWebPartWebPartProps> {
  protected onInit() {
    if (this.context.sdks.microsoftTeams) initializeIcons();
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IFollowDocumentWebPartProps> =
      React.createElement(FollowDocumentWebPart, {
        title: this.properties.Title,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.Title = value;
        },
      });

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField("Title", {
                  label: strings.TitleFieldLabel,
                  value: strings.TitleFieldValue,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
