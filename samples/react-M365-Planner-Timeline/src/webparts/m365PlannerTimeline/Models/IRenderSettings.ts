
import {
  PlannerBucket,
  User
} from "@microsoft/microsoft-graph-types";

export interface IRenderSettings {
  renderYear: boolean;
  currentYear: number;
  renderMonth: boolean;
  currentMonth: number;
  lastRenderedDate?: string;
  showBuckets: string[];
  hideCompletedTasks: boolean;
  orderBy: string; // "asc" or "desc"
  buckets: PlannerBucket[];
  users: User[];
}