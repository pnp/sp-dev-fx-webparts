import * as React from 'react';
import * as strings from 'AppInsightsDashboardWebPartStrings';
import styles from '../CommonControl.module.scss';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { AppInsightsProps } from '../../webparts/appInsightsDashboard/components/AppInsightsDashboard';
import { IPerfDurationProps } from '../CommonProps';
import SectionTitle from '../components/SectionTitle';
import Helper from '../Helper';
import { addDays, DatePicker, css, Spinner, MessageBar, MessageBarType } from '@fluentui/react';

import {map} from 'lodash'
import { ChartData, ChartOptions } from 'chart.js';

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
    const [loadingChart, setloadingChart] = React.useState<boolean>(true);
    const [noDataChart, setnoDataChart] = React.useState<boolean>(false);
    const [startDate, setStartDate] = React.useState<Date>(null);
    const [endDate, setEndDate] = React.useState<Date>(null);

    const [chartData, setChartData] = React.useState<ChartData>(null);
    const [chartOptions, setChartOptions] = React.useState<ChartOptions>(null);

    const handleStartDateChange = (selDate: Date | null | undefined): void => {
        setStartDate(selDate);
    };
    const handleEndDateChange = (selDate: Date | null | undefined): void => {
        setEndDate(selDate);
    };
    const _loadOperationsDurations = async ():Promise<void> => {
        if (menuClick) setloadingChart(true);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any[] = await props.helper.getResponseByQuery(query, false);
            if (response.length > 0) {
                if (response[0][1] === 0 && response[0][2] === 'NaN') {
                    setMessage(strings.Msg_InvalidDate);
                    setnoDataChart(true);
                } else {
                    const finalRes: IPerfDurationProps[] = [];
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
                    const data: ChartData= {
                        labels: map(finalRes, 'PageName'),
                        datasets: [
                            {
                                label: 'Count',
                                fill: true,
                                tension:0,
                                data: map(finalRes, 'count'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Avg Duration [ms]',
                                fill: true,
                                tension:0,
                                data: map(finalRes, 'AvgDuration'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Percentile Duration 50',
                                fill: true,
                                tension:0,
                                data: map(finalRes, 'PerDur_50'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Percentile Duration 95',
                                fill: true,
                                tension:0,
                                data: map(finalRes, 'PerDur_95'),
                                backgroundColor: props.helper.getRandomColor()
                            },
                            {
                                label: 'Percentile Duration 99',
                                fill: true,
                                tension:0,
                                data: map(finalRes, 'PerDur_99'),
                                backgroundColor: props.helper.getRandomColor()
                            }
                        ]
                    };
                    setChartData(data);
                    const options :ChartOptions = {
                        responsive: true,
                        animation:{
                            easing: 'easeInQuad'
                        },
                        plugins:{
                            legend: {
                                display: false
                            },
                            title: {
                                display: false,
                                text: ""
                            },
                        },
                        scales:
                        {
                            x: {
                                stacked: true
                            },
                            y: {
                                min: 0 ,
                                stacked: true
                            },

                        }
                    };
                    setChartOptions(options);
                }
            } else {
                setnoDataChart(true);
            }
        } else {
            setMessage(strings.Msg_NoDate);
            setnoDataChart(true);
        }
        setloadingChart(false);
        setMenuClick(false);
    };

    React.useEffect(() => {
        const fetchData= async(startDate:Date, endDate:Date): Promise<void>=>{
            if (startDate && endDate) {
                setMenuClick(true);
                setnoDataChart(false);
                setMessage('');
                await _loadOperationsDurations();
            }
        }
        fetchData(startDate, endDate)
            .catch(console.error);  
        
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
                                formatDate={(date?: Date) => { return props.helper.getFormattedDate(date.toUTCString(),'L'); }}
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
                                formatDate={(date?: Date) => { return props.helper.getFormattedDate(date.toUTCString(),'L'); }}
                                onSelectDate={handleEndDateChange}
                                value={endDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={css("ms-Grid-row", styles.content)}>
                <div style={{ minHeight: '450px', maxHeight: '450px' }}>
                    {loadingChart ? (
                        <Spinner label={strings.Msg_LoadChart} labelPosition={"bottom"} />
                    ) : (
                            <>
                                {!noDataChart ? (
                                    <ChartControl
                                        type={ChartType.Bar}
                                        data={chartData}
                                        options={chartOptions}
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