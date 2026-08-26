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

import * as strings from 'SPPermissionManagerWebPartStrings';
import SPPermissionManager from './components/SPPermissionManager';
import { ISPPermissionManagerProps } from './components/ISPPermissionManagerProps';

export interface ISPPermissionManagerWebPartProps {
  title: string;
  allowEditGroup: boolean;
  allowCreateGroup: boolean;
  allowDeleteGroup: boolean;
  allowExportUsersCsv: boolean;
  allowExportUsersExcel: boolean;
  allowPermissionLevels: boolean;
}

export default class SPPermissionManagerWebPart extends BaseClientSideWebPart<ISPPermissionManagerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ISPPermissionManagerProps> = React.createElement(
      SPPermissionManager,
      {
        title: this.properties.title || 'User Group Manager',
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        featureOptions: {
          allowEditGroup: this.properties.allowEditGroup ?? true,
          allowCreateGroup: this.properties.allowCreateGroup ?? true,
          allowDeleteGroup: this.properties.allowDeleteGroup ?? true,
          allowExportUsersCsv: this.properties.allowExportUsersCsv ?? true,
          allowExportUsersExcel: this.properties.allowExportUsersExcel ?? true,
          allowPermissionLevels: this.properties.allowPermissionLevels ?? true
        }
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
    if (this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  placeholder: strings.TitleFieldPlaceholder
                })
              ]
            },
            {
              groupName: strings.FeatureVisibilityGroupName,
              groupFields: [
                PropertyPaneToggle('allowEditGroup', {
                  label: strings.AllowEditGroupLabel,
                  checked: this.properties.allowEditGroup ?? true
                }),
                PropertyPaneToggle('allowCreateGroup', {
                  label: strings.AllowCreateGroupLabel,
                  checked: this.properties.allowCreateGroup ?? true
                }),
                PropertyPaneToggle('allowDeleteGroup', {
                  label: strings.AllowDeleteGroupLabel,
                  checked: this.properties.allowDeleteGroup ?? true
                }),
                PropertyPaneToggle('allowExportUsersCsv', {
                  label: strings.AllowExportUsersCsvLabel,
                  checked: this.properties.allowExportUsersCsv ?? true
                }),
                PropertyPaneToggle('allowExportUsersExcel', {
                  label: strings.AllowExportUsersExcelLabel,
                  checked: this.properties.allowExportUsersExcel ?? true
                }),
                PropertyPaneToggle('allowPermissionLevels', {
                  label: strings.AllowPermissionLevelsLabel,
                  checked: this.properties.allowPermissionLevels ?? true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
