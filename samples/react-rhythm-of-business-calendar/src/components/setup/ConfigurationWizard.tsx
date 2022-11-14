import React, { FC, useState } from "react";
import { IComponentStyles } from "@uifabric/foundation";
import { FocusZone, format, Image, IStackTokens, ITextStyles, Stack, Text } from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";
import { Wizard, IWizardPageProps } from "common/components";
import { ElementProvisioner } from "common/sharepoint";
import { Configuration } from "schema";
import { useConfigurationService, useEventsService, useSharePointService, ISharePointService, IConfigurationService, IEventsService, useTeamsJS, useDirectoryService, ILiveUpdateService, useLiveUpdateService } from "services";

import { AppName, ConfigurationWizard as strings } from 'ComponentStrings';

const setRefinersIllustration = require('assets/onboarding/setRefinersIllustration.png');
const addEventsIllustration = require('assets/onboarding/addEventsIllustration.png');
const setApproversIllustration = require('assets/onboarding/setApproversIllustration.png');

interface IProps {
    onSetupComplete: () => void;
}

type IWizardData = {
    configuration: Configuration;
    services: {
        spo: ISharePointService;
        configurations: IConfigurationService;
        events: IEventsService;
        liveUpdate: ILiveUpdateService
    };
};
type IConfigurationWizardPageProps = IWizardPageProps<IWizardData>;

const Heading: FC = () =>
    <Text block variant="xxLarge" styles={useConst({ root: { textAlign: 'center' } })} tabIndex={0}>
        {format(strings.Heading, AppName)}
    </Text>

const Page_Start = (props: IConfigurationWizardPageProps) => {
    const itemWidth = 250;
    const tokens = useConst<IStackTokens>({ childrenGap: 6, maxWidth: itemWidth });
    const descriptionTextStyles: IComponentStyles<ITextStyles> = { root: { textAlign: 'center' } };

    return (
        <FocusZone>
            <Stack horizontal horizontalAlign="center" wrap tokens={useConst({ childrenGap: 60 })}>
                <Stack horizontalAlign="center" tokens={tokens} data-is-focusable aria-label={`${strings.SetRefinersHeading} - ${strings.SetRefinersDescription}`}>
                    <Image src={setRefinersIllustration} width={itemWidth} />
                    <Text variant="large">{strings.SetRefinersHeading}</Text>
                    <Text styles={descriptionTextStyles}>{strings.SetRefinersDescription}</Text>
                </Stack>
                <Stack horizontalAlign="center" tokens={tokens} data-is-focusable aria-label={`${strings.AddEventsHeading} - ${strings.AddEventsDescription}`}>
                    <Image src={addEventsIllustration} width={itemWidth} />
                    <Text variant="large">{strings.AddEventsHeading}</Text>
                    <Text styles={descriptionTextStyles}>{strings.AddEventsDescription}</Text>
                </Stack>
                <Stack horizontalAlign="center" tokens={tokens} data-is-focusable aria-label={`${strings.SetApproversHeading} - ${strings.SetApproversDescription}`}>
                    <Image src={setApproversIllustration} width={itemWidth} />
                    <Text variant="large">{strings.SetApproversHeading}</Text>
                    <Text styles={descriptionTextStyles}>{strings.SetApproversDescription}</Text>
                </Stack>
            </Stack>
        </FocusZone>
    );
}

const Page_Success = (props: IConfigurationWizardPageProps) =>
    <Text block variant="xLarge" styles={useConst({ root: { textAlign: 'center' } })} role="alert">
        {strings.SetupComplete}
    </Text>

const finalizeSetup = async ({ configuration, services }: IWizardData) => {
    const { spo, configurations, events, liveUpdate } = services;

    configurations.track(configuration);

    const provisioner = new ElementProvisioner();
    await provisioner.ensureElements(configuration.schema);

    await spo.preflightSchema();
    await configurations.persist();

    configurations.active = configuration;

    await events.initialize();
    await spo.preflightSchema();

    liveUpdate.begin();
}

const ConfigurationWizard: FC<IProps> = ({ onSetupComplete }) => {
    const { currentUserIsSiteAdmin } = useDirectoryService();
    const teams = useTeamsJS();
    const spo = useSharePointService();
    const configurations = useConfigurationService();
    const events = useEventsService();
    const liveUpdate = useLiveUpdateService();

    const [data] = useState<IWizardData>({
        configuration: new Configuration(),
        services: { spo, configurations, events, liveUpdate }
    });

    if (currentUserIsSiteAdmin) {
        return (
            <Wizard
                data={data}
                heading={<Heading />}
                startPage={Page_Start}
                stepPages={[]}
                execute={finalizeSetup}
                successPage={Page_Success}
                strings={{ StartButton: strings.StartButton }}
                onWizardComplete={onSetupComplete}
            />
        );
    } else {
        return (
            <Text block variant="large" styles={{ root: { textAlign: 'center' } }} role="alert">
                {teams ? strings.MustBeTeamOwner : strings.MustBeSiteAdmin}
            </Text>
        );
    }
}

export default ConfigurationWizard;