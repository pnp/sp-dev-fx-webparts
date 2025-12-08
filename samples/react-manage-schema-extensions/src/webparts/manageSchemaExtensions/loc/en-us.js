define([], function() {
  return {
    // Property Pane
    "PropertyPaneDescription": "Application to manage Microsoft Graph Schema Extensions",
    "BasicGroupName": "Properties",
    "DescriptionFieldLabel": "Title",
    // General
    "Loading": "Loading...",
    "Error": "Error",
    "Success": "Success",
    "Cancel": "Cancel",
    "Save": "Save",
    "Close": "Close",
    "Delete": "Delete",
    "Create": "Create",
    "Edit": "Update",
    "View": "View",
    "Yes": "Yes",
    "No": "No",
    "Back": "Back",
    "Next": "Next",
    "Previous": "Previous",
    "Refresh": "Refresh",
    
    // Access Information
    "AccessRestrictedTitle": "Access Restricted",
    "AccessRestrictedMessage": "The Schema Extensions management required that user has full access to the Microsoft 365 tenant Site Appcatalog.",
    "AccessRestrictedDetails": "This Application use features that required read and write access to the tenant properties.",
    
    // Schema Extensions Toolbar
    "NewButtonLabel": "New",
    "NewButtonTooltip": "Add new schema extension",
    "EditButtonLabel": "Edit",
    "EditButtonTooltip": "Edit selected schema extension",
    "EditButtonTooltipNoSelection": "Select a schema extension to edit",
    "EditButtonTooltipDisabled": "Selected schema extension cannot be edited",
    "ViewButtonLabel": "View",
    "ViewButtonTooltip": "View selected schema extension",
    "ViewButtonTooltipNoSelection": "Select a schema extension to view", 
    "DeleteButtonLabel": "Delete",
    "DeleteButtonTooltip": "Delete selected schema extension",
    "DeleteButtonTooltipNoSelection": "Select a schema extension to delete",
    "DeleteButtonTooltipDisabled": "Selected schema extension cannot be deleted",
    "ChangeStatusButtonLabel": "Change Status",
    "ChangeStatusButtonTooltip": "Change status of selected schema extension",
    "ChangeStatusButtonTooltipNoSelection": "Select a schema extension to change status",
    "RefreshButtonLabel": "Refresh",
    "RefreshButtonTooltip": "Refresh schema extensions list",
    "ToolbarAriaLabel": "Schema Extensions Actions",
    
    // Empty State
    "NoSchemaExtensionsFoundTitle": "No Schema Extensions Found",
    "NoSchemaExtensionsFoundDescription": "Get started by creating your first schema extension to extend Microsoft Graph resources with custom properties.",
    "CreateSchemaButtonLabel": "Create Schema",
    
    // Schema Extension List
    "ExtensionIdColumnHeader": "Extension ID",
    "DescriptionColumnHeader": "Description",
    "TargetTypesColumnHeader": "Target Types",
    "StatusColumnHeader": "Status",
    "OwnerColumnHeader": "Owner",
    "PropertiesCountColumnHeader": "Properties",
    "ActionsColumnHeader": "Actions",
    
    // Schema Extension Drawer
    "CreateSchemaExtensionTitle": "Create Schema Extension",
  "UpdateSchemaExtensionTitle": "Update Schema Extension",
    "EditSchemaExtensionTitle": "Edit Schema Extension",
    "ExtensionIdLabel": "Extension ID",
    "ExtensionIdPlaceholder": "e.g., MyCompanyUserExtension",
    "DescriptionLabel": "Description",
    "DescriptionPlaceholder": "Describe the purpose of this schema extension",
    "OwnerLabel": "Owner (App ID)",
    "OwnerPlaceholder": "e.g., 12345678-1234-1234-1234-123456789012",
    "TargetTypesLabel": "Target Types",
    "PropertiesLabel": "Properties",
    "PropertyNameLabel": "Property Name",
    "PropertyTypeLabel": "Property Type",
    "PropertyNamePlaceholder": "Property name",
    "AddPropertyButtonLabel": "Add Property",
    "RemovePropertyButtonLabel": "Remove Property",
    
  // Info Labels (Schema Extension Drawer)
  "ExtensionIdInfo": "Unique identifier for the schema extension (letters, numbers, underscores only)",
  "DescriptionInfo": "Brief description of what this schema extension is for",
  "OwnerInfo": "The App ID that will own this schema extension",
  "TargetTypesInfo": "Select which Microsoft Graph resource types this extension applies to",
  "PropertiesInfo": "Define the custom properties for this schema extension",
    
    // Validation Messages
    "ExtensionIdRequiredError": "Extension ID is required",
    "ExtensionIdInvalidError": "Extension ID can only contain letters, numbers, and underscores",
    "DescriptionRequiredError": "Description is required",
    "OwnerRequiredError": "Owner (App ID) is required",
    "PropertyNameRequiredError": "Property name is required",
    "PropertyNameInvalidError": "Property name must start with a letter and contain only letters, numbers, and underscores",
    "DuplicatePropertyNameError": "Duplicate property name",
    
    // App ID Validation Messages
    "AppIdRequiredError": "App ID is required",
    "AppIdInvalidFormatError": "App ID must be a valid GUID format",
    "AppIdNotFoundError": "Application not found in Entra ID",
    "AppIdAccessDeniedError": "Access denied. You may not have permission to read this application",
    "AppIdNotOwnerError": "You are not an owner of this application",
    "AppIdValidationError": "Failed to validate application. Please check the App ID and try again",
    "AppIdValidationSuccess": "Valid owner of application",
    "AppIdValidatingMessage": "Validating application ownership...",
    
    // Success Messages
    "SchemaExtensionCreatedSuccess": "Schema extension created successfully",
    "SchemaExtensionUpdatedSuccess": "Schema extension updated successfully",
    "SchemaExtensionDeletedSuccess": "Schema extension deleted successfully",
    
    // Error Messages
    "AppCatalogNotFoundError": "App catalog URL not found. Cannot manage schema extensions.",
    "LoadInitialDataError": "Failed to load initial data",
    "CreateSchemaExtensionError": "Failed to create schema extension",
    "UpdateSchemaExtensionError": "Failed to update schema extension",
    "DeleteSchemaExtensionError": "Failed to delete schema extension",
    
    // Delete Confirmation
    "DeleteSchemaExtensionTitle": "Delete Schema Extension",
    "DeleteSchemaExtensionMessage": "Are you sure you want to delete this schema extension?",
    "DeleteSchemaExtensionConfirm": "Delete",
    "DeleteSchemaExtensionCancel": "Cancel",
    "DeleteSchemaExtensionInProgress": "Deleting schema extension...",
    
    // Schema Status
    "StatusInDevelopment": "In Development",
    "StatusAvailable": "Available",
    "StatusDeprecated": "Deprecated",
    
    // Target Types
    "TargetTypeUser": "User",
    "TargetTypeGroup": "Group",
    "TargetTypeDevice": "Device",
    "TargetTypeContact": "Contact",
    "TargetTypeEvent": "Event",
    "TargetTypeMessage": "Message",
    "TargetTypePost": "Post",
    "TargetTypeOrganization": "Organization",
    
    // Property Types
    "PropertyTypeString": "String",
    "PropertyTypeInteger": "Integer",
    "PropertyTypeBoolean": "Boolean",
    "PropertyTypeDateTime": "DateTime",
    "PropertyTypeBinary": "Binary",
    
    // Information Panel
    "InformationPanelTitle": "Schema Extensions Management",
    "InformationPanelDescription": "Manage custom schema extensions for Microsoft Graph resources",
    
    // Schema Extension Viewer
    "ViewSchemaExtensionTitle": "Schema Extension Details",
    "SchemaExtensionDetailsTitle": "Extension Details",
    "PropertiesTitle": "Properties",
    "NoPropertiesMessage": "No properties defined",
    
    // Change Status Dialog
    "ChangeStatusTitle": "Change Schema Status",
    "ChangeStatusMessage": "Select the new status for this schema extension",
    "ChangeStatusConfirm": "Change Status",
    
    // Restriction Messages
    "SchemaStatusRestrictionTitle": "Schema Status Restriction",
    "SchemaStatusRestrictionMessage": "This schema extension cannot be edited due to its current status",
    "PropertyRestrictionsMessage": "Note: Boolean and Integer property types are not available for Contact, Event, Message, and Post target types due to Microsoft Graph API limitations.",
    
    // Loading States
    "LoadingSchemaExtensions": "Loading schema extensions...",
    "CreatingSchemaExtension": "Creating schema extension...",
    "UpdatingSchemaExtension": "Updating schema extension...",
    "DeletingSchemaExtension": "Deleting schema extension...",

    // Change Schema Status
    "ChangeSchemaStatusTitle": "Change Schema Extension Status",
    "ChangeSchemaStatusDescription": "Update the lifecycle status of the schema extension.",
    "ChangeStatusButtonText": "Change Status",
    "SelectStatusPlaceholder": "Select new status",
    "SelectStatusError": "Please select a status to change to.",
    "SchemaLifecycleInfo": "Schema extensions follow a specific lifecycle:",
    "SchemaLifecycleStages": "InDevelopment → Available → Deprecated",
    "SchemaLifecycleWarning": "Once a status is changed, it cannot be reverted to a previous status.",
  "SchemaLifecycleInfoIntro": "Schema extensions follow a specific lifecycle:",
  "SchemaLifecycleInfoStages": "InDevelopment → Available → Deprecated",
  "SchemaLifecycleInfoIrreversible": "Once a status is changed, it cannot be reverted to a previous status.",
    "ChangeStatusOfExtension": "Change the status of the schema extension",
    "SchemaIdLabel": "Schema Id:",
    "CurrentStatusLabel": "Current Status:",
    "NewStatusLabel": "New Status:",
    "CannotChangeStatusMessage": "Cannot change status for schema extension",
    "StatusCannotTransition": "cannot be transitioned to any other status.",
    "LifecycleIsText": "The schema extension lifecycle is:",
    "InDevelopmentStatus": "InDevelopment",
    "AvailableStatus": "Available",
    "DeprecatedStatus": "Deprecated",
    "InDevelopmentDescription": "In Development",
    "AvailableDescription": "Available - Ready for production use",
    "DeprecatedDescription": "Deprecated - No longer supported",
    "FailedToChangeStatus": "Failed to change schema extension status:",

    // Schema Extension Viewer
    "SchemaExtensionDetailsSubtitle": "Schema Extension Details",
    "NoDataToDisplay": "No schema extension data to display",
    "ExtensionIdTooltip": "Unique identifier for the schema extension",
    "NotAssigned": "Not assigned",
    "DescriptionTooltip": "Description of what this schema extension is for",
    "NoDescriptionProvided": "No description provided",
    "OwnerAppIdLabel": "Owner (App ID)",
    "OwnerAppIdTooltip": "The App ID that owns this schema extension",
    "UnknownOwner": "Unknown",
    "StatusLabel": "Status",
    "StatusTooltip": "Current status of the schema extension",
    "TargetTypesTooltip": "Directory objects that this schema extension can be applied to",
    "PropertiesTooltip": "Custom properties defined for this schema extension",
    "PropertyNameColumn": "Property Name",
    "DataTypeColumn": "Data Type",
    "NoPropertiesDefined": "No properties defined",
    "CloseButtonText": "Close",

    // Information Panels
    "SchemaExtensionCreateGuidelinesTitle": "Schema Extension Create Guidelines",
    "StatusGuideline": "Status:",
    "StatusGuidelineDetails": "New schema extensions are created with the status \"InDevelopment\". Once you have tested and verified the extension, you can change its status to \"Available\" to make it usable in production scenarios.",
    "LimitationsGuideline": "Limitations:",
    "LimitationsGuidelineDetails": "Be aware of limitations after creation, you can't change the target resource types or remove or update custom properties. Only support for additive updates. Please",
    "ReviewDocumentationLink": "review the documentation",
    "SchemaExtensionUpdateGuidelinesTitle": "Schema Extension Update Guidelines",
    "AdditiveUpdatesGuideline": "Additive updates only:",
    "AdditiveUpdatesDetails": "You can only add new properties, target types to existing schema extensions or change the description",
    "StatusRequirementGuideline": "Status requirement:",
    "StatusRequirementDetails": "Updates are only allowed when the extension status is \"InDevelopment\" or \"Available\"",
    "RestrictionsGuideline": "Restrictions:",
    "RestrictionsDetails": "Custom properties or target resource types cannot be removed from the definition once created",
    "AllowedChangesGuideline": "Allowed changes:",
    "AllowedChangesDetails": "Add new custom properties or target types and modify the extension description",
    "SupportedDataTypesLink": "Learn more about supported property data types",
    "SchemaExtensionsInfoDescription": "Schema extensions allow you to define custom properties for Microsoft Graph resources. They enable you to extend the schema of resources like users, groups, and devices with additional data that is specific to your application or organization.",
    "SchemaExtensionsUseCaseDescription": "By creating schema extensions, you can store and manage extra information that is not included in the default schema provided by Microsoft Graph. This is particularly useful for scenarios where you need to capture application-specific data or metadata that is relevant to your business processes.",
    "LearnMoreLink": "Learn more about Microsoft Graph Schema Extensions",

    // Schema Status Restriction Dialog
    "CannotModifyTitle": "Schema Extension Cannot Be Modified",
    "CannotModifyDescription": "This schema extension cannot be modified due to its current status.",
    "CurrentStatusText": "Current Status:",
    "UnknownStatus": "Unknown",
    "SchemaExtensionIdText": "Schema Extension ID:",
    "ModificationStatusRequirement": "Schema extensions can only be modified when their status is \"InDevelopment\" or \"Available\".",
    "OkButtonText": "OK",

    // Data Grid Skeleton - Headers already defined above
    "PropertiesColumnHeader": "Properties",

    // Actions Menu
    "ViewDetailsAction": "View Details",
    "ChangeStatusAction": "Change Status",
    "EditAction": "Edit",
    "DeleteAction": "Delete",
    "ActionsMenuLabel": "More actions",

    // Delete Schema Extension
    "ConfirmDeleteTitle": "Confirm Delete Schema Extension",
    "ConfirmDeleteDescription": "This action cannot be undone.",
    "DeleteDataInfo": "Deleting a schema extension definition does not affect accessing custom data that has been added to resource instances based on that definition",
    "CannotDeleteMessage": "Is not possible to delete this schema extension.",
    "CannotDeleteReasonPrefix": "Only schema extensions with status",
    "CannotDeleteReasonSuffix": "can be deleted.",
    "OnlyInDevelopmentCanDelete": "InDevelopment",
    "FailedToDeleteError": "Failed to delete schema extension:"
  }
});