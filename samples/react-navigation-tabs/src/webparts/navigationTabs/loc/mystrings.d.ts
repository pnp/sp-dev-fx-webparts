/**
 * TypeScript type declarations for the localization strings module.
 *
 * This interface ensures type safety when accessing localized strings
 * via `import * as strings from 'NavigationTabsWebPartStrings'`.
 * Each property maps to a key in the locale files (e.g., en-us.js).
 */
declare interface INavigationTabsWebPartStrings {
  // Property pane
  PropertyPaneDescription: string;
  DataGroupName: string;
  LayoutGroupName: string;
  ListFieldLabel: string;
  LayoutTypeFieldLabel: string;
  CardsPerRowFieldLabel: string;
  ShowDescriptionsFieldLabel: string;
  OpenInNewTabFieldLabel: string;
  LayoutCardLabel: string;
  LayoutCompactLabel: string;
  LayoutTileLabel: string;

  // Component UI messages
  NoListSelectedMessage: string;
  NoListSelectedDescription: string;
  LoadingMessage: string;
  ErrorMessage: string;
  EmptyMessage: string;

  // Edit list button
  EditListLinkText: string;

  // List Generator
  ListGeneratorGroupName: string;
  NewListNameFieldLabel: string;
  NewListNameDescription: string;
  NewListNamePlaceholder: string;
  CreateListButtonLabel: string;
  CreatingListButtonLabel: string;

  // Tab Order
  TabOrderGroupName: string;
  TabOrderFieldLabel: string;
}

declare module 'NavigationTabsWebPartStrings' {
  const strings: INavigationTabsWebPartStrings;
  export = strings;
}
