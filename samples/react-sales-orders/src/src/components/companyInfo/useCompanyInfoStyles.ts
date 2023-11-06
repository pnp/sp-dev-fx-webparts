import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useCompanyInfoStyles = makeStyles({
  
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    columnGap: "20px",
    paddingTop: "20px",
    paddingBottom: "80px",
   
  },
  headerTitle: {
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    ...shorthands.overflow("hidden"),
    textAlign: "start",
    textOverflow: "ellipsis",
  },
  itemDescription: {
    paddingLeft: "45px",
  },
  });