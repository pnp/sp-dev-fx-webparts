import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IAdaptiveCardHostProps {
  themeVariant: IReadonlyTheme | undefined;
  template: string;
  data: string;
  useTemplating: boolean;
}
