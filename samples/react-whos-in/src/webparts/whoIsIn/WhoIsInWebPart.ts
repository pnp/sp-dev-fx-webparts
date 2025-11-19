import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'WhoIsInWebPartStrings';
import WhoIsIn from './components/WhoIsIn';
import type { IWhoIsInProps, IWhoIsInItem } from './components/IWhoIsInProps';
import { getSP } from './pnpjsConfig';

export interface IWhoIsInWebPartProps {
  listName: string;
}

export default class WhoIsInWebPart extends BaseClientSideWebPart<IWhoIsInWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  // cached items from the WhoIsIn list
  private _items: IWhoIsInItem[] = [];
  // Optional error message surfaced to the React component when list access fails.
  private _errorMessage?: string;

  public render(): void {
    const element: React.ReactElement<IWhoIsInProps> = React.createElement(
      WhoIsIn,
      {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        items: this._items,
        listName: this.properties.listName || 'WhoIsIn',
        errorMessage: this._errorMessage
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // load environment message first
    this._environmentMessage = await this._getEnvironmentMessage();

    // Determine list title up-front so we can refer to it in error messages.
    const listTitle = this.properties.listName || 'WhoIsIn';

    // initialize PnP and load items from the WhoIsIn SharePoint list
    try {
      const sp = getSP(this.context);
      if (sp) {
        // include Employee EMail so we can derive a profile photo URL client-side
        const items = await sp.web.lists.getByTitle(listTitle)
          .items.select('ID', 'BaseLocation', 'TravellingTo', 'From', 'To', 'Employee/JobTitle', 'Employee/Title', 'Employee/EMail', 'Employee/Id')
          .expand('Employee')();
        // enrich items with a computed photo URL (SharePoint user photo endpoint)
        const webUrl = this.context.pageContext.web.absoluteUrl;
        // Define a narrow incoming item shape to avoid using `any`.
        type IncomingItem = {
          ID?: number;
          Id?: number;
          BaseLocation?: string;
          TravellingTo?: string;
          From?: string;
          To?: string;
          Employee?: { JobTitle?: string; Title?: string; EMail?: string; Id?: number };
        };
        this._items = (items || []).map((it: IncomingItem): IWhoIsInItem => {
          const email = it.Employee && it.Employee.EMail ? it.Employee.EMail : '';
          const photoUrl = email ? `${webUrl}/_layouts/15/userphoto.aspx?size=S&accountname=${encodeURIComponent(email)}` : '';
          return {
            ...it,
            EmployeeEmail: email,
            EmployeeTitle: it.Employee && it.Employee.JobTitle ? it.Employee.JobTitle : '',
            EmployeePhotoUrl: photoUrl
          } as IWhoIsInItem;
        });
        // clear any previous error state on success
        this._errorMessage = undefined;
      } else {
        this._items = [];
      }
      console.log(this._items);
    } catch (error) {
      // don't block init on errors; log for debugging
      // eslint-disable-next-line no-console
      console.error('Error loading WhoIsIn list items', error);
      // Surface a friendly error message to the component when the list
      // cannot be found or is inaccessible.
      const errMsg = (error && (error as any).message) ? (error as any).message : String(error);
      const lower = errMsg.toLowerCase();
      if (lower.includes('not found') || lower.includes('404') || lower.includes('does not exist') || (lower.includes('list') && lower.includes('does not exist'))) {
        this._errorMessage = `The SharePoint list '${listTitle}' was not found or is inaccessible. Please provision the list and ensure the web part has permission to access it.`;
      } else {
        this._errorMessage = `Unable to load data from the SharePoint list '${listTitle}': ${errMsg}`;
      }
      this._items = [];
    }

    return Promise.resolve();
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
                PropertyPaneTextField('listName', {
                  label: 'List name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
