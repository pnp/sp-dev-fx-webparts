import { 
  ITimeLineData,
  IFilterSettings,
  IConfigSettings
} from '..';
import { ITimeLineService } from '.';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from '@microsoft/sp-http';

import { 
  PlannerPlan,
  PlannerPlanDetails,
  PlannerTaskDetails,
  PlannerBucket,
  PlannerTask,
  User,
} from '@microsoft/microsoft-graph-types'

interface PlannerPlanDel extends PlannerPlan {
  "@odata.etag": string;
}

export class TimeLineService implements ITimeLineService {
  // Private members
  private _graphClient: MSGraphClientV3;
  private _spContext: WebPartContext;
  private _pageId = "";
  private _buckets: PlannerBucket[] = [];
  private _taskUsers: User[] = [];
  private _tasks: PlannerTask[] = [];
  private _planDetails: PlannerPlanDetails | undefined = undefined;  

  private _timeLine: ITimeLineData = {
    groupId: "",
    planId: "",
    refresh: true,
  };

  // Constructor
  constructor(spContext: WebPartContext, configSettings: IConfigSettings, planId: string) {
    this._spContext = spContext;
    this._timeLine.groupId = configSettings.groupId;
    this._timeLine.planId = planId;
    this._pageId = configSettings.cacheId;
  }

  public async updateTimelineData(planId: string): Promise<void> {
    this._timeLine.planId = planId;

    await this._removeTimelineData();
  }

  // Initialize Graph client
  public async initializeGraphClient(): Promise<void> {
    // Initialize MSGraphClient
    this._graphClient = await this._spContext.msGraphClientFactory.getClient('3');
  }

  public async getTimelineData(): Promise<ITimeLineData> {
    // Check session timeline data, return true if no cashed data
    this._timeLine.refresh =  await this._getTimelineData();
    
    return this._timeLine;
  }

  public async refreshTasks(): Promise<ITimeLineData> {
    this._timeLine.refresh = false;

    try {
      // Get all users    
      const allUsers = await this._graphClient
        .api("/groups/" + this._timeLine.groupId + "/members")
        .select("id,displayName,mail")
        .get();

        // Set all users
      this._taskUsers = allUsers.value;

      if (this._timeLine.planId) {        
        // Get Plan Details
        const planDetails = await this._graphClient
          .api("/planner/plans/" + this._timeLine.planId + "/details")
          .get();

        this._planDetails = planDetails;

        // Get all buckets        
        const bucketsData = await await this._graphClient
          .api("/planner/plans/" + this._timeLine.planId + "/buckets")
          .get();

        // Set buckets
        this._buckets = bucketsData.value.sort((a: PlannerBucket, b: PlannerBucket) => (a.name ?? "").localeCompare(b.name ?? ""));

        // Get all tasks        
        if (this._timeLine.planId) {
          const tasksData = await this._graphClient
            .api("/planner/plans/" + this._timeLine.planId + "/Tasks")
            .orderby("dueDateTime")
            .get();

          // Set tasks
          const tasks: PlannerTask[] = tasksData.value;

          // Get task details
          this._tasks = await this._getTaskDetails(tasks);
        }
      }
    } catch (error: unknown) {
      // Set error message
      this._timeLine.error = (error as Error)?.message;
    }

    // Save timeline data to session storage
    await this._saveTimelineData(
      this._timeLine,
      this._buckets,
      this._taskUsers,
      this._tasks,
      this._planDetails
    );

    // Return timeline data
    return this._timeLine;
  }

  private async _getTaskDetails(tasks: PlannerTask[]): Promise<PlannerTask[]> {
    for (const task of tasks) {
      if (task.completedBy) {
        this._taskUsers.forEach((user) => {            
          if (user.id === task.completedBy?.user?.id && task.completedBy && task.completedBy.user) {            
            task.completedBy.user.displayName = user.displayName;              
          }
        });
      }

      if (task.createdBy) {
        this._taskUsers.forEach((user) => {
          if (user.id === task.createdBy?.user?.id && task.createdBy && task.createdBy.user) {            
            task.createdBy.user.displayName = user.displayName;              
          }
        });        
      }

      if (task.bucketId) {
        this._buckets.forEach((bucket) => {
          if (bucket.id === task.bucketId) {
            task.bucketId = bucket.id + ":" + bucket.name;
          }          
        });
      }
    }

    return tasks;
  }

  // Get timeline data
  public getTimeLine(): ITimeLineData {
    return this._timeLine;
  }

  // Get Planner buckets
  public getBuckets(): PlannerBucket[] {
    return this._buckets;
  }

  // Get tenant users
  public getTaskUsers(): User[] {
    return this._taskUsers;
  }

  public getPlannerCategoryDescriptions(): { [key: string]: string } {
    return this._planDetails?.categoryDescriptions as { [key: string]: string } ?? {};
  }
      
  public async getTaskDetails(taskId: string): Promise<PlannerTaskDetails | undefined> {
    let taskDetails: PlannerTaskDetails | undefined = undefined;
    try {
      const detail = await this._graphClient
        .api("/planner/tasks/" + taskId + "/details")
          .get();

        taskDetails = detail;

    } catch (error: unknown) {
      console.error(error);
    }

    return taskDetails;
  }

  // Get Planner tasks
  public getTasks(sortBy: string): PlannerTask[] {    
    const tasksWithDate: PlannerTask[] = [];
    const tasksNoDate: PlannerTask[] = [];

    if (sortBy.toLowerCase() === "duedate") {
      this._tasks.forEach((task) => {
        if (task.dueDateTime) {
          tasksWithDate.push(task);
        } else {
          tasksNoDate.push(task);
        }
      });

      return tasksWithDate.length > 0 ? tasksNoDate.concat(this._sortTasksByDueDate(tasksWithDate)) : tasksNoDate;
    } else if (sortBy.toLowerCase() === "startdate") {
      this._tasks.forEach((task) => {
        if (task.startDateTime) {
          tasksWithDate.push(task);
        } else {
          tasksNoDate.push(task);
        }
      });
      
      return tasksWithDate.length > 0 ? tasksNoDate.concat(this._sortTasksByStartDate(tasksWithDate)) : tasksNoDate;      
    } else {
      return this._tasks;
    }
  }

  // Get active tasks
  public getActiveTasks(sortBy: string): PlannerTask[] {
    const orderedTasks = this.getTasks(sortBy);

    return orderedTasks.filter((task) => {
      return !task.completedDateTime;
    });
  }

  // Get tasks sort by start date
  private _sortTasksByStartDate(tasks: PlannerTask[]): PlannerTask[] {
    tasks = tasks.sort((a, b) => {
      if (a.startDateTime && b.startDateTime) {
        return a.startDateTime.localeCompare(b.startDateTime);
      } else {
        return 0;
      }
    });

    return tasks;
  }

  // get tasks sort by due date
  private _sortTasksByDueDate(tasks: PlannerTask[]): PlannerTask[] {
    tasks = tasks.sort((a, b) => {
      if (a.dueDateTime && b.dueDateTime) {
        return a.dueDateTime.localeCompare(b.dueDateTime);
      } else {
        return 0;
      }
    });

    return tasks;
  }

  public getTasksForBucket(filterSettings: IFilterSettings): PlannerTask[] {
    let tasks: PlannerTask[] = [];

    if (filterSettings.showActiveTasks) {
      tasks = this.getTasks("dueDate");
    } else {
      tasks = this.getActiveTasks("dueDate");
    }

    if (filterSettings.bucketId !== "All" && filterSettings.bucketId !== "") {
      const filteredTasks: PlannerTask[] = [];

      tasks.forEach((task) => {
        if (
          task.bucketId &&
          (task.bucketId.indexOf(filterSettings.bucketId) === 0)
        ) {
          filteredTasks.push(task);
        }
      });

      return filteredTasks;
    }

    return tasks;
  }

  // Get timeline data from session storage
  private async _getTimelineData(): Promise<boolean> {
    const timelineData = sessionStorage.getItem("_" + this._pageId + "TimelineData");

    if (timelineData) {
      const buckets = sessionStorage.getItem("_" + this._pageId + "buckets");
      const Users = sessionStorage.getItem("_" + this._pageId + "Users");
      const tasks = sessionStorage.getItem("_" + this._pageId + "tasks");
      const planDetails = sessionStorage.getItem("_" + this._pageId + "planDetails");
      
      this._timeLine = JSON.parse(timelineData) as ITimeLineData;
      this._buckets = buckets ? (JSON.parse(buckets) as PlannerBucket[]) : [];
      this._taskUsers = Users ? (JSON.parse(Users) as User[]) : [];
      this._tasks = tasks ? (JSON.parse(tasks) as PlannerTask[]) : [];
      this._planDetails = planDetails ? (JSON.parse(planDetails) as PlannerPlanDetails) : undefined;

      return false;
    } else {
      return true;
    }
  }

  // Save timeline data to session storage
  private async _saveTimelineData(
    timelineData: ITimeLineData,
    buckets: PlannerBucket[],
    Users: User[],
    tasks: PlannerTask[],
    planDetails: PlannerPlanDetails | undefined
  ): Promise<void> {
    sessionStorage.setItem("_" + this._pageId + "TimelineData", JSON.stringify(timelineData));
    sessionStorage.setItem("_" + this._pageId + "buckets", JSON.stringify(buckets));
    sessionStorage.setItem("_" + this._pageId + "Users", JSON.stringify(Users));
    sessionStorage.setItem("_" + this._pageId + "tasks", JSON.stringify(tasks));
    sessionStorage.setItem("_" + this._pageId + "planDetails", JSON.stringify(planDetails));    
  }

  // Remove timeline data from session storage
  private async _removeTimelineData(): Promise<void> {
    sessionStorage.removeItem("_" + this._pageId + "TimelineData");
    sessionStorage.removeItem("_" + this._pageId + "buckets");
    sessionStorage.removeItem("_" + this._pageId + "Users");
    sessionStorage.removeItem("_" + this._pageId + "tasks");
    sessionStorage.removeItem("_" + this._pageId + "planDetails");
  }

  // Advanced Service Methods
  public async newPlannerPlan(title: string, groupId: string): Promise<PlannerPlan | undefined> {
    let plan: PlannerPlan | undefined = undefined;

    try {
      const newPlan = {
        owner: groupId,
        title: title,
      };

      plan = await this._graphClient
        .api("/planner/plans")
        .post(newPlan);
      
    } catch (error: unknown) {
      console.error(error);
    }

    return plan;
  }
  
  public async newPlannerBucket(planId: string, title: string, orderHint: string = " !"): Promise<PlannerBucket | undefined> {
    let bucket: PlannerBucket | undefined = undefined;

    try {
      const newBucket = {
        name: title,
        planId: planId,
        orderHint: orderHint,
      };

      bucket = await this._graphClient
        .api("/planner/buckets")
        .post(newBucket);
      
    } catch (error: unknown) {
      console.error(error);
    }

    return bucket;
  }
  
  public async newTask(planId: string, bucketId: string, title: string): Promise<PlannerTask | undefined> {
    let task: PlannerTask | undefined = undefined;

    try {
      const newTask = {
        planId: planId,
        bucketId: bucketId,
        title: title,
        assignments: {}
      };

      task = await this._graphClient
        .api("/planner/tasks")
        .post(newTask);
      
    } catch (error: unknown) {
      console.error(error);
    }

    return task; 
  }

  public async deletePlannerPlan(planId : string): Promise<void> {
    const plan: PlannerPlanDel | undefined = await this._getPlannerPlans(planId);
    
    console.log(plan);

    if (plan) {
      try {
        await this._graphClient
          .api("/planner/plans/" + plan.id)
          .header("If-Match", plan["@odata.etag"])
          .delete();
      } catch (error: unknown) {
        console.error(error);
      }
    }
  }
  
  private async _getPlannerPlans(planId: string): Promise<PlannerPlanDel | undefined> {
    let plan: PlannerPlanDel | undefined = undefined;

    try {
      plan = await this._graphClient
        .api("/planner/plans/" + planId)
        .select("id, title")
        .get();
    } catch (error: unknown) {
      console.error(error);
    }

    return plan;
  }
  
}