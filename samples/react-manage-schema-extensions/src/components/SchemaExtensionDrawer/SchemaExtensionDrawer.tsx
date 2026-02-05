import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  Body1,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Dropdown,
  Field,
  InfoLabel,
  Input,
  Option,
  ProgressBar,
  Subtitle1,
  Textarea,
  tokens,
} from "@fluentui/react-components";
import {
  DataBarHorizontal20Regular,
  Dismiss24Regular,
  DocumentText20Regular,
  Person20Regular,
  Tag20Regular,
  Target20Regular,
} from "@fluentui/react-icons";
import { EMessageType, RenderLabel, ShowMessage } from "@spteck/react-controls";
import {
  ISchemaExtension,
  ISchemaExtensionCreateRequest,
  ISchemaExtensionProperty,
} from "../../models/ISchemaExtension";
import {
  PROPERTY_TYPES,
  TARGET_TYPES,
} from "../../constants";
import { useCallback, useState } from "react";

import { Add20Regular } from "@fluentui/react-icons";
import { Delete20Regular } from "@fluentui/react-icons";
import { InformationCreatePanel } from "./InformationCreatePanel";
import { InformationEditPanel } from "./InformationEditPanel";
import { StackV2 as Stack } from "@spteck/react-controls";
// Removed RenderAttribute - using RenderLabel directly
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useLogging } from "@spteck/m365-hooks";
import { useSchemaExtension } from "../../hooks/useSchemaExtension";
import { useSchemaExtensionDrawerStyles } from "./useSchemaExtensionDrawerStyles";
import { useUtils } from "../../utils/useUtils";

export interface ISchemaExtensionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSchemaExtensionCreated?: (schemaExtension: ISchemaExtension) => void;
  onSchemaExtensionUpdated?: (schemaExtension: ISchemaExtension) => void;
  selectedSchemaExtension?: ISchemaExtension | undefined;
  mode?: "create" | "edit";
}



export const SchemaExtensionDrawer: React.FunctionComponent<
  ISchemaExtensionDrawerProps
> = ({
  isOpen,
  onClose,
  onSchemaExtensionCreated,
  onSchemaExtensionUpdated,
  selectedSchemaExtension,
  mode = "create",
}) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const { context } = appGlobalState;
  const { createSchemaExtension, updateSchemaExtension } = useSchemaExtension({
    context: context!,
  });
  const styles = useSchemaExtensionDrawerStyles();
  const { logInfo } = useLogging();
  const { getAvailablePropertyTypes, hasPropertyRestrictions } = useUtils();

  const isEditMode = React.useMemo(
    () => mode === "edit" && !!selectedSchemaExtension,
    [mode, selectedSchemaExtension]
  );

  const [formData, setFormData] = useState({
    extensionId: "",
    description: "",
    owner: "",
    targetTypes: ["User"],
  });

  const { extensionId, description, owner, targetTypes } = formData;
  const [properties, setProperties] = useState<ISchemaExtensionProperty[]>([
    { name: "", type: "String", isEnabled: isEditMode ? false : true },
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  // Validation state
  const [validationErrors, setValidationErrors] = useState<{
    extensionId?: string;
    description?: string;
    owner?: string;
    properties?: string[];
  }>({});


  const availablePropertyTypes = React.useMemo(() => {
    return getAvailablePropertyTypes(targetTypes, PROPERTY_TYPES);
  }, [targetTypes]);

  // Reset form to default values
  const resetFormToDefault = useCallback(() => {
    setFormData({
      extensionId: "",
      description: "",
      owner: "",
      targetTypes: ["User"],
    });
    setProperties([
      { name: "", type: "String", isEnabled: isEditMode ? false : true },
    ]);
    setError(undefined);
    setSuccess(undefined);
    setValidationErrors({});
  }, [isEditMode]);

  // Initialize form data when selectedSchemaExtension changes
  React.useEffect(() => {
    if (isEditMode && selectedSchemaExtension) {
      setFormData({
        extensionId: selectedSchemaExtension.id || "",
        description: selectedSchemaExtension.description || "",
        owner: selectedSchemaExtension.owner || "",
        targetTypes: selectedSchemaExtension.targetTypes || ["User"],
      });
      setProperties(
        selectedSchemaExtension.properties?.length > 0
          ? selectedSchemaExtension.properties.map((prop) => ({
              ...prop,
              isEnabled: isEditMode ? false : true,
            }))
          : [{ name: "", type: "String", isEnabled: isEditMode ? false : true }]
      );
    } else if (!isEditMode) {
      resetFormToDefault();
    }
  }, [selectedSchemaExtension, isEditMode, resetFormToDefault]);

  // Reset form
  const resetForm = useCallback(() => {
    if (isEditMode && selectedSchemaExtension) {
      setFormData({
        extensionId: selectedSchemaExtension.id || "",
        description: selectedSchemaExtension.description || "",
        owner: selectedSchemaExtension.owner || "",
        targetTypes: selectedSchemaExtension.targetTypes || ["User"],
      });
      setProperties(
        selectedSchemaExtension.properties?.length > 0
          ? selectedSchemaExtension.properties
          : [{ name: "", type: "String", isEnabled: isEditMode ? false : true }]
      );
    } else {
      resetFormToDefault();
    }
    setError(undefined);
    setSuccess(undefined);
    setValidationErrors({});
  }, [isEditMode, selectedSchemaExtension, resetFormToDefault]);

  // Handle close
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const errors: typeof validationErrors = {};
    const propertyErrors: string[] = [];

    // Validate extension ID (only required for create mode)
    if (mode === "create") {
      if (!extensionId.trim()) {
        errors.extensionId = strings.ExtensionIdRequiredError;
      } else if (!/^[a-zA-Z0-9_]+$/.test(extensionId)) {
        errors.extensionId = strings.ExtensionIdInvalidError;
      }
    }

    // Validate description
    if (!description.trim()) {
      errors.description = strings.DescriptionRequiredError;
    }

    // Validate owner
    if (!owner.trim()) {
      errors.owner = strings.OwnerRequiredError;
    }

    // Validate properties
    for (let index = 0; index < properties.length; index++) {
      const property = properties[index];
      if (!property.name.trim()) {
        propertyErrors[index] = strings.PropertyNameRequiredError;
      } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(property.name)) {
        propertyErrors[index] = strings.PropertyNameInvalidError;
      }
    }

    if (propertyErrors.some((error) => error)) {
      errors.properties = propertyErrors;
    }

    // Check for duplicate property names
    const propertyNames = properties
      .map((p) => p.name.trim().toLowerCase())
      .filter((name) => name);
    const nameSet = new Set<string>();
    const duplicateSet = new Set<string>();

    for (const name of propertyNames) {
      if (nameSet.has(name)) {
        duplicateSet.add(name);
      } else {
        nameSet.add(name);
      }
    }

    if (duplicateSet.size > 0) {
      errors.properties = propertyErrors;
      const duplicates = Array.from(duplicateSet);
      for (const duplicate of duplicates) {
        const indexes = properties
          .map((p, i) => (p.name.trim().toLowerCase() === duplicate ? i : -1))
          .filter((i) => i !== -1);
        for (const index of indexes) {
          propertyErrors[index] = strings.DuplicatePropertyNameError;
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [extensionId, description, owner, properties, mode]);

  // Handle target type change
  const handleTargetTypeChange = useCallback(
    (targetType: string, checked: boolean) => {
      setFormData((prev) => {
        const newTargetTypes = checked
          ? [...prev.targetTypes, targetType]
          : prev.targetTypes.filter((t) => t !== targetType);
        
        // Get available property types for the new target types
        const newAvailablePropertyTypes = getAvailablePropertyTypes(newTargetTypes, PROPERTY_TYPES);
        const availablePropertyTypeKeys = newAvailablePropertyTypes.map(type => type.key);
        
        // Reset property types that are no longer allowed
        setProperties((prevProperties) =>
          prevProperties.map((property) => {
            if (!availablePropertyTypeKeys.includes(property.type)) {
              // Reset to String if current type is not allowed
              return { ...property, type: "String" as ISchemaExtensionProperty["type"] };
            }
            return property;
          })
        );
        
        return { ...prev, targetTypes: newTargetTypes };
      });
    },
    []
  );

  // Handle property change
  const handlePropertyChange = useCallback(
    (index: number, field: keyof ISchemaExtensionProperty, value: string) => {
      setProperties((prev) =>
        prev.map((property, i) =>
          i === index ? { ...property, [field]: value } : property
        )
      );
    },
    []
  );

  // Add property
  const addProperty = useCallback(() => {
    setProperties((prev) => [
      ...prev,
      { name: "", type: "String", isEnabled: true },
    ]);
  }, []);

  // Remove property
  const removeProperty = useCallback((index: number) => {
    setProperties((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Handle submit (create or update)
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      if (isEditMode && selectedSchemaExtension?.id) {
        // Update existing schema extension
        const updateData: Partial<ISchemaExtension> = {
          description: description.trim(),
          targetTypes,
          properties: properties.filter((p) => p.name.trim()),
          owner: owner.trim(),
        };

        const updatedExtension = await updateSchemaExtension(
          selectedSchemaExtension.id,
          updateData
        );
        logInfo(
          "SchemaExtensionDrawer - handleSubmit",
          "Updated schema extension:",
          { data: updatedExtension }
        );
        setSuccess(
          `${strings.SchemaExtensionUpdatedSuccess}: ${selectedSchemaExtension.id}`
        );

        if (onSchemaExtensionUpdated) {
          onSchemaExtensionUpdated(updatedExtension);
        }
      } else {
        // Create new schema extension
        const schemaExtensionRequest: ISchemaExtensionCreateRequest = {
          id: extensionId.trim(),
          description: description.trim(),
          targetTypes,
          properties: properties.filter((p) => p.name.trim()),
          owner: owner.trim(),
        };

        const createdExtension = await createSchemaExtension(
          schemaExtensionRequest
        );
        logInfo(
          "SchemaExtensionDrawer - handleSubmit",
          "Created schema extension:",
          { data: createdExtension }
        );
        setSuccess(
          `${strings.SchemaExtensionCreatedSuccess}: ${createdExtension.id}`
        );

        if (onSchemaExtensionCreated) {
          onSchemaExtensionCreated(createdExtension);
        }
      }

      // Close drawer after a short delay to show success message
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : isEditMode ? strings.UpdateSchemaExtensionError : strings.CreateSchemaExtensionError;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    validateForm,
    extensionId,
    description,
    targetTypes,
    properties,
    owner,
    createSchemaExtension,
    updateSchemaExtension,
    isEditMode,
    selectedSchemaExtension,
    onSchemaExtensionCreated,
    onSchemaExtensionUpdated,
    handleClose,
    logInfo,
  ]);

  const RenderTitle = useCallback(() => {
    return isEditMode ? (
      <Stack direction="horizontal" gap="m">
        <DataBarHorizontal20Regular style={{ width: "42px", height: "42px" }} />
        <Stack>
          <Subtitle1>{strings.EditSchemaExtensionTitle}</Subtitle1>
          <Body1>Change Schema Definition</Body1>
        </Stack>
      </Stack>
    ) : (
      <Stack direction="horizontal" gap="m">
        <DataBarHorizontal20Regular style={{ width: "42px", height: "42px" }} />
        <Stack>
          <Subtitle1>{strings.CreateSchemaExtensionTitle}</Subtitle1>
          <Body1>Define a new schema extension</Body1>
        </Stack>
      </Stack>
    );
  }, [isEditMode]);

  const isDataDirty = useCallback((): boolean => {
    if (!isEditMode || !selectedSchemaExtension) {
      return false;
    }

    // Check if any of the form fields differ from the selectedSchemaExtension values
    if (
      description.trim() !== selectedSchemaExtension.description ||
      properties.length !== (selectedSchemaExtension.properties || []).length ||
      targetTypes.sort().toString() !== (selectedSchemaExtension.targetTypes || []).sort().toString()
    ) {
      return true; // Form is dirty
    }

    return false; // No changes detected
  }, [isEditMode, selectedSchemaExtension, description, properties]);

  const enableHandleSubmit = React.useMemo(() => {
    if (isLoading) {
      return false;
    }
    if (isEditMode) {
      return isDataDirty();
    } else {
      return (
        extensionId.trim() !== "" &&
        targetTypes.length > 0 &&
        properties.length > 0 &&
        properties.some((p) => p.name.trim() !== "")
      );
    }
  }, [
    isLoading,
    isEditMode,
    isDataDirty,
    targetTypes,
    properties,
    extensionId,
  ]);

  const disableControls = React.useMemo(
    () => isLoading || mode === "edit",
    [isLoading, mode]
  );

  return (
    <Drawer
      type="overlay"
      separator
      open={isOpen}
      onOpenChange={(_, { open }) => !open && handleClose()}
      size="medium"
      position="end"
      modalType="alert"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => handleClose()}
            />
          }
        >
          <RenderTitle />
        </DrawerHeaderTitle>
      </DrawerHeader>
      <Divider style={{ flexGrow: 0 }} />
      <DrawerBody className={styles.drawerContent}>
        {isEditMode ? <InformationEditPanel /> : <InformationCreatePanel />}
        <div className={styles.scrollableContent}>
          {/* Extension ID */}
          <Stack gap="5px" padding="s">
            <Stack gap="5px" direction="horizontal">
              <RenderLabel
                label={strings.ExtensionIdLabel}
                isRequired
                icon={<Tag20Regular />}
              />
              <InfoLabel info={strings.ExtensionIdInfo} />
            </Stack>
            <Field validationMessage={validationErrors.extensionId}>
              <Input
                value={extensionId}
                onChange={(_, data) =>
                  setFormData((prev) => ({ ...prev, extensionId: data.value }))
                }
                placeholder={strings.ExtensionIdPlaceholder}
                disabled={disableControls}
                input={{
                  className: disableControls
                    ? styles.inputDisabledColor
                    : undefined,
                }}
              />
            </Field>
          </Stack>

          {/* Description */}
          <Stack gap="5px" padding="s">
            <Stack gap="5px" direction="horizontal">
              <RenderLabel
                label={strings.DescriptionLabel}
                isRequired
                icon={<DocumentText20Regular />}
              />
              <InfoLabel info={strings.DescriptionInfo} />
            </Stack>
            <Field validationMessage={validationErrors.description}>
              <Textarea
                value={formData.description}
                onChange={(_, data) =>
                  setFormData((prev) => ({ ...prev, description: data.value }))
                }
                placeholder={strings.DescriptionPlaceholder}
                disabled={isLoading}
                rows={3}
              />
            </Field>
          </Stack>

          {/* Owner (App ID) */}
          <Stack gap="5px" padding="s">
            <Stack gap="5px" direction="horizontal">
              <RenderLabel
                label={strings.OwnerLabel}
                isRequired
                icon={<Person20Regular />}
              />
              <InfoLabel info={strings.OwnerInfo} />
            </Stack>
            <Field validationMessage={validationErrors.owner}>
              <Input
                value={owner}
                onChange={(_, data) =>
                  setFormData((prev) => ({ ...prev, owner: data.value }))
                }
                placeholder={strings.OwnerPlaceholder}
                disabled={disableControls}
                input={{
                  className: disableControls
                    ? styles.inputDisabledColor
                    : undefined,
                }}
              />
            </Field>
          </Stack>

          {/* Target Types */}
          <Stack gap="5px" padding="s">
            <Stack gap="5px" direction="horizontal">
              <RenderLabel
                label={strings.TargetTypesLabel}
                isRequired
                icon={<Target20Regular />}
              />
              <InfoLabel info={strings.TargetTypesInfo} />
            </Stack>
            <div className={styles.targetTypesSection}  >
              {TARGET_TYPES.map((targetType) => {
                const wasInOriginalSchema =
                  isEditMode &&
                  selectedSchemaExtension?.targetTypes?.includes(
                    targetType.key
                  );

                return (
                  <Checkbox
                    key={targetType.key}
                    label={<span>{targetType.text}</span>}
                    checked={targetTypes.includes(targetType.key)}
                    onChange={(_, data) =>
                      handleTargetTypeChange(targetType.key, !!data.checked)
                    }
                    disabled={disableControls && wasInOriginalSchema}
                    indicator={{
                      style: {
                        backgroundColor:
                          disableControls && wasInOriginalSchema
                            ? targetTypes?.includes(targetType.key)
                              ? tokens.colorBrandBackground
                              : undefined
                            : undefined,
                      },
                    }}
                    className={styles.targetTypeCheckbox}
                  />
                );
              })}
            </div>
          </Stack>

          {/* Properties */}
          <Stack gap="5px" padding="s">
            <Stack
              gap="5px"
              direction="horizontal"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack gap="5px" direction="horizontal" alignItems="center">
                <RenderLabel
                  label={strings.PropertiesLabel}
                  isRequired
                  icon={<DataBarHorizontal20Regular />}
                />
                <InfoLabel info={strings.PropertiesInfo} />
              </Stack>
              <Button
                appearance="subtle"
                icon={<Add20Regular />}
                onClick={addProperty}
                disabled={isLoading}
              >
                {strings.AddPropertyButtonLabel}
              </Button>
            </Stack>

            {/* Property type restrictions info */}
            {hasPropertyRestrictions(targetTypes) && (
              <div className={styles.restrictionInfoMessage}>
                <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                  {strings.PropertyRestrictionsMessage}
                </Body1>
              </div>
            )}

            {properties.map((property, index) => (
              <div key={index} className={styles.propertiesContainer}>
                <Field validationMessage={validationErrors.properties?.[index]}>
                  <Input
                    value={property.name}
                    onChange={(_, data) =>
                      handlePropertyChange(index, "name", data.value)
                    }
                    placeholder={strings.PropertyNamePlaceholder}
                    disabled={isLoading || property.isEnabled === false}
                    input={{
                      className:
                        isLoading || property.isEnabled === false
                          ? styles.inputDisabledColor
                          : undefined,
                    }}
                    style={{ width: "100%" }}
                  />
                </Field>

                <Field>
                  <Dropdown
                    style={{ width: "100%" }}
                    value={property.type}
                    selectedOptions={[property.type]}
                    onOptionSelect={(_, data) => {
                      if (data.optionValue) {
                        handlePropertyChange(
                          index,
                          "type",
                          data.optionValue as ISchemaExtensionProperty["type"]
                        );
                      }
                    }}
                    disabled={isLoading || property.isEnabled === false}
                    button={{
                      className:
                        isLoading || property.isEnabled === false
                          ? styles.inputDisabledColor
                          : undefined,
                    }}
                  >
                    {availablePropertyTypes.map((type) => (
                      <Option key={type.key} value={type.key}>
                        {type.text}
                      </Option>
                    ))}
                  </Dropdown>
                </Field>

                {properties.length > 1 && (
                  <Button
                    appearance="subtle"
                    icon={<Delete20Regular />}
                    onClick={() => removeProperty(index)}
                    disabled={isLoading || property.isEnabled === false}
                    aria-label={strings.RemovePropertyButtonLabel}
                  />
                )}
              </div>
            ))}
          </Stack>
        </div>

        {/* Loading indicator */}
        {isLoading && <ProgressBar />}

        {/* Error message */}
        {error && (
          <ShowMessage message={error} messageType={EMessageType.ERROR} />
        )}

        {/* Success message */}
        {success && (
          <ShowMessage message={success} messageType={EMessageType.SUCCESS} />
        )}
      </DrawerBody>
      {/* Footer buttons */}
      <DrawerFooter>
        <Stack
          gap="10px"
          direction="horizontal"
          justifyContent="end"
          width="100%"
        >
          <Button
            appearance="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            {strings.Cancel}
          </Button>
          <Button
            appearance="primary"
            onClick={handleSubmit}
            disabled={!enableHandleSubmit}
          >
            {isLoading
              ? isEditMode
                ? strings.UpdatingSchemaExtension
                : strings.CreatingSchemaExtension
              : isEditMode
              ? strings.Edit
              : strings.Create}
          </Button>
        </Stack>
      </DrawerFooter>
    </Drawer>
  );
};

export default SchemaExtensionDrawer;
