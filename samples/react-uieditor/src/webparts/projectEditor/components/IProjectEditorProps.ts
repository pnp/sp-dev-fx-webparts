import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SPFI } from '@pnp/sp';

export interface IProjectEditorProps {
  description: string;
  context: WebPartContext;
  displayMode: DisplayMode;
  selectedListId: string;
  selectedListTitle: string;
  layoutMode: 'card' | 'accordion';
  updateProperty: (value: { selectedListId: string; selectedListTitle: string; layoutMode: string }) => void;
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  spContext?: SPFI;
}