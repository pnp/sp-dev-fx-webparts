import * as React from 'react';
import {
  Badge,
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Subtitle2,
  ToolbarButton,
  createTableColumn,
  makeStyles,
  shorthands,
  tokens,
  type TableColumnDefinition
} from '@fluentui/react-components';
import { Add16Regular } from '@fluentui/react-icons';
import * as strings from 'UpcStrings';
import { useAllTemplates } from '../../hooks/useReferenceData';
import type { ITemplateListItem } from '../../models';
import { DataState } from '../Shared/DataState';
import { TemplateEditorDrawer } from './TemplateEditorDrawer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tableWrap: {
    overflowX: 'auto',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium
  },
  row: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  nameButton: {
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: tokens.fontWeightSemibold
  }
});

export const TemplatesList: React.FC = () => {
  const styles = useStyles();
  const templates = useAllTemplates();
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editing, setEditing] = React.useState<ITemplateListItem | null>(null);

  const items: ITemplateListItem[] = templates.data ?? [];

  const openEditor = (item: ITemplateListItem | null): void => {
    setEditing(item);
    setEditorOpen(true);
  };

  const columns: TableColumnDefinition<ITemplateListItem>[] = React.useMemo(
    () => [
      createTableColumn<ITemplateListItem>({
        columnId: 'name',
        compare: (a, b) => a.title.localeCompare(b.title),
        renderHeaderCell: () => strings.TemplateColumnName,
        renderCell: (item) => (
          <Button
            appearance="transparent"
            className={styles.nameButton}
            onClick={() => openEditor(item)}
          >
            {item.title}
          </Button>
        )
      }),
      createTableColumn<ITemplateListItem>({
        columnId: 'department',
        compare: (a, b) => a.template.department.localeCompare(b.template.department),
        renderHeaderCell: () => strings.DepartmentLabel,
        renderCell: (item) => item.template.department
      }),
      createTableColumn<ITemplateListItem>({
        columnId: 'licenses',
        compare: (a, b) => a.template.licenses.length - b.template.licenses.length,
        renderHeaderCell: () => strings.WizardStepLicenses,
        renderCell: (item) => String(item.template.licenses.length)
      }),
      createTableColumn<ITemplateListItem>({
        columnId: 'active',
        compare: (a, b) => Number(a.isActive) - Number(b.isActive),
        renderHeaderCell: () => strings.TemplateColumnActive,
        renderCell: (item) =>
          item.isActive ? (
            <Badge appearance="tint" color="success">
              {strings.TemplateColumnActive}
            </Badge>
          ) : (
            <Badge appearance="tint" color="subtle">
              {strings.TemplateInactiveLabel}
            </Badge>
          )
      }),
      createTableColumn<ITemplateListItem>({
        columnId: 'version',
        compare: (a, b) => a.version - b.version,
        renderHeaderCell: () => strings.TemplateColumnVersion,
        renderCell: (item) => `v${item.version}`
      })
    ],
    [styles.nameButton]
  );

  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <Subtitle2 as="h3" block>
          {strings.TemplatesTitle}
        </Subtitle2>
        <ToolbarButton icon={<Add16Regular />} onClick={() => openEditor(null)}>
          {strings.NewTemplateLabel}
        </ToolbarButton>
      </div>
      <DataState
        isLoading={templates.isLoading}
        error={templates.error}
        isEmpty={!templates.isLoading && items.length === 0}
        emptyTitle={strings.TemplatesEmptyTitle}
        emptyBody={strings.TemplatesEmptyBody}
        emptyAction={
          <Button appearance="secondary" onClick={() => openEditor(null)}>
            {strings.NewTemplateLabel}
          </Button>
        }
        onRetry={() => {
          void templates.refetch();
        }}
      >
        <div className={styles.tableWrap}>
          <DataGrid
            items={items}
            columns={columns}
            sortable
            defaultSortState={{ sortColumn: 'name', sortDirection: 'ascending' }}
            getRowId={(item: ITemplateListItem) => item.itemId}
            size="small"
            aria-label={strings.TemplatesTitle}
          >
            <DataGridHeader>
              <DataGridRow>
                {({ renderHeaderCell }) => (
                  <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<ITemplateListItem>>
              {({ item, rowId }) => (
                <DataGridRow<ITemplateListItem>
                  key={rowId}
                  className={styles.row}
                  onClick={() => openEditor(item)}
                >
                  {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </div>
      </DataState>
      <TemplateEditorDrawer
        open={editorOpen}
        item={editing}
        onClose={() => setEditorOpen(false)}
      />
    </div>
  );
};
