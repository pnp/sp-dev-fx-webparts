import { Video, O365Video } from "../O365VUtilities";
export interface IVideoLibraryCpverFlowWebPartProps {
  description: string;
  videoChannel: string;
  o365Video: O365Video;
  layout: string;
  duration: number;
  panels: number;
}
