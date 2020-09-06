import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  IPropertyPaneToggleProps
} from "@microsoft/sp-property-pane";

import * as strings from "DirectoryWebPartStrings";
import Directory from "./components/Directory";
import { IDirectoryProps } from "./components/IDirectoryProps";

export interface IDirectoryWebPartProps {
  title: string;
  searchFirstName: boolean;
}

export default class DirectoryWebPart extends BaseClientSideWebPart<
  IDirectoryWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IDirectoryProps> = React.createElement(
      Directory,
      {
        title: this.properties.title,
        context: this.context,
        searchFirstName: this.properties.searchFirstName,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneToggle("searchFirstName", {
                  checked: false,
                  label: "Search on First Name ?"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
