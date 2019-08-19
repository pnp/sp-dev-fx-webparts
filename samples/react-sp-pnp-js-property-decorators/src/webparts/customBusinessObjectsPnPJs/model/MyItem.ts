import { Item, ODataEntity, ODataParser, FetchOptions } from "sp-pnp-js";

export class MyItem extends Item {
  public static Fields = ["Id", "Title", "Category", "Quantity"];

  public Id: number;
  public Title: string;
  public Category: string;
  public Quantity: number;

  // override get to enfore select for our fields to always optimize
  // but allow it to be overridden by any supplied values
  public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<MyItem> {
    // use apply and call to manipulate the request into the form we want
    // if another select isn't in place, let's default to only ever getting our fields.
    const query = this._query.getKeys().indexOf("$select") > -1 ? this : this.select.apply(this, MyItem.Fields);
    // call the base get, but in our case pass the appropriate ODataEntity def so we are returning
    // a MyItem instance
    if (parser === undefined) {
      parser = ODataEntity(MyItem);
    }
    return super.get.call(this, parser, getOptions);
  }
}
