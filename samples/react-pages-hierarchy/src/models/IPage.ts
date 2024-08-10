export interface IPage {
  id: number;
  title: string;
  etag?: string;
  url: string;
  parentPageId?: number;
}
