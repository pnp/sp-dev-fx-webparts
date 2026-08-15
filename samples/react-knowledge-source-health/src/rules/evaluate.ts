/**
 * The rule engine.
 *
 * Pure functions over the facts in ../models/ScanTypes. No SharePoint imports,
 * no network, no React. That is what makes the documented limits testable.
 *
 * Only rules returned by automaticRules() are evaluated here: verified against
 * Microsoft Learn, and checkable from list metadata. Everything else is either
 * excluded from the build or surfaced as a maker checklist item.
 */

import { GroundingRule, RuleScope, Severity, automaticRules, releaseRules } from './groundingRules';
import { IDocumentFacts, ILibraryFacts } from '../models/ScanTypes';

export const MB: number = 1024 * 1024;

/**
 * Learn documents two tiers. 200 MB for SharePoint and connector content when
 * tenant graph grounding is on and the maker holds an M365 licence in the same
 * tenant, and 512 MB for PDF, PPTX and DOCX.
 * A flat 200 MB check reports false positives on exactly the large documents
 * makers care about most, so the tier matters.
 */
export const STANDARD_SIZE_LIMIT_BYTES: number = 200 * MB;
export const EXTENDED_SIZE_LIMIT_BYTES: number = 512 * MB;
export const EXTENDED_SIZE_LIMIT_EXTENSIONS: string[] = ['pdf', 'pptx', 'docx'];

/** Semantic search has documented limitations indexing spreadsheet cells. */
export const SPREADSHEET_EXTENSIONS: string[] = ['xlsx', 'xlsm', 'xlsb', 'xls', 'csv'];

/** Labels documented as preventing an otherwise indexed file from answering. */
export const BLOCKING_SENSITIVITY_LABELS: string[] = ['confidential', 'highly confidential'];

/** Maximum knowledge objects an agent can hold. */
export const KNOWLEDGE_OBJECT_CAP: number = 500;

/** Content synchronizes every four to six hours with the file upload option. */
export const SYNC_WINDOW_HOURS: number = 6;

export interface IEvaluationOptions {
  /** A document untouched for longer than this is flagged as informational. */
  staleAfterMonths: number;
  /** Clock injection, so tests do not depend on the current date. */
  now: Date;
}

export const defaultOptions = (): IEvaluationOptions => ({
  staleAfterMonths: 24,
  now: new Date()
});

export interface IFinding {
  ruleId: string;
  severity: Severity;
  /** Whether the finding is about the library as a whole or a single document. */
  scope: RuleScope;
  /** Display name of the document or library the finding is about. */
  target: string;
  targetUrl: string;
  /** Instance-specific detail, for example the actual size against the limit. */
  detail: string;
}

export interface IScanResult {
  library: ILibraryFacts;
  findings: IFinding[];
  documentsScanned: number;
  /** Documents with no blocking finding. */
  groundableDocuments: number;
  /** Percentage of scanned documents with no blocking finding, 0 to 100. */
  groundablePercent: number;
  /**
   * Blocking findings about the library itself. These are not counted in
   * groundablePercent, which is a per-document measure, so the UI must say so.
   * Otherwise "100% groundable" can sit next to a rule that blocks the whole
   * library and read as an all-clear.
   */
  libraryBlockingCount: number;
  /**
   * Rules that could not be evaluated because the underlying fact was unavailable.
   * Reported explicitly so a clean scorecard is never mistaken for an all-clear.
   */
  notEvaluatedRuleIds: string[];
}

const findRule = (id: string): GroundingRule | undefined => {
  const matches = automaticRules().filter(r => r.id === id);
  return matches.length > 0 ? matches[0] : undefined;
};

/** Public so the UI can label the limit it is applying. */
export const sizeLimitFor = (extension: string): number =>
  EXTENDED_SIZE_LIMIT_EXTENSIONS.indexOf(extension.toLowerCase()) >= 0
    ? EXTENDED_SIZE_LIMIT_BYTES
    : STANDARD_SIZE_LIMIT_BYTES;

export const formatBytes = (bytes: number): string => {
  if (bytes < MB) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / MB).toFixed(1)} MB`;
};

const monthsBetween = (from: Date, to: Date): number => {
  const years = to.getFullYear() - from.getFullYear();
  return years * 12 + (to.getMonth() - from.getMonth());
};

const hoursBetween = (from: Date, to: Date): number =>
  (to.getTime() - from.getTime()) / (1000 * 60 * 60);

export const evaluateDocument = (
  doc: IDocumentFacts,
  library: ILibraryFacts,
  options: IEvaluationOptions
): IFinding[] => {
  const findings: IFinding[] = [];
  const push = (ruleId: string, detail: string): void => {
    const rule = findRule(ruleId);
    if (rule) {
      findings.push({
        ruleId,
        severity: rule.severity,
        scope: rule.scope,
        target: doc.name,
        targetUrl: doc.webUrl,
        detail
      });
    }
  };

  const limit = sizeLimitFor(doc.extension);
  if (doc.sizeBytes > limit) {
    push(
      'file-size-limit',
      `${formatBytes(doc.sizeBytes)} exceeds the ${formatBytes(limit)} limit that applies to .${doc.extension || 'file'}`
    );
  }

  if (SPREADSHEET_EXTENSIONS.indexOf(doc.extension) >= 0) {
    push('excel-semantic-search', `Spreadsheet content (.${doc.extension}) is not reliably indexed at cell level`);
  }

  if (library.sensitivityLabelsAvailable && doc.sensitivityLabel) {
    if (BLOCKING_SENSITIVITY_LABELS.indexOf(doc.sensitivityLabel.toLowerCase()) >= 0) {
      push('sensitivity-label-blocks-grounding', `Sensitivity label "${doc.sensitivityLabel}" blocks grounding`);
    }
  }

  const modified = new Date(doc.lastModified);
  const age = monthsBetween(modified, options.now);
  if (age >= options.staleAfterMonths) {
    push('stale-content', `Last modified ${age} months ago, on ${modified.toISOString().substring(0, 10)}`);
  }

  if (hoursBetween(modified, options.now) < SYNC_WINDOW_HOURS) {
    push(
      'sync-lag',
      `Changed within the last ${SYNC_WINDOW_HOURS} hours, so it may not be retrievable yet`
    );
  }

  return findings;
};

export const evaluateLibrary = (library: ILibraryFacts): IFinding[] => {
  const findings: IFinding[] = [];
  const push = (ruleId: string, detail: string): void => {
    const rule = findRule(ruleId);
    if (rule) {
      findings.push({
        ruleId,
        severity: rule.severity,
        scope: rule.scope,
        target: library.title,
        targetUrl: library.webUrl,
        detail
      });
    }
  };

  if (library.totalItemCount > KNOWLEDGE_OBJECT_CAP) {
    push(
      'knowledge-object-cap',
      `${library.totalItemCount} items exceeds the ${KNOWLEDGE_OBJECT_CAP} object cap. Copilot Studio indexes up to the cap and does not report which items were skipped`
    );
  }

  if (library.isPagesLibrary) {
    push('sharepoint-pages-unsupported', 'This is a Pages library, which the SharePoint file upload connector does not support');
  }

  return findings;
};

export const evaluateScan = (
  library: ILibraryFacts,
  options: IEvaluationOptions = defaultOptions()
): IScanResult => {
  const findings: IFinding[] = evaluateLibrary(library);
  let groundable = 0;

  for (const doc of library.documents) {
    const docFindings = evaluateDocument(doc, library, options);
    const blocked = docFindings.filter(f => f.severity === 'blocking').length > 0;
    if (!blocked) {
      groundable += 1;
    }
    findings.push(...docFindings);
  }

  const scanned = library.documents.length;

  const notEvaluatedRuleIds: string[] = [];
  if (!library.sensitivityLabelsAvailable) {
    notEvaluatedRuleIds.push('sensitivity-label-blocks-grounding');
  }
  // Rules that are documented but not yet verified never reach automaticRules(),
  // so surface them as not evaluated rather than letting them vanish silently.
  for (const rule of releaseRules()) {
    if (rule.checkable === 'graph' && !findRule(rule.id)) {
      notEvaluatedRuleIds.push(rule.id);
    }
  }

  return {
    library,
    findings,
    documentsScanned: scanned,
    groundableDocuments: groundable,
    groundablePercent: scanned === 0 ? 100 : Math.round((groundable / scanned) * 100),
    libraryBlockingCount: findings.filter(f => f.scope === 'library' && f.severity === 'blocking').length,
    notEvaluatedRuleIds
  };
};
