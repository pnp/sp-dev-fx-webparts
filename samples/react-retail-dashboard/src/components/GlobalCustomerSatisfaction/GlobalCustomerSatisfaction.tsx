import * as React from "react";
import styles from './GlobalCustomerSatisfaction.module.scss';
import * as strings from 'RetailDashboardWebPartStrings';

import { IGlobalCustomerSatisfactionProps } from "./IGlobalCustomerSatisfactionProps";
import { IGlobalCustomerSatisfactionState } from "./IGlobalCustomerSatisfactionState";

import { ChartControl, ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import { RetailCustomerSatisfactionStats } from "../../models";

export class GlobalCustomerSatisfaction extends React.Component<IGlobalCustomerSatisfactionProps, IGlobalCustomerSatisfactionState> {

    constructor(props: IGlobalCustomerSatisfactionProps) {
        super(props);

        this.state = {
          customerSatisfaction: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the return reasons stats
        const customerSatisfactionStats = await this.getCustomerSatisfactionStats();

        // Set the state
        this.setState({
            customerSatisfaction: customerSatisfactionStats
        });
    }

    private async getCustomerSatisfactionStats(): Promise<RetailCustomerSatisfactionStats> {
        // Get the customer satisfaction stats
        const result = await this.props.retailDataService.LoadCustomerSatisfactionStats();
        return result;
    }
    
    public render(): React.ReactElement<IGlobalCustomerSatisfactionProps> {

        const {
          customerSatisfaction
        } = this.state;

        const data = {
            labels:
              [
                strings.CustomerSatisfaction.CSTAT, 
                strings.CustomerSatisfaction.NSTAT, 
                strings.CustomerSatisfaction.TTS
              ],
            datasets: [
              {
                label: strings.CustomerSatisfaction.DataSetTitle,
                data:
                  [
                    customerSatisfaction?.cstat ?? 0,
                    customerSatisfaction?.nstat ?? 0,
                    customerSatisfaction?.tts ?? 0
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
            {customerSatisfaction ? 
                <div className={styles.globalCustomerSatisfaction}>
                    <ChartControl
                        className={styles.chart}
                        type={ChartType.PolarArea}
                        data={data}
                        options={options}
                        palette={ChartPalette.OfficeMonochromatic8}
                        loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Generic.Loading} />}
                    />                        
                </div>
                :
                <div>No Customers Satisfaction data found!</div>
            }
            </div>
        );
    }
}