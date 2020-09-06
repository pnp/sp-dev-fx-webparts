import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { MSGraphClient } from '@microsoft/sp-http';

import * as strings from 'CreateTaskWebPartStrings';
import CreateTask from './components/CreateTask';
import { ICreateTaskProps } from './components/ICreateTaskProps';
import { ICreateTaskContext } from './models/ICreateTaskContext';

export interface ICreateTaskWebPartProps {
}

export default class CreateTaskWebPart extends BaseClientSideWebPart<ICreateTaskWebPartProps> {

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

  private _getContext(): ICreateTaskContext {
    if (this.context.sdks.office) {
      const mailboxItem: Office.MessageRead = this.context.sdks.office.context.mailbox.item;
      const context: ICreateTaskContext = {
        graphHttpClient: this._graphHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        item: {
          id: mailboxItem.itemId,
          subject: mailboxItem.subject,
          from: mailboxItem.from.emailAddress,
          to: mailboxItem.to[0].emailAddress
        }
      };
      return context;
    }
    else {
      const context: ICreateTaskContext = {
        item: null,
        graphHttpClient: this._graphHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl
      };
      return context;
    }
  }

  public render(): void {

    const context: ICreateTaskContext = this._getContext();

    const element: React.ReactElement<ICreateTaskProps> = React.createElement(
      CreateTask,
      {
        context: context
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
