import { IKanbanBucket } from "./IKanbanBucket";

export interface IKanbanBoardTaskActions {

    toggleCompleted?: (taskId: number | string) => void;
    allowMove?: (taskId: number | string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket) => boolean;
    moved?: (taskId: number | string,  targetBucket: IKanbanBucket) => void;
}