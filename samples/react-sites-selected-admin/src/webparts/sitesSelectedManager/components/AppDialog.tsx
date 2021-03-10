import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { MessageBarType, TextField } from 'office-ui-fabric-react';
import styles from './AppStyles.module.scss';
import { IAzureApp, IPermission } from './IAppInterfaces';
import { IService, Service } from '../Service';
import * as strings from 'SitesSelectedManagerWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IAppDialogProps {
    isHidden: boolean;
    hideDialog: (hide: boolean) => void;
    wpContext: WebPartContext,
    selectedApp: IAzureApp;
    isDeleteMode: boolean;
    showMessage: (type: MessageBarType, message: string, autoDismiss: boolean, error?: any) => void;
}

interface IAppDialogState {
    site: string;
    permission: string;
}

export const AppDialog: React.FunctionComponent<IAppDialogProps> = (props) => {
    const [state, setState] = React.useState<IAppDialogState>(
        { site: '', permission: '' });
    const [service] = React.useState<IService>(props.wpContext.serviceScope.consume(Service.serviceKey))
    const [mode, setMode] = React.useState({ add: false, delete: false });

    React.useEffect(() => {
        if (state.site) {
            const url = new URL(state.site);
            const payload: IPermission = {
                roles: state.permission.split('-'),
                grantedToIdentities: [{ application: props.selectedApp }]
            }
            console.warn(payload);

            service.addPermissions(url, payload).then(() => {
                props.showMessage(MessageBarType.success, strings.DialogAddSuccess, true);
            }, (error) => {
                props.showMessage(MessageBarType.error, strings.ErrorGeneric, false, error);
            })
            props.hideDialog(true);

        }
    }, [mode.add])

    React.useEffect(() => {
        if (state.site) {
            service.deletePermissions(new URL(state.site), props.selectedApp.id).then(() => {
                props.showMessage(MessageBarType.success, strings.DialogRemoveSuccess, true);
            }, (error: any) => {
                props.showMessage(MessageBarType.error, strings.ErrorGeneric, false, error);
            });
            props.hideDialog(true);
        }

    }, [mode.delete])

    const addDialogContentProps = {
        type: DialogType.normal,
        title: strings.DialogAddTitle,
        subText: strings.DialogAddSubTitle,
    };

    const deleteDialogContentProps = {
        type: DialogType.normal,
        title: strings.DialogDelTitle,
        subText: strings.DialogDelSubTitle,
    };

    return (
        <>
            <Dialog className={styles.sitesSelectedManager}
                hidden={props.isHidden}
                onDismiss={(() => { props.hideDialog(true) })}
                dialogContentProps={props.isDeleteMode ? deleteDialogContentProps : addDialogContentProps}
                modalProps={{ isBlocking: false, styles: { main: { maxWidth: 450 } }, }}
            >
                <TextField onChange={(e: any) => setState({ ...state, site: e.target.value })} label={strings.CheckSiteLabel}
                    placeholder={strings.CheckSitePlaceholder} />

                <ChoiceGroup className={props.isDeleteMode ? styles.dialogHidden : styles.dialogShow} onChange={(ev: any, option: IChoiceGroupOption) => {
                    setState({ ...state, permission: option.key })

                }} options={[
                    {
                        key: 'read',
                        text: strings.Read,
                    },
                    {
                        key: 'write',
                        text: strings.Write,
                    },
                    {
                        key: 'read-write',
                        text: strings.ReadWrite,
                    }
                ]} />

                <DialogFooter>
                    <PrimaryButton
                        onClick={() => { props.isDeleteMode ? setMode({ ...mode, delete: !mode.delete }) : setMode({ ...mode, add: !mode.add }) }}
                        text={props.isDeleteMode ? strings.Remove : strings.Grant} />
                    <DefaultButton onClick={(() => props.hideDialog(true))} text={strings.Cancel} />
                </DialogFooter>
            </Dialog>
        </>
    );
};