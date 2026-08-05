import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PublicHolidaysGlobalWebPartStrings';
import { COUNTRIES } from './models/countries';
import PublicHolidaysGlobal from './components/PublicHolidaysGlobal';
import { IPublicHolidaysGlobalProps } from './components/IPublicHolidaysGlobalProps';

export interface IPublicHolidaysGlobalWebPartProps {
  description: string;
  country: string;
  defaultYear: number;
  itemsPerPage: number;
}

export default class PublicHolidaysGlobalWebPart extends BaseClientSideWebPart<IPublicHolidaysGlobalWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private _countryOptions: IPropertyPaneDropdownOption[] =
    COUNTRIES.map((c) => ({ key: c.code, text: c.name }));

  private get _yearOptions(): IPropertyPaneDropdownOption[] {
    const current = new Date().getFullYear();
    const options: IPropertyPaneDropdownOption[] = [];
    for (let y = current - 3; y <= current + 1; y++) {
      options.push({ key: y, text: String(y) });
    }
    return options;
  }


  public render(): void {
    const element: React.ReactElement<IPublicHolidaysGlobalProps> = React.createElement(
      PublicHolidaysGlobal,
      {
        description: this.properties.description,
        country: this.properties.country || 'PT',
        defaultYear: this.properties.defaultYear,
        itemsPerPage: this.properties.itemsPerPage,
        onConfigure: () => this.context.propertyPane.open(),
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
                  label: strings.DefaultCountryFieldLabel,
                  options: this._countryOptions,
                  selectedKey: this.properties.country || 'PT'
                }),
                PropertyPaneDropdown('defaultYear', {
                  label: strings.DefaultYearFieldLabel,
                  options: this._yearOptions,
                  selectedKey: this.properties.defaultYear || new Date().getFullYear()
                }),
                PropertyPaneSlider('itemsPerPage', {
                  label: strings.ItemsPerPageFieldLabel,
                  min: 5,
                  max: 25,
                  step: 5,
                  value: this.properties.itemsPerPage || 10,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
