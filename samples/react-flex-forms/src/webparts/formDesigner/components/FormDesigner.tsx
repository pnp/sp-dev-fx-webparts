import {
  Button,
  Checkbox,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Spinner,
  Textarea,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import * as React from 'react';
import { FormStorageService } from '../../../formDesigner/services/FormStorageService';
import { fieldTypes, FieldType, IFieldDefinition } from '../../../shared/models/IFieldDefinition';
import { IFormDefinition, parseFormDefinition } from '../../../shared/models/IFormDefinition';
import { runOnce } from '../../../shared/runOnce';
import { toUserMessage } from '../../../shared/services/ErrorService';
import { logError } from '../../../shared/services/LoggerService';
import { IFormDesignerProps } from './IFormDesignerProps';
import { addField, createEmptyDefinition, moveField, removeField, updateField } from './formDefinitionState';

const useStyles = makeStyles({
  root: { display: 'grid', gap: tokens.spacingVerticalL, maxWidth: '800px' },
  row: { display: 'grid', gap: tokens.spacingHorizontalM, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' },
  palette: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  fields: { display: 'grid', gap: tokens.spacingVerticalM, padding: 0, listStyleType: 'none' },
  card: {
    display: 'grid',
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium
  },
  actions: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  heading: { margin: 0 }
});

const typeLabels: Record<FieldType, string> = {
  text: 'Text',
  multiline: 'Multiline text',
  number: 'Number',
  choice: 'Choice',
  date: 'Date',
  yesno: 'Yes or no'
};

let nextDesignerId = 0;

const FormDesigner: React.FC<IFormDesignerProps> = ({ sp, selectedFormId }) => {
  const styles = useStyles();
  const [instanceId] = React.useState(() => `flex-forms-designer-${++nextDesignerId}`);
  const storage = React.useMemo(() => new FormStorageService(sp), [sp]);
  const [definition, setDefinition] = React.useState<IFormDefinition>(createEmptyDefinition);
  const [busy, setBusy] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ intent: 'success' | 'error' | 'info'; text: string }>();
  const [focusId, setFocusId] = React.useState<string>();
  const addTextButton = React.useRef<HTMLButtonElement>(null);
  const pending = React.useRef(false);

  React.useEffect(() => {
    let active = true;
    setMessage(undefined);
    if (!selectedFormId) {
      setDefinition(createEmptyDefinition());
      setLoading(false);
      return () => { active = false; };
    }

    setLoading(true);
    storage.loadForm(selectedFormId).then(form => {
      if (active) setDefinition(form);
    }, (error: unknown) => {
      logError('Load form', error);
      if (active) setMessage({ intent: 'error', text: toUserMessage(error) });
    }).then(() => {
      if (active) setLoading(false);
    }, (error: unknown) => {
      logError('Finish loading form', error);
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [selectedFormId, storage]);

  React.useEffect(() => {
    if (focusId) document.getElementById(`${instanceId}-label-${focusId}`)?.focus();
  }, [focusId, definition.fields.length, instanceId]);

  const changeDefinition = (update: Partial<IFormDefinition>): void => {
    setDefinition(current => ({ ...current, ...update, published: false }));
    setMessage(undefined);
  };

  const onAdd = (type: FieldType): void => {
    setDefinition(current => {
      const next = addField(current, type);
      setFocusId(next.fields[next.fields.length - 1].id);
      return next;
    });
  };

  const onFieldChange = (id: string, update: Partial<IFieldDefinition>): void => {
    setDefinition(current => updateField(current, id, update));
    setMessage(undefined);
  };

  const onRemove = (id: string): void => {
    setDefinition(current => removeField(current, id));
    setFocusId(undefined);
    window.requestAnimationFrame(() => addTextButton.current?.focus());
  };

  const persist = async (publish: boolean): Promise<void> => {
    await runOnce(pending, async () => {
      setMessage(undefined);
      setBusy(true);
      try {
        const valid = parseFormDefinition(definition);
        if (publish && valid.fields.length === 0) throw new Error('Add at least one field before publishing.');
        const saved = publish ? await storage.publishForm(valid) : await storage.saveForm({ ...valid, published: false });
        setDefinition(saved);
        setMessage({ intent: 'success', text: publish ? 'Form published.' : 'Draft saved.' });
      } catch (error: unknown) {
        logError(publish ? 'Publish form' : 'Save form', error);
        setMessage({
          intent: 'error',
          text: error instanceof Error && error.message === 'Add at least one field before publishing.'
            ? error.message
            : toUserMessage(error)
        });
      } finally {
        setBusy(false);
      }
    });
  };

  if (loading) return <Spinner label="Loading form" />;

  return (
    <section className={styles.root} aria-labelledby={`${instanceId}-heading`}>
      <h2 id={`${instanceId}-heading`} className={styles.heading}>Form designer</h2>
      <div className={styles.row}>
        <Field label="Form title" required>
          <Input value={definition.title} onChange={(_, data) => changeDefinition({ title: data.value })} />
        </Field>
        <Field label="Target SharePoint list" required hint="The list is created when the form is published if it does not exist.">
          <Input value={definition.targetListTitle} onChange={(_, data) => changeDefinition({ targetListTitle: data.value })} />
        </Field>
      </div>

      <section aria-labelledby={`${instanceId}-field-types`}>
        <h3 id={`${instanceId}-field-types`}>Add a field</h3>
        <div className={styles.palette}>
          {fieldTypes.map((type, index) => (
            <Button key={type} ref={index === 0 ? addTextButton : undefined} onClick={() => onAdd(type)}>
              Add {typeLabels[type].toLowerCase()}
            </Button>
          ))}
        </div>
      </section>

      <section aria-labelledby={`${instanceId}-fields-heading`}>
        <h3 id={`${instanceId}-fields-heading`}>Fields</h3>
        {definition.fields.length === 0 ? <p>No fields added.</p> : (
          <ol className={styles.fields}>
            {definition.fields.map((field, index) => (
              <li key={field.id} className={styles.card}>
                <h4 className={styles.heading}>{index + 1}. {typeLabels[field.type]}</h4>
                <div className={styles.row}>
                  <Field label="Label" required>
                    <Input
                      id={`${instanceId}-label-${field.id}`}
                      value={field.label}
                      onChange={(_, data) => onFieldChange(field.id, { label: data.value })}
                    />
                  </Field>
                  <Field label="Internal name" required hint="Letters, numbers, and underscores; start with a letter or underscore.">
                    <Input value={field.internalName} onChange={(_, data) => onFieldChange(field.id, { internalName: data.value })} />
                  </Field>
                </div>
                <Field label="Help text">
                  <Textarea value={field.helpText ?? ''} onChange={(_, data) => onFieldChange(field.id, { helpText: data.value || undefined })} />
                </Field>
                {field.type === 'choice' && (
                  <Field label="Choices" required hint="Separate choices with commas.">
                    <Input
                      value={field.options?.join(', ') ?? ''}
                      onChange={(_, data) => onFieldChange(field.id, {
                        options: data.value.split(',').map(value => value.trim()).filter(Boolean)
                      })}
                    />
                  </Field>
                )}
                <Checkbox
                  label="Required"
                  checked={field.required}
                  onChange={(_, data) => onFieldChange(field.id, { required: !!data.checked })}
                />
                <div className={styles.actions}>
                  <Button aria-label={`Move ${field.label} up`} disabled={index === 0} onClick={() => setDefinition(current => moveField(current, field.id, -1))}>Move up</Button>
                  <Button aria-label={`Move ${field.label} down`} disabled={index === definition.fields.length - 1} onClick={() => setDefinition(current => moveField(current, field.id, 1))}>Move down</Button>
                  <Button aria-label={`Remove ${field.label}`} onClick={() => onRemove(field.id)}>Remove</Button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {message && (
        <div aria-live="polite">
          <MessageBar intent={message.intent}><MessageBarBody>{message.text}</MessageBarBody></MessageBar>
        </div>
      )}
      <div className={styles.actions}>
        <Button disabled={busy} onClick={() => { persist(false).catch(error => logError('Save form', error)); }}>Save draft</Button>
        <Button appearance="primary" disabled={busy} onClick={() => { persist(true).catch(error => logError('Publish form', error)); }}>Publish</Button>
        {busy && <Spinner size="tiny" label="Saving form" />}
      </div>
    </section>
  );
};

export default FormDesigner;
