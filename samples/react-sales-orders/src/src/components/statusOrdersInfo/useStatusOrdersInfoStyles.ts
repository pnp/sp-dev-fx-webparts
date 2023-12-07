import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useStatusOrdersInfoStyles = makeStyles({
  statusContainer: {
    position: "relative",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr)",
    gridColumnGap: "10px",
    gridRowGap: "10px",
    justifyContent: "center",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  card: {
    /*  backgroundColor: tokens.colorNeutralBackground2, */
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingTop: "20px",
    paddingBottom: "20px",
    fontFamily: `${tokens.fontFamilyBase}`,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(min(100% ,200px),1fr))",
    gridColumnGap: "10px",
    gridRowGap: "10px",
    ...shorthands.gap("20px"),
  },

  gradientOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",

    ...shorthands.borderRadius("8px"),
  },
  titleStyles: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  cardBody: {
   
    width: "100%",
    height: "fit-content",
    ...shorthands.borderRadius("16px"),
  },
});
