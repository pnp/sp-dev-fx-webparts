import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useRightStyles = makeStyles({
  root: {
    minWidth: "220px",
    borderRightColor: tokens.colorNeutralStroke3,

    ...shorthands.gridArea("right"),
  },
 
});
