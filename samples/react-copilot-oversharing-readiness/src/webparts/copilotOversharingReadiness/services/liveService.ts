/* Live data service. Search lists sites on the user's own token; Graph
 * listing was abandoned after two 403s (no consented Sites.Read.All).
 * Sensitivity labels read from the site object. Sharing-link counts read
 * from Graph site permissions when Graph answers; any failed read stays
 * Unknown, never guessed as zero. */
import type { SPFI } from "@pnp/sp";
import type { GraphFI } from "@pnp/graph";
import "@pnp/graph/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/search";
import "@pnp/sp/sites";
import "@pnp/sp/fields";
import { findAttestationItem, mapAttestationItems, mapAttestationTitles, mapGraphSites, mapSearchRows } from "./liveSiteMapping";
import type { ILiveSite } from "./liveSiteMapping";
import { Web } from "@pnp/sp/webs";
import { Site } from "@pnp/sp/sites";
import "@pnp/sp/site-users";
import "@pnp/sp/security";
import { calculateLiveRisk, daysBetween, everyoneFromLogins, type ILiveRisk } from "./liveRisk";
import { getSiteSharingCounts } from "./graphSharing";
import type { IRiskSettings } from "./riskSettings";
import type { IRiskStrings } from "./riskStrings";

export interface ILiveSiteRisk {
  risk: ILiveRisk;
  owner: string;
  error: string;
}

/* One site at a time, guarded so an unreadable site still lists. */
export async function getLiveSiteRisks(
  sp: SPFI,
  sites: ILiveSite[],
  settings: IRiskSettings,
  s: IRiskStrings,
  graph?: GraphFI
): Promise<Record<string, ILiveSiteRisk>> {
  const results: Record<string, ILiveSiteRisk> = {};
  await Promise.all(
    sites.map(async (site) => {
      try {
        const web = Web([sp.web, site.webUrl]);
        const info = (await web.select("HasUniqueRoleAssignments", "LastItemModifiedDate")()) as unknown as {
          HasUniqueRoleAssignments?: boolean;
          LastItemModifiedDate?: string;
        };
        const admins = (await web.siteUsers
          .filter("IsSiteAdmin eq true")
          .select("Title", "LoginName")
          .top(5)()) as Array<{ Title?: string; LoginName?: string }>;
        const assignments = (await web.roleAssignments
          .select("Member/LoginName")
          .expand("Member")
          .top(100)()) as Array<{ Member?: { LoginName?: string } }>;
        const logins = assignments
          .map((a) => a.Member?.LoginName || "")
          .filter((login) => login !== "");
        const claims = everyoneFromLogins(logins);
        const inactiveDays = info.LastItemModifiedDate
          ? daysBetween(info.LastItemModifiedDate, Date.now())
          : undefined;
        /* Guarded reads: a failed label or sharing read must not wipe
         * the signals above, it only leaves that signal Unknown. */
        let sensitivityLabel: string | undefined;
        try {
          const siteInfo = (await Site([sp.web, site.webUrl])
            .select("SensitivityLabel", "SensitivityLabelId")()) as unknown as {
            SensitivityLabel?: string;
            SensitivityLabelId?: string | null;
          };
          sensitivityLabel = siteInfo.SensitivityLabel || siteInfo.SensitivityLabelId || "";
        } catch {
          sensitivityLabel = undefined;
        }
        let anyoneLinks: number | undefined;
        let sharingLinks: number | undefined;
        if (graph) {
          const counts = await getSiteSharingCounts(graph, site.webUrl);
          if (counts) {
            anyoneLinks = counts.anyoneLinks;
            sharingLinks = counts.sharingLinks;
          }
        }
        results[site.webUrl] = {
          risk: calculateLiveRisk({
            everyone: claims.everyone,
            everyoneExceptExternal: claims.everyoneExceptExternal,
            brokenInheritance: info.HasUniqueRoleAssignments,
            inactiveDays: inactiveDays !== undefined && inactiveDays >= 0 ? inactiveDays : undefined,
            anyoneLinks,
            sharingLinks,
            sensitivityLabel,
          }, settings, s),
          owner: admins.length > 0 ? admins[0].Title || admins[0].LoginName || "" : s.ownerNoActive,
          error: "",
        };
      } catch (e) {
        results[site.webUrl] = {
          risk: calculateLiveRisk({}, settings, s),
          owner: "",
          error: e instanceof Error ? e.message : s.errorRiskReadFailed,
        };
      }
    })
  );
  return results;
}

export type { ILiveSite };

export async function getLiveSites(graph: GraphFI, unnamedSite: string): Promise<ILiveSite[]> {
  const sitesCollection = graph.sites;
  sitesCollection.query.set("search", "*");
  const sites = await sitesCollection
    .select("id", "displayName", "webUrl")
    .top(50)();
  return mapGraphSites(sites as unknown as ILiveSite[], unnamedSite);
}

export async function getLiveSitesViaSearch(sp: SPFI, rowLimit: number, unnamedSite: string): Promise<ILiveSite[]> {
  const result = await sp.search({
    Querytext: "contentclass:STS_Site",
    SelectProperties: ["Title", "Path"],
    RowLimit: rowLimit,
    TrimDuplicates: false,
  });
  return mapSearchRows(result.PrimarySearchResults, unnamedSite);
}

export const ATTESTATION_LIST_TITLE = "Copilot Oversharing Attestations";

export async function getAttestations(sp: SPFI): Promise<Record<string, string>> {
  try {
    const items = await sp.web.lists
      .getByTitle(ATTESTATION_LIST_TITLE)
      .items.select("Title", "Status", "SiteUrl")
      .top(100)();
    return mapAttestationItems(items as Array<{ Title?: string; Status?: string; SiteUrl?: string }>);
  } catch {
    /* List from an older version has no columns yet: fall back to Title. */
    try {
      const items = await sp.web.lists
        .getByTitle(ATTESTATION_LIST_TITLE)
        .items.select("Title")
        .top(100)();
      return mapAttestationTitles(
        (items as Array<{ Title?: string }>).map((item) => item.Title || "")
      );
    } catch {
      return {};
    }
  }
}

async function ensureAttestationColumns(sp: SPFI): Promise<void> {
  const list = sp.web.lists.getByTitle(ATTESTATION_LIST_TITLE);
  const fields = (await list.fields.select("InternalName").top(100)()) as Array<{ InternalName?: string }>;
  const names = fields.map((field) => field.InternalName || "");
  if (names.indexOf("Status") < 0) {
    await list.fields.addText("Status");
  }
  if (names.indexOf("SiteUrl") < 0) {
    await list.fields.addText("SiteUrl");
  }
}

export async function recordAttestation(
  sp: SPFI,
  siteTitle: string,
  siteUrl: string,
  status: string,
  listDescription: string
): Promise<void> {
  await sp.web.lists.ensure(ATTESTATION_LIST_TITLE, listDescription, 100);
  await ensureAttestationColumns(sp);
  const list = sp.web.lists.getByTitle(ATTESTATION_LIST_TITLE);
  const existing = await list.items.select("Id", "Title", "Status", "SiteUrl").top(100)();
  const existingItem = findAttestationItem(
    existing as Array<{ Id?: number; Title?: string; Status?: string; SiteUrl?: string }>,
    siteUrl
  );
  const title = `${siteTitle} | ${status} | ${siteUrl}`;
  if (existingItem?.Id !== undefined) {
    await list.items.getById(existingItem.Id).update({ Title: title, Status: status, SiteUrl: siteUrl });
  } else {
    await list.items.add({ Title: title, Status: status, SiteUrl: siteUrl });
  }
}
