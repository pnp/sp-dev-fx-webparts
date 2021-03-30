import { useCallback } from 'react';
import { hooks } from 'botframework-webchat';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import './index.css';
import * as React from 'react';

const { useDismissNotification, usePerformCardAction } = hooks;

export interface ITraditionalBotAuthenticationToastProps {
  notification: any;
}

export const TraditionalBotAuthenticationToast: React.FunctionComponent<ITraditionalBotAuthenticationToastProps> = ({
  notification,
}) => {
  const id = notification.id;
  const signin = notification.data.content.buttons[0];

  const dismissNotification = useDismissNotification();
  const performCardAction = usePerformCardAction();

  const handleClick = useCallback(() => {
    dismissNotification(id);
    performCardAction(signin);
  }, [dismissNotification, id, performCardAction, signin]);

  return (
    <div aria-label="Sign in" role="dialog" className="app__signInNotification">
      <Icon iconName="Signin" className="ms-Icon-Old app__signInNotification__icon" />
      {'Please sign in to the bot directly.'}
      <button className="app__signInNotification__button" onClick={handleClick} type="button">
        Login
      </button>
    </div>
  );
};
