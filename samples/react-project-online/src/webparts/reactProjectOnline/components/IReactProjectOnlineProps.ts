import { IReactProjectOnlineWebPartProps } from "./../IReactProjectOnlineWebPartProps";
import { ISPDataService, IPODataService } from "./../../../shared/services";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IReactProjectOnlineProps {
  baseProperties: IReactProjectOnlineWebPartProps;
  spDataService: ISPDataService;
  poDataService: IPODataService;
  webPartContext: IWebPartContext;
}
