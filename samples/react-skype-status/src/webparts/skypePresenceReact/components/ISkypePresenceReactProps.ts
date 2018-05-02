import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ISkypePresenceReactProps {
  description: string;
  webPartContext: () => IWebPartContext;
}
