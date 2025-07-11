import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users";

export interface IObjective {
    Id?: number;
    Title: string;
    OwnerId: number; // Person field (user ID)
    Quarter: string;
    Year: number;
    Status: string;
    Notes?: string;
}

export class ObjectivesService {
    private sp: any; // Changed from SPFI to any as SPFI is not imported
    private listName = 'Objectives';

    constructor(context: any) {
        this.sp = spfi().using(SPFx(context));
    }

    public async getObjectives(): Promise<IObjective[]> {
        try {
            const items = await this.sp.web.lists.getByTitle(this.listName).items.select('Id', 'Title', 'Owner/Id', 'Owner/Title', 'Quarter', 'Year', 'Status', 'Notes').expand('Owner')();
            return items.map((item: any) => ({
                Id: item.Id,
                Title: item.Title,
                OwnerId: item.Owner?.Id,
                Quarter: item.Quarter,
                Year: item.Year,
                Status: item.Status,
                Notes: item.Notes
            }));
        } catch (error) {
            console.error('Error fetching objectives:', error);
            throw error;
        }
    }

    public async createObjective(objective: IObjective): Promise<IObjective> {
        try {
            const result = await this.sp.web.lists.getByTitle(this.listName).items.add({
                Title: objective.Title,
                OwnerId: objective.OwnerId,
                Quarter: objective.Quarter,
                Year: objective.Year,
                Status: objective.Status,
                Notes: objective.Notes
            });
            return result.data as IObjective;
        } catch (error) {
            console.error('Error creating objective:', error);
            throw error;
        }
    }

    public async updateObjective(id: number, updates: Partial<IObjective>): Promise<void> {
        try {
            await this.sp.web.lists.getByTitle(this.listName).items.getById(id).update(updates);
        } catch (error) {
            console.error('Error updating objective:', error);
            throw error;
        }
    }

    public async deleteObjective(id: number): Promise<void> {
        try {
            await this.sp.web.lists.getByTitle(this.listName).items.getById(id).delete();
        } catch (error) {
            console.error('Error deleting objective:', error);
            throw error;
        }
    }
} 