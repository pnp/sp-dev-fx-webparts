// SharePoint URL helpers

/**
 * Returns true for SharePoint sharing links (/:i:/, /:f:/, /:u:/ etc.).
 */
export function isSharePointSharingLink(url: string): boolean {
  if (!url) return false;
  try {
    return /^\/:([ifubpvx]):\//i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}


/**
 * Resolves a SharePoint sharing link (/:i:/, /:f:/, etc.) to a direct file
 * URL by calling the SharePoint Graph-compatible shares API. The returned
 * webUrl is a plain file URL that can be used as an <img src>.
 */
export async function resolveSharePointUrl(
  url: string,
  fetcher: (apiUrl: string) => Promise<{ ok: boolean; json: () => Promise<unknown> }>,
): Promise<string> {
  if (!url || !isSharePointSharingLink(url)) return url;
  try {
    const u = new URL(url);
    const encoded = btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const apiUrl = `${u.origin}/_api/v2.0/shares/u!${encoded}/driveItem?$select=webUrl`;
    const resp = await fetcher(apiUrl);
    if (resp.ok) {
      const data = await resp.json() as { webUrl?: string };
      return data.webUrl || url;
    }
  } catch { /* ignore — return original URL */ }
  return url;
}

// Video URL helpers

/**
 * Returns true for streaming platform URLs (YouTube, Vimeo).
 * These must use the plain-iframe BackgroundVideo path — their player SDKs
 * inject external scripts that SharePoint's CSP blocks.
 * Direct file URLs (SharePoint, CDN, .mp4, .webm…) return false and use the
 * native <video> path instead.
 */
export function isStreamingUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.hostname.includes('youtube.com') ||
      u.hostname.includes('youtu.be') ||
      u.hostname.includes('vimeo.com')
    );
  } catch {
    return false;
  }
}

/**
 * Normalises YouTube URL variants to `https://www.youtube.com/watch?v=ID`
 * so the library's `detectVideoSource` can extract a valid video ID.
 * Vimeo and direct-file URLs are returned unchanged.
 *
 * Handled YouTube formats:
 *   youtube.com/watch?v=ID   → unchanged
 *   youtu.be/ID              → normalised
 *   youtube.com/shorts/ID    → normalised
 *   youtube.com/embed/ID     → normalised
 */
export function normalizeVideoSrc(url: string): string {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('youtube.com') && !u.hostname.includes('youtu.be')) return url;

    const vParam = u.searchParams.get('v');
    if (vParam) return `https://www.youtube.com/watch?v=${vParam}`;

    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1).split('?')[0];
      if (id) return `https://www.youtube.com/watch?v=${id}`;
    }

    const segMatch = u.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/);
    if (segMatch) return `https://www.youtube.com/watch?v=${segMatch[1]}`;
  } catch {
    // not a valid URL — return as-is
  }
  return url;
}

/**
 * Returns an embeddable iframe src for YouTube or Vimeo, or undefined for
 * direct-file URLs. Used to show a live preview player in the property pane.
 */
export function getStreamingEmbedUrl(src: string): string | undefined {
  try {
    const u = new URL(src);
    // YouTube
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const id =
        u.searchParams.get('v') ??
        (u.hostname.includes('youtu.be') ? u.pathname.slice(1).split('?')[0] : null);
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }
    // Vimeo
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

/**
 * Generates a unique item ID. Uses crypto.randomUUID() when available,
 * falling back to a Math.random-based string for older environments.
 */
export function generateId(): string {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `item-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}
