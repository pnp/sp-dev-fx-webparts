import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactFlagTemplateProps {
  listName: string;
  spfxContext: WebPartContext; // or WebPartContext if you import it
}
