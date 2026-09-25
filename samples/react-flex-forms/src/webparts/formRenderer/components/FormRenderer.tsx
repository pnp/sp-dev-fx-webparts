import {
  Button,
  MessageBar,
  MessageBarBody,
  Spinner,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import * as React from 'react';
import { FormStorageService } from '../../../formDesigner/services/FormStorageService';
import { IFieldDefinition } from '../../../shared/models/IFieldDefinition';
import { IFormDefinition } from '../../../shared/models/IFormDefinition';
import { runOnce } from '../../../shared/runOnce';
import { toUserMessage } from '../../../shared/services/ErrorService';
import { logError } from '../../../shared/services/LoggerService';
import { FormField, formControlId } from './FormField';
import { IFormRendererProps } from './IFormRendererProps';
import { buildSubmissionPayload, FormValues, validateFormValues, ValidationErrors } from './formSubmission';

const useStyles = makeStyles({
  root: { display: 'grid', gap: tokens.spacingVerticalL, maxWidth: '720px' },
  form: { display: 'grid', gap: tokens.spacingVerticalM },
  heading: { margin: 0 }
});

let nextRendererId = 0;

const FormRenderer: React.FC<IFormRendererProps> = ({ sp, formId }) => {
  const styles = useStyles();
  const [instanceId] = React.useState(() => `flex-forms-renderer-${++nextRendererId}`);
  const storage = React.useMemo(() => new FormStorageService(sp), [sp]);
  const [definition, setDefinition] = React.useState<IFormDefinition>();
  const [values, setValues] = React.useState<FormValues>({});
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [loading, setLoading] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState<{ intent: 'success' | 'error'; text: string }>();
  const pending = React.useRef(false);

  React.useEffect(() => {
    let active = true;
    setDefinition(undefined);
    setValues({});
    setErrors({});
    setMessage(undefined);
    if (!formId) return () => { active = false; };

    setLoading(true);
    storage.loadForm(formId, true).then(form => {
      if (!active) return;
      const initialValues: FormValues = {};
      form.fields.forEach(field => {
        if (field.type === 'yesno') initialValues[field.internalName] = false;
      });
      setDefinition(form);
      setValues(initialValues);
    }, (error: unknown) => {
      logError('Load published form', error);
      if (active) setMessage({ intent: 'error', text: toUserMessage(error) });
    }).then(() => {
      if (active) setLoading(false);
    }, (error: unknown) => {
      logError('Finish loading published form', error);
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [formId, storage]);

  const changeValue = (field: IFieldDefinition, value: unknown): void => {
    setValues(current => ({ ...current, [field.internalName]: value }));
    setErrors(current => {
      const next = { ...current };
      delete next[field.internalName];
      return next;
    });
    setMessage(undefined);
  };

  const submit = async (): Promise<void> => {
    if (!definition) return;
    const validation = validateFormValues(definition, values);
    setErrors(validation);
    const firstInvalid = definition.fields.find(field => !!validation[field.internalName]);
    if (firstInvalid) {
      setMessage({ intent: 'error', text: 'Correct the highlighted fields and try again.' });
      window.requestAnimationFrame(() => document.getElementById(formControlId(firstInvalid, instanceId))?.focus());
      return;
    }

    await runOnce(pending, async () => {
      setBusy(true);
      setMessage(undefined);
      try {
        await sp.web.lists.getByTitle(definition.targetListTitle).items.add(buildSubmissionPayload(definition, values));
        setMessage({ intent: 'success', text: 'Response submitted.' });
      } catch (error: unknown) {
        logError('Submit response', error);
        setMessage({ intent: 'error', text: toUserMessage(error) });
      } finally {
        setBusy(false);
      }
    });
  };

  if (!formId) return <MessageBar><MessageBarBody>Configure a published form ID.</MessageBarBody></MessageBar>;
  if (loading) return <Spinner label="Loading form" />;
  if (!definition) return message ? <MessageBar intent={message.intent}><MessageBarBody>{message.text}</MessageBarBody></MessageBar> : null;

  return (
    <section className={styles.root} aria-labelledby={`${instanceId}-heading`}>
      <h2 id={`${instanceId}-heading`} className={styles.heading}>{definition.title}</h2>
      <form className={styles.form} noValidate onSubmit={event => {
        event.preventDefault();
        submit().catch(error => logError('Submit response', error));
      }}>
        {definition.fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={values[field.internalName]}
            error={errors[field.internalName]}
            idPrefix={instanceId}
            onChange={value => changeValue(field, value)}
          />
        ))}
        {message && (
          <div aria-live="polite">
            <MessageBar intent={message.intent}><MessageBarBody>{message.text}</MessageBarBody></MessageBar>
          </div>
        )}
        <Button type="submit" appearance="primary" disabled={busy}>Submit</Button>
        {busy && <Spinner size="tiny" label="Submitting response" />}
      </form>
    </section>
  );
};

export default FormRenderer;
