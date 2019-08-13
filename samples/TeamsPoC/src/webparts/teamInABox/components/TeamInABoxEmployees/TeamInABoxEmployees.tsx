import * as React from 'react';
import styles from './TeamInABoxEmployees.module.scss';
import { ITeamInABoxEmployeesProps } from './ITeamInABoxEmployeesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxEmployeesState } from './ITeamInABoxEmployeesState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPListService } from '../../../../services';
import { IEmployee } from '../../../../models';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export class TeamInABoxEmployees extends React.Component<ITeamInABoxEmployeesProps, ITeamInABoxEmployeesState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxEmployeesProps) {
        super(props);

        this.state = {
            employees: props.employees
        };

        this.wpContext = props.context;
    }
    
    public render(): React.ReactElement<ITeamInABoxEmployeesProps> {
        const { employees } = this.state;
        return (
            <div className={styles.teamInABoxEmployees}>
                <div className={styles.EmployeesHeading}><h3>Staff Members</h3></div>
                <DetailsList
                    items={ employees }
                    layoutMode={ DetailsListLayoutMode.justified }
                    isHeaderVisible={ true }
                    columns={ this.getColumns()}
                    />
            </div>
        );
    }
    
    public componentWillReceiveProps(props) {
        this.setState({ employees: props.employees });
    }

    private getColumns(): IColumn[] {
        return [            
            {
                key: 'title',
                name: 'Employee',
                fieldName: 'Title',
                data: 'string',
                isSorted: false,
                isRowHeader: true,
                isResizable: true,
                isSortedDescending: false,
                minWidth: 100,
                isPadded: true
            }
        ];
    }

}
