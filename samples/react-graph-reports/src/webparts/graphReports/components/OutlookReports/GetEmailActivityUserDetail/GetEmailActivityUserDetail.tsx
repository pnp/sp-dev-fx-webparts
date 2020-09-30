import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomGraphService } from '../../../../../services';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ChartPoint } from 'chart.js';
import styles from '../../GraphReports.module.scss';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Line, Pie } from 'react-chartjs-2';


export interface IGetEmailActivityUserDetailProps {
    customServiceScope: ServiceScope;
}

export interface IGetEmailActivityUserDetailState {
    data: [];
    period: number;
}

export default class GetEmailActivityUserDetail extends React.Component<IGetEmailActivityUserDetailProps, IGetEmailActivityUserDetailState> {



    private _customGraphServiceInstance;
    /**
       *
       */
    constructor(props: IGetEmailActivityUserDetailProps) {
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
        this._customGraphServiceInstance.getEmailActivityUserDetail(this.state.period).then((reportData: any) => {
            this.setState({
                data: reportData.value
            });

        });
    }



    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {

        let period: number = Number(option.key);
        if (period) {
            this._customGraphServiceInstance.getEmailActivityUserDetail(period).then((reportData: any) => {
                this.setState({
                    data: reportData.value,
                    period: period
                });
            });
        }
    }




    public render(): React.ReactElement<IGetEmailActivityUserDetailProps> {




        
        let chartData: any[] = [];
        

        let assignedProducts: ChartPoint[] = [];

        if (this.state.data.length > 0) {

            this.state.data.map((item: any) => {                
                   chartData.push(item.sendCount);
                   chartData.push(item.receiveCount);
                   chartData.push(item.readCount);                
            });
           
        }






        // // set the data
        const data: Chart.ChartData = {
            labels:
                [
                    'Sent',
                    'received',
                    'Read'
                ],
            datasets: [
                {
                    data: chartData,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
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
                text: "Email Activity User Detail"
            },
            scales: {
                yAxes: [{
                    stacked: true
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
                    {this.state.data.length > 0 ? <Pie data={data} options={options} redraw/> : ""}
                </Grid>
            </div>
        );
    }
}
