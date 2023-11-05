import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useCustomerGridStyles = makeStyles({
  
    root: {
      /*  backgroundColor: tokens.colorNeutralBackground2, */
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      fontFamily: `${tokens.fontFamilyBase} !important`,
      ...shorthands.flex("1"),
      ...shorthands.padding("20px"),
      ...shorthands.gap("20px"),
      minWidth: "380px",
    },
  
    wrapper: {
      ...shorthands.padding("10px"),
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