import * as React from 'react';
import {
  Button,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Skeleton,
  SkeletonItem,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { GraphServiceError } from '../../services/graph/GraphError';

const useStyles = makeStyles({
  skeleton: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground3
  }
});

export interface IDataStateProps {
  isLoading: boolean;
  error?: unknown;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyBody?: string;
  emptyAction?: React.ReactNode;
  onRetry?: () => void;
  isPaused?: boolean;
  slowAfterMs?: number;
  children?: React.ReactNode;
}

const DEFAULT_SLOW_AFTER_MS: number = 15_000;

export const DataState: React.FC<IDataStateProps> = (props) => {
  const styles = useStyles();
  const slowAfterMs: number = props.slowAfterMs ?? DEFAULT_SLOW_AFTER_MS;
  const [isSlow, setIsSlow] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!props.isLoading) {
      setIsSlow(false);
      return undefined;
    }
    const timer: number = window.setTimeout(() => setIsSlow(true), slowAfterMs);
    return () => window.clearTimeout(timer);
  }, [props.isLoading, slowAfterMs]);

  if (props.error) {
    const correlationId: string =
      props.error instanceof GraphServiceError ? props.error.requestId : '';
    return (
      <MessageBar intent="error" layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>{strings.ErrorGenericTitle}</MessageBarTitle>
          {props.error instanceof Error ? props.error.message : String(props.error)}
          {correlationId ? (
            <>
              {' '}
              <Text size={200}>
                {strings.CorrelationIdLabel}: {correlationId}
              </Text>
            </>
          ) : undefined}
        </MessageBarBody>
        {props.onRetry ? (
          <MessageBarActions>
            <Button onClick={props.onRetry}>{strings.RetryLabel}</Button>
          </MessageBarActions>
        ) : undefined}
      </MessageBar>
    );
  }

  if (props.isPaused) {
    return (
      <MessageBar intent="warning" layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>{strings.QueryPausedTitle}</MessageBarTitle>
          {strings.QueryPausedBody}
        </MessageBarBody>
        {props.onRetry ? (
          <MessageBarActions>
            <Button onClick={props.onRetry}>{strings.RetryLabel}</Button>
          </MessageBarActions>
        ) : undefined}
      </MessageBar>
    );
  }

  if (props.isLoading) {
    return (
      <div>
        {isSlow ? (
          <MessageBar intent="warning" layout="multiline">
            <MessageBarBody>
              <MessageBarTitle>{strings.SlowLoadTitle}</MessageBarTitle>
              {strings.SlowLoadBody}
            </MessageBarBody>
            {props.onRetry ? (
              <MessageBarActions>
                <Button onClick={props.onRetry}>{strings.RetryLabel}</Button>
              </MessageBarActions>
            ) : undefined}
          </MessageBar>
        ) : undefined}
        <Skeleton aria-label={strings.LoadingLabel} className={styles.skeleton}>
          <SkeletonItem size={24} />
          <SkeletonItem size={24} />
          <SkeletonItem size={24} />
        </Skeleton>
      </div>
    );
  }

  if (props.isEmpty) {
    return (
      <div className={styles.empty}>
        <Text weight="semibold">{props.emptyTitle ?? strings.EmptyGenericTitle}</Text>
        <Text size={200}>{props.emptyBody ?? strings.EmptyGenericBody}</Text>
        {props.emptyAction}
      </div>
    );
  }

  return <>{props.children}</>;
};
