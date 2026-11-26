import { findAttestationItem, findAttestationItemId, mapAttestationItems, mapAttestationTitles, mapGraphSites, mapSearchRows } from "./liveSiteMapping";

describe("mapGraphSites", () => {
  it("maps id, displayName and webUrl", () => {
    expect(
      mapGraphSites([
        { id: "1", displayName: "Team Site", webUrl: "https://example.sharepoint.com/sites/team" },
      ], 'Unnamed site')
    ).toEqual([
      { id: "1", displayName: "Team Site", webUrl: "https://example.sharepoint.com/sites/team" },
    ]);
  });

  it("falls back to webUrl when displayName is missing", () => {
    expect(mapGraphSites([{ webUrl: "https://example.sharepoint.com/sites/x" }], 'Unnamed site')).toEqual([
      { id: "", displayName: "https://example.sharepoint.com/sites/x", webUrl: "https://example.sharepoint.com/sites/x" },
    ]);
  });
});

describe("mapAttestationTitles", () => {
  it("maps siteUrl to status and ignores malformed rows", () => {
    expect(
      mapAttestationTitles([
        "DemoMigration | confirmed | https://example.sharepoint.com/sites/demo",
        "garbage row",
        "X |  | https://example.sharepoint.com/sites/empty",
      ])
    ).toEqual({
      "https://example.sharepoint.com/sites/demo": "confirmed",
    });
  });
});

describe("findAttestationItemId", () => {
  it("finds the item for a site URL and returns undefined otherwise", () => {
    const items = [
      { Id: 1, Title: "A | confirmed | https://example.sharepoint.com/sites/a" },
      { Id: 2, Title: "B | fix | https://example.sharepoint.com/sites/b" },
    ];
    expect(findAttestationItemId(items, "https://example.sharepoint.com/sites/b")).toBe(2);
    expect(findAttestationItemId(items, "https://example.sharepoint.com/sites/c")).toBeUndefined();
  });

  it("returns the LATEST item when a site has several, so upsert is visible on reload", () => {
    const items = [
      { Id: 1, Title: "Demo | confirmed | https://example.sharepoint.com/sites/demo" },
      { Id: 2, Title: "Demo | confirmed | https://example.sharepoint.com/sites/demo" },
      { Id: 3, Title: "Demo | fix | https://example.sharepoint.com/sites/demo" },
    ];
    expect(findAttestationItemId(items, "https://example.sharepoint.com/sites/demo")).toBe(3);
  });
});

describe("mapAttestationItems", () => {
  it("prefers Status and SiteUrl columns over the Title encoding", () => {
    expect(
      mapAttestationItems([
        { Id: 1, Title: "Demo | fix | https://example.sharepoint.com/sites/demo", Status: "confirmed", SiteUrl: "https://example.sharepoint.com/sites/demo" },
      ])
    ).toEqual({ "https://example.sharepoint.com/sites/demo": "confirmed" });
  });
  it("still reads legacy Title-only rows", () => {
    expect(
      mapAttestationItems([
        { Id: 1, Title: "Demo | confirmed | https://example.sharepoint.com/sites/demo" },
      ])
    ).toEqual({ "https://example.sharepoint.com/sites/demo": "confirmed" });
  });
});

describe("findAttestationItem", () => {
  it("matches the SiteUrl column, and the latest row wins", () => {
    const items = [
      { Id: 1, Title: "Demo | confirmed | https://example.sharepoint.com/sites/demo" },
      { Id: 2, Title: "Other", Status: "fix", SiteUrl: "https://example.sharepoint.com/sites/demo" },
    ];
    expect(findAttestationItem(items, "https://example.sharepoint.com/sites/demo")?.Id).toBe(2);
    expect(findAttestationItem(items, "https://example.sharepoint.com/sites/other")).toBeUndefined();
  });
});

describe("mapSearchRows", () => {
  it("maps Title and Path, and drops rows without a Path", () => {
    expect(
      mapSearchRows([
        { Title: "Team Site", Path: "https://example.sharepoint.com/sites/team" },
        { Title: "No path" },
      ], 'Unnamed site')
    ).toEqual([
      { id: "https://example.sharepoint.com/sites/team", displayName: "Team Site", webUrl: "https://example.sharepoint.com/sites/team" },
    ]);
  });

  it("drops a personal site on a -my host", () => {
    expect(
      mapSearchRows([
        { Title: "Test User", Path: "https://example-my.sharepoint.com/personal/user_example_com" },
      ], 'Unnamed site')
    ).toEqual([]);
  });

  it("drops a personal site on a /personal/ path, even on a regular host", () => {
    expect(
      mapSearchRows([
        { Title: "Someone", Path: "https://example.sharepoint.com/personal/user_example_com" },
      ], 'Unnamed site')
    ).toEqual([]);
  });

  it("matches personal-site checks case-insensitively", () => {
    expect(
      mapSearchRows([
        { Title: "Someone", Path: "HTTPS://EXAMPLE-MY.SHAREPOINT.COM/Personal/user_example_com" },
      ], 'Unnamed site')
    ).toEqual([]);
  });

  it("keeps real sites: team, communication, group, Apps, DemoMigration", () => {
    const rows = [
      { Title: "Team Site", Path: "https://example.sharepoint.com/sites/team" },
      { Title: "Communication site", Path: "https://example.sharepoint.com" },
      { Title: "Retail", Path: "https://example.sharepoint.com/sites/Retail" },
      { Title: "Apps", Path: "https://example.sharepoint.com/sites/Apps" },
      { Title: "DemoMigration", Path: "https://example.sharepoint.com/sites/DemoMigration" },
    ];
    expect(mapSearchRows(rows, 'Unnamed site').map((site) => site.displayName)).toEqual([
      "Team Site",
      "Communication site",
      "Retail",
      "Apps",
      "DemoMigration",
    ]);
  });

  it("keeps only real sites from a mixed list", () => {
    expect(
      mapSearchRows([
        { Title: "Team Site", Path: "https://example.sharepoint.com/sites/team" },
        { Title: "Test User", Path: "https://example-my.sharepoint.com/personal/user_example_com" },
        { Title: "Apps", Path: "https://example.sharepoint.com/sites/Apps" },
        { Title: "Someone", Path: "https://example.sharepoint.com/personal/user_example_com" },
      ], 'Unnamed site').map((site) => site.displayName)
    ).toEqual(["Team Site", "Apps"]);
  });
});
