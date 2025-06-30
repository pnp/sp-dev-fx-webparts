import { EmissionCategory } from './EmissionCategory';

/**
 * Defines sustainable upper thresholds (per person) for each emission category.
 * These values are used for performance evaluation and visual indicators (e.g., green/yellow/red).
 */
export const SustainableThresholds: Record<EmissionCategory, number> = {
  Electricity: 300,       // kWh per month
  'Car Travel': 800,      // km per month
  'Short Flights': 1,     // flights per month
  'Long Flights': 0,      // flights per month
  'Natural Gas': 100,     // m³ per month
  Water: 5000             // liters per month
};
