export interface EmissionInputs {
    electricity: number;
    carKm: number;
    shortFlights: number;
    longFlights: number;
    gas: number;
    water: number;
    hasSolar: boolean;
    heatingType: 'electric' | 'gas' | 'heatpump' | 'wood';
  }
  
  export function calculateEmissions(inputs: EmissionInputs): Record<string, number> {
    const factors = {
      electricity: 0.233,
      car: 0.12,
      shortFlight: 250,
      longFlight: 1000,
      gas: 2.0,
      water: 0.0003,
    };
  
    const heatMultiplier =
      inputs.heatingType === 'gas' ? 1.2 :
      inputs.heatingType === 'heatpump' ? 0.6 : 1;
  
    const adjustedElectricity = inputs.hasSolar ? inputs.electricity * 0.7 : inputs.electricity;
  
    return {
      Electricity: adjustedElectricity * factors.electricity,
      'Car Travel': inputs.carKm * factors.car,
      'Short Flights': inputs.shortFlights * factors.shortFlight,
      'Long Flights': inputs.longFlights * factors.longFlight,
      'Natural Gas': inputs.gas * factors.gas * heatMultiplier,
      Water: inputs.water * factors.water
    };
  }
  
  export function calculateTotalEmissions(values: Record<string, number>): number {
    return Object.keys(values).reduce((sum, key) => sum + values[key], 0);

  }
  