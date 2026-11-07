import * as React from 'react';
import { DateRangeKey, IEventItem, IEventSource } from '../models';
import { getDateRange } from '../common/dates';
import { EventService } from '../services/EventService';

export type LoadStatus = 'loading' | 'ready' | 'noSource' | 'error';

export interface IEventsState {
  status: LoadStatus;
  events: IEventItem[];
  failedSources: string[];
}

/**
 * Loads events whenever the sources, the range or the limit change.
 * Falls back to the current site's Events list when no source is configured.
 */
export function useEvents(service: EventService, sources: IEventSource[], range: DateRangeKey, maxEvents: number): IEventsState {
  const [state, setState] = React.useState<IEventsState>({ status: 'loading', events: [], failedSources: [] });
  const sourcesKey = JSON.stringify(sources);

  React.useEffect(() => {
    let active = true;
    setState(previous => ({ ...previous, status: 'loading' }));

    const load = async (): Promise<IEventsState> => {
      const selected = sources.length ? sources : [await service.getDefaultSource()].filter(Boolean) as IEventSource[];
      if (!selected.length) {
        return { status: 'noSource', events: [], failedSources: [] };
      }
      const result = await service.getEvents(selected, getDateRange(range), maxEvents);
      return { status: 'ready', ...result };
    };

    load().then(
      next => active && setState(next),
      () => active && setState({ status: 'error', events: [], failedSources: [] })
    );
    return () => { active = false; };
  }, [service, sourcesKey, range, maxEvents]);

  return state;
}
