import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomGraphService } from '../../../../../services';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartPoint, ChartHoverOptions } from 'chart.js';
import styles from '../../GraphReports.module.scss';
import Divider from '@material-ui/core/Divider/Divider';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Line } from 'react-chartjs-2';


export interface IGetSharePointSiteUsageSiteCountsProps {
    customServiceScope: ServiceScope;
}

export interface IGetSharePointSiteUsageSiteCountsState {
    data: [];
    period: number;
}

export default class GetSharePointSiteUsageSiteCounts extends React.Component<IGetSharePointSiteUsageSiteCountsProps, IGetSharePointSiteUsageSiteCountsState> {



    private _customGraphServiceInstance;
    /**
       *
       */
    constructor(props: IGetSharePointSiteUsageSiteCountsProps) {
        super(props);

        this.state = {
            data: [],
            period: 7
        };

        //MSGraphClient
        this._customGraphServiceInstance = this.props.customServiceScope.consume(CustomGraphService.serviceKey);
    }

    public componentDidMount() {
        this._customGraphServiceInstance.getSharePointSiteUsageSiteCounts(this.state.period).then((reportData: any) => {

            this.setState({
                data: reportData.value
            });

        });
    }

    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {

        let period: number = Number(option.key);
        if (period) {
            this._customGraphServiceInstance.getSharePointSiteUsageSiteCounts(period).then((reportData: any) => {
                this.setState({
                    data: reportData.value,
                    period: period
                });
            });
        }
    }
    public render(): React.ReactElement<IGetSharePointSiteUsageSiteCountsProps> {



        let labels: any[] = [];
        let totalSites: ChartPoint[] = [];
        let activeSites: ChartPoint[] = [];
        if (this.state.data.length > 0) {
            labels = this.state.data.map((item: any) => {
                return (
                    item.reportDate
                );
            });
            labels = labels.reverse();
            totalSites = this.state.data.map((item: any) => {
                return (
                    item.total
                );
            });
            totalSites = totalSites.reverse();
            activeSites = this.state.data.map((item: any) => {
                return (
                    item.active
                );
            });
            activeSites = activeSites.reverse();
        }

        // set the data
        const data: Chart.ChartData = {
            labels:
                [
                    ...labels
                ],
            datasets: [
                {
                    label: 'Total Sites',
                    fill: false,
                    // lineTension: 0,
                    data: totalSites,
                    backgroundColor: "rgba(0, 120, 212, 0.2)",
                    borderColor: "#0078d4",
                    borderWidth: 1
                },
                {
                    label: 'Active Sites',
                    fill: false,
                    // lineTension: 0,
                    data: activeSites,
                    backgroundColor: 'rgba(232, 17, 35, 0.2)',
                    borderColor: '#e81123',
                    borderWidth: 1
                }

            ]
        };

        const options: Chart.ChartOptions = {
            responsive: true,
            hover: {
                mode: "index"
            },
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: "Number of total and active sites"
            },
            scales: {
                yAxes: [{
                    stacked: false
                }]
            }
        };

        return (
            <div>

                <Grid item xs={12}>
                    <ChoiceGroup
                        label="Pick report period"
                        defaultSelectedKey='7'
                        onChange={this._onChange}
                        options={[
                            {
                                key: '7',
                                iconProps: { iconName: 'CalendarDay' },
                                text: '7 days'
                            },
                            {
                                key: '30',
                                iconProps: { iconName: 'CalendarDay' },
                                text: '30 days'
                            },
                            {
                                key: '90',
                                iconProps: { iconName: 'CalendarDay' },
                                text: '90 days'
                            }
                        ]}
                    />
                </Grid>

                <Grid className={styles.divider} item xs={12}>
                    {this.state.data.length > 0 ? <Line data={data} options={options} redraw /> : ""}
                </Grid>
            </div>
        );
    }
}
