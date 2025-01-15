import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Spinner, Dialog, DialogType, DialogFooter, PrimaryButton, MessageBar, MessageBarType } from '@fluentui/react';
import MSALWrapper from './MSALWrapper'; // Ensure you have the correct import path for MSALWrapper
import { IHRAssistantProps } from './IHRAssistantProps';
import { Dispatch } from 'redux';
import { CardHelper } from '../helpers/CardHelper';
import styles from './HRAssistant.module.scss';
import { Placeholder } from '@pnp/spfx-controls-react/lib/controls/placeholder';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Log } from '@microsoft/sp-core-library';


const HRAssistant: React.FC<IHRAssistantProps> = (props) => {
  const { title, description, clientId, tenantName, scope, userEmail, userDisplayName, botURL, greet, botAvatarImage, botAvatarInitials, context, themeVariant, webPartDisplayMode } = props;

  const [token, setToken] = useState<string>('');
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const webChatRef = useRef<HTMLDivElement>(null);
  const loadingSpinnerRef = useRef<HTMLDivElement>(null);

  const fetchToken = async (): Promise<string> => {
    try {
      const authority = `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com`;
      const MSALWrapperInstance = new MSALWrapper(clientId, authority);
  
      const responseToken = await MSALWrapperInstance.handleLoggedInUser([scope], userEmail) ||
        await MSALWrapperInstance.acquireAccessToken([scope], userEmail);
  
      if (!responseToken || !responseToken.accessToken) {
        throw new Error('Failed to fetch access token.');
      }
  
      return responseToken.accessToken;
    } catch (error) {
      Log.error('Error fetching token:', error);
      setIsTokenExpired(true); // Show dialog for expired token
      throw error; // Rethrow to let ErrorBoundary handle it
    }
  };
  

  const getRegionalChannelURL = async (): Promise<string> => {
    const environmentEndPoint = botURL.slice(0, botURL.indexOf('/powervirtualagents'));
    const apiVersion = botURL.slice(botURL.indexOf('api-version')).split('=')[1];
    const regionalChannelSettingsURL = `${environmentEndPoint}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`;

    const regionalResponse = await fetch(regionalChannelSettingsURL);
    if (!regionalResponse.ok) {
      throw new Error(`HTTP error! Status: ${regionalResponse.status}`);
    }

    const data = await regionalResponse.json();
    return data.channelUrlsById.directline;
  };

  const createDirectLine = async (botURL: string, regionalChannelURL: string) => {
    try {
      const response = await fetch(botURL);
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access Forbidden: Token might be invalid or expired.');
        } else if (response.status === 404) {
          throw new Error('Bot service not found. Check bot URL configuration.');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
  
      const conversationInfo = await response.json();
      return (window as any).WebChat.createDirectLine({
        token: conversationInfo.token,
        domain: `${regionalChannelURL}v3/directline`,
      });
    } catch (error) {
      Log.error('Failed to create DirectLine:', error);
      setIsTokenExpired(true); // Show dialog for expired token
      throw error; // Pass the error up to the boundary
    }
  };
  

  const createWebChatStore = (token: string, directline: any) => {
    return (window as any).WebChat.createStore(
      {},
      ({ dispatch }: { dispatch: Dispatch }) => (next: any) => (action: any) => {

        // Checking whether we should greet the user
        if (greet) {
          if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
            // eslint-disable-next-line no-console
            console.log("Action:" + action.type);
            dispatch({
              meta: {
                method: "keyboard",
              },
              payload: {
                activity: {
                  channelData: {
                    postBack: true,
                  },
                  //Web Chat will show the 'Greeting' System Topic message which has a trigger-phrase 'hello'
                  name: 'startConversation',
                  type: "event"
                },
              },
              type: "DIRECT_LINE/POST_ACTIVITY",
            });
            return next(action);
          }
        }

        // Checking whether the bot is asking for authentication
        if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
          const activity = action.payload.activity;
          if (activity.from && activity.from.role === 'bot' &&
            (CardHelper.getOAuthCardResourceUri(activity))) {
            directline.postActivity({
              type: 'invoke',
              name: 'signin/tokenExchange',
              value: {
                id: activity.attachments[0].content.tokenExchangeResource.id,
                connectionName: activity.attachments[0].content.connectionName,
                token
              },
              "from": {
                id: userEmail,
                name: userDisplayName,
                role: "user"
              }
            }).subscribe(
              (id: any) => {
                if (id === "retry") {

                  // bot was not able to handle the invoke, so display the oauthCard (manual authentication)
                  // eslint-disable-next-line no-console
                  console.log("bot was not able to handle the invoke, so display the oauthCard");
                  return next(action);
                }
              },
              (error: any) => {
                // an error occurred to display the oauthCard (manual authentication)
                // eslint-disable-next-line no-console
                console.log("An error occurred so display the oauthCard");
                return next(action);
              }
            );
            // token exchange was successful, do not show OAuthCard
            return;
          }
        } else {
          return next(action);
        }

        if (action.type === "DIRECT_LINE/POST_ACTIVITY_REJECTED") {
          // eslint-disable-next-line no-console
          console.warn("Token may have expired. Attempting to refresh token...");

          // Call your token refresh logic
          fetchToken()
            .then((newToken) => {
              // eslint-disable-next-line no-console
              console.log("Token refreshed successfully. Reconnecting...");

              // Reinitialize Direct Line with the new token
              dispatch({
                type: "WEB_CHAT/SEND_TOKEN",
                payload: {
                  token: newToken,
                },
              });
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error("Token refresh failed:", error);
              // Handle failure to refresh token (e.g., log out user)
              setIsTokenExpired(true);
            });

          return;
        }

        return next(action);
      }
    );
  };

  const handleLayerDidMount = useCallback(async (): Promise<void> => {
    try {
      const token = await fetchToken();

      setToken(token);

      const regionalChannelURL = await getRegionalChannelURL();

      const directline = await createDirectLine(botURL, regionalChannelURL);

      const store = createWebChatStore(token, directline);


      const avatarOptions = botAvatarImage && botAvatarInitials ? {
        botAvatarImage: botAvatarImage,
        botAvatarInitials: botAvatarInitials,
        userAvatarImage: `/_layouts/15/userphoto.aspx?size=S&username=${userEmail}`,
        userAvatarInitials: CardHelper.getUserInitials(userDisplayName)
      } : {};

      const styleSetOptions = {
        hideScrollToEndButton: false,
        rootHeight: '100%',
        rootWidth: '100%',
        hideUploadButton: true,
        ...avatarOptions
      };


      if (token && directline) {
        if (webChatRef.current && loadingSpinnerRef.current) {
          webChatRef.current.style.minHeight = '50vh';
          webChatRef.current.style.border = '1px solid #dedede';
          loadingSpinnerRef.current.style.display = 'none';
          (window as any).WebChat.renderWebChat(
            {
              directLine: directline,
              store: store,
              userID: userEmail,
              username: userDisplayName,
              locale: 'en-US',
              styleOptions: styleSetOptions,
              sendTypingIndicator: true,
            },
            webChatRef.current
          );
          //setIsWebChatRendered(true); // Update state to hide the button
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error initializing:', err);
    }
  }, [clientId, userEmail, botURL, userDisplayName]);

  useEffect(() => {
    handleLayerDidMount();
  }, [handleLayerDidMount]);

  const handleReload = () => {
    window.location.reload();
  };
  const _onConfigure = () => {
    // Context of the web part
    context.propertyPane.open();
  };
  // eslint-disable-next-line no-console
  console.log(token);


  //If Client ID and Bot URL are not provided, then show placeholder component
  if (!clientId || !botURL) {
    return (
      <>
        {
          webPartDisplayMode === DisplayMode.Edit ?
            <Placeholder iconName='Edit'
              iconText='Configure your web part'
              description='Please configure the web part.'
              buttonLabel='Configure'
              onConfigure={_onConfigure}
              theme={themeVariant} />
            : <MessageBar
              messageBarType={MessageBarType.warning}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
             Please configure the web part to display content.
            </MessageBar>
        }

      </>
    );
  }



  return (
    <section className={styles.chatAgent}>
      <div className={styles.container}>

        <div className={styles.title}>{title}</div>
        <p className={styles.description}>{description}</p>
        <div className={styles.main} ref={webChatRef} role="main" />
        <div ref={loadingSpinnerRef}>
          <Spinner label="Loading..." style={{ paddingTop: "1rem", paddingBottom: "1rem" }} />
        </div>        

      </div>

      {isTokenExpired && (
        <Dialog
          hidden={!isTokenExpired}
          onDismiss={() => setIsTokenExpired(false)}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Session Expired',
            subText: 'Your session has expired. Please reload the page to continue.',
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={handleReload} text="Reload" />
          </DialogFooter>
        </Dialog>
      )}
    </section>
  );
};

export default HRAssistant;