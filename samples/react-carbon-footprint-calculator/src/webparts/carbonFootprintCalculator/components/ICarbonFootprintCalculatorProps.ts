import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ICarbonFootprintCalculatorProps {
  description: string;
  /** Household size the calculator starts with. Falls back to 2. */
  defaultResidents?: number;
  /** Theme of the section hosting the web part, when the section sets one. */
  themeVariant: IReadonlyTheme | undefined;
}
