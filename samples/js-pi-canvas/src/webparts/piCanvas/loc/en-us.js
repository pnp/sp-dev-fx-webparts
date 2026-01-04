define([], function() {
  return {
    "PropertyPaneDescription": "Infinite possibilities - Configure tabs to organize web parts from anywhere on the page.",
    "BasicGroupName": "Troubleshooting",
    "DescriptionFieldLabel": "Description Field",
    "SectionClass": "Section Selector",
    "WebPartClass": "Web Part Selector",
    "TabLabels": "Tab Labels",
    "ManageTabLabels": "Manage Tab Labels",
    "AppTitle": "PiCanvas",
    "OriginalAuthor": "Originally created by Mark Rackley",
    "UpgradedBy": "Upgraded by @anthonyrhopkins",

    // Template strings
    "TemplatesGroupName": "Templates",
    "TemplatesDescription": "Apply pre-built templates or export/import your configuration",
    "ApplyTemplateLabel": "Apply Template",
    "SelectTemplatePlaceholder": "-- Select a template --",
    "BuiltInTemplatesHeader": "--- Built-in Templates ---",
    "SavedTemplatesHeader": "--- Saved Templates ---",
    "ApplyTemplateButton": "Apply Selected Template",
    "ExportImportHeader": "Export / Import",
    "ExportConfigLabel": "Export Configuration",
    "ImportConfigLabel": "Import Configuration",
    "SaveAsTemplateLabel": "Save as Template",
    "TemplateNamePrompt": "Enter a name for this template:",
    "ExportSuccessMessage": "Configuration exported successfully!",
    "ImportSuccessMessage": "Configuration imported successfully! Please assign web parts to tabs.",
    "SaveTemplateSuccessMessage": "Template saved to Site Assets!",
    "ImportErrorMessage": "Failed to import configuration. Please check the file format.",
    "SaveTemplateErrorMessage": "Failed to save template. Please check your permissions.",
    "NoSiteAssetsAccess": "Site Assets not accessible. Saving templates to SharePoint is disabled, but you can still use Export/Import.",

    // Permission strings
    "PermissionHeaderLabel": "Permissions",
    "PermissionEnabledLabel": "Restrict by Group",
    "PermissionGroupsLabel": "Visible to Groups",
    "PermissionGroupsDescription": "Select which groups can see this tab",
    "PermissionCustomGroupsLabel": "Custom Group IDs",
    "PermissionCustomGroupsPlaceholder": "e.g. 5, 12, 23",
    "PermissionCustomGroupsDescription": "Enter SharePoint group IDs (comma-separated)",
    "PermissionVisibleToAll": "Everyone (no restriction)",
    "PermissionOwnersLabel": "Site Owners",
    "PermissionMembersLabel": "Site Members",
    "PermissionVisitorsLabel": "Site Visitors",
    "PermissionOwnersMembers": "Owners & Members",
    "PermissionMembersVisitors": "Members & Visitors",
    "PermissionAllGroups": "All Site Groups",

    // Permission placeholder strings
    "PermissionPlaceholderLabel": "Show Placeholder",
    "PermissionPlaceholderDescription": "Show disabled tab with message instead of hiding",
    "PermissionPlaceholderTextLabel": "Placeholder Message",
    "PermissionPlaceholderTextPlaceholder": "e.g. Access restricted",
    "PermissionPlaceholderDefault": "Restricted",

    // Content type strings (v3.0)
    "ContentTypeLabel": "Content Type",
    "ContentTypeWebPart": "SharePoint Web Part",
    "ContentTypeSection": "SharePoint Section",
    "ContentTypeMarkdown": "Markdown Content",
    "ContentTypeHtml": "HTML Content",
    "ContentTypeMermaid": "Mermaid Diagram",
    "ContentTypeEmbed": "Embed (iframe)",

    // Custom content strings (v3.0)
    "CustomContentLabel": "Content",
    "MarkdownPlaceholder": "Enter Markdown content...\n\n# Heading\n**Bold** and *italic* text\n- List item",
    "HtmlPlaceholder": "Enter HTML content...\n\n<div class=\"my-content\">\n  <h2>Title</h2>\n  <p>Your content here</p>\n</div>",
    "MermaidPlaceholder": "Enter Mermaid diagram code...\n\ngraph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Action]\n    B -->|No| D[End]",

    // Embed strings (v3.0)
    "EmbedUrlLabel": "Embed URL",
    "EmbedUrlDescription": "Enter a URL from a trusted domain (YouTube, Power BI, Forms, etc.)",
    "EmbedHeightLabel": "Embed Height",
    "EmbedHeightPlaceholder": "e.g. 400px, 50vh",

    // Feature toggle strings (v3.0)
    "EnableDeepLinkingLabel": "Enable URL Deep Linking",
    "EnableDeepLinkingDescription": "Allow linking directly to tabs via URL hash (e.g. #tab-name)",
    "EnableLazyLoadingLabel": "Enable Lazy Loading",
    "EnableLazyLoadingDescription": "Delay loading tab content until tab is activated",

    // Accessibility strings (v3.0)
    "TabListAriaLabel": "Content sections"
  }
});
