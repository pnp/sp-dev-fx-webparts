import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useNoDataStyles = makeStyles({
    noData: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...shorthands.margin("auto"),
        width: "100%",
        ...shorthands.gap("20px", "0px"),
      },
});