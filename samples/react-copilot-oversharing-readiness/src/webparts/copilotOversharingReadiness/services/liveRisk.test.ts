import { calculateLiveRisk, daysBetween, everyoneFromLogins } from "./liveRisk";
import { mergeRiskSettings } from "./riskSettings";
import { EN_RISK } from "./testStrings";
import { DEFAULT_RISK_SETTINGS } from "./riskSettings";

describe("calculateLiveRisk", () => {
  it("scores only known signals, with mock weights", () => {
    const r = calculateLiveRisk({ everyone: true, brokenInheritance: true, inactiveDays: 200 }, DEFAULT_RISK_SETTINGS, EN_RISK);
    expect(r.score).toBe(60);
    expect(r.level).toBe("Medium");
    expect(r.reasons).toContain("Shared with Everyone");
    expect(r.reasons).toContain("Inactive for 200 days");
  });

  it("lists unread signals as unknown and scores them as nothing", () => {
    const r = calculateLiveRisk({}, DEFAULT_RISK_SETTINGS, EN_RISK);
    expect(r.score).toBe(0);
    expect(r.unknown).toContain("Everyone");
    expect(r.unknown).toContain("Anyone links");
    expect(r.unknown).toContain("Sensitivity label");
  });

  it("does not score recent activity", () => {
    expect(calculateLiveRisk({ inactiveDays: 10 }, DEFAULT_RISK_SETTINGS, EN_RISK).score).toBe(0);
  });

  it("uses custom weights and cutoffs", () => {
    const settings = mergeRiskSettings({ weightEveryoneExceptExternal: 50, highCutoff: 50, mediumCutoff: 20 });
    const r = calculateLiveRisk({ everyoneExceptExternal: true, brokenInheritance: true }, settings, EN_RISK);
    expect(r.score).toBe(60);
    expect(r.level).toBe("High");
  });

  it("scores label absence only when enabled", () => {
    expect(calculateLiveRisk({ sensitivityLabel: "" }, DEFAULT_RISK_SETTINGS, EN_RISK).score).toBe(0);
    const enabled = mergeRiskSettings({ scoreSensitivityLabelAbsent: true, weightNoLabel: 10 });
    expect(calculateLiveRisk({ sensitivityLabel: "" }, enabled, EN_RISK).score).toBe(10);
  });

  it("regression: broken inheritance alone is 10 Low, EEEU plus broken is 40 Medium", () => {
    expect(calculateLiveRisk({ everyone: false, everyoneExceptExternal: false, brokenInheritance: true, inactiveDays: 10 }, DEFAULT_RISK_SETTINGS, EN_RISK)).toEqual(
      expect.objectContaining({ score: 10, level: "Low" })
    );
    expect(calculateLiveRisk({ everyone: false, everyoneExceptExternal: true, brokenInheritance: true, inactiveDays: 10 }, DEFAULT_RISK_SETTINGS, EN_RISK)).toEqual(
      expect.objectContaining({ score: 40, level: "Medium" })
    );
  });
});

describe("daysBetween", () => {
  it("returns -1 for an unparseable date", () => {
    expect(daysBetween("not a date", Date.now())).toBe(-1);
  });
});

describe("everyoneFromLogins", () => {
  it("spots Everyone and Everyone-except-external-users claims", () => {
    const r = everyoneFromLogins([
      "i:0#.f|membership|user@tenant.onmicrosoft.com",
      "c:0(.s|true",
      "c:0-.f|rolemanager|spo-grid-all-users/12345",
    ]);
    expect(r.everyone).toBe(true);
    expect(r.everyoneExceptExternal).toBe(true);
  });

  it("is false for ordinary users", () => {
    expect(everyoneFromLogins(["i:0#.f|membership|user@tenant.onmicrosoft.com"])).toEqual({
      everyone: false,
      everyoneExceptExternal: false,
    });
  });
});
