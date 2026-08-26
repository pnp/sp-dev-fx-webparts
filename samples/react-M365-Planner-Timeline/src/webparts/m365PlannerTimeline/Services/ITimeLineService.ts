import { 
  ITimeLineData,
  IFilterSettings
} from "..";
import {
  PlannerPlan,
  PlannerBucket, 
  PlannerTask,
  PlannerTaskDetails,
  User 
} from "@microsoft/microsoft-graph-types";

export interface ITimeLineService {
  initializeGraphClient(): Promise<void>;
  // all inventory items
  getTimelineData(): Promise<ITimeLineData>;

  updateTimelineData(planId: string): void;

  refreshTasks(): Promise<ITimeLineData>;

  getTimeLine(): ITimeLineData;

  getBuckets(): PlannerBucket[];

  getActiveTasks(sortBy: string): PlannerTask[];

  getPlannerCategoryDescriptions(): { [key: string]: string };

  getTasks(sortBy: string): PlannerTask[];

  getTaskDetails(taskId: string): Promise<PlannerTaskDetails | undefined>;

  getTaskUsers(): User[];

  getTasksForBucket(filterSettings: IFilterSettings): PlannerTask[];

  // New Advanced Service Methods    
  newPlannerPlan(title: string, groupId: string): Promise<PlannerPlan | undefined>;

  newPlannerBucket(planId: string, title: string, orderHint: string): Promise<PlannerBucket | undefined>

  newTask(planId: string, bucketId: string, title: string): Promise<PlannerTask | undefined>;

  // Delete Methods
  deletePlannerPlan(planId : string): Promise<void>;
    /*
  // Update-Set Methods
  updaterPlanTitle(planId: string, title: string): Promise<PlannerPlan[]>;

  updateBucketTitle(bucketId: string, title: string): Promise<PlannerBucket[]>;

  updateBucketOrder(bucketId: string, orderHint: string): Promise<PlannerBucket[]>;

  setTaskStartDate(taskId: string, startDate: string): Promise<PlannerTask>;

  setTaskDueDate(taskId: string, dueDate: string): Promise<PlannerTask>;

  setTaskTitle(taskId: string, title: string): Promise<void>;

  setTaskCompleted(taskId: string): Promise<PlannerTask>;

  // Delete Methods
  deletePlannerBucket(bucket: PlannerBucket): Promise<void>;

  deleteTask(taskId: string): Promise<void>;

  updateTask(taskId: string, newRaskSetting: PlannerTask): Promise<PlannerTask[]>;

  assignTask(taskId: string, userIds: string[]): Promise<void>;

  unassignTask(taskId: string, userIds: string[]): Promise<void>;

  setTaskProgress(taskId: string, progress: number): Promise<void>;

  setTaskBucket(taskId: string, bucketId: string): Promise<void>;

  setTaskCategory(taskId: string, categories: string[]): Promise<void>;

  // Task Detail Service Methods
  UpdateTaskDescription(taskId: string, description: string): Promise<void>;
  
  // Check List Service Methods
  setTaskChecklist(taskId: string, checklist: string[]): Promise<void>;

  setTaskChecklistItem(taskId: string, checklist: string[]): Promise<void>;

  setTaskChecklistItemChecked(taskId: string, checklist: string[]): Promise<void>;

  setTaskChecklistItemUnchecked(taskId: string, checklist: string[]): Promise<void>;

  // File Attachment Service Methods
  setTaskAttachment(taskId: string, attachments: string[]): Promise<void>;

  setTaskAttachmentUrl(taskId: string, attachments: string[]): Promise<void>;

  setTaskAttachmentName(taskId: string, attachments: string[]): Promise<void>;

  setTaskAttachmentType(taskId: string, attachments: string[]): Promise<void>;

  setTaskAttachmentThumbnailUrl(taskId: string, attachments: string[]): Promise<void>;
  */

}
