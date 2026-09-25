import { getQueryBounds, MAX_ITEMS, normalizeAuditConfig } from './AuditConfig';

describe('audit bounds', () => {
  it('caps list reads and forces one page item', () => {
    expect(getQueryBounds(normalizeAuditConfig({ sourceType: 'list', itemLimit: 999, contentFields: ['Title', 'Nope'] })).itemLimit).toBe(MAX_ITEMS);
    expect(getQueryBounds(normalizeAuditConfig({ sourceType: 'page', itemLimit: 20 })).itemLimit).toBe(1);
  });
  it('allows only configured content fields', () => expect(normalizeAuditConfig({ contentFields: ['Title', 'Nope', 'CanvasContent1'] }).contentFields).toEqual(['Title', 'CanvasContent1']));
});
