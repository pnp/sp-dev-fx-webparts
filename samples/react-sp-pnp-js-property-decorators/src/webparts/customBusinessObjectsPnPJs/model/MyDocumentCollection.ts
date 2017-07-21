import { Items, ODataEntityArray, ODataParser, FetchOptions, Logger, LogLevel } from "sp-pnp-js";

// symbol emulation as it's not supported on IE
// consider using polyfill as well
import { getSymbol } from "../utils/symbol";

import { SelectDecoratorsArrayParser } from "../parser/SelectDecoratorsParsers";

// import MyDocument to specify the ItemTemplate
import { MyDocument } from "./MyDocument";


export class MyDocumentCollection extends Items {

  private ItemTemplate: MyDocument = new MyDocument("");

  public CustomCollectionProps: string = "Custom Collection Prop to pass";

  // override get to enfore select and expand for our fields to always optimize
  public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
    // public get(): Promise<MyDocument> {
    this
      ._setCustomQueryFromDecorator("select")
      ._setCustomQueryFromDecorator("expand");
    if (parser === undefined) {
      // default parser
      parser = ODataEntityArray(MyDocument);
    }
    return super.get.call(this, parser, getOptions);
  }

  // create new method using custom parser
  public getAsMyDocument(parser?: ODataParser<MyDocument[]>, getOptions?: FetchOptions): Promise<MyDocument[]> {
    this
      ._setCustomQueryFromDecorator("select")
      ._setCustomQueryFromDecorator("expand");
    if (parser === undefined) {
      parser = new SelectDecoratorsArrayParser<MyDocument>(MyDocument);
    }
    return super.get.call(this, parser, getOptions);
  }


  private _setCustomQueryFromDecorator(parameter: string): MyDocumentCollection {
    const sym: string = getSymbol(parameter);
    // get pre-saved select and expand props from decorators
    const arrayprops: { propName: string, queryName: string }[] = this.ItemTemplate[sym];
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


