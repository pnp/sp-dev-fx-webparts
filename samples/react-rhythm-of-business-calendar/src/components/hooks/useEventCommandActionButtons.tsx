import React, { useMemo } from "react";
import { ActionButton } from "@fluentui/react";
import { IEvent } from "model";
import { IEventCommands } from "../events/IEventCommands";

import { EventCommands as strings } from 'ComponentStrings';

export const useEventCommandActionButtons = (commands: IEventCommands, event: IEvent | undefined) => {
    const { view, addToOutlook, addSeriesToOutlook, getLink } = commands;
    const { isApproved, isSeriesMaster, isRecurring } = event || {};
    const canAddToOutlook = isApproved;

    const viewCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "View" }} onClick={() => view(event)}>
            {strings.Command_View.Text}
        </ActionButton>,
        [event, view]
    );

    const addToOutlookSingleCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "AddEvent" }} onClick={() => addToOutlook(event)}>
            {strings.Command_AddToOutlook.Text}
        </ActionButton>,
        [event, addToOutlook]
    );

    const addToOutlookSeriesCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "AddEvent" }} onClick={() => addSeriesToOutlook(event)}>
            {strings.Command_AddToOutlook.Text}
        </ActionButton>,
        [event, addSeriesToOutlook]
    );

    const addToOutlookRecurringCommand = useMemo(() =>
        <ActionButton
            iconProps={{ iconName: "AddEvent" }}
            menuProps={{
                items: [{
                    key: 'add-to-outlook-series',
                    text: strings.Command_AddToOutlook_Recurring_Series.Text,
                    onClick: () => addSeriesToOutlook(event)
                }, {
                    key: 'add-to-outlook-occurrence',
                    text: strings.Command_AddToOutlook_Recurring_Instance.Text,
                    onClick: () => addToOutlook(event)
                }]
            }}
        >
            {strings.Command_AddToOutlook.Text}
        </ActionButton>,
        [event, addSeriesToOutlook, addToOutlook]
    );

    const addToOutlookCommand = useMemo(() =>
        canAddToOutlook && (
            isRecurring
                ? (isSeriesMaster
                    ? addToOutlookSeriesCommand
                    : addToOutlookRecurringCommand
                )
                : addToOutlookSingleCommand
        ),
        [canAddToOutlook, isRecurring, isSeriesMaster, addToOutlookRecurringCommand, addToOutlookSingleCommand]
    );

    const getLinkCommand = useMemo(() =>
        <ActionButton iconProps={{ iconName: "Link" }} onClick={() => getLink(event)}>
            {strings.Command_GetLink.Text}
        </ActionButton>,
        [event, getLink]
    );

    return [
        viewCommand,
        addToOutlookCommand,
        getLinkCommand
    ] as const;
};