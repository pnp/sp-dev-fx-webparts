import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAskQuestionProps {
  context: WebPartContext;
  showPopup: boolean;
  onDissmissPanel: (refresh: boolean) => void;
  listName: string;
}
