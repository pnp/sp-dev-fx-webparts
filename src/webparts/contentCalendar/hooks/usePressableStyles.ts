import { makeStyles, tokens } from "@fluentui/react-components"

// Subtle press feedback shared by every clickable surface (toolbar buttons,
// "+N more", chips, list cards). A quick scale-down on :active reads as a
// tactile press. Motion is disabled under prefers-reduced-motion.
export const usePressableStyles = makeStyles({
  pressable: {
    transitionProperty: "transform",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":active": {
      transform: "scale(0.96)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.001ms",
      ":active": {
        transform: "none",
      },
    },
  },
})
