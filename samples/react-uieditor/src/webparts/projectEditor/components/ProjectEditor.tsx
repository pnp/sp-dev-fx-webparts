import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Stack,
  IconButton,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Icon,
  Label
} from '@fluentui/react';
import { IProjectEditorProps } from './IProjectEditorProps';
import { ConfigurationPanel } from './ConfigurationPanel';
import { ProjectItem } from './ProjectItem';
import { SPService } from '../services/SPService';
import { IProjectItem } from '../models/IProjectItem';
import { DisplayMode } from '@microsoft/sp-core-library';
import styles from './ProjectEditor.module.scss';

const ProjectEditor: React.FC<IProjectEditorProps> = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [items, setItems] = useState<IProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [spService] = useState<SPService>(new SPService(props.context));

  const loadItems = async (): Promise<void> => {
    if (!props.selectedListId) {
      setItems([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const listItems = await spService.getListItems(props.selectedListId);
      // Filter to show only active items
      const activeItems = listItems.filter(item => item.Active !== false);
      setItems(activeItems);
    } catch (err) {
      setError('Error loading items. Please check configuration.');
      console.error('Error loading items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems().catch(console.error);
  }, [props.selectedListId]);

  const handleConfigurationSave = (
    selectedListId: string,
    selectedListTitle: string,
    layoutMode: string
  ): void => {
    props.updateProperty({
      selectedListId,
      selectedListTitle,
      layoutMode
    });
    
    setIsPanelOpen(false);
    loadItems().catch(console.error);
  };

  const getContainerClassName = (): string => {
    switch (props.layoutMode) {
      case 'card':
        return styles.itemsGridCard;
      case 'accordion':
        return styles.itemsGridAccordion;
      default:
        return styles.itemsGridCard;
    }
  };

  // Check if we're in edit mode
  const isEditMode = props.displayMode === DisplayMode.Edit;

  return (
    <div className={styles.projectEditor}>
      {/* Header with Gear Icon - Only show in Edit Mode */}
      {isEditMode && (
        <Stack>
         
          <IconButton
            iconProps={{ iconName: 'Settings' }}
            title="Configuration & Management"
            ariaLabel="Open configuration and management panel"
            onClick={() => setIsPanelOpen(true)}
            className={styles.gearIcon}
          />
        </Stack>
      )}

      {/* Configuration Panel */}
      <ConfigurationPanel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        selectedListId={props.selectedListId}
        selectedListTitle={props.selectedListTitle}
        layoutMode={props.layoutMode}
        spService={spService}
        context={props.context}
        onSave={handleConfigurationSave}
      />

      {/* Content Area - Read-Only Display */}
      <div className={styles.container}>
        {/* Loading Spinner */}
        {isLoading && (
          <Stack horizontalAlign="center" tokens={{ padding: 20 }}>
            <Spinner size={SpinnerSize.large} label="Loading items..." />
          </Stack>
        )}

        {/* Error Message */}
        {error && !isLoading && (
          <MessageBar messageBarType={MessageBarType.error}>
            {error}
          </MessageBar>
        )}

        {/* No Configuration Message - Only in Edit Mode */}
        {!props.selectedListId && !isLoading && isEditMode && (
          <div className={styles.card}>
            <Stack horizontalAlign="center" tokens={{ childrenGap: 12 }} className={styles.cardContent}>
              <Icon iconName="Settings" styles={{ root: { fontSize: 56, color: '#667eea' } }} />
              <Label styles={{ root: { fontSize: 16, fontWeight: 600 } }}>
                Click the gear icon to configure and manage Items
              </Label>
            </Stack>
          </div>
        )}

        {/* No Configuration Message - View Mode */}
        {!props.selectedListId && !isLoading && !isEditMode && (
          <MessageBar messageBarType={MessageBarType.info}>
            No list configured. Please configure this web part in edit mode.
          </MessageBar>
        )}

        {/* Items Display - Read-Only */}
        {!isLoading && !error && props.selectedListId && items.length > 0 && (
          <div className={styles.card}>
            <Stack tokens={{ childrenGap: 18 }} className={styles.cardContent}>
              
              
              <div className={getContainerClassName()}>
                {items.map(item => (
                  <ProjectItem
                    key={item.Id}
                    item={item}
                    displayMode={props.layoutMode}
                    isReadOnly={true}
                  />
                ))}
              </div>
            </Stack>
          </div>
        )}

        {/* No Items Message */}
        {!isLoading && !error && props.selectedListId && items.length === 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            {isEditMode 
              ? 'No active items found. Click the gear icon to create and activate items.'
              : 'No active items available at this time.'}
          </MessageBar>
        )}
      </div>
    </div>
  );
};

export default ProjectEditor;