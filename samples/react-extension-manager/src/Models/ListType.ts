// https://learn.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-wssts/8bf797af-288c-4a1d-a14b-cf5394e636cf

export enum ListType {
    None = 0,
    CustomList = 100,
    DocumentLibrary = 101,
    Survey = 102,
    Links = 103,
    Announcements = 104,
    Contacts = 105,
    Calendar = 106,
    Tasks = 107,
    DiscussionBoard = 108,
    PictureLibrary = 109,
    DataSources = 110,
    FormLibrary = 115,
    NoCodeWorkflows = 117,
    CustomWorkflowProcess = 118,
    WikiPageLibrary = 119,
    CustomGrid = 120,
    NoCodePublicWorkflows = 122,
    WorkflowHistory = 140,
    ProjectTasks = 150,
    PublicWorkflowsExternalList = 600,
    IssueTracking = 1100,


    //Undocumented, but needed for this solution
    TenantWideExtensions = 337
}

export const ListTypeStrings = {
    [ListType.None]: "N/A",
    [ListType.CustomList]: "Custom List",
    [ListType.DocumentLibrary]: "Document Library",
    [ListType.Survey]: "Survey",
    [ListType.Links]: "Links",
    [ListType.Announcements]: "Announcements",
    [ListType.Contacts]: "Contacts",
    [ListType.Calendar]: "Calendar",
    [ListType.Tasks]: "Tasks",
    [ListType.DiscussionBoard]: "Discussion Board",
    [ListType.PictureLibrary]: "Picture Library",
    [ListType.DataSources]: "Data Sources",
    [ListType.FormLibrary]: "Form Library",
    [ListType.NoCodeWorkflows]: "No Code Workflows",
    [ListType.CustomWorkflowProcess]: "Custom Workflow Process",
    [ListType.WikiPageLibrary]: "Wiki Page Library",
    [ListType.CustomGrid]: "Custom Grid",
    [ListType.NoCodePublicWorkflows]: "No Code Public Workflows",
    [ListType.WorkflowHistory]: "Workflow History",
    [ListType.ProjectTasks]: "Project Tasks",
    [ListType.PublicWorkflowsExternalList]: "Public Workflows External List",
    [ListType.IssueTracking]: "Issue Tracking",
    [ListType.TenantWideExtensions]: "Tenant Wide Extensions",
}

export const ListTypes: ListType[] = Object.keys(ListTypeStrings).map(x => parseInt(x)) as ListType[];

export const OFFICIALLY_SUPPORTED_LIST_TYPES = [ListType.CustomList, ListType.DocumentLibrary];