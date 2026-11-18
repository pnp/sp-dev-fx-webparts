import * as React from 'react';
import {
  Button,
  Checkbox,
  Combobox,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Option,
  Persona,
  Subtitle1,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useLicenseOptions } from '../../hooks/useReferenceData';
import { QK_JOBS } from '../../constants/queryKeys';
import type { ITransferPayload, ITransferTarget } from '../../models';
import type { IDirectoryUserHit } from '../../services/users/UserService';
import { useAppToast } from '../Shared/AppToaster';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    maxWidth: '600px'
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
    maxWidth: '320px'
  },
  selectedUser: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium
  },
  licenses: {
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    borderTopWidth: tokens.strokeWidthThin,
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2
  }
});

export const TransferPanel: React.FC<{ onSubmitted: () => void }> = ({ onSubmitted }) => {
  const styles = useStyles();
  const services = useServices();
  const { requireApproval } = useSettings();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const licenseOptions = useLicenseOptions();

  const [query, setQuery] = React.useState<string>('');
  const debounced: string = useDebouncedValue(query);
  const hits = useQuery(
    ['graph', 'transferTargetSearch', debounced],
    ({ signal }) => services.users.searchUsers(debounced, signal),
    { enabled: debounced.trim().length >= 2, keepPreviousData: true }
  );
  const [target, setTarget] = React.useState<ITransferTarget | null>(null);

  const currentLicenses = useQuery(
    ['graph', 'transferCurrentLicenses', target?.userId],
    ({ signal }) => services.users.getUserLicenseSkuIds(target?.userId ?? '', signal),
    { enabled: !!target }
  );

  const [jobTitle, setJobTitle] = React.useState<string>('');
  const [department, setDepartment] = React.useState<string>('');
  const [officeLocation, setOfficeLocation] = React.useState<string>('');
  const [managerQuery, setManagerQuery] = React.useState<string>('');
  const debouncedManagerQuery: string = useDebouncedValue(managerQuery);
  const managerHits = useQuery(
    ['graph', 'transferManagerSearch', debouncedManagerQuery],
    ({ signal }) => services.users.searchUsers(debouncedManagerQuery, signal),
    { enabled: debouncedManagerQuery.trim().length >= 2, keepPreviousData: true }
  );
  const [managerId, setManagerId] = React.useState<string | undefined>(undefined);
  const [managerDisplayName, setManagerDisplayName] = React.useState<string | undefined>(undefined);
  const [addSkuIds, setAddSkuIds] = React.useState<Set<string>>(new Set());
  const [removeSkuIds, setRemoveSkuIds] = React.useState<Set<string>>(new Set());

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const hasAnyChange: boolean =
    !!jobTitle.trim() ||
    !!department.trim() ||
    !!officeLocation.trim() ||
    !!managerId ||
    addSkuIds.size > 0 ||
    removeSkuIds.size > 0;

  const reset = (): void => {
    setTarget(null);
    setQuery('');
    setJobTitle('');
    setDepartment('');
    setOfficeLocation('');
    setManagerQuery('');
    setManagerId(undefined);
    setManagerDisplayName(undefined);
    setAddSkuIds(new Set());
    setRemoveSkuIds(new Set());
    setError(undefined);
  };

  const submit = async (): Promise<void> => {
    if (!target || !hasAnyChange) {
      return;
    }
    setSubmitting(true);
    setError(undefined);
    const payload: ITransferPayload = {
      schemaVersion: 1,
      kind: 'transfer',
      target,
      changes: {
        jobTitle: jobTitle.trim() || undefined,
        department: department.trim() || undefined,
        officeLocation: officeLocation.trim() || undefined,
        managerId,
        managerDisplayName,
        addLicenses: Array.from(addSkuIds).map((skuId) => ({
          skuId,
          skuPartNumber:
            (licenseOptions.data ?? []).filter((o) => o.skuId === skuId)[0]?.skuPartNumber ?? skuId
        })),
        removeLicenseSkuIds: Array.from(removeSkuIds)
      }
    };
    try {
      await services.engine.createJob({
        jobType: 'Transfer',
        payload,
        steps: services.engine.buildInitialSteps('Transfer'),
        scheduledFor: null,
        initialStatus: requireApproval ? 'PendingApproval' : 'Approved'
      });
      await queryClient.invalidateQueries(QK_JOBS);
      toast(requireApproval ? strings.SubmitSuccess : strings.SubmitSuccessNoApproval);
      reset();
      onSubmitted();
    } catch {
      setError(strings.SubmitFailure);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <Subtitle1 as="h3" block>
        {strings.TransferTitle}
      </Subtitle1>
      <Text>{strings.TransferIntro}</Text>

      <Field label={strings.TransferUserLabel} required className={styles.narrow}>
        <Combobox
          placeholder={strings.ManagerSearchPlaceholder}
          value={query}
          freeform
          onChange={(ev) => {
            setQuery(ev.target.value);
            setTarget(null);
          }}
          onOptionSelect={(_, data) => {
            const hit: IDirectoryUserHit | undefined = (hits.data ?? []).filter(
              (h) => h.id === data.optionValue
            )[0];
            if (hit) {
              setQuery(hit.displayName);
              setTarget({ userId: hit.id, displayName: hit.displayName, userPrincipalName: hit.userPrincipalName });
            }
          }}
        >
          {(hits.data ?? []).map((hit) => (
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
      {target ? (
        <div className={styles.selectedUser}>
          <Persona
            name={target.displayName}
            secondaryText={target.userPrincipalName}
            avatar={{ color: 'colorful', image: { src: services.photoUrl(target.userPrincipalName) }, 'aria-hidden': true }}
            size="large"
          />
        </div>
      ) : undefined}

      {target ? (
        <>
          <div className={styles.pair}>
            <Field label={strings.JobTitleLabel} hint={strings.TransferLeaveBlankHint}>
              <Input value={jobTitle} onChange={(_, data) => setJobTitle(data.value)} />
            </Field>
            <Field label={strings.DepartmentLabel} hint={strings.TransferLeaveBlankHint}>
              <Input value={department} onChange={(_, data) => setDepartment(data.value)} />
            </Field>
          </div>
          <Field label={strings.OfficeLabel} hint={strings.TransferLeaveBlankHint} className={styles.narrow}>
            <Input value={officeLocation} onChange={(_, data) => setOfficeLocation(data.value)} />
          </Field>
          <Field label={strings.ManagerLabel} hint={strings.TransferLeaveBlankHint}>
            <Combobox
              placeholder={strings.ManagerSearchPlaceholder}
              value={managerQuery}
              freeform
              onChange={(ev) => {
                setManagerQuery(ev.target.value);
                setManagerId(undefined);
                setManagerDisplayName(undefined);
              }}
              onOptionSelect={(_, data) => {
                const hit: IDirectoryUserHit | undefined = (managerHits.data ?? []).filter(
                  (h) => h.id === data.optionValue
                )[0];
                if (hit) {
                  setManagerQuery(hit.displayName);
                  setManagerId(hit.id);
                  setManagerDisplayName(hit.displayName);
                }
              }}
            >
              {(managerHits.data ?? []).map((hit) => (
                <Option key={hit.id} value={hit.id} text={hit.displayName}>
                  {hit.displayName}
                </Option>
              ))}
            </Combobox>
          </Field>

          <Field label={strings.TransferAddLicensesLabel}>
            <div className={styles.licenses}>
              {(licenseOptions.data ?? []).map((option) => (
                <Checkbox
                  key={option.skuId}
                  label={option.displayName}
                  checked={addSkuIds.has(option.skuId)}
                  onChange={(_, data) => {
                    const next = new Set(addSkuIds);
                    if (data.checked) next.add(option.skuId);
                    else next.delete(option.skuId);
                    setAddSkuIds(next);
                  }}
                />
              ))}
            </div>
          </Field>
          <Field label={strings.TransferRemoveLicensesLabel}>
            <div className={styles.licenses}>
              {(currentLicenses.data ?? []).length === 0 ? (
                <Text size={200}>{strings.TransferNoCurrentLicenses}</Text>
              ) : (
                (currentLicenses.data ?? []).map((skuId) => {
                  const option = (licenseOptions.data ?? []).filter((o) => o.skuId === skuId)[0];
                  return (
                    <Checkbox
                      key={skuId}
                      label={option?.displayName ?? skuId}
                      checked={removeSkuIds.has(skuId)}
                      onChange={(_, data) => {
                        const next = new Set(removeSkuIds);
                        if (data.checked) next.add(skuId);
                        else next.delete(skuId);
                        setRemoveSkuIds(next);
                      }}
                    />
                  );
                })
              )}
            </div>
          </Field>

          {error ? (
            <MessageBar intent="error">
              <MessageBarBody>{error}</MessageBarBody>
            </MessageBar>
          ) : undefined}

          <div className={styles.actions}>
            <Button
              appearance="primary"
              disabled={!hasAnyChange || submitting}
              onClick={() => {
                void submit();
              }}
            >
              {requireApproval ? strings.SubmitLabel : strings.SubmitNoApprovalLabel}
            </Button>
            <Button appearance="secondary" disabled={submitting} onClick={reset}>
              {strings.CancelLabel}
            </Button>
          </div>
        </>
      ) : undefined}
    </div>
  );
};
