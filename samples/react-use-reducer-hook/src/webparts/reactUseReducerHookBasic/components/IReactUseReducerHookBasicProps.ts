import { ISPFXContext } from "@pnp/sp";

export interface IReactUseReducerHookBasicProps {
  description: string;
  isDarkTheme: boolean;
  isConfigured: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: ISPFXContext;
  listName: string;
  siteUrl: string;
  onConfigure: () => void; 
}
