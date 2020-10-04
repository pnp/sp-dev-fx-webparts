import { dynamicsService } from "./../../services/services";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "Dynamic365SalesAccountsWebPartStrings";
import Dynamic365SalesAccounts from "./components/Dynamic365SalesAccounts";
import { IDynamic365SalesAccountsProps } from "./components/IDynamic365SalesAccountsProps";
import "antd/dist/antd.css";

export interface IDynamic365SalesAccountsWebPartProps {
  dynamicCRMDomain: string;
}

export default class Dynamic365SalesAccountsWebPart extends BaseClientSideWebPart<
  IDynamic365SalesAccountsWebPartProps
> {
  public async onInit(): Promise<void> {
    dynamicsService.aadTokenProviderFactory = this.context.aadTokenProviderFactory;
    dynamicsService.resourceUri = `https://${this.properties.dynamicCRMDomain}.dynamics.com`;
  }

  public render(): void {
    const element: React.ReactElement<IDynamic365SalesAccountsProps> = React.createElement(
      Dynamic365SalesAccounts
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("dynamicCRMDomain", {
                  label: strings.DynamicCrmDomainFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
