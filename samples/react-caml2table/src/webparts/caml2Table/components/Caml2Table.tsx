import * as React from 'react';
import styles from './Caml2Table.module.scss';
import Editor from '@monaco-editor/react';
import { Caml2TableContext } from '../Caml2TableContext';
import { 
  Label, 
  PrimaryButton, 
  DefaultButton,
  Stack, 
  StackItem, 
  ThemeProvider, 
  Spinner, 
  SpinnerSize, 
  MessageBar, 
  MessageBarType,
  Dialog,
  DialogType,
  TextField,
  CommandBar,
  ICommandBarItemProps,
  DetailsList,
  SelectionMode,
  Toggle,
  Panel,
  PanelType
} from '@fluentui/react';
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { IFieldInfo } from '../models/IFieldInfo';
import { IQueryResult } from '../models/IQueryResult';
import { ISavedQuery } from '../models/ISavedQuery';
import { SharePointService } from '../services/SharePointService';
import { StorageService } from '../services/StorageService';
import { QueryHistoryManager } from '../utils/QueryHistoryManager';
import { QueryTemplates } from '../utils/QueryTemplates';
import CamlValidator from './CamlValidator';
import CamlQueryBuilder from './CamlQueryBuilder';
import SavedQueriesManager from './SavedQueriesManager';

const defaultQuery =
`<View>
  <Query>
    <Where>
      <In>
          <FieldRef Name="ID" />
          <Values>
              <Value Type="Integer">1</Value>
              <Value Type="Integer">4</Value>
              <Value Type="Integer">6</Value>
              <Value Type="Integer">8</Value>
          </Values>
      </In>
    </Where>
  </Query>
</View>`;

export interface ICaml2TableProps { }

const Caml2Table: React.FunctionComponent<ICaml2TableProps> = () => {
  const { SPFxContext, spfi, themeVariant } = React.useContext(Caml2TableContext);
  const [list, setList] = React.useState<string>(null);
  const [currentListName, setCurrentListName] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>(defaultQuery);
  const [results, setResults] = React.useState<IQueryResult[]>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(null);
  const [fields, setFields] = React.useState<IFieldInfo[]>([]);
  const [queryValidatorVisible, setQueryValidatorVisible] = React.useState<boolean>(true);
  
  // State for new features
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState<boolean>(false);
  const [isSavedQueriesOpen, setIsSavedQueriesOpen] = React.useState<boolean>(false);
  const [queryName, setQueryName] = React.useState<string>("");
  const [isFieldPanelOpen, setIsFieldPanelOpen] = React.useState<boolean>(false);
  const [queryBuilderOpen, setQueryBuilderOpen] = React.useState<boolean>(false);
  const [showItemCount, setShowItemCount] = React.useState<boolean>(false);
  const [itemCount, setItemCount] = React.useState<number>(null);
  const [queryHistory, setQueryHistory] = React.useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = React.useState<number>(-1);

  const spService = React.useMemo(() => {
    return spfi ? new SharePointService(spfi) : null;
  }, [spfi]);
  
  // Define loadListFields before using it in useEffect
  const loadListFields = React.useCallback(async (): Promise<void> => {
    if (!list || !spService) {
      setFields([]);
      return;
    }
    
    try {
      const listFields = await spService.getListFields(list);
      setFields(listFields);
    } catch (err) {
      console.error("Error loading list fields:", err);
    }
  }, [list, spService]);
  

  // Load saved queries on mount
  React.useEffect(() => {
    if (list && spService) {
      (async () => {
        try {
          await loadListFields();
        } catch (error) {
          console.error('Error loading list fields:', error);
        }
      })().catch(error => {
        console.error('Unhandled error in loadListFields:', error);
      });
    }
  }, [list, spService, loadListFields]);
  
  // Load query history on mount
  React.useEffect(() => {
    setQueryHistory(QueryHistoryManager.getHistory());
  }, []);
  
  // Handle list change with proper promise handling
  const handleListChange = React.useCallback((listId: string) => {
    if (listId && listId !== "NO_LIST_SELECTED") {
      setList(listId);
      
      // Retrieve the list title using PnPjs
      if (SPFxContext && SPFxContext.serviceScope && spfi) {
        (async () => {
          try {
            const listInfo = await spfi.web.lists.getById(listId).select('Title')();
            if (listInfo && listInfo.Title) {
              setCurrentListName(listInfo.Title);
            }
          } catch (error) {
            setCurrentListName("");
          }
        })().catch(error => {
          console.error('Error getting list title:', error);
          setCurrentListName("");
        });
      }
    } else {
      setList(null);
      setCurrentListName("");
    }
  }, [SPFxContext, spfi]);
  
  const handleEditorChange = React.useCallback((value: string): void => {
    setQuery(value || '');
  }, []);

  // Save current query to history
  const saveToHistory = React.useCallback((queryText: string): void => {
    QueryHistoryManager.addToHistory(queryText);
    setQueryHistory(QueryHistoryManager.getHistory());
    setCurrentHistoryIndex(-1); // Reset index when adding new query
  }, []);

  // Execute the query using PnPjs only
  const executeSearch = React.useCallback(async (): Promise<void> => {
    if (!list || !query || !spService) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setItemCount(null);

    try {
      // Save query to history
      saveToHistory(query);
      
      // Execute the query
      const queryResults = await spService.executeQuery(list, query);
      setResults(queryResults);
      
      // Get total item count if requested
      if (showItemCount) {
        const count = await spService.getListItemCount(list);
        setItemCount(count);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error executing query:', err);
      setError(`Error executing query: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [list, query, spService, showItemCount, saveToHistory]);

  // Get previous query from history
  const getPreviousQuery = React.useCallback((): void => {
    if (queryHistory.length === 0) return;
    
    const newIndex = currentHistoryIndex === -1 
      ? queryHistory.length - 1 
      : Math.max(0, currentHistoryIndex - 1);
    
    setCurrentHistoryIndex(newIndex);
    setQuery(queryHistory[newIndex]);
  }, [queryHistory, currentHistoryIndex]);

  // Get next query from history
  const getNextQuery = React.useCallback((): void => {
    if (currentHistoryIndex === -1 || queryHistory.length === 0) return;
    
    const newIndex = Math.min(queryHistory.length - 1, currentHistoryIndex + 1);
    setCurrentHistoryIndex(newIndex);
    setQuery(queryHistory[newIndex]);
  }, [queryHistory, currentHistoryIndex]);

  // Save query to library
  const saveQuery = React.useCallback((): void => {
    if (!queryName || !list) return;
    
    const newQuery: ISavedQuery = {
      id: Date.now().toString(),
      name: queryName,
      listId: list,
      listName: currentListName,
      query: query,
      lastUsed: new Date()
    };
    
    StorageService.saveQuery(newQuery);
    setIsSaveDialogOpen(false);
    setQueryName("");
  }, [queryName, list, currentListName, query]);

  // Load a saved query
  const loadQuery = React.useCallback((savedQuery: ISavedQuery): void => {
    setList(savedQuery.listId);
    setCurrentListName(savedQuery.listName);
    setQuery(savedQuery.query);
    
    // Close the dialogs
    setIsSavedQueriesOpen(false);
  }, []);

  // Load a query template
  const loadTemplate = React.useCallback((templateName: string): void => {
    if (QueryTemplates[templateName]) {
      setQuery(QueryTemplates[templateName]);
    }
  }, []);

  // Generate query from builder
  const handleQueryGenerated = React.useCallback((generatedQuery: string): void => {
    setQuery(generatedQuery);
    setQueryBuilderOpen(false);
  }, []);

  // Export results to CSV
  const exportToCSV = React.useCallback((): void => {
    if (!results || results.length === 0 || !spService) return;
    spService.exportResultsToCSV(results, currentListName);
  }, [results, currentListName, spService]);

  const getViewFields = React.useMemo((): IViewField[] => {
    if (!results || results.length === 0) {
      return [];
    }
    return Object.keys(results[0])
      .filter(key => !key.toLowerCase().startsWith('odata') && !key.toLowerCase().startsWith('_'))
      .map(key => ({
        name: key,
        displayName: key,
        isResizable: true,
        minWidth: 125,
        maxWidth: 300
      } as IViewField));
  }, [results]);

  // Command bar items
  const commandBarItems: ICommandBarItemProps[] = React.useMemo(() => [
    {
      key: 'templates',
      text: 'Templates',
      iconProps: { iconName: 'Template' },
      subMenuProps: {
        items: Object.keys(QueryTemplates).map(template => ({
          key: template,
          text: template,
          onClick: () => loadTemplate(template)
        }))
      }
    },
    {
      key: 'save',
      text: 'Save Query',
      iconProps: { iconName: 'Save' },
      onClick: () => setIsSaveDialogOpen(true)
    },
    {
      key: 'load',
      text: 'My Queries',
      iconProps: { iconName: 'DocumentSet' },
      onClick: () => setIsSavedQueriesOpen(true)
    },
    {
      key: 'queryBuilder',
      text: 'Query Builder',
      iconProps: { iconName: 'BuildQueueNew' },
      onClick: () => setQueryBuilderOpen(true)
    },
    {
      key: 'fields',
      text: 'List Fields',
      iconProps: { iconName: 'FieldEmpty' },
      onClick: () => setIsFieldPanelOpen(true)
    },
    {
      key: 'toggleValidator',
      text: queryValidatorVisible ? 'Hide Validator' : 'Show Validator',
      iconProps: { iconName: queryValidatorVisible ? 'CheckboxComposite' : 'CheckboxUncheckedComposite' },
      onClick: () => setQueryValidatorVisible(!queryValidatorVisible)
    }
  ], [loadTemplate, queryValidatorVisible]);

  // Command bar items for results
  const resultsCommandBarItems: ICommandBarItemProps[] = React.useMemo(() => [
    {
      key: 'export',
      text: 'Export to CSV',
      iconProps: { iconName: 'ExcelDocument' },
      onClick: exportToCSV,
      disabled: !results || results.length === 0
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: executeSearch,
      disabled: !list || !query || isLoading
    }
  ], [exportToCSV, executeSearch, results, list, query, isLoading]);

  return (
    <ThemeProvider theme={themeVariant}>
      <div className={styles.caml2Table}>
        <Stack tokens={{ childrenGap: 16 }}>
          <StackItem className={styles.commandBarContainer}>
            <CommandBar items={commandBarItems} />
          </StackItem>
          
          <StackItem className={styles.listPickerContainer}>
            <ListPicker
              context={SPFxContext}
              label={currentListName ? `Selected list: ${currentListName}` : "Select your list"}
              includeHidden={false}
              multiSelect={false}
              selectedList={list}
              onSelectionChanged={handleListChange}
              disabled={isLoading}
            />
          </StackItem>

          <StackItem className={styles.editorContainer}>
            <Stack horizontal horizontalAlign="space-between">
              <Label>CAML Query</Label>
              <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.historyNavigation}>
                <DefaultButton 
                  iconProps={{ iconName: 'Up' }} 
                  onClick={getPreviousQuery} 
                  disabled={queryHistory.length === 0}
                  title="Previous query"
                />
                <DefaultButton 
                  iconProps={{ iconName: 'Down' }} 
                  onClick={getNextQuery} 
                  disabled={currentHistoryIndex === -1 || currentHistoryIndex === queryHistory.length - 1}
                  title="Next query"
                />
              </Stack>
            </Stack>
            <Editor
              height="250px"
              defaultLanguage="xml"
              value={query}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                folding: true,
                wordWrap: 'on',
                formatOnPaste: true,
                formatOnType: true
              }}
              theme="vs-dark"
            />
          </StackItem>

          {/* Validator integration */}
          {queryValidatorVisible && query && (
            <StackItem>
              <CamlValidator query={query} />
            </StackItem>
          )}

          <StackItem className={styles.buttonContainer}>
            <Stack horizontal horizontalAlign="space-between">
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <PrimaryButton 
                  text="Execute Query" 
                  disabled={!list || !query || isLoading} 
                  onClick={executeSearch} 
                  iconProps={{ iconName: 'Play' }}
                />
                {isLoading && (
                  <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                    <Spinner size={SpinnerSize.small} />
                    <Label>Executing query...</Label>
                  </Stack>
                )}
              </Stack>
              <Toggle
                label="Show total item count"
                checked={showItemCount}
                onChange={(_, checked) => setShowItemCount(checked)}
                className={styles.toggleContainer}
              />
            </Stack>
          </StackItem>

          {error && (
            <StackItem>
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={true}
                dismissButtonAriaLabel="Close"
                className={`${styles.statusMessage} ${styles.error}`}
              >
                {error}
              </MessageBar>
            </StackItem>
          )}
          
          {results && (
            <StackItem className={styles.resultsContainer}>
              <Stack>
                <Stack horizontal horizontalAlign="space-between" className={styles.resultsToolbar}>
                  <Label className={styles.resultsLabel}>
                    {results.length} Result(s) found {currentListName && `in "${currentListName}"`}
                    {itemCount !== null && ` of ${itemCount} total items`}
                  </Label>
                  <CommandBar items={resultsCommandBarItems} />
                </Stack>
                {results.length > 0 && (
                  <ListView
                    items={results}
                    viewFields={getViewFields}
                    compact={false}
                    showFilter={true}
                    selectionMode={0}
                  />
                )}
              </Stack>
            </StackItem>
          )}
        </Stack>

        {/* Save Query Dialog */}
        <Dialog
          hidden={!isSaveDialogOpen}
          onDismiss={() => setIsSaveDialogOpen(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Save Query',
            subText: 'Enter a name for your query'
          }}
        >
          <TextField
            label="Query Name"
            value={queryName}
            onChange={(_, value) => setQueryName(value)}
            required
          />
          <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginTop: 20 }}>
            <PrimaryButton text="Save" onClick={saveQuery} disabled={!queryName} />
            <DefaultButton text="Cancel" onClick={() => setIsSaveDialogOpen(false)} />
          </Stack>
        </Dialog>

        {/* Saved Queries Manager */}
        <SavedQueriesManager 
          isOpen={isSavedQueriesOpen} 
          onClose={() => setIsSavedQueriesOpen(false)} 
          onLoadQuery={loadQuery}
        />

        {/* List Fields Panel */}
        <Panel
          isOpen={isFieldPanelOpen}
          onDismiss={() => setIsFieldPanelOpen(false)}
          headerText="List Fields"
          type={PanelType.medium}
        >
          {fields.length === 0 ? (
            <MessageBar>No fields available. Please select a list first.</MessageBar>
          ) : (
            <DetailsList
              items={fields}
              columns={[
                { key: 'title', name: 'Display Name', fieldName: 'Title', minWidth: 150 },
                { key: 'name', name: 'Internal Name', fieldName: 'InternalName', minWidth: 150 },
                { key: 'type', name: 'Type', fieldName: 'TypeAsString', minWidth: 100 }
              ]}
              selectionMode={SelectionMode.none}
            />
          )}
        </Panel>

        {/* Query Builder Panel */}
        <Panel
          isOpen={queryBuilderOpen}
          onDismiss={() => setQueryBuilderOpen(false)}
          headerText="Visual Query Builder"
          type={PanelType.large}
        >
          <CamlQueryBuilder 
            fields={fields}
            onGenerateQuery={handleQueryGenerated}
          />
        </Panel>
      </div>
    </ThemeProvider>
  );
};

export default Caml2Table;