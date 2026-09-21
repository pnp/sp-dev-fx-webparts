export function safeItemUrl(webUrl: string, listTitle: string, id: number): string | undefined {
  if (!Number.isInteger(id) || id < 1) {
    return undefined;
  }
  try {
    const base = new URL(webUrl);
    if (base.protocol !== 'http:' && base.protocol !== 'https:') {
      return undefined;
    }
    const path = `${base.pathname.replace(/\/$/, '')}/Lists/${encodeURIComponent(listTitle)}/EditForm.aspx`;
    return new URL(`${path}?ID=${id}`, base).href;
  } catch {
    return undefined;
  }
}
