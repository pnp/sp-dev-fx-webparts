export interface IGroup {
  id: string;
  displayName: string;
  url?: string;
}

export interface IGroupCollection {
  value: IGroup[];
}
