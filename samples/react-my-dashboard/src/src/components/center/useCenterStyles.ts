import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useCenterStyles = makeStyles({
  root: {
    display: "grid",
    minWidth: "60%",
    gridTemplateColumns: "50% 50%",
    columnGap: "0px",
    height: "100%",
    ...shorthands.gridArea("center"),
    alignItems: "start",
    justifyContent: "start",
    paddingRight: "5px",
    "@media only screen and (max-width: 1200px)": {
      gridTemplateColumns: "100%",
    },
    
  },
});
