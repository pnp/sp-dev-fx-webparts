import { shouldShowKind } from './SearchResults';
import { ISearchResult } from '../models/ISearchModels';
const of = (...kinds: string[]): ISearchResult[] =>
  kinds.map((kind, i) => ({ id: `${i}`, kind, title: 't', summary: '', url: `u${i}` }) as ISearchResult);

describe('shouldShowKind', () => {
  it('shows the kind when the results are of mixed kinds', () => {
    expect(shouldShowKind(of('document', 'page', 'site'))).toBe(true);
  });

  it('hides it when every result is the same kind, which a filter guarantees', () => {
    // Repeating "Documents" on twenty-five documents adds nothing to titles
    // that already end in .pdf.
    expect(shouldShowKind(of('document', 'document', 'document'))).toBe(false);
  });

  it('hides it for a single result, where there is nothing to tell apart', () => {
    expect(shouldShowKind(of('document'))).toBe(false);
  });

  it('has nothing to show for no results', () => {
    expect(shouldShowKind([])).toBe(false);
  });
});
