import React, { FC, MutableRefObject, RefObject, useCallback, useEffect, useState } from 'react';
import { useBoolean, useConst } from "@fluentui/react-hooks";
import { FocusTrapCallout, FocusZone, ICalloutContentStyles, IFocusTrapZoneProps, IStackTokens, Separator, Stack } from '@fluentui/react';
import { IEvent } from 'model';
import { useEventCommandActionButtons } from '../hooks';
import { EventOverview } from './EventOverview';
import { IEventCommands } from './IEventCommands';

export interface IEventDetailsCallout {
    open(event: IEvent, target: HTMLElement): void;
}

interface IProps {
    componentRef: RefObject<IEventDetailsCallout>;
    commands: IEventCommands;
}

export const EventDetailsCallout: FC<IProps> = ({ componentRef, commands }) => {
    const [isOpen, { setTrue: show, setFalse: hide }] = useBoolean(false);
    const [event, setEvent] = useState<IEvent>();
    const [target, setTarget] = useState<HTMLElement>();

    const open = useCallback((eventToOpen: IEvent, openTarget: HTMLElement) => {
        if (eventToOpen !== event || !isOpen) {
            setEvent(eventToOpen);
            setTarget(openTarget);
            show();
        } else {
            hide();
        }
    }, [event, isOpen, setEvent, setTarget, show, hide]);

    useEffect(() => {
        (componentRef as MutableRefObject<IEventDetailsCallout>).current = { open };
        return () => { (componentRef as MutableRefObject<IEventDetailsCallout>).current = undefined; };
    }, [componentRef, open]);

    const stackTokens = useConst<IStackTokens>({ childrenGap: 10 });

    const calloutStyles = useConst<Partial<ICalloutContentStyles>>({
        calloutMain: { padding: '10px 25px', maxWidth: 625 }
    });

    const focusTrapProps = useConst<IFocusTrapZoneProps>({
        isClickableOutsideFocusTrap: true,
        forceFocusInsideTrap: false,
    });

    const [
        viewCommand,
        addToOutlookCommand,
        getLinkCommand
    ] = useEventCommandActionButtons(commands, event);

    return (isOpen &&
        <FocusTrapCallout
            target={target}
            styles={calloutStyles}
            onDismiss={hide}
            setInitialFocus
            focusTrapProps={focusTrapProps}
        >
            <FocusZone isCircularNavigation>
                <EventOverview event={event} />
                <Separator />
                <Stack horizontal wrap tokens={stackTokens}>
                    {viewCommand}
                    {addToOutlookCommand}
                    {getLinkCommand}
                </Stack>
            </FocusZone>
        </FocusTrapCallout>
    );
};