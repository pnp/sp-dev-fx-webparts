import {
  HeroLayout,
  HeroMosaicOverflowMode,
  IHeroItem,
} from "@spteck/react-controls-v2";

export interface IHeroWebPartProps {
  layout: HeroLayout;
  height: number;
  borderRadius: string;
  mosaicOverflowMode: HeroMosaicOverflowMode;
  rotationEnabled: boolean;
  rotationMode: "interval" | "refresh";
  rotationIntervalMs: number;
  items: IHeroItem[];
}
