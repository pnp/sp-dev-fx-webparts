import * as React from 'react';
import { useState, useCallback } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { PrimaryButton, DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { IGlossaryItem, GlossaryStatus } from '../models/IGlossaryItem';
import { GlossaryService } from '../services/GlossaryService';
import './ModernGlossary.scss';

export interface IGlossaryManagerPanelProps {
  isOpen: boolean;
  onDismiss: () => void;
  service: GlossaryService;
  items: IGlossaryItem[];
  onSaved: () => void;
}

type EditableItem = Omit<IGlossaryItem, 'id'> & { id: number | null };

const EMPTY_ITEM: EditableItem = {
  id: null,
  title: '',
  description: '',
  applicationUrl: '',
  applicationUrlLabel: '',
  detailsUrl: '',
  detailsUrlLabel: '',
  alphabetLetter: 'A',
  status: GlossaryStatus.Active
};

const LETTER_OPTIONS: IDropdownOption[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .split('')
  .map((l) => ({ key: l, text: l }));

export const GlossaryManagerPanel: React.FC<IGlossaryManagerPanelProps> = ({
  isOpen,
  onDismiss,
  service,
  items,
  onSaved
}) => {
  const [editing, setEditing] = useState<EditableItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');

  const startAdd = useCallback(() => {
    setError('');
    setEditing({ ...EMPTY_ITEM });
  }, []);

  const startEdit = useCallback((item: IGlossaryItem) => {
    setError('');
    setEditing({ ...item });
  }, []);

  const cancelEdit = useCallback(() => {
    setEditing(null);
    setError('');
  }, []);

  const save = useCallback(async () => {
    if (!editing || !editing.title.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: editing.title.trim(),
        description: editing.description,
        applicationUrl: editing.applicationUrl || null,
        applicationUrlLabel: editing.applicationUrlLabel || null,
        detailsUrl: editing.detailsUrl || null,
        detailsUrlLabel: editing.detailsUrlLabel || null,
        alphabetLetter: editing.alphabetLetter,
        status: editing.status
      };
      if (editing.id === null) {
        await service.createItem(payload);
      } else {
        await service.updateItem(editing.id, payload);
      }
      setEditing(null);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item.');
    } finally {
      setSaving(false);
    }
  }, [editing, service, onSaved]);

  const remove = useCallback(async (id: number) => {
    // eslint-disable-next-line no-alert
    if (!confirm('Delete this glossary item? This cannot be undone.')) {
      return;
    }
    setSaving(true);
    setError('');
    try {
      await service.deleteItem(id);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item.');
    } finally {
      setSaving(false);
    }
  }, [service, onSaved]);

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.medium}
      headerText="Manage Glossary Items"
      closeButtonAriaLabel="Close"
    >
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError('')}>
          {error}
        </MessageBar>
      )}

      {editing ? (
        <div className="managerForm">
          <TextField
            label="Title"
            required
            value={editing.title}
            onChange={(_, v) => setEditing({ ...editing, title: v ?? '' })}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={editing.description}
            onChange={(_, v) => setEditing({ ...editing, description: v ?? '' })}
          />
          <TextField
            label="Application URL"
            value={editing.applicationUrl ?? ''}
            onChange={(_, v) => setEditing({ ...editing, applicationUrl: v ?? '' })}
          />
          <TextField
            label="Application URL Label"
            value={editing.applicationUrlLabel ?? ''}
            onChange={(_, v) => setEditing({ ...editing, applicationUrlLabel: v ?? '' })}
          />
          <TextField
            label="Details URL"
            value={editing.detailsUrl ?? ''}
            onChange={(_, v) => setEditing({ ...editing, detailsUrl: v ?? '' })}
          />
          <TextField
            label="Details URL Label"
            value={editing.detailsUrlLabel ?? ''}
            onChange={(_, v) => setEditing({ ...editing, detailsUrlLabel: v ?? '' })}
          />
          <Dropdown
            label="Alphabet Letter"
            selectedKey={editing.alphabetLetter}
            options={LETTER_OPTIONS}
            onChange={(_, opt) => opt && setEditing({ ...editing, alphabetLetter: opt.key as string })}
          />
          <Toggle
            label="Status"
            checked={editing.status === GlossaryStatus.Active}
            onText="Active"
            offText="Inactive"
            onChange={(_, checked) =>
              setEditing({
                ...editing,
                status: checked ? GlossaryStatus.Active : GlossaryStatus.Inactive
              })
            }
          />

          <div className="managerFormActions">
            <PrimaryButton text={saving ? 'Saving…' : 'Save'} onClick={save} disabled={saving} />
            <DefaultButton text="Cancel" onClick={cancelEdit} disabled={saving} />
          </div>
        </div>
      ) : (
        <>
          <PrimaryButton
            text="Add Item"
            iconProps={{ iconName: 'Add' }}
            onClick={startAdd}
            className="managerAddButton"
          />

          {saving && <Spinner label="Working…" />}

          <div className="managerItemList">
            {items.map((item) => (
              <div key={item.id} className="managerItemRow">
                <div className="managerItemInfo">
                  <span className="managerItemTitle">{item.title}</span>
                  <span
                    className={
                      item.status === GlossaryStatus.Active
                        ? 'managerBadge managerBadgeActive'
                        : 'managerBadge managerBadgeInactive'
                    }
                  >
                    {item.status}
                  </span>
                  <span className="managerItemLetter">{item.alphabetLetter}</span>
                </div>
                <div className="managerItemActions">
                  <IconButton
                    iconProps={{ iconName: 'Edit' }}
                    title="Edit"
                    ariaLabel="Edit"
                    onClick={() => startEdit(item)}
                  />
                  <IconButton
                    iconProps={{ iconName: 'Delete' }}
                    title="Delete"
                    ariaLabel="Delete"
                    onClick={() => remove(item.id)}
                  />
                </div>
              </div>
            ))}
            {items.length === 0 && <p>No glossary items yet. Click &quot;Add Item&quot; to create one.</p>}
          </div>
        </>
      )}
    </Panel>
  );
};