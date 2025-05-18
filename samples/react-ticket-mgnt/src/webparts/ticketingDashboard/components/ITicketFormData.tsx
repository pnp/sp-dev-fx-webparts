import { TicketPriority, TicketStatus, TicketCategory, TicketEnvironment, TicketSeverity, TicketRootCause, RegressionTestStatus } from './TicketingDashboard';

/**
 * Represents the data structure for ticket forms in the UI
 * Field names align with ITicketItem but use camelCase and appropriate React component types
 */
export interface ITicketFormData {
    // Essential fields
    subject: string;              // Maps to Title in SharePoint and ITicketItem
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo?: string;        // Maps to AssignedTo[0].Id in ITicketItem (as string)
    dueDate?: Date;               // Maps to DueDate in ITicketItem (as Date object)

    // Additional fields
    category?: TicketCategory;
    environment?: TicketEnvironment;
    stepsToReproduce?: string;
    expectedResult?: string;
    actualResult?: string;
    affectedVersion?: string;
    resolution?: string;
    resolutionDate?: Date;        // Maps to ResolutionDate in ITicketItem (as Date object)

    // Advanced fields
    severity?: TicketSeverity;
    rootCause?: TicketRootCause;
    timeSpent?: number;
    regressionTestStatus?: RegressionTestStatus;
    release?: string;

    // For UI only - not in ITicketItem
    attachments?: File[];

    // Metadata - read only, populated from ITicketItem when viewing
    id?: number;                  // Maps to Id in ITicketItem
    
}
