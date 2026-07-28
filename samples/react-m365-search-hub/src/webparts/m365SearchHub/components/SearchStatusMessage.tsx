import * as React from 'react';
import { Button, Link, MessageBar, MessageBarBody, MessageBarTitle, Spinner, Text } from '@fluentui/react-components';
import * as strings from 'M365SearchHubWebPartStrings';
import { SearchStatus, SearchFailure } from '../models/SearchStatus';
import { format } from '../utils/format';

/** Where a person is sent to get the permission approved. */
const SETUP_DOCS = 'https://learn.microsoft.com/sharepoint/api-access';

export interface ISearchStatusMessageProps {
  status: SearchStatus;
  failure?: SearchFailure;
  /** The term that produced no results. Only used by the empty state. */
  query?: string;
  minimumQueryLength: number;
  onRetry?: () => void;
}

interface IStated {
  intent: 'info' | 'warning' | 'error';
  title: string;
  detail?: string;
}

/**
 * Turns a failure into something worth reading.
 *
 * A permission that has not been approved is not an error the person caused,
 * so it does not get an error intent and never says that search failed. It
 * gets an instruction and a link, because the fix belongs to an administrator.
 */
function describe(failure: SearchFailure): IStated {
  switch (failure) {
    case 'permissionDenied':
      return {
        intent: 'warning',
        title: strings.PermissionDeniedTitle,
        detail: strings.PermissionDeniedDetail
      };
    case 'notAuthenticated':
      return {
        intent: 'warning',
        title: strings.NotAuthenticatedTitle,
        detail: strings.NotAuthenticatedDetail
      };
    case 'throttled':
      return {
        intent: 'info',
        title: strings.ThrottledTitle,
        detail: strings.ThrottledDetail
      };
    default:
      return { intent: 'error', title: strings.ErrorTitle, detail: strings.ErrorDetail };
  }
}

export const SearchStatusMessage: React.FunctionComponent<ISearchStatusMessageProps> = (props) => {
  const { status, failure, query, minimumQueryLength, onRetry } = props;

  if (status === 'loading') {
    return <Spinner size="tiny" label={strings.StatusLoading} labelPosition="after" />;
  }

  if (status === 'idle') {
    return (
      <Text>
        {minimumQueryLength > 1
          ? format(strings.StatusQueryTooShort, minimumQueryLength)
          : strings.StatusIdle}
      </Text>
    );
  }

  if (status === 'empty') {
    return (
      <MessageBar intent="info">
        <MessageBarBody>
          <MessageBarTitle>{format(strings.StatusEmptyTitle, query || '')}</MessageBarTitle>
          {strings.StatusEmptyDetail}
        </MessageBarBody>
      </MessageBar>
    );
  }

  if (status === 'permissionDenied' || status === 'error') {
    const described = describe(failure || 'unknown');
    const isPermission = failure === 'permissionDenied';

    return (
      <MessageBar intent={described.intent}>
        <MessageBarBody>
          <MessageBarTitle>{described.title}</MessageBarTitle>
          {described.detail}{' '}
          {isPermission ? (
            <Link href={SETUP_DOCS} target="_blank" rel="noreferrer">
              {strings.ViewSetupInstructions}
            </Link>
          ) : undefined}
        </MessageBarBody>
        {/* Retrying is offered, never automatic, and never for a missing permission. */}
        {!isPermission && failure !== 'notAuthenticated' && onRetry ? (
          <Button appearance="transparent" onClick={onRetry}>
            {strings.RetryLabel}
          </Button>
        ) : undefined}
      </MessageBar>
    );
  }

  return null;
};
