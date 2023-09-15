import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useItemStyles = makeStyles({
  listItemContainer: {
    marginLeft: "5px",
    backgroundColor: tokens.colorNeutralStroke3,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    textAlign: "center",
    ...shorthands.gap("10px", "0px"),
   
  },
  centerContainer: {
    paddingBottom: "20px",
    backgroundColor: tokens.colorNeutralStroke3,
    width: "100%",
    overflowY: "auto",
  /*  height: "calc(100vh - 320px)",   */ 
    justifyContent: "center",
    textAlign: "center",
    "::-webkit-scrollbar-thumb": {
      ...shorthands.borderRadius("10px"),
      backgroundColor: tokens.colorNeutralStroke1,
    },
    "::-webkit-scrollbar": {
      height: "10PX",
      width: "7PX",
    },
    "scrollbar-width": "thin",
    "@media only screen and (max-width: 1024px)": {
      height: "600px",
    },
  },
  card: {
    
    paddingBottom: "20px",
    rowGap: "15px",
    height: "fit-content",
    backgroundColor: tokens.colorNeutralBackground1,
    flexWrap: "wrap",
    ...shorthands.overflow("hidden"),
    ...shorthands.padding("20px"),
    ...shorthands.margin("20px"),
    marginTop: "0px",
 
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
  },
  cardTextSubject: {
    width: "100%",
    maxWidth: "100%",
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    paddingBottom: "0px",
    textAlign: "start",
  },
  cardTextDisplay: {
    width: "100%",
    maxWidth: "100%",
    height: "30px",
    paddingBottom: "20px",
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    ...shorthands.overflow("hidden"),
    textAlign: "start",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    ...shorthands.gap("25px"),
  },
  footerIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    ...shorthands.gap("5px"),
  },
  feedTitle: {
    paddingLeft: "10px",
    paddingTop: "25px",
    paddingBottom: "10px",
  },
  personContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    textAlign: "start",
    width: "40px",
    height: "40px",
  },
  menu: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  menuButton: {
    alignSelf: "center",
  },
  spinnerStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.margin("auto"),
    width: "100%",
    ...shorthands.gap("20px", "0px"),
  },
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
