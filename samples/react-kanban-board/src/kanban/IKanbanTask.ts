export interface IKanbanTask {
    taskId: number | string;
    title: string;
    isCompleted?: boolean;
    bucket:string;
}