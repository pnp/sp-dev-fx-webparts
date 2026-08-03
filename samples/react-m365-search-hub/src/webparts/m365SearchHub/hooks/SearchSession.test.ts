import { ISearchState, SearchSession } from './SearchSession';
import { GraphSearchService, IGraphPoster } from '../services/GraphSearchService';

const graphResponse = (titles: string[], total = titles.length): unknown => ({
  value: [
    {
      hitsContainers: [
        {
          hits: titles.map((title) => ({
            hitId: title,
            summary: '',
            resource: {
              name: `${title}.docx`,
              title,
              webUrl: `https://contoso.sharepoint.com/${title}.docx`
            }
          })),
          total,
          moreResultsAvailable: total > titles.length
        }
      ]
    }
  ]
});

/**
 * A scheduler the test drives by hand.
 *
 * Timing is the thing under test, so it must not depend on a real clock.
 */
class ManualScheduler {
  private _pending = new Map<number, () => void>();
  private _next = 1;

  public readonly schedule = (callback: () => void): unknown => {
    const handle = this._next++;
    this._pending.set(handle, callback);
    return handle;
  };

  public readonly cancel = (handle: unknown): void => {
    this._pending.delete(handle as number);
  };

  /** Fires everything currently waiting, oldest first. */
  public flush(): void {
    const due: [number, () => void][] = [];
    this._pending.forEach((callback, handle) => due.push([handle, callback]));
    due.sort((a, b) => a[0] - b[0]);
    this._pending.clear();
    due.forEach(([, callback]) => callback());
  }

  public get pendingCount(): number {
    return this._pending.size;
  }
}

/** A poster whose every response the test resolves when it chooses. */
class ControlledPoster implements IGraphPoster {
  public calls: { body: unknown }[] = [];
  private _resolvers: ((value: unknown) => void)[] = [];

  public post(_path: string, body: unknown): Promise<unknown> {
    this.calls.push({ body });
    return new Promise((resolve) => {
      this._resolvers.push(resolve);
    });
  }

  /** Resolves the nth request, letting a slow one finish after a fast one. */
  public resolve(index: number, response: unknown): void {
    this._resolvers[index](response);
  }

  public get requestCount(): number {
    return this.calls.length;
  }
}

const textOf = (body: unknown): string =>
  (body as { requests: { query: { queryString: string } }[] }).requests[0].query.queryString;

/**
 * Lets pending promise callbacks run, without advancing any clock.
 *
 * A chain of resolved promises drains the microtask queue, which is where the
 * search continuations live. No timers are involved, so nothing here depends
 * on real time passing.
 */
const settle = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
};

describe('SearchSession', () => {
  let scheduler: ManualScheduler;
  let poster: ControlledPoster;
  let service: GraphSearchService;
  let states: ISearchState[];
  let session: SearchSession;

  const build = (): void => {
    scheduler = new ManualScheduler();
    poster = new ControlledPoster();
    service = new GraphSearchService(poster);
    states = [];
    session = new SearchSession(service, (state) => states.push(state), {
      debounceMs: 300,
      pageSize: 25,
      schedule: scheduler.schedule,
      cancelScheduled: scheduler.cancel
    });
  };

  beforeEach(build);

  const latest = (): ISearchState => states[states.length - 1];

  it('starts idle with nothing to show', () => {
    expect(session.state.status).toEqual('idle');
    expect(session.state.results).toHaveLength(0);
  });

  describe('debounce', () => {
    it('sends one request for a burst of typing, for the last text only', async () => {
      session.setText('a');
      session.setText('ab');
      session.setText('abc');

      scheduler.flush();
      await settle();

      expect(poster.requestCount).toEqual(1);
      expect(textOf(poster.calls[0].body)).toEqual('"abc"');
    });

    it('does not search text shorter than the minimum', () => {
      session.setText('ab');
      scheduler.flush();

      expect(poster.requestCount).toEqual(0);
      expect(latest().status).toEqual('idle');
    });

    it('abandons the pending search when the box is emptied', () => {
      session.setText('abc');
      session.setText('');

      expect(scheduler.pendingCount).toEqual(0);
      expect(latest().status).toEqual('idle');
      expect(latest().results).toHaveLength(0);
    });
  });

  describe('races', () => {
    it('keeps the newer answer when a slow search finishes after a fast one', async () => {
      // First search goes out and is left hanging.
      session.setText('slow');
      scheduler.flush();
      await settle();

      // Second search replaces it and comes back first.
      session.setText('fast');
      scheduler.flush();
      await settle();
      poster.resolve(1, graphResponse(['from fast']));
      await settle();

      expect(latest().results[0].title).toEqual('from fast');

      // Now the abandoned one answers. It must change nothing.
      poster.resolve(0, graphResponse(['from slow']));
      await settle();

      expect(latest().results[0].title).toEqual('from fast');
      expect(latest().status).toEqual('success');
    });

    it('reports nothing at all once disposed mid-search', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();

      const countAtDispose = states.length;
      session.dispose();

      poster.resolve(0, graphResponse(['too late']));
      await settle();

      expect(states).toHaveLength(countAtDispose);
    });

    it('starts no request when retry is called after disposal', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      const before = poster.requestCount;

      session.dispose();
      session.retry();
      await settle();

      expect(poster.requestCount).toEqual(before);
    });

    it('does not run a scheduled search that fires after disposal', async () => {
      session.setText('abc');
      session.dispose();

      scheduler.flush();
      await settle();

      expect(poster.requestCount).toEqual(0);
    });

    it('invalidates the search in flight when a filter changes', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();

      session.setKinds(['site']);
      await settle();

      // The first request was abandoned, and a second went out for the filter.
      expect(poster.requestCount).toEqual(2);

      poster.resolve(0, graphResponse(['stale']));
      await settle();

      expect(latest().results).toHaveLength(0);
      expect(latest().status).not.toEqual('success');
    });
  });

  describe('races, with a service that does not abandon anything', () => {
    // The service abandons a superseded request, which on its own is enough to
    // keep a stale answer away. These tests remove that protection so the
    // session's own guards are the only thing left standing: a sequence number
    // for superseded work, and a disposed flag for work whose owner has gone.
    // Without this, both guards are unreachable and untested.
    const buildWithoutAbort = (): { session: SearchSession; poster: ControlledPoster } => {
      const stubbornPoster = new ControlledPoster();
      const stubbornService = new GraphSearchService(stubbornPoster);
      stubbornService.cancelInFlight = () => undefined;

      return {
        session: new SearchSession(stubbornService, (state) => states.push(state), {
          schedule: scheduler.schedule,
          cancelScheduled: scheduler.cancel
        }),
        poster: stubbornPoster
      };
    };

    it('drops a superseded answer even when the service never abandoned it', async () => {
      const { session: unguarded, poster: slowPoster } = buildWithoutAbort();

      unguarded.setText('slow');
      scheduler.flush();
      await settle();

      unguarded.setText('fast');
      scheduler.flush();
      await settle();
      slowPoster.resolve(1, graphResponse(['from fast']));
      await settle();

      // The abandoned request answers late, and nothing aborted it.
      slowPoster.resolve(0, graphResponse(['from slow']));
      await settle();

      expect(latest().results.map((r) => r.title)).toEqual(['from fast']);
    });

    it('reports nothing after disposal even when the service never abandoned it', async () => {
      const { session: unguarded, poster: slowPoster } = buildWithoutAbort();

      unguarded.setText('abc');
      scheduler.flush();
      await settle();

      const countAtDispose = states.length;
      unguarded.dispose();

      slowPoster.resolve(0, graphResponse(['too late']));
      await settle();

      expect(states).toHaveLength(countAtDispose);
    });
  });

  describe('scope', () => {
    it('runs the search again when the scope changes', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['from the tenant']));
      await settle();

      session.setScope('https://contoso.sharepoint.com/sites/finance');
      await settle();

      expect(poster.requestCount).toEqual(2);
      const body = poster.calls[1].body as { requests: { query: { queryString: string } }[] };
      expect(body.requests[0].query.queryString).toContain('path:');
    });

    it('does not leave old results under a heading that no longer describes them', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['from the tenant']));
      await settle();
      expect(latest().results).toHaveLength(1);

      session.setScope('https://contoso.sharepoint.com/sites/finance');
      await settle();

      // The new search is in flight; what is shown is no longer claimed as
      // final, and the stale answer cannot come back to replace it.
      expect(latest().status).toEqual('loading');
      poster.resolve(1, graphResponse(['from the site']));
      await settle();
      expect(latest().results.map((r) => r.title)).toEqual(['from the site']);
    });

    it('starts the paging over when the scope changes', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['one'], 100));
      await settle();
      session.loadMore();
      await settle();
      poster.resolve(1, graphResponse(['two'], 100));
      await settle();

      session.setScope('https://x/sites/a');
      await settle();

      const body = poster.calls[2].body as { requests: { from: number }[] };
      expect(body.requests[0].from).toEqual(0);
    });

    it('shows nothing rather than searching when the box is empty', async () => {
      session.setScope('https://x/sites/a');
      await settle();

      expect(poster.requestCount).toEqual(0);
      expect(latest().status).toEqual('idle');
    });
  });

  describe('cache', () => {
    it('answers a repeated query without a loading state in between', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['first']));
      await settle();

      // Type something else, then come back to the original text.
      session.setText('abcd');
      scheduler.flush();
      await settle();
      const beforeReturn = states.length;

      session.setText('abc');
      scheduler.flush();
      await settle();

      const afterReturn = states.slice(beforeReturn);
      expect(afterReturn.some((state) => state.status === 'loading')).toBe(false);
      expect(latest().status).toEqual('success');
      expect(latest().timing.fromCache).toBe(true);
    });
  });

  describe('results', () => {
    it('reports empty rather than success when nothing matched', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse([]));
      await settle();

      expect(latest().status).toEqual('empty');
      expect(latest().query).toEqual('abc');
    });

    it('appends the next page instead of replacing what is shown', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['one', 'two'], 4));
      await settle();

      session.loadMore();
      await settle();
      poster.resolve(1, graphResponse(['three', 'four'], 4));
      await settle();

      expect(latest().results.map((r) => r.title)).toEqual(['one', 'two', 'three', 'four']);
      expect(latest().timing.pagesLoaded).toEqual(2);
    });

    it('does not ask for more when Graph said there is no more', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['only']));
      await settle();

      session.loadMore();
      await settle();

      expect(poster.requestCount).toEqual(1);
    });

    it('starts from the first page again when the sort changes', async () => {
      session.setText('abc');
      scheduler.flush();
      await settle();
      poster.resolve(0, graphResponse(['one'], 100));
      await settle();

      session.loadMore();
      await settle();
      poster.resolve(1, graphResponse(['two'], 100));
      await settle();

      session.setSort('date');
      await settle();

      const body = poster.calls[2].body as { requests: { from: number }[] };
      expect(body.requests[0].from).toEqual(0);
    });
  });

  describe('failures', () => {
    it('reports a denied permission as its own state, not as an error', async () => {
      const denying: IGraphPoster = { post: () => Promise.reject({ statusCode: 403 }) };
      const denied = new SearchSession(
        new GraphSearchService(denying),
        (state) => states.push(state),
        { schedule: scheduler.schedule, cancelScheduled: scheduler.cancel }
      );

      denied.setText('abc');
      scheduler.flush();
      await settle();

      expect(latest().status).toEqual('permissionDenied');
      expect(latest().failure).toEqual('permissionDenied');
    });

    it('reports a service problem as an error the person can retry', async () => {
      const failing: IGraphPoster = { post: () => Promise.reject({ statusCode: 503 }) };
      const broken = new SearchSession(
        new GraphSearchService(failing),
        (state) => states.push(state),
        { schedule: scheduler.schedule, cancelScheduled: scheduler.cancel }
      );

      broken.setText('abc');
      scheduler.flush();
      await settle();

      expect(latest().status).toEqual('error');
      expect(latest().failure).toEqual('serviceError');
    });
  });
});
