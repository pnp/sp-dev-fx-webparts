import { DisplayMode } from "@microsoft/sp-core-library";

export interface IReactAccordionProps {
  listId: string;
  accordionTitle: string;
  columnTitle: string;
  selectedChoice: string;
  accordianTitleColumn: string;
  accordianContentColumn: string;
  accordianSortColumn: string;
  isSortDescending: boolean;
  allowZeroExpanded: boolean;
  allowMultipleExpanded: boolean;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  onConfigure: () => void;
}
