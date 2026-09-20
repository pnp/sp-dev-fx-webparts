import { PropertyPaneDropdownOptionType, type IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';

// Shared "tile / element colour" palette for the suite. Used by any web part that
// renders discrete elements (KPI tiles, Quick Links tiles, chart bars, countdown
// units, tabs, poll options). One source of truth for the fills, the auto palettes,
// the property-pane dropdown options, and the dark-fill text handling.

// Fills grouped by family. Soft / Fluorescent / Water are light (dark text stays
// legible); Dark fills need light text (see readableTileText).
export const TILE_FILLS: { [key: string]: string } = {
  // soft pastels
  blue: '#eaf2fb', green: '#eaf6ee', amber: '#fdf3e3', rose: '#fbeef0',
  purple: '#f2edfb', teal: '#e8f5f3', grey: '#f1f3f5',
  // fluorescent (brighter, still dark-text readable)
  lime: '#ddf99a', coral: '#ffcdbf', sky: '#cfe9ff', lemon: '#fff0a6',
  lilac: '#e4d4ff', mint: '#bff4d6',
  // water / aqua
  aqua: '#d6f5f0', seafoam: '#dcf3e6', ocean: '#c2e6f0',
  // dark / deep (light text)
  slate: '#334155', indigo: '#3730a3', forest: '#14532d', maroon: '#7f1d1d',
  plum: '#4c1d95', charcoal: '#1f2937'
};

// Auto palettes rotate one family across the elements, so each is a unique colour.
export const TILE_PALETTES: { [mode: string]: string[] } = {
  palette: ['blue', 'green', 'amber', 'rose', 'purple', 'teal', 'grey'],   // soft (legacy key)
  fluro: ['lime', 'coral', 'sky', 'lemon', 'lilac', 'mint'],
  water: ['aqua', 'seafoam', 'ocean'],
  dark: ['slate', 'indigo', 'forest', 'maroon', 'plum', 'charcoal']
};

export const MAX_TILE_COLORS = 8;

export function tileFillHex(key: string | undefined): string | undefined {
  return key && TILE_FILLS[key] ? TILE_FILLS[key] : undefined;
}

// A light text colour for dark fills, or undefined to keep the theme's (dark) text.
export function readableTileText(bg: string | undefined): string | undefined {
  if (!bg) { return undefined; }
  const h = bg.replace('#', '');
  if (h.length !== 6) { return undefined; }
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // perceived brightness
  return lum < 0.55 ? '#ffffff' : undefined;
}

// Resolve a background per element for `count` elements. customKeys[i] holds the
// per-element key in 'custom' mode; trends[i] ('up' | 'down' | 'flat') feeds 'trend' mode.
export function resolveTileColors(mode: string, count: number, customKeys: string[], trends?: string[]): (string | undefined)[] {
  const order = TILE_PALETTES[mode];
  const out: (string | undefined)[] = [];
  for (let i = 0; i < count; i++) {
    if (order) {
      out.push(TILE_FILLS[order[i % order.length]]);
    } else if (mode === 'trend' && trends) {
      const t = trends[i];
      out.push(t === 'up' ? TILE_FILLS.green : (t === 'down' ? TILE_FILLS.rose : TILE_FILLS.grey));
    } else if (mode === 'custom') {
      out.push(tileFillHex((customKeys[i] || '').toString()));
    } else {
      out.push(undefined);
    }
  }
  return out;
}

// Gather tileColor1..N properties off a web part's properties bag into an array.
export function collectCustomKeys(properties: unknown, count: number): string[] {
  const p = properties as { [k: string]: string };
  const keys: string[] = [];
  for (let i = 1; i <= count; i++) { keys.push((p['tileColor' + i] || '').toString()); }
  return keys;
}

// Mode dropdown options. includeTrend adds the KPI-only "By trend" mode.
export function tileColorModeOptions(includeTrend: boolean): IPropertyPaneDropdownOption[] {
  const H = PropertyPaneDropdownOptionType.Header;
  const opts: IPropertyPaneDropdownOption[] = [
    { key: 'none', text: 'None (default)' },
    { key: 'h-auto', text: 'Auto palettes (unique per item)', type: H },
    { key: 'palette', text: 'Soft palette' },
    { key: 'fluro', text: 'Fluorescent palette' },
    { key: 'water', text: 'Water palette' },
    { key: 'dark', text: 'Dark palette (light text)' },
    { key: 'h-other', text: 'Other', type: H }
  ];
  if (includeTrend) { opts.push({ key: 'trend', text: 'By trend (up green / down rose)' }); }
  opts.push({ key: 'custom', text: 'Custom (choose each)' });
  return opts;
}

// Per-element custom picker options (grouped by family via Header rows).
export function tileColorPickerOptions(): IPropertyPaneDropdownOption[] {
  const H = PropertyPaneDropdownOptionType.Header;
  return [
    { key: '', text: 'Default (theme)' },
    { key: 'h-soft', text: 'Soft', type: H },
    { key: 'blue', text: 'Mild blue' }, { key: 'green', text: 'Mild green' },
    { key: 'amber', text: 'Mild amber' }, { key: 'rose', text: 'Mild rose' },
    { key: 'purple', text: 'Mild purple' }, { key: 'teal', text: 'Mild teal' },
    { key: 'grey', text: 'Mild grey' },
    { key: 'h-fluro', text: 'Fluorescent', type: H },
    { key: 'lime', text: 'Lime' }, { key: 'coral', text: 'Coral' }, { key: 'sky', text: 'Sky' },
    { key: 'lemon', text: 'Lemon' }, { key: 'lilac', text: 'Lilac' }, { key: 'mint', text: 'Mint' },
    { key: 'h-water', text: 'Water', type: H },
    { key: 'aqua', text: 'Aqua' }, { key: 'seafoam', text: 'Seafoam' }, { key: 'ocean', text: 'Ocean' },
    { key: 'h-dark', text: 'Dark (light text)', type: H },
    { key: 'slate', text: 'Slate' }, { key: 'indigo', text: 'Indigo' }, { key: 'forest', text: 'Forest' },
    { key: 'maroon', text: 'Maroon' }, { key: 'plum', text: 'Plum' }, { key: 'charcoal', text: 'Charcoal' }
  ];
}
