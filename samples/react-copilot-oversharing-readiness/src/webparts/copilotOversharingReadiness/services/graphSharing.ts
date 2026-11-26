/* Graph site permissions, mapped to sharing-link counts. Any failure
 * returns undefined, so the caller keeps the signal Unknown, never
 * zero. Note: GraphFI itself has no toUrl, so it must not be passed
 * as a queryable base (that threw "toUrl is not a function" live);
 * its root Queryable is the correct base. */

import { GraphQueryable, type GraphFI, type IGraphQueryable } from "@pnp/graph";
import { countSharingLinks, sitePathParts, type IGraphPermission, type ISharingCounts } from "./graphSharingCounts";

export async function getSiteSharingCounts(
  graph: GraphFI,
  siteUrl: string
): Promise<ISharingCounts | undefined> {
  try {
    const parts = sitePathParts(siteUrl);
    if (!parts) return undefined;
    const endpoint = parts.path
      ? `sites/${parts.hostname}:/${parts.path}:/permissions`
      : `sites/${parts.hostname}/permissions`;
    const root = (graph as unknown as { _root: IGraphQueryable })._root;
    const result = await (GraphQueryable as unknown as (
      base: unknown,
      path?: string
    ) => () => Promise<{ value?: IGraphPermission[] } | IGraphPermission[]>)(root, endpoint)();
    const permissions = Array.isArray(result) ? result : result.value || [];
    return countSharingLinks(permissions);
  } catch {
    return undefined;
  }
}
