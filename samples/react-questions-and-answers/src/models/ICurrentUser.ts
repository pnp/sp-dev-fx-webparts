export interface ICurrentUser {
    id: number;
    loginName: string;
    email: string;
    displayName: string;
    isSiteAdmin: boolean;
    canViewItems: boolean;
    canAddItems: boolean;
    canEditItems: boolean;
    canDeleteItems: boolean;
    canModerateItems: boolean;
    canManagePermissions: boolean;
}
