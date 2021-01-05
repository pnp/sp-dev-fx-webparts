import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TeamsNotificationSenderWebPartStrings';
import TeamsNotificationSender from './components/TeamsNotificationSender';
import { ITeamsNotificationSenderProps } from './components/ITeamsNotificationSenderProps';

import { Providers, SharePointProvider } from '@microsoft/mgt';

export interface ITeamsNotificationSenderWebPartProps {
  description: string;
}

export default class TeamsNotificationSenderWebPart extends BaseClientSideWebPart<ITeamsNotificationSenderWebPartProps> {

  protected async onInit(): Promise<void> {
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  public render(): void {
    //console.log(this.context.pageContext.site.group);
    const element: React.ReactElement<ITeamsNotificationSenderProps> = React.createElement(
      TeamsNotificationSender,
      {
        teamsContext: this.context.sdks.microsoftTeams,
        groupId: this.context.pageContext.site.group.id,
        webpartContext: this.context
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
