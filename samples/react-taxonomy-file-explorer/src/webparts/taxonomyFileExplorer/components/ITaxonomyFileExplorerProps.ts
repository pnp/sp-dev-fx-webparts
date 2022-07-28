import { ServiceScope } from "@microsoft/sp-core-library";

export interface ITaxonomyFileExplorerProps {
  serviceScope: ServiceScope;
  fieldName: string;
  listName: string;
}
