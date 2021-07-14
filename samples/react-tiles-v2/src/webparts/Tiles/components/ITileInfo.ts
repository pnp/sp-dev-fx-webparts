export interface ITileInfo {
  title: string;
  description: string;
  url: string;
  icon: string;
  target: LinkTarget;
}

export enum LinkTarget {
  parent = "",
  blank = "_blank"
}
