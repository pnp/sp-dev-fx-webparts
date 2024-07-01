import { ISPHierarchyItem } from "./IHierarchyItem";

export interface IHierarchyService {
  getHierarchyInfo: (listName?: string) => Promise<ISPHierarchyItem[]>;
}