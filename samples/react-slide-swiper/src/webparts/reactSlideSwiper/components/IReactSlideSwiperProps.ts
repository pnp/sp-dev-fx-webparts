import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration  } from '@microsoft/sp-http';

import { IListService } from "../services/IListService";
import { IReactSlideSwiperWebPartProps } from "../ReactSlideSwiperWebPart";

export interface IReactSlideSwiperProps {
  listService: IListService;
  swiperOptions: IReactSlideSwiperWebPartProps;
  listName: string;
}
