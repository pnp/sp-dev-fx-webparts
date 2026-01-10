import { findUsernameForHashInFeed, buildUsernameToSamplesIndex } from '../utils/githubHash';

type FeedItem = { sampleId: string; allReactors: string[] };

self.addEventListener('message', async (ev) => {
  const msg = ev.data || {};
  try {
    try {
      if (msg.type === 'find-username') {
        const { feed, targetHash, concurrency } = msg as { feed: FeedItem[]; targetHash: string; concurrency?: number };
        const username = await findUsernameForHashInFeed(feed, targetHash, concurrency ?? 6);
        self.postMessage({ type: 'found', username: username ?? null });
        return;
      }

      if (msg.type === 'build-index') {
        const { feed } = msg as { feed: FeedItem[] };
        const index = await buildUsernameToSamplesIndex(feed, true);
        // serialize to plain object: username -> sampleId[]
        const out: Record<string, string[]> = {};
        for (const [k, set] of index.entries()) out[k] = Array.from(set);
        self.postMessage({ type: 'index-built', index: out });
        return;
      }

      self.postMessage({ type: 'error', error: 'unknown-message-type' });
    } catch (err) {
      // include stack if available
      const errMsg = err instanceof Error ? `${err.message}\n${err.stack}` : String(err);
      self.postMessage({ type: 'error', error: errMsg });
    }
  } catch (err) {
    try {
      self.postMessage({ type: 'error', error: String(err) });
    } catch {
      // last resort - cannot post back
    }
  }
});

export default null as any;
