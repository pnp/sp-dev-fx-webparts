import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Combobox,
  Field,
  Input,
  Option,
  Persona,
  Radio,
  RadioGroup,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { employmentSchema } from '../../../validators/wizardSchemas';
import { vmsg } from '../../../validators/messageMap';
import { useWizard } from '../../../contexts/WizardContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useSaveOnUnmount } from '../../../hooks/useSaveOnUnmount';
import { USAGE_LOCATIONS } from '../../../constants/usageLocations';
import type { IEmploymentInfo } from '../../../models';
import type { IDirectoryUserHit } from '../../../services/users/UserService';
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
  narrow: {
    maxWidth: '240px'
  },
  selectedPerson: {
    paddingTop: tokens.spacingVerticalS
  }
});

export const EmploymentStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();
  const services = useServices();

  const form = useForm<IEmploymentInfo>({
    resolver: yupResolver(employmentSchema),
    defaultValues: state.draft.employment,
    mode: 'onBlur'
  });
  const { register, handleSubmit, setValue, watch, getValues, formState, reset } = form;
  const errors = formState.errors;

  const seeded = React.useRef(false);
  React.useEffect(() => {
    if (seeded.current) {
      return;
    }
    seeded.current = true;
    reset(state.draft.employment);
  }, [reset, state.draft.employment]);

  useSaveOnUnmount(() => {
    dispatch({ type: 'saveEmployment', employment: getValues() });
  });

  const [managerQuery, setManagerQuery] = React.useState<string>(
    state.draft.employment.managerDisplayName ?? ''
  );
  const debouncedQuery: string = useDebouncedValue(managerQuery);
  const managerHits = useQuery(
    ['graph', 'managerSearch', debouncedQuery],
    ({ signal }) => services.users.searchUsers(debouncedQuery, signal),
    { enabled: debouncedQuery.trim().length >= 2, keepPreviousData: true }
  );

  const employeeType: string = watch('employeeType');
  const managerDisplayName: string | undefined = watch('managerDisplayName');
  const managerUpn: string | undefined = watch('managerUpn');
  const country: string | undefined = watch('country');
  const selectedCountry = USAGE_LOCATIONS.filter((l) => l.code === country)[0];

  const onValid = (values: IEmploymentInfo): void => {
    dispatch({ type: 'saveEmployment', employment: values });
    dispatch({ type: 'next' });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid) as unknown as React.FormEventHandler<HTMLFormElement>}
      noValidate
    >
      <StepShell
        title={strings.WizardStepEmployment}
        description={strings.WizardStepDescEmployment}
      >
        <div className={styles.stack}>
          <div className={styles.pair}>
            <Field
              label={strings.JobTitleLabel}
              required
              validationMessage={vmsg(errors.jobTitle?.message)}
            >
              <Input {...register('jobTitle')} />
            </Field>
            <Field
              label={strings.DepartmentLabel}
              required
              validationMessage={vmsg(errors.department?.message)}
            >
              <Input {...register('department')} />
            </Field>
          </div>
          <div className={styles.pair}>
            <Field
              label={strings.CompanyLabel}
              validationMessage={vmsg(errors.companyName?.message)}
            >
              <Input {...register('companyName')} />
            </Field>
            <Field
              label={strings.OfficeLabel}
              validationMessage={vmsg(errors.officeLocation?.message)}
            >
              <Input {...register('officeLocation')} />
            </Field>
          </div>
          <Field
            label={strings.CountryLabel}
            hint={strings.CountryHint}
            validationMessage={vmsg(errors.country?.message)}
            className={styles.narrow}
          >
            <Combobox
              value={selectedCountry ? `${selectedCountry.name} (${selectedCountry.code})` : ''}
              onOptionSelect={(_, data) => setValue('country', data.optionValue ?? '')}
            >
              {USAGE_LOCATIONS.map((location) => (
                <Option key={location.code} value={location.code} text={location.name}>
                  {location.name} ({location.code})
                </Option>
              ))}
            </Combobox>
          </Field>
          <Field label={strings.ManagerLabel}>
          <Combobox
            placeholder={strings.ManagerSearchPlaceholder}
            value={managerQuery}
            freeform
            onChange={(ev) => {
              setManagerQuery(ev.target.value);

              setValue('managerId', undefined);
              setValue('managerDisplayName', undefined);
              setValue('managerUpn', undefined);
            }}
            onOptionSelect={(_, data) => {
              const hit: IDirectoryUserHit | undefined = (managerHits.data ?? []).filter(
                (h) => h.id === data.optionValue
              )[0];
              if (hit) {
                setManagerQuery(hit.displayName);
                setValue('managerId', hit.id);
                setValue('managerDisplayName', hit.displayName);
                setValue('managerUpn', hit.userPrincipalName);
              }
            }}
          >
            {(managerHits.data ?? []).map((hit) => (
              <Option key={hit.id} value={hit.id} text={hit.displayName}>
                <Persona
                  name={hit.displayName}
                  secondaryText={hit.jobTitle || hit.userPrincipalName}
                  avatar={{
                    color: 'colorful',
                    image: { src: services.photoUrl(hit.userPrincipalName) },
                    'aria-hidden': true
                  }}
                  size="medium"
                />
              </Option>
            ))}
          </Combobox>
          {managerDisplayName ? (
            <div className={styles.selectedPerson}>
              <Persona
                name={managerDisplayName}
                secondaryText={managerUpn ?? ''}
                avatar={{
                  color: 'colorful',
                  image: managerUpn ? { src: services.photoUrl(managerUpn) } : undefined,
                  'aria-hidden': true
                }}
                size="large"
              />
            </div>
          ) : undefined}
        </Field>
        <Field
          label={strings.EmployeeTypeLabel}
          required
          validationMessage={vmsg(errors.employeeType?.message)}
        >
          <RadioGroup
            layout="horizontal"
            value={employeeType}
            onChange={(_, data) =>
              setValue('employeeType', data.value as IEmploymentInfo['employeeType'])
            }
          >
            <Radio value="Employee" label={strings.EmployeeTypeEmployee} />
            <Radio value="Contractor" label={strings.EmployeeTypeContractor} />
          </RadioGroup>
        </Field>
          <Field
            label={strings.HireDateLabel}
            required
            validationMessage={vmsg(errors.hireDate?.message)}
            className={styles.narrow}
          >
            <Input type="date" {...register('hireDate')} />
          </Field>
        </div>
      </StepShell>
      <WizardFooter onBack={() => dispatch({ type: 'back' })} nextIsSubmit />
    </form>
  );
};
