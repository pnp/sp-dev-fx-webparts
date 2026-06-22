import { IHeroItem } from "@spteck/react-controls-v2";

export interface IHeroItemDetailProps {
  item: IHeroItem;
  onChange: (updated: IHeroItem) => void;
  resolveUrl?: (url: string) => Promise<string>;
}
