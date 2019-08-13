import * as React from 'react';
import styles from './TeamInABoxNotes.module.scss';
import { ITeamInABoxNotesProps } from './ITeamInABoxNotesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxNotesState } from './ITeamInABoxNotesState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPListService } from '../../../../services';
import { INote } from '../../../../models';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export class TeamInABoxNotes extends React.Component<ITeamInABoxNotesProps, ITeamInABoxNotesState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxNotesProps) {
        super(props);

        this.state = {
            notes: props.notes
        };

        this.wpContext = props.context;
    }

    public render(): React.ReactElement<ITeamInABoxNotesProps> {
        const { notes } = this.state;
        // https://developer.microsoft.com/en-us/fabric#/controls/web/detailslist
        return (
            <div className={styles.teamInABoxNotes}>
                <div className={styles.Notes}><h3>Related Notes</h3></div>
                <DetailsList
                    items={ notes }
                    layoutMode={ DetailsListLayoutMode.justified }
                    isHeaderVisible={ true }
                    columns={ this.getColumns() }
                    />
            </div>
        );
    }

    public componentWillReceiveProps(props) {
        this.setState({ notes: props.notes });
    }

    private getColumns(): IColumn[] {
        return [
            {
                key: 'title',
                name: 'Title',
                fieldName: 'Title',
                data: 'string',
                isSorted: false,
                isRowHeader: true,
                isResizable: true,
                isSortedDescending: false,
                minWidth: 50,
                isPadded: true
            },
            {
                key: 'MNNoteText',
                name: 'Details',
                fieldName: 'MNNoteText',
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
