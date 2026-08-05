import { RawPageData } from '../sharepoint/SharePointPageService';
import { assetUrlPattern, migratableExtensions, PageNormalizationService } from './PageNormalizationService';

const SOURCE = 'https://contoso.sharepoint.com/sites/source';

const rawPage = (overrides: Partial<RawPageData> = {}): RawPageData => ({
  pageId: '1',
  title: 'Home',
  pageName: 'Home.aspx',
  pageUrl: `${SOURCE}/SitePages/Home.aspx`,
  pagePath: '/sites/source/SitePages/Home.aspx',
  canvasContent1: '',
  ...overrides
});

const canvasControl = (position: object, webPartData?: object): string => {
  const control = JSON.stringify({ id: `c-${Math.random().toString(36).slice(2)}`, position });
  const wpAttr = webPartData ? ` data-sp-webpartdata='${JSON.stringify(webPartData)}'` : '';
  return `<div data-sp-canvascontrol='${control}'${wpAttr}></div>`;
};

describe('asset extension configuration', () => {
  it('keeps the extension set and the url pattern in agreement', () => {
    const patternExtensions = /\(\?:([a-z|]+)\)/.exec(assetUrlPattern.source)?.[1].split('|') ?? [];

    expect(patternExtensions.length).toBeGreaterThan(0);
    expect([...patternExtensions].sort()).toEqual([...migratableExtensions].sort());
  });
});

describe('asset discovery', () => {
  const service = new PageNormalizationService();

  it('collects images referenced from the source site', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: '<div><img src="/sites/source/SiteAssets/a.png" /></div>'
    }));

    expect(page.assets).toHaveLength(1);
    expect(page.assets[0].fileName).toBe('a.png');
  });

  it('rejects a look-alike host that shares the origin as a prefix', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: '<div><img src="https://contoso.sharepoint.com.example.net/steal.png" /></div>'
    }));

    expect(page.assets).toHaveLength(0);
  });

  it('rejects assets hosted on an unrelated origin', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: '<div><img src="https://cdn.example.com/a.png" /></div>'
    }));

    expect(page.assets).toHaveLength(0);
  });

  it('does not treat data uris as migratable assets', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: '<div><img src="data:image/png;base64,AAAA" /></div>'
    }));

    expect(page.assets).toHaveLength(0);
  });

  it('deduplicates the same asset referenced several ways', () => {
    const page = service.normalize(SOURCE, rawPage({
      bannerImageUrl: '/sites/source/SiteAssets/a.png',
      canvasContent1: '<div><img src="/sites/source/SiteAssets/a.png" />'
        + '<img src="https://contoso.sharepoint.com/sites/source/SiteAssets/a.png" /></div>'
    }));

    expect(page.assets).toHaveLength(1);
  });

  it('decodes file names from encoded urls', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: '<div><img src="/sites/source/SiteAssets/my%20image.png" /></div>'
    }));

    expect(page.assets[0].fileName).toBe('my image.png');
  });

  it('finds urls inside web part JSON', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: canvasControl(
        { sectionIndex: 0, zoneIndex: 0, controlIndex: 0 },
        { id: 'wp', properties: { imageUrl: '/sites/source/SiteAssets/inside.png' } }
      )
    }));

    expect(page.assets.some((a) => a.fileName === 'inside.png')).toBe(true);
  });
});

describe('control parsing', () => {
  const service = new PageNormalizationService();

  it('warns when the canvas is empty', () => {
    const page = service.normalize(SOURCE, rawPage({ canvasContent1: '' }));
    expect(page.warnings).toHaveLength(1);
    expect(page.warnings[0].code).toBe('Canvas.Empty');
  });

  it('flags an unknown web part as unsupported and records its configuration', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: canvasControl(
        { sectionIndex: 0, zoneIndex: 0, controlIndex: 0 },
        { id: '00000000-0000-0000-0000-000000000000', properties: { setting: 42 } }
      )
    }));

    expect(page.unsupportedControls).toHaveLength(1);
    expect(page.unsupportedControls[0].serializedConfiguration).toContain('42');
    expect(page.warnings.some((w) => w.severity === 'Error')).toBe(true);
  });

  it('treats a known first-party web part as fully supported', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: canvasControl(
        { sectionIndex: 0, zoneIndex: 0, controlIndex: 0 },
        { id: 'd1d91016-032f-456d-98a4-721247c305e8' }
      )
    }));

    expect(page.unsupportedControls).toHaveLength(0);
    expect(page.warnings).toHaveLength(0);
  });

  it('honours tenant compatibility overrides', () => {
    const overridden = new PageNormalizationService([{
      id: 'F92BF067-BC19-489E-A556-7FE95F508720',
      title: 'List (provisioned separately)',
      compatibility: 'FullySupported',
      notes: 'Our destination sites carry the same lists.'
    }]);

    const listWebPart = canvasControl(
      { sectionIndex: 0, zoneIndex: 0, controlIndex: 0 },
      { id: 'f92bf067-bc19-489e-a556-7fe95f508720' }
    );

    expect(service.normalize(SOURCE, rawPage({ canvasContent1: listWebPart })).unsupportedControls)
      .toHaveLength(1);

    expect(overridden.normalize(SOURCE, rawPage({ canvasContent1: listWebPart })).unsupportedControls)
      .toHaveLength(0);
  });

  it('survives malformed control and web part JSON', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: `<div data-sp-canvascontrol='{not json' data-sp-webpartdata='{"broken'></div>`
    }));

    expect(page.sections.length).toBeGreaterThanOrEqual(0);
    expect(page.unsupportedControls).toHaveLength(0);
  });
});

describe('section grouping', () => {
  const service = new PageNormalizationService();

  it('groups controls into ordered sections and columns', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: [
        canvasControl({ sectionIndex: 1, zoneIndex: 0, controlIndex: 1 }),
        canvasControl({ sectionIndex: 0, zoneIndex: 1, controlIndex: 0 }),
        canvasControl({ sectionIndex: 0, zoneIndex: 0, controlIndex: 1 }),
        canvasControl({ sectionIndex: 0, zoneIndex: 0, controlIndex: 0 })
      ].join('')
    }));

    expect(page.sections.map((s) => s.index)).toEqual([0, 1]);
    expect(page.sections[0].columns.map((c) => c.index)).toEqual([0, 1]);
    expect(page.sections[0].columns[0].controls.map((c) => c.position.controlIndex)).toEqual([0, 1]);
  });

  it('takes column factors from the client-side page model when available', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: canvasControl({ sectionIndex: 0, zoneIndex: 0, controlIndex: 0 }),
      clientsidePage: { sections: [{ emphasis: 2, columns: [{ factor: 8 }] }] } as never
    }));

    expect(page.sections[0].columns[0].factor).toBe(8);
    expect(page.sections[0].emphasis).toBe(2);
  });

  it('defaults the column factor to full width when no model is available', () => {
    const page = service.normalize(SOURCE, rawPage({
      canvasContent1: canvasControl({ sectionIndex: 0, zoneIndex: 0, controlIndex: 0 })
    }));

    expect(page.sections[0].columns[0].factor).toBe(12);
  });
});
