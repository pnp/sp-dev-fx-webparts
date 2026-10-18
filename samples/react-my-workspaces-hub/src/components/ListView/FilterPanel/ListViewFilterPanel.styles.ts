import { makeStyles, tokens } from '@fluentui/react-components';

export const useListViewFilterPanelStyles = makeStyles({
  drawerBody: { paddingLeft: 0, paddingRight: 0, paddingTop: '8px', paddingBottom: 0 },
  body: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 },
  searchContainer: { paddingLeft: '16px', paddingRight: '16px', marginBottom: '6px' },
  searchBox: { width: '100%' },
  bulkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '6px'
  },
  bulkSpacer: { flex: 1 },
  valuesContainer: { flex: 1, minHeight: 0, marginTop: '2px', paddingLeft: '16px', paddingRight: '16px' },
  list: { overflowX: 'hidden' },
  valueRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingRight: '4px',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  valueCheckbox: { width: '100%', maxWidth: '100%', overflow: 'hidden' },
  valueLabel: {
    display: 'block',
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    lineHeight: '20px',
    maxHeight: '56px',
    overflow: 'hidden'
  },
  statusRow: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '6px',
    paddingBottom: '6px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`
  },
  filterCount: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200
  },
  footer: {
    justifyContent: 'flex-end',
    columnGap: '8px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  emptyState: {
    padding: '16px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground3
  }
});
