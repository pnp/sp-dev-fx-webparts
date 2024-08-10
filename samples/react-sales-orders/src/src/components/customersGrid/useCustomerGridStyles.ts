import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useCustomerGridStyles = makeStyles({
  
  gridContainer: {
    paddingTop: "30px",
    width: "100%",
    height:  'calc(100vh - 240px)',
    backgroundColor: tokens.colorNeutralBackground2,
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

 
    titleStyles: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  

    emailColumnStyles: {
      display: "-webkit-box",
      "-webkit-line-clamp": "1",
      "-webkit-box-orient": "vertical",
      ...shorthands.overflow("hidden"),
      textAlign: "start",
      textOverflow: "ellipsis",
    },
  
    divider: {
      width: "100%",
      height: "1px",
      backgroundColor: tokens.colorNeutralStroke1,
      ...shorthands.margin("20px 0px"),
    },
 
  });