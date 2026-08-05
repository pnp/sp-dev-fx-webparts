import { PageMigrationReportEntry } from '../../models/MigrationReport';
import { buildReportFileName, escapeCsvValue, ReportExportService } from './ReportExportService';

const entry = (overrides: Partial<PageMigrationReportEntry> = {}): PageMigrationReportEntry => ({
  pageId: '1',
  pageName: 'Home.aspx',
  sourcePageUrl: 'https://c.sharepoint.com/sites/a/SitePages/Home.aspx',
  targetPageUrl: 'https://c.sharepoint.com/sites/b/SitePages/Home.aspx',
  startedAt: '2026-07-01T10:00:00.000Z',
  completedAt: '2026-07-01T10:00:05.000Z',
  durationMs: 5000,
  finalStatus: 'Completed',
  assets: [],
  unsupportedWebParts: [],
  warnings: [],
  errors: [],
  ...overrides
});

describe('escapeCsvValue', () => {
  it('quotes values and doubles embedded quotes', () => {
    expect(escapeCsvValue('plain')).toBe('"plain"');
    expect(escapeCsvValue('say "hi"')).toBe('"say ""hi"""');
  });

  it('neutralises formula injection', () => {
    ['=cmd|calc', '+1+1', '-1+1', '@SUM(A1)'].forEach((payload) => {
      expect(escapeCsvValue(payload)).toBe(`"'${payload}"`);
    });
  });

  it('renders empty and numeric values safely', () => {
    expect(escapeCsvValue(undefined)).toBe('""');
    expect(escapeCsvValue(0)).toBe('"0"');
  });
});

describe('buildReportFileName', () => {
  it('contains no characters that are illegal in a Windows file name', () => {
    const name = buildReportFileName('csv', new Date('2026-07-01T10:20:30.400Z'));
    expect(name).not.toMatch(/[:*?"<>|]/);
    expect(name).toBe('page-migration-report-2026-07-01T10-20-30-400.csv');
  });
});

describe('ReportExportService', () => {
  const service = new ReportExportService();

  it('emits a header row and one row per entry', () => {
    const csv = service.buildCsv([entry(), entry({ pageName: 'About.aspx' })]);
    const rows = csv.split('\r\n');

    expect(rows).toHaveLength(3);
    expect(rows[0]).toContain('PageName');
    expect(rows[1]).toContain('"Home.aspx"');
    expect(rows[2]).toContain('"About.aspx"');
  });

  it('counts every asset status that means the file reached the destination', () => {
    const csv = service.buildCsv([entry({
      assets: [
        { sourceUrl: 'a', fileName: 'a.png', status: 'Copied' },
        { sourceUrl: 'b', fileName: 'b.png', status: 'Reused' },
        { sourceUrl: 'c', fileName: 'c.png', status: 'Replaced' },
        { sourceUrl: 'd', fileName: 'd.png', status: 'Failed' },
        { sourceUrl: 'e', fileName: 'e.png', status: 'Skipped' }
      ]
    })]);

    const columns = csv.split('\r\n')[1].split(',');
    expect(columns[columns.length - 2]).toBe('"3"');
    expect(columns[columns.length - 1]).toBe('"1"');
  });

  it('flattens warnings and errors into single cells', () => {
    const csv = service.buildCsv([entry({
      warnings: [
        { code: 'W1', message: 'first', severity: 'Warning' },
        { code: 'W2', message: 'second', severity: 'Warning' }
      ],
      errors: ['bad', 'worse']
    })]);

    expect(csv).toContain('"first | second"');
    expect(csv).toContain('"bad | worse"');
  });

  it('produces valid JSON carrying both the summary and the per-page evidence', () => {
    const parsed = JSON.parse(service.buildJson([entry()])) as {
      schemaVersion: number;
      summary: { totalPages: number };
      pages: PageMigrationReportEntry[];
    };

    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.summary.totalPages).toBe(1);
    expect(parsed.pages[0].pageName).toBe('Home.aspx');
  });

  it('handles an empty report', () => {
    expect(service.buildCsv([]).split('\r\n')).toHaveLength(1);

    const parsed = JSON.parse(service.buildJson([])) as { summary: { totalPages: number }; pages: unknown[] };
    expect(parsed.pages).toEqual([]);
    expect(parsed.summary.totalPages).toBe(0);
  });
});
