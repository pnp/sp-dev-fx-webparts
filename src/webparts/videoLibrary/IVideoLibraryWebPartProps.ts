import {  O365Video } from "../O365VUtilities";
export interface IVideoLibraryWebPartProps {
  description: string;
  videoChannel: string;
  o365Video: O365Video;
  layout:string;
  duration:number;
  panels:number;
}