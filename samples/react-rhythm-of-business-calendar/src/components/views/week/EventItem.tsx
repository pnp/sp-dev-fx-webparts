import React, { FC, useCallback } from "react";
import { EventBar, EventBarSize } from "../../events";
import { IViewCommands } from "../IViewCommands";
import { EventItemInfo } from "./Builder";

interface IProps {
    eventInfo: EventItemInfo;
    commands: IViewCommands;
}

export const EventItem: FC<IProps> = ({ eventInfo, commands: { activateEvent } }) => {
    const { cccurrence, startsInWeek, endsInWeek } = eventInfo;

    const onClick = useCallback(() => {
        activateEvent(cccurrence);
    }, [cccurrence, activateEvent]);

    return (
        <div data-is-focusable onClick={onClick}>
            <EventBar
                event={cccurrence}
                startsIn={startsInWeek}
                endsIn={endsInWeek}
                size={EventBarSize.Large}
            />
        </div>
    );
};