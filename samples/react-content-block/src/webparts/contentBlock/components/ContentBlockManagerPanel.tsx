import * as React from 'react';
import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  IconButton,
  TextField,
  Toggle,
  MessageBar,
  MessageBarType,
  Stack,
  Spinner,
  SpinnerSize,
  Dropdown,
  IDropdownOption,
  Pivot,
  PivotItem
} from '@fluentui/react';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import { IContentBlockItem } from '../models/IContentBlockItem';
import { SPService } from '../services/SPService';
import RichTextEditor from './RichTextEditor';
import styles from './ContentBlock.module.scss';
import type { LayoutType } from './IContentBlockProps';

export interface IContentBlockManagerPanelProps {
  context: WebPartContext;
  listId: string;
  layout: LayoutType;
  isOpen: boolean;
  onDismiss: (changesSaved: boolean) => void;

  onListChange: (listId: string) => void;
  onLayoutChange: (layout: LayoutType) => void;
}

type GroupKey = 'active' | 'inactive';

interface IContentBlockRow extends IContentBlockItem {
  _key: string;
}

// SortableRow component - moved outside to prevent recreation
const SortableRow = memo<{
  row: IContentBlockRow;
  group: GroupKey;
  index: number;
  onFieldChange: (group: GroupKey, index: number, field: keyof IContentBlockItem, value: unknown) => void;
  onToggleActive: (group: GroupKey, index: number, checked: boolean) => void;
  onDeleteItem: (group: GroupKey, index: number) => void;
  onToggleExpanded: (key: string) => void;
  isExpanded: boolean;
  context: WebPartContext;
}>(({ 
  row, 
  group, 
  index, 
  onFieldChange,
  onToggleActive,
  onDeleteItem,
  onToggleExpanded,
  isExpanded,
  context
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: row._key });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  // Local state for immediate UI updates
  const [localTitle, setLocalTitle] = useState(row.Title);
  const [localTitle2, setLocalTitle2] = useState(row.Title2);
  
  // Update local state when row prop changes
  useEffect(() => {
    setLocalTitle(row.Title);
  }, [row.Title]);

  useEffect(() => {
    setLocalTitle2(row.Title2);
  }, [row.Title2]);

  // Debounced update to parent
  const updateParent = useCallback((field: keyof IContentBlockItem, value: string) => {
    onFieldChange(group, index, field, value);
  }, [group, index, onFieldChange]);

  const handleTitleChange = useCallback((_: unknown, v?: string) => {
    const newValue = v || '';
    setLocalTitle(newValue);
    updateParent('Title', newValue);
  }, [updateParent]);

  const handleTitle2Change = useCallback((_: unknown, v?: string) => {
    const newValue = v || '';
    setLocalTitle2(newValue);
    updateParent('Title2', newValue);
  }, [updateParent]);

  const handleDescriptionChange = useCallback((v: string) => {
    onFieldChange(group, index, 'Description', v);
  }, [group, index, onFieldChange]);

  const handleDescription2Change = useCallback((v: string) => {
    onFieldChange(group, index, 'Description2', v);
  }, [group, index, onFieldChange]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.accordionRow} ${isDragging ? styles.accordionRowDragging : ''}`}
    >
      <div className={styles.accordionHeader}>
        <div className={styles.dragHandle} {...attributes} {...listeners}>
          <IconButton iconProps={{ iconName: 'GripperDotsVertical' }} />
        </div>

        <div className={styles.headerText} onClick={() => onToggleExpanded(row._key)}>
          <span className={styles.headerTitle}>
            {localTitle || '(no title)'}
          </span>
        </div>

        <div className={styles.headerActions}>
          <Toggle
            checked={group === 'active'}
            onChange={(_, v) => onToggleActive(group, index, !!v)}
          />
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            onClick={() => onDeleteItem(group, index)}
          />
          <IconButton
            iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
            onClick={() => onToggleExpanded(row._key)}
          />
        </div>
      </div>

      {isExpanded && (
        <div className={styles.accordionBody}>
          <Stack tokens={{ childrenGap: 10 }}>
            <TextField
              label="Title"
              value={localTitle}
              onChange={handleTitleChange}
            />

            <div>
              <label className={styles.richLabel}>Body</label>
              <RichTextEditor
                value={row.Description}
                onChange={handleDescriptionChange}
                context={context}
              />
            </div>

            <TextField
              label="Title 2"
              value={localTitle2}
              onChange={handleTitle2Change}
            />

            <div>
              <label className={styles.richLabel}>Body 2</label>
              <RichTextEditor
                value={row.Description2}
                onChange={handleDescription2Change}
                context={context}
              />
            </div>
          </Stack>
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.row._key === nextProps.row._key &&
    prevProps.row.Title === nextProps.row.Title &&
    prevProps.row.Title2 === nextProps.row.Title2 &&
    prevProps.row.Description === nextProps.row.Description &&
    prevProps.row.Description2 === nextProps.row.Description2 &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.group === nextProps.group &&
    prevProps.index === nextProps.index
  );
});

const ContentBlockManagerPanel: React.FC<IContentBlockManagerPanelProps> = (props) => {
  const { context, listId, layout, isOpen, onDismiss } = props;

  const [spService] = useState(() => new SPService(context));

  const [activeItems, setActiveItems] = useState<IContentBlockRow[]>([]);
  const [inactiveItems, setInactiveItems] = useState<IContentBlockRow[]>([]);
  const [availableLists, setAvailableLists] = useState<IDropdownOption[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [changesSinceOpen, setChangesSinceOpen] = useState(false);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [tempCounter, setTempCounter] = useState(1);

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [listLocked, setListLocked] = useState<boolean>(false);
  const [canAccessTab2, setCanAccessTab2] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  const loadLists = async (): Promise<void> => {
    try {
      const lists = await spService.getLists();
      setAvailableLists(lists.map(l => ({ key: l.Id, text: l.Title })));
    } catch (err) {
      console.error('Error loading lists', err);
    }
  };

  const loadItems = async (): Promise<void> => {
    if (!listId) return;

    setIsLoading(true);
    setError(null);
    setInfo(null);
    setExpandedKeys([]);
    setDeletedIds([]);
    setTempCounter(1);

    try {
      await spService.ensureColumns(listId);
      const validation = await spService.validateListStructure(listId);

      if (!validation.isValid) {
        setError(`Missing required columns: ${validation.missingColumns.join(', ')}`);
        setActiveItems([]);
        setInactiveItems([]);
        return;
      }

      const all = await spService.getAllItems(listId);

      let tmp = 1;
      const withKeys: IContentBlockRow[] = all.map(item => ({
        ...item,
        _key: `row-${item.Id ?? `temp-${tmp++}`}`
      }));

      setActiveItems(
        withKeys.filter(i => i.Active).sort((a, b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0))
      );
      setInactiveItems(
        withKeys.filter(i => !i.Active).sort((a, b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0))
      );

      setChangesSinceOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setActiveItems([]);
      setInactiveItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setListLocked(!!listId);
      setCanAccessTab2(!!listId);
      loadLists().catch(err => {
        console.error('Error loading lists:', err);
      });
    }
  }, [isOpen, listId]);

  const onClose = (): void => {
    onDismiss(changesSinceOpen);
  };

  const toggleExpanded = useCallback((key: string): void => {
    setExpandedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }, []);

  // Use useCallback with stable reference
  const handleFieldChange = useCallback((
    group: GroupKey,
    index: number,
    field: keyof IContentBlockItem,
    value: unknown
  ): void => {
    const setFn = group === 'active' ? setActiveItems : setInactiveItems;

    setFn(prev => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: value } as IContentBlockRow;
      }
      return copy;
    });

    setChangesSinceOpen(true);
  }, []);

  const handleToggleActive = useCallback((group: GroupKey, index: number, checked: boolean): void => {
    if (group === 'active' && !checked) {
      setActiveItems(prev => {
        const copy = [...prev];
        const [removed] = copy.splice(index, 1);
        if (!removed) return prev;
        removed.Active = false;
        setInactiveItems(p => [...p, removed]);
        return copy;
      });
    } else if (group === 'inactive' && checked) {
      setInactiveItems(prev => {
        const copy = [...prev];
        const [removed] = copy.splice(index, 1);
        if (!removed) return prev;
        removed.Active = true;
        setActiveItems(p => [...p, removed]);
        return copy;
      });
    }

    setChangesSinceOpen(true);
  }, []);

  const handleDeleteItem = useCallback((group: GroupKey, index: number): void => {
    const items = group === 'active' ? activeItems : inactiveItems;
    const item = items[index];
    if (!item) return;

    if (!window.confirm(`Delete "${item.Title || '(no title)'}"?`)) return;

    if ((item.Id ?? 0) > 0) {
      setDeletedIds(prev => [...prev, item.Id!]);
    }

    if (group === 'active') {
      setActiveItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setInactiveItems(prev => prev.filter((_, i) => i !== index));
    }

    setChangesSinceOpen(true);
  }, [activeItems, inactiveItems]);

  const handleAddItem = (): void => {
    const nextTemp = tempCounter + 1;
    setTempCounter(nextTemp);

    const newRow: IContentBlockRow = {
      Id: -nextTemp,
      Title: '',
      Description: '',
      Title2: '',
      Description2: '',
      Active: true,
      SortOrder: activeItems.length + 1,
      _key: `row-temp-${nextTemp}`
    };

    setActiveItems(prev => [...prev, newRow]);
    setExpandedKeys(prev => [...prev, newRow._key]);
    setChangesSinceOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const indexActive = activeItems.findIndex(i => i._key === activeId);
    const indexInactive = inactiveItems.findIndex(i => i._key === activeId);

    let group: GroupKey | null = null;
    if (indexActive >= 0) group = 'active';
    if (indexInactive >= 0) group = 'inactive';
    if (!group) return;

    const list = group === 'active' ? activeItems : inactiveItems;
    const setFn = group === 'active' ? setActiveItems : setInactiveItems;

    const oldIndex = list.findIndex(i => i._key === activeId);
    const newIndex = list.findIndex(i => i._key === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    setFn(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(oldIndex, 1);
      copy.splice(newIndex, 0, moved);
      return copy;
    });

    setChangesSinceOpen(true);
  };

  const handleSave = async (): Promise<void> => {
    if (!listId) return;

    setIsSaving(true);
    setError(null);
    setInfo(null);

    try {
      const normalizedActive: IContentBlockItem[] = activeItems.map((row, idx) => ({
        Id: (row.Id ?? 0) > 0 ? row.Id : undefined,
        Title: row.Title,
        Description: row.Description,
        Title2: row.Title2,
        Description2: row.Description2,
        Active: true,
        SortOrder: idx + 1
      }));

      const normalizedInactive: IContentBlockItem[] = inactiveItems.map((row, idx) => ({
        Id: (row.Id ?? 0) > 0 ? row.Id : undefined,
        Title: row.Title,
        Description: row.Description,
        Title2: row.Title2,
        Description2: row.Description2,
        Active: false,
        SortOrder: idx + 1
      }));

      for (const id of deletedIds) {
        await spService.deleteListItem(listId, id);
      }

      const allToSave = [...normalizedActive, ...normalizedInactive];

      for (const item of allToSave) {
        if ((item.Id ?? 0) > 0) {
          await spService.updateListItem(listId, item);
        } else {
          await spService.addListItem(listId, item);
        }
      }

      onDismiss(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const activeKeys = useMemo(() => activeItems.map(i => i._key), [activeItems]);
  const inactiveKeys = useMemo(() => inactiveItems.map(i => i._key), [inactiveItems]);

  const renderConfigurationTab = (): JSX.Element => (
    <div className={styles.configTab}>
      <h3>Select List</h3>

      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
        <Dropdown
          placeholder="Select list"
          options={availableLists}
          selectedKey={listId}
          disabled={listLocked}
          onChange={(_, o) => o && props.onListChange(o.key.toString())}
          styles={{ root: { width: 260 } }}
        />

        {listId && listLocked && (
          <IconButton
            iconProps={{ iconName: 'Edit' }}
            onClick={() => setListLocked(false)}
          />
        )}

        {!listLocked && listId && (
          <PrimaryButton
            text="Lock"
            iconProps={{ iconName: 'Lock' }}
            onClick={() => setListLocked(true)}
          />
        )}
      </Stack>

      <h3 style={{ marginTop: 20 }}>Select Layout</h3>

      <Dropdown
        selectedKey={layout}
        options={[
          { key: '50-50', text: '50 / 50' },
          { key: '25-75', text: '25 / 75' },
          { key: '75-25', text: '75 / 25' }
        ]}
        onChange={(_, o) => o && props.onLayoutChange(o.key as LayoutType)}
        styles={{ root: { width: 260 } }}
      />

      <PrimaryButton
        text="Next"
        onClick={() => {
          setListLocked(true);
          setCanAccessTab2(true);
          setCurrentStep(2);
          loadItems().catch(err => {
            console.error('Error loading items:', err);
          });
        }}
        disabled={!listId || !layout}
        styles={{ root: { marginTop: 25 } }}
      />
    </div>
  );

  const renderManagerTab = (): JSX.Element => (
    <div className={styles.managerTab}>
      <DefaultButton
        text="Back to Configuration"
        iconProps={{ iconName: 'Back' }}
        onClick={() => setCurrentStep(1)}
        styles={{ root: { marginBottom: 10 } }}
      />

      {error && (
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
      )}

      {info && (
        <MessageBar messageBarType={MessageBarType.success}>{info}</MessageBar>
      )}

      <Stack horizontal tokens={{ childrenGap: 10 }} className={styles.managerToolbar}>
        <PrimaryButton
          text="Add Item"
          iconProps={{ iconName: 'Add' }}
          onClick={handleAddItem}
        />
        <DefaultButton
          text="Refresh"
          iconProps={{ iconName: 'Refresh' }}
          onClick={() => {
            loadItems().catch(err => {
              console.error('Error loading items:', err);
            });
          }}
        />
        <PrimaryButton
          text="Save"
          iconProps={{ iconName: 'Save' }}
          onClick={() => {
            handleSave().catch(err => {
              console.error('Error saving:', err);
            });
          }}
          disabled={isSaving}
        />
      </Stack>

      {isSaving && (
        <div className={styles.savingOrder}>
          <Spinner size={SpinnerSize.small} label="Saving..." />
        </div>
      )}

      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Spinner size={SpinnerSize.medium} label="Loading..." />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.groupSection}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>Active Items</span>
            </div>

            <SortableContext items={activeKeys} strategy={verticalListSortingStrategy}>
              {activeItems.map((row, index) => (
                <SortableRow 
                  key={row._key} 
                  row={row} 
                  group="active" 
                  index={index}
                  onFieldChange={handleFieldChange}
                  onToggleActive={handleToggleActive}
                  onDeleteItem={handleDeleteItem}
                  onToggleExpanded={toggleExpanded}
                  isExpanded={expandedKeys.includes(row._key)}
                  context={context}
                />
              ))}
            </SortableContext>
          </div>

          <div className={styles.groupSection}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>Inactive Items</span>
            </div>

            <SortableContext items={inactiveKeys} strategy={verticalListSortingStrategy}>
              {inactiveItems.map((row, index) => (
                <SortableRow 
                  key={row._key} 
                  row={row} 
                  group="inactive" 
                  index={index}
                  onFieldChange={handleFieldChange}
                  onToggleActive={handleToggleActive}
                  onDeleteItem={handleDeleteItem}
                  onToggleExpanded={toggleExpanded}
                  isExpanded={expandedKeys.includes(row._key)}
                  context={context}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
    </div>
  );

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onClose}
      type={PanelType.large}
      headerText="Content Block Editor"
      isLightDismiss={false}
    >
      <Pivot
        selectedKey={currentStep.toString()}
        onLinkClick={item => {
          if (!item) return;
          const newStep = Number(item.props.itemKey) as 1 | 2;
          
          if (newStep === 2 && !canAccessTab2) {
            return;
          }
          
          setCurrentStep(newStep);
          
          if (newStep === 2) {
            loadItems().catch(err => {
              console.error('Error loading items:', err);
            });
          }
        }}
      >
        <PivotItem headerText="Configuration" itemKey="1">
          {renderConfigurationTab()}
        </PivotItem>

        <PivotItem 
          headerText="Manage Items" 
          itemKey="2"
          itemIcon={!canAccessTab2 ? 'Lock' : undefined}
        >
          {canAccessTab2 ? (
            renderManagerTab()
          ) : (
            <div className={styles.lockedTab}>
              <MessageBar messageBarType={MessageBarType.warning}>
                Please select a list and click Next in the Configuration tab to access item management.
              </MessageBar>
            </div>
          )}
        </PivotItem>
      </Pivot>
    </Panel>
  );
};

export default ContentBlockManagerPanel;