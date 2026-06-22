import { EmissionCategory } from './EmissionCategory';

/**
 * Recommended sustainable thresholds for each emission category (monthly).
 */
export const ThresholdLimits: Record<EmissionCategory, number> = {
  'Electricity': 300,        // kWh
  'Car Travel': 800,         // km
  'Short Flights': 1,        // flights/month
  'Long Flights': 0,         // flights/month
  'Natural Gas': 100,        // m³
  'Water': 5000              // liters
};
