/**
 * Built-in Template Presets for PiCanvas
 * These templates are always available and cannot be deleted
 */

import { IPiCanvasTemplate, TEMPLATE_SCHEMA_VERSION } from '../models/TemplateModels';

const now = new Date().toISOString();

export const BUILTIN_TEMPLATES: IPiCanvasTemplate[] = [
  // 1. Dashboard - Professional pill-style navigation
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'dashboard',
    templateName: 'Dashboard',
    description: 'Professional dashboard with pill-style navigation and blue accent',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 4,
    tabs: [
      { label: 'Overview', labelType: 'text', icon: '🏠' },
      { label: 'Analytics', labelType: 'text', icon: '📊' },
      { label: 'Reports', labelType: 'text', icon: '📄' },
      { label: 'Settings', labelType: 'text', icon: '⚙️' }
    ],
    tabStyle: 'pills',
    tabAlignment: 'left',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    accentColor: '#0078d4',
    tabFontSize: '14px',
    tabFontWeight: '500',
    tabBorderRadius: '16px',
    tabPaddingVertical: '8px',
    tabPaddingHorizontal: '16px',
    tabGap: '8px',
    enableTransitions: true,
    showActiveIndicator: false
  },

  // 2. Documentation - Clean underline tabs
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'documentation',
    templateName: 'Documentation',
    description: 'Clean documentation layout with underline tabs and stretch alignment',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 5,
    tabs: [
      { label: 'Getting Started', labelType: 'text' },
      { label: 'Installation', labelType: 'text' },
      { label: 'Configuration', labelType: 'text' },
      { label: 'API Reference', labelType: 'text', dividerAfter: true },
      { label: 'FAQ', labelType: 'text' }
    ],
    tabStyle: 'underline',
    tabAlignment: 'stretch',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    tabFontSize: '14px',
    tabFontWeight: '500',
    activeIndicatorWidth: '3px',
    enableTransitions: true,
    showActiveIndicator: true
  },

  // 3. Team Site - Vertical navigation
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'team-site',
    templateName: 'Team Site',
    description: 'Team collaboration layout with vertical left navigation',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 4,
    tabs: [
      { label: 'Home', labelType: 'text', icon: '🏠' },
      { label: 'Team', labelType: 'text', icon: '👥' },
      { label: 'Calendar', labelType: 'text', icon: '📅' },
      { label: 'Files', labelType: 'text', icon: '📁' }
    ],
    tabStyle: 'default',
    tabAlignment: 'stretch',
    tabOrientation: 'vertical',
    verticalTabPosition: 'left',
    verticalTabWidth: '200px',
    themeMode: 'auto',
    tabFontSize: '14px',
    tabFontWeight: '400',
    tabPaddingVertical: '12px',
    tabPaddingHorizontal: '16px',
    enableTransitions: true,
    showActiveIndicator: true,
    activeIndicatorWidth: '4px'
  },

  // 4. Project Hub - Boxed cards
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'project',
    templateName: 'Project Hub',
    description: 'Project management with boxed tab cards and green accent',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 5,
    tabs: [
      { label: 'Summary', labelType: 'text', icon: 'ℹ️' },
      { label: 'Tasks', labelType: 'text', icon: '✅' },
      { label: 'Timeline', labelType: 'text', icon: '📅' },
      { label: 'Resources', labelType: 'text', icon: '🔗', dividerAfter: true },
      { label: 'Archive', labelType: 'text', icon: '📦' }
    ],
    tabStyle: 'boxed',
    tabAlignment: 'stretch',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    accentColor: '#107c10',
    tabFontSize: '14px',
    tabFontWeight: '500',
    tabBorderRadius: '4px',
    tabGap: '4px',
    enableTransitions: true,
    showActiveIndicator: false
  },

  // 5. Knowledge Base - Centered underline
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'knowledge-base',
    templateName: 'Knowledge Base',
    description: 'Knowledge base with centered underline navigation',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 4,
    tabs: [
      { label: 'Articles', labelType: 'text', icon: '📄' },
      { label: 'Categories', labelType: 'text', icon: '📁' },
      { label: 'Search', labelType: 'text', icon: '🔍' },
      { label: 'Popular', labelType: 'text', icon: '⭐' }
    ],
    tabStyle: 'underline',
    tabAlignment: 'center',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    accentColor: '#8764b8',
    tabFontSize: '15px',
    tabFontWeight: '500',
    tabGap: '24px',
    activeIndicatorWidth: '3px',
    enableTransitions: true,
    showActiveIndicator: true
  },

  // 6. FAQ / Help Center - Minimal
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'faq',
    templateName: 'FAQ / Help Center',
    description: 'FAQ layout with minimal styling and clean look',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 3,
    tabs: [
      { label: 'General', labelType: 'text' },
      { label: 'Technical', labelType: 'text' },
      { label: 'Billing', labelType: 'text' }
    ],
    tabStyle: 'underline',
    tabAlignment: 'left',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    tabFontSize: '16px',
    tabFontWeight: '400',
    tabGap: '32px',
    activeIndicatorWidth: '2px',
    enableTransitions: true,
    showActiveIndicator: true
  },

  // 7. Portfolio - Creative pills
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'portfolio',
    templateName: 'Portfolio',
    description: 'Creative portfolio with centered pill navigation',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 4,
    tabs: [
      { label: 'Work', labelType: 'text', icon: '🎨' },
      { label: 'About', labelType: 'text', icon: '👤' },
      { label: 'Services', labelType: 'text', icon: '⚡' },
      { label: 'Contact', labelType: 'text', icon: '✉️' }
    ],
    tabStyle: 'pills',
    tabAlignment: 'center',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    accentColor: '#e3008c',
    tabFontSize: '14px',
    tabFontWeight: '500',
    tabBorderRadius: '8px',
    tabGap: '12px',
    enableTransitions: true,
    showActiveIndicator: false
  },

  // 8. News Hub - Bold boxed
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'news-hub',
    templateName: 'News Hub',
    description: 'News and announcements with bold styling',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 4,
    tabs: [
      { label: 'Latest', labelType: 'text', icon: '📰' },
      { label: 'Featured', labelType: 'text', icon: '⭐' },
      { label: 'Events', labelType: 'text', icon: '📅' },
      { label: 'Archive', labelType: 'text', icon: '📦' }
    ],
    tabStyle: 'boxed',
    tabAlignment: 'stretch',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    accentColor: '#d83b01',
    tabFontSize: '14px',
    tabFontWeight: '600',
    tabBorderRadius: '0px',
    tabGap: '0px',
    enableTransitions: true,
    showActiveIndicator: false,
    showTabSeparator: true
  },

  // 9. Simple Two-Tab - Minimal default
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'simple-two',
    templateName: 'Simple Two-Tab',
    description: 'Minimal two-tab layout with default styling',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 2,
    tabs: [
      { label: 'Tab 1', labelType: 'text' },
      { label: 'Tab 2', labelType: 'text' }
    ],
    tabStyle: 'default',
    tabAlignment: 'stretch',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    tabFontSize: '14px',
    tabFontWeight: '400',
    enableTransitions: true,
    showActiveIndicator: true
  },

  // 10. Executive Dashboard - Professional
  {
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    templateId: 'executive',
    templateName: 'Executive Dashboard',
    description: 'Professional executive layout with bold underline tabs',
    author: 'PiCanvas',
    createdDate: now,
    modifiedDate: now,
    isBuiltIn: true,
    tabCount: 3,
    tabs: [
      { label: 'Executive Summary', labelType: 'text' },
      { label: 'KPIs', labelType: 'text' },
      { label: 'Trends', labelType: 'text' }
    ],
    tabStyle: 'underline',
    tabAlignment: 'left',
    tabOrientation: 'horizontal',
    themeMode: 'auto',
    accentColor: '#004578',
    tabFontSize: '16px',
    tabFontWeight: '600',
    tabGap: '32px',
    activeIndicatorWidth: '4px',
    enableTransitions: true,
    showActiveIndicator: true
  }
];
