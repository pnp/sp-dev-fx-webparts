export interface ITileInfo {
  title: string;
  description: string;
  url: string;
  icon: string;
  target: LinkTarget;
  sortOrder: string;
  foreground: string;
  background: string;
}

export enum LinkTarget {
  parent = "",
  blank = "_blank"
}
