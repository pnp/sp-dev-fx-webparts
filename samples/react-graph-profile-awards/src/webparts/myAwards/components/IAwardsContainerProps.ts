import { IAwardsService } from "../../../services/AwardsService";

export type LayoutType = "Card" | "List";

export interface IAwardsContainerProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  awardsService: IAwardsService;
  userId: string;
  layoutType: LayoutType;
}
