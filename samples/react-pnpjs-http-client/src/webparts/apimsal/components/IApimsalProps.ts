import { IUserService } from "../Services/IUserService";

export interface IApimsalProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userService:IUserService;
}
