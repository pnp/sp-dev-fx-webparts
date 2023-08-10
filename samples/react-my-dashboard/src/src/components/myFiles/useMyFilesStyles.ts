import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useMyFilesStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    ...shorthands.gap("10px", "0px"),
  },
  filesTitle: {
    paddingLeft: "10px",
    paddingTop: "25px",
    paddingBottom: "10px",
  },

  fileList: {
    "--file-list-box-shadow": "none",
    "--file-list-border": "none",
    "--file-list-background-color": "transparent",
    "--file-background-color-hover": "transparent",
    "--show-more-button-padding": "0px 10px",
    "--show-more-button-background-color": "transparent",
    "--show-more-button-background-color--hover:": "transparent",   
  },

  global: {
    ':global(.show-more)': {
      backgroundColor: "transparent",
    },
    ':global(.show-more:hover)': {
      backgroundColor: "transparent",
    }
  },
  
  card: {
    maxWidth: "100%",
    rowGap: "10px",
    paddingBottom: "20px",
    height: "fit-content",
    backgroundColor: tokens.colorNeutralBackground5Pressed,
    flexWrap: "wrap",
    ...shorthands.overflow("hidden"),
    ...shorthands.padding("15px"),
    ...shorthands.margin("10px"),
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
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    paddingBottom: "0px",
    textAlign: "start",
    wordBreak: "break-word",
    textOverflow: "ellipsis",
    color: tokens.colorBrandForeground1,
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
    textOverflow: "ellipsis",
  },
  personLine1Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    ...shorthands.overflow("hidden"),
    paddingBottom: "0px",
  },
  personLine1: {
    width: "100%",
    maxWidth: "100%",
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    paddingBottom: "0px",
    textAlign: "start",
  },
  centerContainer: {
    paddingBottom: "20px",
    width: "100%",
    overflowY: "auto",
 /*    height: "calc(100vh - 320px)", */
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
      height: "600px",
    },
  },
  fileIcon: {
    width: "30px",
    height: "30px",
  },
  spinnerStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.margin("auto"),
    width: "100%",
    ...shorthands.gap("20px", "0px"),
  },
  personline1Styles: {
     paddingRight: "5px",
     color: tokens.colorNeutralForeground2  
  },
  personline2Styles: {
    fontSize: "12px",
  },
  trendingCard: {
    maxWidth: "100%",
    width: "100%",
    height: "fit-content",
  },
  personContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    textAlign: "start",
    width: "40px",
    height: "40px",
  },
});
