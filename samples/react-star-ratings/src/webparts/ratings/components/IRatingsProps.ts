import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRatingsWebPartProps } from '../RatingsWebPart';

export interface IRatingsProps {
  context: WebPartContext;
  properties: IRatingsWebPartProps;
}
