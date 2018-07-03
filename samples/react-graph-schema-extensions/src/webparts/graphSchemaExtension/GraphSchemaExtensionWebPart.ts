import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "GraphSchemaExtensionWebPartStrings";
import GraphSchemaExtension from "./components/GraphSchemaExtension";
import { IGraphSchemaExtensionProps } from "./components/IGraphSchemaExtensionProps";

export interface IGraphSchemaExtensionWebPartProps {
  description: string;
}

export default class GraphSchemaExtensionWebPart extends BaseClientSideWebPart<IGraphSchemaExtensionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphSchemaExtensionProps > = React.createElement(
      GraphSchemaExtension,
      {
        context: this.context
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
