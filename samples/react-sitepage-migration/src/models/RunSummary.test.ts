import { PageMigrationReportEntry } from './MigrationReport';
import { summarizeRun } from './RunSummary';

const report = (overrides: Partial<PageMigrationReportEntry> = {}): PageMigrationReportEntry => ({
  pageId: 'p',
  pageName: 'Page.aspx',
  sourcePageUrl: 'https://contoso.sharepoint.com/sites/source/SitePages/Page.aspx',
  startedAt: '2026-07-01T10:00:00.000Z',
  completedAt: '2026-07-01T10:00:01.000Z',
  durationMs: 1000,
  finalStatus: 'Completed',
  assets: [],
  unsupportedWebParts: [],
  warnings: [],
  errors: [],
  ...overrides
});

describe('summarizeRun', () => {
  it('counts every status, including the ones that wrote nothing', () => {
    const summary = summarizeRun([
      report({ finalStatus: 'Completed' }),
      report({ finalStatus: 'CompletedWithWarnings' }),
      report({ finalStatus: 'Failed' }),
      report({ finalStatus: 'Skipped' }),
      report({ finalStatus: 'Planned' })
    ]);

    expect(summary.totalPages).toBe(5);
    expect(summary.byStatus.Completed).toBe(1);
    expect(summary.byStatus.Planned).toBe(1);
    expect(summary.byStatus.Cancelled).toBe(0);
  });

  it('reports the median page cost, not the mean', () => {
    const summary = summarizeRun([
      report({ durationMs: 100 }),
      report({ durationMs: 200 }),
      report({ durationMs: 60_000, pageName: 'Gallery.aspx' })
    ]);

    expect(summary.medianPageMs).toBe(200);
    expect(summary.slowestPageMs).toBe(60_000);
    expect(summary.slowestPageName).toBe('Gallery.aspx');
  });

  it('averages the two middle values for an even number of pages', () => {
    expect(summarizeRun([
      report({ durationMs: 100 }),
      report({ durationMs: 300 })
    ]).medianPageMs).toBe(200);
  });

  it('measures elapsed time across the run, not the sum of the pages', () => {
    const summary = summarizeRun([
      report({ startedAt: '2026-07-01T10:00:00.000Z', completedAt: '2026-07-01T10:00:10.000Z', durationMs: 10_000 }),
      report({ startedAt: '2026-07-01T10:00:02.000Z', completedAt: '2026-07-01T10:00:12.000Z', durationMs: 10_000 })
    ]);

    expect(summary.elapsedMs).toBe(12_000);
    expect(summary.totalPageMs).toBe(20_000);
    expect(summary.pagesPerMinute).toBe(10);
  });

  it('counts assets by whether the file reached the destination', () => {
    const summary = summarizeRun([report({
      assets: [
        { sourceUrl: 'a', fileName: 'a.png', status: 'Copied' },
        { sourceUrl: 'b', fileName: 'b.png', status: 'Reused' },
        { sourceUrl: 'c', fileName: 'c.png', status: 'Failed' },
        { sourceUrl: 'd', fileName: 'd.png', status: 'Planned' }
      ]
    })]);

    expect(summary.assetsCopied).toBe(2);
    expect(summary.assetsFailed).toBe(1);
  });

  it('handles an empty run without dividing by zero', () => {
    const summary = summarizeRun([]);

    expect(summary.totalPages).toBe(0);
    expect(summary.medianPageMs).toBe(0);
    expect(summary.pagesPerMinute).toBe(0);
    expect(summary.elapsedMs).toBe(0);
  });

  it('ignores unparsable timestamps rather than producing NaN', () => {
    const summary = summarizeRun([report({ startedAt: 'nonsense', completedAt: undefined, durationMs: undefined })]);

    expect(summary.elapsedMs).toBe(0);
    expect(Number.isNaN(summary.pagesPerMinute)).toBe(false);
  });
});
