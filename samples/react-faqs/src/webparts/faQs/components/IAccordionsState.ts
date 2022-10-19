import { IFaq } from "./IFaq";

export interface IAccordionsState {
  categories: { [categories: string]: IFaq[]; };
  searchCategories : { [category: string]: IFaq[]; };
  searchValue : string;
}
