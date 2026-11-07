export interface ILiveSite {
  id: string;
  displayName: string;
  webUrl: string;
}

export function mapGraphSites(
  sites: Array<{ id?: string; displayName?: string; webUrl?: string }>,
  unnamedSite: string
): ILiveSite[] {
  return sites.map((site) => ({
    id: site.id || "",
    displayName: site.displayName || site.webUrl || unnamedSite,
    webUrl: site.webUrl || "",
  }));
}

export interface ISearchRow {
  Title?: string;
  Path?: string;
}

// Attestation items are stored Title-only as "siteTitle | status | siteUrl".
// Returns webUrl -> status, ignoring malformed rows.
export function mapAttestationTitles(titles: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const title of titles) {
    const parts = title.split(" | ");
    if (parts.length === 3 && parts[1] !== "" && parts[2] !== "") {
      result[parts[2]] = parts[1];
    }
  }
  return result;
}

export interface IAttestationItem {
  Id?: number;
  Title?: string;
  Status?: string;
  SiteUrl?: string;
}

// Dedicated Status and SiteUrl columns win over the legacy Title
// encoding. Legacy rows without columns still read, so an attestation
// saved by an older version is not lost on upgrade.
export function mapAttestationItems(items: IAttestationItem[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const item of items) {
    const titleParts = (item.Title || "").split(" | ");
    const url = item.SiteUrl || (titleParts.length === 3 ? titleParts[2] : "");
    const status = item.Status || (titleParts.length === 3 ? titleParts[1] : "");
    if (url !== "" && status !== "") {
      result[url] = status;
    }
  }
  return result;
}

// Upsert must update the LATEST item for a site, not the first one.
// Items arrive in creation order, and read-back (mapAttestationTitles)
// lets later items overwrite earlier ones, so updating the first item is
// invisible: the latest item still wins on reload. This was the 1.0.5.0
// test-app bug: Confirmed reported "Saved" while the latest "fix" item
// still won on reload.
export function findAttestationItemId(
  items: Array<{ Id?: number; Title?: string }>,
  siteUrl: string
): number | undefined {
  let latest: number | undefined;
  for (const item of items) {
    if ((item.Title || "").split(" | ")[2] === siteUrl) {
      latest = item.Id;
    }
  }
  return latest;
}

// Same latest-wins rule, matching the SiteUrl column first, then the
// legacy Title encoding, so an upsert never creates a duplicate row.
export function findAttestationItem(
  items: IAttestationItem[],
  siteUrl: string
): IAttestationItem | undefined {
  let latest: IAttestationItem | undefined;
  for (const item of items) {
    const titleUrl = (item.Title || "").split(" | ")[2] || "";
    if (item.SiteUrl === siteUrl || titleUrl === siteUrl) {
      latest = item;
    }
  }
  return latest;
}

// A personal site is a user's own OneDrive site, not a shared site.
function isPersonalSite(webUrl: string): boolean {
  const url = webUrl.toLowerCase();
  return url.includes("-my.sharepoint.com") || url.includes("/personal/");
}

export function mapSearchRows(rows: ISearchRow[], unnamedSite: string): ILiveSite[] {
  return rows
    .map((row) => {
      const webUrl = row.Path || "";
      return {
        id: webUrl,
        displayName: row.Title || webUrl || unnamedSite,
        webUrl,
      };
    })
    .filter((site) => site.webUrl !== "" && !isPersonalSite(site.webUrl));
}
