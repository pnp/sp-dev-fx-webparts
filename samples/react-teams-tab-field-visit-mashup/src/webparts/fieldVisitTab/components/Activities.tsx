import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IActivityService } from '../services/ActivityService/IActivityService';
import { IActivity } from '../model/IActivity';

export interface IActivityProps {
    service: IActivityService;
    customerId: string;
}

export interface IActivityState {
    activities?: IActivity[];
    currentCustomerId?: string;
}

export class Activities extends React.Component<IActivityProps, IActivityState> {

    constructor(props: IActivityProps) {
        super(props);
        this.state = {
            activities: undefined,
            currentCustomerId: undefined
        };
    }

    public render(): React.ReactElement<IActivityProps> {

        if (this.props.customerId) {

            if (this.state.currentCustomerId == this.props.customerId) {

                if (this.state.activities && this.state.activities.length > 0) {
                    return (
                        <div className={styles.activities}>
        
                            <div className={styles.activitiesHeadingRow}>
                                <div className={styles.activitiesDateColumn}>
                                    Date
                                </div>
                                <div className={styles.activitiesNameColumn}>
                                    Activity
                                </div>
                                <div className={styles.activitiesAmountColumn}>
                                    Amount
                                </div>
                                <div className={styles.activitiesDescriptionColumn}>
                                    Description
                                </div>
                            </div>
        
                            {this.state.activities.map(a => (
                            <div className={styles.activitiesRow}>
                                <div className={styles.activitiesDateColumn}>
                                    {a.date.toDateString()}
                                </div>
                                <div className={styles.activitiesNameColumn}>
                                    {a.name}
                                </div>
                                <div className={styles.activitiesAmountColumn}>
                                    {a.amount}
                                </div>
                                <div className={styles.activitiesDescriptionColumn}>
                                    {a.description}
                                </div>
                            </div>
        
                            ))}
                        </div>);
        
                } else {
                    return (<div>No documents found</div>);
                }
                
            } else {
                this.props.service.getDocuments(this.props.customerId)
                    .then((activities: IActivity[]) => {
                        this.setState({
                            activities: activities,
                            currentCustomerId: this.props.customerId
                        });
                    });

                return (<div>Loading</div>);
            }
        } else {
            return (
                <div>No visit selected</div>
            );
        }
    }
}