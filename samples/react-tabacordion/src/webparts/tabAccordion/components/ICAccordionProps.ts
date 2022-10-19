import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICAccordionProps {  
  tabs: any[]; 
  displayMode: DisplayMode;
  guid: string;
  title: string;
  accordion:boolean;
}