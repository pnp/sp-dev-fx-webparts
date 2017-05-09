import { List, Item } from "sp-pnp-js";

export class ItemObject extends Item {
    public Id: number;
    public Title: string;
}

export class ListObject extends List {
    public Id: string;
    public Title: string;
}