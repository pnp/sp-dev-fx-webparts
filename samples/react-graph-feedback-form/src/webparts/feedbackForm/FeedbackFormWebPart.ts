import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import * as strings from 'FeedbackFormWebPartStrings';
import FeedbackForm from './components/FeedbackForm';
import { IFeedbackFormProps } from './components/IFeedbackFormProps';
import { MSGraphClient } from '@microsoft/sp-http';

// https://sharepoint.github.io/sp-dev-fx-property-controls/
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';

import {
  Logger,
  ConsoleListener,
  LogLevel
} from "@pnp/logging";

// https://pnp.github.io/pnpjs/logging/docs/
// https://blog.mastykarz.nl/logging-sharepoint-framework/
const LOG_SOURCE: string = 'FeedbackFormWebPart';
Logger.subscribe(new ConsoleListener());
Logger.activeLogLevel = LogLevel.Info;

export interface IFeedbackFormWebPartProps {
  targetEmail: string;
  subject: string;
  maxMessageLength: number;
}

export default class FeedbackFormWebPart extends BaseClientSideWebPart<IFeedbackFormWebPartProps> {
  private graphClient: MSGraphClient;
  public async onInit(): Promise<void> {
    Logger.write(`[${LOG_SOURCE}] onInit()`);
    try {
      Logger.write(`[${LOG_SOURCE}] trying to retrieve graphClient`);
      this.graphClient = await this.context.msGraphClientFactory.getClient();
    } catch (error) {
      Logger.writeJSON(error, LogLevel.Error);
    }
  }

  public render(): void {
    Logger.write(`[${LOG_SOURCE}] render()`);
    const element: React.ReactElement<IFeedbackFormProps> = React.createElement(
      FeedbackForm,
      {
        graphClient: this.graphClient,
        targetEmail: this.properties.targetEmail,
        maxMessageLength: this.properties.maxMessageLength,
        subject: this.properties.subject
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    Logger.write(`[${LOG_SOURCE}] onDispose()`);
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
                PropertyPaneTextField('targetEmail', {
                  label: strings.TargetEmailFieldLabel
                }),
                PropertyPaneTextField('subject', {
                  label: strings.SubjectFieldLabel
                }),
                PropertyFieldNumber("maxMessageLength", {
                  key: "maxMessageLength",
                  label: "Maximum length of a message",
                  value: this.properties.maxMessageLength,
                  maxValue: 250,
                  minValue: 3,
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
