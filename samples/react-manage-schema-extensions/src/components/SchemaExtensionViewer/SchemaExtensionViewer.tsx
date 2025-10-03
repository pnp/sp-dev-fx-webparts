import * as React from "react";

import {
  Badge,
  Body1,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  InfoLabel,
  Input,
  Subtitle1,
  Textarea,
  tokens,
} from "@fluentui/react-components";
import {
  DataBarHorizontal20Regular,
  DataUsageSettings20Regular,
  Dismiss24Regular,
  DocumentText20Regular,
  Person20Regular,
  Tag20Regular,
  Target20Regular,
} from "@fluentui/react-icons";
import {
  DataGridV2 as DataGrid,
  IColumnConfig,
  RenderLabel,
  StackV2 as Stack,
} from "@spteck/react-controls";
import {
  ISchemaExtension,
  ISchemaExtensionProperty,
} from "../../models/ISchemaExtension";

import { useSchemaExtensionViewerStyles } from "./useSchemaExtensionViewerStyles";
import { TARGET_TYPES } from "../../constants";
import * as strings from 'ManageSchemaExtensionsWebPartStrings';

export interface ISchemaExtensionViewerProps {
  isOpen: boolean;
  onClose: () => void;
  schemaExtension?: ISchemaExtension | undefined;
}

export const SchemaExtensionViewer: React.FunctionComponent<
  ISchemaExtensionViewerProps
> = ({ isOpen, onClose, schemaExtension }) => {
  const styles = useSchemaExtensionViewerStyles();

  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  // Properties columns configuration for DataGrid
  const propertiesColumns: IColumnConfig<ISchemaExtensionProperty>[] =
    React.useMemo(
      () => [
        {
          column: "name",
          header: strings.PropertyNameColumn,

          onRender: (property: ISchemaExtensionProperty) => (
            <Stack
              gap="10px"
              alignItems="center"
              justifyContent="start"
              direction="horizontal"
            >
              <DataUsageSettings20Regular className={styles.iconStyles} />
              <span>{property.name}</span>
            </Stack>
          ),
          order: (a: ISchemaExtensionProperty, b: ISchemaExtensionProperty) =>
            a.name.localeCompare(b.name),
        },
        {
          column: "type",
          header: strings.DataTypeColumn,
          onRender: (property: ISchemaExtensionProperty) => (
            <Stack
              gap="10px"
              alignItems="center"
              justifyContent="start"
              direction="horizontal"
            >
              <span>{property.type}</span>
            </Stack>
          ),
          order: (a: ISchemaExtensionProperty, b: ISchemaExtensionProperty) =>
            a.type.localeCompare(b.type),
        },
      ],
      [styles.iconStyles]
    );

  const RenderTitle = React.useCallback(() => {
    return (
      <Stack direction="horizontal" gap="m">
        <DataBarHorizontal20Regular style={{ width: "42px", height: "42px" }} />
        <Stack>
          <Subtitle1>{strings.ViewSchemaExtensionTitle}</Subtitle1>
          <Body1>{strings.SchemaExtensionDetailsSubtitle}</Body1>
        </Stack>
      </Stack>
    );
  }, []);

  return (
    <Drawer
      type="overlay"
      separator
      open={isOpen}
      onOpenChange={(_, { open }) => !open && handleClose()}
      size="medium"
      position="end"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={handleClose}
            />
          }
        >
          <RenderTitle />
        </DrawerHeaderTitle>
      </DrawerHeader>
      <Divider style={{ flexGrow: 0 }} />
      <DrawerBody>
        <div className={styles.drawerContent}>
          {!schemaExtension ? (
            <Stack gap="0" padding="l" className={styles.noDataContainer}>
              {strings.NoDataToDisplay}
            </Stack>
          ) : (
            <div className={styles.scrollableContent}>
              {/* Extension ID */}
              <Stack gap="5px" padding="s">
                <Stack gap="5px" direction="horizontal">
                  <RenderLabel label={strings.ExtensionIdLabel} icon={<Tag20Regular />} />
                  <InfoLabel info={strings.ExtensionIdTooltip} />
                </Stack>
                <Field>
                  <Input
                    value={schemaExtension.id || strings.NotAssigned}
                    readOnly
                    disabled
                    input={{
                      className: styles.inputDisabledColor,
                    }}
                  />
                </Field>
              </Stack>

              {/* Description */}
              <Stack gap="10px" padding="s">
                <Stack gap="5px" direction="horizontal">
                  <RenderLabel
                    label={strings.DescriptionLabel}
                    icon={<DocumentText20Regular />}
                  />
                  <InfoLabel info={strings.DescriptionTooltip} />
                </Stack>
                <Field>
                  <Textarea
                    value={
                      schemaExtension.description || strings.NoDescriptionProvided
                    }
                    readOnly
                    disabled
                    textarea={{
                      className: styles.inputDisabledColor,
                    }}
                    rows={3}
                  />
                </Field>
              </Stack>

              {/* Owner (App ID) */}
              <Stack gap="5px" padding="s">
                <Stack gap="5px" direction="horizontal">
                  <RenderLabel
                    label={strings.OwnerAppIdLabel}
                    icon={<Person20Regular />}
                  />
                  <InfoLabel info={strings.OwnerAppIdTooltip} />
                </Stack>
                <Field>
                  <Input
                    value={schemaExtension.owner || strings.UnknownOwner}
                    readOnly
                    disabled
                    input={{
                      className: styles.inputDisabledColor,
                    }}
                  />
                </Field>
              </Stack>

              {/* Status */}
              {schemaExtension.status && (
                <Stack gap="5px" padding="s">
                  <Stack gap="5px" direction="horizontal">
                    <RenderLabel label={strings.StatusLabel} icon={<Target20Regular />} />
                    <InfoLabel info={strings.StatusTooltip} />
                  </Stack>
                  <Field>
                    <Stack gap="m">
                      <Badge
                        style={{ width: "fit-content" }}
                        appearance={"filled"}
                        size="large"
                        color={
                          schemaExtension.status === "Available"
                            ? "success"
                            : schemaExtension.status === "InDevelopment"
                            ? "warning"
                            : "severe"
                        }
                      >
                        {schemaExtension.status}
                      </Badge>
                    </Stack>
                  </Field>
                </Stack>
              )}

              {/* Target Types */}
              <Stack gap="5px" paddingTop="l">
                <Stack gap="5px" direction="horizontal">
                  <RenderLabel
                    label={strings.TargetTypesLabel}
                    icon={<Target20Regular />}
                  />
                  <InfoLabel info={strings.TargetTypesTooltip} />
                </Stack>

                <div className={styles.targetTypesContainer}>
                  {TARGET_TYPES.map((targetType) => (
                    <Checkbox
                      key={targetType.key}
                      label={<span>{targetType.text}</span>}
                      checked={
                        schemaExtension.targetTypes?.includes(targetType.key) ||
                        false
                      }
                      readOnly
                      disabled
                      indicator={{
                        style: {
                          backgroundColor:
                            schemaExtension.targetTypes?.includes(
                              targetType.key
                            )
                              ? tokens.colorBrandBackground
                              : undefined,
                        },
                      }}
                    />
                  ))}
                </div>
              </Stack>

              {/* Properties */}
              <Stack gap="5px" paddingTop="xl">
                <Stack gap="5px" direction="horizontal">
                  <RenderLabel
                    label={strings.PropertiesLabel}
                    icon={<DataBarHorizontal20Regular />}
                  />
                  <InfoLabel info={strings.PropertiesTooltip} />
                </Stack>

                <Stack gap="m">
                  <DataGrid
                    items={schemaExtension.properties}
                    columns={propertiesColumns as IColumnConfig<unknown>[]}
                    enableSorting={true}
                    noItemsMessage={strings.NoPropertiesDefined}
                  />
                </Stack>
              </Stack>
            </div>
          )}
        </div>
      </DrawerBody>
      <DrawerFooter>
        <Stack
          direction="horizontal"
          gap="10px"
          justifyContent="end"
          width="100%"
        >
          <Button appearance="secondary" onClick={handleClose}>
            {strings.CloseButtonText}
          </Button>
        </Stack>
      </DrawerFooter>
    </Drawer>
  );
};

export default SchemaExtensionViewer;
