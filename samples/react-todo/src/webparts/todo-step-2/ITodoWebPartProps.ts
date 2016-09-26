/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file ITodoWebPartProps.tsx
 */

/**
 * Interface for the Todo web part properties.
 */
export interface ITodoWebPartProps {
  /**
   * The current selected SharePoint tasks list.
   */
  selectedList: ITodoTaskList;

  /**
   * Whether to show completed tasks.
   *
   * If it is set to false, the tab of completed tasks will be hiden, and
   * there will be no completed tasks shown in the list.
   */
  shouldShowCompletedTasks: boolean;

  /**
   * Whether to show who created the task.
   */
  shouldShowCreatedBy: boolean;

  /**
   * Whether to show who mark the task as complete.
   */
  shouldShowCompletedBy: boolean;

  /**
   * The max number of tasks showing in todo web part.
   *
   * The number of list items shown in the list will not exceed this number, and it also limits
   * the number of return items when it sends request to the sever.
   */
  maxNumberOfTasks: number;
}

/**
 * Interface for the data used to render the todo component.
 */
export interface ITodoComponentData {
  /**
   * The selected list items rendered in Todo Component.
   */
  selectedListItems?: ITodoTask[];

  /**
   * The loading status of the list items.
   */
  loadingStatus?: LoadingStatus;
}

/**
 * Interface of user data model related to this web part.
 */
export interface ITodoPerson {
  /**
   * The ID of the person which used to identify the user and fetch the user data from server.
   */
  Id: number;

  /**
   * The name of this person.
   */
  Title: string;

  /**
   * The url which representing the avator url of this person.
   */
  Picture: string;

  /**
   * The email address of this person.
   *
   * This field is only used in data provider to construct url for fetch user avator.
   */
  EMail: string;
}

/**
 * The interface of data modal for Todo task.
 */
export interface ITodoTask {
  /**
   * The ID of the todo item.
   */
  Id: number;

  /**
   * The title of the todo item.
   */
  Title: string;

  /**
   * The percent of the task that is completed.
   * In todo web part we use 0 to indicate task uncompleted and 1 to indicate task completed.
   */
  PercentComplete: number;

  /**
   * The person who created this todo task.
   */
  Author: ITodoPerson;

  /**
   * The person who marked this todo item as completed.
   *
   * Editor is the last person who performed editting operation.
   * In Todo web part, the only editting operation that can be performed by user is toggling complete.
   * This field is optional because it is not required for incomplete tasks.
   */
  Editor?: ITodoPerson;
}

/**
 * ITodoTaskList contains title and entity type full name which used in REST calls.
 */
export interface ITodoTaskList {
  /**
   * The title of the todo task list.
   */
  Title: string;

  /**
   * The ListItemEntityTypeFullName property of the list.
   */
  ListItemEntityTypeFullName?: string;

  /**
   * The Id property of the list.
   */
  Id?: string;
}

/**
 * The type of the loading status for requesting for the items from SharePoint List.
 */
export enum LoadingStatus {
  /**
   * We are not loading anything.
   */
  None,

  /**
   * We are fetching the tasks items (Read items).
   */
  FetchingTasks,

  /**
   * We are updating the tasks list (Create, Update, or Delete the item).
   */
  UpdatingTasks
}

/**
 * ItemOperationCallback is the type of callback that handle the operation on item.
 * It is used for creating, updating and deleting callbacks.
 *
 * @param {ITodoTask} item is the Todo task item that will be either created, updated, or deleted.
 */
export type ItemOperationCallback = (item: ITodoTask) => void;
