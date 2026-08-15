import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  DefaultButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Link
} from '@fluentui/react';

import styles from './KnowledgeSourceHealth.module.scss';
import { IKnowledgeSourceHealthProps } from './IKnowledgeSourceHealthProps';
import { ILibrarySummary } from '../../../models/ScanTypes';
import { IScanResult, evaluateScan, defaultOptions } from '../../../rules/evaluate';
import { groundingRules } from '../../../rules/groundingRules';
import Scorecard from './Scorecard';
import FindingsGrid from './FindingsGrid';
import MakerChecklist from './MakerChecklist';

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const ruleTitle = (ruleId: string): string => {
  const matches = groundingRules.filter(r => r.id === ruleId);
  return matches.length > 0 ? matches[0].title : ruleId;
};

const toCsv = (result: IScanResult): string => {
  const header = ['severity', 'item', 'url', 'rule', 'detail'];
  const rows = result.findings.map(f => [
    f.severity,
    f.target,
    f.targetUrl,
    ruleTitle(f.ruleId),
    f.detail
  ]);
  return [header, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
};

export const KnowledgeSourceHealth: React.FC<IKnowledgeSourceHealthProps> = props => {
  const { scanService, maxItemsPerLibrary, staleAfterMonths, usingDemoData, hasTeamsContext } = props;

  const [libraries, setLibraries] = React.useState<ILibrarySummary[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | undefined>(undefined);
  const [result, setResult] = React.useState<IScanResult | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [scanning, setScanning] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(undefined);
    setResult(undefined);

    scanService
      .listLibraries()
      .then(found => {
        if (cancelled) {
          return;
        }
        setLibraries(found);
        setSelectedId(found.length > 0 ? found[0].id : undefined);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(errorMessage(e));
        }
      })
      .then(() => {
        if (!cancelled) {
          setLoading(false);
        }
      })
      .catch(() => {
        /* setLoading cannot throw */
      });

    return () => {
      cancelled = true;
    };
  }, [scanService]);

  const runScan = React.useCallback((): void => {
    const matches = libraries.filter(l => l.id === selectedId);
    if (matches.length === 0) {
      return;
    }
    setScanning(true);
    setError(undefined);

    scanService
      .scanLibrary(matches[0], maxItemsPerLibrary)
      .then(facts => {
        setResult(evaluateScan(facts, { ...defaultOptions(), staleAfterMonths }));
      })
      .catch((e: unknown) => {
        setError(errorMessage(e));
        setResult(undefined);
      })
      .then(() => setScanning(false))
      .catch(() => {
        /* setScanning cannot throw */
      });
  }, [libraries, selectedId, scanService, maxItemsPerLibrary, staleAfterMonths]);

  const exportCsv = React.useCallback((): void => {
    if (!result) {
      return;
    }
    const blob = new Blob([toCsv(result)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `knowledge-source-health-${result.library.title.replace(/[^a-z0-9]+/gi, '-')}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [result]);

  const options: IDropdownOption[] = libraries.map(l => ({
    key: l.id,
    text: `${l.title} (${l.itemCount} items)`
  }));

  return (
    <section className={`${styles.knowledgeSourceHealth} ${hasTeamsContext ? styles.teams : ''}`}>
      <h2>Knowledge source health</h2>
      <p>
        Audits a library against the documented constraints of Copilot Studio knowledge sources and
        flags content that will silently fail to ground.
      </p>

      {usingDemoData && (
        <MessageBar messageBarType={MessageBarType.warning}>
          Showing fabricated demo data, not this site. Turn off <strong>Use demo data</strong> in the
          property pane to scan the current site.
        </MessageBar>
      )}

      {error && (
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          {error}
        </MessageBar>
      )}

      {loading ? (
        <Spinner size={SpinnerSize.large} label="Loading libraries" />
      ) : (
        <div className={styles.controls}>
          <Dropdown
            className={styles.libraryPicker}
            label="Library"
            options={options}
            selectedKey={selectedId}
            onChange={(_, option) => setSelectedId(option ? String(option.key) : undefined)}
            disabled={options.length === 0}
          />
          <PrimaryButton text="Scan" onClick={runScan} disabled={!selectedId || scanning} />
          <DefaultButton text="Export CSV" onClick={exportCsv} disabled={!result} />
        </div>
      )}

      {scanning && <Spinner size={SpinnerSize.medium} label="Scanning" />}

      {result && !scanning && (
        <div>
          <Scorecard result={result} />

          {result.libraryBlockingCount > 0 && (
            <MessageBar messageBarType={MessageBarType.severeWarning} isMultiline={true}>
              {result.libraryBlockingCount === 1
                ? '1 blocking finding applies'
                : `${result.libraryBlockingCount} blocking findings apply`}{' '}
              to the library as a whole, not to individual documents, so the{' '}
              {result.groundablePercent}% above does not account for{' '}
              {result.libraryBlockingCount === 1 ? 'it' : 'them'}. Fix the library level findings
              first.
            </MessageBar>
          )}

          {result.library.truncated && (
            <MessageBar messageBarType={MessageBarType.warning}>
              Only the first {maxItemsPerLibrary} documents were read. The library reports{' '}
              {result.library.totalItemCount} items, so this scorecard covers part of it.
            </MessageBar>
          )}

          {result.notEvaluatedRuleIds.length > 0 && (
            <MessageBar messageBarType={MessageBarType.info} isMultiline={true}>
              Not evaluated, because the data needed was unavailable:{' '}
              {result.notEvaluatedRuleIds.map(ruleTitle).join('; ')}. These are neither passes nor
              failures.
            </MessageBar>
          )}

          <FindingsGrid findings={result.findings} />
        </div>
      )}

      <MakerChecklist />

      <p className={styles.findingDetail}>
        Rules are sourced to{' '}
        <Link
          href="https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio"
          target="_blank"
          rel="noreferrer"
        >
          Microsoft Learn
        </Link>
        . Rules that could not be verified against current documentation are excluded from this
        build rather than guessed.
      </p>
    </section>
  );
};

export default KnowledgeSourceHealth;
