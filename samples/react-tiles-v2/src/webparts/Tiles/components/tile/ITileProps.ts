import { ITileInfo } from '..';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ITileProps {
  item: ITileInfo;
  tileHeight: number;
  tileWidth: number;
  tileColour: string;
  tileFont: string;
  customColour:boolean;
  staticWidth:boolean;
  themeVariant: IReadonlyTheme | undefined;
  ThemeColorsFromWindow: IReadonlyTheme | undefined;
}
