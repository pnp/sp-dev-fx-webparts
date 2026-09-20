import { ColorMode, PaletteName, StatusDirection } from '../model/dashboardTypes';

// Reserved status palette from the data-viz method - never mixed with the category
// hues, and always paired with a glyph + label so colour is not the only signal.
export type StatusLevel = 'good' | 'warning' | 'critical';
const STATUS_COLORS: { [k in StatusLevel]: string } = {
  good: '#0ca30c', warning: '#fab219', critical: '#d03b3b'
};
export const STATUS_META: { [k in StatusLevel]: { glyph: string; label: string } } = {
  good: { glyph: '✓', label: 'On target' },   // check
  warning: { glyph: '!', label: 'Near target' }, // !
  critical: { glyph: '✗', label: 'Off target' }  // ballot X
};

export function statusColor(level: StatusLevel): string { return STATUS_COLORS[level]; }

/** Classify a value into good/warning/critical relative to two thresholds. */
export function statusFor(value: number, direction: StatusDirection, good: number, warn: number): StatusLevel {
  if (direction === 'lower-good') {
    if (value <= good) { return 'good'; }
    if (value <= warn) { return 'warning'; }
    return 'critical';
  }
  if (value >= good) { return 'good'; }
  if (value >= warn) { return 'warning'; }
  return 'critical';
}

// Four categorical palettes, each a full 8-hue spread at a different tone. Every one
// is validated colourblind-safe in this fixed order with the data-viz method's
// scripts/validate_palette.js (normal-vision adjacent dE >= 15; CVD in the 6-8 band,
// legal because tiles/bars/legends always carry data labels as secondary encoding).
// Assigned in order, never cycled by meaning. Vibrant is the reference from palette.md.
export const PALETTES: { [k in PaletteName]: string[] } = {
  vibrant: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
  soft: ['#5f92d6', '#ee8a54', '#28b087', '#dca330', '#e186b0', '#4fae4c', '#8478cc', '#e8746f'],
  mild: ['#4a7fc0', '#d1774a', '#3fa588', '#cfa23f', '#d072a2', '#4f9a56', '#6f66b0', '#cf6360'],
  deep: ['#1c5488', '#b6491d', '#14795a', '#b07b12', '#b24f78', '#0e6d14', '#4e42ac', '#a5312f']
};

interface IRgb { r: number; g: number; b: number; }

function parseHex(hex: string): IRgb {
  let h = (hex || '').replace('#', '');
  if (h.length === 3) { h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2); }
  const n = parseInt(h || '000000', 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function toHex(c: IRgb): string {
  const clamp = (x: number): number => Math.max(0, Math.min(255, Math.round(x)));
  const h = (x: number): string => ('0' + clamp(x).toString(16)).slice(-2);
  return '#' + h(c.r) + h(c.g) + h(c.b);
}

/** Blend two hex colours: t=0 -> a, t=1 -> b. */
function mix(a: string, b: string, t: number): string {
  const ca = parseHex(a); const cb = parseHex(b);
  return toHex({ r: ca.r + (cb.r - ca.r) * t, g: ca.g + (cb.g - ca.g) * t, b: ca.b + (cb.b - ca.b) * t });
}

/**
 * One colour per data point, driven by the chosen colour mode.
 * - accent:      every mark uses the single theme accent.
 * - categorical: a distinct hue per point from the chosen palette, in fixed order.
 * - gradient:    a light-to-dark ramp of the accent, darker = larger value.
 * The values array is only consulted for the gradient ramp.
 */
export function buildColors(
  values: number[], mode: ColorMode, accent: string, isDark: boolean, palette: PaletteName
): string[] {
  const n = values.length;
  if (mode === 'categorical') {
    const pal = PALETTES[palette] || PALETTES.vibrant;
    // Categories beyond the palette length reuse from the start; keep groupings small
    // (top-N / "Other" folding is a planned enhancement) so a hue never misleads.
    const out: string[] = [];
    for (let i = 0; i < n; i++) { out.push(pal[i % pal.length]); }
    return out;
  }
  if (mode === 'gradient') {
    const max = values.reduce((m, v) => Math.max(m, v), 0);
    const surface = isDark ? '#1a1a19' : '#ffffff';
    return values.map(v => {
      const frac = max > 0 ? Math.max(0, v) / max : 0;
      // Keep the lightest step readable: never mix more than 70% toward the surface.
      return mix(surface, accent, 0.3 + 0.7 * frac);
    });
  }
  // accent
  const out: string[] = [];
  for (let i = 0; i < n; i++) { out.push(accent); }
  return out;
}
