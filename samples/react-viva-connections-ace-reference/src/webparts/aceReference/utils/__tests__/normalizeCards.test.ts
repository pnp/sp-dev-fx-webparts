import { MAX_CARDS, normalizeCards, parseCards, safeUrl, toCardViewModel } from '../normalizeCards';

describe('card model', () => {
  const card = { title: ' One ', summary: 'Summary', category: '', link: 'https://example.com/path' };
  it('normalizes valid cards with stable defaults', () => { expect(normalizeCards([card])[0]).toEqual({ id: 'card-1', title: 'One', summary: 'Summary', category: 'Reference', link: 'https://example.com/path' }); });
  it('caps cards at eight', () => { expect(normalizeCards(Array.from({ length: MAX_CARDS + 2 }, (_, i) => ({ ...card, title: `Card ${i}` })))).toHaveLength(MAX_CARDS); });
  it('rejects malformed cards', () => { expect(normalizeCards([null, {}, { title: 'valid' }, { summary: 'valid' }, { title: 'ok', summary: 'yes' }])).toHaveLength(1); });
  it('accepts only safe http(s) URLs', () => { expect(safeUrl('javascript:alert(1)')).toBeUndefined(); expect(safeUrl('file:///tmp/a')).toBeUndefined(); expect(safeUrl('https://user:pass@example.com')).toBeUndefined(); expect(safeUrl('http://example.com')).toBe('http://example.com/'); });
  it('parses invalid JSON as no cards', () => { expect(parseCards('{')).toEqual([]); });
  it('creates the rendering model', () => { const model = toCardViewModel(normalizeCards([card])[0]); expect(model.ariaLabel).toBe('One. Reference. Summary'); });
});
