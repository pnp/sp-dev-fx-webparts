import * as React from 'react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import styles from './GroupMembershipManager.module.scss';
import * as strings from 'GroupMembershipManagerWebPartStrings'
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, Alert } from "@fluentui/react-components/unstable";
import { Button, Spinner } from "@fluentui/react-components";
import { AddUserMode } from './AddUser';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PersonDeleteRegular } from '@fluentui/react-icons';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import SPFxPeopleCard from './SPFxPeopleCard';
import { BatchRequestStep, BatchRequestContent, BatchRequestBody, BatchResponseContent } from '@microsoft/microsoft-graph-client';

enum rState { Idle, Running, Error, Completed }

type Props = {
    Group: MicrosoftGraph.Group,
    Mode: AddUserMode,
    Users: MicrosoftGraph.User[]
    context: WebPartContext,
    onCompleted?: () => void
}

export default function RemoveUser({ Group, Users, Mode, context, onCompleted }: Props): React.ReactElement<Props> {
    const [open, setOpen] = React.useState(false);
    const [_error, setError] = React.useState<string>(null);
    const [running, setRunning] = React.useState<rState>(rState.Idle);

    const handleError = (error: unknown): void => {
        console.error(error);
        setError(error.toString());
        setRunning(rState.Error);
    };

    const remove = async (): Promise<void> => {
        setRunning(rState.Running);
        try {
            const client: MSGraphClientV3 = await context.msGraphClientFactory.getClient("3");

            const userRequestSteps: BatchRequestStep[] = Users.map((v, i) => ({
                id: i.toString(),
                request: new Request(`/groups/${Group.id}/${Mode === AddUserMode.Member ? 'members' : 'owners'}/${v.id}/$ref`, {
                  method: "DELETE"
                })
            }));

            const _content: BatchRequestBody = await (new BatchRequestContent(userRequestSteps).getContent());

            // POST the batch request content to the /$batch endpoint
            const batchResponse = await client.api('/$batch').post(_content);

            const errors: string[] = [];

            new BatchResponseContent(batchResponse).getResponses().forEach((v, k) => {
                if (!v.ok) {
                    errors.push(v.statusText);
                }
            });
            if (errors.length > 0) throw errors.join('||');
            else setRunning(rState.Completed);
        } catch (error) {
            handleError(error);
        }

    };

    React.useEffect(() => {
        if (running === rState.Completed) setTimeout(() => {
            setOpen(false);
            setRunning(rState.Idle);
            if (onCompleted) onCompleted();
        }, 5000);
    }, [running]);


    return (
        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogTrigger>
                <Button appearance='primary' icon={<PersonDeleteRegular />} disabled={Users.length === 0}>{strings.Remove}</Button>
            </DialogTrigger>
            <DialogSurface aria-label="label">
                <DialogTitle>{Mode === AddUserMode.Owner ? strings.RemoveDialogTitleOwner : strings.RemoveDialogTitle}{Group.displayName}</DialogTitle>
                <DialogBody>
                    <div className={styles.stack}>
                        {running !== rState.Error && _error && <Alert intent="error">{_error.split('||').map((v, i) => (<div key={i}>{v}</div>))}</Alert>}
                        {running === rState.Error && _error && <Alert intent="error" action={{ children: 'Retry', onClick: () => setRunning(rState.Running) }}>{_error.split('||').map((v, i) => (<div key={i}>{v}</div>))}</Alert>}
                        {running === rState.Completed && <Alert intent="success">{Mode === AddUserMode.Owner ? strings.Owners : strings.Members} {strings.Removed} {Group.displayName}</Alert>}
                        {Users.length > 0 && <div className={styles.stackHoz} style={{ flexWrap: 'wrap' }}>
                            {Users.map(u => <div key={u.id} className={styles.stackHoz} style={{ maxWidth: 200, whiteSpace: 'nowrap' }}>
                                <SPFxPeopleCard primaryText={u.displayName} serviceScope={context.serviceScope} email={u.userPrincipalName} size={PersonaSize.size24} secondaryText={u.mail} />
                            </div>)}
                        </div>}
                        {running === rState.Running && <Spinner labelPosition='below' label={strings.Removing} />}
                    </div>
                </DialogBody>
                <DialogActions>
                    <DialogTrigger>
                        <Button appearance="secondary" disabled={running === rState.Running}>{strings.Close}</Button>
                    </DialogTrigger>
                    <Button appearance="primary" disabled={running === rState.Completed || running === rState.Running} onClick={remove}>{strings.Remove}</Button>
                </DialogActions>
            </DialogSurface>
        </Dialog>
    )
}