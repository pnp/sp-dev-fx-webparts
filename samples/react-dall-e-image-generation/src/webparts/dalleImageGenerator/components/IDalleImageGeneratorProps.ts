import { IDalleImageGeneratorService } from "../services/DalleImageGeneratorService";

export interface IDalleImageGeneratorProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  siteAbsoluteUrl: string;
  dalleImageGeneratorService: IDalleImageGeneratorService;
}
