import React, { Component, MutableRefObject, ReactNode, RefObject } from "react";
import { FocusZone, Panel, PanelType, Text } from "@fluentui/react";
import { IAsyncData } from "common";
import { AsyncDataComponent } from "common/components";
import { Approvers, Event } from "model";
import { EventsService, EventsServiceProp, ServicesProp, withServices } from "services";
import { IEventCommands } from "../events/IEventCommands";
import { EventCard } from "./EventCard";
import { MyApprovalsFilter } from "./MyApprovalsFilter";

import { MyApprovalsPanel as strings } from "ComponentStrings";

export interface IMyApprovalsPanel {
    open: () => void;
    close: () => void;
}

interface IOwnProps {
    componentRef?: RefObject<IMyApprovalsPanel>;
    commands: IEventCommands;
}
type IProps = IOwnProps & ServicesProp<EventsServiceProp>;

interface IState {
    hidden: boolean;
    eventsAsync: IAsyncData<readonly Event[]>;
    approversAsync: IAsyncData<readonly Approvers[]>;
}

class MyApprovalsPanel extends Component<IProps, IState> implements IMyApprovalsPanel {
    constructor(props: IProps) {
        super(props);

        const {
            [EventsService]: { eventsAsync, approversAsync }
        } = this.props.services;

        this.state = {
            hidden: true,
            eventsAsync,
            approversAsync
        };
    }

    public componentDidMount() {
        (this.props.componentRef as MutableRefObject<IMyApprovalsPanel>).current = this;
    }

    public componentWillUnmount(): void {
        (this.props.componentRef as MutableRefObject<IMyApprovalsPanel>).current = null;
    }

    public readonly open = () =>
        this.setState({ hidden: false })

    public readonly close = () =>
        this.setState({ hidden: true })

    public render(): ReactNode {
        const { commands } = this.props;
        const { hidden, eventsAsync, approversAsync } = this.state;

        return (
            <Panel
                type={PanelType.medium}
                isOpen={!hidden}
                isBlocking={false}
                isLightDismiss
                onDismiss={this.close}
                headerText={strings.HeaderText}
                closeButtonAriaLabel={strings.Command_Close.AriaLabel}
            >
                <AsyncDataComponent hideSpinners dataAsync={approversAsync}>{approvers =>
                    <AsyncDataComponent dataAsync={eventsAsync}>{events =>
                        <MyApprovalsFilter events={events} approvers={approvers}>{events => <>
                            <FocusZone>{events.map(event =>
                                <EventCard key={event.key} data-is-focusable event={event} commands={commands} />
                            )}</FocusZone>
                            {events.length === 0 &&
                                <Text>{strings.NoEventsToApprove}</Text>
                            }
                        </>}</MyApprovalsFilter>
                    }</AsyncDataComponent>
                }</AsyncDataComponent>
            </Panel>
        );
    }
}

export default withServices(MyApprovalsPanel);