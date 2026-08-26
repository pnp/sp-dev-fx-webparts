import { MigrationContext } from '../../models/OperationalTypes';
import { PageInventoryItem } from '../../models/PageInventoryItem';
import { MigrationCancellationToken } from '../../utilities/CancellationToken';
import { Logger } from '../logging/Logger';
import { FakeOptions, FakeSharePointPageService } from '../sharepoint/FakeSharePointPageService';
import { AssetMigrationService } from './AssetMigrationService';
import { PageMigrationOrchestrator } from './PageMigrationOrchestrator';
import { PageNormalizationService } from './PageNormalizationService';
import { PageTransformService } from './PageTransformService';

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
  persistence: { persistReports: false, auditListName: 'Audit', logListName: 'Log' },
  ...overrides
});

const item = (name: string): PageInventoryItem => ({
  key: name,
  id: name,
  pageId: name,
  title: name,
  name: `${name}.aspx`,
  webUrl: `${SOURCE}/SitePages/${name}.aspx`,
  authorName: 'Someone',
  createdDateTime: '2026-01-01T00:00:00.000Z',
  lastModifiedDateTime: '2026-01-01T00:00:00.000Z',
  layout: 'Article',
  promotionState: 'page',
  migrationStatus: 'NotStarted',
  warningCount: 0
});

interface Harness {
  readonly sharePoint: FakeSharePointPageService;
  readonly orchestrator: PageMigrationOrchestrator;
}

const buildHarness = (options: FakeOptions = {}): Harness => {
  const sharePoint = new FakeSharePointPageService(options);
  const logger = new Logger();

  return {
    sharePoint,
    orchestrator: new PageMigrationOrchestrator(
      sharePoint,
      new PageNormalizationService(),
      new AssetMigrationService(sharePoint, logger),
      new PageTransformService(),
      logger
    )
  };
};

const canvasWithImage = (imagePath: string): string => `<div><img src="${imagePath}" /></div>`;

describe('migration pipeline', () => {
  it('copies a page and repoints its image at the target site', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      title: 'Home',
      canvasContent1: canvasWithImage('/sites/source/SiteAssets/logo.png')
    });
    await harness.sharePoint.uploadAsset(SOURCE, '/sites/source/SiteAssets', 'logo.png', 'bytes', true);

    const result = await harness.orchestrator.migratePages(
      context(), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports).toHaveLength(1);
    expect(result.reports[0].finalStatus).toBe('Completed');

    const written = harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx');
    expect(written?.canvasContent1).toContain(`${TARGET}/SiteAssets/SitePages/`);
    expect(written?.canvasContent1).not.toContain('/sites/source/');
  });

  it('puts copied images under Site Assets, not in the pages library', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: canvasWithImage('/sites/source/SiteAssets/logo.png')
    });

    await harness.orchestrator.migratePages(context(), [item('Home')], new MigrationCancellationToken());

    const uploaded = [...harness.sharePoint.files.keys()]
      .filter((path) => path.endsWith('logo.png') && path.startsWith('/sites/target'));

    expect(uploaded).toHaveLength(1);
    expect(uploaded[0]).toContain('/sites/target/siteassets/sitepages/');
  });

  it('migrates the page even when its assets cannot be copied', async () => {
    const harness = buildHarness({ hasSiteAssets: false });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: canvasWithImage('/sites/source/SiteAssets/logo.png')
    });

    const result = await harness.orchestrator.migratePages(
      context(), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('CompletedWithWarnings');
    expect(result.reports[0].errors.join(' ')).toContain('SiteAssets');
    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.canvasContent1)
      .toContain('<img');
  });

  it('deletes the shell it created when the canvas never lands', async () => {
    const harness = buildHarness({
      silentlyDropCanvasFor: new Set(['/sites/target/SitePages/Home.aspx'])
    });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: '<div>content</div>'
    });

    const result = await harness.orchestrator.migratePages(
      context(), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Failed');
    expect(harness.sharePoint.deleted).toContain('/sites/target/SitePages/Home.aspx');
    expect(harness.sharePoint.files.has('/sites/target/sitepages/home.aspx')).toBe(false);
  });

  it('keeps a pre-existing target page when the canvas write fails', async () => {
    const harness = buildHarness({
      rejectCanvasFor: new Set(['/sites/target/SitePages/Home.aspx'])
    });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>new</div>' });
    harness.sharePoint.addSourcePage('/sites/target/SitePages/Home.aspx', { canvasContent1: '<div>existing</div>' });

    const result = await harness.orchestrator.migratePages(
      context({ overwriteMode: 'Replace' }), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Failed');
    expect(harness.sharePoint.deleted).toHaveLength(0);
    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.canvasContent1)
      .toBe('<div>existing</div>');
  });

  it('rewrites cross-page links to the renamed destination', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/A.aspx', {
      canvasContent1: `<div><a href="${SOURCE}/SitePages/B.aspx">B</a></div>`
    });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/B.aspx', { canvasContent1: '<div>B</div>' });
    harness.sharePoint.addSourcePage('/sites/target/SitePages/B.aspx', { canvasContent1: '<div>taken</div>' });

    await harness.orchestrator.migratePages(
      context(), [item('A'), item('B')], new MigrationCancellationToken()
    );

    const written = harness.sharePoint.pages.get('/sites/target/sitepages/a.aspx');
    expect(written?.canvasContent1).toContain(`${TARGET}/SitePages/B-1.aspx`);
  });

  it('does not report a skipped page as migrated', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>new</div>' });
    harness.sharePoint.addSourcePage('/sites/target/SitePages/Home.aspx', { canvasContent1: '<div>existing</div>' });

    const result = await harness.orchestrator.migratePages(
      context({ overwriteMode: 'Skip' }), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Skipped');
    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.canvasContent1)
      .toBe('<div>existing</div>');
  });

  it('survives a site whose identifiers cannot be read', async () => {
    const harness = buildHarness({ identifiers: {} });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>x</div>' });

    const result = await harness.orchestrator.migratePages(
      context(), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Completed');
  });

  it('rewrites the embedded site and web ids when both sites are readable', async () => {
    const harness = buildHarness({
      identifiers: {
        [SOURCE]: { siteId: 'aaaaaaaa-0000-0000-0000-000000000001', webId: 'aaaaaaaa-0000-0000-0000-000000000002' },
        [TARGET]: { siteId: 'bbbbbbbb-0000-0000-0000-000000000001', webId: 'bbbbbbbb-0000-0000-0000-000000000002' }
      }
    });
    const webPartData = JSON.stringify({
      id: 'x',
      properties: { siteId: 'aaaaaaaa-0000-0000-0000-000000000001', webId: 'aaaaaaaa-0000-0000-0000-000000000002' }
    });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: `<div data-sp-webpartdata='${webPartData}'></div>`
    });

    await harness.orchestrator.migratePages(context(), [item('Home')], new MigrationCancellationToken());

    const written = harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.canvasContent1 ?? '';
    expect(written).toContain('bbbbbbbb-0000-0000-0000-000000000001');
    expect(written).not.toContain('aaaaaaaa-0000-0000-0000-000000000001');
  });

  it('keeps a news post a news post', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/News.aspx', {
      canvasContent1: '<div>news</div>',
      promotedState: '2',
      firstPublishedDate: '2025-03-04T10:00:00Z'
    });

    await harness.orchestrator.migratePages(context(), [item('News')], new MigrationCancellationToken());

    const written = harness.sharePoint.pages.get('/sites/target/sitepages/news.aspx');
    expect(written?.promotedState).toBe('2');
    expect(written?.firstPublishedDate).toBe('2025-03-04T10:00:00Z');
  });

  it('publishes only when the operator asked for it', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>x</div>' });

    await harness.orchestrator.migratePages(context(), [item('Home')], new MigrationCancellationToken());
    expect(harness.sharePoint.published).toHaveLength(0);

    const publishing = buildHarness();
    publishing.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>x</div>' });
    await publishing.orchestrator.migratePages(
      context({ publishOnComplete: true }), [item('Home')], new MigrationCancellationToken()
    );
    expect(publishing.sharePoint.published).toEqual(['/sites/target/SitePages/Home.aspx']);
  });

  it('reuses an already copied asset instead of downloading it again', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: canvasWithImage('/sites/source/SiteAssets/logo.png')
    });

    await harness.orchestrator.migratePages(context(), [item('Home')], new MigrationCancellationToken());
    const afterFirstRun = harness.sharePoint.files.size;

    harness.orchestrator.clearCache();
    const second = await harness.orchestrator.migratePages(
      context({ overwriteMode: 'Rename' }), [item('Home')], new MigrationCancellationToken()
    );

    expect(second.reports[0].assets[0].status).toBe('Reused');
    expect(harness.sharePoint.files.size).toBe(afterFirstRun + 1);
  });

  it('writes nothing at all during a dry run', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: canvasWithImage('/sites/source/SiteAssets/logo.png')
    });
    const before = new Set(harness.sharePoint.files.keys());

    const result = await harness.orchestrator.migratePages(
      context({ dryRun: true, publishOnComplete: true }), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Planned');
    expect([...harness.sharePoint.files.keys()]).toEqual([...before]);
    expect(harness.sharePoint.pages.has('/sites/target/sitepages/home.aspx')).toBe(false);
    expect(harness.sharePoint.published).toHaveLength(0);
    expect(harness.sharePoint.deleted).toHaveLength(0);
  });

  it('reports where a dry run would put each page and asset', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: canvasWithImage('/sites/source/SiteAssets/logo.png')
    });

    const result = await harness.orchestrator.migratePages(
      context({ dryRun: true }), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].targetPageUrl).toBe(`${TARGET}/SitePages/Home.aspx`);
    expect(result.reports[0].assets[0].status).toBe('Planned');
    expect(result.reports[0].assets[0].targetUrl).toContain(`${TARGET}/SiteAssets/SitePages/`);
  });

  it('plans the renamed destination a real run would use', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>x</div>' });
    harness.sharePoint.addSourcePage('/sites/target/SitePages/Home.aspx', { canvasContent1: '<div>taken</div>' });

    const result = await harness.orchestrator.migratePages(
      context({ dryRun: true }), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].pageName).toBe('Home-1.aspx');
    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.canvasContent1)
      .toBe('<div>taken</div>');
  });

  it('surfaces the same warnings a real run would produce', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Empty.aspx', { canvasContent1: '' });

    const planned = await harness.orchestrator.migratePages(
      context({ dryRun: true }), [item('Empty')], new MigrationCancellationToken()
    );
    const real = await harness.orchestrator.migratePages(
      context(), [item('Empty')], new MigrationCancellationToken()
    );

    expect(planned.reports[0].warnings.map((warning) => warning.code))
      .toEqual(real.reports[0].warnings.map((warning) => warning.code));
    expect(planned.reports[0].warnings.length).toBeGreaterThan(0);
  });

  it('carries the comments setting to the destination', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: '<div>x</div>',
      carriedFields: { _CommentsDisabled: true }
    });

    await harness.orchestrator.migratePages(context(), [item('Home')], new MigrationCancellationToken());

    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.carriedFields)
      .toEqual({ _CommentsDisabled: true });
  });

  it('repoints a repost page at the migrated copy of its target', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Repost.aspx', {
      canvasContent1: '<div></div>',
      carriedFields: { _OriginalSourceUrl: `${SOURCE}/SitePages/Target.aspx` }
    });

    await harness.orchestrator.migratePages(context(), [item('Repost')], new MigrationCancellationToken());

    expect(harness.sharePoint.pages.get('/sites/target/sitepages/repost.aspx')?.carriedFields)
      .toEqual({ _OriginalSourceUrl: `${TARGET}/SitePages/Target.aspx` });
  });

  it('drops a carried value the destination has no column for', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: '<div>x</div>',
      carriedFields: { _CommentsDisabled: true, Department: 'Finance' }
    });

    const result = await harness.orchestrator.migratePages(
      context(), [item('Home')], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Completed');
    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.carriedFields)
      .toEqual({ _CommentsDisabled: true });
  });

  it('carries a custom column the destination also defines', async () => {
    const harness = buildHarness();
    harness.sharePoint.destinationFields.add('department');
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', {
      canvasContent1: '<div>x</div>',
      carriedFields: { Department: 'Finance' }
    });

    await harness.orchestrator.migratePages(context(), [item('Home')], new MigrationCancellationToken());

    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.carriedFields)
      .toEqual({ Department: 'Finance' });
  });

  it('keeps a page template in the Templates folder', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Templates/Base.aspx', {
      canvasContent1: '<div>template</div>'
    });

    const template = { ...item('Base'), webUrl: `${SOURCE}/SitePages/Templates/Base.aspx`, isTemplate: true };
    const result = await harness.orchestrator.migratePages(
      context(), [template], new MigrationCancellationToken()
    );

    expect(result.reports[0].finalStatus).toBe('Completed');
    expect(harness.sharePoint.pages.has('/sites/target/sitepages/templates/base.aspx')).toBe(true);
    expect(harness.sharePoint.pages.has('/sites/target/sitepages/base.aspx')).toBe(false);
  });

  it('keeps pages with the same name in different folders apart', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Home.aspx', { canvasContent1: '<div>root</div>' });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/Archive/Home.aspx', { canvasContent1: '<div>archived</div>' });

    await harness.orchestrator.migratePages(
      context(),
      [item('Home'), { ...item('Archived'), webUrl: `${SOURCE}/SitePages/Archive/Home.aspx` }],
      new MigrationCancellationToken()
    );

    expect(harness.sharePoint.pages.get('/sites/target/sitepages/home.aspx')?.canvasContent1)
      .toBe('<div>root</div>');
    expect(harness.sharePoint.pages.get('/sites/target/sitepages/archive/home.aspx')?.canvasContent1)
      .toBe('<div>archived</div>');
  });

  it('continues the batch when one source page cannot be read', async () => {
    const harness = buildHarness();
    harness.sharePoint.addSourcePage('/sites/source/SitePages/A.aspx', { canvasContent1: '<div>a</div>' });
    harness.sharePoint.addSourcePage('/sites/source/SitePages/C.aspx', { canvasContent1: '<div>c</div>' });

    const result = await harness.orchestrator.migratePages(
      context(), [item('A'), item('B'), item('C')], new MigrationCancellationToken()
    );

    expect(result.reports).toHaveLength(3);
    expect(result.reports.filter((report) => report.finalStatus === 'Completed')).toHaveLength(2);
    expect(harness.sharePoint.pages.has('/sites/target/sitepages/c.aspx')).toBe(true);
  });
});
