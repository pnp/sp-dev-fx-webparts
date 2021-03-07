import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { MessageBar, MessageBarType, TextField } from 'office-ui-fabric-react';
import { ISitesSelectedManagerProps } from './ISitesSelectedManagerProps';
import styles from './SitesSelectedManager.module.scss';
import { IAADApplicationWrapper, IDialogProps, IMessageBoxProps, ISitePermissionList, ISitesSelectedPermissionPayload, ISPSite } from './ISitesSelectedAppInterfaces';

const options = [
    {
        key: 'read',
        text: 'Read',
    },
    {
        key: 'write',
        text: 'Write',
    },
    {
        key: 'read-write',
        text: 'Read / Write',
    },
];
const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
};
const addDialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Grant access to the selected app to a SharePoint site collection',
    subText: 'Enter a SharePoint site collection URL into the text field and select the wanted access level',
};

const deleteDialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Remove the access for the selected app to a SharePoint site collection',
    subText: 'Enter a SharePoint site collection URL into the text field and click "remove" to remove the access',
};


export const SitesSelectedDialog: React.FunctionComponent<IDialogProps> = (props) => {
    const [site, setSite] = React.useState("");
    const [perm, setPerm] = React.useState("");
    const [showMessage, setShowMessage] = React.useState(false);
    const [messageBarType, setMessageBarType] = React.useState<MessageBarType>();
    const [message, setMessage] = React.useState("");

    const _addPermissionToSite = async () => {
        setShowMessage(false);
        try {
            const url = new URL(site);
            const client = await props.webPartProperties.context.msGraphClientFactory.getClient();
            const siteData: ISPSite = await client
                .api(`sites/${url.hostname}:${url.pathname}`)
                .version("v1.0")
                .select("displayName,id,description")
                .get()

            const app: IAADApplicationWrapper = { application: { displayName: props.selectedApp.split('|')[0], id: props.selectedApp.split('|')[1] } }
            const pl: ISitesSelectedPermissionPayload = {
                roles: perm.split('-'),
                grantedToIdentities: [app]
            }

            await client
                .api(`sites/${siteData.id}/permissions`)
                .version("v1.0")
                .post(pl)

            _handleSuccess("Yay! - Permissions successfully added!");

        } catch (error) {
            _handleError(error)
        }
    }
    const _deletePermissionToSite = async () => {

        try {
            setShowMessage(false);
            const url = new URL(site);
            const client = await props.webPartProperties.context.msGraphClientFactory.getClient();
            const siteData: ISPSite = await client
                .api(`sites/${url.hostname}:${url.pathname}`)
                .version("v1.0")
                .select("displayName,id,description")
                .get()
            const permList: ISitePermissionList = await client
                .api(`sites/${siteData.id}/permissions`)
                .version("v1.0")
                .get()
            const permissionIdToRemove = _getPermissionIdFromPayload(props.selectedApp.split('|')[1], permList);

            if (permissionIdToRemove) {
                await client
                    .api(`sites/${siteData.id}/permissions/${permissionIdToRemove}`)
                    .version("v1.0")
                    .delete()
            }

            _handleSuccess("Yay! - Permissions successfully deleted!");

        } catch (error) {
            _handleError(error);
        }
    }

    const _handleError = (error: any) => {
        setMessageBarType(MessageBarType.error)
        if (error.statusCode) {
            setMessage(`Http error occured ${error.statusCode} - ${error.message} - Check the format of your URL
            Correct format below:
            https://tenant.sharepoint.com/sites/thesite`);
        } else {
            setMessage(`Unknown error occured`);
        }
        setShowMessage(true);
        props.hideDialog(true);
    }

    const _handleSuccess = (message: string) => {
        setMessageBarType(MessageBarType.success)
        setMessage(message);
        setShowMessage(true);
        props.hideDialog(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    }

    const _getPermissionIdFromPayload = (appId: string, payload: ISitePermissionList): string => {
        let result: string;
        payload.value.forEach(element => {
            element.grantedToIdentities.forEach(el => {
                console.warn(el.application.id === appId);
                if (el.application.id === appId)
                    result = element.id
            })
        });
        if (!result) {
            throw new Error("App could not be found for site");
        } else {
            return result;
        }
    }

    const _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
        setPerm(option.key);
    }

    const SitesSelectedStatusMessage = (p: IMessageBoxProps) => (
        <MessageBar
            messageBarType={messageBarType}
            isMultiline={true}
            onDismiss={p.resetChoice}
            dismissButtonAriaLabel="Close"
        >
            {message}

        </MessageBar>
    );

    const resetChoice = React.useCallback(() => setShowMessage(false), []);
    if (props.isDeleteMode) {
        return (
            <>

                {showMessage ? <SitesSelectedStatusMessage resetChoice={resetChoice} /> : React.Fragment}

                <Dialog className={styles.sitesSelectedManager}
                    hidden={props.isHidden}
                    onDismiss={(() => { props.hideDialog(true) })}
                    dialogContentProps={deleteDialogContentProps}
                    modalProps={modelProps}

                >

                    <TextField onChange={(e: any) => setSite(e.target.value)} label="SharePoint site"
                        placeholder="Please enter URL here" />

                    <DialogFooter>
                        <PrimaryButton onClick={_deletePermissionToSite} text="Save" />
                        <DefaultButton onClick={(() => props.hideDialog(true))} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </>
        );
    }
    else {
        return (
            <>

                {showMessage ? <SitesSelectedStatusMessage resetChoice={resetChoice} /> : React.Fragment}

                <Dialog className={styles.sitesSelectedManager}
                    hidden={props.isHidden}
                    onDismiss={(() => { props.hideDialog(true) })}
                    dialogContentProps={addDialogContentProps}
                    modalProps={modelProps}
                >

                    <TextField onChange={(e: any) => setSite(e.target.value)} label="SharePoint site"
                        placeholder="Please enter URL here" />

                    <ChoiceGroup onChange={_onChange} options={options} />
                    <DialogFooter>
                        <PrimaryButton onClick={_addPermissionToSite} text="Save" />
                        <DefaultButton onClick={(() => props.hideDialog(true))} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </>
        );
    }
};
