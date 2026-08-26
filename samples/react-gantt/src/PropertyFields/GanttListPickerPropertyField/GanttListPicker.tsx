import {
  FluentProvider,
  IdPrefixProvider,
  Label,
  webLightTheme,
} from "@fluentui/react-components";
import * as React from "react";
import type { IGanttListPickerProps } from "./IGanttListPickerProps";
import type { IGanttFieldMappings } from "./IGanttFieldDefinitions";
import { SelectGanttList } from "./SelectGanttList";

const DEFAULT_FIELD_MAPPINGS: IGanttFieldMappings = {
  text: "",
  start: "",
  duration: "",
};

const DEFAULT_COLUMNS = ["text", "start", "duration"];

export const GanttListPicker: React.FC<IGanttListPickerProps> = (props) => {
  const [selectedListId, setSelectedListId] = React.useState(
    props.selectedListId || ""
  );
  const [selectedSiteUrl, setSelectedSiteUrl] = React.useState(
    props.selectedSiteUrl || props.siteUrl
  );
  const [fieldMappings, setFieldMappings] = React.useState<IGanttFieldMappings>(
    props.fieldMappings || { ...DEFAULT_FIELD_MAPPINGS }
  );
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(
    props.visibleColumns || [...DEFAULT_COLUMNS]
  );

  const onSiteChange = React.useCallback(
    (siteUrl: string): void => {
      setSelectedSiteUrl(siteUrl);
      props.onPropertyChange("selectedSiteUrl", siteUrl);
      // Reset list and field mappings when site changes
      setSelectedListId("");
      props.onPropertyChange("listId", "");
      setFieldMappings({ ...DEFAULT_FIELD_MAPPINGS });
      props.onPropertyChange("fieldMappings", { ...DEFAULT_FIELD_MAPPINGS });
      setVisibleColumns([...DEFAULT_COLUMNS]);
      props.onPropertyChange("visibleColumns", [...DEFAULT_COLUMNS]);
    },
    [props.onPropertyChange]
  );

  const onListChange = React.useCallback(
    (listId: string): void => {
      setSelectedListId(listId);
      props.onPropertyChange("listId", listId);
      
    },
    [props.onPropertyChange]
  );

  const onFieldMappingsChange = React.useCallback(
    (mappings: IGanttFieldMappings): void => {
      setFieldMappings(mappings);
      props.onPropertyChange("fieldMappings", mappings);
    },
    [props.onPropertyChange]
  );

  const onVisibleColumnsChange = React.useCallback(
    (columns: string[]): void => {
      setVisibleColumns(columns);
      props.onPropertyChange("visibleColumns", columns);
    },
    [props.onPropertyChange]
  );

  return (
    <IdPrefixProvider value="gantt-list-picker-">
      <FluentProvider
        theme={props.theme || webLightTheme}
        applyStylesToPortals={true}
      >
        <Label>{props.label}</Label>
        <SelectGanttList
          selectedListId={selectedListId}
          selectedSiteUrl={selectedSiteUrl}
          fieldMappings={fieldMappings}
          visibleColumns={visibleColumns}
          onSiteChange={onSiteChange}
          onListChange={onListChange}
          onFieldMappingsChange={onFieldMappingsChange}
          onVisibleColumnsChange={onVisibleColumnsChange}
          spHttpClient={props.spHttpClient}
          siteUrl={props.siteUrl}
        />
      </FluentProvider>
    </IdPrefixProvider>
  );
};
