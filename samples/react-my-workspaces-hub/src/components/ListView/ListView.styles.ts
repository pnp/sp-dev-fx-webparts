import { makeStyles, tokens } from '@fluentui/react-components';

export const useListViewStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    boxSizing: 'border-box'
  },
  /**
   * Horizontal layout band that hosts the scrollable viewport (left, flexes
   * to fill) and the optional in-area common-filter drawer (right).
   */
  viewportRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    minHeight: 0,
    minWidth: 0,
    width: '100%',
    '@media (max-width: 640px)': {
      flexDirection: 'column'
    }
  },
  toolbarContainer: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: tokens.colorNeutralBackground1
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%'
  },
  searchBox: {
    flex: 1,
    minWidth: '200px'
  },
  toolbarSpacer: { flex: 1 },
  viewport: {
    overflow: 'auto',
    flex: '1 1 auto',
    minHeight: 0,
    position: 'relative'
  },
  table: {
    width: '100%',
    minHeight: '400px'
  },
  tableHeader: {
    // NOTE: do NOT make `.tableHeader` `position: sticky` here. Doing so
    // creates a sticky containing block that prevents the inner *header*
    // cells (which use `position: sticky; left: X` for left-frozen columns)
    // from sticking horizontally — they end up scrolling away with the
    // table while the body cells in the same column stay pinned, producing
    // the visible mismatch reported in storybook. Each header cell sets
    // `position: sticky; top: 0` inline, which is enough to pin the header
    // band vertically while leaving frozen columns free to stick on the
    // horizontal axis as well.
    zIndex: 4,
    backgroundColor: tokens.colorNeutralBackground2
  },
  headerRow: {
    // NOTE: do NOT make `.headerRow` sticky here. The parent `.tableHeader`
    // already pins the entire header to the top of the viewport, and nesting
    // a second sticky element breaks horizontal sticky for the individual
    // frozen header cells (the inner cells become sticky relative to the
    // sticky row instead of the scroll viewport, so they slide left on
    // horizontal scroll).
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: `0 1px 0 ${tokens.colorNeutralStroke2}`
  },
  headerCell: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'left'
  },
  headerCellFrozen: {
    position: 'sticky',
    top: 0,
    zIndex: 6,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: `inset -1px 0 0 ${tokens.colorNeutralStroke2}`
  },
  headerButton: {
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '32px',
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: tokens.fontWeightSemibold
  },
  row: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  cellFrozen: {
    position: 'sticky',
    zIndex: 2,
    backgroundColor: 'inherit',
    boxShadow: `inset -1px 0 0 ${tokens.colorNeutralStroke2}`
  },
  emptyState: {
    padding: '20px',
    color: tokens.colorNeutralForeground3,
    textAlign: 'center'
  },
  cellContent: {
    minHeight: '40px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  resizeHandle: {
    marginLeft: 'auto',
    width: '12px',
    cursor: 'col-resize',
    touchAction: 'none'
  }
});
