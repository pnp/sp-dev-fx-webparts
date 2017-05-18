import * as riot from "riot/riot+compiler";
import * as Riot from "./../../core/riot/Riot";
import pnp, { ODataEntityArray, ODataEntity } from "sp-pnp-js";
import { IListViewerProps } from "./IListViewerProps";
import { ItemObject, ListObject } from "./Models";
import { Table } from "./../../office-ui-fabric-riot/Components";

@Riot.template(require("./ListViewer.html") as string)
export class ListViewer extends Riot.Element {
  private listId: string;
  private styles: any;
  private listTitle: string;
  private items: ItemObject[] = new Array<ItemObject>();
  private list: ListObject;
  private isLoading: boolean = false;

  constructor(options: IListViewerProps) {
    super();

    if(options) {
      this.styles = options.styles;
      this.listId = options.listId;
    }
  }

  protected getSubComponentTypes(): any {
    return [Table];
  }

  protected async mounted() {
    await this.init();
  }

  protected async init() {
    if(this.listId) {
      this.isLoading = true;
      this.update();
      
      this.list = await pnp.sp.web.lists.getById(this.listId).getAs(ODataEntity(ListObject));
      this.items = await pnp.sp.web.lists.getById(this.listId).items.getAs(ODataEntityArray(ItemObject));
      this.isLoading = false;
      this.update();
    }
  }
}