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

import * as $ from 'jquery';
import PnPTelemetry from '@pnp/telemetry-js';

// Template imports
import { TemplateService } from './services/TemplateService';
import { ITemplateListItem } from './models/TemplateModels';

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

  // Dynamic properties for tab configuration (tab1WebPartID, tab1Label, tab2WebPartID, tab2Label, etc.)
  // Also supports per-tab images: tab1Image (URL string), tab1ImagePosition, etc.
  // Also supports per-tab dividers: tab1DividerAfter (boolean)
  [key: string]: string | number | boolean | ITabDataItem[] | undefined;
}

// Version info - pulled from package.json at build time
const PICANVAS_VERSION = '2.2.0';
const SPFX_VERSION = '1.21.1';
const NODE_VERSION = '18.x / 22.x';

type FeatureView = 'home' | 'tabbed-layouts' | 'section-support' | 'theme-aware' | 'permission-based';

export default class PiCanvasWebPart extends BaseClientSideWebPart<IPiCanvasWebPartProps> {

  private _zonesCache: Array<[string, string]> = [];
  private _currentHighlightedElement: HTMLElement | null = null;
  private _currentView: FeatureView = 'home';
  private _isPropertyPaneOpen: boolean = false;

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
    return str
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

    const template = await this._templateService.loadTemplate(this._selectedTemplateId);
    if (template) {
      this._templateService.applyTemplate(template, this.properties);
      this._selectedTemplateId = ''; // Reset selection
      this.context.propertyPane.refresh();
      this.render();
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
    input.onchange = async (e: Event): Promise<void> => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event): Promise<void> => {
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
            console.error('Import error:', error);
            alert(strings.ImportErrorMessage);
          }
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
          this.applySelectedTemplate();
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
        onClick: () => this.saveAsTemplate()
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
      const tabWebPartID = $(this.domElement).closest("div." + this.properties.webpartClass).attr("id");

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

      this.domElement.innerHTML = `<div data-addui='tabs' data-tab-style='${tabStyle}' data-tab-alignment='${tabAlignment}' ${orientationAttrs} ${transitionsAttr} ${unlimitedImageAttr}><div role='tabs' id='${tabsDiv}'></div><div role='contents' id='${contentsDiv}'></div></div>`;

      // Build tabData from dynamic properties if tabData is empty or not set
      const thisTabData = this.getTabDataFromProperties();
      for(const x in thisTabData)
      {
        // Handle both regular tabs (with WebPartID) and placeholder tabs
        const isPlaceholder = thisTabData[x].isPlaceholder || false;
        if (thisTabData[x].WebPartID || isPlaceholder) {
          // Use originalTabIndex if available (after permission filtering), else fall back to x + 1
          const tabIndex = thisTabData[x].originalTabIndex || (parseInt(x) + 1);

          // Create tab with HTML support - the label can contain HTML for styling
          const tabDiv = $("<div></div>");
          const labelType = (this.properties[`tab${tabIndex}LabelType`] as string) || 'text';

          if (labelType === 'webpart') {
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
            // Check if this is a section selection (starts with "SECTION:")
            const isSection = thisTabData[x].WebPartID.indexOf("SECTION:") === 0;

            // Use different classes for sections (preserve layout) vs individual webparts (full width)
            const contentClass = isSection ? 'hillbilly-tab-content hillbilly-section-content' : 'hillbilly-tab-content hillbilly-single-webpart';
            tabContentContainer = $(`<div class='${contentClass}'></div>`);

            if (isSection) {
              const sectionId = thisTabData[x].WebPartID.substring(8); // Remove "SECTION:" prefix
              // Find the section and move the ENTIRE section (preserving column layout)
              let $section = $(`[data-automation-id="${sectionId}"]`);
              if (!$section.length) {
                $section = $(`#${sectionId}`);
              }
              if (!$section.length) {
                $section = $(`[data-hillbilly-section-id="${sectionId}"]`);
              }
              if ($section.length) {
                // Move the entire section element to preserve column structure
                // This keeps the SharePoint grid layout (2-column, 3-column, etc.)
                tabContentContainer.append($section);
              }
            } else {
              // Individual webpart - move it into the tab container (full width)
              const $webpart = $("#"+thisTabData[x].WebPartID);
              if ($webpart.length) {
                tabContentContainer.append($webpart);
              }
            }
          }

          // Always append the container (even if empty) to maintain tab/content alignment
          $("#"+contentsDiv).append(tabContentContainer);
        }
      }

      // @ts-expect-error RenderTabs is defined in AddTabs.js
      RenderTabs();
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
                    <span class="${styles.versionValue}"><a href="https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.21.1" target="_blank" rel="noopener">${SPFX_VERSION}</a></span>
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

    // Check configured tabs (label is optional - will default to "Tab N")
    for (let i = 1; i <= numTabs; i++) {
      const webPartIDKey = `tab${i}WebPartID`;
      const labelKey = `tab${i}Label`;

      const webPartID = this.properties[webPartIDKey] as string;
      const label = this.properties[labelKey] as string;

      // Only require WebPartID - label is optional and will default in render
      if (webPartID) {
        // Check permission
        if (!this.isTabVisibleToUser(i)) {
          // Check if placeholder is enabled for this tab
          const showPlaceholder = this.properties[`tab${i}PermissionPlaceholder`] as boolean;
          if (showPlaceholder) {
            // Add as placeholder tab (visible but disabled)
            const placeholderText = (this.properties[`tab${i}PermissionPlaceholderText`] as string) || strings.PermissionPlaceholderDefault;
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
          WebPartID: webPartID,
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
   * Get all sections on the page with their IDs
   * Returns array of [sectionId, sectionLabel, sectionNumber]
   */
  private getSections(): Array<[string, string, number]> {
    const sections = new Array<[string, string, number]>();
    const tabWebPartSection = $(this.domElement).closest("div." + this.properties.sectionClass);

    // Get the index of the section containing the tab webpart
    const allSections = $("div." + this.properties.sectionClass);
    let tabWebPartSectionIndex = -1;
    allSections.each((index: number, element: HTMLElement) => {
      if ($(element).is(tabWebPartSection)) {
        tabWebPartSectionIndex = index;
        return false; // break
      }
    });

    allSections.each((index: number, element: HTMLElement) => {
      const $element = $(element);

      // Don't include the section containing this tab webpart (compare by index)
      if (index !== tabWebPartSectionIndex) {
        const sectionNum = index + 1;
        // Count web parts using multiple selectors for compatibility with different SharePoint versions
        // Use the maximum count from different selector strategies
        const countByClass = $element.find("div." + this.properties.webpartClass).length;
        const countByDataAttr = $element.find('[data-automation-id="CanvasControl"]').length;
        const countByNested = $element.find('.CanvasZone .ControlZone, .CanvasZone [data-automation-id="CanvasControl"]').length;
        const webpartCount = Math.max(countByClass, countByDataAttr, countByNested);

        // Only include sections that have webparts
        if (webpartCount > 0) {
          // Use index-based ID for consistent identification
          const sectionId = `hillbilly-section-${index}`;
          // Store it on the element for later reference during render
          $element.attr("data-hillbilly-section-id", sectionId);

          const sectionLabel = `>> Section ${sectionNum} (${webpartCount} web part${webpartCount !== 1 ? 's' : ''})`;
          sections.push([`SECTION:${sectionId}`, sectionLabel, sectionNum]);
        }
      }
    });

    return sections;
  }

  private getZones(): Array<[string, string, number]> {
    const zones = new Array<[string, string, number]>();

    const tabWebPartID = $(this.domElement).closest("div." + this.properties.webpartClass).attr("id");

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
   */
  private getDropdownOptions(forTabIndex?: number): IPropertyPaneDropdownOption[] {
    const zones = this.getZones();
    const sections = this.getSections();
    const assignedItems = this.getAssignedItems();
    const options: IPropertyPaneDropdownOption[] = [
      { key: '', text: '(None - skip this tab)' }
    ];

    // Helper to add "already used" indicator with visual emphasis
    const addUsageIndicator = (text: string, itemKey: string): string => {
      const assignedToTab = assignedItems.get(itemKey);
      if (assignedToTab && assignedToTab !== forTabIndex) {
        return `${text} ⚠️ IN USE → Tab ${assignedToTab}`;
      }
      return text;
    };

    // Add sections first (entire section options)
    if (sections.length > 0) {
      sections.forEach(section => {
        options.push({
          key: section[0],
          text: addUsageIndicator(section[1], section[0])
        });
      });
    }

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
        options.push({
          key: zone[0],
          text: addUsageIndicator(`    ${zone[1]}`, zone[0])  // Indent individual webparts
        });
      });
    });

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

    // Helper to add "already used" indicator
    const addUsageIndicator = (text: string, itemKey: string): string => {
      const assignedToTab = usedAsLabels.get(itemKey);
      if (assignedToTab) {
        return `${text} ⚠️ USED AS LABEL → Tab ${assignedToTab}`;
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
    if (currentCount < 20) { // Max 20 tabs
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
      // Clear the last tab's data
      const lastTabIndex = currentCount;
      this.properties[`tab${lastTabIndex}WebPartID`] = '';
      this.properties[`tab${lastTabIndex}Label`] = '';
      this.properties.tabCount = currentCount - 1;
      this.context.propertyPane.refresh();
      this.render();
    }
  }

  /**
   * Move a tab up (swap with previous tab)
   */
  private moveTabUp(tabIndex: number): void {
    if (tabIndex <= 1) return; // Can't move first tab up

    // Swap with previous tab
    const prevIndex = tabIndex - 1;

    // Store current tab data
    const currentWebPartID = this.properties[`tab${tabIndex}WebPartID`];
    const currentLabel = this.properties[`tab${tabIndex}Label`];

    // Move previous tab data to current position
    this.properties[`tab${tabIndex}WebPartID`] = this.properties[`tab${prevIndex}WebPartID`];
    this.properties[`tab${tabIndex}Label`] = this.properties[`tab${prevIndex}Label`];

    // Move current tab data to previous position
    this.properties[`tab${prevIndex}WebPartID`] = currentWebPartID;
    this.properties[`tab${prevIndex}Label`] = currentLabel;

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

    // Store current tab data
    const currentWebPartID = this.properties[`tab${tabIndex}WebPartID`];
    const currentLabel = this.properties[`tab${tabIndex}Label`];

    // Move next tab data to current position
    this.properties[`tab${tabIndex}WebPartID`] = this.properties[`tab${nextIndex}WebPartID`];
    this.properties[`tab${tabIndex}Label`] = this.properties[`tab${nextIndex}Label`];

    // Move current tab data to next position
    this.properties[`tab${nextIndex}WebPartID`] = currentWebPartID;
    this.properties[`tab${nextIndex}Label`] = currentLabel;

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

    // Add/Remove tab buttons
    fields.push(
      PropertyPaneButton('addTab', {
        text: 'Add Tab',
        buttonType: PropertyPaneButtonType.Normal,
        icon: 'Add',
        onClick: () => this.addTab()
      })
    );

    if (numTabs > 1) {
      fields.push(
        PropertyPaneButton('removeTab', {
          text: 'Remove Last Tab',
          buttonType: PropertyPaneButtonType.Normal,
          icon: 'Remove',
          onClick: () => this.removeTab()
        })
      );
    }

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

      fields.push(
        PropertyPaneDropdown(`tab${i}WebPartID`, {
          label: `Web Part`,
          options: this.getDropdownOptions(i),
          selectedKey: this.properties[`tab${i}WebPartID`] as string || ''
        })
      );

      // Label type dropdown - text or web part (image)
      fields.push(
        PropertyPaneDropdown(`tab${i}LabelType`, {
          label: `Label Type`,
          options: [
            { key: 'text', text: 'Text Label' },
            { key: 'webpart', text: 'Use Web Part as Label (e.g., Image)' }
          ],
          selectedKey: this.properties[`tab${i}LabelType`] as string || 'text'
        })
      );

      const labelType = this.properties[`tab${i}LabelType`] as string || 'text';

      if (labelType === 'webpart') {
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
