import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Link } from '@fluentui/react';
import styles from './KnowledgeSourceHealth.module.scss';
import { IFinding } from '../../../rules/evaluate';
import { groundingRules } from '../../../rules/groundingRules';

export interface IFindingsGridProps {
  findings: IFinding[];
}

const severityClass = (severity: string): string => {
  if (severity === 'blocking') {
    return styles.blocking;
  }
  if (severity === 'degraded') {
    return styles.degraded;
  }
  return styles.informational;
};

const ruleTitle = (ruleId: string): string => {
  const matches = groundingRules.filter(r => r.id === ruleId);
  return matches.length > 0 ? matches[0].title : ruleId;
};

const ruleDocsUrl = (ruleId: string): string => {
  const matches = groundingRules.filter(r => r.id === ruleId);
  return matches.length > 0 ? matches[0].docsUrl : '';
};

const ruleRemediation = (ruleId: string): string => {
  const matches = groundingRules.filter(r => r.id === ruleId);
  return matches.length > 0 ? matches[0].remediation : '';
};

const SEVERITY_ORDER: { [key: string]: number } = {
  blocking: 0,
  degraded: 1,
  informational: 2
};

export const FindingsGrid: React.FC<IFindingsGridProps> = ({ findings }) => {
  const sorted = React.useMemo(
    () =>
      findings
        .slice()
        .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]),
    [findings]
  );

  const columns: IColumn[] = [
    {
      key: 'severity',
      name: 'Severity',
      minWidth: 70,
      maxWidth: 80,
      onRender: (item: IFinding) => (
        <span className={severityClass(item.severity)}>{item.severity}</span>
      )
    },
    {
      key: 'target',
      name: 'Item',
      minWidth: 130,
      maxWidth: 180,
      isMultiline: true,
      onRender: (item: IFinding) =>
        item.targetUrl ? (
          <Link href={item.targetUrl} target="_blank" rel="noreferrer">
            {item.target}
          </Link>
        ) : (
          <span>{item.target}</span>
        )
    },
    {
      key: 'rule',
      name: 'Rule',
      minWidth: 170,
      maxWidth: 220,
      isMultiline: true,
      onRender: (item: IFinding) => (
        <Link href={ruleDocsUrl(item.ruleId)} target="_blank" rel="noreferrer">
          {ruleTitle(item.ruleId)}
        </Link>
      )
    },
    {
      key: 'detail',
      name: 'Detail and remediation',
      minWidth: 240,
      isMultiline: true,
      onRender: (item: IFinding) => (
        <div>
          <div>{item.detail}</div>
          <div className={styles.findingDetail}>{ruleRemediation(item.ruleId)}</div>
        </div>
      )
    }
  ];

  if (sorted.length === 0) {
    return <p>No findings. Every scanned document passed the rules that could be evaluated.</p>;
  }

  // The table is wider than a SharePoint canvas column, so it scrolls inside
  // this wrapper rather than widening (and clipping) the whole web part.
  return (
    <div className={styles.gridScroll}>
      <DetailsList
        items={sorted}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
        // An audit produces tens of findings, not thousands. Virtualisation
        // leaves unrendered rows as blank space when the web part is taller
        // than the viewport, which is worse than rendering them all.
        onShouldVirtualize={() => false}
      />
    </div>
  );
};

export default FindingsGrid;
