import { IKanbanBucket } from "./IKanbanBucket";
import { IKanbanTask } from "./IKanbanTask";

export interface IKanbanBoardTaskActions {

    toggleCompleted?: (taskId:  string) => void;
    allowMove?: (taskId:  string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket) => boolean;
    moved?: (taskId:  string,  targetBucket: IKanbanBucket) => void;
/* think about Await???
*/
    addTaskSaved?: (task:  IKanbanTask) => void;
    editTaskSaved?: (task:  IKanbanTask) => void;
    //deleteTask?: (task:  IKanbanTask) => void;
    
    taskEdit?: (task:IKanbanTask) => void ;
    taskAdd?: (bucket?:IKanbanBucket) => void ;
    
}