import { IAILogEntry } from "./IAILogEntry";

export interface IAbTestProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  trackEvent: (eventName: string, properties?: { [key: string]: string }) => void;
  log:(entry: IAILogEntry)=> void;
}
