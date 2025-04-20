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
  showBorders?: boolean;
  useThemeColor?: boolean;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  activeHeaderBackgroundColor?: string;
  activeHeaderTextColor?: string;

  headerFontSize?: number;
  headerFontFamily?: string;
  headerFontWeight?: string;
  headerTextTransform?: string;
  contentFontSize?: number;
  contentFontFamily?: string;
  graphService?: GraphService;
  enableDeepLinking?: boolean;
  enableAudienceTargeting?: boolean;
  enableMultiLanguage?: boolean;
}