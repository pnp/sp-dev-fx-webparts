import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useImportanceTagsStyles = makeStyles({
   badges: {     
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        rowGap: "10px",
        columnGap: "10px",
        width: "fit-content",
        height: "fit-content",
        flexWrap: "wrap",
    },
    root: {
        display: "flex",
        flexDirection: "column",
        
        rowGap: "10px",
        ...shorthands.padding("10px"),
      /*   position: "absolute",
        bottom: "20px", */
    }
});