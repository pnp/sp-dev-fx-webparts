import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneLabel } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PnPTelemetry from "@pnp/telemetry-js";
import stringsCommon from 'CommonDasboardWebPartStrings';
import { AppInsights, setLogger } from 'pnp-appinsights-listener';
import React from 'react';
import * as ReactDom from 'react-dom';
import { ThemedPalette } from '../../common/ColorsHelper';
import { ICostManagementConfig, ICostManagementQuery, ICostManagementWebPartProps } from '../../common/CommonProps';
import { teamsPadding } from '../../common/ComponentStyles';
import { ChartStyles, LayoutStyles, ListStyles } from '../../common/DashboardHelper';
import CostInsightsDashboard from './components/CostInsightsDashboard';
import { ICostInsightsDashboardProps } from './components/ICostInsightsDashboardProps';

const telemetry = PnPTelemetry.getInstance();
telemetry.optOut();

export default class CostInsightsWebPart extends BaseClientSideWebPart<ICostManagementWebPartProps> {

  public onInit(): Promise<void> {
    if (this.properties.appInsightsConnString) {
      const ai = AppInsights(this.properties.appInsightsConnString);
      setLogger({
        appInsights: ai,
        logLevel: this.properties.logLevel,
        console: true
      });
    }
    else {
      setLogger({
        logLevel: this.properties.logLevel,
        console: true
      });
    }
    return Promise.resolve();
  }

  public render(): void {
    let dashboard: React.ReactElement;

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
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      dashboard = React.createElement('div', { style: { padding: teamsPadding } }, element);
    }
    else {
      dashboard = element
    }
    ReactDom.render(dashboard, this.domElement);
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
