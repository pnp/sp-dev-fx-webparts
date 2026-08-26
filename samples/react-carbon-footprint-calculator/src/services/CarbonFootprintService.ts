import {
  EmissionFactors,
  HeatingMultipliers,
  DefaultHeatingMultiplier,
  SolarSelfConsumptionFactor
} from '../models/EmissionFactors';
import { HeatingType } from '../models/HeatingType';

/** Monthly household consumption entered by the user. */
export interface IConsumption {
  /** Grid electricity, kWh per month. */
  electricity: number;
  /** Car travel, km per month. */
  carKm: number;
  /** Short flights taken per month. */
  shortFlights: number;
  /** Long flights taken per month. */
  longFlights: number;
  /** Natural gas, m³ per month. */
  gas: number;
  /** Water, litres per month. */
  water: number;
  /** Whether solar panels offset part of the grid electricity. */
  hasSolar: boolean;
  heating: HeatingType;
}

/** One category's contribution to the monthly footprint. */
export interface IEmissionBreakdownItem {
  category: string;
  /** kg CO₂e per month. */
  value: number;
  /** Share of the total, 0-100. Zero when the total is zero. */
  share: number;
  /**
   * True when the category contributes something but rounds to less than
   * 0.1%, so the UI can say "<0.1%" instead of repeating 0.1%.
   */
  isTrace: boolean;
}

/** Turns monthly consumption into a CO₂e footprint. */
export class CarbonFootprintService {
  /** Emissions per category, in kg CO₂e per month. */
  public static calculateEmissions(consumption: IConsumption): Record<string, number> {
    const heatMultiplier =
      HeatingMultipliers[consumption.heating] !== undefined
        ? HeatingMultipliers[consumption.heating]
        : DefaultHeatingMultiplier;

    const grid = consumption.hasSolar
      ? consumption.electricity * SolarSelfConsumptionFactor
      : consumption.electricity;

    return {
      Electricity: grid * EmissionFactors.Electricity,
      'Car Travel': consumption.carKm * EmissionFactors['Car Travel'],
      'Short Flights': consumption.shortFlights * EmissionFactors['Short Flights'],
      'Long Flights': consumption.longFlights * EmissionFactors['Long Flights'],
      'Natural Gas': consumption.gas * EmissionFactors['Natural Gas'] * heatMultiplier,
      Water: consumption.water * EmissionFactors.Water
    };
  }

  public static getTotalEmissions(values: Record<string, number>): number {
    return Object.keys(values).reduce((sum, key) => sum + values[key], 0);
  }

  /**
   * Emissions per person. An invalid resident count returns the total
   * unchanged rather than zero, which would read as "no footprint".
   */
  public static getEmissionsPerPerson(totalEmissions: number, residents: number): number {
    if (!residents || residents < 1) {
      return round(totalEmissions);
    }
    return round(totalEmissions / residents);
  }

  /** Categories ordered by contribution, each with its share of the total. */
  public static getBreakdown(values: Record<string, number>): IEmissionBreakdownItem[] {
    const total = CarbonFootprintService.getTotalEmissions(values);

    return Object.keys(values)
      .map((category) => {
        const exactShare = total > 0 ? (values[category] / total) * 100 : 0;
        return {
          category,
          value: round(values[category]),
          share: round(exactShare),
          isTrace: exactShare > 0 && exactShare < 0.1
        };
      })
      .sort((a, b) => b.value - a.value);
  }

  /** The category contributing most, or undefined when nothing was entered. */
  public static getLargestContributor(
    values: Record<string, number>
  ): IEmissionBreakdownItem | undefined {
    const breakdown = CarbonFootprintService.getBreakdown(values);
    return breakdown.length > 0 && breakdown[0].value > 0 ? breakdown[0] : undefined;
  }
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
