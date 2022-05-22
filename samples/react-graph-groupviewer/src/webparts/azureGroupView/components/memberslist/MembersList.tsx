import * as React from 'react';
import { IMembersListProps } from './IMembersListProps';
import { IMemberListState } from './IMemberListState';
import { Panel, PanelType, Spinner, SpinnerSize, DefaultButton } from 'office-ui-fabric-react';
import { ListView, IViewField } from '@pnp/spfx-controls-react/lib/ListView';
import { graph } from '@pnp/graph/presets/all';
import { CSVLink } from 'react-csv';
import styles from './MembersList.module.scss';

const view: IViewField[] = [
    {
        name: 'displayName',
        displayName: 'Name',
        minWidth: 150,
        isResizable: true
    },
    {
        name: 'mail',
        displayName: 'Email',
        minWidth: 150,
        isResizable: true
    }
];

const csvHeaders = [
    { label: 'Name', key: 'displayName'},
    { label: 'Email', key: 'mail'}
];

export class MembersList extends React.Component<IMembersListProps, IMemberListState>{

    constructor(props: IMembersListProps) {
        super(props);
    
        this.state = {
            members: null,
            membersCount: 0,
            isLoading: false
        };
    }

    public render(): React.ReactElement<IMembersListProps> {
        return (
            <div>
                <Panel type={PanelType.medium} isOpen={this.props.showPanel} headerText={`${this.props.groupName} - Members (${this.state.membersCount})`} onDismiss={this._handlePanel}>
                    {this.state.isLoading ? 
                        <div>
                            <Spinner label="Loading Members..." size={SpinnerSize.medium} />
                        </div>
                        :
                        <div>
                            <div className={styles.exportBtn}>
                                <CSVLink data={this.state.members} headers={csvHeaders} filename={`${this.props.groupName}-Members.csv`}>
                                    <DefaultButton text="Export to CSV" />
                                </CSVLink>
                            </div>
                            <ListView 
                             items={this.state.members}
                             viewFields={view}
                             showFilter={true}
                             filterPlaceHolder={"Search Members..."}
                            />
                        </div>
                    }
                </Panel>
            </div>
        );
    }

    public componentDidMount() {
        this._loadMembers();
    }

    private _loadMembers = (): void => {
        this.setState({isLoading: true});
        this._getMembers(this.props.groupId).then(response => {
            this.setState({
                members: response,
                membersCount: response.length,
                isLoading: false
            });
        });
    }

    private async _getMembers(id: string) {
        const members = await graph.groups.getById(id).members();
        console.log(members);
        return members;
    }

    private _handlePanel = (): void => {
       this.props.closePanel(); 
    }

}