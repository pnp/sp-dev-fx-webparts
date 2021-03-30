import { ITimelineActivity } from "../../../../models/ITimelineActivity";
import { IPanelModelEnum } from './IPanelModeEnum';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEventProps {
  event: ITimelineActivity;
  panelMode: IPanelModelEnum;
  onDissmissPanel: (refresh: boolean) => void;
  showPanel: boolean;
  context: WebPartContext; 
  listName: string;
}
