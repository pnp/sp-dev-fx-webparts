import * as React from 'react';
import { Body1, Button, Card, Field, Input, MessageBar, MessageBarBody, Skeleton, Spinner, Subtitle2, Title2 } from '@fluentui/react-components';
import { ArrowClockwiseRegular, ShieldTaskRegular } from '@fluentui/react-icons';
import { auditContent } from '../../../services/AuditEngine';
import { classifyError } from '../../../services/ErrorClassification';
import { IAccessibilityContentAuditorProps, IAuditViewState } from './IAccessibilityContentAuditorProps';
import { AuditSummary } from './AuditSummary';
import { FindingList } from './FindingList';
import styles from '../styles/ContentAuditor.module.scss';

export const ContentAuditor: React.FC<IAccessibilityContentAuditorProps> = ({ service, config }) => {
  const [state, setState] = React.useState<IAuditViewState>({ status: 'loading' });
  const runAudit = React.useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const read = await service.read(config);
      setState({ status: 'ready', result: auditContent(read.items, config, read.sourceLabel, read.failures) });
    } catch (error) {
      const classified = classifyError(error);
      setState({ status: 'error', error: classified });
    }
  }, [service, config]);
  React.useEffect(() => { void runAudit(); }, [runAudit]);

  const error = state.error;
  return <main className={styles.auditor} aria-busy={state.status === 'loading'}>
    <header className={styles.header}><div><Title2 as="h1">Accessibility content auditor</Title2><Body1>Read-only heuristic checks for bounded SharePoint content.</Body1></div><ShieldTaskRegular aria-hidden="true" fontSize={32} /></header>
    <Card className={styles.configuration} aria-label="Audit configuration">
      <Subtitle2 as="h2">Configured source</Subtitle2>
      <div className={styles.configGrid}><Field label="Source"><Input value={config.sourceType === 'page' ? config.pagePath : config.listTitle} readOnly aria-describedby="bounds-note" /></Field><Field label="Fields inspected"><Input value={config.contentFields.join(', ')} readOnly /></Field></div>
      <Body1 id="bounds-note" className={styles.boundsNote}>Maximum {config.itemLimit} list item(s); page audits read one page. No content is changed.</Body1>
      <Button appearance="primary" icon={<ArrowClockwiseRegular />} onClick={() => void runAudit()} disabled={state.status === 'loading'}>Run audit</Button>
    </Card>
    {state.status === 'loading' ? <section className={styles.loading} role="status" aria-live="polite"><Spinner label="Reading SharePoint content and running heuristic checks" /><Skeleton><div className={styles.skeletonLine} /><div className={styles.skeletonLine} /></Skeleton></section> : null}
    {state.status === 'error' && error ? <MessageBar intent={error.kind === 'accessDenied' ? 'error' : 'warning'} role="alert"><MessageBarBody><strong>{error.kind === 'accessDenied' ? 'Access denied.' : 'Audit could not be completed.'}</strong> {error.kind === 'accessDenied' ? 'Ask a site owner for read access to the configured source.' : error.kind === 'transient' ? 'The service may be temporarily unavailable.' : error.message}<Button appearance="secondary" onClick={() => void runAudit()}>Retry</Button></MessageBarBody></MessageBar> : null}
    {state.status === 'ready' && state.result ? <section aria-live="polite"><AuditSummary result={state.result} />{state.result.failures.length ? <MessageBar intent="warning" role="status"><MessageBarBody>Partial result: {state.result.failures.length} item(s) could not be read. Review permissions or item data, then retry.</MessageBarBody></MessageBar> : null}{state.result.itemsAudited === 0 ? <div className={styles.emptyState}><Subtitle2 as="h2">Nothing to audit</Subtitle2><Body1>No items matched the configured source and page/list bounds.</Body1></div> : <FindingList findings={state.result.findings} />}</section> : null}
  </main>;
};
