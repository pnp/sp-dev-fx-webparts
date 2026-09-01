jest.mock('@pnp/sp', () => ({ spfi: jest.fn(), SPFx: jest.fn() }));
jest.mock('@pnp/sp/webs', () => ({}));
jest.mock('@pnp/sp/lists', () => ({}));
jest.mock('@pnp/sp/folders', () => ({}));
jest.mock('@pnp/sp/files', () => ({}));

import type { SPFI } from '@pnp/sp';
import { createBreadcrumbItems } from '../components/FolderBreadcrumbs';
import { DocumentLibraryService } from './DocumentLibraryService';
import { classifySharePointError, DocumentLibraryError } from './documentLibraryError';

type Query<T> = { select: (...fields: string[]) => { top: (limit: number) => () => Promise<T[]> } };

function query<T>(items: T[], limits?: number[]): Query<T> {
  return { select: () => ({ top: (limit: number) => { limits?.push(limit); return () => Promise.resolve(items); } }) };
}

function serviceWithContents(folders: unknown[], files: unknown[], failure?: unknown, limits?: number[]): DocumentLibraryService {
  const folder = {
    folders: query(folders, limits),
    files: failure ? { select: () => ({ top: (limit: number) => { limits?.push(limit); return () => Promise.reject(failure); } }) } : query(files, limits)
  };
  const sp = { web: { getFolderByServerRelativePath: () => folder } } as unknown as SPFI;
  return new DocumentLibraryService(sp);
}

describe('DocumentLibraryService', () => {
  test('maps folders and files and returns an empty folder', async () => {
    const limits: number[] = [];
    const service = serviceWithContents(
      [{ Name: 'Policies', ServerRelativeUrl: '/sites/demo/Documents/Policies' }],
      [{ Name: 'readme.txt', ServerRelativeUrl: '/sites/demo/Documents/readme.txt', Length: '12', TimeLastModified: '2024-01-02T00:00:00Z' }],
      undefined,
      limits
    );
    await expect(service.getContents('/sites/demo/Documents', '/sites/demo/Documents', 200, true)).resolves.toEqual({
      path: '/sites/demo/Documents',
      folders: [{ name: 'Policies', serverRelativeUrl: '/sites/demo/Documents/Policies' }],
      files: [{
        name: 'readme.txt',
        serverRelativeUrl: '/sites/demo/Documents/readme.txt',
        length: 12,
        timeLastModified: '2024-01-02T00:00:00Z'
      }]
    });
    expect(limits).toEqual([100, 100]);

    await expect(serviceWithContents([], []).getContents('/sites/demo/Documents', '/sites/demo/Documents', 0, true))
      .resolves.toEqual({ path: '/sites/demo/Documents', folders: [], files: [] });
  });

  test('rejects mapped items outside the root', async () => {
    await expect(serviceWithContents([], [{ Name: 'secret.txt', ServerRelativeUrl: '/sites/demo/Secret/secret.txt' }])
      .getContents('/sites/demo/Documents', '/sites/demo/Documents', 25, true))
      .rejects.toMatchObject({ code: 'invalidPath' });
  });

  test('classifies empty, permission, throttling, not-found, and generic failures', () => {
    expect(classifySharePointError(undefined)).toBe('generic');
    expect(classifySharePointError({ status: 401 })).toBe('accessDenied');
    expect(classifySharePointError({ status: 429 })).toBe('throttled');
    expect(classifySharePointError({ status: 404 })).toBe('notFound');
    expect(classifySharePointError(new Error('network failure'))).toBe('generic');
  });

  test('wraps failed service requests with a stable error code', async () => {
    await expect(serviceWithContents([], [], { status: 503 }).getContents('/sites/demo/Documents', '/sites/demo/Documents', 25, true))
      .rejects.toEqual(expect.objectContaining({ code: 'throttled' }));
    expect(new DocumentLibraryError('notFound', 'missing').code).toBe('notFound');
  });

  test('wraps a failed library lookup', async () => {
    const sp = {
      web: {
        getFolderByServerRelativePath: jest.fn(),
        lists: {
          filter: () => ({
            select: () => ({
              expand: () => ({ top: () => () => Promise.reject({ status: 404 }) })
            })
          })
        }
      }
    } as unknown as SPFI;
    await expect(new DocumentLibraryService(sp).resolveLibraryRoot('Documents', ''))
      .rejects.toMatchObject({ code: 'notFound' });
  });

  test('validates a child path before navigation', () => {
    const service = serviceWithContents([], []);
    expect(service.validateChildPath('/sites/demo/Documents', '/sites/demo/Documents', 'Policies'))
      .toBe('/sites/demo/Documents/Policies');
    expect(() => service.validateChildPath('/sites/demo/Documents', '/sites/demo/Documents', '../Secret')).toThrow();
    expect(createBreadcrumbItems('/sites/demo/Documents', '/sites/demo/Documents/Policies', 'Documents')).toHaveLength(2);
  });
});
