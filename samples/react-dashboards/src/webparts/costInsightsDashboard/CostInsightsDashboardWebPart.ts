import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneLabel } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ConsoleListener, Logger } from '@pnp/logging';
import PnPTelemetry from "@pnp/telemetry-js";
import stringsCommon from 'CommonDasboardWebPartStrings';
import React from 'react';
import * as ReactDom from 'react-dom';
import { ThemedPalette } from '../../common/ColorsHelper';
import { ICostManagementConfig, ICostManagementQuery, ICostManagementWebPartProps } from '../../common/CommonProps';
import { ChartStyles, LayoutStyles, ListStyles } from '../../common/DashboardHelper';
import CostInsightsDashboard from './components/CostInsightsDashboard';
import { ICostInsightsDashboardProps } from './components/ICostInsightsDashboardProps';

const telemetry = PnPTelemetry.getInstance();
telemetry.optOut();

const LOG_SOURCE: string = 'Cost Insights WebPart';

export default class CostInsightsWebPart extends BaseClientSideWebPart<ICostManagementWebPartProps> {

  public onInit(): Promise<void> {
    const _setLogger = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.subscribe(new (ConsoleListener as any)());

      //default is 2 - Warning
      if (this.properties.logLevel && this.properties.logLevel in [0, 1, 2, 3, 99]) {
        Logger.activeLogLevel = this.properties.logLevel;
      }

      Logger.write(`${LOG_SOURCE} ${this.manifest.version} activated`);
      Logger.write(`${LOG_SOURCE} Initialized with properties:`);
      Logger.write(`${LOG_SOURCE} ${JSON.stringify(this.properties, undefined, 2)}`);

    }
    _setLogger();
    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<ICostInsightsDashboardProps> = React.createElement(
      CostInsightsDashboard,
      {
        ...this.properties,
        width: this.width,
        userLoginName: this.context.pageContext.user.loginName,
        httpClient: this.context.httpClient,
        aadHttpClientFactory: this.context.aadHttpClientFactory,
        cultureName: this.context.pageContext.legacyPageContext.currentCultureName,
        DisplayMode: this.displayMode,
        onPivotItemChange: this._onPivotItemChange,
        onConfigureCostManagementScope: this._onConfigureCostManagementScope,
        onConfigureCostQuery: this._onConfigureCostQuery,
        onConfigureListSettings: this._onConfigureListSettings,
        onConfigureChartSettings: this._onConfigureChartSettings,
        onConfigureTimePicker: this._onConfigureTimePicker,
        onConfigureLayoutSettings: this._onConfigureLayoutSettings,
      }
    );
    ReactDom.render(element, this.domElement);
  }
  public _onPivotItemChange = (key: string): void => {
    this.properties.pivotKey = key
  }
  public _onConfigureCostManagementScope = (config: ICostManagementConfig): void => {
    this.properties.scope = config.scope;
    this.properties.subscriptionId = config.subscriptionId;
    this.properties.resourceGroupName = config.resourceGroupName;
    this.properties.managementGroupId = config.managementGroupId;

  }
  public _onConfigureCostQuery = (preset: number, config: ICostManagementQuery): void => {
    this.properties.query = config.query;
    this.properties.preset = preset;
    this.properties.dateSelection = config.dateSelection;
  }
  public _onConfigureTimePicker = (showTimePicker: boolean): void => {
    this.properties.showTimePicker = showTimePicker;
  }

  public _onConfigureListSettings = (showList: boolean, listStyle: ListStyles): void => {
    this.properties.showList = showList;
    this.properties.listStyle = listStyle;
  };
  public _onConfigureChartSettings = (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette): void => {
    this.properties.showChart = showChart;
    this.properties.chartStyle = chartStyle;
    this.properties.chartPalette = chartPalette;
  }
  public _onConfigureLayoutSettings = (layout: LayoutStyles): void => {
    this.properties.layoutSettings = layout;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse(this.manifest.version);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: ""
          },
          groups: [
            {
              groupFields: [
                PropertyPaneLabel('description', { text: stringsCommon.PropertyPaneDescription }),
              ]
            }
          ]
        }
      ]
    };
  }
}
