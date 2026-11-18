import * as strings from 'UpcStrings';

export function vmsg(key: string | undefined): string | undefined {
  switch (key) {
    case undefined:
      return undefined;
    case 'required':
      return strings.ValidationRequired;
    case 'tooLong':
      return strings.ValidationTooLong;
    case 'invalidEmail':
      return strings.ValidationInvalidEmail;
    case 'invalidPhone':
      return strings.ValidationInvalidPhone;
    case 'invalidDate':
      return strings.ValidationInvalidDate;
    case 'invalidCountry':
      return strings.ValidationInvalidCountry;
    case 'invalidChoice':
      return strings.ValidationInvalidChoice;
    case 'invalidUpn':
      return strings.ValidationInvalidUpn;
    case 'invalidLocalPart':
      return strings.ValidationInvalidLocalPart;
    case 'duplicateEmployeeId':
      return strings.EmployeeIdDuplicate;
    default:
      return key;
  }
}
