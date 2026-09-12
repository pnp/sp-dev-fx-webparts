import { makeStyles, tokens } from '@fluentui/react-components';

export const useCommonFilterPanelStyles = makeStyles({
  drawer: {
    width: 'clamp(320px, 34vw, 420px)',
    maxWidth: '100%',
    flex: '0 0 clamp(320px, 34vw, 420px)',
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    '@media (max-width: 640px)': {
      width: '100%',
      flexBasis: 'auto',
      maxHeight: 'min(520px, 70vh)',
      borderTop: `1px solid ${tokens.colorNeutralStroke2}`
    }
  },
  body: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: 0,
    paddingRight: 0
  },
  emptyState: {
    padding: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center'
  },
  titleBadge: {
    marginLeft: tokens.spacingHorizontalS
  },
  headerLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    minWidth: 0,
    flex: 1
  },
  headerText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  panel: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  },
  valueList: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '260px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: tokens.spacingHorizontalXS
  },
  /** Fixed-height scrollable surface used to host the virtualized value list. */
  valueListVirtualized: {
    position: 'relative',
    height: '260px',
    maxHeight: 'min(260px, 42vh)',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: tokens.spacingHorizontalXS,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium
  },
  valueRow: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
    boxSizing: 'border-box'
  },
  valueCheckbox: {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    overflow: 'hidden',
    '& label': {
      minWidth: 0
    }
  },
  valueLabel: {
    display: 'block',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: tokens.lineHeightBase300
  },
  emptyValues: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS
  },
  truncationHint: {
    color: tokens.colorNeutralForeground3
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL
  },
  footerSummary: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});
