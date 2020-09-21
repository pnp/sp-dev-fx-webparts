import ResultsLayoutOption from "../../models/ResultsLayoutOption";
import { DynamicProperty } from '@microsoft/sp-component-base';

export interface IPeopleSearchWebPartProps {
  selectParameter: string;
  filterParameter: string;
  orderByParameter: string;
  searchParameter: DynamicProperty<string>;
  pageSize: string;
  showPagination: boolean;
  showResultsCount: boolean;
  showBlank: boolean;
  selectedLayout: ResultsLayoutOption;
  webPartTitle: string;
  templateParameters: { [key:string]: any };
}