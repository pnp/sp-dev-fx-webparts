import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ReactCustomLocalizationWebPartStrings';
import ReactCustomLocalization from './components/ReactCustomLocalization';
import { IReactCustomLocalizationProps } from './components/IReactCustomLocalizationProps';

export type localMode = 'default' | 'page' | 'specified';
export type supportedLocale = 'en-us' | 'fr-fr' | 'es-es'

export interface IReactCustomLocalizationWebPartProps {
  description: string;
  localeMode: localMode;
  locale: supportedLocale;
}

export default class ReactCustomLocalizationWebPart extends BaseClientSideWebPart<IReactCustomLocalizationWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _localizedStrings: IReactCustomLocalizationWebPartStrings;

  public render(): void {
    const element: React.ReactElement<IReactCustomLocalizationProps> = React.createElement(
      ReactCustomLocalization,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        strings: this._localizedStrings
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._localizedStrings = await this.loadLocalizedStrings();

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    //NOTE: we override the "strings" here to work with custom implementation
    const strings = this._localizedStrings;

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

  private getLocaleFromUrl(url: string): supportedLocale {
    const match = url.match(/\/sitepages\/([a-z]{2})\//i);
    const locale = match ? match[1] : null;

    switch (locale) {
      case "fr":
        return "fr-fr";
      case "es":
        return "es-es";
      default:
        return "en-us";
    }
  }

  private async loadLocalizedStrings(): Promise<IReactCustomLocalizationWebPartStrings> {
    if (this.properties.localeMode === 'default') {
      return { ...strings }
    }

    let localizedStrings = { ...strings };
    //TODO: get the default from web settings?
    let localeIdentifer = 'en-us';
    if (this.properties.localeMode === 'page') {
      localeIdentifer = this.getLocaleFromUrl(document.location.pathname);
    } else if (this.properties.localeMode === 'specified') {
      localeIdentifer = this.properties.locale;
    }

    try {
      //NOTE: this relative path changes in relation to the loc folder.
      //TODO: look for a way to centralize the logic with loading the loc strings modules.
      // eslint-disable-next-line @microsoft/spfx/import-requires-chunk-name
      const localeModule = await import(`./loc/${localeIdentifer}.js`);
      localizedStrings = { ...localeModule.default };
    } catch {
      //TODO: handle as appropriate
    }

    return localizedStrings;
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'localeMode' || propertyPath === 'locale') {
      this.loadLocalizedStrings().then(localizedStrings => {
        this._localizedStrings = localizedStrings;
        this._getEnvironmentMessage().then(message => {
          this._environmentMessage = message;
          this.render();
        }).catch(() => {
          //TODO: fill in as appropriate
        });
      }).catch(() => {
        //TODO: fill in as appropriate
      });
    }
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
                }),
                PropertyPaneDropdown('localeMode', {
                  label: 'Localization Mode',
                  options: [
                    { key: 'default', text: 'Default' },
                    { key: 'page', text: 'Page Translation Detection'},
                    { key: 'specified', text: 'Specified'}
                  ],
                  selectedKey: 'default',
                }),
                PropertyPaneDropdown('locale', {
                  label: 'Language',
                  options: [
                    { key: 'en-us', text: 'English (US)' },
                    { key: 'fr-fr', text: 'French (France)'},
                    { key: 'es-es', text: 'Spanish (Spain)'}
                  ],
                  selectedKey: 'en-us',
                  disabled: this.properties.localeMode !== 'specified'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
