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
import {GraphService} from "./../GraphService"

export interface IWebPartReportWebPartProps {
  description: string;
  displayOption: string;

}

export default class WebPartReportWebPart extends BaseClientSideWebPart<IWebPartReportWebPartProps> {
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
        GraphService: new GraphService(this.context),
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected async onInit(): Promise<void> {}

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
            key: 'list',
            text: 'List',
            checked: displayOption === "list",
            iconProps: {
              officeFabricIconFontName: "List"
            }
          }, {
            key: 'chart',
            text: 'Chart',
            checked: displayOption === "chart",
            iconProps: {
              officeFabricIconFontName: "DonutChart"
            }
          }]
        }
      }],
      onExecute: (actionName, newValue) =>{
        this.properties.displayOption = newValue;
        this.render();
      }
    };
  }
}
