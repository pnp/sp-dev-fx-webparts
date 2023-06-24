import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useMyDayStyles = makeStyles({
  myDayContainer: {
    width: "100%",
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignContent: "start",
    ...shorthands.gap("10px", "0px"),
  },
  myDayTitle: {
    paddingLeft: "10px",
    paddingTop: "25px",
    paddingBottom: "10px",
  },
});
