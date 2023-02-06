import * as React from 'react';
import * as strings from 'AppInsightsDashboardWebPartStrings';
import styles from '../CommonControl.module.scss';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { AppInsightsProps } from '../../webparts/appInsightsDashboard/components/AppInsightsDashboard';
import { TimeInterval, TimeSpan, Segments } from '../enumHelper';
import { IPageViewDetailProps, IPageViewCountProps, Dictionary } from '../CommonProps';
import SectionTitle from '../components/SectionTitle';
import CustomPivot from '../components/CustomPivot';
import DataList from '../components/DataList';
import Helper from '../Helper';
import { IColumn, PivotItem, Icon, css, Spinner, MessageBar, MessageBarType } from '@fluentui/react';

import {map} from 'lodash'
import { ChartData, ChartOptions } from 'chart.js';

export interface IPageViewsProps {
    helper: Helper;
}

const PageViews: React.FunctionComponent<IPageViewsProps> = (props) => {

    const mainProps = React.useContext(AppInsightsProps);
    const [loadingChart, setLoadingChart] = React.useState<boolean>(true);
    const [loadingList, setLoadingList] = React.useState<boolean>(true);
    const [noData, setNoData] = React.useState<boolean>(false);
    const [timespanMenus, setTimeSpanMenus] = React.useState<Dictionary<string>[]>([]);
    const [timeintervalMenus, setTimeIntervalMenus] = React.useState<Dictionary<string>[]>([]);
    const [selTimeSpan, setSelTimeSpan] = React.useState<string>('');
    const [selTimeInterval, setSelTimeInterval] = React.useState<string>('');
    const [menuClick, setMenuClick] = React.useState<boolean>(false);
    const [chartData, setChartData] = React.useState<ChartData>(null);
    const [chartOptions, setChartOptions] = React.useState<ChartOptions>(null);
    const [listCols, setListCols] = React.useState<IColumn[]>([]);
    const [items, setItems] = React.useState<IPageViewDetailProps[]>([]);

    const _loadMenus = ():void => {
        const tsMenus: Dictionary<string>[] = props.helper.getTimeSpanMenu();
        setTimeSpanMenus(tsMenus);
        setSelTimeSpan(tsMenus[4].key);
        const tiMenus: Dictionary<string>[] = props.helper.getTimeIntervalMenu();
        setTimeIntervalMenus(tiMenus);
        setSelTimeInterval(tiMenus[3].key);
    };
    const handleTimeSpanMenuClick = (item: PivotItem):void => {
        setMenuClick(true);
        setSelTimeSpan(item.props.itemKey);
    };
    const handleTimeIntervalMenuClick = (item: PivotItem):void => {
        setMenuClick(true);
        setSelTimeInterval(item.props.itemKey);
    };
    const _loadPageViewsCount = async (selTimeSpan:string, selTimeInterval:string) :Promise<void>=> {
        if (menuClick) setLoadingChart(true);
        const response: IPageViewCountProps[] = await props.helper.getPageViewCount(
            TimeSpan[selTimeSpan as keyof typeof TimeSpan], 
            TimeInterval[selTimeInterval as keyof typeof TimeInterval]);
            //'as keyof typeof' added above because of the error:
            //error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'typeof xxx'
        if (response.length > 0) {
            const data : ChartData= { //
                labels: map(response, 'date'),
                datasets: [
                    {
                        label: 'Total Page Views',
                        fill: true,
                        tension:0,
                        data: map(response, 'sum'),
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgb(255, 159, 64)',
                        borderWidth: 1
                    }
                ]
            };
            setChartData(data);
            const options:ChartOptions= {
                plugins:{
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                        text: "Page Views"
                    }
                },
                responsive: true,
                animation: {
                    easing: 'easeInQuad'
                }
            };
            setChartOptions(options);
            setLoadingChart(false);
            setMenuClick(false);
        } else {
            setLoadingChart(false);
            setNoData(true);
            setMenuClick(false);
        }
    };
    const _generateColumns = ():void => {
        const cols: IColumn[] = [];
        cols.push({
            key: 'Url', name: 'Url', fieldName: 'Url', minWidth: 100, maxWidth: 350,
            onRender: (item: IPageViewDetailProps, index: number, column: IColumn) => {
                return (
                    <div className={styles.textWithIcon}>
                        <div className={styles.fileiconDiv}>
                            <Icon iconName="FileASPX" aria-label={item.Url}/>
                        </div>
                        {item.Url ? (
                            <a href={item.Url} target="_blank" className={styles.pageLink}>{item.Url}</a>
                        ) : (
                                <span>{strings.Msg_NoUrl}</span>
                            )}
                    </div>
                );
            }
        });
        cols.push({
            key: 'start', name: 'Start Date', fieldName: 'start', minWidth: 100, maxWidth: 150
        });
        cols.push({
            key: 'end', name: 'End Date', fieldName: 'end', minWidth: 100, maxWidth: 150
        });
        cols.push({
            key: 'count', name: '#PageViews', fieldName: 'count', minWidth: 100, maxWidth: 150
        });
        setListCols(cols);
    };
    const _loadPageViews = async (selTimeSpan:string, selTimeInterval:string):Promise<void> => {
        if (menuClick) setLoadingList(true);
        const response: IPageViewDetailProps[] = await props.helper.getPageViews(
            TimeSpan[selTimeSpan as keyof typeof TimeSpan], 
            TimeInterval[selTimeInterval as keyof typeof TimeInterval], 
            [Segments.PV_URL]);
        if (response.length > 0) {
            _generateColumns();
            setItems(response);
            setLoadingList(false);
            setMenuClick(false);
        } else {
            setLoadingList(false);
            setNoData(true);
            setMenuClick(false);
        }
    };

    React.useEffect(() => {
        const fetchaData=async(selTimeSpan:string, selTimeInterval:string):Promise<void> =>{
            if (selTimeSpan && selTimeInterval) {            
                setNoData(false);
                await _loadPageViewsCount(selTimeSpan, selTimeInterval);
                await _loadPageViews(selTimeSpan, selTimeInterval);
            }
        }
        fetchaData(selTimeSpan, selTimeInterval)
            .catch(console.error);  
    }, [selTimeSpan, selTimeInterval]);

    React.useEffect(() => {
        if (props.helper) {
            _loadMenus();
        }
    }, [mainProps.AppId, mainProps.AppKey, props.helper]);

    return (
        <div>
            <SectionTitle Title={strings.SecTitle_PageViews} />
            <div style={{ display: 'flex', padding: '5px' }}>
                <div className={styles.centerDiv}>
                    <CustomPivot ShowLabel={true} LabelText={strings.Menu_TimeSpan} Items={timespanMenus} SelectedKey={selTimeSpan} OnMenuClick={handleTimeSpanMenuClick} />
                    <CustomPivot ShowLabel={true} LabelText={strings.Menu_TimeSpan} Items={timeintervalMenus} SelectedKey={selTimeInterval} OnMenuClick={handleTimeIntervalMenuClick} />
                </div>
            </div>
            {!noData &&
                <>
                    <div className={css("ms-Grid-row", styles.content)}>
                        <div className={"ms-Grid-col ms-xxxl6 ms-xxl6 ms-xl6 ms-lg6"}>
                            {(!loadingList && !noData) ? (
                                <DataList Items={items} Columns={listCols} GroupBy={true} GroupByCol={"date"} CountCol={"count"} />
                            ) : (
                                    <Spinner label={strings.Msg_LoadList} labelPosition={"bottom"} />
                                )}
                        </div>
                        <div className={css("ms-Grid-col ms-xxxl6 ms-xxl6 ms-xl6 ms-lg6", styles.chartContainer)}>
                            {(!loadingChart && !noData) ? (
                                <ChartControl
                                    type={ChartType.Line}
                                    data={chartData}
                                    options={chartOptions}
                                    className={styles.chart}
                                />
                            ) : (
                                    <Spinner label={strings.Msg_LoadChart} labelPosition={"bottom"} />
                                )}
                        </div>
                    </div>
                </>
            }
            {!loadingChart && !loadingList && noData &&
                <MessageBar messageBarType={MessageBarType.error}>{strings.Msg_NoData}</MessageBar>
            }
        </div>
    );
};

export default PageViews;