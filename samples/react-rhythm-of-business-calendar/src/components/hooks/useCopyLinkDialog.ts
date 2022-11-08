import { useCallback, useRef } from "react";
import { IEvent } from "model";
import { useEventsService } from "services";
import { ICopyLinkDialog } from "../shared";

export const useCopyLinkDialog = () => {
    const events = useEventsService();
    const copyLinkDialog = useRef<ICopyLinkDialog>();

    const getLink = useCallback((event: IEvent) => {
        const path = events.createEventDeepLink(event.getExceptionOrEvent());
        copyLinkDialog.current.open(path, event.displayName);
    }, [copyLinkDialog, events]);

    return [
        copyLinkDialog,
        getLink
    ] as const;
};