/**
 * NavigationTabsWebPart
 *
 * SPFx web part entry point. This class handles:
 * - Initializing the PnPjs SPFI instance with the web part context
 * - Building the property pane UI (list picker, list generator, tab order, layout settings)
 * - Creating new SharePoint lists via the List Generator
 * - Rendering the NavigationTabs React component into the DOM
 * - Synchronizing discovered categories from the React component back into the property pane
 *
 * The property pane has two modes:
 * 1. **Setup mode** (no list selected): Shows the list picker and List Generator
 * 2. **Configured mode** (list selected): Shows the list picker, an "Edit list" link,
 *    the tab order control, and all layout/display settings
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';

import * as strings from 'NavigationTabsWebPartStrings';
import { NavigationTabs, INavigationTabsProps } from './components/NavigationTabs';
import { INavigationTabsWebPartProps } from './INavigationTabsWebPartProps';
import { getSP } from './services/pnpjsConfig';
import { NavigationLinksService } from './services/NavigationLinksService';

export default class NavigationTabsWebPart extends BaseClientSideWebPart<INavigationTabsWebPartProps> {

  /** Prevents duplicate list creation clicks while an operation is in flight. */
  private _isCreatingList: boolean = false;

  /** Server-relative URL of the selected list's root folder (e.g., "/sites/X/Lists/NavLinks"). */
  private _listUrl: string = '';

  /** Tracks whether the web part has been disposed to prevent stale property pane refreshes. */
  private _disposed: boolean = false;

  /** Category names discovered from the most recent data fetch, used by the tab order control. */
  private _discoveredCategories: string[] = [];

  /**
   * Called once when the web part is first loaded. Initializes the PnPjs
   * singleton with the SPFx context so all service calls can authenticate.
   */
  public onInit(): Promise<void> {
    getSP(this.context);
    return super.onInit().then(() => this._resolveListUrl());
  }

  /**
   * Called by the SPFx runtime whenever a property pane field value changes.
   * When the selected list changes, resets the category order and re-renders.
   */
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === 'listId' && oldValue !== newValue) {
      // New list selected — clear stale category data from the previous list
      this.properties.categoryOrder = [];
      this._discoveredCategories = [];
      this._resolveListUrl();
      this._safeRefreshPane();
      this.render();
    }
  }

  /**
   * Callback passed to the NavigationTabs React component. Called whenever
   * the component discovers the category names from the fetched data.
   * Reconciles the discovered categories with the user's saved order.
   */
  private _onCategoriesDiscovered = (categories: string[]): void => {
    // Avoid unnecessary updates if categories haven't changed
    const key = categories.join('\n');
    const prevKey = this._discoveredCategories.join('\n');
    if (key === prevKey) return;

    this._discoveredCategories = categories;

    // Reconcile stored order with actual categories:
    // Keep existing ordered items that still exist in the data
    const currentOrder = this.properties.categoryOrder || [];
    const actualSet = new Set(categories);
    const reconciled = currentOrder.filter((c: string) => actualSet.has(c));

    // Append any new categories not yet in the stored order
    for (const cat of categories) {
      if (reconciled.indexOf(cat) === -1) {
        reconciled.push(cat);
      }
    }

    this.properties.categoryOrder = reconciled;
    this._safeRefreshPane();
  }

  /**
   * Resolves the server-relative URL of the selected list's root folder.
   * Used to build the "Edit list items" link in the property pane.
   */
  private _resolveListUrl(): void {
    if (!this.properties.listId) {
      this._listUrl = '';
      return;
    }
    const sp = getSP();
    sp.web.lists.getById(this.properties.listId).rootFolder.select('ServerRelativeUrl')()
      .then((folder: { ServerRelativeUrl: string }) => {
        this._listUrl = folder.ServerRelativeUrl;
        this._safeRefreshPane();
      })
      .catch(() => {
        this._listUrl = '';
      });
  }

  /** Renders the NavigationTabs React component with the current property values. */
  public render(): void {
    const element: React.ReactElement<INavigationTabsProps> = React.createElement(
      NavigationTabs,
      {
        listId: this.properties.listId,
        layoutType: this.properties.layoutType || 'card',
        cardsPerRow: this.properties.cardsPerRow || 3,
        showDescriptions: this.properties.showDescriptions !== false,
        openInNewTabDefault: this.properties.openInNewTabDefault !== false,
        categoryOrder: this.properties.categoryOrder || [],
        onCategoriesDiscovered: this._onCategoriesDiscovered,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** Cleans up the React component tree when the web part is removed from the page. */
  protected onDispose(): void {
    this._disposed = true;
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /**
   * Safely refreshes the property pane if it's currently open.
   * Catches errors that occur during HMR or when the pane is not rendered.
   */
  private _safeRefreshPane(): void {
    if (this._disposed) return;
    try {
      if (this.context.propertyPane.isRenderedByWebPart()) {
        this.context.propertyPane.refresh();
      }
    } catch {
      // Ignore — property pane not available (e.g. during HMR)
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Handler for the "Create List" button in the List Generator property pane group.
   * Creates a new SharePoint list with all required columns, then selects it
   * automatically in the list picker.
   */
  private _onCreateList = (): void => {
    const listName = this.properties.newListName;
    if (!listName || !listName.trim()) {
      alert('Please enter a name for the new list.');
      return;
    }

    // Prevent double-clicks while creation is in progress
    if (this._isCreatingList) return;
    this._isCreatingList = true;
    this._safeRefreshPane();

    NavigationLinksService.createList(listName.trim())
      .then((listId) => {
        // Auto-select the newly created list
        this.properties.listId = listId;
        this.properties.newListName = '';
        this._isCreatingList = false;
        this._resolveListUrl();
        this.render();
        alert(`List "${listName.trim()}" created successfully!`);

        // Close and reopen the property pane so the list picker refreshes
        // and shows the newly created list as the selected value
        try { this.context.propertyPane.close(); } catch { /* ignore */ }
        setTimeout(() => {
          try { this.context.propertyPane.open(); } catch { /* ignore */ }
        }, 600);
      })
      .catch((err) => {
        this._isCreatingList = false;
        this._safeRefreshPane();
        console.error('NavigationTabs: Failed to create list', err);
        const errMsg = String(err.message || err);
        if (errMsg.indexOf('already exists') !== -1) {
          alert(`A list named "${listName.trim()}" already exists on this site. Please choose a different name or select the existing list from the dropdown above.`);
        } else {
          alert(`Failed to create list: ${errMsg}`);
        }
      });
  }

  /**
   * Builds the property pane configuration.
   *
   * Two modes:
   * - **Setup mode** (no list selected): List picker + List Generator for creating a new list
   * - **Configured mode** (list selected): List picker + Edit link + Tab Order + Layout settings
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const hasList = !!this.properties.listId;

    // --- Data Source group: always shown in both modes ---
    const listPickerGroup = {
      groupName: strings.DataGroupName,
      groupFields: [
        PropertyFieldListPicker('listId', {
          label: strings.ListFieldLabel,
          selectedList: this.properties.listId,
          includeHidden: false,
          orderBy: PropertyFieldListPickerOrderBy.Title,
          onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
          properties: this.properties,
          // Cast required due to duplicate @microsoft/sp-component-base typings
          // between the web part and @pnp/spfx-property-controls packages
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context: this.context as any,
          key: 'listPickerFieldId',
          disabled: false,
        }),
      ],
    };

    if (!hasList) {
      // =====================================================
      // SETUP MODE: List picker + List Generator
      // =====================================================
      return {
        pages: [
          {
            header: {
              description: strings.PropertyPaneDescription,
            },
            groups: [
              listPickerGroup,
              {
                groupName: strings.ListGeneratorGroupName,
                groupFields: [
                  PropertyPaneTextField('newListName', {
                    label: strings.NewListNameFieldLabel,
                    description: strings.NewListNameDescription,
                    placeholder: strings.NewListNamePlaceholder,
                  }),
                  PropertyPaneButton('createList', {
                    text: this._isCreatingList ? strings.CreatingListButtonLabel : strings.CreateListButtonLabel,
                    buttonType: PropertyPaneButtonType.Primary,
                    icon: 'Add',
                    disabled: this._isCreatingList,
                    onClick: this._onCreateList,
                  }),
                ],
              },
            ],
          },
        ],
      };
    }

    // =====================================================
    // CONFIGURED MODE: Full settings
    // =====================================================
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            listPickerGroup,

            // "Edit list items" button — opens the list in a new tab for data entry
            {
              groupFields: [
                PropertyPaneButton('editListLink', {
                  text: strings.EditListLinkText,
                  buttonType: PropertyPaneButtonType.Command,
                  icon: 'Edit',
                  onClick: () => {
                    // Prefer the resolved list URL; fall back to the list settings page
                    const url = this._listUrl
                      ? `${window.location.origin}${this._listUrl}`
                      : `${this.context.pageContext.web.absoluteUrl}/_layouts/15/listedit.aspx?List=%7B${this.properties.listId}%7D`;
                    window.open(url, '_blank');
                    return undefined;
                  },
                }),
              ],
            },

            // Tab Order group — drag-and-drop reordering of category tabs
            {
              groupName: strings.TabOrderGroupName,
              groupFields: [
                PropertyFieldOrder('categoryOrder', {
                  key: 'categoryOrderFieldId',
                  label: strings.TabOrderFieldLabel,
                  items: this.properties.categoryOrder || [],
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                }),
              ],
            },

            // Layout & Display group — visual configuration options
            {
              groupName: strings.LayoutGroupName,
              groupFields: [
                PropertyPaneDropdown('layoutType', {
                  label: strings.LayoutTypeFieldLabel,
                  options: [
                    { key: 'card', text: strings.LayoutCardLabel },
                    { key: 'compact', text: strings.LayoutCompactLabel },
                    { key: 'tile', text: strings.LayoutTileLabel },
                  ],
                  selectedKey: this.properties.layoutType || 'card',
                }),
                PropertyPaneSlider('cardsPerRow', {
                  label: strings.CardsPerRowFieldLabel,
                  min: 2,
                  max: 6,
                  value: this.properties.cardsPerRow || 3,
                  step: 1,
                }),
                PropertyPaneToggle('showDescriptions', {
                  label: strings.ShowDescriptionsFieldLabel,
                  checked: this.properties.showDescriptions !== false,
                }),
                PropertyPaneToggle('openInNewTabDefault', {
                  label: strings.OpenInNewTabFieldLabel,
                  checked: this.properties.openInNewTabDefault !== false,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
