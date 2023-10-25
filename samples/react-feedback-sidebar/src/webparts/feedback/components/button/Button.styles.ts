import { createUseStyles } from "react-tss/lib";
import { EButtonStyle } from "../../utils/Types";

export const ButtonStyles = createUseStyles({
  classes: {
    button: {
      borderRadius: "4px",
      cursor: "pointer",
      maxWidth: "100%",
      padding: "16px 42px",
      letterSpacing: "0",
      lineHeight: "16px",
      textAlign: "center",
      whiteSpace: "normal",
      wordBreak: "break-word",

      [`&.${EButtonStyle.primary}`]: {
        color: "white",
        backgroundColor: "#007DB3",
      },
      [`&.${EButtonStyle.secondary}`]: {
        color: "#007DB3",
        backgroundColor: "white",
        border: `2px solid #007DB3`,
      },
      [`&.${EButtonStyle.tertiary}`]: {
        color: "#007DB3",
        backgroundColor: "white",
        lineHeight: "21px",
        padding: "0",
        textTransform: "capitalize",
      },
      [`&.${EButtonStyle.disabled}`]: {
        color: "white",
        backgroundColor: "#D3D3D3",
        cursor: "not-allowed",
      },
    },
    buttonIcon: {
      marginRight: "16px",
      height: "20px",
      verticalAlign: "middle",
      width: "20px",

      [`.${EButtonStyle.primary} &`]: {
        fill: "white",
      },
      [`.${EButtonStyle.secondary} &`]: {
        fill: "#007DB3",
      },
      [`.${EButtonStyle.tertiary} &`]: {
        fill: "#007DB3",
      },
    },
    buttonContent: {
      verticalAlign: "middle",
    },
  },
});
