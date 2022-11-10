import { first, last } from "lodash";
import React, { FC, useCallback, useRef } from "react";
import { IEvent } from "model";
import { EventBar, EventBarSize } from "../../events";
import { EventItemInfo } from "./Builder";

import { QuarterView as strings } from "ComponentStrings";

interface IProps {
    eventInfos: EventItemInfo[];
    onActivate: (event: IEvent, target: HTMLElement) => void;
}

export const EventItem: FC<IProps> = ({ eventInfos, onActivate }) => {
    const { event, startsInMonth, isRecurring } = first(eventInfos);
    const { endsInMonth } = last(eventInfos);
    const { start, isAllDay } = event;

    const startTimeString = eventInfos.length > 1
        ? strings.MultipleOccurrences
        : start.format(isAllDay ? 'ddd D' : 'ddd D LT');

    const root = useRef<HTMLDivElement>();

    const onClick = useCallback(() => {
        const eventToActivate = eventInfos.length > 1 ? event.getSeriesMaster() : event;
        onActivate(eventToActivate, root.current);
    }, [isRecurring, eventInfos, event, root, onActivate]);

    return (
        <div ref={root} data-is-focusable onClick={onClick}>
            <EventBar
                event={event}
                startsIn={startsInMonth}
                endsIn={endsInMonth}
                timeStringOverride={startTimeString}
                size={EventBarSize.Compact}
            />
        </div>
    );
};