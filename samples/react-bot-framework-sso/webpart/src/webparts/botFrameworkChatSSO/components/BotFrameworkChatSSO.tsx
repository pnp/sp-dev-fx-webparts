import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import * as md5 from 'blueimp-md5';

import styles from './BotFrameworkChatv4.module.scss';
import { IBotFrameworkSSOProps as IBotFrameworkChatSSOProps } from './IBotFrameworkChatSSOProps';

import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import { BotSignInToast } from './Notification/BotSignInToast';
import { TraditionalBotAuthenticationToast } from './Notification/TraditionalBotAuthenticationToast';

export const BotFrameworkChatSSO: React.FunctionComponent<IBotFrameworkChatSSOProps> = (props) => {
  const user = props.context.pageContext.user;
  const userDisplayName = (user.displayName && user.displayName.length > 0)? user.displayName.split(' ')[0] : "Me";
  const [directLine, setDirectLine] = useState(createDirectLine({}));
  const styleSetOptions = useMemo(
    () => {
     return {
        userAvatarInitials: userDisplayName,
        botAvatarInitials: props.botName,
      };
    },
    [props]
    );

  const generateToken = async (botEndpoint: string, userId?: string): Promise<string> => {
    const token = await window
      .fetch(`${botEndpoint}/directline/token`, {
        method: 'POST',
        body: JSON.stringify({ user: userId ? userId : '' }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(
        async (response: any): Promise<string> => {
          if (response.ok) {
            const tokenResponse = await response.clone().json();
            return tokenResponse.token;
          }
          return '';
        }
      );

    return token;
  };

  useEffect(() => {
    const userId = props.context.pageContext.user.loginName;
    generateToken(props.botEndpoint, md5(userId)).then((token: string) => {
      if (token) {
        setDirectLine(createDirectLine({ token }));
      }
    });
  }, []);

  const toastMiddleware = () => (next) => ({ notification, ...otherArgs }) => {
    const { id } = notification;
    if (id === 'signin') {
      return <BotSignInToast notification={notification} context={props.context} />;
    } else if (id === 'traditionalbotauthentication') {
      return <TraditionalBotAuthenticationToast notification={notification} />;
    }
    return next({ notification, ...otherArgs });
  };

  const store = useMemo(
    () =>
      createStore({}, ({ dispatch }) => (next) => (action) => {
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY' && action.payload.activity.from.role === 'bot') {
          const activity =
            (action.payload.activity.attachments || []).find(
              ({ contentType }) => contentType === 'application/vnd.microsoft.card.oauth'
            ) || {};
          const { content } = activity;

          if (content) {
            const { tokenExchangeResource } = content;
            const { uri } = tokenExchangeResource;

            if (uri) {
              dispatch({
                type: 'WEB_CHAT/SET_NOTIFICATION',
                payload: {
                  data: { content },
                  id: 'signin',
                  level: 'info',
                  message: 'Please sign in to the app.',
                },
              });

              return false;
            }
          }
        }

        return next(action);
      }),
    []
  );

  return (
    <div className={styles.botFrameworkChatv4} style={{ height: 700 }}>
      <ReactWebChat
        directLine={directLine}
        styleOptions={styleSetOptions}
        toastMiddleware={toastMiddleware}
        store={store}
      />
    </div>
  );
};
