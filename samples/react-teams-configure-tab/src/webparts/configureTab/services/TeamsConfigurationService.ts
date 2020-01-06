import * as microsoftTeams from "@microsoft/teams-js";
import { ITabLink } from '../model/ITabLink';

export default class TeamsConfigurationService {

    constructor() {
        if (microsoftTeams) {
            microsoftTeams.initialize();
        }
    }

    public configureTab(tab: ITabLink) {

        if (microsoftTeams) {

            microsoftTeams.settings.setValidityState(true);
            microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.settings.setSettings({
                    suggestedDisplayName: tab.tabName,
                    entityId: tab.entityId,
                    contentUrl: tab.contentPageUrl,
                    websiteUrl: tab.contentPageUrl
                });
                saveEvent.notifySuccess();
            });

        }
    }
}

