import {
  Badge,
  Body1,
  Button,
  MessageBar,
  MessageBarBody,
  Spinner,
  Text
} from '@fluentui/react-components';
import { ArrowClockwiseRegular } from '@fluentui/react-icons';
import * as React from 'react';
import * as strings from 'EffectiveAccessAuditWebPartStrings';
import { classifyAccessAuditError } from '../services/EffectiveAccessAuditService';
import { validateConfig } from '../utils/auditUtils';
import type { IAccessAuditProps, IAccessAuditState } from './IAccessAuditProps';
import styles from './EffectiveAccessAudit.module.scss';

const initialState: IAccessAuditState = { status: 'loading', assignments: [] };
let nextId = 0;

function contactDetails(loginName?: string, email?: string): string {
  return [loginName, email].filter(Boolean).join(' · ');
}

const EffectiveAccessAudit: React.FC<IAccessAuditProps> = ({ config, service }) => {
  const [instanceId] = React.useState(() => `effective-access-audit-${++nextId}`);
  const [state, setState] = React.useState<IAccessAuditState>(initialState);
  const [retry, setRetry] = React.useState(0);
  const validationErrors = React.useMemo(() => validateConfig(config), [config]);
  const requestId = React.useRef(0);
  const headingId = `${instanceId}-heading`;

  React.useEffect(() => {
    if (validationErrors.length) {
      return undefined;
    }
    const currentRequest = ++requestId.current;
    setState({ status: 'loading', assignments: [] });
    service.getAudit(config).then((result) => {
      if (currentRequest !== requestId.current) return;
      setState({
        status: result.assignments.length ? 'success' : 'empty',
        assignments: result.assignments
      });
    }).catch((error: unknown) => {
      if (currentRequest !== requestId.current) return;
      setState({ status: 'error', assignments: [], errorKind: classifyAccessAuditError(error).kind });
    });
    return () => {
      requestId.current += 1;
    };
  }, [config, retry, service, validationErrors.length]);

  if (validationErrors.length) {
    return (
      <section className={styles.root} aria-labelledby={`${instanceId}-setup-heading`}>
        <div className={styles.setup}>
          <h2 className={styles.setupTitle} id={`${instanceId}-setup-heading`}>{strings.SetupTitle}</h2>
          <Body1>{strings.SetupDescription}</Body1>
          <ul className={styles.setupList}>
            {validationErrors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      </section>
    );
  }

  const statusMessage = state.status === 'loading'
    ? strings.LoadingMessage
    : state.status === 'empty' ? strings.EmptyMessage : '';
  const errorMessage = state.errorKind === 'accessDenied'
    ? strings.AccessDeniedMessage
    : state.errorKind === 'notFound'
      ? strings.NotFoundMessage
      : state.errorKind === 'throttled' ? strings.ThrottledMessage : strings.GenericErrorMessage;

  return (
    <section className={styles.root} aria-labelledby={headingId} aria-busy={state.status === 'loading'}>
      <h2 className={styles.heading} id={headingId}>{strings.DefaultTitle}</h2>
      <p className={styles.limitation}>{strings.LimitationNote}</p>
      <div className={styles.liveStatus} role="status" aria-live="polite">{statusMessage}</div>

      {state.status === 'loading' ? (
        <div className={styles.centered}>
          <Spinner label={strings.LoadingMessage} />
        </div>
      ) : null}

      {state.status === 'empty' ? (
        <div className={styles.centered} role="status">
          <Body1>{strings.EmptyMessage}</Body1>
          <Button icon={<ArrowClockwiseRegular />} onClick={() => setRetry((value) => value + 1)}>
            {strings.Refresh}
          </Button>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div className={styles.error} role="alert">
          <MessageBar intent="error">
            <MessageBarBody>
              <Text weight="semibold">{strings.ErrorTitle}</Text>
              <div>{errorMessage}</div>
            </MessageBarBody>
          </MessageBar>
          <Button appearance="primary" icon={<ArrowClockwiseRegular />} onClick={() => setRetry((value) => value + 1)}>
            {strings.Refresh}
          </Button>
        </div>
      ) : null}

      {state.status === 'success' ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>{strings.TableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">{strings.PrincipalHeader}</th>
                <th scope="col">{strings.RolesHeader}</th>
                <th scope="col">{strings.ScopeHeader}</th>
              </tr>
            </thead>
            <tbody>
              {state.assignments.map((assignment) => {
                const details = contactDetails(assignment.loginName, assignment.email);
                return (
                  <tr key={assignment.key}>
                    <td>
                      <div className={styles.principal}>
                        <span className={styles.principalTitle}>{assignment.principalTitle}</span>
                        <span className={styles.secondary}>{assignment.principalType}</span>
                        {details ? <span className={styles.secondary}>{details}</span> : null}
                      </div>
                    </td>
                    <td>
                      <div className={styles.roles}>
                        {assignment.roleNames.length
                          ? assignment.roleNames.map((role) => <Badge key={role} appearance="tint">{role}</Badge>)
                          : <span className={styles.secondary}>{strings.NoRoles}</span>}
                      </div>
                    </td>
                    <td>
                      <div className={styles.scope}>
                        <Badge appearance="tint" color={assignment.inheritance === 'Unique' ? 'success' : 'informative'}>
                          {assignment.scope}
                        </Badge>
                        <span>{assignment.inheritance}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default EffectiveAccessAudit;
