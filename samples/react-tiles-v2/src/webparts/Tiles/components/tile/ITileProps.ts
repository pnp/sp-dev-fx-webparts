import { ITileInfo } from '..';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ITileProps {
  item: ITileInfo;
  tileHeight: number;
  tileColour: string;
  tileFont: string;
  customColour:boolean;
  themeVariant: IReadonlyTheme | undefined;
  ThemeColorsFromWindow: IReadonlyTheme | undefined;
}
