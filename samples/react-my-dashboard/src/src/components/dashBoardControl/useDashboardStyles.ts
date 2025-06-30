import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useDashboardStyles = makeStyles({
  root: {
    marginTop: "0px",
    backgroundColor: tokens.colorNeutralBackground3,
    position: "absolute",

  },
  grid: {
    ...shorthands.padding("0px 10px 10px 0px"),

    backgroundColor: tokens.colorNeutralBackground1,
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    gridTemplateAreas: `"left center right"`,
    gridTemplateRows: "1fr",
    columnGap: "10px",
    ...shorthands.overflow("hidden"),
    overflowY: "auto",
    "@media only screen and (max-width: 1024px)": {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `"left" "center" "right"`,
    },
  },
  wrapper: {
    ...shorthands.padding("10px"),
  },

  tab: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
    rowGap: "20px",
  },

  titleStyles : {
    display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            ...shorthands.padding("15px"),
            backgroundColor: "white",
            marginBottom: "1px",
  },
});
