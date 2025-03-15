import {
  getTheme,
  DefaultPalette,
  mergeStyles,
} from "@fluentui/react";

export class TimelineTabStyles {
  public static palette = getTheme().palette;

  public static pagePaddingStyle = mergeStyles({
    paddingTop: "0.5rem",
    paddingBottom: "2rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    // marginTop: "40px",
    top: '40px', 
    position: 'sticky', 
    zIndex: 100
  });

  public static listedTaskStyle = mergeStyles({
    paddingBottom: '10px', 
    marginLeft: "-0.5rem",
    fontSize: '20px' 
  });

  public static BucketNameStyle = mergeStyles({
    fontSize: "1.5rem",
    fontWeight: 600,  
    marginLeft: "-1rem",
    paddingBottom: "1rem",
  });

  public static errorStyle = mergeStyles({
    color: DefaultPalette.redDark,
    fontWeight: "bold"
  });

  public static spinnerDiv = mergeStyles({
    maxWidth: "500px",  
  });

  public static spinnerStyle = mergeStyles({
    paddingLeft: "10rem",
    paddingTop: "2rem",
    color: "#5b5fc7",  
    Label: { 
      color: "#5b5fc7"
    }  
  });

  public static CommandBarBlockStyle(themeString: string): string {
    const className = mergeStyles({
      // position: "fixed", 
      top: 0, 
      // width: "100%", 
      height: '45px', 
      background: themeString === "dark" ? this.palette.themeDarker : this.palette.themeLighterAlt, 
      // zIndex: 1000,
    });

    return className;
  }
}