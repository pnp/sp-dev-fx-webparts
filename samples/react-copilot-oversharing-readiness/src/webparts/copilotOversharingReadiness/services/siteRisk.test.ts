import { calculateRiskScore, getMockSites, riskLevel, riskReasons, toCsv, type ISiteRisk } from './siteRisk';
import { DEFAULT_RISK_SETTINGS, mergeRiskSettings } from './riskSettings';
import { EN_RISK } from './testStrings';

const clean: ISiteRisk = {
  siteUrl: 'https://contoso.sharepoint.com/sites/Clean',
  siteTitle: 'Clean',
  owner: 'Owner',
  everyone: false,
  everyoneExceptExternal: false,
  anyoneLinks: 0,
  sharingLinks: 0,
  brokenInheritance: false,
  lastActivityDaysAgo: 1,
  sensitivityLabel: 'General',
};

describe('site risk', () => {
  test('clean site scores 0 and Low', () => {
    expect(calculateRiskScore(clean)).toBe(0);
    expect(riskLevel(0)).toBe('Low');
  });

  test('mock sites score 76, 72, 0 with label scoring off by default', () => {
    const scored = getMockSites().map((site) => calculateRiskScore(site));
    expect(scored[0]).toBe(76);
    expect(scored[1]).toBe(72);
    expect(scored[2]).toBe(0);
  });

  test('label absence scores nothing by default and scores when enabled', () => {
    const labelless = { ...clean, sensitivityLabel: '' };
    expect(calculateRiskScore(labelless)).toBe(0);
    expect(riskReasons(labelless, DEFAULT_RISK_SETTINGS, EN_RISK)).toContain('No sensitivity label (not scored)');
    const enabled = mergeRiskSettings({ scoreSensitivityLabelAbsent: true, weightNoLabel: 10 });
    expect(calculateRiskScore(labelless, enabled)).toBe(10);
  });

  test('custom weights change the score', () => {
    const heavy = mergeRiskSettings({ weightEveryone: 50 });
    expect(calculateRiskScore({ ...clean, everyone: true }, heavy)).toBe(50);
    expect(calculateRiskScore({ ...clean, everyone: true })).toBe(40);
  });

  test('custom cutoffs change the level', () => {
    const cutoffs = mergeRiskSettings({ highCutoff: 30, mediumCutoff: 10 });
    expect(riskLevel(40, cutoffs)).toBe('High');
    expect(riskLevel(40)).toBe('Medium');
  });

  test('invalid cutoffs fall back to defaults for the level only', () => {
    const invalid = mergeRiskSettings({ highCutoff: 10, mediumCutoff: 40 });
    expect(riskLevel(40, invalid)).toBe('Medium');
  });

  test('merge ignores undefined values', () => {
    const merged = mergeRiskSettings({ weightEveryone: undefined as unknown as number, weightInactivity: 5 });
    expect(merged.weightEveryone).toBe(DEFAULT_RISK_SETTINGS.weightEveryone);
    expect(merged.weightInactivity).toBe(5);
  });

  test('CSV starts with header and carries the score', () => {
    const csv = toCsv([clean], DEFAULT_RISK_SETTINGS, EN_RISK);
    expect(csv.split('\n')[0]).toBe('Site,URL,Owner,RiskScore,RiskLevel,Reasons');
    expect(csv).toContain(',0,Low,');
  });

  test('reasons name the risky signals', () => {
    expect(riskReasons({ ...clean, everyone: true }, DEFAULT_RISK_SETTINGS, EN_RISK)).toContain('Shared with Everyone');
  });
});
