export interface IListItem {
    id: string;
    title: string;
    icon?: string;
    clientId?: string;
    display?: string;
    error?: string;
    api?: string;
    selected: boolean;
    help?: string;
    details?: string;
}