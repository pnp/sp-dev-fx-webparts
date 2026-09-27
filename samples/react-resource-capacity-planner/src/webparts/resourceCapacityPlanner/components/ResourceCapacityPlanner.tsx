import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Badge, Body1, Button, Card, Caption1, Input, MessageBar, MessageBarBody,
  ProgressBar, Spinner, Tab, TabList, Table, TableBody, TableCell, TableHeader,
  TableHeaderCell, TableRow, Title1, makeStyles, tokens
} from '@fluentui/react-components';
import { IGetOnlyClient } from '../services/SharePointGetOnlyClient';
import { loadPlannerData } from '../services/CapacityDataService';
import { computeAvailableSlots, computeDailyUtilization, computeWeeklyUtilization, dateRange, overlapEdges } from '../domain/capacity';
import styles from './ResourceCapacityPlanner.module.scss';

const useLocalStyles = makeStyles({
  header: { display: 'flex', justifyContent: 'space-between', gap: tokens.spacingHorizontalL, alignItems: 'flex-start', flexWrap: 'wrap' },
  controls: { display: 'flex', gap: tokens.spacingHorizontalS, alignItems: 'end', flexWrap: 'wrap' },
  tableWrap: { overflowX: 'auto', maxWidth: '100%' },
  muted: { color: tokens.colorNeutralForeground3 },
  metric: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  progress: { minWidth: '7rem' }
});

export interface IResourceCapacityPlannerProps { client: IGetOnlyClient; pageUrl: string; config: any; }
const statusText: Record<string, string> = { success: 'Loaded', 'no-data': 'No data', partial: 'Partial data', permission: 'Permission denied', throttled: 'Throttled', retry: 'Temporary failure; retry available', error: 'Load error' };
function formatDate(value: string, timezone: string, withTime = false): string {
  const options: Intl.DateTimeFormatOptions = withTime ? { dateStyle: 'medium', timeStyle: 'short', timeZone: timezone } : { dateStyle: 'medium', timeZone: timezone };
  return new Intl.DateTimeFormat(undefined, options).format(new Date(value));
}
function percent(value: number): string { return `${Math.round(value * 100)}%`; }

function StateMessage({ state, onRetry }: { state: any; onRetry: () => void }): React.ReactElement | null {
  if (!state || state.status === 'success') return null;
  const intent = state.status === 'permission' ? 'warning' : state.status === 'no-data' ? 'info' : 'error';
  const detail = state.status === 'permission' ? 'Ask a site owner for read access to the configured lists.' : state.status === 'throttled' ? 'SharePoint asked the planner to slow down.' : state.status === 'retry' ? 'The request may succeed if retried.' : state.status === 'no-data' ? 'No records were returned for this source.' : state.error || 'Some records could not be loaded.';
  return <MessageBar intent={intent as any} role="status"><MessageBarBody><strong>{state.label}: {statusText[state.status] || state.status}.</strong> {detail} {state.status !== 'no-data' && <Button appearance="subtle" onClick={onRetry}>Retry</Button>}</MessageBarBody></MessageBar>;
}

function UtilizationTable({ resources, daily, dates }: { resources: any[]; daily: any[]; dates: string[] }): React.ReactElement {
  const local = useLocalStyles();
  return <div className={local.tableWrap}><Table aria-label="Daily resource utilization" size="small"><caption className={styles.caption}>Daily utilization. Intervals ending when another starts do not overlap.</caption><TableHeader><TableRow><TableHeaderCell>Resource</TableHeaderCell>{dates.map((date) => <TableHeaderCell key={date}>{date.slice(5)}</TableHeaderCell>)}</TableRow></TableHeader><TableBody>{resources.map((resource) => <TableRow key={resource.id}><TableCell><strong>{resource.name}</strong><br /><Caption1>{resource.sourceLabel} · capacity {resource.capacity}</Caption1></TableCell>{dates.map((date) => { const item = daily.find((value: any) => value.resourceId === resource.id && value.date === date); return <TableCell key={date} aria-label={`${resource.name} ${date}: ${item ? percent(item.utilization) : '0%'}`}><ProgressBar className={local.progress} value={item ? item.utilization : 0} aria-label={`${date} utilization`} /><Caption1>{item ? percent(item.utilization) : '0%'}</Caption1></TableCell>; })}</TableRow>)}</TableBody></Table></div>;
}

export const ResourceCapacityPlanner: React.FC<IResourceCapacityPlannerProps> = ({ client, pageUrl, config }) => {
  const local = useLocalStyles();
  const [startDate, setStartDate] = useState(config.defaultStartDate || new Date().toISOString().slice(0, 10));
  const [horizon, setHorizon] = useState<number>(config.defaultHorizonDays || 14);
  const [activeTab, setActiveTab] = useState('overview');
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [loadError, setLoadError] = useState<string>();
  const range: any = useMemo(() => { try { return dateRange(startDate, horizon, config); } catch (error: any) { return { error: error.message }; } }, [startDate, horizon, config]);
  useEffect(() => {
    let cancelled = false;
    if (range.error) { setLoading(false); setLoadError(range.error); return () => { cancelled = true; }; }
    setLoading(true); setLoadError(undefined);
    loadPlannerData(client, config, pageUrl, startDate, horizon).then((result) => { if (!cancelled) setData(result); }).catch((error: any) => { if (!cancelled) setLoadError(error.message); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [client, config, pageUrl, startDate, horizon, attempt]);
  const derived = useMemo(() => {
    if (!data || range.error) return undefined;
    const daily = computeDailyUtilization(data.resources, data.reservations, range, config.workingHours);
    return { daily, weekly: computeWeeklyUtilization(daily), conflicts: overlapEdges(data.reservations), slots: computeAvailableSlots(data.resources, data.reservations, range, config.workingHours) };
  }, [data, range, config.workingHours]);
  const retry = () => setAttempt((value) => value + 1);
  const states = data ? [data.currentUserState, ...data.sourceStates] : [];
  const errorState = loadError ? { id: 'planner', label: 'Planner', status: 'error', error: loadError } : undefined;

  return <section className={styles.container} aria-labelledby="resource-capacity-planner-title"><div className={local.header}><div><Title1 id="resource-capacity-planner-title">Resource capacity planner</Title1><Body1 block>Read-only rooms and shared-resource availability for the selected horizon.</Body1></div><div className={local.controls} aria-label="Planner date controls"><label>Start date <Input type="date" value={startDate} onChange={(_, value) => setStartDate(value.value)} aria-label="Planner start date" /></label><label>Days <Input type="number" min={1} max={config.maxHorizonDays} value={String(horizon)} onChange={(_, value) => setHorizon(Number(value.value))} aria-label="Planner horizon in days" /></label><Button onClick={retry} disabled={loading}>Refresh</Button></div></div><div className={styles.meta}><Caption1>Horizon: {startDate} through {range.end || 'invalid'} · Display timezone: {config.timezone} · Working hours: {config.workingHours.start}–{config.workingHours.end} · SharePoint GET only</Caption1></div>{errorState && <StateMessage state={errorState} onRetry={retry} />}{states.map((state: any) => <StateMessage key={state.id} state={state} onRetry={retry} />)}{loading && <div className={styles.loading} role="status"><Spinner label="Loading current-user and capacity data" /><span>Loading current-user and capacity data…</span></div>}{!loading && data && <><div className={styles.cards} aria-label="Planner totals"><Card className={styles.metricCard}><Caption1>Resources</Caption1><span className={local.metric}>{data.resources.length}</span></Card><Card className={styles.metricCard}><Caption1>Reservations</Caption1><span className={local.metric}>{data.reservations.length}</span></Card><Card className={styles.metricCard}><Caption1>Conflicts / overlaps</Caption1><span className={local.metric}>{derived?.conflicts.length || 0}</span></Card><Card className={styles.metricCard}><Caption1>Available slots</Caption1><span className={local.metric}>{derived?.slots.length || 0}</span></Card></div><TabList selectedValue={activeTab} onTabSelect={(_, event) => setActiveTab(String(event.value))} aria-label="Planner views"><Tab value="overview">Overview</Tab><Tab value="reservations">Reservations</Tab><Tab value="availability">Available slots</Tab><Tab value="sources">Sources and status</Tab></TabList>{activeTab === 'overview' && derived && <div className={styles.stack}><Card><h2>Daily utilization</h2>{data.resources.length ? <UtilizationTable resources={data.resources} daily={derived.daily} dates={range.dates} /> : <p className={local.muted}>No resources are available in this horizon.</p>}</Card><Card><h2>Weekly utilization and capacity</h2><div className={local.tableWrap}><Table aria-label="Weekly utilization and capacity"><TableHeader><TableRow><TableHeaderCell>Resource</TableHeaderCell><TableHeaderCell>Week starting</TableHeaderCell><TableHeaderCell>Used hours</TableHeaderCell><TableHeaderCell>Available capacity hours</TableHeaderCell><TableHeaderCell>Utilization</TableHeaderCell></TableRow></TableHeader><TableBody>{derived.weekly.map((item: any) => <TableRow key={`${item.resourceId}-${item.weekStart}`}><TableCell>{data.resources.find((resource: any) => resource.id === item.resourceId)?.name || item.resourceId}</TableCell><TableCell>{item.weekStart}</TableCell><TableCell>{item.usedHours.toFixed(1)}</TableCell><TableCell>{item.availableHours.toFixed(1)}</TableCell><TableCell><Badge appearance="outline">{percent(item.utilization)}</Badge></TableCell></TableRow>)}</TableBody></Table></div></Card><Card><h2>Conflicts and overlaps</h2>{derived.conflicts.length ? <ul>{derived.conflicts.map((conflict: any) => <li key={`${conflict.leftId}-${conflict.rightId}`}><strong>{conflict.resourceId}</strong>: {conflict.leftId} overlaps {conflict.rightId} ({formatDate(conflict.startsAt, config.timezone, true)}–{formatDate(conflict.endsAt, config.timezone, true)})</li>)}</ul> : <p className={local.muted}>No overlapping intervals found.</p>}</Card></div>}{activeTab === 'reservations' && <Card><h2>Reservations</h2>{data.reservations.length ? <div className={local.tableWrap}><Table aria-label="Read-only reservations"><TableHeader><TableRow><TableHeaderCell>Resource</TableHeaderCell><TableHeaderCell>Reservation</TableHeaderCell><TableHeaderCell>When ({config.timezone})</TableHeaderCell><TableHeaderCell>Source</TableHeaderCell><TableHeaderCell>Overlap</TableHeaderCell></TableRow></TableHeader><TableBody>{data.reservations.map((item: any) => { const conflict = derived?.conflicts.some((edge: any) => edge.leftId === item.id || edge.rightId === item.id); return <TableRow key={`${item.sourceId}-${item.id}`}><TableCell>{data.resources.find((resource: any) => resource.id === item.resourceId)?.name || item.resourceId}</TableCell><TableCell>{item.title}</TableCell><TableCell>{formatDate(item.start, config.timezone, true)} – {formatDate(item.end, config.timezone, true)}</TableCell><TableCell>{item.sourceLabel}</TableCell><TableCell>{conflict ? <Badge color="danger">Overlaps another reservation</Badge> : <Badge color="success">No overlap</Badge>}</TableCell></TableRow>; })}</TableBody></Table></div> : <p className={local.muted}>No reservations in this horizon.</p>}</Card>}{activeTab === 'availability' && <Card><h2>Available slots</h2><Caption1>Gaps within configured working hours; remaining capacity is shown explicitly.</Caption1>{derived?.slots.length ? <div className={local.tableWrap}><Table aria-label="Available resource slots"><TableHeader><TableRow><TableHeaderCell>Resource</TableHeaderCell><TableHeaderCell>Date</TableHeaderCell><TableHeaderCell>Available from</TableHeaderCell><TableHeaderCell>Available to</TableHeaderCell><TableHeaderCell>Remaining capacity</TableHeaderCell></TableRow></TableHeader><TableBody>{derived.slots.map((slot: any, index: number) => <TableRow key={`${slot.resourceId}-${slot.start}-${index}`}><TableCell>{data.resources.find((resource: any) => resource.id === slot.resourceId)?.name || slot.resourceId}</TableCell><TableCell>{slot.date}</TableCell><TableCell>{formatDate(slot.start, config.timezone, true)}</TableCell><TableCell>{formatDate(slot.end, config.timezone, true)}</TableCell><TableCell>{slot.remainingCapacity}</TableCell></TableRow>)}</TableBody></Table></div> : <p className={local.muted}>No available slots were found inside working hours.</p>}</Card>}{activeTab === 'sources' && <Card><h2>Sources and status</h2><p>Source labels are retained on every normalized record so users can identify its SharePoint list.</p><div className={local.tableWrap}><Table aria-label="Capacity data source status"><TableHeader><TableRow><TableHeaderCell>Source</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell><TableHeaderCell>Resources</TableHeaderCell><TableHeaderCell>Reservations</TableHeaderCell><TableHeaderCell>Notes</TableHeaderCell></TableRow></TableHeader><TableBody>{states.map((state: any) => <TableRow key={state.id}><TableCell>{state.label}</TableCell><TableCell>{statusText[state.status] || state.status}</TableCell><TableCell>{state.resourceCount || '—'}</TableCell><TableCell>{state.reservationCount || '—'}</TableCell><TableCell>{state.error || (state.partial ? 'Page/item bound reached; view may be incomplete.' : '—')}</TableCell></TableRow>)}</TableBody></Table></div></Card>}</>}</section>;
};
