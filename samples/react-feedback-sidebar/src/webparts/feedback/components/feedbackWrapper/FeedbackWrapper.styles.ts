import { createUseStyles } from "react-tss/lib";

export const FeedbackWrapperStyles = createUseStyles({
  classes: {
    FeedbackSection: {
      background: "rgba(0, 0, 0, 0)",
      animation: `$fadeIn 0.8s ease 0s 1 forwards`,
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      zIndex: 9,
    },
    FeedbackWrapper: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "fixed",
      top: 0,
      right: 0,
      height: "100vh",
      zIndex: 9,
      animation: `$scrollIn 0.8s ease 0s 1 forwards`,
      maxWidth: "340px",
      overflowY: "auto",
    },
    FeedbackWrapperRow: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      //margin: "0 32px",
      width: "calc(100% - 32px * 2)",
      "&.to-end": {
        justifyContent: "flex-end",
        paddingRight: "20px",
        paddingBottom: "25px",
        paddingTop: "100px",
        marginLeft: "auto",
        width: "initial",
      },
      "&.no-margin": {
        margin: 0,
        width: "100%",
      },
      "&.accordion-row": {
        //backgroundColor: "#007DB3",
        backgroundColor: "white",
        flex: 1,
        marginTop: "72px",
      },
      "&.loader-row": {
        flex: 1,
        position: "relative",
      },
    },
    FeedbackWrapperClose: {
      background: "transparent",
      cursor: "pointer",
      border: "none",
      "& svg": {
        width: "100%",
        height: "100%",
        fill: "#007DB3",
      },
    },
    FeedbackWrapperTitle: {
      fontWeight: "bold",
      color: "black",
      lineHeight: "36px",
      marginBottom: "8px",
      width: "100%",
    },
    FeedbackWrapperDescription: {
      color: "#454D56",
      lineHeight: "24px",
      marginBottom: "32px",
      width: "100%",
    },
    FeedbackWrapperList: {
      listStyle: "none",
      width: "100%",
      paddingLeft: "0px",
      margin: "0px",
    },
    FeedbackWrapperItem: {
      width: "100%",
    },
    FeedbackSectionAccordion: {
      padding: "0",
      "& > button": {
        borderTop: "none !important",
      },
      "& button > div": {
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      "& button > svg": {
        marginRight: "10px",
        height: "20px",
        width: "20px",
      },
    },
  },
  keyframes: {
    fadeIn: {
      from: { background: "rgba(0, 0, 0, 0)" },
      to: { background: "rgba(0, 0, 0, 0.5)" },
    },
    scrollIn: {
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0%)" },
    },
  },
});
