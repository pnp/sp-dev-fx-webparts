import * as React from 'react';
import styles from './TeamInABoxMeetings.module.scss';
import { ITeamInABoxMeetingsProps } from './ITeamInABoxMeetingsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxMeetingsState } from './ITeamInABoxMeetingsState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class TeamInABoxMeetings extends React.Component<ITeamInABoxMeetingsProps, ITeamInABoxMeetingsState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxMeetingsProps) {
        super(props);

        this.state = {};

        this.wpContext = props.context;
    }
    public render(): React.ReactElement<ITeamInABoxMeetingsProps> {
        return (
            <div className={styles.teamInABoxMeetings}>
                TODO: Add Meetings
            </div>
        );
    }
}
