import { makeStyles, tokens } from '@fluentui/react-components';

export const useListViewToolbarStyles = makeStyles({
  container: {
    paddingBottom: tokens.spacingVerticalS
  },
  topBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS
  },
  searchBox: {
    minWidth: '240px',
    flexGrow: 1,
    maxWidth: '420px'
  },
  spacer: {
    flexGrow: 1
  }
});
