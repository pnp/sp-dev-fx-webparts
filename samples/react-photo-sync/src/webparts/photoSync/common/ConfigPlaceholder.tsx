import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import * as strings from 'PhotoSyncWebPartStrings';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { AppContext, AppContextProps } from './AppContext';
import { DisplayMode } from '@microsoft/sp-core-library';
import MessageContainer from './MessageContainer';
import { MessageScope } from './IModel';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';

const ConfigPlaceholder: React.FunctionComponent<{}> = (props) => {
    const appContext: AppContextProps = useContext(AppContext);
    const [isSiteAdmin, setSiteAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const _checkForSiteAdmin = async () => {
        let currentUserInfo: ISiteUserInfo = await appContext.helper.getCurrentUserDefaultInfo();
        setSiteAdmin(currentUserInfo.IsSiteAdmin);
        setLoading(false);
    };

    useEffect(() => {
        _checkForSiteAdmin();
    }, []);

    return (
        <>
            {isSiteAdmin ? (
                <Placeholder iconName='DataManagementSettings'
                    iconText={strings.PlaceholderIconText}
                    description={strings.PlaceholderDescription}
                    buttonLabel={strings.PlaceholderButtonLabel}
                    hideButton={appContext.displayMode === DisplayMode.Read}
                    onConfigure={appContext.openPropertyPane} />
            ) : (
                    <>
                        {loading &&
                            <ProgressIndicator label={strings.SitePrivilegeCheckLabel} description={strings.PropsLoader} />
                        }
                        {!loading &&
                            <MessageContainer MessageScope={MessageScope.SevereWarning} Message={strings.AdminConfigHelp} />
                        }
                    </>
                )}
        </>
    );
};

export default ConfigPlaceholder;