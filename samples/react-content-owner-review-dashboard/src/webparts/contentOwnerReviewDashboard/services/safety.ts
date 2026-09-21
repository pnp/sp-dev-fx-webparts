const badPath = /[\\?#\s\u0000-\u001f\u007f]|(?:^|\/)\.\.(?:\/|$)|^\/\/|^[a-z][a-z0-9+.-]*:/i;
const badUrlInput = (value: string): boolean => /[\\\s\u0000-\u001f\u007f]/.test(value) || value.includes('#') || value.startsWith('//');
const absoluteUrlShape = /^https:\/\/[^@/?#:]+(?::\d{1,5})?(?:\/[^?#]*)?(?:\?[^#]*)?$/i;
const hasTraversal = (value: string): boolean => { try { const path = value.split(/[?#]/, 1)[0]; return [path, decodeURIComponent(path)].some(candidate => /(?:^|\/)\.\.(?:\/|$)/.test(candidate)); } catch (_) { return true; } };
export const validatePath = (path: string): string => { const p = path; if (typeof p !== 'string' || !p || p !== p.trim() || badPath.test(p)) throw new Error(`Invalid SharePoint path: ${path}`); return p.replace(/\/$/, ''); };
export const validateWebUrl = (value: string): URL => {
  if (typeof value !== 'string' || badUrlInput(value) || !absoluteUrlShape.test(value) || /\?/.test(value)) throw new Error('Invalid SharePoint web URL.');
  let url: URL;
  try { url = new URL(value); } catch (_) { throw new Error('Invalid SharePoint web URL.'); }
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Invalid SharePoint web URL.');
  return url;
};
export const safeUrl = (value: unknown, webUrl: string): string | null => {
  if (typeof value !== 'string' || !value || badUrlInput(value) || hasTraversal(value) || (!value.startsWith('/') && !absoluteUrlShape.test(value))) return null;
  try { const base = validateWebUrl(webUrl); const u = new URL(value, base); if (u.protocol !== 'https:' || u.origin !== base.origin || u.username || u.password || u.hash) return null; return u.href; } catch (_) { return null; }
};
export const nextUrl = (value: unknown, webUrl: string): string | null => safeUrl(value, webUrl);
