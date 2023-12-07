import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useLeftStyles = makeStyles({
 
  
    leftContainer : {
        ...shorthands.gridArea("left"),
        display: "flex",
        flexDirection: "column",
         rowGap: "20px",
         ...shorthands.padding("20px"),
    },
     
  });