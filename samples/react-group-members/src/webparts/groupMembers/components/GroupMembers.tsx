import * as React from 'react';
import styles from './GroupMembers.module.scss';
import { IGroupMembersProps } from './IGroupMembersProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { PersonaSize } from 'office-ui-fabric-react';
import SPFxPeopleCard, { IPeopleCardProps } from './SPFxPeopleCard';
import { Placeholder } from '@pnp/spfx-controls-react';


export default class GroupMembers extends React.Component<IGroupMembersProps, {}> {

  public state = { people: [] };

  public componentDidMount() {
    this.load(this.props.groups, this.props.ignorePeople);
  }

  public componentWillReceiveProps(nextProps: Readonly<IGroupMembersProps>, nextContext: any): void {
    this.load(nextProps.groups, nextProps.ignorePeople);
  }

  protected load = (groups: IPropertyFieldGroupOrPerson[], ignorePeople: IPropertyFieldGroupOrPerson[]): void => {
    this.setState({ people: [] });
    this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
      groups.forEach(g => {
        client.api(`/groups/${g.id.split('|')[2]}/members`).top(999).get((err, res: any) => {
          if (res !== null) {
            let r: MicrosoftGraph.User[] = res.value;
            if (!ignorePeople) ignorePeople = [];
            let p: IPeopleCardProps[] = r.filter(u => ignorePeople.filter(i => i.email.toLowerCase() === u.mail.toLowerCase()).length === 0).map(r1 => (
              { 
                primaryText: r1.displayName,
                secondaryText: r1.jobTitle, 
                email: r1.mail ?? r1.userPrincipalName, 
                serviceScope: this.props.context.serviceScope, 
                class: styles.personaCard, 
                size: PersonaSize.size40 
              } ));
            this.setState({ people: this.state.people.concat(p).sort((a, b) => a.primaryText.localeCompare(b.primaryText)) });
          }
        });
      });
    });
  }
  

  public render(): React.ReactElement<IGroupMembersProps> {
    const { people } = this.state;
    const { hasTeamsContext } = this.props;

    if (people.length === 0) return (
      <Placeholder iconName='Edit' iconText='Select the group(s) to use' description='Please configure the group(s) to use' buttonLabel='Configure' onConfigure={() => this.props.context.propertyPane.open()} />
    );

    return (
      <section className={`${styles.groupMembers} ${hasTeamsContext ? styles.teams : ''}`}>
        { people.map(p => (<SPFxPeopleCard {...p} />)) }
      </section>
    );
  }
}
