import { CarbonFootprintService, IConsumption } from './CarbonFootprintService';
import {
  EmissionFactors,
  HeatingMultipliers,
  DefaultHeatingMultiplier,
  SolarSelfConsumptionFactor
} from '../models/EmissionFactors';

const empty: IConsumption = {
  electricity: 0,
  carKm: 0,
  shortFlights: 0,
  longFlights: 0,
  gas: 0,
  water: 0,
  hasSolar: false,
  heating: 'electric'
};

const consumption = (overrides: Partial<IConsumption> = {}): IConsumption => ({
  ...empty,
  ...overrides
});

describe('CarbonFootprintService.calculateEmissions', () => {
  it('multiplies each input by its emission factor', () => {
    const result = CarbonFootprintService.calculateEmissions(
      consumption({ electricity: 100, carKm: 500, water: 1000 })
    );

    expect(result.Electricity).toBeCloseTo(100 * EmissionFactors.Electricity);
    expect(result['Car Travel']).toBeCloseTo(500 * EmissionFactors['Car Travel']);
    expect(result.Water).toBeCloseTo(1000 * EmissionFactors.Water);
  });

  it('returns zero for every category when nothing is consumed', () => {
    const result = CarbonFootprintService.calculateEmissions(empty);

    Object.keys(result).forEach((category) => {
      expect(result[category]).toBe(0);
    });
  });

  it('reduces grid electricity when solar panels are installed', () => {
    const withoutSolar = CarbonFootprintService.calculateEmissions(
      consumption({ electricity: 200 })
    );
    const withSolar = CarbonFootprintService.calculateEmissions(
      consumption({ electricity: 200, hasSolar: true })
    );

    expect(withSolar.Electricity).toBeCloseTo(
      withoutSolar.Electricity * SolarSelfConsumptionFactor
    );
    expect(withSolar.Electricity).toBeLessThan(withoutSolar.Electricity);
  });

  it('applies the heating multiplier to natural gas only', () => {
    const base = consumption({ gas: 100, carKm: 100 });
    const gasHeating = CarbonFootprintService.calculateEmissions({ ...base, heating: 'gas' });
    const heatPump = CarbonFootprintService.calculateEmissions({ ...base, heating: 'heatpump' });

    expect(gasHeating['Natural Gas']).toBeCloseTo(
      100 * EmissionFactors['Natural Gas'] * HeatingMultipliers.gas
    );
    expect(heatPump['Natural Gas']).toBeCloseTo(
      100 * EmissionFactors['Natural Gas'] * HeatingMultipliers.heatpump
    );
    // Car travel is untouched by how the home is heated.
    expect(gasHeating['Car Travel']).toBe(heatPump['Car Travel']);
  });

  it('falls back to the neutral multiplier for an unknown heating type', () => {
    const result = CarbonFootprintService.calculateEmissions(
      // Cast: the UI cannot produce this, but stored web part properties can.
      consumption({ gas: 50, heating: 'district-heating' as never })
    );

    expect(result['Natural Gas']).toBeCloseTo(
      50 * EmissionFactors['Natural Gas'] * DefaultHeatingMultiplier
    );
  });
});

describe('CarbonFootprintService.getTotalEmissions', () => {
  it('sums every category', () => {
    const total = CarbonFootprintService.getTotalEmissions({ a: 1.5, b: 2.5, c: 6 });
    expect(total).toBe(10);
  });

  it('is zero for an empty set', () => {
    expect(CarbonFootprintService.getTotalEmissions({})).toBe(0);
  });
});

describe('CarbonFootprintService.getEmissionsPerPerson', () => {
  it('divides the total by the number of residents', () => {
    expect(CarbonFootprintService.getEmissionsPerPerson(100, 4)).toBe(25);
  });

  it('returns the total unchanged for a single resident', () => {
    expect(CarbonFootprintService.getEmissionsPerPerson(100, 1)).toBe(100);
  });

  it('does not report zero when the resident count is invalid', () => {
    // The previous implementation returned 0 here, which reads as "no
    // footprint" rather than "bad input".
    expect(CarbonFootprintService.getEmissionsPerPerson(100, 0)).toBe(100);
    expect(CarbonFootprintService.getEmissionsPerPerson(100, -3)).toBe(100);
  });
});

describe('CarbonFootprintService.getBreakdown', () => {
  it('orders categories by contribution, largest first', () => {
    const breakdown = CarbonFootprintService.getBreakdown({ Small: 10, Large: 60, Middle: 30 });

    expect(breakdown.map((item) => item.category)).toEqual(['Large', 'Middle', 'Small']);
  });

  it('expresses each category as a share of the total', () => {
    const breakdown = CarbonFootprintService.getBreakdown({ Large: 75, Small: 25 });

    expect(breakdown[0].share).toBe(75);
    expect(breakdown[1].share).toBe(25);
  });

  it('flags a contributing category that rounds below 0.1% as a trace', () => {
    // Water against a footprint dominated by flights: real, but tiny.
    const breakdown = CarbonFootprintService.getBreakdown({ Flights: 2000, Water: 1.2 });
    const water = breakdown.filter((i) => i.category === 'Water')[0];

    expect(water.value).toBe(1.2);
    expect(water.isTrace).toBe(true);
  });

  it('does not flag a zero category as a trace', () => {
    const breakdown = CarbonFootprintService.getBreakdown({ Flights: 2000, Water: 0 });
    const water = breakdown.filter((i) => i.category === 'Water')[0];

    expect(water.isTrace).toBe(false);
  });

  it('does not flag a visible share as a trace', () => {
    const breakdown = CarbonFootprintService.getBreakdown({ Flights: 60, Water: 40 });

    breakdown.forEach((item) => expect(item.isTrace).toBe(false));
  });

  it('reports zero shares instead of dividing by zero', () => {
    const breakdown = CarbonFootprintService.getBreakdown({ Electricity: 0, Water: 0 });

    breakdown.forEach((item) => {
      expect(item.share).toBe(0);
      expect(Number.isNaN(item.share)).toBe(false);
    });
  });
});

describe('CarbonFootprintService.getLargestContributor', () => {
  it('identifies the biggest category', () => {
    const largest = CarbonFootprintService.getLargestContributor({ Water: 5, 'Car Travel': 40 });

    expect(largest).toBeDefined();
    expect(largest!.category).toBe('Car Travel');
  });

  it('returns undefined when nothing has been consumed', () => {
    const values = CarbonFootprintService.calculateEmissions(empty);

    expect(CarbonFootprintService.getLargestContributor(values)).toBeUndefined();
  });
});
