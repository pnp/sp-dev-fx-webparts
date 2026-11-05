/* Graph site permissions, mapped to sharing-link counts. Any failure
 * returns undefined, so the caller keeps the signal Unknown, never zero. */

import { GraphQueryable } from "@pnp/graph";
import { countSharingLinks, sitePathParts, type IGraphPermission, type ISharingCounts } from "./graphSharingCounts";

export async function getSiteSharingCounts(
  graph: unknown,
  siteUrl: string
): Promise<ISharingCounts | undefined> {
  try {
    const parts = sitePathParts(siteUrl);
    if (!parts) return undefined;
    const endpoint = parts.path
      ? `sites/${parts.hostname}:/${parts.path}:/permissions`
      : `sites/${parts.hostname}/permissions`;
    const result = await (GraphQueryable as unknown as (
      base: unknown,
      path?: string
    ) => () => Promise<{ value?: IGraphPermission[] } | IGraphPermission[]>)([graph, endpoint])();
    const permissions = Array.isArray(result) ? result : result.value || [];
    return countSharingLinks(permissions);
  } catch {
    return undefined;
  }
}
