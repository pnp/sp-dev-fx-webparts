import * as React from 'react';
import {
  IPropertyPaneField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-property-pane';

/**
 * Standard container properties shared by every Intranet Suite web part:
 * show/hide the title, show/hide an outer border, and pick a background
 * (transparent by default, a preset, or a custom colour).
 */
export interface IStandardWebPartProps {
  showTitle: boolean;
  showBorder: boolean;
  backgroundMode: string;    // transparent | white | neutral | accent | custom
  backgroundColor: string;   // CSS colour used only when backgroundMode = custom
}

/** Manifest/default values to spread into each web part's preconfigured properties. */
export const STANDARD_DEFAULTS: IStandardWebPartProps = {
  showTitle: true,
  showBorder: false,
  backgroundMode: 'transparent',
  backgroundColor: '#eef3f8'
};

/**
 * Outer-frame inline style (background, border, padding) computed from the standard
 * props. Returns an empty object for the transparent, border-off default so the web
 * part looks exactly as it does today until the author opts in.
 */
export function computeFrameStyle(p: Partial<IStandardWebPartProps>, accent: string): React.CSSProperties {
  const mode = p.backgroundMode || 'transparent';
  let bg: string | undefined;
  switch (mode) {
    case 'white': bg = '#ffffff'; break;
    case 'neutral': bg = 'rgba(128, 128, 128, 0.06)'; break;
    case 'accent': bg = `color-mix(in srgb, ${accent} 8%, transparent)`; break;
    case 'custom': bg = (p.backgroundColor || '').trim() || undefined; break;
    default: bg = undefined; // transparent
  }
  const style: React.CSSProperties = {};
  if (bg) { style.background = bg; }
  if (p.showBorder) { style.border = '1px solid rgba(128, 128, 128, 0.16)'; }
  if (bg || p.showBorder) {
    style.borderRadius = '10px';
    style.padding = '16px';
    // A subtle card shadow (matches the prototype's soft-floating cards).
    style.boxShadow = '0 1.6px 3.6px rgba(0, 0, 0, 0.08), 0 0.3px 0.9px rgba(0, 0, 0, 0.05)';
  }
  return style;
}

/** true unless the author explicitly turned the title off. */
export function shouldShowTitle(p: Partial<IStandardWebPartProps>): boolean {
  return p.showTitle !== false;
}

/**
 * The shared "Container" property-pane fields. Spread the result into a group's
 * groupFields in every web part so the standard options look and behave the same.
 * currentMode drives whether the custom-colour field is enabled.
 */
export function standardPaneFields(currentMode: string, onReset?: () => void): IPropertyPaneField<unknown>[] {
  const fields: IPropertyPaneField<unknown>[] = [
    PropertyPaneToggle('showTitle', { label: 'Show title', onText: 'Shown', offText: 'Hidden' }),
    PropertyPaneToggle('showBorder', { label: 'Show border', onText: 'On', offText: 'Off' }),
    PropertyPaneDropdown('backgroundMode', {
      label: 'Background',
      options: [
        { key: 'transparent', text: 'Transparent (default)' },
        { key: 'white', text: 'White' },
        { key: 'neutral', text: 'Light grey' },
        { key: 'accent', text: 'Accent tint' },
        { key: 'custom', text: 'Custom colour' }
      ]
    }),
    PropertyPaneTextField('backgroundColor', {
      label: 'Custom colour (hex or CSS)',
      disabled: currentMode !== 'custom',
      placeholder: '#eef3f8'
    })
  ] as IPropertyPaneField<unknown>[];
  if (onReset) {
    fields.push(PropertyPaneButton('resetToDefault', {
      text: 'Reset to default',
      buttonType: PropertyPaneButtonType.Normal,
      onClick: () => { onReset(); }
    }) as IPropertyPaneField<unknown>);
  }
  return fields;
}
