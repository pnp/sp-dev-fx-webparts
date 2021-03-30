import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import styles from './BotFrameworkChatv4.module.scss';
import { IBotFrameworkChatv4Props } from './IBotFrameworkChatv4Props';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import * as md5 from 'blueimp-md5';

export const BotFrameworkChatv4: React.FunctionComponent<IBotFrameworkChatv4Props> = (props) => {
  const user = props.context.pageContext.user;
  const [directLine, setDirectLine] = useState(createDirectLine({}));
  const styleSetOptions = useMemo(
    () => {
     return {
        userAvatarInitials: user.displayName,
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
    generateToken(props.botEndpoint, md5(user.loginName)).then((token: string) => {
      if (token) {
        setDirectLine(createDirectLine({ token }));
      }
    });
  }, []);

  return (
    <div className={styles.botFrameworkChatv4} style={{ height: 700 }}>
        <ReactWebChat directLine={directLine} styleOptions={styleSetOptions} />
    </div>
  );
};