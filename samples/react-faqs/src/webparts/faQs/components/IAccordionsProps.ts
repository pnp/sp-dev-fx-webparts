import { DisplayMode } from "@microsoft/sp-core-library";
import { IFaq } from "./IFaq";

export interface IAccordionsProps {  
  collectionData: IFaq[];
  displayMode: DisplayMode;
  title: string;
  accordion: boolean;
  guid : string; 
  
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}