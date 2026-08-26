import { ICountryOption } from './ICountryOption';

/**
 * Countries offered by the web part.
 *
 * Nager.Date serves many more (202 at the time of writing); this is a curated
 * list so the dropdown stays usable. Add entries here to extend it — the code
 * is the ISO 3166-1 alpha-2 code the API expects.
 */
export const COUNTRIES: ICountryOption[] = [
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CN', name: 'China' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IN', name: 'India' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PT', name: 'Portugal' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KR', name: 'South Korea' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' }
];

export function countryName(code: string): string {
  const match = COUNTRIES.filter((c) => c.code === code)[0];
  return match ? match.name : code;
}
