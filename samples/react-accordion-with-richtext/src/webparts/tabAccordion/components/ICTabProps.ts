import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICTabProps {  
  tabs: any[]; 
  displayMode: DisplayMode;
  guid: string;
  title:string;
  fUpdateProperty: (value: string) => void;
}
