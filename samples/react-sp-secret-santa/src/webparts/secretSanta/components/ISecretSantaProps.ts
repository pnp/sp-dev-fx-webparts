import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISecretSantaProps {
  context: WebPartContext;
  listName: string;
  webpartTitle: string;
  theme:string;
  isDarkTheme: boolean;
}
