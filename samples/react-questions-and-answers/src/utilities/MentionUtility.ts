/**
 * @description Utility class for working with mentions
 */
export class MentionUtility {
  /**
   * @description Parses out all mentions into an array of emails
   * @param {string} html The full amount of HTML content that could contain mentions in it
   * @return {string[]} The array of email mentions identified
   */
  public static parse(html: string): string[] {
    var retVal: string[] = [];

    const prefix: string = "<a href=\"mailto:";
    const suffix: string = "\">";
    var rollingIndex: number = html.indexOf(prefix, 0);

    while (rollingIndex >= 0) {
      let start = rollingIndex + prefix.length;
      let end = html.indexOf(suffix, start);

      if (rollingIndex >= 0) {
        retVal.push(html.substring(start, end));
      }

      rollingIndex = html.indexOf(prefix, end + suffix.length);
    }

    return retVal;
  }
}