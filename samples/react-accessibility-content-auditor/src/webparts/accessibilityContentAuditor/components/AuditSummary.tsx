import * as React from 'react';
import { Body1, Card, Caption1, Title3 } from '@fluentui/react-components';
import { IAuditResult } from '../../../models/AuditModels';
import styles from '../styles/ContentAuditor.module.scss';

export const AuditSummary: React.FC<{ result: IAuditResult }> = ({ result }) => {
  const errors = result.findings.filter((finding) => finding.severity === 'error').length;
  const warnings = result.findings.filter((finding) => finding.severity === 'warning').length;
  return <div className={styles.summary} aria-label="Audit summary">
    <Card><Caption1>Items audited</Caption1><Title3>{result.itemsAudited}</Title3></Card>
    <Card><Caption1>Errors</Caption1><Title3>{errors}</Title3></Card>
    <Card><Caption1>Warnings</Caption1><Title3>{warnings}</Title3></Card>
    <Body1 className={styles.summaryNote}>Heuristic review only; this is not WCAG certification.</Body1>
  </div>;
};
