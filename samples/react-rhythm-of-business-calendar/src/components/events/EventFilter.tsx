import { FC, ReactElement } from "react";
import { Entity, MomentRange, User } from "common";
import { Approvers, Event, EventOccurrence, Refiner, RefinerValue } from "model";
import { useConfigurationService, useDirectoryService } from "services";

interface IProps {
    events: readonly Event[];
    dateRange: MomentRange;
    refiners: readonly Refiner[];
    selectedRefinerValues: Set<RefinerValue>;
    approvers: readonly Approvers[];
    children: (cccurrences: readonly EventOccurrence[]) => ReactElement;
}

export const EventFilter: FC<IProps> = ({ events, dateRange, refiners, selectedRefinerValues, approvers, children }) => {
    const { currentUser, currentUserIsSiteAdmin } = useDirectoryService();
    const { active: { useApprovals, useRefiners } } = useConfigurationService();
    const currentUserApprovers = approvers.filter(a => a.userIsAnApprover(currentUser));

    const filteredEventOccurrences = events
        .filter(event => !event.isSeriesException)
        .filter(Entity.NotDeletedFilter)
        .filter(event => {
            if (event.isApproved) {
                return true;
            } else if (event.isRejected && User.equal(event.creator, currentUser)) {
                return true;
            } else if (event.isPendingApproval) {
                if (!useApprovals)
                    return true;
                else if (currentUserIsSiteAdmin)
                    return true;
                else if (User.equal(event.creator, currentUser))
                    return true;
                else if (Approvers.appliesToAny(currentUserApprovers, event.valuesByRefiner()))
                    return true;
                else
                    return false;
            }
        })
        .flatMap(event => event.expandOccurrences(dateRange))
        .filter(occurrence => {
            const valuesByRefiner = occurrence.event.valuesByRefiner();
            return !useRefiners || refiners.every(refiner => {
                const values = valuesByRefiner.get(refiner);
                if (values)
                    return values.some(v => selectedRefinerValues.has(v));
                else if (!refiner.required)
                    return selectedRefinerValues.has(refiner.blankValue);
                else
                    return true;
            });
        });

    return children(filteredEventOccurrences);
};