import { resultCountMessage } from './resultCount';

describe('resultCountMessage', () => {
  it('says nothing when there is nothing to count', () => {
    expect(resultCountMessage(0, 0, false)).toEqual('');
    expect(resultCountMessage(0, 147, true)).toEqual('');
  });

  describe('with no filter, where the total is Graph\'s own', () => {
    it('quotes the total while more results remain', () => {
      expect(resultCountMessage(10, 147, false)).toEqual('Showing 10 of 147 results');
    });

    it('drops the total once everything is loaded', () => {
      expect(resultCountMessage(147, 147, false)).toEqual('147 results');
    });

    it('says it in the singular for one', () => {
      expect(resultCountMessage(1, 1, false)).toEqual('1 result');
    });
  });

  describe('with a filter on, where the total no longer describes what is shown', () => {
    // The defect this exists to prevent: filtering happens over the results,
    // so Graph's total still counts every kind. "23 of 147" reads as "147
    // documents", which is not what 147 counted.
    it('never quotes a total it does not have', () => {
      const message = resultCountMessage(23, 147, true);

      expect(message).not.toContain('147');
      expect(message).toEqual('23 matching results');
    });

    it('still says it in the singular for one', () => {
      expect(resultCountMessage(1, 147, true)).toEqual('1 matching result');
    });

    it('does not claim everything is shown just because the numbers happen to meet', () => {
      // 25 fetched, 25 kept, but Graph had 147 across all kinds. Saying
      // "25 results" would imply that is all there is.
      expect(resultCountMessage(25, 147, true)).toEqual('25 matching results');
    });
  });
});
