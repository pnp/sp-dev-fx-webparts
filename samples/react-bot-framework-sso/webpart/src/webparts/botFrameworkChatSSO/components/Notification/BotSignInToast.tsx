import { useCallback, useEffect, useRef } from 'react';
import { hooks } from 'botframework-webchat';
import { AadTokenProvider } from '@microsoft/sp-http';
import random from 'math-random';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import './index.css';
import * as React from 'react';

const { useActivities, useDismissNotification, usePostActivity, useSetNotification } = hooks;

export interface IBotSignInToastProps {
  notification: any;
  context: any;
}

export const BotSignInToast: React.FunctionComponent<IBotSignInToastProps> = ({ notification, context }) => {
  const { current: invokeId } = useRef(random().toString(36).substr(2, 10));
  const {
    data: { content },
    id,
  } = notification;

  const [activities] = useActivities();
  const dismissNotification = useDismissNotification();
  const postActivity = usePostActivity();
  const setNotification = useSetNotification();

  const handleDismiss = useCallback(() => {
    dismissNotification(id);
    setNotification({
      id: 'traditionalbotauthentication',
      data: { content },
      level: 'info',
      message: 'OK, please sign in to the bot directly.',
    });
  }, [dismissNotification, id]);

  useEffect(() => {
    const invokeActivity = activities.find((activity) => (activity.channelData || {}).invokeId === invokeId);
    if (invokeActivity) {
      const {
        channelData: { state },
      } = invokeActivity;
      if (state === 'send failed') {
        dismissNotification(id);
        setNotification({
          id: 'traditionalbotauthentication',
          data: { content },
          level: 'error',
          message: 'There was an error authenticating the bot.',
        });
      } else if (state === 'sent') {
        dismissNotification(id);
        setNotification({
          id: 'signinsuccessful',
          level: 'success',
          message: 'The bot was authenticated successfully.',
        });
      }
    }
  }, [activities]);

  const handleAgreeClick = useCallback(() => {
    try {
      context.aadTokenProviderFactory.getTokenProvider().then((tokenProvider: AadTokenProvider) => {
        // Get token: replace <Your_AAD_Scope_Uri> with your application ID URI, something like this: api://XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
        return tokenProvider.getToken('<Your_AAD_Scope_Uri>', true).then((token: string) => {
          const { connectionName, tokenExchangeResource } = content;
          const { tokenId } = tokenExchangeResource;

          if (token) {
            postActivity({
              channelData: { invokeId },
              type: 'invoke',
              name: 'signin/tokenExchange',
              value: {
                id: tokenId,
                connectionName,
                token,
              },
            });
          }
        });
      });
    } catch (error) {
      dismissNotification(id);
      setNotification({
        id: 'traditionalbotauthentication',
        data: { content },
        level: 'error',
        message: 'Authenticating the bot failed.',
      });
    }
  }, [dismissNotification, postActivity, setNotification]);

  return (
    <div aria-label="Sign in" role="dialog" className="app__signInNotification">
      <Icon iconName="Signin" className="ms-Icon-Old app__signInNotification__icon" />
      {'Allow the bot to access your account? '}
      {
        <React.Fragment>
          <button className="app__signInNotification__button" onClick={handleAgreeClick} type="button">
            Yes
          </button>{' '}
          <button className="app__signInNotification__button" onClick={handleDismiss} type="button">
            No
          </button>
        </React.Fragment>
      }
    </div>
  );
};
