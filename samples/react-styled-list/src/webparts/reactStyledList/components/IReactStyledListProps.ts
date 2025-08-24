import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IReactStyledListProps {
  theme: string;
  alignment: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spfxContext: WebPartContext;
}
