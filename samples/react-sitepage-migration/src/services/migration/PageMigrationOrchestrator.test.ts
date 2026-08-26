import { PageInventoryItem } from '../../models/PageInventoryItem';
import { MigrationContext } from '../../models/OperationalTypes';
import { NormalizedPage } from '../../models/NormalizedPage';
import { MigrationCancellationToken } from '../../utilities/CancellationToken';
import { Logger } from '../logging/Logger';
import { PageMigrationOrchestrator } from './PageMigrationOrchestrator';
import { PageTransformService } from './PageTransformService';
import type { AssetMigrationService } from './AssetMigrationService';
import type { PageNormalizationService } from './PageNormalizationService';
import type { SharePointPageService, TargetPageHandle } from '../sharepoint/SharePointPageService';

const SOURCE = 'https://contoso.sharepoint.com/sites/source';
const TARGET = 'https://contoso.sharepoint.com/sites/target';

const item = (id: string): PageInventoryItem => ({
  key: id,
  id,
  pageId: id,
  title: `Page ${id}`,
  name: `${id}.aspx`,
  webUrl: `${SOURCE}/SitePages/${id}.aspx`,
  authorName: 'Someone',
  createdDateTime: '2026-01-01T00:00:00.000Z',
  lastModifiedDateTime: '2026-01-01T00:00:00.000Z',
  layout: 'Article',
  promotionState: 'page',
  migrationStatus: 'NotStarted',
  warningCount: 0
});

const normalized = (name: string): NormalizedPage => ({
  metadata: {
    pageId: name,
    title: `Page ${name}`,
    pageName: `${name}.aspx`,
    sourcePageUrl: `${SOURCE}/SitePages/${name}.aspx`
  },
  rawCanvasContent: '<div></div>',
  sections: [],
  assets: [],
  warnings: [],
  unsupportedControls: []
});

const context: MigrationContext = {
  sourceSite: { id: 's', displayName: 'Source', webUrl: SOURCE, hostname: 'contoso.sharepoint.com', path: '/sites/source' },
  targetSite: { id: 't', displayName: 'Target', webUrl: TARGET, hostname: 'contoso.sharepoint.com', path: '/sites/target' },
  publishOnComplete: false,
  overwriteMode: 'Rename',
  persistence: { persistReports: false, auditListName: 'A', logListName: 'L' }
};

interface Harness {
  readonly orchestrator: PageMigrationOrchestrator;
  readonly createdPages: string[];
  readonly writtenPages: string[];
  readonly deletedPages: string[];
}

const buildHarness = (options: {
  readonly failLoadFor?: ReadonlySet<string>;
  readonly failWriteFor?: ReadonlySet<string>;
} = {}): Harness => {
  const createdPages: string[] = [];
  const writtenPages: string[] = [];
  const deletedPages: string[] = [];

  const sharePointPageService = {
    loadPage: jest.fn(async (_siteUrl: string, pageUrl: string) => {
      const name = pageUrl.split('/').pop()?.replace('.aspx', '') ?? '';
      if (options.failLoadFor?.has(name)) {
        throw new Error(`cannot read ${name}`);
      }
      return { pageName: `${name}.aspx` } as never;
    }),
    createOrLoadTargetPage: jest.fn(async (_ctx, pageName: string): Promise<TargetPageHandle> => {
      createdPages.push(pageName);
      return {
        pagePath: `/sites/target/SitePages/${pageName}`,
        pageUrl: `${TARGET}/SitePages/${pageName}`,
        pageName,
        wasCreated: true,
        skipped: false
      };
    }),
    updatePageCanvas: jest.fn(async (_siteUrl: string, pagePath: string) => {
      const name = pagePath.split('/').pop() ?? '';
      if (options.failWriteFor?.has(name.replace('.aspx', ''))) {
        throw new Error(`cannot write ${name}`);
      }
      writtenPages.push(name);
    }),
    deleteFile: jest.fn(async (_siteUrl: string, pagePath: string) => {
      deletedPages.push(pagePath.split('/').pop() ?? '');
    }),
    publishPage: jest.fn(async () => undefined),
    getSiteIdentifiers: jest.fn(async () => undefined)
  } as unknown as SharePointPageService;

  const pageNormalizationService = {
    normalize: jest.fn((_siteUrl: string, raw: { pageName: string }) =>
      normalized(raw.pageName.replace('.aspx', '')))
  } as unknown as PageNormalizationService;

  const assetMigrationService = {
    migrateAssets: jest.fn(async () => [])
  } as unknown as AssetMigrationService;

  const orchestrator = new PageMigrationOrchestrator(
    sharePointPageService,
    pageNormalizationService,
    assetMigrationService,
    new PageTransformService(),
    new Logger()
  );

  return { orchestrator, createdPages, writtenPages, deletedPages };
};

describe('migratePages', () => {
  it('migrates every selected page and reports each one', async () => {
    const harness = buildHarness();
    const result = await harness.orchestrator.migratePages(
      context,
      [item('a'), item('b')],
      new MigrationCancellationToken()
    );

    expect(result.cancelled).toBe(false);
    expect(result.reports).toHaveLength(2);
    expect(result.reports.every((report) => report.finalStatus === 'Completed')).toBe(true);
    expect(harness.writtenPages).toHaveLength(2);
  });

  it('continues the batch when one page cannot be prepared', async () => {
    const harness = buildHarness({ failLoadFor: new Set(['b']) });

    const result = await harness.orchestrator.migratePages(
      context,
      [item('a'), item('b'), item('c')],
      new MigrationCancellationToken()
    );

    expect(harness.writtenPages).toEqual(['a.aspx', 'c.aspx']);
    expect(result.reports).toHaveLength(3);

    const failed = result.reports.filter((report) => report.finalStatus === 'Failed');
    expect(failed).toHaveLength(1);
    expect(failed[0].pageName).toBe('b.aspx');
    expect(failed[0].errors[0]).toContain('cannot read b');
  });

  it('rolls back a shell it created when the canvas write fails', async () => {
    const harness = buildHarness({ failWriteFor: new Set(['b']) });

    const result = await harness.orchestrator.migratePages(
      context,
      [item('a'), item('b')],
      new MigrationCancellationToken()
    );

    expect(harness.deletedPages).toEqual(['b.aspx']);
    expect(result.reports.find((r) => r.pageName === 'b.aspx')?.finalStatus).toBe('Failed');
    expect(result.reports.find((r) => r.pageName === 'a.aspx')?.finalStatus).toBe('Completed');
  });

  it('reports a cancelled run without writing further pages', async () => {
    const harness = buildHarness();
    const token = new MigrationCancellationToken();
    token.cancel();

    const result = await harness.orchestrator.migratePages(context, [item('a')], token);

    expect(result.cancelled).toBe(true);
    expect(harness.writtenPages).toHaveLength(0);
  });

  it('caches the normalized page between validation and migration', async () => {
    const harness = buildHarness();
    const pages = [item('a')];

    await harness.orchestrator.validatePages(context, pages, new MigrationCancellationToken());
    await harness.orchestrator.migratePages(context, pages, new MigrationCancellationToken());

    expect(harness.createdPages).toHaveLength(1);
  });
});
