import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useMenuStyles = makeStyles({
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      rowGap: "30px",
      width: "100%",
      backgroundColor: "transparent",
      overflowY: "auto",
      overflowX: "hidden",
      "scrollbar-color":  tokens.colorNeutralBackground1,
      "scrollbar-width": "thin",
      "::-webkit-scrollbar-thumb": {
        backgroundColor: tokens?.colorBrandStroke2,
        ...shorthands.borderRadius("10px"),
        ...shorthands.borderWidth("1px"),
      },
      "::-webkit-scrollbar": {
        height: "10px",
        width: "7px",
      },
    },
  
    gradientOverlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      ...shorthands.borderRadius("8px"),
    },
  
    headerContainer:{
     marginLeft: "auto",
     marginRight: "auto",
     maxWidth: "1106px",
     width: '100%',
    },
   menuItem:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
  
   },
 
   headerTitle: {
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    ...shorthands.overflow("hidden"),
    textAlign: "start",
    textOverflow: "ellipsis",
  },
  headerDescription: {
    ...shorthands.overflow("hidden"),
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    textAlign: "start",
    textOverflow: "ellipsis",
  
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    cursor: "pointer",
    
  },
  itemTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "start",
    columnGap: "20px",
    rowGap: "5px",
  
  
  },
  itemDescription: {
    paddingLeft: "45px",
  },
  });