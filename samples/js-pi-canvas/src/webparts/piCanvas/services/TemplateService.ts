/**
 * Template Service for PiCanvas
 * Handles SharePoint file operations and template management
 */

import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
  IPiCanvasTemplate,
  ITemplateListItem,
  ITabTemplateConfig,
  TEMPLATE_SCHEMA_VERSION
} from '../models/TemplateModels';
import { BUILTIN_TEMPLATES } from '../data/BuiltinTemplates';
import { IPiCanvasWebPartProps } from '../PiCanvasWebPart';

export class TemplateService {
  private static readonly TEMPLATE_FOLDER = 'SiteAssets/PiCanvas';
  private static readonly MANIFEST_FILE = 'templates.json';

  private context: WebPartContext;
  private siteUrl: string;

  constructor(context: WebPartContext) {
    this.context = context;
    this.siteUrl = context.pageContext.web.absoluteUrl;
  }

  /**
   * Get server-relative folder path
   */
  private getServerRelativeFolderPath(): string {
    const siteRelativeUrl = this.context.pageContext.web.serverRelativeUrl;
    // Handle root site case
    const basePath = siteRelativeUrl === '/' ? '' : siteRelativeUrl;
    return `${basePath}/SiteAssets/PiCanvas`;
  }

  /**
   * Ensure the PiCanvas folder exists in Site Assets
   */
  public async ensureTemplateFolder(): Promise<boolean> {
    try {
      // Check if folder exists
      const folderPath = this.getServerRelativeFolderPath();
      const checkUrl = `${this.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${encodeURIComponent(folderPath)}')`;
      const response = await this.context.spHttpClient.get(
        checkUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata'
          }
        }
      );

      if (response.ok) {
        return true;
      }

      // Folder doesn't exist, create it
      return await this.createTemplateFolder();
    } catch (error) {
      console.error('Error checking template folder:', error);
      return false;
    }
  }

  /**
   * Create the PiCanvas folder in Site Assets
   */
  private async createTemplateFolder(): Promise<boolean> {
    try {
      const folderPath = this.getServerRelativeFolderPath();
      const createUrl = `${this.siteUrl}/_api/web/folders`;
      const body = JSON.stringify({
        'ServerRelativeUrl': folderPath
      });

      const response = await this.context.spHttpClient.post(
        createUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-Type': 'application/json;odata=nometadata'
          },
          body: body
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error creating template folder:', error);
      return false;
    }
  }

  /**
   * Check if Site Assets is accessible
   */
  public async checkSiteAssetsAccess(): Promise<boolean> {
    try {
      const checkUrl = `${this.siteUrl}/_api/web/lists/getbytitle('Site Assets')`;
      const response = await this.context.spHttpClient.get(
        checkUrl,
        SPHttpClient.configurations.v1,
        { headers: { 'Accept': 'application/json;odata=nometadata' } }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Save a template to Site Assets
   */
  public async saveTemplate(template: IPiCanvasTemplate): Promise<boolean> {
    try {
      await this.ensureTemplateFolder();

      const fileName = `${template.templateId}.json`;
      const fileContent = JSON.stringify(template, null, 2);
      const folderPath = this.getServerRelativeFolderPath();

      const uploadUrl = `${this.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${encodeURIComponent(folderPath)}')/Files/add(url='${encodeURIComponent(fileName)}',overwrite=true)`;

      const response = await this.context.spHttpClient.post(
        uploadUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata'
          },
          body: fileContent
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error saving template:', error);
      return false;
    }
  }

  /**
   * Load a template from Site Assets or built-ins
   */
  public async loadTemplate(templateId: string): Promise<IPiCanvasTemplate | null> {
    // First check built-in templates
    const builtIn = BUILTIN_TEMPLATES.find(t => t.templateId === templateId);
    if (builtIn) {
      return builtIn;
    }

    try {
      const fileName = `${templateId}.json`;
      const folderPath = this.getServerRelativeFolderPath();
      const fileUrl = `${this.siteUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(folderPath)}/${encodeURIComponent(fileName)}')/$value`;

      const response = await this.context.spHttpClient.get(
        fileUrl,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const template = await response.json();
        return this.validateTemplate(template);
      }
      return null;
    } catch (error) {
      console.error('Error loading template:', error);
      return null;
    }
  }

  /**
   * Get all available templates (built-in + saved)
   */
  public async getAvailableTemplates(): Promise<ITemplateListItem[]> {
    const templates: ITemplateListItem[] = [];

    // Add built-in templates
    BUILTIN_TEMPLATES.forEach(t => {
      templates.push({
        templateId: t.templateId,
        templateName: t.templateName,
        description: t.description,
        isBuiltIn: true,
        fileName: `${t.templateId}.json`
      });
    });

    // Load saved templates from Site Assets
    try {
      const folderPath = this.getServerRelativeFolderPath();
      const filesUrl = `${this.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${encodeURIComponent(folderPath)}')/Files?$filter=substringof('.json',Name)&$select=Name,TimeLastModified`;

      const response = await this.context.spHttpClient.get(
        filesUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const files = data.value || [];

        for (const file of files) {
          // Skip manifest file
          if (file.Name === TemplateService.MANIFEST_FILE) continue;

          // Skip if it's a built-in template ID
          const templateId = file.Name.replace('.json', '');
          if (BUILTIN_TEMPLATES.find(t => t.templateId === templateId)) continue;

          // Load template to get metadata
          const template = await this.loadTemplate(templateId);
          if (template) {
            templates.push({
              templateId: template.templateId,
              templateName: template.templateName,
              description: template.description,
              isBuiltIn: false,
              fileName: file.Name
            });
          }
        }
      }
    } catch (error) {
      // Silently fail - built-in templates still available
      console.warn('Could not load saved templates:', error);
    }

    return templates;
  }

  /**
   * Delete a saved template
   */
  public async deleteTemplate(templateId: string): Promise<boolean> {
    // Prevent deleting built-in templates
    if (BUILTIN_TEMPLATES.find(t => t.templateId === templateId)) {
      console.warn('Cannot delete built-in templates');
      return false;
    }

    try {
      const fileName = `${templateId}.json`;
      const folderPath = this.getServerRelativeFolderPath();
      const deleteUrl = `${this.siteUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(folderPath)}/${encodeURIComponent(fileName)}')`;

      const response = await this.context.spHttpClient.post(
        deleteUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'X-HTTP-Method': 'DELETE',
            'If-Match': '*'
          }
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error deleting template:', error);
      return false;
    }
  }

  /**
   * Validate and migrate template if needed
   */
  private validateTemplate(raw: unknown): IPiCanvasTemplate | null {
    try {
      const template = raw as IPiCanvasTemplate;

      // Check required fields
      if (!template.templateId || !template.templateName || !template.tabs) {
        console.warn('Template missing required fields');
        return null;
      }

      // Set defaults for missing optional fields
      template.schemaVersion = template.schemaVersion || TEMPLATE_SCHEMA_VERSION;
      template.tabCount = template.tabCount || template.tabs.length;
      template.tabStyle = template.tabStyle || 'default';
      template.tabAlignment = template.tabAlignment || 'stretch';
      template.tabOrientation = template.tabOrientation || 'horizontal';
      template.themeMode = template.themeMode || 'auto';

      return template;
    } catch (error) {
      console.error('Template validation error:', error);
      return null;
    }
  }

  /**
   * Convert webpart properties to template format
   */
  public propertiesToTemplate(properties: IPiCanvasWebPartProps, templateName: string): IPiCanvasTemplate {
    const tabs: ITabTemplateConfig[] = [];
    const numTabs = properties.tabCount || 2;

    for (let i = 1; i <= numTabs; i++) {
      // Parse permission groups
      const permissionGroupsStr = properties[`tab${i}PermissionGroups`] as string;
      const validGroups = ['Owners', 'Members', 'Visitors'];
      const permissionStandardGroups = permissionGroupsStr
        ? permissionGroupsStr.split(',').filter(g => validGroups.indexOf(g) !== -1) as ('Owners' | 'Members' | 'Visitors')[]
        : undefined;

      // Parse custom group IDs
      const customGroupsStr = properties[`tab${i}PermissionCustomGroups`] as string;
      const permissionCustomGroupIds = customGroupsStr
        ? customGroupsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id) && id > 0)
        : undefined;

      tabs.push({
        label: (properties[`tab${i}Label`] as string) || `Tab ${i}`,
        labelType: (properties[`tab${i}LabelType`] as 'text' | 'webpart') || 'text',
        icon: properties[`tab${i}Icon`] as string | undefined,
        imageUrl: properties[`tab${i}Image`] as string | undefined,
        imagePosition: properties[`tab${i}ImagePosition`] as 'left' | 'right' | 'top' | 'background' | undefined,
        dividerAfter: properties[`tab${i}DividerAfter`] as boolean | undefined,
        // Permission settings
        permissionEnabled: properties[`tab${i}PermissionEnabled`] as boolean | undefined,
        permissionStandardGroups: permissionStandardGroups && permissionStandardGroups.length > 0 ? permissionStandardGroups : undefined,
        permissionCustomGroupIds: permissionCustomGroupIds && permissionCustomGroupIds.length > 0 ? permissionCustomGroupIds : undefined,
        permissionShowPlaceholder: properties[`tab${i}PermissionPlaceholder`] as boolean | undefined,
        permissionPlaceholderText: properties[`tab${i}PermissionPlaceholderText`] as string | undefined
      });
    }

    const now = new Date().toISOString();

    return {
      schemaVersion: TEMPLATE_SCHEMA_VERSION,
      templateId: this.generateTemplateId(templateName),
      templateName: templateName,
      description: `Exported from PiCanvas on ${new Date().toLocaleDateString()}`,
      createdDate: now,
      modifiedDate: now,
      isBuiltIn: false,
      tabCount: numTabs,
      tabs: tabs,
      tabStyle: properties.tabStyle || 'default',
      tabAlignment: properties.tabAlignment || 'stretch',
      tabOrientation: properties.tabOrientation || 'horizontal',
      verticalTabPosition: properties.verticalTabPosition,
      verticalTabWidth: properties.verticalTabWidth,
      themeMode: properties.themeMode || 'auto',
      labelImageHeight: properties.labelImageHeight,
      accentColor: properties.accentColor,
      tabTextColor: properties.tabTextColor,
      tabActiveTextColor: properties.tabActiveTextColor,
      tabBackgroundColor: properties.tabBackgroundColor,
      tabActiveBackgroundColor: properties.tabActiveBackgroundColor,
      tabHoverBackgroundColor: properties.tabHoverBackgroundColor,
      tabFontSize: properties.tabFontSize,
      tabFontWeight: properties.tabFontWeight,
      tabPaddingVertical: properties.tabPaddingVertical,
      tabPaddingHorizontal: properties.tabPaddingHorizontal,
      tabGap: properties.tabGap,
      tabContentGap: properties.tabContentGap,
      tabBorderRadius: properties.tabBorderRadius,
      activeIndicatorWidth: properties.activeIndicatorWidth,
      tabShadow: properties.tabShadow,
      enableTransitions: properties.enableTransitions,
      showActiveIndicator: properties.showActiveIndicator,
      activeIndicatorColor: properties.activeIndicatorColor,
      showTabSeparator: properties.showTabSeparator,
      tabSeparatorColor: properties.tabSeparatorColor
    };
  }

  /**
   * Apply template to webpart properties
   */
  public applyTemplate(template: IPiCanvasTemplate, properties: IPiCanvasWebPartProps): void {
    // Apply tab count and structure
    properties.tabCount = template.tabCount;

    // Clear existing tab configurations beyond new count
    for (let i = template.tabCount + 1; i <= 20; i++) {
      properties[`tab${i}Label`] = undefined;
      properties[`tab${i}LabelType`] = undefined;
      properties[`tab${i}Icon`] = undefined;
      properties[`tab${i}Image`] = undefined;
      properties[`tab${i}ImagePosition`] = undefined;
      properties[`tab${i}DividerAfter`] = undefined;
      properties[`tab${i}WebPartID`] = undefined;
      // Clear permission settings
      properties[`tab${i}PermissionEnabled`] = undefined;
      properties[`tab${i}PermissionGroups`] = undefined;
      properties[`tab${i}PermissionCustomGroups`] = undefined;
      properties[`tab${i}PermissionPlaceholder`] = undefined;
      properties[`tab${i}PermissionPlaceholderText`] = undefined;
    }

    // Apply tab configurations
    template.tabs.forEach((tab, index) => {
      const tabNum = index + 1;
      properties[`tab${tabNum}Label`] = tab.label;
      properties[`tab${tabNum}LabelType`] = tab.labelType;
      if (tab.icon) properties[`tab${tabNum}Icon`] = tab.icon;
      if (tab.imageUrl) properties[`tab${tabNum}Image`] = tab.imageUrl;
      if (tab.imagePosition) properties[`tab${tabNum}ImagePosition`] = tab.imagePosition;
      properties[`tab${tabNum}DividerAfter`] = tab.dividerAfter || false;
      // Note: WebPartID is NOT applied - user must map content manually

      // Apply permission settings
      if (tab.permissionEnabled !== undefined) {
        properties[`tab${tabNum}PermissionEnabled`] = tab.permissionEnabled;
      }
      if (tab.permissionStandardGroups && tab.permissionStandardGroups.length > 0) {
        properties[`tab${tabNum}PermissionGroups`] = tab.permissionStandardGroups.join(',');
      }
      if (tab.permissionCustomGroupIds && tab.permissionCustomGroupIds.length > 0) {
        properties[`tab${tabNum}PermissionCustomGroups`] = tab.permissionCustomGroupIds.join(',');
      }
      if (tab.permissionShowPlaceholder !== undefined) {
        properties[`tab${tabNum}PermissionPlaceholder`] = tab.permissionShowPlaceholder;
      }
      if (tab.permissionPlaceholderText) {
        properties[`tab${tabNum}PermissionPlaceholderText`] = tab.permissionPlaceholderText;
      }
    });

    // Apply appearance settings
    properties.tabStyle = template.tabStyle;
    properties.tabAlignment = template.tabAlignment;
    properties.tabOrientation = template.tabOrientation;
    if (template.verticalTabPosition) properties.verticalTabPosition = template.verticalTabPosition;
    if (template.verticalTabWidth) properties.verticalTabWidth = template.verticalTabWidth;
    properties.themeMode = template.themeMode;
    if (template.labelImageHeight) properties.labelImageHeight = template.labelImageHeight;

    // Apply colors (only if defined in template)
    if (template.accentColor) properties.accentColor = template.accentColor;
    if (template.tabTextColor) properties.tabTextColor = template.tabTextColor;
    if (template.tabActiveTextColor) properties.tabActiveTextColor = template.tabActiveTextColor;
    if (template.tabBackgroundColor) properties.tabBackgroundColor = template.tabBackgroundColor;
    if (template.tabActiveBackgroundColor) properties.tabActiveBackgroundColor = template.tabActiveBackgroundColor;
    if (template.tabHoverBackgroundColor) properties.tabHoverBackgroundColor = template.tabHoverBackgroundColor;

    // Apply typography
    if (template.tabFontSize) properties.tabFontSize = template.tabFontSize;
    if (template.tabFontWeight) properties.tabFontWeight = template.tabFontWeight;

    // Apply spacing
    if (template.tabPaddingVertical) properties.tabPaddingVertical = template.tabPaddingVertical;
    if (template.tabPaddingHorizontal) properties.tabPaddingHorizontal = template.tabPaddingHorizontal;
    if (template.tabGap) properties.tabGap = template.tabGap;
    if (template.tabContentGap) properties.tabContentGap = template.tabContentGap;

    // Apply borders & effects
    if (template.tabBorderRadius) properties.tabBorderRadius = template.tabBorderRadius;
    if (template.activeIndicatorWidth) properties.activeIndicatorWidth = template.activeIndicatorWidth;
    if (template.tabShadow) properties.tabShadow = template.tabShadow;
    if (template.enableTransitions !== undefined) properties.enableTransitions = template.enableTransitions;
    if (template.showActiveIndicator !== undefined) properties.showActiveIndicator = template.showActiveIndicator;
    if (template.activeIndicatorColor) properties.activeIndicatorColor = template.activeIndicatorColor;
    if (template.showTabSeparator !== undefined) properties.showTabSeparator = template.showTabSeparator;
    if (template.tabSeparatorColor) properties.tabSeparatorColor = template.tabSeparatorColor;
  }

  /**
   * Export current configuration to JSON string (for download)
   */
  public exportToJson(properties: IPiCanvasWebPartProps, templateName: string): string {
    const template = this.propertiesToTemplate(properties, templateName);
    return JSON.stringify(template, null, 2);
  }

  /**
   * Parse imported JSON to template
   */
  public parseImportedJson(jsonString: string): IPiCanvasTemplate | null {
    try {
      const parsed = JSON.parse(jsonString);
      return this.validateTemplate(parsed);
    } catch (error) {
      console.error('Failed to parse imported JSON:', error);
      return null;
    }
  }

  /**
   * Generate a safe template ID from name
   */
  private generateTemplateId(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50) + '-' + Date.now().toString(36);
  }
}
