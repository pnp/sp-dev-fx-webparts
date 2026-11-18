import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Combobox,
  Field,
  Option,
  Radio,
  RadioGroup,
  Switch,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { accountSettingsSchema } from '../../../validators/wizardSchemas';
import { vmsg } from '../../../validators/messageMap';
import { useWizard } from '../../../contexts/WizardContext';
import { useSaveOnUnmount } from '../../../hooks/useSaveOnUnmount';
import { USAGE_LOCATIONS } from '../../../constants/usageLocations';
import type { IAccountSettings } from '../../../models';
import { StepShell } from '../StepShell';
import { WizardFooter } from '../WizardFooter';

const useStyles = makeStyles({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  usageLocation: {
    maxWidth: '320px'
  }
});

export const AccountSettingsStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();

  const form = useForm<IAccountSettings>({
    resolver: yupResolver(accountSettingsSchema),
    defaultValues: state.draft.accountSettings,
    mode: 'onBlur'
  });
  const { handleSubmit, setValue, watch, getValues, formState, reset } = form;
  const errors = formState.errors;
  const values: IAccountSettings = watch();

  const seeded = React.useRef(false);
  React.useEffect(() => {
    if (seeded.current) {
      return;
    }
    seeded.current = true;
    reset(state.draft.accountSettings);
  }, [reset, state.draft.accountSettings]);

  useSaveOnUnmount(() => {
    dispatch({ type: 'saveAccountSettings', accountSettings: getValues() });
  });

  const selectedLocation = USAGE_LOCATIONS.filter((l) => l.code === values.usageLocation)[0];

  const onValid = (data: IAccountSettings): void => {
    dispatch({ type: 'saveAccountSettings', accountSettings: data });
    dispatch({ type: 'next' });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid) as unknown as React.FormEventHandler<HTMLFormElement>}
      noValidate
    >
      <StepShell title={strings.WizardStepAccount} description={strings.WizardStepDescAccount}>
        <div className={styles.stack}>
        <Field
          label={strings.UsageLocationLabel}
          required
          validationMessage={vmsg(errors.usageLocation?.message)}
          className={styles.usageLocation}
        >
          <Combobox
            value={selectedLocation ? `${selectedLocation.name} (${selectedLocation.code})` : ''}
            onOptionSelect={(_, data) => setValue('usageLocation', data.optionValue ?? '')}
          >
            {USAGE_LOCATIONS.map((location) => (
              <Option key={location.code} value={location.code} text={location.name}>
                {location.name} ({location.code})
              </Option>
            ))}
          </Combobox>
        </Field>
        <Switch
          label={strings.AccountEnabledLabel}
          checked={values.accountEnabled}
          onChange={(_, data) => setValue('accountEnabled', data.checked)}
        />
        <Field
          label={strings.CredentialModeLabel}
          required
          validationMessage={vmsg(errors.credentialMode?.message)}
        >
          <RadioGroup
            value={values.credentialMode}
            onChange={(_, data) =>
              setValue('credentialMode', data.value as IAccountSettings['credentialMode'])
            }
          >
            <Radio value="tap" label={strings.CredentialModeTap} />
            <Radio value="password" label={strings.CredentialModePassword} />
          </RadioGroup>
        </Field>
        <Switch
          label={strings.ForceChangePasswordLabel}
          checked={values.forceChangePassword}
          onChange={(_, data) => setValue('forceChangePassword', data.checked)}
        />
        </div>
      </StepShell>
      <WizardFooter onBack={() => dispatch({ type: 'back' })} nextIsSubmit />
    </form>
  );
};
