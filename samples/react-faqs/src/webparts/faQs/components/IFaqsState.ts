import { IFaq } from "./IFaq";

export interface IFaqsState {
  categories: { [category: string]: IFaq[]; };
  searchCategories : { [category: string]: IFaq[]; };
  searchValue : string;
}
