import { makeStyles, tokens } from '@fluentui/react-components';

export const useUserHoverContentStyles = makeStyles({
  hoverCard: {
    width: '320px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  hoverHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  hoverNameBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0
  },
  hoverName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  hoverMeta: {
    color: tokens.colorNeutralForeground3
  },
  hoverDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: '12px'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200
  }
});
