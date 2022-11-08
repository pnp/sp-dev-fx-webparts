import { DisplayMode } from "@microsoft/sp-core-library";
import { IFaq } from "./IFaq";

export interface IFaqsProps {
  collectionData: IFaq[];
  displayMode: DisplayMode;
  title: string;
  categoryData : any;
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
