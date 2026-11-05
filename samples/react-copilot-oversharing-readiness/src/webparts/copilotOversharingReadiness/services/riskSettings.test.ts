import { DEFAULT_RISK_SETTINGS, getOwnershipFlag, ownershipFlagLabel, validateRiskSettingsImport } from './riskSettings';
import { EN_RISK } from './testStrings';

describe('risk settings defaults', () => {
  test('label scoring is off with weight 0', () => {
    expect(DEFAULT_RISK_SETTINGS.scoreSensitivityLabelAbsent).toBe(false);
    expect(DEFAULT_RISK_SETTINGS.weightNoLabel).toBe(0);
  });

  test('ownership minimum is 2 and ownership scoring is off', () => {
    expect(DEFAULT_RISK_SETTINGS.minimumOwners).toBe(2);
    expect(DEFAULT_RISK_SETTINGS.scoreOwnerless).toBe(false);
    expect(DEFAULT_RISK_SETTINGS.scoreSingleOwner).toBe(false);
  });
});

describe('validateRiskSettingsImport', () => {
  test('keeps known keys with the right type and drops the rest', () => {
    expect(validateRiskSettingsImport({ weightEveryone: 50, scoreEveryone: false, bogus: 1, highCutoff: '70' })).toEqual({
      weightEveryone: 50,
      scoreEveryone: false,
    });
  });
  test('returns undefined for non-object input', () => {
    expect(validateRiskSettingsImport('nope')).toBeUndefined();
    expect(validateRiskSettingsImport(null)).toBeUndefined();
    expect(validateRiskSettingsImport([1])).toBeUndefined();
  });
});

describe('ownership flag', () => {
  test('0 is ownerless, 1 is single-owner at minimum 2, 2 is compliant', () => {
    expect(getOwnershipFlag(0, 2)).toBe('ownerless');
    expect(getOwnershipFlag(1, 2)).toBe('single-owner');
    expect(getOwnershipFlag(2, 2)).toBeUndefined();
    expect(ownershipFlagLabel('ownerless', EN_RISK)).toBe('Ownerless: no owner');
  });

  test('no count means no flag is invented', () => {
    expect(getOwnershipFlag(undefined, 2)).toBeUndefined();
  });
});
