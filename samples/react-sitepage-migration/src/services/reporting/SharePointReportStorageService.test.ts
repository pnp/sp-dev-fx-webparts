import { PageMigrationReportEntry } from '../../models/MigrationReport';
import { MigrationContext } from '../../models/OperationalTypes';
import { Logger } from '../logging/Logger';
import { FakeSharePointPageService } from '../sharepoint/FakeSharePointPageService';
import { ReportExportService } from './ReportExportService';
import { SharePointReportStorageService } from './SharePointReportStorageService';

const SOURCE = 'https://contoso.sharepoint.com/sites/source';
const TARGET = 'https://contoso.sharepoint.com/sites/target';

const context = (overrides: Partial<MigrationContext> = {}): MigrationContext => ({
  sourceSite: {
    id: 'source-id', displayName: 'Source', webUrl: SOURCE,
    hostname: 'contoso.sharepoint.com', path: '/sites/source'
  },
  targetSite: {
    id: 'target-id', displayName: 'Target', webUrl: TARGET,
    hostname: 'contoso.sharepoint.com', path: '/sites/target'
  },
  publishOnComplete: false,
  overwriteMode: 'Rename',
  persistence: { persistReports: true, auditListName: 'Audit', logListName: 'Log' },
  ...overrides
});

const report = (name: string, overrides: Partial<PageMigrationReportEntry> = {}): PageMigrationReportEntry => ({
  pageId: name,
  pageName: `${name}.aspx`,
  sourcePageUrl: `${SOURCE}/SitePages/${name}.aspx`,
  targetPageUrl: `${TARGET}/SitePages/${name}.aspx`,
  startedAt: '2026-01-01T00:00:00.000Z',
  completedAt: '2026-01-01T00:00:05.000Z',
  durationMs: 5000,
  finalStatus: 'Completed',
  assets: [],
  unsupportedWebParts: [],
  warnings: [],
  errors: [],
  ...overrides
});

const buildService = (): { service: SharePointReportStorageService; sharePoint: FakeSharePointPageService } => {
  const sharePoint = new FakeSharePointPageService();
  return {
    sharePoint,
    service: new SharePointReportStorageService(sharePoint, new ReportExportService(), new Logger())
  };
};

describe('report storage', () => {
  it('reads back what it wrote for the same source and target pair', async () => {
    const { service, sharePoint } = buildService();
    await service.provisionLists(TARGET, 'Audit', 'Log');

    const persisted = await service.persistRun(context(), [report('Home'), report('About')]);
    expect(persisted?.reportItemsStored).toBe(2);

    const history = await service.readHistory(context());

    expect(history.map((entry) => entry.sourcePageUrl).sort()).toEqual([
      `${SOURCE}/SitePages/About.aspx`,
      `${SOURCE}/SitePages/Home.aspx`
    ]);
    expect(sharePoint.listItems.get(`${TARGET}|Audit`)).toHaveLength(2);
  });

  it('does not return another destination\'s history', async () => {
    const { service } = buildService();
    await service.provisionLists(TARGET, 'Audit', 'Log');
    await service.persistRun(context(), [report('Home')]);

    const otherTarget = context({
      targetSite: {
        id: 'other-id', displayName: 'Other', webUrl: TARGET,
        hostname: 'contoso.sharepoint.com', path: '/sites/target'
      }
    });

    expect(await service.readHistory(otherTarget)).toHaveLength(0);
  });

  it('indexes the columns the history filter runs on', async () => {
    const { service, sharePoint } = buildService();
    await service.provisionLists(TARGET, 'Audit', 'Log');

    expect([...(sharePoint.indexedFields.get(`${TARGET}|Audit`) ?? [])].sort())
      .toEqual(['SourceSiteId', 'TargetSiteId']);
  });

  it('returns an empty history rather than failing when the list is missing', async () => {
    const { service } = buildService();

    expect(await service.readHistory(context())).toEqual([]);
  });

  it('keeps the run report when list persistence fails', async () => {
    const { service, sharePoint } = buildService();
    jest.spyOn(sharePoint, 'addListItemsBatch').mockRejectedValue(new Error('no permission to add items'));

    const persisted = await service.persistRun(context(), [report('Home')]);

    expect(persisted?.jsonReportUrl).toContain('.json');
    expect(persisted?.csvReportUrl).toContain('.csv');
    expect(persisted?.reportItemsStored).toBe(0);
    expect(persisted?.warningMessage).toContain('no permission');
  });

  it('stores nothing when reporting is switched off', async () => {
    const { service, sharePoint } = buildService();
    const off = context({
      persistence: { persistReports: false, auditListName: 'Audit', logListName: 'Log' }
    });

    expect(await service.persistRun(off, [report('Home')])).toBeUndefined();
    expect(await service.readHistory(off)).toEqual([]);
    expect(sharePoint.listItems.size).toBe(0);
  });

  it('falls back to the target site when the configured storage site is off-host', async () => {
    const { service, sharePoint } = buildService();
    const offHost = context({
      persistence: {
        persistReports: true,
        reportStorageSiteUrl: 'https://fabrikam.sharepoint.com/sites/elsewhere',
        auditListName: 'Audit',
        logListName: 'Log'
      }
    });

    await service.persistRun(offHost, [report('Home')]);

    expect(sharePoint.listItems.has(`${TARGET}|Audit`)).toBe(true);
    expect([...sharePoint.listItems.keys()].some((key) => key.includes('fabrikam'))).toBe(false);
  });
});
