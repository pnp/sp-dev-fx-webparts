export enum ExtensionLocation {
    ApplicationCustomizer = "ClientSideExtension.ApplicationCustomizer",
    ContextMenu = "ClientSideExtension.ListViewCommandSet.ContextMenu",
    CommandBar = "ClientSideExtension.ListViewCommandSet.CommandBar",
    ListViewCommandSet = "ClientSideExtension.ListViewCommandSet",
}

export const LocationStrings = {
    [ExtensionLocation.ApplicationCustomizer]: "Application Customizer",
    [ExtensionLocation.ContextMenu]: "Context Menu",
    [ExtensionLocation.CommandBar]: "Command Bar",
    [ExtensionLocation.ListViewCommandSet]: "List View Command Set",
}

export const Locations: ExtensionLocation[] = Object.keys(LocationStrings) as ExtensionLocation[];