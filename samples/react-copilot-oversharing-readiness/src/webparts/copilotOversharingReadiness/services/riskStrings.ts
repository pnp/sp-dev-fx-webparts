/* Localized risk copy. The web part passes the SPFx loc strings in;
 * services never hold a copy of the English text themselves. */

export interface IRiskStrings {
  levelHigh: string;
  levelMedium: string;
  levelLow: string;
  levelUnknown: string;
  reasonSharedEveryone: string;
  reasonSharedEveryoneExceptExternal: string;
  reasonAnyoneLinks: string;
  reasonSharingLinks: string;
  reasonBrokenInheritance: string;
  reasonInactiveDays: string;
  reasonNoSensitivityLabel: string;
  notScored: string;
  unknownEveryone: string;
  unknownEveryoneExceptExternal: string;
  unknownPermissionInheritance: string;
  unknownLastActivity: string;
  unknownAnyoneLinks: string;
  unknownSharingLinkCount: string;
  unknownSensitivityLabel: string;
  ownerlessFlag: string;
  singleOwnerFlag: string;
  ownerNoActive: string;
  unnamedSite: string;
  noRiskSignals: string;
  csvSite: string;
  csvUrl: string;
  csvOwner: string;
  csvRiskScore: string;
  csvRiskLevel: string;
  csvReasons: string;
  csvUnknownSignals: string;
  errorRiskReadFailed: string;
  attestationListDescription: string;
}

export type RiskLevelKey = 'High' | 'Medium' | 'Low' | 'Unknown' | 'Low*';

/* Replace {0}, {1}, ... in a loc template with the given values. */
export function format(template: string, ...values: Array<string | number>): string {
  return template.replace(/{(\d+)}/g, (_match, index: string) => String(values[Number(index)] ?? ''));
}

export function levelText(level: RiskLevelKey, s: IRiskStrings): string {
  if (level === 'Low*') return `${s.levelLow}*`;
  if (level === 'High') return s.levelHigh;
  if (level === 'Medium') return s.levelMedium;
  if (level === 'Low') return s.levelLow;
  return s.levelUnknown;
}
