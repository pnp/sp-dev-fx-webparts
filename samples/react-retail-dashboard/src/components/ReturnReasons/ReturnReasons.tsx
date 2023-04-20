import * as React from "react";
import styles from './ReturnReasons.module.scss';
import * as strings from 'RetailHomeWebPartStrings';

import { IReturnReasonsProps } from "./IReturnReasonsProps";
import { IReturnReasonsState } from "./IReturnReasonsState";
import { RetailReturnReasonsStats } from "../../models";

import { ChartControl, ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

export class ReturnReasons extends React.Component<IReturnReasonsProps, IReturnReasonsState> {

    constructor(props: IReturnReasonsProps) {
        super(props);

        this.state = {
            returnReasons: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the return reasons stats
        const returnReasonsStats = await this.getReturnReasonsStats();

        // Set the state
        this.setState({
            returnReasons: returnReasonsStats
        });
    }

    private async getReturnReasonsStats(): Promise<RetailReturnReasonsStats> {
        // Get the return reasons stats
        const result = await this.props.retailDataService.LoadReturnReasonStats();
        return result;
    }
    
    public render(): React.ReactElement<IReturnReasonsProps> {

        const {
            returnReasons
        } = this.state;

        const data = {
            labels:
              [
                strings.ReturnReasons.IncorrectFit, 
                strings.ReturnReasons.Defective, 
                strings.ReturnReasons.WrongItem, 
                strings.ReturnReasons.Disliked, 
                strings.ReturnReasons.WrongSize
              ],
            datasets: [
              {
                label: strings.ReturnReasons.DataSetTitle,
                data:
                  [
                    returnReasons?.incorrectFit ?? 0,
                    returnReasons?.defective ?? 0,
                    returnReasons?.wrongItem ?? 0,
                    returnReasons?.disliked ?? 0,
                    returnReasons?.wrongSize ?? 0
                  ]
              }
            ]
          };

        const options = {
            legend: {
              display: true,
              position: "bottom"
            },
            title: {
              display: false
            },
            responsive: true,
            maintainAspectRatio: false
        };
        
        return (
            <div>
            {returnReasons ? 
                <div className={styles.returnReasons}>
                    <ChartControl
                        className={styles.chart}
                        type={ChartType.Doughnut}
                        data={data}
                        options={options}
                        palette={ChartPalette.OfficeMonochromatic8}
                        loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Generic.Loading} />}
                    />                        
                </div>
                :
                <div>No Reasons for Return data found!</div>
            }
            </div>
        );
    }
}