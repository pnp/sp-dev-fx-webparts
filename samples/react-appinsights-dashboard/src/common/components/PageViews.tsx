import * as React from 'react';
import * as strings from 'AppInsightsDashboardWebPartStrings';
import styles from '../CommonControl.module.scss';
import { IconType, Icon } from 'office-ui-fabric-react/lib/Icon';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { AppInsightsProps } from '../../webparts/appInsightsDashboard/components/AppInsightsDashboard';
import { TimeInterval, TimeSpan, Segments } from '../enumHelper';
import { IPageViewDetailProps, IPageViewCountProps } from '../CommonProps';
import SectionTitle from '../components/SectionTitle';
import CustomPivot from '../components/CustomPivot';
import DataList from '../components/DataList';
import Helper from '../Helper';

const map: any = require('lodash/map');

export interface IPageViewsProps {
    helper: Helper;
}

const PageViews: React.FunctionComponent<IPageViewsProps> = (props) => {

    const mainProps = React.useContext(AppInsightsProps);
    const [loadingChart, setLoadingChart] = React.useState<boolean>(true);
    const [loadingList, setLoadingList] = React.useState<boolean>(true);
    const [noData, setNoData] = React.useState<boolean>(false);
    const [timespanMenus, setTimeSpanMenus] = React.useState<any[]>([]);
    const [timeintervalMenus, setTimeIntervalMenus] = React.useState<any[]>([]);
    const [selTimeSpan, setSelTimeSpan] = React.useState<string>('');
    const [selTimeInterval, setSelTimeInterval] = React.useState<string>('');
    const [menuClick, setMenuClick] = React.useState<boolean>(false);
    const [chartData, setChartData] = React.useState<any>(null);
    const [chartOptions, setChartOptions] = React.useState<any>(null);
    const [listCols, setListCols] = React.useState<IColumn[]>([]);
    const [items, setItems] = React.useState<any[]>([]);

    const _loadMenus = () => {
        let tsMenus: any[] = props.helper.getTimeSpanMenu();
        setTimeSpanMenus(tsMenus);
        setSelTimeSpan(tsMenus[4].key);
        let tiMenus: any[] = props.helper.getTimeIntervalMenu();
        setTimeIntervalMenus(tiMenus);
        setSelTimeInterval(tiMenus[3].key);
    };
    const handleTimeSpanMenuClick = (item: PivotItem) => {
        setMenuClick(true);
        setSelTimeSpan(item.props.itemKey);
    };
    const handleTimeIntervalMenuClick = (item: PivotItem) => {
        setMenuClick(true);
        setSelTimeInterval(item.props.itemKey);
    };
    const _loadPageViewsCount = async () => {
        if (menuClick) setLoadingChart(true);
        let response: IPageViewCountProps[] = await props.helper.getPageViewCount(TimeSpan[selTimeSpan], TimeInterval[selTimeInterval]);
        if (response.length > 0) {
            const data: Chart.ChartData = {
                labels: map(response, 'date'),
                datasets: [
                    {
                        label: 'Total Page Views',
                        fill: true,
                        lineTension: 0,
                        data: map(response, 'sum'),
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgb(255, 159, 64)',
                        borderWidth: 1
                    }
                ]
            };
            setChartData(data);
            const options: Chart.ChartOptions = {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                    text: "Page Views"
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
    const _generateColumns = () => {
        let cols: IColumn[] = [];
        cols.push({
            key: 'Url', name: 'Url', fieldName: 'Url', minWidth: 100, maxWidth: 350,
            onRender: (item: any, index: number, column: IColumn) => {
                return (
                    <div className={styles.textWithIcon}>
                        <div className={styles.fileiconDiv}>
                            <Icon iconName="FileASPX" ariaLabel={item.Url} iconType={IconType.Default} />
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
    const _loadPageViews = async () => {
        if (menuClick) setLoadingList(true);
        let response: IPageViewDetailProps[] = await props.helper.getPageViews(TimeSpan[selTimeSpan], TimeInterval[selTimeInterval], [Segments.PV_URL]);
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
        if (selTimeSpan && selTimeInterval) {            
            setNoData(false);
            _loadPageViewsCount();
            _loadPageViews();
        }
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