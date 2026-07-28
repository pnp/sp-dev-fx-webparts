import * as strings from 'CarbonFootprintCalculatorWebPartStrings';

/**
 * Display name for a category.
 *
 * The service keys its results by a stable English name so the arithmetic and
 * its tests do not depend on the display language. Everything the user reads
 * goes through here.
 */
export const CategoryLabels: Record<string, string> = {
  Electricity: strings.CategoryElectricity,
  'Car Travel': strings.CategoryCarTravel,
  'Short Flights': strings.CategoryShortFlights,
  'Long Flights': strings.CategoryLongFlights,
  'Natural Gas': strings.CategoryNaturalGas,
  Water: strings.CategoryWater
};

export function categoryLabel(category: string): string {
  return CategoryLabels[category] || category;
}
