import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomGraphService } from '../../../../../services';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartPoint } from 'chart.js';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Bar } from 'react-chartjs-2';


export interface IGetSharePointSiteUsagePagesProps {
    customServiceScope: ServiceScope;
}

export interface IGetSharePointSiteUsagePagesState {
    data: [];
    period: number;
}

export default class GetSharePointSiteUsagePages extends React.Component<IGetSharePointSiteUsagePagesProps, IGetSharePointSiteUsagePagesState> {



    private _customGraphServiceInstance;
    /**
       *
       */
    constructor(props: IGetSharePointSiteUsagePagesProps) {
        super(props);

        this.state = {
            data: [],
            period: 7
        };

        this._onChange = this._onChange.bind(this);
        //MSGraphClient
        this._customGraphServiceInstance = this.props.customServiceScope.consume(CustomGraphService.serviceKey);
    }

    public componentDidMount() {
        this._customGraphServiceInstance.getSharePointSiteUsagePages(this.state.period).then((reportData: any) => {

            this.setState({
                data: reportData.value
            });

        });
    }
    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {

        let period: number = Number(option.key);
        if (period) {
            this._customGraphServiceInstance.getSharePointSiteUsagePages(period).then((reportData: any) => {
                this.setState({
                    data: reportData.value,
                    period: period
                });
            });
        }
    }
    public render(): React.ReactElement<IGetSharePointSiteUsagePagesProps> {

        let labels: any[] = [];
        let chartData: ChartPoint[] = [];

        if (this.state.data.length > 0) {
            labels = this.state.data.map((item: any) => {
                return (
                    item.reportDate
                );
            });
            chartData = this.state.data.map((item: any) => {
                return (
                    item.pageViewCount
                );
            });
        }

        // set the data
        const data: Chart.ChartData = {

            labels:
                [
                    ...labels
                ],
            datasets: [
                {
                    label: 'Page View Count',
                    fill: true,
                    lineTension: 0,
                    data: chartData,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                }
            ]
        };

        // set the options
        const options: Chart.ChartOptions = {
            responsive: true,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Number of pages viewed across all sites."
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
                <Grid item xs={12}>
                    {this.state.data.length > 0 ? <Bar data={data} options={options} redraw /> : ""}
                </Grid>
            </div>
        );
    }
}
