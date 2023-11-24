/* eslint-disable @typescript-eslint/typedef */
import * as React from 'react'
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "@pnp/graph/groups";

import { ISharingViewProps } from './components/SharingView/ISharingViewProps';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import PnPTelemetry from "@pnp/telemetry-js";
import "@pnp/sp/webs";
import "@pnp/sp/search";
import IDataProvider from './components/SharingView/DataProvider';
import DataProvider from './components/SharingView/DataProvider';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

import {
  Logger,
  ConsoleListener,
  LogLevel
} from "@pnp/logging";
import { IPropertyPaneConfiguration, PropertyPaneToggle, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import SharingViewSingle from './components/SharingView/SharingViewSingle';

const LOG_SOURCE: string = 'Microsoft-Governance-Sharing';

export interface ISharingWebPartProps {
  description: string;
  debugMode: boolean;
}

export default class SharingWebPart extends BaseClientSideWebPart<ISharingWebPartProps> {
  private dataProvider: IDataProvider;

  protected async onInit(): Promise<void> {
    // load the filetype icons and other icons
    initializeIcons(undefined, { disableWarnings: true });
    initializeFileTypeIcons();

    // setting up the logging framework
    Logger.subscribe(ConsoleListener(LOG_SOURCE));
    Logger.activeLogLevel = (this.properties.debugMode) ? LogLevel.Verbose : LogLevel.Warning;

    // if you don't want to send telemetry data to PnP, you can opt-out here (see https://github.com/pnp/telemetry-js for details on what is being sent)
    // const telemetry = PnPTelemetry.getInstance();
    // telemetry.optOut();

    // loading the data provider to get access to the REST/Search API
    this.dataProvider = new DataProvider(this.context);
  }

  public render(): void {
    // determine if we're in Teams or not
    let isTeams: boolean = false;
    if (this.context.sdks.microsoftTeams) {
      isTeams = true;
    }

    const element: React.ReactElement<ISharingViewProps> = React.createElement(
      SharingViewSingle,
      {
        pageLimit: 15,
        context: this.context,
        isTeams: isTeams,
        dataProvider: this.dataProvider
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: this.properties.description
          },
          groups: [
            {
              groupName: "Configuration",
              groupFields: [
                PropertyPaneToggle('debugMode', {
                  label: "Enable debug mode",
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }
}
