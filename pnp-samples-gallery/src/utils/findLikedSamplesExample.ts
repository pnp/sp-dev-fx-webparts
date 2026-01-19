import { findUsernameForHashInFeed, buildUsernameToSamplesIndex } from './githubHash';
import type { DiscussionFeedItem } from '../types/discussionReactions';
// Worker import - when using Vite or similar bundlers, you can import a module worker like:
// import HashWorker from '../workers/hashWorker?worker&inline';
// We'll lazy-create the worker at runtime for compatibility.

type FeedItem = DiscussionFeedItem;

// Example runner: given a feed object (array of FeedItem), resolves stored hashed id
// and prints the list of samples liked by the user.
export async function runExample(feed: FeedItem[]) {
  try {
    // Allow `feed` param to be different shapes (object with items, discussions, data, etc.)
    function coerceFeed(input: unknown): FeedItem[] {
      if (input == null) return [];

      // helper to test FeedItem shape
      const isFeedItem = (v: unknown): v is FeedItem => {
        if (typeof v !== 'object' || v === null) return false;
        const rec = v as Record<string, unknown>;
        return typeof rec.sampleId === 'string' && Array.isArray(rec.allReactors) && rec.allReactors.every(a => typeof a === 'string');
      };

      // If it's already an array, filter to FeedItems
      if (Array.isArray(input)) return input.filter(isFeedItem) as FeedItem[];

      if (typeof input === 'object' && input !== null) {
        const obj = input as Record<string, unknown>;

        // If `discussions` is an object keyed by sample id, convert to array
        const discussions = obj.discussions;
        if (discussions && typeof discussions === 'object' && !Array.isArray(discussions)) {
          const out: FeedItem[] = [];
          for (const key of Object.keys(discussions as Record<string, unknown>)) {
            const v = (discussions as Record<string, unknown>)[key] as Record<string, unknown> | undefined;
            const reactorsRaw = v?.allReactors ?? v?.reactors ?? v?.users ?? [];
            const reactors = Array.isArray(reactorsRaw) ? reactorsRaw.filter(r => typeof r === 'string') as string[] : [];
            out.push({ sampleId: key.replace(/^sample:/, ''), allReactors: reactors });
          }
          return out;
        }

        // common container keys that may be arrays
        const keys = ['items', 'data', 'feed', 'results'];
        for (const k of keys) {
          const val = obj[k];
          if (Array.isArray(val)) return val.filter(isFeedItem) as FeedItem[];
        }

        // if values are objects keyed by id, try to take their values and flatten any arrays
        const vals = Object.values(obj);
        if (vals.length > 0 && Array.isArray(vals[0])) {
          const flattened = (vals as unknown[][]).flat();
          return flattened.filter(isFeedItem) as FeedItem[];
        }
      }
      return [];
    }

    const coercedFeed = coerceFeed(feed as any);
    if (!Array.isArray(coercedFeed) || coercedFeed.length === 0) {
      console.debug('findLikedSamplesExample: feed is not an array or is empty. Top-level keys:', feed && typeof feed === 'object' ? Object.keys(feed) : typeof feed);
    }

    const storedHash = window.localStorage.getItem('pnp:github.id');
    if (!storedHash) {
      console.log('No stored hashed GitHub id found in localStorage (pnp:github.id)');
      return;
    }

    // console.log('Searching for username that matches stored hash...');
    let username: string | null = null;
    // Try to use Vite's bundled module worker via dynamic import with '?worker'.
    if (window.Worker) {
      try {
        const mod = await import('../workers/hashWorker?worker') as unknown;
        const maybeModule = mod as ({ default?: new () => Worker } | (new () => Worker) | undefined);
        let WorkerCtor: (new () => Worker) | undefined;
        if (typeof maybeModule === 'function') WorkerCtor = maybeModule as new () => Worker;
        else if (maybeModule && typeof (maybeModule as { default?: unknown }).default === 'function') WorkerCtor = (maybeModule as { default: new () => Worker }).default;
        if (!WorkerCtor) throw new Error('Worker constructor not found from module');
        const worker: Worker = new WorkerCtor();
        username = await new Promise<string | null>((resolve) => {
          const t = setTimeout(() => { try { worker.terminate(); } catch { /* ignore */ } ; resolve(null); }, 30_000);
          worker.onmessage = (ev) => {
            const m = ev.data || {};
            if (m.type === 'found') {
              clearTimeout(t);
              try { worker.terminate(); } catch { /* ignore */ }
              resolve(m.username ?? null);
            } else if (m.type === 'error') {
              clearTimeout(t);
              try { worker.terminate(); } catch { /* ignore */ }
              console.error('Worker reported error:', m.error);
              resolve(null);
            }
          };
          worker.onerror = (ev) => {
            clearTimeout(t);
            try { worker.terminate(); } catch { /* ignore */ }
            console.error('Worker runtime error event:', ev);
            resolve(null);
          };
          try {
            worker.postMessage({ type: 'find-username', feed: coercedFeed, targetHash: storedHash, concurrency: 6 });
          } catch (err) {
            clearTimeout(t);
            try { worker.terminate(); } catch { /* ignore */ }
            console.error('Failed to postMessage to worker:', err);
            resolve(null);
          }
        });
        } catch (err) {
        console.warn('Worker import/instantiation failed, falling back to main-thread hashing', err);
        username = await findUsernameForHashInFeed(coercedFeed as any, storedHash, 6);
      }
    } else {
      username = await findUsernameForHashInFeed(coercedFeed, storedHash, 6);
    }
    if (!username) {
      // console.log('No matching username found in this feed for the stored hash.');

      try {
        // Dump diagnostics: list first 200 unique normalized usernames and their computed hashes (truncated)
        const flatUsers: string[] = [];
        for (const it of coercedFeed) {
          for (const u of it.allReactors ?? []) {
            if (typeof u !== 'string') continue;
            const n = u.trim().toLowerCase();
            if (n && !flatUsers.includes(n)) flatUsers.push(n);
          }
        }
        const sample = flatUsers.slice(0, 200);
        // console.debug('Diagnostic: first normalized usernames (up to 200):', sample);
        // compute hashes sequentially (avoid worker) for these samples so we can compare
        const mod = await import('./githubHash');
        const { sha256Hex } = mod as { sha256Hex: (v: string) => Promise<string> };
        const pairs: Array<{ user: string; hash: string }> = [];
        for (const u of sample) {
          try {
            const h = await sha256Hex(u);
            pairs.push({ user: u, hash: h });
          } catch {
            // ignore
          }
        }
        // console.debug('Diagnostic: normalized username -> sha256:', pairs.slice(0, 50));
      } catch (e) {
        console.debug('Diagnostic hashing failed:', e);
      }

      return;
    }
    // console.log('Matched username:', username);

    // Build or reuse index to find which samples the user reacted to
    const index = await buildUsernameToSamplesIndex(coercedFeed as any, true);
    const liked = index.get(username) ?? new Set<string>();
    console.log('User liked samples:', Array.from(liked));
  } catch (err) {
    console.error('Error running example:', err);
  }
}

// If running in a page where discussion-reactions.json is available via fetch,
// you can call the example automatically (disabled by default). Uncomment to auto-run.
// (async () => {
//   try {
//     const res = await fetch('/path/to/discussion-reactions.json');
//     const feed = await res.json();
//     await runExample(feed);
//   } catch (e) { console.error(e); }
// })();

export default runExample;
