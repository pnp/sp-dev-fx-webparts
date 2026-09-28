/** @jest-environment jsdom */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import type { SPFI } from '@pnp/sp';
import SiteDirectory from './SiteDirectory';
import type { ISiteDirectoryProps } from './ISiteDirectoryProps';
import { SiteDirectoryService } from '../services/SiteDirectoryService';

const config = {
  listTitle: 'Sites',
  titleField: 'Title',
  categoryField: 'Category',
  urlField: 'URL',
  descriptionField: 'Description',
  ownerField: 'Owner',
  logoUrlField: '',
  pageSize: 2
};

const site = {
  key: 'site-directory-1',
  id: 1,
  title: 'Marketing hub',
  category: 'Team',
  url: 'https://contoso.sharepoint.com/sites/marketing',
  description: 'Marketing resources',
  owner: 'A. Owner',
  logoUrl: ''
};

function renderDirectory(service: SiteDirectoryService, overrides: Partial<ISiteDirectoryProps> = {}): HTMLDivElement {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const props: ISiteDirectoryProps = {
    service,
    sp: {} as SPFI,
    config,
    title: 'Site directory',
    currentOrigin: 'https://contoso.sharepoint.com',
    ...overrides
  };
  ReactDOM.render(<SiteDirectory {...props} />, root);
  return root;
}

function cleanup(root: HTMLDivElement): void {
  ReactDOM.unmountComponentAtNode(root);
  root.remove();
}

describe('SiteDirectory', () => {
  it('shows setup guidance and does not query an invalid configuration', () => {
    const serviceMock = { getPage: jest.fn() };
    const service = serviceMock as unknown as SiteDirectoryService;
    const root = renderDirectory(service, { config: { ...config, listTitle: '' } });

    expect(root.textContent).toContain('Complete the site directory setup');
    expect(root.textContent).toContain('SharePoint list title');
    expect(serviceMock.getPage).not.toHaveBeenCalled();
    cleanup(root);
  });

  it('shows loading, then renders results and paging controls', async () => {
    let resolvePage: (page: unknown) => void = () => undefined;
    const pending = new Promise(resolve => { resolvePage = resolve; });
    const serviceMock = { getPage: jest.fn().mockReturnValue(pending) };
    const service = serviceMock as unknown as SiteDirectoryService;
    const root = renderDirectory(service);

    expect(root.textContent).toContain('Loading sites');
    await act(async () => {
      resolvePage({ items: [site], hasNext: true, pageIndex: 0 });
    });

    expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(1);
    expect(root.textContent).toContain('Marketing hub');
    expect(root.querySelector('select[aria-label="Category"]')).not.toBeNull();
    expect(root.querySelector('button[aria-label="Next"]')).not.toBeNull();
    cleanup(root);
  });

  it('shows an empty state', async () => {
    const serviceMock = { getPage: jest.fn().mockResolvedValue({ items: [], hasNext: false, pageIndex: 0 }) };
    const service = serviceMock as unknown as SiteDirectoryService;
    let root: HTMLDivElement;
    await act(async () => { root = renderDirectory(service); });

    expect(root!.textContent).toContain('No sites match these filters');
    cleanup(root!);
  });

  it('shows a readable error and a retry button', async () => {
    const serviceMock = { getPage: jest.fn().mockRejectedValue(new Error('Access denied')) };
    const service = serviceMock as unknown as SiteDirectoryService;
    let root: HTMLDivElement;
    await act(async () => { root = renderDirectory(service); });

    expect(root!.textContent).toContain('Access denied');
    expect(root!.querySelector('button')).not.toBeNull();
    cleanup(root!);
  });
});
