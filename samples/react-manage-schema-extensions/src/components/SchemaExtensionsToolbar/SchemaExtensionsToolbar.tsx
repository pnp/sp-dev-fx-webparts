import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  Add20Regular,
  ArrowClockwise20Regular,
  ArrowSync20Regular,
  Delete20Regular,
  Edit20Regular,
  Eye20Regular,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  Tooltip,
} from "@fluentui/react-components";

import { ESchemaStatus } from "../../constants/ESchemaStatus";
import { ISchemaExtension } from "../../models/ISchemaExtension";
import { css } from "@emotion/css";

export interface ISchemaExtensionsToolbarProps {
  selectedSchemaExtension?: ISchemaExtension;
  onAdd?: () => void;
  onEdit?: (schemaExtension: ISchemaExtension) => void;
  onDelete?: (schemaExtension: ISchemaExtension) => void;
  onView?: (schemaExtension: ISchemaExtension) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  totalCount?: number;
  onChangeStatus?: (schemaExtension: ISchemaExtension) => void;
}

export const SchemaExtensionsToolbar: React.FunctionComponent<
  ISchemaExtensionsToolbarProps
> = ({
  selectedSchemaExtension,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onChangeStatus,
  onRefresh,
  isLoading = false,
  totalCount = 0,
}) => {
  const handleAdd = React.useCallback(() => {
    onAdd?.();
  }, [onAdd]);

  const handleEdit = React.useCallback(() => {
    if (selectedSchemaExtension && onEdit) {
      onEdit(selectedSchemaExtension);
    }
  }, [selectedSchemaExtension, onEdit]);

  const handleDelete = React.useCallback(() => {
    if (selectedSchemaExtension && onDelete) {
      onDelete(selectedSchemaExtension);
    }
  }, [selectedSchemaExtension, onDelete]);

  const handleView = React.useCallback(() => {
    if (selectedSchemaExtension && onView) {
      onView(selectedSchemaExtension);
    }
  }, [selectedSchemaExtension, onView]);

  const handleRefresh = React.useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  // Check if edit is disabled (deprecated status extensions can't be edited)
  const isEditDisabled = React.useMemo(() => {
    return selectedSchemaExtension?.status === ESchemaStatus.Deprecated;
  }, [selectedSchemaExtension]);
  // Check if delete is disabled (available and deprecated status extensions can't be deleted)
  const isDeleteDisabled = React.useMemo(() => {
    return (
      selectedSchemaExtension?.status === ESchemaStatus.Available ||
      selectedSchemaExtension?.status === ESchemaStatus.Deprecated
    );
  }, [selectedSchemaExtension]);

  const styles = css({
    justifyContent: "space-between",
  });

  return (
    <Toolbar aria-label={strings.ToolbarAriaLabel} className={styles}>
      <ToolbarGroup>
        <Tooltip content={strings.NewButtonTooltip} relationship="label">
          <ToolbarButton
            aria-label={strings.NewButtonTooltip}
            icon={<Add20Regular />}
            onClick={handleAdd}
            disabled={isLoading}
            appearance="primary"
          >
            {strings.NewButtonLabel}
          </ToolbarButton>
        </Tooltip>

        <ToolbarDivider />

        <Tooltip
          content={
            !selectedSchemaExtension
              ? strings.EditButtonTooltipNoSelection
              : isEditDisabled
              ? strings.EditButtonTooltipDisabled
              : strings.EditButtonTooltip
          }
          relationship="label"
        >
          <ToolbarButton
            aria-label={strings.EditButtonTooltip}
            icon={<Edit20Regular />}
            onClick={handleEdit}
            disabled={!selectedSchemaExtension || isLoading || isEditDisabled}
          >
            {strings.EditButtonLabel}
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          content={
            !selectedSchemaExtension
              ? strings.ViewButtonTooltipNoSelection
              : strings.ViewButtonTooltip
          }
          relationship="label"
        >
          <ToolbarButton
            aria-label={strings.ViewButtonTooltip}
            icon={<Eye20Regular />}
            onClick={handleView}
            disabled={!selectedSchemaExtension}
          >
            {strings.ViewButtonLabel}
          </ToolbarButton>
        </Tooltip>

        <Tooltip
          content={
            !selectedSchemaExtension
              ? strings.DeleteButtonTooltipNoSelection
              : isDeleteDisabled
              ? strings.DeleteButtonTooltipDisabled
              : strings.DeleteButtonTooltip
          }
          relationship="label"
        >
          <ToolbarButton
            aria-label={strings.DeleteButtonTooltip}
            icon={<Delete20Regular />}
            onClick={handleDelete}
            disabled={!selectedSchemaExtension || isLoading || isDeleteDisabled}
          >
            {strings.DeleteButtonLabel}
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          content={
            !selectedSchemaExtension
              ? strings.ChangeStatusButtonTooltipNoSelection
              : strings.ChangeStatusButtonTooltip
          }
          relationship="label"
        >
          <ToolbarButton
            aria-label={strings.ChangeStatusButtonTooltip}
            icon={<ArrowSync20Regular />}
            onClick={
              onChangeStatus
                ? () => onChangeStatus(selectedSchemaExtension!)
                : undefined
            }
            disabled={!selectedSchemaExtension || isLoading}
          >
            {strings.ChangeStatusButtonLabel}
          </ToolbarButton>
        </Tooltip>
      </ToolbarGroup>
      <ToolbarGroup>
        <Tooltip content={strings.RefreshButtonTooltip} relationship="label">
          <ToolbarButton
            aria-label={strings.RefreshButtonTooltip}
            icon={<ArrowClockwise20Regular />}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {strings.RefreshButtonLabel}
          </ToolbarButton>
        </Tooltip>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default SchemaExtensionsToolbar;
