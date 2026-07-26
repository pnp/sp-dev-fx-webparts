import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useAppStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase
  },

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalM,
    flexWrap: 'wrap'
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
    minWidth: '240px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '68ch'
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },

  summaryBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    flexWrap: 'wrap',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2
  },
  summaryRoute: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    minWidth: 0,
    flexShrink: 1
  },
  summaryArrow: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0
  },
  summaryMeta: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    flexShrink: 0
  },

  selectionStrip: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2Selected
  },
  sectionHeading: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS
  },

  siteGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalL,
    alignItems: 'start'
  },
  sitePicker: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS,
    minWidth: 0
  },
  siteSummary: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2
  },
  siteSummaryText: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flexGrow: 1
  },
  truncate: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorNeutralForeground2
  },
  mutedText: {
    color: tokens.colorNeutralForeground3
  },
  fieldLabel: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXS,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold
  },
  optionText: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },

  toolbarRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    flexWrap: 'wrap'
  },
  toolbarMeta: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground2
  },
  filterRow: {
    display: 'flex',
    alignItems: 'flex-end',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    flexWrap: 'wrap'
  },
  searchField: {
    minWidth: '240px',
    flexGrow: 1,
    maxWidth: '420px'
  },

  gridWrapper: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2)
  },
  groupHeader: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground2
  },
  primaryCell: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },
  rowActions: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalXXS,
    justifyContent: 'flex-end'
  },

  statusStack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  },
  progressBlock: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2
  },
  progressHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    flexWrap: 'wrap'
  },

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: tokens.spacingVerticalS,
    textAlign: 'center',
    ...shorthands.padding(tokens.spacingVerticalXXXL, tokens.spacingHorizontalL)
  },
  emptyStateIcon: {
    fontSize: '32px',
    lineHeight: '32px',
    color: tokens.colorNeutralForeground3
  },
  emptyStateText: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '52ch'
  },

  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS
  },
  statTile: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2
  },
  definitionList: {
    display: 'grid',
    gridTemplateColumns: 'minmax(96px, auto) 1fr',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    ...shorthands.margin(0)
  },
  definitionValue: {
    ...shorthands.margin(0),
    minWidth: 0,
    overflowWrap: 'anywhere'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS,
    listStyleType: 'none',
    ...shorthands.margin(0),
    ...shorthands.padding(0)
  },
  listRow: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    minWidth: 0
  },
  monospace: {
    fontFamily: tokens.fontFamilyMonospace,
    overflowWrap: 'anywhere',
    color: tokens.colorNeutralForeground2
  },

  dialogList: {
    ...shorthands.margin(tokens.spacingVerticalXS, 0, 0, 0),
    paddingLeft: tokens.spacingHorizontalXXL
  },
  dialogSummary: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    ...shorthands.margin(0)
  },

  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    ...shorthands.padding(0),
    ...shorthands.margin('-1px'),
    ...shorthands.overflow('hidden'),
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    ...shorthands.borderWidth(0)
  },
  spinnerRow: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalXL, 0)
  }
});
