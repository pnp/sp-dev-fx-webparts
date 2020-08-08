import * as React from 'react';
import * as strings from 'AppInsightsDashboardWebPartStrings';
import styles from '../CommonControl.module.scss';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { addDays } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { AppInsightsProps } from '../../webparts/appInsightsDashboard/components/AppInsightsDashboard';
import { IPerfDurationProps } from '../CommonProps';
import SectionTitle from '../components/SectionTitle';
import Helper from '../Helper';

const map: any = require('lodash/map');

const today: Date = new Date(Date.now());
const startMaxDate: Date = addDays(today, -1);
const minDate: Date = addDays(today, -90);
const maxDate: Date = new Date(Date.now());

export interface IPerformanceProps {
    helper: Helper;
}

const PerformanceStatistics: React.FunctionComponent<IPerformanceProps> = (props) => {

    const mainProps = React.useContext(AppInsightsProps);
    const [menuClick, setMenuClick] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');
    const [loadingChart1, setLoadingChart1] = React.useState<boolean>(true);
    const [noDataChart1, setNoDataChart1] = React.useState<boolean>(false);
    const [startDate, setStartDate] = React.useState<Date>(null);
    const [endDate, setEndDate] = React.useState<Date>(null);

    const [chartData1, setChartData1] = React.useState<any>(null);
    const [chartOptions1, setChartOptions1] = React.useState<any>(null);

    const handleStartDateChange = (selDate: Date | null | undefined): void => {
        setStartDate(selDate);
    };
    const handleEndDateChange = (selDate: Date | null | undefined): void => {
        setEndDate(selDate);
    };
    const _loadOperationsDurations = async () => {
        if (menuClick) setLoadingChart1(true);
        let query: string = ``;
        if (startDate && endDate) {
            query += `let start=datetime("${props.helper.getQueryStartDateFormat(startDate.toUTCString())}");
                let end=datetime("${props.helper.getQueryDateFormat(endDate.toUTCString())}");                
                let timeGrain=5m;
                let dataset=pageViews
                | where timestamp > start and timestamp < end
                | where client_Type == "Browser" ;
                dataset
                | summarize count_=sum(itemCount), avg(duration), percentiles(duration, 50, 95, 99) by name
                | union(dataset
                | summarize count_=sum(itemCount), avg(duration), percentiles(duration, 50, 95, 99))                
                | order by count_ desc            
            `;
            let response: any[] = await props.helper.getResponseByQuery(query, false);
            if (response.length > 0) {
                if (response[0][1] == 0 && response[0][2] == 'NaN') {
                    setMessage(strings.Msg_InvalidDate);
                    setNoDataChart1(true);
                } else {
                    let finalRes: IPerfDurationProps[] = [];
                    response.map(res => {
                        finalRes.push({
                            PageName: res[0] ? res[0].indexOf('ModernDev -') >= 0 ? res[0].replace('ModernDev -', '') : res[0] : 'OverAll',
                            count: res[1],
                            AvgDuration: res[2],
                            PerDur_50: res[3],
                            PerDur_95: res[4],
                            PerDur_99: res[5]
                        });
                    });
                    const data: Chart.ChartData = {
                        labels: map(finalRes, 'PageName'),
                        datasets: [
                            {
                                label: 'Count',
                                fill: true,
                                lineTension: 0,
                                data: map(finalRes, 'count'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Avg Duration',
                                fill: true,
                                lineTension: 0,
                                data: map(finalRes, 'AvgDuration'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Percentile Duration 50',
                                fill: true,
                                lineTension: 0,
                                data: map(finalRes, 'PerDur_50'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Percentile Duration 95',
                                fill: true,
                                lineTension: 0,
                                data: map(finalRes, 'PerDur_95'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Percentile Duration 99',
                                fill: true,
                                lineTension: 0,
                                data: map(finalRes, 'PerDur_99'),
                                backgroundColor: props.helper.getRandomColor()
                            }
                        ]
                    };
                    setChartData1(data);
                    const options: Chart.ChartOptions = {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false,
                            text: ""
                        },
                        responsive: true,
                        animation: {
                            easing: 'easeInQuad'
                        },
                        scales:
                        {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                ticks: { beginAtZero: true },
                                stacked: true
                            }],

                        }
                    };
                    setChartOptions1(options);
                }
            } else {
                setNoDataChart1(true);
            }
        } else {
            setMessage(strings.Msg_NoDate);
            setNoDataChart1(true);
        }
        setLoadingChart1(false);
        setMenuClick(false);
    };

    React.useEffect(() => {
        if (startDate && endDate) {
            setMenuClick(true);
            setNoDataChart1(false);
            setMessage('');
            _loadOperationsDurations();
        }
    }, [startDate, endDate]);

    React.useEffect(() => {
        if (props.helper) {
            setStartDate(addDays(new Date(), -3));
            setEndDate(today);
        }
    }, [mainProps.AppId, mainProps.AppKey, props.helper]);
    return (
        <div>
            <SectionTitle Title={strings.SecTitle_PerfStats} />
            <div style={{ display: 'flex', padding: '5px' }}>
                <div className={styles.centerDiv}>
                    <div className={"ms-Grid-row"} style={{ display: 'inline-flex', marginTop: '-5px', marginLeft: '10px' }}>
                        <label className={styles.dataLabel} style={{ paddingTop: '5px' }}>{"Date Range: "}</label>
                        <div style={{ paddingRight: '5px' }}>
                            <DatePicker
                                isRequired={false}
                                placeholder="Start Date..."
                                ariaLabel="Select start date"
                                minDate={minDate}
                                maxDate={startMaxDate}
                                allowTextInput={false}
                                highlightSelectedMonth={true}
                                initialPickerDate={startMaxDate}
                                formatDate={(date?: Date) => { return props.helper.getFormattedDate(date.toUTCString()); }}
                                onSelectDate={handleStartDateChange}
                                value={startDate}
                            />
                        </div>
                        <div>
                            <DatePicker
                                isRequired={false}
                                placeholder="End Date..."
                                ariaLabel="Select end date"
                                minDate={minDate}
                                maxDate={maxDate}
                                allowTextInput={false}
                                highlightSelectedMonth={true}
                                formatDate={(date?: Date) => { return props.helper.getFormattedDate(date.toUTCString()); }}
                                onSelectDate={handleEndDateChange}
                                value={endDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={css("ms-Grid-row", styles.content)}>
                <div style={{ minHeight: '450px', maxHeight: '450px' }}>
                    {loadingChart1 ? (
                        <Spinner label={strings.Msg_LoadChart} labelPosition={"bottom"} />
                    ) : (
                            <>
                                {!noDataChart1 ? (
                                    <ChartControl
                                        type={ChartType.Bar}
                                        data={chartData1}
                                        options={chartOptions1}
                                    />
                                ) : (
                                        <MessageBar messageBarType={MessageBarType.error}>{message ? message : strings.Msg_NoData}</MessageBar>
                                    )}
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default PerformanceStatistics;