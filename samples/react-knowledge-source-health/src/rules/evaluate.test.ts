import {
  MB,
  STANDARD_SIZE_LIMIT_BYTES,
  EXTENDED_SIZE_LIMIT_BYTES,
  sizeLimitFor,
  evaluateScan,
  defaultOptions,
  IEvaluationOptions
} from './evaluate';
import { IDocumentFacts, ILibraryFacts } from '../models/ScanTypes';

const FIXED_NOW = new Date('2026-08-14T12:00:00.000Z');

const options = (overrides?: Partial<IEvaluationOptions>): IEvaluationOptions => ({
  ...defaultOptions(),
  now: FIXED_NOW,
  ...overrides
});

const doc = (overrides: Partial<IDocumentFacts>): IDocumentFacts => ({
  id: '1',
  name: 'file.docx',
  webUrl: 'https://contoso.sharepoint.com/file.docx',
  extension: 'docx',
  sizeBytes: 1 * MB,
  lastModified: '2026-06-01T00:00:00.000Z',
  sensitivityLabel: 'General',
  ...overrides
});

const library = (documents: IDocumentFacts[], overrides?: Partial<ILibraryFacts>): ILibraryFacts => ({
  id: 'lib',
  title: 'Policies',
  webUrl: 'https://contoso.sharepoint.com/Policies',
  totalItemCount: documents.length,
  isPagesLibrary: false,
  sensitivityLabelsAvailable: true,
  truncated: false,
  documents,
  ...overrides
});

const ruleIds = (result: { findings: { ruleId: string }[] }): string[] =>
  result.findings.map(f => f.ruleId);

describe('sizeLimitFor', () => {
  it('gives PDF, PPTX and DOCX the 512 MB tier', () => {
    expect(sizeLimitFor('pdf')).toBe(EXTENDED_SIZE_LIMIT_BYTES);
    expect(sizeLimitFor('pptx')).toBe(EXTENDED_SIZE_LIMIT_BYTES);
    expect(sizeLimitFor('docx')).toBe(EXTENDED_SIZE_LIMIT_BYTES);
  });

  it('gives everything else the 200 MB tier', () => {
    expect(sizeLimitFor('zip')).toBe(STANDARD_SIZE_LIMIT_BYTES);
    expect(sizeLimitFor('xlsx')).toBe(STANDARD_SIZE_LIMIT_BYTES);
    expect(sizeLimitFor('')).toBe(STANDARD_SIZE_LIMIT_BYTES);
  });

  it('is case insensitive', () => {
    expect(sizeLimitFor('PDF')).toBe(EXTENDED_SIZE_LIMIT_BYTES);
  });
});

describe('file size rule', () => {
  it('does not fire for a 340 MB PDF, because PDF gets the higher tier', () => {
    const result = evaluateScan(library([doc({ extension: 'pdf', name: 'a.pdf', sizeBytes: 340 * MB })]), options());
    expect(ruleIds(result)).not.toContain('file-size-limit');
  });

  it('fires for a 260 MB zip, which only gets the standard tier', () => {
    const result = evaluateScan(library([doc({ extension: 'zip', name: 'a.zip', sizeBytes: 260 * MB })]), options());
    expect(ruleIds(result)).toContain('file-size-limit');
  });

  it('does not fire exactly at the limit', () => {
    const result = evaluateScan(
      library([doc({ extension: 'zip', name: 'a.zip', sizeBytes: STANDARD_SIZE_LIMIT_BYTES })]),
      options()
    );
    expect(ruleIds(result)).not.toContain('file-size-limit');
  });
});

describe('spreadsheet rule', () => {
  it('flags xlsx as degraded rather than blocking', () => {
    const result = evaluateScan(library([doc({ extension: 'xlsx', name: 'a.xlsx' })]), options());
    const finding = result.findings.filter(f => f.ruleId === 'excel-semantic-search')[0];
    expect(finding).toBeDefined();
    expect(finding.severity).toBe('degraded');
  });

  it('counts a spreadsheet as still groundable, since the finding is not blocking', () => {
    const result = evaluateScan(library([doc({ extension: 'xlsx', name: 'a.xlsx' })]), options());
    expect(result.groundablePercent).toBe(100);
  });
});

describe('sensitivity label rule', () => {
  it('blocks a Highly Confidential document', () => {
    const result = evaluateScan(library([doc({ sensitivityLabel: 'Highly Confidential' })]), options());
    expect(ruleIds(result)).toContain('sensitivity-label-blocks-grounding');
    expect(result.groundablePercent).toBe(0);
  });

  it('ignores an ordinary label', () => {
    const result = evaluateScan(library([doc({ sensitivityLabel: 'General' })]), options());
    expect(ruleIds(result)).not.toContain('sensitivity-label-blocks-grounding');
  });

  it('reports the rule as not evaluated when labels are unavailable, rather than as a pass', () => {
    const facts = library([doc({ sensitivityLabel: undefined })], { sensitivityLabelsAvailable: false });
    const result = evaluateScan(facts, options());
    expect(ruleIds(result)).not.toContain('sensitivity-label-blocks-grounding');
    expect(result.notEvaluatedRuleIds).toContain('sensitivity-label-blocks-grounding');
  });
});

describe('library rules', () => {
  it('fires the knowledge object cap above 500 items', () => {
    const result = evaluateScan(library([doc({})], { totalItemCount: 612 }), options());
    expect(ruleIds(result)).toContain('knowledge-object-cap');
  });

  it('does not fire the cap at exactly 500 items', () => {
    const result = evaluateScan(library([doc({})], { totalItemCount: 500 }), options());
    expect(ruleIds(result)).not.toContain('knowledge-object-cap');
  });

  it('flags a Pages library', () => {
    const result = evaluateScan(library([doc({})], { isPagesLibrary: true }), options());
    expect(ruleIds(result)).toContain('sharepoint-pages-unsupported');
  });
});

describe('time based rules', () => {
  it('flags a document older than the staleness threshold', () => {
    const result = evaluateScan(
      library([doc({ lastModified: '2023-01-01T00:00:00.000Z' })]),
      options({ staleAfterMonths: 24 })
    );
    expect(ruleIds(result)).toContain('stale-content');
  });

  it('respects a custom staleness threshold', () => {
    const result = evaluateScan(
      library([doc({ lastModified: '2026-01-01T00:00:00.000Z' })]),
      options({ staleAfterMonths: 3 })
    );
    expect(ruleIds(result)).toContain('stale-content');
  });

  it('warns that a document changed inside the sync window may not be retrievable yet', () => {
    const result = evaluateScan(
      library([doc({ lastModified: '2026-08-14T10:00:00.000Z' })]),
      options()
    );
    expect(ruleIds(result)).toContain('sync-lag');
  });
});

describe('scorecard', () => {
  it('counts only blocking findings against groundability', () => {
    const facts = library([
      doc({ id: '1', name: 'ok.docx' }),
      doc({ id: '2', name: 'big.zip', extension: 'zip', sizeBytes: 300 * MB }),
      doc({ id: '3', name: 'sheet.xlsx', extension: 'xlsx' })
    ]);
    const result = evaluateScan(facts, options());
    expect(result.documentsScanned).toBe(3);
    expect(result.groundableDocuments).toBe(2);
    expect(result.groundablePercent).toBe(67);
  });

  it('reports an empty library as fully groundable rather than dividing by zero', () => {
    const result = evaluateScan(library([]), options());
    expect(result.groundablePercent).toBe(100);
  });
});

describe('library level blocking findings', () => {
  it('counts them separately, so a 100% document score cannot read as an all-clear', () => {
    // A Pages library the connector does not support, holding one clean document.
    const result = evaluateScan(library([doc({})], { isPagesLibrary: true }), options());

    expect(result.groundablePercent).toBe(100);
    expect(result.libraryBlockingCount).toBe(1);
  });

  it('is zero when nothing blocks at library scope', () => {
    const result = evaluateScan(library([doc({})]), options());
    expect(result.libraryBlockingCount).toBe(0);
  });

  it('does not count document level blocking findings', () => {
    const result = evaluateScan(
      library([doc({ extension: 'zip', name: 'a.zip', sizeBytes: 300 * MB })]),
      options()
    );
    expect(result.groundablePercent).toBe(0);
    expect(result.libraryBlockingCount).toBe(0);
  });

  it('tags every finding with the scope of its rule', () => {
    const result = evaluateScan(library([doc({})], { totalItemCount: 612 }), options());
    const cap = result.findings.filter(f => f.ruleId === 'knowledge-object-cap')[0];
    expect(cap.scope).toBe('library');
  });
});
