import { SPFI } from "@pnp/sp";
import { ITicketFormData } from "../components/ITicketFormData";
import { RegressionTestStatus, TicketCategory, TicketEnvironment, TicketPriority, TicketRootCause, TicketSeverity, TicketStatus } from "../components/TicketingDashboard";
import { ITicketItem } from "../ITicketItem";

export class TicketService {
    private listTitle: string = "Tickets";

    public async getTickets(sp: SPFI): Promise<ITicketItem[]> {
        try {
            const items = await sp.web.lists.getByTitle(this.listTitle).items.select("*", "AssignedTo/Id", "AssignedTo/Title").expand("AssignedTo")();
            return items;
        } catch (error) {
            console.error("Error fetching all tickets:", error);
            throw error;
        }
    }

    public async getMyTickets(userId: number, sp: SPFI): Promise<ITicketItem[]> {
        try {
            const items = await sp.web.lists.getByTitle(this.listTitle).items
                .select("*", "AssignedTo/Id", "AssignedTo/Title")
                .expand("AssignedTo")
                .filter(`AssignedTo/Id eq ${userId}`)();

            return items;
        } catch (error) {
            console.error("Error fetching user tickets:", error);
            throw error;
        }
    }

    public async createTicket(data: ITicketFormData, sp: SPFI): Promise<void> {
        try {
            const spItem = this.prepareItemForSharePoint(data);
            this.logOperation('Create', spItem);
            await sp.web.lists.getByTitle(this.listTitle).items.add(spItem);
        } catch (error) {
            console.error("Error creating ticket:", error);
            throw error;
        }
    }

    public async updateTicket(id: number, updates: Partial<ITicketFormData>, sp: SPFI): Promise<void> {
        try {
            const spItem = this.prepareItemForSharePoint(updates);
            console.log(`Updating ticket ${id} with data:`, spItem);
            await sp.web.lists.getByTitle(this.listTitle).items.getById(id).update(spItem);
        } catch (error) {
            console.error(`Error updating ticket ${id}:`, error);
            throw error;
        }
    }

    public async getTicketById(id: number, sp: SPFI): Promise<ITicketItem> {
        try {
            const item = await sp.web.lists.getByTitle(this.listTitle).items.getById(id)
                .select("*", "AssignedTo/Id", "AssignedTo/Title", "Author/Id", "Author/Title", "Editor/Id", "Editor/Title")
                .expand("AssignedTo", "Author", "Editor")
                ();
            return item;
        } catch (error) {
            console.error("Error getting ticket by ID:", error);
            throw error;
        }
    }

    public convertItemToFormData(item: ITicketItem): ITicketFormData {
        return {
            subject: item.Title,
            description: item.Description || '',
            priority: item.Priority as TicketPriority,
            status: item.Status as TicketStatus,
            assignedTo: item.AssignedTo?.Id && item.AssignedTo.Id ? item.AssignedTo.Id : undefined,
            dueDate: item.DueDate ? new Date(item.DueDate) : undefined,
            category: item.Category as TicketCategory,
            environment: item.Environment as TicketEnvironment,
            stepsToReproduce: item.StepsToReproduce,
            expectedResult: item.ExpectedResult,
            actualResult: item.ActualResult,
            affectedVersion: item.AffectedVersion,
            resolution: item.Resolution,
            resolutionDate: item.ResolutionDate ? new Date(item.ResolutionDate) : undefined,
            severity: item.Severity as TicketSeverity,
            rootCause: item.RootCause as TicketRootCause,
            timeSpent: item.TimeSpent,
            regressionTestStatus: item.RegressionTestStatus as RegressionTestStatus,
            release: item.Release
        };
    }

    public convertFormDataToUpdateObject(formData: ITicketFormData): ITicketItem {
        const updateObj: ITicketItem = {
            Id: 0,
            Title: "",
            Status: "",
        };

        if (formData.subject !== undefined) updateObj.Title = formData.subject;
        if (formData.description !== undefined) updateObj.Description = formData.description;
        if (formData.priority !== undefined) updateObj.Priority = formData.priority;
        if (formData.status !== undefined) updateObj.Status = formData.status;
        if (formData.dueDate !== undefined) updateObj.DueDate = formData.dueDate;

        if (formData.assignedTo !== undefined) {
            updateObj.AssignedToId = formData.assignedTo ? parseInt(formData.assignedTo.toString()) : undefined;
        }

        if (formData.category !== undefined) updateObj.Category = formData.category;
        if (formData.environment !== undefined) updateObj.Environment = formData.environment;
        if (formData.stepsToReproduce !== undefined) updateObj.StepsToReproduce = formData.stepsToReproduce;
        if (formData.expectedResult !== undefined) updateObj.ExpectedResult = formData.expectedResult;
        if (formData.actualResult !== undefined) updateObj.ActualResult = formData.actualResult;
        if (formData.affectedVersion !== undefined) updateObj.AffectedVersion = formData.affectedVersion;
        if (formData.severity !== undefined) updateObj.Severity = formData.severity;
        if (formData.rootCause !== undefined) updateObj.RootCause = formData.rootCause;
        if (formData.timeSpent !== undefined) updateObj.TimeSpent = formData.timeSpent;
        if (formData.release !== undefined) updateObj.Release = formData.release;

        return updateObj;
    }

    private prepareItemForSharePoint(data: Partial<ITicketFormData>): ITicketItem {
        const spItem: ITicketItem = {
            Id: 0,
            Title: "",
            Status: "",
        };

        if (data.subject !== undefined) spItem.Title = data.subject;
        if (data.description !== undefined) spItem.Description = data.description;
        if (data.priority !== undefined) spItem.Priority = data.priority;
        if (data.status !== undefined) spItem.Status = data.status;

        if (data.assignedTo !== undefined) {
            if (data.assignedTo) {
                spItem.AssignedToId = parseInt(data.assignedTo.toString());
            } else {
                spItem.AssignedToId = undefined;
            }
        }

        if (data.dueDate !== undefined) {
            spItem.DueDate = data.dueDate ? data.dueDate : undefined;
        }

        if (data.resolutionDate !== undefined) {
            spItem.ResolutionDate = data.resolutionDate ? (data.resolutionDate instanceof Date ? data.resolutionDate.toISOString() : data.resolutionDate) : undefined;
        }

        if (data.category !== undefined) spItem.Category = data.category;
        if (data.environment !== undefined) spItem.Environment = data.environment;
        if (data.stepsToReproduce !== undefined) spItem.StepsToReproduce = data.stepsToReproduce;
        if (data.expectedResult !== undefined) spItem.ExpectedResult = data.expectedResult;
        if (data.actualResult !== undefined) spItem.ActualResult = data.actualResult;
        if (data.affectedVersion !== undefined) spItem.AffectedVersion = data.affectedVersion;
        if (data.resolution !== undefined) spItem.Resolution = data.resolution;
        if (data.severity !== undefined) spItem.Severity = data.severity;
        if (data.rootCause !== undefined) spItem.RootCause = data.rootCause;
        if (data.timeSpent !== undefined) spItem.TimeSpent = data.timeSpent;
        if (data.regressionTestStatus !== undefined) spItem.RegressionTestStatus = data.regressionTestStatus;
        if (data.release !== undefined) spItem.Release = data.release;

        return spItem;
    }

    private logOperation(operation: string, data: ITicketItem): void {
        console.group(`SharePoint ${operation} Operation`);
        console.log('Data:', JSON.stringify(data, null, 2));
        console.groupEnd();
    }

    public async deleteTicket(id: number, sp: SPFI): Promise<void> {
        try {
            console.log(`Deleting ticket ${id}`);
            await sp.web.lists.getByTitle(this.listTitle).items.getById(id).delete();
        } catch (error) {
            console.error(`Error deleting ticket ${id}:`, error);
            throw error;
        }
    }
}