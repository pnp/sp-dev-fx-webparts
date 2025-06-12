import { EmissionCategory } from '../models/EmissionCategory';
import { EmissionFactors } from '../models/EmissionFactors';
import { HeatingType } from '../models/HeatingType';

export interface EmissionInput {
  electricity: number;    // in kWh
  carKm: number;          // in km
  shortFlights: number;   // count
  longFlights: number;    // count
  gas: number;            // in m³
  water: number;          // in L
  hasSolar: boolean;
  heating: HeatingType;
}

/**
 * Calculates the carbon emissions for each category.
 * Applies solar panel and heating modifiers.
 */
export function calculateEmissions(input: EmissionInput): Record<EmissionCategory, number> {
  const heatMultiplier =
    input.heating === 'gas' ? 1.2 :
    input.heating === 'heatpump' ? 0.6 : 1;

  const adjustedElectricity = input.hasSolar ? input.electricity * 0.7 : input.electricity;

  return {
    Electricity: adjustedElectricity * EmissionFactors.Electricity,
    'Car Travel': input.carKm * EmissionFactors['Car Travel'],
    'Short Flights': input.shortFlights * EmissionFactors['Short Flights'],
    'Long Flights': input.longFlights * EmissionFactors['Long Flights'],
    'Natural Gas': input.gas * EmissionFactors['Natural Gas'] * heatMultiplier,
    Water: input.water * EmissionFactors.Water
  };
}
