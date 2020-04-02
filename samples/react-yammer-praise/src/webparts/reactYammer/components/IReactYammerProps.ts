import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IYammerProvider } from './../yammer/IYammerProvider';

export interface IReactYammerProps {
  context: WebPartContext;
  yammerProvider:IYammerProvider;
}
