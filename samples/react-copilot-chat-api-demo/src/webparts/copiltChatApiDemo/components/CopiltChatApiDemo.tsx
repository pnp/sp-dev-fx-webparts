import * as React from 'react';
import styles from './CopiltChatApiDemo.module.scss';
import type { ICopiltChatApiDemoProps } from './ICopiltChatApiDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClientV3 } from '@microsoft/sp-http';

interface IState {
  isCalling: boolean;
  conversationId?: string;
  rawResponse?: string;
  error?: string;
  userQuery: string;
  chatResponse?: any;
}

export default class CopiltChatApiDemo extends React.Component<ICopiltChatApiDemoProps, IState> {
  public constructor(props: ICopiltChatApiDemoProps) {
    super(props);
    this.state = {
      isCalling: false,
      userQuery: ''
    };
  }

  private readonly onQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ userQuery: event.target.value });
  };

  private readonly sendChatMessage = async (): Promise<void> => {
    if (!this.state.userQuery.trim()) {
      return;
    }

    this.setState({ isCalling: true, error: undefined, chatResponse: undefined });

    try {
      let conversationId = this.state.conversationId;

      // Create conversation if it doesn't exist
      if (!conversationId) {
        const client: MSGraphClientV3 = await this.props.context.msGraphClientFactory.getClient('3');
        
        conversationId = await new Promise<string>((resolve, reject) => {
          void client
            .api('copilot/conversations')
            .version('beta')
            .post({}, (err: any, res: any) => {
              if (err) {
                reject(err);
              } else {
                this.setState({ conversationId: res?.id });
                resolve(res?.id);
              }
            });
        });
      }

      // Send the chat message
      const client: MSGraphClientV3 = await this.props.context.msGraphClientFactory.getClient('3');
      
      return new Promise<void>((resolve) => {
        void client
          .api(`copilot/conversations/${conversationId}/chat`)
          .version('beta')
          .post({ 
            message: { text: this.state.userQuery },
            locationHint: { timeZone: "America/New_York" }
          }, (err: any, res: any) => {
            if (err) {
              const message = err instanceof Error ? err.message : 'Unexpected error while sending chat message.';
              this.setState({ isCalling: false, error: message });
            } else {
              this.setState({
                isCalling: false,
                chatResponse: res,
                rawResponse: JSON.stringify(res, null, 2),
                userQuery: ''
              });
            }
            resolve();
          });
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unexpected error while sending chat message.';
      this.setState({ isCalling: false, error: message });
    }
  };

  private readonly resetConversation = (): void => {
    this.setState({ 
      conversationId: undefined, 
      chatResponse: undefined, 
      rawResponse: undefined, 
      error: undefined,
      userQuery: ''
    });
  };

  public render(): React.ReactElement<ICopiltChatApiDemoProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const { isCalling, conversationId, rawResponse, error, userQuery, chatResponse } = this.state;

    return (
      <section className={`${styles.copiltChatApiDemo} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape("Siddharth Vaghasia")}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>

        <div>
          <h3>Copilot Chat API demo</h3>
          <p>Enter your question and click send. A conversation will be created automatically if needed.</p>
          <div>
            <input 
              type="text" 
              placeholder="Enter your question..." 
              value={userQuery}
              onChange={this.onQueryChange}
              disabled={isCalling}
              style={{ padding: '8px', marginRight: '8px', width: '300px' }}
            />
            <button onClick={this.sendChatMessage} disabled={isCalling || !userQuery.trim()}>
              {isCalling ? 'Sending…' : 'Send Message'}
            </button>
            {conversationId && (
              <button onClick={this.resetConversation} disabled={isCalling} style={{ marginLeft: '8px' }}>
                Reset Conversation
              </button>
            )}
          </div>
          {conversationId && (
            <p aria-live="polite" style={{ marginTop: '8px' }}>Conversation ID: {conversationId}</p>
          )}
          {error && (
            <p aria-live="assertive" style={{ color: 'red' }}>Error: {error}</p>
          )}
          {chatResponse && (
            <div>
              <h4>Chat Response</h4>
              <pre aria-live="polite">{JSON.stringify(chatResponse, null, 2)}</pre>
            </div>
          )}
          {rawResponse && !chatResponse && (
            <pre aria-live="polite">{rawResponse}</pre>
          )}
        </div>

        
      </section>
    );
  }
}
