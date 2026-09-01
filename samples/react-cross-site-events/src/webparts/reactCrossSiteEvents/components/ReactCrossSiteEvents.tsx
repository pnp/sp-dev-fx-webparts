import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Divider,
  Link,
  MessageBar,
  Spinner,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { ICalendarEvent } from '../models/CalendarEvent';
import { ISourceState, ISiteCalendarSource } from '../models/Configuration';
import { ICalendarService } from '../services/CalendarService';
import { createDateRange } from '../utils/dates';
import { getGraphErrorInfo } from '../utils/errors';
import { formatEventDate, formatLastUpdated } from '../utils/formatting';
import { sortEvents } from '../utils/normalization';

export interface IReactCrossSiteEventsProps {
  service: ICalendarService;
  sources: ISiteCalendarSource[];
  validationErrors: string[];
  daysBack: number;
  daysAhead: number;
  displayTimeZone: string;
}

const useStyles = makeStyles({
  root: { display: 'grid', gap: tokens.spacingVerticalM, maxWidth: '960px', margin: '0 auto', padding: tokens.spacingVerticalM },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacingHorizontalM, flexWrap: 'wrap' },
  title: { color: tokens.colorNeutralForeground1 },
  meta: { color: tokens.colorNeutralForeground3 },
  list: { display: 'grid', gap: tokens.spacingVerticalS },
  event: { display: 'grid', gap: tokens.spacingVerticalXS, padding: tokens.spacingVerticalM, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  eventTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacingHorizontalM },
  detail: { color: tokens.colorNeutralForeground2 },
  source: { color: tokens.colorBrandForeground1 },
  status: { display: 'grid', gap: tokens.spacingVerticalS },
  empty: { textAlign: 'center' as const, padding: tokens.spacingVerticalXXL, color: tokens.colorNeutralForeground2 },
  responsive: { '@media (max-width: 480px)': { padding: tokens.spacingVerticalS } }
});

function EventCard({ event, displayTimeZone }: { event: ICalendarEvent; displayTimeZone: string }): React.ReactElement {
  const styles = useStyles();
  return <Card className={styles.event} role="article">
    <div className={styles.eventTop}>
      <Text weight="semibold" size={400}>{event.subject}</Text>
      <Badge appearance="tint" color="informative">{event.sourceLabel}</Badge>
    </div>
    <Text className={styles.detail}>{formatEventDate(event, undefined, displayTimeZone)}</Text>
    {event.location && <Text className={styles.detail}>Location: {event.location}</Text>}
    {event.organizer && <Text className={styles.detail}>Organizer: {event.organizer}</Text>}
    {event.bodyPreview && <Text className={styles.detail}>{event.bodyPreview}</Text>}
    {event.webLink && <Link href={event.webLink} target="_blank" rel="noreferrer">Open event</Link>}
  </Card>;
}

function SourceStatus({ state, onRetry }: { state: ISourceState; onRetry: () => void }): React.ReactElement | null {
  const styles = useStyles();
  if (!state.error && !state.isLoading) return null;
  if (state.isLoading) return <div className={styles.status} role="status"><Spinner size="tiny" label={`Loading ${state.source.label}`} /></div>;
  return <MessageBar intent="warning" role="alert">
    <span>{state.source.label}: {state.error}</span>
    <Button appearance="subtle" onClick={onRetry}>Retry</Button>
  </MessageBar>;
}

export const ReactCrossSiteEvents: React.FC<IReactCrossSiteEventsProps> = props => {
  const styles = useStyles();
  const [states, setStates] = useState<ISourceState[]>(() => props.sources.map(source => ({ source, events: [], isLoading: true })));
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const range = useMemo(() => createDateRange(new Date(), props.daysBack, props.daysAhead), [props.daysBack, props.daysAhead]);

  const loadSource = useCallback(async (source: ISiteCalendarSource): Promise<void> => {
    setStates(current => current.map(state => state.source.siteUrl === source.siteUrl ? { ...state, isLoading: true, error: undefined } : state));
    try {
      const events = await props.service.getEvents(source, range);
      setStates(current => current.map(state => state.source.siteUrl === source.siteUrl ? { ...state, events, isLoading: false, error: undefined } : state));
      setLastUpdated(new Date());
    } catch (error) {
      setStates(current => current.map(state => state.source.siteUrl === source.siteUrl ? { ...state, isLoading: false, error: getGraphErrorInfo(error).message } : state));
    }
  }, [props.service, range]);

  useEffect(() => {
    setStates(props.sources.map(source => ({ source, events: [], isLoading: true })));
    props.sources.forEach(source => { void loadSource(source); });
  }, [props.sources, loadSource]);

  const events = sortEvents(states.reduce((all, state) => all.concat(state.events), [] as ICalendarEvent[]));
  const loading = states.some(state => state.isLoading);
  const failed = states.filter(state => state.error).length;
  const stylesForRoot = `${styles.root} ${styles.responsive}`;

  return <section className={stylesForRoot} aria-labelledby="cross-site-events-title">
    <div className={styles.header}>
      <div>
        <Text as="h2" id="cross-site-events-title" className={styles.title} size={600} weight="semibold">Cross-site events</Text>
        <Text className={styles.meta} block>{props.sources.length} source{props.sources.length === 1 ? '' : 's'} · {props.displayTimeZone}</Text>
      </div>
      {lastUpdated && <Text className={styles.meta}>Updated {formatLastUpdated(lastUpdated, undefined, props.displayTimeZone)}</Text>}
    </div>
    {props.validationErrors.map(error => <MessageBar key={error} intent="error" role="alert">{error}</MessageBar>)}
    {failed > 0 && <MessageBar intent="warning" role="status">Some calendars could not be loaded. Available events are still shown.</MessageBar>}
    {states.map(state => <SourceStatus key={state.source.siteUrl} state={state} onRetry={() => { void loadSource(state.source); }} />)}
    {loading && events.length === 0 && <div role="status" aria-live="polite"><Spinner label="Loading events" /></div>}
    {!loading && events.length === 0 && failed === 0 && props.validationErrors.length === 0 && <div className={styles.empty} role="status">{props.sources.length === 0 ? 'Configure at least one calendar source to get started.' : 'No events in this date range.'}</div>}
    {events.length > 0 && <div className={styles.list} aria-live="polite">{events.map(event => <React.Fragment key={`${event.sourceUrl}:${event.id}`}><EventCard event={event} displayTimeZone={props.displayTimeZone} /><Divider /></React.Fragment>)}</div>}
  </section>;
};
