/**
 * PiCanvas Template Models
 * Defines interfaces for template configuration, storage, and management
 */

/**
 * Schema version for backwards compatibility
 * v1.0 - Initial version
 * v2.0 - Added content types (markdown, html, mermaid, embed), deep linking, lazy loading
 */
export const TEMPLATE_SCHEMA_VERSION = '2.0';

/**
 * Content type for tab content
 */
export type TabContentType = 'webpart' | 'section' | 'markdown' | 'html' | 'mermaid' | 'embed';

/**
 * Individual tab configuration within a template
 * Note: WebPartID is NOT stored - content mapping is page-specific
 */
export interface ITabTemplateConfig {
  label: string;
  labelType: 'text' | 'webpart';
  icon?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right' | 'top' | 'background';
  dividerAfter?: boolean;

  // Content type settings (v2.0+)
  contentType?: TabContentType;
  customContent?: string;  // For markdown, html, mermaid content
  embedUrl?: string;       // For embed type
  embedHeight?: string;    // Height for embed iframe (default: '400px')

  // Permission settings
  permissionEnabled?: boolean;
  permissionStandardGroups?: ('Owners' | 'Members' | 'Visitors')[];
  permissionCustomGroupIds?: number[];
  permissionShowPlaceholder?: boolean;
  permissionPlaceholderText?: string;
}

/**
 * Complete template configuration
 */
export interface IPiCanvasTemplate {
  // Metadata
  schemaVersion: string;
  templateId: string;
  templateName: string;
  description: string;
  author?: string;
  createdDate: string;
  modifiedDate: string;
  isBuiltIn: boolean;
  previewImageUrl?: string;

  // Tab Structure
  tabCount: number;
  tabs: ITabTemplateConfig[];

  // Appearance Settings
  tabStyle: 'default' | 'pills' | 'underline' | 'boxed';
  tabAlignment: 'left' | 'center' | 'right' | 'stretch';
  tabOrientation: 'horizontal' | 'vertical';
  verticalTabPosition?: 'left' | 'right';
  verticalTabWidth?: string;
  themeMode: 'auto' | 'light' | 'dark';
  labelImageHeight?: string;

  // Color Customization
  accentColor?: string;
  tabTextColor?: string;
  tabActiveTextColor?: string;
  tabBackgroundColor?: string;
  tabActiveBackgroundColor?: string;
  tabHoverBackgroundColor?: string;

  // Typography
  tabFontSize?: string;
  tabFontWeight?: string;

  // Spacing
  tabPaddingVertical?: string;
  tabPaddingHorizontal?: string;
  tabGap?: string;
  tabContentGap?: string;

  // Borders & Effects
  tabBorderRadius?: string;
  activeIndicatorWidth?: string;
  tabShadow?: string;
  enableTransitions?: boolean;
  showActiveIndicator?: boolean;
  activeIndicatorColor?: string;
  showTabSeparator?: boolean;
  tabSeparatorColor?: string;

  // Features (v2.0+)
  enableDeepLinking?: boolean;    // URL hash navigation (default: true)
  enableLazyLoading?: boolean;    // Lazy load tab content (default: true)
}

/**
 * Template list item for dropdown display
 */
export interface ITemplateListItem {
  templateId: string;
  templateName: string;
  description: string;
  isBuiltIn: boolean;
  fileName: string;
  previewImageUrl?: string;
}

/**
 * Template manifest for listing available templates in Site Assets
 */
export interface ITemplateManifest {
  schemaVersion: string;
  lastUpdated: string;
  templates: ITemplateListItem[];
}
