export interface IAdaptiveCardActionResult {
  type: string;
  title: string;
  data?: Object;
  url: string;
  method?: string;
  body?: string;
  headers?: Array<any>;
}
