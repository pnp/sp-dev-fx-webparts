import { createUseStyles } from "react-tss/lib";

export const FeedbackButtonStyles = createUseStyles({
  classes: {
    feedbackButton: {
      borderRadius: "4px 0 0 4px",
      borderRight: 0,
      paddingRight: "21px",
      position: "fixed",
      right: "-4px",
      top: "calc(100% - 130px)",
      transform: "translateY(-50%)",
      zIndex: 9,
      "& path": {
        fill: "#007DB3",
      },
      "& svg": {
        marginLeft: "16px",
        marginRight: "0px",
      },
    },
  },
});
