import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';

import * as strings from 'ConfigureTabWebPartStrings';
import { ConfigureTab, IConfigureTabProps } from './components/ConfigureTab';
import { RedirectTab, IRedirectTabProps } from './components/RedirectTab';
import { TabError, ITabErrorProps } from './components/TabError';
import { ITabLink } from './model/ITabLink';
import TeamsConfigurationService from './services/TeamsConfigurationService';
import TabLinkParser from './services/TabLinkParser';

export interface IConfigureTabWebPartProps {
  tabNames: string;
  entityIds: string;
  contentPageUrls: string;
  redirectPages: boolean;
}

export default class ConfigureTabWebPart extends BaseClientSideWebPart<IConfigureTabWebPartProps> {

  private teamsConfigurationService = new TeamsConfigurationService();
  private tabLinkParser = new TabLinkParser();

  public render(): void {

    var tabLinkChoices: ITabLink[] = null;

    try {
      tabLinkChoices = this.tabLinkParser.parseTabLinks(this.properties.tabNames, this.properties.entityIds, this.properties.contentPageUrls);

      var queryParms = new UrlQueryParameterCollection(window.location.href);
      var redirectEntityId = queryParms.getValue("entityId");
      if (!redirectEntityId) {

        // We are in configuration mode, running on as a Teams tab configuration page
        // Allow user to configure a tab
        const element: React.ReactElement<IConfigureTabProps> = React.createElement(
          ConfigureTab,
          {
            tabLinkChoices: tabLinkChoices,
            message: "",
            tabLinkSelected: ((item: ITabLink) => {
              this.teamsConfigurationService.configureTab(item, this.properties.redirectPages);
            })
          }
        );
        ReactDom.render(element, this.domElement);

      } else {

        // We are in redirect mode, redirecting a request for a content page
        // Redirect to the named tab
        const element: React.ReactElement<IRedirectTabProps> = React.createElement(
          RedirectTab,
          {
            tabLinkChoices: tabLinkChoices,
            entityId: redirectEntityId
          }
        );
        ReactDom.render(element, this.domElement);
      }
    }
    
    catch (error) {
      
      // Display error
      const element: React.ReactElement<ITabErrorProps> = React.createElement(
        TabError,
        {
          message: error,
        }
      );
      ReactDom.render(element, this.domElement);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
                PropertyPaneLabel('', {
                  text: strings.TabInstructions
                }),
                PropertyPaneTextField('tabNames', {
                  label: strings.TabNamesFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneTextField('entityIds', {
                  label: strings.EntityIdsFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneTextField('contentPageUrls', {
                  label: strings.ContentPageUrlsFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneCheckbox('redirectPages', {
                  text: strings.RedirectFieldLabel
                }),
                PropertyPaneLabel('', {
                  text: strings.RedirectFieldInstructions
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
