import { Stack } from "@fluentui/react";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Placeholder } from "@pnp/spfx-controls-react";
import strings from "AppInsightsDasboardWebPartStrings";
import stringsCommon from "CommonDasboardWebPartStrings";
import React from "react";
import AppInsightsHelper, { AppInsightsHelperSSO } from "../../../common/AppInsightsHelper";
import { AppInsightsQueryLogsHelper } from "../../../common/AppInsightsQueryHelper";
import { ThemedPalette } from "../../../common/ColorsHelper";
import { AppInsightsEndpointType, CacheExpiration, ConfigType, IAppInsightsQuery, IDashboardContextProps } from "../../../common/CommonProps";
import { stackStylesMain, stackTokens } from "../../../common/ComponentStyles";
import { ChartStyles, LayoutStyles, ListStyles } from "../../../common/DashboardHelper";
import DashboardConfiguration from "../../../components/DashboardConfiguration/DashboardConfiguration";
import InsightsDashboard from "../../../components/InsightsDashboard/InsightsDashboard";
import { IApplicationInsightsLogsProps } from "./IApplicationInsightsLogsProps";


const ApplicationInsightsDashboard: React.FunctionComponent<IApplicationInsightsLogsProps> = (props) => {
  //#region State
  const [helper, setHelper] = React.useState<AppInsightsHelper | AppInsightsHelperSSO>(null);

  const [isConfigValid, setIsConfigValid] = React.useState<boolean>(false);
  const [kustoQuery, setKustoQuery] = React.useState<string>(props.query);
  const [expiry, setExpiry] = React.useState<CacheExpiration>(props.cacheDuration);// ?? moment().endOf('day').toDate());

  const [showList, setShowList] = React.useState<boolean>(props.showList);
  const [listStyle, setListStyle] = React.useState<number>(props.listStyle);
  const [listPalette, setListPalette] = React.useState<ThemedPalette>(props.listPalette);

  const [showChart, setShowChart] = React.useState<boolean>(props.showChart);
  const [chartStyle, setChartStyle] = React.useState<number>(props.chartStyle);
  const [chartPalette, setChartPalette] = React.useState<ThemedPalette>(props.chartPalette);

  const [layoutSettings, setLayoutSettings] = React.useState<number>(props.layoutSettings);

  const [dateSpan, setDateSpan] = React.useState<string>(props.dateSelection);
  //#endregion

  //#region Methods
  const configureAppInsightsHelper = (isConfigValid: boolean, appId: string, appKey?: string): void => {

    if (isConfigValid && props.isDevMode) {
      const helper = new AppInsightsHelper(
        {
          appId: appId,
          appKey: appKey,
          endpoint: AppInsightsEndpointType.query,
        },
        {
          cacheDuration: props.cacheDuration,
          userLoginName: props.userLoginName,
        },
        props.httpClient);
      setHelper(helper);
    }
    else if (isConfigValid && !props.isDevMode) {
      const helper = new AppInsightsHelperSSO(
        {
          appId: appId,
          aadHttpClientFactory: props.aadHttpClientFactory,
          endpoint: AppInsightsEndpointType.query,
        },
        {
          cacheDuration: props.cacheDuration,
          userLoginName: props.userLoginName,
        });
      setHelper(helper);
    }
    else {
      setHelper(null);
    }
  }
  //#endregion

  //#region Effects
  React.useEffect(() => {

    const initializeSettings = (isDevMode: boolean, appId: string, appKey: string): void => {
      const isValid = AppInsightsQueryLogsHelper.IsConfigValid(isDevMode, appId, appKey);
      setIsConfigValid(isValid);
      configureAppInsightsHelper(isValid, appId, appKey);
    }

    initializeSettings(props.isDevMode, props.appId, props.appKey);

  }, [props.appId, props.appKey, props.isDevMode]);

  React.useEffect(() => {
    setExpiry(props.cacheDuration);
  }, [props.cacheDuration]);

  React.useEffect(() => {
    if (props.preset !== 100) {
      setKustoQuery(AppInsightsQueryLogsHelper.GetQueryById(Number(props.preset)).query);
    }
  }, [props.preset]);
  //#endregion

  //#region Events
  const _onChangeTab = (key: string): void => {
    props.onPivotItemChange(key);
  }
  const _onConfigureAppInsights = (appId: string, appKey: string): void => {
    const isValid = AppInsightsQueryLogsHelper.IsConfigValid(props.isDevMode, props.appId, props.appKey);
    setIsConfigValid(isValid);
    configureAppInsightsHelper(isValid, appId, appKey);

    props.onConfigureAppInsights(appId, appKey);    //save to WP properties
  }
  const _onConfigureQuery = (preset: number, config: IAppInsightsQuery): void => {
    setKustoQuery(config.query);
    setDateSpan(config.dateSelection);

    const chartInfo = AppInsightsQueryLogsHelper.GetChartConfig(config.query);
    if (chartInfo.isSupported) {
      setChartStyle(chartInfo.chartStyle);
    }

    //save to WP properties
    if (preset === 100) {
      props.onConfigureKustoQuery(preset, config)
    }
    else {
      props.onConfigureKustoQuery(preset, { ...config, query: "" })
    }
  }
  const _onConfigureListSettings = (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette): void => {
    setShowList(showList);
    setListStyle(listStyle);
    setListPalette(listPalette);
    props.onConfigureListSettings(showList, listStyle, listPalette);
  }
  const _onConfigureChartSettings = (showChart: boolean, chartStyle: ChartStyles, chartPalette: ThemedPalette): void => {
    setShowChart(showChart);
    setChartStyle(chartStyle);
    setChartPalette(chartPalette)
    props.onConfigureChartSettings(showChart, chartStyle, chartPalette);
  }
  const _onConfigureLayoutSettings = (layout: LayoutStyles): void => {
    setLayoutSettings(layout);
    props.onConfigureLayoutSettings(layout);
  }
  //#endregion

  return (
    <Stack tokens={stackTokens} styles={stackStylesMain}>
      {/* Edit mode */}
      {props.DisplayMode === DisplayMode.Edit &&
        <DashboardConfiguration
          {...props}
          dateSelection={dateSpan}
          configType={ConfigType.ApplicationInsightsLogs}
          onPivotItemChange={_onChangeTab}
          onConfigureAppInsights={_onConfigureAppInsights}
          onConfigureQuery={_onConfigureQuery}
          onConfigureListSettings={_onConfigureListSettings}
          onConfigureChartSettings={_onConfigureChartSettings}
          onConfigureLayoutSettings={_onConfigureLayoutSettings}
        />
      }
      {/* Read mode, needs config */}
      {props.DisplayMode === DisplayMode.Read && (!isConfigValid || !kustoQuery) &&
        <Placeholder iconName='Edit'
          iconText={strings.Config_IconText}
          description={stringsCommon.Config_Desc_ReadMode}
          buttonLabel={stringsCommon.ConfigBtnLabel}
          hideButton={props.DisplayMode === DisplayMode.Read}
        />
      }
      {isConfigValid && kustoQuery && (
        <>
          {/* {props.isDevMode &&
          <MessageBar messageBarType={MessageBarType.severeWarning}>{strings.Msg_AuthWarning}</MessageBar>
        } */}
          <InsightsDashboard
            {...props as IDashboardContextProps}  //has all props not only the ones defined in IDashboardContextProps
            helper={helper}
            dateSpan={dateSpan}
            query={kustoQuery}
            cacheExpiration={expiry}
            showList={showList}
            listStyle={listStyle}
            listPalette={listPalette}
            showChart={showChart}
            chartStyle={chartStyle}
            chartPalette={chartPalette}
            layoutSettings={layoutSettings}
          />
        </>
      )}
    </Stack>
  )
}
export default ApplicationInsightsDashboard;

