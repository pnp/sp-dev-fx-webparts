import { IGraphService } from "../../../service/GraphService";

export interface IAllConversationsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  graphService : IGraphService;
}
