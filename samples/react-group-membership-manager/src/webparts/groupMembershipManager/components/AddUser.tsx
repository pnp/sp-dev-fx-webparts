import * as React from 'react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as strings from 'GroupMembershipManagerWebPartStrings'
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, Alert } from "@fluentui/react-components/unstable";
import { Button, Checkbox, Divider, Input, Label, Spinner, useId } from "@fluentui/react-components";
import { PersonAddRegular } from '@fluentui/react-icons';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import SPFxPeopleCard from './SPFxPeopleCard';

export enum AddUserMode { Member, Owner }
enum rState { Idle, Running, Error, Completed }

type Props = {
    Group: MicrosoftGraph.Group,
    Mode: AddUserMode,
    context: WebPartContext,
    onCompleted?: () => void
}

export default function AddUser({ Group, Mode, context, onCompleted }: Props): React.ReactElement<Props> {
    const [open, setOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<MicrosoftGraph.Person[]>(null);
    const [searchTerm, setSearchTerm] = React.useState<string>(null);
    const [users, setUsers] = React.useState<MicrosoftGraph.Person[]>([]);
    const [_error, setError] = React.useState<string>(null);
    const [running, setRunning] = React.useState<rState>(rState.Idle);
    const add = (): void => {
        setRunning(rState.Running);
        setTimeout(() => setRunning(rState.Completed), 10000);
    };

    const handleError = (error: unknown): void => {
        console.error(error);
        setError(error.toString());
    };

    React.useEffect(() => {
        if (running === rState.Completed) setTimeout(() => { 
            setOpen(false); 
            setRunning(rState.Idle); 
            if (onCompleted) onCompleted(); 
        } , 5000);
    }, [running]);

    React.useEffect(() => {
        if (searchTerm && searchTerm !== "") {
            context.msGraphClientFactory.getClient("3").then((client: MSGraphClientV3) => {
                client.api('/me/people').search(searchTerm).filter("personType/subclass eq 'OrganizationUser'").get((error, response: { value: MicrosoftGraph.Person[] }) => {
                  if (error) throw error;
                  setSearchResults(response.value);
                }).catch(handleError);
              }).catch(handleError);
        } else setSearchResults(null)
    }, [searchTerm]);


    const inputId = useId('input-with-placeholder');

    return (
        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogTrigger>
                <Button appearance='primary' icon={<PersonAddRegular />}>{strings.Add}</Button>
            </DialogTrigger>
            <DialogSurface aria-label="label">
                <DialogTitle>{Mode === AddUserMode.Owner ? strings.AddDialogTitleOwner : strings.AddDialogTitle}{Group.displayName}</DialogTitle>
                <DialogBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {running !== rState.Error && _error && <Alert intent="error">{_error}</Alert>}
                        {running === rState.Error && <Alert intent="error" action={{ children: 'Retry', onClick: () => setRunning(rState.Running) }}>{_error}</Alert>}
                        {running === rState.Completed && <Alert intent="success">{strings.Owners} {strings.Added} {Group.displayName}</Alert>}
                        {users.length > 0 && <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
                            {users.map(u => <div key={u.id} style={{ display: 'flex', flexDirection: 'row', gap: '10px', maxWidth: 200, whiteSpace: 'nowrap' }}>
                                {running !== rState.Completed && <Checkbox disabled={running === rState.Running} defaultChecked onChange={(e, d?) => setUsers(d?.checked ? users.concat([u]) : users.filter(_u => _u.id !== u.id)) } />}
                                <SPFxPeopleCard primaryText={u.displayName} serviceScope={context.serviceScope} email={u.userPrincipalName} size={PersonaSize.size24} secondaryText={u.scoredEmailAddresses[0].address} />
                            </div>)}
                        </div>}
                        {(running === rState.Idle || running === rState.Error) && <>
                            <Divider />
                            <Label htmlFor={inputId}>{strings.Search}</Label>
                            <Input placeholder={strings.SearchPlaceholder} onChange={(e, d) => setSearchTerm(d.value)} id={inputId} />
                            {searchResults && searchResults.map(u => <div key={u.id} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <Checkbox onChange={(e, d?) => setUsers(d?.checked ? users.concat([u]) : users.filter(_u => _u.id !== u.id)) } />
                                <SPFxPeopleCard primaryText={u.displayName} serviceScope={context.serviceScope} email={u.userPrincipalName} size={PersonaSize.size24} secondaryText={u.scoredEmailAddresses[0].address} />
                            </div>)}
                        </>}
                        {running === rState.Running && <Spinner labelPosition='below' label={strings.Adding} /> }
                    </div>
                </DialogBody>
                <DialogActions>
                    <DialogTrigger>
                        <Button appearance="secondary" disabled={running === rState.Running}>{strings.Close}</Button>
                    </DialogTrigger>
                    <Button appearance="primary" disabled={running === rState.Completed || running === rState.Running} onClick={add}>{strings.Add}</Button>
                </DialogActions>
            </DialogSurface>
        </Dialog>
    )
}