import type { Theme } from "@fluentui/react-components";
import type { SPHttpClient } from "@microsoft/sp-http";
import type { IGanttFieldMappings } from "./IGanttFieldDefinitions";

export interface IPropertyPaneGanttListPickerProps {
  label: string;
  selectedListId: string;
  selectedSiteUrl: string;
  fieldMappings: IGanttFieldMappings;
  visibleColumns: string[];
  onPropertyChange: (
    propertyPath: string,
    newValue: string | IGanttFieldMappings | string[]
  ) => void;
  disabled?: boolean;
  key?: string;
  theme?: Theme;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
