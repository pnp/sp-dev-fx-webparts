import * as React from "react";
import { useGanttListPickerStyles } from "./useGanttListPickerStyles";
import { SPListService } from "../../services/SPListService";
import type {
  ISPField,
  IGanttFieldMappings,
  IFieldValidationResult,
} from "./IGanttFieldDefinitions";
import type { SPHttpClient } from "@microsoft/sp-http";
import { SitePicker } from "./SitePicker";
import { ListPicker } from "./ListPicker";
import { ValidationResult } from "./ValidationResult";
import { FieldMapper } from "./FieldMapper";
import { ColumnSelector } from "./ColumnSelector";

export interface ISelectGanttListProps {
  selectedListId: string;
  fieldMappings: IGanttFieldMappings;
  visibleColumns: string[];
  onListChange: (listId: string) => void;
  onFieldMappingsChange: (mappings: IGanttFieldMappings) => void;
  onVisibleColumnsChange: (columns: string[]) => void;
  onSiteChange: (siteUrl: string) => void;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  selectedSiteUrl: string;
}

export const SelectGanttList: React.FC<ISelectGanttListProps> = (props) => {
  const {
    selectedListId,
    fieldMappings,
    visibleColumns,
    onListChange,
    onFieldMappingsChange,
    onVisibleColumnsChange,
    onSiteChange,
    spHttpClient,
    siteUrl,
    selectedSiteUrl,
  } = props;

  const { styles } = useGanttListPickerStyles();

  const [listFields, setListFields] = React.useState<ISPField[]>([]);
  const [validation, setValidation] = React.useState<
    IFieldValidationResult | undefined
  >(undefined);
  const [isLoadingFields, setIsLoadingFields] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  // Service for site search — always uses the context site URL
  const searchServiceRef = React.useRef<SPListService | undefined>(undefined);
  React.useEffect(() => {
    searchServiceRef.current = new SPListService(spHttpClient, siteUrl);
  }, [spHttpClient, siteUrl]);

  // Service for list operations — uses the selected site URL
  const listServiceRef = React.useRef<SPListService | undefined>(undefined);
  const [listServiceReady, setListServiceReady] = React.useState(false);
  const activeSiteUrl = selectedSiteUrl || siteUrl;
  React.useEffect(() => {
    listServiceRef.current = new SPListService(spHttpClient, activeSiteUrl);
    setListServiceReady(true);
  }, [spHttpClient, activeSiteUrl]);

  // Load fields and auto-map when list selection changes
  React.useEffect(() => {
    if (!selectedListId || !listServiceRef.current) {
      setListFields([]);
      setValidation(undefined);
      return;
    }

    setIsLoadingFields(true);
    setError(undefined);
    listServiceRef.current
      .getAllListFields(selectedListId)
      .then((fields) => {
        setListFields(fields);
        const result = SPListService.validateFields(fields);
        setValidation(result);

        // If valid, auto-apply the detected mappings
        if (result.isValid) {
          const merged: IGanttFieldMappings = {
            text: result.autoMappings.text ?? fieldMappings.text ?? "",
            start: result.autoMappings.start ?? fieldMappings.start ?? "",
            duration:
              result.autoMappings.duration ?? fieldMappings.duration ?? "",
            progress: result.autoMappings.progress ?? fieldMappings.progress,
            type: result.autoMappings.type ?? fieldMappings.type,
            parent: result.autoMappings.parent ?? fieldMappings.parent,
            end: result.autoMappings.end ?? fieldMappings.end,
          };
          onFieldMappingsChange(merged);
        }
        setIsLoadingFields(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoadingFields(false);
      });
  }, [selectedListId, listServiceReady]); // eslint-disable-line react-hooks/exhaustive-deps

  const showFieldSteps = React.useMemo(
    () => !!selectedListId && listFields.length > 0 && !isLoadingFields,
    [selectedListId, listFields, isLoadingFields],
  );

  return (
    <div className={styles.container}>
      {searchServiceRef.current && (
        <SitePicker
          contextSiteUrl={siteUrl}
          selectedSiteUrl={activeSiteUrl}
          service={searchServiceRef.current}
          onSiteChange={onSiteChange}
        />
      )}

      {listServiceRef.current && (
        <ListPicker
          selectedListId={selectedListId}
          service={listServiceRef.current}
          error={error}
          onError={setError}
          onListChange={onListChange}
        />
      )}

      {!!selectedListId && (
        <ValidationResult validation={validation} isLoading={isLoadingFields} />
      )}

      {showFieldSteps && (
        <FieldMapper
          listFields={listFields}
          fieldMappings={fieldMappings}
          onFieldMappingsChange={onFieldMappingsChange}
        />
      )}

      {showFieldSteps && (
        <ColumnSelector
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={onVisibleColumnsChange}
        />
      )}
    </div>
  );
};
