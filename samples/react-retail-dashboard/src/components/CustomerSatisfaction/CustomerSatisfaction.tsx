import * as React from "react";
import styles from './CustomerSatisfaction.module.scss';
import * as strings from 'RetailHomeWebPartStrings';

import { ICustomerSatisfactionProps } from "./ICustomerSatisfactionProps";
import { ICustomerSatisfactionState } from "./ICustomerSatisfactionState";
import { RetailCustomerSatisfactionStats } from "../../models";

export class CustomerSatisfaction extends React.Component<ICustomerSatisfactionProps, ICustomerSatisfactionState> {
    
    constructor(props: ICustomerSatisfactionProps) {
        super(props);

        this.state = {
            customerSatisfaction: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the customer satisfaction stats
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
    
    public render(): React.ReactElement<ICustomerSatisfactionProps> {

        const {
            customerSatisfaction
        } = this.state;

        return (
            <div>
            {customerSatisfaction ? 
                <div className={styles.customerSatisfaction}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.percentage}>{customerSatisfaction.cstat}%</div>
                            <div className={styles.percentageLabel}>{strings.CustomerSatisfaction.CSTAT}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.percentage}>{customerSatisfaction.nstat}%</div>
                            <div className={styles.percentageLabel}>{strings.CustomerSatisfaction.NSTAT}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.percentage}>{customerSatisfaction.tts}%</div>
                            <div className={styles.percentageLabel}>{strings.CustomerSatisfaction.TTS}</div>
                        </div>
                    </div>
                </div>
                :
                <div>No Customer Satisfaction data found!</div>
            }
            </div>
        );
    }
}