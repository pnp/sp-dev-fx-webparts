/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useShowMessageStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...shorthands.padding("10px"),
    ...shorthands.gap("10px"),
    width: '100%',
  } ,
  iconClass: {
    width: "32px",
    height: "32px",
  } as any,
  errorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    ...shorthands.gap("10px"),
    ...shorthands.padding("10px"),
    backgroundColor: tokens.colorStatusDangerBackground1,
  } ,
  errorIcon: {
    width: "32px",
    height: "32px",
  } ,
});
