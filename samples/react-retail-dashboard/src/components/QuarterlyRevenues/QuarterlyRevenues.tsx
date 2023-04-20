import * as React from "react";
import styles from './QuarterlyRevenues.module.scss';
import * as strings from 'RetailHomeWebPartStrings';

import { IQuarterlyRevenuesProps } from "./IQuarterlyRevenuesProps";
import { IQuarterlyRevenuesState } from "./IQuarterlyRevenuesState";
import { RetailQuarterlyRevenues } from "../../models";

export class QuarterlyRevenues extends React.Component<IQuarterlyRevenuesProps, IQuarterlyRevenuesState> {
    
    constructor(props: IQuarterlyRevenuesProps) {
        super(props);

        this.state = {
            quarterlyRevenues: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the quarterly revenues
        const revenues = await this.getQuarterlyRevenues();

        // Set the state
        this.setState({
            quarterlyRevenues: revenues.reverse()
        });
    }

    private async getQuarterlyRevenues(): Promise<RetailQuarterlyRevenues[]> {
        // Get the quarterly revenues
        const result = await this.props.retailDataService.LoadQuarterlyRevenues();
        return result;
    }
    
    public render(): React.ReactElement<IQuarterlyRevenuesProps> {

        const {
            quarterlyRevenues
        } = this.state;

        const currentQuarter = quarterlyRevenues ? quarterlyRevenues[0] : null;

        return (
            <div>
            {quarterlyRevenues ? 
                <div className={styles.quarterlyRevenues}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={styles.currentQuarter}><span className={currentQuarter.revenues >= quarterlyRevenues[1].revenues ? styles.trendUp : styles.trendDown}><span className={styles.trend}>{currentQuarter.revenues >= quarterlyRevenues[1].revenues ? '▲' : '▼'}</span> ${currentQuarter.revenues.toLocaleString('en-US')}</span></div>
                            <div className={styles.currentQuarterLabel}>Q{currentQuarter.quarter} {strings.QuarterlyRevenues.RevenueAmount}</div>
                        </div>
                    </div>
                    <div className={styles.historycalQuartersContainer}>
                        {
                            quarterlyRevenues.map((quarter, index) => {
                                if (index > 0) {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="col-md-12">
                                                <div className={styles.historycalQuarter}>${quarter.revenues.toLocaleString('en-US')} <span className={styles.historycalQuarterLabel}>Q{quarter.quarter}</span></div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
                :
                <div>No Quarterly Revenues data found!</div>
            }
            </div>
        );
    }
}