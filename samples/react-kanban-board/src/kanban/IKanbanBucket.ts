export interface IKanbanBucket {
    bucket:string;
    bucketheadline:string;
    percentageComplete: number;
    color?:string;
    allowAddTask?:boolean;
    showPercentageHeadline?:boolean;
}