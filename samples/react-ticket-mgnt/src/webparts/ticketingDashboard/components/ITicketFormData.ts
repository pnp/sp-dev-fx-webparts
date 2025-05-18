import {
    TicketPriority,
    TicketStatus,
    TicketCategory,
    TicketEnvironment,
    TicketSeverity,
    TicketRootCause,
    RegressionTestStatus
} from './TicketingDashboard';

export interface ITicketFormData {
    // Essential fields
    subject: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo?: string;  // This will be the user ID
    dueDate?: Date;

    // Additional fields
    category?: TicketCategory;
    environment?: TicketEnvironment;
    stepsToReproduce?: string;
    expectedResult?: string;
    actualResult?: string;
    affectedVersion?: string;

    // Advanced fields
    severity?: TicketSeverity;
    rootCause?: TicketRootCause;
    timeSpent?: number;
    release?: string;
    resolution?: string;                 
    resolutionDate?: Date;               
    regressionTestStatus?: RegressionTestStatus;
    // Only used for uploading attachments
    attachments?: File[];
}