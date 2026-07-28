import { failureOf, GraphSearchService, IGraphPoster, isCancelled } from './GraphSearchService';
import { SearchCache } from './SearchCache';
import { ISearchPage, ISearchQuery } from '../models/ISearchModels';

const aQuery = (over: Partial<ISearchQuery> = {}): ISearchQuery => ({
  text: 'budget',
  kinds: [],
  sort: 'relevance',
  from: 0,
  size: 25,
  ...over
});

const graphResponse = (hits: unknown[] = [], total = hits.length): unknown => ({
  value: [{ hitsContainers: [{ hits, total, moreResultsAvailable: false }] }]
});

const aHit = (url: string): unknown => ({
  hitId: url,
  summary: '',
  resource: { name: 'Budget.xlsx', webUrl: url }
});

/**
 * Asserts a search was abandoned rather than failed.
 *
 * Written out rather than using a matcher so the failure message says which of
 * the two happened, which is the whole distinction being tested.
 */
async function expectCancelled(promise: Promise<unknown>): Promise<void> {
  let caught: unknown;
  try {
    await promise;
  } catch (error) {
    caught = error;
  }

  expect(caught).toBeDefined();
  expect(isCancelled(caught)).toBe(true);
}

/** Asserts a search failed with a particular normalised outcome. */
async function expectFailure(promise: Promise<unknown>, expected: string): Promise<void> {
  let caught: unknown;
  try {
    await promise;
  } catch (error) {
    caught = error;
  }

  expect(failureOf(caught)).toEqual(expected);
}

/** A poster whose responses the test controls, recording what it was asked. */
class FakePoster implements IGraphPoster {
  public calls: { path: string; body: unknown; signal?: AbortSignal }[] = [];
  private _handler: (call: number) => Promise<unknown>;

  public constructor(handler?: (call: number) => Promise<unknown>) {
    this._handler = handler || (() => Promise.resolve(graphResponse()));
  }

  public post(path: string, body: unknown, signal?: AbortSignal): Promise<unknown> {
    this.calls.push({ path, body, signal });
    return this._handler(this.calls.length - 1);
  }
}

describe('GraphSearchService', () => {
  it('posts to the search endpoint with the built request', async () => {
    const poster = new FakePoster();
    const service = new GraphSearchService(poster);

    await service.search(aQuery());

    expect(poster.calls[0].path).toEqual('/search/query');
    expect(poster.calls[0].body).toEqual(
      expect.objectContaining({
        requests: [expect.objectContaining({ entityTypes: ['driveItem', 'listItem', 'site'] })]
      })
    );
  });

  it('returns normalised results rather than the raw response', async () => {
    const poster = new FakePoster(() =>
      Promise.resolve(graphResponse([aHit('https://contoso.sharepoint.com/a.docx')], 42))
    );
    const outcome = await new GraphSearchService(poster).search(aQuery());

    expect(outcome.page.results).toHaveLength(1);
    expect(outcome.page.total).toEqual(42);
    expect(outcome.fromCache).toBe(false);
  });

  describe('cache', () => {
    it('serves a repeated query without asking Graph again', async () => {
      const poster = new FakePoster();
      const service = new GraphSearchService(poster);

      await service.search(aQuery());
      const second = await service.search(aQuery());

      expect(poster.calls).toHaveLength(1);
      expect(second.fromCache).toBe(true);
      expect(second.durationMs).toEqual(0);
    });

    it('treats a different page as a different query', async () => {
      const poster = new FakePoster();
      const service = new GraphSearchService(poster);

      await service.search(aQuery({ from: 0 }));
      await service.search(aQuery({ from: 25 }));

      expect(poster.calls).toHaveLength(2);
    });

    it('asks Graph again once the cache has been cleared', async () => {
      const poster = new FakePoster();
      const service = new GraphSearchService(poster);

      await service.search(aQuery());
      service.clearCache();
      await service.search(aQuery());

      expect(poster.calls).toHaveLength(2);
    });

    it('does not cache a failed request', async () => {
      const poster = new FakePoster((call) =>
        call === 0 ? Promise.reject({ statusCode: 500 }) : Promise.resolve(graphResponse())
      );
      const service = new GraphSearchService(poster);

      await expectFailure(service.search(aQuery()), 'serviceError');
      await service.search(aQuery());

      expect(poster.calls).toHaveLength(2);
    });
  });

  describe('cancellation', () => {
    it('marks the request in flight as no longer wanted when a newer one starts', async () => {
      let resolveFirst: (value: unknown) => void = () => undefined;
      const poster = new FakePoster((call) =>
        call === 0
          ? new Promise((resolve) => {
              resolveFirst = resolve;
            })
          : Promise.resolve(graphResponse())
      );
      const service = new GraphSearchService(poster);

      const first = service.search(aQuery({ text: 'budg' }));
      const second = service.search(aQuery({ text: 'budget' }));

      // The signal is aborted; whether the request itself stops is the
      // poster's business, and with the Graph client it does not.
      expect(poster.calls[0].signal?.aborted).toBe(true);

      resolveFirst(graphResponse());
      await expectCancelled(first);
      await expect(second).resolves.toBeDefined();
    });

    it('counts what it abandoned, for the performance panel', async () => {
      const poster = new FakePoster((call) =>
        call === 0 ? new Promise(() => undefined) : Promise.resolve(graphResponse())
      );
      const service = new GraphSearchService(poster);

      service.search(aQuery({ text: 'budg' })).catch(() => undefined);
      await service.search(aQuery({ text: 'budget' }));

      expect(service.cancelledCount).toEqual(1);
    });

    it('reports an abandoned request as cancelled, never as an error to show', async () => {
      const abortError = Object.assign(new Error('aborted'), { name: 'AbortError' });
      const poster = new FakePoster(() => Promise.reject(abortError));

      await expectCancelled(new GraphSearchService(poster).search(aQuery()));
    });

    it('does nothing when asked to cancel with nothing in flight', () => {
      const service = new GraphSearchService(new FakePoster());

      expect(() => service.cancelInFlight()).not.toThrow();
      expect(service.cancelledCount).toEqual(0);
    });

    it('does not count a completed request as cancelled', async () => {
      const service = new GraphSearchService(new FakePoster());

      await service.search(aQuery());
      service.cancelInFlight();

      expect(service.cancelledCount).toEqual(0);
    });
  });

  describe('errors', () => {
    it('throws the normalised outcome, not the Graph error', async () => {
      const poster = new FakePoster(() => Promise.reject({ statusCode: 403 }));

      await expectFailure(new GraphSearchService(poster).search(aQuery()), 'permissionDenied');
    });

    it('separates a sign-in problem from a denied permission', async () => {
      const poster = new FakePoster(() => Promise.reject({ statusCode: 401 }));

      await expectFailure(new GraphSearchService(poster).search(aQuery()), 'notAuthenticated');
    });
  });

  describe('timing', () => {
    it('measures how long the request took', async () => {
      let clock = 0;
      const poster = new FakePoster(() => {
        clock += 120;
        return Promise.resolve(graphResponse());
      });
      const service = new GraphSearchService(poster, { now: () => clock });

      const outcome = await service.search(aQuery());

      expect(outcome.durationMs).toEqual(120);
    });

    it('reports no duration for an answer that came from the cache', async () => {
      const cache = new SearchCache<ISearchPage>();
      const service = new GraphSearchService(new FakePoster(), { cache });

      await service.search(aQuery());
      const second = await service.search(aQuery());

      expect(second).toEqual(expect.objectContaining({ durationMs: 0, fromCache: true }));
    });
  });
});
