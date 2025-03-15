import {
  getTheme,
  mergeStyles,
} from "@fluentui/react";


export class SharedStyles {
  public static palette = getTheme().palette;

  public static  tabStyle = mergeStyles({
    WebkitBoxAlign: "center",
    msFlexAlign: "center",
    alignItems: "center",        
    borderRadius: "3px",
    display: "inline-flex",
    height: "2em",
    WebkitBoxPack: "center",
    msFlexPack: "center",
    justifyContent: "center",
    lineHeight: 1.5,
    paddingLeft: ".75em",
    paddingRight: ".75em",
    whiteSpace: "nowrap",
  });

  public static  isMediumStyle = mergeStyles({
    fontSize: "1rem"
  });

  public static  yearMonthStyle = mergeStyles({
    backgroundColor: this.palette.themePrimary,
    border: `1px solid ${this.palette.themePrimary}`,
    color: this.palette.white,
  });
}
