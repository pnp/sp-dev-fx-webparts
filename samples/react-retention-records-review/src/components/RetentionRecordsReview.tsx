import * as React from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { DashboardConfig, InventoryItem, InventoryResult } from '../models/RetentionRecordsModels';
import { SharePointInventoryService } from '../services/SharePointInventoryService';
import styles from './RetentionRecordsReview.module.scss';

export interface IRetentionRecordsReviewProps { config: DashboardConfig | null; configError?: string; service: SharePointInventoryService; }
interface IState { loading: boolean; result: InventoryResult | null; error: string | null; }

function formatDate(value: string | null): string { if (!value) return 'Not available'; const date = new Date(value); return Number.isNaN(date.valueOf()) ? 'Invalid date' : date.toLocaleString(); }
function badgeClass(item: InventoryItem): string { return styles[item.classification === 'needs-review' ? 'needsReview' : item.classification]; }
function statusText(item: InventoryItem): string { return item.classification === 'needs-review' ? 'Needs review' : item.classification === 'unclassified' ? 'No indicator' : item.classification === 'record' ? 'Record' : 'Retention label'; }

export class RetentionRecordsReview extends React.Component<IRetentionRecordsReviewProps, IState> {
  public state: IState = { loading: true, result: null, error: null };
  public componentDidMount(): void { void this.load(); }
  private load = async (): Promise<void> => {
    if (!this.props.config) { this.setState({ loading: false, result: null, error: this.props.configError || 'Configuration is not available.' }); return; }
    this.setState({ loading: true, error: null });
    try { this.setState({ loading: false, result: await this.props.service.load(this.props.config) }); }
    catch { this.setState({ loading: false, error: 'The dashboard could not load. Try again.' }); }
  };
  public render(): React.ReactElement {
    const { loading, result, error } = this.state;
    const items = result?.items || [];
    return <section className={styles.dashboard} aria-labelledby="retention-review-title">
      <div className={styles.header}><div><div className={styles.eyebrow}>SharePoint inventory</div><h2 className={styles.title} id="retention-review-title">Retention and Records Review</h2><p className={styles.subtitle}>A read-only view of configured libraries and folders to help reviewers find missing metadata and identify available retention indicators.</p></div>{!loading && <Button appearance="secondary" onClick={this.load}>Refresh</Button>}</div>
      <div className={styles.notice} role="note"><strong>Review aid, not policy enforcement.</strong> This dashboard only reads what SharePoint exposes to the current user. It does not apply labels, declare records, change metadata, or replace your organization’s retention policy and review process.</div>
      {loading && <div className={styles.empty} role="status"><Spinner label="Reading configured SharePoint sources…" /></div>}
      {error && <div className={styles.error} role="alert"><strong>Could not load the dashboard.</strong><div>{error}</div><Button className={styles.retry} appearance="primary" onClick={this.load}>Retry</Button></div>}
      {result && <>
        {result.failures.length > 0 && <div className={styles.warning} role="status"><strong>Some sources could not be read.</strong> {result.failures.map(f => `${f.sourceLabel}: ${f.message}`).join(' ')}</div>}
        {result.truncatedSources.length > 0 && <div className={styles.warning} role="status">Results are capped by the configured page limit for: {result.truncatedSources.join(', ')}.</div>}
        <div className={styles.summary} aria-label="Inventory summary"><div className={styles.stat}><span className={styles.statValue}>{items.length}</span><span className={styles.statLabel}>Items read</span></div><div className={styles.stat}><span className={styles.statValue}>{items.filter(item => item.classification === 'record').length}</span><span className={styles.statLabel}>Records indicated</span></div><div className={styles.stat}><span className={styles.statValue}>{items.filter(item => item.retentionLabel).length}</span><span className={styles.statLabel}>Retention labels</span></div><div className={styles.stat}><span className={styles.statValue}>{items.filter(item => item.missingReviewMetadata.length > 0).length}</span><span className={styles.statLabel}>Missing review data</span></div></div>
        {items.length === 0 ? <div className={styles.empty} role="status">No readable items were found in the configured sources.</div> : <div className={styles.tableWrap}><table className={styles.table}><caption className={styles.srOnly}>Retention and records review inventory</caption><thead><tr><th scope="col">Item</th><th scope="col">Modified</th><th scope="col">Content type</th><th scope="col">Indicators</th><th scope="col">Review metadata</th></tr></thead><tbody>{items.map(item => <tr key={`${item.sourceLabel}-${item.id}-${item.path}`}><td><strong>{item.title}</strong><div className={styles.path}>{item.path || 'Path not available'}<br />{item.sourceLabel}</div></td><td>{formatDate(item.modified)}</td><td>{item.contentType || 'Not available'}</td><td><span className={`${styles.badge} ${badgeClass(item)}`}>{statusText(item)}</span><div>{item.isRecord === null ? 'Record flag: not available' : `Record flag: ${item.isRecord ? 'Yes' : 'No'}`}</div>{item.retentionLabel && <div>Label: {item.retentionLabel}</div>}{item.retentionLabelAppliedDate && <div>Applied: {formatDate(item.retentionLabelAppliedDate)}</div>}</td><td>{item.missingReviewMetadata.length ? <span>{item.missingReviewMetadata.join(', ')}</span> : 'Configured fields present'}</td></tr>)}</tbody></table></div>}
      </>}
    </section>;
  }
}
