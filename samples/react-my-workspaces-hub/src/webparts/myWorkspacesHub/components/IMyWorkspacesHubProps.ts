import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { Theme } from '@fluentui/react-components';
import { IMySitesSettings } from './IMySitesSettings';

export interface IMyWorkspacesHubProps {
  context: WebPartContext;
  sp: SPFI | undefined;
  graph: GraphFI | undefined;
  fluentTheme: Theme;
  hasTeamsContext: boolean;
  isDarkTheme: boolean;
  userDisplayName: string;
  title: string;
  settings: IMySitesSettings;
}

/** Backward compatibility alias */
export type IMySitesInfoProps = IMyWorkspacesHubProps;
