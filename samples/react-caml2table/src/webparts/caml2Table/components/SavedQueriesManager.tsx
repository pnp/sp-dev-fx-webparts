import * as React from 'react';
import {
  Stack,
  DetailsList,
  SelectionMode,
  IColumn,
  Dialog,
  DialogType,
  TextField,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  ActionButton,
  DetailsListLayoutMode,
  IconButton,
  IIconProps
} from '@fluentui/react';
import { ISavedQuery } from '../models/ISavedQuery';
import { StorageService } from '../services/StorageService';

export interface ISavedQueriesManagerProps {
  onLoadQuery: (query: ISavedQuery) => void;
  onClose: () => void;
  isOpen: boolean;
}

/**
 * Component for managing saved CAML queries
 */
const SavedQueriesManager: React.FunctionComponent<ISavedQueriesManagerProps> = (props) => {
  const { onLoadQuery, onClose, isOpen } = props;
  
  // State definitions
  const [queries, setQueries] = React.useState<ISavedQuery[]>([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState<boolean>(false);
  const [selectedQuery, setSelectedQuery] = React.useState<ISavedQuery>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  
  /**
   * Load saved queries from storage
   */
  const loadQueries = React.useCallback((): void => {
    const savedQueries = StorageService.getQueries();
    setQueries(savedQueries);
  }, []);

  // Load queries from storage when component mounts or dialog opens
  React.useEffect(() => {
    if (isOpen) {
      loadQueries();
    }
  }, [isOpen, loadQueries]);

  /**
   * Handle loading a query
   */
  const handleLoadQuery = (query: ISavedQuery): void => {
    // Update the lastUsed date
    const updatedQuery = { ...query, lastUsed: new Date() };
    StorageService.updateQuery(updatedQuery);
    
    // Call the parent component's handler
    onLoadQuery(updatedQuery);
    onClose();
  };

  /**
   * Handle deleting a query
   */
  const handleDeleteQuery = (): void => {
    if (selectedQuery) {
      StorageService.deleteQuery(selectedQuery.id);
      setIsDeleteConfirmOpen(false);
      loadQueries(); // Reload the list
    }
  };

  /**
   * Show delete confirmation dialog
   */
  const confirmDelete = (query: ISavedQuery): void => {
    setSelectedQuery(query);
    setIsDeleteConfirmOpen(true);
  };

  /**
   * Filter queries based on search text
   */
  const getFilteredQueries = (): ISavedQuery[] => {
    if (!searchText) {
      return queries;
    }
    
    const searchLower = searchText.toLowerCase();
    return queries.filter(query => 
      query.name.toLowerCase().includes(searchLower) || 
      query.listName.toLowerCase().includes(searchLower)
    );
  };

  // Define columns for the DetailsList
  const columns: IColumn[] = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 150,
      isResizable: true
    },
    {
      key: 'listName',
      name: 'List',
      fieldName: 'listName',
      minWidth: 150,
      isResizable: true
    },
    {
      key: 'lastUsed',
      name: 'Last Used',
      minWidth: 100,
      isResizable: true,
      onRender: (item: ISavedQuery) => item.lastUsed.toLocaleDateString()
    },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 100,
      onRender: (item: ISavedQuery) => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <IconButton
            iconProps={{ iconName: 'OpenFile' }}
            title="Load Query"
            onClick={() => handleLoadQuery(item)}
          />
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            title="Delete Query"
            onClick={() => confirmDelete(item)}
          />
        </Stack>
      )
    }
  ];

  // Icons for buttons
  const deleteIcon: IIconProps = { iconName: 'Delete' };

  return (
    <>
      <Dialog
        hidden={!isOpen}
        onDismiss={onClose}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Saved Queries',
        }}
        minWidth={700}
        modalProps={{
          isBlocking: false,
          styles: { main: { maxWidth: 700 } }
        }}
      >
        <Stack tokens={{ childrenGap: 16 }}>
          <TextField
            placeholder="Search queries..."
            value={searchText}
            onChange={(_, value) => setSearchText(value || '')}
            iconProps={{ iconName: 'Search' }}
          />

          {queries.length === 0 ? (
            <MessageBar>
              No saved queries found. Create some by clicking &quot;Save Query&quot;.
            </MessageBar>
          ) : getFilteredQueries().length === 0 ? (
            <MessageBar>
              No queries match your search. Try a different search term.
            </MessageBar>
          ) : (
            <DetailsList
              items={getFilteredQueries()}
              columns={columns}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
            />
          )}

          {queries.length > 0 && (
            <Stack horizontal horizontalAlign="space-between">
              <ActionButton
                iconProps={deleteIcon}
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete all saved queries? This cannot be undone.")) {
                    StorageService.clearQueries();
                    loadQueries();
                  }
                }}
              >
                Clear All Queries
              </ActionButton>
              <DefaultButton text="Close" onClick={onClose} />
            </Stack>
          )}
        </Stack>
      </Dialog>

      <Dialog
        hidden={!isDeleteConfirmOpen}
        onDismiss={() => setIsDeleteConfirmOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Confirm Delete',
          subText: selectedQuery ? `Are you sure you want to delete the query "${selectedQuery.name}"?` : 'Are you sure you want to delete this query?'
        }}
      >
        <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="end">
          <PrimaryButton text="Delete" onClick={handleDeleteQuery} />
          <DefaultButton text="Cancel" onClick={() => setIsDeleteConfirmOpen(false)} />
        </Stack>
      </Dialog>
    </>
  );
};

export default SavedQueriesManager;