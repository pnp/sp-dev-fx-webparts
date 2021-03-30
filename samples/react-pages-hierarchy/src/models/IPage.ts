export interface IPage {
  id: number;
  title: string;
  etag?: string | null;
  url: string;
  parentPageId?: number;
}
