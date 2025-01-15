import {
  BaseClientSideWebPart,
} from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from "@microsoft/sp-property-pane";
import * as React from "react";
import * as ReactDom from "react-dom";

import { IReactTeamsTabsgraphWebPartProps } from "./IReactTeamsTabsGraphWebPartProps";
import { IReactTeamsTabsgraphProps } from "./components/IReactTeamsTabsGraphProps";
import ReactTeamsTabsgraph from "./components/ReactTeamsTabsGraph";

export default class ReactTeamsTabsgraphWebPart
  extends BaseClientSideWebPart<IReactTeamsTabsgraphWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactTeamsTabsgraphProps> = React.createElement(
      ReactTeamsTabsgraph,
      {
        context: this.context,
        webPartTitle: this.properties.webPartTitle,
        showChannelSearch: this.properties.showChannelSearch,
        sortGeneralFirst: this.properties.sortGeneralFirst
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "React Teams Tabs with MSGraphClientV3" },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("webPartTitle", {
                  label: "Web Part Title"
                }),
                PropertyPaneToggle("showChannelSearch", {
                  label: "Show channel search",
                  onText: "Yes",
                  offText: "No"
                }),
                PropertyPaneToggle("sortGeneralFirst", {
                  label: "Sort 'General' channel first",
                  onText: "Yes",
                  offText: "No"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
