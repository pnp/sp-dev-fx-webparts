import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useSalesordersStyles = makeStyles({
  mainContainer: {
    width: "100%",
    height: "100vh",
 
    backgroundColor: tokens.colorNeutralBackground2,
    overflowY: "auto",
    overflowX: "hidden",
  },

  contentContainer: {
   display: "grid",
    gridTemplateColumns: "min(100%, 300px) 1fr 1fr 1fr",
    gridTemplateRows: "1fr",
    height: "100vh",
  },

  leftContainer : {
      ...shorthands.gridArea("left"),
      display: "flex",
      flexDirection: "column",
       rowGap: "20px",
       ...shorthands.padding("20px"),
  },
  rightContainer : {
    ...shorthands.gridArea("right"),
    display: "flex",
    flexDirection: "column",
     rowGap: "20px",
     ...shorthands.padding("20px"),
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
  imageTop:{
    width: "100%", height: "300px" ,
   [ `@media (max-width: 768px)`]: {
      height: "400px",
    },
   },
   headerAndSearchContainer:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      rowGap: "20px",
      ...shorthands.padding("20px 0px"),

   } ,
});
