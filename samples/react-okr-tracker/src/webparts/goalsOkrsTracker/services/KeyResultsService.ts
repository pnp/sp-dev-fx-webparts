import { spfi, SPFx } from "@pnp/sp";
import { SPFI } from "@pnp/sp"; // explicitly import SPFI type
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IKeyResult {
    Id?: number;
    Title: string;
    ObjectiveId: number;
    Progress: number;
    RAGStatus: string;
    LastUpdate?: string;
    UpdatedById: number;
}

export class KeyResultsService {
    private sp: SPFI;
    private listName = 'Key Results';

    constructor(context: WebPartContext) {
        this.sp = spfi().using(SPFx(context));
    }

    public async getKeyResults(objectiveId: number): Promise<IKeyResult[]> {
        try {
            const items = await this.sp.web.lists.getByTitle(this.listName).items
                .filter(`ObjectiveId eq ${objectiveId}`)
                .select('Id', 'Title', 'Objective/Id', 'Progress', 'RAGStatus', 'LastUpdate', 'UpdatedBy/Id', 'UpdatedBy/Title')
                .expand('Objective', 'UpdatedBy')();

            return items.map(item => ({
                Id: item.Id,
                Title: item.Title,
                ObjectiveId: item.Objective?.Id,
                Progress: item.Progress,
                RAGStatus: item.RAGStatus,
                LastUpdate: item.LastUpdate,
                UpdatedById: item.UpdatedBy?.Id
            }));
        } catch (error) {
            console.error('Error fetching key results:', error);
            throw error;
        }
    }

    public async createKeyResult(keyResult: IKeyResult): Promise<IKeyResult> {
        try {
            const result = await this.sp.web.lists.getByTitle(this.listName).items.add({
                Title: keyResult.Title,
                ObjectiveId: keyResult.ObjectiveId,
                Progress: keyResult.Progress,
                RAGStatus: keyResult.RAGStatus,
                LastUpdate: keyResult.LastUpdate,
                UpdatedById: keyResult.UpdatedById
            });
            return {
                Id: result.data.Id,
                ...keyResult
            };
        } catch (error) {
            console.error('Error creating key result:', error);
            throw error;
        }
    }

    public async updateKeyResult(id: number, updates: Partial<IKeyResult>): Promise<void> {
        try {
            await this.sp.web.lists.getByTitle(this.listName).items.getById(id).update(updates);
        } catch (error) {
            console.error('Error updating key result:', error);
            throw error;
        }
    }

    public async deleteKeyResult(id: number): Promise<void> {
        try {
            await this.sp.web.lists.getByTitle(this.listName).items.getById(id).delete();
        } catch (error) {
            console.error('Error deleting key result:', error);
            throw error;
        }
    }
}
