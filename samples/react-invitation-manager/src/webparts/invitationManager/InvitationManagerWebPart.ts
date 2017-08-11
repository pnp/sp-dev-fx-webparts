import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'invitationManagerStrings';
import InvitationManager from './components/InvitationManager';
import { IInvitationManagerProps } from './components/IInvitationManagerProps';
import { IInvitationManagerWebPartProps } from './IInvitationManagerWebPartProps';

export default class InvitationManagerWebPart extends BaseClientSideWebPart<IInvitationManagerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IInvitationManagerProps> = React.createElement(
      InvitationManager,
      {
        httpClient: this.context.httpClient,
        title: this.properties.title,
        webPartId: this.context.instanceId
      }
    );

    ReactDom.render(element, this.domElement);
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
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
