/**
 * Represents the data structure returned by SharePoint's REST API
 * Field names match SharePoint column names (PascalCase)
 */
export interface ITicketItem {
    // SharePoint standard fields
    Id: number;                   // Maps to id in ITicketFormData
    Title: string;                // Maps to subject in ITicketFormData
    Created?: string;             // Maps to created in ITicketFormData (as string)
    Modified?: string;            // Maps to modified in ITicketFormData (as string)
    Author?: {                    // Maps to createdBy in ITicketFormData
        Id: number;
        Title: string;
        Email?: string;
    };
    Editor?: {                    // Maps to modifiedBy in ITicketFormData
        Id: number;
        Title: string;
        Email?: string;
    };

    // Essential ticket fields
    Description?: string;         // Maps directly to description in ITicketFormData
    Priority?: string;            // Maps to priority in ITicketFormData
    Status: string;               // Maps to status in ITicketFormData
    AssignedTo?: {                // Maps to assignedToId in ITicketFormData
        Id: number;
        Title: string;
        Email?: string;
        LoginName?: string;
    };
    DueDate?: Date;             // Maps to dueDate in ITicketFormData (as string)
    AssignedToId?: number;
    // Additional ticket fields
    Category?: string;            // Maps to category in ITicketFormData
    Environment?: string;         // Maps to environment in ITicketFormData
    StepsToReproduce?: string;    // Maps to stepsToReproduce in ITicketFormData
    ExpectedResult?: string;      // Maps to expectedResult in ITicketFormData
    ActualResult?: string;        // Maps to actualResult in ITicketFormData
    AffectedVersion?: string;     // Maps to affectedVersion in ITicketFormData
    Resolution?: string;          // Maps to resolution in ITicketFormData
    ResolutionDate?: string;      // Maps to resolutionDate in ITicketFormData (as string)

    // Advanced fields
    Severity?: string;            // Maps to severity in ITicketFormData
    RootCause?: string;           // Maps to rootCause in ITicketFormData
    TimeSpent?: number;           // Maps to timeSpent in ITicketFormData
    RegressionTestStatus?: string; // Maps to regressionTestStatus in ITicketFormData
    Release?: string;             // Maps to release in ITicketFormData

    // Attachments
    AttachmentFiles?: {           // No direct mapping in ITicketFormData
        FileName: string;
        ServerRelativeUrl: string;
    }[];
}
