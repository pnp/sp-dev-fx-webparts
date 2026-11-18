import * as React from 'react';
import {
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Option,
  Radio,
  RadioGroup,
  Combobox,
  Spinner,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useWizard } from '../../../contexts/WizardContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useVerifiedDomains } from '../../../hooks/useReferenceData';
import { useSaveOnUnmount } from '../../../hooks/useSaveOnUnmount';
import type { CandidateRejectionReason, INamingResult } from '../../../models';
import { StepShell } from '../StepShell';
import { WizardFooter } from '../WizardFooter';

const EMAIL_RE: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useStyles = makeStyles({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  domainField: {
    maxWidth: '320px'
  },
  rejected: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200
  }
});

function rejectionText(reason: CandidateRejectionReason): string {
  switch (reason) {
    case 'reserved':
      return strings.IdentityReasonReserved;
    case 'collision-soft-deleted':
      return strings.IdentityReasonCollisionDeleted;
    default:
      return strings.IdentityReasonCollision;
  }
}

export const IdentityStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();
  const services = useServices();
  const domains = useVerifiedDomains();

  const { firstName, lastName } = state.draft.personal;
  const [accountType, setAccountType] = React.useState<'member' | 'guest'>(
    state.draft.identity?.accountType ?? 'member'
  );
  const isGuest: boolean = accountType === 'guest';

  const [domain, setDomain] = React.useState<string>(state.draft.identity?.domain ?? '');
  const effectiveDomain: string =
    domain || (domains.data ?? []).filter((d) => d.isDefault)[0]?.id || '';

  const naming = useQuery<INamingResult>(
    ['graph', 'naming', firstName, lastName, effectiveDomain],
    ({ signal }) => services.naming.resolve(firstName, lastName, effectiveDomain, signal),
    { enabled: !isGuest && !!firstName && !!lastName && !!effectiveDomain, staleTime: 60 * 1000 }
  );

  const [selected, setSelected] = React.useState<string>(
    state.draft.identity?.mailNickname ?? ''
  );
  const [guestEmail, setGuestEmail] = React.useState<string>(
    state.draft.identity?.accountType === 'guest' ? state.draft.identity.userPrincipalName : ''
  );

  useSaveOnUnmount(() => {
    if (isGuest) {
      if (guestEmail && EMAIL_RE.test(guestEmail)) {
        const at = guestEmail.indexOf('@');
        dispatch({
          type: 'saveIdentity',
          identity: {
            mailNickname: guestEmail.slice(0, at),
            domain: guestEmail.slice(at + 1),
            userPrincipalName: guestEmail,
            accountType: 'guest'
          }
        });
      }
      return;
    }
    if (selected && effectiveDomain) {
      dispatch({
        type: 'saveIdentity',
        identity: {
          mailNickname: selected,
          domain: effectiveDomain,
          userPrincipalName: `${selected}@${effectiveDomain}`,
          accountType: 'member'
        }
      });
    }
  });

  React.useEffect(() => {

    if (!isGuest && !selected && naming.data?.chosen) {
      setSelected(naming.data.chosen);
    }
  }, [isGuest, naming.data, selected]);

  const candidates: string[] = naming.data
    ? [naming.data.chosen, ...naming.data.alternatives].filter((c): c is string => !!c)
    : [];

  const next = (): void => {
    if (isGuest) {
      if (!guestEmail || !EMAIL_RE.test(guestEmail)) {
        return;
      }
      const at = guestEmail.indexOf('@');
      dispatch({
        type: 'saveIdentity',
        identity: {
          mailNickname: guestEmail.slice(0, at),
          domain: guestEmail.slice(at + 1),
          userPrincipalName: guestEmail,
          accountType: 'guest'
        }
      });
      dispatch({ type: 'next' });
      return;
    }
    if (!selected || !effectiveDomain) {
      return;
    }
    dispatch({
      type: 'saveIdentity',
      identity: {
        mailNickname: selected,
        domain: effectiveDomain,
        userPrincipalName: `${selected}@${effectiveDomain}`,
        accountType: 'member'
      }
    });
    dispatch({ type: 'next' });
  };

  if (!firstName || !lastName) {
    return (
      <div>
        <StepShell title={strings.WizardStepIdentity} description={strings.WizardStepDescIdentity}>
          <MessageBar intent="info">
            <MessageBarBody>{strings.IdentityNeedsNames}</MessageBarBody>
          </MessageBar>
        </StepShell>
        <WizardFooter onBack={() => dispatch({ type: 'back' })} nextDisabled />
      </div>
    );
  }

  return (
    <div>
      <StepShell title={strings.WizardStepIdentity} description={strings.WizardStepDescIdentity}>
        <div className={styles.stack}>
          <Field label={strings.IdentityAccountTypeLabel}>
            <RadioGroup
              value={accountType}
              onChange={(_, data) => setAccountType(data.value as 'member' | 'guest')}
            >
              <Radio value="member" label={strings.IdentityAccountTypeMember} />
              <Radio value="guest" label={strings.IdentityAccountTypeGuest} />
            </RadioGroup>
          </Field>

          {isGuest ? (
            <>
              <Text size={200}>{strings.IdentityGuestIntro}</Text>
              <Field
                label={strings.IdentityGuestEmailLabel}
                required
                className={styles.domainField}
                validationMessage={
                  guestEmail && !EMAIL_RE.test(guestEmail) ? strings.ValidationInvalidEmail : undefined
                }
              >
                <Input
                  type="email"
                  value={guestEmail}
                  onChange={(_, data) => setGuestEmail(data.value)}
                />
              </Field>
            </>
          ) : (
            <>
              <Field label={strings.DomainLabel} required className={styles.domainField}>
                <Combobox
                  value={effectiveDomain}
                  onOptionSelect={(_, data) => {
                    setDomain(data.optionValue ?? '');
                    setSelected('');
                  }}
                >
                  {(domains.data ?? []).map((d) => (
                    <Option key={d.id} value={d.id} text={d.id}>
                      {d.id}
                    </Option>
                  ))}
                </Combobox>
              </Field>

              {naming.isFetching ? <Spinner size="tiny" label={strings.IdentityResolving} /> : undefined}

              {naming.data ? (
                <>
                  {candidates.length === 0 ? (
                    <MessageBar intent="warning">
                      <MessageBarBody>{strings.IdentityNoCandidate}</MessageBarBody>
                    </MessageBar>
                  ) : (
                    <Field label={strings.IdentityCandidatesLabel} required>
                      <RadioGroup value={selected} onChange={(_, data) => setSelected(data.value)}>
                        {candidates.map((candidate, index) => (
                          <Radio
                            key={candidate}
                            value={candidate}
                            label={`${candidate}@${effectiveDomain}${
                              index === 0 ? ` (${strings.IdentityRecommended})` : ''
                            }`}
                          />
                        ))}
                      </RadioGroup>
                    </Field>
                  )}
                  {naming.data.rejected.length > 0 ? (
                    <div>
                      <Text weight="semibold" size={200}>
                        {strings.IdentityRejectedTitle}
                      </Text>
                      {naming.data.rejected.map((r) => (
                        <div key={r.candidate} className={styles.rejected}>
                          {r.candidate}@{effectiveDomain} — {rejectionText(r.reason)}
                        </div>
                      ))}
                    </div>
                  ) : undefined}
                  {selected ? (
                    <Field label={strings.MailNicknameLabel}>
                      <Text>{selected}</Text>
                    </Field>
                  ) : undefined}
                </>
              ) : undefined}
            </>
          )}
        </div>
      </StepShell>
      <WizardFooter
        onBack={() => dispatch({ type: 'back' })}
        onNext={next}
        nextDisabled={isGuest ? !guestEmail || !EMAIL_RE.test(guestEmail) : !selected || naming.isFetching}
      />
    </div>
  );
};
