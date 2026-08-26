import {
  IApplicationContext,
  HeroLayout,
  HeroMosaicOverflowMode,
  IHeroItem,
} from "@spteck/react-controls-v2";
import { Theme } from "@fluentui/react-components";

export interface IHeroWebPartRootProps {
  context: IApplicationContext;
  theme: Theme;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  layout: HeroLayout;
  height: number;
  borderRadius: string;
  mosaicOverflowMode: HeroMosaicOverflowMode;
  rotationEnabled: boolean;
  rotationMode: "interval" | "refresh";
  rotationIntervalMs: number;
  items: IHeroItem[];
  onConfigure: () => void;
}
