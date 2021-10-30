import * as React from 'react';
import { IGroupDetailsProps } from './IGroupDetailsProps';
import { IGroupDetailsState } from './IGroupDetailsState';
import { PrimaryButton, Label, Text, Panel} from 'office-ui-fabric-react';
import styles from './GroupDetails.module.scss';
import { MembersList } from '../memberslist/MembersList';

export class GroupDetails extends React.Component<IGroupDetailsProps, IGroupDetailsState>{

    constructor(props: IGroupDetailsProps) {
        super(props);

        this.state = {
            showPanel: false
        };
    }

    public render(): React.ReactElement<IGroupDetailsProps> {
        return (
            <div>
                <hr />
                <Text variant="large">Group Details - {this.props.selectedGroup.displayName}</Text>
                <Label>Description:</Label>
                <div>{this.props.selectedGroup.description}</div>
                <div className={styles.membersBtn}>
                    <PrimaryButton iconProps={{iconName: 'People'}} text="View Members" onClick={this._handlePanel} />
                </div>
                {this.state.showPanel ? 
                    <MembersList closePanel={this._handlePanel} showPanel={this.state.showPanel} groupName={this.props.selectedGroup.displayName} groupId={this.props.selectedGroup.id} />
                    : <div></div>
                }
            </div>
        );
    }

    private _handlePanel = (): void => {
        this.setState({
            showPanel: !this.state.showPanel
        });
    }


}