/* Pure mapping for Graph site permissions. No PnP import here, so this
 * module stays testable under Jest. */

export interface IGraphPermission {
  link?: { type?: string };
}

export interface ISharingCounts {
  anyoneLinks: number;
  sharingLinks: number;
}

/* Only permissions that carry a link are sharing links. Direct grants
 * without a link are not links, so they are not counted. */
export function countSharingLinks(permissions: IGraphPermission[]): ISharingCounts {
  let anyoneLinks = 0;
  let sharingLinks = 0;
  for (const permission of permissions) {
    if (!permission.link) continue;
    sharingLinks++;
    if (permission.link.type === "anonymous") anyoneLinks++;
  }
  return { anyoneLinks, sharingLinks };
}

export function sitePathParts(siteUrl: string): { hostname: string; path: string } | undefined {
  try {
    const url = new URL(siteUrl);
    const path = url.pathname.replace(/^\/|\/$/g, "");
    return { hostname: url.hostname, path };
  } catch {
    return undefined;
  }
}
