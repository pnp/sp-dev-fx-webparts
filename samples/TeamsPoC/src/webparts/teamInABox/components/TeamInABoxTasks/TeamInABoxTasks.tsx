import * as React from 'react';
import styles from './TeamInABoxTasks.module.scss';
import { ITeamInABoxTasksProps } from './ITeamInABoxTasksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxTasksState } from './ITeamInABoxTasksState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class TeamInABoxTasks extends React.Component<ITeamInABoxTasksProps, ITeamInABoxTasksState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxTasksProps) {
        super(props);

        this.state = {};

        this.wpContext = props.context;
    }
    public render(): React.ReactElement<ITeamInABoxTasksProps> {
        return (
            <div className={styles.teamInABoxTasks}>
                TODO: Add Tasks
            </div>
        );
    }
}
