import { Moment } from "moment-timezone";
import { useCallback, useRef } from "react";
import { useForceUpdate } from "@fluentui/react-hooks";
import { Event, IEvent } from "model";
import { IEventPanel } from "../events";

export const useEventPanel = (anchorDate: Moment) => {
    const forceUpdate = useForceUpdate();

    const eventPanel = useRef<IEventPanel>();

    const newEvent = useCallback(async (date?: Moment) => {
        try {
            const event = new Event();
            event.startDate = date || anchorDate;
            await eventPanel.current.edit(event);
        } finally { forceUpdate(); }
    }, [anchorDate, eventPanel, forceUpdate]);

    const displayEvent = useCallback(async (event: IEvent) => {
        try {
            await eventPanel.current.display(event.getExceptionOrEvent());
        } finally { forceUpdate(); }
    }, [eventPanel, forceUpdate]);

    return [
        eventPanel,
        newEvent,
        displayEvent
    ] as const;
};