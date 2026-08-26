import { IHeroItem } from "@spteck/react-controls-v2";

export interface IHeroItemRowProps {
  item: IHeroItem;
  index: number;
  total: number;
  defaultOpen?: boolean;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDetailChange: (updated: IHeroItem) => void;
  resolveUrl?: (url: string) => Promise<string>;
}
