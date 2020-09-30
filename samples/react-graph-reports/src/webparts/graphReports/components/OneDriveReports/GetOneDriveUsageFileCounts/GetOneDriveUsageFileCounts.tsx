import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomGraphService } from '../../../../../services';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ChartPoint } from 'chart.js';
import styles from '../../GraphReports.module.scss';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Line } from 'react-chartjs-2';


export interface IGetOneDriveUsageFileCountsProps {
    customServiceScope: ServiceScope;
}

export interface IGetOneDriveUsageFileCountsState {
    data: [];
    period: number;
}

export default class GetOneDriveUsageFileCounts extends React.Component<IGetOneDriveUsageFileCountsProps, IGetOneDriveUsageFileCountsState> {



    private _customGraphServiceInstance;
    /**
       *
       */
    constructor(props: IGetOneDriveUsageFileCountsProps) {
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
        this._customGraphServiceInstance.getOneDriveUsageFileCounts(this.state.period).then((reportData: any) => {
            this.setState({
                data: reportData.value
            });

        });
    }



    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {

        let period: number = Number(option.key);
        if (period) {
            this._customGraphServiceInstance.getOneDriveUsageFileCounts(period).then((reportData: any) => {
                this.setState({
                    data: reportData.value,
                    period: period
                });
            });
        }
    }




    public render(): React.ReactElement<IGetOneDriveUsageFileCountsProps> {




        let labels: any[] = [];
        let totalFiles: ChartPoint[] = [];
        let activeFiles: ChartPoint[] = [];
        if (this.state.data.length > 0) {
            labels = this.state.data.map((item: any) => {
                return (
                    item.reportDate
                );
            });
            labels = labels.reverse();
            totalFiles = this.state.data.map((item: any) => {
                return (
                    item.total
                );
            });
            totalFiles = totalFiles.reverse();
            activeFiles = this.state.data.map((item: any) => {
                return (
                    item.active
                );
            });
            activeFiles = activeFiles.reverse();
        }






        // // set the data
        const data: Chart.ChartData = {
            labels:
                [
                    ...labels
                ],
            datasets: [
                {
                    label: 'Total Files',
                    fill: false,
                    // lineTension: 0,
                    data: totalFiles,
                    backgroundColor: "rgba(0, 120, 212, 0.2)",
                    borderColor: "#0078d4",
                    borderWidth: 1
                },
                {
                    label: 'Active Files',
                    fill: false,
                    // lineTension: 0,
                    data: activeFiles,
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
                text: "Number of total and active files"
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
