import { getAbsenceTypeKey } from '../utils/calendarUtils';

export interface ITypeColor {
  bg: string;
  border: string;
  text: string;
}

interface IKnownColor {
  light: ITypeColor;
  dark: ITypeColor;
}

/** Hand-picked colours for the built-in absence types, ported from the old stylesheet tokens. */
const KNOWN_COLORS: { [key: string]: IKnownColor } = {
  vacation: {
    light: { bg: '#d9f2e4', border: '#4caf7d', text: '#1c6b45' },
    dark: { bg: '#233d30', border: '#3f7d5d', text: '#8fe0b4' }
  },
  sick: {
    light: { bg: '#fbe0e0', border: '#e07a7a', text: '#a62c2c' },
    dark: { bg: '#432727', border: '#a85a5a', text: '#f0a3a3' }
  },
  parental: {
    light: { bg: '#ece0fa', border: '#a982da', text: '#613da6' },
    dark: { bg: '#322a48', border: '#7a5aa8', text: '#d8bdf2' }
  },
  training: {
    light: { bg: '#dde8fb', border: '#6c9be0', text: '#1f5aa8' },
    dark: { bg: '#223a52', border: '#4f7bb0', text: '#a9cdf5' }
  },
  businessTrip: {
    light: { bg: '#ffe9cf', border: '#e0a250', text: '#98571a' },
    dark: { bg: '#4a3720', border: '#b07f3d', text: '#f0c68a' }
  },
  other: {
    light: { bg: '#e6e6e6', border: '#b3b3b3', text: '#4a4a4a' },
    dark: { bg: '#3a3a3a', border: '#6a6a6a', text: '#cfcfcf' }
  }
};

const KNOWN_ICONS: { [key: string]: string } = {
  vacation: 'Sunny',
  sick: 'Medical',
  parental: 'People',
  training: 'Education',
  businessTrip: 'Airplane',
  other: 'More'
};

const KNOWN_LABELS: { [key: string]: string } = {
  vacation: 'Vacation',
  sick: 'Sick',
  parental: 'Parental',
  training: 'Training',
  businessTrip: 'Business trip',
  other: 'Other'
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * A stable colour for a custom category, spread around the wheel by the golden
 * angle so neighbouring keys do not collide.
 */
function customColor(key: string, isDark: boolean): ITypeColor {
  const hue: number = Math.round((hashString(key) * 137.508) % 360);
  return isDark
    ? {
        bg: `hsl(${hue}, 28%, 22%)`,
        border: `hsl(${hue}, 42%, 46%)`,
        text: `hsl(${hue}, 60%, 78%)`
      }
    : {
        bg: `hsl(${hue}, 68%, 89%)`,
        border: `hsl(${hue}, 52%, 60%)`,
        text: `hsl(${hue}, 60%, 30%)`
      };
}

/** Background / border / text colour for an absence type value. */
export function getTypeColor(rawType: string, isDark: boolean): ITypeColor {
  const key: string = getAbsenceTypeKey(rawType);
  const known: IKnownColor | undefined = KNOWN_COLORS[key];
  if (known) {
    return isDark ? known.dark : known.light;
  }
  return customColor(key, isDark);
}

/** Fluent (MDL2) icon name for an absence type value. */
export function getTypeIcon(rawType: string): string {
  return KNOWN_ICONS[getAbsenceTypeKey(rawType)] || 'Tag';
}

/**
 * Display label for a legend entry. Built-in types get their canonical name so
 * synonyms collapse together; a custom value keeps its own text.
 */
export function getTypeLabel(rawType: string): string {
  const key: string = getAbsenceTypeKey(rawType);
  return KNOWN_LABELS[key] || rawType.trim() || 'Other';
}
