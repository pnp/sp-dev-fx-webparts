import * as React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { TextField } from '@fluentui/react/lib/TextField';
import { IconButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { GlossaryService } from '../services/GlossaryService';
import { IGlossaryItem, IGlossaryGroup } from '../models/IGlossaryItem';
import { AlphabetNav } from './AlphabetNav';
import { GlossaryGroupSection } from './GlossaryGroup';
import { GlossaryManagerPanel } from './GlossaryManagerPanel';
import './ModernGlossary.scss';

export interface IModernGlossaryProps {
  context: WebPartContext;
  title: string;
  listName: string;
  isEditMode: boolean;
}

type LoadState = 'loading' | 'loaded' | 'error';

export const ModernGlossary: React.FC<IModernGlossaryProps> = ({
  context,
  title,
  listName,
  isEditMode
}) => {
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [allItems, setAllItems] = useState<IGlossaryItem[]>([]);
  const [allItemsIncludingInactive, setAllItemsIncludingInactive] = useState<IGlossaryItem[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [searchText, setSearchText] = useState<string>('');
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  const service = useMemo(
    () => new GlossaryService(context, listName),
    [context, listName]
  );

  const loadItems = useCallback(async (): Promise<void> => {
    setLoadState('loading');
    try {
      const [activeItems, everyItem] = await Promise.all([
        service.getActiveGlossaryItems(),
        service.getAllGlossaryItems()
      ]);
      setAllItems(activeItems);
      setAllItemsIncludingInactive(everyItem);
      setLoadState('loaded');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setErrorMessage(message);
      setLoadState('error');
    }
  }, [service]);

  useEffect(() => {
    loadItems().catch(() => {
      /* handled in loadItems */
    });
  }, [loadItems]);

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    allItems.forEach((item) => {
      if (item.alphabetLetter) {
        set.add(item.alphabetLetter);
      }
    });
    return set;
  }, [allItems]);

  const filteredItems = useMemo(() => {
    let result = allItems;

    if (selectedLetter) {
      result = result.filter((item) => item.alphabetLetter === selectedLetter);
    }

    if (searchText.trim().length > 0) {
      const q = searchText.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().indexOf(q) !== -1 ||
          item.description.toLowerCase().indexOf(q) !== -1
      );
    }

    return result;
  }, [allItems, selectedLetter, searchText]);

  const groups = useMemo<IGlossaryGroup[]>(() => {
    const map = new Map<string, IGlossaryItem[]>();
    filteredItems.forEach((item) => {
      const key = item.alphabetLetter || '#';
      const existing = map.get(key);
      if (existing) {
        existing.push(item);
      } else {
        map.set(key, [item]);
      }
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, items]) => ({ letter, items }));
  }, [filteredItems]);

  const allVisibleIds = useMemo(
    () => filteredItems.map((item) => item.id),
    [filteredItems]
  );

  const isAllExpanded =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => expandedIds.has(id));

  const handleToggleItem = useCallback((id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleExpandCollapseAll = useCallback(() => {
    setExpandedIds((prev) => {
      if (isAllExpanded) {
        const next = new Set(prev);
        allVisibleIds.forEach((id) => next.delete(id));
        return next;
      }
      const next = new Set(prev);
      allVisibleIds.forEach((id) => next.add(id));
      return next;
    });
  }, [isAllExpanded, allVisibleIds]);

  const handleSelectLetter = useCallback((letter: string | null) => {
    setSelectedLetter(letter);
  }, []);

  if (loadState === 'loading') {
    return (
      <div className="modernGlossary">
        <div className="loadingContainer">
          <Spinner size={SpinnerSize.large} label="Loading glossary…" />
        </div>
      </div>
    );
  }

  if (loadState === 'error') {
    return (
      <div className="modernGlossary">
        <MessageBar messageBarType={MessageBarType.error}>
          Unable to load the glossary list &quot;{listName}&quot;. {errorMessage}
          {' '}Verify the list name and that Status/AlphabetLetter columns exist.
        </MessageBar>
      </div>
    );
  }

  return (
    <div className="modernGlossary">
      <div className="header">
        <h1 className="title">{title}</h1>
        <div className="headerControls">
          <TextField
            className="searchBox"
            placeholder="Search terms…"
            iconProps={{ iconName: 'Search' }}
            value={searchText}
            onChange={(_, v) => setSearchText(v ?? '')}
          />
          {isEditMode && (
            <IconButton
              iconProps={{ iconName: 'Settings' }}
              title="Manage glossary items"
              ariaLabel="Manage glossary items"
              className="manageGearButton"
              onClick={() => setIsManagerOpen(true)}
            />
          )}
        </div>
      </div>

      <AlphabetNav
        availableLetters={availableLetters}
        selectedLetter={selectedLetter}
        onSelectLetter={handleSelectLetter}
        isAllExpanded={isAllExpanded}
        hasVisibleItems={allVisibleIds.length > 0}
        onExpandCollapseAll={handleExpandCollapseAll}
      />

      <div className="resultsArea">
        {groups.length === 0 ? (
          <div className="emptyState">
            <Icon iconName="Search" className="emptyStateIcon" />
            <p>No glossary terms match your current filter.</p>
          </div>
        ) : (
          groups.map((group) => (
            <GlossaryGroupSection
              key={group.letter}
              group={group}
              expandedIds={expandedIds}
              onToggleItem={handleToggleItem}
            />
          ))
        )}
      </div>

      {isEditMode && (
        <GlossaryManagerPanel
          isOpen={isManagerOpen}
          onDismiss={() => setIsManagerOpen(false)}
          service={service}
          items={allItemsIncludingInactive}
          onSaved={() => {
            loadItems().catch(() => undefined);
          }}
        />
      )}
    </div>
  );
};