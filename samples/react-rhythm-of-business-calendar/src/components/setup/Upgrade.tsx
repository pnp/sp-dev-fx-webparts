import { first, isEmpty, min } from "lodash";
import React, { Component, ReactElement, ReactNode } from "react";
import { PrimaryButton, ProgressIndicator, MessageBar, MessageBarType } from "@fluentui/react";
import { CompletedIcon } from "@fluentui/react-icons-mdl2";
import { IUpgrade, IUpgradeAction } from 'common/sharepoint';
import { Configuration } from 'schema';
import { withServices, ServicesProp, ConfigurationServiceProp, ConfigurationService } from 'services';

import * as sstrings from 'ComponentStrings';
import * as cstrings from 'CommonStrings';
import styles from "./Upgrade.module.scss";

const UpgradeCompletedSplashscreenTimeout = 2500;

interface IOwnProps {
    onUpgradeComplete: () => void;
}
type IProps = IOwnProps & ServicesProp<ConfigurationServiceProp>;

interface IState {
    cannotUpgrade: boolean;
    inProgress: boolean;
    complete: boolean;
    currentAction: IUpgradeAction;
    percentComplete: number;
    error: any;
}

class Upgrade extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            cannotUpgrade: false,
            inProgress: false,
            complete: false,
            currentAction: null,
            percentComplete: 0.0,
            error: null
        };
    }

    private readonly _onClick = () => {
        this._upgrade();
    }

    private readonly _upgrade = async () => {
        const { [ConfigurationService]: config } = this.props.services;

        try {
            let upgradableConfigs = this._nextConfigurationsToUpgrade();
            let nextUpgradeGroups = this._nextUpgradeGroups(upgradableConfigs);

            if (isEmpty(nextUpgradeGroups)) {
                this.setState({ cannotUpgrade: true });
            }
            else {
                while (!isEmpty(nextUpgradeGroups)) {
                    const sampleGroup = first(nextUpgradeGroups);
                    let i = min(upgradableConfigs.map(c => c.currentUpgradeAction));

                    while (i < sampleGroup.upgrade.actions.length) {
                        this.setState({
                            inProgress: true,
                            percentComplete: i / sampleGroup.upgrade.actions.length,
                            error: null
                        });

                        const sampleAction = sampleGroup.upgrade.actions[i];

                        if (sampleAction.shared) { // if is shared, do once, persist all
                            const sharedAction = sampleAction;
                            this.setState({ currentAction: sharedAction });
                            console.log("Running shared upgrade action: " + sharedAction.description);

                            await sharedAction.execute(this.props);

                            upgradableConfigs.forEach(c => {
                                c.snapshot();
                                c.currentUpgradeAction = i + 1;
                            });

                            await config.persist();

                            upgradableConfigs.forEach(c => c.immortalize());
                        } else { // if not shared, execute per config, persist per config
                            for (const { upgrade, configuration } of nextUpgradeGroups) {
                                const action = upgrade.actions[i];

                                this.setState({ currentAction: action });
                                console.log("Running upgrade action: " + action.description);

                                await action.execute(this.props);

                                configuration.snapshot();
                                configuration.currentUpgradeAction = i + 1;

                                await config.persist();
                                configuration.immortalize();
                            }
                        }

                        i++;
                    }

                    for (const configuration of upgradableConfigs) {
                        configuration.snapshot();
                        configuration.currentUpgradeAction = 0;
                        configuration.schemaVersion = first(nextUpgradeGroups).upgrade.toVersion;
                    }

                    await config.persist();

                    upgradableConfigs.forEach(c => c.immortalize());

                    upgradableConfigs = this._nextConfigurationsToUpgrade();
                    nextUpgradeGroups = this._nextUpgradeGroups(upgradableConfigs);
                }

                this.setState({ complete: true, inProgress: false });
                setTimeout(this.props.onUpgradeComplete, UpgradeCompletedSplashscreenTimeout);
            }
        } catch (e) {
            console.error(e);
            this.setState({ error: e, inProgress: false });
        }
    }

    private readonly _nextConfigurationsToUpgrade = (): Configuration[] => {
        const { [ConfigurationService]: configurations } = this.props.services;
        const minSchemaVer = min(configurations.all.map(c => c.schemaVersion));
        return configurations.all.filter(c => c.schemaVersion === minSchemaVer);
    }

    private readonly _nextUpgradeGroups = (configurations: Configuration[]): { upgrade: IUpgrade, configuration: Configuration }[] => {
        return configurations
            .map(config => {
                const upgrade = first(config.schema.upgrades.filter(u => u.fromVersion === config.schemaVersion));
                return { upgrade: upgrade, configuration: config };
            })
            .filter(group => !!group.upgrade);
    }

    private readonly _renderCannotUpgrade = (): React.ReactNode => {
        const { [ConfigurationService]: { active } } = this.props.services;
        return <p>{sstrings.UpgradeStrings.CannotUpgrade} v{active.schemaVersion.toFixed(1)}.</p>;
    }

    private readonly _renderReadyToUpgrade = (): React.ReactNode => {
        const { inProgress } = this.state;
        return (
            <div>
                <h2>{sstrings.UpgradeStrings.Heading}</h2>
                <p>{sstrings.UpgradeStrings.Description}</p>
                <PrimaryButton text={sstrings.UpgradeStrings.UpgradeButton.Text} onClick={this._onClick} disabled={inProgress} />
            </div>
        );
    }

    private readonly _renderInProgress = (): React.ReactNode => {
        const { currentAction, percentComplete } = this.state;
        return (
            <div>
                <h2>{sstrings.UpgradeStrings.InProgressHeading}</h2>
                <ProgressIndicator label={currentAction.description} percentComplete={percentComplete} />
            </div>
        );
    }

    private readonly _renderComplete = (): ReactNode => {
        return (
            <div>
                <h2>{sstrings.UpgradeStrings.CompletedHeading}</h2>
                <h2><CompletedIcon /></h2>
            </div>
        );
    }

    public render(): ReactElement<IProps> {
        const { cannotUpgrade, complete, inProgress, error } = this.state;
        return (
            <div className={styles.upgrade}>
                <h1>{sstrings.AppName}</h1>

                {error && <MessageBar messageBarType={MessageBarType.error}>{cstrings.GenericError}</MessageBar>}

                {
                    (cannotUpgrade && this._renderCannotUpgrade())
                    ||
                    (complete && this._renderComplete())
                    ||
                    (inProgress && this._renderInProgress())
                    ||
                    this._renderReadyToUpgrade()
                }
            </div>
        );
    }
}

export default withServices(Upgrade);