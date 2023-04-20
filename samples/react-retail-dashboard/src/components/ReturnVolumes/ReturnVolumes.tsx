import * as React from "react";
import styles from './ReturnVolumes.module.scss';
import * as strings from 'RetailHomeWebPartStrings';

import { IReturnVolumesProps } from "./IReturnVolumesProps";
import { IReturnVolumesState } from "./IReturnVolumesState";
import { RetailReturnVolumes } from "../../models";

import { ChartControl, ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export class ReturnVolumes extends React.Component<IReturnVolumesProps, IReturnVolumesState> {

    constructor(props: IReturnVolumesProps) {
        super(props);

        this.state = {
            returnVolumes: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the return volumes
        const returnVolumes = await this.getReturnVolumes();

        // Set the state
        this.setState({
            returnVolumes: returnVolumes
        });
    }

    private async getReturnVolumes(): Promise<RetailReturnVolumes> {
        // Get the return volumes
        const result = await this.props.retailDataService.LoadReturnVolumes();
        return result;
    }
    
    public render(): React.ReactElement<IReturnVolumesProps> {

        const {
            returnVolumes
        } = this.state;

        const {
            maxMonths,
            showDetails
        } = this.props;

        const allLabels: string[] = [
            strings.ReturnVolumes.Months.January, 
            strings.ReturnVolumes.Months.February,
            strings.ReturnVolumes.Months.March,
            strings.ReturnVolumes.Months.April,
            strings.ReturnVolumes.Months.May,
            strings.ReturnVolumes.Months.June,
            strings.ReturnVolumes.Months.July,
            strings.ReturnVolumes.Months.August,
            strings.ReturnVolumes.Months.September,
            strings.ReturnVolumes.Months.October,
            strings.ReturnVolumes.Months.November,
            strings.ReturnVolumes.Months.December
          ]; 

        const data = {
            labels: allLabels.slice(0, maxMonths),
            datasets: [
              {
                label: strings.ReturnVolumes.Returns,
                data: returnVolumes?.monthlyReturns.slice(0, maxMonths).map(r => r.returns),
                fill: true,
                backgroundColor: styles.returnsRGBBgColor,
                borderColor: styles.returnsRGBColor,
                borderWidth: 3
              },
              {
                label: strings.ReturnVolumes.Inventory,
                data: returnVolumes?.monthlyReturns.slice(0, maxMonths).map(r => r.inventory),
                fill: true,
                backgroundColor: styles.inventoryRGBBgColor,
                borderColor: styles.inventoryRGBColor,
                borderWidth: 3
              }
            ]
          };

        const options = {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        display: true,
                        border: {
                            display: false
                        },
                        scaleLabel: {
                            labelString: '',
                        },
                        ticks: {
                            display: true
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        border: {
                            display: false
                        },
                        scaleLabel: {
                            labelString: '',
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            min: 0,
                            max: 8000,
                            stepSize: 2000,
                            callback: function(value: number) {
                                return (value === 0 ? '0' : `${value / 1000}K`);
                            }
                        }
                    }
                ]
            }
        };
        
        const accessibility = {
            enable: true
        };

        const maxNumberReturns: number = Math.max(...returnVolumes?.monthlyReturns.map(r => r.returns) || []);
        const maxNumberInventory: number = Math.max(...returnVolumes?.monthlyReturns.map(r => r.inventory) || []);
        const monthOfMaxReturns: string = months[returnVolumes?.monthlyReturns.filter(r => r.returns === maxNumberReturns)[0]?.month - 1] || '';
        const monthOfMaxInventory: string = months[returnVolumes?.monthlyReturns.filter(r => r.inventory === maxNumberInventory)[0]?.month - 1] || '';
        const currentReturns: number = returnVolumes?.monthlyReturns[maxMonths - 1].returns || 0;
        const currentInventory: number = returnVolumes?.monthlyReturns[maxMonths - 1].inventory || 0;

        return (
            <div>
            {returnVolumes ? 
                <div className={styles.returnVolumes}>
                    <ChartControl
                        className={styles.chart}
                        type={ChartType.Line}
                        data={data}
                        options={options}
                        accessibility={accessibility}
                        palette={ChartPalette.OfficeMonochromatic8}
                        loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Generic.Loading} />}
                    />         
                    { showDetails &&     
                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <div className={styles.volumeValue}>{maxNumberReturns.toLocaleString('en-US')}</div>
                                    <div className={styles.volumeDescription}>{strings.ReturnVolumes.MaxReturns}</div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.volumeValue}>{maxNumberInventory.toLocaleString('en-US')}</div>
                                    <div className={styles.volumeDescription}>{strings.ReturnVolumes.MaxInventory}</div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <div className={styles.volumeValue}>{monthOfMaxReturns}</div>
                                    <div className={styles.volumeDescription}>{strings.ReturnVolumes.MonthOfMaxReturns}</div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.volumeValue}>{monthOfMaxInventory}</div>
                                    <div className={styles.volumeDescription}>{strings.ReturnVolumes.MonthOfMaxInventory}</div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <div className={styles.volumeValue}>{currentReturns.toLocaleString('en-US')}</div>
                                    <div className={styles.volumeDescription}>{strings.ReturnVolumes.CurrentReturnCount}</div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.volumeValue}>{currentInventory.toLocaleString('en-US')}</div>
                                    <div className={styles.volumeDescription}>{strings.ReturnVolumes.CurrentInventoryCount}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div>No Return Volumes data found!</div>
            }
            </div>
        );
    }
}