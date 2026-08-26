import * as React from 'react';

export type NotificationIntent = 'info' | 'success' | 'warning' | 'error';

export interface NotificationMessage {
  readonly id: string;
  readonly intent: NotificationIntent;
  readonly text: string;
  readonly createdAt: number;
  readonly link?: { readonly href: string; readonly label: string };
}

export interface UseNotificationsResult {
  readonly notifications: ReadonlyArray<NotificationMessage>;
  readonly pushNotification: (
    intent: NotificationIntent,
    text: string,
    link?: NotificationMessage['link']
  ) => void;
  readonly dismissNotification: (id: string) => void;
  readonly clearNotifications: () => void;
}

const MAX_NOTIFICATIONS = 5;
const AUTO_DISMISS_MS = 8000;

let notificationSequence = 0;

export const useNotifications = (isMountedRef: React.MutableRefObject<boolean>): UseNotificationsResult => {
  const [notifications, setNotifications] = React.useState<ReadonlyArray<NotificationMessage>>([]);
  const timersRef = React.useRef(new Map<string, number>());

  const dismissNotification = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setNotifications((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const pushNotification = React.useCallback((
    intent: NotificationIntent,
    text: string,
    link?: NotificationMessage['link']
  ) => {
    if (!isMountedRef.current) {
      return;
    }

    notificationSequence += 1;
    const id = `notification-${notificationSequence.toString()}`;
    const message: NotificationMessage = { id, intent, text, createdAt: Date.now(), link };

    setNotifications((previous) => {
      const deduped = previous.filter((item) => !(item.intent === intent && item.text === text));
      return [message, ...deduped].slice(0, MAX_NOTIFICATIONS);
    });

    if (intent === 'success' || intent === 'info') {
      const timer = window.setTimeout(() => {
        timersRef.current.delete(id);
        if (isMountedRef.current) {
          setNotifications((previous) => previous.filter((item) => item.id !== id));
        }
      }, AUTO_DISMISS_MS);
      timersRef.current.set(id, timer);
    }
  }, [isMountedRef]);

  const clearNotifications = React.useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current.clear();
    setNotifications([]);
  }, []);

  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return { notifications, pushNotification, dismissNotification, clearNotifications };
};
