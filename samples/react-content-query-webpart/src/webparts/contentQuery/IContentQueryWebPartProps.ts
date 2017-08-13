import { IQueryFilter } from "../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/IQueryFilter";

export interface IContentQueryWebPartProps {
  webUrl: string;
  listTitle: string;
  limitEnabled: boolean;
  itemLimit: number;
  orderBy: string;
  orderByDirection: string;
  filters: IQueryFilter[];
  viewFields: string[];
  templateText: string;
  templateUrl: string;
  hasDefaultTemplateBeenUpdated: boolean;
  externalScripts: string;
}
