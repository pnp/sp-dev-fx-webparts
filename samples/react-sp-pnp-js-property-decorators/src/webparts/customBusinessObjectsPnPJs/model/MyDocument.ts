import { Item, ODataEntity, ODataParser, FetchOptions, Logger, LogLevel } from "sp-pnp-js";
import { select, expand } from "../utils/decorators";
import { SelectDecoratorsParser } from "../parser/SelectDecoratorsParsers";

// symbol emulation as it's not supported on IE
// consider using polyfill as well
import { getSymbol } from "../utils/symbol";


// sample intheriting single Item
export class MyDocument extends Item {

  @select()
  public Title: string;

  @select("FileLeafRef")
  public Name: string;

  @select("File/Length")
  @expand("File/Length")
  public Size: number;

  public CustomItemProps: string = "Custom Prop to pass";

  // override get to enfore select and expand for our fields to always optimize
  public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
    this
      ._setCustomQueryFromDecorator("select")
      ._setCustomQueryFromDecorator("expand");
    if (parser === undefined) {
      parser = ODataEntity(MyDocument);
    }
    return super.get.call(this, parser, getOptions);
  }

  // overrise getAs method with custom parser
  public getAs<T>(parser?: ODataParser<MyDocument>, getOptions?: FetchOptions): Promise<T> {
    this
      ._setCustomQueryFromDecorator("select")
      ._setCustomQueryFromDecorator("expand");
    if (parser === undefined) {
      parser = new SelectDecoratorsParser<MyDocument>(MyDocument);
    }
    return super.get.call(this, parser, getOptions);
  }

  private _setCustomQueryFromDecorator(parameter: string): MyDocument {
    const sym: string = getSymbol(parameter);
    // get pre-saved select and expand props from decorators
    const arrayprops: { propName: string, queryName: string }[] = this[sym];
    let list: string = "";
    if (arrayprops !== undefined && arrayprops !== null) {
      list = arrayprops.map(i => i.queryName).join(",");
    } else {
      Logger.log({
        level: LogLevel.Warning,
        message: "[_setCustomQueryFromDecorator] - empty property: " + parameter + "."
      });
    }
    // use apply and call to manipulate the request into the form we want
    // if another select isn't in place, let's default to only ever getting our fields.
    // implement method chain
    return this._query.getKeys().indexOf("$" + parameter) > -1
      ? this
      : this[parameter].call(this, list);
  }
}


