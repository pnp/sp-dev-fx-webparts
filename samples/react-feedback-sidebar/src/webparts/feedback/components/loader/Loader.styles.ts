import { createUseStyles } from "react-tss/lib";

export const LoaderStyles = createUseStyles({
  keyframes: {
    rotation: {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(359deg)",
      },
    },
  },
  classes: {
    overlay: {
      backgroundcolor: "white",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 8,
      cursor: "default",
      height: "calc(100% + 1px)",
      position: "absolute",
      borderRadius: 16,
    },
    rotate: {
      top: "calc(50% - 40px)",
      left: "calc(50% - 40px)",
      zIndex: 9,
      position: "relative",
      animation: `$rotation 1.2s linear infinite`,
    },
  },
});
