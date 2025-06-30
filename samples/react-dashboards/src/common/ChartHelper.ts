/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep, merge, uniq } from "@microsoft/sp-lodash-subset";
import { ChartType, PaletteGenerator } from "@pnp/spfx-controls-react";
import stringsCommon from "CommonDasboardWebPartStrings";
import { ChartData, ChartDataSets, ChartOptions, TimeUnit } from "chart.js";
import moment from "moment";
import { ColumnsInfo, DataTypesInfo } from "../components/InsightsChart/IInsightsChartProps";
import ApiHelper from "./ApiHelper";
import { ChartOptionsConfig, DataSetStylesConfig } from "./ChartConfigHelper";
import ColorsHelper, { ThemedPalette } from "./ColorsHelper";
import { ChartStyles } from "./DashboardHelper";

export enum ChartAxis {
    "x",
    "y"
}

export default class ChartHelper {
    private static OPACITY = 0.7;

    private static GetColValues_TimeAxisX = (items: any[], colName_Label: string, colName_Value: string): { x: number; y: Date; }[] => {
        return items.map(
            i => {
                return {
                    x: Number(Number(i[colName_Value]).toFixed(3)),
                    y: moment(i[colName_Label]).toDate(),
                }
            }
        )
    }
    private static GetColValues_TimeAxisY = (items: any[], colName_Label: string, colName_Value: string): { x: Date; y: number; }[] => {
        return items.map(
            i => {
                return {
                    x: moment(i[colName_Label]).toDate(),
                    y: Number(Number(i[colName_Value]).toFixed(3))
                }
            }
        )
    }
    private static GetColValues_PointFormat = (items: any[], colName_Label: string, colName_Value: string): { x: number; y: number; }[] => {
        return items.map(
            i => {
                return {
                    x: Number(Number(i[colName_Label]).toFixed(3)),
                    y: Number(Number(i[colName_Value]).toFixed(3))
                }
            }
        )
    }
    private static GetColValues_Number = (items: any[], colName_Value: string): number[] => {
        return items.map(i => Number(Number(i[colName_Value]).toFixed(3)));
    }
    private static GetLabels = (items: any[], colName_Label: string): string[] | Date[] => {
        return items.map(i => i[colName_Label]);
    }
    public static GetText = (value: string | number, length: number): string => {
        const val = value.toString();
        return val.length > length ? val.substring(0, length) + '...' : val;
    }

    public static GetDataInfo = (items: any[], dataTypes: Map<string, string>, chartType?: ChartStyles): DataTypesInfo => {

        const _getStackingSupport = (chartType: ChartStyles, colLength: number): boolean => {
            return (chartType === ChartStyles.barchart || chartType === ChartStyles.columnchart) && (colLength > 1)
        }
        const _getTimeAxisSupport = (chartType: ChartStyles, colLength: number): boolean => {
            return colLength > 0 && chartType !== ChartStyles.piechart;
        }
        const _getChartTypeSupport = (dataTypes: Map<string, string>, chartStyle?: ChartStyles): { isSupported: boolean, error?: string } => {

            const supportedChartTypes: ChartType[] = ChartHelper.GetSupportedChartTypes(dataTypes);
            const currChartType: ChartType = ChartHelper.GetChartType(chartStyle);
            if (supportedChartTypes.includes(currChartType)) {
                return {
                    isSupported: true
                }
            }
            else {
                switch (currChartType) {
                    case ChartType.Pie:
                        return {
                            isSupported: false,
                            error: stringsCommon.Msg_FailedVisErrPie// "Pie needs 1 num column"
                        }
                    default:
                        return {
                            isSupported: false,
                            error: stringsCommon.Msg_FailedVisErrOneNumerical// "No num columns found"
                        }
                }
            }
        }
        const _hasDifferentDates = (items: any[], colName_DateTime: string): boolean => {
            const i = items.map(i => i[colName_DateTime]);
            return uniq(i).length > 1;
        }
        const _getTimeGranularity = (items: any[], colName_DateTime: string): TimeUnit => {
            const i = items.map(i => i[colName_DateTime]);
            const uniqDates = uniq(i);
            if (uniqDates.length > 1) {
                const diff = moment(uniqDates[1]).diff(moment(uniqDates[0]));
                if (diff < 1000 * 60 * 60 * 24) {
                    return 'hour';
                }
                else if (diff < 1000 * 60 * 60 * 24 * 30) {
                    return 'day';
                }
                else if (diff < 1000 * 60 * 60 * 24 * 365) {
                    return 'month';
                }
                else {
                    return 'year';
                }
            }
            else {
                return 'day';
            }
        }

        //not supported in a chart:'bool', 'boolean', 'dynamic','guid', 'timespan', 'time'
        const colName_Number = ApiHelper.GetColByTypes(dataTypes, ApiHelper.NumericTypes);
        const colName_DateTime = ApiHelper.GetColByTypes(dataTypes, ApiHelper.DateTimeTypes);
        const colName_String = ApiHelper.GetColByTypes(dataTypes, ApiHelper.StringTypes);

        //stacking is suppored only for barchart and columnchart
        const stackSupported = _getStackingSupport(chartType, colName_Number.length);
        const timeAxisSupported = _getTimeAxisSupport(chartType, colName_DateTime.length) && _hasDifferentDates(items, colName_DateTime[0]);
        const chartTypeSupported = _getChartTypeSupport(dataTypes, chartType);
        const timeGranularity = timeAxisSupported ? _getTimeGranularity(items, colName_DateTime[0]) : undefined;

        return {
            colNumber: colName_Number,
            colDateTime: colName_DateTime,
            colString: colName_String,
            isStacked: stackSupported,
            hasTimeAxis: timeAxisSupported,
            timeGranularity: timeGranularity,
            isSupported: chartTypeSupported.isSupported, //isChartTypeSupported
            errorMsg: chartTypeSupported.error
        }
    }
    public static GetChartType = (chartStyle?: ChartStyles): ChartType => {
        switch (chartStyle) {
            case ChartStyles.barchart:
                return ChartType.HorizontalBar;
            case ChartStyles.columnchart:
                return ChartType.Bar;
            case ChartStyles.piechart:
                return ChartType.Pie;
            case ChartStyles.areachart:
            case ChartStyles.linechart:
            default:
                return ChartType.Line;
        }
    }
    public static GetChartData = (items: any[], hasTimeAxis: boolean, isHorizontal: boolean, columnsInfo: ColumnsInfo, chartType: ChartType, fillChart: boolean, chartPalette: ThemedPalette): ChartData => {
        const _getColors = (chartType: ChartType, itemsLength: number, valuesLength: number): string[] => {
            return chartType === ChartType.Pie
                ? ColorsHelper.GetThemeMonochromaticColors(chartPalette as ThemedPalette, itemsLength).Colors
                : ColorsHelper.GetThemeMonochromaticColors(chartPalette as ThemedPalette, valuesLength).Colors
        }
        const _getColumnsInfo = (columnsInfo: ColumnsInfo, hasTimeAxis: boolean): { label: string, values: string[], series: string[] } => {
            if (hasTimeAxis) {
                return {
                    label: columnsInfo.colDateTime[0],
                    values: columnsInfo.colNumber,
                    series: columnsInfo.colString
                }
            } else if (columnsInfo.colString[0] ?? columnsInfo.colDateTime[0]) {
                return {
                    label: columnsInfo.colString[0] ?? columnsInfo.colDateTime[0],
                    values: columnsInfo.colNumber,
                    series: columnsInfo.colString.splice(0, 1)
                }
            }
            else {
                return {
                    label: columnsInfo.colNumber[0],
                    values: columnsInfo.colNumber.slice(1),
                    series: columnsInfo.colString
                }
            }
        }
        const _getGroupedBySeries = (series: string[], items: any[]): Map<string, any> => {
            const groupBy = series[0]

            return items.reduce((prev: Map<string, any>, curr) => {
                const { [groupBy]: groupByVal, ...rest } = curr;
                prev.set(groupByVal, prev.has(groupByVal) ? [...prev.get(groupByVal), rest] : [rest]);

                return prev;
            }, new Map<string, any>());
        }
        const _getDataTimeAxis = (items: any[], colName_Label: string, colName_Values: string[], series: string[], chartDataConfig: ChartDataSets, isHorizontal: boolean, fillChart: boolean): ChartData => {

            if (colName_Values.length === 1 && series.length > 0) {
                let count = 0;
                const dataSets: ChartDataSets[] = []
                const groupedBySeries = _getGroupedBySeries(series, items);
                const colors = ColorsHelper.GetThemeMonochromaticColors(chartPalette as ThemedPalette, groupedBySeries.size).Colors

                groupedBySeries.forEach((value: any, key: string) => {
                    const _color = colors[count++];
                    const dataSet: ChartDataSets = {
                        label: key,
                        data: isHorizontal
                            ? ChartHelper.GetColValues_TimeAxisX(value, colName_Label, colName_Values[0])
                            : ChartHelper.GetColValues_TimeAxisY(value, colName_Label, colName_Values[0]),
                        fill: fillChart,
                        backgroundColor: PaletteGenerator.alpha(_color, ChartHelper.OPACITY),
                        borderColor: _color,
                        ...chartDataConfig
                    }
                    dataSets.push(dataSet);
                });
                return {
                    datasets: dataSets
                }
            }
            else {
                const colors = ColorsHelper.GetThemeMonochromaticColors(chartPalette as ThemedPalette, colName_Values.length).Colors
                return {
                    datasets: colName_Values.map((col: string, index: number) => {
                        const _color = colors[index];
                        return {
                            label: col,
                            data: isHorizontal
                                ? ChartHelper.GetColValues_TimeAxisX(items, colName_Label, col)
                                : ChartHelper.GetColValues_TimeAxisY(items, colName_Label, col),
                            fill: fillChart,
                            backgroundColor: PaletteGenerator.alpha(_color, ChartHelper.OPACITY),
                            borderColor: _color,
                            ...chartDataConfig
                        }
                    })
                };
            }
        }
        const _getDataPie = (items: any[], colName_Label: string, colName_Values: string[], chartDataConfig: ChartDataSets, fillChart: boolean, colors: string[]): ChartData => {

            return {
                labels: ChartHelper.GetLabels(items, colName_Label),
                datasets: colName_Values.map((col: string, index: number) => {
                    return {
                        label: col,
                        data: ChartHelper.GetColValues_Number(items, col),
                        fill: fillChart,
                        backgroundColor: PaletteGenerator.alpha(colors, ChartHelper.OPACITY),
                        borderWidth: 0,
                        ...chartDataConfig
                    }
                })
            };
        }
        const _getData = (items: any[], colName_Label: string, colName_Values: string[], chartDataConfig: ChartDataSets, fillChart: boolean, colors: string[]): ChartData => {

            return {
                labels: ChartHelper.GetLabels(items, colName_Label),
                datasets: colName_Values.map((col: string, index: number) => {
                    return {
                        label: col,
                        data: ChartHelper.GetColValues_Number(items, col),
                        fill: fillChart,
                        backgroundColor: PaletteGenerator.alpha(colors[index], ChartHelper.OPACITY),
                        borderColor: colors[index],
                        ...chartDataConfig
                    }
                })
            };
        }


        const dataSetStylesConfig = ChartHelper.GetDataSetStylesConfig(chartType, hasTimeAxis);
        const colsInfo = _getColumnsInfo(columnsInfo, hasTimeAxis);
        const colors = _getColors(chartType, items.length, colsInfo.values.length);

        //no time axis, all other charts => [labels, data]
        //time Axis but just 1 date => hasTimeAxis=false, get string column as label

        if (chartType === ChartType.Pie) {
            return _getDataPie(
                items,
                colsInfo.label,
                colsInfo.values,
                dataSetStylesConfig,
                fillChart,
                colors
            );
        }
        else if (hasTimeAxis) {
            return _getDataTimeAxis(
                items,
                colsInfo.label,
                colsInfo.values,
                colsInfo.series,
                dataSetStylesConfig,
                isHorizontal,
                fillChart,
            );
        }
        else {
            return _getData(
                items,
                colsInfo.label,
                colsInfo.values,
                dataSetStylesConfig,
                fillChart,
                colors
            )
        }
    }
    public static GetDataSetStylesConfig = (chartType: ChartType, hasTimeAxis: boolean): {} => {
        switch (chartType) {
            case ChartType.Line:
                return DataSetStylesConfig.Line;
            case ChartType.Bar://column
                return hasTimeAxis ? DataSetStylesConfig.BarTime : DataSetStylesConfig.Bar;
            case ChartType.HorizontalBar:
                return hasTimeAxis ? DataSetStylesConfig.BarTime : DataSetStylesConfig.Bar;
            case ChartType.Pie:
                return DataSetStylesConfig.Pie;
            default:
                return DataSetStylesConfig.None;
        }
    }
    public static GetSupportedChartTypes = (dataTypes: Map<string, string>): ChartType[] => {
        const colName_Number = ApiHelper.GetColByTypes(dataTypes, ApiHelper.NumericTypes);
        const colName_DateTime = ApiHelper.GetColByTypes(dataTypes, ApiHelper.DateTimeTypes);
        const colName_String = ApiHelper.GetColByTypes(dataTypes, ApiHelper.StringTypes);

        const chartTypes: ChartType[] = [];
        if (colName_Number.length > 0) {
            chartTypes.push(ChartType.Line);
            chartTypes.push(ChartType.Bar);
            chartTypes.push(ChartType.HorizontalBar);
        }
        if (colName_DateTime.length > 0) {
            chartTypes.push(ChartType.Line);
            chartTypes.push(ChartType.Bar);
            chartTypes.push(ChartType.HorizontalBar);
        }
        if (colName_String.length > 0 && colName_Number.length < 2) {
            chartTypes.push(ChartType.Pie);
        }
        return chartTypes;
    }

    public static GetChartOptions = (chartType: ChartType, hasTimeAxis: boolean, timeGranularity: TimeUnit, isStacked: boolean): ChartOptions => {

        const options = ChartHelper.getOptions(chartType, hasTimeAxis, timeGranularity)
        if (hasTimeAxis && timeGranularity !== undefined) {
            if (options.scales.xAxes[0].time?.unit) {
                options.scales.xAxes[0].time.unit = timeGranularity;
            }
            if (options.scales.yAxes[0].time?.unit) {
                options.scales.yAxes[0].time.unit = timeGranularity;
            }
        }

        return isStacked
            ? ChartHelper.configureStacked(options)
            : options;
    }
    private static mergeOptionsX = (options: ChartOptions, timeGranularity: TimeUnit): ChartOptions => {
        if (timeGranularity !== undefined)
            return merge({}, options, ChartOptionsConfig.TimeXGranularity(timeGranularity))
        else
            return options;
    }
    private static mergeOptionsY = (options: ChartOptions, timeGranularity: TimeUnit): ChartOptions => {
        if (timeGranularity !== undefined)
            return merge({}, options, ChartOptionsConfig.TimeYGranularity(timeGranularity))
        else
            return options;
    }

    private static getOptions = (chartType: ChartType, hasTimeAxis: boolean, timeGranularity: TimeUnit): ChartOptions => {

        let chartOption = {}
        switch (chartType) {
            case ChartType.Line: {
                chartOption = hasTimeAxis
                    ? ChartHelper.mergeOptionsX(ChartOptionsConfig.Line_TimeX, timeGranularity)
                    : ChartOptionsConfig.Line;
                break;
            }
            case ChartType.Bar: { //column
                chartOption = hasTimeAxis
                    ? ChartHelper.mergeOptionsX(ChartOptionsConfig.BarVertical_TimeX, timeGranularity)
                    : ChartOptionsConfig.BarVertical;
                break;
            }
            case ChartType.HorizontalBar: {
                chartOption = hasTimeAxis
                    ? ChartHelper.mergeOptionsY(ChartOptionsConfig.BarHorizontal_TimeY, timeGranularity)
                    : ChartOptionsConfig.BarHorizontal;
                break;
            }
            case ChartType.Pie:
                chartOption = ChartOptionsConfig.Pie;
                break;
        }
        return chartOption;

    }
    private static configureStacked = (chartOptions: ChartOptions): ChartOptions => {
        const options = cloneDeep(chartOptions)
        if (options.scales.xAxes && options.scales.yAxes) {
            options.scales.yAxes[0].stacked = true;
            options.scales.xAxes[0].stacked = true;
        }
        return options;
    }

}