import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'EasterEggHuntGameWebPartStrings';
import EasterEggHuntGame from './components/EasterEggHuntGame';
import { IEasterEggHuntGameProps } from './components/IEasterEggHuntGameProps';

export interface IEasterEggHuntGameWebPartProps {
  description: string;
  gameDuration: number;
  numberOfEggs: number;
  numberOfBonusEggs: number;
  externalCssClasses: string;
  showGameArea: boolean;
}

export default class EasterEggHuntGameWebPart extends BaseClientSideWebPart<IEasterEggHuntGameWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IEasterEggHuntGameProps> = React.createElement(
      EasterEggHuntGame,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        gameDuration: this.properties.gameDuration || 60, // Default 60 seconds
        numberOfEggs: this.properties.numberOfEggs || 10, // Default 10 eggs
        numberOfBonusEggs: this.properties.numberOfBonusEggs || 2, // Default 2 bonus eggs
        externalCssClasses: this.properties.externalCssClasses || '', // CSS classes for external elements
        showGameArea: this.properties.showGameArea !== false // Default true
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
            },
            {
              groupName: "Game Settings",
              groupFields: [
                PropertyPaneTextField('gameDuration', {
                  label: "Game Duration (seconds)",
                  value: "60"
                }),
                PropertyPaneTextField('numberOfEggs', {
                  label: "Number of Eggs",
                  value: "10"
                }),
                PropertyPaneTextField('numberOfBonusEggs', {
                  label: "Number of Bonus Eggs",
                  value: "2"
                }),
                PropertyPaneToggle('showGameArea', {
                  label: "Show Game Area",
                  checked: true
                })
              ]
            },
            {
              groupName: "Advanced Settings",
              groupFields: [
                PropertyPaneTextField('externalCssClasses', {
                  label: "External CSS Classes",
                  description: "Add CSS classes outside the webpart (semicolon-separated)",
                  multiline: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
