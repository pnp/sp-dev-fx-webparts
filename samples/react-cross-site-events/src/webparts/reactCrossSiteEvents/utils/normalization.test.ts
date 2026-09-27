import { normalizeGraphEvent, normalizeGraphEvents, sortEvents } from './normalization';

describe('normalization', () => {
  const base = { start: { dateTime: '2026-08-30T10:00:00Z' }, end: { dateTime: '2026-08-30T11:00:00Z' } };

  it('normalizes optional Graph fields and preserves the source', () => {
    const event = normalizeGraphEvent({ ...base, id: '1', subject: 'Planning', location: { displayName: 'Room 1' } }, 'https://contoso.sharepoint.com/sites/a', 'a');
    expect(event).toMatchObject({ id: '1', subject: 'Planning', location: 'Room 1', sourceLabel: 'a' });
  });

  it('drops malformed or inverted events and sorts valid events', () => {
    const valid = { ...base, id: 'valid', subject: 'Later' };
    const early = { ...base, id: 'early', subject: 'Early', start: { dateTime: '2026-08-30T08:00:00Z' } };
    const invalid = { ...base, id: 'bad', start: { dateTime: '2026-08-30T12:00:00Z' } };
    expect(normalizeGraphEvents([valid, invalid], 'url', 'source')).toHaveLength(1);
    expect(sortEvents(normalizeGraphEvents([valid, early], 'url', 'source')).map(event => event.id)).toEqual(['early', 'valid']);
  });
});
