import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { LogLevel } from "@pnp/logging";

import * as strings from 'ReactProjectOnlineWebPartStrings';
import { IReactProjectOnlineWebPartProps } from './IReactProjectOnlineWebPartProps';

import ReactProjectOnline from './components/ReactProjectOnline';
import { IReactProjectOnlineProps } from './components/IReactProjectOnlineProps';
import {
  ISPDataService, SPDataService, SPMockDataService,
  IPODataService, PODataService, POMockDataService
} from "./../../shared/services";

export default class ReactProjectOnlineWebPart extends BaseClientSideWebPart<IReactProjectOnlineWebPartProps> {

  private _spDataService: ISPDataService;
  private _poDataService: IPODataService;

  public onInit(): Promise<void> {

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, strings.TitleFieldLabel);

    /*
    Create the appropriate data provider depending on where the web part is running.
    The DEBUG flag will ensure the mock data provider is not bundled with the web part when you package the solution for distribution,
    that is, using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      // Local environment
      this._spDataService = new SPMockDataService(this.properties.logLevel);
      this._poDataService = new POMockDataService(this.properties.logLevel);
    } else {
      this._spDataService = new SPDataService(this.properties.logLevel);
      this._poDataService = new PODataService(this.properties.logLevel, this.context);
    }

    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IReactProjectOnlineProps> = React.createElement(
      ReactProjectOnline,
      {
        baseProperties: this.properties,
        spDataService: this._spDataService,
        poDataService: this._poDataService,
        webPartContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async onPropertyPaneConfigurationStart(): Promise<any> {

    // load data only when user opens the property pane to configure webpart
    if (this.properties.dataSourceId.length === 0) {
      await this._getProjectID();
    }

    super.onPropertyPaneConfigurationStart();
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
                PropertyPaneTextField('dataSourceId', {
                  label: strings.DataSourceIdFieldLabel,
                  disabled: true
                })
              ]
            },
            {
              groupName: strings.ConfigurationGroupName,
              groupFields: [
                PropertyPaneDropdown('logLevel', {
                  label: strings.LogLevelLabel,
                  selectedKey: this.properties.logLevel,
                  options: [
                    { key: LogLevel.Off, text: 'Off' },
                    { key: LogLevel.Error, text: 'Error' },
                    { key: LogLevel.Warning, text: 'Warning' },
                    { key: LogLevel.Info, text: 'Info' },
                    { key: LogLevel.Verbose, text: 'Verbose' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private async _getProjectID(): Promise<string> {
    let id: string = null;
    const webUrl = this.context.pageContext.web.absoluteUrl;
    const selectWebProperties = ['MSPWAPROJUID'];
    try {
      // get project ID
      const projectUID: any = await this._spDataService.GetWebProperties(webUrl, selectWebProperties);
      if (projectUID) {
        this.properties.dataSourceId = projectUID.MSPWAPROJUID;
        this.context.propertyPane.refresh();
      }

    } catch (error) {
      console.log('Error getting project ID from data service: ', error);
    }
    return id;
  }
}
