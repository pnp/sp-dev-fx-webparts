import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { MSGraphClient } from '@microsoft/sp-http';

import * as strings from 'PeopleWithPresenceWebPartStrings';
import PeopleWithPresence from './components/PeopleWithPresence';
import { IPeopleWithPresenceProps } from './components/IPeopleWithPresenceProps';

export interface IPeopleWithPresenceWebPartProps {
  description: string;
}

export default class PeopleWithPresenceWebPart extends BaseClientSideWebPart<IPeopleWithPresenceWebPartProps> {

  private _graphHttpClient: MSGraphClient;

  protected onInit(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.context.msGraphClientFactory.getClient().then(client => {
        this._graphHttpClient = client;
        resolve();
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IPeopleWithPresenceProps > = React.createElement(
      PeopleWithPresence,
      {
        graphHttpClient: this._graphHttpClient,
        siteUrl: this.context.pageContext.site.absoluteUrl,
        groupId: this.context.pageContext.site.group.id
      }
    );

    ReactDom.render(element, this.domElement);
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
            }
          ]
        }
      ]
    };
  }
}
