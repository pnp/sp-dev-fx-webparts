import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRatingsWebPartProps } from '../RatingsWebPart';

export interface IRatingsProps {
  webPartContext: WebPartContext;
  webPartProps: IRatingsWebPartProps;
}
