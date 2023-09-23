import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useMyPeopleStyles = makeStyles({
    myPeopleContainer: {
      width: "100%",
      height: "calc(100vh - 250px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignContent: "start",
      ...shorthands.gap("10px", "0px"),
    },
    myPeopleTitle: {
      paddingLeft: "10px",
      paddingTop: "25px",
      paddingBottom: "10px",
    },
  });