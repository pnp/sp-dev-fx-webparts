import * as riot from "riot/riot+compiler";
import * as Riot from "./../../core/riot/Riot";
import { Spinner } from "./../Spinner/Spinner.Index";

@Riot.template(require("./Table.html") as string)
export class Table extends Riot.Element {
  protected getSubComponentTypes(): any[] {
    return [Spinner];
  }
}