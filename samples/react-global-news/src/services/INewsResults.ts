import { IArticle } from "./IArticle";

export interface INewsResults {
  status: string;
  totalResults: number;
  articles: IArticle[];

}
