import * as React from 'react';
import styles from './GoalsOkrsTracker.module.scss';
import type { IGoalsOkrsTrackerProps } from './IGoalsOkrsTrackerProps';
import { ObjectivesService, IObjective } from '../services/ObjectivesService';
import { KeyResultsService, IKeyResult } from '../services/KeyResultsService';
import { ObjectiveCard, NewObjectiveForm, NewKeyResultForm } from './index';
import { Stack, PrimaryButton, Spinner, Text, DefaultButton } from '@fluentui/react';

export default function GoalsOkrsTracker(props: IGoalsOkrsTrackerProps): JSX.Element {
  const objectivesService = new ObjectivesService(props.context);
  const keyResultsService = new KeyResultsService(props.context);
  const [objectives, setObjectives] = React.useState<IObjective[]>([]);
  const [keyResults, setKeyResults] = React.useState<Record<number, IKeyResult[]>>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>();
  const [showNewObjective, setShowNewObjective] = React.useState(false);
  const [newObjective, setNewObjective] = React.useState<Partial<IObjective>>({});
  const [savingObjective, setSavingObjective] = React.useState(false);

  const [showNewKeyResult, setShowNewKeyResult] = React.useState<number | null>(null);
  const [newKeyResult, setNewKeyResult] = React.useState<Partial<IKeyResult>>({});
  const [savingKeyResult, setSavingKeyResult] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await loadObjectives();
    })().catch(error => {
      console.error('Failed to load objectives:', error);
    });
  }, []);


  async function loadObjectives(): Promise<void> {
    setLoading(true);
    setError(undefined);
    try {
      const objs = await objectivesService.getObjectives();
      setObjectives(objs);
      const krMap: Record<number, IKeyResult[]> = {};
      await Promise.all(
        objs.map(async (obj) => {
          const krs = await keyResultsService.getKeyResults(obj.Id!);
          krMap[obj.Id!] = krs;
        })
      );
      setKeyResults(krMap);
    } catch {
      setError('Failed to load objectives or key results.');
    } finally {
      setLoading(false);
    }
  }

  function handleShowNewObjective(): void {
    setShowNewObjective(true);
    setNewObjective({});
  }

  async function handleCreateObjective(): Promise<void> {
    setSavingObjective(true);
    setError(undefined);
    try {
      await objectivesService.createObjective(newObjective as IObjective);
      setShowNewObjective(false);
      await loadObjectives();
    } catch {
      setError('Failed to create objective.');
    } finally {
      setSavingObjective(false);
    }
  }

  function handleCancelNewObjective(): void {
    setShowNewObjective(false);
    setNewObjective({});
  }

  function handleShowNewKeyResult(objectiveId: number): void {
    setShowNewKeyResult(objectiveId);
    setNewKeyResult({});
  }

  async function handleCreateKeyResult(): Promise<void> {
    if (!showNewKeyResult) return;

    setSavingKeyResult(true);
    setError(undefined);
    try {
      const keyResultData = {
        ...newKeyResult,
        ObjectiveId: showNewKeyResult,
        Progress: newKeyResult.Progress || 0,
        RAGStatus: newKeyResult.RAGStatus || 'Green'
      } as IKeyResult;

      await keyResultsService.createKeyResult(keyResultData);
      setShowNewKeyResult(null);
      setNewKeyResult({});
      await loadObjectives();
    } catch (e) {
      setError('Failed to create key result.');
      console.error('Error creating key result:', e);
    } finally {
      setSavingKeyResult(false);
    }
  }

  function handleCancelNewKeyResult(): void {
    setShowNewKeyResult(null);
    setNewKeyResult({});
  }

  const [editingKeyResult, setEditingKeyResult] = React.useState<{ [krId: number]: Partial<IKeyResult> }>({});
  const [editingObjective, setEditingObjective] = React.useState<{ [objId: number]: Partial<IObjective> }>({});

  function handleEditKeyResult(kr: IKeyResult): void {
    setEditingKeyResult(prev => ({ ...prev, [kr.Id!]: { ...kr } }));
  }

  function handleChangeKeyResult(krId: number, updates: Partial<IKeyResult>): void {
    setEditingKeyResult(prev => ({ ...prev, [krId]: { ...prev[krId], ...updates } }));
  }

  function handleCancelEditKeyResult(krId: number): void {
    setEditingKeyResult(prev => { const copy = { ...prev }; delete copy[krId]; return copy; });
  }

  function handleEditObjective(obj: IObjective): void {
    setEditingObjective(prev => ({ ...prev, [obj.Id!]: { ...obj } }));
  }

  function handleChangeObjective(objId: number, updates: Partial<IObjective>): void {
    setEditingObjective(prev => ({ ...prev, [objId]: { ...prev[objId], ...updates } }));
  }

  function handleCancelEditObjective(objId: number): void {
    setEditingObjective(prev => { const copy = { ...prev }; delete copy[objId]; return copy; });
  }

  async function handleSaveObjective(objId: number): Promise<void> {
    try {
      setError(undefined);
      const updates = editingObjective[objId];

      if (!updates) {
        setError('No changes to save.');
        return;
      }

      console.log('Saving objective:', objId, updates);
      await objectivesService.updateObjective(objId, updates);
      console.log('Objective saved successfully');
      setEditingObjective(prev => { const copy = { ...prev }; delete copy[objId]; return copy; });
      await loadObjectives();
    } catch (e) {
      console.error('Error updating objective:', e);
      setError('Failed to update objective. Please try again.');
    }
  }

  async function handleSaveKeyResult(krId: number): Promise<void> {
    try {
      setError(undefined);
      const updates = editingKeyResult[krId];

      if (!updates) {
        setError('No changes to save.');
        return;
      }

      if (updates.Progress !== undefined && (isNaN(updates.Progress) || updates.Progress < 0 || updates.Progress > 100)) {
        setError('Progress must be a number between 0 and 100.');
        return;
      }

      console.log('Saving key result:', krId, updates);
      await keyResultsService.updateKeyResult(krId, updates);
      console.log('Key result saved successfully');
      setEditingKeyResult(prev => { const copy = { ...prev }; delete copy[krId]; return copy; });
      await loadObjectives();
    } catch (e) {
      console.error('Error updating key result:', e);
      setError('Failed to update key result. Please try again.');
    }
  }

  return (
    <Stack tokens={{ childrenGap: 24 }} className={styles.goalsOkrsTracker}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Goals OKRs Tracker</Text>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <PrimaryButton text="New Goal" onClick={handleShowNewObjective} />
        </Stack>
      </Stack>
      {loading ? <Spinner label="Loading..." /> : error ? (
        <Stack tokens={{ childrenGap: 8 }}>
          <Text styles={{ root: { color: 'red', fontWeight: 'bold' } }}>{error}</Text>
          <DefaultButton text="Dismiss" onClick={() => setError(undefined)} />
        </Stack>
      ) : (
        <Stack tokens={{ childrenGap: 24 }}>
          {objectives.map(obj => (
            <ObjectiveCard
              key={obj.Id}
              objective={editingObjective[obj.Id!] ? { ...editingObjective[obj.Id!], Id: obj.Id } as IObjective : obj}
              keyResults={keyResults[obj.Id!] || []}
              onAddKeyResult={() => handleShowNewKeyResult(obj.Id!)}
              onEditKeyResult={(kr) => handleEditKeyResult(kr)}
              isEditing={!!editingObjective[obj.Id!]}
              onEdit={() => handleEditObjective(obj)}
              onSave={() => handleSaveObjective(obj.Id!)}
              onCancel={() => handleCancelEditObjective(obj.Id!)}
              onChange={(updates) => handleChangeObjective(obj.Id!, updates)}
              editingKeyResult={editingKeyResult}
              onKeyResultChange={(krId, updates) => handleChangeKeyResult(krId, updates)}
              onKeyResultSave={(krId) => handleSaveKeyResult(krId)}
              onKeyResultCancel={(krId) => handleCancelEditKeyResult(krId)}
            />
          ))}
        </Stack>
      )}
      {showNewObjective && (
        <NewObjectiveForm
          objective={newObjective}
          onChange={updates => setNewObjective(prev => ({ ...prev, ...updates }))}
          onSubmit={handleCreateObjective}
          onCancel={handleCancelNewObjective}
          loading={savingObjective}
          error={error}
        />
      )}
      {showNewKeyResult && (
        <NewKeyResultForm
          keyResult={newKeyResult}
          onChange={updates => setNewKeyResult(prev => ({ ...prev, ...updates }))}
          onSubmit={handleCreateKeyResult}
          onCancel={handleCancelNewKeyResult}
          loading={savingKeyResult}
          error={error}
        />
      )}
    </Stack>
  );
}
