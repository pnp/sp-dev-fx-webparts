import React, { FC, useCallback, useRef } from "react";
import { EventOccurrence } from "model";
import { EventBar, EventBarSize } from "../../events";
import { EventItemInfo } from "./Builder";

interface IProps {
    eventInfo: EventItemInfo;
    onActivate: (cccurrence: EventOccurrence, target: HTMLElement) => void;
}

export const EventItem: FC<IProps> = ({ eventInfo, onActivate }) => {
    const { cccurrence, startsInWeek, endsInWeek } = eventInfo;

    const root = useRef<HTMLDivElement>();

    const onClick = useCallback(() => {
        onActivate(cccurrence, root.current);
    }, [cccurrence, root, onActivate]);

    return (
        <div ref={root} data-is-focusable onClick={onClick}>
            <EventBar
                event={cccurrence}
                startsIn={startsInWeek}
                endsIn={endsInWeek}
                size={EventBarSize.Compact}
            />
        </div>
    );
};