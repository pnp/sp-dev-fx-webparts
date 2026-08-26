import type { Theme } from "@fluentui/react-components";
import type { SPHttpClient } from "@microsoft/sp-http";
import type { IGanttFieldMappings } from "./IGanttFieldDefinitions";

export interface IGanttListPickerProps {
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
  targetProperty: string;
  theme?: Theme;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
