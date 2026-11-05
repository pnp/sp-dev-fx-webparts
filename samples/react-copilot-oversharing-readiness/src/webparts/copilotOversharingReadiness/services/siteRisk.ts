/* Pure risk scoring. Weights are configurable sample choices, not a Microsoft score. */

import {
  DEFAULT_RISK_SETTINGS,
  SCORE_CAP,
  type IRiskSettings,
} from './riskSettings';
import { format, levelText, type IRiskStrings, type RiskLevelKey } from './riskStrings';

export interface ISiteRisk {
  siteUrl: string;
  siteTitle: string;
  owner: string;
  everyone: boolean;
  everyoneExceptExternal: boolean;
  anyoneLinks: number;
  sharingLinks: number;
  brokenInheritance: boolean;
  lastActivityDaysAgo: number;
  sensitivityLabel: string;
  ownerCount?: number;
}

function scored(reason: string, isScored: boolean, s: IRiskStrings): string {
  return isScored ? reason : `${reason} ${s.notScored}`;
}

export function calculateRiskScore(site: ISiteRisk, settings: IRiskSettings = DEFAULT_RISK_SETTINGS): number {
  let score = 0;
  if (settings.scoreEveryone && site.everyone) score += settings.weightEveryone;
  if (settings.scoreEveryoneExceptExternal && site.everyoneExceptExternal) score += settings.weightEveryoneExceptExternal;
  if (settings.scoreAnyoneLinks && site.anyoneLinks > 0) {
    score += settings.weightAnyoneBase + Math.min(site.anyoneLinks, settings.anyoneLinkCap) * settings.weightAnyonePerLink;
  }
  if (settings.scoreSharingLinks && site.sharingLinks >= settings.sharingLinkThreshold) score += settings.weightSharingThreshold;
  if (settings.scoreBrokenInheritance && site.brokenInheritance) score += settings.weightBrokenInheritance;
  if (settings.scoreInactivity && site.lastActivityDaysAgo > settings.inactivityDays) score += settings.weightInactivity;
  if (settings.scoreSensitivityLabelAbsent && !site.sensitivityLabel) score += settings.weightNoLabel;
  return Math.min(score, SCORE_CAP);
}

export function riskLevel(score: number, settings: IRiskSettings = DEFAULT_RISK_SETTINGS): RiskLevelKey {
  const high = settings.highCutoff > settings.mediumCutoff ? settings.highCutoff : DEFAULT_RISK_SETTINGS.highCutoff;
  const medium = settings.highCutoff > settings.mediumCutoff ? settings.mediumCutoff : DEFAULT_RISK_SETTINGS.mediumCutoff;
  if (score >= high) return 'High';
  if (score >= medium) return 'Medium';
  return 'Low';
}

export function riskReasons(site: ISiteRisk, settings: IRiskSettings, s: IRiskStrings): string[] {
  const reasons: string[] = [];
  if (site.everyone) reasons.push(scored(s.reasonSharedEveryone, settings.scoreEveryone, s));
  if (site.everyoneExceptExternal) reasons.push(scored(s.reasonSharedEveryoneExceptExternal, settings.scoreEveryoneExceptExternal, s));
  if (site.anyoneLinks > 0) reasons.push(scored(format(s.reasonAnyoneLinks, site.anyoneLinks), settings.scoreAnyoneLinks, s));
  if (site.sharingLinks >= settings.sharingLinkThreshold) reasons.push(scored(format(s.reasonSharingLinks, site.sharingLinks), settings.scoreSharingLinks, s));
  if (site.brokenInheritance) reasons.push(scored(s.reasonBrokenInheritance, settings.scoreBrokenInheritance, s));
  if (site.lastActivityDaysAgo > settings.inactivityDays) reasons.push(scored(format(s.reasonInactiveDays, site.lastActivityDaysAgo), settings.scoreInactivity, s));
  if (!site.sensitivityLabel) reasons.push(scored(s.reasonNoSensitivityLabel, settings.scoreSensitivityLabelAbsent, s));
  return reasons;
}

/* Priority from signals, never from translated reason text. */
export function siteRiskPriority(site: ISiteRisk, settings: IRiskSettings, hasOwnerFlag: boolean): number {
  if (site.everyone || site.anyoneLinks > 0) return 0;
  if (site.everyoneExceptExternal) return 1;
  if (site.brokenInheritance || site.lastActivityDaysAgo > settings.inactivityDays || hasOwnerFlag) return 2;
  return 3;
}

export function getMockSites(): ISiteRisk[] {
  return [
    {
      siteUrl: 'https://contoso.sharepoint.com/sites/HR-Confidential',
      siteTitle: 'HR Confidential',
      owner: 'Adele Vance',
      everyone: false,
      everyoneExceptExternal: true,
      anyoneLinks: 3,
      sharingLinks: 42,
      brokenInheritance: true,
      lastActivityDaysAgo: 12,
      sensitivityLabel: ''
    },
    {
      siteUrl: 'https://contoso.sharepoint.com/sites/Project-Phoenix',
      siteTitle: 'Project Phoenix',
      owner: 'No active owner',
      everyone: true,
      everyoneExceptExternal: false,
      anyoneLinks: 1,
      sharingLinks: 18,
      brokenInheritance: false,
      lastActivityDaysAgo: 240,
      sensitivityLabel: 'Internal'
    },
    {
      siteUrl: 'https://contoso.sharepoint.com/sites/Intranet-News',
      siteTitle: 'Intranet News',
      owner: 'Megan Bowen',
      everyone: false,
      everyoneExceptExternal: false,
      anyoneLinks: 0,
      sharingLinks: 4,
      brokenInheritance: false,
      lastActivityDaysAgo: 3,
      sensitivityLabel: 'General'
    }
  ];
}

export function toCsv(sites: ISiteRisk[], settings: IRiskSettings, s: IRiskStrings): string {
  const columns = [s.csvSite, s.csvUrl, s.csvOwner, s.csvRiskScore, s.csvRiskLevel];
  if (settings.csvIncludeReasons) columns.push(s.csvReasons);
  const header = columns.join(',');
  const rows = sites.map((site) => {
    const score = calculateRiskScore(site, settings);
    const values = [`"${site.siteTitle}"`, `"${site.siteUrl}"`, `"${site.owner}"`, `${score}`, `${levelText(riskLevel(score, settings), s)}`];
    if (settings.csvIncludeReasons) values.push(`"${riskReasons(site, settings, s).join('; ')}"`);
    return values.join(',');
  });
  return [header, ...rows].join('\n');
}
