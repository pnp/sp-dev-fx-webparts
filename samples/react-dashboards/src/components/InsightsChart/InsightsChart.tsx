/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageBar, MessageBarType, ThemeProvider } from "@fluentui/react";
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";
import { ChartData, ChartOptions, TimeUnit } from "chart.js";
import stringsCommon from "CommonDasboardWebPartStrings";
import React from "react";
import ChartHelper from "../../common/ChartHelper";
import { ThemedPalette } from "../../common/ColorsHelper";
import { chartTheme } from "../../common/ComponentStyles";
import { ChartStyles } from "../../common/DashboardHelper";
import { ColumnsInfo, IInsightsChartProps } from "./IInsightsChartProps";
import styles from "./InsightsChart.module.scss";

const InsightsChart: React.FunctionComponent<IInsightsChartProps> = (props) => {
    const [timetamp, setTimetamp] = React.useState(Date.now());

    const [items, setItems] = React.useState<any[]>(props.items);
    const [hasTimeAxis, setHasTimeAxis] = React.useState<boolean>(false);
    const [timeGranularity, setTimeGranularity] = React.useState<TimeUnit>();
    const [isHorizontal, setIsHorizontal] = React.useState<boolean>(false);
    const [isStacked, setIsStacked] = React.useState<boolean>(false);

    const [columnsInfo, setColumnsInfo] = React.useState<ColumnsInfo>(null);
    const [chartType, setChartType] = React.useState<ChartType>();
    const [chartData, setChartData] = React.useState<ChartData>(null);
    const [chartOptions, setChartOptions] = React.useState<ChartOptions>(null);
    const [chartPalette, setChartPalette] = React.useState<ThemedPalette>(null);

    const [fillChart, setFillChart] = React.useState<boolean>(false);

    const [messageBarTxt, setMessageBarTxt] = React.useState<string>("");
    const [messageBarType, setMessageBarType] = React.useState<MessageBarType>(MessageBarType.info);

    React.useEffect((): void => {
        setItems([])
        setMessageBarTxt("");
        setChartPalette(props.chartPalette);

        if (props.dataTypes && props.items.length > 0) {
            const dataTypesInfo = ChartHelper.GetDataInfo(props.items, props.dataTypes, props.chartType);
            //is supported? at least one numerical column
            if (!dataTypesInfo.isSupported) {
                setMessageBarTxt(`${stringsCommon.Msg_FailedVisErr} ${dataTypesInfo.errorMsg}`)
                setMessageBarType(MessageBarType.warning);
                setChartData(null);
                setChartOptions(null);
            }
            else {
                setColumnsInfo(dataTypesInfo as ColumnsInfo);
                setHasTimeAxis(dataTypesInfo.hasTimeAxis);
                setTimeGranularity(dataTypesInfo.timeGranularity)
                setIsStacked(dataTypesInfo.isStacked);
                setChartType(
                    ChartHelper.GetChartType(props.chartType)
                );
                setFillChart(
                    props.chartType === ChartStyles.linechart
                        ? false
                        : true);
                setIsHorizontal(
                    props.chartType === ChartStyles.barchart
                        ? true
                        : false
                )
                setItems(props.items)
            }
        }
    }, [props.dataTypes, props.chartType, props.chartPalette, props.items]);

    //Set Chart Data
    React.useEffect((): void => {

        if (items?.length > 0 && columnsInfo) {

            const data = ChartHelper.GetChartData(items, hasTimeAxis, isHorizontal, columnsInfo, chartType, fillChart, chartPalette);
            setChartData(data);

            const chartOptions = ChartHelper.GetChartOptions(chartType, hasTimeAxis, timeGranularity, isStacked || data.datasets.length>1);
            setChartOptions(chartOptions);

            //refresh chart
            setTimetamp(Date.now());
        }
    }, [items, hasTimeAxis, timeGranularity, isHorizontal, isStacked, columnsInfo, chartType, fillChart]);


    return (
        <ThemeProvider theme={chartTheme} >
            {messageBarTxt &&
                <MessageBar messageBarType={messageBarType} >{messageBarTxt}</MessageBar>
            }
            {chartType && chartData && chartOptions &&
                <ChartControl
                key={timetamp}
                    type={chartType}
                    data={chartData}
                    options={chartOptions}
                    useTheme={true}
                    className={styles.chart}
                />
            }
        </ThemeProvider>
    )
}
export default InsightsChart;
