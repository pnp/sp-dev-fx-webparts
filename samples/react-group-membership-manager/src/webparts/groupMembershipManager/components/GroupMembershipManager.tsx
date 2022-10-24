import * as React from 'react';
import styles from './GroupMembershipManager.module.scss';
import { IGroupMembershipManagerProps } from './IGroupMembershipManagerProps';
import * as strings from 'GroupMembershipManagerWebPartStrings';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Checkbox, CheckboxOnChangeData, Spinner, Subtitle1, Textarea, Tooltip } from '@fluentui/react-components';
import { Dropdown, Option, Toolbar } from "@fluentui/react-components/unstable";
import { TableBody, TableCell, TableRow, Table } from '@fluentui/react-table';
import AddUser, { AddUserMode } from './AddUser';
import RemoveUser from './DeleteUser';
import { GraphError } from '@microsoft/microsoft-graph-client';
import SPFxPeopleCard from './SPFxPeopleCard';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { PeopleTeam24Regular, MailLink24Regular,ShieldLock24Regular, Eye24Regular, EyeOff24Regular } from '@fluentui/react-icons'
 
type OnSelectData = {
  optionValue: string;
  selectedOptions: string[];
};

interface IGroup extends MicrosoftGraph.Group {
  resourceProvisioningOptions?: string[]
}

export default function GroupMembershipManager(props: IGroupMembershipManagerProps): React.ReactElement<IGroupMembershipManagerProps> {
  const { hasTeamsContext, context } = props;
  const [groups, setGroups] = React.useState<IGroup[]>(null);
  const [group, setGroup] = React.useState<string>(null);
  const [members, setMembers] = React.useState<MicrosoftGraph.User[]>(null);
  const [owners, setOwners] = React.useState<MicrosoftGraph.User[]>([]);
  const [toRemove, setToRemove] = React.useState<MicrosoftGraph.User[]>([]);
  const [removeOwner, setRemoveOwner] = React.useState<MicrosoftGraph.User[]>([]);

  React.useEffect(() => {
    context.msGraphClientFactory.getClient("3").then((client: MSGraphClientV3) => {
      client.api('/me/ownedObjects').select("id,displayName,groupTypes,visibility,mailEnabled,resourceProvisioningOptions,securityEnabled,description").get((error, response: { value: MicrosoftGraph.Group[] }) => {
        if (error) throw error;
        setGroups(response.value.filter(g => g.groupTypes).sort((a, b) => a.displayName.localeCompare(b.displayName)));
      }).catch(console.error);
    }).catch(console.error);
  }, []);

  const loadGroup = async (): Promise<void> => {
    setMembers(null);
    setOwners(null);
    setToRemove([]);
    setRemoveOwner([]);
    const client: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");
    client.api(`/groups/${groups.filter(g => g.displayName === group)[0].id}/members`).select("id,displayName,mail,userPrincipalName").get((error: GraphError, response: { value: MicrosoftGraph.User[] }) => {
      if (error) throw error;
      setMembers(response.value.sort((a, b) => a.displayName.localeCompare(b.displayName)));
    }).catch(console.error);
    client.api(`/groups/${groups.filter(g => g.displayName === group)[0].id}/owners`).select("id,displayName,mail,userPrincipalName").get((error: GraphError, response: { value: MicrosoftGraph.User[] }) => {
      if (error) throw error;
      setOwners(response.value);
    }).catch(console.error);
  };

  React.useEffect(() => {
    if (group) loadGroup().catch(console.error);
  }, [group]);

  const checkUser = (data: CheckboxOnChangeData, user: MicrosoftGraph.User): void => {
    setToRemove(data.checked ? toRemove.concat([user]) : toRemove.filter(u => u.id !== user.id));
  };

  const checkOwner = (data: CheckboxOnChangeData, user: MicrosoftGraph.User): void => {
    setRemoveOwner(data.checked ? removeOwner.concat([user]) : removeOwner.filter(u => u.id !== user.id));
  };

  return (
    <section className={`${styles.groupMembershipManager} ${hasTeamsContext ? styles.teams : ''}`}>
      {!groups && <Spinner labelPosition='below' label={strings.LoadingGroups} />}
      {groups && <section>
        <Subtitle1 block>{strings.PickGroup}</Subtitle1>
        <div className={styles.stackHoz} style={{ alignItems: 'center'}}>
          <Dropdown placeholder={strings.PickGroup} size="large" onSelect={(e, d?: OnSelectData) => setGroup(d ? d.optionValue : null)}>
            {groups.map(group => <Option id={group.id} key={group.id}>{group.displayName}</Option>)}
          </Dropdown>
          {group && groups.filter(g => g.displayName === group)[0].resourceProvisioningOptions?.filter(g => g === "Team").length === 1 &&
              <Tooltip relationship='label' content="Team"><span><PeopleTeam24Regular /></span></Tooltip>
          }
          {group && groups.filter(g => g.displayName === group)[0].mailEnabled && 
            <Tooltip relationship='label' content="Mail Enabled"><span><MailLink24Regular /></span></Tooltip>
          }
          {group && groups.filter(g => g.displayName === group)[0].securityEnabled && 
            <Tooltip relationship='label' content="Security Enabled"><span><ShieldLock24Regular /></span></Tooltip>
          }
          {group && groups.filter(g => g.displayName === group)[0].visibility && 
            <Tooltip relationship='label' content={groups.filter(g => g.displayName === group)[0].visibility}><span>
              {groups.filter(g => g.displayName === group)[0].visibility === 'Public' && <Eye24Regular />}
              {groups.filter(g => g.displayName === group)[0].visibility === 'Private' && <EyeOff24Regular />}
            </span></Tooltip>
          }
        </div>
      </section>}
      {(!members || !owners) && groups && group && <Spinner labelPosition='below' label={strings.LoadingMembers} />}
      {groups && group && <div className={styles.stack} style={{marginTop: 10 }}>
        <Textarea value={groups.filter(g => g.displayName === group)[0].description} resize='vertical' readOnly />
        <div className={`${styles.stackHoz} ${styles.spaceBetween}`} style={{marginTop: 10 }}>
          <div style={{width: '49%'}}>
            <Subtitle1>{strings.Members}</Subtitle1>
            {!members && <Spinner labelPosition='below' label={strings.LoadingMembers} />}
            {members && <> 
              {//don't display the toolbar if the group is dynamic
                !(groups.filter(g => g.displayName === group)[0].groupTypes?.filter(g => g === "DynamicMembership").length > 0) && <Toolbar>
                <AddUser context={context} Group={groups.filter(g => g.displayName === group)[0]} Mode={AddUserMode.Member} onCompleted={loadGroup} />
                <RemoveUser Users={toRemove} context={context} Group={groups.filter(g => g.displayName === group)[0]} Mode={AddUserMode.Member} onCompleted={loadGroup} />
              </Toolbar>}
              <Table>
                <TableBody>
                  {members.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {!(groups.filter(g => g.displayName === group)[0].groupTypes?.filter(g => g === "DynamicMembership").length > 0) &&
                        <Checkbox onChange={(ev, data) => checkUser(data, user)} />}
                        <SPFxPeopleCard primaryText={user.displayName} serviceScope={context.serviceScope} email={user.userPrincipalName} size={PersonaSize.size24} secondaryText={user.mail} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>}
          </div>
          <div style={{width: '49%'}}>
            <Subtitle1>{strings.Owners}</Subtitle1>
            {!owners && <Spinner labelPosition='below' label={strings.LoadingOwners} />}
            {owners && <>
              <Toolbar>
                <AddUser context={context} Group={groups.filter(g => g.displayName === group)[0]} Mode={AddUserMode.Owner} onCompleted={loadGroup} />
                <RemoveUser Users={removeOwner} context={context} Group={groups.filter(g => g.displayName === group)[0]} Mode={AddUserMode.Owner} onCompleted={loadGroup} />
              </Toolbar>
              <Table>
                <TableBody>
                  {owners.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                      {!(groups.filter(g => g.displayName === group)[0].groupTypes?.filter(g => g === "DynamicMembership").length > 0) &&
                        <Checkbox onChange={(ev, data) => checkOwner(data, user)} />}
                        <SPFxPeopleCard primaryText={user.displayName} serviceScope={context.serviceScope} email={user.userPrincipalName} size={PersonaSize.size24} secondaryText={user.mail} />
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>}
          </div>
        </div>
      </div>}
    </section>
  );
}