import * as React from "react";
import { ISchemaExtension } from "../../models/ISchemaExtension";
import * as strings from 'ManageSchemaExtensionsWebPartStrings';
import {
  RenderDialog,
  RenderHeader,
  StackV2 as Stack,
} from "@spteck/react-controls";
import { Warning20Regular } from "@fluentui/react-icons";
import {
  Badge,
  Body1,
  Button,
  tokens,
} from "@fluentui/react-components";
import { css } from "@emotion/css";

export interface ISchemaStatusRestrictionDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  schemaExtension: ISchemaExtension;
}

export const SchemaStatusRestrictionDialog: React.FunctionComponent<
  ISchemaStatusRestrictionDialogProps
> = (props: React.PropsWithChildren<ISchemaStatusRestrictionDialogProps>) => {
  const { isOpen, onDismiss, schemaExtension } = props;

  const badgeContainerStyles = css`
    display: flex;
    align-items: center;
    gap: ${tokens.spacingHorizontalS};
    margin: ${tokens.spacingVerticalM} 0;
  `;

  const DialogAction = React.useCallback(() => {
    return (
      <Stack gap="m" direction="horizontal" justifyContent="end" padding="20px">
        <Button appearance="primary" onClick={onDismiss}>
          {strings.OkButtonText}
        </Button>
      </Stack>
    );
  }, [onDismiss]);

  if (!schemaExtension) {
    return null;
  }
    return (
      <RenderDialog isOpen={isOpen} dialogActions={<DialogAction />}>
        <Stack gap="m" paddingLeft="20px" paddingRight="20px">
          <RenderHeader
            icon={
              <Warning20Regular
                style={{
                  width: "42px",
                  height: "42px",
                  color: tokens.colorPaletteMarigoldBorder2,
                }}
              />
            }
            title={strings.CannotModifyTitle}
            description={strings.CannotModifyDescription}
            onDismiss={onDismiss}
          />
          <Stack gap="l">
            <Stack gap="m">
              <div className={badgeContainerStyles}>
                <Body1>{strings.CurrentStatusText}</Body1>
                <Badge
                  appearance="filled"
                  size="large"
                  color={
                    schemaExtension.status === "Available"
                      ? "success"
                      : "warning"
                  }
                >
                  {schemaExtension.status || strings.UnknownStatus}
                </Badge>
              </div>

              <Body1>
                <strong>{strings.SchemaExtensionIdText}</strong> {schemaExtension.id}
              </Body1>

              <Body1>
                {strings.ModificationStatusRequirement}
              </Body1>
            </Stack>
          </Stack>
        </Stack>
      </RenderDialog>
    );
};