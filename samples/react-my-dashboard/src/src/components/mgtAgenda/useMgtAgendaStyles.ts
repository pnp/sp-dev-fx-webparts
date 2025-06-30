import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useMgtAgendaStyles = makeStyles({
  root: {
    paddingBottom: "20px",
    paddingRight: "10px",
    width: "100%",
    maxWidth: "100%",
    overflowY: "auto",
    overflowX: "hidden",
 /*   height: "calc(100vh - 320px)",    */
    justifyContent: "start",


    "::-webkit-scrollbar-thumb": {
      ...shorthands.borderRadius("10px"),
      backgroundColor:  tokens.colorNeutralStroke1,
      paddingRight: "5px",
    },
    "::-webkit-scrollbar": {
      height: "10PX",
      width: "7PX",
    },
    "scrollbar-width": "thin",
    "@media only screen and (max-width: 1024px)": {
      width: "100%",
      maxHeight: "600px !important",
      height: "fit-content !important",
    },

  },
  spinnerStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  agenda:{
    "--agenda-background-color": "transparent"
  }
});
