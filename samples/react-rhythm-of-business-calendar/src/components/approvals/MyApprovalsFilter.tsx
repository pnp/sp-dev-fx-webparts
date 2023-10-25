import { FC, ReactElement } from "react";
import { Entity } from "common";
import { Approvers, Event } from "model";
import { useDirectoryService } from "services";

interface IProps {
    events: readonly Event[];
    approvers: readonly Approvers[];
    children: (events: readonly Event[]) => ReactElement;
}

export const MyApprovalsFilter: FC<IProps> = ({ events, approvers, children }) => {
    const { currentUser, currentUserIsSiteAdmin } = useDirectoryService();
    const currentUserApprovers = approvers.filter(a => a.userIsAnApprover(currentUser));

    const filteredEvents = events
        .filter(({ isRecurring, isSeriesMaster }) => !isRecurring || isSeriesMaster)
        .filter(Entity.NotDeletedFilter)
        .filter(Event.PendingFilter)
        .sort(Event.StartAscComparer)
        .filter(event => currentUserIsSiteAdmin || Approvers.appliesToAny(currentUserApprovers, event.valuesByRefiner()));

    return children(filteredEvents);
};