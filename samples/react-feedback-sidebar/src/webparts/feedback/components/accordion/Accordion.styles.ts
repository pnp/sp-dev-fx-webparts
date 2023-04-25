import { createUseStyles } from "react-tss/lib";
import { style } from "typestyle";

export enum EAccordionStyle {
  primary = "primary",
  secondary = "secondary",
  default = "default",
}

export const AccordionContainer = style({
  flexDirection: "column",
  display: "flex",
  margin: " 1px 56px",
  width: "100%",
});

export const ToggleButton = style({
  backgroundColor: "#EDF4F7",
  color: "#005980",
  flexDirection: "row",
  alignItems: "center",
  padding: "18px 16px",
  display: "flex",
  cursor: "pointer",
  border: "none",
  width: "100%",
});

export const ToggleTitle = style({
  fontWeight: "bold",
  margin: "-2px 12px 0",
  flexGrow: 1,
  textAlign: "left",
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const ToggleIcon = style({
  transition: "transform 333ms",
  $nest: {
    "&.expanded": {
      transform: "rotate(90deg) scaleX(-1)",
    },
    "&.collapsed": {
      transform: "rotate(90deg) scaleX(1)",
    },
  },
});

export const SectionTitle = style({
  color: "#454D56",
  lineHeight: "36px",
  margin: "56px 0 24px 56px",
});

export const ContentSection = style({
  $nest: {
    "& >*": {
      margin: "8px 0",
    },
    "&.expanded": {
      opacity: 1,
    },
    "&.collapsed": {
      paddingBottom: 0,
      paddingTop: 0,
      opacity: 0,
      height: 0,
    },
  },
  backgroundColor: "white",
  flexDirection: "column",
  transition: "all 333ms",
  //padding: "32px 64px",
  display: "flex",
  border: `1px solid #EDF4F7`,
});

export const AccordionTitle = style({
  color: "black",
  lineHeight: "27px",
});

export const Subtitle = style({
  color: "black",
  lineHeight: "21px",
  $nest: {
    "&.simpleClass": {
      paddingLeft: "56px",
    },
  },
});

export const Abstract = style({
  color: "#454D56",
  lineHeight: "24px",
});

export const AccordionStyles = createUseStyles({
  classes: {
    Accordion: {
      flexDirection: "column",
      display: "flex",
      //margin: " 1px 56px",
    },
    ToggleButton: {
      alignItems: "center",
      padding: "18px 16px",
      display: "flex",
      cursor: "pointer",
      border: "none",
      boxSizing: "border-box",
      flex: "1",

      [`.${EAccordionStyle.default} &`]: {
        backgroundColor: "#EDF4F7",
        color: "#005980",
      },

      [`.${EAccordionStyle.primary} > &`]: {
        backgroundColor: "#007DB3",
        color: "white",

        borderBottom: `1px solid white`,
        borderTop: `1px solid white`,
      },

      [`.${EAccordionStyle.primary}.open > &`]: {
        backgroundColor: "#00354C",
        color: "white",

        borderBottom: `1px solid white`,
        borderTop: `1px solid white`,
      },

      [`.${EAccordionStyle.secondary} > &`]: {
        backgroundColor: "white",
        color: "#005980",

        borderBottom: `1px solid #EDF4F7`,
        borderTop: `1px solid #EDF4F7`,
      },

      [`.${EAccordionStyle.secondary}.open > &`]: {
        backgroundColor: "#EDF4F7",
        color: "#005980",

        borderBottom: `1px solid #EDF4F7`,
        borderTop: `1px solid #EDF4F7`,
      },
    },
    ToggleTitle: {
      boxSizing: "border-box",
      textAlign: "left",
      width: "100%",
      "text-overflow": "ellipsis",
      overflow: "hidden",
      "white-space": "nowrap",
      lineHeight: "24px",
    },
    AccordionIcon: {
      height: "24px",
      width: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ToggleIcon: {
      height: "24px",
      width: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",

      "&.expanded": {
        transform: "rotate(90deg) scaleX(-1)",
      },
      "&.collapsed": {
        transform: "rotate(90deg) scaleX(1)",
      },
      transition: "transform 333ms",
    },
    SectionTitle: {
      color: "#454D56",
      lineHeight: "36px",
      margin: "56px 0 24px 56px",
    },
    Tooltip: {
      flex: "1",
      padding: "0 12px",
      boxSizing: "border-box",
      maxWidth: "calc(100% - 24px - 9px)",
    },
  },
});

export const AccordionContentStyles = createUseStyles({
  classes: {
    ContentSection: {
      "& >*": {
        margin: "0px 0",
      },
      "&.expanded": {
        opacity: 1,
      },
      "&.collapsed": {
        paddingBottom: 0,
        paddingTop: 0,
        opacity: 0,
        height: 0,
      },
      backgroundColor: "white",
      flexDirection: "column",
      transition: "all 333ms",
      //padding: "32px 64px",
      display: "flex",
      border: `1px solid "#EDF4F7"`,
    },
    Title: {
      "&.simpleClass": {
        paddingLeft: "56px",
      },

      color: "black",
      lineHeight: "27px",
    },
    Subtitle: {
      color: "black",
      lineHeight: "21px",
    },
    Abstract: {
      color: "#454D56",
      lineHeight: "24px",
    },
  },
});
