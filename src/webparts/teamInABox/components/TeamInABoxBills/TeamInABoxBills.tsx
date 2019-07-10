import * as React from 'react';
import styles from './TeamInABoxBills.module.scss';
import { ITeamInABoxBillsProps } from './ITeamInABoxBillsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxBillsState } from './ITeamInABoxBillsState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPListService } from '../../../../services';
import { IBill } from '../../../../models';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export class TeamInABoxBills extends React.Component<ITeamInABoxBillsProps, ITeamInABoxBillsState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxBillsProps) {
        super(props);

        this.state = {
            allbills: props.allbills
        };

        this.wpContext = props.context;
    }
    public render(): React.ReactElement<ITeamInABoxBillsProps> {
        const { allbills } = this.state;
        return (
            <div className={styles.teamInABoxBills}>
                <div className={styles.BillsHeading}><h3>All Bills</h3></div>
                <DetailsList
                    items={ allbills }
                    layoutMode={ DetailsListLayoutMode.justified }
                    isHeaderVisible={ true }
                    columns={ this.getColumns()}
                    />
            </div>
        );
    }

    public componentWillReceiveProps(props) {
        this.setState({ allbills: props.allbills });
    }

    private getColumns(): IColumn [] {
       return [
        {   
            key: 'CliCode',
            name: 'Code',
            fieldName: 'CliCode',
            data: 'number',
            isSorted: false,
            isRowHeader: true,
            isResizable: true,
            isSortedDescending: false,
            minWidth: 25,
            isPadded: true
        },
        {
            key: 'BillDate',
            name: 'Bill Date',
            fieldName: 'BTDate',
            data: 'number',
            isSorted: false,
            isRowHeader: true,
            isResizable: true,
            isSortedDescending: false,
            minWidth: 100,
            isPadded: true
        },
        {
            key: 'BillType',
            name: 'Type',
            fieldName: 'BillType',
            data: 'string',
            isSorted: false,
            isRowHeader: true,
            isResizable: true,
            isSortedDescending: false,
            minWidth: 100,
            isPadded: true
        },
        {
            key: 'BillNbr',
            name: 'Bill Number',
            fieldName: 'BillNbr',
            data: 'number',
            isSorted: false,
            isRowHeader: true,
            isResizable: true,
            isSortedDescending: false,
            minWidth: 100,
            isPadded: true
        },
        {
            key: 'BillAmt',
            name: 'Amount',
            fieldName: 'BillAmt',
            data: 'number',
            isSorted: false,
            isRowHeader: true,
            isResizable: true,
            isSortedDescending: false,
            minWidth: 100,
            isPadded: true
        },
        {
            key: 'BillBalance',
            name: 'A/R Balance Due',
            fieldName: 'BillBalance',
            data: 'number',
            isSorted: false,
            isRowHeader: true,
            isResizable: true,
            isSortedDescending: false,
            minWidth: 100,
            isPadded: true
        },
       ]; 
    }
}
