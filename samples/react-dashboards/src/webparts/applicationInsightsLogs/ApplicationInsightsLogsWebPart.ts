import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, IPropertyPaneDropdownOption, PropertyPaneDropdown, PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as ReactDom from 'react-dom';

import PnPTelemetry from "@pnp/telemetry-js";
import strings from 'AppInsightsDasboardWebPartStrings';
import { AppInsights, setLogger } from 'pnp-appinsights-listener';
import * as React from 'react';
import { ThemedPalette } from '../../common/ColorsHelper';
import { CacheExpiration, IAppInsightsQuery, IAppInsightsWebPartProps } from '../../common/CommonProps';
import { teamsPadding } from '../../common/ComponentStyles';
import { ChartStyles, LayoutStyles, ListStyles } from '../../common/DashboardHelper';
import ApplicationInsightsLogs from './components/ApplicationInsightsLogs';
import { IApplicationInsightsLogsProps } from './components/IApplicationInsightsLogsProps';

const telemetry = PnPTelemetry.getInstance();
telemetry.optOut();

export default class ApplicationInsightsLogsWebPart extends BaseClientSideWebPart<IAppInsightsWebPartProps> {

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

    const element: React.ReactElement<IApplicationInsightsLogsProps> = React.createElement(ApplicationInsightsLogs, {
      ...this.properties,
      width: this.width,
      userLoginName: this.context.pageContext.user.loginName,
      httpClient: this.context.httpClient,
      aadHttpClientFactory: this.context.aadHttpClientFactory,
      cultureName: this.context.pageContext.legacyPageContext.currentCultureName,
      DisplayMode: this.displayMode,
      onPivotItemChange: this._onPivotItemChange,
      onConfigureAppInsights: this._onConfigureAppInsights,
      onConfigureKustoQuery: this._onConfigureKustoQuery,
      onConfigureListSettings: this._onConfigureListSettings,
      onConfigureChartSettings: this._onConfigureChartSettings,
      onConfigureTimePicker: this._onConfigureTimePicker,
      onConfigureLayoutSettings: this._onConfigureLayoutSettings,
    });

    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      dashboard = React.createElement('div', { style: { padding: teamsPadding }}, element);
    }
    else{
      dashboard=element
    }
    ReactDom.render(dashboard, this.domElement);
  }
  //#region WebPart Properties
  public _onPivotItemChange = (key: string): void => {
    this.properties.pivotKey = key
  }
  public _onConfigureAppInsights = (appId: string, appKey: string): void => {
    this.properties.appId = appId;
    this.properties.appKey = appKey;
  }
  public _onConfigureKustoQuery = (preset: number, config: IAppInsightsQuery): void => {
    this.properties.preset = preset;
    this.properties.query = config.query;
    this.properties.dateSelection = config.dateSelection;
  }
  public _onConfigureTimePicker = (showTimePicker: boolean): void => {
    this.properties.showTimePicker = showTimePicker;
  }
  public _onConfigureListSettings = (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette): void => {
    this.properties.showList = showList;
    this.properties.listStyle = listStyle;
    this.properties.listPalette = listPalette;
  };
  public _onConfigureChartSettings = (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette): void => {
    this.properties.showChart = showChart;
    this.properties.chartStyle = chartStyle;
    this.properties.chartPalette = chartPalette;
  }
  public _onConfigureLayoutSettings = (layout: LayoutStyles): void => {
    this.properties.layoutSettings = layout;
  }
  //#endregion

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  protected get dataVersion(): Version {
    return Version.parse(this.manifest.version);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const cachingOptions: IPropertyPaneDropdownOption[] = Object.keys(CacheExpiration).map((value: string) => {
      return {
        key: value,
        text: CacheExpiration[value as keyof typeof CacheExpiration]
      };
    });

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DevGroupName,
              groupFields: [
                PropertyPaneToggle('isDevMode', {
                  label: strings.IsDevModeLabel,
                  onText: strings.IsDevModeOnText,
                  offText: strings.IsDevModeOffText,
                  checked: this.properties.isDevMode
                }),
                PropertyPaneDropdown('cacheDuration', {
                  label: strings.CacheDurationLabel,
                  options: cachingOptions,
                  selectedKey: this.properties.cacheDuration
                  }),
              ]
            }
          ]
        }
      ]
    };
  }
}
