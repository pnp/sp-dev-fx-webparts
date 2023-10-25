import { buildColumns, IColumn, IStackItemStyles, MessageBar, MessageBarType, SelectionMode, Shimmer, ShimmeredDetailsList, Stack, StackItem, ThemeProvider } from '@fluentui/react';
import stringsCommon from 'CommonDasboardWebPartStrings';
import * as React from 'react';
import ApiHelper, { IResponseJson } from '../../common/ApiHelper';
import AppInsightsHelper, { AppInsightsHelperSSO } from '../../common/AppInsightsHelper';
import { shimmerStyleChart, stackTokens, transparentTheme } from '../../common/ComponentStyles';
import CostMngmtHelper from '../../common/CostMngmtHelper';
import DashboardHelper, { LayoutStyles, ListStyles } from '../../common/DashboardHelper';
import TimeHelper from '../../common/TimeHelper';
import HeatmapDetailsList from '../HeatmapDetailsList/HeatmapDetailsList';
import InsightsChart from '../InsightsChart/InsightsChart';
import { IInsightsDashboardProps } from "./IInsightsDashboardProps";

const InsightsDashboard: React.FunctionComponent<IInsightsDashboardProps> = (props) => {
    //#region State
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = React.useState<any[]>(null);
    const [dataTypes, setDataTypes] = React.useState<Map<string, string>>(null)
    const [listCols, setListCols] = React.useState<IColumn[]>([]);

    const [messageBarTxt, setMessageBarTxt] = React.useState<string>("");
    const [messageBarType, setMessageBarType] = React.useState<MessageBarType>(MessageBarType.info);
    const [stackItemStylesList, setStackItemStylesList] = React.useState<Partial<IStackItemStyles>>({});
    const [stackItemStylesChart, setStackItemStylesChart] = React.useState<Partial<IStackItemStyles>>({});
    //#endregion

    //#region Effects
    React.useEffect(() => {
        const setLayout = (showList: boolean, showChart: boolean, layoutSettings: LayoutStyles, width: number): void => {
            if (showList && showChart) {
                const styles = DashboardHelper.GetStackItemStyle(layoutSettings, width)
                setStackItemStylesList(styles.list);
                setStackItemStylesChart(styles.chart);
            }
            else {
                const styleDefault = DashboardHelper.GetStackItemStyleFull();
                setStackItemStylesList(styleDefault);
                setStackItemStylesChart(styleDefault);
            }
        }
        setLayout(props.showList, props.showChart, props.layoutSettings, props.width);
    }, [props.showList, props.showChart, props.layoutSettings]);

    React.useEffect((): void => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _buildColumns = (response: any[], colInfo: Map<string, string>): IColumn[] => {
            const columns: IColumn[] = buildColumns(response);

            //datetime
            let _colsByType = ApiHelper.GetColByType(colInfo, 'datetime');
            columns
                .filter((col: IColumn) => { return _colsByType.includes(col.name) })
                .forEach((col: IColumn) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    col.onRender = (item?: any, index?: number, column?: IColumn) => {
                        return TimeHelper.getFormattedDateTime({
                            datetime: item[column.name],
                            cultureName: props.cultureName
                        })
                    }
                });

            //real
            _colsByType = ApiHelper.GetColByTypes(colInfo, ['real']);
            columns
                .filter((col: IColumn) => { return _colsByType.includes(col.name) })
                .forEach((col: IColumn) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    col.onRender = (item?: any, index?: number, column?: IColumn) => {
                        return Number(item[column.name]).toFixed(3);
                    }
                });
            //Number
            _colsByType = ApiHelper.GetColByTypes(colInfo, ['Number']);
            columns
                .filter((col: IColumn) => { return _colsByType.includes(col.name) })
                .forEach((col: IColumn) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    col.onRender = (item?: any, index?: number, column?: IColumn) => {
                        const val = Number(item[column.name])
                        return (val!==0 && val < 0.001)
                            ? "<0.001"
                            : val.toFixed(3)
                    }
                });

            columns.forEach((col: IColumn) => {
                col.isResizable = true;
            })
            return columns;
        }

        const getQueryResults = (helper: AppInsightsHelper | AppInsightsHelperSSO | CostMngmtHelper, query: string, dateSpan?: string): void => {
            setItems(null);
            setDataTypes(null);
            setMessageBarTxt("");

            if (helper && query && dateSpan !== 'Custom') {

                helper.GetAPIResponse({ query: query, dateSelection: dateSpan})
                    .then((response: IResponseJson) => {
                        if (response.error) {
                            const errMsg = (response.error.code === 'PathNotFoundError')
                                ? stringsCommon.Msg_FailedConfig
                                : response.error.message || response.error.innererror?.message;

                            setMessageBarTxt(errMsg);
                            setMessageBarType(MessageBarType.error);
                        }
                        else if (response.tables.length === 0) {
                            setMessageBarTxt(stringsCommon.Query_NoResults);
                            setMessageBarType(MessageBarType.info);
                        }
                        else {
                            setItems(response.tables);
                            setDataTypes(response.columns);
                            setListCols(
                                _buildColumns(response.tables, response.columns)
                            );
                        }
                    })
                    .catch((error: Error) => {
                        setMessageBarTxt(error.message);
                        setMessageBarType(MessageBarType.error);
                    });
            }
        }

        getQueryResults(props.helper, props.query, props.dateSpan);

    }, [props.helper, props.dateSpan, props.query, props.cacheExpiration]);


    //#endregion

    return <Stack tokens={stackTokens} >
        {messageBarTxt &&
            <MessageBar
                messageBarType={messageBarType}
                dismissButtonAriaLabel="Close"
            >{messageBarTxt}
            </MessageBar>
        }
        {!messageBarTxt &&
            <Stack horizontal wrap tokens={stackTokens}>
                {props.showList &&
                    <StackItem styles={stackItemStylesList}>
                        <ThemeProvider theme={transparentTheme}>
                            {(props.listStyle === ListStyles.list
                                ? <ShimmeredDetailsList
                                    items={items || []}
                                    columns={listCols}
                                    enableShimmer={!items}
                                    selectionMode={SelectionMode.none}
                                    compact={true}
                                    ariaLabelForShimmer="Content is being fetched"
                                    ariaLabelForGrid="Item details"
                                />
                                : <HeatmapDetailsList
                                    items={items || []}
                                    columns={listCols}
                                    dataTypes={dataTypes}
                                    listPalette={props.listPalette}
                                />
                            )}
                        </ThemeProvider>
                    </StackItem>
                }
                {props.showChart &&
                    <StackItem styles={stackItemStylesChart}>
                        <Shimmer
                            isDataLoaded={items !== null}
                            styles={shimmerStyleChart}
                            ariaLabel="Loading content">
                            <InsightsChart
                                items={items || []}
                                dataTypes={dataTypes}
                                chartType={props.chartStyle}
                                chartPalette={props.chartPalette}
                            />
                        </Shimmer>
                    </StackItem>
                }
            </Stack>
        }
    </Stack>
}
export default InsightsDashboard;