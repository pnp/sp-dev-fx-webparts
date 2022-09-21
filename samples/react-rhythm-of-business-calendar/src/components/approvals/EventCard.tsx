import React, { FC, useCallback } from "react";
import { useConst } from "@fluentui/react-hooks";
import { ActionButton, Separator, Stack } from "@fluentui/react";
import { Event } from "model";
import { EventOverview, IEventCommands } from "../events";

import styles from './MyApprovalsPanel.module.scss';

import { MyApprovalsPanel as strings } from 'ComponentStrings';

interface IProps {
    event: Event;
    commands: IEventCommands;
}

export const EventCard: FC<IProps> = ({
    event,
    commands: { view, approve, reject }
}) => {
    const onClickView = useCallback(() => { view(event); }, [event, view]);
    const onClickApprove = useCallback(() => { approve(event); }, [event, approve]);
    const onClickReject = useCallback(() => { reject(event); }, [event, reject]);

    return (
        <div key={event.key} data-is-focusable className={styles.event}>
            <EventOverview event={event} />
            <Separator />
            <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
                <ActionButton iconProps={useConst({ iconName: "View" })} onClick={onClickView}>{strings.Command_View.Text}</ActionButton>
                <ActionButton iconProps={useConst({ iconName: "Accept" })} onClick={onClickApprove}>{strings.Command_Approve.Text}</ActionButton>
                <ActionButton iconProps={useConst({ iconName: "Clear" })} onClick={onClickReject}>{strings.Command_Reject.Text}</ActionButton>
            </Stack>
        </div>
    );
};