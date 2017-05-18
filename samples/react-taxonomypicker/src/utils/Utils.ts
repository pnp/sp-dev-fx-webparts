export class Utils {
  /*
   * Function to get Site Collection URL
   * Samples:
   *      "https://domain.sharepoint.com/sites/intranet"
   */
  public static getSiteCollectionUrl(): string {
    let baseUrl = window.location.protocol + "//" + window.location.host;
    const pathname = window.location.pathname;
    const siteCollectionDetector = "/sites/";
    if (pathname.indexOf(siteCollectionDetector) >= 0) {
      baseUrl += pathname.substring(0, pathname.indexOf("/", siteCollectionDetector.length));
    }
    return baseUrl;
  }

  /*
   * Function to get Current Site Url
   * Samples:
   *      "https://domain.sharepoint.com/sites/intranet/subsite/Pages/Home.aspx"
   */
  public static getCurrentAbsoluteSiteUrl(): string {
    if (window
      && window.hasOwnProperty("location")
      && window.location.hasOwnProperty("protocol")
      && window.location.hasOwnProperty("host")
      && window.location.hasOwnProperty("pathname")) {
      return window.location.protocol + "//" + window.location.host + window.location.pathname;
    }
    return null;
  }

  /*
   * Function to get Current Site Url
   * Samples:
   *      "/sites/intranet"
   */
  public static getWebServerRelativeUrl(): string {
    if (window
      && window.hasOwnProperty("location")
      && window.location.hasOwnProperty("pathname")) {
      return  window.location.pathname.replace(/\/$/, "");
    }
    return null;
  }

  /*
   * Function to get Layout Page Url
   * Replacement in SPFx for SP.Utilities.Utility.getLayoutsPageUrl('sp.js')
   * Samples:
   *      getLayoutsPageUrl('sp.js')
   *      "/sites/intranet/_layouts/15/sp.js"
   */
  public static getLayoutsPageUrl(libraryName: string): string {
    if (window
      && window.hasOwnProperty("location")
      && window.location.hasOwnProperty("pathname")
      && libraryName !== "") {
      return  window.location.pathname.replace(/\/$/, "") + "/_layouts/15/" + libraryName;
    }
    return null;
  }

  /*
   * Function to get Current Domain Url
   * Samples:
   *      "https://domain.sharepoint.com"
   */
  public static getAbsoluteDomainUrl(): string {
    if (window
      && window.hasOwnProperty("location")
      && window.location.hasOwnProperty("protocol")
      && window.location.hasOwnProperty("host")) {
      return window.location.protocol + "//" + window.location.host;
    }
    return null;
  }
}
