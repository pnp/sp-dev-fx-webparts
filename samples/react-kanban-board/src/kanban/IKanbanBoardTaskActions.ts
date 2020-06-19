import { IKanbanBucket } from "./IKanbanBucket";

export interface IKanbanBoardTaskActions {

    toggleCompleted?: (taskId:  string) => void;
    allowMove?: (taskId:  string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket) => boolean;
    moved?: (taskId:  string,  targetBucket: IKanbanBucket) => void;
}