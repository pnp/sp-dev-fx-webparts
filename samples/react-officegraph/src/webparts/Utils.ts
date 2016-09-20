export class Utils {
  public static getUserPhotoUrl(userEmail: string, siteUrl: string, size: string = 'S'): string {
    return `${siteUrl}/_layouts/15/userphoto.aspx?size=${size}&accountname=${userEmail}`;
  }

  public static trim(s: string): string {
    if (s && s.length > 0) {
      return s.replace(/^\s+|\s+$/gm, '');
    }
    else {
      return s;
    }
  }
}