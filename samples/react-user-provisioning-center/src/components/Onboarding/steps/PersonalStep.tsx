import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  Combobox,
  Dropdown,
  Field,
  Input,
  Option,
  Persona,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { personalSchema } from '../../../validators/wizardSchemas';
import { vmsg } from '../../../validators/messageMap';
import { useWizard } from '../../../contexts/WizardContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useActiveTemplates, useLicenseOptions } from '../../../hooks/useReferenceData';
import { useSaveOnUnmount } from '../../../hooks/useSaveOnUnmount';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { resizeImageToDataUrl } from '../../../services/util/image';
import { resolveTemplateFields, type IResolvedTemplateFields } from '../../../services/util/resolveTemplateFields';
import type { IPersonalInfo, ITemplateListItem } from '../../../models';
import type { IDirectoryUserHit } from '../../../services/users/UserService';
import { formatString } from '../../Shared/format';
import { useAppToast } from '../../Shared/AppToaster';
import { StepShell } from '../StepShell';
import { WizardFooter } from '../WizardFooter';

const useStyles = makeStyles({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  pair: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalM,
    '@container (max-width: 560px)': {
      gridTemplateColumns: '1fr'
    }
  },
  photoRow: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalM
  },
  photoActions: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS,
    alignItems: 'flex-start'
  },
  hiddenInput: {
    display: 'none'
  }
});

export const PersonalStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();
  const services = useServices();
  const templates = useActiveTemplates();
  const licenseOptions = useLicenseOptions();
  const toast = useAppToast();
  const [checking, setChecking] = React.useState<boolean>(false);
  const [templateName, setTemplateName] = React.useState<string>('');
  const displayNameTouched = React.useRef<boolean>(!!state.draft.personal.displayName);

  const [cloneQuery, setCloneQuery] = React.useState<string>(state.draft.cloneSourceDisplayName ?? '');
  const debouncedCloneQuery: string = useDebouncedValue(cloneQuery);
  const cloneHits = useQuery(
    ['graph', 'cloneSourceSearch', debouncedCloneQuery],
    ({ signal }) => services.users.searchUsers(debouncedCloneQuery, signal),
    { enabled: debouncedCloneQuery.trim().length >= 2, keepPreviousData: true }
  );

  const applyTemplate = (item: ITemplateListItem | undefined): void => {
    setTemplateName(item?.title ?? '');
    if (!item) {
      return;
    }
    const resolved: IResolvedTemplateFields = resolveTemplateFields(item.template, licenseOptions.data ?? []);
    dispatch({
      type: 'applyTemplate',
      department: resolved.department,
      usageLocation: resolved.usageLocation,
      licenses: resolved.licenses,
      access: resolved.access,
      expirationReviewDays: resolved.expirationReviewDays,
      approverGroupId: item.template.approverGroupId
    });
    toast(formatString(strings.TemplateAppliedToast, item.title));
  };

  const form = useForm<IPersonalInfo>({
    resolver: yupResolver(personalSchema),
    defaultValues: state.draft.personal,
    mode: 'onBlur'
  });
  const { register, handleSubmit, setError, setValue, watch, getValues, formState, reset } = form;
  const errors = formState.errors;

  const seeded = React.useRef(false);
  React.useEffect(() => {
    if (seeded.current) {
      return;
    }
    seeded.current = true;
    reset(state.draft.personal);
    displayNameTouched.current = !!state.draft.personal.displayName;
  }, [reset, state.draft.personal]);

  useSaveOnUnmount(() => {
    dispatch({ type: 'savePersonal', personal: getValues() });
  });

  const firstName: string = watch('firstName');
  const lastName: string = watch('lastName');
  React.useEffect(() => {
    if (!displayNameTouched.current) {
      setValue('displayName', [firstName, lastName].filter(Boolean).join(' '));
    }
  }, [firstName, lastName, setValue]);

  const photoDataUrl: string | undefined = watch('photoDataUrl');
  const [photoError, setPhotoError] = React.useState<string | undefined>(undefined);
  const [photoBusy, setPhotoBusy] = React.useState<boolean>(false);
  const photoInputRef = React.useRef<HTMLInputElement>(null);

  const onPhotoChosen = async (file: File): Promise<void> => {
    setPhotoError(undefined);
    setPhotoBusy(true);
    try {
      const dataUrl: string = await resizeImageToDataUrl(file);
      setValue('photoDataUrl', dataUrl);
    } catch {
      setPhotoError(strings.PhotoUploadError);
    } finally {
      setPhotoBusy(false);
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
    }
  };

  const onValid = async (values: IPersonalInfo): Promise<void> => {
    setChecking(true);
    try {
      const taken: boolean = await services.users.isEmployeeIdTaken(values.employeeId);
      if (taken) {
        setError('employeeId', { type: 'validate', message: 'duplicateEmployeeId' });
        return;
      }
      dispatch({ type: 'savePersonal', personal: values });
      dispatch({ type: 'next' });
    } catch {

      setError('employeeId', { type: 'validate', message: strings.ErrorGenericTitle });
    } finally {
      setChecking(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onValid) as unknown as React.FormEventHandler<HTMLFormElement>}
      noValidate
    >
      <StepShell title={strings.WizardStepPersonal} description={strings.WizardStepDescPersonal}>
        <div className={styles.stack}>
          {(templates.data ?? []).length > 0 ? (
            <Field label={strings.StartFromTemplateLabel}>
              <Dropdown
                value={templateName || strings.StartFromBlank}
                selectedOptions={templateName ? [templateName] : ['']}
                onOptionSelect={(_, data) =>
                  applyTemplate(
                    (templates.data ?? []).filter((t) => t.title === data.optionValue)[0]
                  )
                }
              >
                <Option value="" text={strings.StartFromBlank}>
                  {strings.StartFromBlank}
                </Option>
                {(templates.data ?? []).map((t) => (
                  <Option key={t.itemId} value={t.title} text={t.title}>
                    {t.title}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          ) : undefined}
          <Field label={strings.CloneFromLabel} hint={strings.CloneFromHint}>
            <Combobox
              placeholder={strings.ManagerSearchPlaceholder}
              value={cloneQuery}
              freeform
              onChange={(ev) => {
                setCloneQuery(ev.target.value);
                if (state.draft.cloneSourceUserId) {
                  dispatch({ type: 'setCloneSource', userId: undefined, displayName: undefined });
                }
              }}
              onOptionSelect={(_, data) => {
                const hit: IDirectoryUserHit | undefined = (cloneHits.data ?? []).filter(
                  (h) => h.id === data.optionValue
                )[0];
                if (hit) {
                  setCloneQuery(hit.displayName);
                  dispatch({ type: 'setCloneSource', userId: hit.id, displayName: hit.displayName });
                }
              }}
            >
              {(cloneHits.data ?? []).map((hit) => (
                <Option key={hit.id} value={hit.id} text={hit.displayName}>
                  <Persona
                    name={hit.displayName}
                    secondaryText={hit.jobTitle || hit.userPrincipalName}
                    avatar={{ color: 'colorful', image: { src: services.photoUrl(hit.userPrincipalName) }, 'aria-hidden': true }}
                    size="medium"
                  />
                </Option>
              ))}
            </Combobox>
          </Field>
          <div className={styles.pair}>
            <Field
              label={strings.FirstNameLabel}
              required
              validationMessage={vmsg(errors.firstName?.message)}
            >
              <Input {...register('firstName')} />
            </Field>
            <Field
              label={strings.LastNameLabel}
              required
              validationMessage={vmsg(errors.lastName?.message)}
            >
              <Input {...register('lastName')} />
            </Field>
          </div>
          <Field
            label={strings.DisplayNameLabel}
            required
            validationMessage={vmsg(errors.displayName?.message)}
          >
            <Input
              {...register('displayName', {
                onChange: () => {
                  displayNameTouched.current = true;
                }
              })}
            />
          </Field>
          <Field
            label={strings.EmployeeIdLabel}
            required
            validationMessage={vmsg(errors.employeeId?.message)}
          >
            <Input {...register('employeeId')} />
          </Field>
          <div className={styles.pair}>
            <Field
              label={strings.MobilePhoneLabel}
              validationMessage={vmsg(errors.mobilePhone?.message)}
            >
              <Input type="tel" {...register('mobilePhone')} />
            </Field>
            <Field
              label={strings.PersonalEmailLabel}
              validationMessage={vmsg(errors.personalEmail?.message)}
            >
              <Input type="email" {...register('personalEmail')} />
            </Field>
          </div>
          <Field label={strings.PhotoLabel} hint={strings.PhotoHint} validationMessage={photoError}>
            <div className={styles.photoRow}>
              <Avatar
                name={[firstName, lastName].filter(Boolean).join(' ')}
                image={photoDataUrl ? { src: photoDataUrl } : undefined}
                color="colorful"
                size={64}
              />
              <div className={styles.photoActions}>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(ev) => {
                    const file: File | undefined = ev.target.files?.[0];
                    if (file) {
                      void onPhotoChosen(file);
                    }
                  }}
                />
                <Button
                  appearance="secondary"
                  size="small"
                  disabled={photoBusy}
                  onClick={() => photoInputRef.current?.click()}
                >
                  {photoDataUrl ? strings.ChangePhotoLabel : strings.ChoosePhotoLabel}
                </Button>
                {photoDataUrl ? (
                  <Button
                    appearance="subtle"
                    size="small"
                    onClick={() => setValue('photoDataUrl', undefined)}
                  >
                    {strings.RemovePhotoLabel}
                  </Button>
                ) : undefined}
              </div>
            </div>
          </Field>
        </div>
      </StepShell>
      <WizardFooter nextIsSubmit nextLoading={checking} />
    </form>
  );
};
