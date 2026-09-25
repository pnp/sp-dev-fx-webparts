import * as React from 'react';
import { Badge, Body1, Caption1, Card, Link, Subtitle2 } from '@fluentui/react-components';
import { IAuditFinding } from '../../../models/AuditModels';
import styles from '../styles/ContentAuditor.module.scss';

export const FindingList: React.FC<{ findings: IAuditFinding[] }> = ({ findings }) => {
  if (!findings.length) return <div className={styles.emptyState}><Subtitle2 as="h3">No findings</Subtitle2><Body1>The selected content passed these heuristics.</Body1></div>;
  return <section aria-labelledby="findings-heading"><Subtitle2 as="h2" id="findings-heading">Findings</Subtitle2><div className={styles.findings}>
    {findings.map((finding) => <Card key={finding.id} className={styles.finding}>
      <div className={styles.findingHeader}><Badge appearance="filled" color={finding.severity === 'error' ? 'danger' : finding.severity === 'warning' ? 'warning' : 'informative'}>{finding.severity}</Badge><strong>{finding.rule}</strong></div>
      <Caption1>Item: {finding.item}</Caption1><Body1>{finding.evidence}</Body1>
      {finding.remediationUrl ? <Link href={finding.remediationUrl} target="_blank" rel="noreferrer">Open item for safe remediation</Link> : <Caption1>Remediation URL unavailable.</Caption1>}
    </Card>)}
  </div></section>;
};
