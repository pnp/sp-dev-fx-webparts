import * as React from 'react';
import { IAADApplication, IAADApplicationList, IMessageBoxProps, ISPSite } from './ISitesSelectedAppInterfaces';
import { ISitesSelectedManagerProps } from './ISitesSelectedManagerProps';
import { SitesSelectedAppList } from './SitesSelectedList';
import { Icon, MessageBar, MessageBarType, Pivot, PivotItem, PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
import { Spinner } from '@fluentui/react';
import styles from './SitesSelectedManager.module.scss';


export const SitesSelectedApp: React.FunctionComponent<ISitesSelectedManagerProps> = (props) => {
    const [appState, setAppState] = React.useState<Array<IAADApplication>>()
    const [site, setSite] = React.useState("");
    const [permString, setpermString] = React.useState("");
    const [showMessage, setShowMessage] = React.useState(false);
    const [messageBarType, setMessageBarType] = React.useState<MessageBarType>();
    const [message, setMessage] = React.useState("");


    React.useEffect(() => {
        const fetchData = async () => {
            setShowMessage(false);

            try {
                const client = await props.context.msGraphClientFactory.getClient();
                const aadApps: IAADApplicationList = await client
                    .api('applications')
                    .version("v1.0")
                    .select("id,appId,displayName,requiredResourceAccess")
                    .get();
                const appsWithSitesSelected = aadApps.value.filter((obj) => {
                    return obj.requiredResourceAccess.some(({ resourceAccess }) =>
                        resourceAccess.some(({ id }) => id === props.aadGuid))
                });
                setAppState(appsWithSitesSelected);

                if (appsWithSitesSelected.length === 0) {
                    setMessageBarType(MessageBarType.info)
                    setMessage(`We couldn't find any apps with [Sites.Selected] - Don't think that's right? 
                    Then you might want to double check the guid in webpart settings - The default is 883ea226-0bf2-4a8f-9f9d-92c9162a727d`);
                    setShowMessage(true);
                }

            } catch (error) {
                setMessageBarType(MessageBarType.error)
                if (error.statusCode) {
                    setMessage(`Http error occured ${error.statusCode} - ${error.message} - have you consented this web part in API management?`);
                } else {
                    setMessage(`Unknown error occured getting your apps - have you consented this web part in API management?`);
                }
                setAppState([]);
                setShowMessage(true);
            }
        }
        fetchData()
    }, [])


    const checkSitePermission = async () => {
        setpermString("...loading - Getting site");
        setShowMessage(false);

        try {
            const url = new URL(site);
            const client = await props.context.msGraphClientFactory.getClient();
            const siteData: ISPSite = await client
                .api(`sites/${url.hostname}:${url.pathname}`)
                .version("v1.0")
                .select("displayName,id,description")
                .get();
            setpermString("...loading - Got the site");

            const perms = await client
                .api(`sites/${siteData.id}/permissions`)
                .version("v1.0")
                .get()

            setpermString(JSON.stringify(perms.value, undefined, 4))

        } catch (error) {
            setMessageBarType(MessageBarType.error)
            if (error.statusCode) {
                setMessage(`Http error occured ${error.statusCode} - ${error.message} - Check the format of your URL
                Correct format below:
                https://tenant.sharepoint.com/sites/thesite`);
            } else {
                setMessage(`Unknown error`);
            }
            setpermString("");
            setShowMessage(true);
        }
    }
    const SitesSelectedMessageBox = (p: IMessageBoxProps) => (
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

    if (appState) {
        return <div>
            <h1>{props.description}</h1>
            <Pivot>
                {props.showAbout ? <PivotItem
                    headerText="Home / About"
                    headerButtonProps={{
                        'data-order': 1,
                        'data-title': 'Home / About'
                    }}
                    itemIcon="Home"
                >
                    <h3>What can this webpart do?</h3>
                    <ul>
                        <li><Icon iconName="SharepointAppIcon16" /> List Azure AD applications that have the Microsoft graph api scope [Sites.Selected]</li>
                        <li><Icon iconName="SharepointAppIcon16" /> Add SharePoint sites to the listed apps which will enable the app to interact with these sites via the graph api</li>
                        <li><Icon iconName="SharepointAppIcon16" /> Clear all SharePoint site permissions for the selected app</li>

                        <li><Icon iconName="Permissions" /> Check what app(s) that has been added to a specific SharePoint site</li>

                    </ul>
                    <h3>Good to know</h3>
                    <p>
                        Due to api- and other limitations it is "not possible" to list all sites that have an app with permissions via this concept.
                        Furthermore, when checking a site you will see that it has n apps with access but not what access (Read,Write or Read/Write)
                    </p>


                    <h3>User access</h3>
                    <p>
                        In order to grant access for an app, the user of this webpart has to be a Site Collection Administrator of the site.
                    </p>
                </PivotItem> : React.Fragment}
                <PivotItem headerText="Add/Remove sites to Apps" itemIcon="SharepointAppIcon16">
                    <SitesSelectedAppList {...{ value: appState, webpartProperties: props }} />
                    {showMessage ? <SitesSelectedMessageBox resetChoice={resetChoice} /> : React.Fragment}
                </PivotItem>
                <PivotItem headerText="Check app permissions on a site" itemIcon="Permissions">

                    <h3>Use the form below to check a sites permissions</h3>
                    <p><strong>Info!</strong> If the result box shows [] it means there is no permissions granted</p>

                    <Stack className={styles.checkPermUi}>

                        <TextField onChange={(e: any) => setSite(e.target.value)} label="SharePoint site"
                            placeholder="Please enter URL here" />

                        <PrimaryButton text="Check permission" onClick={checkSitePermission} allowDisabledFocus />

                        <TextField value={permString} label="(Raw) - Permission object for site" multiline autoAdjustHeight />

                    </Stack>
                    {showMessage ? <SitesSelectedMessageBox resetChoice={resetChoice} /> : React.Fragment}

                </PivotItem>
            </Pivot>
        </div>
    }
    else {
        return <div>
            <Spinner label="Working on it..." />
        </div>
    }
}