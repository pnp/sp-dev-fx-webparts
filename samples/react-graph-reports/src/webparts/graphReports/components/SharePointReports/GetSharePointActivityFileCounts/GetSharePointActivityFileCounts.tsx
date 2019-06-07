import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomGraphService } from '../../../../../services';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartPoint } from 'chart.js';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Line } from 'react-chartjs-2';


export interface IGetSharePointActivityFileCountsProps {
    customServiceScope: ServiceScope;
}

export interface IGetSharePointActivityFileCountsState {
    data: [];
    period: number;
}

export default class GetSharePointActivityFileCounts extends React.Component<IGetSharePointActivityFileCountsProps, IGetSharePointActivityFileCountsState> {



    private _customGraphServiceInstance;
    /**
       *
       */
    constructor(props: IGetSharePointActivityFileCountsProps) {
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
        this._customGraphServiceInstance.getSharePointActivityFileCounts(this.state.period).then((reportData: any) => {

            this.setState({
                data: reportData.value
            });

        });
    }

    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {

        let period: number = Number(option.key);
        if (period) {
            this._customGraphServiceInstance.getSharePointActivityFileCounts(period).then((reportData: any) => {
                this.setState({
                    data: reportData.value,
                    period: period
                });
            });
        }
    }
    public render(): React.ReactElement<IGetSharePointActivityFileCountsProps> {

        let labels: any[] = [];
        let chartData: ChartPoint[] = [];
        let sharedInternally: ChartPoint[] = [];

        if (this.state.data.length > 0) {
            labels = this.state.data.map((item: any) => {
                return (
                    item.reportDate
                );
            });
            // labels = labels.reverse();
            chartData = this.state.data.map((item: any) => {
                return (
                    item.viewedOrEdited
                );
            });

            //chartData = chartData.reverse();

            sharedInternally = this.state.data.map((item: any) => {
                return (
                    item.sharedInternally
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
                    label: 'View or Edit Files',
                    fill: 'start',
                    lineTension: 0,
                    data: chartData,
                    backgroundColor: "rgb(0, 188, 242, 0.2)",
                    borderColor: "rgb(0, 188, 242)",
                    borderWidth: 1,
                    showLine: true
                },
                {
                    label: 'Shared Internally',
                    fill: false,
                    lineTension: 0,
                    data: sharedInternally,
                    backgroundColor: "rgb(16, 124, 16, 0.2)",
                    borderColor: "rgb(16, 124, 16)",
                    borderWidth: 1,
                    showLine: true
                },
            ]
        };

        // set the options
        const options: Chart.ChartOptions = {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: "Number of files by activity type"
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
                    {this.state.data.length > 0 ? <Line data={data} options={options} redraw /> : ""}
                </Grid>
            </div>
        );
    }
}
