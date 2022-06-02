import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IAdaptiveCardHostDemoProps {
  theme?: IReadonlyTheme;
  sample: string;
  themeName: string;
}