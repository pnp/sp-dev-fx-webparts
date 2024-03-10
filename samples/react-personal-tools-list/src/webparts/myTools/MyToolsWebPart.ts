/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'MyToolsWebPartStrings';
import MyTools from './components/MyTools';
import { IMyToolsProps } from './models';
import { IPropertyFieldSite, PropertyFieldListPicker, PropertyFieldListPickerOrderBy, PropertyFieldSitePicker } from '@pnp/spfx-property-controls';


export interface IMyToolsWebPartProps {
  wpTitle: string;
  wpSites: IPropertyFieldSite[];
  wpLists: { personalToolsList: { id: string, title: string, url: string }, availableToolsList: { id: string, title: string, url: string } };
  twoColumns: boolean;
}

export default class MyToolsWebPart extends BaseClientSideWebPart<IMyToolsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IMyToolsProps> = React.createElement(
      MyTools,
      {
        wpTitle: this.properties.wpTitle,
        wpSite: (this.properties.wpSites?.length > 0) ? this.properties.wpSites[0] : undefined,
        wpLists: this.properties.wpLists,
        isDarkTheme: this._isDarkTheme,
        context: this.context,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userEmail: this.context.pageContext.user.email,
        twoColumns: this.properties.twoColumns
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
            description: "Webpart settings"
          },
          groups: [
            {
              groupName: "Basic settings",
              groupFields: [
                PropertyPaneTextField('wpTitle', {
                  label: "Title",
                  description:
                    "If this is not set the title will be shown as 'My tools'",
                }),
                PropertyPaneCheckbox('twoColumns', {
                  checked: false,
                  disabled: false,
                  text: "Show links in two columns? (defaults to 1 column if this is not checked)"
                })
              ]
            }, {
              groupName: "Lists settings",
              groupFields: [
                PropertyFieldSitePicker('wpSites', {
                  label: 'Select site that contains the tools lists',
                  // initialSites: this.properties.wpSites?.length > 0 ? this.properties.wpSites : [{ url: this.context.pageContext.web.serverRelativeUrl, title: this.context.pageContext.web.title }],
                  initialSites: this.properties.wpSites,
                  context: this.context as any,
                  deferredValidationTime: 500,
                  multiSelect: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'wpSites'
                }),
                PropertyFieldListPicker('wpLists.personalToolsList', {
                  label: "Select the 'Personal tools' list",
                  selectedList: this.properties.wpLists?.personalToolsList,
                  includeHidden: false,
                  baseTemplate: 100,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  includeListTitleAndUrl: true,
                  disabled: (this.properties.wpSites && this.properties.wpSites.length > 0) ? false : true,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  multiSelect: false,
                  webAbsoluteUrl: (this.properties.wpSites && this.properties.wpSites.length > 0) ? this.properties.wpSites[0].url : this.context.pageContext.web.absoluteUrl,
                  deferredValidationTime: 0,
                  key: 'wpLists.personalToolsList'
                }),
                PropertyFieldListPicker('wpLists.availableToolsList', {
                  label: "Select the 'Available tools' list",
                  selectedList: this.properties.wpLists?.availableToolsList,
                  includeHidden: false,
                  baseTemplate: 100,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  includeListTitleAndUrl: true,
                  disabled: (this.properties.wpSites && this.properties.wpSites.length > 0) ? false : true,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  multiSelect: false,
                  webAbsoluteUrl: (this.properties.wpSites && this.properties.wpSites.length > 0) ? this.properties.wpSites[0].url : this.context.pageContext.web.absoluteUrl,
                  deferredValidationTime: 0,
                  key: 'wpLists.availableToolsList'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
