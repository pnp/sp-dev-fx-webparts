import IAccordionListItem from '../models/IAccordionListItem';

export interface IReactAccordionState {
  status: string;
  pagedItems: IAccordionListItem[];
  items: IAccordionListItem[];
  listItems: IAccordionListItem[];
  isLoading: boolean;
  loaderMessage: string;
}
