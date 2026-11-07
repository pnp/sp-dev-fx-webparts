/* Pure live-risk scoring. Unread signals are unknown and score nothing.
 * Weights are configurable sample choices, not a Microsoft score. */

import {
  DEFAULT_RISK_SETTINGS,
  SCORE_CAP,
  type IRiskSettings,
} from './riskSettings';
import { format, type IRiskStrings, type RiskLevelKey } from './riskStrings';

export interface ILiveRiskSignals {
  everyone?: boolean;
  everyoneExceptExternal?: boolean;
  brokenInheritance?: boolean;
  inactiveDays?: number;
  anyoneLinks?: number;
  sharingLinks?: number;
  sensitivityLabel?: string;
}

export interface ILiveRisk {
  score: number;
  level: RiskLevelKey;
  reasons: string[];
  unknown: string[];
  priority: number;
}

export function daysBetween(dateString: string, nowMs: number): number {
  const ms = Date.parse(dateString);
  if (Number.isNaN(ms)) return -1;
  return Math.floor((nowMs - ms) / 86400000);
}

export function calculateLiveRisk(signals: ILiveRiskSignals, settings: IRiskSettings, s: IRiskStrings): ILiveRisk {
  let score = 0;
  const reasons: string[] = [];
  const unknown: string[] = [];
  const scored = (reason: string, isScored: boolean): string => isScored ? reason : `${reason} ${s.notScored}`;
  if (signals.everyone === true) {
    if (settings.scoreEveryone) score += settings.weightEveryone;
    reasons.push(scored(s.reasonSharedEveryone, settings.scoreEveryone));
  } else if (signals.everyone === undefined) {
    unknown.push(s.unknownEveryone);
  }
  if (signals.everyoneExceptExternal === true) {
    if (settings.scoreEveryoneExceptExternal) score += settings.weightEveryoneExceptExternal;
    reasons.push(scored(s.reasonSharedEveryoneExceptExternal, settings.scoreEveryoneExceptExternal));
  } else if (signals.everyoneExceptExternal === undefined) {
    unknown.push(s.unknownEveryoneExceptExternal);
  }
  if (signals.brokenInheritance === true) {
    if (settings.scoreBrokenInheritance) score += settings.weightBrokenInheritance;
    reasons.push(scored(s.reasonBrokenInheritance, settings.scoreBrokenInheritance));
  } else if (signals.brokenInheritance === undefined) {
    unknown.push(s.unknownPermissionInheritance);
  }
  if (signals.inactiveDays !== undefined && signals.inactiveDays >= 0) {
    if (signals.inactiveDays > settings.inactivityDays) {
      if (settings.scoreInactivity) score += settings.weightInactivity;
      reasons.push(scored(format(s.reasonInactiveDays, signals.inactiveDays), settings.scoreInactivity));
    }
  } else {
    unknown.push(s.unknownLastActivity);
  }
  if (signals.anyoneLinks !== undefined) {
    if (signals.anyoneLinks > 0) {
      if (settings.scoreAnyoneLinks) score += settings.weightAnyoneBase + Math.min(signals.anyoneLinks, settings.anyoneLinkCap) * settings.weightAnyonePerLink;
      reasons.push(scored(format(s.reasonAnyoneLinks, signals.anyoneLinks), settings.scoreAnyoneLinks));
    }
  } else {
    unknown.push(s.unknownAnyoneLinks);
  }
  if (signals.sharingLinks !== undefined) {
    if (signals.sharingLinks >= settings.sharingLinkThreshold) {
      if (settings.scoreSharingLinks) score += settings.weightSharingThreshold;
      reasons.push(scored(format(s.reasonSharingLinks, signals.sharingLinks), settings.scoreSharingLinks));
    }
  } else {
    unknown.push(s.unknownSharingLinkCount);
  }
  if (signals.sensitivityLabel !== undefined) {
    if (!signals.sensitivityLabel) {
      if (settings.scoreSensitivityLabelAbsent) score += settings.weightNoLabel;
      reasons.push(scored(s.reasonNoSensitivityLabel, settings.scoreSensitivityLabelAbsent));
    }
  } else {
    unknown.push(s.unknownSensitivityLabel);
  }
  const high = settings.highCutoff > settings.mediumCutoff ? settings.highCutoff : DEFAULT_RISK_SETTINGS.highCutoff;
  const medium = settings.highCutoff > settings.mediumCutoff ? settings.mediumCutoff : DEFAULT_RISK_SETTINGS.mediumCutoff;
  const level: RiskLevelKey = score >= high ? 'High' : score >= medium ? 'Medium' : 'Low';
  const priority = signals.everyone === true || (signals.anyoneLinks !== undefined && signals.anyoneLinks > 0) ? 0
    : signals.everyoneExceptExternal === true ? 1
    : signals.brokenInheritance === true || (signals.inactiveDays !== undefined && signals.inactiveDays > settings.inactivityDays) ? 2
    : 3;
  return { score: Math.min(score, SCORE_CAP), level, reasons, unknown, priority };
}

/* Everyone and EEEU are claims principals, spotted by login name. */
export function everyoneFromLogins(logins: string[]): {
  everyone: boolean;
  everyoneExceptExternal: boolean;
} {
  let everyone = false;
  let everyoneExceptExternal = false;
  for (const login of logins) {
    if (login === 'c:0(.s|true') everyone = true;
    if (login.indexOf('spo-grid-all-users') >= 0) everyoneExceptExternal = true;
  }
  return { everyone, everyoneExceptExternal };
}
