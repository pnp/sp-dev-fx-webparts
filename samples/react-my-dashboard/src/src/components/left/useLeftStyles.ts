import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useLeftStyles = makeStyles({
  root: {
    minWidth: "300px",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralStroke3,
    height: "100%",
    ...shorthands.gridArea("left"),
    paddingLeft: "15px",
    paddingRight: "30px",
  },
});
