import * as React from 'react';
import styles from './TeamInABoxBilledTime.module.scss';
import { ITeamInABoxBilledTimeProps } from './ITeamInABoxBilledTimeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxBilledTimeState } from './ITeamInABoxBilledTimeState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPListService } from '../../../../services';
import { IBilledTime } from '../../../../models';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export class TeamInABoxBilledTime extends React.Component<ITeamInABoxBilledTimeProps, ITeamInABoxBilledTimeState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxBilledTimeProps) {
        super(props);

        this.state = {
            bills: props.bills
        };

        this.wpContext = props.context;
    }
    public render(): React.ReactElement<ITeamInABoxBilledTimeProps> {
        const { bills } = this.state;
        return (
            <div className={styles.teamInABoxBilledTime}>
                <div className={styles.BillTimeHeading}><h3>Meetings</h3></div>
                <DetailsList
                    items={ bills }
                    layoutMode={ DetailsListLayoutMode.justified }
                    isHeaderVisible={ true }
                    columns={ this.getColumns()}
                    />
            </div>
        );
    }

    public componentWillReceiveProps(props) {
        this.setState({ bills: props.bills });
    }

    private getColumns(): IColumn[] {
        return [
            {
                key: 'title',
                name: 'Meeting',
                fieldName: 'Title',
                data: 'number',
                isSorted: false,
                isRowHeader: true,
                isResizable: true,
                isSortedDescending: false,
                minWidth: 50,
                isPadded: true
            },
            {
                key: 'BTTkprName',
                name: 'Details',
                fieldName: 'BTTkprName',
                data: 'string',
                isSorted: false,
                isRowHeader: true,
                isResizable: true,
                isSortedDescending: false,
                minWidth: 500,
                isPadded: true
            }             
        ];
    }

}
