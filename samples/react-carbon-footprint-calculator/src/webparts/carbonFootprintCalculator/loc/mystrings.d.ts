declare interface ICarbonFootprintCalculatorWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  TitleLabel: string;
  CalculatedOnLabel: string;
  InputsHeading: string;
  BreakdownHeading: string;
  TipsHeading: string;
  ElectricityLabel: string;
  CarTravelLabel: string;
  ShortFlightsLabel: string;
  LongFlightsLabel: string;
  NaturalGasLabel: string;
  WaterLabel: string;
  ResidentsLabel: string;
  HeatingLabel: string;
  HeatingElectric: string;
  HeatingGas: string;
  HeatingHeatPump: string;
  HeatingWood: string;
  SolarLabel: string;
  ToggleOn: string;
  ToggleOff: string;
  ShowTipsLabel: string;
  TotalEmissionsLabel: string;
  PerPersonLabel: string;
  LargestContributorLabel: string;
  KilogramsPerMonth: string;
  BreakdownValueLabel: string;
  BreakdownTraceValueLabel: string;
  NoDataYet: string;
  PrintButtonLabel: string;
  IllustrativeNotice: string;
  TipLighting: string;
  TipTransport: string;
  TipFlights: string;
  TipInsulation: string;
  TipRenewable: string;

  CategoryElectricity: string;
  CategoryCarTravel: string;
  CategoryShortFlights: string;
  CategoryLongFlights: string;
  CategoryNaturalGas: string;
  CategoryWater: string;
}

declare module 'CarbonFootprintCalculatorWebPartStrings' {
  const strings: ICarbonFootprintCalculatorWebPartStrings;
  export = strings;
}
