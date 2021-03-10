import * as React from 'react';
import { IAzureApp } from './IAppInterfaces';
import { AppList } from './AppList';
import { Icon, MessageBar, MessageBarType, Pivot, PivotItem } from 'office-ui-fabric-react';
import { Spinner } from '@fluentui/react';
import { IService, Service } from '../Service';
import { IAppProperties } from '../SitesSelectedManagerWebPart';
import * as strings from 'SitesSelectedManagerWebPartStrings';
import { AppCheckPermissions } from './AppCheckPermissions';
import styles from './AppStyles.module.scss';
import { initializeIcons } from '@uifabric/icons';

interface IMessageBoxProps {
    resetChoice?: () => void;
}

interface IAppState {
    showMessage: boolean;
    site: string;
    messageBarType: number;
    message: string;
    permissionJson: string;
    apps: IAzureApp[];
    getPerm: boolean;
    permission: string;
}

export const App: React.FunctionComponent<IAppProperties> = (props) => {
    const [state, setState] = React.useState<IAppState>(
        { showMessage: false, site: '', messageBarType: null, message: '', permissionJson: '', apps: null, getPerm: false, permission: '' }
    );
    const [service] = React.useState<IService>(props.context.serviceScope.consume(Service.serviceKey))

    React.useEffect(() => {
        initializeIcons();
        setState({ ...state, showMessage: false });

        service.getApps(props.aadGuid)
            .then((_apps) => {
                setState({ ...state, apps: _apps });
                if (_apps.length === 0) {
                    setState({
                        ...state,
                        message: strings.ErrorNoAppsFoundMessage,
                        messageBarType: MessageBarType.info,
                        showMessage: true
                    });
                }
            },
                (error) => {
                    let _errorDetail = strings.ErrorGettingApps;
                    const _errorHint = strings.ErrorHintGettingApps;
                    if (error.statusCode) {
                        _errorDetail = `${strings.ErrorHttp} ${error.statusCode} - ${error.message}`
                    }
                    setState({
                        ...state,
                        messageBarType: MessageBarType.error,
                        apps: [],
                        message: `${_errorDetail} ${_errorHint}`,
                        showMessage: true
                    });
                })

    }, [])

    const showMessage = (type: MessageBarType, message: string, autoDismiss: boolean = false, error?: any): void => {
        setState({ ...state, showMessage: true, messageBarType: type, message: message });
        if (autoDismiss) {
            setTimeout(() => {
                setState({ ...state, showMessage: false });
            }, 5000);
        }
    }

    const resetChoice = () => {
        setState({ ...state, showMessage: false, message: '' });
    };

    const SitesSelectedMessageBox = (p: IMessageBoxProps) => (
        <MessageBar
            messageBarType={state.messageBarType}
            isMultiline={true}
            onDismiss={resetChoice}
            dismissButtonAriaLabel={strings.Close}
        >
            {state.message}

        </MessageBar>
    );

    if (state.apps) {
        return <div className={styles.sitesSelectedManager}>
            <h1>{props.description}</h1>
            {state.showMessage ? <SitesSelectedMessageBox resetChoice={resetChoice} /> : React.Fragment}
            <Pivot>
                {props.showAbout ? <PivotItem
                    headerText={strings.HomeTabTitle}
                    headerButtonProps={{
                        'data-order': 1,
                        'data-title': strings.HomeTabTitle
                    }}
                    itemIcon="Home"
                >
                    <h3>{strings.HomeTitleMain}</h3>
                    <ul>
                        <li><Icon iconName="SharepointAppIcon16" /> {strings.HomeBulletList}</li>
                        <li><Icon iconName="SharepointAppIcon16" /> {strings.HomeBulletAdd} </li>
                        <li><Icon iconName="SharepointAppIcon16" /> {strings.HomeBulletClear} </li>
                        <li><Icon iconName="Permissions" /> {strings.HomeBulletCheck} </li>
                    </ul>
                    <h3>{strings.HomeTitleFYI}</h3>
                    <p>
                        {strings.HomeFYI}
                    </p>

                    <h3>{strings.HomeAccessTitle}</h3>
                    <p>{strings.HomeAccess}</p>
                </PivotItem> : React.Fragment}
                <PivotItem headerText={strings.AddTabTitle} itemIcon="SharepointAppIcon16">
                    <AppList {...{ applications: state.apps, wpContext: props.context, showMessage: showMessage }} />
                </PivotItem>
                <PivotItem headerText={strings.CheckTabTitle} itemIcon="Permissions">
                    <AppCheckPermissions {...{ wpContext: props.context, showMessage: showMessage }} />
                </PivotItem>
            </Pivot>
        </div>
    }
    else {
        return <div>
            <Spinner label={strings.WorkingOnIt} />
        </div>
    }
}