import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Every measurement here is a Fluent token.
 *
 * No pixel values, no colours, no second visual system running alongside the
 * one the host already provides. Anything that cannot be expressed in tokens is
 * a sign the composition is wrong rather than the styling.
 */
export const useHubStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    containerType: 'inline-size'
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  },

  searchBox: {
    width: '100%',
    maxWidth: '480px'
  },

  /** The count answers "did that work"; the toolbar answers "now narrow it". */
  resultsBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS
  },

  status: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  },

  results: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    transitionProperty: 'opacity',
    transitionDuration: tokens.durationFaster
  },

  result: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
    /* Long file names wrap instead of widening the web part. */
    overflowWrap: 'anywhere'
  },

  /** Title and, when it distinguishes anything, the kind. */
  resultHeading: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    columnGap: tokens.spacingHorizontalS
  },

  /** Avatar and the quiet line of context, on one baseline. */
  resultContext: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalXS
  },

  /** Separates one result from the next, in place of a card outline. */
  resultDivider: {
    paddingTop: tokens.spacingVerticalM
  },

  /* Three lines is enough to judge relevance; more pushes the next result off
     the screen. */
  summary: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflowY: 'hidden',
    color: tokens.colorNeutralForeground2
  },

  meta: {
    color: tokens.colorNeutralForeground3
  },

  loadMore: {
    alignSelf: 'flex-start'
  },

  performance: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  },

  performanceList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
    marginTop: 0,
    marginBottom: 0
  },

  performanceRow: {
    display: 'flex',
    flexDirection: 'column'
  },

  /** Announced, never shown: the count is already on screen in the toolbar row. */
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap'
  }
});
