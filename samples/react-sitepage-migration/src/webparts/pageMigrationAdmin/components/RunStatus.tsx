import * as React from 'react';
import {
  Body1Stronger,
  Button,
  Caption1,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  ProgressBar
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { MigrationProgressSnapshot } from '../../../models/MigrationReport';
import { NotificationMessage } from '../../../hooks/useNotifications';
import { formatString } from '../../../utilities/formatString';
import { progressLabel } from './localization';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface RunStatusProps {
  readonly progress: MigrationProgressSnapshot;
  readonly notifications: ReadonlyArray<NotificationMessage>;
  readonly isRunning: boolean;
  readonly onDismissNotification: (id: string) => void;
}

export const RunStatus: React.FC<RunStatusProps> = React.memo((props) => {
  const styles = useAppStyles();
  const { progress, isRunning } = props;

  const isTerminalPhase = progress.phase === 'Idle'
    || progress.phase === 'PagesLoaded'
    || progress.phase === 'ValidationComplete'
    || progress.phase === 'MigrationComplete'
    || progress.phase === 'MigrationCancelled'
    || progress.phase === 'DryRunComplete';
  const showProgress = isRunning || !isTerminalPhase;
  const phaseText = progressLabel(progress.phase);
  const countsText = progress.totalPages > 0
    ? formatString(strings.ProgressCounts, progress.processedPages, progress.totalPages)
    : '';

  return (
    <div className={styles.statusStack}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.visuallyHidden}
      >
        {showProgress ? `${phaseText} ${countsText}`.trim() : ''}
      </div>

      {showProgress ? (
        <div className={styles.progressBlock}>
          <div className={styles.progressHeader}>
            <Body1Stronger>{phaseText}</Body1Stronger>
            {countsText ? <Caption1>{countsText}</Caption1> : null}
          </div>
          <ProgressBar
            value={progress.totalPages > 0 ? progress.percentComplete / 100 : undefined}
            max={1}
            thickness="medium"
            aria-label={strings.ProgressRegionLabel}
            aria-valuetext={`${phaseText} ${countsText}`.trim()}
          />
          {progress.detail ? <Caption1>{progress.detail}</Caption1> : null}
        </div>
      ) : null}

      {props.notifications.length > 0 ? (
        <div className={styles.statusStack} role="region" aria-label={strings.NotificationsRegionLabel}>
          {props.notifications.map((message) => (
            <MessageBar
              key={message.id}
              intent={message.intent}
              politeness={message.intent === 'error' ? 'assertive' : 'polite'}
            >
              <MessageBarBody>
                {message.text}
                {message.link ? (
                  <>
                    {' '}
                    <Link href={message.link.href} target="_blank" rel="noreferrer noopener">
                      {message.link.label}
                    </Link>
                  </>
                ) : null}
              </MessageBarBody>
              <MessageBarActions
                containerAction={
                  <Button
                    appearance="transparent"
                    icon={<DismissRegular />}
                    aria-label={strings.DismissNotificationLabel}
                    onClick={() => props.onDismissNotification(message.id)}
                  />
                }
              />
            </MessageBar>
          ))}
        </div>
      ) : null}
    </div>
  );
});

RunStatus.displayName = 'RunStatus';
