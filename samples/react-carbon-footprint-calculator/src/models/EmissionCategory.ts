/**
 * Enum of all emission categories used in the calculator.
 */
export enum EmissionCategoryEnum {
  Electricity = 'Electricity',
  CarTravel = 'Car Travel',
  ShortFlights = 'Short Flights',
  LongFlights = 'Long Flights',
  NaturalGas = 'Natural Gas',
  Water = 'Water'
}

/**
 * String literal type for emission categories.
 */
export type EmissionCategory = `${EmissionCategoryEnum}`;
