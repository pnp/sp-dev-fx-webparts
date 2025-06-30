import { ChoiceGroup, Dropdown, IChoiceGroupOption, IconButton, IDropdownOption, ITooltipProps, Label, Pivot, PivotItem, PrimaryButton, Stack, StackItem, TextField, Toggle, TooltipHost } from "@fluentui/react";
import * as stringsAppIns from "AppInsightsDasboardWebPartStrings";
import stringsCommon from "CommonDasboardWebPartStrings";
import * as stringsCost from "CostInsightsWebPartStrings";

import React from "react";
import { QueryPreset } from "../../common/ApiQueryHelper";
import { AppInsightsQueryLogsHelper } from "../../common/AppInsightsQueryHelper";
import { ThemedPalette } from "../../common/ColorsHelper";
import { dashboardStyles, stackTokens } from "../../common/ComponentStyles";
import CostHelper, { CostManagementScope } from "../../common/CostMngmtQueryHelper";

import { useId } from "@fluentui/react-hooks";
import moment from "moment";
import { AppInsightsEndpointType, ConfigType } from "../../common/CommonProps";
import { linkStyles } from "../../common/ComponentStyles";
import CostMngmtQueryHelper from "../../common/CostMngmtQueryHelper";
import { configChartStyles, configLayoutStyles, configListStyles } from "../../common/DashboardConfig";
import { ChartStyles, ListStyles } from "../../common/DashboardHelper";
import TimeHelper, { TimeSpanCost } from "../../common/TimeHelper";
import DatePickerMenu from "../DatePickerMenu/DatePickerMenu";
import SwatchColorPickerThemed from "../SwatchColorPickerThemed/SwatchColorPickerThemed";
import { IDashboardConfigurationAppInsProps } from "./IDashboardConfigurationAppInsProps";
import { IDashboardConfigurationCostProps } from "./IDashboardConfigurationCostProps";

const DashboardConfigurationCost: React.FunctionComponent<IDashboardConfigurationCostProps | IDashboardConfigurationAppInsProps> = (props) => {
    //#region State
    const tooltipIdApiKey = useId('tooltipIdApiKey');
    const tooltipIdApiId = useId('tooltipIdApiId');

    //AppInsights
    const [showAppInsightsConfig, setShowAppInsightsConfig] = React.useState<boolean>(false);
    const [AppId, setAppId] = React.useState<string>(props.appId);
    const [AppKey, setAppKey] = React.useState<string>(props.appKey);
    const [AppInsightsEndpoint, setAppInsightsEndpoint] = React.useState<string>('');
    //CostManagement
    const [showCostManagementConfig, setShowCostManagementConfig] = React.useState<boolean>(false);
    const [scope, setScope] = React.useState<CostManagementScope>(props.scope);
    const [subscriptionId, setSubscriptionId] = React.useState<string>(props.subscriptionId);
    const [resourceGroupName, setResourceGroupName] = React.useState<string>(props.resourceGroupName);
    const [managementGroupId, setManagementGroupId] = React.useState<string>(props.managementGroupId);
    const [apiEndpoint, setApiEndpoint] = React.useState<string>("");
    //Pivot
    const [selectedTabKey, setSelectedTabKey] = React.useState<string>(props.pivotKey);
    const [selectedPresetKey, setSelectedPresetKey] = React.useState<string | number>(props.preset || 100);
    //Query
    const [presets, setPresets] = React.useState<QueryPreset[]>([]);
    const [presetInfo, setPresetInfo] = React.useState<QueryPreset>(null);
    const [query, setQuery] = React.useState<string>(props.query);
    const [queryLabel, setQueryLabel] = React.useState<string>("");
    const [groupNameQuery, setGroupNameQuery] = React.useState<string>("");
    const [dateSpan, setDateSpan] = React.useState<string>();

    //Layout
    const [showList, setShowList] = React.useState<boolean>(props.showList);
    const [listStyle, setListStyle] = React.useState<ListStyles>(props.listStyle);
    const [listPalette, setListPalette] = React.useState<ThemedPalette>(props.listPalette);

    const [showChart, setShowChart] = React.useState<boolean>(props.showChart);
    const [chartStyle, setChartStyle] = React.useState<ChartStyles>(props.chartStyle);
    const [chartPalette, setChartPalette] = React.useState<ThemedPalette>(props.chartPalette);

    const [layoutSettings, setLayoutSettings] = React.useState<number>(props.layoutSettings);
    //#endregion

    const setDateSpanFromJson = (jsonBody: string): void => {
        if (jsonBody) {
            const json = JSON.parse(jsonBody);

            // userLoginName: props.userLoginName
            if (json.timeframe && json.timeframe !== "Custom") {
                setDateSpan(json.timeframe);
            }
            else if (json.timePeriod?.from && json.timePeriod?.to) {
                const from = moment.utc(json.timePeriod.from).toDate();
                const to = moment.utc(json.timePeriod.to).toDate();
                setDateSpan(`${from.getTime()}-${to.getTime()}`);
            }
        }
        else {
            setDateSpan("MonthToDate");
        }
    }

    //#region Effects
    React.useEffect(() => {
        const setUIConfiguration = (configType: ConfigType,
            costConfig: {
                scope: CostManagementScope,
                subscriptionId?: string;
                resourceGroupName?: string;
                managementGroupId?: string;
            },
            appConfig: {
                appId: string,
            }): void => {

            if (configType === ConfigType.CostManagement) {
                setShowCostManagementConfig(true);
                setQueryLabel(stringsCost.CostQueryLabel);
                setGroupNameQuery(stringsCost.GroupNameCostQuery);
                setApiEndpoint(
                    CostMngmtQueryHelper.GetAPIEndpoint(costConfig.scope, { subscriptionId: costConfig.subscriptionId, resourceGroupName: costConfig.resourceGroupName, managementGroupId: costConfig.managementGroupId })
                );
            }
            else if (configType === ConfigType.ApplicationInsightsLogs) {
                setShowAppInsightsConfig(true)
                setQueryLabel(stringsAppIns.KustoQueryLabel);
                setGroupNameQuery(stringsAppIns.GroupNameKustoQuery);
                setAppInsightsEndpoint(AppInsightsEndpointType.query)
                setApiEndpoint(
                    AppInsightsQueryLogsHelper.GetAPIEndpoint(appConfig.appId, AppInsightsEndpointType.query)
                );
            }
            else if (configType === ConfigType.ApplicationInsightsMetrics) {
                setShowAppInsightsConfig(true)
                setQueryLabel(stringsAppIns.KustoQueryLabel);
                setGroupNameQuery(stringsAppIns.GroupNameKustoQuery);
                setAppInsightsEndpoint(AppInsightsEndpointType.metrics)
                setApiEndpoint(
                    AppInsightsQueryLogsHelper.GetAPIEndpoint(appConfig.appId, AppInsightsEndpointType.metrics)
                );
            }
        }
        const setQueryConfiguration = (configType: ConfigType, preset: number, query: string): void => {
            const getPreset = (configType: ConfigType): QueryPreset[] => {
                switch (configType) {
                    case ConfigType.CostManagement:
                        return CostHelper.Presets;
                    case ConfigType.ApplicationInsightsLogs:
                        return AppInsightsQueryLogsHelper.Presets;
                    case ConfigType.ApplicationInsightsMetrics:
                        return [];
                }
            }

            const presets = getPreset(configType);

            if (presets.length > 0) {
                setPresets(presets)
                const querySet = presets.find(p => p.key === Number(preset));
                setPresetInfo(querySet);
                setQuery(preset === 100
                    ? query
                    : querySet.query)

                if (configType === ConfigType.CostManagement) {
                    const jsonBody = (preset === 100
                        ? query
                        : querySet.query);

                    setDateSpanFromJson(jsonBody)
                }
            }
        }
        setUIConfiguration(props.configType,
            { scope: props.scope, subscriptionId: props.subscriptionId, resourceGroupName: props.resourceGroupName, managementGroupId: props.managementGroupId },
            { appId: props.appId }
        );
        setQueryConfiguration(props.configType, props.preset, props.query);
    }, [
        props.configType, props.preset, props.query,
        props.scope, props.subscriptionId, props.resourceGroupName, props.managementGroupId,
        props.appId
    ]);


    React.useEffect(() => {
        if (props.dateSelection) {
            setDateSpan(props.dateSelection);
        }
    }, [props.dateSelection]);
    //#endregion

    //#region Pivot
    const _applyChangeTab = (key: string): void => {
        setSelectedTabKey(key);
        props.onPivotItemChange(key);
    }
    const _onChangeTab = (item?: PivotItem): void => {
        _applyChangeTab(item.props.itemKey)
    }
    //#endregion

    //#region CostManagement Configuration
    const _onChangeScope = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setScope(Number(item.key));
        setApiEndpoint(
            CostMngmtQueryHelper.GetAPIEndpoint(Number(item.key), { subscriptionId: subscriptionId, managementGroupId: managementGroupId, resourceGroupName: resourceGroupName })
        );
    }
    const _onChangeSubscriptionId = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setSubscriptionId(newValue.trim());
        setApiEndpoint(
            CostMngmtQueryHelper.GetAPIEndpoint(scope, { subscriptionId: newValue.trim() })
        );
    }
    const _onChangeResourceGroupName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setResourceGroupName(newValue.trim());
        setApiEndpoint(
            CostMngmtQueryHelper.GetAPIEndpoint(scope, { subscriptionId: subscriptionId, resourceGroupName: newValue.trim() })
        );
    }
    const _onChangeManagementGroupId = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setManagementGroupId(newValue.trim());
        setApiEndpoint(
            CostMngmtQueryHelper.GetAPIEndpoint(scope, { managementGroupId: newValue.trim() })
        );
    }
    const _applyCostManagementConfiguration = (): void => {

        const config = {
            scope: scope,
            subscriptionId: subscriptionId,
            resourceGroupName: resourceGroupName,
            managementGroupId: managementGroupId
        }
        props.onConfigureCostManagementScope(config);
    }
    //#endregion

    //#region ApplicationInsights Configuration
    const _onChangeAppId = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setAppId(newValue.trim());
        setApiEndpoint(
            AppInsightsQueryLogsHelper.GetAPIEndpoint(newValue.trim(), AppInsightsEndpoint)
        )
    }
    const _onChangeAppKey = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setAppKey(newValue.trim());
    }
    const _applyAppInsightsConfiguration = (): void => {
        props.onConfigureAppInsights(AppId, AppKey);    //save to WP properties
    }
    //#region Tooltips
    const tooltipPropsAppId: ITooltipProps = {
        onRenderContent: () => (
            <div dangerouslySetInnerHTML={{ __html: stringsAppIns.HelpAppInsightsAppId }} />
        ),
    };
    const tooltipPropsAppKey: ITooltipProps = {
        onRenderContent: () => (
            <div dangerouslySetInnerHTML={{ __html: stringsAppIns.HelpAppInsightsAppKey }} />
        ),
    };
    //#endregion


    //#endregion

    //#region Query Configuration
    const _onChangePreset = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setSelectedPresetKey(item.key);
        const querySet = presets.find(p => p.key === Number(item.key));
        setPresetInfo(querySet);
        setQuery(querySet.query);
        if (props.configType === ConfigType.CostManagement) {
            // setDateSpanFromJson(querySet.query)
            setDateSpan("MonthToDate");
        }
    };
    const _onDateSelectedCostManagement = (timeSpan: string): void => {
        if (Object.keys(TimeSpanCost).includes(timeSpan)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, timeframe, timePeriod, ...rest } = JSON.parse(query);  //remove "timePeriod" property from json
            const json = {
                type,
                timeframe: timeSpan,
                ...rest
            }
            setQuery(JSON.stringify(json, null, 2));
        }
        else {
            const dates = timeSpan.split('-');
            if (dates.length === 2) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { type, timeframe, timePeriod, ...rest } = JSON.parse(query);   //remove "timeframe" property from json
                const json = {
                    type,
                    timeframe: "Custom",
                    timePeriod: {
                        "from": moment.utc(Number(dates[0])).format('YYYY-MM-DDTHH:mm:ss+00:00'),
                        "to": moment.utc(Number(dates[1])).format('YYYY-MM-DDTHH:mm:ss+00:00')
                    },
                    ...rest
                }
                setQuery(JSON.stringify(json, null, 2));
            }

        }
        setDateSpan(timeSpan);

    }
    const _onDateSelectedAppInsights = (timeSpan: string): void => {
        setDateSpan(timeSpan)
    }
    const _onChangeQueryAppInsights = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setQuery(newValue || '');
    };
    const _onChangeQueryCostManagement = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setQuery(newValue || '');
        if(newValue!==""){
            setDateSpanFromJson(newValue)
        }
    }

    const _applyQueryConfiguration = (): void => {
        if (query === presetInfo.query) {
            props.onConfigureQuery(presetInfo.key,
                {
                    query: query,
                    dateSelection: dateSpan,
                })
        }
        else {
            props.onConfigureQuery(100,
                {
                    query: query,
                    dateSelection: dateSpan,
                })
        }
    }
    //#endregion

    //#region Layouts
    const _onChangeShowList = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
        setShowList(checked);
        props.onConfigureListSettings(checked, listStyle, listPalette);
    }
    const _onChangeShowChart = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
        setShowChart(checked);
        props.onConfigureChartSettings(checked, chartStyle, chartPalette);
    }
    const _onChangeLayoutSettings = (event?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IChoiceGroupOption): void => {
        setLayoutSettings(Number(option.key));
        props.onConfigureLayoutSettings(Number(option.key));
    }
    //#endregion

    //#region List Configuration
    const _onChangeListStyle = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
        setListStyle(Number(option.key));
        props.onConfigureListSettings(showList, Number(option.key), listPalette);
    }
    const _onChangeListPalette = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
        setListPalette(Number(option.key));
        props.onConfigureListSettings(showList, listStyle, Number(option.key));
    }
    //#endregion

    //#region Chart Configuration
    const _onChangeChartStyle = (event?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IChoiceGroupOption): void => {
        setChartStyle(Number(option.key));
        props.onConfigureChartSettings(showChart, Number(option.key), chartPalette);
    }
    const _onChangeChartPalette = (event?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IChoiceGroupOption): void => {
        setChartPalette(Number(option.key));
        props.onConfigureChartSettings(showChart, chartStyle, Number(option.key));
    }
    //#endregion

    return <>
        <Pivot aria-label="Configuration" selectedKey={selectedTabKey} onLinkClick={_onChangeTab} styles={dashboardStyles.pivot} >
            <PivotItem
                headerText={stringsCommon.GroupNameConnection}
                itemIcon="PlugConnected"
                itemKey="0"
            >
                {showCostManagementConfig &&
                    <Stack tokens={stackTokens}>
                        <Dropdown
                            label={stringsCost.ScopeLabel}
                            selectedKey={scope}
                            options={CostHelper.Scopes}
                            onChange={_onChangeScope}
                        />
                        {(scope === CostManagementScope.Subscription || scope === CostManagementScope.ResourceGroup) &&
                            <TextField
                                label={stringsCost.SubIdLabel}
                                value={subscriptionId}
                                hidden={scope !== CostManagementScope.Subscription}
                                required={scope !== CostManagementScope.Subscription}
                                onChange={_onChangeSubscriptionId}
                            />
                        }
                        {scope === CostManagementScope.ResourceGroup &&
                            <TextField
                                label={stringsCost.ResourceGroupLabel}
                                value={resourceGroupName}
                                hidden={scope !== CostManagementScope.ResourceGroup}
                                required={scope === CostManagementScope.ResourceGroup}
                                onChange={_onChangeResourceGroupName}
                            />
                        }
                        {scope === CostManagementScope.ManagementGroup &&
                            <TextField
                                label={stringsCost.ManagementGroupLabel}
                                value={managementGroupId}
                                hidden={scope !== CostManagementScope.ManagementGroup}
                                required={scope === CostManagementScope.ManagementGroup}
                                onChange={_onChangeManagementGroupId}
                            />
                        }
                        <Label styles={linkStyles}>{apiEndpoint}</Label>
                        <PrimaryButton
                            text={stringsCommon.ApplyBtnLabel}
                            onClick={_applyCostManagementConfiguration}
                            styles={dashboardStyles.applyBtn} />
                    </Stack>
                }
                {showAppInsightsConfig &&
                    <Stack tokens={stackTokens}>
                        <Stack horizontal tokens={stackTokens}>
                            <Label required>{stringsAppIns.AppIdLabel}</Label>
                            <TooltipHost
                                tooltipProps={tooltipPropsAppId}
                                id={tooltipIdApiId}
                            >
                                <IconButton iconProps={dashboardStyles.helpIcon} aria-describedby={tooltipIdApiId} />
                            </TooltipHost>
                        </Stack>
                        <TextField
                            value={AppId}
                            onChange={_onChangeAppId}
                        />
                        {props.isDevMode &&
                            <>
                                <Stack horizontal tokens={stackTokens}>
                                    <Label required>{stringsAppIns.AppKeyLabel}</Label>
                                    <TooltipHost
                                        tooltipProps={tooltipPropsAppKey}
                                        id={tooltipIdApiKey}
                                    >
                                        <IconButton iconProps={dashboardStyles.helpIcon} aria-describedby={tooltipIdApiKey} />
                                    </TooltipHost>
                                </Stack>
                                <TextField
                                    value={AppKey}
                                    onChange={_onChangeAppKey}
                                    type="password"
                                    canRevealPassword
                                />
                            </>
                        }
                        <Label styles={linkStyles}>{apiEndpoint}</Label>
                        <PrimaryButton
                            text={stringsCommon.ApplyBtnLabel}
                            onClick={_applyAppInsightsConfiguration}
                            styles={dashboardStyles.applyBtn} />
                    </Stack>
                }
            </PivotItem>
            {/* Query */}
            <PivotItem
                headerText={groupNameQuery}
                itemIcon="AnalyticsQuery" //CodeEdit
                itemKey="1"
            >
                <Stack tokens={stackTokens} >
                    <Dropdown
                        label={queryLabel}
                        selectedKey={selectedPresetKey}
                        options={presets}
                        onChange={_onChangePreset}
                    />
                    {showCostManagementConfig &&
                        <>
                            <DatePickerMenu
                                onDateSelected={_onDateSelectedCostManagement}
                                timeSpanMenus={TimeHelper.CostManagementTimeOptions}
                                cultureName={props.cultureName}
                                initialValue={dateSpan} />
                            <TextField
                                label={presetInfo?.description ?? ''}
                                key={presetInfo?.key}
                                value={query}
                                onChange={_onChangeQueryCostManagement}
                                multiline={true}
                                autoAdjustHeight
                                spellCheck={false}
                            />
                        </>
                    }
                    {showAppInsightsConfig &&
                        <>
                            <DatePickerMenu
                                onDateSelected={_onDateSelectedAppInsights}
                                timeSpanMenus={TimeHelper.AppInsightsTimeOptions}
                                cultureName={props.cultureName}
                                initialValue={dateSpan} />
                            <TextField
                                label={presetInfo?.description ?? ''}
                                key={presetInfo?.key}
                                value={query}
                                onChange={_onChangeQueryAppInsights}
                                multiline={true}
                                autoAdjustHeight
                                spellCheck={false}
                            />
                        </>
                    }
                    <Label styles={linkStyles}>{apiEndpoint}</Label>
                    <PrimaryButton
                        text={stringsCommon.ApplyBtnLabel}
                        onClick={_applyQueryConfiguration}
                        disabled={!query}
                        styles={dashboardStyles.applyBtn}
                    />
                </Stack>
            </PivotItem>
            {/* Layout */}
            <PivotItem
                headerText={stringsCommon.GroupNameLook}
                itemIcon="DoubleColumnEdit"
                itemKey="2"
            >
                <Stack >
                    <Toggle
                        label={stringsCommon.LookShowList}
                        inlineLabel
                        checked={showList}
                        onChange={_onChangeShowList}
                    />
                    <Toggle
                        label={stringsCommon.LookShowChart}
                        inlineLabel
                        checked={showChart}
                        onChange={_onChangeShowChart}
                    />
                    <StackItem hidden={!showList || !showChart}>
                        <ChoiceGroup
                            label={stringsCommon.LookLayout}
                            options={configLayoutStyles}
                            selectedKey={layoutSettings.toString()}
                            onChange={_onChangeLayoutSettings}
                        />
                    </StackItem>
                </Stack>
            </PivotItem>
            {/* List */}
            <PivotItem
                headerText={stringsCommon.GroupNameLookList}
                itemIcon="NumberedListText"
                itemKey="3"
            >
                <Stack>
                    <ChoiceGroup
                        label={stringsCommon.LookListStyle}
                        options={configListStyles}
                        selectedKey={listStyle.toString()}
                        onChange={_onChangeListStyle}
                    />
                    {listStyle === ListStyles.heatmap &&
                        <SwatchColorPickerThemed
                            themePalette={listPalette.toString()}
                            onChangeColorPalette={_onChangeListPalette}
                            configThemePalette={[
                                ThemedPalette.ThemeMonochromatic,
                                ThemedPalette.AccentYellow,
                                ThemedPalette.AccentOrange,
                                ThemedPalette.AccentRed,
                                ThemedPalette.AccentMagenta,
                                ThemedPalette.AccentPurple,
                                ThemedPalette.AccentBlue,
                                ThemedPalette.AccentTeal,
                                ThemedPalette.AccentGreen,
                            ]}
                        />
                    }
                </Stack>
            </PivotItem>
            {/* Chart */}
            <PivotItem
                headerText={stringsCommon.GroupNameLookChart}
                itemIcon="BarChart4"
                itemKey="4"
            >
                <ChoiceGroup
                    label={stringsCommon.LookChartStyle}
                    options={configChartStyles}
                    selectedKey={chartStyle.toString()}
                    onChange={_onChangeChartStyle}
                />
                <SwatchColorPickerThemed
                    themePalette={chartPalette.toString()}
                    onChangeColorPalette={_onChangeChartPalette}
                    configThemePalette={[
                        ThemedPalette.ThemeAccents,
                        ThemedPalette.ThemeMonochromatic,
                        ThemedPalette.AccentYellow,
                        ThemedPalette.AccentOrange,
                        ThemedPalette.AccentRed,
                        ThemedPalette.AccentMagenta,
                        ThemedPalette.AccentPurple,
                        ThemedPalette.AccentBlue,
                        ThemedPalette.AccentTeal,
                        ThemedPalette.AccentGreen,
                    ]}
                />
            </PivotItem>
        </Pivot>

    </>
}

export default DashboardConfigurationCost;