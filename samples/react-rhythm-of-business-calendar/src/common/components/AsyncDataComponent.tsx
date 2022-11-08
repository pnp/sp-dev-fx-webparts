import sanitize from 'sanitize-html';
import React, { Component, ReactElement } from "react";
import { css, Panel, PanelType, DialogFooter, DefaultButton, Link, SpinnerSize } from "@fluentui/react";
import { IComponent } from "../IComponent";
import { IAsyncData } from "../AsyncData";
import { AsyncOverlay } from "./AsyncOverlay";

import * as strings from "CommonStrings";
import styles from "./styles/AsyncLoadComponent.module.scss";

interface IProps<T> {
    dataAsync: IAsyncData<T>;
    children: (data: T) => ReactElement;
    className?: string;
    hideSpinners?: boolean;
    saveLabel?: string;
    spinnerSize?: SpinnerSize;
}

interface IState {
    showErrorDetailsPanel: boolean;
}

export class AsyncDataComponent<T> extends Component<IProps<T>, IState> implements IComponent {
    constructor(props: IProps<T>) {
        super(props);

        this.state = {
            showErrorDetailsPanel: false
        };
    }

    public componentDidMount() {
        const { dataAsync } = this.props;
        if (dataAsync) dataAsync.registerComponentForUpdates(this);
    }

    public componentWillUnmount() {
        const { dataAsync } = this.props;
        if (dataAsync) dataAsync.unregisterComponentForUpdates(this);
    }

    public componentDidUpdate(prevProps: IProps<T>) {
        const { dataAsync: nextAsyncData } = this.props;
        const { dataAsync: prevAsyncData } = prevProps;

        if (nextAsyncData !== prevAsyncData) {
            if (prevAsyncData) prevAsyncData.unregisterComponentForUpdates(this);
            nextAsyncData.registerComponentForUpdates(this);
        }
    }

    public readonly componentShouldRender = () =>
        this.forceUpdate()

    private readonly _showErrorDetails = () =>
        this.setState({ showErrorDetailsPanel: true })

    private readonly _dismissErrorDetails = () =>
        this.setState({ showErrorDetailsPanel: false })

    public render() {
        const { saveLabel, dataAsync, hideSpinners, className, children, spinnerSize } = this.props;
        const { showErrorDetailsPanel } = this.state;

        if (dataAsync) {
            const { loaded, error, data, saving, done } = dataAsync;
            const spinnersEnabled = !hideSpinners && !error;
            const style = css(className, styles.asyncLoadComponent, { [styles.spinnersEnabled]: spinnersEnabled && !loaded });

            return (
                <div className={style}>
                    {error &&
                        <p className={styles.errorMessage}>
                            {strings.GenericError}&nbsp;&nbsp;
                            <Link className={styles.detailsLink} onClick={this._showErrorDetails}>Show details</Link>
                        </p>
                    }
                    <Panel headerText="Error Details" isOpen={showErrorDetailsPanel} onDismiss={this._dismissErrorDetails} type={PanelType.medium}>
                        {error &&
                            (error.stack
                                ? <p dangerouslySetInnerHTML={{ __html: sanitize(error.stack) }} />
                                : <p>{error.toString()}</p>
                            )
                        }
                        <DialogFooter>
                            <DefaultButton onClick={this._dismissErrorDetails}>Close</DefaultButton>
                        </DialogFooter>
                    </Panel>
                    {loaded && children(data)}
                    {spinnersEnabled && <AsyncOverlay show={!done} label={strings.Loading} spinnerSize={spinnerSize} />}
                    {spinnersEnabled && <AsyncOverlay show={saving} label={saveLabel || strings.Saving} spinnerSize={spinnerSize} />}
                </div>
            );
        } else {
            return <></>;
        }
    }
}
