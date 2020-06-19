import {IKanbanTask} from './IKanbanTask';
import { IKanbanBucket } from './IKanbanBucket';

export interface IKanbanBoardRenderers{
 task?: (task:IKanbanTask) => JSX.Element ;
 bucketHeadline?: (bucket:IKanbanBucket) => JSX.Element ;
 taskDetail?: (task:IKanbanTask) => JSX.Element ;
}