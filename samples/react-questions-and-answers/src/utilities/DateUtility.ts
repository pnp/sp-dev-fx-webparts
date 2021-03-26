import * as strings from 'QuestionsWebPartStrings';

export class DateUtility {

  public static getFriendlyDate(date: Date | undefined | null, includeTime: boolean): string {
    var friendlyDate: string = '';

    if(date) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl - reference for support
      // month in locale
      friendlyDate = date.toLocaleString('default', { month: 'long' });
      // day
      friendlyDate += ` ${date.getDate() }`;

      // year if it isn't the current year
      if(date.getFullYear() < new Date().getFullYear()) {
        friendlyDate += `, ${date.getFullYear()}`;
      }

      // time
      if(includeTime === true) {
        friendlyDate += ` ${strings.Message_PostedAt} ${date.toLocaleTimeString()}`;
      }
    }

    return friendlyDate;
  }

  public static isValidDate(d: any) {
    return d instanceof Date;// && !isNaN(d);
  }
}
