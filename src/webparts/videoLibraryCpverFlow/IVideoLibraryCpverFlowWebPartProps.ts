import { Video, O365Video } from "../O365VUtilities";
export interface IVideoLibraryCpverFlowWebPartProps {
  description: string;
  videoChannel: string;
  o365Video: O365Video;
  coverflowStartPosition: number;
  coverflowMargin: number;
  coverflowWidth: number;
  coverflowEnableScroll: boolean;
  iframeHeight: number;
  iframeWidth: number;
  coverflowHeight: number;
  coverflowAnimationSpeed: number;
  imgHeight: number;
  imgWidth: number;
}
