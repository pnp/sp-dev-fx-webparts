import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'WebPartReportWebPartStrings';
import WebPartReport from './components/WebPartReport';
import { IWebPartReportProps } from './components/IWebPartReportProps';
import { ITopActions, TopActionsFieldType } from '@microsoft/sp-top-actions';
import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IWebPartReportWebPartProps {
  description: string;
  displayOption: string;

}

export default class WebPartReportWebPart extends BaseClientSideWebPart<IWebPartReportWebPartProps> {
  private graphClient: MSGraphClientV3;
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IWebPartReportProps> = React.createElement(
      WebPartReport,
      {
        description: this.properties.description,
        displayOption : this.properties.displayOption,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        siteId:  this.context.pageContext.site.id.toString(),
        graphClient: this.graphClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient("3")
        .then((client: MSGraphClientV3): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    }); 
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public getTopActionsConfiguration(): ITopActions | undefined {
    const {
      displayOption
    } = this.properties;
    return {
      topActions:[{
        type: TopActionsFieldType.Dropdown,
        title: 'Dropdown',
        targetProperty: 'displayOption',
        properties: {
          options: [{
            key: '1',
            text: 'List',
            checked: displayOption.toString() === "1" ? true : false
          }, {
            key: '2',
            text: 'Chart',
            checked: displayOption.toString() === "2" ? true : false
          }]
        }
      }],
      onExecute: (actionName, newValue) =>{
        this.properties.displayOption = newValue;
        console.log("test",displayOption.toString() === "1");
        this.render();
      }
    };
  }
}
