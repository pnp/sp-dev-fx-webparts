import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IM365PlannerTimelineProps {
  context: WebPartContext;
  cacheId: string;
  groupId: string;
  noM365Group: boolean;
  timeLinePlan: { planId: string, bucketId: string };
  showActiveTasks: boolean;
  showTitle:boolean;
  webPartTitle: string;
  updateTitle: (value: string) => void;
  displayMode: DisplayMode;
  isDarkTheme: boolean;
  onConfigure: () => void;
}

        