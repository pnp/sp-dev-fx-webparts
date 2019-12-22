import * as React from 'react';
import styles from './PeopleWithPresence.module.scss';
import { IPeopleWithPresenceProps } from './IPeopleWithPresenceProps';
import { IPeopleWithPresenceState } from './IPeopleWithPresenceState';
import { IPerson } from '../models/IPerson';
import { Dictionary } from '../models/Dictionary';

import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export default class PeopleWithPresence extends React.Component<IPeopleWithPresenceProps, IPeopleWithPresenceState> {

  constructor(props: IPeopleWithPresenceProps) {
    super(props);

    this.state = {
      members: undefined
    };
  }

  private async _getMembers(): Promise<Dictionary<IPerson>> {
    const endpoint: string = `https://graph.microsoft.com/beta/groups/${this.props.groupId}/members?$select=id,displayName,department`;
    const response: any = await this.props.graphHttpClient.api(endpoint).get();
    const graphResponse: any = response.value;

    let peopleDictionary: Dictionary<IPerson> = {};
    graphResponse.map(user => {
      const person: IPerson = {
        id: user.id, displayName: user.displayName, department: user.department
      };
      peopleDictionary[person.id.toString()] = person;
    });

    return peopleDictionary;
  }

  private async _getMembersPresense(users: string[]): Promise<Dictionary<IPerson>> {
    const endpoint: string = `https://graph.microsoft.com/beta/communications/getPresencesByUserId`;
    const response: any = await this.props.graphHttpClient.api(endpoint).post({
      "ids": users
    });
    const graphResponse: any = response.value;

    let peopleDictionary: Dictionary<IPerson> = {};
    graphResponse.map(user => {
      const person: IPerson = {
        id: user.id, displayName: '', department: '', availability: user.availability, activity: user.activity
      };
      peopleDictionary[person.id.toString()] = person;
    });

    return peopleDictionary;
  }

  public async componentDidMount(): Promise<void> {
    const members: Dictionary<IPerson> = await this._getMembers();

    let users: string[] = this.getMemberIds(members);

    const presenceInfo: Dictionary<IPerson> = await this._getMembersPresense(users);

    this.completeMembersListWithPresenceInfo(members, presenceInfo);

    this.setState({
      members: members
    });
  }

  private completeMembersListWithPresenceInfo(members: Dictionary<IPerson>, presenceInfo: Dictionary<IPerson>) {
    for (let key in members) {
      members[key].activity = presenceInfo[key].activity;
      members[key].availability = presenceInfo[key].availability;
    }
  }

  private getMemberIds(members: Dictionary<IPerson>) {
    let users: string[] = [];
    for (let key in members) {
      users.push(key);
    }
    return users;
  }

  public render(): React.ReactElement<IPeopleWithPresenceProps> {

    let members = [<div>Getting members...</div>];

    if (this.state.members) {
      let membersArray: IPerson[] = [];

      for (let key in this.state.members) {
        let value = this.state.members[key];
        membersArray.push(value);
      }

      members = membersArray.map(member => {
        return (
          <Persona
            size={PersonaSize.size72}
            text={member.displayName}
            secondaryText={member.department}
            tertiaryText={member.activity}
            presence={this._fromPresenceAvailabilityToPersonaPresence(member.availability)} />);
      });
    }

    return (
      <Stack>
        <h1>Members</h1>
        {members}
      </Stack>
    );
  }

  private _fromPresenceAvailabilityToPersonaPresence(availability: string): PersonaPresence {
    switch (availability) {
      case 'Busy':
      case 'BusyIdle':
        return PersonaPresence.busy;

      case 'Available':
      case 'AvailableIdle':
        return PersonaPresence.online;

      case 'Away':
      case 'BeRightBack':
        return PersonaPresence.away;

      case 'Offline':
        return PersonaPresence.offline;

      case 'DoNotDisturb':
        return PersonaPresence.dnd;

      default:
        return PersonaPresence.none;
    }
  }
}
