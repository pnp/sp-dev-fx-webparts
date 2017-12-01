/**
 * This interface describes a list item in Task list.
 */
export interface ITodoItem {
    Id: number;
    Title: string;
    PercentComplete: number;
}

/**
 * This interface describes Task list.
 */
export interface ITaskList {
    Id?: string;
    Title?: string;
    ListItemEntityTypeFullName?: string;
}