import { SPHttpClient } from '@microsoft/sp-http';
import { GameTheme } from '../game/constants/GameThemes';

export interface ISiteGameProps {
  description: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  spHttpClient: SPHttpClient;
  siteAbsoluteUrl: string;
  userDisplayName: string;
  showEmptyLists: boolean;
  maxBots: number;
  enableEasterEggs: boolean;
  enableM365EasterEggs: boolean;
  gameTheme: GameTheme;
  enableMusic: boolean;
  enableUfoAbductions: boolean;
}
