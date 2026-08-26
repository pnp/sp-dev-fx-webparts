import * as React from "react";

import { Divider, Subtitle1 } from "@fluentui/react-components";

import { ChangeSchemaStatus } from "../ChangeSchemaStatus";
import { DeleteSchemaExtension } from "../DeleteSchemaExtension";
import { EPanelMode } from "../../models/EPanelMode";
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

export const ManageSchemaExtensionsControl: React.FunctionComponent<
  IManageSchemaExtensionsProps
> = (props) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const [selectedSchemaExtension, setSelectedSchemaExtension] = React.useState<
    ISchemaExtension | undefined
  >(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState<EPanelMode>(
    EPanelMode.CREATE
  );
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] =
    React.useState(false);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
 
  const { title } = appGlobalState;

  const canBeEdited = React.useMemo(
    () =>
      selectedSchemaExtension?.status === "InDevelopment" ||
      selectedSchemaExtension?.status === "Available" ||
      selectedSchemaExtension?.status === undefined,

    [selectedSchemaExtension]
  );

  const handleAddSchemaExtension = React.useCallback(() => {
    setDrawerMode(EPanelMode.CREATE);
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
      setDrawerMode(EPanelMode.EDIT);
      setIsDrawerOpen(true);
    },
    []
  );

  const handleDeleteSchemaExtension = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleViewSchemaExtension = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      setSelectedSchemaExtension(schemaExtension);
      setIsViewerOpen(true);
    },
    []
  );

  const handleChangeSchemaStatus = React.useCallback(
    (schemaExtension: ISchemaExtension) => {
      setSelectedSchemaExtension(schemaExtension);
      setIsChangeStatusDialogOpen(true);
    },
    []
  );

  const handleRefresh = React.useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    // Clear selection when refreshing
    setSelectedSchemaExtension(undefined);
  }, []);

  const handleDrawerClose = React.useCallback(() => {
    setIsDrawerOpen(false);
    setDrawerMode(EPanelMode.CREATE);
  }, []);

  const handleViewerClose = React.useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  const handleDrawerSuccess = React.useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedSchemaExtension(undefined);
    setDrawerMode(EPanelMode.CREATE);
    // Trigger a refresh of the list view
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <>
      <Stack>
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
      <Divider />
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
    </>
  );
};

export default ManageSchemaExtensionsControl;
