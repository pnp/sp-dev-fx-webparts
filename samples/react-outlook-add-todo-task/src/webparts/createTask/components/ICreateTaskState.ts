import { ITodoList } from "../models/ITodo";
import { Dictionary } from "../models/Dictionary";

export interface ICreateTaskState {
  todoLists: ITodoList[];
  selectedList: ITodoList;
  newTaskTitle: string;
  listItemAdded: boolean;
  showSelectListError: boolean;
}
