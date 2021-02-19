import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from '@microsoft/sp-core-library';
import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";

export interface IReactDatatableProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  title: string;
  list: string;
  oddRowColor: string;
  evenRowColor: string;
  fields: Array<IPropertyPaneDropdownOption & { fieldType: string }>;
  fieldDetails: any[];
  onChangeProperty: any;
  enableSorting: boolean;
  enableSearching: boolean;
  enablePagination: boolean;
  enableDownloadAsCsv: boolean;
  enableDownloadAsPdf: boolean;
  searchBy: string[];
  sortBy: string[];
  fieldOrder: Array<any>;
}
