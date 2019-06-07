import * as React from 'react';
import styles from './SuggestedTeamMembers.module.scss';
import { ISuggestedTeamMembersProps, ISuggestedTeamMembersState, IPerson } from './ISuggestedTeamMembersProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { GraphHttpClientResponse, GraphHttpClient } from '@microsoft/sp-http';
import { IPersonaSharedProps, Persona, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { DefaultButton, PrimaryButton, IButtonProps, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Guid } from '@microsoft/sp-core-library';
import MembersPicker from './MembersPicker';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class SuggestedTeamMembers extends React.Component<ISuggestedTeamMembersProps, ISuggestedTeamMembersState> {

  constructor(props: ISuggestedTeamMembersProps) {
    super(props);

    this.state = {
      loading: true,
      people: [],
      userIsGroupOwner: false
    };
  }

  public componentDidMount(): void {
    this._userIsOwner().then(isOwner => {
      if (!isOwner) {
        this.setState({
          loading: false,
          userIsGroupOwner: false
        });
      } else {
        this._getMyPeople().then(people => {
          this.setState({
            loading: false,
            people: people,
            userIsGroupOwner: true
          });
        });
      }
    });
  }

  private async _userIsOwner(): Promise<boolean> {
    const query: string = `v1.0/me/ownedObjects?$filter=id eq '${this.props.groupId}'`;

    const response: GraphHttpClientResponse = await this.props.graphHttpClient.get(
      query,
      GraphHttpClient.configurations.v1);

    return response.ok;
  }

  private async _getMyPeople(): Promise<IPerson[]> {
    const query: string = "v1.0/me/people?$filter=personType/class eq 'Person'";

    const response: GraphHttpClientResponse = await this.props.graphHttpClient.get(
      query,
      GraphHttpClient.configurations.v1);
    const responseJson: any = await response.json();

    const people: IPerson[] = responseJson.value.map(item => {
      const person: IPerson = {
        id: item.id,
        displayName: item.displayName,
        jobTitle: item.jobTitle,
        officeLocation: item.officeLocation,
        userPrincipalName: item.userPrincipalName
      };
      return person;
    });

    return people;
  }

  public render(): React.ReactElement<ISuggestedTeamMembersProps> {

    let title: string = '';
    if (this.state.loading) {
      return <div>Loading data...</div>;
    }

    if (!this.state.userIsGroupOwner) {
      return <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>You are not Owner of this Group</MessageBar>;
    }

    if (this.props.teamsContext) {
      title = 'Team: ' + this.props.teamsContext.teamName;
    } else {
      title = 'Group: ' + this.props.groupId;
    }

    const headerTitle = "These are suggested members to add to the " + title + "...";
    return <div className={styles.suggestedTeamMembers}>
            <p>{headerTitle}</p>
            <MembersPicker
              people = {this.state.people}
              groupId = {this.props.groupId}
              graphHttpClient={this.props.graphHttpClient}
            />
          </div>;
  }
}
