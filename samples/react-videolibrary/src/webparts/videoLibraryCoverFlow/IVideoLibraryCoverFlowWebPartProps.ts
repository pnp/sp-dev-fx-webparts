import {  O365Video } from "../O365VUtilities";
export interface IVideoLibraryCoverFlowWebPartProps {
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
  playerHeight: number;
  playerWidth: number;
  
}
