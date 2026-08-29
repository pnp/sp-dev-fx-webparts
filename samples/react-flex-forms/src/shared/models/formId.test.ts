import { parseFormId } from './formId';

describe('form ID boundary validation', () => {
  it('accepts positive integer values from property-pane input', () => {
    expect(parseFormId('12')).toBe(12);
    expect(parseFormId(12)).toBe(12);
  });

  it.each([undefined, '', '0', '-1', '1.5', 'not-a-number', null, true])('rejects invalid values: %p', value => {
    expect(parseFormId(value)).toBeUndefined();
  });
});
