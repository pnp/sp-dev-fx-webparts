import { buildRemediationUrl, isSafeRemediationUrl, safeRemediationUrl } from './UrlSafety';

describe('remediation URL safety', () => {
  const site = 'https://contoso.sharepoint.com/sites/portal';
  it('accepts same-origin HTTP(S) URLs', () => expect(isSafeRemediationUrl(`${site}/Lists/News/EditForm.aspx?ID=1`, site)).toBe(true));
  it('rejects external and javascript URLs', () => {
    expect(isSafeRemediationUrl('https://evil.example/edit', site)).toBe(false);
    expect(isSafeRemediationUrl('javascript:alert(1)', site)).toBe(false);
    expect(safeRemediationUrl('not a URL', site)).toBe('');
  });
  it('builds a same-origin encoded edit URL', () => expect(buildRemediationUrl(site, 'list', 'News & Updates', '4')).toBe(`${site}/Lists/News%20%26%20Updates/EditForm.aspx?ID=4`));
});
