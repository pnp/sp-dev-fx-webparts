import { EmissionCategory } from '../models/EmissionCategory';

/**
 * Emission factors for each category (kg CO₂ per unit).
 */
export const EmissionFactors: Record<EmissionCategory, number> = {
  Electricity: 0.233,       // kg CO₂ per kWh
  'Car Travel': 0.12,       // kg CO₂ per km
  'Short Flights': 250,     // kg CO₂ per short flight
  'Long Flights': 1000,     // kg CO₂ per long flight
  'Natural Gas': 2.0,       // kg CO₂ per m³
  Water: 0.0003             // kg CO₂ per liter
};
