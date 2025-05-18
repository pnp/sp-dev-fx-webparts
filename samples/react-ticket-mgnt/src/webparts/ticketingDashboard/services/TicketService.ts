import { ITicketFormData } from "../components/ITicketFormData";
import { TicketCategory, TicketEnvironment, TicketPriority, TicketRootCause, TicketSeverity, TicketStatus } from "../components/TicketingDashboard";
import { ITicketItem } from "../ITicketItem";

export class TicketService {

    private listTitle: string = "Tickets"; // Make sure this matches your SharePoint list

    public async getTickets(sp: any): Promise<ITicketItem[]> {
        try {
            const items = await sp.web.lists.getByTitle(this.listTitle).items.select("*", "AssignedTo/Id", "AssignedTo/Title").expand("AssignedTo")();
            return items;
        } catch (error) {
            console.error("Error fetching all tickets:", error);
            throw error;
        }
    }

    public async getMyTickets(userId: number, sp: any): Promise<ITicketItem[]> {
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

    public async createTicket(data: ITicketFormData, sp: any): Promise<void> {
        try {
            await sp.web.lists.getByTitle(this.listTitle).items.add(data);
        } catch (error) {
            console.error("Error creating ticket:", error);
            throw error;
        }
    }

    public async updateTicket(id: number, updates: ITicketFormData, sp: any): Promise<void> {
        try {
            await sp.web.lists.getByTitle(this.listTitle).items.getById(id).update(updates);
        } catch (error) {
            console.error("Error updating ticket:", error);
            throw error;
        }
    }

    public async getTicketById(id: number, sp: any): Promise<ITicketItem> {
        try {
            const item = await sp.web.lists.getByTitle(this.listTitle).items.getById(id)
                .select("*", "AssignedTo/Id", "AssignedTo/Title")
                .expand("AssignedTo")
                ();
            return item;
        } catch (error) {
            console.error("Error getting ticket by ID:", error);
            throw error;
        }
    }

    /**
     * Converts a SharePoint ITicketItem to ITicketFormData for form display
     */
    public convertItemToFormData(item: ITicketItem): ITicketFormData {
        return {
            subject: item.Title,
            description: item.Description || '',
            priority: item.Priority as TicketPriority,
            status: item.Status as TicketStatus,
            assignedTo: item.AssignedTo?.Id.toString(),
            dueDate: item.DueDate ? new Date(item.DueDate) : undefined,
            category: item.Category as TicketCategory,
            environment: item.Environment as TicketEnvironment,
            stepsToReproduce: item.StepsToReproduce,
            expectedResult: item.ExpectedResult,
            actualResult: item.ActualResult,
            affectedVersion: item.AffectedVersion,
            severity: item.Severity as TicketSeverity,
            rootCause: item.RootCause as TicketRootCause,
            timeSpent: item.TimeSpent,
            release: item.Release,
            
        };
    }

    /**
     * Converts ITicketFormData to a format suitable for SharePoint update/create
     */
    public convertFormDataToUpdateObject(formData: ITicketFormData): ITicketItem {
        const updateObj: ITicketItem={} as ITicketItem;

        // Only include properties that are defined
        if (formData.subject !== undefined) updateObj.Title = formData.subject;
        if (formData.description !== undefined) updateObj.Description = formData.description;
        if (formData.priority !== undefined) updateObj.Priority = formData.priority;
        if (formData.status !== undefined) updateObj.Status = formData.status;
       
        if (formData.dueDate !== undefined) updateObj.DueDate = formData.dueDate;

        // Additional fields
        if (formData.category !== undefined) updateObj.Category = formData.category;
        if (formData.environment !== undefined) updateObj.Environment = formData.environment;
        if (formData.stepsToReproduce !== undefined) updateObj.StepsToReproduce = formData.stepsToReproduce;
        if (formData.expectedResult !== undefined) updateObj.ExpectedResult = formData.expectedResult;
        if (formData.actualResult !== undefined) updateObj.ActualResult = formData.actualResult;
        if (formData.affectedVersion !== undefined) updateObj.AffectedVersion = formData.affectedVersion;
       
        // Advanced fields
        if (formData.severity !== undefined) updateObj.Severity = formData.severity;
        if (formData.rootCause !== undefined) updateObj.RootCause = formData.rootCause;
        if (formData.timeSpent !== undefined) updateObj.TimeSpent = formData.timeSpent;
        if (formData.release !== undefined) updateObj.Release = formData.release;

        return updateObj;
    }
}
