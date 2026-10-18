import { DemoScanService } from './DemoScanService';
import { evaluateScan, defaultOptions } from '../rules/evaluate';

/**
 * The demo data exists so a reviewer can see every rule fire without a tenant.
 * If a rule stops being exercised, this test fails and the demo data gets fixed.
 */
describe('DemoScanService', () => {
  const service = new DemoScanService();

  it('lists a document library and a pages library', async () => {
    const libraries = await service.listLibraries();
    expect(libraries.length).toBe(2);
    expect(libraries.filter(l => l.isPagesLibrary).length).toBe(1);
  });

  it('exercises every document rule in the release set', async () => {
    const libraries = await service.listLibraries();
    const policies = libraries.filter(l => l.id === 'demo-policies')[0];
    const facts = await service.scanLibrary(policies, 500);
    const result = evaluateScan(facts, defaultOptions());

    const fired = result.findings.map(f => f.ruleId);

    expect(fired).toContain('file-size-limit');
    expect(fired).toContain('excel-semantic-search');
    expect(fired).toContain('sensitivity-label-blocks-grounding');
    expect(fired).toContain('stale-content');
    expect(fired).toContain('sync-lag');
    expect(fired).toContain('knowledge-object-cap');
  });

  it('does not flag the 340 MB PDF, proving the two tier size rule in the demo data', async () => {
    const libraries = await service.listLibraries();
    const policies = libraries.filter(l => l.id === 'demo-policies')[0];
    const facts = await service.scanLibrary(policies, 500);
    const result = evaluateScan(facts, defaultOptions());

    const sizeFindings = result.findings.filter(f => f.ruleId === 'file-size-limit');
    expect(sizeFindings.length).toBe(1);
    expect(sizeFindings[0].target).toBe('Site backup archive.zip');
  });

  it('flags the pages library', async () => {
    const libraries = await service.listLibraries();
    const pages = libraries.filter(l => l.isPagesLibrary)[0];
    const facts = await service.scanLibrary(pages, 500);
    const result = evaluateScan(facts, defaultOptions());

    expect(result.findings.map(f => f.ruleId)).toContain('sharepoint-pages-unsupported');
  });

  it('reports truncation when the item cap is below the document count', async () => {
    const libraries = await service.listLibraries();
    const policies = libraries.filter(l => l.id === 'demo-policies')[0];
    const facts = await service.scanLibrary(policies, 2);
    expect(facts.truncated).toBe(true);
    expect(facts.documents.length).toBe(2);
  });
});
