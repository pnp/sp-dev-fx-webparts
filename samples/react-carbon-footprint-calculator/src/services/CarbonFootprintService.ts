import { EmissionFactors } from "../models/EmissionFactors";
import { HeatingType } from "../models/HeatingType";

/**
 * Calculate the carbon footprint based on provided consumption data.
 */
export class CarbonFootprintService {
  
  /**
   * Calculate total emissions based on provided inputs.
   * @param electricity Monthly electricity consumption in kWh.
   * @param carKm Monthly car travel in km.
   * @param shortFlights Number of short flights per month.
   * @param longFlights Number of long flights per month.
   * @param gas Monthly natural gas consumption in m³.
   * @param water Monthly water consumption in liters.
   * @param hasSolar Whether solar panels are installed.
   * @param heating The type of heating used.
   * @returns An object containing the emission values by category.
   */
  public static calculateEmissions(
    electricity: number,
    carKm: number,
    shortFlights: number,
    longFlights: number,
    gas: number,
    water: number,
    hasSolar: boolean,
    heating: HeatingType
  ): Record<string, number> {
    const heatMultiplier = heating === 'gas' ? 1.2 : heating === 'heatpump' ? 0.6 : 1;
    const adjustedElectricity = hasSolar ? electricity * 0.7 : electricity;

    return {
      Electricity: adjustedElectricity * EmissionFactors.Electricity,
      'Car Travel': carKm * EmissionFactors['Car Travel'],
      'Short Flights': shortFlights * EmissionFactors['Short Flights'],
      'Long Flights': longFlights * EmissionFactors['Long Flights'],
      'Natural Gas': gas * EmissionFactors['Natural Gas'] * heatMultiplier,
      Water: water * EmissionFactors.Water
    };
  }

  /**
   * Calculate total emissions from category values.
   * @param values The emissions by category.
   * @returns The total emissions.
   */
  public static getTotalEmissions(values: Record<string, number>): number {
    return Object.keys(values).reduce((sum, key) => sum + values[key], 0);
  }

  /**
   * Calculate emissions per person.
   * @param totalEmissions Total emissions value.
   * @param residents Number of residents.
   * @returns Emissions per person.
   */
  public static getEmissionsPerPerson(totalEmissions: number, residents: number): number {
    if (residents <= 0) return 0;
    return parseFloat((totalEmissions / residents).toFixed(1));
  }
}
