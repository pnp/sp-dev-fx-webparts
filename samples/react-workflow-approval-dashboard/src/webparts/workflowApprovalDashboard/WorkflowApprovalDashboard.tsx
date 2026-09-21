import * as React from 'react';
import { Button, Card, MessageBar, MessageBarBody, Spinner, Subtitle1, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text, Title1 } from '@fluentui/react-components';
import { DashboardConfig, WorkflowRequest } from './models';
import { IWorkflowSourceService, WorkflowLoadResult } from '../../services/IWorkflowSourceService';
import { StatusPill } from './components/StatusPill';
import styles from './WorkflowApprovalDashboard.module.scss';

export interface IWorkflowApprovalDashboardProps { config: DashboardConfig; service: IWorkflowSourceService; }

export function WorkflowApprovalDashboard({ config, service }: IWorkflowApprovalDashboardProps): React.ReactElement {
  const [result, setResult] = React.useState<WorkflowLoadResult>({ requests: [], errors: [] });
  const [loading, setLoading] = React.useState(true);
  const [fatal, setFatal] = React.useState<string | undefined>();
  const load = React.useCallback(() => {
    setLoading(true); setFatal(undefined);
    service.load(config).then(nextResult => { setResult(nextResult); setLoading(false); }).catch(error => { setFatal(error instanceof Error ? error.message : 'The dashboard could not load.'); setLoading(false); });
  }, [config, service]);
  React.useEffect(() => { load(); }, [load]);

  if (loading) { return <section className={styles.root} aria-busy="true"><Spinner label="Loading workflow status" /></section>; }
  if (fatal) { return <section className={styles.root}><MessageBar intent="error"><MessageBarBody>{fatal} <Button appearance="primary" onClick={load}>Retry</Button></MessageBarBody></MessageBar></section>; }

  return <section className={styles.root} aria-labelledby="workflow-dashboard-title">
    <header className={styles.header}><div><Title1 id="workflow-dashboard-title">Workflow &amp; approval status</Title1><Subtitle1>Read-only visibility across configured SharePoint sources</Subtitle1></div><Button onClick={load} aria-label="Refresh workflow status">Refresh</Button></header>
    <div className={styles.notice} role="note"><Text>Approval fields vary with tenant configuration and API permissions. This dashboard shows status visibility; it does not control workflows.</Text></div>
    {result.errors.map(error => <MessageBar key={error.sourceLabel} intent={error.error.kind === 'permission' ? 'warning' : 'error'}><MessageBarBody><strong>{error.sourceLabel}:</strong> {error.error.message} <Button appearance="subtle" onClick={load}>Retry</Button></MessageBarBody></MessageBar>)}
    {result.requests.length === 0 ? <div className={styles.empty} role="status"><Text weight="semibold">No workflow requests found.</Text><Text>Check the configured list and your read permissions, then refresh.</Text></div> : <RequestList requests={result.requests} overdueAfterDays={config.reviewSettings.overdueAfterDays} />}
  </section>;
}

function RequestList({ requests, overdueAfterDays }: { requests: WorkflowRequest[]; overdueAfterDays: number }): React.ReactElement {
  return <>
    <div className={styles.threshold} role="note">Pending requests older than {overdueAfterDays} days, or past a due date, are marked overdue.</div>
    <Table aria-label="Workflow and approval status" className={styles.table} sortable>
      <TableHeader><TableRow><TableHeaderCell>Request</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell><TableHeaderCell>Created / modified</TableHeaderCell><TableHeaderCell>Requester</TableHeaderCell><TableHeaderCell>Approvers / stages</TableHeaderCell><TableHeaderCell>Source</TableHeaderCell></TableRow></TableHeader>
      <TableBody>{requests.map(request => <TableRow key={`${request.sourceLabel}-${request.id}`}><TableCell><Text weight="semibold">{request.title}</Text><Text size={200}>ID: {request.id}</Text></TableCell><TableCell><StatusPill request={request} /><Text size={200}>{request.status}</Text></TableCell><TableCell><time dateTime={request.created}>{formatDate(request.created)}</time><Text size={200}>{request.modified ? `Modified ${formatDate(request.modified)}` : 'Modified unavailable'}</Text></TableCell><TableCell>{request.requester || 'Unavailable'}</TableCell><TableCell><Approvals request={request} /></TableCell><TableCell>{request.sourceLabel}</TableCell></TableRow>)}</TableBody>
    </Table>
    <div className={styles.cards} aria-label="Workflow and approval status cards">{requests.map(request => <Card key={`${request.sourceLabel}-${request.id}`} className={styles.card}><Text weight="semibold">{request.title}</Text><StatusPill request={request} /><Text size={200}>{request.status} · {request.sourceLabel}</Text><Text>Requester: {request.requester || 'Unavailable'}</Text><Text>Created: {formatDate(request.created)}</Text><Text>Modified: {request.modified ? formatDate(request.modified) : 'Unavailable'}</Text><Approvals request={request} /></Card>)}</div>
  </>;
}

function Approvals({ request }: { request: WorkflowRequest }): React.ReactElement {
  const people = request.approvers.length ? request.approvers.join(', ') : 'Approvers unavailable';
  const stageText = request.stages.length ? request.stages.map(stage => `${stage.name}: ${stage.status}${stage.approver ? ` (${stage.approver})` : ''}`).join('; ') : 'Stages unavailable';
  return <div className={styles.approvals}><Text size={200}>Approvers: {people}</Text><Text size={200}>Stages: {stageText}</Text>{request.dueDate && <Text size={200}>Due: {formatDate(request.dueDate)}</Text>}</div>;
}

function formatDate(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Unavailable' : date.toLocaleString(); }
