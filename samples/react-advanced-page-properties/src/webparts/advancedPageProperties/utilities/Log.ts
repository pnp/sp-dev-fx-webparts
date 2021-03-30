import * as strings from "AdvancedPagePropertiesWebPartStrings";

export class Log {
  private static readonly logStyle: string = "background: crimson; padding: 5px; border-radius: 5px; color: white";
  constructor() {

  }

  public static Write(s: string, always: boolean = false) {
    let d = new Date();
    let dateStr = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds();

    if (window.location.search.indexOf("debug") >= 0 || always) {
      console.log(`%c${strings.LogAppName} >> ${dateStr} >> ${s}`, Log.logStyle);
    }
  }
}
