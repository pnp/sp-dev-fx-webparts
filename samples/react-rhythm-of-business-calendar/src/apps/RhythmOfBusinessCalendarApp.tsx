import React, { Component, ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SharePointApp } from "common/components";
import { Root, ConfigurationWizard, Upgrade } from 'components';
import {
    ServicesType,
    DeveloperServiceDescriptor, DirectoryServiceDescriptor, TimeZoneServiceDescriptor, SharePointServiceDescriptor, LiveUpdateServiceDescriptor,
    ConfigurationServiceDescriptor, EventsServiceDescriptor,
    SharePointService, ConfigurationService, DeveloperService, LiveUpdateService
} from "services";
import { LoadingShimmer } from "./LoadingShimmer";

const AppServiceDescriptors = [
    DeveloperServiceDescriptor,
    TimeZoneServiceDescriptor,
    DirectoryServiceDescriptor,
    SharePointServiceDescriptor,
    LiveUpdateServiceDescriptor,
    ConfigurationServiceDescriptor,
    EventsServiceDescriptor
];

type AppServices = ServicesType<typeof AppServiceDescriptors>;

interface IProps {
    webpart: BaseClientSideWebPart<any>;
}

class RhythmOfBusinessCalendarApp extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    private readonly _onAfterInitServices = async (services: AppServices) => {
        const {
            [SharePointService]: spo,
            [LiveUpdateService]: liveUpdate
        } = services;

        await spo.preflightSchema();

        liveUpdate.begin();

        this._registerDevScripts(services);

    }

    private readonly _registerDevScripts = async (services: AppServices) => {
        const { [DeveloperService]: dev } = services;

        dev.registerScripts({
            debug: {
            }
        });
    }

    private readonly _renderApp = (services: AppServices) => {
        const {
            [ConfigurationService]: configurations
        } = services;

        const requiresUpgrade = configurations.active?.schemaRequiresUpgrade;

        if (!configurations.active) {
            return <ConfigurationWizard onSetupComplete={() => this.forceUpdate()} />;
        } else if (requiresUpgrade) {
            return <Upgrade onUpgradeComplete={() => window.location.reload()} />;
        } else {
            return (
                <MemoryRouter>
                    <Root />
                </MemoryRouter>
            );
        }
    }

    public render(): ReactElement<IProps> {
        const { webpart } = this.props;

        return (
            <SharePointApp
                appName="RhythmOfBusinessCalendar"
                companyName="Contoso"
                spfxComponent={webpart}
                spfxContext={webpart.context}
                teams={webpart.context.sdks.microsoftTeams}
                serviceDescriptors={AppServiceDescriptors}
                onInitAfterServices={this._onAfterInitServices}
                shimmerElements={<LoadingShimmer />}
            >
                {this._renderApp}
            </SharePointApp>
        );
    }
}

export default RhythmOfBusinessCalendarApp;