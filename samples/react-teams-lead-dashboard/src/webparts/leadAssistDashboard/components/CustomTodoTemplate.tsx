import * as React from 'react';
import styles from './LeadAssistDashboard.module.scss';
import { MgtTemplateProps } from '@microsoft/mgt-react/dist/es6/spfx';
import { Separator } from 'office-ui-fabric-react';
import DataService from '../../../services/DataService';

export default class CustomTodoTemplate {
    /**
     * Template to display a single todo
     * @param props 
     * @returns The element that display a single todo
     */
    public static todoTemplate = (props: MgtTemplateProps): JSX.Element => {
        const { task } = props.dataContext;

        const title: string = task.title;
        const dueDateTime: Date = (task.dueDateTime) ? new Date(task.dueDateTime.dateTime) : undefined;
        
        let result: JSX.Element = <div></div>;

        // If task is not completed
        if (task.status != "completed") {
            // Set the template
            result = <div className={styles.task}>
            <div>
                <div className={styles.leftPadding}>
                    {dueDateTime &&
                    <div className={styles.taskDateTime}>{DataService.getDate(dueDateTime)}, {DataService.getTime(dueDateTime)}</div>}
                    <div className={styles.taskTitle}>{title}</div>
                </div>
            </div>
            <Separator />
            </div>;
        }

        return result;
    }
}