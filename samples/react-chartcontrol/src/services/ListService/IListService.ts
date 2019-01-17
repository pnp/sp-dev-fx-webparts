import { IListField } from "./IListField";

export interface IListService {
  getFields(listId: string): Promise<Array<IListField>>;
}
