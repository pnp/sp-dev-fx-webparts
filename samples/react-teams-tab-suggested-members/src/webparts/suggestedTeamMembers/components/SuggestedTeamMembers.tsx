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

export default class SuggestedTeamMembers extends React.Component<ISuggestedTeamMembersProps, ISuggestedTeamMembersState> {

  constructor(props: ISuggestedTeamMembersProps) {
    super(props);

    this.state = {
      people: []
    };
  }

  public componentDidMount(): void {
    this._getMyPeople().then(people => {
      this.setState({
        people: people
      });
    });
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

    if (this.state.people == null || this.state.people.length === 0) {
      return <div>Loading data...</div>;
    }

    return <div className={styles.suggestedTeamMembers}>
      <p>These are suggested members to add to the group...</p>
      <MembersPicker
        people = {this.state.people}
        groupId = {this.props.groupId}
        graphHttpClient={this.props.graphHttpClient}
      />
    </div>;
  }
}
