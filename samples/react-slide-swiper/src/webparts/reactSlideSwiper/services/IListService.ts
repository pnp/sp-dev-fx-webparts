import { ListItem } from "./ListItem";

export interface IListServce {
    getAll(): Promise<Array<ListItem>>;
}