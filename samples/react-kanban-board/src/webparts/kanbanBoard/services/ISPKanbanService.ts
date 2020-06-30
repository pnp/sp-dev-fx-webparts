import { IKanbanTask } from "../../../kanban";

export interface ISPKanbanService {

    updateTaskBucketMove(listId:string,taskId: number, bucket: string): Promise<boolean>;
    getAllTasks(listId:string,): Promise<IKanbanTask[]>;
    getBuckets(listId:string,): Promise<string[]>;
}