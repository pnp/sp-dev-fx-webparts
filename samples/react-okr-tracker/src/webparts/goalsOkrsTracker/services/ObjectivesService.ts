import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users";
import { WebPartContext } from "@microsoft/sp-webpart-base"; // <- required for SPFx()

export interface IObjective {
    Id?: number;
    Title: string;
    AuthorId: number;
    AuthorName: string;
    Quarter: string;
    Year: number;
    Status: string;
    Notes?: string;
}

interface IObjectiveItem {
    Id: number;
    Title: string;
    Author?: {
        Id: number;
        Title: string;
    };
    Quarter: string;
    Year: number;
    Status: string;
    Notes?: string;
}

/**
 * Represents a raw SharePoint list item as returned from the API
 */
interface ISharePointObjectiveItem {
    Id: number;
    Title: string;
    Author?: {
        Id: number;
        Title: string;
    };
    Quarter: string;
    Year: number;
    Status: string;
    Notes?: string;
    // Add any additional fields that might come back from SharePoint
}

export class ObjectivesService {
    private sp: SPFI;
    private listName = 'Objectives';

    constructor(context: WebPartContext) {
        this.sp = spfi().using(SPFx(context));
    }

    public async getObjectives(): Promise<IObjective[]> {
        try {
            const items: IObjectiveItem[] = await this.sp.web.lists
                .getByTitle(this.listName)
                .items
                .select('Id', 'Title', 'Author/Id', 'Author/Title', 'Quarter', 'Year', 'Status', 'Notes')
                .expand('Author')();

            return items.map((item) => this.mapSharePointItemToObjective(item));
        } catch (error) {
            console.error('Error fetching objectives:', error);
            throw error;
        }
    }

    public async createObjective(objective: IObjective): Promise<IObjective> {
        try {
            const result = await this.sp.web.lists.getByTitle(this.listName).items.add({
                Title: objective.Title,
                Quarter: objective.Quarter,
                Year: objective.Year,
                Status: objective.Status,
                Notes: objective.Notes
            });

            console.log('Objective created:', result);

            // Fetch the complete item to get Author information
            const createdItem = await this.sp.web.lists
                .getByTitle(this.listName)
                .items.getById(result.Id)
                .select('Id', 'Title', 'Author/Id', 'Author/Title', 'Quarter', 'Year', 'Status', 'Notes')
                .expand('Author')();

            // Convert the returned item to the expected IObjectiveItem format
            const formattedItem: IObjectiveItem = {
                Id: createdItem.Id,
                Title: createdItem.Title,
                Author: createdItem.Author ? {
                    Id: createdItem.Author.Id,
                    Title: createdItem.Author.Title
                } : undefined,
                Quarter: createdItem.Quarter,
                Year: createdItem.Year,
                Status: createdItem.Status,
                Notes: createdItem.Notes
            };

            return this.mapSharePointItemToObjective(formattedItem);
        } catch (error) {
            console.error('Error creating objective:', error);
            throw error;
        }
    }

    /**
     * Updates an objective in SharePoint
     * Note: AuthorId and AuthorName are excluded from updates as Author is a system field
     * that cannot be directly modified
     */
    public async updateObjective(id: number, updates: Partial<IObjective>): Promise<void> {
        try {
            // Create a clean object with only SharePoint-compatible fields
            const validUpdates: {
                Title?: string;
                Quarter?: string;
                Year?: number;
                Status?: string;
                Notes?: string;
            } = {};

            // Only include valid SharePoint fields
            if ('Title' in updates) validUpdates.Title = updates.Title;
            if ('Quarter' in updates) validUpdates.Quarter = updates.Quarter;
            if ('Year' in updates) validUpdates.Year = updates.Year;
            if ('Status' in updates) validUpdates.Status = updates.Status;
            if ('Notes' in updates) validUpdates.Notes = updates.Notes;

            // Log what's being sent to SharePoint for debugging
            console.log('Sending to SharePoint:', validUpdates);

            // Only send valid fields to SharePoint
            await this.sp.web.lists.getByTitle(this.listName).items.getById(id).update(validUpdates);
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

    /**
     * Maps a SharePoint list item to our application's IObjective interface
     * Handles the mapping of Author information to AuthorId and AuthorName
     */
    private mapSharePointItemToObjective(item: ISharePointObjectiveItem): IObjective {
        return {
            Id: item.Id,
            Title: item.Title,
            AuthorId: item.Author?.Id ?? 0,
            AuthorName: item.Author?.Title || '',
            Quarter: item.Quarter,
            Year: item.Year,
            Status: item.Status,
            Notes: item.Notes
        };
    }
}
