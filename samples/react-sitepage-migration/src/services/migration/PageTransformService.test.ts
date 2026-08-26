import { AssetCopyResult } from '../../models/MigrationReport';
import { AssetReference, NormalizedPage } from '../../models/NormalizedPage';
import {
  applyRewrites,
  buildGuidMappings,
  buildSiteScopedMappings,
  PageTransformService
} from './PageTransformService';

const SOURCE = 'https://contoso.sharepoint.com/sites/source';
const TARGET = 'https://contoso.sharepoint.com/sites/target';

const asset = (fileName: string, relative: string): AssetReference => ({
  id: `id-${fileName}`,
  sourceUrl: relative,
  absoluteSourceUrl: `https://contoso.sharepoint.com${relative}`,
  sourceType: 'Image',
  fileName,
  discoveredFrom: 'CanvasContent1'
});

const page = (canvas: string, overrides: Partial<NormalizedPage> = {}): NormalizedPage => ({
  metadata: {
    pageId: '1',
    title: 'Home',
    pageName: 'Home.aspx',
    sourcePageUrl: `${SOURCE}/SitePages/Home.aspx`
  },
  rawCanvasContent: canvas,
  sections: [],
  assets: [],
  warnings: [],
  unsupportedControls: [],
  ...overrides
});

describe('buildAssetReplacementMap', () => {
  const service = new PageTransformService();

  it('matches results to assets by url rather than by array position', () => {
    const assets = [asset('a.png', '/sites/source/SiteAssets/a.png'), asset('b.png', '/sites/source/SiteAssets/b.png')];
    const results: AssetCopyResult[] = [
      { sourceUrl: assets[1].absoluteSourceUrl, targetUrl: `${TARGET}/SiteAssets/b.png`, fileName: 'b.png', status: 'Copied' },
      { sourceUrl: assets[0].absoluteSourceUrl, targetUrl: `${TARGET}/SiteAssets/a.png`, fileName: 'a.png', status: 'Copied' }
    ];

    const map = service.buildAssetReplacementMap(assets, results);

    expect(map.get(assets[0].absoluteSourceUrl)).toBe(`${TARGET}/SiteAssets/a.png`);
    expect(map.get(assets[1].absoluteSourceUrl)).toBe(`${TARGET}/SiteAssets/b.png`);
  });

  it('maps the relative form as well, because canvas markup often uses it', () => {
    const assets = [asset('a.png', '/sites/source/SiteAssets/a.png')];
    const map = service.buildAssetReplacementMap(assets, [
      { sourceUrl: assets[0].absoluteSourceUrl, targetUrl: `${TARGET}/SiteAssets/a.png`, fileName: 'a.png', status: 'Copied' }
    ]);

    expect(map.get('/sites/source/SiteAssets/a.png')).toBe(`${TARGET}/SiteAssets/a.png`);
  });

  it('ignores failed copies so their urls are left pointing at the source', () => {
    const assets = [asset('a.png', '/sites/source/SiteAssets/a.png')];
    const map = service.buildAssetReplacementMap(assets, [
      { sourceUrl: assets[0].absoluteSourceUrl, fileName: 'a.png', status: 'Failed', message: 'nope' }
    ]);

    expect(map.size).toBe(0);
  });
});

describe('transformPage', () => {
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset', () => {
    const assets = new Map([['/sites/source/SiteAssets/a.png', `${TARGET}/SiteAssets/a.png`]]);
    const result = service.transformPage(
      page('<div><img src="/sites/source/SiteAssets/a.png" /></div>'),
      SOURCE, TARGET, assets, new Map()
    );

    expect(result.canvasContent1).toContain(`${TARGET}/SiteAssets/a.png`);
    expect(result.canvasContent1).not.toContain('/sites/source/SiteAssets/a.png');
  });

  it('prefers a page mapping over the blanket site mapping', () => {
    const pageMappings = new Map([
      [`${SOURCE}/SitePages/A.aspx`, `${TARGET}/SitePages/A-1.aspx`]
    ]);
    const result = service.transformPage(
      page(`<div><a href="${SOURCE}/SitePages/A.aspx">link</a></div>`),
      SOURCE, TARGET, new Map(), pageMappings
    );

    expect(result.canvasContent1).toContain(`${TARGET}/SitePages/A-1.aspx`);
  });

  it('rewrites urls inside web part JSON without corrupting the payload', () => {
    const webPartData = JSON.stringify({
      id: 'x',
      properties: { imageUrl: '/sites/source/SiteAssets/a.png', title: 'Keep me' }
    });
    const assets = new Map([['/sites/source/SiteAssets/a.png', `${TARGET}/SiteAssets/a.png`]]);

    const result = service.transformPage(
      page(`<div data-sp-webpartdata='${webPartData}'></div>`),
      SOURCE, TARGET, assets, new Map()
    );

    const attribute = /data-sp-webpartdata="([^"]*)"/.exec(result.canvasContent1)?.[1] ?? '';
    const decoded = attribute.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    const parsed = JSON.parse(decoded) as { properties: { imageUrl: string; title: string } };

    expect(parsed.properties.imageUrl).toBe(`${TARGET}/SiteAssets/a.png`);
    expect(parsed.properties.title).toBe('Keep me');
  });

  it('rewrites banner and thumbnail metadata', () => {
    const assets = new Map([['/sites/source/SiteAssets/banner.png', `${TARGET}/SiteAssets/banner.png`]]);
    const result = service.transformPage(
      page('<div></div>', {
        metadata: {
          pageId: '1', title: 'Home', pageName: 'Home.aspx',
          sourcePageUrl: `${SOURCE}/SitePages/Home.aspx`,
          bannerImageUrl: '/sites/source/SiteAssets/banner.png'
        }
      }),
      SOURCE, TARGET, assets, new Map()
    );

    expect(result.bannerImageUrl).toBe(`${TARGET}/SiteAssets/banner.png`);
  });

  it('returns the canvas unchanged when there is nothing to replace', () => {
    const canvas = '<div><p>No links here</p></div>';
    const result = service.transformPage(page(canvas), SOURCE, SOURCE, new Map(), new Map());
    expect(result.canvasContent1).toContain('No links here');
  });

  it('handles empty canvas content', () => {
    const result = service.transformPage(page(''), SOURCE, TARGET, new Map(), new Map());
    expect(result.canvasContent1).toBe('');
  });
});

describe('buildSiteScopedMappings', () => {
  const TENANT = 'https://contoso.sharepoint.com';
  const rewrite = (value: string, source: string, target: string): string => {
    const { substitutions, prefixes } = buildSiteScopedMappings(source, target);
    return applyRewrites(value, substitutions, prefixes);
  };

  it('does not rewrite links to other sites when the source is the root site', () => {
    const dest = `${TENANT}/sites/dest`;

    expect(rewrite(`${TENANT}/sites/hr/SitePages/Policy.aspx`, TENANT, dest))
      .toBe(`${TENANT}/sites/hr/SitePages/Policy.aspx`);
    expect(rewrite(`${TENANT}/_layouts/15/viewlsts.aspx`, TENANT, dest))
      .toBe(`${TENANT}/_layouts/15/viewlsts.aspx`);
    expect(rewrite(`${TENANT}/SitePages/Onboarding.aspx`, TENANT, dest))
      .toBe(`${dest}/SitePages/Onboarding.aspx`);
  });

  it('anchors server-relative rewrites to the start of the value', () => {
    const dest = `${TENANT}/sites/dest`;

    expect(rewrite('/SitePages/Onboarding.aspx', TENANT, dest)).toBe('/sites/dest/SitePages/Onboarding.aspx');
    expect(rewrite('/sites/hr/SitePages/Policy.aspx', TENANT, dest)).toBe('/sites/hr/SitePages/Policy.aspx');
  });

  it('rewrites both absolute and server-relative library references', () => {
    const src = `${TENANT}/sites/src`;
    const dest = `${TENANT}/sites/dest`;

    expect(rewrite('/sites/src/SiteAssets/a.png', src, dest)).toBe('/sites/dest/SiteAssets/a.png');
    expect(rewrite(`${src}/SitePages/A.aspx`, src, dest)).toBe(`${dest}/SitePages/A.aspx`);
  });

  it('does not rewrite a sibling site whose name shares a prefix', () => {
    expect(rewrite('/sites/src2/SitePages/A.aspx', `${TENANT}/sites/src`, `${TENANT}/sites/dest`))
      .toBe('/sites/src2/SitePages/A.aspx');
  });

  it('leaves libraries that do not travel with the page alone', () => {
    expect(rewrite('/sites/src/Shared Documents/report.docx', `${TENANT}/sites/src`, `${TENANT}/sites/dest`))
      .toBe('/sites/src/Shared Documents/report.docx');
  });

  it('produces nothing when source and destination are the same site', () => {
    const { substitutions, prefixes } = buildSiteScopedMappings(`${TENANT}/sites/a`, `${TENANT}/sites/a/`);
    expect(substitutions.size).toBe(0);
    expect(prefixes.size).toBe(0);
  });
});

describe('buildGuidMappings', () => {
  const source = { siteId: 'AAAAAAAA-1111-1111-1111-111111111111', webId: 'BBBBBBBB-1111-1111-1111-111111111111', siteAssetsListId: 'CCCCCCCC-1111-1111-1111-111111111111' };
  const target = { siteId: 'aaaaaaaa-2222-2222-2222-222222222222', webId: 'bbbbbbbb-2222-2222-2222-222222222222', siteAssetsListId: 'cccccccc-2222-2222-2222-222222222222' };

  it('maps site, web, library and per-file identifiers', () => {
    const map = buildGuidMappings(source, target, [
      { sourceUrl: 'a', fileName: 'a.png', status: 'Copied',
        sourceUniqueId: 'DDDDDDDD-1111-1111-1111-111111111111',
        targetUniqueId: 'dddddddd-2222-2222-2222-222222222222' }
    ]);

    expect(map.get(source.siteId.toLowerCase())).toBe(target.siteId);
    expect(map.get(source.webId.toLowerCase())).toBe(target.webId);
    expect(map.get(source.siteAssetsListId.toLowerCase())).toBe(target.siteAssetsListId);
    expect(map.get('dddddddd-1111-1111-1111-111111111111')).toBe('dddddddd-2222-2222-2222-222222222222');
  });

  it('ignores assets that failed to copy', () => {
    const map = buildGuidMappings(source, target, [
      { sourceUrl: 'a', fileName: 'a.png', status: 'Failed', sourceUniqueId: 'DDDDDDDD-1111-1111-1111-111111111111' }
    ]);
    expect(map.has('dddddddd-1111-1111-1111-111111111111')).toBe(false);
  });

  it('is empty when identifiers cannot be resolved', () => {
    expect(buildGuidMappings(undefined, undefined, []).size).toBe(0);
  });
});

describe('transformPage web part identifiers', () => {
  const service = new PageTransformService();

  it('repoints the GUIDs an image web part resolves against', () => {
    const webPartData = JSON.stringify({
      id: 'd1d91016-032f-456d-98a4-721247c305e8',
      properties: {
        imageSourceType: 2,
        siteId: 'AAAAAAAA-1111-1111-1111-111111111111',
        webId: 'BBBBBBBB-1111-1111-1111-111111111111',
        listId: '{CCCCCCCC-1111-1111-1111-111111111111}',
        uniqueId: 'DDDDDDDD-1111-1111-1111-111111111111',
        imageUrl: '/sites/source/SiteAssets/a.png'
      }
    });

    const guidMap = new Map([
      ['aaaaaaaa-1111-1111-1111-111111111111', 'aaaaaaaa-2222-2222-2222-222222222222'],
      ['bbbbbbbb-1111-1111-1111-111111111111', 'bbbbbbbb-2222-2222-2222-222222222222'],
      ['cccccccc-1111-1111-1111-111111111111', 'cccccccc-2222-2222-2222-222222222222'],
      ['dddddddd-1111-1111-1111-111111111111', 'dddddddd-2222-2222-2222-222222222222']
    ]);

    const result = service.transformPage(
      page(`<div data-sp-webpartdata='${webPartData}'></div>`),
      SOURCE, TARGET,
      new Map([['/sites/source/SiteAssets/a.png', `${TARGET}/SiteAssets/a.png`]]),
      new Map(),
      guidMap
    );

    const attribute = /data-sp-webpartdata="([^"]*)"/.exec(result.canvasContent1)?.[1] ?? '';
    const parsed = JSON.parse(attribute.replace(/&quot;/g, '"').replace(/&amp;/g, '&')) as {
      properties: Record<string, string | number>;
    };

    expect(parsed.properties.siteId).toBe('aaaaaaaa-2222-2222-2222-222222222222');
    expect(parsed.properties.webId).toBe('bbbbbbbb-2222-2222-2222-222222222222');
    expect(parsed.properties.uniqueId).toBe('dddddddd-2222-2222-2222-222222222222');
    expect(parsed.properties.imageUrl).toBe(`${TARGET}/SiteAssets/a.png`);
    expect(parsed.properties.listId).toBe('{cccccccc-2222-2222-2222-222222222222}');
    expect(parsed.properties.imageSourceType).toBe(2);
  });

  it('leaves unrelated GUIDs alone', () => {
    const webPartData = JSON.stringify({ id: 'x', properties: { instanceId: 'EEEEEEEE-9999-9999-9999-999999999999' } });
    const result = service.transformPage(
      page(`<div data-sp-webpartdata='${webPartData}'></div>`),
      SOURCE, TARGET, new Map(), new Map(),
      new Map([['aaaaaaaa-1111-1111-1111-111111111111', 'aaaaaaaa-2222-2222-2222-222222222222']])
    );

    expect(result.canvasContent1).toContain('EEEEEEEE-9999-9999-9999-999999999999');
  });
});

describe('carried field rewriting', () => {
  const service = new PageTransformService();

  it('repoints what a repost page reposts', () => {
    const guidMap = new Map([
      ['11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999999']
    ]);

    const result = service.transformPage(
      page('<div></div>', {
        metadata: {
          pageId: '1', title: 'Repost', pageName: 'Repost.aspx',
          sourcePageUrl: `${SOURCE}/SitePages/Repost.aspx`,
          carriedFields: {
            _OriginalSourceUrl: `${SOURCE}/SitePages/Target.aspx`,
            _OriginalSourceSiteId: '11111111-1111-1111-1111-111111111111',
            _CommentsDisabled: true
          }
        }
      }),
      SOURCE, TARGET, new Map(), new Map(), guidMap
    );

    expect(result.carriedFields?._OriginalSourceUrl).toBe(`${TARGET}/SitePages/Target.aspx`);
    expect(result.carriedFields?._OriginalSourceSiteId).toBe('99999999-9999-9999-9999-999999999999');
  });

  it('leaves non-string carried values untouched', () => {
    const result = service.transformPage(
      page('<div></div>', {
        metadata: {
          pageId: '1', title: 'X', pageName: 'X.aspx', sourcePageUrl: `${SOURCE}/SitePages/X.aspx`,
          carriedFields: { _CommentsDisabled: true, Ordering: 7, ReviewDate: null }
        }
      }),
      SOURCE, TARGET, new Map(), new Map()
    );

    expect(result.carriedFields).toEqual({ _CommentsDisabled: true, Ordering: 7, ReviewDate: null });
  });

  it('passes through a page with no carried fields', () => {
    const result = service.transformPage(page('<div></div>'), SOURCE, TARGET, new Map(), new Map());
    expect(result.carriedFields).toBeUndefined();
  });
});
