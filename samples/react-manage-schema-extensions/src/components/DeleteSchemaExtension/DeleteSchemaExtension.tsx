import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  Badge,
  Body1,
  Body1Strong,
  Button,
  Spinner,
  Text,
  tokens,
} from "@fluentui/react-components";
import {
  DataBarHorizontal20Regular,
  Info20Regular,
} from "@fluentui/react-icons";
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

interface IStyles {
  grid: string;
  iconStyle: string;
  infoPanel: string;
}

export interface IDeleteSchemaExtensionProps {
  isOpen: boolean;
  onDismiss: () => void;
  schemaExtension: ISchemaExtension;
  onDeleteSuccess: () => void;
}

const useStyles = (): IStyles => {
  return {
    grid: css({
      display: "grid",
      gridTemplateColumns: "100px auto",

      alignItems: "center",
      marginTop: "10px",
    }),
    iconStyle: css({
      marginRight: "8px",
      color: tokens.colorBrandForeground1,
      flexShrink: 0,
      width: "28px",
      height: "28px",
    }),
    infoPanel: css({
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: "8px",
    }),
  };
};

export const DeleteSchemaExtension: React.FunctionComponent<
  IDeleteSchemaExtensionProps
> = (props: React.PropsWithChildren<IDeleteSchemaExtensionProps>) => {
  const { isOpen, onDismiss, schemaExtension, onDeleteSuccess } = props;
  const appGlobalState = useAtomValue(appGlobalStateAtom);
  const { context,   } = appGlobalState;
  const { deleteSchemaExtension } = useSchemaExtension({ context: context! });
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { logError } = useLogging();
  const styles = useStyles();
  const canBeDeleted = React.useMemo(
    () => schemaExtension.status === "InDevelopment",
    [schemaExtension]
  );

  const handleDelete = React.useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteSchemaExtension?.(schemaExtension?.id as string);
      onDeleteSuccess();
      onDismiss();
    } catch (error) {
      logError(
        "Delete Schema Extension",
        "Error deleting schema extension:",
        error,
        ErrorType.SYSTEM,
        {
          schemaExtensionId: schemaExtension.id,
        }
      );
      setError(`${strings.FailedToDeleteError} ${error}`);
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const DialogAction = React.useCallback(() => {
    return (
      <Stack gap="m" direction="horizontal" justifyContent="end" padding="20px">
        <Button onClick={onDismiss}>{strings.Cancel}</Button>
        {canBeDeleted && (
          <Button
            appearance="primary"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner size="small" /> : strings.Delete}
          </Button>
        )}
      </Stack>
    );
  }, [handleDelete, isDeleting, onDismiss, canBeDeleted]);

  const RenderDeleteConfirmation = React.useCallback(() => {
    return (
      <>
        <Stack
          className={styles.infoPanel}
          padding="25px"
        >
          <Stack direction="horizontal" gap="m" alignItems="start">
            <Info20Regular className={styles.iconStyle} />
            <Body1>
              {strings.DeleteDataInfo}
            </Body1>
          </Stack>
        </Stack>
        <Body1Strong>
          {strings.DeleteSchemaExtensionMessage}
        </Body1Strong>
        <div className={styles.grid}>
          <Body1>{strings.SchemaIdLabel}</Body1>
          <Body1Strong>{schemaExtension.id}</Body1Strong>
          <Body1>{strings.DescriptionLabel}</Body1>
          <Body1Strong>{schemaExtension.description}</Body1Strong>
          <Body1>{strings.StatusLabel}</Body1>
          <Badge
            appearance="filled"
            color="warning"
            style={{ maxWidth: "fit-content" }}
          >
            {schemaExtension.status}
          </Badge>
        </div>
        {error && (
          <ShowMessage message={error} messageType={EMessageType.ERROR} />
        )}
      </>
    );
  }, [error, schemaExtension]);

  const RenderCantDelete = React.useCallback(() => {
    return (
      <>
        <Stack
          style={{
            backgroundColor: tokens.colorNeutralBackground3,
            borderRadius: "8px",
          }}
          padding="25px"
          gap="s"
        >
          <Body1>
            {strings.CannotDeleteMessage}{" "}
            <Text weight="semibold">{schemaExtension.id}</Text>{" "}
          </Body1>
          <Body1>
            {strings.CannotDeleteReasonPrefix}{" "}
            <Badge
              appearance="filled"
              color="warning"
              style={{ maxWidth: "fit-content" }}
            >
              {schemaExtension.status}
            </Badge>{" "}
            {strings.CannotDeleteReasonSuffix}
          </Body1>
        </Stack>
      </>
    );
  }, []);

  if (!schemaExtension) {
    return null;
  }

  return (
    <>
      <RenderDialog isOpen={isOpen} dialogActions={<DialogAction />}>
        <Stack gap="m" paddingLeft="20px" paddingRight="20px">
          <RenderHeader
            icon={
              <DataBarHorizontal20Regular
                style={{ width: "42px", height: "42px" }}
              />
            }
            title={strings.ConfirmDeleteTitle}
            description={strings.ConfirmDeleteDescription}
            onDismiss={onDismiss}
          />
          <Stack gap="l">
            {canBeDeleted ? <RenderDeleteConfirmation /> : <RenderCantDelete />}
          </Stack>
        </Stack>
      </RenderDialog>
    </>
  );
};
