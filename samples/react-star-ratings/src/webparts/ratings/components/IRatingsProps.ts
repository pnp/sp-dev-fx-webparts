import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IRatingsProps {
  context: WebPartContext;
  color: 'brand' | 'marigold' | 'neutral';
  displayMode: DisplayMode;
  size: 'small' | 'medium' | 'large';
  title: string;
  onUpdateTitle: (value: string) => void;
}
