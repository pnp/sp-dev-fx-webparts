import { createUseStyles } from "react-tss/lib";

export const RateStyles = createUseStyles({
  classes: {
    rate: {
      border: "0",
      boxSizing: "border-box",
      margin: "0",
      outline: "none",
      padding: "0",
    },
    rateList: {
      listStyle: "none",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    rateItem: {
      height: "18px",
      width: "9px",

      "&.margin": {
        marginRight: "9px",
      },
    },
    rateInput: {
      display: "none",
    },
    rateLabel: {
      cursor: "pointer",
      height: "100%",
      width: "100%",
    },
    rateIcon: {
      fill: "#EDF4F7",
      //height: '100%',
      //width: '100%',
      "&.checked": {
        fill: "#007DB3",
      },
    },
  },
});
