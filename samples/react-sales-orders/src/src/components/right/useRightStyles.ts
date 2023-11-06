import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useRightStyles = makeStyles({


    rightContainer : {
        ...shorthands.gridArea("right"),
        display: "flex",
        flexDirection: "column",
        columnGap: "20px",
         rowGap: "20px",
         ...shorthands.padding("20px"),

    },

  });
