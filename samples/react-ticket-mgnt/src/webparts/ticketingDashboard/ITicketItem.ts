export interface ITicketItem {
    Id: number;
    Title: string;
    Created?: string;
    Modified?: string;
    Author?: {
        Id: number;
        Title: string;
        Email?: string;
    };
    Editor?: {
        Id: number;
        Title: string;
        Email?: string;
    };

    Description?: string;
    Priority?: string;
    Status: string;
    AssignedTo?: {
        Id: number;
        Title: string;
        Email?: string;
        LoginName?: string;
    }[];
    DueDate?: Date;
    AssignedToId?: number;

    Category?: string;
    Environment?: string;
    StepsToReproduce?: string;
    ExpectedResult?: string;
    ActualResult?: string;
    AffectedVersion?: string;
    Resolution?: string;
    ResolutionDate?: string;

    Severity?: string;
    RootCause?: string;
    TimeSpent?: number;
    RegressionTestStatus?: string;
    Release?: string;

    AttachmentFiles?: {
        FileName: string;
        ServerRelativeUrl: string;
    }[];
}