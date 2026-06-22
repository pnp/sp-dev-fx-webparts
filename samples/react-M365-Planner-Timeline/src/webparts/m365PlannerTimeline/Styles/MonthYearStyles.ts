import { mergeStyles } from "@fluentui/react";

import { SharedStyles } from ".";
  
export class MonthYearStyles {
  public static timelineStyle = mergeStyles({
    display: "flex",
    WebkitBoxOrient: "vertical",
    WebkitBoxDirection: "normal",
    msFlexDirection: "column",
    flexDirection: "column"
  });
  
  public static timelineHeaderStyle = mergeStyles({
    width: "4em",
    minWidth: "4em",
    maxWidth: "8em",
    wordWrap: "normal",
    textAlign: "center",
    display: "flex",
    WebkitBoxPack: "center",
    justifyContent: "center",  
  });
    
  public static timelineYearStyle = mergeStyles(
    SharedStyles.tabStyle, 
    SharedStyles.isMediumStyle, 
    SharedStyles.yearMonthStyle
  );
  
  public static timelineMonthStyle = mergeStyles(
    SharedStyles.tabStyle, 
    SharedStyles.yearMonthStyle
  );
}

