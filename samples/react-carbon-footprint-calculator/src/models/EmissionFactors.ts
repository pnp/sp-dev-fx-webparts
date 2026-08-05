import { EmissionCategory } from '../models/EmissionCategory';
import { HeatingType } from '../models/HeatingType';

/**
 * Emission factors in kg CO₂e per unit.
 *
 * These are rounded, illustrative values chosen so the sample produces
 * plausible numbers without shipping a dataset. They are not suitable for
 * reporting or for comparing real households: a real figure depends on the
 * local electricity mix, the vehicle, the aircraft and its load factor, and the
 * accounting boundary used.
 *
 * The orders of magnitude follow commonly published national conversion
 * factors, such as the UK Government GHG conversion factors for company
 * reporting:
 * https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting
 *
 * To make the calculator match a specific region, replace these values with the
 * factors published by that region's authority and cite the source here.
 */
export const EmissionFactors: Record<EmissionCategory, number> = {
  Electricity: 0.233,       // per kWh — varies widely with the national grid mix
  'Car Travel': 0.12,       // per km — average petrol car, single occupant
  'Short Flights': 250,     // per flight — roughly 1-3 h, economy, per passenger
  'Long Flights': 1000,     // per flight — roughly 8 h or more, economy, per passenger
  'Natural Gas': 2.0,       // per m³
  Water: 0.0003             // per litre — supply and treatment
};

/**
 * Multipliers applied to natural gas consumption by heating system.
 * Illustrative, for the same reason as the factors above.
 */
export const HeatingMultipliers: Record<HeatingType, number> = {
  gas: 1.2,
  heatpump: 0.6,
  electric: 1,
  wood: 1
};

/** Used when a stored property holds a heating type this build does not know. */
export const DefaultHeatingMultiplier = 1;

/**
 * Share of grid electricity still drawn when solar panels are installed.
 * Illustrative: the real figure depends on array size, orientation and usage.
 */
export const SolarSelfConsumptionFactor = 0.7;
