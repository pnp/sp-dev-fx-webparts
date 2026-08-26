import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PeopleSlickWebPartStrings';
import PeopleSlick from './components/PeopleSlick';
import { IPeopleSlickProps } from './components/IPeopleSlickProps';

export interface IPeopleSlickWebPartProps {
  description: string;
  listName: string;
  webpartName: string;
  UseRootSite: boolean;
  showDots: boolean;
  autoplaySpeed: number;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  recordToReturn: number;
  enableAutoplay: boolean;
  customFilter: boolean;
  customFilterValue: string;
  enableRedirectURL: boolean;

}
export default class PeopleSlickWebPart extends BaseClientSideWebPart<IPeopleSlickWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";


  public render(): void {
    const element: React.ReactElement<IPeopleSlickProps> = React.createElement(
      PeopleSlick,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        rootSiteURL: this.context.pageContext.site.absoluteUrl,
        context: this.context,
        listName: this.properties.listName,
        webpartName: this.properties.webpartName,
        UseRootSite: this.properties.UseRootSite,
        showDots: this.properties.showDots,
        autoplaySpeed: this.properties.autoplaySpeed,
        speed: this.properties.speed,
        slidesToShow: this.properties.slidesToShow,
        slidesToScroll: this.properties.slidesToScroll,
        recordToReturn: this.properties.recordToReturn,
        enableAutoplay: this.properties.enableAutoplay,
        customFilter: this.properties.customFilter,
        customFilterValue: this.properties.customFilterValue,
        enableRedirectURL: this.properties.enableRedirectURL,

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
              groupName: "Basic Configuration",

              groupFields: [
                PropertyPaneTextField('webpartName', {
                  label: "Webpart Name"
                }),

                PropertyPaneTextField('listName', {
                  label: "List Name"
                }),

                PropertyPaneToggle("UseRootSite", {
                  label: "Use Root Site?",
                  offText: "No",
                  onText: "Yes",
                }),

                PropertyPaneToggle("showDots", {
                  label: "Show navigation (Dots)",
                  offText: "No",
                  onText: "Yes",
                }),

                PropertyPaneSlider("slidesToShow", {
                  label: "Slides to show",
                  min: 1,
                  max: 15,
                }),

                PropertyPaneSlider("slidesToScroll", {
                  label: "Slides to scroll",
                  min: 1,
                  max: 15,
                }),

                PropertyPaneSlider("recordToReturn", {
                  label: "Record to return",
                  min: 1,
                  max: 50,
                }),

                PropertyPaneToggle("enableAutoplay", {
                  label: "Enable autoplay",
                  offText: "No",
                  onText: "Yes",
                }),

                PropertyPaneSlider("autoplaySpeed", {
                  label: "Autoplay speed",
                  min: 1,
                  max: 20,
                  disabled: !this.properties.enableAutoplay,
                }),



              ]
            },
            {
              groupName: "Advanced configuration",

              groupFields: [
                PropertyPaneToggle("customFilter", {
                  label: "Use Custom Filter?",
                  offText: "No",
                  onText: "Yes",
                }),

                PropertyPaneTextField('customFilterValue', {
                  label: "Custom Filter Query, Eg: Tags eq 'APAC'",
                  disabled: !this.properties.customFilter,
                }),

                PropertyPaneToggle("enableRedirectURL", {
                  label: "enable RedirectURL?",
                  offText: "No",
                  onText: "Yes",
                }),



              ]

            },

          ]
        }
      ]
    };
  }
}
