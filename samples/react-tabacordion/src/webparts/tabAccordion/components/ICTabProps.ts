import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { GraphService } from "../services/GraphService";

export interface ICTabProps {  
  tabs: any[]; 
  displayMode: DisplayMode;
  guid: string;
  title: string;
  context: WebPartContext;
  themeVariant?: IReadonlyTheme;
  
  // Styling options
  showBorders?: boolean;
  useThemeColor?: boolean;
  
  // Custom color options
  headerBackgroundColor?: string;
  headerTextColor?: string;
  activeHeaderBackgroundColor?: string;
  activeHeaderTextColor?: string;
  
  // Services
  graphService?: GraphService;
  
  // Feature flags
  enableDeepLinking?: boolean;
  enableAudienceTargeting?: boolean;
  enableMultiLanguage?: boolean;
}