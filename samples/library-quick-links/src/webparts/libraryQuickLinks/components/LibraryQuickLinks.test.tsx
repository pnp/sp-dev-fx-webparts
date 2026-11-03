jest.mock('@microsoft/sp-http', () => ({
  SPHttpClient: { configurations: { v1: {} } }
}));
jest.mock('@microsoft/sp-core-library', () => ({ Log: { error: jest.fn() } }));
jest.mock('LibraryQuickLinksWebPartStrings', () => ({
  LibrariesLabel: 'Document libraries',
  LoadingLibraries: 'Loading document libraries...',
  LoadLibrariesError: 'Unable to load document libraries.',
  NoLibraries: 'No document libraries to display.',
  NoMatchingLibraries: 'No document libraries match your search or filter.',
  SearchLibrariesLabel: 'Search document libraries...',
  OneLibraryLabel: '1 library',
  LibraryCountLabel: '{0} libraries',
  FilterLibrariesLabel: 'Filter libraries',
  AllLibrariesLabel: 'All libraries',
  WithFilesLabel: 'With files',
  EmptyLibrariesLabel: 'Empty libraries (no files)',
  EditedLabel: 'Edited {0}',
  ViewedAsLabel: 'Viewed as',
  TilesViewLabel: 'Tiles',
  ListViewLabel: 'List',
  FileCountLabel: '{0} files',
  FolderCountLabel: '{0} folders',
  LibrarySizeLabel: 'Size',
  MegabytesLabel: 'MB',
  GigabytesLabel: 'GB',
  OneFileLabel: '1 file',
  OneFolderLabel: '1 folder',
  TodayLabel: 'Today',
  YesterdayLabel: 'Yesterday',
  LastUpdatedLabel: 'Last updated',
  MetadataUnavailable: 'Metadata unavailable'
}), { virtual: true });
jest.mock('./LibraryQuickLinks.module.scss', () => ({
  links: 'links', listView: 'listView', metadataView: 'metadataView', metadataCard: 'metadataCard',
  metadataRow: 'metadataRow'
}));

import * as React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { Log } from '@microsoft/sp-core-library';
import LibraryQuickLinks from './LibraryQuickLinks';
import type { IDocumentLibrary } from './documentLibraries';

describe('LibraryQuickLinks', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    jest.clearAllMocks();
  });

  it('renders library links in a keyboard-accessible scrolling region', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: [{ Id: '1', Title: 'Data Requests', RootFolder: { ServerRelativeUrl: '/sites/Team/DataRequests' } }]
        })
      })
    };

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com/sites/Team" spHttpClient={client} />);
    });

    expect(container.querySelector('a')?.textContent).toBe('Data Requests');
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/sites/Team/DataRequests');
    expect(container.querySelector('[role="region"]')?.getAttribute('tabindex')).toBe('0');
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it('renders loading and empty states', async () => {
    let resolveResponse: (value: { ok: boolean; json: () => Promise<{ value: IDocumentLibrary[] }> }) => void = () => {
      throw new Error('Request has not started');
    };
    const client = {
      get: jest.fn().mockReturnValue(new Promise(resolve => { resolveResponse = resolve; }))
    };

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client} />);
    });
    expect(container.querySelector('[role="status"]')?.textContent).toBe('Loading document libraries...');

    await act(async () => {
      resolveResponse({ ok: true, json: async () => ({ value: [] }) });
    });
    expect(container.querySelector('[role="status"]')?.textContent).toBe('No document libraries to display.');
  });

  it('defaults to tiles and switches between list and tiles without reloading or changing exclusions', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: ['Data Requests', 'Portfolio Review'].map((title, index) => ({
            Id: String(index), Title: title, RootFolder: { ServerRelativeUrl: `/libraries/${index}` }
          }))
        })
      })
    };
    const props = {
      webUrl: 'https://contoso.sharepoint.com',
      spHttpClient: client,
      hiddenLibraries: 'Portfolio Review'
    };

    await act(async () => { root.render(<LibraryQuickLinks {...props} />); });
    expect(container.querySelector('ul')?.className).toBe('links');

    await act(async () => { root.render(<LibraryQuickLinks {...props} viewedAs="list" />); });
    expect(container.querySelector('ul')?.className).toBe('links listView');
    expect(Array.from(container.querySelectorAll('a'), link => link.textContent)).toEqual(['Data Requests']);
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/libraries/0');
    expect(container.querySelector('[role="region"]')?.getAttribute('tabindex')).toBe('0');

    await act(async () => { root.render(<LibraryQuickLinks {...props} viewedAs="tiles" />); });
    expect(container.querySelector('ul')?.className).toBe('links');
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it('hides exact titles ignoring case, whitespace, duplicate entries, and blank lines', async () => {
    const titles = ['Data Requests', 'Data Requests Archive', 'Finance, Legal; Reports', 'Portfolio Review'];
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: titles.map((title, index) => ({
            Id: String(index), Title: title, RootFolder: { ServerRelativeUrl: `/libraries/${index}` }
          }))
        })
      })
    };

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client}
        hiddenLibraries={'  DATA requests  \r\n\r\nData Requests\nFinance, Legal; Reports\nUnknown Library\n'} />);
    });

    expect(Array.from(container.querySelectorAll('a'), link => link.textContent))
      .toEqual(['Data Requests Archive', 'Portfolio Review']);
  });

  it.each([
    { title: 'Documents', path: '/sites/Team/Shared%20Documents' },
    { title: 'Renamed library', path: '/SHARED DOCUMENTS/' },
    { title: 'Shared Documents', path: '/sites/Team/Shared Documents' }
  ])('hides $title by default and reveals it when the hide setting is cleared', async ({ title, path }) => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: [
            { Id: '1', Title: title, RootFolder: { ServerRelativeUrl: path } },
            { Id: '2', Title: 'Projects', RootFolder: { ServerRelativeUrl: '/Projects' } }
          ]
        })
      })
    };
    const props = { webUrl: 'https://contoso.sharepoint.com', spHttpClient: client };
    await act(async () => { root.render(<LibraryQuickLinks {...props} />); });
    expect(Array.from(container.querySelectorAll('a'), link => link.textContent)).toEqual(['Projects']);
    await act(async () => { root.render(<LibraryQuickLinks {...props} hiddenLibraries="" />); });
    expect(Array.from(container.querySelectorAll('a'), link => link.textContent))
      .toEqual([title, 'Projects'].sort((left, right) => left.localeCompare(right)));
    expect(Array.from(container.querySelectorAll('a')).find(link => link.textContent === title)?.getAttribute('href')).toBe(path);
    await act(async () => { root.render(<LibraryQuickLinks {...props} hiddenLibraries={'  SHARED documents  \nProjects'} />); });
    expect(container.querySelectorAll('a')).toHaveLength(0);
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it.each(['tiles', 'list'] as const)('sorts %s by name and last modified without reloading', async viewedAs => {
    const libraries = [
      { Title: 'Charlie', LastItemModifiedDate: '2026-10-01T12:00:00Z' },
      { Title: 'alpha', LastItemModifiedDate: '2026-11-01T12:00:00Z' },
      { Title: 'Bravo', LastItemModifiedDate: '2026-10-01T12:00:00Z' },
      { Title: 'Missing' },
      { Title: 'Invalid', LastItemModifiedDate: 'invalid' },
      { Title: 'Hidden', LastItemModifiedDate: '2020-01-01T12:00:00Z' }
    ].map(library => ({ ...library, Id: library.Title, RootFolder: { ServerRelativeUrl: `/${library.Title}` } }));
    const client = {
      get: jest.fn().mockResolvedValue({ ok: true, json: async () => ({ value: libraries }) })
    };
    const props = {
      webUrl: 'https://contoso.sharepoint.com', spHttpClient: client, viewedAs,
      locale: 'en-US', hiddenLibraries: 'Hidden', showHeader: true
    };
    const titles = (): (string | null)[] => Array.from(container.querySelectorAll('a'), link => link.textContent);
    await act(async () => { root.render(<LibraryQuickLinks {...props} />); });
    expect(titles()).toEqual(['alpha', 'Bravo', 'Charlie', 'Invalid', 'Missing']);
    await act(async () => { root.render(<LibraryQuickLinks {...props} sortBy="nameDesc" />); });
    expect(titles()).toEqual(['Missing', 'Invalid', 'Charlie', 'Bravo', 'alpha']);
    await act(async () => { root.render(<LibraryQuickLinks {...props} sortBy="modifiedAsc" />); });
    expect(titles()).toEqual(['Bravo', 'Charlie', 'alpha', 'Invalid', 'Missing']);
    await act(async () => { root.render(<LibraryQuickLinks {...props} sortBy="modifiedDesc" />); });
    expect(titles()).toEqual(['alpha', 'Bravo', 'Charlie', 'Invalid', 'Missing']);
    const search = container.querySelector('input');
    if (!search) throw new Error('Search input missing');
    await act(async () => {
      search.value = 'a';
      Simulate.change(search);
    });
    expect(titles()).toEqual(['alpha', 'Bravo', 'Charlie', 'Invalid']);
    await act(async () => { root.render(<LibraryQuickLinks {...props} sortBy="nameAsc" />); });
    expect(titles()).toEqual(['alpha', 'Bravo', 'Charlie', 'Invalid']);
    expect(client.get).toHaveBeenCalledTimes(1);
    expect(libraries.map(library => library.Title)).toEqual(['Charlie', 'alpha', 'Bravo', 'Missing', 'Invalid', 'Hidden']);
  });

  it('updates hidden libraries immediately without reloading and restores them when cleared', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: [{ Id: '1', Title: 'Data Requests', RootFolder: { ServerRelativeUrl: '/DataRequests' } }]
        })
      })
    };

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client} />);
    });
    expect(container.querySelectorAll('a')).toHaveLength(1);

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client}
        hiddenLibraries="Data Requests" />);
    });
    expect(container.querySelectorAll('a')).toHaveLength(0);
    expect(container.querySelector('[role="status"]')?.textContent).toBe('No document libraries to display.');
    expect(container.querySelector('[role="region"]')).toBeNull();

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client}
        hiddenLibraries="" />);
    });
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it('shows an error and logs failed requests', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({ ok: false, status: 403, statusText: 'Forbidden' })
    };

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client} />);
    });

    expect(container.querySelector('[role="alert"]')?.textContent).toBe('Unable to load document libraries.');
    expect(Log.error).toHaveBeenCalled();
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it.each(['tiles', 'list'] as const)('shows counts, size, and dates in %s, then restores compact links', async viewedAs => {
    const modified = new Date().toISOString();
    const library = {
      Id: '1', Title: 'Data Requests', Description: 'Team requests and reference documents.', LastItemModifiedDate: modified,
      RootFolder: { ServerRelativeUrl: '/DataRequests' }
    };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [library] }) })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            value: [
              { FileSystemObjectType: 0, File: { Length: 1024 * 1024 } },
              { FileSystemObjectType: 0, File: { Length: 3 * 1024 * 1024 } },
              { FileSystemObjectType: 1 }
            ]
          })
        })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [library] }) })
    };
    const props = { webUrl: 'https://contoso.sharepoint.com', spHttpClient: client, viewedAs, locale: 'en-US' };
    await act(async () => { root.render(<LibraryQuickLinks {...props} showMetadata />); });
    expect(container.textContent).toContain('2 files');
    expect(container.textContent).toContain('1 folder');
    expect(container.querySelector('a')?.textContent).toContain('Team requests and reference documents.');
    const fileStat = Array.from(container.querySelectorAll('span'))
      .find(element => element.children.length === 0 && element.textContent === '2 files');
    const folderStat = Array.from(container.querySelectorAll('span'))
      .find(element => element.children.length === 0 && element.textContent === '1 folder');
    const fileIcon = fileStat?.parentElement?.querySelector('svg');
    const folderIcon = folderStat?.parentElement?.querySelector('svg');
    expect(fileIcon).not.toBeNull();
    expect(folderIcon).not.toBeNull();
    expect(fileIcon?.querySelector('path')?.getAttribute('d')).not.toBe(folderIcon?.querySelector('path')?.getAttribute('d'));
    expect(container.querySelector('[aria-label="Size: 4.00 MB / 0.00 GB"]')?.textContent).toBe('4.00 MB / 0.00 GB');
    expect(container.querySelector('time')?.textContent).toBe('Edited Today');
    expect(container.querySelector('time')?.getAttribute('datetime')).toBe(modified);
    expect(container.querySelector('time')?.getAttribute('aria-label')).toContain('Last updated');
    expect(container.querySelector('ul')?.className).toContain('metadataView');
    expect(container.querySelector('ul')?.className.includes('listView')).toBe(viewedAs === 'list');
    expect(container.querySelector('a')?.className).toContain(viewedAs === 'list' ? 'metadataRow' : 'metadataCard');
    expect(container.querySelector('a')?.className).not.toContain(viewedAs === 'list' ? 'metadataCard' : 'metadataRow');
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/DataRequests');

    await act(async () => { root.render(<LibraryQuickLinks {...props} sortBy="modifiedDesc" showMetadata />); });
    expect(container.querySelector('time')?.getAttribute('datetime')).toBe(modified);
    expect(client.get).toHaveBeenCalledTimes(2);

    await act(async () => {
      root.render(<LibraryQuickLinks {...props} viewedAs={viewedAs === 'list' ? 'tiles' : 'list'} showMetadata />);
    });
    expect(container.querySelector('a')?.className).toContain(viewedAs === 'list' ? 'metadataCard' : 'metadataRow');
    expect(container.querySelector('[aria-label="Size: 4.00 MB / 0.00 GB"]')?.textContent).toBe('4.00 MB / 0.00 GB');
    expect(client.get).toHaveBeenCalledTimes(2);

    await act(async () => { root.render(<LibraryQuickLinks {...props} showMetadata={false} />); });
    expect(container.querySelector('time')).toBeNull();
    expect(container.querySelector('a')?.textContent).toBe('Data Requests');
    expect(container.querySelector('a')?.className).not.toContain('metadataCard');
    expect(container.querySelector('a')?.className).not.toContain('metadataRow');
    expect(client.get).toHaveBeenCalledTimes(3);
  });

  it.each([
    { bytes: 0, locale: 'en-US', size: '0.00 MB / 0.00 GB' },
    { bytes: 1.5 * 1024 * 1024, locale: 'en-US', size: '1.50 MB / 0.00 GB' },
    { bytes: 1024 * 1024 * 1024, locale: 'en-US', size: '1,024.00 MB / 1.00 GB' },
    { bytes: 1.5 * 1024 * 1024 * 1024, locale: 'de-DE', size: '1.536,00 MB / 1,50 GB' }
  ])('shows both size units for $bytes bytes in $locale', async ({ bytes, locale, size }) => {
    const library = {
      Id: '1', Title: 'Large Library', LastItemModifiedDate: new Date().toISOString(),
      RootFolder: { ServerRelativeUrl: '/LargeLibrary' }
    };
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [library] }) })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ value: [{ FileSystemObjectType: 0, File: { Length: bytes } }] })
        })
    };

    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client}
        showMetadata locale={locale} />);
    });

    expect(container.querySelector(`[aria-label="Size: ${size}"]`)?.textContent).toBe(size);
  });

  it.each(['yesterday', 'older'] as const)('formats %s metadata dates', async age => {
    const modified = age === 'older' ? new Date(2020, 0, 15, 12) : new Date();
    if (age === 'yesterday') modified.setDate(modified.getDate() - 1);
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            value: [{ Id: '1', Title: 'Empty', LastItemModifiedDate: modified.toISOString(),
              RootFolder: { ServerRelativeUrl: '/Empty' } }]
          })
        })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [] }) })
    };
    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client} showMetadata locale="en-US" />);
    });
    expect(container.textContent).toContain('0 files');
    expect(container.textContent).toContain('0 folders');
    expect(container.querySelector('[aria-label="Size: 0.00 MB / 0.00 GB"]')?.textContent).toBe('0.00 MB / 0.00 GB');
    expect(container.querySelector('time')?.textContent).toBe(age === 'yesterday' ? 'Edited Yesterday' : 'Edited Jan 15, 2020');
  });

  it('searches names and descriptions and updates the count without toolbar view controls or reloading', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: [
            { Id: '1', Title: 'Contracts', Description: 'Legal agreements', RootFolder: { ServerRelativeUrl: '/Contracts' } },
            { Id: '2', Title: 'Resumes', RootFolder: { ServerRelativeUrl: '/Resumes' } },
            { Id: '3', Title: 'Hidden', Description: 'Legal', RootFolder: { ServerRelativeUrl: '/Hidden' } }
          ]
        })
      })
    };
    await act(async () => {
      root.render(<LibraryQuickLinks webUrl="https://contoso.sharepoint.com" spHttpClient={client} hiddenLibraries="Hidden" showHeader />);
    });
    expect(container.textContent).toContain('2 libraries');
    expect(container.querySelector('[aria-label="Tiles"]')).toBeNull();
    expect(container.querySelector('[aria-label="List"]')).toBeNull();
    const search = container.querySelector('input');
    if (!search) throw new Error('Search input missing');
    await act(async () => {
      search.value = ' LEGAL ';
      Simulate.change(search);
    });
    expect(container.textContent).toContain('1 library');
    expect(Array.from(container.querySelectorAll('a'), link => link.textContent)).toEqual(['Contracts']);

    await act(async () => {
      search.value = 'missing';
      Simulate.change(search);
    });
    expect(container.textContent).toContain('0 libraries');
    expect(container.querySelector('[role="status"]')?.textContent).toBe('No document libraries match your search or filter.');
    await act(async () => {
      search.value = '';
      Simulate.change(search);
    });
    expect(container.querySelectorAll('a')).toHaveLength(2);
    expect(client.get).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[aria-label="Filter libraries"]')).toBeNull();
  });

  it.each(['tiles', 'list'] as const)('hides the header by default and toggles it without reloading in %s', async viewedAs => {
    const client = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          value: ['Contracts', 'Resumes', 'Hidden'].map(Title => ({
            Id: Title, Title, RootFolder: { ServerRelativeUrl: `/${Title}` }
          }))
        })
      })
    };
    const props = { webUrl: 'https://contoso.sharepoint.com', spHttpClient: client, viewedAs, hiddenLibraries: 'Hidden' };
    await act(async () => { root.render(<LibraryQuickLinks {...props} />); });
    expect(container.querySelector('input')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
    expect(container.querySelectorAll('a')).toHaveLength(2);
    await act(async () => { root.render(<LibraryQuickLinks {...props} showHeader />); });
    const search = container.querySelector('input');
    if (!search) throw new Error('Search input missing');
    expect(container.querySelector('[aria-live]')?.textContent).toBe('2 libraries');
    await act(async () => {
      search.value = 'Contracts';
      Simulate.change(search);
    });
    expect(container.querySelectorAll('a')).toHaveLength(1);
    await act(async () => { root.render(<LibraryQuickLinks {...props} showHeader={false} />); });
    expect(container.querySelector('input')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
    expect(container.querySelectorAll('a')).toHaveLength(2);
    await act(async () => { root.render(<LibraryQuickLinks {...props} showHeader />); });
    expect(container.querySelector('input')?.value).toBe('');
    expect(container.querySelectorAll('a')).toHaveLength(2);
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it('filters libraries by file presence and resets filters when the header or metadata is disabled', async () => {
    const libraries = ['Contracts', 'Empty', 'Hidden'].map((Title, index) => ({
      Id: String(index), Title, LastItemModifiedDate: new Date().toISOString(),
      RootFolder: { ServerRelativeUrl: `/${Title}` }
    }));
    const client = {
      get: jest.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: libraries }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [{ FileSystemObjectType: 0, File: { Length: 100 } }] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [{ FileSystemObjectType: 1 }] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: [] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ value: libraries }) })
    };
    const props = { webUrl: 'https://contoso.sharepoint.com', spHttpClient: client, hiddenLibraries: 'Hidden', showHeader: true };
    await act(async () => { root.render(<LibraryQuickLinks {...props} showMetadata />); });
    const button = container.querySelector<HTMLButtonElement>('[aria-label="Filter libraries"]');
    if (!button) throw new Error('Filter button missing');
    await act(async () => { button.click(); });
    expect(button.getAttribute('aria-expanded')).toBe('true');
    const filter = container.querySelector('select');
    if (!filter) throw new Error('Filter select missing');
    await act(async () => {
      filter.value = 'withFiles';
      Simulate.change(filter);
    });
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/Contracts');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    await act(async () => {
      filter.value = 'empty';
      Simulate.change(filter);
    });
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/Empty');
    await act(async () => {
      filter.value = 'all';
      Simulate.change(filter);
    });
    expect(container.querySelectorAll('a')).toHaveLength(2);
    expect(client.get).toHaveBeenCalledTimes(4);
    await act(async () => {
      filter.value = 'withFiles';
      Simulate.change(filter);
    });
    await act(async () => { root.render(<LibraryQuickLinks {...props} showHeader={false} showMetadata />); });
    expect(container.querySelectorAll('a')).toHaveLength(2);
    expect(container.querySelector('input')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
    expect(container.querySelector('select')).toBeNull();
    expect(container.querySelector('[aria-label="Filter libraries"]')).toBeNull();
    expect(container.querySelectorAll('time')).toHaveLength(2);
    await act(async () => { root.render(<LibraryQuickLinks {...props} showMetadata />); });
    const restoredButton = container.querySelector<HTMLButtonElement>('[aria-label="Filter libraries"]');
    if (!restoredButton) throw new Error('Filter button missing');
    expect(restoredButton.getAttribute('aria-expanded')).toBe('false');
    expect(restoredButton.getAttribute('aria-pressed')).toBe('false');
    expect(client.get).toHaveBeenCalledTimes(4);
    await act(async () => { restoredButton.click(); });
    const restoredFilter = container.querySelector('select');
    if (!restoredFilter) throw new Error('Filter select missing');
    expect(restoredFilter.value).toBe('all');
    await act(async () => {
      restoredFilter.value = 'withFiles';
      Simulate.change(restoredFilter);
      root.render(<LibraryQuickLinks {...props} showMetadata={false} />);
    });
    expect(container.querySelectorAll('a')).toHaveLength(2);
    expect(container.querySelector('select')).toBeNull();
    expect(container.querySelector('[aria-label="Filter libraries"]')).toBeNull();
  });
});
