import * as React from 'react';
import { Link, MessageBar, MessageBarType } from '@fluentui/react';
import styles from './KnowledgeSourceHealth.module.scss';
import { releaseRules } from '../../../rules/groundingRules';

/**
 * Rules that live in Copilot Studio rather than in SharePoint.
 *
 * The web part cannot read an agent's authentication method or its knowledge
 * source count, so it does not pretend to. These are presented as things for
 * the maker to confirm, never as checks that passed.
 */
export const MakerChecklist: React.FC = () => {
  const items = releaseRules().filter(r => r.checkable === 'maker-confirms');

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.checklist}>
      <h3>Confirm these in Copilot Studio</h3>
      <MessageBar messageBarType={MessageBarType.info}>
        These settings are not visible from SharePoint, so this web part cannot check them. A clean
        scorecard above does not cover them.
      </MessageBar>
      {items.map(rule => (
        <div key={rule.id} className={styles.checklistItem}>
          <div>
            <strong>{rule.title}</strong>
          </div>
          <div>{rule.finding}</div>
          <div className={styles.findingDetail}>
            {rule.remediation}{' '}
            <Link href={rule.docsUrl} target="_blank" rel="noreferrer">
              Documentation
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MakerChecklist;
