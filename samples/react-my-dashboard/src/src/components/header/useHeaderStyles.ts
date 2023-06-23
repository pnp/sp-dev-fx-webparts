import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

export const useHeaderStyles = makeStyles({
    root: {             
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'end',
        flexDirection: 'row',
        ...shorthands.gridArea('header'),
        paddingBottom: "10px",
        maxHeight: "60px",
        height: "fit-content",
      }  ,
});