import { Stack } from '@fluentui/react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { AadHttpClientFactory } from '@microsoft/sp-http';
import { Placeholder } from '@pnp/spfx-controls-react';
import stringsCommon from 'CommonDasboardWebPartStrings';
import strings from 'CostInsightsWebPartStrings';
import * as React from 'react';
import { ThemedPalette } from '../../../common/ColorsHelper';
import { CacheExpiration, ConfigType, ICostManagementConfig, ICostManagementQuery, IDashboardContextProps } from '../../../common/CommonProps';
import { stackStylesMain, stackTokens } from '../../../common/ComponentStyles';
import CostMngmtHelper from '../../../common/CostMngmtHelper';
import { default as CostHelper, default as CostMngmtQueryHelper } from '../../../common/CostMngmtQueryHelper';
import { ChartStyles, LayoutStyles, ListStyles } from '../../../common/DashboardHelper';
import DashboardConfiguration from '../../../components/DashboardConfiguration/DashboardConfiguration';
import InsightsDashboard from '../../../components/InsightsDashboard/InsightsDashboard';
import { ICostInsightsDashboardProps } from './ICostInsightsDashboardProps';

const CostInsightsDashboard: React.FunctionComponent<ICostInsightsDashboardProps> = (props) => {
  //#region State
  const [helper, setHelper] = React.useState<CostMngmtHelper>(null); //if helper change doesn't trigger refresh (it's an object), use key instead

  const [isConfigValid, setIsConfigValid] = React.useState<boolean>(false);
  const [costQuery, setCostQuery] = React.useState<string>(props.query);
  const [expiry] = React.useState<CacheExpiration>(props.cacheDuration);// ?? moment().endOf('day').toDate());

  const [showList, setShowList] = React.useState<boolean>(props.showList);
  const [listStyle, setListStyle] = React.useState<number>(props.listStyle);
  const [listPalette, setListPalette] = React.useState<ThemedPalette>(props.listPalette);

  const [showChart, setShowChart] = React.useState<boolean>(props.showChart);
  const [chartStyle, setChartStyle] = React.useState<number>(props.chartStyle);
  const [chartPalette, setChartPalette] = React.useState<ThemedPalette>(props.chartPalette);

  const [layoutSettings, setLayoutSettings] = React.useState<number>(props.layoutSettings);

  //#endregion

  //#region Methods
  const configureCostManagementHelper = (config: ICostManagementConfig, aadHttpClientFactory: AadHttpClientFactory): void => {

    if (config) {
      setHelper(
        new CostMngmtHelper(config,
          {
            cacheDuration: props.cacheDuration?? CacheExpiration.OneDay,
            userLoginName: props.userLoginName,
          },
          aadHttpClientFactory)
      );
    }
    else {
      setHelper(null);
    }
  }
  //#endregion

  //#region Effects
  React.useEffect(() => {

    const config = {
      scope: props.scope,
      subscriptionId: props.subscriptionId,
      resourceGroupName: props.resourceGroupName,
      managementGroupId: props.managementGroupId
    }
    const isValid = CostMngmtQueryHelper.IsConfigValid(config);
    setIsConfigValid(isValid);
    configureCostManagementHelper(
      isValid
        ? config
        : null,
      props.aadHttpClientFactory
    );

  }, [props.scope, props.subscriptionId, props.resourceGroupName, props.managementGroupId]);

  React.useEffect(() => {
    if (props.preset !== 100) {
      setCostQuery(CostHelper.GetQueryById(Number(props.preset)).query);
    }
  }, [props.preset]);
  //#endregion

  //#region Events
  const _onChangeTab = (key: string): void => {
    props.onPivotItemChange(key);
  }
  const _onConfigureCostManagementScope = (config: ICostManagementConfig): void => {
    const isValid = CostMngmtQueryHelper.IsConfigValid(config);
    setIsConfigValid(isValid);
    configureCostManagementHelper(
      isValid
        ? config
        : null,
      props.aadHttpClientFactory);

    props.onConfigureCostManagementScope(config); //save to WP Properties
  }
  const _onConfigureCostQuery = (preset: number, config: ICostManagementQuery): void => {
    setCostQuery(config.query);

    if (preset === 100) {
      props.onConfigureCostQuery(preset, config)  //save to WP properties
    }
    else {
      props.onConfigureCostQuery(preset, { ...config, query: "" })  //save to WP properties
    }
  }
  const _onConfigureListSettings = (showList: boolean, listStyle: ListStyles, listPalette: ThemedPalette): void => {
    setShowList(showList);
    setListStyle(listStyle);
    setListPalette(listPalette)
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
          configType={ConfigType.CostManagement}
          onPivotItemChange={_onChangeTab}
          onConfigureCostManagementScope={_onConfigureCostManagementScope}
          onConfigureQuery={_onConfigureCostQuery}
          onConfigureListSettings={_onConfigureListSettings}
          onConfigureChartSettings={_onConfigureChartSettings}
          onConfigureLayoutSettings={_onConfigureLayoutSettings}
        />
      }
      {/* Read mode, needs config */}
      {props.DisplayMode === DisplayMode.Read && (!isConfigValid || !costQuery) &&
        <Placeholder iconName='Edit'
          iconText={strings.Config_IconText}
          description={stringsCommon.Config_Desc_ReadMode}
          buttonLabel={stringsCommon.ConfigBtnLabel}
          hideButton={props.DisplayMode === DisplayMode.Read}
        />
      }
      {isConfigValid && costQuery && (
        <InsightsDashboard
          {...props as IDashboardContextProps}  //has all props not only the ones defined in IDashboardContextProps
          helper={helper}
          query={costQuery}
          cacheExpiration={expiry}
          showList={showList}
          listStyle={listStyle}
          listPalette={listPalette}
          showChart={showChart}
          chartStyle={chartStyle}
          chartPalette={chartPalette}
          layoutSettings={layoutSettings}
        />
      )}
    </Stack>
  );
}

export default CostInsightsDashboard;