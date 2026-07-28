import * as React from 'react';
import {
  Button,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Spinner,
  Text
} from '@fluentui/react-components';
import * as strings from 'M365SearchHubWebPartStrings';
import { SearchFailure, SearchStatus } from '../models/SearchStatus';
import { format } from '../utils/format';

/** Where somebody is sent to get the permission looked at. */
const SETUP_DOCS = 'https://learn.microsoft.com/sharepoint/api-access';

export interface ISearchStatusMessageProps {
  status: SearchStatus;
  failure?: SearchFailure;
  /** The term that produced no results, so the empty state can quote it. */
  query?: string;
  minimumQueryLength: number;
  onRetry?: () => void;
}

/**
 * The states that are not a list of results.
 *
 * Each one is meant to look like a different thing, not the same box with
 * different words: a spinner for work in progress, an informational bar for a
 * search that simply found nothing, a warning for something an administrator
 * must look at, an error with a way back for something that might pass.
 */
export const SearchStatusMessage: React.FunctionComponent<ISearchStatusMessageProps> = (props) => {
  const { status, failure, query, minimumQueryLength, onRetry } = props;

  if (status === 'loading') {
    return <Spinner size="tiny" label={strings.StatusLoading} labelPosition="after" />;
  }

  if (status === 'idle') {
    return (
      <Text>
        {query && query.length > 0
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

  if (status === 'permissionDenied') {
    // A warning, not an error: nothing here is the reader's doing, and the fix
    // belongs to somebody else. No retry, because retrying cannot help.
    return (
      <MessageBar intent="warning">
        <MessageBarBody>
          <MessageBarTitle>{strings.PermissionDeniedTitle}</MessageBarTitle>
          {strings.PermissionDeniedDetail}
        </MessageBarBody>
        <MessageBarActions>
          <Link href={SETUP_DOCS} target="_blank" rel="noreferrer">
            {strings.ViewSetupInstructions}
          </Link>
        </MessageBarActions>
      </MessageBar>
    );
  }

  if (status === 'error') {
    if (failure === 'notAuthenticated') {
      return (
        <MessageBar intent="warning">
          <MessageBarBody>
            <MessageBarTitle>{strings.NotAuthenticatedTitle}</MessageBarTitle>
            {strings.NotAuthenticatedDetail}
          </MessageBarBody>
        </MessageBar>
      );
    }

    if (failure === 'throttled') {
      // Microsoft 365 asked us to slow down. Informational, and retried only
      // when somebody chooses to.
      return (
        <MessageBar intent="info">
          <MessageBarBody>
            <MessageBarTitle>{strings.ThrottledTitle}</MessageBarTitle>
            {strings.ThrottledDetail}
          </MessageBarBody>
          {onRetry ? (
            <MessageBarActions>
              <Button appearance="transparent" onClick={onRetry}>
                {strings.RetryLabel}
              </Button>
            </MessageBarActions>
          ) : undefined}
        </MessageBar>
      );
    }

    return (
      <MessageBar intent="error">
        <MessageBarBody>
          <MessageBarTitle>{strings.ErrorTitle}</MessageBarTitle>
          {strings.ErrorDetail}
        </MessageBarBody>
        {onRetry ? (
          <MessageBarActions>
            <Button appearance="transparent" onClick={onRetry}>
              {strings.RetryLabel}
            </Button>
          </MessageBarActions>
        ) : undefined}
      </MessageBar>
    );
  }

  return null;
};
