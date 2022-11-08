import moment, { Moment } from "moment-timezone";
import { useCallback, useEffect, useState } from "react";
import { IComponent, parseIntOrDefault } from "common";
import { Event } from "model";
import { useEventsService, useTeamsJS } from "services";

const eventIdParam = 'eventid';
const recurrenceDateParam = 'recurrencedate';

export const useExecuteEventDeepLink = (displayEvent: (event: Event) => Promise<void>) => {
    const teams = useTeamsJS();
    const events = useEventsService();
    const { eventsAsync } = events;

    const [eventId, setEventId] = useState<number>();
    const [recurrenceDate, setRecurrenceDate] = useState<Moment>();
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        const { search } = location;
        const searchParams = new URLSearchParams(search);

        if (teams) {
            const { eventId, recurrenceDate } = JSON.parse(teams.context.subEntityId || '{}') as { eventId: string, recurrenceDate: string };
            setEventId(parseIntOrDefault(eventId, undefined));
            setRecurrenceDate(recurrenceDate ? moment(recurrenceDate) : undefined);
        } else if (searchParams.has(eventIdParam)) {
            setEventId(parseIntOrDefault(searchParams.get(eventIdParam), undefined));
            const recurrenceDateString = searchParams.get(recurrenceDateParam);
            setRecurrenceDate(recurrenceDateString ? moment(recurrenceDateString) : undefined);
        }
    }, [teams, setEventId, setRecurrenceDate]);


    useEffect(() => {
        const update = async () => {
            const event = (await events.eventsById()).get(eventId);
            setEvent(event);
        }

        eventsAsync.promise.then(update);

        const component: IComponent = { componentShouldRender: update };
        eventsAsync.registerComponentForUpdates(component);
        return () => eventsAsync.unregisterComponentForUpdates(component);
    }, [eventId, events, eventsAsync]);

    const eraseEventFromQueryString = useCallback(() => {
        const { origin, pathname, search } = location;
        const searchParams = new URLSearchParams(search);

        if (searchParams.has(eventIdParam)) {
            searchParams.delete(eventIdParam);
            searchParams.delete(recurrenceDateParam);

            const newSearchParams = searchParams.toString();
            const path = origin + pathname + (newSearchParams ? '?' + newSearchParams : '');

            setTimeout(() => history.replaceState({ path }, '', path), 1);
        }
    }, []);

    useEffect(() => {
        if (event) {
            console.debug('deep linking to event with ID:', eventId, 'and recurrence date', recurrenceDate?.format());

            const eventToDisplay = (recurrenceDate && event.findOrCreateExceptionForDate(recurrenceDate)) || event;
            displayEvent(eventToDisplay).finally(eraseEventFromQueryString);
        }
    }, [event, eventId, recurrenceDate]);
}