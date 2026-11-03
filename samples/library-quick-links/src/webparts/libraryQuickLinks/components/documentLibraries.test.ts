jest.mock('@microsoft/sp-http', () => ({
  SPHttpClient: { configurations: { v1: {} } }
}));

import { getDocumentLibraries, type IDocumentLibrary } from './documentLibraries';

const webUrl = 'https://contoso.sharepoint.com/sites/Team';

function library(title: string, path: string): IDocumentLibrary {
  return { Id: title, Title: title, RootFolder: { ServerRelativeUrl: path } };
}

describe('getDocumentLibraries', () => {
  it('queries visible document libraries on the current web and includes renamed Shared Documents', async () => {
    const custom = library('Documents', '/sites/Team/CustomDocuments');
    const shared = library('Renamed default library', '/sites/Team/Shared%20Documents');
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: [shared, custom]
        })
      })
    };

    await expect(getDocumentLibraries(client, `${webUrl}/`)).resolves.toEqual([shared, custom]);
    expect(client.get.mock.calls[0][0]).toBe(`${webUrl}/_api/web/lists` +
      '?$select=Id,Title,Description,LastItemModifiedDate,RootFolder/ServerRelativeUrl&$expand=RootFolder' +
      '&$filter=BaseTemplate eq 101 and Hidden eq false and IsCatalog eq false&$orderby=Title&$top=5000');
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it('excludes standard libraries by URL even when their titles have changed', async () => {
    const standardFolders = [
      'SiteAssets', 'Style%20Library', 'FormServerTemplates', 'SiteCollectionDocuments',
      'SiteCollectionImages', 'PublishingImages', 'PreservationHoldLibrary', '_catalogs/custom'
    ];
    const custom = library('Project Documents', '/sites/Team/ProjectDocuments');
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: [...standardFolders.map(folder => library('Renamed library', `/sites/Team/${folder}`)), custom]
        })
      })
    };

    await expect(getDocumentLibraries(client, webUrl)).resolves.toEqual([custom]);
  });

  it('keeps custom libraries whose display titles match standard libraries', async () => {
    const custom = library('Site Assets', '/sites/Team/CustomAssets');
    const client = {
      get: jest.fn().mockResolvedValue({ ok: true, json: async () => ({ value: [custom] }) })
    };

    await expect(getDocumentLibraries(client, webUrl)).resolves.toEqual([custom]);
  });

  it.each(['@odata.nextLink', 'odata.nextLink'])('follows %s without dropping libraries', async nextLinkKey => {
    const first = library('First', '/sites/Team/First');
    const last = library('Last', '/sites/Team/Last');
    const nextLink = `${webUrl}/_api/web/lists?$skiptoken=next`;
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ value: [first], [nextLinkKey]: nextLink })
        })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [last] }) })
    };

    await expect(getDocumentLibraries(client, webUrl)).resolves.toEqual([first, last]);
    expect(client.get.mock.calls[1][0]).toBe(nextLink);
  });

  it('includes Shared Documents on a root site regardless of casing', async () => {
    const shared = library('Documents', '/SHARED DOCUMENTS/');
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ value: [shared] })
      })
    };

    await expect(getDocumentLibraries(client, 'https://contoso.sharepoint.com/')).resolves.toEqual([shared]);
  });

  it('returns an empty list when there are no libraries', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({ ok: true, json: async () => ({ value: [] }) })
    };

    await expect(getDocumentLibraries(client, webUrl)).resolves.toEqual([]);
  });

  it('surfaces HTTP failures instead of returning an empty list', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({ ok: false, status: 403, statusText: 'Forbidden' })
    };

    await expect(getDocumentLibraries(client, webUrl)).rejects.toThrow('403 Forbidden');
  });

  it('surfaces a failure on a later page instead of returning incomplete results', async () => {
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            value: [library('First', '/sites/Team/First')],
            'odata.nextLink': `${webUrl}/_api/web/lists?$skiptoken=next`
          })
        })
        .mockRejectedValueOnce(new Error('Network unavailable'))
    };

    await expect(getDocumentLibraries(client, webUrl)).rejects.toThrow('Network unavailable');
  });

  it.each(['@odata.nextLink', 'odata.nextLink'])('counts files, folders, and size across %s item pages', async nextLinkKey => {
    const custom = {
      ...library('Projects', '/sites/Team/Projects'),
      LastItemModifiedDate: '2026-11-02T10:00:00Z'
    };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [custom] }) })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            value: [
              { FileSystemObjectType: 0, File: { Length: 1024 } },
              { FileSystemObjectType: 1 }
            ],
            [nextLinkKey]: `${webUrl}/_api/nextItems`
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            value: [
              { FileSystemObjectType: 1 },
              { FileSystemObjectType: 0, File: { Length: '2048' } },
              { FileSystemObjectType: 0, File: { Length: 4096 } }
            ]
          })
        })
    };
    await expect(getDocumentLibraries(client, webUrl, true)).resolves.toEqual([
      { ...custom, FileCount: 3, FolderCount: 2, SizeBytes: 7168 }
    ]);
    expect(client.get.mock.calls[1][0]).toBe(`${webUrl}/_api/web/lists(guid'Projects')/items` +
      '?$select=FileSystemObjectType,File/Length&$expand=File&$top=5000');
    expect(client.get.mock.calls[2][0]).toBe(`${webUrl}/_api/nextItems`);
  });

  it('returns zero counts for an empty library', async () => {
    const custom = { ...library('Empty', '/sites/Team/Empty'), LastItemModifiedDate: '2026-11-02T10:00:00Z' };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [custom] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [] }) })
    };
    await expect(getDocumentLibraries(client, webUrl, true)).resolves.toEqual([
      { ...custom, FileCount: 0, FolderCount: 0, SizeBytes: 0 }
    ]);
  });

  it('rejects file items without a valid size instead of returning an incomplete total', async () => {
    const custom = { ...library('Projects', '/sites/Team/Projects'), LastItemModifiedDate: '2026-11-02T10:00:00Z' };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [custom] }) })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ value: [{ FileSystemObjectType: 0 }] })
        })
    };
    await expect(getDocumentLibraries(client, webUrl, true)).rejects.toThrow('Invalid file size');
  });

  it.each(['', 'invalid', '-1', '1.5', -1, NaN, Infinity])('rejects an invalid file length of %s', async Length => {
    const custom = { ...library('Projects', '/sites/Team/Projects'), LastItemModifiedDate: '2026-11-02T10:00:00Z' };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [custom] }) })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ value: [{ FileSystemObjectType: 0, File: { Length } }] })
        })
    };
    await expect(getDocumentLibraries(client, webUrl, true)).rejects.toThrow('Invalid file size');
  });

  it('rejects failed metadata pages instead of displaying incomplete counts', async () => {
    const custom = { ...library('Projects', '/sites/Team/Projects'), LastItemModifiedDate: '2026-11-02T10:00:00Z' };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [custom] }) })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            value: [{ FileSystemObjectType: 0, File: { Length: 1024 } }],
            'odata.nextLink': `${webUrl}/_api/nextItems`
          })
        })
        .mockResolvedValueOnce({ ok: false, status: 429, statusText: 'Too Many Requests' })
    };
    await expect(getDocumentLibraries(client, webUrl, true)).rejects.toThrow('429 Too Many Requests');
  });

  it('rejects invalid metadata rather than inventing a date', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ value: [library('Projects', '/sites/Team/Projects')] })
      })
    };
    await expect(getDocumentLibraries(client, webUrl, true)).rejects.toThrow('Invalid last-updated date');
  });
});
