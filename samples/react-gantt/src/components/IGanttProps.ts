 
import type { SPHttpClient } from '@microsoft/sp-http';
import type { IGanttFieldMappings } from '../PropertyFields/GanttListPickerPropertyField';
import type { GanttScaleKey } from '../constants/constants';
import type { EAppHostName } from '../constants/EAppHostName';
import { Theme } from '@fluentui/react-components';

export interface IGanttProps {
  isDarkTheme: boolean;
  appHostName: EAppHostName;
  theme?: Theme;
  themeString?: string;
  listId?: string;
  fieldMappings?: IGanttFieldMappings;
  visibleColumns?: string[];
  scale?: GanttScaleKey;
  spHttpClient?: SPHttpClient;
  siteUrl?: string;
  onConfigure?: () => void;
  title?: string;
  height?: number;
}
