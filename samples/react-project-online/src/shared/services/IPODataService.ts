import { IPOTask } from "./../interfaces";

export interface IPODataService {
    GetProjectTasks(webUrl: string, projectId: string, selectFields: string[], filter: string, orderBy: string, top: number): Promise<IPOTask[]>;
}
