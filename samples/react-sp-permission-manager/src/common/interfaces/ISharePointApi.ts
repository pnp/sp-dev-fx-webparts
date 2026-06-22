export interface IApiCollection<T> {
  value: T[];
}

export interface IRestPermissionLevel {
  Id: number;
  Name: string;
  Description?: string;
  RoleTypeKind: number;
  Order: number;
  BasePermissions?: {
    Low: string;
    High: string;
  };
}
