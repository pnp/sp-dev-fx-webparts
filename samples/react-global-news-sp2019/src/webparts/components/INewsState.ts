import { IArticle } from "../../services/IArticle";

export interface INewsState{
  hasError:boolean;
  articles: IArticle[];
  errorMesage:string;
  isLoading: boolean;
  currentPage:number;
  totalPages:number;
}
