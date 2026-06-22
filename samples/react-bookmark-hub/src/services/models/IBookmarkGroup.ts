export interface IBookmarkGroup {
    id: string;
    index: number;
    name: string;
    description?: string;
    archived: boolean;
    collapsed: boolean;
    /** True when this group was created by Copilot and has not yet been approved. */
    suggestion?: boolean;
}