import {
  getTheme,
  mergeStyles,
} from "@fluentui/react";

import { TimelineItemStyles } from '.';

export class DatesAndDetailsStyles {
  public static palette = getTheme().palette;

  public static timelineContentStyle = mergeStyles({
    padding: "1em 0 0 2em"
  });

  public static startDate = mergeStyles({
    paddingRight: "0.5em"
  });

  public static noDueDate = mergeStyles({
    paddingRight: "0.5em",
    fontWeight: 600,
    color: this.palette.red
  });

  public static isCompletedStyle = mergeStyles({
    backgroundColor: this.palette.green,
    color: this.palette.white,
    border: `1px solid ${this.palette.green}`,
  });

  public static darkIsCompletedStyle = mergeStyles({
    backgroundColor: this.palette.greenLight,
    color: this.palette.greenLight,
    border: `1px solid ${this.palette.greenLight}`,
  });

  public static isOverDueStyle = mergeStyles({
    backgroundColor: this.palette.red,
    color: this.palette.red,
    border: `1px solid ${this.palette.red}`,
  });

  public static isPrimaryStyle = mergeStyles({
    backgroundColor: this.palette.blue,
    border: `1px solid ${this.palette.blue}`,
    color: this.palette.blue,
  });

  public static darkIsPrimaryStyle = mergeStyles({
    backgroundColor: this.palette.blueLight,
    border: `1px solid ${this.palette.blueLight}`,
    color: this.palette.blueLight,
  });

  public static isOutlinedStyle = mergeStyles({
    backgroundColor: "#fff !important",
    border: "0.1em solid #b5b5b5"  
  });

  public static completedTaskStyle = mergeStyles({
    color: this.palette.green,
    fontWeight: 400,
  });

  public static darkCompletedTaskStyle = mergeStyles({
    color: this.palette.greenLight,
    fontWeight: 400,
  });

  public static overDueTaskStyle = mergeStyles({
    color: this.palette.red,
    fontWeight: 400,
  });

  public static inprogressTaskStyle = mergeStyles({
    color: this.palette.blue,
    fontWeight: 400,
  });

  public static darkInprogressTaskStyle = mergeStyles({
    color: this.palette.blueLight,
    fontWeight: 400,
  });

  public static notStartedTaskStyle = mergeStyles({
    fontWeight: 400,
  });

  public static taskItemTitleStyle = mergeStyles({  
    display: "flex",
    verticalAlign: "top",
    paddingTop: 4,
    height: 30,
    whiteSpace: "pre-wrap",
    wordWrap: 'break-word !important',
  });

  public static infoIconStyle = mergeStyles({
    marginTop: '5px', 
    marginRight: '5px', 
    paddingBottom: '5px', 
    cursor: 'pointer'
  });

  public static timelineTitleBlockStyle = mergeStyles({
    display: "flex",
    marginLeft: "0.5em",
  });

  public static priorityTimelineStatusStyle = mergeStyles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"  
  });

  public static timelineRenderStyles(themeString: string, TaskPercentComplete: number, isOverDue: boolean): [string[], string[]] {
    const timelineMarkerClass = [mergeStyles(TimelineItemStyles.timelineMarkerStyle)];
    const gridClass = ['ms-Grid'];

    if (TaskPercentComplete === 100) {
      if (themeString === "dark") {
        timelineMarkerClass.push(this.darkIsCompletedStyle);
        gridClass.push(this.darkCompletedTaskStyle);
      } else {
        timelineMarkerClass.push(this.isCompletedStyle);
        gridClass.push(this.completedTaskStyle);
      }
    } else if (isOverDue) {
      timelineMarkerClass.push(this.isOverDueStyle);
      gridClass.push(this.overDueTaskStyle);      
    } else if (TaskPercentComplete === 50) {
      if (themeString === "dark") {
        timelineMarkerClass.push(this.darkIsPrimaryStyle);
        gridClass.push(this.darkInprogressTaskStyle);
      } else {
        timelineMarkerClass.push(this.isPrimaryStyle);
        gridClass.push(this.inprogressTaskStyle);
      }
    } else {    
      timelineMarkerClass.push(this.isOutlinedStyle);
      gridClass.push(this.notStartedTaskStyle);
    }

    return [timelineMarkerClass, gridClass];
  }
}