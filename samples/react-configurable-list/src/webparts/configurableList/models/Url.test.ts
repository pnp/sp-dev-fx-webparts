import { safeItemUrl } from './Url';

describe('safeItemUrl', () => {
  const javascriptUrl = ['java', 'script:alert(1)'].join('');

  it('builds an encoded item URL for http and https sites', () => {
    expect(safeItemUrl('https://contoso.sharepoint.com/sites/demo/', 'Records & More', 7)).toBe(
      'https://contoso.sharepoint.com/sites/demo/Lists/Records%20%26%20More/EditForm.aspx?ID=7'
    );
    expect(safeItemUrl('http://localhost:4321', 'Records', 1)).toBe(
      'http://localhost:4321/Lists/Records/EditForm.aspx?ID=1'
    );
  });

  it('rejects unsafe bases and invalid IDs', () => {
    expect(safeItemUrl(javascriptUrl, 'Records', 1)).toBeUndefined();
    expect(safeItemUrl('ftp://contoso.example', 'Records', 1)).toBeUndefined();
    expect(safeItemUrl('https://contoso.example', 'Records', 0)).toBeUndefined();
    expect(safeItemUrl('https://contoso.example', 'Records', 1.5)).toBeUndefined();
    expect(safeItemUrl('not a URL', 'Records', 1)).toBeUndefined();
  });
});
