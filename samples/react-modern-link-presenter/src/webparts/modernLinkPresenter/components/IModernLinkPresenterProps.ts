import { DisplayMode } from '@microsoft/sp-core-library';

export interface IModernLinkPresenterLinkItem {
  title: string;
  url: string;
  icon?: string;
  description?: string;
  summary?: string; // rich text
  target?: string;
  color?: string;
  displayFormat: 'button' | 'link';
}

export interface IModernLinkPresenterProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  links: IModernLinkPresenterLinkItem[];
  outputFormat: 'links' | 'linksWithIcon' | 'linkDescriptionIcon' | 'tile';
  displayMode: DisplayMode;
  onTitleUpdate: (value: string) => void;
  tileWidth?: number;
  tileHeight?: number;
  tileHoverEffect?: 'none' | 'lift' | 'shadow' | 'scale';
  direction?: 'vertical' | 'horizontal';
  tileButtonText?: string;
  showTileButton?: boolean;
  showSearchField?: boolean;
}
