import { useState, useCallback, useMemo } from 'react';
import { ICustomAction } from '../models';
import { Selection } from '@fluentui/react';

export interface IUseCustomActionSelectionResult {
  selectedAction: ICustomAction | null;
  selectedActions: ICustomAction[];
  selection: Selection;
  setSelectedAction: (action: ICustomAction | null) => void;
  clearSelection: () => void;
}

export function useCustomActionSelection(): IUseCustomActionSelectionResult {
  const [selectedAction, setSelectedActionState] = useState<ICustomAction | null>(null);
  const [selectedActions, setSelectedActions] = useState<ICustomAction[]>([]);

  const selection = useMemo(() => new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection() as ICustomAction[];
      setSelectedActions(selectedItems);
      setSelectedActionState(selectedItems.length === 1 ? selectedItems[0] : null);
    }
  }), []);

  const setSelectedAction = useCallback((action: ICustomAction | null) => {
    setSelectedActionState(action);
    if (action) {
      selection.setKeySelected(action.Id?.toString() || '', true, false);
    } else {
      selection.setAllSelected(false);
    }
  }, [selection]);

  const clearSelection = useCallback(() => {
    selection.setAllSelected(false);
    setSelectedActionState(null);
    setSelectedActions([]);
  }, [selection]);

  return {
    selectedAction,
    selectedActions,
    selection,
    setSelectedAction,
    clearSelection
  };
}