import { ODataParserBase, QueryableConstructor, Util, Logger, LogLevel } from "sp-pnp-js";
import { getEntityUrl } from "sp-pnp-js/lib/sharepoint/odata";

// symbol emulation as it's not supported on IE
// consider using polyfill as well
import { getSymbol } from "../utils/symbol";


/**
 * Custom Response Array Parser to be integrated with @select and @expand decorators
 *  It can be used on PnP Core JS get() method as a parameter
 */
export class SelectDecoratorsArrayParser<T> extends ODataParserBase<T[]> {
  private _returnOnlySelectedWithDecorators = false;
  constructor(protected factory: QueryableConstructor<T>, returnOnlySelectedWithDecorators?: boolean) {
    super();
    this._returnOnlySelectedWithDecorators = returnOnlySelectedWithDecorators;
  }
  public parse(r: Response): Promise<T[]> {
    return super.parse(r).then((d: any[]) => {
      if ("length" in d) {
        return d.map(v => {
          const o = <T>new this.factory(getEntityUrl(v), null);
          const combinedWithResults: any = Util.extend(o, v);
          const sym: string = getSymbol("select");
          if (this._returnOnlySelectedWithDecorators === true) {
            return SelectDecoratorsUtils.ProcessSingle(combinedWithResults, sym);
          } else {
            return Util.extend(combinedWithResults, SelectDecoratorsUtils.ProcessSingle(combinedWithResults, sym));
          }
        });
      } else {
        Logger.log({
          data: {
            d
          },
          level: LogLevel.Error,
          message: "[SelectDecoratorsArrayParser] - response isn't a collection."
        });
        return null;
      }
    });
  }
}

/**
 * Custom Response Parser to be integrated with @select and @expand decorators
 *  It can be used on PnP Core JS get() method as a parameter
 */
export class SelectDecoratorsParser<T> extends ODataParserBase<T> {
  private _returnOnlySelectedWithDecorators = false;
  constructor(protected factory: QueryableConstructor<T>, returnOnlySelectedWithDecorators?: boolean) {
    super();
    this._returnOnlySelectedWithDecorators = returnOnlySelectedWithDecorators;
  }
  public parse(r: Response): Promise<T> {
    // we don't need to handleError inside as we are calling directly
    // to super.parse(r) and it's already handled there
    return super.parse(r).then(d => {
      const classDefaults: T = <T>new this.factory(getEntityUrl(d), null);
      const combinedWithResults: any = Util.extend(classDefaults, d);
      const sym: string = getSymbol("select");
      if ("length" in combinedWithResults) {
        Logger.log({
          level: LogLevel.Warning,
          message: "[SelectDecoratorsParser] - response is a collection. Consider using Array Parser (SelectDecoratorsArrayParser)."
        });
        // return SelectDecoratorsUtils.ProcessCollection(combinedWithResults, sym);
        return combinedWithResults;
      } else {
        if (this._returnOnlySelectedWithDecorators === true) {
          return SelectDecoratorsUtils.ProcessSingle(combinedWithResults, sym);
        } else {
          return Util.extend(combinedWithResults, SelectDecoratorsUtils.ProcessSingle(combinedWithResults, sym));
        }
      }
    });
  }
}

// utils class
class SelectDecoratorsUtils {
  // get only custom model properties with @select decorator and return single item
  public static ProcessSingle(combinedWithResults: any, symbolKey: string): any {
    const arrayprops: { propName: string, queryName: string }[] = combinedWithResults[symbolKey];
    let newObj = {};
    arrayprops.forEach((item) => {
      newObj[item.propName] = SelectDecoratorsUtils.GetDescendantProp(combinedWithResults, item.queryName);
    });
    return newObj;
  }

  // get only custom model properties with @select decorator and return item collection
  public static ProcessCollection(combinedWithResults: any[], symbolKey: string): any[] {
    let newArray: any[] = [];
    const arrayprops: { propName: string, queryName: string }[] = combinedWithResults[symbolKey];
    for (let i: number = 0; i < combinedWithResults.length; i++) {
      const r: any = combinedWithResults[i];
      let newObj = {};
      arrayprops.forEach((item) => {
        newObj[item.propName] = SelectDecoratorsUtils.GetDescendantProp(r, item.queryName);
      });
      newArray = newArray.concat(newObj);
    }
    return newArray;
  }

  private static GetDescendantProp(obj, objectString: string) {
    var arr: string[] = objectString.split("/");
    if (arr.length > 1 && arr[0] !== "") {
      while (arr.length) {
        var name: string = arr.shift();
        if (name in obj) {
          obj = obj[name];
        } else {
          Logger.log({
            data: {
              name
            },
            level: LogLevel.Warning,
            message: "[getDescendantProp] - " + name + " property does not exists."
          });
          return null;
        }
      }
      return obj;
    }
    if (objectString !== undefined && objectString !== "") {
      return obj[objectString];
    }
    return null;
  }
}
