import * as React from 'react';
import * as strings from 'LeadAssistDashboardWebPartStrings';
import styles from './LeadAssistDashboard.module.scss';
import { MgtTemplateProps } from '@microsoft/mgt-react/dist/es6/spfx';
import { Separator, Spinner } from 'office-ui-fabric-react';
import DataService from '../../../services/DataService';

export default class CustomAgendaTemplate {
    /**
     * Template to display a single event
     * @param props 
     * @returns The element that display a single event
     */
    public static eventTemplate = (props: MgtTemplateProps): JSX.Element => {
        const { event } = props.dataContext;
        
        let eventLocation: string = "";
        let isTeamsMeeting: boolean = false;

        if (event.isOnlineMeeting == true) {
            eventLocation = strings.MicrosoftTeams;
            isTeamsMeeting = true;
        }
        else {
            if (event.location) {
                if (event.location.displayName && event.location.displayName.length > 0) {
                    eventLocation = event.location.displayName;
                }
            }
        }

        const startDate: Date = new Date(event.start.dateTime);
        const endDate: Date = new Date(event.end.dateTime);
        
        return <div className={styles.event}>
                    <div className={((isTeamsMeeting == true) ? styles.teamsEventBorder : styles.eventBorder)}>
                        <div className={styles.leftPadding}>
                            <div className={styles.eventTitle}>{event.subject}</div>
                            <div>{DataService.getTime(startDate)} - {DataService.getTime(endDate)}</div>
                            <div>{eventLocation}</div>
                        </div>
                    </div>
                    <Separator />
                </div>;
    }

    /**
     * Template to show when events are being loaded
     * @param props 
     * @returns The element to display the loading state
     */
    public static loadingTemplate = (props: MgtTemplateProps): JSX.Element => {
        return <Spinner label="Loading..."></Spinner>;
    }

    /**
     * Template to show when there are no events available
     * @param props 
     * @returns The element to display that no event is available
     */
    public static noDataTemplate = (props: MgtTemplateProps): JSX.Element => {
        return <div>{strings.NoEventFound}</div>;
    }
}