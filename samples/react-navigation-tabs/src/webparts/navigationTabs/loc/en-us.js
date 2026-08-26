/**
 * English (US) localization strings for the Navigation Tabs web part.
 *
 * SPFx uses AMD modules (define()) for localization files.
 * The framework loads the appropriate locale file at runtime
 * based on the user's language setting. To add a new language,
 * create a new file (e.g., fr-fr.js) following the same structure.
 */
define([], function () {
  return {
    // Property pane header
    PropertyPaneDescription: 'Configure Navigation Tabs to display links from a SharePoint list organized by categories.',

    // Property pane group names
    DataGroupName: 'Data Source',
    LayoutGroupName: 'Layout & Display',
    ListGeneratorGroupName: 'List Generator',
    TabOrderGroupName: 'Tab Order',

    // Data Source group
    ListFieldLabel: 'Select a list',

    // List Generator group
    NewListNameFieldLabel: 'New list name',
    NewListNameDescription: 'Creates a new SharePoint list with all the required columns for Navigation Tabs.',
    NewListNamePlaceholder: 'e.g. Navigation Links',
    CreateListButtonLabel: 'Create List',
    CreatingListButtonLabel: 'Creating...',

    // Tab Order group
    TabOrderFieldLabel: 'Use arrows to reorder tabs',

    // Layout & Display group
    LayoutTypeFieldLabel: 'Layout type',
    CardsPerRowFieldLabel: 'Items per row',
    ShowDescriptionsFieldLabel: 'Show descriptions (Card layout)',
    OpenInNewTabFieldLabel: 'Open links in new tab by default',
    LayoutCardLabel: 'Card Grid',
    LayoutCompactLabel: 'Compact List',
    LayoutTileLabel: 'Tiles',

    // Edit list button
    EditListLinkText: 'Edit list items',

    // Component UI messages
    NoListSelectedMessage: 'Configure Navigation Tabs',
    NoListSelectedDescription: 'Select a list in the web part properties to display navigation links.',
    LoadingMessage: 'Loading navigation links...',
    ErrorMessage: 'An error occurred while loading navigation links.',
    EmptyMessage: 'No active navigation links found in the selected list.',
  };
});
