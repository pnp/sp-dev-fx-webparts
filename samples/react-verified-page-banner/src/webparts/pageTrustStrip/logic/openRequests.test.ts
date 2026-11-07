import {
  buildOpenRequestsViewUrl,
  countOpenReviewItems,
  itemMatchesOpenRequest,
  openRequestBadgeLabel,
  openRequestViewQuery,
  pageKeyFromUrl,
  planOpenCount,
  shouldShowOpenRequestBadge,
  strictOpenCountPlan
} from "./openRequests";

const pageUrl = "https://contoso.sharepoint.com/sites/hr/SitePages/Q3 launch.aspx?Mode=Edit#comments";
const pageKey = "/sites/hr/SitePages/Q3 launch.aspx";

describe("pageKeyFromUrl", () => {
  it("uses the server-relative path and drops the query and hash", () => {
    expect(pageKeyFromUrl(pageUrl)).toBe(pageKey);
  });

  it("keeps a path that is already server-relative", () => {
    expect(pageKeyFromUrl("/sites/hr/SitePages/Home.aspx?Mode=Edit")).toBe("/sites/hr/SitePages/Home.aspx");
  });

  it("rejects empty values and paths that cannot be indexed", () => {
    expect(pageKeyFromUrl(undefined)).toBeUndefined();
    expect(pageKeyFromUrl("   ")).toBeUndefined();
    expect(pageKeyFromUrl("not a url")).toBeUndefined();
    expect(pageKeyFromUrl(`https://contoso.sharepoint.com/${"a".repeat(255)}`)).toBeUndefined();
  });

  it("keeps a path of exactly 255 characters", () => {
    const path = `/${"a".repeat(254)}`;
    expect(path.length).toBe(255);
    expect(pageKeyFromUrl(`https://contoso.sharepoint.com${path}`)).toBe(path);
  });
});

describe("planOpenCount", () => {
  it("filters Status and PageKey, including blank keys for older items", () => {
    const plan = planOpenCount(true, pageUrl);
    expect(plan.mode).toBe("indexed");
    expect(plan.filter).toBe(
      `Status eq 'New' and (PageKey eq '${pageKey}' or PageKey eq null)`
    );
    expect(plan.filter.indexOf("PageLink")).toBe(-1);
    expect(plan.selectFields).toEqual(["Id", "PageKey", "PageLink"]);
  });

  it("escapes single quotes in the page key", () => {
    const plan = planOpenCount(true, "https://contoso.sharepoint.com/sites/hr/SitePages/O'Brien.aspx");
    expect(plan.filter).toContain("PageKey eq '/sites/hr/SitePages/O''Brien.aspx'");
  });

  it("falls back to Status only when PageKey cannot be used", () => {
    expect(planOpenCount(false, pageUrl).filter).toBe("Status eq 'New'");
    expect(planOpenCount(false, pageUrl).mode).toBe("legacy");
    expect(planOpenCount(true, "not a url").mode).toBe("legacy");
  });

  it("builds a strict PageKey filter for the retry path", () => {
    const plan = strictOpenCountPlan(pageUrl);
    expect(plan && plan.filter).toBe(`Status eq 'New' and PageKey eq '${pageKey}'`);
    expect(strictOpenCountPlan("not a url")).toBeUndefined();
  });
});

describe("countOpenReviewItems", () => {
  const items = [
    { Id: 1, PageKey: pageKey, PageLink: pageUrl },
    { Id: 2, PageKey: "/sites/hr/SitePages/Other.aspx", PageLink: "https://contoso.sharepoint.com/sites/hr/SitePages/Other.aspx" },
    { Id: 3, PageKey: undefined, PageLink: "https://contoso.sharepoint.com/sites/hr/SitePages/Q3 launch.aspx" },
    { Id: 4, PageLink: "https://contoso.sharepoint.com/sites/hr/SitePages/Old.aspx" },
    { Id: 5, PageKey: "/SITES/HR/SITEPAGES/Q3 LAUNCH.ASPX" },
    { Id: 6, PageKey: "/sites/hr/SitePages/Elsewhere.aspx", PageLink: pageUrl }
  ];

  it("counts PageKey matches and older items that only have PageLink", () => {
    expect(countOpenReviewItems(items, pageUrl)).toBe(3);
    expect(itemMatchesOpenRequest(items[2], pageUrl)).toBe(true);
    expect(itemMatchesOpenRequest(items[3], pageUrl)).toBe(false);
    expect(itemMatchesOpenRequest(items[5], pageUrl)).toBe(false);
  });

  it("returns zero when the page URL cannot be keyed", () => {
    expect(countOpenReviewItems(items, "not a url")).toBe(0);
    expect(countOpenReviewItems([], pageUrl)).toBe(0);
  });
});

describe("open request badge", () => {
  it("uses the plural label and hides a zero count", () => {
    expect(openRequestBadgeLabel(1)).toBe("1 open review request");
    expect(openRequestBadgeLabel(3)).toBe("3 open review requests");
    expect(shouldShowOpenRequestBadge(true, 3, "https://contoso.sharepoint.com/lists")).toBe(true);
    expect(shouldShowOpenRequestBadge(true, 0, "https://contoso.sharepoint.com/lists")).toBe(false);
    expect(shouldShowOpenRequestBadge(false, 3, "https://contoso.sharepoint.com/lists")).toBe(false);
    expect(shouldShowOpenRequestBadge(true, 3, undefined)).toBe(false);
  });
});

describe("openRequestViewQuery", () => {
  it("filters the list view on PageKey and Status", () => {
    const query = openRequestViewQuery(pageUrl, true);
    expect(query).toContain("FilterField1=Status");
    expect(query).toContain("FilterValue1=New");
    expect(query).toContain("FilterType1=Choice");
    expect(query).toContain("FilterField2=PageKey");
    expect(query).toContain(`FilterValue2=${encodeURIComponent(pageKey)}`);
    expect(query).toContain("FilterType2=Text");
  });

  it("falls back to PageLink when PageKey is not ready", () => {
    const query = openRequestViewQuery(pageUrl, false);
    expect(query).toContain("FilterField2=PageLink");
    expect(query).toContain(`FilterValue2=${encodeURIComponent(pageUrl)}`);
    expect(query).toContain("FilterType2=Note");
  });

  it("builds an absolute list view URL", () => {
    const url = buildOpenRequestsViewUrl({
      webAbsoluteUrl: "https://contoso.sharepoint.com/sites/hr",
      defaultViewUrl: "/sites/hr/Lists/Page Review Requests/AllItems.aspx",
      pageUrl,
      pageKeyReady: true
    });
    expect(url).toBe(
      `https://contoso.sharepoint.com/sites/hr/Lists/Page Review Requests/AllItems.aspx?${openRequestViewQuery(pageUrl, true)}`
    );
  });

  it("uses the list title when the default view is unknown", () => {
    const url = buildOpenRequestsViewUrl({
      webAbsoluteUrl: "https://contoso.sharepoint.com/sites/hr/",
      pageUrl,
      pageKeyReady: false
    });
    expect(url && url.indexOf("https://contoso.sharepoint.com/sites/hr/Lists/Page%20Review%20Requests/AllItems.aspx?")).toBe(0);
  });
});
