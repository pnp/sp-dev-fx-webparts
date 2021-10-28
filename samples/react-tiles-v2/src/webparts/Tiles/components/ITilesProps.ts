import { ITilesWebPartProps } from './../TilesWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ITilesProps extends ITilesWebPartProps {
  displayMode: DisplayMode;

  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
