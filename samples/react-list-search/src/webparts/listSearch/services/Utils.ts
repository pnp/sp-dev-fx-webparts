export default class StringUtils {

  public static GetUserInitials(text: string): string {
    if (text) {
      const initials = text.match(/\b\w/g) || [];
      text = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }
    return text;
  }

  public static GetUserEmail(text: string): string {
    let result = "";
    if (text && text.indexOf('|') > 0) {
      const splited = text.split('|');
      if (splited && splited.length > 1) {
        result = splited[2];
      }
    }
    return result;
  }

}
