import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneLabel,
  IPropertyPaneField,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './PiCanvasWebPart.module.scss';
import * as strings from 'PiCanvasWebPartStrings';
import { PropertyPaneTabPreview } from './PropertyPaneTabPreview';
import { PropertyPaneContentPreview } from './PropertyPaneContentPreview';

import $ from 'jquery';

// Extend Window interface for jQuery globals
interface WindowWithJQuery extends Window {
  jQuery?: typeof $;
  $?: typeof $;
}

// Make jQuery available globally for AddTabs.js which expects jQuery/$ on window
(window as WindowWithJQuery).jQuery = $;
(window as WindowWithJQuery).$ = $;

import PnPTelemetry from '@pnp/telemetry-js';

// Template imports
import { TemplateService } from './services/TemplateService';
import { ITemplateListItem } from './models/TemplateModels';

// Content renderer for custom content types (markdown, html, mermaid, embed)
import { ContentRenderer } from './services/ContentRenderer';

// Permission imports
import { PermissionService, ITabPermissionConfig, IPermissionCheckResult } from './services/PermissionService';

export interface ITabDataItem {
  WebPartID: string;
  TabLabel: string;
  originalTabIndex?: number; // Track original index for property lookup after filtering
  isPlaceholder?: boolean; // True if this is a permission-restricted placeholder tab
  placeholderText?: string; // Custom message to show on placeholder tabs
}

export interface IPiCanvasWebPartProps {
  description: string;
  sectionClass: string;
  webpartClass: string;
  tabCount: number;
  tabData: ITabDataItem[];
  themeMode: 'auto' | 'light' | 'dark';
  tabStyle: 'default' | 'pills' | 'underline' | 'boxed';
  tabAlignment: 'left' | 'center' | 'right' | 'stretch';

  // Color customization
  accentColor: string;
  tabTextColor: string;
  tabActiveTextColor: string;
  tabBackgroundColor: string;
  tabActiveBackgroundColor: string;
  tabHoverBackgroundColor: string;

  // Typography
  tabFontSize: string;
  tabFontWeight: string;

  // Spacing
  tabPaddingVertical: string;
  tabPaddingHorizontal: string;
  tabGap: string;

  // Borders & Effects
  tabBorderRadius: string;
  activeIndicatorWidth: string;
  tabShadow: string;
  enableTransitions: boolean;

  // Active Indicator & Separators
  showActiveIndicator: boolean;
  activeIndicatorColor: string;
  showTabSeparator: boolean;
  tabSeparatorColor: string;

  // Content Gap
  tabContentGap: string;

  // Tab Layout
  tabOrientation: 'horizontal' | 'vertical';
  verticalTabPosition: 'left' | 'right';
  verticalTabWidth: string;

  // Label Image Settings
  labelImageHeight: string;

  // Features (v3.0.0+)
  enableDeepLinking: boolean;   // URL hash navigation (default: true)
  enableLazyLoading: boolean;   // Lazy load tab content (default: true)

  // Dynamic properties for tab configuration (tab1WebPartID, tab1Label, tab2WebPartID, tab2Label, etc.)
  // Also supports per-tab images: tab1Image (URL string), tab1ImagePosition, etc.
  // Also supports per-tab dividers: tab1DividerAfter (boolean)
  // Also supports per-tab content types (v3.0): tab1ContentType, tab1CustomContent, tab1EmbedUrl, tab1EmbedHeight
  [key: string]: string | number | boolean | ITabDataItem[] | undefined;
}

// Version info - pulled from package.json at build time
const PICANVAS_VERSION = '3.0.0';
const SPFX_VERSION = '1.22.0';
const NODE_VERSION = '18.x / 22.x';

type FeatureView = 'home' | 'tabbed-layouts' | 'section-support' | 'theme-aware' | 'permission-based' | 'content-markdown' | 'content-html' | 'content-iframe' | 'content-mermaid';

export default class PiCanvasWebPart extends BaseClientSideWebPart<IPiCanvasWebPartProps> {
  private static readonly MAX_TABS = 20;
  private static readonly TAB_PROPERTY_SUFFIXES: ReadonlyArray<string> = [
    'WebPartID',
    'Label',
    'ContentType',
    'CustomContent',
    'EmbedUrl',
    'EmbedHeight',
    'LabelType',
    'LabelWebPartID',
    'Icon',
    'Image',
    'ImagePosition',
    'DividerAfter',
    'PermissionEnabled',
    'PermissionGroups',
    'PermissionCustomGroups',
    'PermissionPlaceholder',
    'PermissionPlaceholderText'
  ];

  private _zonesCache: Array<[string, string]> = [];
  private _currentHighlightedElement: HTMLElement | null = null;
  private _currentView: FeatureView = 'home';
  private _isPropertyPaneOpen: boolean = false;

  /**
   * GLOBAL REGISTRY: Tracks which webparts are owned by which PiCanvas instance.
   * Key = webpart element key (e.g., "wp-123" or "SECTION:abc")
   * Value = { instanceId: string, $element: JQuery }
   * This allows multiple PiCanvas instances to coordinate webpart ownership.
   */
  private static _globalWebpartRegistry: Map<string, { instanceId: string; $element: JQuery<HTMLElement> }> = new Map();

  /**
   * GLOBAL EVENT SETUP: Ensures cross-instance tab change handling is only set up once
   */
  private static _globalEventHandlerInitialized: boolean = false;

  // Template management
  private _templateService: TemplateService | null = null;
  private _availableTemplates: ITemplateListItem[] = [];
  private _isLoadingTemplates: boolean = false;
  private _hasSiteAssetsAccess: boolean = true;
  private _selectedTemplateId: string = '';

  // Permission management
  private _permissionService: PermissionService | null = null;
  private _permissionData: IPermissionCheckResult | null = null;
  private _permissionDataLoading: boolean = false;

  /**
   * Security: Encode HTML entities to prevent XSS attacks
   * @param str - The string to encode
   * @returns HTML-encoded string safe for insertion into HTML
   */
  private encodeHtml(str: string): string {
    if (!str) return '';
    // Safety: ensure we have a string, not an object
    const safeStr = typeof str === 'string' ? str : String(str);
    return safeStr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Security: Validate and sanitize image URLs
   * Only allows http, https, and data URIs (for base64 images)
   * @param url - The URL to validate
   * @returns Sanitized URL or empty string if invalid
   */
  private sanitizeImageUrl(url: string): string {
    if (!url) return '';
    const trimmedUrl = url.trim();
    // Allow only safe protocols
    if (trimmedUrl.startsWith('https://') ||
        trimmedUrl.startsWith('http://') ||
        trimmedUrl.startsWith('data:image/') ||
        trimmedUrl.startsWith('/')) {
      // Encode any special characters in the URL
      return trimmedUrl.replace(/"/g, '%22').replace(/'/g, '%27');
    }
    // Block javascript:, vbscript:, and other potentially dangerous protocols
    return '';
  }

  protected async onInit(): Promise<void> {
    // Suppress unhandled promise rejections from SharePoint workbench internal code
    // These are not PiCanvas errors but trigger webpack-dev-server's error overlay
    // Only active in development mode (DEBUG flag is set by build process)
    if (DEBUG) {
      // Helper function to check if error is from SharePoint internal code
      const isSharePointInternalError = (reason: unknown): boolean => {
        if (reason === undefined || reason === null) {
          return true; // SharePoint often rejects with undefined/null
        }
        const errorStack = (reason as Error)?.stack || '';
        const errorMessage = (reason as Error)?.message || String(reason);
        return (
          errorStack.includes('sp-webpart-workbench') ||
          errorStack.includes('sp-canvas') ||
          errorStack.includes('sp-mysitecache') ||
          errorStack.includes('spserviceworker') ||
          errorStack.includes('PersonalCache') ||
          errorMessage.includes('PersonalCache') ||
          errorMessage === '' ||
          errorMessage === 'undefined'
        );
      };

      // Method 1: Add handler in capture phase (runs before bubble phase handlers)
      window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
        if (isSharePointInternalError(event.reason)) {
          event.preventDefault();
          event.stopImmediatePropagation(); // Prevent other handlers from running
          console.warn('[PiCanvas] Suppressed SharePoint internal error:', event.reason);
          return false;
        }
      }, { capture: true });

      // Method 2: Override window.onunhandledrejection property
      // This catches cases where webpack-dev-server uses the property directly
      const originalHandler = window.onunhandledrejection;
      Object.defineProperty(window, 'onunhandledrejection', {
        get: () => originalHandler,
        set: (handler) => {
          // Wrap any handler that gets set to filter SharePoint errors
          if (handler && typeof handler === 'function') {
            const wrappedHandler = (event: PromiseRejectionEvent) => {
              if (isSharePointInternalError(event.reason)) {
                event.preventDefault();
                console.warn('[PiCanvas] Suppressed SharePoint error (property handler):', event.reason);
                return;
              }
              return handler.call(window, event);
            };
            // Store wrapped handler but don't call the original setter
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any)._wrappedUnhandledRejection = wrappedHandler;
          }
        },
        configurable: true
      });

      // Method 3: Also suppress via error event (some overlays use this)
      window.addEventListener('error', (event: ErrorEvent) => {
        const errorStack = event.error?.stack || '';
        const errorMessage = event.message || '';
        if (
          errorStack.includes('sp-webpart-workbench') ||
          errorStack.includes('PersonalCache') ||
          errorMessage.includes('Unknown') ||
          errorMessage === ''
        ) {
          event.preventDefault();
          event.stopImmediatePropagation();
          console.warn('[PiCanvas] Suppressed SharePoint internal error (error event):', event.error);
          return false;
        }
      }, { capture: true });

      // Method 4: Remove webpack-dev-server overlay when it appears
      // The overlay is added to the DOM, so we can watch for it and remove it
      const removeOverlay = (): void => {
        // webpack-dev-server creates an iframe with id 'webpack-dev-server-client-overlay'
        // or a div with similar naming patterns
        const selectors = [
          '#webpack-dev-server-client-overlay',
          '#webpack-dev-server-client-overlay-div',
          '[id*="webpack"][id*="overlay"]',
          'iframe[src*="overlay"]'
        ];

        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            console.warn('[PiCanvas] Removed webpack-dev-server overlay element');
            el.remove();
          });
        });
      };

      // Run immediately in case overlay already exists
      removeOverlay();

      // Watch for overlay being added to DOM
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                const id = node.id || '';
                const tagName = node.tagName?.toLowerCase() || '';
                // Check if this looks like a webpack overlay
                if (
                  id.includes('webpack') ||
                  id.includes('overlay') ||
                  (tagName === 'iframe' && (node as HTMLIFrameElement).src?.includes('overlay'))
                ) {
                  console.warn('[PiCanvas] Detected and removed overlay element:', id || tagName);
                  node.remove();
                }
              }
            });
          }
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }

    const telemetry = PnPTelemetry.getInstance();
    telemetry.optOut();
    // Load CSS for highlight styles (needed in edit mode for property pane interactions)
    require('./AddTabs.css');

    // Initialize template service
    this._templateService = new TemplateService(this.context);

    // Initialize permission service
    this._permissionService = new PermissionService(this.context);

    // Load available templates in background (don't block init)
    this.loadAvailableTemplates().catch(err => {
      console.warn('Failed to load templates:', err);
    });

    // Load site-level embed allow list for custom content embeds (v3.0)
    ContentRenderer.loadSiteAllowList(this.context).catch(err => {
      console.warn('Failed to load embed allow list:', err);
    });

    // Wait for permission data to load before render (for correct filtering on first render)
    // This adds a small delay but ensures permissions work correctly
    await this.loadPermissionData().catch(err => {
      console.warn('Failed to load permission data:', err);
    });

    return super.onInit();
  }

  /**
   * Load available templates from built-ins and Site Assets
   */
  private async loadAvailableTemplates(): Promise<void> {
    if (!this._templateService) return;

    this._isLoadingTemplates = true;
    try {
      // Check Site Assets access
      this._hasSiteAssetsAccess = await this._templateService.checkSiteAssetsAccess();

      // Load all templates
      this._availableTemplates = await this._templateService.getAvailableTemplates();
    } catch (error) {
      console.error('Failed to load templates:', error);
      this._availableTemplates = [];
    }
    this._isLoadingTemplates = false;
  }

  /**
   * Load user's permission data from SharePoint
   * This is called on init and cached for subsequent renders
   */
  private async loadPermissionData(): Promise<void> {
    if (!this._permissionService || this._permissionDataLoading) return;

    this._permissionDataLoading = true;
    try {
      this._permissionData = await this._permissionService.getUserPermissionData();
    } catch (error) {
      console.error('Failed to load permission data:', error);
      this._permissionData = null;
    }
    this._permissionDataLoading = false;
  }

  /**
   * Get permission configuration for a specific tab
   */
  private getTabPermissionConfig(tabIndex: number): ITabPermissionConfig {
    const enabled = this.properties[`tab${tabIndex}PermissionEnabled`] as boolean || false;

    // Parse standard groups (stored as comma-separated string)
    const standardGroupsStr = (this.properties[`tab${tabIndex}PermissionGroups`] as string) || '';
    const validGroups = ['Owners', 'Members', 'Visitors'];
    const standardGroups = standardGroupsStr
      .split(',')
      .filter(g => g.trim().length > 0)
      .filter(g => validGroups.indexOf(g) !== -1) as ('Owners' | 'Members' | 'Visitors')[];

    // Parse custom group IDs (stored as comma-separated string of numbers)
    const customGroupIdsStr = (this.properties[`tab${tabIndex}PermissionCustomGroups`] as string) || '';
    const customGroupIds = customGroupIdsStr
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id) && id > 0);

    return {
      enabled,
      standardGroups,
      customGroupIds
    };
  }

  /**
   * Check if the current user has permission to view a tab
   * @param tabIndex - 1-based tab index
   * @returns true if visible, false if hidden
   */
  private isTabVisibleToUser(tabIndex: number): boolean {
    // If permission data not loaded yet, show all tabs (graceful degradation)
    if (!this._permissionService || !this._permissionData) {
      return true;
    }

    const config = this.getTabPermissionConfig(tabIndex);
    return this._permissionService.checkTabPermission(config, this._permissionData);
  }

  /**
   * Initialize Mermaid diagrams for the first active tab (v3.0)
   * Other tabs will be initialized via lazy loading
   */
  private initializeMermaidDiagrams(tabsDiv: string): void {
    // Use getElementById to handle IDs with special characters (base64 =, +, /)
    const tabsElement = document.getElementById(tabsDiv);
    if (!tabsElement) {
      console.warn('[PiCanvas] Could not find tabs element for mermaid initialization:', tabsDiv);
      return;
    }

    console.log('[PiCanvas] Looking for mermaid containers in active tab...');
    console.log('[PiCanvas] tabsElement:', tabsElement);
    console.log('[PiCanvas] siblings:', $(tabsElement).siblings().length);

    // Find first active tab's mermaid containers
    // The structure is: tabHolder (tabsElement) + content panels (.addui-Tabs-content) as siblings
    const $activeContent = $(tabsElement).siblings('.addui-Tabs-content.addui-Tabs-active').find('.picanvas-mermaid-container');

    console.log('[PiCanvas] Found mermaid containers:', $activeContent.length);

    if ($activeContent.length === 0) {
      // Try alternate selector - the content might be inside the parent container
      const $parent = $(tabsElement).parent('[data-addui="tabs"]');
      const $altContent = $parent.find('.addui-Tabs-content.addui-Tabs-active .picanvas-mermaid-container');
      console.log('[PiCanvas] Alt selector found:', $altContent.length);

      $altContent.each((_i, el) => {
        console.log('[PiCanvas] Rendering mermaid (alt):', el);
        ContentRenderer.renderMermaidElement(el as HTMLElement).catch(err => {
          console.warn('[PiCanvas] Failed to render mermaid diagram:', err);
        });
      });
      return;
    }

    $activeContent.each((_i, el) => {
      console.log('[PiCanvas] Rendering mermaid:', el);
      ContentRenderer.renderMermaidElement(el as HTMLElement).catch(err => {
        console.warn('[PiCanvas] Failed to render mermaid diagram:', err);
      });
    });
  }

  /**
   * Initialize deep linking support (v3.0)
   * Reads URL hash and activates corresponding tab, updates hash on tab change
   */
  private initializeDeepLinking(tabsDiv: string): void {
    // Check if deep linking is enabled (default: true)
    if (this.properties.enableDeepLinking === false) {
      return;
    }

    // Use getElementById to handle IDs with special characters (base64 =, +, /)
    const tabsElement = document.getElementById(tabsDiv);
    if (!tabsElement) return;

    const $tabsContainer = $(tabsElement).parent('[data-addui="tabs"]');
    if (!$tabsContainer.length) return;

    // Get the activation function exposed by AddTabs.js
    const activateTab = $tabsContainer.data('picanvas-activate-tab');
    const findTab = $tabsContainer.data('picanvas-find-tab');

    if (!activateTab || !findTab) return;

    // Read URL hash on initial load
    const hash = window.location.hash.substring(1); // Remove #
    if (hash) {
      // Try to find tab by label text first
      let tabIndex = findTab(hash);

      // If not found by label, try numeric index (e.g., #tab-2)
      if (tabIndex === -1 && hash.match(/^tab-\d+$/)) {
        tabIndex = parseInt(hash.replace('tab-', ''), 10) - 1;
      }

      if (tabIndex >= 0) {
        activateTab(tabIndex);
      }
    }

    // Listen for tab changes and update URL hash
    $tabsContainer.on('picanvas:tab-change', (_e: JQuery.Event, data: { tabIndex: number; tabElement: JQuery }) => {
      const $tab = data.tabElement;
      const tabText = $tab.text().trim().toLowerCase().replace(/\s+/g, '-');
      const newHash = tabText || `tab-${data.tabIndex + 1}`;

      // Update URL without triggering page scroll
      if (history.replaceState) {
        history.replaceState(null, '', `#${newHash}`);
      }
    });
  }

  /**
   * Initialize lazy loading event handlers (v3.0)
   * Listens for tab activation and initializes mermaid diagrams in lazy-loaded panels
   */
  private initializeLazyLoadEvents(tabsDiv: string): void {
    // Check if lazy loading is enabled (default: true)
    if (this.properties.enableLazyLoading === false) {
      return;
    }

    // Use getElementById to handle IDs with special characters (base64 =, +, /)
    const tabsElement = document.getElementById(tabsDiv);
    if (!tabsElement) return;

    const $tabsContainer = $(tabsElement).parent('[data-addui="tabs"]');
    if (!$tabsContainer.length) return;

    // Listen for lazy load events from AddTabs.js
    $tabsContainer.on('picanvas:lazy-load', '.hillbilly-tab-content', (e: JQuery.TriggeredEvent) => {
      const $panel = $(e.currentTarget as HTMLElement);

      // Initialize mermaid diagrams in this panel
      const $mermaidContainers = $panel.find('.picanvas-mermaid-container');
      $mermaidContainers.each((_i, el) => {
        ContentRenderer.renderMermaidElement(el as HTMLElement).catch(err => {
          console.warn('[PiCanvas] Failed to render lazy-loaded mermaid diagram:', err);
        });
      });
    });
  }

  /**
   * Initialize shared webpart handling - moves webparts between tabs when the same
   * webpart is assigned to multiple tabs. Since React components can't be cloned,
   * we move the single instance to whichever tab is currently active.
   */
  private initializeSharedWebpartHandling(tabsDiv: string, usedElements: Map<string, JQuery<HTMLElement>>): void {
    const tabsElement = document.getElementById(tabsDiv);
    if (!tabsElement) return;

    const $tabsContainer = $(tabsElement).parent('[data-addui="tabs"]');
    if (!$tabsContainer.length) return;

    // Listen for tab changes
    $tabsContainer.on('picanvas:tab-change', (_e: JQuery.Event, data: { tabIndex: number; panelElement: JQuery }) => {
      const $activePanel = data.panelElement;

      // Check if the active panel expects a shared webpart
      const sharedWebpartId = $activePanel.attr('data-shared-webpart-id');
      if (sharedWebpartId) {
        console.log(`[PiCanvas] Tab change: Moving shared webpart "${sharedWebpartId}" to active tab`);

        // Find the shared webpart (it's currently in another tab panel)
        const $sharedWebpart = $tabsContainer.find(`[data-picanvas-webpart-id="${sharedWebpartId}"]`);
        if ($sharedWebpart.length) {
          // Move the webpart to this panel
          $activePanel.append($sharedWebpart);

          // Force images to reload after moving
          this.forceImageWebpartLoad($sharedWebpart);

          // Trigger resize to help lazy-loaded content
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 50);
        }
      }
    });

    console.log(`[PiCanvas] Shared webpart handling initialized for ${usedElements.size} elements`);
  }

  /**
   * Generate template dropdown options for property pane
   */
  private getTemplateOptions(): IPropertyPaneDropdownOption[] {
    const options: IPropertyPaneDropdownOption[] = [
      { key: '', text: strings.SelectTemplatePlaceholder }
    ];

    // Built-in templates
    const builtIn = this._availableTemplates.filter(t => t.isBuiltIn);
    if (builtIn.length > 0) {
      options.push({ key: 'divider1', text: strings.BuiltInTemplatesHeader });
      builtIn.forEach(t => {
        options.push({ key: t.templateId, text: t.templateName });
      });
    }

    // Saved templates
    const saved = this._availableTemplates.filter(t => !t.isBuiltIn);
    if (saved.length > 0) {
      options.push({ key: 'divider2', text: strings.SavedTemplatesHeader });
      saved.forEach(t => {
        options.push({ key: t.templateId, text: t.templateName });
      });
    }

    return options;
  }

  /**
   * Apply selected template handler
   */
  private async applySelectedTemplate(): Promise<void> {
    if (!this._templateService || !this._selectedTemplateId || this._selectedTemplateId.startsWith('divider')) {
      return;
    }

    try {
      const template = await this._templateService.loadTemplate(this._selectedTemplateId);
      if (template) {
        this._templateService.applyTemplate(template, this.properties);
        this._selectedTemplateId = ''; // Reset selection
        this.context.propertyPane.refresh();
        this.render();
      }
    } catch (error) {
      console.error('[PiCanvas] Failed to apply template:', error);
    }
  }

  /**
   * Export configuration to JSON file download
   */
  private exportConfiguration(): void {
    if (!this._templateService) return;

    const templateName = `PiCanvas-Export-${new Date().toISOString().split('T')[0]}`;
    const jsonContent = this._templateService.exportToJson(this.properties, templateName);

    // Create download
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Import configuration from JSON file
   */
  private importConfiguration(): void {
    if (!this._templateService) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event): void => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event): void => {
          try {
            const jsonContent = event.target?.result as string;
            const template = this._templateService?.parseImportedJson(jsonContent);
            if (template && this._templateService) {
              this._templateService.applyTemplate(template, this.properties);
              this.context.propertyPane.refresh();
              this.render();
              alert(strings.ImportSuccessMessage);
            } else {
              alert(strings.ImportErrorMessage);
            }
          } catch (error) {
            console.error('[PiCanvas] Import error:', error);
            alert(strings.ImportErrorMessage);
          }
        };
        reader.onerror = (error): void => {
          console.error('[PiCanvas] File read error:', error);
          alert(strings.ImportErrorMessage);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  /**
   * Save current configuration as template to Site Assets
   */
  private async saveAsTemplate(): Promise<void> {
    if (!this._templateService) return;

    const templateName = prompt(strings.TemplateNamePrompt, 'My Custom Template');
    if (templateName) {
      const template = this._templateService.propertiesToTemplate(this.properties, templateName);
      const success = await this._templateService.saveTemplate(template);
      if (success) {
        await this.loadAvailableTemplates();
        this.context.propertyPane.refresh();
        alert(strings.SaveTemplateSuccessMessage);
      } else {
        alert(strings.SaveTemplateErrorMessage);
      }
    }
  }

  /**
   * Get template group fields for property pane
   */
  private getTemplateGroupFields(): IPropertyPaneField<unknown>[] {
    const fields: IPropertyPaneField<unknown>[] = [];

    // Description
    fields.push(PropertyPaneLabel('templateInfo', {
      text: strings.TemplatesDescription
    }));

    // Show warning if Site Assets not accessible
    if (!this._hasSiteAssetsAccess) {
      fields.push(PropertyPaneLabel('permissionWarning', {
        text: '⚠️ ' + strings.NoSiteAssetsAccess
      }));
    }

    // Loading indicator
    if (this._isLoadingTemplates) {
      fields.push(PropertyPaneLabel('loadingTemplates', {
        text: 'Loading templates...'
      }));
    } else {
      // Template dropdown
      fields.push(PropertyPaneDropdown('_selectedTemplateId', {
        label: strings.ApplyTemplateLabel,
        options: this.getTemplateOptions(),
        selectedKey: this._selectedTemplateId
      }));

      // Apply button
      fields.push(PropertyPaneButton('applyTemplate', {
        text: strings.ApplyTemplateButton,
        buttonType: PropertyPaneButtonType.Primary,
        onClick: () => {
          this.applySelectedTemplate().catch(err => {
            console.error('[PiCanvas] Apply template error:', err);
          });
        }
      }));
    }

    // Export/Import separator
    fields.push(PropertyPaneLabel('exportImportHeader', {
      text: `─── ${strings.ExportImportHeader} ───`
    }));

    // Export button
    fields.push(PropertyPaneButton('exportConfig', {
      text: strings.ExportConfigLabel,
      buttonType: PropertyPaneButtonType.Normal,
      onClick: () => this.exportConfiguration()
    }));

    // Import button
    fields.push(PropertyPaneButton('importConfig', {
      text: strings.ImportConfigLabel,
      buttonType: PropertyPaneButtonType.Normal,
      onClick: () => this.importConfiguration()
    }));

    // Save as template button (only if Site Assets accessible)
    if (this._hasSiteAssetsAccess) {
      fields.push(PropertyPaneButton('saveAsTemplate', {
        text: strings.SaveAsTemplateLabel,
        buttonType: PropertyPaneButtonType.Normal,
        onClick: () => {
          this.saveAsTemplate().catch(err => {
            console.error('[PiCanvas] Save template error:', err);
          });
        }
      }));
    }

    return fields;
  }

  /**
   * Detect if dark mode is active based on manual setting or auto-detection
   */
  private isDarkMode(): boolean {
    // Check manual override first
    const themeMode = this.properties.themeMode || 'auto';
    if (themeMode === 'light') return false;
    if (themeMode === 'dark') return true;

    // Auto-detection mode
    // 1. Check SharePoint theme variant (most reliable)
    const themeState = (window as unknown as { __themeState__?: { theme?: { isInverted?: boolean } } }).__themeState__;
    if (themeState?.theme?.isInverted === true) {
      return true;
    }
    if (themeState?.theme?.isInverted === false) {
      return false;
    }

    // 2. Check section background color luminance
    const section = this.domElement.closest('[data-automation-id="CanvasSection"]');
    if (section) {
      const bgColor = window.getComputedStyle(section).backgroundColor;
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const luminance = (0.299 * parseInt(rgb[0]) + 0.587 * parseInt(rgb[1]) + 0.114 * parseInt(rgb[2])) / 255;
          return luminance < 0.5;
        }
      }
    }

    // 3. Default to light mode (most SharePoint pages are light)
    return false;
  }

  /**
   * Force SharePoint Image webpart images to load after cloning.
   * SharePoint Image webparts use lazy loading and React state that doesn't
   * survive jQuery DOM cloning. This method copies background images from
   * original elements and forces img tags to reload.
   * @param $clonedWebpart - The jQuery element containing the cloned webpart
   */
  private forceImageWebpartLoad($clonedWebpart: JQuery<HTMLElement>): void {
    console.log('[PiCanvas] forceImageWebpartLoad: Starting image load fix for cloned webpart');

    // Method 1: Copy background-image styles from computed styles
    // SharePoint sets background-image via React after mount, which gets lost on clone
    $clonedWebpart.find('[style*="background"]').addBack('[style*="background"]').each(function() {
      const el = this as HTMLElement;
      const computedStyle = window.getComputedStyle(el);
      const bgImage = computedStyle.backgroundImage;
      if (bgImage && bgImage !== 'none') {
        console.log('[PiCanvas] forceImageWebpartLoad: Found background-image:', bgImage.substring(0, 100));
        el.style.backgroundImage = bgImage;
      }
    });

    // Method 2: Find SharePoint Image webpart containers and copy their image src
    // Image webparts use data-automation-id="imageWebPart" or similar
    $clonedWebpart.find('[data-automation-id*="image"], [data-automation-id*="Image"]').each(function() {
      const $container = $(this);
      console.log('[PiCanvas] forceImageWebpartLoad: Found Image webpart container');

      // Find img elements and force reload
      $container.find('img').each(function() {
        const $img = $(this);
        const src = $img.attr('src') || $img.attr('data-src');
        if (src) {
          console.log('[PiCanvas] forceImageWebpartLoad: Forcing img reload:', src.substring(0, 100));
          // Remove and re-add src to force reload
          $img.removeAttr('src');
          setTimeout(() => {
            $img.attr('src', src);
          }, 10);
        }
      });
    });

    // Method 3: Handle lazy-loaded images with data-src
    $clonedWebpart.find('img[data-src]').each(function() {
      const $img = $(this);
      const dataSrc = $img.attr('data-src');
      if (dataSrc) {
        console.log('[PiCanvas] forceImageWebpartLoad: Loading lazy image from data-src');
        $img.attr('src', dataSrc);
        $img.removeAttr('data-src');
      }
    });

    // Method 4: Force all img elements with loading="lazy" to reload
    $clonedWebpart.find('img[loading="lazy"]').each(function() {
      const $img = $(this);
      const src = $img.attr('src');
      if (src) {
        console.log('[PiCanvas] forceImageWebpartLoad: Forcing lazy img reload');
        $img.attr('src', '');
        setTimeout(() => {
          $img.attr('src', src);
        }, 10);
      }
    });

    // Method 5: Trigger resize event to activate IntersectionObserver
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('[PiCanvas] forceImageWebpartLoad: Dispatched resize event');

      // Also force reflow
      if ($clonedWebpart[0]) {
        void $clonedWebpart[0].offsetHeight;
      }
    }, 50);
  }

  /**
   * Clear any existing highlight from the page
   */
  private clearHighlight(): void {
    if (this._currentHighlightedElement) {
      this._currentHighlightedElement.classList.remove('hillbilly-highlight', 'hillbilly-section-highlight');
      this._currentHighlightedElement = null;
    }
    // Also clear any stray highlights using native DOM
    document.querySelectorAll('.hillbilly-highlight, .hillbilly-section-highlight').forEach(el => {
      el.classList.remove('hillbilly-highlight', 'hillbilly-section-highlight');
    });
  }

  /**
   * Highlight a webpart or section by its ID
   */
  private highlightElement(elementId: string): void {
    this.clearHighlight();

    if (!elementId) {
      return;
    }

    let element: HTMLElement | null = null;
    let isSection = false;

    // Check if this is a section selection
    if (elementId.indexOf("SECTION:") === 0) {
      isSection = true;
      const sectionId = elementId.substring(8); // Remove "SECTION:" prefix
      element = document.querySelector(`[data-hillbilly-section-id="${sectionId}"]`);
    } else {
      // Individual webpart
      element = document.getElementById(elementId);
    }

    if (element) {
      this._currentHighlightedElement = element;
      const highlightClass = isSection ? 'hillbilly-section-highlight' : 'hillbilly-highlight';
      element.classList.add(highlightClass);

      // Scroll element into view smoothly
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Called when a property pane field value changes
   */
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // Handle template dropdown selection
    if (propertyPath === '_selectedTemplateId') {
      this._selectedTemplateId = newValue as string;
      return;
    }

    // Check if a tab content dropdown was changed
    if (propertyPath.match(/^tab\d+WebPartID$/)) {
      const selectedId = newValue as string;
      // Use setTimeout to apply highlight after any DOM updates complete
      setTimeout(() => {
        this.highlightElement(selectedId);
      }, 100);
    }

    // Check if a tab label web part dropdown was changed
    if (propertyPath.match(/^tab\d+LabelWebPartID$/)) {
      const selectedId = newValue as string;
      // Use setTimeout to apply highlight after any DOM updates complete
      setTimeout(() => {
        this.highlightElement(selectedId);
      }, 100);
    }

    // Check if an icon dropdown was changed
    const iconMatch = propertyPath.match(/^tab(\d+)Icon$/);
    if (iconMatch && newValue) {
      const tabIndex = parseInt(iconMatch[1]);
      this.insertIconIntoLabel(tabIndex, newValue as string);
      // Reset the icon dropdown after inserting
      this.properties[`tab${tabIndex}Icon`] = '';
    }

    // Check if content type dropdown was changed - refresh property pane to show/hide conditional fields
    if (propertyPath.match(/^tab\d+ContentType$/)) {
      const match = propertyPath.match(/^tab(\d+)ContentType$/);
      if (match) {
        const tabIndex = parseInt(match[1], 10);
        const oldContentType = oldValue as string || 'webpart';
        const newContentType = newValue as string || 'webpart';

        // Clear WebPartID when switching between webpart and section content types
        // This prevents stale selections (e.g., section ID when switching to webpart mode)
        if ((oldContentType === 'webpart' && newContentType === 'section') ||
            (oldContentType === 'section' && newContentType === 'webpart')) {
          this.properties[`tab${tabIndex}WebPartID`] = '';
        }
      }
      // Force property pane refresh to show the appropriate fields for the new content type
      this.context.propertyPane.refresh();
    }

    // Check if custom content was changed - refresh preview
    if (propertyPath.match(/^tab\d+(CustomContent|EmbedUrl|EmbedHeight)$/)) {
      // Force property pane refresh to update the preview
      this.context.propertyPane.refresh();
    }
  }

  /**
   * Called when property pane is opened
   */
  protected onPropertyPaneConfigurationStart(): void {
    this._isPropertyPaneOpen = true;
    this.render();
  }

  /**
   * Called when property pane is closed
   */
  protected onPropertyPaneConfigurationComplete(): void {
    this.clearHighlight();
    this._isPropertyPaneOpen = false;
    this.render();
  }

  /**
   * Generate CSS custom properties style string from web part properties
   */
  private getCustomCSSVariables(): string {
    const vars: string[] = [];

    // Colors
    if (this.properties.accentColor) {
      vars.push(`--pi-tab-accent: ${this.properties.accentColor}`);
    }
    if (this.properties.tabTextColor) {
      vars.push(`--pi-tab-text: ${this.properties.tabTextColor}`);
    }
    if (this.properties.tabActiveTextColor) {
      vars.push(`--pi-tab-text-active: ${this.properties.tabActiveTextColor}`);
    }
    if (this.properties.tabBackgroundColor) {
      vars.push(`--pi-tab-bg: ${this.properties.tabBackgroundColor}`);
    }
    if (this.properties.tabActiveBackgroundColor) {
      vars.push(`--pi-tab-bg-active: ${this.properties.tabActiveBackgroundColor}`);
    }
    if (this.properties.tabHoverBackgroundColor) {
      vars.push(`--pi-tab-bg-hover: ${this.properties.tabHoverBackgroundColor}`);
    }

    // Typography
    if (this.properties.tabFontSize) {
      vars.push(`--pi-tab-font-size: ${this.properties.tabFontSize}`);
    }
    if (this.properties.tabFontWeight) {
      vars.push(`--pi-tab-font-weight: ${this.properties.tabFontWeight}`);
    }

    // Spacing
    if (this.properties.tabPaddingVertical) {
      vars.push(`--pi-tab-padding-v: ${this.properties.tabPaddingVertical}`);
    }
    if (this.properties.tabPaddingHorizontal) {
      vars.push(`--pi-tab-padding-h: ${this.properties.tabPaddingHorizontal}`);
    }
    if (this.properties.tabGap) {
      vars.push(`--pi-tab-gap: ${this.properties.tabGap}`);
    }

    // Borders & Effects
    if (this.properties.tabBorderRadius) {
      vars.push(`--pi-tab-radius: ${this.properties.tabBorderRadius}`);
    }
    if (this.properties.activeIndicatorWidth) {
      vars.push(`--pi-tab-indicator-width: ${this.properties.activeIndicatorWidth}`);
    }
    if (this.properties.tabShadow) {
      vars.push(`--pi-tab-shadow: ${this.properties.tabShadow}`);
    }

    // Active Indicator & Separators
    if (this.properties.showActiveIndicator === false) {
      vars.push(`--pi-tab-indicator-display: none`);
    }
    if (this.properties.activeIndicatorColor) {
      vars.push(`--pi-tab-indicator-color: ${this.properties.activeIndicatorColor}`);
    }
    if (this.properties.showTabSeparator === false) {
      vars.push(`--pi-tab-separator-display: none`);
    }
    if (this.properties.tabSeparatorColor) {
      vars.push(`--pi-tab-separator-color: ${this.properties.tabSeparatorColor}`);
    }

    // Content Gap
    if (this.properties.tabContentGap) {
      vars.push(`--pi-tab-content-gap: ${this.properties.tabContentGap}`);
    }

    // Label Image Settings (skip if 'none' - handled by data attribute instead)
    if (this.properties.labelImageHeight && this.properties.labelImageHeight !== 'none') {
      vars.push(`--pi-label-image-height: ${this.properties.labelImageHeight}`);
    }

    return vars.join('; ');
  }

  public render(): void {

    require('./AddTabs.js');
    require('./AddTabs.css');

    if (this.displayMode === DisplayMode.Read)
    {
      // Get webpart ID from SharePoint DOM structure, or fallback to SPFx instance ID for workbench
      const tabWebPartID = $(this.domElement).closest("div." + this.properties.webpartClass).attr("id")
        || `picanvas-${this.context.instanceId}`;

      const tabsDiv = tabWebPartID + "tabs";
      const contentsDiv = tabWebPartID + "Contents";

      const tabStyle = this.properties.tabStyle || 'default';
      const tabAlignment = this.properties.tabAlignment || 'stretch';
      const tabOrientation = this.properties.tabOrientation || 'horizontal';
      const verticalTabPosition = this.properties.verticalTabPosition || 'left';
      const verticalTabWidth = this.properties.verticalTabWidth || '200px';
      const customStyles = this.getCustomCSSVariables();
      const transitionsAttr = this.properties.enableTransitions === false ? 'data-transitions="false"' : '';
      const unlimitedImageAttr = this.properties.labelImageHeight === 'none' ? 'data-label-image-unlimited="true"' : '';

      // Build orientation-specific attributes
      const orientationAttrs = tabOrientation === 'vertical'
        ? `data-tab-orientation="vertical" data-vertical-position="${verticalTabPosition}" style="${customStyles}; --pi-vertical-tab-width: ${verticalTabWidth}"`
        : `data-tab-orientation="horizontal" style="${customStyles}"`;

      // Check if all tabs have hidden labels (for content-only mode)
      const numTabs = this.getTabCount();
      let allTabsHidden = true;
      for (let i = 1; i <= numTabs; i++) {
        const labelType = (this.properties[`tab${i}LabelType`] as string) || 'text';
        if (labelType !== 'hidden') {
          allTabsHidden = false;
          break;
        }
      }

      // Add data attribute if all tabs should be hidden (content-only mode)
      const contentOnlyAttr = allTabsHidden ? 'data-content-only="true"' : '';

      this.domElement.innerHTML = `<div data-addui='tabs' data-tab-style='${tabStyle}' data-tab-alignment='${tabAlignment}' ${orientationAttrs} ${transitionsAttr} ${unlimitedImageAttr} ${contentOnlyAttr}><div role='tabs' id='${tabsDiv}'></div><div role='contents' id='${contentsDiv}'></div></div>`;

      // IMPORTANT: Call getSections() to mark DOM elements with data-hillbilly-section-id
      // and data-hillbilly-column-id BEFORE we try to find them in the render loop
      this.getSections();

      // Track webparts/sections/columns that have been used within THIS instance
      // Store the actual element reference so we can clone from it later
      const usedElements = new Map<string, JQuery<HTMLElement>>();

      // Get unique instance ID for this PiCanvas instance
      const instanceId = this.instanceId;

      // Clear any previous registrations from THIS instance (in case of re-render)
      PiCanvasWebPart._globalWebpartRegistry.forEach((value, key) => {
        if (value.instanceId === instanceId) {
          PiCanvasWebPart._globalWebpartRegistry.delete(key);
        }
      });

      // Build tabData from dynamic properties if tabData is empty or not set
      const thisTabData = this.getTabDataFromProperties();
      for(const x in thisTabData)
      {
        // Handle regular tabs (with WebPartID), placeholder tabs, and custom content tabs
        const isPlaceholder = thisTabData[x].isPlaceholder || false;
        const tabIndex = thisTabData[x].originalTabIndex || (parseInt(x) + 1);
        const contentType = (this.properties[`tab${tabIndex}ContentType`] as string) || 'webpart';
        const isCustomContent = contentType === 'markdown' || contentType === 'html' || contentType === 'mermaid' || contentType === 'embed';

        // Process tab if it has WebPartID, is placeholder, or has custom content type
        if (thisTabData[x].WebPartID || isPlaceholder || isCustomContent) {
          // Create tab with HTML support - the label can contain HTML for styling
          const tabDiv = $("<div></div>");
          const labelType = (this.properties[`tab${tabIndex}LabelType`] as string) || 'text';

          if (labelType === 'hidden') {
            // Hidden label mode - tab header is invisible but content still renders
            tabDiv.addClass('hidden-label-tab');
            tabDiv.attr('data-hidden-label', 'true');
            // Empty content - the tab bar CSS will hide this
            tabDiv.html('');
          } else if (labelType === 'webpart') {
            // Web part label mode - move the selected web part into the tab header
            const labelWebPartID = this.properties[`tab${tabIndex}LabelWebPartID`] as string;
            if (labelWebPartID) {
              const $labelWebPart = $("#" + labelWebPartID);
              if ($labelWebPart.length) {
                tabDiv.addClass('webpart-label-tab');

                // Check if this web part is also used as tab content
                const tabContentWebPartID = thisTabData[x].WebPartID;
                const isAlsoContent = (labelWebPartID === tabContentWebPartID);

                if (isAlsoContent) {
                  // Same web part for label and content - clone it for the label
                  const $clonedLabel = $labelWebPart.clone(true, true);
                  $clonedLabel.removeAttr('id').addClass('as-tab-label cloned-label');
                  tabDiv.append($clonedLabel);
                  // Original stays in place for tab content
                } else {
                  // Different web parts - move the label web part into the tab header
                  tabDiv.append($labelWebPart);
                  $labelWebPart.addClass('as-tab-label');
                }
              } else {
                // Fallback if web part not found
                tabDiv.html(`Tab ${tabIndex}`);
              }
            } else {
              // No label web part selected - show default
              tabDiv.html(`Tab ${tabIndex}`);
            }
          } else {
            // Text label mode - original behavior
            // Security: Encode tab label to prevent XSS
            const tabLabel = this.encodeHtml(thisTabData[x].TabLabel || `Tab ${tabIndex}`);

            // Check for per-tab image URL
            // Security: Sanitize image URL to prevent javascript: and other malicious protocols
            const rawImageUrl = this.properties[`tab${tabIndex}Image`] as string;
            const tabImageUrl = this.sanitizeImageUrl(rawImageUrl);
            const imagePosition = (this.properties[`tab${tabIndex}ImagePosition`] as string) || 'left';

            if (tabImageUrl && tabImageUrl.length > 0) {
              if (imagePosition === 'background') {
                // Background image mode - set as background style
                tabDiv.attr('data-has-bg-image', 'true');
                tabDiv.css('background-image', `url(${tabImageUrl})`);
                tabDiv.html(`<span>${tabLabel}</span>`);
              } else if (imagePosition === 'top') {
                // Image above text
                tabDiv.html(`<img src="${tabImageUrl}" class="tab-image tab-image-top" alt="" /><span>${tabLabel}</span>`);
              } else if (imagePosition === 'right') {
                // Image to the right of text
                tabDiv.html(`<span>${tabLabel}</span><img src="${tabImageUrl}" class="tab-image tab-image-right" alt="" />`);
              } else {
                // Default: Image to the left of text
                tabDiv.html(`<img src="${tabImageUrl}" class="tab-image" alt="" /><span>${tabLabel}</span>`);
              }
            } else {
              // No image - just render label as before
              tabDiv.html(tabLabel);
            }
          }

          // Add divider attribute if enabled for this tab
          const hasDivider = this.properties[`tab${tabIndex}DividerAfter`] as boolean;
          if (hasDivider) {
            tabDiv.attr('data-divider-after', 'true');
          }

          // Mark placeholder tabs as disabled with tooltip
          if (isPlaceholder) {
            tabDiv.attr('data-placeholder', 'true');
            tabDiv.attr('data-placeholder-text', thisTabData[x].placeholderText || 'Restricted');
            tabDiv.addClass('tab-placeholder');
          }

          $("#"+tabsDiv).append(tabDiv);

          // Create a container for this tab's content with appropriate class
          // Each tab MUST have exactly one content container for the AddTabs library to work
          let tabContentContainer: JQuery<HTMLElement>;

          if (isPlaceholder) {
            // Placeholder tab - show restricted message instead of content
            const placeholderMessage = this.encodeHtml(thisTabData[x].placeholderText || 'Restricted');
            tabContentContainer = $(`<div class='hillbilly-tab-content hillbilly-placeholder-content'>
              <div class="placeholder-restricted-message">
                <span class="placeholder-icon">&#128274;</span>
                <span class="placeholder-text">${placeholderMessage}</span>
              </div>
            </div>`);
          } else {
            // Check content type for this tab (v3.0 feature)
            const contentType = (this.properties[`tab${tabIndex}ContentType`] as string) || 'webpart';

            // Check if lazy loading should be applied (non-first tabs)
            const enableLazy = this.properties.enableLazyLoading !== false && parseInt(x, 10) > 0;

            if (contentType === 'markdown') {
              // Render Markdown content
              const customContent = (this.properties[`tab${tabIndex}CustomContent`] as string) || '';
              const rendered = ContentRenderer.renderMarkdown(customContent);
              const lazyAttr = enableLazy ? `data-lazy="true" data-lazy-loaded="false"` : '';
              tabContentContainer = $(`<div class='hillbilly-tab-content hillbilly-custom-content markdown-content' ${lazyAttr}>${rendered.html}</div>`);

            } else if (contentType === 'html') {
              // Render HTML content (sanitized)
              const customContent = (this.properties[`tab${tabIndex}CustomContent`] as string) || '';
              const rendered = ContentRenderer.renderHtml(customContent);
              const lazyAttr = enableLazy ? `data-lazy="true" data-lazy-loaded="false"` : '';
              tabContentContainer = $(`<div class='hillbilly-tab-content hillbilly-custom-content html-content' ${lazyAttr}>${rendered.html}</div>`);

            } else if (contentType === 'mermaid') {
              // Render Mermaid diagram (requires post-render initialization)
              const customContent = (this.properties[`tab${tabIndex}CustomContent`] as string) || '';
              // Sanitize ID for CSS selector compatibility (remove invalid chars like = from base64)
              const sanitizedTabsDiv = tabsDiv.replace(/[^a-zA-Z0-9_-]/g, '');
              const mermaidId = `mermaid-${sanitizedTabsDiv}-${tabIndex}`;
              const rendered = ContentRenderer.prepareMermaid(customContent, mermaidId);
              const lazyAttr = enableLazy ? `data-lazy="true" data-lazy-loaded="false"` : '';
              tabContentContainer = $(`<div class='hillbilly-tab-content hillbilly-custom-content mermaid-content' ${lazyAttr}>${rendered.html}</div>`);

            } else if (contentType === 'embed') {
              // Render embed iframe (URL validated against allow list)
              const embedUrl = (this.properties[`tab${tabIndex}EmbedUrl`] as string) || '';
              const embedHeight = (this.properties[`tab${tabIndex}EmbedHeight`] as string) || '400px';
              const rendered = ContentRenderer.renderEmbed({ url: embedUrl, height: embedHeight });
              const lazyAttr = enableLazy ? `data-lazy="true" data-lazy-loaded="false"` : '';
              tabContentContainer = $(`<div class='hillbilly-tab-content hillbilly-custom-content embed-content' ${lazyAttr}>${rendered.html}</div>`);

            } else {
              // Default: webpart or section content type
              // Check if this is a section or column selection
              const isSection = thisTabData[x].WebPartID.indexOf("SECTION:") === 0;
              const isColumn = thisTabData[x].WebPartID.indexOf("COLUMN:") === 0;

              // Use different classes for sections/columns (preserve layout) vs individual webparts (full width)
              const contentClass = (isSection || isColumn) ? 'hillbilly-tab-content hillbilly-section-content' : 'hillbilly-tab-content hillbilly-single-webpart';
              const lazyAttr = enableLazy ? `data-lazy="true" data-lazy-loaded="false"` : '';
              tabContentContainer = $(`<div class='${contentClass}' ${lazyAttr}></div>`);

              if (isSection) {
                const sectionId = thisTabData[x].WebPartID.substring(8); // Remove "SECTION:" prefix
                const elementKey = thisTabData[x].WebPartID;

                // Check GLOBAL registry first - is this section owned by ANOTHER PiCanvas instance?
                const globalOwner = PiCanvasWebPart._globalWebpartRegistry.get(elementKey);
                if (globalOwner && globalOwner.instanceId !== instanceId) {
                  // OWNED BY ANOTHER INSTANCE: Try to clone it
                  console.log(`[PiCanvas] Tab ${x}: Section "${elementKey}" owned by another instance, attempting clone`);

                  const $originalSection = globalOwner.$element;
                  if ($originalSection && $originalSection.length) {
                    const $clonedSection = $originalSection.clone(true, true);
                    const cloneSuffix = '-clone-' + instanceId;
                    $clonedSection.find('[id]').addBack('[id]').each(function() {
                      const $el = $(this);
                      const oldId = $el.attr('id');
                      if (oldId) { $el.attr('id', oldId + cloneSuffix); }
                    });
                    $clonedSection.attr('data-picanvas-clone', 'true');
                    $clonedSection.addClass('picanvas-cloned-webpart');
                    tabContentContainer.append($clonedSection);
                    tabContentContainer.addClass('picanvas-cloned-content');
                    console.log(`[PiCanvas] Tab ${x}: Successfully cloned section from another instance`);
                  } else {
                    tabContentContainer.addClass('picanvas-unavailable-content');
                    tabContentContainer.html(`
                      <div class="picanvas-unavailable-message" style="padding: 20px; text-align: center; color: #666; background: #f5f5f5; border-radius: 4px; margin: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
                        <div style="font-weight: 500;">Content unavailable</div>
                        <div style="font-size: 12px; margin-top: 4px;">Could not load this section. Try refreshing the page.</div>
                      </div>
                    `);
                  }
                } else if (usedElements.has(elementKey)) {
                  // DUPLICATE USE WITHIN THIS INSTANCE: Mark for shared handling
                  console.log(`[PiCanvas] Tab ${x}: Duplicate section within instance, marking container for sharing`);
                  tabContentContainer.attr('data-shared-webpart-id', elementKey);
                  tabContentContainer.addClass('picanvas-shared-content');
                } else {
                  // First use - find and move the original section
                  let $section = $(`[data-hillbilly-section-id="${sectionId}"]`);
                  if (!$section.length) {
                    $section = $(`[data-automation-id="${sectionId}"]`);
                  }
                  if (!$section.length) {
                    $section = $(`#${sectionId}`);
                  }

                  if ($section.length) {
                    // Store in LOCAL registry
                    usedElements.set(elementKey, $section);
                    // Register in GLOBAL registry
                    PiCanvasWebPart._globalWebpartRegistry.set(elementKey, { instanceId, $element: $section });
                    $section.attr('data-picanvas-shared', 'true');
                    $section.attr('data-picanvas-webpart-id', elementKey);
                    $section.attr('data-picanvas-owner', instanceId);
                    tabContentContainer.attr('data-shared-webpart-id', elementKey);
                    tabContentContainer.append($section);

                    // Fallback: if container ended up empty, move all webparts inside the section
                    if (tabContentContainer.children().length === 0) {
                      const $webpartsInSection = $section.find('.ControlZone, [data-automation-id="CanvasControl"]');
                      $webpartsInSection.each((_i, wp) => { tabContentContainer.append(wp); });
                    }
                  }
                }
              } else if (isColumn) {
                const columnId = thisTabData[x].WebPartID.substring(7); // Remove "COLUMN:" prefix
                const elementKey = thisTabData[x].WebPartID;

                // Check GLOBAL registry first - is this column owned by ANOTHER PiCanvas instance?
                const globalOwner = PiCanvasWebPart._globalWebpartRegistry.get(elementKey);
                if (globalOwner && globalOwner.instanceId !== instanceId) {
                  // OWNED BY ANOTHER INSTANCE: Try to clone it
                  console.log(`[PiCanvas] Tab ${x}: Column "${elementKey}" owned by another instance, attempting clone`);

                  const $originalColumn = globalOwner.$element;
                  if ($originalColumn && $originalColumn.length) {
                    const $clonedColumn = $originalColumn.clone(true, true);
                    const cloneSuffix = '-clone-' + instanceId;
                    $clonedColumn.find('[id]').addBack('[id]').each(function() {
                      const $el = $(this);
                      const oldId = $el.attr('id');
                      if (oldId) { $el.attr('id', oldId + cloneSuffix); }
                    });
                    $clonedColumn.attr('data-picanvas-clone', 'true');
                    $clonedColumn.addClass('picanvas-cloned-webpart');
                    tabContentContainer.append($clonedColumn);
                    tabContentContainer.addClass('picanvas-cloned-content');
                    console.log(`[PiCanvas] Tab ${x}: Successfully cloned column from another instance`);
                  } else {
                    tabContentContainer.addClass('picanvas-unavailable-content');
                    tabContentContainer.html(`
                      <div class="picanvas-unavailable-message" style="padding: 20px; text-align: center; color: #666; background: #f5f5f5; border-radius: 4px; margin: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
                        <div style="font-weight: 500;">Content unavailable</div>
                        <div style="font-size: 12px; margin-top: 4px;">Could not load this column. Try refreshing the page.</div>
                      </div>
                    `);
                  }
                } else if (usedElements.has(elementKey)) {
                  // DUPLICATE USE WITHIN THIS INSTANCE: Mark for shared handling
                  console.log(`[PiCanvas] Tab ${x}: Duplicate column within instance, marking container for sharing`);
                  tabContentContainer.attr('data-shared-webpart-id', elementKey);
                  tabContentContainer.addClass('picanvas-shared-content');
                } else {
                  // First use - find and move the original column
                  let $column = $(`[data-hillbilly-column-id="${columnId}"]`);
                  if (!$column.length) {
                    $column = $(`[data-automation-id="${columnId}"]`);
                  }
                  if (!$column.length) {
                    $column = $(`#${columnId}`);
                  }

                  if ($column.length) {
                    // Store in LOCAL registry
                    usedElements.set(elementKey, $column);
                    // Register in GLOBAL registry
                    PiCanvasWebPart._globalWebpartRegistry.set(elementKey, { instanceId, $element: $column });
                    $column.attr('data-picanvas-shared', 'true');
                    $column.attr('data-picanvas-webpart-id', elementKey);
                    $column.attr('data-picanvas-owner', instanceId);
                    tabContentContainer.attr('data-shared-webpart-id', elementKey);
                    tabContentContainer.append($column);
                  }
                }
              } else {
                // Individual webpart
                const elementKey = thisTabData[x].WebPartID;

                console.log(`[PiCanvas] Tab ${x}: Processing webpart ID "${elementKey}"`);
                console.log(`[PiCanvas] Tab ${x}: usedElements has key: ${usedElements.has(elementKey)}`);

                // Check GLOBAL registry first - is this webpart owned by ANOTHER PiCanvas instance?
                const globalOwner = PiCanvasWebPart._globalWebpartRegistry.get(elementKey);
                if (globalOwner && globalOwner.instanceId !== instanceId) {
                  // OWNED BY ANOTHER INSTANCE: Try to clone it
                  // Static content (images, text) will display correctly; interactive features won't work
                  console.log(`[PiCanvas] Tab ${x}: Webpart "${elementKey}" owned by another instance, attempting clone`);

                  const $originalWebpart = globalOwner.$element;
                  if ($originalWebpart && $originalWebpart.length) {
                    // Deep clone the webpart DOM (includes data and events where possible)
                    const $clonedWebpart = $originalWebpart.clone(true, true);

                    // Remove IDs to avoid duplicates (add unique suffix)
                    const cloneSuffix = '-clone-' + instanceId;
                    $clonedWebpart.find('[id]').addBack('[id]').each(function() {
                      const $el = $(this);
                      const oldId = $el.attr('id');
                      if (oldId) {
                        $el.attr('id', oldId + cloneSuffix);
                      }
                    });

                    // Mark as a clone
                    $clonedWebpart.attr('data-picanvas-clone', 'true');
                    $clonedWebpart.attr('data-picanvas-clone-source', elementKey);
                    $clonedWebpart.addClass('picanvas-cloned-webpart');

                    // Add to container
                    tabContentContainer.append($clonedWebpart);
                    tabContentContainer.addClass('picanvas-cloned-content');

                    // FORCE IMAGE LOADING: SharePoint uses lazy loading that doesn't trigger for cloned elements
                    // Copy ALL computed background-image styles from original to clone (not just inline)
                    $originalWebpart.find('*').each(function(i) {
                      const bgImage = window.getComputedStyle(this).backgroundImage;
                      if (bgImage && bgImage !== 'none') {
                        const $cloneEl = $clonedWebpart.find('*').eq(i);
                        if ($cloneEl.length) {
                          $cloneEl.css('background-image', bgImage);
                        }
                      }
                    });

                    // Also check the root element
                    const rootBgImage = window.getComputedStyle($originalWebpart[0]).backgroundImage;
                    if (rootBgImage && rootBgImage !== 'none') {
                      $clonedWebpart.css('background-image', rootBgImage);
                    }

                    // Force img src to reload (handle all variations)
                    $clonedWebpart.find('img, picture source').each(function() {
                      const $el = $(this);
                      const src = $el.attr('src') || $el.attr('data-src') || $el.attr('srcset') || $el.attr('data-srcset');
                      if (src) {
                        if ($el.attr('srcset') || $el.attr('data-srcset')) {
                          $el.attr('srcset', src);
                        } else {
                          $el.attr('src', src);
                          if (this.tagName === 'IMG') {
                            (this as HTMLImageElement).src = src;
                          }
                        }
                        $el.removeAttr('data-src');
                        $el.removeAttr('data-srcset');
                        $el.removeAttr('loading'); // Remove lazy loading attribute
                      }
                    });

                    // Force visibility and display on ALL elements
                    $clonedWebpart.css({
                      'visibility': 'visible',
                      'opacity': '1',
                      'display': 'block'
                    });
                    $clonedWebpart.find('*').css({
                      'visibility': 'visible',
                      'opacity': '1'
                    });
                    // Remove any lazy/hidden classes that SharePoint might use
                    $clonedWebpart.find('[class*="lazy"], [class*="hidden"], [class*="placeholder"]').removeClass(function(_i, className) {
                      return (className.match(/(^|\s)(lazy|hidden|placeholder)\S*/g) || []).join(' ');
                    });

                    // Trigger multiple events to wake up lazy loaders
                    setTimeout(() => {
                      window.dispatchEvent(new Event('resize'));
                      window.dispatchEvent(new Event('scroll'));
                      // Force reflow on the cloned element
                      void $clonedWebpart[0].offsetHeight;
                      // Trigger intersection observer by simulating visibility change
                      $clonedWebpart.find('img').each(function() {
                        void (this as HTMLImageElement).offsetHeight;
                      });
                    }, 100);

                    // Second attempt with longer delay
                    setTimeout(() => {
                      window.dispatchEvent(new Event('resize'));
                      this.forceImageWebpartLoad($clonedWebpart);
                    }, 300);

                    console.log(`[PiCanvas] Tab ${x}: Successfully cloned webpart from another instance`);
                  } else {
                    // Fallback: show message if clone source not found
                    console.log(`[PiCanvas] Tab ${x}: Could not find source webpart to clone`);
                    tabContentContainer.addClass('picanvas-unavailable-content');
                    tabContentContainer.html(`
                      <div class="picanvas-unavailable-message" style="padding: 20px; text-align: center; color: #666; background: #f5f5f5; border-radius: 4px; margin: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
                        <div style="font-weight: 500;">Content unavailable</div>
                        <div style="font-size: 12px; margin-top: 4px;">Could not load this content. Try refreshing the page.</div>
                      </div>
                    `);
                  }
                } else if (usedElements.has(elementKey)) {
                  // DUPLICATE USE WITHIN THIS INSTANCE: This webpart is already in another tab of THIS PiCanvas
                  // Mark this container so the webpart can be moved here on tab switch
                  console.log(`[PiCanvas] Tab ${x}: Duplicate webpart within instance, marking container for sharing`);
                  tabContentContainer.attr('data-shared-webpart-id', elementKey);
                  tabContentContainer.addClass('picanvas-shared-content');
                  // Container is empty - webpart will move here when this tab is activated
                } else {
                  // FIRST USE: Move the original webpart to this tab
                  const $webpart = $("#"+thisTabData[x].WebPartID);
                  console.log(`[PiCanvas] Tab ${x}: First use, found webpart: ${$webpart.length > 0}, ID selector: "#${thisTabData[x].WebPartID}"`);
                  if ($webpart.length) {
                    // Store in LOCAL registry
                    usedElements.set(elementKey, $webpart);
                    // Register in GLOBAL registry so other PiCanvas instances know this is taken
                    PiCanvasWebPart._globalWebpartRegistry.set(elementKey, { instanceId, $element: $webpart });
                    // Mark the webpart so we can find it later
                    $webpart.attr('data-picanvas-shared', 'true');
                    $webpart.attr('data-picanvas-webpart-id', elementKey);
                    $webpart.attr('data-picanvas-owner', instanceId);
                    // Mark the container too - so we can move webpart back here on tab switch
                    tabContentContainer.attr('data-shared-webpart-id', elementKey);
                    // Move webpart to this tab
                    tabContentContainer.append($webpart);
                  }
                }
              }
            }
          }

          // Always append the container (even if empty) to maintain tab/content alignment
          $("#"+contentsDiv).append(tabContentContainer);
        }
      }

      // @ts-expect-error RenderTabs is defined in AddTabs.js
      RenderTabs();

      // Set up shared webpart handling - move webparts between tabs on tab change
      this.initializeSharedWebpartHandling(tabsDiv, usedElements);

      // Initialize v3.0 features after tabs are rendered
      // Use setTimeout to ensure DOM is fully ready after RenderTabs
      setTimeout(() => {
        this.initializeMermaidDiagrams(tabsDiv);
        this.initializeDeepLinking(tabsDiv);
        this.initializeLazyLoadEvents(tabsDiv);
      }, 100);

      } else {
        const isDark = this.isDarkMode();
        const themeClass = isDark ? styles.darkMode : '';

        // Check if we're showing a feature detail view
        if (this._currentView !== 'home') {
          this.domElement.innerHTML = this.getFeatureDetailHTML(this._currentView, isDark);

          // Add back button event listener
          const backButton = this.domElement.querySelector('[data-action="back"]');
          if (backButton) {
            backButton.addEventListener('click', () => this.showHome());
          }

          // Initialize interactive example playgrounds
          this.initializeExamplePlaygrounds();

          return;
        }

        // Home view
        this.domElement.innerHTML = `
        <div class="${ styles.piCanvas } ${ themeClass }" data-theme="${ isDark ? 'dark' : 'light' }">
          <div class="${ styles.container }">
            <div class="${ styles.header }">
              <div class="${ styles.logoMark }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="${ styles.logoSvg }">
                  <defs>
                    <linearGradient id="canvasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#0066cc"/>
                      <stop offset="100%" stop-color="#4da6ff"/>
                    </linearGradient>
                  </defs>
                  <line x1="6" y1="28" x2="16" y2="6" stroke="#8b4513" stroke-width="2" stroke-linecap="round"/>
                  <line x1="26" y1="28" x2="16" y2="6" stroke="#8b4513" stroke-width="2" stroke-linecap="round"/>
                  <line x1="9" y1="20" x2="23" y2="20" stroke="#8b4513" stroke-width="2" stroke-linecap="round"/>
                  <rect x="7" y="5" width="18" height="14" rx="1" fill="#fff" stroke="#ccc" stroke-width="1"/>
                  <rect x="8" y="6" width="16" height="12" fill="url(#canvasGrad)"/>
                  <text x="16" y="15.5" font-family="Georgia, serif" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">π</text>
                </svg>
              </div>
              <h1 class="${ styles.title }">PiCanvas</h1>
              <p class="${ styles.tagline }">Infinite possibilities for your SharePoint pages</p>
              <span class="${ styles.attribution }">
                <span>Upgraded by <a href="https://linkedin.com/in/anthonyrhopkins" target="_blank" rel="noopener" class="${ styles.attributionLink }">@anthonyrhopkins</a></span>
                <span class="${ styles.divider }"></span>
                <span>Originally by <a href="http://www.markrackley.net/2022/06/29/the-return-of-hillbilly-tabs/" target="_blank" rel="noopener" class="${ styles.attributionLink }">Mark Rackley</a></span>
              </span>

              ${ this._isPropertyPaneOpen ? `
              <div class="${ styles.configuredMessage }">
                <span class="${ styles.configuredIcon }">&#10004;</span>
                <span><strong>Settings panel is open!</strong> Use the panel on the right to configure your tabs.</span>
              </div>
              ` : `
              <div class="${ styles.quickStart }">
                <p class="${ styles.quickStartText }">
                  <strong>Ready to create tabs?</strong> Click the button below to open the settings panel and start configuring.
                </p>
                <button class="${ styles.configureButton }" data-action="configure" type="button">
                  <span class="${ styles.configureIcon }">&#9881;</span>
                  Configure Tabs
                </button>
                <div class="${ styles.quickStartHint }">
                  <span class="${ styles.hintIcon }">&#128161;</span>
                  <span>Or click this web part and then the <strong>✏️ pencil icon</strong></span>
                </div>
              </div>
              `}
            </div>

            <div class="${ styles.body }">
              <div class="${ styles.features }">
                <div class="${ styles.feature }" data-feature="tabbed-layouts" tabindex="0" role="button" aria-label="Learn more about Tabbed Layouts">
                  <span class="${ styles.featureIcon }">&#9638;</span>
                  <h3 class="${ styles.featureTitle }">Tabbed Layouts</h3>
                  <p class="${ styles.featureDesc }">Organize web parts into clean tabs</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
                <div class="${ styles.feature }" data-feature="section-support" tabindex="0" role="button" aria-label="Learn more about Section Support">
                  <span class="${ styles.featureIcon }">&#9633;</span>
                  <h3 class="${ styles.featureTitle }">Section Support</h3>
                  <p class="${ styles.featureDesc }">Group entire sections at once</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
                <div class="${ styles.feature }" data-feature="theme-aware" tabindex="0" role="button" aria-label="Learn more about Theme Awareness">
                  <span class="${ styles.featureIcon }">&#9681;</span>
                  <h3 class="${ styles.featureTitle }">Theme Aware</h3>
                  <p class="${ styles.featureDesc }">Adapts to light and dark mode</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
                <div class="${ styles.feature }" data-feature="permission-based" tabindex="0" role="button" aria-label="Learn more about Permission-Based Visibility">
                  <span class="${ styles.featureIcon }">&#128274;</span>
                  <h3 class="${ styles.featureTitle }">Permission-Based</h3>
                  <p class="${ styles.featureDesc }">Show tabs by group membership</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
              </div>

              <h2 class="${ styles.sectionHeader }">Content Types</h2>
              <p class="${ styles.sectionSubtext }">Create rich tab content without adding extra web parts</p>
              <div class="${ styles.features }">
                <div class="${ styles.feature }" data-feature="content-markdown" tabindex="0" role="button" aria-label="Learn more about Markdown Content">
                  <span class="${ styles.featureIcon }">📝</span>
                  <h3 class="${ styles.featureTitle }">Markdown</h3>
                  <p class="${ styles.featureDesc }">Write formatted text with easy syntax</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
                <div class="${ styles.feature }" data-feature="content-html" tabindex="0" role="button" aria-label="Learn more about HTML Content">
                  <span class="${ styles.featureIcon }">🌐</span>
                  <h3 class="${ styles.featureTitle }">HTML</h3>
                  <p class="${ styles.featureDesc }">Use custom HTML for advanced layouts</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
                <div class="${ styles.feature }" data-feature="content-iframe" tabindex="0" role="button" aria-label="Learn more about Embed/Iframe Content">
                  <span class="${ styles.featureIcon }">🖼️</span>
                  <h3 class="${ styles.featureTitle }">Embed (iframe)</h3>
                  <p class="${ styles.featureDesc }">Embed videos, apps, and external content</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
                <div class="${ styles.feature } ${ styles.featureHighlight }" data-feature="content-mermaid" tabindex="0" role="button" aria-label="Learn more about Mermaid Diagrams">
                  <span class="${ styles.featureIcon }">📊</span>
                  <h3 class="${ styles.featureTitle }">Mermaid Diagrams</h3>
                  <p class="${ styles.featureDesc }">Create flowcharts, sequences, Gantt &amp; more</p>
                  <span class="${ styles.featureClickHint }">Click to learn more</span>
                </div>
              </div>

              <h2 class="${ styles.sectionHeader }">Getting Started</h2>
              <div class="${ styles.steps }">
                <div class="${ styles.step }">
                  <span class="${ styles.stepNum }">1</span>
                  <div class="${ styles.stepContent }">
                    <p class="${ styles.stepTitle }">Add PiCanvas to your page</p>
                    <p class="${ styles.stepDesc }">Place this web part where you want tabs to appear</p>
                  </div>
                </div>
                <div class="${ styles.step }">
                  <span class="${ styles.stepNum }">2</span>
                  <div class="${ styles.stepContent }">
                    <p class="${ styles.stepTitle }">Add your content</p>
                    <p class="${ styles.stepDesc }">Add other web parts anywhere on the page</p>
                  </div>
                </div>
                <div class="${ styles.step }">
                  <span class="${ styles.stepNum }">3</span>
                  <div class="${ styles.stepContent }">
                    <p class="${ styles.stepTitle }">Configure tabs</p>
                    <p class="${ styles.stepDesc }">Click the <strong>"Configure Tabs"</strong> button above, or click this web part and then the <strong>✏️ pencil icon</strong> to open settings. Select which web parts go in each tab and give them labels.</p>
                  </div>
                </div>
                <div class="${ styles.step }">
                  <span class="${ styles.stepNum }">4</span>
                  <div class="${ styles.stepContent }">
                    <p class="${ styles.stepTitle }">Publish</p>
                    <p class="${ styles.stepDesc }">Save your page and watch the magic happen</p>
                  </div>
                </div>
              </div>

              <div class="${ styles.tip }">
                <span class="${ styles.tipIcon }">&#128161;</span>
                <p class="${ styles.tipText }"><strong>Not seeing your web parts?</strong> Open the property pane and check the <strong>Troubleshooting</strong> section. Try different selector options from the dropdowns until your web parts appear.</p>
              </div>

            </div>

            <div class="${ styles.footer }">
              <div class="${ styles.footerLinks }">
                <a href="https://github.com/anthonyrhopkins/PiCanvas" class="${ styles.footerLink }" target="_blank" rel="noopener">
                  View on GitHub
                </a>
                <a href="https://pispace.dev" class="${ styles.footerLink }" target="_blank" rel="noopener">
                  PiSpace.dev <span class="${ styles.betaBadge }">Beta</span>
                </a>
              </div>
              <p class="${ styles.footerText }">v${PICANVAS_VERSION} · SPFx ${SPFX_VERSION} · Part of the <a href="https://www.linkedin.com/company/pispace" target="_blank" rel="noopener" class="${ styles.footerLink }">PiSpace</a> family</p>
            </div>
          </div>
        </div>`;

        // Add click event listeners to feature cards
        const featureCards = this.domElement.querySelectorAll('[data-feature]');
        featureCards.forEach((card) => {
          const feature = card.getAttribute('data-feature') as FeatureView;
          card.addEventListener('click', () => this.showFeatureDetail(feature));
          card.addEventListener('keydown', (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
              keyEvent.preventDefault();
              this.showFeatureDetail(feature);
            }
          });
        });

        // Add click event listener for Configure Tabs button
        const configureButton = this.domElement.querySelector('[data-action="configure"]');
        if (configureButton) {
          configureButton.addEventListener('click', () => {
            this.context.propertyPane.open();
          });
        }
      }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Navigate to a feature detail view
   */
  private showFeatureDetail(feature: FeatureView): void {
    this._currentView = feature;
    this.render();
  }

  /**
   * Navigate back to home view
   */
  private showHome(): void {
    this._currentView = 'home';
    this.render();
  }

  /**
   * Mermaid example data for the interactive playground
   */
  private readonly mermaidExamples: Record<string, { name: string; code: string }> = {
    'flowchart': {
      name: 'Flowchart',
      code: `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[Deploy]`
    },
    'flowchart-shapes': {
      name: 'Flowchart - Node Shapes',
      code: `flowchart LR
    A[Rectangle] --> B(Rounded)
    B --> C([Stadium])
    C --> D[[Subroutine]]
    D --> E[(Database)]
    E --> F((Circle))
    F --> G{Diamond}
    G --> H{{Hexagon}}`
    },
    'sequence': {
      name: 'Sequence Diagram',
      code: `sequenceDiagram
    participant U as User
    participant S as SharePoint
    participant A as API

    U->>S: Open page
    S->>A: Fetch data
    A-->>S: Return JSON
    S-->>U: Display content

    Note over U,S: User sees content`
    },
    'class': {
      name: 'Class Diagram',
      code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
    },
    'state': {
      name: 'State Diagram',
      code: `stateDiagram-v2
    [*] --> Draft
    Draft --> Review: Submit
    Review --> Approved: Accept
    Review --> Draft: Request Changes
    Approved --> Published: Publish
    Published --> [*]`
    },
    'er': {
      name: 'Entity Relationship',
      code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string email
        int id PK
    }
    ORDER ||--|{ LINE_ITEM : contains
    ORDER {
        int id PK
        date created
    }
    PRODUCT ||--o{ LINE_ITEM : includes`
    },
    'journey': {
      name: 'User Journey',
      code: `journey
    title Employee Onboarding
    section Day 1
      Arrive at office: 5: New Hire
      Meet team: 4: New Hire, Manager
      Setup workstation: 3: New Hire, IT
    section Week 1
      Training sessions: 4: New Hire, HR
      First project: 3: New Hire, Mentor`
    },
    'gantt': {
      name: 'Gantt Chart',
      code: `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Planning
        Requirements    :a1, 2024-01-01, 14d
        Design          :a2, after a1, 10d
    section Development
        Backend API     :b1, after a2, 21d
        Frontend UI     :b2, after a2, 21d
    section Testing
        QA Testing      :c1, after b1, 14d`
    },
    'pie': {
      name: 'Pie Chart',
      code: `pie showData
    title Project Time Distribution
    "Development" : 45
    "Design" : 20
    "Testing" : 15
    "Documentation" : 10
    "Meetings" : 10`
    },
    'quadrant': {
      name: 'Quadrant Chart',
      code: `quadrantChart
    title Feature Prioritization
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 Plan
    quadrant-2 Do First
    quadrant-3 Eliminate
    quadrant-4 Delegate
    Feature A: [0.3, 0.8]
    Feature B: [0.7, 0.9]
    Feature C: [0.2, 0.3]`
    },
    'mindmap': {
      name: 'Mind Map',
      code: `mindmap
  root((Project Hub))
    Planning
      Requirements
      Timeline
      Budget
    Development
      Frontend
      Backend
      Database
    Testing
      Unit Tests
      Integration`
    },
    'timeline': {
      name: 'Timeline',
      code: `timeline
    title Company History
    2020 : Company Founded
         : First Product Launch
    2021 : Series A Funding
         : Team grows to 20
    2022 : International Expansion
    2023 : Series B Funding
    2024 : IPO Preparation`
    },
    'kanban': {
      name: 'Kanban Board',
      code: `kanban
  column1[To Do]
    task1[Design mockups]
    task2[Write specs]
  column2[In Progress]
    task3[Build API]
  column3[Done]
    task4[Setup CI/CD]`
    },
    'gitgraph': {
      name: 'Git Graph',
      code: `gitGraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Feature start"
    branch feature/login
    checkout feature/login
    commit id: "Add login"
    checkout develop
    merge feature/login
    checkout main
    merge develop tag: "v1.0"`
    },
    'xychart': {
      name: 'XY Chart',
      code: `xychart-beta
    title "Monthly Sales"
    x-axis [Jan, Feb, Mar, Apr, May, Jun]
    y-axis "Revenue (k)" 0 --> 100
    bar [30, 45, 52, 48, 65, 78]
    line [25, 40, 48, 52, 60, 72]`
    },
    'sankey': {
      name: 'Sankey Diagram',
      code: `sankey-beta

Marketing,Website,50
Marketing,Social,30
Marketing,Email,20
Website,Leads,35
Website,Bounce,15
Social,Leads,20
Email,Leads,15
Leads,Converted,50
Leads,Lost,20`
    },
    'block': {
      name: 'Block Diagram',
      code: `block-beta
    columns 3
    
    Frontend:3
    block:group1:1
        API
    end
    block:group2:2
        DB[(Database)]
        Cache[(Cache)]
    end`
    },
    'styling': {
      name: 'Custom Styling',
      code: `flowchart LR
    A[Start]:::highlight --> B[Process]
    B --> C[End]:::success

    classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:2px
    classDef success fill:#4caf50,stroke:#2e7d32,color:#fff`
    }
  };

  /**
   * Markdown example data for the interactive playground
   */
  private readonly markdownExamples: Record<string, { name: string; code: string }> = {
    'headings': {
      name: 'Headings',
      code: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4`
    },
    'formatting': {
      name: 'Text Formatting',
      code: `**Bold text** and *italic text*

***Bold and italic*** together

~~Strikethrough text~~

\`Inline code\` example`
    },
    'lists': {
      name: 'Lists',
      code: `- Bullet item one
- Bullet item two
  - Nested item
  - Another nested

1. First step
2. Second step
3. Third step

- [x] Completed task
- [ ] Incomplete task`
    },
    'links': {
      name: 'Links & Images',
      code: `[Visit Microsoft](https://microsoft.com)

[SharePoint Docs](https://docs.microsoft.com/sharepoint)

![Alt text for image](https://via.placeholder.com/150)`
    },
    'tables': {
      name: 'Tables',
      code: `| Name | Role | Status |
|------|------|--------|
| Alice | Developer | Active |
| Bob | Designer | Active |
| Carol | PM | On Leave |`
    },
    'blockquotes': {
      name: 'Blockquotes',
      code: `> This is a blockquote.
> It can span multiple lines.

> You can also
>> nest blockquotes`
    },
    'code': {
      name: 'Code Blocks',
      code: `\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\``
    },
    'team-page': {
      name: 'Sample: Team Page',
      code: `# Welcome to Our Team 👋

We're a **cross-functional** team focused on delivering *exceptional* results.

## Our Mission
> To innovate, collaborate, and deliver value every day.

## Team Members

| Name | Role | Contact |
|------|------|---------|
| Alice | Lead Dev | [Email](mailto:alice@example.com) |
| Bob | Designer | [Email](mailto:bob@example.com) |

## Quick Links
- [Team SharePoint](#)
- [Project Board](#)
- [Documentation](#)

---
*Last updated: December 2024*`
    }
  };

  /**
   * HTML example data for the interactive playground
   */
  private readonly htmlExamples: Record<string, { name: string; code: string }> = {
    'info-cards': {
      name: 'Info Cards',
      code: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px;">
    <h3 style="margin: 0 0 8px;">📊 Analytics</h3>
    <p style="margin: 0; opacity: 0.9;">View dashboard reports</p>
  </div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 12px;">
    <h3 style="margin: 0 0 8px;">📅 Calendar</h3>
    <p style="margin: 0; opacity: 0.9;">Team events</p>
  </div>
</div>`
    },
    'alert-box': {
      name: 'Alert Box',
      code: `<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; border-radius: 4px;">
  <div style="display: flex; align-items: center; gap: 12px;">
    <span style="font-size: 24px;">⚠️</span>
    <div>
      <strong style="color: #856404;">Important Notice</strong>
      <p style="margin: 4px 0 0; color: #856404;">System maintenance this weekend.</p>
    </div>
  </div>
</div>`
    },
    'success-box': {
      name: 'Success Box',
      code: `<div style="background: #d4edda; border-left: 4px solid #28a745; padding: 16px; border-radius: 4px;">
  <div style="display: flex; align-items: center; gap: 12px;">
    <span style="font-size: 24px;">✅</span>
    <div>
      <strong style="color: #155724;">Success!</strong>
      <p style="margin: 4px 0 0; color: #155724;">Your changes have been saved.</p>
    </div>
  </div>
</div>`
    },
    'quick-links': {
      name: 'Quick Links Grid',
      code: `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
  <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #f5f5f5; border-radius: 8px; text-decoration: none; color: #333;">
    <span style="font-size: 20px;">📧</span>
    <span>Contact Support</span>
  </a>
  <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #f5f5f5; border-radius: 8px; text-decoration: none; color: #333;">
    <span style="font-size: 20px;">📚</span>
    <span>Knowledge Base</span>
  </a>
</div>`
    },
    'stats-row': {
      name: 'Stats Row',
      code: `<div style="display: flex; gap: 16px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 120px; text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;">
    <div style="font-size: 32px; font-weight: bold; color: #0066cc;">1,234</div>
    <div style="color: #666; font-size: 14px;">Total Users</div>
  </div>
  <div style="flex: 1; min-width: 120px; text-align: center; padding: 20px; background: #f0fff4; border-radius: 8px;">
    <div style="font-size: 32px; font-weight: bold; color: #28a745;">98%</div>
    <div style="color: #666; font-size: 14px;">Satisfaction</div>
  </div>
</div>`
    },
    'hero-banner': {
      name: 'Hero Banner',
      code: `<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 40px; border-radius: 12px; text-align: center;">
  <h1 style="margin: 0 0 12px; font-size: 28px;">Welcome to the Portal</h1>
  <p style="margin: 0 0 20px; opacity: 0.9;">Your one-stop destination for all resources</p>
  <a href="#" style="display: inline-block; background: white; color: #1e3a5f; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Get Started</a>
</div>`
    }
  };

  /**
   * Initialize interactive example playgrounds in feature detail views
   */
  private initializeExamplePlaygrounds(): void {
    // Initialize Mermaid playground
    const mermaidSelect = this.domElement.querySelector('[data-example-select="mermaid"]') as HTMLSelectElement;
    if (mermaidSelect) {
      this.updateMermaidExample(mermaidSelect.value);
      mermaidSelect.addEventListener('change', (e) => {
        this.updateMermaidExample((e.target as HTMLSelectElement).value);
      });
    }

    // Initialize Markdown playground
    const markdownSelect = this.domElement.querySelector('[data-example-select="markdown"]') as HTMLSelectElement;
    if (markdownSelect) {
      this.updateMarkdownExample(markdownSelect.value);
      markdownSelect.addEventListener('change', (e) => {
        this.updateMarkdownExample((e.target as HTMLSelectElement).value);
      });
    }

    // Initialize HTML playground
    const htmlSelect = this.domElement.querySelector('[data-example-select="html"]') as HTMLSelectElement;
    if (htmlSelect) {
      this.updateHtmlExample(htmlSelect.value);
      htmlSelect.addEventListener('change', (e) => {
        this.updateHtmlExample((e.target as HTMLSelectElement).value);
      });
    }

    // Initialize copy buttons
    this.domElement.querySelectorAll('[data-copy-btn]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const type = (e.target as HTMLElement).getAttribute('data-copy-btn');
        let code = '';

        if (type === 'mermaid') {
          const select = this.domElement.querySelector('[data-example-select="mermaid"]') as HTMLSelectElement;
          code = this.mermaidExamples[select?.value]?.code || '';
        } else if (type === 'markdown') {
          const select = this.domElement.querySelector('[data-example-select="markdown"]') as HTMLSelectElement;
          code = this.markdownExamples[select?.value]?.code || '';
        } else if (type === 'html') {
          const select = this.domElement.querySelector('[data-example-select="html"]') as HTMLSelectElement;
          code = this.htmlExamples[select?.value]?.code || '';
        }

        if (code) {
          await navigator.clipboard.writeText(code);
          const button = e.target as HTMLElement;
          button.textContent = '✓ Copied!';
          button.classList.add(styles.copied);
          setTimeout(() => {
            button.textContent = '📋 Copy Code';
            button.classList.remove(styles.copied);
          }, 2000);
        }
      });
    });
  }

  /**
   * Update Mermaid example display
   */
  private async updateMermaidExample(exampleKey: string): Promise<void> {
    const example = this.mermaidExamples[exampleKey];
    if (!example) return;

    // Update code display
    const codeDisplay = this.domElement.querySelector('[data-code-display="mermaid"]');
    if (codeDisplay) {
      codeDisplay.textContent = example.code;
    }

    // Update preview
    const previewContainer = this.domElement.querySelector('[data-preview="mermaid"]');
    const mermaidDiv = previewContainer?.querySelector('.mermaid');
    if (mermaidDiv) {
      try {
        // Import mermaid dynamically to render
        const mermaid = await import('mermaid');
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'strict'
        });

        const uniqueId = `mermaid-preview-${Date.now()}`;
        const { svg } = await mermaid.default.render(uniqueId, example.code);
        mermaidDiv.innerHTML = svg;
      } catch {
        mermaidDiv.innerHTML = `<div style="color: #d32f2f; padding: 16px;">Error rendering diagram. This diagram type may require the latest Mermaid version.</div>`;
      }
    }
  }

  /**
   * Update Markdown example display
   */
  private updateMarkdownExample(exampleKey: string): void {
    const example = this.markdownExamples[exampleKey];
    if (!example) return;

    // Update code display
    const codeDisplay = this.domElement.querySelector('[data-code-display="markdown"]');
    if (codeDisplay) {
      codeDisplay.textContent = example.code;
    }

    // Update preview using ContentRenderer
    const previewContainer = this.domElement.querySelector('[data-preview="markdown"]');
    if (previewContainer) {
      const rendered = ContentRenderer.renderMarkdown(example.code);
      previewContainer.innerHTML = `<div class="${styles.playgroundPreviewHtml}">${rendered.html}</div>`;
    }
  }

  /**
   * Update HTML example display
   */
  private updateHtmlExample(exampleKey: string): void {
    const example = this.htmlExamples[exampleKey];
    if (!example) return;

    // Update code display (HTML escaped for display)
    const codeDisplay = this.domElement.querySelector('[data-code-display="html"]');
    if (codeDisplay) {
      codeDisplay.textContent = example.code;
    }

    // Update preview using ContentRenderer
    const previewContainer = this.domElement.querySelector('[data-preview="html"]');
    if (previewContainer) {
      const rendered = ContentRenderer.renderHtml(example.code);
      previewContainer.innerHTML = `<div class="${styles.playgroundPreviewHtml}">${rendered.html}</div>`;
    }
  }

  /**
   * Get feature detail content HTML
   */
  private getFeatureDetailHTML(feature: FeatureView, isDark: boolean): string {
    const themeClass = isDark ? styles.darkMode : '';

    const featureContent: Record<string, { icon: string; title: string; subtitle: string; content: string }> = {
      'tabbed-layouts': {
        icon: '&#9638;',
        title: 'Tabbed Layouts',
        subtitle: 'Organize web parts into clean, navigable tabs',
        content: `
          <h3>How It Works</h3>
          <p>PiCanvas dynamically restructures your SharePoint page to create a tabbed experience. When you assign web parts to tabs, PiCanvas identifies them in your section, creates tab navigation with your custom labels, and moves content into tab panels that show/hide based on selection.</p>

          <h3>Tab Orientation</h3>
          <table class="${styles.detailTable}">
            <tr><th>Option</th><th>Description</th></tr>
            <tr><td><strong>Horizontal</strong> (default)</td><td>Tabs appear at the top of the content</td></tr>
            <tr><td><strong>Vertical</strong></td><td>Tabs appear on the left or right side</td></tr>
          </table>
          <p>When using <strong>Vertical</strong> orientation, additional options appear:</p>
          <ul>
            <li><strong>Vertical Tab Position</strong> - Left side or Right side</li>
            <li><strong>Vertical Tab Width</strong> - 150px to 300px, or 25%/33% of container</li>
          </ul>

          <h3>Configuration Options</h3>
          <table class="${styles.detailTable}">
            <tr><th>Option</th><th>Values</th><th>Description</th></tr>
            <tr><td>Tab Style</td><td><code>default</code>, <code>pills</code>, <code>underline</code>, <code>boxed</code></td><td>Visual appearance of tab buttons</td></tr>
            <tr><td>Tab Alignment</td><td><code>left</code>, <code>center</code>, <code>right</code>, <code>stretch</code></td><td>Horizontal positioning of tabs</td></tr>
            <tr><td>Tab Count</td><td>1-20</td><td>Number of tabs in your layout</td></tr>
            <tr><td>Label Image Size</td><td><code>40px</code> to <code>120px</code>, or <code>No limit</code></td><td>Max height for images used as tab labels</td></tr>
          </table>

          <h3>Tab Label Options</h3>
          <p>Each tab supports two label types:</p>

          <h4>1. Text Labels (default)</h4>
          <ul>
            <li>Enter any text as the tab label</li>
            <li>Built-in <strong>icon picker</strong> with 30+ emoji icons (🏠 📅 📄 📊 ⚙️ etc.)</li>
            <li>Optional <strong>tab image URL</strong> with position options (left, right, top, background)</li>
            <li>Empty labels default to "Tab 1", "Tab 2", etc.</li>
          </ul>

          <h4>2. Web Part as Label</h4>
          <ul>
            <li>Select <strong>"Use web part as label"</strong> from the Label Type dropdown</li>
            <li>Choose any web part (Image, Text, etc.) to become the tab label</li>
            <li>Perfect for using logos, icons, or rich content as tab headers</li>
            <li><strong>Label Image Size</strong> controls the max height of images in web part labels</li>
            <li>Select <strong>"No limit (full size)"</strong> to let images fill their tab container</li>
          </ul>

          <h3>Tab Dividers</h3>
          <p>Add visual separators between tabs to create logical groupings:</p>
          <ul>
            <li>Enable <strong>"Add divider after this tab"</strong> toggle for any tab</li>
            <li>Dividers appear as subtle gradient lines between tabs</li>
            <li>Works in both horizontal and vertical orientations</li>
          </ul>

          <h3>Visual Structure</h3>
          <div class="${styles.detailDiagram}">Horizontal Layout:
┌─────────────────────────────────────────────────────────┐
│  [Tab 1]  [Tab 2] │ [Tab 3]                             │
├─────────────────────────────────────────────────────────┤
│   Web Part Content (dynamically shown/hidden)           │
└─────────────────────────────────────────────────────────┘

Vertical Layout:
┌──────────┬──────────────────────────────────────────────┐
│ [Tab 1]  │                                              │
│ [Tab 2]  │   Web Part Content                           │
│ ──────── │   (dynamically shown/hidden)                 │
│ [Tab 3]  │                                              │
└──────────┴──────────────────────────────────────────────┘</div>

          <h3>How to Configure</h3>
          <ol>
            <li>Open the property pane (edit web part settings)</li>
            <li>Click <strong>Add Tab</strong> for each tab you need</li>
            <li>Select a web part or section from the dropdown</li>
            <li>Choose label type: Text or Web Part</li>
            <li>For text labels: enter text and optionally add icons/images</li>
            <li>For web part labels: select the web part to use as the label</li>
            <li>Optionally enable dividers between tabs</li>
            <li>Adjust <strong>Label Image Size</strong> if using images</li>
          </ol>
        `
      },
      'section-support': {
        icon: '&#9633;',
        title: 'Section Support',
        subtitle: 'Group entire page sections into single tabs',
        content: `
          <h3>How It Works</h3>
          <p>PiCanvas detects all sections on your SharePoint page and offers them as tab targets alongside individual web parts. This lets you put entire multi-column layouts into a single tab while preserving the original column structure.</p>

          <h3>Section Detection</h3>
          <ul>
            <li><strong>Automatic scanning</strong> - Finds all <code>CanvasSection</code> elements on the page</li>
            <li><strong>Web part counting</strong> - Shows how many web parts each section contains</li>
            <li><strong>Smart exclusion</strong> - Automatically excludes the section containing PiCanvas itself</li>
            <li><strong>Empty filtering</strong> - Sections without web parts are hidden from the dropdown</li>
          </ul>

          <h3>Dropdown Display</h3>
          <div class="${styles.detailDiagram}">┌─────────────────────────────────────┐
│ Select web part or section...    ▼  │
├─────────────────────────────────────┤
│ >> Section 1 (3 web parts)          │  ← Sections marked with >>
│ >> Section 2 (2 web parts)          │
│ ─────────────────────────────────── │
│     Sec 1 | Left | Text             │  ← Individual web parts
│     Sec 1 | Right | Image           │
└─────────────────────────────────────┘</div>

          <h3>Column Layout Preservation</h3>
          <table class="${styles.detailTable}">
            <tr><th>SharePoint Layout</th><th>Columns</th><th>Preserved Width</th></tr>
            <tr><td>Full width</td><td>1</td><td>100%</td></tr>
            <tr><td>Two columns</td><td>2</td><td>50% each</td></tr>
            <tr><td>Three columns</td><td>3</td><td>33.33% each</td></tr>
            <tr><td>Asymmetric (1/3 + 2/3)</td><td>2</td><td>33.33% + 66.66%</td></tr>
          </table>

          <h3>Responsive Behavior</h3>
          <ul>
            <li>On screens &lt; 640px, all columns stack vertically</li>
            <li>Images automatically resize to fit their column width</li>
            <li>Original spacing and padding are preserved</li>
          </ul>
        `
      },
      'theme-aware': {
        icon: '&#9681;',
        title: 'Theme Aware',
        subtitle: 'Automatically adapts to light and dark modes',
        content: `
          <h3>Detection Strategy</h3>
          <p>PiCanvas uses a 3-tier priority system to detect the correct theme:</p>

          <div class="${styles.detailDiagram}">┌─────────────────────────────────────────────────────────┐
│ 1. Manual Override (Highest Priority)                   │
│    User explicitly sets Light/Dark in property pane     │
├─────────────────────────────────────────────────────────┤
│ 2. SharePoint Theme State                               │
│    Reads window.__themeState__.theme.isInverted         │
│    Most reliable for SharePoint Online                  │
├─────────────────────────────────────────────────────────┤
│ 3. Luminance Calculation                                │
│    Analyzes section background color                    │
│    Formula: (0.299×R + 0.587×G + 0.114×B) / 255        │
│    Dark if luminance &lt; 50%                              │
├─────────────────────────────────────────────────────────┤
│ 4. Fallback → Light mode (default)                      │
└─────────────────────────────────────────────────────────┘</div>

          <h3>Theme Configuration</h3>
          <table class="${styles.detailTable}">
            <tr><th>Setting</th><th>Behavior</th></tr>
            <tr><td><strong>Auto</strong> (default)</td><td>Detects from SharePoint theme and section background</td></tr>
            <tr><td><strong>Light</strong></td><td>Forces light mode regardless of page theme</td></tr>
            <tr><td><strong>Dark</strong></td><td>Forces dark mode regardless of page theme</td></tr>
          </table>

          <h3>Design System</h3>
          <p>PiCanvas uses CSS custom properties for consistent theming:</p>

          <table class="${styles.detailTable}">
            <tr><th>Property</th><th>Light Mode</th><th>Dark Mode</th></tr>
            <tr><td><code>--pi-bg-primary</code></td><td>#ffffff</td><td>#181818</td></tr>
            <tr><td><code>--pi-bg-secondary</code></td><td>#f5f5f7</td><td>#232323</td></tr>
            <tr><td><code>--pi-text-primary</code></td><td>#1d1d1f</td><td>#ffffff</td></tr>
            <tr><td><code>--pi-text-secondary</code></td><td>#424245</td><td>#b3b3b3</td></tr>
            <tr><td><code>--pi-accent</code></td><td>#0066cc</td><td>#4da6ff</td></tr>
          </table>

          <h3>Accessibility</h3>
          <ul>
            <li>All color combinations meet <strong>WCAG AAA</strong> contrast requirements</li>
            <li>Primary text maintains 18:1+ contrast ratio</li>
            <li>Interactive elements maintain 10:1+ contrast ratio</li>
            <li>Supports system-level dark mode preference via <code>prefers-color-scheme</code></li>
          </ul>
        `
      },
      'permission-based': {
        icon: '&#128274;',
        title: 'Permission-Based Visibility',
        subtitle: 'Control tab visibility based on SharePoint group membership',
        content: `
          <h3>How It Works</h3>
          <p>PiCanvas can show or hide individual tabs based on the current user's SharePoint group membership. When permission checking is enabled for a tab, only users in the specified groups will see that tab. This enables personalized experiences without duplicating content.</p>

          <h3>Permission Logic</h3>
          <div class="${styles.detailDiagram}">┌─────────────────────────────────────────────────────────┐
│ User Opens Page                                         │
├─────────────────────────────────────────────────────────┤
│ 1. Load user's group memberships (cached 5 min)         │
│ 2. For each tab with permissions enabled:               │
│    → Check if user is in ANY specified group (OR logic) │
│    → Show tab if member, hide if not                    │
│ 3. Tabs without permissions → visible to everyone       │
└─────────────────────────────────────────────────────────┘</div>

          <h3>Supported Groups</h3>
          <table class="${styles.detailTable}">
            <tr><th>Group Type</th><th>Description</th></tr>
            <tr><td><strong>Site Owners</strong></td><td>Users with full control of the site</td></tr>
            <tr><td><strong>Site Members</strong></td><td>Users with contribute permissions</td></tr>
            <tr><td><strong>Site Visitors</strong></td><td>Users with read-only access</td></tr>
            <tr><td><strong>Custom Group IDs</strong></td><td>Any SharePoint group by ID number</td></tr>
          </table>

          <h3>Quick Presets</h3>
          <p>The property pane offers convenient presets for common scenarios:</p>
          <table class="${styles.detailTable}">
            <tr><th>Preset</th><th>Groups Included</th></tr>
            <tr><td>Everyone</td><td>No restriction (default)</td></tr>
            <tr><td>Site Owners</td><td>Owners only</td></tr>
            <tr><td>Site Members</td><td>Members only</td></tr>
            <tr><td>Site Visitors</td><td>Visitors only</td></tr>
            <tr><td>Owners &amp; Members</td><td>Owners + Members</td></tr>
            <tr><td>Members &amp; Visitors</td><td>Members + Visitors</td></tr>
            <tr><td>All Site Groups</td><td>Owners + Members + Visitors</td></tr>
          </table>

          <h3>Custom Group IDs</h3>
          <p>For advanced scenarios, enter SharePoint group IDs directly:</p>
          <ul>
            <li>Find group IDs in SharePoint: <code>/_layouts/15/groups.aspx</code></li>
            <li>Enter as comma-separated values: <code>5, 12, 23</code></li>
            <li>Custom IDs work alongside standard group selections</li>
          </ul>

          <h3>How to Configure</h3>
          <ol>
            <li>Open the property pane for any tab</li>
            <li>Enable <strong>"Restrict by Group"</strong> toggle</li>
            <li>Select groups from the <strong>"Visible to Groups"</strong> dropdown</li>
            <li>Optionally add custom group IDs</li>
            <li>Save changes - permissions apply immediately</li>
          </ol>

          <h3>Performance &amp; Reliability</h3>
          <ul>
            <li><strong>5-minute cache</strong> - Group data is cached to minimize API calls</li>
            <li><strong>Pre-loaded on init</strong> - Permissions load in background for fast first render</li>
            <li><strong>Graceful fallback</strong> - If API fails, all tabs remain visible (fail-open)</li>
            <li><strong>Template support</strong> - Permission settings export/import with templates</li>
          </ul>

          <h3>Use Cases</h3>
          <ul>
            <li><strong>Admin tabs</strong> - Show management tools only to Owners</li>
            <li><strong>Member features</strong> - Display collaboration tools to Members</li>
            <li><strong>Public content</strong> - Keep some tabs visible to all, hide others</li>
            <li><strong>Department pages</strong> - Target content to specific security groups</li>
          </ul>
        `
      },
      'content-markdown': {
        icon: '📝',
        title: 'Markdown Content',
        subtitle: 'Write beautifully formatted text using simple syntax',
        content: `
          <h3>What is Markdown?</h3>
          <p>Markdown is a lightweight markup language that lets you write formatted content using plain text. It's easy to learn and produces clean, readable HTML output. PiCanvas uses <strong>GitHub Flavored Markdown (GFM)</strong> for full compatibility.</p>

          <h3>How to Use</h3>
          <ol>
            <li>Select <strong>"Markdown Content"</strong> from the Content Type dropdown</li>
            <li>Enter your Markdown text in the content field</li>
            <li>See a live preview below your content as you type</li>
            <li>Save your changes - content renders instantly</li>
          </ol>

          <h3>Basic Syntax Reference</h3>
          <table class="${styles.detailTable}">
            <tr><th>Element</th><th>Syntax</th><th>Output</th></tr>
            <tr><td>Heading 1</td><td><code># Heading</code></td><td>Large title</td></tr>
            <tr><td>Heading 2</td><td><code>## Heading</code></td><td>Section title</td></tr>
            <tr><td>Heading 3</td><td><code>### Heading</code></td><td>Subsection title</td></tr>
            <tr><td>Bold</td><td><code>**bold text**</code></td><td><strong>bold text</strong></td></tr>
            <tr><td>Italic</td><td><code>*italic text*</code></td><td><em>italic text</em></td></tr>
            <tr><td>Bold + Italic</td><td><code>***both***</code></td><td><strong><em>both</em></strong></td></tr>
            <tr><td>Strikethrough</td><td><code>~~deleted~~</code></td><td><del>deleted</del></td></tr>
            <tr><td>Inline Code</td><td><code>\`code\`</code></td><td><code>code</code></td></tr>
            <tr><td>Link</td><td><code>[text](url)</code></td><td><a href="#">text</a></td></tr>
            <tr><td>Image</td><td><code>![alt](url)</code></td><td>Image</td></tr>
          </table>

          <h3>🎮 Interactive Examples</h3>
          <p>Select an example below to see the code and live preview. Click <strong>Copy Code</strong> to use it in your tabs!</p>

          <div class="${styles.examplePlayground}" data-playground="markdown">
            <div class="${styles.playgroundHeader}">
              <span class="${styles.playgroundLabel}">Example:</span>
              <select class="${styles.playgroundSelect}" data-example-select="markdown">
                <option value="headings">📑 Headings</option>
                <option value="formatting">✏️ Text Formatting</option>
                <option value="lists">📋 Lists</option>
                <option value="links">🔗 Links & Images</option>
                <option value="tables">📊 Tables</option>
                <option value="blockquotes">💬 Blockquotes</option>
                <option value="code">💻 Code Blocks</option>
                <option value="team-page">📄 Sample: Team Page</option>
              </select>
              <button class="${styles.playgroundCopyBtn}" data-copy-btn="markdown">📋 Copy Code</button>
            </div>
            <div class="${styles.playgroundBody}">
              <div class="${styles.playgroundCode}">
                <pre data-code-display="markdown"></pre>
              </div>
              <div class="${styles.playgroundPreview}" data-preview="markdown"></div>
            </div>
          </div>

          <h3>Security</h3>
          <ul>
            <li>All Markdown is <strong>sanitized</strong> before rendering to prevent XSS attacks</li>
            <li><code>&lt;script&gt;</code> tags and event handlers are automatically removed</li>
            <li>Links open in new tabs with <code>rel="noopener"</code> for security</li>
            <li>Images are rendered safely without executing embedded code</li>
          </ul>

          <h3>More Resources</h3>
          <ul>
            <li><a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener">Markdown Guide - Basic Syntax</a></li>
            <li><a href="https://github.github.com/gfm/" target="_blank" rel="noopener">GitHub Flavored Markdown Spec</a></li>
          </ul>
        `
      },
      'content-html': {
        icon: '🌐',
        title: 'HTML Content',
        subtitle: 'Use custom HTML for advanced layouts and styling',
        content: `
          <h3>What is HTML Content?</h3>
          <p>HTML Content mode lets you write raw HTML directly into your tabs. This is perfect for advanced users who need precise control over layout, custom styling, or complex structures that Markdown can't provide.</p>

          <h3>How to Use</h3>
          <ol>
            <li>Select <strong>"HTML Content"</strong> from the Content Type dropdown</li>
            <li>Enter your HTML code in the content field</li>
            <li>See a live preview below your content as you type</li>
            <li>Save your changes - HTML renders after sanitization</li>
          </ol>

          <h3>Allowed HTML Elements</h3>
          <table class="${styles.detailTable}">
            <tr><th>Category</th><th>Elements</th></tr>
            <tr><td>Structure</td><td><code>div</code>, <code>span</code>, <code>section</code>, <code>article</code>, <code>header</code>, <code>footer</code>, <code>nav</code>, <code>main</code>, <code>aside</code></td></tr>
            <tr><td>Text</td><td><code>p</code>, <code>h1-h6</code>, <code>strong</code>, <code>em</code>, <code>b</code>, <code>i</code>, <code>u</code>, <code>s</code>, <code>mark</code>, <code>small</code></td></tr>
            <tr><td>Lists</td><td><code>ul</code>, <code>ol</code>, <code>li</code>, <code>dl</code>, <code>dt</code>, <code>dd</code></td></tr>
            <tr><td>Tables</td><td><code>table</code>, <code>thead</code>, <code>tbody</code>, <code>tfoot</code>, <code>tr</code>, <code>th</code>, <code>td</code></td></tr>
            <tr><td>Media</td><td><code>img</code>, <code>figure</code>, <code>figcaption</code>, <code>video</code>, <code>audio</code></td></tr>
            <tr><td>Forms</td><td><code>form</code>, <code>input</code>, <code>button</code>, <code>select</code>, <code>textarea</code>, <code>label</code></td></tr>
            <tr><td>Links</td><td><code>a</code> (with <code>href</code>, <code>target</code>, <code>rel</code> attributes)</td></tr>
          </table>

          <h3>🎮 Interactive Examples</h3>
          <p>Select an example below to see the code and live preview. Click <strong>Copy Code</strong> to use it in your tabs!</p>

          <div class="${styles.examplePlayground}" data-playground="html">
            <div class="${styles.playgroundHeader}">
              <span class="${styles.playgroundLabel}">Example:</span>
              <select class="${styles.playgroundSelect}" data-example-select="html">
                <option value="info-cards">🎨 Info Cards</option>
                <option value="alert-box">⚠️ Alert Box</option>
                <option value="success-box">✅ Success Box</option>
                <option value="quick-links">🔗 Quick Links Grid</option>
                <option value="stats-row">📊 Stats Row</option>
                <option value="hero-banner">🖼️ Hero Banner</option>
              </select>
              <button class="${styles.playgroundCopyBtn}" data-copy-btn="html">📋 Copy Code</button>
            </div>
            <div class="${styles.playgroundBody}">
              <div class="${styles.playgroundCode}">
                <pre data-code-display="html"></pre>
              </div>
              <div class="${styles.playgroundPreview}" data-preview="html"></div>
            </div>
          </div>

          <h3>Security &amp; Sanitization</h3>
          <ul>
            <li>All HTML is <strong>sanitized</strong> using DOMPurify before rendering</li>
            <li><code>&lt;script&gt;</code> tags are <strong>completely removed</strong></li>
            <li>Event handlers (<code>onclick</code>, <code>onerror</code>, etc.) are <strong>stripped</strong></li>
            <li><code>&lt;style&gt;</code> tags are removed (use inline styles instead)</li>
            <li>Embedded iframes are validated against the trusted domain list</li>
          </ul>

          <h3>Blocked Elements &amp; Attributes</h3>
          <table class="${styles.detailTable}">
            <tr><th>Blocked</th><th>Reason</th></tr>
            <tr><td><code>&lt;script&gt;</code></td><td>JavaScript execution risk</td></tr>
            <tr><td><code>&lt;style&gt;</code></td><td>CSS injection risk</td></tr>
            <tr><td><code>onclick</code>, <code>onerror</code>, etc.</td><td>Event handler XSS risk</td></tr>
            <tr><td><code>javascript:</code> URLs</td><td>JavaScript execution risk</td></tr>
          </table>

          <h3>More Resources</h3>
          <ul>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener">MDN HTML Documentation</a></li>
            <li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener">CSS Flexbox Guide</a></li>
            <li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener">CSS Grid Guide</a></li>
          </ul>
        `
      },
      'content-iframe': {
        icon: '🖼️',
        title: 'Embed (iframe) Content',
        subtitle: 'Embed videos, apps, dashboards, and external content securely',
        content: `
          <h3>What are Embeds?</h3>
          <p>Embeds let you display external content inside your tabs using iframes. Perfect for videos, Power BI dashboards, Microsoft Forms, and many other web applications. PiCanvas validates all embed URLs against a trusted domain list for security.</p>

          <h3>How to Use</h3>
          <ol>
            <li>Select <strong>"Embed (iframe)"</strong> from the Content Type dropdown</li>
            <li>Paste your embed URL (must be from a trusted domain)</li>
            <li>Optionally adjust the height (default: 400px)</li>
            <li>Save your changes - content loads securely</li>
          </ol>

          <h3>Trusted Domains (Built-in)</h3>
          <table class="${styles.detailTable}">
            <tr><th>Category</th><th>Domains</th></tr>
            <tr><td><strong>Video</strong></td><td>YouTube, Vimeo, Microsoft Stream</td></tr>
            <tr><td><strong>Microsoft 365</strong></td><td>SharePoint, OneDrive, Sway, Loop, Teams</td></tr>
            <tr><td><strong>Power Platform</strong></td><td>Power BI, Power Apps, Power Automate</td></tr>
            <tr><td><strong>Forms</strong></td><td>Microsoft Forms, Typeform, Calendly</td></tr>
            <tr><td><strong>Design</strong></td><td>Canva, Figma, Miro, Lucidchart, Whimsical</td></tr>
            <tr><td><strong>Productivity</strong></td><td>Notion, Airtable, Coda, Mural, Pitch</td></tr>
            <tr><td><strong>Other</strong></td><td>Loom, and more...</td></tr>
          </table>

          <h3>Getting Embed URLs</h3>

          <h4>YouTube</h4>
          <div class="${styles.detailDiagram}">1. Go to the YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from the src attribute:
   https://www.youtube.com/embed/VIDEO_ID

Or convert a regular URL:
https://www.youtube.com/watch?v=VIDEO_ID
→ https://www.youtube.com/embed/VIDEO_ID</div>

          <h4>Power BI</h4>
          <div class="${styles.detailDiagram}">1. Open your report in Power BI
2. Click File → Embed report → Website or portal
3. Copy the provided embed URL:
   https://app.powerbi.com/reportEmbed?reportId=...

Note: Ensure proper sharing permissions are set.</div>

          <h4>Microsoft Forms</h4>
          <div class="${styles.detailDiagram}">1. Open your form in Microsoft Forms
2. Click "Collect responses" → "Embed"
3. Copy the URL from the embed code:
   https://forms.office.com/Pages/ResponsePage.aspx?id=...</div>

          <h4>SharePoint Document</h4>
          <div class="${styles.detailDiagram}">1. Open the document in SharePoint
2. Click "..." → "Embed"
3. Copy the embed URL from the code snippet:
   https://yourtenant.sharepoint.com/sites/.../embed.aspx?...</div>

          <h3>Custom Domain Allow List</h3>
          <p>Site administrators can add custom domains by creating a JSON file:</p>
          <div class="${styles.detailDiagram}">Location: /SiteAssets/PiCanvas/embed-allowlist.json

{
  "allowedDomains": [
    "custom-app.contoso.com",
    "internal-tool.company.com",
    "trusted-service.io"
  ]
}</div>

          <h3>Height Options</h3>
          <table class="${styles.detailTable}">
            <tr><th>Value</th><th>Use Case</th></tr>
            <tr><td>300px</td><td>Compact forms, small videos</td></tr>
            <tr><td>400px</td><td>Default - good for most content</td></tr>
            <tr><td>500px</td><td>Standard video aspect ratio</td></tr>
            <tr><td>600px</td><td>Dashboards, detailed forms</td></tr>
            <tr><td>100%</td><td>Fill available tab height</td></tr>
          </table>

          <h3>Security Features</h3>
          <ul>
            <li><strong>HTTPS only</strong> - HTTP URLs are rejected</li>
            <li><strong>Domain validation</strong> - URLs checked against allow list</li>
            <li><strong>Sandbox attributes</strong> - Iframes run with restricted permissions</li>
            <li><strong>No JavaScript access</strong> - Embedded content can't access parent page</li>
            <li><strong>Lazy loading</strong> - Embeds load on-demand for better performance</li>
          </ul>

          <h3>Troubleshooting</h3>
          <table class="${styles.detailTable}">
            <tr><th>Issue</th><th>Solution</th></tr>
            <tr><td>Embed shows blocked message</td><td>Domain not in allow list - contact admin to add it</td></tr>
            <tr><td>Embed shows blank</td><td>Check if URL requires authentication or has sharing restrictions</td></tr>
            <tr><td>Content doesn't fit</td><td>Adjust the height setting or use percentage values</td></tr>
            <tr><td>Power BI not loading</td><td>Verify report sharing settings allow embedding</td></tr>
          </table>
        `
      },
      'content-mermaid': {
        icon: '📊',
        title: 'Mermaid Diagrams',
        subtitle: 'Create flowcharts, sequences, Gantt charts, and 20+ diagram types',
        content: `
          <h3>What is Mermaid?</h3>
          <p>Mermaid is a JavaScript-based diagramming tool that renders text definitions into beautiful diagrams. Write simple text syntax and PiCanvas automatically generates professional diagrams. Perfect for documentation, process flows, org charts, timelines, and more!</p>

          <h3>How to Use</h3>
          <ol>
            <li>Select <strong>"Mermaid Diagram"</strong> from the Content Type dropdown</li>
            <li>Enter your Mermaid diagram code</li>
            <li>See a live preview as you type</li>
            <li>Save - diagrams render beautifully on your page</li>
          </ol>

          <h3>🎮 Interactive Examples</h3>
          <p>Select a diagram type below to see the code and live preview. Click <strong>Copy Code</strong> to use it in your tabs!</p>

          <div class="${styles.examplePlayground}" data-playground="mermaid">
            <div class="${styles.playgroundHeader}">
              <span class="${styles.playgroundLabel}">Diagram Type:</span>
              <select class="${styles.playgroundSelect}" data-example-select="mermaid">
                <option value="flowchart">📊 Flowchart</option>
                <option value="flowchart-shapes">📊 Flowchart - Node Shapes</option>
                <option value="sequence">📋 Sequence Diagram</option>
                <option value="class">📐 Class Diagram</option>
                <option value="state">🔄 State Diagram</option>
                <option value="er">🔗 Entity Relationship</option>
                <option value="journey">🚶 User Journey</option>
                <option value="gantt">📅 Gantt Chart</option>
                <option value="pie">🥧 Pie Chart</option>
                <option value="quadrant">📍 Quadrant Chart</option>
                <option value="mindmap">🧠 Mind Map</option>
                <option value="timeline">⏰ Timeline</option>
                <option value="kanban">📌 Kanban Board</option>
                <option value="gitgraph">🔀 Git Graph</option>
                <option value="xychart">📊 XY Chart</option>
                <option value="sankey">🌊 Sankey Diagram</option>
                <option value="block">📦 Block Diagram</option>
                <option value="styling">🎨 Custom Styling</option>
              </select>
              <button class="${styles.playgroundCopyBtn}" data-copy-btn="mermaid">📋 Copy Code</button>
            </div>
            <div class="${styles.playgroundBody}">
              <div class="${styles.playgroundCode}">
                <pre data-code-display="mermaid"></pre>
              </div>
              <div class="${styles.playgroundPreview}" data-preview="mermaid">
                <div class="mermaid" data-mermaid-preview="true"></div>
              </div>
            </div>
          </div>

          <h3>Direction Options</h3>
          <table class="${styles.detailTable}">
            <tr><th>Code</th><th>Direction</th></tr>
            <tr><td><code>TD</code> or <code>TB</code></td><td>Top to Bottom</td></tr>
            <tr><td><code>BT</code></td><td>Bottom to Top</td></tr>
            <tr><td><code>LR</code></td><td>Left to Right</td></tr>
            <tr><td><code>RL</code></td><td>Right to Left</td></tr>
          </table>

          <h3>More Resources</h3>
          <ul>
            <li><a href="https://mermaid.js.org/syntax/flowchart.html" target="_blank" rel="noopener">Mermaid Official Documentation</a></li>
            <li><a href="https://mermaid.live" target="_blank" rel="noopener">Mermaid Live Editor</a> - Test diagrams online</li>
            <li>Experiment with the live preview in PiCanvas property pane</li>
          </ul>

          <h3>Troubleshooting</h3>
          <table class="${styles.detailTable}">
            <tr><th>Issue</th><th>Solution</th></tr>
            <tr><td>Diagram shows error</td><td>Check syntax - expand error details for specifics</td></tr>
            <tr><td>Missing elements</td><td>Ensure proper indentation and arrow syntax</td></tr>
            <tr><td>Text cut off</td><td>Use shorter labels or abbreviations</td></tr>
            <tr><td>Theme mismatch</td><td>Diagrams auto-adapt to dark/light mode</td></tr>
          </table>
        `
      }
    };

    const content = featureContent[feature];
    if (!content) return '';

    return `
      <div class="${styles.piCanvas} ${themeClass}" data-theme="${isDark ? 'dark' : 'light'}">
        <div class="${styles.container}">
          <div class="${styles.body}">
            <div class="${styles.featureDetail}">
              <button class="${styles.backButton}" data-action="back">
                <span class="${styles.backArrow}">←</span>
                Back to Overview
              </button>

              <div class="${styles.detailHeader}">
                <span class="${styles.detailIconLarge}">${content.icon}</span>
                <div class="${styles.detailTitleGroup}">
                  <h1 class="${styles.detailTitle}">${content.title}</h1>
                  <p class="${styles.detailSubtitle}">${content.subtitle}</p>
                </div>
              </div>

              <div class="${styles.detailContent}">
                ${content.content}
              </div>

              <div class="${styles.versionInfo}">
                <div class="${styles.versionHeader}">
                  <h3 class="${styles.versionTitle}">Build Information</h3>
                  <span class="${styles.versionBadge}">v${PICANVAS_VERSION}</span>
                </div>
                <div class="${styles.versionGrid}">
                  <div class="${styles.versionItem}">
                    <span class="${styles.versionLabel}">PiCanvas Version</span>
                    <span class="${styles.versionValue}">${PICANVAS_VERSION}</span>
                  </div>
                  <div class="${styles.versionItem}">
                    <span class="${styles.versionLabel}">SPFx Version</span>
                    <span class="${styles.versionValue}"><a href="https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.22" target="_blank" rel="noopener">${SPFX_VERSION}</a></span>
                  </div>
                  <div class="${styles.versionItem}">
                    <span class="${styles.versionLabel}">Node.js</span>
                    <span class="${styles.versionValue}">${NODE_VERSION}</span>
                  </div>
                  <div class="${styles.versionItem}">
                    <span class="${styles.versionLabel}">Dependencies</span>
                    <span class="${styles.versionValue}"><a href="https://jquery.com/" target="_blank" rel="noopener">jQuery 3.6.0</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Build tabData array from dynamic properties (tab1WebPartID, tab1Label, etc.)
   */
  private getTabDataFromProperties(): ITabDataItem[] {
    const tabData: ITabDataItem[] = [];
    const numTabs = this.properties.tabCount || 2;

    // Helper to safely get string property (prevents [object Object])
    const safeString = (val: unknown): string => {
      if (!val) return '';
      return typeof val === 'string' ? val : String(val);
    };

    // Check configured tabs (label is optional - will default to "Tab N")
    for (let i = 1; i <= numTabs; i++) {
      const webPartIDKey = `tab${i}WebPartID`;
      const labelKey = `tab${i}Label`;
      const contentTypeKey = `tab${i}ContentType`;

      const webPartID = safeString(this.properties[webPartIDKey]);
      const label = safeString(this.properties[labelKey]);
      const contentType = safeString(this.properties[contentTypeKey]) || 'webpart';

      // Determine if tab has valid content based on its content type
      let hasValidContent = false;
      if (contentType === 'webpart' || contentType === 'section') {
        // WebPart/Section types require a WebPartID
        hasValidContent = !!webPartID;
      } else if (contentType === 'markdown' || contentType === 'html' || contentType === 'mermaid') {
        // Custom content types - allow even empty content so users can configure it
        hasValidContent = true;
      } else if (contentType === 'embed') {
        // Embed type requires embedUrl (or allow empty for configuration)
        hasValidContent = true; // Allow even empty so users can configure it
      }

      if (hasValidContent) {
        // Check permission
        if (!this.isTabVisibleToUser(i)) {
          // Check if placeholder is enabled for this tab
          const showPlaceholder = this.properties[`tab${i}PermissionPlaceholder`] as boolean;
          if (showPlaceholder) {
            // Add as placeholder tab (visible but disabled)
            const placeholderText = safeString(this.properties[`tab${i}PermissionPlaceholderText`]) || strings.PermissionPlaceholderDefault;
            tabData.push({
              WebPartID: '', // No content for placeholder
              TabLabel: label || `Tab ${i}`,
              originalTabIndex: i,
              isPlaceholder: true,
              placeholderText: placeholderText
            });
          }
          // If no placeholder, skip this tab entirely (hidden)
          continue;
        }

        tabData.push({
          WebPartID: webPartID, // May be empty for custom content types
          TabLabel: label || '',  // Empty string if no label, render will handle default
          originalTabIndex: i     // Track original index for property lookup
        });
      }
    }

    return tabData;
  }

  /**
   * Get the section number for a webpart element
   */
  private getSectionNumber(element: JQuery<HTMLElement>): number {
    const section = element.closest("div." + this.properties.sectionClass);
    const allSections = $("div." + this.properties.sectionClass);
    let sectionNum = 0;
    allSections.each(function(index) {
      if ($(this).is(section)) {
        sectionNum = index + 1;
        return false; // break
      }
    });
    return sectionNum;
  }

  /**
   * Get detailed information about a webpart for the dropdown label
   */
  private getWebPartDetails(element: JQuery<HTMLElement>): {
    type: string | null;
    title: string | null;
    column: number;
    columnName: string;
    preview: string | null;
  } {
    const MAX_TITLE_LENGTH = 30;
    const MAX_PREVIEW_LENGTH = 25;

    // Helper to truncate and clean title
    const cleanTitle = (title: string): string => {
      // Remove accessibility instructions (text after "Press Enter" or "When inside")
      let cleaned = title.split(/\.\s*(Press Enter|When inside)/i)[0].trim();
      // Remove "web part" suffix if present
      cleaned = cleaned.replace(/\s*web\s*part$/i, '').trim();
      // Truncate if too long
      if (cleaned.length > MAX_TITLE_LENGTH) {
        cleaned = cleaned.substring(0, MAX_TITLE_LENGTH - 3) + '...';
      }
      return cleaned;
    };

    // Helper to extract webpart type from aria-label
    const extractWebPartType = (ariaLabel: string): string | null => {
      // Extract just the webpart type from beginning of aria-label
      // e.g., "Text web part beginning with..." -> "Text"
      // e.g., "Banner web part..." -> "Banner"
      // e.g., "Image web part, showing..." -> "Image"
      const match = ariaLabel.match(/^(\w+(?:\s+\w+)?)\s+web\s*part/i);
      if (match) {
        return match[1];
      }
      return null;
    };

    let webpartType: string | null = null;
    let title: string | null = null;

    // Method 1: Look for data-sp-web-part-title attribute or title region
    const titleAttr = element.find('[data-automation-id="titleRegion"]').text().trim();
    if (titleAttr) {
      title = cleanTitle(titleAttr);
    }

    // Method 2: Look for heading elements within the webpart (but not in toolbars/menus)
    if (!title) {
      const heading = element.find('h1, h2, h3, [role="heading"]').not('[role="menubar"] *, [role="toolbar"] *, [role="menu"] *').first().text().trim();
      if (heading && heading.length > 2 && heading.length < 50) {
        title = cleanTitle(heading);
      }
    }

    // Method 3: Look for aria-label on element or its children to get type
    let ariaLabel = element.attr('aria-label');
    if (ariaLabel) {
      webpartType = extractWebPartType(ariaLabel);
    }

    // Then check child elements with aria-label containing "web part"
    if (!webpartType) {
      const childWithAriaLabel = element.find('[aria-label*="web part"], [aria-label*="Web Part"]')
        .not('[role="menuitem"]')
        .first();
      if (childWithAriaLabel.length) {
        ariaLabel = childWithAriaLabel.attr('aria-label');
        if (ariaLabel) {
          webpartType = extractWebPartType(ariaLabel);
        }
      }
    }

    // Method 4: Look for Placeholder-text class (used by unconfigured webparts like Image, File, etc.)
    if (!webpartType) {
      const placeholderText = element.find('.Placeholder-text').first().text().trim();
      if (placeholderText && placeholderText.length > 1 && placeholderText.length < 30) {
        webpartType = placeholderText;
      }
    }

    // Method 5: Try to identify by common webpart patterns
    if (!webpartType) {
      // Check for common webpart indicators
      if (element.find('[data-automation-id="textbox"]').length) {
        webpartType = 'Text';
      } else if (element.find('img').length) {
        webpartType = 'Image';
      } else if (element.find('iframe').length) {
        webpartType = 'Embed';
      } else if (element.find('[data-automation-id="HeroWebPart"]').length) {
        webpartType = 'Hero';
      } else if (element.find('[data-automation-id="quickLinksWebPart"]').length) {
        webpartType = 'Quick Links';
      } else if (element.find('.ms-DocumentCard').length) {
        webpartType = 'Document';
      }
    }

    // Get column position
    const column = element.closest('[data-automation-id="CanvasColumn"]');
    let columnNum = 1;
    let columnName = 'Full';

    if (column.length) {
      const section = column.closest('[data-automation-id="CanvasSection"]');
      if (section.length) {
        const allColumns = section.find('[data-automation-id="CanvasColumn"]');
        allColumns.each((index: number, col: HTMLElement) => {
          if ($(col).is(column)) {
            columnNum = index + 1;
            return false;
          }
        });

        // Determine column name based on position and total columns
        const totalColumns = allColumns.length;
        if (totalColumns === 1) {
          columnName = 'Full';
        } else if (totalColumns === 2) {
          columnName = columnNum === 1 ? 'Left' : 'Right';
        } else if (totalColumns === 3) {
          columnName = columnNum === 1 ? 'Left' : (columnNum === 2 ? 'Center' : 'Right');
        } else {
          columnName = `Col ${columnNum}`;
        }
      }
    }

    // Extract preview content based on webpart type
    let preview: string | null = null;

    if (webpartType === 'Image' || element.find('img').length) {
      // For images: try to get filename from src or alt text
      const img = element.find('img').first();
      if (img.length) {
        const alt = img.attr('alt');
        const src = img.attr('src') || '';

        if (alt && alt.length > 1 && alt.length < 50 && alt.toLowerCase().indexOf('web part') === -1) {
          preview = alt;
        } else if (src) {
          // Extract filename from URL
          const urlParts = src.split('/');
          let filename = urlParts[urlParts.length - 1];
          // Remove query params
          filename = filename.split('?')[0];
          // Decode URI and clean up
          try {
            filename = decodeURIComponent(filename);
          } catch { /* ignore decode errors */ }
          // Truncate if needed
          if (filename && filename.length > 1 && filename.length < 60) {
            preview = filename.length > MAX_PREVIEW_LENGTH
              ? filename.substring(0, MAX_PREVIEW_LENGTH - 3) + '...'
              : filename;
          }
        }
      }
    } else if (webpartType === 'Text' || element.find('[data-automation-id="textbox"]').length) {
      // For text: get first line of text content
      const textBox = element.find('[data-automation-id="textbox"]').first();
      if (textBox.length) {
        let textContent = textBox.text().trim();
        // Clean up whitespace
        textContent = textContent.replace(/\s+/g, ' ');
        if (textContent.length > 1) {
          preview = textContent.length > MAX_PREVIEW_LENGTH
            ? `"${textContent.substring(0, MAX_PREVIEW_LENGTH - 3)}..."`
            : `"${textContent}"`;
        }
      }
    }

    return {
      type: webpartType,
      title: title,
      column: columnNum,
      columnName: columnName,
      preview: preview
    };
  }

  /**
   * Try to extract a meaningful title for a webpart from the DOM
   */
  private getWebPartTitle(element: JQuery<HTMLElement>): string | null {
    const details = this.getWebPartDetails(element);
    return details.type || details.title || null;
  }

  /**
   * Get all sections (rows) and columns on the page with their IDs
   * Returns array of [id, label, sectionNumber]
   *
   * Modern SharePoint DOM structure:
   * - Sections: elements with data-automation-id="CanvasSection" (or configurable class)
   * - Columns: elements with data-automation-id="CanvasColumn" inside a section
   * - Web parts: ControlZone / CanvasControl inside columns
   *
   * This method returns both:
   * - SECTION: entries for entire sections (all columns combined)
   * - COLUMN: entries for individual columns within multi-column sections
   */
  private getSections(): Array<[string, string, number]> {
    const results = new Array<[string, string, number]>();

    // Find the PiCanvas web part to avoid moving itself
    const tabWebPartElement = $(this.domElement).closest("div." + this.properties.webpartClass);
    const tabWebPartZone = tabWebPartElement.closest('[data-automation-id="CanvasZone"]');
    const tabWebPartSection = tabWebPartElement.closest('[data-automation-id="CanvasSection"], div.' + this.properties.sectionClass);
    const tabWebPartColumn = tabWebPartElement.closest('[data-automation-id="CanvasColumn"], div.CanvasColumn, [data-automation-id="CanvasSection"], div.' + this.properties.sectionClass);

    // --- Primary strategy: modern pages where CanvasZone is the row and CanvasSection are columns ---
    const rowContainers = $('[data-automation-id="CanvasZone"]').filter((_idx: number, el: HTMLElement) => {
      const $el = $(el);
      const hasSection = $el.find('[data-automation-id="CanvasSection"]').length > 0;
      const hasControlZone = $el.find('.ControlZone, [data-automation-id="CanvasControl"]').length > 0;
      const isNested = $el.parent().closest('[data-automation-id="CanvasZone"]').length > 0;
      return (hasSection || hasControlZone) && !isNested;
    });

    if (rowContainers.length > 0) {
      rowContainers.each((rowIndex: number, element: HTMLElement) => {
        const $row = $(element);
        const sectionNum = rowIndex + 1;

        // Count ALL web parts in this row (across all columns), excluding PiCanvas
        const allWebparts = $row.find('.ControlZone, [data-automation-id="CanvasControl"]')
          .filter((_i, wp: HTMLElement) => !tabWebPartElement.is(wp));
        const totalWebpartCount = allWebparts.length;

        if (totalWebpartCount === 0) {
          return; // continue
        }

        // Mark the row so render() can find it later
        const sectionId = `hillbilly-section-${rowIndex}`;
        $row.attr("data-hillbilly-section-id", sectionId);

        // Add the whole row as a SECTION option unless it contains PiCanvas
        if (!$row.is(tabWebPartZone)) {
          const sectionLabel = `▦ Section ${sectionNum} (${totalWebpartCount} web part${totalWebpartCount !== 1 ? 's' : ''})`;
          results.push([`SECTION:${sectionId}`, sectionLabel, sectionNum]);
        }

        // Columns: commonly CanvasSection within the row. Also allow CanvasColumn just in case.
        let columns = $row.find('[data-automation-id="CanvasSection"]');
        if (columns.length === 0) {
          columns = $row.find('[data-automation-id="CanvasColumn"], div.CanvasColumn');
        }

        // Only expose columns when there is more than one
        if (columns.length > 1) {
          columns.each((colIndex: number, colElement: HTMLElement) => {
            const $col = $(colElement);

            // Skip the column containing PiCanvas
            if ($col.is(tabWebPartColumn)) {
              return;
            }

            const colWebparts = $col.find('.ControlZone, [data-automation-id="CanvasControl"]')
              .filter((_i, wp: HTMLElement) => !tabWebPartElement.is(wp));

            if (colWebparts.length === 0) {
              return;
            }

            const columnId = `hillbilly-column-${rowIndex}-${colIndex}`;
            $col.attr("data-hillbilly-column-id", columnId);

            const columnName = this.getColumnPositionName(colIndex, columns.length);
            const columnLabel = `  ├ ${columnName} (${colWebparts.length} web part${colWebparts.length !== 1 ? 's' : ''})`;
            results.push([`COLUMN:${columnId}`, columnLabel, sectionNum]);
          });
        }
      });

      return results;
    }

    // --- Fallback strategy: treat CanvasSection as sections directly (older or variant DOM) ---
    const sections = $('[data-automation-id="CanvasSection"], div.' + this.properties.sectionClass);

    sections.each((sectionIndex: number, element: HTMLElement) => {
      const $section = $(element);
      const sectionNum = sectionIndex + 1;

      const sectionId = `hillbilly-section-${sectionIndex}`;
      $section.attr("data-hillbilly-section-id", sectionId);

      const allSectionWebparts = $section.find('.ControlZone, [data-automation-id="CanvasControl"]')
        .filter((_i, wp: HTMLElement) => !tabWebPartElement.is(wp));
      const webpartCount = allSectionWebparts.length;

      if (webpartCount > 0 && !$section.is(tabWebPartSection)) {
        const sectionLabel = `▦ Section ${sectionNum} (${webpartCount} web part${webpartCount !== 1 ? 's' : ''})`;
        results.push([`SECTION:${sectionId}`, sectionLabel, sectionNum]);
      }

      // Columns inside the section (if present)
      let columns = $section.find('[data-automation-id="CanvasColumn"], div.CanvasColumn');
      if (columns.length === 0) {
        columns = $section.find('[data-automation-id="CanvasSection"]');
      }

      if (columns.length > 1) {
        columns.each((colIndex: number, colElement: HTMLElement) => {
          const $col = $(colElement);
          if ($col.is(tabWebPartColumn)) {
            return;
          }

          const colWebparts = $col.find('.ControlZone, [data-automation-id="CanvasControl"]')
            .filter((_i, wp: HTMLElement) => !tabWebPartElement.is(wp));

          if (colWebparts.length === 0) {
            return;
          }

          const columnId = `hillbilly-column-${sectionIndex}-${colIndex}`;
          $col.attr("data-hillbilly-column-id", columnId);

          const columnName = this.getColumnPositionName(colIndex, columns.length);
          const columnLabel = `  ├ ${columnName} (${colWebparts.length} web part${colWebparts.length !== 1 ? 's' : ''})`;
          results.push([`COLUMN:${columnId}`, columnLabel, sectionNum]);
        });
      }
    });

    return results;
  }

  /**
   * Get a human-readable name for a column position
   */
  private getColumnPositionName(colIndex: number, totalColumns: number): string {
    if (totalColumns === 2) {
      return colIndex === 0 ? 'Left Column' : 'Right Column';
    } else if (totalColumns === 3) {
      if (colIndex === 0) return 'Left Column';
      if (colIndex === 1) return 'Center Column';
      return 'Right Column';
    } else {
      return `Column ${colIndex + 1}`;
    }
  }

  private getZones(): Array<[string, string, number]> {
    const zones = new Array<[string, string, number]>();

    // Get webpart ID from SharePoint DOM structure, or fallback to SPFx instance ID for workbench
    const tabWebPartID = $(this.domElement).closest("div." + this.properties.webpartClass).attr("id")
      || `picanvas-${this.context.instanceId}`;

    // Track webpart count per section for labeling
    const sectionWebPartCounts: { [key: number]: number } = {};

    // Find ALL webparts on the page, not just in current section
    const webpartClass = this.properties.webpartClass;

    $("div." + webpartClass).each((_index: number, element: HTMLElement) => {
      const $element = $(element);
      const thisWPID = $element.attr("id");

      if (thisWPID && thisWPID !== tabWebPartID) {
        const sectionNum = this.getSectionNumber($element);

        // Increment webpart count for this section
        if (!sectionWebPartCounts[sectionNum]) {
          sectionWebPartCounts[sectionNum] = 0;
        }
        sectionWebPartCounts[sectionNum]++;
        const wpNumInSection = sectionWebPartCounts[sectionNum];

        // Get detailed webpart information
        const details = this.getWebPartDetails($element);

        // Build detailed label
        // Format: "Sec X | Column | Type: Preview" or "Sec X | Column | Web Part #N"
        let zoneName: string;
        const sectionPart = `Sec ${sectionNum}`;
        const columnPart = details.columnName;

        // Build the label with as much detail as available
        const labelParts: string[] = [];

        if (details.type) {
          labelParts.push(details.type);
        }

        // Add preview content (image filename, text snippet, or title)
        if (details.preview) {
          labelParts.push(details.preview);
        } else if (details.title && details.title !== details.type) {
          labelParts.push(details.title);
        }

        if (labelParts.length > 0) {
          // Join with colon: "Image: photo.jpg" or "Text: Hello world..."
          zoneName = `${sectionPart} | ${columnPart} | ${labelParts.join(': ')}`;
        } else {
          // Fallback: "Sec 2 | Left | Web Part #1"
          zoneName = `${sectionPart} | ${columnPart} | Web Part #${wpNumInSection}`;
        }

        zones.push([thisWPID, zoneName, sectionNum]);
      }
    });

    this._zonesCache = zones.map(z => [z[0], z[1]]);
    return zones;
  }

  /**
   * Get which webparts/sections are already assigned to tabs
   * Returns a map of webpart/section ID -> tab number
   */
  private getAssignedItems(): Map<string, number> {
    const assigned = new Map<string, number>();
    const numTabs = this.getTabCount();

    for (let i = 1; i <= numTabs; i++) {
      const webPartID = this.properties[`tab${i}WebPartID`] as string;
      if (webPartID) {
        assigned.set(webPartID, i);
      }
    }

    return assigned;
  }

  /**
   * Build dropdown options from detected zones and sections
   * @param forTabIndex - The tab index this dropdown is for (to exclude self from "already used" check)
   * @param contentTypeFilter - Filter to show only 'webpart', only 'section', or 'all' (default)
   */
  private getDropdownOptions(forTabIndex?: number, contentTypeFilter: 'webpart' | 'section' | 'all' = 'all'): IPropertyPaneDropdownOption[] {
    const zones = this.getZones();
    const sections = this.getSections();
    const assignedItems = this.getAssignedItems();
    const options: IPropertyPaneDropdownOption[] = [
      { key: '', text: contentTypeFilter === 'section' ? '(None - skip this tab)' : '(None - skip this tab)' }
    ];

    // Helper to add "already used" indicator - informational since cloning is supported
    const addUsageIndicator = (text: string, itemKey: string): string => {
      const assignedToTab = assignedItems.get(itemKey);
      if (assignedToTab && assignedToTab !== forTabIndex) {
        return `${text} 🔄 Also in Tab ${assignedToTab}`;
      }
      return text;
    };

    // Add sections (only if filter allows)
    if (contentTypeFilter === 'section' || contentTypeFilter === 'all') {
      if (sections.length > 0) {
        sections.forEach(section => {
          options.push({
            key: section[0],
            text: addUsageIndicator(section[1], section[0])
          });
        });
      }
    }

    // Add webparts (only if filter allows)
    if (contentTypeFilter === 'webpart' || contentTypeFilter === 'all') {
      // Group webpart zones by section
      const sectionGroups: { [key: number]: Array<[string, string, number]> } = {};
      zones.forEach(zone => {
        const sectionNum = zone[2];
        if (!sectionGroups[sectionNum]) {
          sectionGroups[sectionNum] = [];
        }
        sectionGroups[sectionNum].push(zone);
      });

      // Add individual webparts sorted by section
      const sortedSections = Object.keys(sectionGroups).map(Number).sort((a, b) => a - b);
      sortedSections.forEach(sectionNum => {
        sectionGroups[sectionNum].forEach(zone => {
          // Only indent if showing both sections and webparts
          const prefix = contentTypeFilter === 'all' ? '    ' : '';
          options.push({
            key: zone[0],
            text: addUsageIndicator(`${prefix}${zone[1]}`, zone[0])
          });
        });
      });
    }

    return options;
  }

  /**
   * Get dropdown options for selecting a web part to use as a tab label
   * Only returns individual web parts (not sections), excluding already-used label web parts
   */
  private getLabelWebPartOptions(forTabIndex?: number): IPropertyPaneDropdownOption[] {
    const zones = this.getZones();
    const options: IPropertyPaneDropdownOption[] = [
      { key: '', text: '(Select a web part for label)' }
    ];

    // Get list of web parts already used as labels in other tabs
    const usedAsLabels = new Map<string, number>();
    const numTabs = this.getTabCount();
    for (let i = 1; i <= numTabs; i++) {
      if (i !== forTabIndex) {
        const labelWebPartID = this.properties[`tab${i}LabelWebPartID`] as string;
        if (labelWebPartID) {
          usedAsLabels.set(labelWebPartID, i);
        }
      }
    }

    // Helper to add "already used" indicator - informational since cloning is supported
    const addUsageIndicator = (text: string, itemKey: string): string => {
      const assignedToTab = usedAsLabels.get(itemKey);
      if (assignedToTab) {
        return `${text} 🔄 Label in Tab ${assignedToTab}`;
      }
      return text;
    };

    // Add individual webparts (skip sections)
    zones.forEach(zone => {
      options.push({
        key: zone[0],
        text: addUsageIndicator(zone[1], zone[0])
      });
    });

    return options;
  }

  /**
   * Get the current tab count, defaulting to 2
   */
  private getTabCount(): number {
    return this.properties.tabCount || 2;
  }

  /**
   * Add a new tab
   */
  private addTab(): void {
    const currentCount = this.getTabCount();
    if (currentCount < PiCanvasWebPart.MAX_TABS) { // Max 20 tabs
      this.properties.tabCount = currentCount + 1;
      this.context.propertyPane.refresh();
    }
  }

  /**
   * Remove the last tab
   */
  private removeTab(): void {
    const currentCount = this.getTabCount();
    if (currentCount > 1) { // Min 1 tab
      this.deleteTab(currentCount);
    }
  }

  /**
   * Move a tab up (swap with previous tab)
   */
  private moveTabUp(tabIndex: number): void {
    if (tabIndex <= 1) return; // Can't move first tab up

    // Swap with previous tab
    const prevIndex = tabIndex - 1;
    this.swapTabProperties(tabIndex, prevIndex);

    this.context.propertyPane.refresh();
    this.render();
  }

  /**
   * Move a tab down (swap with next tab)
   */
  private moveTabDown(tabIndex: number): void {
    const currentCount = this.getTabCount();
    if (tabIndex >= currentCount) return; // Can't move last tab down

    // Swap with next tab
    const nextIndex = tabIndex + 1;
    this.swapTabProperties(tabIndex, nextIndex);

    this.context.propertyPane.refresh();
    this.render();
  }

  /**
   * Copy all per-tab properties from one tab index to another
   */
  private copyTabProperties(sourceIndex: number, targetIndex: number): void {
    PiCanvasWebPart.TAB_PROPERTY_SUFFIXES.forEach((suffix) => {
      const sourceKey = `tab${sourceIndex}${suffix}`;
      const targetKey = `tab${targetIndex}${suffix}`;
      this.properties[targetKey] = this.properties[sourceKey];
    });
  }

  /**
   * Swap all per-tab properties between two tab indexes
   */
  private swapTabProperties(firstIndex: number, secondIndex: number): void {
    PiCanvasWebPart.TAB_PROPERTY_SUFFIXES.forEach((suffix) => {
      const firstKey = `tab${firstIndex}${suffix}`;
      const secondKey = `tab${secondIndex}${suffix}`;
      const firstValue = this.properties[firstKey];
      this.properties[firstKey] = this.properties[secondKey];
      this.properties[secondKey] = firstValue;
    });
  }

  /**
   * Clear all per-tab properties for a tab index
   */
  private clearTabProperties(tabIndex: number): void {
    PiCanvasWebPart.TAB_PROPERTY_SUFFIXES.forEach((suffix) => {
      const key = `tab${tabIndex}${suffix}`;
      this.properties[key] = undefined;
    });
  }

  /**
   * Delete a tab and shift remaining tabs down
   */
  private deleteTab(tabIndex: number): void {
    const currentCount = this.getTabCount();
    if (currentCount <= 1) return;
    if (tabIndex < 1 || tabIndex > currentCount) return;

    for (let i = tabIndex; i < currentCount; i++) {
      this.copyTabProperties(i + 1, i);
    }

    this.clearTabProperties(currentCount);
    this.properties.tabCount = currentCount - 1;

    this.context.propertyPane.refresh();
    this.render();
  }

  /**
   * Duplicate a tab and insert it after the source tab
   */
  private duplicateTab(tabIndex: number): void {
    const currentCount = this.getTabCount();
    if (currentCount >= PiCanvasWebPart.MAX_TABS) return;
    if (tabIndex < 1 || tabIndex > currentCount) return;

    const insertIndex = tabIndex + 1;
    this.properties.tabCount = currentCount + 1;

    for (let i = currentCount; i >= insertIndex; i--) {
      this.copyTabProperties(i, i + 1);
    }

    this.copyTabProperties(tabIndex, insertIndex);

    this.context.propertyPane.refresh();
    this.render();
  }

  /**
   * Color presets for accent color selection
   */
  private getColorPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '#0078d4', text: 'SharePoint Blue (default)' },
      { key: '#107c10', text: 'Green' },
      { key: '#5c2d91', text: 'Purple' },
      { key: '#d83b01', text: 'Orange' },
      { key: '#e81123', text: 'Red' },
      { key: '#008272', text: 'Teal' },
      { key: '#ffb900', text: 'Yellow' },
      { key: '#000000', text: 'Black' },
      { key: '#767676', text: 'Gray' }
    ];
  }

  /**
   * Text color presets
   */
  private getTextColorPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '(Use default)' },
      { key: 'rgba(0,0,0,0.7)', text: 'Dark Gray (default)' },
      { key: 'rgba(0,0,0,0.87)', text: 'Near Black' },
      { key: '#000000', text: 'Black' },
      { key: '#ffffff', text: 'White' },
      { key: '#0078d4', text: 'SharePoint Blue' },
      { key: '#107c10', text: 'Green' },
      { key: '#5c2d91', text: 'Purple' }
    ];
  }

  /**
   * Font size presets
   */
  private getFontSizePresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '14px (default)' },
      { key: '12px', text: '12px - Small' },
      { key: '13px', text: '13px' },
      { key: '14px', text: '14px - Normal' },
      { key: '15px', text: '15px' },
      { key: '16px', text: '16px - Medium' },
      { key: '18px', text: '18px - Large' },
      { key: '20px', text: '20px - Extra Large' }
    ];
  }

  /**
   * Font weight presets
   */
  private getFontWeightPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '500 (default)' },
      { key: '400', text: '400 - Normal' },
      { key: '500', text: '500 - Medium' },
      { key: '600', text: '600 - Semi-Bold' },
      { key: '700', text: '700 - Bold' }
    ];
  }

  /**
   * Padding presets
   */
  private getPaddingPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '12px (default)' },
      { key: '8px', text: '8px - Compact' },
      { key: '10px', text: '10px' },
      { key: '12px', text: '12px - Normal' },
      { key: '16px', text: '16px - Comfortable' },
      { key: '20px', text: '20px - Spacious' },
      { key: '24px', text: '24px - Extra Spacious' }
    ];
  }

  /**
   * Gap presets
   */
  private getGapPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '0px (default)' },
      { key: '0px', text: '0px - No gap' },
      { key: '4px', text: '4px - Tight' },
      { key: '8px', text: '8px - Normal' },
      { key: '12px', text: '12px - Spacious' },
      { key: '16px', text: '16px - Wide' }
    ];
  }

  /**
   * Border radius presets
   */
  private getBorderRadiusPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '0px (default)' },
      { key: '0px', text: '0px - Square' },
      { key: '4px', text: '4px - Slightly Rounded' },
      { key: '6px', text: '6px - Rounded' },
      { key: '8px', text: '8px - More Rounded' },
      { key: '12px', text: '12px - Very Rounded' },
      { key: '16px', text: '16px - Pill-like' }
    ];
  }

  /**
   * Indicator width presets
   */
  private getIndicatorWidthPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '3px (default)' },
      { key: '2px', text: '2px - Thin' },
      { key: '3px', text: '3px - Normal' },
      { key: '4px', text: '4px - Medium' },
      { key: '5px', text: '5px - Thick' },
      { key: '6px', text: '6px - Extra Thick' }
    ];
  }

  /**
   * Shadow presets
   */
  private getShadowPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: 'None (default)' },
      { key: 'none', text: 'None' },
      { key: '0 1px 2px rgba(0,0,0,0.1)', text: 'Subtle' },
      { key: '0 2px 4px rgba(0,0,0,0.15)', text: 'Medium' },
      { key: '0 4px 8px rgba(0,0,0,0.2)', text: 'Strong' },
      { key: '0 2px 8px rgba(0,120,212,0.3)', text: 'Blue Glow' },
      { key: '0 2px 8px rgba(16,124,16,0.3)', text: 'Green Glow' },
      { key: '0 2px 8px rgba(92,45,145,0.3)', text: 'Purple Glow' }
    ];
  }

  /**
   * Image position presets for per-tab images
   */
  private getImagePositionPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: 'Left of text (default)' },
      { key: 'left', text: 'Left of text' },
      { key: 'right', text: 'Right of text' },
      { key: 'top', text: 'Above text' },
      { key: 'background', text: 'Background image' }
    ];
  }

  /**
   * Icon presets for tab labels - Fluent UI icons that work in SharePoint
   */
  private getIconPresets(): IPropertyPaneDropdownOption[] {
    return [
      { key: '', text: '— Select icon to insert —' },
      { key: 'Home', text: '🏠 Home' },
      { key: 'Info', text: 'ℹ️ Info' },
      { key: 'Settings', text: '⚙️ Settings' },
      { key: 'Mail', text: '✉️ Mail' },
      { key: 'Calendar', text: '📅 Calendar' },
      { key: 'Contact', text: '👤 Contact' },
      { key: 'People', text: '👥 People' },
      { key: 'Document', text: '📄 Document' },
      { key: 'Folder', text: '📁 Folder' },
      { key: 'Chart', text: '📊 Chart' },
      { key: 'Search', text: '🔍 Search' },
      { key: 'Star', text: '⭐ Star' },
      { key: 'Heart', text: '❤️ Heart' },
      { key: 'CheckMark', text: '✓ Check' },
      { key: 'Warning', text: '⚠️ Warning' },
      { key: 'Lightning', text: '⚡ Lightning' },
      { key: 'Globe', text: '🌐 Globe' },
      { key: 'Lock', text: '🔒 Lock' },
      { key: 'Link', text: '🔗 Link' },
      { key: 'Photo', text: '🖼️ Photo' },
      { key: 'Video', text: '🎬 Video' },
      { key: 'Music', text: '🎵 Music' },
      { key: 'News', text: '📰 News' },
      { key: 'Edit', text: '✏️ Edit' },
      { key: 'Add', text: '➕ Add' },
      { key: 'Delete', text: '🗑️ Delete' },
      { key: 'Refresh', text: '🔄 Refresh' },
      { key: 'Download', text: '⬇️ Download' },
      { key: 'Upload', text: '⬆️ Upload' }
    ];
  }

  /**
   * Insert icon into tab label
   */
  private insertIconIntoLabel(tabIndex: number, iconKey: string): void {
    if (!iconKey) return;

    const currentLabel = (this.properties[`tab${tabIndex}Label`] as string) || '';
    const iconMap: Record<string, string> = {
      'Home': '🏠',
      'Info': 'ℹ️',
      'Settings': '⚙️',
      'Mail': '✉️',
      'Calendar': '📅',
      'Contact': '👤',
      'People': '👥',
      'Document': '📄',
      'Folder': '📁',
      'Chart': '📊',
      'Search': '🔍',
      'Star': '⭐',
      'Heart': '❤️',
      'CheckMark': '✓',
      'Warning': '⚠️',
      'Lightning': '⚡',
      'Globe': '🌐',
      'Lock': '🔒',
      'Link': '🔗',
      'Photo': '🖼️',
      'Video': '🎬',
      'Music': '🎵',
      'News': '📰',
      'Edit': '✏️',
      'Add': '➕',
      'Delete': '🗑️',
      'Refresh': '🔄',
      'Download': '⬇️',
      'Upload': '⬆️'
    };

    const icon = iconMap[iconKey] || '';
    // Prepend icon to existing label, or just set icon if label is empty
    this.properties[`tab${tabIndex}Label`] = currentLabel ? `${icon} ${currentLabel}` : `${icon} ${iconKey}`;
    this.context.propertyPane.refresh();
    this.render();
  }

  /**
   * Generate dynamic property pane fields for tab configuration
   */
  private getTabConfigurationFields(): IPropertyPaneField<unknown>[] {
    const fields: IPropertyPaneField<unknown>[] = [];
    const zones = this.getZones();
    const numTabs = this.getTabCount();

    fields.push(PropertyPaneLabel('tabConfigHeader', {
      text: `Configure Tabs (${zones.length} web part${zones.length !== 1 ? 's' : ''} detected)`
    }));

    // Add tab button
    fields.push(
      PropertyPaneButton('addTab', {
        text: 'Add Tab',
        buttonType: PropertyPaneButtonType.Normal,
        icon: 'Add',
        onClick: () => this.addTab()
      })
    );

    // Tab configuration fields
    for (let i = 1; i <= numTabs; i++) {
      // Tab header with move buttons
      fields.push(PropertyPaneLabel(`tab${i}Header`, {
        text: `━━━ Tab ${i} ━━━`
      }));

      // Move Up button (not for first tab)
      if (i > 1) {
        fields.push(
          PropertyPaneButton(`moveUp${i}`, {
            text: '↑ Move Up',
            buttonType: PropertyPaneButtonType.Normal,
            onClick: () => this.moveTabUp(i)
          })
        );
      }

      // Move Down button (not for last tab)
      if (i < numTabs) {
        fields.push(
          PropertyPaneButton(`moveDown${i}`, {
            text: '↓ Move Down',
            buttonType: PropertyPaneButtonType.Normal,
            onClick: () => this.moveTabDown(i)
          })
        );
      }

      if (numTabs < PiCanvasWebPart.MAX_TABS) {
        fields.push(
          PropertyPaneButton(`duplicateTab${i}`, {
            text: 'Duplicate Tab',
            buttonType: PropertyPaneButtonType.Normal,
            icon: 'Copy',
            onClick: () => this.duplicateTab(i)
          })
        );
      }

      if (numTabs > 1) {
        fields.push(
          PropertyPaneButton(`deleteTab${i}`, {
            text: 'Delete Tab',
            buttonType: PropertyPaneButtonType.Normal,
            icon: 'Delete',
            onClick: () => this.deleteTab(i)
          })
        );
      }

      // Content Type dropdown (v3.0)
      fields.push(
        PropertyPaneDropdown(`tab${i}ContentType`, {
          label: strings.ContentTypeLabel || 'Content Type',
          options: [
            { key: 'webpart', text: strings.ContentTypeWebPart || 'SharePoint Web Part' },
            { key: 'section', text: strings.ContentTypeSection || 'SharePoint Section' },
            { key: 'markdown', text: strings.ContentTypeMarkdown || 'Markdown Content' },
            { key: 'html', text: strings.ContentTypeHtml || 'HTML Content' },
            { key: 'mermaid', text: strings.ContentTypeMermaid || 'Mermaid Diagram' },
            { key: 'embed', text: strings.ContentTypeEmbed || 'Embed (iframe)' }
          ],
          selectedKey: this.properties[`tab${i}ContentType`] as string || 'webpart'
        })
      );

      const contentType = (this.properties[`tab${i}ContentType`] as string) || 'webpart';

      // Conditional fields based on content type
      if (contentType === 'webpart' || contentType === 'section') {
        // Show WebPartID dropdown filtered by content type (webpart shows only webparts, section shows only sections)
        fields.push(
          PropertyPaneDropdown(`tab${i}WebPartID`, {
            label: contentType === 'section' ? 'Section' : 'Web Part',
            options: this.getDropdownOptions(i, contentType as 'webpart' | 'section'),
            selectedKey: this.properties[`tab${i}WebPartID`] as string || ''
          })
        );
      } else if (contentType === 'markdown' || contentType === 'html' || contentType === 'mermaid') {
        // Show custom content text field
        const placeholders: { [key: string]: string } = {
          markdown: strings.MarkdownPlaceholder || '# Heading\n\nYour **markdown** content here...',
          html: strings.HtmlPlaceholder || '<div>\n  <p>Your HTML content here...</p>\n</div>',
          mermaid: strings.MermaidPlaceholder || 'graph TD\n    A[Start] --> B[Process]\n    B --> C[End]'
        };
        fields.push(
          PropertyPaneTextField(`tab${i}CustomContent`, {
            label: strings.CustomContentLabel || 'Content',
            placeholder: placeholders[contentType],
            multiline: true,
            rows: 8
          })
        );
        // Add live preview for custom content
        fields.push(
          PropertyPaneContentPreview(`tab${i}Preview`, {
            key: `tab${i}ContentPreview`,
            contentType: contentType as 'markdown' | 'html' | 'mermaid',
            content: (this.properties[`tab${i}CustomContent`] as string) || ''
          })
        );
      } else if (contentType === 'embed') {
        // Show embed URL and height fields
        fields.push(
          PropertyPaneTextField(`tab${i}EmbedUrl`, {
            label: strings.EmbedUrlLabel || 'Embed URL',
            placeholder: 'https://www.youtube.com/embed/...',
            description: strings.EmbedUrlDescription || 'Only trusted domains are allowed (YouTube, PowerBI, Forms, etc.)',
            multiline: false
          })
        );
        fields.push(
          PropertyPaneTextField(`tab${i}EmbedHeight`, {
            label: strings.EmbedHeightLabel || 'Embed Height',
            placeholder: '400px',
            multiline: false
          })
        );
        // Add live preview for embed content
        fields.push(
          PropertyPaneContentPreview(`tab${i}EmbedPreview`, {
            key: `tab${i}EmbedContentPreview`,
            contentType: 'embed',
            content: '',
            embedUrl: (this.properties[`tab${i}EmbedUrl`] as string) || '',
            embedHeight: (this.properties[`tab${i}EmbedHeight`] as string) || '200px'
          })
        );
      }

      // Label type dropdown - text, web part, or hidden
      fields.push(
        PropertyPaneDropdown(`tab${i}LabelType`, {
          label: `Label Type`,
          options: [
            { key: 'text', text: 'Text Label' },
            { key: 'webpart', text: 'Use Web Part as Label (e.g., Image)' },
            { key: 'hidden', text: 'Hidden (Content Only)' }
          ],
          selectedKey: this.properties[`tab${i}LabelType`] as string || 'text'
        })
      );

      const labelType = this.properties[`tab${i}LabelType`] as string || 'text';

      if (labelType === 'hidden') {
        // No additional fields needed for hidden label - just show content
        fields.push(
          PropertyPaneLabel(`tab${i}HiddenInfo`, {
            text: 'Tab bar will be hidden when all tabs use "Hidden" label type.'
          })
        );
      } else if (labelType === 'webpart') {
        // Show web part selector for label
        fields.push(
          PropertyPaneDropdown(`tab${i}LabelWebPartID`, {
            label: `Label Web Part`,
            options: this.getLabelWebPartOptions(i),
            selectedKey: this.properties[`tab${i}LabelWebPartID`] as string || ''
          })
        );
      } else {
        // Text label mode - show text field, icon picker, and image options
        fields.push(
          PropertyPaneTextField(`tab${i}Label`, {
            label: `Label`,
            placeholder: `Enter tab label`,
            multiline: false
          })
        );

        // Icon picker dropdown
        fields.push(
          PropertyPaneDropdown(`tab${i}Icon`, {
            label: `Add Icon`,
            options: this.getIconPresets(),
            selectedKey: ''
          })
        );

        // Per-tab image support - URL text field
        fields.push(
          PropertyPaneTextField(`tab${i}Image`, {
            label: `Tab Image URL (optional)`,
            placeholder: `Paste image URL from SharePoint`,
            description: 'Copy image URL from SharePoint library',
            multiline: false
          })
        );

        // Only show image position if image URL is set
        const tabImageUrl = this.properties[`tab${i}Image`] as string;
        if (tabImageUrl && tabImageUrl.length > 0) {
          fields.push(
            PropertyPaneDropdown(`tab${i}ImagePosition`, {
              label: `Image Position`,
              options: this.getImagePositionPresets(),
              selectedKey: this.properties[`tab${i}ImagePosition`] as string || 'left'
            })
          );
        }
      }

      // Divider toggle - add visual separator after this tab
      if (i < numTabs) { // Don't show for last tab
        fields.push(
          PropertyPaneToggle(`tab${i}DividerAfter`, {
            label: `Add divider after this tab`,
            checked: this.properties[`tab${i}DividerAfter`] as boolean || false,
            onText: 'Yes',
            offText: 'No'
          })
        );
      }

      // Permission settings header
      fields.push(PropertyPaneLabel(`tab${i}PermissionHeader`, {
        text: `── ${strings.PermissionHeaderLabel} ──`
      }));

      // Enable permission check toggle
      fields.push(
        PropertyPaneToggle(`tab${i}PermissionEnabled`, {
          label: strings.PermissionEnabledLabel,
          checked: this.properties[`tab${i}PermissionEnabled`] as boolean || false,
          onText: 'Restricted',
          offText: 'Everyone'
        })
      );

      // Only show group selection if permission is enabled
      const permissionEnabled = this.properties[`tab${i}PermissionEnabled`] as boolean;
      if (permissionEnabled) {
        // Standard groups dropdown with common combinations
        fields.push(
          PropertyPaneDropdown(`tab${i}PermissionGroups`, {
            label: strings.PermissionGroupsLabel,
            options: [
              { key: '', text: strings.PermissionVisibleToAll },
              { key: 'Owners', text: strings.PermissionOwnersLabel },
              { key: 'Members', text: strings.PermissionMembersLabel },
              { key: 'Visitors', text: strings.PermissionVisitorsLabel },
              { key: 'Owners,Members', text: strings.PermissionOwnersMembers },
              { key: 'Members,Visitors', text: strings.PermissionMembersVisitors },
              { key: 'Owners,Members,Visitors', text: strings.PermissionAllGroups }
            ],
            selectedKey: this.properties[`tab${i}PermissionGroups`] as string || ''
          })
        );

        // Custom group IDs text field
        fields.push(
          PropertyPaneTextField(`tab${i}PermissionCustomGroups`, {
            label: strings.PermissionCustomGroupsLabel,
            placeholder: strings.PermissionCustomGroupsPlaceholder,
            description: strings.PermissionCustomGroupsDescription,
            multiline: false
          })
        );

        // Show placeholder toggle (instead of hiding completely)
        fields.push(
          PropertyPaneToggle(`tab${i}PermissionPlaceholder`, {
            label: strings.PermissionPlaceholderLabel,
            checked: this.properties[`tab${i}PermissionPlaceholder`] as boolean || false,
            onText: 'Show placeholder',
            offText: 'Hide completely'
          })
        );

        // Custom placeholder text (only if placeholder is enabled)
        const showPlaceholder = this.properties[`tab${i}PermissionPlaceholder`] as boolean;
        if (showPlaceholder) {
          fields.push(
            PropertyPaneTextField(`tab${i}PermissionPlaceholderText`, {
              label: strings.PermissionPlaceholderTextLabel,
              placeholder: strings.PermissionPlaceholderTextPlaceholder,
              description: strings.PermissionPlaceholderDescription,
              multiline: false
            })
          );
        }
      }
    }

    return fields;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.ManageTabLabels,
              groupFields: this.getTabConfigurationFields()
            },
            {
              groupName: strings.TemplatesGroupName,
              groupFields: this.getTemplateGroupFields()
            },
            {
              groupName: 'Appearance',
              groupFields: [
                PropertyPaneDropdown('tabStyle', {
                  label: 'Tab Style',
                  options: [
                    { key: 'default', text: 'Default (underline indicator)' },
                    { key: 'pills', text: 'Pills (rounded buttons)' },
                    { key: 'underline', text: 'Underline (minimal)' },
                    { key: 'boxed', text: 'Boxed (bordered cards)' }
                  ],
                  selectedKey: this.properties.tabStyle || 'default'
                }),
                PropertyPaneDropdown('tabAlignment', {
                  label: 'Tab Alignment',
                  options: [
                    { key: 'stretch', text: 'Stretch (full width)' },
                    { key: 'left', text: 'Left' },
                    { key: 'center', text: 'Center' },
                    { key: 'right', text: 'Right' }
                  ],
                  selectedKey: this.properties.tabAlignment || 'stretch'
                }),
                PropertyPaneDropdown('tabOrientation', {
                  label: 'Tab Orientation',
                  options: [
                    { key: 'horizontal', text: 'Horizontal (tabs on top)' },
                    { key: 'vertical', text: 'Vertical (tabs on side)' }
                  ],
                  selectedKey: this.properties.tabOrientation || 'horizontal'
                }),
                // Only show vertical options when orientation is vertical
                ...(this.properties.tabOrientation === 'vertical' ? [
                  PropertyPaneDropdown('verticalTabPosition', {
                    label: 'Vertical Tab Position',
                    options: [
                      { key: 'left', text: 'Left side' },
                      { key: 'right', text: 'Right side' }
                    ],
                    selectedKey: this.properties.verticalTabPosition || 'left'
                  }),
                  PropertyPaneDropdown('verticalTabWidth', {
                    label: 'Vertical Tab Width',
                    options: [
                      { key: '150px', text: 'Narrow (150px)' },
                      { key: '200px', text: 'Medium (200px)' },
                      { key: '250px', text: 'Wide (250px)' },
                      { key: '300px', text: 'Extra Wide (300px)' },
                      { key: '25%', text: '25% of container' },
                      { key: '33%', text: '33% of container' }
                    ],
                    selectedKey: this.properties.verticalTabWidth || '200px'
                  })
                ] : []),
                PropertyPaneDropdown('labelImageHeight', {
                  label: 'Label Image Size',
                  options: [
                    { key: '40px', text: 'Small (40px)' },
                    { key: '60px', text: 'Medium (60px)' },
                    { key: '80px', text: 'Large (80px)' },
                    { key: '100px', text: 'Extra Large (100px)' },
                    { key: '120px', text: 'Huge (120px)' },
                    { key: 'none', text: 'No limit (full size)' }
                  ],
                  selectedKey: this.properties.labelImageHeight || '60px'
                }),
                PropertyPaneDropdown('themeMode', {
                  label: 'Theme Mode',
                  options: [
                    { key: 'auto', text: 'Auto (detect from page)' },
                    { key: 'light', text: 'Light' },
                    { key: 'dark', text: 'Dark' }
                  ],
                  selectedKey: this.properties.themeMode || 'auto'
                }),
                // v3.0 Feature toggles
                PropertyPaneToggle('enableDeepLinking', {
                  label: strings.EnableDeepLinkingLabel || 'Enable URL Deep Linking',
                  checked: this.properties.enableDeepLinking !== false,
                  onText: 'Enabled',
                  offText: 'Disabled'
                }),
                PropertyPaneToggle('enableLazyLoading', {
                  label: strings.EnableLazyLoadingLabel || 'Enable Lazy Loading',
                  checked: this.properties.enableLazyLoading !== false,
                  onText: 'Enabled',
                  offText: 'Disabled'
                })
              ]
            },
            {
              groupName: 'Colors',
              groupFields: [
                PropertyPaneTabPreview('stylePreview', {
                  accentColor: this.properties.accentColor,
                  tabTextColor: this.properties.tabTextColor,
                  tabActiveTextColor: this.properties.tabActiveTextColor,
                  tabBackgroundColor: this.properties.tabBackgroundColor,
                  tabActiveBackgroundColor: this.properties.tabActiveBackgroundColor,
                  tabHoverBackgroundColor: this.properties.tabHoverBackgroundColor,
                  tabFontSize: this.properties.tabFontSize,
                  tabFontWeight: this.properties.tabFontWeight,
                  tabPaddingVertical: this.properties.tabPaddingVertical,
                  tabPaddingHorizontal: this.properties.tabPaddingHorizontal,
                  tabGap: this.properties.tabGap,
                  tabBorderRadius: this.properties.tabBorderRadius,
                  activeIndicatorWidth: this.properties.activeIndicatorWidth,
                  tabShadow: this.properties.tabShadow,
                  tabStyle: this.properties.tabStyle,
                  showActiveIndicator: this.properties.showActiveIndicator,
                  activeIndicatorColor: this.properties.activeIndicatorColor,
                  showTabSeparator: this.properties.showTabSeparator,
                  tabSeparatorColor: this.properties.tabSeparatorColor
                }),
                PropertyPaneDropdown('accentColor', {
                  label: 'Accent Color',
                  options: this.getColorPresets(),
                  selectedKey: this.properties.accentColor || '#0078d4'
                }),
                PropertyPaneDropdown('tabTextColor', {
                  label: 'Tab Text Color',
                  options: this.getTextColorPresets(),
                  selectedKey: this.properties.tabTextColor || ''
                }),
                PropertyPaneDropdown('tabActiveTextColor', {
                  label: 'Active Tab Text Color',
                  options: this.getTextColorPresets(),
                  selectedKey: this.properties.tabActiveTextColor || ''
                }),
                PropertyPaneDropdown('tabBackgroundColor', {
                  label: 'Tab Background',
                  options: [
                    { key: '', text: 'Transparent (default)' },
                    { key: 'transparent', text: 'Transparent' },
                    { key: '#ffffff', text: 'White' },
                    { key: '#f5f5f5', text: 'Light Gray' },
                    { key: '#e0e0e0', text: 'Gray' },
                    { key: '#fafafa', text: 'Off White' }
                  ],
                  selectedKey: this.properties.tabBackgroundColor || ''
                }),
                PropertyPaneDropdown('tabActiveBackgroundColor', {
                  label: 'Active Tab Background',
                  options: [
                    { key: '', text: '(Use default for style)' },
                    { key: 'transparent', text: 'Transparent' },
                    { key: '#ffffff', text: 'White' },
                    { key: '#f5f5f5', text: 'Light Gray' },
                    { key: '#e8f4fd', text: 'Light Blue' },
                    { key: '#e8f5e9', text: 'Light Green' },
                    { key: '#f3e5f5', text: 'Light Purple' }
                  ],
                  selectedKey: this.properties.tabActiveBackgroundColor || ''
                }),
                PropertyPaneDropdown('tabHoverBackgroundColor', {
                  label: 'Hover Background',
                  options: [
                    { key: '', text: '(Use default)' },
                    { key: 'rgba(0,0,0,0.04)', text: 'Subtle Dark' },
                    { key: 'rgba(0,0,0,0.08)', text: 'Light Dark' },
                    { key: 'rgba(0,120,212,0.1)', text: 'Light Blue' },
                    { key: 'rgba(16,124,16,0.1)', text: 'Light Green' }
                  ],
                  selectedKey: this.properties.tabHoverBackgroundColor || ''
                })
              ]
            },
            {
              groupName: 'Typography & Spacing',
              groupFields: [
                PropertyPaneDropdown('tabFontSize', {
                  label: 'Font Size',
                  options: this.getFontSizePresets(),
                  selectedKey: this.properties.tabFontSize || ''
                }),
                PropertyPaneDropdown('tabFontWeight', {
                  label: 'Font Weight',
                  options: this.getFontWeightPresets(),
                  selectedKey: this.properties.tabFontWeight || ''
                }),
                PropertyPaneDropdown('tabPaddingVertical', {
                  label: 'Vertical Padding',
                  options: this.getPaddingPresets(),
                  selectedKey: this.properties.tabPaddingVertical || ''
                }),
                PropertyPaneDropdown('tabPaddingHorizontal', {
                  label: 'Horizontal Padding',
                  options: [
                    { key: '', text: '20px (default)' },
                    { key: '12px', text: '12px - Compact' },
                    { key: '16px', text: '16px' },
                    { key: '20px', text: '20px - Normal' },
                    { key: '24px', text: '24px - Comfortable' },
                    { key: '32px', text: '32px - Spacious' },
                    { key: '40px', text: '40px - Extra Spacious' }
                  ],
                  selectedKey: this.properties.tabPaddingHorizontal || ''
                }),
                PropertyPaneDropdown('tabGap', {
                  label: 'Gap Between Tabs',
                  options: this.getGapPresets(),
                  selectedKey: this.properties.tabGap || ''
                })
              ]
            },
            {
              groupName: 'Borders & Effects',
              groupFields: [
                PropertyPaneDropdown('tabBorderRadius', {
                  label: 'Corner Radius',
                  options: this.getBorderRadiusPresets(),
                  selectedKey: this.properties.tabBorderRadius || ''
                }),
                PropertyPaneDropdown('tabContentGap', {
                  label: 'Gap Between Tabs & Content',
                  options: [
                    { key: '', text: '0px (default)' },
                    { key: '0px', text: '0px - No gap' },
                    { key: '8px', text: '8px - Small' },
                    { key: '16px', text: '16px - Medium' },
                    { key: '24px', text: '24px - Large' },
                    { key: '32px', text: '32px - Extra Large' }
                  ],
                  selectedKey: this.properties.tabContentGap || ''
                }),
                PropertyPaneToggle('showActiveIndicator', {
                  label: 'Show Active Tab Indicator',
                  onText: 'Visible',
                  offText: 'Hidden',
                  checked: this.properties.showActiveIndicator !== false
                }),
                PropertyPaneDropdown('activeIndicatorWidth', {
                  label: 'Active Indicator Width',
                  options: this.getIndicatorWidthPresets(),
                  selectedKey: this.properties.activeIndicatorWidth || ''
                }),
                PropertyPaneDropdown('activeIndicatorColor', {
                  label: 'Active Indicator Color',
                  options: [
                    { key: '', text: '(Use accent color)' },
                    { key: '#0078d4', text: 'SharePoint Blue' },
                    { key: '#107c10', text: 'Green' },
                    { key: '#5c2d91', text: 'Purple' },
                    { key: '#d83b01', text: 'Orange' },
                    { key: '#e81123', text: 'Red' },
                    { key: '#008272', text: 'Teal' },
                    { key: '#ffb900', text: 'Yellow' },
                    { key: '#000000', text: 'Black' },
                    { key: '#ffffff', text: 'White' }
                  ],
                  selectedKey: this.properties.activeIndicatorColor || ''
                }),
                PropertyPaneToggle('showTabSeparator', {
                  label: 'Show Tab Separator Lines',
                  onText: 'Visible',
                  offText: 'Hidden',
                  checked: this.properties.showTabSeparator !== false
                }),
                PropertyPaneDropdown('tabSeparatorColor', {
                  label: 'Separator Line Color',
                  options: [
                    { key: '', text: '(Default gray)' },
                    { key: 'rgba(0,0,0,0.12)', text: 'Light Gray (default)' },
                    { key: 'rgba(0,0,0,0.25)', text: 'Medium Gray' },
                    { key: 'rgba(0,0,0,0.5)', text: 'Dark Gray' },
                    { key: '#0078d4', text: 'SharePoint Blue' },
                    { key: '#107c10', text: 'Green' },
                    { key: '#5c2d91', text: 'Purple' },
                    { key: '#d83b01', text: 'Orange' },
                    { key: 'transparent', text: 'Transparent' }
                  ],
                  selectedKey: this.properties.tabSeparatorColor || ''
                }),
                PropertyPaneDropdown('tabShadow', {
                  label: 'Shadow Effect',
                  options: this.getShadowPresets(),
                  selectedKey: this.properties.tabShadow || ''
                }),
                PropertyPaneToggle('enableTransitions', {
                  label: 'Enable Animations',
                  onText: 'On',
                  offText: 'Off',
                  checked: this.properties.enableTransitions !== false
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneLabel('troubleshootingHelp', {
                  text: 'If web parts aren\'t detected, try different selectors below. Most users never need to change these.'
                }),
                PropertyPaneDropdown('sectionClass', {
                  label: strings.SectionClass,
                  options: [
                    { key: 'CanvasSection', text: 'CanvasSection (Default - Modern pages)' },
                    { key: 'CanvasZone', text: 'CanvasZone (Some SP versions)' },
                    { key: 'WebPartZone', text: 'WebPartZone (Classic pages)' },
                    { key: 'ms-webpart-zone', text: 'ms-webpart-zone (Classic zones)' }
                  ],
                  selectedKey: this.properties.sectionClass || 'CanvasSection'
                }),
                PropertyPaneDropdown('webpartClass', {
                  label: strings.WebPartClass,
                  options: [
                    { key: 'ControlZone', text: 'ControlZone (Default - Modern pages)' },
                    { key: 'CanvasControl', text: 'CanvasControl (Some SP versions)' },
                    { key: 'WebPart', text: 'WebPart (Classic pages)' },
                    { key: 'ms-webpartzone-cell', text: 'ms-webpartzone-cell (Classic cells)' }
                  ],
                  selectedKey: this.properties.webpartClass || 'ControlZone'
                }),
                PropertyPaneButton('resetSelectors', {
                  text: 'Reset to Defaults',
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: () => {
                    this.properties.sectionClass = 'CanvasSection';
                    this.properties.webpartClass = 'ControlZone';
                    this.context.propertyPane.refresh();
                    this.render();
                  }
                }),
                PropertyPaneButton('resetAllStyles', {
                  text: 'Reset All Styles',
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: () => {
                    // Reset all styling properties to defaults

                    // Appearance
                    this.properties.tabStyle = 'default';
                    this.properties.tabAlignment = 'stretch';
                    this.properties.tabOrientation = 'horizontal';
                    this.properties.verticalTabPosition = 'left';
                    this.properties.verticalTabWidth = '200px';
                    this.properties.labelImageHeight = '';
                    this.properties.themeMode = 'auto';

                    // Colors
                    this.properties.accentColor = '#0078d4';
                    this.properties.tabTextColor = '';
                    this.properties.tabActiveTextColor = '';
                    this.properties.tabBackgroundColor = '';
                    this.properties.tabActiveBackgroundColor = '';
                    this.properties.tabHoverBackgroundColor = '';

                    // Typography & Spacing
                    this.properties.tabFontSize = '';
                    this.properties.tabFontWeight = '';
                    this.properties.tabPaddingVertical = '';
                    this.properties.tabPaddingHorizontal = '';
                    this.properties.tabGap = '';
                    this.properties.tabContentGap = '';

                    // Borders & Effects
                    this.properties.tabBorderRadius = '';
                    this.properties.activeIndicatorWidth = '';
                    this.properties.tabShadow = '';
                    this.properties.enableTransitions = true;

                    // Active Indicator & Separators
                    this.properties.showActiveIndicator = true;
                    this.properties.activeIndicatorColor = '';
                    this.properties.showTabSeparator = true;
                    this.properties.tabSeparatorColor = '';

                    this.context.propertyPane.refresh();
                    this.render();
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
