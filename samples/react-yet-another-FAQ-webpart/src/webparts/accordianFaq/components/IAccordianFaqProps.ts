import { IFAQItem } from "./IFAQItem";

export interface IAccordianFaqProps {
  title?: string;
  faqItems: IFAQItem[];
  groupBy?: boolean;
  groupField?: string;
  darkMode?: boolean;
  enableMarkdown?: boolean;
  headerBgColor?: string;
  headerTextColor?: string;
  panelBgColor?: string;
  hideSearchBar?: boolean;
  hideExpandCollapseButtons?: boolean;
  expandButtonsPosition?: 'left' | 'right';
  headerPosition?: 'left' | 'center';
}

