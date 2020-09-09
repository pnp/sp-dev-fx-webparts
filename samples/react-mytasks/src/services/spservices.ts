import * as moment from 'moment';
import { Bucket, DirectoryObject, graph, Plan, Planner, TaskAddResult, Group } from '@pnp/graph';
import { IGroup } from './IGroups';
import { IGroupMember, IMember } from './IGroupMembers';
import { IPlannerBucket } from './IPlannerBucket';
import { IPlannerPlan } from './IPlannerPlan';
import { IPlannerPlanDetails } from './IPlannerPlanDetails';
import { IPlannerPlanExtended } from './IPlannerPlanExtended';
import { ITask } from './ITask';
import { ITaskDetails } from './ITaskDetails';
import { ITaskProperty } from './ITaskProperty';
import { IUser } from './IUser';
import { MSGraphClient, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PropertyPaneDynamicFieldSet } from "@microsoft/sp-property-pane";
import {
  SearchProperty,
  SearchQuery,
  SearchResults,
  SortDirection,
  sp,
  Web,
  PagedItemCollection,
  ChunkedFileUploadProgressData,
  FileAddResult
} from '@pnp/pnpjs';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { User } from '@pnp/graph/src/users';
import * as $ from 'jquery';
import { List } from 'office-ui-fabric-react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

const DEFAULT_PERSONA_IMG_HASH: string = '7ad602295f8386b7615b582d87bcc294';
const DEFAULT_IMAGE_PLACEHOLDER_HASH: string = '4a48f26592f4e1498d7a478a4c48609c';
const MD5_MODULE_ID: string = '8494e7d7-6b99-47b2-a741-59873e42f16f';
const PROFILE_IMAGE_URL: string = '/_layouts/15/userphoto.aspx?size=M&accountname=';

export default class spservices {
  private graphClient: MSGraphClient = null;
  public currentUser: string = undefined;

  constructor(public context: WebPartContext) {
    /*
    Initialize MSGraph
    */

    sp.setup({
      spfxContext: this.context
    });
    graph.setup({
      spfxContext: this.context
    });

    this.currentUser = this.context.pageContext.user.email;
  }

  public async getTaskById(taskId: string): Promise<ITask> {
    try {
      const task: ITask = await graph.planner.tasks.getById(taskId).get();
      return task;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   * Gets user groups
   * @returns user groups
   */
  public async getUserGroups(): Promise<IGroup[]> {
    let o365Groups: IGroup[] = [];
    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const groups = await this.graphClient
        .api(`me/memberof`)
        .version('v1.0')
        .get();
      // Get O365 Groups
      for (const group of groups.value as IGroup[]) {
        const hasO365Group = group.groupTypes && group.groupTypes.length > 0 ? group.groupTypes.indexOf('Unified') : -1;
        if (hasO365Group !== -1) {
          o365Groups.push(group);
        }
      }
      return o365Groups;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   * Gets user plans by group id
   * @param groupId
   * @returns user plans by group id
   */
  public async getUserPlansByGroupId(groupId: string): Promise<IPlannerPlan[]> {
    try {
      const groupPlans: IPlannerPlan[] = await graph.groups.getById(groupId).plans.get();
      return groupPlans;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   * Gets user plans
   * @returns user plans
   */
  public async getUserPlans(): Promise<IPlannerPlanExtended[]> {
    try {
      let userPlans: IPlannerPlanExtended[] = [];
      const o365Groups: IGroup[] = await this.getUserGroups();
      for (const group of o365Groups) {
        const plans: IPlannerPlan[] = await this.getUserPlansByGroupId(group.id);
        for (const plan of plans) {
          const groupPhoto: string = await this.getGroupPhoto(group.id);
          const userPlan: IPlannerPlanExtended = { ...plan, planPhoto: groupPhoto };
          userPlans.push(userPlan);
        }
      }
      // Sort plans by Title
      userPlans = userPlans.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return userPlans;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   * Gets group photo
   * @param groupId
   * @returns group photo
   */
  public async getGroupPhoto(groupId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let url: any = '';
        const photo = await graph.groups.getById(groupId).photo.getBlob();
        let reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            url = reader.result; // data url
            resolve(url);
          },
          false
        );
        reader.readAsDataURL(photo); // converts the blob to base64 and calls onload
      } catch (error) {
        resolve(undefined);
      }
    });
  }
  /**
   * Gets tasks
   * @returns tasks
   */
  public async getTasks(): Promise<ITask[]> {
    try {
      //const myTasks: ITask[] = await graph.me.tasks.get();
      let myTasks: ITask[] = [];
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const results: any = await this.graphClient
        .api(`/me/planner/tasks`)
        .version('v1.0')
        .get();

      return results.value;
    } catch (error) {
      throw new Error('Error on get user task');
    }
  }

  /**
   * Gets group members
   * @param groupId
   * @returns group members
   */
  public async getGroupMembers(groupId: string, skipToken: string): Promise<IGroupMember> {
    try {
      let groupMembers: IGroupMember;
      if (skipToken) {
        this.graphClient = await this.context.msGraphClientFactory.getClient();
        groupMembers = await this.graphClient
          .api(`groups/${groupId}/members`)
          .version('v1.0')
          .skipToken(skipToken)
          .get();
      } else {
        this.graphClient = await this.context.msGraphClientFactory.getClient();
        groupMembers = await this.graphClient
          .api(`groups/${groupId}/members`)
          .version('v1.0')
          .top(100)
          .get();
      }
      return groupMembers;
    } catch (error) {
      throw new Error('Error on get group members');
    }
  }
  /**
   * Gets task details
   * @param taskId
   * @returns task details
   */
  public async getTaskDetails(taskId: string): Promise<ITaskDetails> {
    try {
      const taskDetails: ITaskDetails = await graph.planner.tasks.getById(taskId).details.get();
      return taskDetails;
    } catch (error) {
      Promise.reject(error);
    }
    return null;
  }

  /**
   * Updates task as completed
   * @param taskId
   * @param etag
   * @returns task as completed
   */
  public async updateTaskAsCompleted(taskId: string, etag: string): Promise<void> {
    try {
      // await graph.planner.tasks.getById(taskId).update({percentComplete: 100});
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      await this.graphClient
        .api(`planner/tasks/${taskId}`)
        .version('v1.0')
        .header(`If-Match`, etag)
        .patch({ percentComplete: 100 });
    } catch (error) {
      throw new Error('Error get task Details');
    }
  }

  /**
   * Updates task not started
   * @param taskId
   * @param etag
   * @returns task not started
   */
  public async updateTaskNotStarted(taskId: string, etag: string): Promise<void> {
    try {
      //await graph.planner.tasks.getById(taskId).update({percentComplete: 100});
      await this.graphClient
        .api(`planner/tasks/${taskId}`)
        .version('v1.0')
        .header(`If-Match`, etag)
        .patch({ percentComplete: 0 });
    } catch (error) {
      throw new Error('Error on update task progress');
    }
  }

  /**
   *  async getPlan
planId:string :Promise<string>  */
  public async getPlan(planId: string): Promise<IPlannerPlan> {
    try {
      const plan: Plan = await graph.planner.plans.getById(planId);
      const plannerPlan: IPlannerPlan = await plan.get();

      return plannerPlan;
    } catch (error) {
      Promise.reject(error);
    }
  }

  public async updatePlannerDetailsProperty(
    plannerId: string,
    plannerDetailsPropertyName: string,
    plannerDetailsPropertyValue: any,
    etag: string
  ): Promise<string> {
    try {
      let parameterValue: any;
      // Test typeof parameter
      switch (typeof plannerDetailsPropertyValue) {
        case 'object':
          parameterValue = JSON.stringify(plannerDetailsPropertyValue);
          break;
        case 'number':
          parameterValue = plannerDetailsPropertyValue;
          break;
        case 'string':
          parameterValue = `'${plannerDetailsPropertyValue}'`;
          break;
        default:
          parameterValue = `'${plannerDetailsPropertyValue}'`;
          break;
      }

      this.graphClient = await this.context.msGraphClientFactory.getClient();
      await this.graphClient
        .api(`planner/plans/${plannerId}/details`)
        .version('v1.0')
        .header(`If-Match`, etag)
        .patch(`{${plannerDetailsPropertyName} :  ${parameterValue}}`);

      //  const _task: ITaskProperty = {[taskPropertyName] : taskPropertyValue};
      //  await graph.planner.tasks.getById(taskId).update(_task, etag);
      const plannerDetails: IPlannerPlanDetails = await this.getPlanDetails(plannerId);
      return plannerDetails['@odata.etag'];
    } catch (error) {
      console.log(error);
      throw new Error('Error on update planner Details');
    }
  }

  /**
   * Adds task
   * @param taskInfo
   * @returns task
   */
  public async updateTaskProperty(taskId: string, taskPropertyName: string, taskPropertyValue: any, etag: string): Promise<ITask> {
    try {
      let parameterValue: any;
      // Test typeof parameter
      switch (typeof taskPropertyValue) {
        case 'object':
          parameterValue = JSON.stringify(taskPropertyValue);
          break;
        case 'number':
          parameterValue = taskPropertyValue;
          break;
        case 'string':
          parameterValue = `'${taskPropertyValue}'`;
          break;
        default:
          parameterValue = `'${taskPropertyValue}'`;
          break;
      }

      this.graphClient = await this.context.msGraphClientFactory.getClient();
       const task = await this.graphClient
        .api(`planner/tasks/${taskId}`)
        .version('v1.0')
        .headers({["Prefer"]: "return=representation", ["if-Match"]: etag, ["Content-type"]: "application/json"})
        .patch(`{${taskPropertyName} :  ${parameterValue}}`);

      //  const _task: ITaskProperty = {[taskPropertyName] : taskPropertyValue};
      //  await graph.planner.tasks.getById(taskId).update(_task, etag);
     // const task = await this.getTaskById(taskId);
   // return task2['@odata.etag'];
     return task;
    } catch (error) {
      console.log(error);
      throw new Error('Error on add task');
    }
  }

  public async updateTaskDetailsProperty(
    taskId: string,
    taskPropertyName: string,
    taskPropertyValue: object | number | string,
    etag: string
  ): Promise<ITaskDetails> {
    try {
      let parameterValue: any;
      // Test typeof parameter
      switch (typeof taskPropertyValue) {
        case 'object':
          parameterValue = JSON.stringify(taskPropertyValue);
          break;
        case 'number':
          parameterValue = taskPropertyValue;
          break;
        case 'string':
          parameterValue = `'${taskPropertyValue}'`;
          break;
        default:
          parameterValue = `'${taskPropertyValue}'`;
          break;
      }

      this.graphClient = await this.context.msGraphClientFactory.getClient();
       const taskDetails = await this.graphClient
        .api(`planner/tasks/${taskId}/details`)
        .version('v1.0')
        .headers({["Prefer"]: "return=representation", ["if-Match"]: etag, ["Content-type"]: "application/json"})
        .patch(`{${taskPropertyName} :  ${parameterValue}}`);

      //  const _task: ITaskProperty = {[taskPropertyName] : taskPropertyValue};
      //  await graph.planner.tasks.getById(taskId).update(_task, etag);
     //const taskDetails = await this.getTaskDetails(taskId);
     // return taskDetails['@odata.etag'];
     return taskDetails;
    } catch (error) {
      console.log(error);
      throw new Error('Error on update property Task, please try later.');
    }
  }
  /**
   * Adds task
   * @param taskInfo
   * @returns task
   */
  public async addTask(taskInfo: string[]): Promise<TaskAddResult> {
    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const task = await this.graphClient
        .api(`planner/tasks`)
        .version('v1.0')
        .post({
          planId: taskInfo['planId'],
          bucketId: taskInfo['bucketId'],
          title: taskInfo['title'],
          dueDateTime: taskInfo['dueDate'] ? moment(taskInfo['dueDate']).toISOString() : undefined,
          assignments: taskInfo['assignments']
        });

      //const task: TaskAddResult = await graph.planner.tasks.add( taskInfo['planId'], taskInfo['title'], taskInfo['assignments'], taskInfo['bucketId']);
      return task;
    } catch (error) {
      throw new Error('Error on add task');
    }
  }

  public async deleteTask(taskId: string, etag:string): Promise<void> {
    try {
       // await graph.planner.tasks.getById(taskId).update({percentComplete: 100});
       this.graphClient = await this.context.msGraphClientFactory.getClient();
       await this.graphClient
         .api(`planner/tasks/${taskId}`)
         .version('v1.0')
         .header(`If-Match`, etag)
         .delete();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Gets plan details
   * @param planId
   * @returns plan details
   */
  public async getPlanDetails(planId: string): Promise<IPlannerPlanDetails> {
    try {
      const plan: Plan = await graph.planner.plans.getById(planId);
      const plannerPlanDetails: IPlannerPlanDetails = await plan.details.get();
      await this.getPlanBuckets(planId);
      return plannerPlanDetails;
    } catch (error) {
      throw new Error('Error on get planner details');
    }
  }

  /**
   * Gets plan buckets
   * @param planId
   * @returns plan buckets
   */
  public async getPlanBuckets(planId: string): Promise<IPlannerBucket[]> {
    try {
      const plan: Plan = await graph.planner.plans.getById(planId);
      const plannerBuckets: IPlannerBucket[] = await plan.buckets.get();
      return plannerBuckets;
    } catch (error) {
      throw new Error('Error get Planner buckets');
    }
  }
  /**
   * Gets user
   * @param userId
   * @returns user
   */
  public async getUser(userId: string): Promise<IMember> {
    try {
      const user: IMember = await graph.users.getById(userId).get();
      return user;
    } catch (error) {
      throw new Error('Error on get user details');
    }
  }

  /*
  public async getPhoto(userId: string): Promise<any> {
    let photo: any = undefined;
    try {
      let photoBlob = await graph.users.getById(userId).photo.getBlob();
      let groupPhotoUrl = window.URL;
      photo = groupPhotoUrl.createObjectURL(photoBlob);
    } catch (error) {
      return undefined;
    }
    return photo;
  }
*/
  /**
   * Gets user photo
   * @param userId
   * @returns user photo
   */
  public async getUserPhoto(userId): Promise<string> {
    const personaImgUrl = PROFILE_IMAGE_URL + userId;
    const url: string = await this.getImageBase64(personaImgUrl);
    const newHash = await this.getMd5HashForUrl(url);

    if (newHash !== DEFAULT_PERSONA_IMG_HASH && newHash !== DEFAULT_IMAGE_PLACEHOLDER_HASH) {
      return 'data:image/png;base64,' + url;
    } else {
      return 'undefined';
    }
  }

  /**
   * Get MD5Hash for the image url to verify whether user has default image or custom image
   * @param url
   */
  private getMd5HashForUrl(url: string) {
    return new Promise(async (resolve, reject) => {
      const library: any = await this.loadSPComponentById(MD5_MODULE_ID);
      try {
        const md5Hash = library.Md5Hash;
        if (md5Hash) {
          const convertedHash = md5Hash(url);
          resolve(convertedHash);
        }
      } catch (error) {
        resolve(url);
      }
    });
  }

  /**
   * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
   * @param componentId - componentId, guid of the component library
   */
  private loadSPComponentById(componentId: string) {
    return new Promise((resolve, reject) => {
      SPComponentLoader.loadComponentById(componentId)
        .then((component: any) => {
          resolve(component);
        })
        .catch(error => {});
    });
  }
  /**
   * Gets image base64
   * @param pictureUrl
   * @returns image base64
   */
  private getImageBase64(pictureUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.addEventListener('load', () => {
        let tempCanvas = document.createElement('canvas');
        (tempCanvas.width = image.width), (tempCanvas.height = image.height), tempCanvas.getContext('2d').drawImage(image, 0, 0);
        let base64Str;
        try {
          base64Str = tempCanvas.toDataURL('image/png');
        } catch (e) {
          return '';
        }
        base64Str = base64Str.replace(/^data:image\/png;base64,/, '');
        resolve(base64Str);
      });
      image.src = pictureUrl;
    });
  }

  /**
   * Searchs users
   * @param searchString
   * @returns users
   */
  public async searchUsers(searchString: string): Promise<IMember[]> {
    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const returnUsers = await this.graphClient
        .api(`users`)
        .version('v1.0')
        .top(100)
        .filter(`startswith(DisplayName, '${searchString}') or startswith(mail, '${searchString}')`)
        .get();

      return returnUsers.value;
    } catch (error) {
      throw new Error('Error on search users');
    }
  }

  public async getGrouoUrl(groupId): Promise<string> {
    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const returnGroupInfo = await this.graphClient
        .api(`groups/${groupId}/sites/root`)
        .version('v1.0')
        .get();

      return returnGroupInfo.webUrl;
    } catch (error) {
      console.log(error.message);
      throw new Error('Error get group Url');
    }
  }

  public async getSharePointFiles(groupId: string, sortField: string, ascending: boolean): Promise<PagedItemCollection<any[]>> {
    try {
      // let libraryUrl: string = await this.getGroupDocumentLibraryUrl(groupId);
      const groupUrl: string = await this.getGrouoUrl(groupId);

      const web = new Web(groupUrl);
      const defualtDocumentLibrary = await web.defaultDocumentLibrary.get();
      const results: PagedItemCollection<any[]> = await web.lists
        .getById(defualtDocumentLibrary.Id)
        .items.select(
          'Title',
          'File_x0020_Type',
          'FileSystemObjectType',
          'File/Name',
          'File/ServerRelativeUrl',
          'File/Title',
          'File/Id',
          'File/TimeLastModified'
        )
        .top(8)
        .expand('File')
        .orderBy(`${sortField}`, ascending)
        .getPaged();

      return results;
    } catch (error) {
      throw new Error('Error on read files from Documents ' + error.message);
    }
  }

  /**
   * Gets group document library url
   * @param groupId
   * @returns group document library url
   */
  public async getGroupDocumentLibraryUrl(groupId: string): Promise<string> {
    try {
      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const returnGroupDriveInfo = await this.graphClient
        .api(`groups/${groupId}/sites/root/drive`)
        .version('v1.0')
        .get();

      return returnGroupDriveInfo.webUrl;
    } catch (error) {
      console.log(error.message);
      throw new Error('Error get group default Document Library');
    }
  }

  public ValidateEmail(mail: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  public async uploadFileToSharePoint(documentLibrary: string, webUrl: string, fileName: string, fileB64: any): Promise<any> {
    try {
      const web = new Web(webUrl);
      documentLibrary = documentLibrary.replace(location.origin, '');
      console.log(documentLibrary);

      const rs: FileAddResult = await web.getFolderByServerRelativeUrl(documentLibrary).files.addChunked(
        fileName,
        fileB64,
        (data: ChunkedFileUploadProgressData) => {
          console.log('File Upload chunked %', data.currentPointer / data.fileSize);
          return data.currentPointer / data.fileSize;
        },
        true
      );
      return rs;
      // const rs:FileAddResult = await web.getFolderByServerRelativeUrl(documentLibrary).files.add(fileName,fileB64,true);
    } catch (error) {
      console.log(error);
    }
  }
}
