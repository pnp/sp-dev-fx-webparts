export interface IFolderResult {
    readonly Exists: boolean;
    readonly ItemCount: number;
    readonly Name: string;
    readonly ServerRelativeUrl: string;
    readonly TimeCreated: string;
    readonly TimeLastModified: string;
    readonly UniqueId: string;
    readonly WelcomePage: string;
}