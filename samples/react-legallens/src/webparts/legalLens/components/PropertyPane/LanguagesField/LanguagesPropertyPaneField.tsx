import * as React from 'react';
import {
  TextField, PrimaryButton, DefaultButton, IconButton,
  MessageBar, MessageBarType, Stack, Label,
  DetailsList, IColumn, SelectionMode
} from '@fluentui/react';
import { ILang } from '../../../constants/languages';
import styles from './PropertyPane.module.scss';

export interface ILanguagesPropertyPaneFieldProps {
  langs: ILang[];
  onChange: (langs: ILang[]) => void;
}

const EMPTY_FORM = {
  code: '', name: '', label: '', inputPlaceholder: '',
  example1: '', example2: '', example3: ''
};

type FormKey = keyof typeof EMPTY_FORM;

export const LanguagesPropertyPaneField: React.FC<ILanguagesPropertyPaneFieldProps> = ({ langs, onChange }) => {
  const [localLangs, setLocalLangs] = React.useState<ILang[]>(langs);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [error, setError] = React.useState('');

  const setField = (key: FormKey, value: string): void => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleDelete = (code: string): void => {
    const updated = localLangs.filter(l => l.code !== code);
    setLocalLangs(updated);
    onChange(updated);
  };

  const validate = (code: string): string | null => {
    if (!code) return 'Language code is required.';
    if (!/^[a-z]{2,5}$/.test(code)) return 'Code must be 2–5 lowercase letters (e.g. fr, pt, zh).';
    if (localLangs.some(l => l.code === code)) return `Code "${code}" already exists.`;
    if (!form.name.trim()) return 'English name is required.';
    if (!form.label.trim()) return 'Display label is required.';
    return null;
  };

  const handleSave = (): void => {
    const code = form.code.trim().toLowerCase();
    const validationError = validate(code);
    if (validationError) { setError(validationError); return; }

    const newLang: ILang = {
      code,
      name: form.name.trim(),
      label: form.label.trim(),
      inputPlaceholder: form.inputPlaceholder.trim() || 'Type your question...',
      examples: [form.example1.trim(), form.example2.trim(), form.example3.trim()].filter(Boolean)
    };

    const updated = [...localLangs, newLang];
    setLocalLangs(updated);
    onChange(updated);
    setForm(EMPTY_FORM);
    setShowForm(false);
    setError('');
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setError('');
  };

  const columns: IColumn[] = [
    {
      key: 'code', name: 'Code', minWidth: 40, maxWidth: 50,
      onRender: (l: ILang) => <span className={styles.code}>{l.code}</span>
    },
    {
      key: 'label', name: 'Label', minWidth: 60, maxWidth: 120,
      onRender: (l: ILang) => <span>{l.label}</span>
    },
    {
      key: 'name', name: 'English Name', minWidth: 70, maxWidth: 100,
      onRender: (l: ILang) => <span>{l.name}</span>
    },
    {
      key: 'delete', name: '', minWidth: 32, maxWidth: 32,
      onRender: (l: ILang) => (
        <IconButton
          iconProps={{ iconName: 'Delete' }}
          disabled={l.code === 'en'}
          title={l.code === 'en' ? 'English cannot be removed' : `Remove ${l.name}`}
          onClick={() => handleDelete(l.code)}
          styles={{ root: { height: 24, width: 24 }, icon: { fontSize: 13 } }}
        />
      )
    }
  ];

  return (
    <div className={styles.wrap}>
      <DetailsList
        items={localLangs}
        columns={columns}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
        compact={true}
        getKey={(l: ILang) => l.code}
      />

      {!showForm && (
        <PrimaryButton
          text="+ Add Language"
          onClick={() => setShowForm(true)}
          styles={{ root: { marginTop: 10 } }}
        />
      )}

      {showForm && (
        <div className={styles.form}>
          <Label className={styles.sectionTitle}>New Language</Label>
          <TextField label="Code *" value={form.code} placeholder="fr" onChange={(_, v) => setField('code', v || '')} />
          <TextField label="English Name *" value={form.name} placeholder="French" onChange={(_, v) => setField('name', v || '')} />
          <TextField label="Display Label *" value={form.label} placeholder="Français" onChange={(_, v) => setField('label', v || '')} />
          <TextField label="Input Placeholder" value={form.inputPlaceholder} placeholder="Posez votre question..." onChange={(_, v) => setField('inputPlaceholder', v || '')} />

          <Label className={styles.sectionTitle} style={{ marginTop: 8 }}>Example Questions</Label>
          <TextField label="Example 1" value={form.example1} placeholder="What is the liability cap?" onChange={(_, v) => setField('example1', v || '')} />
          <TextField label="Example 2" value={form.example2} placeholder="When does this contract expire?" onChange={(_, v) => setField('example2', v || '')} />
          <TextField label="Example 3" value={form.example3} placeholder="What are the termination conditions?" onChange={(_, v) => setField('example3', v || '')} />

          {error && (
            <MessageBar messageBarType={MessageBarType.error} styles={{ root: { marginTop: 8 } }}>
              {error}
            </MessageBar>
          )}

          <Stack horizontal tokens={{ childrenGap: 6 }} styles={{ root: { marginTop: 10 } }}>
            <PrimaryButton text="Add" onClick={handleSave} />
            <DefaultButton text="Cancel" onClick={handleCancel} />
          </Stack>
        </div>
      )}
    </div>
  );
};
