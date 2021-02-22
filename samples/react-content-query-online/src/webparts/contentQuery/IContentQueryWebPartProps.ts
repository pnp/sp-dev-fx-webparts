import { IQueryFilter }         from "../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/IQueryFilter";

export interface IContentQueryWebPartProps {
  siteUrl: string;
  webUrl: string;
  listId: string;
  limitEnabled: boolean;
  itemLimit: number;
  recursiveEnabled: boolean;
  orderBy: string;
  orderByDirection: string;
  filters: IQueryFilter[];
  viewFields: string[];
  templateText: string;
  templateUrl: string;
  hasDefaultTemplateBeenUpdated: boolean;
  externalScripts: string;
  itemSelectorEnabled: boolean;
  idFieldForciblyAdded: boolean;
  enableMGT: boolean;
}
