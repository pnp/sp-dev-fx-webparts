import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarType, Stack, TextField } from 'office-ui-fabric-react';
import styles from './AppStyles.module.scss';
import { IService, Service } from '../Service';
import * as strings from 'SitesSelectedManagerWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IAppCheckPermissionsProps {
    wpContext: WebPartContext,
    showMessage: (type: MessageBarType, message: string, autoDismiss: boolean, error?: any) => void;

}

interface IAppCheckPermissionsState {
    getPerm: boolean;
    site?: string;
    permissionJson: string;
}

export const AppCheckPermissions: React.FunctionComponent<IAppCheckPermissionsProps> = (props) => {
    const [state, setState] = React.useState<IAppCheckPermissionsState>({ getPerm: false, permissionJson: '' });
    const [service] = React.useState<IService>(props.wpContext.serviceScope.consume(Service.serviceKey))
    const toggle = () => setState({ ...state, getPerm: !state.getPerm });

    React.useEffect(() => {
        if (state.site) {
            setState({ ...state, permissionJson: strings.LoadingMessage });
            const url = new URL(state.site);
            service.getPermissions(url)
                .then((permissions) => {
                    setState({ ...state, permissionJson: JSON.stringify(permissions, undefined, 4) });
                },
                    (error) => {
                        let errorDetail = strings.ErrorGeneric;
                        let errorHint = ''
                        if (error.statusCode) {
                            errorDetail = strings.ErrorHttp
                            errorHint = `${error.statusCode} - ${error.message} ${strings.ErrorHintUrlFormat}`
                        }
                        props.showMessage(MessageBarType.error, `${errorDetail} ${errorHint}`, false);
                    })

        }
    }, [state.getPerm])

    return <div className={styles.sitesSelectedManager}><h3>{strings.PermCheckTitle}</h3>
        <p><strong>{strings.Info}</strong> {strings.PermCheckHint}</p>

        <Stack className={styles.checkPermUi}>
            <TextField onChange={(e: any) => setState({ ...state, site: e.target.value })} label={strings.CheckSiteLabel}
                placeholder={strings.CheckSitePlaceholder} />
            <PrimaryButton text={strings.CheckButtonText} onClick={toggle} allowDisabledFocus />
            <TextField value={state.permissionJson} label={strings.CheckTextAreaLabel} multiline autoAdjustHeight />

        </Stack>
    </div>

}