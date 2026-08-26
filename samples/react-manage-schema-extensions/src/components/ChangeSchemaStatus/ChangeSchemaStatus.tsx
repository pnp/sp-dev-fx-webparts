import * as React from "react";
import * as strings from 'ManageSchemaExtensionsWebPartStrings';

import { ArrowSync20Regular, Info20Regular } from "@fluentui/react-icons";
import {
  Badge,
  Body1,
  Body1Strong,
  Button,
  Dropdown,
  Option,
  Spinner,
  Text,
  tokens,
} from "@fluentui/react-components";
import {
  EMessageType,
  RenderDialog,
  RenderHeader,
  ShowMessage,
  StackV2 as Stack,
} from "@spteck/react-controls";
import { ErrorType, useLogging } from "@spteck/m365-hooks";

import { ISchemaExtension } from "../../models/ISchemaExtension";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { css } from "@emotion/css";
import { useAtomValue } from "jotai";
import { useSchemaExtension } from "../../hooks/useSchemaExtension";

export interface IChangeSchemaStatusProps {
  isOpen: boolean;
  onDismiss: () => void;
  schemaExtension: ISchemaExtension;
  onStatusChangeSuccess: () => void;
}

type SchemaStatus = "InDevelopment" | "Available" | "Deprecated";

interface IStyleClasses {
  grid: string;
  panelInfo: string;
  iconStyle: string;
  headerIconStyle: string;
}

export const ChangeSchemaStatus: React.FunctionComponent<
  IChangeSchemaStatusProps
> = (props: React.PropsWithChildren<IChangeSchemaStatusProps>) => {
  const { isOpen, onDismiss, schemaExtension, onStatusChangeSuccess } = props;
  const appGlobalState = useAtomValue(appGlobalStateAtom);
  const { context,   } = appGlobalState;
  const { updateSchemaExtension } = useSchemaExtension({ context: context! });
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = React.useState<
    SchemaStatus | undefined
  >(undefined);

  const classes = (): IStyleClasses => {
    return {
      grid: css({
        display: "grid",
        gridTemplateColumns: "120px auto",
        alignItems: "center",
        marginTop: "10px",
        gap: "8px",
      }),
      panelInfo: css({
        backgroundColor:         
           tokens.colorNeutralBackground3,
        borderRadius: "8px",
      }),
      iconStyle: css({
        marginRight: "8px",
        color: tokens.colorBrandForeground1,
        flexShrink: 0,
        width: "28px",
        height: "28px",
      }),
      headerIconStyle: css({
        width: "42px",
        height: "42px",
      }),
    };
  };
 const styles = classes();
  const { logError } = useLogging();

  // Get available status transitions based on current status
  const getAvailableTransitions = React.useCallback(
    (currentStatus: SchemaStatus): SchemaStatus[] => {
      switch (currentStatus) {
        case "InDevelopment":
          return ["Available"];
        case "Available":
          return ["Deprecated"];
        case "Deprecated":
          return []; // No transitions from Deprecated
        default:
          return [];
      }
    },
    []
  );

  const availableTransitions = React.useMemo(
    () => getAvailableTransitions(schemaExtension.status as SchemaStatus),
    [schemaExtension.status, getAvailableTransitions]
  );

  const canChangeStatus = React.useMemo(
    () => availableTransitions.length > 0,
    [availableTransitions]
  );

  const handleStatusChange = React.useCallback(async () => {
    if (!selectedStatus) {
      setError(strings.SelectStatusError);
      return;
    }

    try {
      setIsUpdating(true);
      setError(undefined);
      await updateSchemaExtension?.(schemaExtension?.id as string, {
        status: selectedStatus,
        owner: schemaExtension?.owner,
      });
      onStatusChangeSuccess();
      onDismiss();
    } catch (error) {
      logError(
        "Change Schema Status",
        "Error changing schema extension status:",
        error,
        ErrorType.SYSTEM,
        {
          schemaExtensionId: schemaExtension.id,
          targetStatus: selectedStatus,
        }
      );
      setError(`${strings.FailedToChangeStatus} ${error}`);
    } finally {
      setIsUpdating(false);
    }
  }, [
    selectedStatus,
    schemaExtension?.id,
    updateSchemaExtension,
    onStatusChangeSuccess,
    onDismiss,
    logError,
  ]);

  const getStatusColor = React.useCallback((status: SchemaStatus) => {
    switch (status) {
      case "InDevelopment":
        return "warning";
      case "Available":
        return "success";
      case "Deprecated":
        return "severe";
      default:
        return "subtle";
    }
  }, []);

  const getStatusDescription = React.useCallback((status: SchemaStatus) => {
    switch (status) {
      case "InDevelopment":
        return strings.InDevelopmentDescription;
      case "Available":
        return strings.AvailableDescription;
      case "Deprecated":
        return strings.DeprecatedDescription;
      default:
        return "";
    }
  }, []);

  const DialogAction = React.useCallback(() => {
    return (
      <Stack gap="m" direction="horizontal" justifyContent="end" padding="20px">
        <Button onClick={onDismiss}>{strings.Cancel}</Button>
        {canChangeStatus && (
          <Button
            appearance="primary"
            onClick={handleStatusChange}
            disabled={isUpdating || !selectedStatus}
          >
            {isUpdating ? <Spinner size="small" /> : strings.ChangeStatusButtonText}
          </Button>
        )}
      </Stack>
    );
  }, [
    handleStatusChange,
    isUpdating,
    onDismiss,
    canChangeStatus,
    selectedStatus,
  ]);

  const RenderStatusChange = React.useCallback(() => {
    return (
      <>
        <Stack className={styles.panelInfo} padding="25px">
          <Stack direction="horizontal" gap="m" alignItems="start">
            <Info20Regular className={styles.iconStyle} />
            <Stack gap="s">
              <Body1>{strings.SchemaLifecycleInfoIntro}</Body1>
              <Body1>
                <strong>{strings.InDevelopmentStatus}</strong> → <strong>{strings.AvailableStatus}</strong> → {" "}
                <strong>{strings.DeprecatedStatus}</strong>
              </Body1>
              <Body1>{strings.SchemaLifecycleInfoIrreversible}</Body1>
            </Stack>
          </Stack>
        </Stack>
        <Body1Strong>{strings.ChangeStatusOfExtension}</Body1Strong>
        <div className={styles.grid}>
          <Body1>{strings.SchemaIdLabel}</Body1>
          <Body1Strong>{schemaExtension.id}</Body1Strong>
          <Body1>{strings.DescriptionLabel}</Body1>
          <Body1Strong>{schemaExtension.description}</Body1Strong>
          <Body1>{strings.CurrentStatusLabel}</Body1>
          <Badge
            appearance="filled"
            color={getStatusColor(schemaExtension.status as SchemaStatus)}
            style={{ maxWidth: "fit-content" }}
          >
            {schemaExtension.status}
          </Badge>
          <Body1>{strings.NewStatusLabel}</Body1>
          <Dropdown
            placeholder={strings.SelectStatusPlaceholder}
            style={{ minWidth: "100%" }}
            value={
              selectedStatus ? getStatusDescription(selectedStatus) : undefined
            }
            onOptionSelect={(_, data) =>
              setSelectedStatus(data.optionValue as SchemaStatus)
            }
          >
            {availableTransitions.map((status) => (
              <Option
                key={status}
                value={status}
                text={getStatusDescription(status)}
              >
                <Stack direction="horizontal" gap="s" alignItems="start">
                  {getStatusDescription(status)}
                </Stack>
              </Option>
            ))}
          </Dropdown>
        </div>
        {error && (
          <ShowMessage message={error} messageType={EMessageType.ERROR} />
        )}
      </>
    );
  }, [
    error,
    schemaExtension,
    selectedStatus,
    availableTransitions,
    getStatusColor,
    getStatusDescription,
    styles,
  ]);

  const RenderCannotChange = React.useCallback(() => {
    return (
      <>
        <Stack className={styles.panelInfo} padding="25px" gap="s">
          <Stack direction="horizontal" gap="m" alignItems="start">
            <Info20Regular className={styles.iconStyle} />
            <Stack gap="s">
              <Body1>
                {strings.CannotChangeStatusMessage}{" "}
                <Text weight="semibold">{schemaExtension.id}</Text>
              </Body1>
              <Body1>
                Schema extensions with status{" "}
                <Badge
                  appearance="filled"
                  color={getStatusColor(schemaExtension.status as SchemaStatus)}
                  style={{ maxWidth: "fit-content" }}
                >
                  {schemaExtension.status}
                </Badge>{" "}
                {strings.StatusCannotTransition}
              </Body1>
              <Body1>
                {strings.LifecycleIsText}{" "}
                <strong>{strings.InDevelopmentStatus}</strong> → <strong>{strings.AvailableStatus}</strong> →{" "}
                <strong>{strings.DeprecatedStatus}</strong>
              </Body1>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }, [schemaExtension, getStatusColor]);

  // Reset selected status when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedStatus(undefined);
      setError(undefined);
    }
  }, [isOpen]);

  if (!schemaExtension) {
    return null;
  }

  return (
    <>
      <RenderDialog isOpen={isOpen} dialogActions={<DialogAction />}>
        <Stack gap="m" paddingLeft="20px" paddingRight="20px">
          <RenderHeader
            icon={<ArrowSync20Regular className={styles.headerIconStyle} />}
            title={strings.ChangeSchemaStatusTitle}
            description={strings.ChangeSchemaStatusDescription}
            onDismiss={onDismiss}
          />
          <Stack gap="l">
            {canChangeStatus ? <RenderStatusChange /> : <RenderCannotChange />}
          </Stack>
        </Stack>
      </RenderDialog>
    </>
  );
};
