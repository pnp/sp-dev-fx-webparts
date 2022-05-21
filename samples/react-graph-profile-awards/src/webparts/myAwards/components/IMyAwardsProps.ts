import { IAwardsService } from "../../../services/AwardsService";

export interface IMyAwardsProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  awardsService: IAwardsService;
}
