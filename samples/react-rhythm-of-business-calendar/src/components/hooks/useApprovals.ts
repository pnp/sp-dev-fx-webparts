import { useCallback, useEffect, useRef, useState } from "react";
import { useForceUpdate } from "@fluentui/react-hooks";
import { Entity, IComponent } from "common";
import { Event, EventModerationStatus } from "model";
import { useConfigurationService, useDirectoryService, useEventsService } from "services";
import { IApprovalDialog, IMyApprovalsPanel } from "../approvals";

export const useApprovals = () => {
    const forceUpdate = useForceUpdate();

    const myApprovalspanel = useRef<IMyApprovalsPanel>();

    const openMyApprovalspanel = useCallback(() => {
        myApprovalspanel.current.open();
    }, [myApprovalspanel]);

    const closeMyApprovalspanel = useCallback(() => {
        myApprovalspanel.current.open();
    }, [myApprovalspanel]);


    const approvalDialog = useRef<IApprovalDialog>();

    const moderateEvent = useCallback(async (event: Event) => {
        try {
            await approvalDialog.current.edit(event);
        } finally { forceUpdate(); }
    }, [approvalDialog, forceUpdate]);

    const approve = useCallback((event: Event) => {
        event.snapshot();
        event.moderationStatus = EventModerationStatus.Approved;
        moderateEvent(event);
    }, [moderateEvent]);

    const reject = useCallback((event: Event) => {
        event.snapshot();
        event.moderationStatus = EventModerationStatus.Rejected;
        moderateEvent(event);
    }, [moderateEvent]);


    const { approversAsync } = useEventsService();
    const { currentUser } = useDirectoryService();
    const [userIsAnApprover, setUserIsAnApprover] = useState(false);

    useEffect(() => {
        const update = () => {
            const approvers = approversAsync.data?.filter(Entity.NotDeletedFilter);
            const isApprover = approvers.some(a => a.userIsAnApprover(currentUser));
            setUserIsAnApprover(isApprover);
        }

        approversAsync.promise.then(update);

        const component: IComponent = { componentShouldRender: update };
        approversAsync.registerComponentForUpdates(component);
        return () => approversAsync.unregisterComponentForUpdates(component);
    }, [approversAsync, currentUser, setUserIsAnApprover]);

    const { currentUserIsSiteAdmin } = useDirectoryService();
    const { active: { useApprovals } } = useConfigurationService();
    const isApprover = useApprovals && (currentUserIsSiteAdmin || userIsAnApprover);

    return [
        isApprover,
        myApprovalspanel,
        approvalDialog,
        openMyApprovalspanel,
        closeMyApprovalspanel,
        approve,
        reject
    ] as const;
};