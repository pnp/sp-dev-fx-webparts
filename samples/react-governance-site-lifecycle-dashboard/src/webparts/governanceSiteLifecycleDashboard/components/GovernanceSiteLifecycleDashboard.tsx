import * as React from 'react';
import { Button } from '@fluentui/react-components';
import styles from './GovernanceSiteLifecycleDashboard.module.scss';
import { IGovernanceSiteLifecycleDashboardProps } from './IGovernanceSiteLifecycleDashboardProps';
import { GovernanceState, IGovernanceSite } from '../services/governanceLogic';

const FluentButton = Button as unknown as React.ComponentType<{ appearance?: 'primary'; onClick?: () => void; disabled?: boolean; 'aria-label'?: string; children?: React.ReactNode }>;

const stateLabel: Record<GovernanceState, string> = {
  success: 'Loaded',
  empty: 'Empty',
  partial: 'Partial',
  permission: 'Permission denied',
  throttled: 'Throttled',
  retry: 'Retry available',
  error: 'Error'
};

const formatDate = (value: string): string => {
  if (!value || value === 'Not supplied') { return value || 'Not supplied'; }
  const parsed = Date.parse(value);
  return isFinite(parsed) ? new Date(parsed).toLocaleDateString() : value;
};

const statusTone = (site: IGovernanceSite): 'danger' | 'warning' | 'success' | 'informative' => {
  if (site.inactive) { return 'danger'; }
  if (site.needsReview) { return 'warning'; }
  return site.classification === 'unknown' ? 'informative' : 'success';
};

const statusText = (site: IGovernanceSite): string => {
  if (site.inactive && site.needsReview) { return 'Inactive; needs review'; }
  if (site.inactive) { return 'Inactive'; }
  if (site.needsReview) { return 'Needs review'; }
  if (site.classification === 'unknown') { return 'Unknown'; }
  return 'Within review signals';
};

export default function GovernanceSiteLifecycleDashboard(props: IGovernanceSiteLifecycleDashboardProps): React.ReactElement {
  const [query, setQuery] = React.useState('');
  const sites = props.sourceResults.reduce((all: IGovernanceSite[], result) => all.concat(result.items), []);
  const filteredSites = sites.filter((site) => `${site.title} ${site.url} ${site.owners} ${site.template}`.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  const inactiveCount = sites.filter((site) => site.inactive).length;
  const reviewCount = sites.filter((site) => site.needsReview).length;
  const failedSources = props.sourceResults.filter((result) => ['permission', 'throttled', 'retry', 'error'].indexOf(result.state) !== -1).length;
  const allEmpty = !props.loading && !props.loadError && !props.configurationErrors.length && !sites.length;

  return (
    <section className={styles.dashboard} aria-labelledby="governance-dashboard-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>READ-ONLY REVIEW</p>
          <h1 id="governance-dashboard-title">Governance and Site Lifecycle Dashboard</h1>
          <p className={styles.subtitle}>A bounded view of SharePoint site metadata and lifecycle signals. No administration actions are available.</p>
        </div>
        <FluentButton appearance="primary" onClick={props.onRetry} disabled={props.loading} aria-label="Refresh governance sources">Refresh</FluentButton>
      </div>

      <div className={styles.summary} aria-label="Governance summary">
        <div className={styles.summaryCard}><span className={styles.summaryLabel}>Sites read</span><strong>{sites.length}</strong><span>Across {props.sourceResults.length} source{props.sourceResults.length === 1 ? '' : 's'}</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryLabel}>Inactive</span><strong>{inactiveCount}</strong><span>Older than each source threshold</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryLabel}>Needs review</span><strong>{reviewCount}</strong><span>Within {props.reviewHorizonDays} days or already due</span></div>
        <div className={styles.summaryCard}><span className={styles.summaryLabel}>Source issues</span><strong>{failedSources}</strong><span>Permission, throttle, retry or error</span></div>
      </div>

      <div className={styles.notice} role="status">
        Reference date: <strong>{props.referenceDate}</strong>. Signals are deterministic for this date; missing fields remain unknown.
      </div>

      {props.loading ? <div className={styles.loading} role="status">Loading bounded SharePoint sources…</div> : null}
      {props.loadError ? <div className={styles.messageError} role="alert">{props.loadError}</div> : null}
      {props.configurationErrors.map((error) => <div className={styles.messageWarning} role="alert" key={error}>{error}</div>)}

      {!props.loading && props.sourceResults.length ? (
        <div className={styles.sourceStates} aria-label="Source states">
          {props.sourceResults.map((result) => <div className={styles.sourceState} key={result.source.id}><span>{result.source.label}</span><span className={styles.badge}>{stateLabel[result.state]}</span><small>{result.pages} page{result.pages === 1 ? '' : 's'} · {result.items.length} item{result.items.length === 1 ? '' : 's'}</small>{result.error ? <span className={styles.stateMessage}>{result.error}</span> : null}</div>)}
        </div>
      ) : null}

      {allEmpty ? <div className={styles.messageInfo} role="status">No valid site rows were returned by the configured sources.</div> : null}

      <div className={styles.toolbar}>
        <div>
          <label htmlFor="site-filter">Filter loaded sites</label>
          <input className={styles.filterInput} id="site-filter" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Title, URL, owner or template" />
        </div>
        <div className={styles.toolbarMeta}>Showing {filteredSites.length} of {sites.length}</div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className={styles.visuallyHidden}>SharePoint site governance review rows</caption>
          <thead><tr><th scope="col">Site</th><th scope="col">Template</th><th scope="col">Owners</th><th scope="col">Hub</th><th scope="col">Sharing</th><th scope="col">Storage / usage</th><th scope="col">Last activity</th><th scope="col">Review / expiry</th><th scope="col">Status</th></tr></thead>
          <tbody>
            {filteredSites.map((site) => <tr key={`${site.sourceId}-${site.id}`}>
              <td><strong>{site.title}</strong>{site.url ? <a href={site.url} target="_blank" rel="noreferrer">{site.url}</a> : <span>URL not supplied</span>}<small>{site.sourceLabel}</small></td>
              <td>{site.template}</td><td>{site.owners}</td><td>{site.hub}</td><td>{site.sharing}</td><td>{site.storage}</td>
              <td>{formatDate(site.lastActivity)}</td><td><div>Review: {formatDate(site.reviewDate)}</div><div>Expiry: {formatDate(site.expirationDate)}</div></td>
              <td><span className={`${styles.badge} ${styles[`tone${statusTone(site)}`]}`}>{statusText(site)}</span>{site.sourceState === 'partial' ? <small>{site.sourceError}</small> : null}</td>
            </tr>)}
          </tbody>
        </table>
      </div>

      <details className={styles.help}><summary>Configuration and security boundary</summary><p>Sources are local JSON, limited to four same-tenant REST endpoints. Each source is limited to 50 rows per page, five pages and 200 items. The dashboard issues SharePoint REST GET requests only and does not request Graph, permissions, credentials or external hosts.</p><label htmlFor="configuration-example">Example source shape</label><textarea className={styles.example} id="configuration-example" readOnly value={'[{"id":"sites","label":"Sites","url":"/_api/web/webinfos","pageSize":25,"maxPages":5,"maxItems":200}]'} /></details>
    </section>
  );
}
