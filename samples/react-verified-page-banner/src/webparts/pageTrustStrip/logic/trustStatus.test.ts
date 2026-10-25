import {
  addIsoDays,
  canUserConfirm,
  formatDisplayDate,
  getTrustStatus,
  normalizeReviewPeriodDays,
  parseIsoDate,
  sharePointDateToIso
} from "./trustStatus";

describe("sharePointDateToIso", () => {
  it("reads a date-only SharePoint value", () => {
    expect(sharePointDateToIso("2026-10-17T00:00:00Z")).toBe("2026-10-17");
  });

  it("keeps the calendar date in front of a time", () => {
    expect(sharePointDateToIso(" 2026-01-15T07:30:00Z ")).toBe("2026-01-15");
  });

  it("rejects empty and impossible dates", () => {
    expect(sharePointDateToIso(undefined)).toBeUndefined();
    expect(sharePointDateToIso("   ")).toBeUndefined();
    expect(sharePointDateToIso("yesterday")).toBeUndefined();
    expect(sharePointDateToIso("2026-02-31")).toBeUndefined();
    expect(sharePointDateToIso("2026-13-01")).toBeUndefined();
  });
});

describe("parseIsoDate", () => {
  it("rejects dates that are not real calendar days", () => {
    expect(parseIsoDate("2023-02-29")).toBeUndefined();
    expect(parseIsoDate("2024-02-29")).toEqual({ year: 2024, month: 2, day: 29 });
  });
});

describe("addIsoDays", () => {
  it("crosses leap day and year boundaries", () => {
    expect(addIsoDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addIsoDays("2024-02-28", 2)).toBe("2024-03-01");
    expect(addIsoDays("2023-02-28", 1)).toBe("2023-03-01");
    expect(addIsoDays("2026-12-31", 1)).toBe("2027-01-01");
  });

  it("returns undefined for a bad date", () => {
    expect(addIsoDays("nope", 1)).toBeUndefined();
  });
});

describe("normalizeReviewPeriodDays", () => {
  it("keeps whole days inside the allowed range", () => {
    expect(normalizeReviewPeriodDays(90)).toBe(90);
    expect(normalizeReviewPeriodDays("90")).toBe(90);
    expect(normalizeReviewPeriodDays(90.9)).toBe(90);
  });

  it("clamps out of range values and falls back when the value is not a number", () => {
    expect(normalizeReviewPeriodDays(0)).toBe(1);
    expect(normalizeReviewPeriodDays(-4)).toBe(1);
    expect(normalizeReviewPeriodDays(4000)).toBe(3650);
    expect(normalizeReviewPeriodDays("abc")).toBe(90);
    expect(normalizeReviewPeriodDays("")).toBe(90);
    expect(normalizeReviewPeriodDays(undefined)).toBe(90);
  });
});

describe("getTrustStatus", () => {
  it("is current on the day it was confirmed", () => {
    const status = getTrustStatus("2026-10-17T00:00:00Z", 90, "2026-10-17");
    expect(status.status).toBe("current");
    expect(status.daysSince).toBe(0);
    expect(status.reviewDue).toBe("2027-01-15");
  });

  it("stays current through the last day of the review period", () => {
    const status = getTrustStatus("2026-01-01", 90, "2026-04-01");
    expect(status.status).toBe("current");
    expect(status.daysSince).toBe(90);
    expect(status.reviewDue).toBe("2026-04-01");
  });

  it("is stale the day after the review period", () => {
    const status = getTrustStatus("2026-01-01T00:00:00Z", 90, "2026-04-02");
    expect(status.status).toBe("stale");
    expect(status.daysSince).toBe(91);
  });

  it("treats a future confirmation as current", () => {
    const status = getTrustStatus("2026-10-20", 90, "2026-10-17");
    expect(status.status).toBe("current");
    expect(status.daysSince).toBe(-3);
  });

  it("is unconfirmed when the date is missing or invalid", () => {
    expect(getTrustStatus(undefined, 90, "2026-10-17").status).toBe("unconfirmed");
    expect(getTrustStatus("", 90, "2026-10-17").status).toBe("unconfirmed");
    expect(getTrustStatus("not-a-date", 90, "2026-10-17").status).toBe("unconfirmed");
    expect(getTrustStatus("2026-10-17", 90, "bad-today").status).toBe("unconfirmed");
  });

  it("uses a 90 day period when the configured value is not a number", () => {
    const status = getTrustStatus("2026-01-01", Number.NaN, "2026-04-01");
    expect(status.status).toBe("current");
    expect(status.reviewDue).toBe("2026-04-01");
  });
});

describe("formatDisplayDate", () => {
  it("formats a SharePoint date for display", () => {
    expect(formatDisplayDate("2026-10-17T00:00:00Z")).toBe("Oct 17, 2026");
  });

  it("returns undefined for a blank date", () => {
    expect(formatDisplayDate(undefined)).toBeUndefined();
  });
});

describe("canUserConfirm", () => {
  const author = { id: 7, displayName: "Grace Hopper", email: "grace@contoso.com" };
  const owner = { id: 9, displayName: "Alex Morgan", email: "alex@contoso.com" };

  it("hides confirm until the columns exist", () => {
    expect(canUserConfirm({
      columnsReady: false,
      canEditPage: true,
      currentUser: owner,
      pageOwner: owner
    })).toBe(false);
  });

  it("allows the saved owner without edit rights", () => {
    expect(canUserConfirm({
      columnsReady: true,
      canEditPage: false,
      currentUser: { id: 9 },
      pageOwner: owner,
      author
    })).toBe(true);
  });

  it("allows the author only when no owner is saved", () => {
    expect(canUserConfirm({
      columnsReady: true,
      canEditPage: false,
      currentUser: { email: "Grace@contoso.com" },
      author
    })).toBe(true);

    expect(canUserConfirm({
      columnsReady: true,
      canEditPage: false,
      currentUser: author,
      pageOwner: owner,
      author
    })).toBe(false);
  });

  it("allows anyone who can edit the page", () => {
    expect(canUserConfirm({
      columnsReady: true,
      canEditPage: true,
      currentUser: { id: 3, displayName: "Editor" },
      pageOwner: owner,
      author
    })).toBe(true);
  });

  it("does not treat a reader as the owner", () => {
    expect(canUserConfirm({
      columnsReady: true,
      canEditPage: false,
      currentUser: { id: 4, email: "reader@contoso.com" },
      pageOwner: owner,
      author
    })).toBe(false);
  });
});
