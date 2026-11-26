/* Configurable risk settings. Weights are sample choices, not a
 * Microsoft score. Settings are per web-part instance, not tenant-wide. */

export type DisplayMode = 'microsoftPriority' | 'numericScore';
export type SortBy = 'priority' | 'score' | 'title';
export type UnknownVerdict = 'unknown' | 'lowWithWarning';

export interface IRiskSettings {
  weightEveryone: number;
  weightEveryoneExceptExternal: number;
  weightAnyoneBase: number;
  weightAnyonePerLink: number;
  anyoneLinkCap: number;
  sharingLinkThreshold: number;
  weightSharingThreshold: number;
  weightBrokenInheritance: number;
  inactivityDays: number;
  weightInactivity: number;
  weightNoLabel: number;
  highCutoff: number;
  mediumCutoff: number;
  scoreEveryone: boolean;
  scoreEveryoneExceptExternal: boolean;
  scoreAnyoneLinks: boolean;
  scoreSharingLinks: boolean;
  scoreBrokenInheritance: boolean;
  scoreInactivity: boolean;
  scoreSensitivityLabelAbsent: boolean;
  minimumOwners: number;
  scoreOwnerless: boolean;
  weightOwnerless: number;
  scoreSingleOwner: boolean;
  weightSingleOwner: number;
  displayMode: DisplayMode;
  sortBy: SortBy;
  unknownVerdict: UnknownVerdict;
  showUnknownColumn: boolean;
  csvIncludeUnknown: boolean;
  csvIncludeReasons: boolean;
  csvFileName: string;
  maxSites: number;
}

export const DEFAULT_RISK_SETTINGS: IRiskSettings = {
  weightEveryone: 40,
  weightEveryoneExceptExternal: 30,
  weightAnyoneBase: 20,
  weightAnyonePerLink: 2,
  anyoneLinkCap: 5,
  sharingLinkThreshold: 20,
  weightSharingThreshold: 10,
  weightBrokenInheritance: 10,
  inactivityDays: 180,
  weightInactivity: 10,
  weightNoLabel: 0,
  highCutoff: 70,
  mediumCutoff: 40,
  scoreEveryone: true,
  scoreEveryoneExceptExternal: true,
  scoreAnyoneLinks: true,
  scoreSharingLinks: true,
  scoreBrokenInheritance: true,
  scoreInactivity: true,
  scoreSensitivityLabelAbsent: false,
  minimumOwners: 2,
  scoreOwnerless: false,
  weightOwnerless: 0,
  scoreSingleOwner: false,
  weightSingleOwner: 0,
  displayMode: 'microsoftPriority',
  sortBy: 'priority',
  unknownVerdict: 'unknown',
  showUnknownColumn: true,
  csvIncludeUnknown: true,
  csvIncludeReasons: true,
  csvFileName: 'copilot-oversharing-readiness.csv',
  maxSites: 50,
};

export const SCORE_CAP = 100;

/* Validate an imported settings file: only known keys with the right
 * type survive, so a bad file cannot break rendering. Returns undefined
 * when the input is not an object at all. */
export function validateRiskSettingsImport(value: unknown): Partial<IRiskSettings> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }
  const partial: Partial<IRiskSettings> = {};
  const record = value as Record<string, unknown>;
  const keys = Object.keys(DEFAULT_RISK_SETTINGS) as Array<keyof IRiskSettings>;
  for (const key of keys) {
    const expected = typeof DEFAULT_RISK_SETTINGS[key];
    if (typeof record[key] === expected) {
      (partial as unknown as Record<string, unknown>)[key] = record[key];
    }
  }
  return partial;
}

/* Merge properties over defaults, ignoring undefined values. */
export function mergeRiskSettings(partial: Partial<IRiskSettings> | undefined): IRiskSettings {
  const merged: IRiskSettings = { ...DEFAULT_RISK_SETTINGS };
  if (!partial) {
    return merged;
  }
  const keys = Object.keys(DEFAULT_RISK_SETTINGS) as Array<keyof IRiskSettings>;
  for (const key of keys) {
    const value = partial[key];
    if (value !== undefined) {
      (merged as unknown as Record<string, unknown>)[key] = value;
    }
  }
  return merged;
}

export type OwnershipFlag = 'ownerless' | 'single-owner' | undefined;

/* Ownership is a flag, not a score. Undefined when no count is supplied. */
export function getOwnershipFlag(ownerCount: number | undefined, minimumOwners: number): OwnershipFlag {
  if (ownerCount === undefined) {
    return undefined;
  }
  if (ownerCount === 0) {
    return 'ownerless';
  }
  if (ownerCount < minimumOwners) {
    return 'single-owner';
  }
  return undefined;
}

export function ownershipFlagLabel(flag: OwnershipFlag, s: { ownerlessFlag: string; singleOwnerFlag: string }): string {
  if (flag === 'ownerless') {
    return s.ownerlessFlag;
  }
  if (flag === 'single-owner') {
    return s.singleOwnerFlag;
  }
  return '';
}
