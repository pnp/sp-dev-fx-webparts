import { strict as assert } from 'assert';
import { CONFIG_LIMITS, parseConfig, safeTenantUrl } from '../src/services/configuration';
import { classifyRetention, classifyReviewDate, missingFields } from '../src/services/retentionClassification';
import { classifyError } from '../src/services/errors';
import { boundedPageResults, SharePointInventoryService } from '../src/services/SharePointInventoryService';

describe('retention records review bounds and validation', () => {
  const valid = { pageSize: 2, maxPages: 2, reviewFields: [{ key: 'ReviewStatus', label: 'Status', kind: 'status' }], sources: [{ id: 'a', label: 'A', libraryServerRelativeUrl: '/Docs', folderServerRelativeUrl: '/Docs/A' }] };
  it('accepts bounded configuration and rejects oversized pages/sources', () => {
    assert.equal(parseConfig(valid).pageSize, 2);
    assert.throws(() => parseConfig({ ...valid, pageSize: CONFIG_LIMITS.maxPageSize + 1 }));
    assert.throws(() => parseConfig({ ...valid, sources: Array.from({ length: CONFIG_LIMITS.maxSources + 1 }, () => valid.sources[0]) }));
  });
  it('rejects malformed config and external source URLs', () => {
    assert.throws(() => parseConfig({ ...valid, reviewFields: [{ key: 'Title;DELETE', label: 'x', kind: 'text' }] }));
    assert.throws(() => parseConfig({ ...valid, sources: [{ ...valid.sources[0], folderServerRelativeUrl: 'https://evil.example/folder' }] }));
    assert.equal(safeTenantUrl('/sites/a', 'https://tenant.sharepoint.com').origin, 'https://tenant.sharepoint.com');
    assert.throws(() => safeTenantUrl('https://evil.example/a', 'https://tenant.sharepoint.com'));
  });
  it('classifies date-independent retention signals and missing values', () => {
    assert.equal(classifyRetention(true, null, []), 'record');
    assert.equal(classifyRetention(false, 'Finance-7y', []), 'retained');
    assert.equal(classifyRetention(null, null, ['Status']), 'needs-review');
    assert.equal(classifyRetention(false, null, []), 'unclassified');
    assert.deepEqual(missingFields({ ReviewStatus: '' }, [{ key: 'ReviewStatus', label: 'Status' }, { key: 'Reviewer', label: 'Reviewer' }]), ['Status', 'Reviewer']);
    const now = new Date('2026-08-30T00:00:00Z');
    assert.equal(classifyReviewDate('2026-08-29T00:00:00Z', now), 'overdue');
    assert.equal(classifyReviewDate('2026-09-10T00:00:00Z', now), 'due-soon');
    assert.equal(classifyReviewDate(null, now), 'missing');
  });
  it('classifies permission and throttling failures', () => {
    assert.equal(classifyError({ status: 403 }).kind, 'permission-denied');
    assert.equal(classifyError({ status: 429, headers: { get: () => '5' } }).retryAfterSeconds, 5);
    assert.equal(classifyError(new Error('network timeout')).kind, 'network');
    assert.equal(classifyError(new Error('URL is outside the current SharePoint tenant')).kind, 'config');
  });
});

describe('bounded pagination and partial failures contract', () => {
  it('documents the deterministic page cap used by the service', () => {
    const pages = [{ results: [1], hasNext: true }, { results: [2], hasNext: true }, { results: [3], hasNext: false }];
    const pageResult = boundedPageResults(pages, 2);
    assert.deepEqual(pageResult.items, [1, 2]);
    assert.equal(pageResult.truncated, true);
    assert.deepEqual([{ sourceLabel: 'Denied', kind: 'permission-denied' }, { sourceLabel: 'Good', kind: undefined }].filter(x => x.kind), [{ sourceLabel: 'Denied', kind: 'permission-denied' }]);
  });

  it('collects mocked async iterator results up to maxPages and reports truncation', async () => {
    const pages = [
      [{ Id: 1, Title: 'First', FileRef: '/Docs/A/First' }],
      [{ Id: 2, Title: 'Second', FileRef: '/Docs/A/Second' }],
      [{ Id: 3, Title: 'Third', FileRef: '/Docs/A/Third' }]
    ];
    let requestedPages = 0;
    const iterator = {
      next: async () => {
        const value = pages[requestedPages++];
        return value ? { done: false, value } : { done: true, value: undefined };
      }
    };
    let query: any;
    const selected: string[] = [];
    let filter = '';
    let top = 0;
    query = {
      select: (...fields: string[]) => { selected.push(...fields); return query; },
      expand: (field: string) => { assert.equal(field, 'ContentType'); return query; },
      filter: (value: string) => { filter = value; return query; },
      top: (value: number) => { top = value; return query; },
      [Symbol.asyncIterator]: () => iterator
    };
    const sp = { web: { getList: (url: string) => { assert.equal(url, '/Docs'); return { items: query }; } } };
    const result = await new SharePointInventoryService(sp as any, 'https://tenant.sharepoint.com').load({
      pageSize: 1,
      maxPages: 2,
      maxSources: 1,
      reviewFields: [{ key: 'ReviewStatus', label: 'Status', kind: 'status' }],
      sources: [{ id: 'a', label: 'A', libraryServerRelativeUrl: '/Docs', folderServerRelativeUrl: '/Docs/A' }]
    });

    assert.deepEqual(result.items.map(item => item.id), [1, 2]);
    assert.deepEqual(result.truncatedSources, ['A']);
    assert.equal(requestedPages, 2);
    assert.ok(selected.includes('ReviewStatus'));
    assert.equal(filter, "FileDirRef eq '/Docs/A' and FSObjType eq 0");
    assert.equal(top, 1);
  });
});
