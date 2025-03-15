import { mergeStyles } from "@fluentui/react";

export class TimelineItemStyles {
  public static timelineItemStyle = mergeStyles({
    display: "flex",
    position: "relative",
    marginLeft: "2em",
    paddingBottom: ".5em",
    selectors: {
      "::before": {
        content: '""',
        backgroundColor: "#b5b5b5",
        display: "block",
        width: ".1em",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0
      }
    }
  });

  public static timelineMarkerStyle = mergeStyles({
    position: "absolute",
    // background: "#b5b5b5",
    // border: "0.1em solid #b5b5b5",
    borderRadius: "100%",
    content: '""',
    display: "block",
    height: "1em",
    left: "-0.5em",
    top: "1.2rem",
    width: "1em",
  });
}
