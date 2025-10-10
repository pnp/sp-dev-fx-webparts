import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  Badge,
  CardHeader,
  CounterBadge,
  TableColumnSizingOptions,
  Tooltip,
} from "@fluentui/react-components";
//import { DataBarHorizontal20Regular } from "@fluentui/react-icons";
import {
  DataGridV2 as DataGrid,
  DataGridHandle,
  IColumnConfig,
  ShowError,
  StackV2 as Stack,
} from "@spteck/react-controls";
import { useCallback, useEffect, useState } from "react";

import { ISchemaExtension } from "../../models/ISchemaExtension";
import { RenderExtensionId } from "./RenderExtensionId";
import { SchemaExtensionActionsMenu } from "./SchemaExtensionActionsMenu";
import { SchemaExtensionsDataGridSkeleton } from "./SchemaExtensionsDataGridSkeleton";
import { SchemaExtensionsEmptyState } from "./SchemaExtensionsEmptyState";
import { TargetTypesBadges } from "../TargetTypesBadges";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useLogging } from "@spteck/m365-hooks";
import { useSchemaExtension } from "../../hooks/useSchemaExtension";
import { useSchemaExtensionListViewStyles } from "./useSchemaExtensionListViewStyles";

export interface ISchemaExtensionsListViewProps {
  onSchemaExtensionSelect?: (
    schemaExtension: ISchemaExtension | undefined
  ) => void;
  onEdit?: (schemaExtension: ISchemaExtension) => void;
  onDelete?: (schemaExtension: ISchemaExtension) => void;
  onView?: (schemaExtension: ISchemaExtension) => void;
  onChangeStatus?: (schemaExtension: ISchemaExtension) => void;
  onCreateNew?: () => void;
  refreshTrigger?: number; // Used to trigger refresh from parent
}

export const SchemaExtensionsListView: React.FunctionComponent<
  ISchemaExtensionsListViewProps
> = ({
  onSchemaExtensionSelect,
  onEdit,
  onDelete,
  onView,
  onChangeStatus,
  onCreateNew,
  refreshTrigger,
}) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const { context,   } = appGlobalState;
  const { getSchemaExtensions } =
    useSchemaExtension({ context: context! }) || {};
  const { logError, logInfo } = useLogging();

  // State
  const [schemaExtensions, setSchemaExtensions] = useState<ISchemaExtension[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { styles } = useSchemaExtensionListViewStyles();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataGridRef = React.useRef<DataGridHandle<unknown>>(null);
  const containerGridRef = React.useRef<HTMLDivElement>(null);
 

  const columnSizingOptions: TableColumnSizingOptions = {
    id: { minWidth: 260, defaultWidth: 260, idealWidth: 280 },
    description: { minWidth: 200, defaultWidth: 180, idealWidth: 200 },
    status: { minWidth: 120, defaultWidth: 120, idealWidth: 200 },
    targetTypes: { minWidth: 100, defaultWidth: 150, idealWidth: 220 },
    properties: { minWidth: 100, defaultWidth: 100, idealWidth: 100 },
    owner: { minWidth: 150, defaultWidth: 150, idealWidth: 200 },
  };

    

  // Handle row selection
  const handleRowClick = useCallback(
    (schemaExtension: ISchemaExtension) => {
      if (onSchemaExtensionSelect) {
        onSchemaExtensionSelect(schemaExtension);
      }
    },
    [onSchemaExtensionSelect]
  );

  // Define columns for the data grid
  const columns: IColumnConfig<ISchemaExtension>[] = React.useMemo(
    () => [
      {
        column: "id",
        header: strings.ExtensionIdColumnHeader,
        onRender: (schemaExtension: ISchemaExtension) => (
          <CardHeader
            header={<RenderExtensionId schemaExtension={schemaExtension} />}
            action={
              <SchemaExtensionActionsMenu
                key={`menu-${schemaExtension.id}`}
                schemaExtension={schemaExtension}
                onChangeStatus={onChangeStatus}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            }
          />
        ),
        order: (a: ISchemaExtension, b: ISchemaExtension) =>
          (a.id || "").localeCompare(b.id || ""),
      },
      {
        column: "description",
        header: strings.DescriptionColumnHeader,
        onRender: (schemaExtension: ISchemaExtension) => (
          <Tooltip content={schemaExtension.description} relationship="label">
            <span>{schemaExtension.description}</span>
          </Tooltip>
        ),
        order: (a: ISchemaExtension, b: ISchemaExtension) =>
          a.description.localeCompare(b.description),
      },
      {
        column: "targetTypes",
        header: strings.TargetTypesColumnHeader,
        onRender: (schemaExtension: ISchemaExtension) => (
          <div
            className={styles.targetTypesContainer}
          >
            <TargetTypesBadges targetTypes={schemaExtension.targetTypes} />
          </div>
        ),
        order: (a: ISchemaExtension, b: ISchemaExtension) =>
          (a.targetTypes?.[0] || "").localeCompare(b.targetTypes?.[0] || ""),
      },
      {
        column: "properties",
        header: "Properties",
        onRender: (schemaExtension: ISchemaExtension) => (
          <CounterBadge
            appearance="filled"
            color="brand"
            count={schemaExtension.properties?.length || 0}
          />
        ),
        order: (a: ISchemaExtension, b: ISchemaExtension) =>
          (a.properties?.length || 0) - (b.properties?.length || 0),
      },
      {
        column: "status",
        header: "Status",
        onRender: (schemaExtension: ISchemaExtension) => {
          const status = schemaExtension.status || "InDevelopment";
          return (
            <Badge
              size="medium"
              appearance={status === "Available" ? "filled" : "filled"}
              color={status === "Available" ? "success" : "warning"}
            >
              {status === "Available" ? (
                <span className={styles.textStyle}>Available</span>
              ) : (
                <span className={styles.textStyle}>In Development</span>
              )}
            </Badge>
          );
        },
        order: (a: ISchemaExtension, b: ISchemaExtension) =>
          (a.status || "InDevelopment").localeCompare(
            b.status || "InDevelopment"
          ),
      },
     
    ],
    []
  );

  // Load schema extensions
  const loadSchemaExtensions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      logInfo(
        "Loading schema extensions using tenant properties approach...",
        "loadSchemaExtensions"
      );
      const extensions = await getSchemaExtensions(); // No owner parameter needed now
      setSchemaExtensions(extensions || []);
      logInfo("Loaded schema extensions:", JSON.stringify(extensions));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load schema extensions";
      setError(errorMessage);
      logError("Error loading schema extensions:", JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, schemaExtensions.length]);

  // Initial load - runs when context is available
  useEffect(() => {
    if (context && !schemaExtensions.length) {
      loadSchemaExtensions().catch((err) =>
        logError(
          "GetSchemaIds",
          "Failed to load schema extensions on mount:",
          JSON.stringify(err)
        )
      );
      
    }
  }, [context ]);

  // Handle refresh trigger
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      console.log("Refresh trigger activated:", refreshTrigger);
      setSchemaExtensions([]); // Clear current data
      loadSchemaExtensions().catch((err) =>
        logError("Failed to refresh schema extensions:", JSON.stringify(err))
      );
      dataGridRef.current?.resetGrid(); // Reset grid state (sorting, filtering, etc.
    }
  }, [refreshTrigger]);

  // Render error state
  if (error) {
    return (
      <Stack>
        <ShowError message={error} />
      </Stack>
    );
  }

  return (
    <div ref={containerGridRef}>
      <DataGrid
        ref={dataGridRef}
        columnSizingOptions={columnSizingOptions}
        items={schemaExtensions}
        columns={columns as IColumnConfig<unknown>[]}
        isLoadingData={isLoading}
        noItemsMessage={
          <SchemaExtensionsEmptyState onCreateNew={onCreateNew} />
        }
        isLoadingDataMessage={
          <SchemaExtensionsDataGridSkeleton rowCount={10} />
        }
        onSelectionChange={(selectedItems: ISchemaExtension[]) => {
          if (selectedItems.length > 0) {
            handleRowClick(selectedItems[0]);
          } else {
            // Handle deselection - call with undefined to clear selection
            if (onSchemaExtensionSelect) {
              onSchemaExtensionSelect(undefined);
            }
          }
        }}
        enableSorting={true}
        enableResizing={true}
        selectionMode="single"
        virtualizedItemSize={50}
        virtualizedHeight={ schemaExtensions.length ? schemaExtensions.length * 50 : 300 }
      />
    </div>
  );
};

export default SchemaExtensionsListView;
