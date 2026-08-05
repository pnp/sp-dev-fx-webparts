import {
  ensureAbsoluteUrl,
  isSameOrigin,
  isSharePointHost,
  isSharePointUrl,
  normalizePageName,
  odataPathLiteral,
  odataStringLiteral,
  replaceAllUrls,
  sanitizeFileName,
  sanitizeFolderName,
  sitePagesPath,
  toAbsoluteUrl,
  toDecodedServerRelativePath,
  toServerRelativePath,
  toSitePath,
  sitePagesSubfolder
} from './UrlUtilities';

describe('toDecodedServerRelativePath', () => {
  it('decodes a percent-encoded path exactly once', () => {
    expect(toDecodedServerRelativePath('https://contoso.sharepoint.com/sites/a/SitePages/Company%20News.aspx'))
      .toBe('/sites/a/SitePages/Company News.aspx');
  });

  it('handles non-ASCII page names', () => {
    expect(toDecodedServerRelativePath('https://contoso.sharepoint.com/sites/a/SitePages/Nyheter%20p%C3%A5%20svenska.aspx'))
      .toBe('/sites/a/SitePages/Nyheter på svenska.aspx');
  });

  it('falls back to the raw pathname when it is not valid encoding', () => {
    expect(toDecodedServerRelativePath('https://contoso.sharepoint.com/sites/a/100%.aspx'))
      .toBe('/sites/a/100%.aspx');
  });
});

describe('odataPathLiteral', () => {
  it('leaves path separators literal', () => {
    expect(odataPathLiteral('/SitePages/test.aspx')).toBe("'/SitePages/test.aspx'");
    expect(odataPathLiteral('/sites/a/SitePages/Home.aspx')).toBe("'/sites/a/SitePages/Home.aspx'");
    expect(odataPathLiteral('/SitePages/sv/DepartmentHome.aspx')).toBe("'/SitePages/sv/DepartmentHome.aspx'");
  });

  it('never emits an encoded slash', () => {
    expect(odataPathLiteral('/a/b/c/d.aspx')).not.toMatch(/%2f/i);
  });

  it('encodes parentheses so they cannot close the function call', () => {
    const literal = odataPathLiteral('/SitePages/Page(14).aspx');
    expect(literal).toBe("'/SitePages/Page%2814%29.aspx'");
    expect(literal.slice(1, -1)).not.toMatch(/[()]/);
  });

  it('encodes spaces and non-ASCII characters', () => {
    expect(odataPathLiteral('/SitePages/Company News.aspx')).toBe("'/SitePages/Company%20News.aspx'");
    expect(odataPathLiteral('/SitePages/Nyheter på svenska.aspx'))
      .toBe("'/SitePages/Nyheter%20p%C3%A5%20svenska.aspx'");
  });

  it('doubles single quotes so the literal cannot be terminated early', () => {
    const literal = odataPathLiteral("/sites/a/it's.aspx");
    expect(literal).toBe("'/sites/a/it''s.aspx'");
  });

  it('round-trips a decoded page url into a usable literal', () => {
    const path = toDecodedServerRelativePath('https://c.sharepoint.com/SitePages/Company%20News.aspx');
    expect(odataPathLiteral(path)).toBe("'/SitePages/Company%20News.aspx'");
  });
});

describe('odataStringLiteral', () => {
  it('encodes every reserved character, including slashes', () => {
    expect(odataStringLiteral('a/b')).toBe("'a%2Fb'");
  });

  it('doubles single quotes', () => {
    expect(odataStringLiteral("it's")).toBe("'it''s'");
  });

  it('encodes parentheses', () => {
    expect(odataStringLiteral('Migrated (batch 3)')).toBe("'Migrated%20%28batch%203%29'");
  });
});

describe('isSameOrigin', () => {
  it('accepts an exact origin match', () => {
    expect(isSameOrigin('https://contoso.sharepoint.com/sites/a/img.png', 'https://contoso.sharepoint.com')).toBe(true);
  });

  it('rejects a look-alike host that merely shares a prefix', () => {
    expect(isSameOrigin('https://contoso.sharepoint.com.example.net/x.png', 'https://contoso.sharepoint.com')).toBe(false);
  });

  it('rejects a different scheme and unparsable input', () => {
    expect(isSameOrigin('http://contoso.sharepoint.com/x.png', 'https://contoso.sharepoint.com')).toBe(false);
    expect(isSameOrigin('not a url', 'https://contoso.sharepoint.com')).toBe(false);
  });
});

describe('isSharePointHost / isSharePointUrl', () => {
  it('accepts commercial and sovereign cloud hosts', () => {
    expect(isSharePointHost('contoso.sharepoint.com')).toBe(true);
    expect(isSharePointHost('contoso.sharepoint.us')).toBe(true);
    expect(isSharePointHost('contoso.sharepoint.de')).toBe(true);
    expect(isSharePointHost('contoso.sharepoint.cn')).toBe(true);
  });

  it('rejects look-alike hosts', () => {
    expect(isSharePointHost('sharepoint.com.example.net')).toBe(false);
    expect(isSharePointUrl('https://evil.com/sites/a')).toBe(false);
  });

  it('requires https', () => {
    expect(isSharePointUrl('http://contoso.sharepoint.com/sites/a')).toBe(false);
    expect(isSharePointUrl('https://contoso.sharepoint.com/sites/a')).toBe(true);
  });
});

describe('server-relative path helpers', () => {
  it('includes the site path so paths resolve inside the site, not the root', () => {
    expect(toSitePath('https://contoso.sharepoint.com/sites/team/')).toBe('/sites/team');
    expect(toServerRelativePath('https://contoso.sharepoint.com/sites/team', 'SiteAssets', 'PageMigration'))
      .toBe('/sites/team/SiteAssets/PageMigration');
  });

  it('collapses duplicate separators', () => {
    expect(toServerRelativePath('https://contoso.sharepoint.com/sites/team', '/SiteAssets/', '/x'))
      .toBe('/sites/team/SiteAssets/x');
  });

  it('builds site page paths and absolute urls consistently', () => {
    expect(sitePagesPath('https://contoso.sharepoint.com/sites/team', 'Home'))
      .toBe('/sites/team/SitePages/Home.aspx');
    expect(toAbsoluteUrl('https://contoso.sharepoint.com/sites/team', '/sites/team/SitePages/Home.aspx'))
      .toBe('https://contoso.sharepoint.com/sites/team/SitePages/Home.aspx');
  });

  it('treats a root-site web url correctly', () => {
    expect(toSitePath('https://contoso.sharepoint.com/')).toBe('');
    expect(sitePagesPath('https://contoso.sharepoint.com/', 'Home')).toBe('/SitePages/Home.aspx');
  });
});

describe('normalizePageName', () => {
  it('appends .aspx only when missing and preserves the original casing', () => {
    expect(normalizePageName('Home')).toBe('Home.aspx');
    expect(normalizePageName('Home.aspx')).toBe('Home.aspx');
    expect(normalizePageName('Home.ASPX')).toBe('Home.ASPX');
  });
});

describe('sanitizeFolderName / sanitizeFileName', () => {
  it('produces a safe folder segment', () => {
    expect(sanitizeFolderName('Q1 Report // 2026!')).toBe('q1-report-2026');
  });

  it('never returns an empty segment', () => {
    expect(sanitizeFolderName('///')).toBe('page');
    expect(sanitizeFileName('   ')).toBe('asset');
  });

  it('strips characters SharePoint rejects in a file name', () => {
    expect(sanitizeFileName('re:port<1>.png')).toBe('re-port-1-.png');
  });

  it('strips leading tildes and trailing dots', () => {
    expect(sanitizeFileName('~temp.png.')).toBe('temp.png');
  });
});

describe('ensureAbsoluteUrl', () => {
  it('passes through absolute urls', () => {
    expect(ensureAbsoluteUrl('https://contoso.sharepoint.com/sites/a', 'https://other.com/x.png'))
      .toBe('https://other.com/x.png');
  });

  it('resolves server-relative urls against the origin', () => {
    expect(ensureAbsoluteUrl('https://contoso.sharepoint.com/sites/a', '/sites/a/x.png'))
      .toBe('https://contoso.sharepoint.com/sites/a/x.png');
  });

  it('resolves site-relative urls against the site path', () => {
    expect(ensureAbsoluteUrl('https://contoso.sharepoint.com/sites/a', 'SiteAssets/x.png'))
      .toBe('https://contoso.sharepoint.com/sites/a/SiteAssets/x.png');
  });
});

describe('replaceAllUrls', () => {
  it('applies the longest match first so a site mapping cannot shadow a page mapping', () => {
    const replacements = new Map([
      ['https://c.sharepoint.com/sites/src', 'https://c.sharepoint.com/sites/dst'],
      ['https://c.sharepoint.com/sites/src/SitePages/A.aspx', 'https://c.sharepoint.com/sites/dst/SitePages/A-1.aspx']
    ]);

    expect(replaceAllUrls('link: https://c.sharepoint.com/sites/src/SitePages/A.aspx', replacements))
      .toBe('link: https://c.sharepoint.com/sites/dst/SitePages/A-1.aspx');
  });

  it('replaces every occurrence', () => {
    const replacements = new Map([['a', 'b']]);
    expect(replaceAllUrls('aaa', replacements)).toBe('bbb');
  });

  it('ignores an empty key rather than injecting between every character', () => {
    const replacements = new Map([['', 'X']]);
    expect(replaceAllUrls('abc', replacements)).toBe('abc');
  });
});

describe('sitePagesSubfolder', () => {
  it('finds the folder a page sits in', () => {
    expect(sitePagesSubfolder('/sites/team/SitePages/Templates/A.aspx')).toBe('Templates');
  });

  it('returns empty for a page at the root of the library', () => {
    expect(sitePagesSubfolder('/sites/team/SitePages/A.aspx')).toBe('');
  });

  it('preserves nested folders', () => {
    expect(sitePagesSubfolder('/sites/team/SitePages/2026/Q1/A.aspx')).toBe('2026/Q1');
  });

  it('matches the library name case-insensitively', () => {
    expect(sitePagesSubfolder('/sites/team/sitepages/Templates/A.aspx')).toBe('Templates');
  });

  it('treats a path with no library segment as the root', () => {
    expect(sitePagesSubfolder('/sites/team/Shared Documents/A.aspx')).toBe('');
    expect(sitePagesSubfolder('')).toBe('');
  });
});

describe('sitePagesPath with a folder', () => {
  const SITE = 'https://contoso.sharepoint.com/sites/team';

  it('places a page inside the folder', () => {
    expect(sitePagesPath(SITE, 'A', 'Templates')).toBe('/sites/team/SitePages/Templates/A.aspx');
  });

  it('places a page at the root when no folder is given', () => {
    expect(sitePagesPath(SITE, 'A')).toBe('/sites/team/SitePages/A.aspx');
    expect(sitePagesPath(SITE, 'A', '')).toBe('/sites/team/SitePages/A.aspx');
  });

  it('round-trips with sitePagesSubfolder', () => {
    const folder = 'Templates';
    expect(sitePagesSubfolder(sitePagesPath(SITE, 'A', folder))).toBe(folder);
  });
});
