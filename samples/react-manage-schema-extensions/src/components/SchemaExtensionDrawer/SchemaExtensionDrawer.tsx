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
import { PROPERTY_TYPES, TARGET_TYPES } from "../../constants";
import { useCallback, useState } from "react";

import { Add20Regular } from "@fluentui/react-icons";
import { Delete20Regular } from "@fluentui/react-icons";
import { EPanelMode } from "../../models/EPanelMode";
import { InformationCreatePanel } from "./InformationCreatePanel";
import { InformationEditPanel } from "./InformationEditPanel";
import { StackV2 as Stack } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useLogging } from "@spteck/m365-hooks";
import { useSchemaExtension } from "../../hooks/useSchemaExtension";
import { useSchemaExtensionDrawerStyles } from "./useSchemaExtensionDrawerStyles";
import { useUtils } from "../../utils/useUtils";

interface IValidationErrors {
  extensionId?: string;
  description?: string;
  owner?: string;
  properties?: string[];
}

export interface ISchemaExtensionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSchemaExtensionCreated?: (schemaExtension: ISchemaExtension) => void;
  onSchemaExtensionUpdated?: (schemaExtension: ISchemaExtension) => void;
  selectedSchemaExtension?: ISchemaExtension | undefined;
  mode?: EPanelMode;
}

export const SchemaExtensionDrawer: React.FunctionComponent<
  ISchemaExtensionDrawerProps
> = ({
  isOpen,
  onClose,
  onSchemaExtensionCreated,
  onSchemaExtensionUpdated,
  selectedSchemaExtension,
  mode = EPanelMode.CREATE,
}) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const { context } = appGlobalState;
  const {
    createSchemaExtension,
    updateSchemaExtension,
    validateAppIdAndOwnership,
  } = useSchemaExtension({
    context: context!,
  });
  const styles = useSchemaExtensionDrawerStyles();
  const { logInfo } = useLogging();
  const { getAvailablePropertyTypes, hasPropertyRestrictions } = useUtils();

  const isEditMode = React.useMemo(
    () => mode === EPanelMode.EDIT && !!selectedSchemaExtension,
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
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>(
    {}
  );
  // Available property types based on selected target types
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

  // Handle drawer open change (to detect close)
  const handleOpenChange = useCallback(
    (event: React.SyntheticEvent, data: { open: boolean }) => {
      if (!data.open) {
        handleClose();
      }
    },
    [handleClose]
  );
  // Validate description on blur
  const validateDescriptionOnBlur = useCallback(() => {
    if (!description.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        description: strings.DescriptionRequiredError,
      }));
    } else {
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description, ...rest } = prev;
        return rest;
      });
    }
  }, [description]);

  // Validate property name on blur
  const validatePropertyNameOnBlur = useCallback(
    (index: number) => {
      const property = properties[index];
      const propertyErrors = [...(validationErrors.properties || [])];

      if (!property.name.trim()) {
        propertyErrors[index] = strings.PropertyNameRequiredError;
      } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(property.name)) {
        propertyErrors[index] = strings.PropertyNameInvalidError;
      } else {
        // Check for duplicate property names
        const propertyNames = properties.map((p) =>
          p.name.trim().toLowerCase()
        );
        const currentName = property.name.trim().toLowerCase();
        const duplicateIndexes = propertyNames
          .map((name, i) => (name === currentName && name !== "" ? i : -1))
          .filter((i) => i !== -1);

        if (duplicateIndexes.length > 1) {
          // Mark all duplicates
          for (const dupIndex of duplicateIndexes) {
            propertyErrors[dupIndex] = strings.DuplicatePropertyNameError;
          }
        } else {
          // Clear error for this property if no duplicates
          delete propertyErrors[index];
        }
      }

      // Update validation errors
      if (propertyErrors.some((error) => error)) {
        setValidationErrors((prev) => ({
          ...prev,
          properties: propertyErrors,
        }));
      } else {
        setValidationErrors((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { properties, ...rest } = prev;
          return rest;
        });
      }
    },
    [properties, validationErrors.properties]
  );

  // Validate extension ID on blur
  const validateExtensionIdOnBlur = useCallback(() => {
    if (!extensionId.trim() || isEditMode) {
      return;
    }

    // Validate extension ID format
    if (!/^[a-zA-Z0-9_]+$/.test(extensionId)) {
      setValidationErrors((prev) => ({
        ...prev,
        extensionId: strings.ExtensionIdInvalidError,
      }));
    } else {
      // Clear validation error if valid
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { extensionId, ...rest } = prev;
        return rest;
      });
    }
  }, [extensionId, isEditMode]);

  // Validate owner on blur
  const validateOwnerOnBlur = useCallback(async () => {
    if (!owner.trim() || isEditMode) {
      return;
    }

    try {
      const result = await validateAppIdAndOwnership(owner.trim());

      // delete owner from errors if exists
      if (result.exists) {
        setValidationErrors((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { owner, ...rest } = prev;
          return rest;
        });
      } else {
        // Set validation error for owner
        setValidationErrors((prev) => ({
          ...prev,
          owner: result.error || strings.AppIdNotFoundError,
        }));
      }
    } catch {
      setValidationErrors((prev) => ({
        ...prev,
        owner: strings.AppIdValidationError,
      }));
    }
  }, [owner, isEditMode, validateAppIdAndOwnership]);
  // Handle target type change
  const handleTargetTypeChange = useCallback(
    (targetType: string, checked: boolean) => {
      setFormData((prev) => {
        const newTargetTypes = checked
          ? [...prev.targetTypes, targetType]
          : prev.targetTypes.filter((type) => type !== targetType);

        // Get available property types for the new target types
        const newAvailablePropertyTypes = getAvailablePropertyTypes(
          newTargetTypes,
          PROPERTY_TYPES
        );
        const availablePropertyTypeKeys = newAvailablePropertyTypes.map(
          (type) => type.key
        );

        // Reset property types that are no longer allowed
        setProperties((prevProperties) =>
          prevProperties.map((property) => {
            if (!availablePropertyTypeKeys.includes(property.type)) {
              // Reset to String if current type is not allowed
              return {
                ...property,
                type: "String" as ISchemaExtensionProperty["type"],
              };
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

      // Clear validation error for this property when user types in the name field
      if (field === "name") {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          if (newErrors.properties) {
            const propertyErrors = [...newErrors.properties];
            delete propertyErrors[index];

            // If no more property errors, remove the properties key
            if (!propertyErrors.some((error) => error)) {
              delete newErrors.properties;
            } else {
              newErrors.properties = propertyErrors;
            }
          }
          return newErrors;
        });
      }
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
    setProperties((prev) => prev.filter((_, position) => position !== index));
  }, []);
  // Handle submit (create or update)
  const handleSubmit = useCallback(async () => {
    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    // extension data object
    const extensionData: Partial<ISchemaExtension> = {
      description: description.trim(),
      targetTypes,
      properties: properties.filter((p) => p.name.trim()),
      owner: owner.trim(),
    };
    try {
      switch (true) {
        case isEditMode && !!selectedSchemaExtension?.id: {
          // Update existing schema extension
          const updatedExtension = await updateSchemaExtension(
            selectedSchemaExtension.id,
            extensionData
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
          break;
        }
        default: {
          // Create new schema extension
          const schemaExtensionRequest: ISchemaExtensionCreateRequest = {
            id: extensionId.trim(),
            ...(extensionData as ISchemaExtension),
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
          break;
        }
      }

      // Close drawer immediately
      handleClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : isEditMode
          ? strings.UpdateSchemaExtensionError
          : strings.CreateSchemaExtensionError;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    validationErrors,
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
  // Handle input change
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // clear validation error for the field
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    },
    []
  );
  // Check if form data is dirty (for edit mode)
  const isDataDirty = React.useMemo((): boolean => {
    if (!isEditMode || !selectedSchemaExtension) {
      return false;
    }
    // Check if any of the form fields differ from the selectedSchemaExtension values
    if (
      description.trim() !== selectedSchemaExtension.description ||
      properties.length !== (selectedSchemaExtension.properties || []).length ||
      targetTypes.sort().toString() !==
        (selectedSchemaExtension.targetTypes || []).sort().toString()
    ) {
      // check properties in detail
      if (
        properties.length > (selectedSchemaExtension.properties || []).length
      ) {
         
          const prop = properties[properties.length - 1];

          if (prop.name.trim() !== "") {
            return true; // Form is dirty
          }     
      } else {
        return true; // Form is dirty
      }
    }
    return false; // No changes detected
  }, [
    isEditMode,
    selectedSchemaExtension,
    description,
    properties,
    targetTypes,
  ]);
  // Determine if submit button should be enabled
  const enableHandleSubmit = React.useMemo(() => {
    if (isLoading) {
      return false;
    }
    if (isEditMode) {
      return isDataDirty;
    } else {
      return (
        extensionId.trim() !== "" &&
        description.trim() !== "" &&
        targetTypes.length > 0 &&
        properties.length > 0 &&
        owner.trim() !== "" &&
        properties.some((p) => p.name.trim() !== "") &&
        Object.keys(validationErrors).length === 0
      );
    }
  }, [
    isLoading,
    isEditMode,
    isDataDirty,
    targetTypes,
    properties,
    extensionId,
    description,
    owner,
    validationErrors,
  ]);
  // Determine if controls should be disabled
  const disableControls = React.useMemo(
    () => isLoading || mode === "edit",
    [isLoading, mode]
  );
  //  Render title
  const RenderTitle = useCallback(() => {
    return (
      <Stack direction="horizontal" gap="m">
        <DataBarHorizontal20Regular style={{ width: "42px", height: "42px" }} />
        {isEditMode ? (
          <Stack>
            <Subtitle1>{strings.EditSchemaExtensionTitle}</Subtitle1>
            <Body1>Change Schema Definition</Body1>
          </Stack>
        ) : (
          <Stack>
            <Subtitle1>{strings.CreateSchemaExtensionTitle}</Subtitle1>
            <Body1>Define a new schema extension</Body1>
          </Stack>
        )}
      </Stack>
    );
  }, [isEditMode]);

  return (
    <Drawer
      type="overlay"
      separator
      open={isOpen}
      onOpenChange={handleOpenChange}
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
      <Divider className={styles.divider} />
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
                name="extensionId"
                onChange={handleInputChange}
                onBlur={validateExtensionIdOnBlur}
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
                name="description"
                onChange={handleInputChange}
                onBlur={validateDescriptionOnBlur}
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
                name="owner"
                onChange={handleInputChange}
                onBlur={validateOwnerOnBlur}
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
            <div className={styles.targetTypesSection}>
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
            {/* Properties list */}
            {properties.map((property, index) => (
              <div key={index} className={styles.propertiesContainer}>
                <Field validationMessage={validationErrors.properties?.[index]}>
                  <Input
                    value={property.name}
                    onChange={(_, data) =>
                      handlePropertyChange(index, "name", data.value)
                    }
                    onBlur={() => validatePropertyNameOnBlur(index)}
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
                    className={styles.dropdownDataType}
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
