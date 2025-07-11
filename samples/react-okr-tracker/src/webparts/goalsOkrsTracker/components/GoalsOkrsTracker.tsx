import * as React from 'react';
import styles from './GoalsOkrsTracker.module.scss';
import type { IGoalsOkrsTrackerProps } from './IGoalsOkrsTrackerProps';
import { ObjectivesService, IObjective } from '../services/ObjectivesService';
import { KeyResultsService, IKeyResult } from '../services/KeyResultsService';
import { ObjectiveCard, NewObjectiveForm, KeyResultRow } from './index';
import { Stack, PrimaryButton, Spinner, Text } from '@fluentui/react';

export default function GoalsOkrsTracker(props: IGoalsOkrsTrackerProps) {
  const objectivesService = new ObjectivesService(props.context);
  const keyResultsService = new KeyResultsService(props.context);
  const [objectives, setObjectives] = React.useState<IObjective[]>([]);
  const [keyResults, setKeyResults] = React.useState<Record<number, IKeyResult[]>>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>();
  const [showNewObjective, setShowNewObjective] = React.useState(false);
  const [newObjective, setNewObjective] = React.useState<Partial<IObjective>>({});
  const [savingObjective, setSavingObjective] = React.useState(false);

  React.useEffect(() => {
    loadObjectives();
  }, []);

  async function loadObjectives() {
    setLoading(true);
    setError(undefined);
    try {
      const objs = await objectivesService.getObjectives();
      setObjectives(objs);
      // Fetch key results for each objective
      const krMap: Record<number, IKeyResult[]> = {};
      await Promise.all(
        objs.map(async (obj) => {
          const krs = await keyResultsService.getKeyResults(obj.Id!);
          krMap[obj.Id!] = krs;
        })
      );
      setKeyResults(krMap);
    } catch (e) {
      setError('Failed to load objectives or key results.');
    } finally {
      setLoading(false);
    }
  }

  function handleShowNewObjective() {
    setShowNewObjective(true);
    setNewObjective({});
  }

  async function handleCreateObjective() {
    setSavingObjective(true);
    setError(undefined);
    try {
      await objectivesService.createObjective(newObjective as IObjective);
      setShowNewObjective(false);
      await loadObjectives();
    } catch (e) {
      setError('Failed to create objective.');
    } finally {
      setSavingObjective(false);
    }
  }

  function handleCancelNewObjective() {
    setShowNewObjective(false);
    setNewObjective({});
  }

  // Inline editing for Key Results (simplified for demo)
  const [editingKeyResult, setEditingKeyResult] = React.useState<{ [krId: number]: Partial<IKeyResult> }>({});

  function handleEditKeyResult(kr: IKeyResult) {
    setEditingKeyResult(prev => ({ ...prev, [kr.Id!]: { ...kr } }));
  }
  function handleChangeKeyResult(krId: number, updates: Partial<IKeyResult>) {
    setEditingKeyResult(prev => ({ ...prev, [krId]: { ...prev[krId], ...updates } }));
  }
  async function handleSaveKeyResult(krId: number) {
    try {
      await keyResultsService.updateKeyResult(krId, editingKeyResult[krId]);
      setEditingKeyResult(prev => { const copy = { ...prev }; delete copy[krId]; return copy; });
      await loadObjectives();
    } catch {
      setError('Failed to update key result.');
    }
  }

  return (
    <Stack tokens={{ childrenGap: 24 }} className={styles.goalsOkrsTracker}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Goals OKRs Tracker</Text>
        <PrimaryButton text="New Goal" onClick={handleShowNewObjective} />
      </Stack>
      {loading ? <Spinner label="Loading..." /> : error ? <Text styles={{ root: { color: 'red' } }}>{error}</Text> : (
        <Stack tokens={{ childrenGap: 24 }}>
          {objectives.map(obj => (
            <ObjectiveCard
              key={obj.Id}
              objective={obj}
              keyResults={keyResults[obj.Id!] || []}
              onAddKeyResult={() => { }}
              onEditKeyResult={(kr) => handleEditKeyResult(kr)}
            >
              {(keyResults[obj.Id!] || []).map(kr => (
                <KeyResultRow
                  key={kr.Id}
                  keyResult={editingKeyResult[kr.Id!] ? { ...editingKeyResult[kr.Id!], Id: kr.Id } as IKeyResult : kr}
                  isEditing={!!editingKeyResult[kr.Id!]}
                  onChange={updates => handleChangeKeyResult(kr.Id!, updates)}
                  onSave={() => handleSaveKeyResult(kr.Id!)}
                  onEdit={() => handleEditKeyResult(kr)}
                />
              ))}
            </ObjectiveCard>
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
    </Stack>
  );
}
