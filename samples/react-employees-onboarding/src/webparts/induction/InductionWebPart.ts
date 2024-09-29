import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'InductionWebPartStrings';
import { IInductionProps } from './components/IInductionProps';
import { Container } from './components/Container';

export interface IInductionWebPartProps {
  title: string;
  description: string;
  listUrl: string;
  azureFunctionUrl:string
}

export default class InductionWebPart extends BaseClientSideWebPart<IInductionWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IInductionProps> = React.createElement(
      Container,
      {
        title: this.properties.title,
        description: this.properties.description,
        listUrl: this.properties.listUrl,
        azureFunctionUrl:this.properties.azureFunctionUrl,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
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
      this.domElement.style.setProperty('--primaryButtonBackground', semanticColors.primaryButtonBackground || null);
      this.domElement.style.setProperty('--primaryButtonBackgroundHovered', semanticColors.primaryButtonBackgroundHovered || null);
      this.domElement.style.setProperty('--primaryButtonBackgroundPressed', semanticColors.primaryButtonBackgroundPressed || null);
      this.domElement.style.setProperty('--primaryButtonText', semanticColors.primaryButtonText || null);
      this.domElement.style.setProperty('--primaryButtonBorder', semanticColors.primaryButtonBorder || null);
      this.domElement.style.setProperty('--themePrimrary', "#cd1409" || null);
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
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneTextField("description", {
                  label: "Description",
                }),
                PropertyPaneTextField('listUrl', {
                  label: strings.ListUrlFieldLabel
                }),
                PropertyPaneTextField('azureFunctionUrl', {
                  label: strings.AzureFunctionUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
