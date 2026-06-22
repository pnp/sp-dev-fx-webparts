export interface ITabAccordionWebPartProps {
  tabs: any[];
  type: string;
  title: string;
  accordion: boolean;
  tabContent: string;

  // Display settings
  showBorders: boolean;
  allowMultipleExpand: boolean;
  useThemeColorForHeaders: boolean;

  // Header/Tab styling options
  headerBackgroundColor: string;
  headerTextColor: string;
  activeHeaderBackgroundColor: string;
  activeHeaderTextColor: string;

  // Header font customization
  headerFontSize: number;
  headerFontFamily: string;
  headerFontWeight: string;
  headerTextTransform: string;

  // Content font customization
  contentFontSize: number;
  contentFontFamily: string;

  // SharePoint List Integration
  useSharePointList: boolean;
  listUrl: string;
  titleColumn: string;
  contentColumn: string;
  orderByColumn: string;
  maxItems: number;

  // Deep Linking
  enableDeepLinking: boolean;

  // Audience Targeting
  enableAudienceTargeting: boolean;

  // Multi-language Support
  enableMultiLanguage: boolean;
  tabsMultiLanguage: {
    [language: string]: {
      title: string;
      tabs: {
        Title: string;
        Content: string;
        Id: string;
      }[];
    }
  };
}