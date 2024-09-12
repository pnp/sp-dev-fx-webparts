export interface IChecklistItem {
    Id: number;
    Title: string;
    Description: string;
    Status: string;
    Progress: number;
    DueDate: string; // Optional, depending on if you need this field in your component
    AssignedTo: {Title: string };
    CompletionDate: Date | null; // Optional, depending on if you need this field in your component
  }
  