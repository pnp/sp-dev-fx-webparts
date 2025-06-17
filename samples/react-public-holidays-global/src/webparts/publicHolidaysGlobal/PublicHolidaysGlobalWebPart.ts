import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PublicHolidaysGlobalWebPartStrings';
import PublicHolidaysGlobal from './components/PublicHolidaysGlobal';
import { IPublicHolidaysGlobalProps } from './components/IPublicHolidaysGlobalProps';

export interface IPublicHolidaysGlobalWebPartProps {
  description: string;
  country: string;
}

export default class PublicHolidaysGlobalWebPart extends BaseClientSideWebPart<IPublicHolidaysGlobalWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  // Country options for the dropdown
private _countryOptions: IPropertyPaneDropdownOption[] = [
  { key: 'PT', text: 'Portugal' },
  { key: 'ES', text: 'Spain' },
  { key: 'BR', text: 'Brazil' },
  { key: 'US', text: 'United States' },
  { key: 'FR', text: 'France' },
  { key: 'DE', text: 'Germany' },
  { key: 'IT', text: 'Italy' },
  { key: 'GB', text: 'United Kingdom' },
  { key: 'CA', text: 'Canada' },
  { key: 'AU', text: 'Australia' },
  { key: 'JP', text: 'Japan' },
  { key: 'CN', text: 'China' },
  { key: 'IN', text: 'India' },
  { key: 'MX', text: 'Mexico' },
  { key: 'NL', text: 'Netherlands' },
  { key: 'SE', text: 'Sweden' },
  { key: 'CH', text: 'Switzerland' },
  { key: 'ZA', text: 'South Africa' },
  { key: 'KR', text: 'South Korea' }
];


  public render(): void {
    const element: React.ReactElement<IPublicHolidaysGlobalProps> = React.createElement(
      PublicHolidaysGlobal,
      {
        description: this.properties.description,
        country: this.properties.country || 'PT',
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
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
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams':
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
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public get disableReactivePropertyChanges(): boolean {
    return true;
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
                }),
                PropertyPaneDropdown('country', {
                  label: 'Country',
                  options: this._countryOptions,
                  selectedKey: this.properties.country || 'PT'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
