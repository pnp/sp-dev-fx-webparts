import { makeStyles, tokens } from '@fluentui/react-components';

export const useUserCellStyles = makeStyles({
  inlineList: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '6px',
    minWidth: 0
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    padding: '2px 4px',
    borderRadius: tokens.borderRadiusSmall,
    minWidth: 0,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  triggerName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '180px'
  }
});
