import * as React from "react";

import { Divider, Subtitle1 } from "@fluentui/react-components";

import { ChangeSchemaStatus } from "../ChangeSchemaStatus";
import { DeleteSchemaExtension } from "../DeleteSchemaExtension";
import { IManageSchemaExtensionsProps } from "./IManageSchemaExtensionsProps";
import { ISchemaExtension } from "../../models/ISchemaExtension";
import { InformationPanel } from "./InformationPanel";
import SchemaExtensionDrawer from "../SchemaExtensionDrawer/SchemaExtensionDrawer";
import { SchemaExtensionViewer } from "../SchemaExtensionViewer";
import SchemaExtensionsListView from "../SchemaExtensionsListView/SchemaExtensionsListView";
import SchemaExtensionsToolbar from "../SchemaExtensionsToolbar/SchemaExtensionsToolbar";
import { SchemaStatusRestrictionDialog } from "../SchemaExtensionDrawer";
import { StackV2 as Stack } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useLogging } from "@spteck/m365-hooks";

export const ManageSchemaExtensionsControl: React.FunctionComponent<
  IManageSchemaExtensionsProps
> = (props) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const [selectedSchemaExtension, setSelectedSchemaExtension] = React.useState<
    ISchemaExtension | undefined
  >(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState<"create" | "edit">(
    "create"
  );
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] =
    React.useState(false);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const { logInfo } = useLogging();
  const { title } = appGlobalState;

  const canBeEdited = React.useMemo(
    () =>
      selectedSchemaExtension?.status === "InDevelopment" ||
      selectedSchemaExtension?.status === "Available" ||
      selectedSchemaExtension?.status === undefined,

    [selectedSchemaExtension]
  );

  const handleAddSchemaExtension = React.useCallback(() => {
    setDrawerMode("create");
    setIsDrawerOpen(true);
  }, []);

  const handleSchemaExtensionSelect = React.useCallback(
    (schemaExtension: ISchemaExtension | undefined) => {
      setSelectedSchemaExtension(schemaExtension);
    },
    []
  );

  const handleEditSchemaExtension = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      setSelectedSchemaExtension(schemaExtension);
      setDrawerMode("edit");
      setIsDrawerOpen(true);
    },
    []
  );

  const handleDeleteSchemaExtension = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      logInfo("Delete schema extension:", JSON.stringify(schemaExtension));
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleViewSchemaExtension = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      logInfo("View schema extension:", JSON.stringify(schemaExtension));
      setSelectedSchemaExtension(schemaExtension);
      setIsViewerOpen(true);
    },
    [logInfo]
  );

  const handleChangeSchemaStatus = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      logInfo("Change schema status:", JSON.stringify(schemaExtension));
      setSelectedSchemaExtension(schemaExtension);
      setIsChangeStatusDialogOpen(true);
    },
    [logInfo]
  );

  const handleRefresh = React.useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    // Clear selection when refreshing
    setSelectedSchemaExtension(undefined);
  }, []);

  const handleDrawerClose = React.useCallback(() => {
    setIsDrawerOpen(false);
    setDrawerMode("create");
  }, []);

  const handleViewerClose = React.useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  const handleDrawerSuccess = React.useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedSchemaExtension(undefined);
    setDrawerMode("create");
    // Trigger a refresh of the list view
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <Stack>
      <Stack gap="5px">
        <Subtitle1>{title}</Subtitle1>
        <InformationPanel />
      </Stack>

      <SchemaExtensionsToolbar
        selectedSchemaExtension={selectedSchemaExtension}
        onAdd={handleAddSchemaExtension}
        onEdit={handleEditSchemaExtension}
        onDelete={handleDeleteSchemaExtension}
        onView={handleViewSchemaExtension}
        onChangeStatus={handleChangeSchemaStatus}
        onRefresh={handleRefresh}
      />
      <Divider  />
      <Stack paddingTop="40px">
        <SchemaExtensionsListView
          onSchemaExtensionSelect={handleSchemaExtensionSelect}
          onEdit={handleEditSchemaExtension}
          onDelete={handleDeleteSchemaExtension}
          onView={handleViewSchemaExtension}
          refreshTrigger={refreshTrigger}
          onCreateNew={handleAddSchemaExtension}
          onChangeStatus={handleChangeSchemaStatus}
        />
      </Stack>
      {isDrawerOpen && !canBeEdited && (
        <SchemaStatusRestrictionDialog
          isOpen={isDrawerOpen}
          onDismiss={handleDrawerClose}
          schemaExtension={selectedSchemaExtension!}
        />
      )}
      {isDrawerOpen && canBeEdited && (
        <SchemaExtensionDrawer
          isOpen={isDrawerOpen}
          onSchemaExtensionCreated={handleDrawerSuccess}
          onSchemaExtensionUpdated={handleDrawerSuccess}
          selectedSchemaExtension={selectedSchemaExtension}
          mode={drawerMode}
          onClose={handleDrawerClose}
        />
      )}
      {
        /* Delete Schema Extension Dialog */
        isDeleteDialogOpen && selectedSchemaExtension && (
          <DeleteSchemaExtension
            isOpen={isDeleteDialogOpen}
            onDismiss={() => setIsDeleteDialogOpen(false)}
            schemaExtension={selectedSchemaExtension!}
            onDeleteSuccess={() => {
              setIsDeleteDialogOpen(false);
              setSelectedSchemaExtension(undefined);
              // Trigger a refresh of the list view
              setRefreshTrigger((prev) => prev + 1);
            }}
          />
        )
      }
      {
        /* Change Schema Status Dialog */
        isChangeStatusDialogOpen && selectedSchemaExtension && (
          <ChangeSchemaStatus
            isOpen={isChangeStatusDialogOpen}
            onDismiss={() => setIsChangeStatusDialogOpen(false)}
            schemaExtension={selectedSchemaExtension!}
            onStatusChangeSuccess={() => {
              setIsChangeStatusDialogOpen(false);
              setSelectedSchemaExtension(undefined);
              // Trigger a refresh of the list view
              setRefreshTrigger((prev) => prev + 1);
            }}
          />
        )
      }

      {/* Schema Extension Viewer */}
      {isViewerOpen && (
        <SchemaExtensionViewer
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          schemaExtension={selectedSchemaExtension}
        />
      )}
    </Stack>
  );
};

export default ManageSchemaExtensionsControl;
