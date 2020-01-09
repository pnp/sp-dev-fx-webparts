import * as microsoftTeams from "@microsoft/teams-js";
import { ITabLink } from '../model/ITabLink';

export default class TeamsConfigurationService {

    constructor() {
        if (microsoftTeams) {
            microsoftTeams.initialize();
        }
    }

    public configureTab(tab: ITabLink, redirect: boolean) {

        if (microsoftTeams) {

            let url = redirect ?
                window.location.href + "?entityId=" + tab.entityId :
                tab.contentPageUrl;
            microsoftTeams.settings.setValidityState(true);
            microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.settings.setSettings({
                    suggestedDisplayName: tab.tabName,
                    entityId: tab.entityId,
                    contentUrl: url,
                    websiteUrl: url
                });
                saveEvent.notifySuccess();
            });

        }
    }
}

